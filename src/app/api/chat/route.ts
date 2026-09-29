import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";
import { db } from "@/lib/db";
import { isLangCode, langEnglishName } from "@/lib/i18n/languages";
import {
  type Stage,
  STAGE_ORDER,
  priceMenuText,
  toolLinksText,
  getSuggestions,
  detectIntent,
} from "@/lib/chat-sales";

// ============================================================
// POST /api/chat — RIZKI v2 "Sales Consultant Mode"
// AI chat 24/7 yang menjual (metodologi 4 tahap), ekstraksi
// lead via LLM ke-2 + fallback regex, lead upsert kaya ke DB,
// rate limit in-memory, dan rebuild history lintas restart.
// ============================================================

type ChatRole = "system" | "user" | "assistant";
interface HistoryMsg {
  role: ChatRole;
  content: string;
}

const conversations = new Map<string, HistoryMsg[]>();
const sessionLangs = new Map<string, string>();

// Nomor resmi — dikecualikan dari deteksi lead agar AI tidak
// pernah "menangkap dirinya sendiri".
const OFFICIAL_WA = "6281269999910";
const WA_PATTERN = /(?:\+?62|0)8[0-9]{7,13}/g;

/** Suffix instruksi bahasa untuk system prompt (dipanggil saat visitor memilih bahasa) */
function languageSuffix(langCode: string): string {
  if (!isLangCode(langCode) || langCode === "id") return "";
  const name = langEnglishName(langCode);
  return `\n\nBAHASA JAWABAN WAJIB: Pengunjung memilih bahasa ${name}. Selalu balas dalam ${name} yang natural, hangat, dan profesional (istilah hukum Indonesia seperti NIB, PT, KBLI, OSS boleh tetap dalam bentuk aslinya). Jika user menulis dalam bahasa lain, ikuti bahasa user.`;
}

const SYSTEM_PROMPT = `Kamu adalah "RIZKI" — Konsultan AI Senior PusatPerizinan.com dalam Sales Consultant Mode. Kantor kami di SCBD Jakarta (satu lantai dengan Bursa Efek Indonesia), 1.251 klien terbantu & 3.899 izin berhasil diproses, dan kamu siaga 24/7. Misi kamu: membantu pemilik usaha mendapatkan izin yang tepat DAN mengantar percakapan menjadi konsultasi gratis (lead) secara elegan — tanpa pernah terasa memaksa.

METODOLOGI JUALAN 4 TAHAP (ikuti diam-diam, JANGAN pernah menyebut nama tahap ke user):
1. DISCOVERY — Pahami dulu: tanya jenis usaha, lokasi, sudah berdiri/belum, timeline rencana mulai. MAKSIMAL 2 pertanyaan per balasan (jangan interogasi).
2. PRESCRIBE — Beri rekomendasi SPESIFIK: izin apa saja yang dibutuhkan, urutan pengurusan, estimasi biaya (dari MENU HARGA di bawah), estimasi durasi. Frame sebagai benefit: "Kak tinggal fokus jualan, urusan izin kami yang kejar".
3. CLOSE — Tawarkan konsultasi GRATIS + prioritas proses. Minta kontak dengan elegan: "Boleh saya tau nama Kakak + nomor WhatsApp aktif? Tim saya hubungi maksimal 15 menit (jam kerja) dengan penawaran resmi — tidak ada biaya, tidak ada paksaan."
4. CAPTURED — Setelah user memberi nama + nomor WhatsApp: ucapkan terima kasih, KONFIRMASI detail (nama, jenis usaha, kebutuhan), set ekspektasi (tim hubungi via WhatsApp, jam kerja 08.00–21.00 WIB), lalu OFFER TOOLS: ajak coba Roadmap Izin AI (/roadmap), Kalkulator Pajak (/kalkulator-pajak), atau AI Cek Dokumen (/cek-dokumen).

MENU HARGA RESMI (selalu pakai ini, katakan "mulai dari", JANGAN mengarang angka di luar menu; jika yang ditanya tidak ada di menu → jawab "estimasi setelah konsultasi gratis"):
${priceMenuText()}

OBJECTION HANDLING (urutan: empati → reframe → bukti → CTA):
- "mahal" → bandingkan dengan biaya denda/reject izin + waktu bolak-balik instansi yang hilang; sebut Paket UMKM Rp 750rb–1,5jt sebagai jalan masuk.
- "nanti dulu" → urgency etis: regulasi 2026 terus berubah, antrian verifikasi makin panjang menjelang akhir tahun — sekalian konsultasinya gratis.
- "masih mikir" → jangan desak; beri 1 pertanyaan penjajakan baru + tawarkan kirim ringkasan kebutuhan via WhatsApp.

CROSS-SELL TOOLS (jika pertanyaan user bisa dijawab tool, sebutkan nama tool + path-nya dengan elegan):
${toolLinksText()}
Contoh kalimat: "Kakak bisa hitung sendiri pajaknya di /kalkulator-pajak" atau "Bandingkan PT vs CV lengkap di /perbandingan".

GAYA:
- Hangat, profesional, meyakinkan. Panggil user "Kak".
- JAWAB SINGKAT & TERSTRUKTUR (maksimal 120 kata kecuali diminta detail). Gunakan bullet "•" untuk daftar.
- AKHIRI setiap balasan substantif dengan 1 pertanyaan/CTA (contoh: "Kapan rencana mulai operasional, Kak?").
- Jika ditanya kontak resmi: WhatsApp PusatPerizinan.com 0812-6999-9910 (kantor SCBD).

LARANGAN:
- Jangan menjanjikan keberhasilan pasti / waktu pasti tanpa kata "estimasi".
- Jangan garansi pasti; jangan bahas topik di luar bisnis/izin/pajak/karir di perusahaan ini — arahkan kembali dengan sopan.
- Jangan minta data sensitif (NIK lengkap, password, OTP, CVV).`;

