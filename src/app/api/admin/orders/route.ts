import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { ADMIN_COOKIE, verifyToken } from "@/lib/admin-auth";

// ============================================================
// GET   /api/admin/orders — daftar pesanan (search/filter/paginasi)
// PATCH /api/admin/orders — admin ubah status manual (mis. transfer
//         manual dikonfirmasi, atau kembalikan ke PENDING)
// ============================================================

const STATUSES = ["PENDING", "PAID", "FAILED", "EXPIRED", "CANCELLED", "CHALLENGE", "REFUNDED"];

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
    const sort = sp.get("sort") || "newest";
    const page = Math.max(1, Number(sp.get("page") || 1));
    const perPage = 15;

    const where = {
      ...(q && {
        OR: [
          { orderNo: { contains: q } },
          { customerName: { contains: q } },
          { customerPhone: { contains: q } },
          { serviceName: { contains: q } },
        ],
      }),
      ...(status && { status }),
    };

    const [total, orders, agg] = await Promise.all([
      db.order.count({ where }),
      db.order.findMany({
        where,
        orderBy: { createdAt: sort === "oldest" ? "asc" : "desc" },
        skip: (page - 1) * perPage,
        take: perPage,
      }),
      db.order.groupBy({ by: ["status"], _count: { _all: true } }),
    ]);

    const revenue = await db.order.aggregate({
      _sum: { amount: true },
      where: { status: "PAID" },
    });

    return NextResponse.json({
      success: true,
      data: {
        rows: orders.map((o) => ({
          id: o.id,
          orderNo: o.orderNo,
          serviceName: o.serviceName,
          amount: o.amount,
          customerName: o.customerName,
          customerPhone: o.customerPhone,
          provider: o.provider,
          paymentMethod: o.paymentMethod,
          status: o.status,
          notes: o.notes,
          createdAt: o.createdAt,
          paidAt: o.paidAt,
        })),
        total,
        page,
        perPage,
        pages: Math.max(1, Math.ceil(total / perPage)),
        byStatus: agg.map((g) => ({ status: g.status, count: g._count._all })),
        paidTotal: revenue._sum.amount || 0,
      },
    });
  } catch (e) {
    console.error("[admin/orders] GET error:", e);
    return NextResponse.json({ success: false, error: "Kesalahan server" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!(await guard())) {
    return NextResponse.json({ success: false, error: "Tidak terautentikasi" }, { status: 401 });
  }
  try {
    const body = (await req.json()) as { orderNo?: string; status?: string };
    if (!body.orderNo || !body.status || !STATUSES.includes(body.status)) {
      return NextResponse.json({ success: false, error: "orderNo & status wajib valid" }, { status: 400 });
    }

    const updated = await db.order.update({
      where: { orderNo: body.orderNo },
      data: {
        status: body.status,
        paidAt: body.status === "PAID" ? new Date() : undefined,
      },
    });

    return NextResponse.json({ success: true, data: { orderNo: updated.orderNo, status: updated.status } });
  } catch (e) {
    console.error("[admin/orders] PATCH error:", e);
    return NextResponse.json({ success: false, error: "Gagal update pesanan" }, { status: 500 });
  }
}
