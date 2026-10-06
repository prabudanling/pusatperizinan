import type { MetadataRoute } from "next";
import { ALL_SERVICE_PAGES, getHubSlugs } from "@/lib/catalog";
import { KBLI_PAGES } from "@/lib/kbli-catalog";
import { JOBS } from "@/lib/jobs-data";
import { COMPARISONS } from "@/lib/comparisons";
import { TESTIMONIAL_CATEGORIES } from "@/lib/testimonials-data";
import { PERMIT_GUIDES } from "@/lib/seo-content";
import { BLOG_ARTICLES } from "@/lib/blog-content";
import { CATEGORIES } from "@/lib/katalog-lengkap";
import { SITE_URL } from "@/lib/site";
import { classifyPage } from "@/lib/seo-policy";

/**
 * Sitemap dinamis — digenerate otomatis dari katalog layanan + KBLI + lowongan + perbandingan.
 * Static export compatible: Next menuliskan out/sitemap.xml saat build.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  
  // Omit lastModified unless the content has an actual editorial update date.

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/layanan`, changeFrequency: "weekly", priority: 0.95 },
    { url: `${SITE_URL}/kbli`, changeFrequency: "daily", priority: 0.95 },
    { url: `${SITE_URL}/kalkulator-pajak`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/roadmap`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/cek-dokumen`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/lowongan-kerja`, changeFrequency: "daily", priority: 0.85 },
    { url: `${SITE_URL}/bandingkan`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/testimoni`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/virtual-office`, changeFrequency: "weekly", priority: 0.95 },
    { url: `${SITE_URL}/kanal-resmi`, changeFrequency: "monthly", priority: 0.85 },
    // P0-02: blog kini URL nyata & crawlable
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.9 },
    // Katalog lengkap (31 divisi layanan) + paket bundel
    { url: `${SITE_URL}/katalog`, changeFrequency: "weekly", priority: 0.95 },
    { url: `${SITE_URL}/paket`, changeFrequency: "weekly", priority: 0.9 },
    // Trust & legal pages (E-E-A-T)
    { url: `${SITE_URL}/tentang-kami`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/kontak`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/kebijakan-privasi`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/syarat-ketentuan`, changeFrequency: "yearly", priority: 0.4 },
  ];

  // Panduan pillar (16) — sebelumnya tersembunyi di hub JS, kini URL nyata
  const panduanPages: MetadataRoute.Sitemap = PERMIT_GUIDES.map((g) => ({
    url: `${SITE_URL}/panduan/${g.id}`,
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
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const jobPages: MetadataRoute.Sitemap = JOBS.map((j) => ({
    url: `${SITE_URL}/lowongan-kerja/${j.slug}`,
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  const comparisonPages: MetadataRoute.Sitemap = COMPARISONS.map((c) => ({
    url: `${SITE_URL}/bandingkan/${c.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  // P0-03: halaman tier D/E (tipis/layak hapus) TIDAK masuk sitemap
  const servicePages: MetadataRoute.Sitemap = ALL_SERVICE_PAGES.filter((p) => classifyPage(p).index).map((p) => ({
    url: `${SITE_URL}/layanan/${p.slug}`,
    changeFrequency: "monthly",
    priority:
      p.kind === "base" ? 0.9 : p.kind === "country" ? 0.85 : p.kind === "hub" ? 0.8 : p.category === "virtual-office" ? 0.8 : 0.7,
  }));

  const kbliPages: MetadataRoute.Sitemap = KBLI_PAGES.map((p) => ({
    url: `${SITE_URL}/kbli/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const hubPages: MetadataRoute.Sitemap = getHubSlugs()
    .filter((s) => !ALL_SERVICE_PAGES.some((p) => p.slug === s))
    .map((slug) => ({
      url: `${SITE_URL}/layanan/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  // Divisi katalog lengkap (31) — satu halaman per divisi layanan
  const katalogPages: MetadataRoute.Sitemap = CATEGORIES.map((c) => ({
    url: `${SITE_URL}/katalog/${c.slug}`,
    changeFrequency: "monthly" as const,
    priority: c.flagship ? 0.9 : 0.8,
  }));

  return [...staticPages, ...panduanPages, ...blogPages, ...testimoniPages, ...servicePages, ...kbliPages, ...hubPages, ...jobPages, ...comparisonPages, ...katalogPages];
}
