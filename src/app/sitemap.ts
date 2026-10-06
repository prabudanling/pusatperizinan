import type { MetadataRoute } from "next";
import { SITE, SERVICES } from "@/lib/site-config";

/**
 * Sitemap dinamis — dibuat otomatis saat build/deploy.
 * Menginformasikan mesin pencari seluruh halaman yang dapat di-crawl
 * beserta prioritas dan frekuensi perubahan.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE.url,
      lastModified,
      changeFrequency: "daily",
      priority: 1,
    },
    // Halaman anchor layanan utama (best practice untuk single-page)
    ...SERVICES.map((s) => ({
      url: `${SITE.url}/#${s.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    {
      url: `${SITE.url}/#faq`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ];
}
