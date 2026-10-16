import { BLOG_ARTICLES } from "@/lib/blog-content";
import { safeGetPublishedPosts } from "@/lib/blog-cms";
import { SITE_URL } from "@/lib/site";

// ============================================================
// PUSATPERIZINAN.COM — RSS 2.0 Feed untuk Blog
// Menambah jalur penemuan konten: RSS reader, IFTTT, Google News
// preparasi, dan agregator. ISR 1 jam — artikel CMS ikut otomatis.
// ============================================================
export const dynamic = "force-static";
export const revalidate = 3600;

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  // Gabung artikel CMS (PUBLISHED, tidak noindex) + artikel statis repo
  const cmsPosts = await safeGetPublishedPosts();
  const staticSlugs = new Set(BLOG_ARTICLES.map((a) => a.slug));
  const cmsArticles = cmsPosts
    .filter((p) => !p.noindex && !staticSlugs.has(p.slug))
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      category: p.category as string,
      publishedAt: p.publishedAt.slice(0, 10),
      author: p.author,
    }));

  const all = [
    ...cmsArticles.map((a) => ({ ...a, isCms: true })),
    ...BLOG_ARTICLES.map((a) => ({
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt,
      category: a.category as string,
      publishedAt: a.publishedAt,
      author: a.author,
      isCms: false,
    })),
  ].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  const items = all.map(
    (a) => `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${SITE_URL}/blog/${a.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${a.slug}</guid>
      <description>${escapeXml(a.excerpt)}</description>
      <category>${escapeXml(a.category)}</category>
      <pubDate>${new Date(a.publishedAt).toUTCString()}</pubDate>
      <dc:creator>${escapeXml(a.author)}</dc:creator>
    </item>`
  ).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog PusatPerizinan.com — Wawasan Perizinan Usaha</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Artikel mendalam seputar perizinan usaha Indonesia: NIB, PT, PMA, halal, BPOM, PBG/SLF, pajak, PPIU/PPIH, dan lainnya — ditulis konsultan senior.</description>
    <language>id-ID</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
