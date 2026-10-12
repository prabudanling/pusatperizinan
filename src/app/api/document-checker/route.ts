import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";
import { db } from "@/lib/db";

// ============================================================
// AI CEK DOKUMEN — analisis foto dokumen via VLM
// Mesin: z-ai-web-dev-sdk createVision — BACKEND ONLY
// User upload foto dokumen (NPWP, NIB, KTP, sertifikat, dll)
// → AI memeriksa kelengkapan, keterbacaan, masalah, langkah lanjut
// PRIVACY: gambar TIDAK disimpan — hanya hasil analisis JSON
// ============================================================

const ALLOWED_MIME = ["image/jpeg", "image/png", "image/webp"];
const ALLOWED_CATEGORY = [
  "auto",
  "npwp",
  "nib",
  "ktp",
  "sertifikat-standar",
  "sertifikasi-produk",
  "paspor-pmi",
  "kontrak-lainnya",
];
const MAX_BASE64_LENGTH = 6_200_000; // ~4.6MB gambar asli setelah base64

interface DocCheck {
  label: string;
  status: "ok" | "warning" | "error" | "unknown";
  detail: string;
}

interface DocIssue {
  severity: "high" | "medium" | "low";
  title: string;
  detail: string;
  fix: string;
}

interface DocResult {
  documentType: string;
  confidence: number; // 0-100 keyakinan jenis dokumen
  relevant: boolean; // apakah foto memang dokumen legalitas/identitas
  legibilityScore: number; // 0-100 kualitas foto
  summary: string;
  checks: DocCheck[];
  issues: DocIssue[];
  recommendations: string[];
  nextSteps: string[];
}

const CATEGORY_LABEL: Record<string, string> = {
  auto: "Deteksi otomatis oleh AI",
  npwp: "Kartu NPWP / bukti daftar pajak",
  nib: "NIB (Nomor Induk Berusaha) / OSS-RBA",
  ktp: "KTP / identitas diri",
  "sertifikat-standar": "Sertifikat Standar OSS / izin usaha sektoral",
  "sertifikasi-produk": "Sertifikat Halal, PIRT, BPOM, SNI, ISO",
  "paspor-pmi": "Paspor / dokumen penempatan PMI (SKU, SKCK, kontrak kerja)",
  "kontrak-lainnya": "Kontrak kerja sama, akta, atau dokumen lainnya",
};

const SYSTEM_PROMPT = `Anda adalah verifikator dokumen senior di PusatPerizinan.com, berpengalaman 10+ tahun memeriksa dokumen legalitas usaha, pajak, dan ketenagakerjaan Indonesia. Anda menguasai: NIB/OSS-RBA, NPWP 16 digit & Coretax, KTP, paspor, sertifikat standar, sertifikat halal (BPJPH), PIRT, izin edar BPOM, SKCK, SKU, kontrak kerja PMI (UU 18/2017), akta pendirian.

TUGAS: User mengupload FOTO dokumen. Periksa foto tersebut secara teliti dan laporkan:

1. JENIS DOKUMEN apa yang terlihat (jika user memberi konteks, konfirmasi atau koreksi)
2. KETERBACAAN FOTO: apakah tajam, cukup terang, tidak terpotong, tidak silau
3. KELENGKAPAN ELEMEN PENTING dokumen itu (mis. NPWP: nomor 16 digit, nama, alamat, status; NIB: nomor, tanggal terbit, KBLI; paspor: nomor, masa berlaku)
4. MASALAH yang terdeteksi: tanggal kedaluwarsa, kolom kosong, kerusakan, ketidaksesuaian
5. REKOMENDASI konkret langkah berikutnya

ATURAN KRITIS:
- JANGAN PERNAH menuliskan nomor identitas pribadi secara utuh (NIK, NPWP, nomor paspor). Jika perlu menyebut, SENSOR 6 digit pertama dengan asterisk (mis. "32**************"). Nama & alamat cukup disebut "tercantum" tanpa menyalinnya.
- Jika foto BUKAN dokumen yang relevan (mis. foto makanan, selfie), set relevant=false dan jelaskan apa yang terlihat dengan sopan.
- Jika teks tidak terbaca jelas, jangan menebak isi — beri status "unknown" dan sarankan foto ulang.
- Nilai legibilityScore jujur: foto blur/gelap/terpotong maksimal 40.
- Bahasa Indonesia ramah, mudah dipahami orang awam.

FORMAT RESPONS: JSON SAJA tanpa teks lain:
{
  "documentType": "Kartu NPWP (Pemotongan PPh/PPN)",
  "confidence": 92,
  "relevant": true,
  "legibilityScore": 78,
  "summary": "1-2 kalimat kondisi dokumen",
  "checks": [
    {"label": "Nomor dokumen terlihat lengkap", "status": "ok", "detail": "Nomor terbaca jelas dan berformat benar"},
    {"label": "Nama & alamat terbaca", "status": "warning", "detail": "Bagian alamat agak gelap"},
    {"label": "Masa berlaku", "status": "unknown", "detail": "Tidak terlihat pada foto"}
  ],
  "issues": [
    {"severity": "medium", "title": "Bagian kanan terpotong", "detail": "...", "fix": "Foto ulang seluruh dokumen tanpa terpotong"}
  ],
  "recommendations": ["saran 1", "saran 2"],
  "nextSteps": ["langkah 1", "langkah 2"]
}

Status hanya boleh: "ok", "warning", "error", "unknown". Severity hanya: "high", "medium", "low". Maksimal 6 checks, 4 issues, 4 recommendations, 3 nextSteps.`;

