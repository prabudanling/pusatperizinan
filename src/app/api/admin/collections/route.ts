import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { ADMIN_COOKIE, verifyToken } from "@/lib/admin-auth";

// ============================================================
// GET   /api/admin/collections?type=subscriber|roadmap|testimonial
// PATCH /api/admin/collections — toggle published testimonial
// ============================================================

async function guard(): Promise<boolean> {
  const store = await cookies();
  return verifyToken(store.get(ADMIN_COOKIE)?.value);
}

export async function GET(req: NextRequest) {
  if (!(await guard())) {
    return NextResponse.json({ success: false, error: "Tidak terautentikasi" }, { status: 401 });
  }
  try {
    const type = req.nextUrl.searchParams.get("type") || "subscriber";
    if (type === "roadmap") {
      const rows = await db.roadmapRequest.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
      return NextResponse.json({ success: true, data: { rows, type } });
    }
    if (type === "testimonial") {
      const rows = await db.testimonial.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
      return NextResponse.json({ success: true, data: { rows, type } });
    }
    const rows = await db.subscriber.findMany({ orderBy: { createdAt: "desc" }, take: 200 });
    return NextResponse.json({ success: true, data: { rows, type: "subscriber" } });
  } catch (e) {
    return NextResponse.json(
      { success: false, error: e instanceof Error ? e.message : "Gagal memuat data" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  if (!(await guard())) {
    return NextResponse.json({ success: false, error: "Tidak terautentikasi" }, { status: 401 });
  }
  try {
    const { id, published } = await req.json();
    if (!id || typeof published !== "boolean") {
      return NextResponse.json({ success: false, error: "Payload tidak valid" }, { status: 400 });
    }
    const updated = await db.testimonial.update({ where: { id }, data: { published } });
    return NextResponse.json({ success: true, data: updated });
  } catch (e) {
    return NextResponse.json(
      { success: false, error: e instanceof Error ? e.message : "Gagal memperbarui testimoni" },
      { status: 500 }
    );
  }
}
