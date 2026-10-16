import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";
import { db } from "@/lib/db";
import { notifyNewLead } from "@/lib/notify";

// ============================================================
// AI ROADMAP GENERATOR — susun roadmap perizinan 12 bulan
// Mesin: z-ai-web-dev-sdk (LLM) — BACKEND ONLY
// ============================================================

interface RoadmapPhase {
  phase: string;
  month: string;
  items: { izin: string; biaya: string; durasi: string; kenapa: string }[];
}

interface RoadmapResult {
  summary: string;
  kbliSuggestion: { code: string; title: string }[];
  phases: RoadmapPhase[];
  totalCostMin: number;
  totalCostMax: number;
  risks: string[];
  nextSteps: string[];
}

const SYSTEM_PROMPT = `Anda adalah konsultan perizinan senior Indonesia dengan pengalaman 10+ tahun menangani ribuan UMKM dan korporasi di seluruh 38 provinsi. Anda ahli dalam: OSS-RBA (PP 5/2021), KBLI 2025, UU Cipta Kerja, perizinan daerah, pajak (PPh final 0,5%, PPN, SPT), sertifikasi produk (Halal SEHATI, BPOM, PIRT, SNI), dan perizinan sektoral.

Tugas Anda: menyusun ROADMAP PERIZINAN 12 BULAN yang sangat praktis untuk pelaku usaha, dari hulu ke hilir.

ATURAN PENTING:
- Gunakan regulasi terkini: OSS-RBA, Coretax DJP, UU 18/2017 untuk PMI, SEHATI untuk halal
- Urutan wajib logis: NIB dulu → sertifikat standar → izin sektoral → sertifikasi produk → kepatuhan rutin
- Estimasi biaya REALISTIS dalam Rupiah (jasa konsultan + PNBP resmi)
- Sebutkan KBLI yang paling sesuai dengan bidang usaha
- Bahasa Indonesia yang mudah dipahami pemilik usaha awam, ramah dan actionable
- Maksimal 4 fase (Bulan 1, Bulan 2-3, Bulan 4-6, Bulan 7-12)

FORMAT RESPONS: JSON SAJA tanpa teks lain, dengan struktur:
{
  "summary": "2-3 kalimat ringkasan kondisi usaha & strategi perizinannya",
  "kbliSuggestion": [{"code": "56101", "title": "Usaha Restoran"}, {"code": "56102", "title": "Usaha Rumah Makan"}],
  "phases": [
    {
      "phase": "Fondasi Legal",
      "month": "Bulan 1",
      "items": [{"izin": "NIB via OSS-RBA", "biaya": "Rp350.000", "durasi": "1 hari kerja", "kenapa": "Fondasi semua legalitas — tanpa ini tidak bisa lanjut"}]
    }
  ],
  "totalCostMin": 500000,
  "totalCostMax": 2500000,
  "risks": ["risiko 1 kalau tidak diurus", "risiko 2"],
  "nextSteps": ["langkah pertama sekarang", "langkah kedua"]
}`;

function parseAiJson(content: string): RoadmapResult | null {
  // Ambil JSON dari respons AI (kadang dibungkus markdown code block)
  const cleaned = content
    .replace(/```json\s*/g, "")
    .replace(/```\s*/g, "")
    .trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1) return null;
  try {
    const parsed = JSON.parse(cleaned.slice(start, end + 1));
    if (!parsed.phases || !Array.isArray(parsed.phases)) return null;
    return parsed as RoadmapResult;
  } catch {
    return null;
  }
}

