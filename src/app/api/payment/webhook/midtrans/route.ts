import { NextRequest, NextResponse } from "next/server";
import { applyOrderStatus } from "@/lib/payment/orders";
import { verifyMidtransSignature, mapMidtransStatus } from "@/lib/payment/midtrans";

// ============================================================
// POST /api/payment/webhook/midtrans — notifikasi pembayaran Midtrans
// Konfigurasi di Dashboard Midtrans → Settings → Payment
// Notification URL: https://pusatperizinan.com/api/payment/webhook/midtrans
//
// AMAN: signature_key diverifikasi sha512(order_id+status_code+
// gross_amount+serverKey). Status PAID terlindungi dari replay.
// ============================================================

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => null)) as {
      order_id?: string;
      status_code?: string;
      gross_amount?: string;
      signature_key?: string;
      transaction_status?: string;
      fraud_status?: string;
      payment_type?: string;
    } | null;

    if (!body?.order_id || !body?.signature_key) {
      return NextResponse.json({ received: false, error: "Payload tidak lengkap" }, { status: 400 });
    }

    // 1) Verifikasi tanda tangan kriptografi
    const valid = verifyMidtransSignature({
      order_id: body.order_id,
      status_code: String(body.status_code ?? ""),
      gross_amount: String(body.gross_amount ?? ""),
      signature_key: body.signature_key,
    });
    if (!valid) {
      console.warn("[webhook/midtrans] signature TIDAK VALID untuk", body.order_id);
      return NextResponse.json({ received: false, error: "Signature tidak valid" }, { status: 403 });
    }

    // 2) Petakan & terapkan status (idempoten)
    const next = mapMidtransStatus(body.transaction_status, body.fraud_status);
    const result = await applyOrderStatus(body.order_id, next, {
      paymentMethod: body.payment_type ?? undefined,
      rawPayload: JSON.stringify({ source: "webhook", ...body }),
    });

    if (!result.ok) {
      return NextResponse.json({ received: false, error: result.error }, { status: 404 });
    }

    // Midtrans menerima 2xx apapun — kirim 200 eksplisit
    return NextResponse.json({ received: true, changed: result.changed, status: result.order?.status });
  } catch (e) {
    console.error("[webhook/midtrans] error:", e);
    // Tetap 200 agar Midtrans tidak spam retry saat bug transient?
    // TIDAK — 500 benar agar retry terjadi untuk error database.
    return NextResponse.json({ received: false }, { status: 500 });
  }
}