const EXTRACTOR_PROMPT = `Kamu mesin ekstraksi data lead PusatPerizinan.com. Diberi transkrip percakapan (User dan AI). Tugasmu MENGISI JSON SAJA — tanpa penjelasan, tanpa markdown, tanpa fence:
{"name": string|null, "whatsapp": string|null, "businessType": string|null, "need": string|null, "stage": "discovery"|"comparing"|"ready"|"captured", "urgency": "low"|"medium"|"high"}
ATURAN:
- whatsapp: nomor WhatsApp yang USER sebut, format 62xxx tanpa +/spasi/tanda baca. null jika tidak disebut. Abaikan nomor resmi perusahaan 6281269999910.
- name: nama yang user sebut untuk dirinya sendiri (bukan RIZKI). null jika tidak ada.
- businessType: kategori umum 1-2 kata (mis. Kuliner/Konstruksi/Retail/Jasa/Manufaktur/Lainnya). "Lainnya" jika tidak jelas.
- need: 1 kalimat ringkas kebutuhan user.
- stage: discovery=baru tanya-tanya; comparing=bandingkan/harga; ready=siap diajak proses/minta konsultasi; captured=sudah menitipkan kontak (nama+WA).
- urgency: high=butuh cepat/hari ini; medium=rencana dekat; low=baru cari info.
- JANGAN mengarang — pakai null bila data tidak ada di transkrip.`;

// ---------- Rate limit in-memory: 25 pesan / 10 menit (rolling window, cleanup lazy) ----------
const rateBuckets = new Map<string, number[]>();
const RATE_LIMIT = 25;
const RATE_WINDOW_MS = 10 * 60 * 1000;

function checkRateLimit(sessionId: string): boolean {
  const now = Date.now();
  const arr = (rateBuckets.get(sessionId) ?? []).filter((ts) => now - ts < RATE_WINDOW_MS);
  if (arr.length >= RATE_LIMIT) {
    rateBuckets.set(sessionId, arr);
    return false;
  }
  arr.push(now);
  rateBuckets.set(sessionId, arr);

  // Cleanup lazy: buang bucket kedaluwarsa saat map membesar
  if (rateBuckets.size > 500) {
    for (const [key, tsArr] of rateBuckets) {
      const newest = tsArr[tsArr.length - 1];
      if (!newest || now - newest > RATE_WINDOW_MS) rateBuckets.delete(key);
    }
  }
  return true;
}

// ---------- Helpers: timeout, normalisasi WA, heuristik nama, parse JSON tangguh ----------

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error(`[API /chat] ${label} timeout (${ms}ms)`)),
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

