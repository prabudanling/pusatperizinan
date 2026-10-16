// ============================================================
// PUSATPERIZINAN.COM — Parser Katalog Premium v2 (PP-XXX)
// Membaca upload/Katalog_500_Layanan_PusatPerizinan.md →
// menulis src/lib/katalog-v2.ts (dataset typed, single source
// of truth). Toleran terhadap typo file sumber (mis. "ttps://",
// tautan markdown berantakan) + validasi ketat sebelum menulis.
//
// Jalankan: node scripts/parse-katalog-v2.mjs
// ============================================================

import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "upload", "Katalog_500_Layanan_PusatPerizinan.md");
const OUT = path.join(ROOT, "src", "lib", "katalog-v2.ts");

const md = readFileSync(SRC, "utf8");

/* ---------- util ---------- */

const parseRupiah = (s) => {
  const digits = String(s).replace(/[^\d]/g, "");
  return digits ? parseInt(digits, 10) : 0;
};

const parseDiscount = (s) => {
  const m = String(s).match(/([\d]+(?:[.,]\d+)?)\s*%/);
  return m ? parseFloat(m[1].replace(",", ".")) : 0;
};

const slugify = (name) =>
  name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/* ---------- kategori ---------- */

// Peta prefix → (nama, deskripsi) dari seksi "Tentang Kode Item" file sumber.
const CATEGORY_META = {
  BU: { name: "Badan Usaha", desc: "NIB, OSS, PT/CV, BPOM, Halal, SNI, Merek, ISO, dan legalitas badan usaha lainnya." },
  BP: { name: "Bangunan & Properti", desc: "PBG, SLF, AMDAL, UKL-UPL, sertifikat tanah, dan perizinan bangunan & properti." },
  PE: { name: "Pertambangan & Energi", desc: "IUP, IUPK, migas, PLTU/PLTS, sertifikasi listrik, dan perizinan energi." },
  KL: { name: "Kehutanan & Lingkungan", desc: "IPPKH, PBPH, PSDH, limbah B3, PROPER, carbon, dan perizinan lingkungan." },
  TL: { name: "Transportasi & Logistik", desc: "SIUPAL, buku pelaut, pelabuhan, penerbangan, kereta api, dan logistik." },
  KS: { name: "Kesehatan", desc: "SIP, apotek, klinik, RS, laboratorium, alkes, STR, dan perizinan fasilitas kesehatan." },
};

/* ---------- parse detail blocks ---------- */

// Blok detail: "#### `PP-BU-001` — Nama Layanan" diikuti field **Key:** value
// hingga "---" atau heading berikutnya.
const blockRe = /^####\s+`?(PP-[A-Z]{2}-\d{3})`?\s*[—–-]\s*(.+)$/gm;
const fields = [];
let cursor = 0;
let match;

while ((match = blockRe.exec(md)) !== null) {
  if (fields.length) fields[fields.length - 1].body = md.slice(cursor, match.index);
  cursor = match.index;
  fields.push({ code: match[1], name: match[2].trim(), body: "" });
}
if (fields.length) fields[fields.length - 1].body = md.slice(cursor);

const getField = (body, key) => {
  // Single-line field: "**Key:** value" — value sampai akhir baris.
  const re = new RegExp(`\\*\\*\\s*${key}\\s*:?\\s*\\*\\*\\s*:?[ \\t]*(.*)`, "i");
  const m = body.match(re);
  return m ? m[1].trim() : "";
};

const extractSlug = (raw) => {
  // Tahan typo "ttps://" dan sisa markdown "](https://...)"
  const m = String(raw).match(/layanan\/([a-z0-9-]+-pp-[a-z]{2}-\d{3})/i);
  return m ? m[1].toLowerCase() : "";
};

const services = [];
const seenCodes = new Set();
const seenSlugs = new Set();
const warnings = [];

