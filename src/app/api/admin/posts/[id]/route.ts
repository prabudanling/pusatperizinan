import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { ADMIN_COOKIE, verifyToken } from "@/lib/admin-auth";
import {
  getAllCmsPosts,
  ensureUniqueSlug,
  rowToCmsPost,
} from "@/lib/blog-cms";
import { normalizeSlug, sanitizeFaq, sanitizeSections } from "../helpers";

// ============================================================
// GET    /api/admin/posts/[id] — detail post
// PUT    /api/admin/posts/[id] — update post
// DELETE /api/admin/posts/[id] — hapus post
// ============================================================

async function guard(): Promise<boolean> {
  const store = await cookies();
  return verifyToken(store.get(ADMIN_COOKIE)?.value);
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await guard())) {
    return NextResponse.json({ success: false, error: "Tidak terautentikasi" }, { status: 401 });
  }
  const { id } = await params;
  const row = await db.post.findUnique({ where: { id } });
  if (!row) {
    return NextResponse.json({ success: false, error: "Post tidak ditemukan" }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: rowToCmsPost(row) });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await guard())) {
    return NextResponse.json({ success: false, error: "Tidak terautentikasi" }, { status: 401 });
  }
  try {
    const { id } = await params;
    const existing = await db.post.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ success: false, error: "Post tidak ditemukan" }, { status: 404 });
    }
    const body = await req.json();

    const title = String(body.title ?? "").trim();
    const excerpt = String(body.excerpt ?? "").trim();
    if (!title) {
      return NextResponse.json({ success: false, error: "Judul wajib diisi" }, { status: 400 });
    }
    if (!excerpt) {
      return NextResponse.json({ success: false, error: "Ringkasan wajib diisi" }, { status: 400 });
    }

    // Slug boleh diubah — tetap dijamin unik terhadap post lain
    const requestedSlug = normalizeSlug(String(body.slug ?? "") || title);
    const slug =
      requestedSlug === existing.slug
        ? existing.slug
        : await ensureUniqueSlug(requestedSlug, id);

    const sections = sanitizeSections(body.sections);
    if (sections === null) {
      return NextResponse.json({ success: false, error: "Format sections tidak valid" }, { status: 400 });
    }
    const faq = sanitizeFaq(body.faq);
    if (faq === null) {
      return NextResponse.json({ success: false, error: "Format FAQ tidak valid" }, { status: 400 });
    }

    const updated = await db.post.update({
      where: { id },
      data: {
        slug,
        title,
        metaTitle: String(body.metaTitle ?? "").trim() || null,
        metaDescription: String(body.metaDescription ?? "").trim() || null,
        focusKeyword: String(body.focusKeyword ?? "").trim() || null,
        keywords: String(body.keywords ?? "").trim() || null,
        category: String(body.category ?? existing.category).trim() || existing.category,
        excerpt,
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

    return NextResponse.json({ success: true, data: rowToCmsPost(updated) });
  } catch (e) {
    return NextResponse.json(
      { success: false, error: e instanceof Error ? e.message : "Gagal memperbarui post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await guard())) {
    return NextResponse.json({ success: false, error: "Tidak terautentikasi" }, { status: 401 });
  }
  try {
    const { id } = await params;
    await db.post.delete({ where: { id } });
    return NextResponse.json({ success: true, data: { id } });
  } catch {
    return NextResponse.json(
      { success: false, error: "Post tidak ditemukan / sudah terhapus" },
      { status: 404 }
    );
  }
}
