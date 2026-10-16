import { ALL_SERVICE_PAGES, getHubSlugs } from "@/lib/catalog";
import { KBLI_PAGES, KBLI_CATEGORY_PAGES } from "@/lib/kbli-catalog";
import { JOBS } from "@/lib/jobs-data";
import { COMPARISONS } from "@/lib/comparisons";
import { TESTIMONIAL_CATEGORIES } from "@/lib/testimonials-data";
import { PERMIT_GUIDES } from "@/lib/seo-content";
import { BLOG_ARTICLES } from "@/lib/blog-content";
import { safeGetPublishedPosts } from "@/lib/blog-cms";
import { CATEGORIES } from "@/lib/katalog-lengkap";
import { ALL_LAYANAN_SLUGS } from "@/lib/layanan-500";
import { KATALOG_V2_SLUGS } from "@/lib/katalog-v2";
import { ALL_SEO_PAGES } from "@/lib/seo-pages";
import { SITE_URL } from "@/lib/site";
import { classifyPage } from "@/lib/seo-policy";
import { stableLastmod, pageLikeOf } from "@/lib/seo";

// ============================================================
// PUSATPERIZINAN.COM — SITEMAP SECTION BUILDERS
// ============================================================
// M03 (audit SEO):
//   1. lastModified: new Date() (PALSU — berubah tiap revalidasi,
//      membuat Google mengabaikan lastmod) diganti stableLastmod(seed):
//      tanggal deterministik dari hash path/slug — sama selamanya.
//   2. Satu file raksasa (10.201 URL) dipecah 12 seksi
//      /sitemap/<id>.xml + index /sitemap.xml (route handlers).
//      Artikel blog TETAP memakai tanggal artikel asli (updatedAt).
// ============================================================

export type SitemapFreq =
  | "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

export interface SitemapEntry {
  url: string;
  lastModified: Date;
  changeFrequency: SitemapFreq;
  priority: number;
}

export const SITEMAP_SECTION_IDS = [
  "static",
  "blog",
  "panduan",
  "testimoni",
  "layanan",
  "kbli",
  "hubs",
  "jobs",
  "bandingkan",
  "katalog",
  "layanan500",
  "layanan-pp",
  "seo-expansion",
] as const;

export type SitemapSectionId = (typeof SITEMAP_SECTION_IDS)[number];

export function buildSection(id: SitemapSectionId): Promise<SitemapEntry[]> | SitemapEntry[] {
  switch (id) {
    case "static":
      return buildStaticPages();
    case "blog":
      return buildBlogPages();
    case "panduan":
      return PERMIT_GUIDES.map((g) => entry(`/panduan/${g.id}`, "monthly", 0.85));
    case "testimoni":
      return TESTIMONIAL_CATEGORIES.map((c) =>
        entry(`/testimoni/${c.slug}`, "weekly", 0.85)
      );
    case "layanan":
      // P0-03: halaman tier D/E (tipis/layak hapus) TIDAK masuk sitemap
      return ALL_SERVICE_PAGES.filter((p) => classifyPage(pageLikeOf(p)).index).map((p) => ({
        url: `${SITE_URL}/layanan/${p.slug}`,
        lastModified: stableLastmod(`/layanan/${p.slug}`),
        changeFrequency: "monthly" as const,
        priority:
          p.kind === "base"
            ? 0.9
            : p.kind === "country"
              ? 0.85
              : p.kind === "hub"
                ? 0.8
                : p.category === "virtual-office"
                  ? 0.8
                  : 0.7,
      }));
    case "kbli":
      return [
        ...KBLI_PAGES.map((p) => entry(`/kbli/${p.slug}`, "monthly", 0.85)),
        // Halaman kategori KBLI (indeks per bidang)
        ...KBLI_CATEGORY_PAGES.map((p) => entry(`/kbli/${p.slug}`, "monthly", 0.85)),
      ];
    case "hubs":
      return getHubSlugs()
        .filter((s) => !ALL_SERVICE_PAGES.some((p) => p.slug === s))
        .map((slug) => entry(`/layanan/${slug}`, "monthly", 0.8));
    case "jobs":
      return JOBS.map((j) => entry(`/lowongan-kerja/${j.slug}`, "daily", 0.8));
    case "bandingkan":
      return COMPARISONS.map((c) => entry(`/bandingkan/${c.slug}`, "monthly", 0.85));
    case "katalog":
      return CATEGORIES.map((c) => entry(`/katalog/${c.slug}`, "monthly", c.flagship ? 0.9 : 0.8));
    case "layanan500":
      // KATALOG 500 LAYANAN — 500 halaman detail root-level (URL dataset resmi)
      return ALL_LAYANAN_SLUGS.map((slug) => entry(`/${slug}`, "monthly", 0.9));
    case "layanan-pp":
      // KATALOG PREMIUM v2 — 500 halaman detail PP-XXX di /layanan/{slug}-pp-*
      return KATALOG_V2_SLUGS.map((slug) => entry(`/layanan/${slug}`, "monthly", 0.85));
    case "seo-expansion":
      // Ekspansi Tier-2/3: biaya (110) + syarat (110) + industri (16) + matriks layanan×industri (145+)
      return ALL_SEO_PAGES.map((p) =>
        entry(
          p.kind === "svc-industry"
            ? `/industri/${p.slug}`
            : p.kind === "industri"
              ? `/industri/${p.slug}`
              : `/${p.kind}/${p.slug}`,
          "monthly",
          p.kind === "industri" ? 0.85 : p.kind === "svc-industry" ? 0.75 : 0.8
        )
      );
    default:
      return [];
  }
}

