import type { MetadataRoute } from "next";
import { ALL_SERVICE_PAGES, getHubSlugs } from "@/lib/catalog";
import { KBLI_PAGES } from "@/lib/kbli-catalog";
import { JOBS } from "@/lib/jobs";
import { COMPARISONS } from "@/lib/catalog/comparisons";

/**
 * Sitemap dinamis — digenerate otomatis dari katalog layanan + KBLI + lowongan + perbandingan.
 * Static export compatible: Next menuliskan out/sitemap.xml saat build.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const BASE = "https://pusatperizinan.com";
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/layanan`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${BASE}/kbli`, lastModified: now, changeFrequency: "daily", priority: 0.95 },
    { url: `${BASE}/kalkulator-pajak`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/roadmap`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/cek-dokumen`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/lowongan`, lastModified: now, changeFrequency: "daily", priority: 0.85 },
    { url: `${BASE}/perbandingan`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
  ];

  const jobPages: MetadataRoute.Sitemap = JOBS.map((j) => ({
    url: `${BASE}/lowongan/${j.slug}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  const comparisonPages: MetadataRoute.Sitemap = COMPARISONS.map((c) => ({
    url: `${BASE}/perbandingan/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const servicePages: MetadataRoute.Sitemap = ALL_SERVICE_PAGES.map((p) => ({
    url: `${BASE}/layanan/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority:
      p.kind === "base" ? 0.9 : p.kind === "country" ? 0.85 : p.kind === "hub" ? 0.8 : 0.7,
  }));

  const kbliPages: MetadataRoute.Sitemap = KBLI_PAGES.map((p) => ({
    url: `${BASE}/kbli/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const hubPages: MetadataRoute.Sitemap = getHubSlugs()
    .filter((s) => !ALL_SERVICE_PAGES.some((p) => p.slug === s))
    .map((slug) => ({
      url: `${BASE}/layanan/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  return [...staticPages, ...servicePages, ...kbliPages, ...hubPages, ...jobPages, ...comparisonPages];
}
