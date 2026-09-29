import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";
import { db } from "@/lib/db";

// ============================================================
// POST /api/follow-up/process — Mesin Follow-Up Email Otomatis
// Menangkap lead "belum closing & mulai dingin" (NEW/CONTACTED/
// CONSULTED, tidak ada aktivitas > staleHours), lalu membuat draft
// email follow-up personal via LLM (fallback deterministik bila
// upstream gagal/timeout/429). Hasil disimpan sebagai FollowUp
// status QUEUED — admin kirim via panel (mailto/wa.me).
// ============================================================

export const runtime = "nodejs";

/** Status pipeline yang masih dianggap "belum closing" */
const OPEN_STATUSES = ["NEW", "CONTACTED", "CONSULTED"] as const;

/** Jendela anti-spam: lead yang baru dikirimi email (SENT) di-skip 48 jam */
const SENT_COOLDOWN_MS = 48 * 3600 * 1000;

/** Batas aman antrean: jangan menumpuk draft kalau admin belum memproses */
const QUEUE_LIMIT = 50;

/** Batas jumlah lead yang diambil saat scan (skala kecil, filter in-memory) */
const SCAN_LIMIT = 60;

const LLM_TIMEOUT_MS = 45_000;

type LlmRole = "assistant" | "user";
interface LlmMsg {
  role: LlmRole;
  content: string;
}

interface EmailDraft {
  subject: string;
  body: string;
}

/** Bentuk minimal lead kandidat hasil findMany (include followUps terpilih) */
interface CandidateLead {
  id: string;
  name: string;
  whatsapp: string;
  email: string | null;
  businessType: string;
  businessDesc: string | null;
  source: string;
  status: string;
  estimatedValue: number;
  createdAt: Date;
  followUps: { status: string; createdAt: Date }[];
}

// ---------- System prompt copywriter email follow-up ----------

const SYSTEM_EMAIL_PROMPT = `Kamu copywriter email follow-up senior PusatPerizinan.com — konsultan perizinan #1 Indonesia (1.251 klien terbantu, 3.899 izin berhasil diproses, kantor di SCBD Jakarta).

TUGAS: Tulis SATU email follow-up personal untuk lead yang diberikan sebagai konteks JSON, yang sudah lama tidak membalas dan belum closing. Email harus terasa ditulis manusia yang peduli, bukan blast massal.

ATURAN WAJIB:
1. Bahasa Indonesia hangat dan konsultatif. Sapa dengan "Kak {nama}" — jangan formal kaku.
2. JANGAN memaksa, mendesak, atau menyalahkan. Tidak ada kalimat seperti "segera balas" yang bernada tekanan.
3. Referensi kebutuhan SPESIFIK lead (jenisUsaha / kebutuhan) di 1-2 kalimat awal — buktikan kamu benar-benar membaca kebutuhannya.
4. Tawarkan bantuan dan konsultasi GRATIS tanpa komitmen apa pun.
5. Sebut TEPAT 1 tool paling relevan dari daftar toolsBantu beserta path-nya (contoh: "/roadmap").
6. CTA: membalas email ini atau WhatsApp 0812-6999-9910 (jam kerja 08.00-21.00 WIB).
7. Tanda tangan penutup: "Tim PusatPerizinan.com".
8. Plain text murni: tanpa markdown, tanpa HTML, tanpa huruf kapital berlebihan.
9. Panjang body 150-250 kata, ada salam pembuka dan penutup yang sopan.

SUBJEK: maksimal 80 karakter, menarik, personal, TIDAK spammy (jangan huruf kapital semua, jangan banyak tanda seru).

OUTPUT: STRICT JSON SAJA tanpa fence dan tanpa penjelasan, persis format:
{"subject": "...", "body": "..."}
Gunakan \\n untuk baris baru di dalam body.`;

// ---------- Helpers ----------

