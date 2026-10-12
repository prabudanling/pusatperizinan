import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { publicOrder, applyOrderStatus } from "@/lib/payment/orders";
import { checkMidtransStatus, mapMidtransStatus } from "@/lib/payment/midtrans";
import { checkTripayStatus, mapTripayStatus } from "@/lib/payment/tripay";

// ============================================================
// GET /api/payment/status/[orderNo] — status pesanan (dipoll UI)
// Jika order masih PENDING, cek ulang langsung ke gateway
// (antidip: webhook bisa telat / tertahan). Nonblocking-errors.
// ============================================================

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ orderNo: string }> }
) {
  try {
    const { orderNo } = await params;
    let order = await db.order.findUnique({ where: { orderNo: orderNo.toUpperCase() } });

    if (!order) {
      return NextResponse.json({ ok: false, error: "Pesanan tidak ditemukan" }, { status: 404 });
    }

    // Kadaluarsa lokal (untuk provider tanpa webhook auto-expire)
    if (order.status === "PENDING" && order.expiresAt && order.expiresAt < new Date()) {
      await applyOrderStatus(order.orderNo, "EXPIRED");
      order = (await db.order.findUnique({ where: { orderNo: order.orderNo } }))!;
    }

    // Fallback polling gateway saat masih menunggu
    if (order.status === "PENDING") {
      if (order.provider === "midtrans") {
        const r = await checkMidtransStatus(order.orderNo);
        if (r.ok && r.status) {
          const next = mapMidtransStatus(r.status, r.fraudStatus);
          if (next !== "PENDING") {
            await applyOrderStatus(order.orderNo, next, {
              rawPayload: JSON.stringify({ source: "status-poll", transaction_status: r.status }),
            });
            order = (await db.order.findUnique({ where: { orderNo: order.orderNo } }))!;
          }
        }
      } else if (order.provider === "tripay") {
        const r = await checkTripayStatus(order.orderNo);
        if (r.ok && r.status) {
          const next = mapTripayStatus(r.status);
          if (next !== "PENDING") {
            await applyOrderStatus(order.orderNo, next, {
              rawPayload: JSON.stringify({ source: "status-poll", status: r.status }),
            });
            order = (await db.order.findUnique({ where: { orderNo: order.orderNo } }))!;
          }
        }
      }
    }

    return NextResponse.json({ ok: true, order: publicOrder(order) });
  } catch (e) {
    console.error("[payment/status] error:", e);
    return NextResponse.json({ ok: false, error: "Kesalahan server" }, { status: 500 });
  }
}
