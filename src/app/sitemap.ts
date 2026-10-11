import type { MetadataRoute } from "next";
import { ALL_SERVICE_PAGES, getHubSlugs } from "@/lib/catalog";
import { KBLI_PAGES, KBLI_CATEGORY_PAGES } from "@/lib/kbli-catalog";
import { JOBS } from "@/lib/jobs-data";
import { COMPARISONS } from "@/lib/comparisons";
import { TESTIMONIAL_CATEGORIES } from "@/lib/testimonials-data";
import { PERMIT_GUIDES } from "@/lib/seo-content";
import { BLOG_ARTICLES } from "@/lib/blog-content";
import { CATEGORIES } from "@/lib/katalog-lengkap";
import {
  ALL_SEO_PAGES,
} from "@/lib/seo-pages";
import { SITE_URL } from "@/lib/site";
import { classifyPage } from "@/lib/seo-policy";

/**
 * Sitemap dinamis — digenerate otomatis dari katalog layanan + KBLI + lowongan + perbandingan.
 * Static export compatible: Next menuliskan out/sitemap.xml saat build.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/layanan`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${SITE_URL}/kbli`, lastModified: now, changeFrequency: "daily", priority: 0.95 },
    { url: `${SITE_URL}/kalkulator-pajak`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/roadmap`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/cek-dokumen`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/lowongan-kerja`, lastModified: now, changeFrequency: "daily", priority: 0.85 },
    { url: `${SITE_URL}/bandingkan`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/testimoni`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/virtual-office`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${SITE_URL}/kanal-resmi`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    // P0-02: blog kini URL nyata & crawlable
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    // Ekspansi Tier-2: indeks biaya / syarat / industri
    { url: `${SITE_URL}/biaya`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/syarat`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/industri`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    // Katalog lengkap (31 divisi layanan) + paket bundel
    { url: `${SITE_URL}/katalog`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${SITE_URL}/paket`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    // Trust & legal pages (E-E-A-T)
    { url: `${SITE_URL}/tentang-kami`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/kontak`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/kebijakan-privasi`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/syarat-ketentuan`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
  ];

  // Panduan pillar (16) — sebelumnya tersembunyi di hub JS, kini URL nyata
  const panduanPages: MetadataRoute.Sitemap = PERMIT_GUIDES.map((g) => ({
    url: `${SITE_URL}/panduan/${g.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  // Artikel blog (15) — setiap artikel URL unik dengan meta unik
  const blogPages: MetadataRoute.Sitemap = BLOG_ARTICLES.map((a) => ({
    url: `${SITE_URL}/blog/${a.slug}`,
    lastModified: new Date(a.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Halaman testimoni per kategori (URL cantik + Review schema)
  const testimoniPages: MetadataRoute.Sitemap = TESTIMONIAL_CATEGORIES.map((c) => ({
    url: `${SITE_URL}/testimoni/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const jobPages: MetadataRoute.Sitemap = JOBS.map((j) => ({
    url: `${SITE_URL}/lowongan-kerja/${j.slug}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  const comparisonPages: MetadataRoute.Sitemap = COMPARISONS.map((c) => ({
    url: `${SITE_URL}/bandingkan/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  // P0-03: halaman tier D/E (tipis/layak hapus) TIDAK masuk sitemap
  const servicePages: MetadataRoute.Sitemap = ALL_SERVICE_PAGES.filter((p) => classifyPage(p).index).map((p) => ({
    url: `${SITE_URL}/layanan/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority:
      p.kind === "base" ? 0.9 : p.kind === "country" ? 0.85 : p.kind === "hub" ? 0.8 : p.category === "virtual-office" ? 0.8 : 0.7,
  }));

  const kbliPages: MetadataRoute.Sitemap = KBLI_PAGES.map((p) => ({
    url: `${SITE_URL}/kbli/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  // Halaman kategori KBLI (indeks per bidang)
  const kbliCategorySitemap: MetadataRoute.Sitemap = KBLI_CATEGORY_PAGES.map((p) => ({
    url: `${SITE_URL}/kbli/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const hubPages: MetadataRoute.Sitemap = getHubSlugs()
    .filter((s) => !ALL_SERVICE_PAGES.some((p) => p.slug === s))
    .map((slug) => ({
      url: `${SITE_URL}/layanan/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  // Divisi katalog lengkap (31) — satu halaman per divisi layanan
  const katalogPages: MetadataRoute.Sitemap = CATEGORIES.map((c) => ({
    url: `${SITE_URL}/katalog/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: c.flagship ? 0.9 : 0.8,
  }));

  // Ekspansi Tier-2/3: biaya (110) + syarat (110) + industri (16) + matriks layanan×industri (145+)
  const seoExpansionPages: MetadataRoute.Sitemap = ALL_SEO_PAGES.map((p) => ({
    url: p.kind === "svc-industry"
      ? `${SITE_URL}/industri/${p.slug}`
      : p.kind === "industri"
        ? `${SITE_URL}/industri/${p.slug}`
        : `${SITE_URL}/${p.kind}/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: p.kind === "industri" ? 0.85 : p.kind === "svc-industry" ? 0.75 : 0.8,
  }));

  return [...staticPages, ...panduanPages, ...blogPages, ...testimoniPages, ...servicePages, ...kbliPages, ...kbliCategorySitemap, ...hubPages, ...jobPages, ...comparisonPages, ...katalogPages, ...seoExpansionPages];
}
