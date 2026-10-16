import { db } from "@/lib/db";
import type {
  BlogArticle,
  BlogCategory,
  BlogFAQ,
  BlogSection,
} from "@/lib/blog-content";

// ============================================================
// PUSATPERIZINAN.COM — Blog CMS Bridge (Admin → Front-end)
// Artikel dari database (diedit di Mission Control) digabung
// dengan artikel statis blog-content.ts. DB menang bila slug sama.
// Semua parse JSON defensif — data rusak tidak boleh mematikan halaman.
// ============================================================

/** Baris mentah Post sesuai skema Prisma (field JSON masih string) */
export interface PostRow {
  id: string;
  slug: string;
  title: string;
  metaTitle: string | null;
  metaDescription: string | null;
  focusKeyword: string | null;
  keywords: string | null;
  category: string;
  excerpt: string;
  readMinutes: number;
  author: string;
  authorRole: string;
  sections: string;
  faq: string;
  cta: string | null;
  relatedArticles: string | null;
  relatedGuides: string | null;
  status: string; // DRAFT | PUBLISHED
  noindex: boolean;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

/** Post CMS setelah JSON string di-parse — bentuk yang dipakai UI & renderer */
export interface CmsPost {
  id: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  keywords: string; // dipisah koma
  category: BlogCategory;
  excerpt: string;
  readMinutes: number;
  author: string;
  authorRole: string;
  sections: BlogSection[];
  faq: BlogFAQ[];
  cta: { text: string; anchor: string };
  relatedArticles: string[];
  relatedGuides: string[];
  status: "DRAFT" | "PUBLISHED";
  noindex: boolean;
  publishedAt: string; // ISO
  updatedAt: string; // ISO
}

const BLOG_CATEGORIES_FALLBACK: BlogCategory[] = [
  "Panduan", "Biaya & Modal", "Regulasi", "Studi Kasus",
  "Internasional", "Tambang & Energi", "Travel Ibadah", "Pajak",
];

function safeParse<T>(raw: string | null | undefined, fallback: T): T {
  if (!raw) return fallback;
  try {
    const v = JSON.parse(raw);
    return (v ?? fallback) as T;
  } catch {
    return fallback;
  }
}

/** Konversi baris DB → CmsPost (defensif: field rusak → nilai aman) */
export function rowToCmsPost(r: PostRow): CmsPost {
  const category = (BLOG_CATEGORIES_FALLBACK as string[]).includes(r.category)
    ? (r.category as BlogCategory)
    : "Panduan";
  const sections = safeParse<BlogSection[]>(r.sections, []).filter(
    (s) => s && typeof s.heading === "string" && Array.isArray(s.paragraphs)
  );
  const faq = safeParse<BlogFAQ[]>(r.faq, []).filter(
    (f) => f && typeof f.question === "string" && typeof f.answer === "string"
  );
  const cta = safeParse<{ text: string; anchor: string }>(r.cta, {
    text: "Konsultasi Sekarang",
    anchor: "#konsultasi",
  });
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    metaTitle: r.metaTitle || r.title,
    metaDescription: r.metaDescription || r.excerpt,
    focusKeyword: r.focusKeyword || "",
    keywords: r.keywords || "",
    category,
    excerpt: r.excerpt,
    readMinutes: r.readMinutes > 0 ? r.readMinutes : 5,
    author: r.author || "Tim PusatPerizinan",
    authorRole: r.authorRole || "Konsultan Perizinan",
    sections,
    faq,
    cta,
    relatedArticles: safeParse<string[]>(r.relatedArticles, []),
    relatedGuides: safeParse<string[]>(r.relatedGuides, []),
    status: r.status === "PUBLISHED" ? "PUBLISHED" : "DRAFT",
    noindex: r.noindex,
    publishedAt: r.publishedAt.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
  };
}

/** CmsPost → bentuk BlogArticle agar renderer artikel lama bisa dipakai ulang */
export function cmsPostToArticle(p: CmsPost): BlogArticle {
  return {
    slug: p.slug,
    title: p.title,
    category: p.category,
    excerpt: p.excerpt,
    readMinutes: p.readMinutes,
    publishedAt: p.publishedAt.slice(0, 10),
    updatedAt: p.updatedAt.slice(0, 10),
    author: p.author,
    authorRole: p.authorRole,
    keywords: p.keywords
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean),
    sections: p.sections,
    faq: p.faq,
    relatedArticles: p.relatedArticles,
    relatedGuides: p.relatedGuides,
    cta: p.cta,
  };
}

/** Semua post CMS (untuk admin) — termasuk draft */
export async function getAllCmsPosts(): Promise<CmsPost[]> {
  const rows = await db.post.findMany({ orderBy: { updatedAt: "desc" } });
  return rows.map(rowToCmsPost);
}

/** Post CMS berstatus PUBLISHED (untuk blog publik & sitemap) */
export async function getPublishedCmsPosts(): Promise<CmsPost[]> {
  const rows = await db.post.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { updatedAt: "desc" },
  });
  return rows.map(rowToCmsPost);
}

/** Satu post CMS berdasar slug (status apa pun — validasi status di pemanggil) */
export async function getCmsPostBySlug(slug: string): Promise<CmsPost | null> {
  const row = await db.post.findUnique({ where: { slug } });
  return row ? rowToCmsPost(row) : null;
}

/** Slug unik: bila bentrok dengan post lain, tambah -2, -3, ... */
export async function ensureUniqueSlug(
  slug: string,
  excludeId?: string
): Promise<string> {
  let candidate = slug;
  let n = 2;
  while (true) {
    const exists = await db.post.findUnique({ where: { slug: candidate } });
    if (!exists || exists.id === excludeId) return candidate;
    candidate = `${slug}-${n}`;
    n += 1;
  }
}

// ------------------------------------------------------------
// Versi "aman" untuk halaman publik / build environment:
// DB belum siap / tabel belum dibuat → fallback kosong,
// halaman tetap tampil dengan konten statis repo (build tak pernah crash).
// ------------------------------------------------------------

export async function safeGetPublishedPosts(): Promise<CmsPost[]> {
  try {
    return await getPublishedCmsPosts();
  } catch {
    return [];
  }
}

export async function safeGetCmsPostBySlug(slug: string): Promise<CmsPost | null> {
  try {
    return await getCmsPostBySlug(slug);
  } catch {
    return null;
  }
}