/** Salin pola withTimeout dari chat route: race Promise vs timer */
function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error(`[API /follow-up/process] ${label} timeout (${ms}ms)`)),
      ms
    );
    promise.then(
      (val) => {
        clearTimeout(timer);
        resolve(val);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      }
    );
  });
}

/** Parse tangguh balasan LLM: buang fence → substring {..} terluar → JSON.parse → validasi */
function parseEmailJson(raw: string): EmailDraft | null {
  if (!raw) return null;
  let text = raw.trim();
  text = text
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;
  text = text.slice(start, end + 1);

  try {
    const obj = JSON.parse(text) as Record<string, unknown>;
    const subject = typeof obj.subject === "string" ? obj.subject.trim() : "";
    const body = typeof obj.body === "string" ? obj.body.trim().slice(0, 3000) : "";
    if (!subject || !body) return null;
    return { subject: subject.slice(0, 150), body };
  } catch {
    return null;
  }
}

/**
 * Fallback deterministik — WAJIB ada karena upstream LLM bisa 429/timeout.
 * Template personal dari data lead: nama, jenis usaha, kebutuhan, umur lead.
 */
function buildFallbackEmail(lead: CandidateLead, umurHari: number): EmailDraft {
  const nama = lead.name || "Kak";
  const jenis = lead.businessType || "usaha Kakak";
  const kebutuhan = lead.businessDesc ? lead.businessDesc.slice(0, 120) : "";
  const lama =
    umurHari > 1
      ? "Sudah beberapa hari sejak terakhir kita berhubungan"
      : "Baru saja kita terhubung";

  const subject = `Masih bisa kami bantu urusan izin usaha ${jenis} Kakak?`;
  const body = [
    `Kak ${nama},`,
    "",
    `${lama}, semoga ${jenis} Kakak lancar terus ya.`,
    kebutuhan
      ? `Waktu lalu Kakak menitipkan kebutuhan soal ${kebutuhan} — kami masih simpan catatannya dan siap lanjut kapan pun Kakak siap.`
      : `Waktu lalu Kakak menitipkan kontak lewat ${lead.source} — kami masih simpan catatannya dan siap lanjut kapan pun Kakak siap.`,
    "",
    "Kalau sekarang sedang menyusun rencana, Kakak bisa coba Roadmap Izin AI kami di /roadmap — cukup tulis bidang usaha, langsung jadi rencana perizinan 12 bulan yang personal.",
    "",
    "Konsultasi dengan tim kami GRATIS, tanpa komitmen. Cukup balas email ini, atau WhatsApp langsung ke 0812-6999-9910 (jam kerja 08.00-21.00 WIB). Tim kami di kantor SCBD Jakarta siap bantu hitung kebutuhan izin dan biayanya.",
    "",
    "Tidak ada paksaan, Kak. Kalau masih tahap riset, kami dengan senang hati dengarkan dulu kebutuhannya.",
    "",
    "Hormat kami,",
    "Tim PusatPerizinan.com",
  ].join("\n");

  return { subject, body };
}

