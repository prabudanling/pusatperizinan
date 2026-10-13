import { buildSection, SITEMAP_SECTION_IDS, type SitemapSectionId } from "@/lib/sitemap-sections";

// ============================================================
// PUSATPERIZINAN.COM — SITEMAP PER SEKSI (/sitemap/<id>.xml)
// ============================================================
// M03: satu sitemap 10.201 URL dipecah 12 seksi agar tiap file
// kecil, crawlable terpisah, dan lastmod-nya deterministik
// (stableLastmod — hash path, TIDAK berubah tiap build/revalidasi).
//
// CATATAN IMPLEMENTASI: pola native Next.js `generateSitemaps()`
// di app/sitemap.ts mengambil alih path /sitemap.xml sehingga file
// indeks /sitemap.xml tidak bisa hidup berdampingan (konflik route
// metadata di dev). Alternatif setara dipakai: route handler
// app/sitemap/[id]/route.ts + generateStaticParams — URL hasil
// sama persis (/sitemap/<id>.xml), aman untuk `output: "export"`.
// ============================================================

export const dynamic = "force-static";
// DEV-GUARD (OOM fix): pre-generasi 12 seksi (termasuk 8.873 URL layanan)
// di mode dev memicu lonjakan memori ~2,5GB pada sandbox 4GB → OOM-killer
// mematikan next-server. Dev kini merender seksi on-demand (dynamicParams),
// production tetap pre-build penuh via generateStaticParams.
export const dynamicParams = true;

/** Param datang sebagai "<id>.xml" (URL publik) — terima juga tanpa ".xml". */
export function generateStaticParams(): { id: string }[] {
  if (process.env.NODE_ENV !== "production") return [];
  return SITEMAP_SECTION_IDS.map((id) => ({ id: `${id}.xml` }));
}

function xmlEscape(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  const { id } = await params;
  const sectionId = id.replace(/\.xml$/i, "") as SitemapSectionId;

  if (!SITEMAP_SECTION_IDS.includes(sectionId)) {
    return new Response("Not found", { status: 404 });
  }

  const entries = await buildSection(sectionId);

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<!-- Seksi "${sectionId}" — lastmod deterministik (stableLastmod); artikel blog memakai tanggal asli -->\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    entries
      .map(
        (e) =>
          `  <url><loc>${xmlEscape(e.url)}</loc><lastmod>${e.lastModified.toISOString()}</lastmod><changefreq>${e.changeFrequency}</changefreq><priority>${e.priority.toFixed(1)}</priority></url>`
      )
      .join("\n") +
    `\n</urlset>\n`;

  return new Response(body, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
