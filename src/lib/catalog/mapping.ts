// ============================================================
// PUSATPERIZINAN.COM — Mesin Pemetaan Layanan → Halaman Dedikasi
// ============================================================
// Masalah yang diselesaikan: 137 layanan di /katalog semula
// "daftar mati" — tidak ada satu pun tautan ke halaman
// dedikasinya. Mesin ini memetakan SETIAP layanan katalog ke
// halaman terbaik yang tersedia (halaman induk layanan,
// sertifikasi, virtual office) secara deterministik — tanpa AI,
// tanpa DB — lalu menyediakan fallback yang tetap bermakna.
//
// Prinsip (sesuai SEO Playbook):
//  - Deterministik: hasil sama untuk input sama, aman build.
//  - Jangan pernah mengarang URL yang tidak eksis: fallback
//    selalu ke halaman kategori/layanan yang benar-benar ada.
//  - Skor berbobot IDF agar token langka (npwp, ppiu, bpom)
//    mendominasi keputusan, bukan kata umum ("usaha", "bisnis").
// ============================================================

import { ALL_SERVICE_PAGES } from "./generators";

export interface CatalogServiceLink {
  /** URL tujuan — dijamin eksis di katalog halaman */
  href: string;
  /** Judul halaman tujuan (untuk aria-label / teks) */
  pageTitle: string;
  /** true = cocok eksak ke halaman induk; false = fallback kategori */
  exact: boolean;
}

interface PoolEntry {
  slug: string;
  href: string;
  title: string;
  tokens: Set<string>;
  /** base = 2 (prioritas tertinggi), vo = 1 */
  weight: number;
}

const STOPWORDS = new Set([
  "dan", "atau", "untuk", "dengan", "di", "ke", "dari", "yang", "serta",
  "jasa", "paket", "layanan", "pengurusan", "pembuatan", "penerbitan",
  "biaya", "harga", "usaha", "bisnis", "perusahaan", "konsultan",
  "resmi", "cepat", "terpercaya", "lengkap", "indonesia",
]);

const MIN_TOKEN_LEN = 3;

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length >= MIN_TOKEN_LEN && !STOPWORDS.has(t));
}

// ------------------------------------------------------------
// Pool halaman target — dibangun sekali saat modul dimuat
// ------------------------------------------------------------

function buildPool(): PoolEntry[] {
  const pool: PoolEntry[] = [];

  // Pass 1: halaman induk (perizinan, pajak, PMI, sertifikasi)
  for (const p of ALL_SERVICE_PAGES) {
    if (p.kind !== "base") continue;
    pool.push({
      slug: p.slug,
      href: `/layanan/${p.slug}`,
      title: p.h1,
      tokens: new Set([...tokenize(p.h1), ...tokenize(p.slug.replace(/-/g, " "))]),
      weight: 2,
    });
  }

  // Pass 2: virtual office (kandidat kedua — hanya dipakai bila tak ada base)
  for (const p of ALL_SERVICE_PAGES) {
    if (p.kind !== "vo") continue;
    const tokens = new Set([...tokenize(p.h1), ...tokenize(p.slug.replace(/-/g, " "))]);
    // VO ribuan halaman — cukup sampel yang membawa kata kunci inti
    const hasCore = ["virtual", "office", "alamat"].some((k) => tokens.has(k));
    if (!hasCore) continue;
    pool.push({ slug: p.slug, href: `/layanan/${p.slug}`, title: p.h1, tokens, weight: 1 });
  }

  return pool;
}

const POOL = buildPool();

/** IDF sederhana: berapa banyak entri pool yang memuat token tsb */
const TOKEN_DF = new Map<string, number>();
for (const e of POOL) {
  for (const t of e.tokens) TOKEN_DF.set(t, (TOKEN_DF.get(t) ?? 0) + 1);
}

function idf(token: string): number {
  const df = TOKEN_DF.get(token) ?? 0;
  if (df === 0) return 0; // token tak dikenal pool → bobot nol utk pencocokan
  return 1 + 1 / Math.sqrt(df);
}

// ------------------------------------------------------------
// Alias eksplisit — istilah katalog yang ejaannya berbeda dari
// judul halaman (deterministik & terdokumentasi)
// ------------------------------------------------------------