/** Clamp angka bulat aman dari body request */
function clampInt(value: unknown, fallback: number, min: number, max: number): number {
  const n = typeof value === "number" ? Math.round(value) : Number.NaN;
  if (Number.isNaN(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

// ---------- Handler ----------

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => null)) as {
      maxPerRun?: unknown;
      staleHours?: unknown;
      trigger?: unknown;
    } | null;

    const maxPerRun = clampInt(body?.maxPerRun, 4, 1, 8);
    const staleHours = clampInt(body?.staleHours, 24, 0, 720);
    const trigger = body?.trigger === "auto" ? "auto" : "manual";

    // 1. Guard kapasitas antrean
    const queuedCount = await db.followUp.count({ where: { status: "QUEUED" } });
    if (queuedCount > QUEUE_LIMIT) {
      console.log(
        `[API /follow-up/process] Antrean penuh (${queuedCount} QUEUED) — run di-skip`
      );
      return NextResponse.json({
        success: true,
        processed: 0,
        created: [],
        skipped: 0,
        message: "Antrean penuh (>50 QUEUED). Proses/kirim dulu.",
      });
    }

    const now = Date.now();
    const staleCutoff = new Date(now - staleHours * 3600 * 1000);
    const sentCutoff = new Date(now - SENT_COOLDOWN_MS);

    // 2. Kandidat: belum closing + mulai dingin, scan lalu filter in-memory
    const staleLeads = (await db.lead.findMany({
      where: {
        status: { in: [...OPEN_STATUSES] },
        updatedAt: { lt: staleCutoff },
      },
      orderBy: { createdAt: "asc" }, // terlama dulu
      take: SCAN_LIMIT,
      include: { followUps: { select: { status: true, createdAt: true } } },
    })) as CandidateLead[];

    const eligible: CandidateLead[] = [];
    let skipped = 0;
    for (const lead of staleLeads) {
      const hasQueued = lead.followUps.some((f) => f.status === "QUEUED");
      const recentSent = lead.followUps.some(
        (f) => f.status === "SENT" && f.createdAt > sentCutoff
      );
      if (hasQueued || recentSent) {
        skipped++;
        continue;
      }
      eligible.push(lead);
      if (eligible.length >= maxPerRun) break;
    }

    if (eligible.length === 0) {
      return NextResponse.json({ success: true, processed: 0, created: [], skipped });
    }

    // 3-4. Generate email per kandidat (LLM → fallback) lalu simpan QUEUED
    const created: { id: string; leadId: string; leadName: string; subject: string }[] = [];

    for (const lead of eligible) {
      const umurHari = Math.floor((now - lead.createdAt.getTime()) / 86_400_000);
      const leadCtx = {
        nama: lead.name,
        jenisUsaha: lead.businessType,
        kebutuhan: lead.businessDesc,
        sumber: lead.source,
        statusPipeline: lead.status,
        nilaiEstimasiRp: lead.estimatedValue,
        umurHari,
        kantor: "SCBD Jakarta",
        waKantor: "0812-6999-9910",
        toolsBantu: [
          "/roadmap — Roadmap Izin AI 12 bulan",
          "/kalkulator-pajak — Kalkulator Pajak",
          "/kbli — Database KBLI",
          "/perbandingan — Perbandingan PT vs CV",
        ],
      };

      let email: EmailDraft | null = null;
      try {
        const zai = await ZAI.create();
        const completion = await withTimeout(
          zai.chat.completions.create({
            messages: [
              { role: "assistant", content: SYSTEM_EMAIL_PROMPT },
              { role: "user", content: JSON.stringify(leadCtx) },
            ] as LlmMsg[],
            thinking: { type: "disabled" },
          }),
          LLM_TIMEOUT_MS,
          "followup-llm"
        );
        email = parseEmailJson(completion.choices[0]?.message?.content ?? "");
        if (!email) {
          console.error(
            `[API /follow-up/process] LLM balasan tidak valid utk lead ${lead.name} — pakai fallback`
          );
        }
      } catch (err) {
        console.error(
          `[API /follow-up/process] LLM gagal utk lead ${lead.name} (pakai fallback deterministik):`,
          err
        );
      }
      if (!email) email = buildFallbackEmail(lead, umurHari);

      const fu = await db.followUp.create({
        data: {
          leadId: lead.id,
          channel: "email",
          subject: email.subject,
          body: email.body,
          status: "QUEUED",
          emailTo: lead.email,
          toPhone: lead.whatsapp,
          trigger,
        },
      });
      created.push({ id: fu.id, leadId: lead.id, leadName: lead.name, subject: email.subject });
      console.log(`[API /follow-up/process] Draft dibuat utk ${lead.name}: "${email.subject}"`);
    }

    // 5. Respons
    return NextResponse.json({
      success: true,
      processed: created.length,
      created,
      skipped,
    });
  } catch (error) {
    console.error("[API /follow-up/process] Error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memproses follow-up. Coba lagi." },
      { status: 500 }
    );
  }
}
