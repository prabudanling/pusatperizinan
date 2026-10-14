import { SITE_URL } from "@/lib/site";
import { SITEMAP_SECTION_IDS } from "@/lib/sitemap-sections";

// ============================================================
// PUSATPERIZINAN.COM — SITEMAP INDEX (disajikan di /sitemap.xml)
// ============================================================
// M03: sitemap 10.201 URL dipecah 12 seksi /sitemap/<id>.xml
// (lihat src/app/sitemap/[id]/route.ts + src/lib/sitemap-sections.ts).
// Route ini menghasilkan sitemap INDEX standar protokol
// (sitemapindex) — satu pintu masuk untuk Search Console.
// lastmod sengaja TIDAK diisi: tanggal file indeks bukan sinyal
// konten yang jujur (pelajaran dari audit lastmod palsu).
//
// CATATAN ARSITEKTUR (fix konflik route-tree):
// Sebelumnya handler ini hidup di app/sitemap.xml/route.ts. Next.js
// memperlakukan folder bernama "sitemap.xml" sebagai METADATA ROUTE
// yang dinormalisasi menjadi segmen dinamis internal
// ("sitemap", [__metadata_id__]) — bentrokan slug dengan
// app/sitemap/[id]/route.ts ("sitemap", [id]) membuat SELURUH
// route tree gagal dikompilasi (HTTP 500 sitewide:
// "You cannot use different slug names for the same dynamic path").
// Solusi: handler biasa di /api/sitemap-index + rewrite
// /sitemap.xml → /api/sitemap-index (lihat next.config.ts —
// rewrite dikondisikan OFF pada BUILD_STATIC=1/output:export
// karena fitur rewrite tidak didukung mode export).
// ============================================================

export const dynamic = "force-static";

function xmlEscape(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function GET(): Response {
  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    SITEMAP_SECTION_IDS.map(
      (id) => `  <sitemap><loc>${xmlEscape(`${SITE_URL}/sitemap/${id}.xml`)}</loc></sitemap>`
    ).join("\n") +
    `\n</sitemapindex>\n`;

  return new Response(body, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