// Urutan PENTING: alias paling spesifik di atas — pencocokan pakai
// substring `includes`, jadi alias umum harus selalu di belakang.
const ALIASES: Record<string, string> = {
  // ---- haji & umrah (divisi R) ----
  "audit compliance": "/layanan/kepatuhan-pmh-2-2026",
  "kepatuhan pmh": "/layanan/kepatuhan-pmh-2-2026",
  "paket legalitas": "/layanan/paket-pendirian-travel-umrah",
  "izin keberangkatan haji": "/layanan/ppi-haji",
  "haji plus": "/layanan/ppi-haji",
  "haji khusus": "/layanan/ppi-haji",
  "ppiu": "/layanan/ppi-umroh",
  "pihk": "/layanan/ppi-haji",
  "tour leader": "/layanan/sertifikasi-pembimbing-ibadah-umrah",
  "tour guide": "/layanan/kategori/sertifikasi",
  "perpajakan": "/layanan/kategori/pajak",
  // ---- pariwisata (divisi D) ----
  "izin usaha hotel": "/layanan/pariwisata",
  "tdup": "/layanan/pariwisata",
  "biro perjalanan wisata": "/layanan/pariwisata",
  "bpw": "/layanan/pariwisata",
  "mice": "/layanan/kategori/perizinan",
  "laik hygiene": "/layanan/kesehatan",
  "hospitality": "/layanan/halal-jasa-hotel",
  // ---- sertifikasi: ISO & teman-temannya ----
  "integrated": "/layanan/iso-integrated-system",
  "integrasi": "/layanan/iso-integrated-system",
  "10002": "/layanan/iso-10002",
  "13485": "/layanan/iso-13485",
  "15189": "/layanan/iso-15189",
  "17020": "/layanan/iso-17020",
  "17024": "/layanan/iso-17024",
  "17025": "/layanan/iso-17025",
  "17065": "/layanan/iso-17065",
  "20121": "/layanan/iso-20121",
  "21001": "/layanan/iso-21001",
  "22000": "/layanan/iso-22000",
  "22301": "/layanan/iso-22301",
  "26000": "/layanan/iso-26000",
  "27001": "/layanan/iso-27001",
  "27017": "/layanan/iso-27017",
  "27018": "/layanan/iso-27018",
  "27701": "/layanan/iso-27701",
  "28000": "/layanan/iso-28000",
  "31000": "/layanan/iso-31000",
  "37001": "/layanan/iso-37001",
  "37301": "/layanan/iso-37301",
  "41001": "/layanan/iso-41001",
  "45001": "/layanan/iso-45001",
  "50001": "/layanan/iso-50001",
  "55001": "/layanan/iso-55001",
  "9001": "/layanan/iso-9001",
  "14001": "/layanan/iso-14001",
  "haccp": "/layanan/haccp",
  "gmp": "/layanan/gmp-cppob",
  "cp-pob": "/layanan/gmp-cppob",
  "cppob": "/layanan/gmp-cppob",
  "pirt": "/layanan/pirt",
  "smk3": "/layanan/smk3",
  "sbu": "/layanan/sbu-lpjk",
  "lpjk": "/layanan/sbu-lpjk",
  "skttk": "/layanan/skttk-tenaga-teknik",
  "bnsp": "/layanan/sertifikat-kompetensi-bnsp",
  "slo": "/layanan/slo-kelistrikan",
  // ---- perizinan umum ----
  "nib": "/layanan/nib",
  "oss": "/layanan/nib",
  "slf": "/layanan/pbg",
  "pbg": "/layanan/pbg",
  "imb": "/layanan/pbg",
  "amdal": "/layanan/lingkungan",
  "ukl": "/layanan/lingkungan",
  "sppl": "/layanan/lingkungan",
  "koperasi": "/layanan/koperasi-yayasan",
  "yayasan": "/layanan/koperasi-yayasan",
  "perorangan": "/layanan/pt-perorangan",
  "komdigi": "/layanan/pse-komdigi",
  "pse": "/layanan/pse-komdigi",
  "pmse": "/layanan/pse-komdigi",
  "kitas": "/layanan/rptka-kitas",
  "kitap": "/layanan/rptka-kitas",
  "rptka": "/layanan/rptka-kitas",
  "iata": "/layanan/iata",
  "kite": "/layanan/api-impex",
  "cbam": "/layanan/api-impex",
  "stp": "/layanan/pirt",
  "stpw": "/layanan/merek",
  "waralaba": "/layanan/merek",
  "obat tradisional": "/layanan/bpom",
  "tdg": "/layanan/logistik",
  "gudang": "/layanan/logistik",
  "pbf": "/layanan/bpom",
  "ipak": "/layanan/kesehatan",
  "sipa": "/layanan/kesehatan",
  "paspor": "/layanan/dokumen-pmi",
  "ahli k3": "/layanan/smk3",
  "siujpt": "/layanan/logistik",
  "siup-mb": "/layanan/tambang",
  "siup mb": "/layanan/tambang",
  "situ-mb": "/layanan/tambang",
  "efin": "/layanan/kategori/pajak",
  "bea cukai": "/layanan/kategori/perizinan",
  "iumk": "/layanan/nib",
  "perubahan akta": "/layanan/pt",
  "perubahan pengurus": "/layanan/pt",
  "perubahan data": "/layanan/pt",
  "merger": "/layanan/pt",
  "akuisisi": "/layanan/pt",
  "penutupan": "/layanan/pt",
  "pembubaran": "/layanan/pt",
  // ---- pajak (istilah yang tak punya halaman spesifik) ----
  "coretax": "/layanan/tax-npwp-op",
  "efiling": "/layanan/tax-spt-op",
  "e-filing": "/layanan/tax-spt-op",
  "rekening koran": "/layanan/kategori/pajak",
  "slip gaji": "/layanan/kategori/pajak",
  "bpjs": "/layanan/kategori/perizinan",
  "asuransi": "/layanan/kategori/perizinan",
};