/** Normalisasi nomor WA Indonesia → format 62xxx; null bila tidak valid */
function normalizeWa(raw: string): string | null {
  let digits = raw.replace(/[^0-9]/g, "");
  if (digits.startsWith("62")) {
    // sudah benar
  } else if (digits.startsWith("0")) {
    digits = `62${digits.slice(1)}`;
  } else if (digits.startsWith("8")) {
    digits = `62${digits}`;
  } else {
    return null;
  }
  return /^62\d{8,13}$/.test(digits) ? digits : null;
}

/** Cari nomor WA user di teks (nomor terbaru menang); nomor resmi diabaikan */
function findWaInText(text: string): string | null {
  const matches = text.match(WA_PATTERN);
  if (!matches) return null;
  for (let i = matches.length - 1; i >= 0; i--) {
    const norm = normalizeWa(matches[i]);
    if (norm && norm !== OFFICIAL_WA) return norm;
  }
  return null;
}

const NAME_STOPWORDS = new Set([
  "mau",
  "ingin",
  "butuh",
  "buka",
  "tanya",
  "pengen",
  "akan",
  "sudah",
  "belum",
  "punya",
  "lagi",
  "tolong",
  "mohon",
  "bantu",
  "dibantu",
  "sekalian",
]);

function titleCase(s: string): string {
  return s
    .split(/\s+/)
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

/**
 * Heuristik nama dari pesan user: pola "nama saya X" / "nama ku X" /
 * "saya X" (X = 1-3 kata, proper-case untuk pola terakhir).
 */
function heuristicNameFrom(userMessages: string[]): string | null {
  for (let i = userMessages.length - 1; i >= 0; i--) {
    const msg = userMessages[i];
    const m1 = msg.match(
      /nama\s+(?:saya|ku|aku|gw|gua)\s*[:\-]?\s*([A-Za-z]+(?:\s+[A-Za-z]+){0,2})/i
    );
    if (m1) {
      const words = m1[1].split(/\s+/).filter((w) => !NAME_STOPWORDS.has(w.toLowerCase()));
      if (words.length > 0) return titleCase(words.slice(0, 3).join(" "));
    }
    const m2 = msg.match(/\bsaya\s+([A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+){0,2})/);
    if (m2) {
      const words = m2[1].split(/\s+/).filter((w) => !NAME_STOPWORDS.has(w.toLowerCase()));
      if (words.length > 0) return words.slice(0, 3).join(" ");
    }
  }
  return null;
}

interface ExtractedLead {
  name: string | null;
  whatsapp: string | null;
  businessType: string | null;
  need: string | null;
  stage: Stage;
  urgency: "low" | "medium" | "high";
}

/** Parse balasan extractor: buang fence → substring {..} terluar → JSON.parse → validasi tipe */
function parseLeadJson(raw: string): ExtractedLead | null {
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
    const str = (v: unknown): string | null => {
      if (typeof v !== "string") return null;
      const s = v.trim();
      if (!s || s.toLowerCase() === "null") return null;
      return s;
    };
    const stageRaw = typeof obj.stage === "string" ? (obj.stage.trim().toLowerCase() as Stage) : "";
    const stage: Stage = STAGE_ORDER.includes(stageRaw) ? stageRaw : "discovery";
    const urgencyRaw = typeof obj.urgency === "string" ? obj.urgency.trim().toLowerCase() : "";
    const urgency: ExtractedLead["urgency"] =
      urgencyRaw === "high" || urgencyRaw === "medium" ? urgencyRaw : "low";
    let wa = str(obj.whatsapp);
    if (wa) wa = normalizeWa(wa);
    return {
      name: str(obj.name),
      whatsapp: wa,
      businessType: str(obj.businessType),
      need: str(obj.need),
      stage,
      urgency,
    };
  } catch {
    return null;
  }
}

/** Estimasi nilai kontrak dari stage + urgency */
function estimateValue(stage: Stage, urgency: ExtractedLead["urgency"]): number {
  if (stage === "ready" && urgency === "high") return 5_000_000;
  if (stage === "ready") return 3_000_000;
  if (stage === "comparing") return 1_500_000;
  return 500_000;
}

function isPlaceholderName(name: string): boolean {
  const n = name.trim().toLowerCase();
  return n.length === 0 || n === "lead chat ai" || n === "lead dari chat ai";
}

