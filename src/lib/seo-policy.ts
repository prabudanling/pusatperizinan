// ============================================================
// PUSATPERIZINAN.COM — SEO Quality Policy (P0-03, ATURAN 7)
// ============================================================
// Setiap halaman katalog dinilai dari KONTEN NYATANYA (bukan
// klaim generator) dan diklasifikasi:
//
//   A  INDEX            — konten unik mendalam, wajib indeks
//   B  INDEX            — konten lokal unik, indeks normal
//   C  INDEX-BUT-REVIEW — lolos ambang, tapi masuk daftar pantau GSC
//   D  NOINDEX,FOLLOW   — tipis; jangan diindeks, tetap bisa di-crawl
//   E  REMOVE           — tidak layak eksis (ditolak dari sitemap)
//
// Metrik depth = prosa (intro+longDesc) + FAQ×60 + bullet×25 —
// halaman katalog yang kaya di bagian FAQ/syarat/langkah tidak
// lagi salah ditandai tipis.
//
// Sitemap MEMBUANG tier D/E; generateMetadata menyetel noindex utk D/E.
// Naikkan/turunkan ambang berdasarkan data Coverage GSC 60 hari.
// ============================================================

export type QualityTier = "A" | "B" | "C" | "D" | "E";

export interface QualityDecision {
  tier: QualityTier;
  index: boolean;
  label: string;
  metrics: {
    proseChars: number;
    faqCount: number;
    bullets: number;
    depth: number;
  };
}

interface PageLike {
  slug: string;
  kind: string;
  intro?: string;
  longDesc?: string;
  faq?: unknown[];
  features?: unknown[];
  requirements?: unknown[];
  steps?: unknown[];
}

/** Ambang default — ubah di sini saja. */
export const THRESHOLDS = {
  /** depth minimal agar dianggap layak indeks */
  minDepth: 500,
  /** depth minimal agar tidak dinilai tipis */
  floorDepth: 250,
} as const;

export function classifyPage(page: PageLike): QualityDecision {
  const proseChars = `${page.intro ?? ""} ${page.longDesc ?? ""}`.trim().length;
  const faqCount = Array.isArray(page.faq) ? page.faq.length : 0;
  const bullets = [
    ...(Array.isArray(page.features) ? page.features : []),
    ...(Array.isArray(page.requirements) ? page.requirements : []),
    ...(Array.isArray(page.steps) ? page.steps : []),
  ].length;

  const depth = proseChars + faqCount * 60 + bullets * 25;
  const metrics = { proseChars, faqCount, bullets, depth };

  if (depth < 80) {
    return { tier: "E", index: false, label: "REMOVE", metrics };
  }
  if (depth < THRESHOLDS.floorDepth) {
    return { tier: "D", index: false, label: "NOINDEX,FOLLOW", metrics };
  }
  if (depth >= THRESHOLDS.minDepth) {
    return { tier: "B", index: true, label: "INDEX", metrics };
  }
  return { tier: "C", index: true, label: "INDEX-BUT-REVIEW", metrics };
}
