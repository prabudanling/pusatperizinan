// ============================================================
// PUSATPERIZINAN.COM — Chat Sales Engine
// Konfigurasi mesin penjualan AI chat: menu harga (sumber
// kebenaran tunggal), suggestions per stage sales funnel,
// tool links untuk cross-sell, dan deteksi intent rule-based
// (nilai awal stage sebelum AI refine).
// Dipakai oleh: src/app/api/chat/route.ts
// ============================================================

export type Stage = "discovery" | "comparing" | "ready" | "captured";

// ---------- 1. MENU HARGA (dipakai system prompt — AI tidak boleh mengarang angka) ----------

export interface PriceItem {
  name: string;
  price: string;
  detail?: string;
}

export const PRICE_MENU: PriceItem[] = [
  { name: "NIB UMKM", price: "mulai Rp 350rb", detail: "paling cepat, untuk usaha risiko rendah" },
  {
    name: "Paket UMKM (NIB + Sertifikat Standar + NPWP)",
    price: "Rp 750rb–1,5jt",
    detail: "paling laris, langsung siap operasional",
  },
  {
    name: "Pendirian PT",
    price: "mulai Rp 3,5jt",
    detail: "sudah termasuk notaris + SK Menkumham + NIB + NPWP",
  },
  { name: "Pendirian CV", price: "mulai Rp 1,5jt", detail: "cocok usaha keluarga / kemitraan" },
  {
    name: "PT PMA (investor asing)",
    price: "konsultasi (mulai Rp 15jt)",
    detail: "termasuk struktur modal & OSS",
  },
  {
    name: "Sertifikasi Halal (bantu proses)",
    price: "mulai Rp 500rb",
    detail: "sertifikat pemerintah GRATIS via Sehati, kami yang kejar prosesnya",
  },
  { name: "BPOM ML", price: "mulai Rp 5jt", detail: "izin edar pangan & kosmetik" },
  { name: "PBG / SLF", price: "mulai Rp 1,5jt", detail: "perizinan bangunan gedung" },
  { name: "Izin lingkungan SPPL", price: "mulai Rp 750rb", detail: "untuk dampak lingkungan rendah" },
];

/** Render menu harga jadi bullet text untuk system prompt */
export function priceMenuText(): string {
  return PRICE_MENU.map((p) => `• ${p.name}: ${p.price}${p.detail ? ` (${p.detail})` : ""}`).join("\n");
}

// ---------- 2. SUGGESTIONS PER STAGE (quick replies dinamis di widget) ----------

export const SUGGESTIONS_BY_STAGE: Record<Stage, string[]> = {
  discovery: [
    "Pendirian PT berapa biayanya?",
    "NIB untuk usaha saya",
    "Paket UMKM apa saja?",
    "Konsultasi gratis",
  ],
  comparing: [
    "PT vs CV mana lebih cocok?",
    "Berapa lama prosesnya?",
    "Harga lengkap donk",
    "Bisa cicil tidak?",
  ],
  ready: ["Ya, konsultasi gratis!", "Bantu urus dari awal", "Tanya dulu beberapa hal"],
  captured: [
    "Bikin Roadmap izin 12 bulan",
    "Hitung pajak usaha saya",
    "Cek dokumen saya",
    "Info lowongan kerja",
  ],
};

/** Versi English sederhana (dipakai hanya bila lang === "en") */
const SUGGESTIONS_BY_STAGE_EN: Record<Stage, string[]> = {
  discovery: [
    "How much to set up a PT?",
    "NIB for my business",
    "What's in the SME package?",
    "Free consultation",
  ],
  comparing: [
    "PT vs CV — which fits me?",
    "How long does it take?",
    "Full price list please",
    "Can I pay in installments?",
  ],
  ready: ["Yes, free consultation!", "Handle it from start", "A few questions first"],
  captured: [
    "Build a 12-month license roadmap",
    "Calculate my business tax",
    "Check my documents",
    "Job openings",
  ],
};

/** Suggestions sesuai bahasa: hanya "en" yang pakai English, selain id/en → Indonesia */
export function getSuggestions(stage: Stage, lang?: string): string[] {
  const map = lang === "en" ? SUGGESTIONS_BY_STAGE_EN : SUGGESTIONS_BY_STAGE;
  return map[stage] ?? SUGGESTIONS_BY_STAGE.discovery;
}

// ---------- 3. TOOL LINKS (cross-sell — dipakai system prompt) ----------

export interface ToolLink {
  path: string;
  description: string;
}