function parseAiJson(content: string): DocResult | null {
  const cleaned = content.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1) return null;
  try {
    const parsed = JSON.parse(cleaned.slice(start, end + 1));
    if (typeof parsed.documentType !== "string" || !Array.isArray(parsed.checks)) return null;
    // Sanitasi & normalisasi
    const statuses = ["ok", "warning", "error", "unknown"];
    parsed.checks = (parsed.checks as DocCheck[])
      .slice(0, 8)
      .map((c) => ({
        label: String(c.label ?? "Pemeriksaan").slice(0, 120),
        status: statuses.includes(c.status) ? c.status : "unknown",
        detail: String(c.detail ?? "").slice(0, 400),
      }));
    const severities = ["high", "medium", "low"];
    parsed.issues = Array.isArray(parsed.issues)
      ? (parsed.issues as DocIssue[]).slice(0, 6).map((i) => ({
          severity: severities.includes(i.severity) ? i.severity : "low",
          title: String(i.title ?? "Catatan").slice(0, 150),
          detail: String(i.detail ?? "").slice(0, 500),
          fix: String(i.fix ?? "").slice(0, 400),
        }))
      : [];
    parsed.recommendations = Array.isArray(parsed.recommendations)
      ? parsed.recommendations.slice(0, 5).map((r: unknown) => String(r).slice(0, 300))
      : [];
    parsed.nextSteps = Array.isArray(parsed.nextSteps)
      ? parsed.nextSteps.slice(0, 4).map((r: unknown) => String(r).slice(0, 300))
      : [];
    parsed.confidence = Math.min(100, Math.max(0, Number(parsed.confidence) || 50));
    parsed.legibilityScore = Math.min(100, Math.max(0, Number(parsed.legibilityScore) || 50));
    parsed.relevant = parsed.relevant !== false;
    parsed.summary = String(parsed.summary ?? "").slice(0, 600);
    return parsed as DocResult;
  } catch {
    return null;
  }
}

