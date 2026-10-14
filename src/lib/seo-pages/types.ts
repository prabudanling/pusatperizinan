// ============================================================
// PUSATPERIZINAN.COM — Tipe Halaman SEO Ekspansi (Tier 2/3)
// Famili halaman: biaya, syarat, industri, layanan×industri
// Semua deterministik (murni TS) → aman build & sitemap
// ============================================================

export interface SeoSection {
  heading: string;
  paras?: string[];
  bullets?: string[];
}

export interface SeoFaq {
  q: string;
  a: string;
}

export interface SeoBreadcrumb {
  name: string;
  href: string;
}

export type SeoPageKind = "biaya" | "syarat" | "industri" | "svc-industry";

export interface SeoPage {
  slug: string;
  kind: SeoPageKind;
  /** id layanan dasar bila halaman terikat layanan */
  serviceId?: string;
  /** slug industri bila halaman terikat industri */
  industrySlug?: string;
  /** meta title (brand disisipkan layout) */
  title: string;
  h1: string;
  metaDesc: string;
  intro: string[];
  sections: SeoSection[];
  faq: SeoFaq[];
  keywords: string[];
  breadcrumbs: SeoBreadcrumb[];
  /** tautan internal terstruktur (crawl depth) */
  relatedLinks: SeoBreadcrumb[];
}

/** Halaman daftar (hub) untuk tiap famili */
export interface SeoIndexPage {
  slug: string; // "" untuk root famili
  kind: "biaya-index" | "syarat-index" | "industri-index";
  title: string;
  h1: string;
  metaDesc: string;
  intro: string[];
  faq: SeoFaq[];
  keywords: string[];
  breadcrumbs: SeoBreadcrumb[];
}

/** Deklarasi industri untuk halaman /industri/* */
export interface Industry {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  profile: string[];
  challenges: { title: string; detail: string }[];
  /** layanan paling relevan untuk industri ini (id = slug layanan dasar) */
  services: { id: string; why: string }[];
  kbliCommon: { code: string; title: string }[];
  regulations: string[];
  faq: SeoFaq[];
  keywords: string[];
}