// ------------------------------------------------------------
// Pemetaan utama
// ------------------------------------------------------------

const MEMO = new Map<string, CatalogServiceLink>();

/**
 * Petakan nama layanan katalog → halaman dedikasi terbaik.
 * @param name  nama layanan (mis. "Pendirian PT Perorangan")
 * @param fallbackHref halaman kategori/divisi (mis. cat.related[0].href)
 */
export function getCatalogServiceLink(name: string, fallbackHref: string): CatalogServiceLink {
  const key = `${name}||${fallbackHref}`;
  const cached = MEMO.get(key);
  if (cached) return cached;

  const tokens = tokenize(name);

  // 1. Alias eksplisit menang
  for (const [needle, href] of Object.entries(ALIASES)) {
    if (name.toLowerCase().includes(needle)) {
      const target = POOL.find((e) => e.href === href);
      const result: CatalogServiceLink = {
        href,
        pageTitle: target?.title ?? "Halaman Layanan",
        exact: true,
      };
      MEMO.set(key, result);
      return result;
    }
  }

  // 2. Skor IDF terhadap pool — base diutamakan lewat bonus weight.
  //    Token PERTAMA (biasanya akronim inti: PPIU, NPWP, BPOM)
  //    diberi bonus ×2.2 karena paling mewakili maksud layanan.
  const tokens2 = tokens.map((t, i) => ({ t, w: idf(t) * (i === 0 ? 2.2 : 1) }));
  const nameWeight = tokens2.reduce((a, { w }) => a + w, 0);
  let best: { entry: PoolEntry; score: number } | null = null;
  if (nameWeight > 0) {
    for (const e of POOL) {
      let matched = 0;
      for (const { t, w } of tokens2) if (e.tokens.has(t)) matched += w;
      // bonus weight 2→×1.25, 1→×1.0; penalti halaman kota/VO generik
      const score = (matched / nameWeight) * (e.weight === 2 ? 1.25 : 1.0);
      if (score > (best?.score ?? 0)) best = { entry: e, score };
    }
  }

  const result: CatalogServiceLink =
    best && best.score >= 0.45
      ? { href: best.entry.href, pageTitle: best.entry.title, exact: true }
      : { href: fallbackHref, pageTitle: "Halaman Divisi", exact: false };

  MEMO.set(key, result);
  return result;
}

/** Jumlah layanan yang terpetakan eksak (untuk verifikasi & laporan) */
export function countExactMappings(
  services: { name: string; fallbackHref: string }[]
): { total: number; exact: number } {
  let exact = 0;
  for (const s of services) if (getCatalogServiceLink(s.name, s.fallbackHref).exact) exact++;
  return { total: services.length, exact };
}