/** Entri dengan lastmod stabil (deterministik dari path). */
function entry(path: string, changeFrequency: SitemapFreq, priority: number): SitemapEntry {
  return {
    url: `${SITE_URL}${path}`,
    lastModified: stableLastmod(path),
    changeFrequency,
    priority,
  };
}

// ------------------------------------------------------------
// SEKSI: static (halaman indeks & trust/legal)
// ------------------------------------------------------------

function buildStaticPages(): SitemapEntry[] {
  return [
    entry("/", "weekly", 1.0),
    entry("/layanan", "weekly", 0.95),
    entry("/kbli", "daily", 0.95),
    // Halaman CTA resmi (tujuan funnel sitewide — setiap CTA punya halaman asli)
    entry("/konsultasi", "weekly", 0.95),
    entry("/cek-izin", "monthly", 0.9),
    entry("/kalkulator", "monthly", 0.9),
    entry("/panduan", "weekly", 0.9),
    entry("/kalkulator-pajak", "monthly", 0.9),
    entry("/roadmap", "monthly", 0.9),
    entry("/cek-dokumen", "monthly", 0.9),
    entry("/lowongan-kerja", "daily", 0.85),
    entry("/bandingkan", "monthly", 0.85),
    entry("/testimoni", "weekly", 0.9),
    entry("/virtual-office", "weekly", 0.95),
    entry("/kanal-resmi", "monthly", 0.85),
    // P0-02: blog kini URL nyata & crawlable
    entry("/blog", "weekly", 0.9),
    // Ekspansi Tier-2: indeks biaya / syarat / industri
    entry("/biaya", "weekly", 0.9),
    entry("/syarat", "weekly", 0.9),
    entry("/industri", "weekly", 0.9),
    // Katalog lengkap (31 divisi layanan) + paket bundel
    entry("/katalog", "weekly", 0.95),
    entry("/paket", "weekly", 0.9),
    // Program 46-Council (IDE 1-10): tool kepatuhan, paket vertikal,
    // PMA EN, mitra, korporat, BUMDes — lead engine baru
    entry("/kalender-kepatuhan", "weekly", 0.9),
    entry("/paket-usaha", "weekly", 0.9),
    entry("/pma-company-registration", "weekly", 0.9),
    entry("/mitra", "weekly", 0.9), // Program Kemitraan Cabang — funnel bisnis utama
    entry("/solusi-korporat", "monthly", 0.8),
    entry("/bumdes", "monthly", 0.8),
    // Trust & legal pages (E-E-A-T)
    entry("/tentang-kami", "monthly", 0.7),
    entry("/kontak", "monthly", 0.7),
    // Pusat FAQ — halaman support berstandar internasional (51 Q&A, JSON-LD FAQPage)
    entry("/faq", "weekly", 0.8),
    entry("/kebijakan-privasi", "yearly", 0.4),
    entry("/syarat-ketentuan", "yearly", 0.4),
  ];
}

// ------------------------------------------------------------
// SEKSI: blog (artikel statis + CMS) — lastmod = tanggal artikel ASLI
// ------------------------------------------------------------

async function buildBlogPages(): Promise<SitemapEntry[]> {
  // Artikel blog (15 statis) — setiap artikel URL unik dengan meta unik
  const blogPages: SitemapEntry[] = BLOG_ARTICLES.map((a) => ({
    url: `${SITE_URL}/blog/${a.slug}`,
    lastModified: new Date(a.updatedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Artikel CMS (Mission Control → Konten & SEO): PUBLISHED + tidak noindex.
  // Slug yang sama dengan artikel statis dilewati (versi DB yang tampil).
  const cmsPosts = await safeGetPublishedPosts();
  const staticBlogSlugs = new Set(BLOG_ARTICLES.map((a) => a.slug));
  const cmsBlogPages: SitemapEntry[] = cmsPosts
    .filter((p) => !p.noindex && !staticBlogSlugs.has(p.slug))
    .map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  return [...blogPages, ...cmsBlogPages];
}