for (const f of fields) {
  const body = f.body;
  const catCode = f.code.split("-")[1];
  if (!CATEGORY_META[catCode]) {
    warnings.push(`${f.code}: kategori tak dikenal "${catCode}" — dilewati`);
    continue;
  }

  const hargaNormal = parseRupiah(getField(body, "Harga Normal"));
  const hargaDiskon = parseRupiah(getField(body, "Harga Diskon"));
  const diskon = parseDiscount(getField(body, "Diskon"));
  const hemat = hargaNormal - hargaDiskon;
  const tautanRaw = getField(body, "Tautan");
  let slug = extractSlug(tautanRaw);

  if (!slug) {
    slug = `${slugify(f.name)}-${f.code.toLowerCase()}`;
    warnings.push(`${f.code}: tautan tak terbaca → slug diturunkan "${slug}"`);
  }

  const name = f.name
    .replace(/\s+/g, " ")
    // Normalisasi typo kapital kecil yang ditemukan di file sumber ("SIup", "SIUP via OSS")
    .trim();

  const svc = {
    code: f.code,
    slug,
    name,
    categoryCode: catCode,
    category: CATEGORY_META[catCode].name,
    normalPrice: hargaNormal,
    discountPct: diskon,
    discountPrice: hargaDiskon || hargaNormal,
    savings: hemat > 0 ? hemat : 0,
    estimate: getField(body, "Estimasi Proses") || "-",
    authority: getField(body, "Lembaga Penerbit") || "-",
    requirements: getField(body, "Syarat Utama") || "",
    validity: getField(body, "Masa Berlaku") || "-",
    notes: getField(body, "Catatan") || "",
    description: getField(body, "Deskripsi") || "",
  };

  if (seenCodes.has(svc.code)) { warnings.push(`DUP kode: ${svc.code}`); continue; }
  if (seenSlugs.has(svc.slug)) { warnings.push(`DUP slug: ${svc.slug}`); continue; }
  if (!svc.name || !svc.discountPrice) { warnings.push(`TIDAK LENGKAP: ${svc.code}`); continue; }

  seenCodes.add(svc.code);
  seenSlugs.add(svc.slug);
  services.push(svc);
}

/* ---------- validasi ketat ---------- */

const byCat = {};
for (const s of services) byCat[s.categoryCode] = (byCat[s.categoryCode] ?? 0) + 1;

console.log("── HASIL PARSE ─────────────────────────────");
console.log(`Total layanan : ${services.length} (target 500)`);
for (const [c, n] of Object.entries(byCat)) console.log(`  PP-${c}: ${n}`);
console.log(`Peringatan    : ${warnings.length}`);
warnings.slice(0, 8).forEach((w) => console.log(`  ⚠️  ${w}`));

const SLUG_RE = /^[a-z0-9-]+-pp-[a-z]{2}-\d{3}$/;
const badSlugs = services.filter((s) => !SLUG_RE.test(s.slug));
if (badSlugs.length) { console.error(`❌ ${badSlugs.length} slug tak valid, mis. ${badSlugs[0].slug}`); process.exit(1); }
if (services.length !== 500) { console.error(`❌ Total ${services.length} ≠ 500 — parser perlu disesuaikan`); process.exit(1); }

/* ---------- statistik ---------- */

const priceMin = Math.min(...services.map((s) => s.discountPrice));
const priceMax = Math.max(...services.map((s) => s.discountPrice));
const totalSavings = services.reduce((a, s) => a + s.savings, 0);
const tier = (p) =>
  p < 2_000_000 ? "entry" : p < 15_000_000 ? "mid" : p < 100_000_000 ? "premium" : "enterprise";

/* ---------- tulis TS ---------- */

const esc = (s) => s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");

const svcToTs = (s) => `  {
    code: ${JSON.stringify(s.code)},
    slug: ${JSON.stringify(s.slug)},
    name: ${JSON.stringify(s.name)},
    categoryCode: ${JSON.stringify(s.categoryCode)},
    category: ${JSON.stringify(s.category)},
    normalPrice: ${s.normalPrice},
    discountPct: ${s.discountPct},
    discountPrice: ${s.discountPrice},
    savings: ${s.savings},
    estimate: ${JSON.stringify(s.estimate)},
    authority: ${JSON.stringify(s.authority)},
    requirements: ${JSON.stringify(s.requirements)},
    validity: ${JSON.stringify(s.validity)},
    notes: ${JSON.stringify(s.notes)},
    description: ${JSON.stringify(s.description)},
  },`;

