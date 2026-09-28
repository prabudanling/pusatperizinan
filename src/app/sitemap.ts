import type { MetadataRoute } from "next";
import { ALL_SERVICE_PAGES, getHubSlugs } from "@/lib/catalog";

/**
 * Sitemap dinamis — digenerate otomatis dari katalog layanan.
 * Static export compatible: Next menuliskan out/sitemap.xml saat build.
 * Menggantikan public/sitemap.xml lama (hanya 10 URL anchor).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const BASE = "https://pusatperizinan.com";
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/layanan`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
  ];

  const servicePages: MetadataRoute.Sitemap = ALL_SERVICE_PAGES.map((p) => ({
    url: `${BASE}/layanan/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority:
      p.kind === "base" ? 0.9 : p.kind === "country" ? 0.85 : p.kind === "hub" ? 0.8 : 0.7,
  }));

  const hubPages: MetadataRoute.Sitemap = getHubSlugs()
    .filter((s) => !ALL_SERVICE_PAGES.some((p) => p.slug === s))
    .map((slug) => ({
      url: `${BASE}/layanan/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  return [...staticPages, ...servicePages, ...hubPages];
}
