import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";

// ============================================================
// POST /api/cek-dokumen — AI Cek Dokumen via upload foto (VLM)
//
// PRIVASI: image hanya diproses in-memory, tidak pernah disimpan
// (tidak ke disk, database, maupun log). Setelah respons dikirim,
// data foto hilang bersama memori request.
// ============================================================

export const runtime = "nodejs";

export interface DocTypeDefinition {
  id: string;
  label: string;
  emoji: string;
  /** Elemen wajib yang diperiksa AI pada foto dokumen */
  promptChecklist: string[];
}

export const DOC_TYPES: DocTypeDefinition[] = [
  {
    id: "ktp",
    label: "KTP / e-KTP",
    emoji: "🪪",
    promptChecklist: [
      "foto wajah terlihat jelas",
      "NIK 16 digit terbaca",
      "nama, tempat/tanggal lahir, agama, alamat terbaca",
      "tidak kabur/tidak tertutup bayangan/jari",
      "tidak ada tanda editan/kliping digital",
      "empat sudut kartu terlihat",
    ],
  },
  {
    id: "npwp",
    label: "Kartu NPWP / NPWP NIK",
    emoji: "💼",
    promptChecklist: [
      "nomor NPWP/NIK 15-16 digit terbaca",
      "nama wajib pajak terbaca jelas",
      "alamat terdaftar terbaca",
      "logo DJP & tanda tangan pejabat terlihat",
      "tidak kabur/tidak ada pantulan cahaya",
      "kartu utuh, data penting tidak terpotong",
    ],
  },
  {
    id: "nib",
    label: "NIB (OSS-RBA)",
    emoji: "🏢",
    promptChecklist: [
      "nomor NIB 13 digit terbaca",
      "nama pelaku usaha terbaca",
      "tanggal penerbitan terbaca",
      "KBLI & kualifikasi usaha terbaca",
      "logo OSS / QR code terlihat",
      "data penting tidak terpotong",
    ],
  },
  {
    id: "akta",
    label: "Akta Pendirian Badan Usaha",
    emoji: "📜",
    promptChecklist: [
      "nomor akta & tanggal akta terbaca",
      "nama notaris & tempat kedudukan terbaca",
      "nama para pendiri/pemegang saham terbaca",
      "maksud & tujuan / KBLI usaha terbaca",
      "tanda tangan notaris & cap terlihat",
      "teks tidak kabur & tidak terlipat",
    ],
  },
  {
    id: "sk-menkumham",
    label: "SK Menkumham",
    emoji: "🏛️",
    promptChecklist: [
      "nomor SK & tahun penerbitan terbaca",
      "nama badan usaha yang disahkan terbaca",
      "tanggal pengesahan terbaca",
      "nama pejabat penanda tangan terbaca",
      "tanda tangan & stempel terlihat jelas",
      "kertas utuh, teks tidak terpotong",
    ],
  },
  {
    id: "paspor",
    label: "Paspor Indonesia",
    emoji: "🛂",
    promptChecklist: [
      "halaman biodata terbaca jelas",
      "nomor paspor terbaca",
      "foto wajah & tanda tangan pemegang terlihat",
      "nama, tanggal lahir, jenis kelamin terbaca",
      "tanggal terbit & masa berlaku terbaca",
      "machine readable zone (2 baris huruf-angka) terbaca",
    ],
  },
  {
    id: "ijazah",
    label: "Ijazah / STTB",
    emoji: "🎓",
    promptChecklist: [
      "nama sekolah/universitas terbaca",
      "nama siswa & NIS/NIM terbaca",
      "nomor ijazah & tahun kelulusan terbaca",
      "tanda tangan kepala sekolah/dekan & cap terlihat",
      "foto pemegang ijazah terlihat",
      "kertas tidak terlipat pada area penting",
    ],
  },
  {
    id: "sertifikat-standar",
    label: "Sertifikat Standar (SS)",
    emoji: "📋",
    promptChecklist: [
      "nomor sertifikat standar terbaca",
      "nama pelaku usaha & NIB terbaca",
      "KBLI yang disertifikasi terbaca",
      "tanggal terbit & masa berlaku terbaca",
      "logo OSS & tanda tangan pejabat terlihat",
      "teks tidak kabur & tidak terpotong",
    ],
  },
];