const ts = `// ============================================================
// PUSATPERIZINAN.COM — KATALOG PREMIUM v2 (kode PP-XXX)
// AUTO-GENERATED oleh scripts/parse-katalog-v2.mjs — JANGAN EDIT
// MANUAL. Sumber: upload/Katalog_500_Layanan_PusatPerizinan.md
// (v1.0 — edisi "Terlengkap Se Asia", 6 kategori, 500 layanan).
// Regenerasi: node scripts/parse-katalog-v2.mjs
// ============================================================

export interface KatalogV2Service {
  /** Kode item resmi, mis. PP-BU-001 */
  code: string;
  /** Slug halaman detail: /layanan/{slug} */
  slug: string;
  name: string;
  categoryCode: "BU" | "BP" | "PE" | "KL" | "TL" | "KS";
  category: string;
  normalPrice: number;
  discountPct: number;
  discountPrice: number;
  savings: number;
  estimate: string;
  authority: string;
  requirements: string;
  validity: string;
  notes: string;
  description: string;
}

export const KATALOG_V2_CATEGORIES: {
  code: keyof typeof CATEGORY_META_V2;
  name: string;
  desc: string;
  count: number;
}[] = [
${Object.entries(CATEGORY_META)
  .map(([code, m]) => `  { code: "${code}", name: ${JSON.stringify(m.name)}, desc: ${JSON.stringify(m.desc)}, count: ${byCat[code] ?? 0} },`)
  .join("\n")}
];

const CATEGORY_META_V2 = {
${Object.entries(CATEGORY_META)
  .map(([code, m]) => `  ${code}: { name: ${JSON.stringify(m.name)}, desc: ${JSON.stringify(m.desc)} },`)
  .join("\n")}
} as const;

export const KATALOG_V2: KatalogV2Service[] = [
${services.map(svcToTs).join("\n")}
];

/** Resolusi slug → layanan v2 (dipakai catch-all /layanan/[...slug]). */
export function resolveKatalogV2(slug: string): KatalogV2Service | undefined {
  return V2_MAP.get(slug);
}

/** Semua slug v2 — dipakai generateStaticParams + sitemap. */
export const KATALOG_V2_SLUGS: string[] = KATALOG_V2.map((s) => s.slug);

const V2_MAP = new Map(KATALOG_V2.map((s) => [s.slug, s]));

/** Layanan satu kategori (untuk related/internal linking). */
export function katalogV2ByCategory(code: string): KatalogV2Service[] {
  return KATALOG_V2.filter((s) => s.categoryCode === code);
}

export const KATALOG_V2_STATS = {
  total: ${services.length},
  categories: ${Object.keys(CATEGORY_META).length},
  priceMin: ${priceMin},
  priceMax: ${priceMax},
  totalSavings: ${totalSavings},
  tiers: {
    entry: ${services.filter((s) => tier(s.discountPrice) === "entry").length},
    mid: ${services.filter((s) => tier(s.discountPrice) === "mid").length},
    premium: ${services.filter((s) => tier(s.discountPrice) === "premium").length},
    enterprise: ${services.filter((s) => tier(s.discountPrice) === "enterprise").length},
  },
} as const;

/** Tier harga untuk badge/filter browser. */
export function katalogV2Tier(price: number): "entry" | "mid" | "premium" | "enterprise" {
  if (price < 2_000_000) return "entry";
  if (price < 15_000_000) return "mid";
  if (price < 100_000_000) return "premium";
  return "enterprise";
}

export { CATEGORY_META_V2 };
`;

writeFileSync(OUT, ts, "utf8");
console.log(`\n✅ Ditulis: ${OUT} (${(ts.length / 1024).toFixed(0)} KB)`);
console.log(`   Harga: Rp${priceMin.toLocaleString("id-ID")} – Rp${priceMax.toLocaleString("id-ID")} · Total hemat katalog: Rp${totalSavings.toLocaleString("id-ID")}`);
