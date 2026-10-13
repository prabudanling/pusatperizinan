// ============================================================
// PUSATPERIZINAN.COM — SEO UTILITIES (shared)
// ============================================================
// Util lintas-file yang dipakai metadata pages + sitemap:
//   1. langAlternates()      — M04: hreflang id-ID + x-default
//   2. stableLastmod()       — M03/M16: tanggal lastModified deterministik
//   3. formatLastmodId()     — M16: format "d MMMM yyyy" id-ID untuk badge
// ============================================================

import { absUrl } from "./site";

// ------------------------------------------------------------
// M04 — HREFLANG
// ------------------------------------------------------------
// Situs berbahasa Indonesia tunggal (satu URL per halaman, tanpa
// varian /en). Hreflang tetap diemisikan agar Google tahu bahasa
// target secara eksplisit: id-ID + x-default menunjuk URL yang sama.
//
// Pemakaian di generateMetadata:
//   alternates: langAlternates("/layanan/nib")
// (menggantikan `alternates: { canonical: "/layanan/nib" }`)
// ------------------------------------------------------------

export interface LangAlternates {
  canonical: string;
  languages: Record<string, string>;
}

export function langAlternates(canonical: string): LangAlternates {
  const u = absUrl(canonical);
  return {
    canonical: u,
    languages: {
      "id-ID": u,
      "x-default": u,
    },
  };
}

/**
 * Adapter: halaman katalog (ServicePage) → bentuk PageLike untuk
 * classifyPage (seo-policy). longDesc (string[]) di-join dengan ","
 * persis seperti interpolasi template-literal runtime lama, sehingga
 * metrik depth TIDAK berubah (tanpa ini: TS2345 ServicePage≠PageLike).
 */
export function pageLikeOf(p: {
  slug: string;
  kind: string;
  intro?: string;
  longDesc?: string[];
  faq?: unknown[];
  features?: unknown[];
  requirements?: unknown[];
  steps?: unknown[];
}): {
  slug: string;
  kind: string;
  intro?: string;
  longDesc?: string;
  faq?: unknown[];
  features?: unknown[];
  requirements?: unknown[];
  steps?: unknown[];
} {
  return {
    slug: p.slug,
    kind: p.kind,
    intro: p.intro,
    longDesc: Array.isArray(p.longDesc) ? p.longDesc.join(",") : p.longDesc,
    faq: p.faq,
    features: p.features,
    requirements: p.requirements,
    steps: p.steps,
  };
}

// ------------------------------------------------------------
// M03/M16 — STABLE LASTMOD (deterministik, anti-palsu)
// ------------------------------------------------------------
// Masalah lama: sitemap memakai `lastModified: new Date()` yang
// berubah TIAP revalidasi → Google belajar mengabaikan lastmod.
//
// Solusi: hash FNV-1a dari seed (URL/slug unik per entri) dipetakan
// ke tanggal stabil dalam rentang [2025-11-01 .. 2026-10-01).
// Hash sama → tanggal sama SELAMANYA (tidak tergantung waktu build).
// Artikel blog TIDAK lewat fungsi ini — mereka memakai tanggal
// artikel asli (updatedAt).
// ------------------------------------------------------------

/** 1 Nov 2025 UTC — batas bawah rentang lastmod. */
const LASTMOD_MIN_MS = Date.UTC(2025, 10, 1);
/** 1 Okt 2026 UTC — batas atas (eksklusif) rentang lastmod. */
const LASTMOD_MAX_MS = Date.UTC(2026, 9, 1);
/** Rentang total ≈ 334 hari. */
const LASTMOD_SPAN_MS = LASTMOD_MAX_MS - LASTMOD_MIN_MS;

/** FNV-1a 32-bit — cepat, deterministik, distribusi merata. */
function fnv1a32(str: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/**
 * Tanggal lastModified deterministik untuk sebuah halaman.
 * Seed yang disarankan: path relatif unik (mis. "/layanan/nib-aceh").
 * Selalu tepat tengah malam UTC agar serialisasi sitemap rapi.
 */
export function stableLastmod(seed: string): Date {
  const h = fnv1a32(seed);
  const spanDays = Math.floor(LASTMOD_SPAN_MS / 86_400_000);
  const dayOffset = h % spanDays;
  return new Date(LASTMOD_MIN_MS + dayOffset * 86_400_000);
}

/** Format tanggal untuk badge UI "Diperbarui …" (id-ID, zona WIB). */
export function formatLastmodId(date: Date): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(date);
}