export const TOOL_LINKS: Record<string, ToolLink> = {
  "Roadmap Izin AI": {
    path: "/roadmap",
    description: "buat rencana perizinan 12 bulan yang dipersonalisasi untuk usaha Kakak",
  },
  "Kalkulator Pajak": {
    path: "/kalkulator-pajak",
    description: "hitung sendiri PPh 21, PPh final UMKM, PPN & pajak properti dengan rumus resmi",
  },
  "Database KBLI": {
    path: "/kbli",
    description: "cari kode KBLI yang tepat beserta tingkat risiko & izin turunannya",
  },
  "Perbandingan Badan Usaha": {
    path: "/perbandingan",
    description: "bandingkan PT vs CV vs PT Perorangan dll, aspek per aspek",
  },
  "AI Cek Dokumen": {
    path: "/cek-dokumen",
    description: "periksa kelengkapan KTP/NPWP/NIB Kakak cukup dengan foto",
  },
  "Lowongan Kerja": {
    path: "/lowongan",
    description: "info karir & lowongan terbuka di lingkungan perusahaan kami",
  },
};

/** Render tool links jadi bullet text untuk system prompt */
export function toolLinksText(): string {
  return Object.entries(TOOL_LINKS)
    .map(([name, tool]) => `• ${name} (${tool.path}): ${tool.description}`)
    .join("\n");
}

// ---------- 4. STAGE ORDER ----------

export const STAGE_ORDER: Stage[] = ["discovery", "comparing", "ready", "captured"];

export function nextStage(current: Stage): Stage {
  const i = STAGE_ORDER.indexOf(current);
  if (i === -1) return "discovery";
  return STAGE_ORDER[Math.min(i + 1, STAGE_ORDER.length - 1)];
}

// ---------- 5. DETEKSI INTENT (rule-based, nilai awal sebelum AI refine) ----------

const READY_WORDS = [
  "mau",
  "daftar",
  "urus",
  "butuh",
  "sekalian",
  "konsultasi gratis",
  "konsultasinya",
  "mulai proses",
  "langsung proses",
  "bantu urus",
  "hubungi saya",
  "whatsapp saya",
  "nomor saya",
  "wa saya",
  "want to",
  "i need",
  "register",
  "sign up",
];

const COMPARING_WORDS = [
  "harga",
  "biaya",
  "berapa",
  "tarif",
  "ongkos",
  "mahal",
  "murah",
  "cicil",
  "cicilan",
  "promo",
  "diskon",
  " vs ",
  "vs.",
  "banding",
  "lebih cocok",
  "price",
  "cost",
  "how much",
  "compare",
];

const TOPIC_RULES: Array<[string, RegExp]> = [
  ["PT PMA", /\bpma\b|investor asing|foreign investor/],
  ["PT", /\bpt\b|perseroan terbatas/],
  ["CV", /\bcv\b|commanditaire/],
  ["NIB/OSS", /\bnib\b|\boss\b/],
  ["Sertifikasi Halal", /halal/],
  ["BPOM/PIRT", /bpom|\bpirt\b|izin edar/],
  ["PBG/SLF", /\bpbg\b|\bslf\b|\bimb\b|bangunan gedung/],
  ["Pajak", /pajak|\bpph\b|\bppn\b|\bnpwp\b|tax/],
  ["KBLI", /\bkbli\b/],
  ["Izin Lingkungan", /lingkungan|\bsppl\b|amdal|ukl-upl/],
  ["UMKM", /umkm|usaha mikro|usaha kecil|sme|ukm/],
  ["Perizinan Umum", /izin|perizinan|permit|licen[cs]e/],
];

function detectTopic(lowerText: string): string | undefined {
  for (const [topic, re] of TOPIC_RULES) {
    if (re.test(lowerText)) return topic;
  }
  return undefined;
}

/**
 * Deteksi intent sederhana dari pesan user:
 * - ada nomor WA → captured (sudah menitipkan kontak)
 * - mau/daftar/urus/butuh/sekalian → ready
 * - harga/biaya/berapa → comparing
 * - sisanya → discovery
 */
export function detectIntent(message: string): { stage: Stage; topic?: string } {
  const text = ` ${message.toLowerCase().replace(/[|,;]/g, " ")} `;
  const topic = detectTopic(text);

  if (/(?:\+?62|0)8[0-9]{7,13}/.test(text)) return { stage: "captured", topic };
  if (READY_WORDS.some((w) => text.includes(w))) return { stage: "ready", topic };
  if (COMPARING_WORDS.some((w) => text.includes(w))) return { stage: "comparing", topic };
  return { stage: "discovery", topic };
}
