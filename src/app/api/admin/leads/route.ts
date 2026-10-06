import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { ADMIN_COOKIE, verifyToken } from "@/lib/admin-auth";

// ============================================================
// GET   /api/admin/leads — daftar lead (search/filter/sort/paginasi)
// PATCH /api/admin/leads — update status / catatan / nilai / paket
// ============================================================

const STATUSES = ["NEW", "CONTACTED", "CONSULTED", "CLOSED_WON", "CLOSED_LOST"];

async function guard(): Promise<boolean> {
  const store = await cookies();
  return verifyToken(store.get(ADMIN_COOKIE)?.value);
}

export async function GET(req: NextRequest) {
  if (!(await guard())) {
    return NextResponse.json({ success: false, error: "Tidak terautentikasi" }, { status: 401 });
  }
  try {
    const sp = req.nextUrl.searchParams;
    const q = sp.get("query")?.trim() || "";
    const status = sp.get("status") || "";
    const source = sp.get("source") || "";
    const sort = sp.get("sort") || "newest";
    const page = Math.max(1, Number(sp.get("page") || 1));
    const all = sp.get("all") === "1";
    const perPage = all ? 500 : 10;

    const where = {
      ...(q && {
        OR: [
          { name: { contains: q } },
          { whatsapp: { contains: q } },
          { businessType: { contains: q } },
        ],
      }),
      ...(status && STATUSES.includes(status) ? { status } : {}),
      ...(source ? { source } : {}),
    };

    const orderBy =
      sort === "value" ? { estimatedValue: "desc" as const }
      : sort === "oldest" ? { createdAt: "asc" as const }
      : { createdAt: "desc" as const };

    const [total, rows] = await Promise.all([
      db.lead.count({ where }),
      db.lead.findMany({ where, orderBy, take: perPage, skip: (page - 1) * perPage }),
    ]);

    return NextResponse.json({
      success: true,
      data: { rows, total, page, perPage, pages: Math.max(1, Math.ceil(total / perPage)) },
    });
  } catch (e) {
    return NextResponse.json(
      { success: false, error: e instanceof Error ? e.message : "Gagal memuat leads" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  if (!(await guard())) {
    return NextResponse.json({ success: false, error: "Tidak terautentikasi" }, { status: 401 });
  }
  try {
    const { id, status, notes, estimatedValue, package: pkg } = await req.json();
    if (!id) return NextResponse.json({ success: false, error: "id wajib" }, { status: 400 });

    const data: Record<string, unknown> = {};
    if (status !== undefined) {
      if (!STATUSES.includes(status)) {
        return NextResponse.json({ success: false, error: "Status tidak valid" }, { status: 400 });
      }
      data.status = status;
    }
    if (notes !== undefined) data.notes = notes;
    if (estimatedValue !== undefined) data.estimatedValue = Math.max(0, Number(estimatedValue) || 0);
    if (pkg !== undefined) data.package = pkg;
    if (Object.keys(data).length === 0) {
      return NextResponse.json({ success: false, error: "Tidak ada perubahan" }, { status: 400 });
    }

    const updated = await db.lead.update({ where: { id }, data });
    return NextResponse.json({ success: true, data: updated });
  } catch (e) {
    return NextResponse.json(
      { success: false, error: e instanceof Error ? e.message : "Gagal memperbarui lead" },
      { status: 500 }
    );
  }
}