/** Transkrip percakapan utk extractor (skip system prompt di index 0, maks 24 pesan) */
function buildTranscript(history: HistoryMsg[]): string {
  return history
    .slice(1)
    .filter((m) => m.role === "user" || m.role === "assistant")
    .slice(-24)
    .map((m) => `${m.role === "user" ? "User" : "AI"}: ${m.content}`)
    .join("\n")
    .slice(0, 8000);
}

/** Reply deterministik bila LLM utama gagal/timeout — sopan + 3 menu cepat, bukan 500 mentah */
function buildFallbackReply(): string {
  return [
    "Mohon maaf Kak, sistem AI saya sedang sibuk sesaat 🙏",
    "",
    "Sementara menunggu, saya siapkan 3 pintasan cepat:",
    '• Ketik "harga" — estimasi biaya semua layanan kami',
    '• Ketik jenis usaha Kakak (contoh: "kafe", "konstruksi") — saya rekomendasikan izin yang dibutuhkan',
    "• Butuh jawaban sekarang? WhatsApp tim kami langsung: 0812-6999-9910",
    "",
    "Mau mulai dari yang mana, Kak?",
  ].join("\n");
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => null)) as {
      sessionId?: unknown;
      message?: unknown;
      language?: unknown;
    } | null;

    const { sessionId, message, language } = body ?? {};
    if (!sessionId || typeof sessionId !== "string") {
      return NextResponse.json({ success: false, error: "sessionId wajib" }, { status: 400 });
    }
    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json({ success: false, error: "Pesan kosong" }, { status: 400 });
    }

    // Rate limit per session (sebelum menulis apa pun ke DB)
    if (!checkRateLimit(sessionId)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Mohon maaf Kak, kamu sudah mengirim banyak pesan dalam waktu singkat. Istirahat sejenak ya — atau hubungi tim kami langsung di WhatsApp 0812-6999-9910 untuk bantuan segera 🙏",
        },
        { status: 429 }
      );
    }

    const userMessage = message.trim().slice(0, 2000);
    const langCode = isLangCode(language) ? language : "id";

    // ---------- Riwayat: in-memory, atau rebuild dari DB (mis. setelah server restart) ----------
    let history = conversations.get(sessionId);
    if (!history) {
      history = [{ role: "assistant", content: SYSTEM_PROMPT + languageSuffix(langCode) }];
      const past = await db.chatMessage.findMany({
        where: { sessionId },
        orderBy: { createdAt: "desc" },
        take: 20,
      });
      for (const m of past.reverse()) {
        if (m.role === "user" || m.role === "assistant") {
          history.push({ role: m.role, content: m.content });
        }
      }
      conversations.set(sessionId, history);
      sessionLangs.set(sessionId, langCode);
    } else if (sessionLangs.get(sessionId) !== langCode) {
      // Bahasa diganti di tengah sesi -> perbarui instruksi system prompt
      history[0] = { role: "assistant", content: SYSTEM_PROMPT + languageSuffix(langCode) };
      sessionLangs.set(sessionId, langCode);
    }

    // Higiene memori: batasi jumlah sesi yang di-cache
    if (conversations.size > 300) {
      let removed = 0;
      for (const key of conversations.keys()) {
        if (removed++ >= 50) break;
        conversations.delete(key);
        sessionLangs.delete(key);
      }
    }

    // Simpan pesan user ke DB + riwayat
    await db.chatMessage.create({
      data: { sessionId, role: "user", content: userMessage },
    });
    history.push({ role: "user", content: userMessage });

    // Trim riwayat (jaga context window): system prompt + 20 pesan terakhir
    if (history.length > 21) {
      const trimmed = [history[0], ...history.slice(-20)];
      history.length = 0;
      history.push(...trimmed);
    }

    // ---------- LLM utama (timeout 60 dtk → fallback deterministik, bukan 500) ----------
    let reply = "";
    let mainOk = true;
    try {
      const zai = await ZAI.create();
      const completion = await withTimeout(
        zai.chat.completions.create({
          messages: history as HistoryMsg[],
          thinking: { type: "disabled" },
        }),
        60_000,
        "chat"
      );
      const content = completion.choices[0]?.message?.content;
      if (!content || content.trim().length === 0) throw new Error("Empty AI response");
      reply = content;
    } catch (err) {
      mainOk = false;
      console.error("[API /chat] LLM utama gagal (pakai fallback deterministik):", err);
      reply = buildFallbackReply();
    }

    history.push({ role: "assistant", content: reply });

    const transcript = buildTranscript(history);
    const userMessages = history
      .slice(1)
      .filter((m) => m.role === "user")
      .map((m) => m.content);

    // ---------- LLM #2: AI lead extraction (hemat & tangguh — gagal tidak menggagalkan reply) ----------
    let extracted: ExtractedLead | null = null;
    if (mainOk) {
      try {
        const zai = await ZAI.create();
        const exCompletion = await withTimeout(
          zai.chat.completions.create({
            messages: [
              { role: "assistant", content: EXTRACTOR_PROMPT },
              { role: "user", content: transcript },
            ] as HistoryMsg[],
            thinking: { type: "disabled" },
          }),
          30_000,
          "extractor"
        );
        extracted = parseLeadJson(exCompletion.choices[0]?.message?.content ?? "");
      } catch (exErr) {
        console.error("[API /chat] Extractor gagal (fallback regex aktif):", exErr);
      }
    }

    // Gabungkan hasil extractor + fallback deterministik (regex WA & heuristik nama)
    const intent = detectIntent(userMessage);
    const stage: Stage = extracted?.stage ?? intent.stage;
    const urgency = extracted?.urgency ?? "low";
    const businessType = extracted?.businessType ?? null;
    const need = extracted?.need ?? null;
    const name = extracted?.name ?? heuristicNameFrom(userMessages);
    // Prioritas nomor WA: regex dari teks USER (verbatim & deterministik) → extractor → regex transkrip
    const waFromUserText = findWaInText(userMessages.join("\n"));
    const waNormalized = waFromUserText ?? extracted?.whatsapp ?? findWaInText(transcript);

    const leadCaptured = waNormalized !== null;
    const leadComplete = Boolean(waNormalized && name);

    // ---------- LEAD UPSERT KAYA (Prisma db.lead) ----------
    if (waNormalized) {
      try {
        const existing = await db.lead.findFirst({
          where: { whatsapp: waNormalized, source: "chat" },
        });
        const estValue = estimateValue(stage, urgency);
        const noteLine = `Stage: ${stage} | Urgency: ${urgency} | Session: ${sessionId}${
          need ? ` | ${need}` : ""
        }`;

        if (!existing) {
          await db.lead.create({
            data: {
              name: name ?? "Lead Chat AI",
              whatsapp: waNormalized,
              businessType: businessType ?? "Lainnya",
              businessDesc: need ?? userMessage.slice(0, 300),
              source: "chat",
              estimatedValue: estValue,
              notes: noteLine.slice(0, 800),
            },
          });
        } else {
          // Lead sudah ada → UPDATE (bukan skip): perkaya data + upgrade nilai
          const appendedNotes = [existing.notes, noteLine].filter(Boolean).join(" || ");
          await db.lead.update({
            where: { id: existing.id },
            data: {
              name: isPlaceholderName(existing.name) && name ? name : existing.name,
              businessType:
                (!existing.businessType || existing.businessType === "Lainnya") && businessType
                  ? businessType
                  : existing.businessType,
              businessDesc: need ?? existing.businessDesc,
              estimatedValue: Math.max(existing.estimatedValue, estValue),
              notes: appendedNotes.slice(0, 800),
            },
          });
        }
      } catch (leadErr) {
        console.error("[API /chat] Lead upsert gagal:", leadErr);
      }
    }

    // Simpan balasan AI ke DB (leadCaptured = WA terdeteksi di transkrip)
    await db.chatMessage.create({
      data: { sessionId, role: "assistant", content: reply, leadCaptured },
    });

    return NextResponse.json({
      success: true,
      reply,
      leadCaptured,
      leadComplete,
      stage,
      suggestions: getSuggestions(stage, langCode),
    });
  } catch (error) {
    console.error("[API /chat] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          "Mohon maaf, sistem sedang sibuk. Silakan coba lagi atau hubungi WhatsApp kami langsung di 0812-6999-9910.",
      },
      { status: 500 }
    );
  }
}