/** Fallback roadmap deterministik bila AI gagal — tetap berguna untuk user */
function fallbackRoadmap(businessField: string, province: string, scale: string): RoadmapResult {
  const isKuliner = /kulin|resto|makan|kafe|kopi|minum|warung|catering/i.test(businessField);
  const isDigital = /digital|online|app|aplikasi|software|tok(?:o|ko) online|e-?commerce/i.test(businessField);
  const badanUsaha = scale === "perusahaan" ? "Pendirian PT + SK Kemenkumham" : "NIB Perseorangan / PT Perorangan";

  const phases: RoadmapPhase[] = [
    {
      phase: "Fondasi Legal",
      month: "Bulan 1",
      items: [
        { izin: badanUsaha, biaya: scale === "perusahaan" ? "Rp3,5-6,5 juta" : "Rp350.000-750.000", durasi: "1-7 hari kerja", kenapa: "Badan usaha resmi adalah tiket masuk semua perizinan berikutnya." },
        { izin: "NIB + KBLI via OSS-RBA", biaya: "Rp350.000 (jasa; resmi gratis)", durasi: "1 hari kerja", kenapa: "Identitas usaha tunggal — tanpa NIB, tidak bisa izin lain." },
        { izin: "NPWP & aktivasi Coretax", biaya: "Rp150.000", durasi: "1-3 hari", kenapa: "Wajib untuk pajak, rekening bisnis, dan kerja sama B2B." },
      ],
    },
    {
      phase: "Perizinan Operasional",
      month: "Bulan 2-3",
      items: isDigital
        ? [
            { izin: "Sertifikat Standar OSS (sesuai risiko)", biaya: "Rp350.000", durasi: "1-5 hari", kenapa: "Kegiatan usaha Anda menengah rendah — syarat operasional penuh." },
            { izin: "PSE Komdigi (Tanda Daftar PSE)", biaya: "Rp2,5 juta", durasi: "7-21 hari", kenapa: "Wajib untuk website/aplikasi — hindari pemblokiran & patuhi UU PDP." },
            { izin: "Pendaftaran Merek (DJKI)", biaya: "Rp900.000", durasi: "6-12 bulan", kenapa: "Amankan brand sejak dini sebelum terkenal." },
          ]
        : [
            { izin: "Sertifikat Standar OSS (sesuai risiko)", biaya: "Rp350.000", durasi: "1-5 hari", kenapa: "Syarat operasional untuk kegiatan menengah rendah." },
            { izin: "PBG & SLF lokasi usaha", biaya: "Rp2 juta", durasi: "14-30 hari", kenapa: "Syarat buka usaha berbasis lokasi fisik." },
            { izin: isKuliner ? "Sertifikasi Halal (SEHATI)" : "Pendaftaran Merek (DJKI)", biaya: isKuliner ? "Rp1,2 juta (subsidi UMKM tersedia)" : "Rp900.000", durasi: isKuliner ? "14-30 hari" : "6-12 bulan", kenapa: isKuliner ? "Wajib UU JPH + naik kepercayaan pelanggan 40%+" : "Amankan brand sejak dini." },
          ],
    },
    {
      phase: "Sertifikasi Produk & Pasar",
      month: "Bulan 4-6",
      items: isKuliner
        ? [
            { izin: "PIRT / Izin Edar BPOM", biaya: isKuliner ? "Rp2,5 juta" : "Rp2,5 juta", durasi: "30-60 hari", kenapa: "Legal jual produk kemasan di marketplace & toko modern." },
            { izin: "Kemitraan & pendampingan UMKM", biaya: "Gratis (program daerah)", durasi: "Berkelanjutan", kenapa: `Provinsi ${province} punya program UMKM aktif — kami pandu aksesnya.` },
          ]
        : [
            { izin: "ISO 9001 / sertifikasi mutu (opsional)", biaya: "Rp12,5 juta", durasi: "60-90 hari", kenapa: "Kredibilitas tender & klien korporat." },
            { izin: "Kepatuhan pajak bulanan mulai", biaya: "Rp750rb/bln (jasa)", durasi: "Berkelanjutan", kenapa: "PPh final 0,5% / SPT Masa — hindari denda & sanksi." },
          ],
    },
    {
      phase: "Kepatuhan & Pertumbuhan",
      month: "Bulan 7-12",
      items: [
        { izin: "LKPM berkala di OSS", biaya: "Rp1,5 juta/tahun", durasi: "2-5 hari per periode", kenapa: "Wajib — tanpa ini NIB bisa dicabut & RPTKA/tender terhambat." },
        { izin: "SPT Tahunan pertama", biaya: "Rp250rb-2,5 jt (jasa)", durasi: "1-3 hari kerja", kenapa: "Kepatuhan tahunan yang menentukan profil pajak Anda." },
        { izin: "Evaluasi ekspansi (cabang, ekspor, TKA)", biaya: "Konsultasi gratis", durasi: "Sesuai rencana", kenapa: "Dokumen rapi = siap ekspansi kapan pun." },
      ],
    },
  ];

  return {
    summary: `Roadmap perizinan untuk usaha ${businessField} di ${province} (${scale}). Strategi: bangun fondasi legal di bulan pertama, operasional penuh bulan 2-3, lalu sertifikasi & kepatuhan rutin. Total investasi legal yang wajar memastikan usaha Anda berjalan tanpa risiko denda atau pencabutan.`,
    kbliSuggestion: isDigital
      ? [{ code: "47911", title: "Perdagangan Eceran via Media Daring" }, { code: "62011", title: "Pengembangan Software Custom" }]
      : isKuliner
        ? [{ code: "56101", title: "Usaha Restoran" }, { code: "56102", title: "Usaha Rumah Makan" }]
        : [{ code: "47919", title: "Perdagangan Eceran Lainnya" }, { code: "70201", title: "Konsultasi Manajemen Umum" }],
    phases,
    totalCostMin: 1500000,
    totalCostMax: 8500000,
    risks: [
      "Beroperasi tanpa NIB = risiko sanksi administratif & tidak bisa ikut tender/kredit bank",
      "LKPM tidak dilaporkan → NIB bisa dicabut & perpanjangan izin terhambat",
      "Produk makanan tanpa halal/PIRT = denda & ditarik dari peredaran",
      "Tidak lapor SPT = denda Rp100.000/tahun + SP2DK dari DJP",
    ],
    nextSteps: [
      "Klik tombol WhatsApp di bawah — kirim roadmap ini ke konsultan kami",
      "Siapkan KTP & NPWP untuk mulai langkah pertama (1 hari kerja)",
      "Jadwalkan konsultasi gratis untuk finalisasi kode KBLI terbaik",
    ],
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, whatsapp, businessField, province, scale, capital, plan } = body ?? {};

    // Validasi
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ success: false, error: "Nama wajib diisi (min 2 karakter)" }, { status: 400 });
    }
    const waDigits = (whatsapp ?? "").replace(/\D/g, "");
    if (waDigits.length < 9 || waDigits.length > 15) {
      return NextResponse.json({ success: false, error: "Nomor WhatsApp tidak valid" }, { status: 400 });
    }
    if (!businessField || typeof businessField !== "string" || businessField.trim().length < 3) {
      return NextResponse.json({ success: false, error: "Bidang usaha wajib diisi (min 3 karakter)" }, { status: 400 });
    }

    const scaleSafe = ["individu", "umkm", "perusahaan"].includes(scale) ? scale : "umkm";
    const capitalSafe = typeof capital === "string" ? capital.slice(0, 50) : "50-500jt";
    const planSafe = typeof plan === "string" ? plan.slice(0, 300) : "";

    // Simpan request dulu (lead premium — jangan hilang walau AI error)
    const record = await db.roadmapRequest.create({
      data: {
        name: name.trim().slice(0, 100),
        whatsapp: waDigits,
        businessField: businessField.trim().slice(0, 200),
        province: (province ?? "DKI Jakarta").slice(0, 60),
        scale: scaleSafe,
        capital: capitalSafe,
        plan: planSafe || null,
      },
    });

    // 🔔 Lead premium (roadmap 12 bulan) → notifikasi real-time (fire-and-forget)
    void notifyNewLead({
      leadId: record.id,
      name: record.name,
      whatsapp: record.whatsapp,
      businessType: record.businessField,
      package: "Roadmap AI 12 Bulan",
      source: "roadmap",
      notes: `${record.businessField} • ${record.province} • skala ${record.scale} • modal ${record.capital}${record.plan ? ` • rencana: ${record.plan}` : ""}`,
    });

    // Generate roadmap via AI
    let roadmap: RoadmapResult | null = null;
    let source: "ai" | "fallback" = "ai";
    try {
      const zai = await ZAI.create();
      const userPrompt = `Susun roadmap perizinan 12 bulan untuk:
- Bidang usaha: ${businessField}
- Lokasi: ${province}, Indonesia
- Skala usaha: ${scaleSafe === "individu" ? "pebisnis individu/freelancer" : scaleSafe === "umkm" ? "UMKM (usaha kecil-menengah, 1-20 karyawan)" : "perusahaan (badan usaha, tim besar)"}
- Modal awal: ${capitalSafe}
${planSafe ? `- Rencana tambahan: ${planSafe}` : ""}

Berikan roadmap 12 bulan lengkap dengan estimasi biaya & durasi yang realistis untuk kondisi ini.`;

      const completion = await zai.chat.completions.create({
        messages: [
          { role: "assistant", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        thinking: { type: "disabled" },
      });

      const content = completion.choices[0]?.message?.content;
      roadmap = content ? parseAiJson(content) : null;
    } catch (aiError) {
      console.error("[roadmap] AI error:", aiError);
    }

    if (!roadmap) {
      roadmap = fallbackRoadmap(businessField, province ?? "Indonesia", scaleSafe);
      source = "fallback";
    }

    // Simpan hasil ke DB
    await db.roadmapRequest.update({
      where: { id: record.id },
      data: { result: JSON.stringify(roadmap) },
    });

    return NextResponse.json({ success: true, roadmapId: record.id, source, roadmap });
  } catch (error) {
    console.error("[roadmap] fatal:", error);
    return NextResponse.json({ success: false, error: "Terjadi kesalahan. Coba lagi atau hubungi WhatsApp kami." }, { status: 500 });
  }
}
