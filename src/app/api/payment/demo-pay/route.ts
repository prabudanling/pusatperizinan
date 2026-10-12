import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { applyOrderStatus } from "@/lib/payment/orders";

// ============================================================
// POST /api/payment/demo-pay — SIMULASI pembayaran (UJI COBA)
// ============================================================
// AKTIF HANYA bila PAYMENT_DEMO_MODE=true DAN order.provider=demo.
// Bila kunci Midtrans/Tripay terpasang, config resolver memilih
// provider asli sehingga endpoint ini MENOLAK semua order —
// mustahil order produksi dibayar palsu lewat jalur demo.
// ============================================================

export async function POST(req: NextRequest) {
  try {
    if (process.env.PAYMENT_DEMO_MODE !== "true") {
      return NextResponse.json(
        { ok: false, error: "Mode uji coba tidak aktif" },
        { status: 403 }
      );
    }

    const body = (await req.json().catch(() => null)) as { orderNo?: string } | null;
    const orderNo = String(body?.orderNo || "").toUpperCase();
    if (!orderNo) {
      return NextResponse.json({ ok: false, error: "orderNo wajib" }, { status: 400 });
    }

    const order = await db.order.findUnique({ where: { orderNo } });
    if (!order) {
      return NextResponse.json({ ok: false, error: "Pesanan tidak ditemukan" }, { status: 404 });
    }
    if (order.provider !== "demo") {
      return NextResponse.json(
        { ok: false, error: "Pesanan ini bukan mode uji coba" },
        { status: 403 }
      );
    }

    // Simulasi: QRIS sukses
    const result = await applyOrderStatus(orderNo, "PAID", {
      paymentMethod: "DEMO-QRIS",
      rawPayload: JSON.stringify({ source: "demo-pay", simulated: true, at: new Date().toISOString() }),
    });

    return NextResponse.json({ ok: result.ok, changed: result.changed, status: result.order?.status });
  } catch (e) {
    console.error("[payment/demo-pay] error:", e);
    return NextResponse.json({ ok: false, error: "Kesalahan server" }, { status: 500 });
  }
}
