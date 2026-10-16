import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { ADMIN_COOKIE, verifyToken } from "@/lib/admin-auth";
import {
  getAllCmsPosts,
  ensureUniqueSlug,
  rowToCmsPost,
} from "@/lib/blog-cms";
import { normalizeSlug, sanitizeFaq, sanitizeSections } from "./helpers";

// ============================================================
// GET  /api/admin/posts — daftar seluruh post CMS (+ draft)
// POST /api/admin/posts — buat post baru
// ============================================================

async function guard(): Promise<boolean> {
  const store = await cookies();
  return verifyToken(store.get(ADMIN_COOKIE)?.value);
}

export async function GET() {
  if (!(await guard())) {
    return NextResponse.json({ success: false, error: "Tidak terautentikasi" }, { status: 401 });
  }
  try {
    const posts = await getAllCmsPosts();
    return NextResponse.json({
      success: true,
      data: {
        posts,
        stats: {
          total: posts.length,
          published: posts.filter((p) => p.status === "PUBLISHED").length,
          draft: posts.filter((p) => p.status === "DRAFT").length,
          noindex: posts.filter((p) => p.noindex).length,
        },
      },
    });
  } catch (e) {
    return NextResponse.json(
      { success: false, error: e instanceof Error ? e.message : "Gagal memuat post" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  if (!(await guard())) {
    return NextResponse.json({ success: false, error: "Tidak terautentikasi" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const title = String(body.title ?? "").trim();
    const excerpt = String(body.excerpt ?? "").trim();
    if (!title) {
      return NextResponse.json({ success: false, error: "Judul wajib diisi" }, { status: 400 });
    }
    if (!excerpt) {
      return NextResponse.json({ success: false, error: "Ringkasan wajib diisi" }, { status: 400 });
    }

    const slug = await ensureUniqueSlug(normalizeSlug(String(body.slug ?? "") || title));
    const sections = sanitizeSections(body.sections);
    if (sections === null) {
      return NextResponse.json(
        { success: false, error: "Format sections tidak valid" },
        { status: 400 }
      );
    }
    const faq = sanitizeFaq(body.faq);
    if (faq === null) {
      return NextResponse.json({ success: false, error: "Format FAQ tidak valid" }, { status: 400 });
    }

    const wordCount =
      title.split(/\s+/).length +
      excerpt.split(/\s+/).length +
      sections.split(/\s+/).length;
    const readMinutes =
      typeof body.readMinutes === "number" && body.readMinutes > 0
        ? Math.round(body.readMinutes)
        : Math.max(1, Math.round(wordCount / 200));

    const created = await db.post.create({
      data: {
        slug,
        title,
        metaTitle: String(body.metaTitle ?? "").trim() || null,
        metaDescription: String(body.metaDescription ?? "").trim() || null,
        focusKeyword: String(body.focusKeyword ?? "").trim() || null,
        keywords: String(body.keywords ?? "").trim() || null,
        category: String(body.category ?? "Panduan").trim() || "Panduan",
        excerpt,
        readMinutes,
        author: String(body.author ?? "").trim() || "Tim PusatPerizinan",
        authorRole: String(body.authorRole ?? "").trim() || "Konsultan Perizinan",
        sections,
        faq,
        cta: JSON.stringify({
          text: String(body.ctaText ?? "Konsultasi Sekarang").trim() || "Konsultasi Sekarang",
          anchor: String(body.ctaAnchor ?? "#konsultasi").trim() || "#konsultasi",
        }),
        relatedArticles: JSON.stringify(
          Array.isArray(body.relatedArticles) ? body.relatedArticles.map(String).filter(Boolean) : []
        ),
        relatedGuides: JSON.stringify(
          Array.isArray(body.relatedGuides) ? body.relatedGuides.map(String).filter(Boolean) : []
        ),
        status: body.status === "PUBLISHED" ? "PUBLISHED" : "DRAFT",
        noindex: Boolean(body.noindex),
      },
    });

    return NextResponse.json({ success: true, data: rowToCmsPost(created) }, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { success: false, error: e instanceof Error ? e.message : "Gagal membuat post" },
      { status: 500 }
    );
  }
}