/** Fallback deterministik bila AI gagal — checklist umum per kategori */
function fallbackResult(category: string): DocResult {
  const byCategory: Record<string, DocCheck[]> = {
    npwp: [
      { label: "Nomor NPWP 16 digit", status: "unknown", detail: "Verifikasi AI tidak tersedia — pastikan nomor 16 digit terbaca jelas" },
      { label: "Nama & NITKU/alamat", status: "unknown", detail: "Pastikan nama persis sama dengan KTP dan alamat terbaru" },
      { label: "Status aktif di Coretax", status: "unknown", detail: "NPWP fisik saja belum cukup — akun Coretax DJP wajib aktif" },
    ],
    nib: [
      { label: "Nomor NIB (13 digit)", status: "unknown", detail: "Pastikan nomor NIB lengkap terbaca" },
      { label: "Tanggal terbit & KBLI 2020", status: "unknown", detail: "Cek kode KBLI sesuai kegiatan usaha Anda" },
      { label: "Status LKPM terlapor", status: "unknown", detail: "NIB tanpa LKPM berkala berisiko dicabut" },
    ],
    ktp: [
      { label: "NIK 16 digit", status: "unknown", detail: "Pastikan 16 digit terbaca tanpa silau" },
      { label: "Foto & tanda tangan", status: "unknown", detail: "KTP harus utuh, tidak terpotong, tidak pudar" },
      { label: "Masa berlaku", status: "unknown", detail: "KTP elektronik berlaku seumur hidup; KTP lama cek masa berlaku" },
    ],
  };
  const generic: DocCheck[] = [
    { label: "Kelengkapan elemen dokumen", status: "unknown", detail: "Verifikasi AI tidak tersedia — pastikan semua kolom penting terlihat utuh" },
    { label: "Keterbacaan foto", status: "unknown", detail: "Gunakan cahaya cukup, foto tegak lurus, tanpa bayangan" },
    { label: "Kondisi fisik dokumen", status: "unknown", detail: "Dokumen sobek/luntur sebaiknya segera diajukan ulang" },
  ];
  const checks = byCategory[category] ?? generic;
  return {
    documentType: CATEGORY_LABEL[category] ?? "Dokumen",
    confidence: 50,
    relevant: true,
    legibilityScore: 50,
    summary: "Analisis AI sedang tidak tersedia, namun berikut checklist pemeriksaan manual yang bisa Anda gunakan sekarang.",
    checks,
    issues: [
      {
        severity: "low",
        title: "Verifikasi otomatis belum lengkap",
        detail: "Layanan AI sedang sibuk atau koneksi terputus.",
        fix: "Coba unggah ulang dalam 1-2 menit, atau hubungi konsultan kami via WhatsApp untuk pemeriksaan manual oleh tim.",
      },
    ],
    recommendations: [
      "Pastikan seluruh dokumen masuk dalam satu bingkai foto",
      "Gunakan permukaan gelap sebagai latar agar tepi dokumen terlihat",
      "Matikan flash jika mengkilap (hindari silau)",
    ],
    nextSteps: [
      "Coba unggah ulang foto yang lebih jelas",
      "Atau chat konsultan kami — pemeriksaan manual gratis",
    ],
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { image, fileName, docCategory } = body ?? {};

    // Validasi kategori
    const category =
      typeof docCategory === "string" && ALLOWED_CATEGORY.includes(docCategory) ? docCategory : "auto";

    // Validasi gambar (data URL base64)
    if (typeof image !== "string" || !image.startsWith("data:")) {
      return NextResponse.json({ success: false, error: "File foto tidak terbaca. Unggah ulang." }, { status: 400 });
    }
    const mimeMatch = image.match(/^data:(image\/[a-zA-Z+]+);base64,/);
    if (!mimeMatch || !ALLOWED_MIME.includes(mimeMatch[1])) {
      return NextResponse.json({ success: false, error: "Format harus JPG, PNG, atau WebP" }, { status: 400 });
    }
    if (image.length > MAX_BASE64_LENGTH) {
      return NextResponse.json(
        { success: false, error: "Ukuran foto maksimal 5 MB. Coba ambil foto yang lebih ringkas." },
        { status: 400 }
      );
    }

    const safeFileName = (typeof fileName === "string" ? fileName : "dokumen.jpg").slice(0, 120);

    // Simpan record dulu (lead — jangan hilang walau AI error)
    const record = await db.documentCheck.create({
      data: {
        fileName: safeFileName,
        docCategory: category,
        fileType: mimeMatch[1],
        fileSize: Math.round((image.length * 3) / 4),
      },
    });

    // Analisis via VLM
    let result: DocResult | null = null;
    let source: "ai" | "fallback" = "ai";
    try {
      const zai = await ZAI.create();
      const contextLabel = CATEGORY_LABEL[category];
      const userPrompt =
        category === "auto"
          ? "Periksa foto dokumen berikut. Deteksi sendiri jenis dokumennya, lalu lakukan pemeriksaan lengkap sesuai format."
          : `Konteks dari user: ${contextLabel}. Periksa foto dokumen berikut sesuai format — konfirmasi atau koreksi jenis dokumennya.`;

      const completion = await zai.chat.completions.createVision({
        messages: [
          { role: "assistant", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: [
              { type: "text", text: userPrompt },
              { type: "image_url", image_url: { url: image } },
            ],
          },
        ],
        thinking: { type: "disabled" },
      });

      const content = completion.choices[0]?.message?.content;
      result = content ? parseAiJson(content) : null;
    } catch (aiError) {
      console.error("[document-checker] AI error:", aiError);
    }

    if (!result) {
      result = fallbackResult(category);
      source = "fallback";
    }

    // Simpan hasil (JSON saja — gambar dibuang)
    await db.documentCheck.update({
      where: { id: record.id },
      data: { result: JSON.stringify(result) },
    });

    return NextResponse.json({ success: true, checkId: record.id, source, result });
  } catch (error) {
    console.error("[document-checker] fatal:", error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan. Coba lagi atau hubungi WhatsApp kami." },
      { status: 500 }
    );
  }
}
