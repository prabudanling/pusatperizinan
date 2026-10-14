import { NextRequest, NextResponse } from "next/server";
import { applyOrderStatus } from "@/lib/payment/orders";
import { verifyTripayWebhook, mapTripayStatus } from "@/lib/payment/tripay";

// ============================================================
// POST /api/payment/webhook/tripay — notifikasi pembayaran Tripay
// Konfigurasi: Dashboard Tripay → Merchant → URL Callback
//   https://pusatperizinan.com/api/payment/webhook/tripay
//
// AMAN: signature = HMAC-SHA256(merchant_ref + status, privateKey).
// Wajib membalas {"success": true} bila diterima.
// ============================================================

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => null)) as {
      merchant_ref?: string;
      status?: string;
      signature?: string;
      payment_method?: string;
    } | null;

    if (!body?.merchant_ref || !body?.status) {
      return NextResponse.json({ success: false, error: "Payload tidak lengkap" }, { status: 400 });
    }

    // 1) Verifikasi tanda tangan HMAC
    const valid = verifyTripayWebhook(body.merchant_ref, body.status, body.signature ?? "");
    if (!valid) {
      console.warn("[webhook/tripay] signature TIDAK VALID untuk", body.merchant_ref);
      return NextResponse.json({ success: false, error: "Signature tidak valid" }, { status: 403 });
    }

    // 2) Petakan & terapkan status (idempoten)
    const next = mapTripayStatus(body.status);
    const result = await applyOrderStatus(body.merchant_ref, next, {
      paymentMethod: body.payment_method ?? undefined,
      rawPayload: JSON.stringify({ source: "webhook", ...body }),
    });

    if (!result.ok) {
      return NextResponse.json({ success: false, error: result.error }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("[webhook/tripay] error:", e);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
