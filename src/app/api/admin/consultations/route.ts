import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { ADMIN_COOKIE, verifyToken } from "@/lib/admin-auth";

// ============================================================
// GET   /api/admin/consultations — daftar permintaan konsultasi
// PATCH /api/admin/consultations — ubah status (PENDING/CONFIRMED/DONE/CANCELLED)
// ============================================================

const STATUSES = ["PENDING", "CONFIRMED", "DONE", "CANCELLED"];

async function guard(): Promise<boolean> {
  const store = await cookies();
  return verifyToken(store.get(ADMIN_COOKIE)?.value);
}

export async function GET(req: NextRequest) {
  if (!(await guard())) {
    return NextResponse.json({ success: false, error: "Tidak terautentikasi" }, { status: 401 });
  }
  try {
    const status = req.nextUrl.searchParams.get("status") || "";
    const rows = await db.consultation.findMany({
      where: status && STATUSES.includes(status) ? { status } : {},
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return NextResponse.json({ success: true, data: { rows } });
  } catch (e) {
    return NextResponse.json(
      { success: false, error: e instanceof Error ? e.message : "Gagal memuat konsultasi" },
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
    if (!id || !STATUSES.includes(status)) {
      return NextResponse.json({ success: false, error: "Payload tidak valid" }, { status: 400 });
    }
    const updated = await db.consultation.update({ where: { id }, data: { status } });
    return NextResponse.json({ success: true, data: updated });
  } catch (e) {
    return NextResponse.json(
      { success: false, error: e instanceof Error ? e.message : "Gagal memperbarui konsultasi" },
      { status: 500 }
    );
  }
}
