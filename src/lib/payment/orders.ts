// ============================================================
// PUSATPERIZINAN.COM — ORDER HELPERS (transisi status & notifikasi)
// ============================================================
// Aturan transisi (idempoten — webhook boleh datang berkali-kali):
//   PENDING → PAID | FAILED | EXPIRED | CANCELLED | CHALLENGE
//   PAID    → REFUNDED (satu-satunya jalur keluar dari PAID)
// Bila status lama = PAID dan payload bukan REFUNDED, update
// DIABAIKAN (dilindungi) — mencegah penipuan via replay webhook.
// ============================================================

import { db } from "@/lib/db";
import { notifyOrder } from "@/lib/notify";
import type { Order } from "@prisma/client";

const FINAL_SUCCESS = "PAID";

/** Bentuk order yang aman dikirim ke client (tanpa payload mentah). */
export function publicOrder(order: Order) {
  return {
    orderNo: order.orderNo,
    serviceName: order.serviceName,
    amount: order.amount,
    customerName: order.customerName,
    customerPhone: order.customerPhone,
    provider: order.provider,
    paymentMethod: order.paymentMethod,
    checkoutUrl: order.checkoutUrl,
    status: order.status,
    paidAt: order.paidAt,
    expiresAt: order.expiresAt,
    createdAt: order.createdAt,
    notes: order.notes,
  };
}

export type PublicOrder = ReturnType<typeof publicOrder>;

/**
 * Terapkan status baru pada order dengan aturan idempoten.
 * Mengembalikan order terbaru + apakah status berubah.
 */
export async function applyOrderStatus(
  orderNo: string,
  next: string,
  extra?: { paymentMethod?: string; rawPayload?: string; providerRef?: string }
): Promise<{ ok: boolean; changed: boolean; order?: Order; error?: string }> {
  try {
    const order = await db.order.findUnique({ where: { orderNo } });
    if (!order) return { ok: false, changed: false, error: "Order tidak ditemukan" };

    // Lindungi status sukses: PAID hanya boleh berubah jadi REFUNDED
    if (order.status === FINAL_SUCCESS && next !== "REFUNDED") {
      return { ok: true, changed: false, order };
    }
    // Status identik → tidak perlu update
    if (order.status === next) {
      return { ok: true, changed: false, order };
    }

    const updated = await db.order.update({
      where: { orderNo },
      data: {
        status: next,
        paymentMethod: extra?.paymentMethod ?? order.paymentMethod,
        paymentRef: extra?.providerRef ?? order.paymentRef,
        rawPayload: extra?.rawPayload ?? order.rawPayload,
        paidAt: next === "PAID" ? new Date() : order.paidAt,
      },
    });

    // Notifikasi pemilik usaha pada momen penting
    if (next === "PAID" && order.status !== "PAID") {
      void notifyOrder(
        {
          orderNo: updated.orderNo,
          serviceName: updated.serviceName,
          amount: updated.amount,
          customerName: updated.customerName,
          customerPhone: updated.customerPhone,
          provider: updated.provider,
          paymentMethod: updated.paymentMethod,
        },
        "PAID"
      );
    }

    return { ok: true, changed: true, order: updated };
  } catch (e) {
    console.error("[orders] applyOrderStatus error:", e);
    return { ok: false, changed: false, error: e instanceof Error ? e.message : "Gagal update order" };
  }
}

/** Ambil appUrl dari request headers (aman di Hostinger/Passenger & lokal). */
export function appUrlFromHeaders(h: Headers): string {
  const host = h.get("x-forwarded-host") || h.get("host") || "";
  if (!host) return process.env.NEXT_PUBLIC_SITE_URL || "https://pusatperizinan.com";
  const proto = h.get("x-forwarded-proto") || (host.startsWith("localhost") || host.startsWith("127.") ? "http" : "https");
  return `${proto}://${host}`;
}
