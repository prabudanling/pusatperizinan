import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { ADMIN_COOKIE, verifyToken } from "@/lib/admin-auth";

// ============================================================
// GET   /api/admin/checks?type=license|document — hasil AI checker
// PATCH /api/admin/checks — update status DocumentCheck (NEW/FOLLOWED_UP/CONVERTED)
// ============================================================

const DOC_STATUSES = ["NEW", "FOLLOWED_UP", "CONVERTED"];

async function guard(): Promise<boolean> {
  const store = await cookies();
  return verifyToken(store.get(ADMIN_COOKIE)?.value);
}

export async function GET(req: NextRequest) {
  if (!(await guard())) {
    return NextResponse.json({ success: false, error: "Tidak terautentikasi" }, { status: 401 });
  }
  try {
    const type = req.nextUrl.searchParams.get("type") || "license";
    if (type === "document") {
      const rows = await db.documentCheck.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
      return NextResponse.json({ success: true, data: { rows, type } });
    }
    const rows = await db.licenseCheck.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
    return NextResponse.json({ success: true, data: { rows, type: "license" } });
  } catch (e) {
    return NextResponse.json(
      { success: false, error: e instanceof Error ? e.message : "Gagal memuat data checker" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  if (!(await guard())) {
    return NextResponse.json({ success: false, error: "Tidak terautentikasi" }, { status: 401 });
  }
  try {
    const { id, status } = await req.json();
    if (!id || !DOC_STATUSES.includes(status)) {
      return NextResponse.json({ success: false, error: "Payload tidak valid" }, { status: 400 });
    }
    const updated = await db.documentCheck.update({ where: { id }, data: { status } });
    return NextResponse.json({ success: true, data: updated });
  } catch (e) {
    return NextResponse.json(
      { success: false, error: e instanceof Error ? e.message : "Gagal memperbarui status dokumen" },
      { status: 500 }
    );
  }
}
