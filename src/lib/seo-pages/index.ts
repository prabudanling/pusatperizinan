// ============================================================
// PUSATPERIZINAN.COM — Agregator Halaman SEO Ekspansi
// Single entry untuk sitemap, audit & routing:
//   • /biaya/{slug}         — 110 halaman biaya
//   • /syarat/{slug}        — 110 halaman syarat
//   • /industri/{slug}      — 16 halaman industri
//   • /industri/{i}/{svc}   — matriks layanan × industri
// ============================================================

import { BIAYA_PAGES, getBiayaPage, BIAYA_TOTAL } from "./biaya";
import { SYARAT_PAGES, getSyaratPage, SYARAT_TOTAL } from "./syarat";
import { INDUSTRY_PAGES, getIndustryPage } from "./industry-pages";
import { INDUSTRY_SERVICE_PAGES, getIndustryServicePage, INDUSTRY_SERVICE_TOTAL } from "./industry-matrix";
import {
  buildBiayaIndexPage,
  buildSyaratIndexPage,
  buildIndustriIndexPage,
  INDUSTRY_TOTAL_PAGES,
} from "./industry-pages";
import { INDUSTRIES } from "./industries";
import type { SeoPage, SeoIndexPage, SeoPageKind } from "./types";

export * from "./types";
export {
  BIAYA_PAGES,
  getBiayaPage,
  BIAYA_TOTAL,
  SYARAT_PAGES,
  getSyaratPage,
  SYARAT_TOTAL,
  INDUSTRY_PAGES,
  getIndustryPage,
  INDUSTRY_TOTAL_PAGES,
  INDUSTRY_SERVICE_PAGES,
  getIndustryServicePage,
  INDUSTRY_SERVICE_TOTAL,
  buildBiayaIndexPage,
  buildSyaratIndexPage,
  buildIndustriIndexPage,
  INDUSTRIES,
};

/** Semua halaman ekspansi (flat) — dipakai audit & sitemap */
export const ALL_SEO_PAGES: SeoPage[] = [
  ...BIAYA_PAGES,
  ...SYARAT_PAGES,
  ...INDUSTRY_PAGES,
  ...INDUSTRY_SERVICE_PAGES,
];

export const SEO_EXPANSION_TOTAL = ALL_SEO_PAGES.length;

/** Halaman indeks famili — slug "" = halaman root */
export const SEO_INDEX_PAGES: { path: string; page: SeoIndexPage }[] = [
  { path: "biaya", page: buildBiayaIndexPage(BIAYA_TOTAL) },
  { path: "syarat", page: buildSyaratIndexPage(SYARAT_TOTAL) },
  { path: "industri", page: buildIndustriIndexPage(INDUSTRIES.length) },
];

/** Ambil halaman ekspansi berdasarkan kind + slug */
export function getSeoPage(kind: SeoPageKind, slug: string): SeoPage | undefined {
  switch (kind) {
    case "biaya":
      return getBiayaPage(slug);
    case "syarat":
      return getSyaratPage(slug);
    case "industri":
      return getIndustryPage(slug);
    case "svc-industry": {
      const [industry, svc] = slug.split("/");
      return getIndustryServicePage(industry, svc);
    }
    default:
      return undefined;
  }
}

/** Path URL relatif (tanpa domain) untuk sitemap */
export function seoPagePaths(): string[] {
  return ALL_SEO_PAGES.map((p) => {
    switch (p.kind) {
      case "biaya":
        return `biaya/${p.slug}`;
      case "syarat":
        return `syarat/${p.slug}`;
      case "industri":
        return `industri/${p.slug}`;
      case "svc-industry":
        return `industri/${p.slug}`;
      default:
        return p.slug;
    }
  });
}