const DOC_TYPE_IDS = new Set(DOC_TYPES.map((d) => d.id));
const ALLOWED_MIME = ["jpeg", "png", "webp"];
const MAX_IMAGE_CHARS = 7_000_000; // ~7 juta karakter data URL
const VLM_TIMEOUT_MS = 90_000;

type ChecklistStatus = "ok" | "warning" | "fail";

interface AiChecklistItem {
  label: string;
  status: ChecklistStatus;
  note: string;
}

interface AiResult {
  score: number;
  status: "layak" | "perlu_perbaikan" | "tidak_terbaca";
  checklist: AiChecklistItem[];
  rekomendasi: string[];
  catatan: string;
}

const FALLBACK_CHECKLIST = [
  "Foto 4 sudut dokumen terlihat utuh",
  "Teks terbaca jelas tanpa blur",
  "Tidak ada bayangan/pantulan cahaya",
  "Gunakan dokumen asli, bukan fotokopi gelap",
  "Data penting tidak terpotong",
];

/**
 * Parsing tangguh output AI: trim → buang fence markdown →
 * ambil substring dari "{" pertama sampai "}" terakhir → JSON.parse.
 * Kembalikan null bila gagal / bentuk tidak sesuai.
 */
function parseAiJson(raw: string): AiResult | null {
  if (!raw || typeof raw !== "string") return null;
  let text = raw.trim();
  text = text.replace(/```json/gi, "").replace(/```/g, "").trim();

  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;

  try {
    const parsed = JSON.parse(text.slice(start, end + 1)) as Record<string, unknown>;

    const score = Math.max(0, Math.min(100, Math.round(Number(parsed.score) || 0)));
    const statusRaw = String(parsed.status ?? "");
    const status: AiResult["status"] =
      statusRaw === "layak" || statusRaw === "perlu_perbaikan" || statusRaw === "tidak_terbaca"
        ? statusRaw
        : "perlu_perbaikan";

    const checklistRaw = Array.isArray(parsed.checklist) ? parsed.checklist : [];
    const checklist: AiChecklistItem[] = checklistRaw
      .map((item): AiChecklistItem | null => {
        if (!item || typeof item !== "object") return null;
        const obj = item as Record<string, unknown>;
        const label = String(obj.label ?? "").trim();
        if (!label) return null;
        const st = String(obj.status ?? "warning");
        const itemStatus: ChecklistStatus =
          st === "ok" || st === "warning" || st === "fail" ? st : "warning";
        const note = String(obj.note ?? "").trim();
        return { label, status: itemStatus, note };
      })
      .filter((x): x is AiChecklistItem => x !== null)
      .slice(0, 7);

    const rekomendasiRaw = Array.isArray(parsed.rekomendasi) ? parsed.rekomendasi : [];
    const rekomendasi = rekomendasiRaw
      .map((r) => String(r ?? "").trim())
      .filter(Boolean)
      .slice(0, 4);

    if (checklist.length === 0) return null;

    return {
      score,
      status,
      checklist,
      rekomendasi: rekomendasi.length > 0 ? rekomendasi : ["Perbaiki poin yang ditandai lalu foto ulang dokumen"],
      catatan: String(parsed.catatan ?? "").trim(),
    };
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    // ---- Validasi input ----
    let body: { image?: unknown; docType?: unknown };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Body harus JSON valid" }, { status: 400 });
    }

    const image = typeof body.image === "string" ? body.image : "";
    const docType = typeof body.docType === "string" ? body.docType : "";

    const mimeMatch = image.match(/^data:image\/(jpeg|png|webp);base64,/);
    if (!image || !mimeMatch) {
      return NextResponse.json(
        { error: "Gambar wajib berformat data URL image/jpeg, image/png, atau image/webp" },
        { status: 400 }
      );
    }
    if (image.length > MAX_IMAGE_CHARS) {
      return NextResponse.json(
        { error: "Ukuran gambar terlalu besar (maksimal ±7 juta karakter). Kompres foto lalu coba lagi." },
        { status: 400 }
      );
    }
    if (!docType || !DOC_TYPE_IDS.has(docType)) {
      return NextResponse.json(
        { error: `docType wajib salah satu dari: ${DOC_TYPES.map((d) => d.id).join(", ")}` },
        { status: 400 }
      );
    }

    const doc = DOC_TYPES.find((d) => d.id === docType)!;

    // ---- Prompt VLM (Bahasa Indonesia) ----
    const prompt = `Kamu verifikator dokumen resmi Republik Indonesia. Periksa foto dokumen ${doc.label} ini terhadap checklist berikut: ${doc.promptChecklist
      .map((c, i) => `${i + 1}. ${c}`)
      .join(" ")}.
Nilai score 0-100 untuk kelayakan diajukan, status 'layak' (score>=80 & semua ok) / 'perlu_perbaikan' / 'tidak_terbaca'.
Balas HANYA JSON VALID tanpa teks lain tanpa markdown, dengan bentuk:
{"score": number, "status": "layak"|"perlu_perbaikan"|"tidak_terbaca", "checklist": [{"label": string, "status": "ok"|"warning"|"fail", "note": string}] (5-7 item), "rekomendasi": string[] (2-4 item), "catatan": string}
Note tiap item checklist singkat, spesifik terhadap foto yang terlihat. Jika foto jelas-jelas BUKAN dokumen yang dimaksud, status "tidak_terbaca" dengan catatan penjelasan.`;

    // ---- Panggil VLM dengan guard timeout ----
    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("VLM timeout")), VLM_TIMEOUT_MS)
    );

    let rawText = "";
    try {
      const completionPromise = (async () => {
        const zai = await ZAI.create();
        return zai.chat.completions.createVision({
          messages: [
            {
              role: "user",
              content: [
                { type: "text", text: prompt },
                { type: "image_url", image_url: { url: image } }, // dataUrl: "data:image/jpeg;base64,...."
              ],
            },
          ],
          thinking: { type: "disabled" },
        });
      })();

      const completion = (await Promise.race([completionPromise, timeout])) as {
        choices?: Array<{ message?: { content?: string } }>;
      };
      rawText = completion.choices?.[0]?.message?.content ?? "";
    } catch (err) {
      console.error(
        "[API /cek-dokumen] VLM gagal/timeout:",
        err instanceof Error ? err.message : err
      );
      return NextResponse.json(
        {
          ok: false,
          message: "Analisis AI sedang sibuk, coba lagi beberapa saat",
          fallbackChecklist: FALLBACK_CHECKLIST,
          ctaWa: true,
        },
        { status: 200 }
      );
    }

    // ---- Parse respons AI ----
    const parsed = parseAiJson(rawText);
    if (!parsed) {
      return NextResponse.json(
        {
          ok: false,
          message: "Analisis AI sedang sibuk, coba lagi beberapa saat",
          fallbackChecklist: FALLBACK_CHECKLIST,
          ctaWa: true,
        },
        { status: 200 }
      );
    }

    // Sukses — image hanya diproses in-memory, tidak pernah disimpan
    return NextResponse.json({
      ok: true,
      ...parsed,
      docType,
      checkedAt: new Date().toISOString(),
    });
  } catch (error) {
    // Jangan pernah log isi gambar — hanya pesan error
    console.error("[API /cek-dokumen] Error:", error instanceof Error ? error.message : error);
    return NextResponse.json(
      {
        ok: false,
        message: "Analisis AI sedang sibuk, coba lagi beberapa saat",
        fallbackChecklist: FALLBACK_CHECKLIST,
        ctaWa: true,
      },
      { status: 200 }
    );
  }
}
