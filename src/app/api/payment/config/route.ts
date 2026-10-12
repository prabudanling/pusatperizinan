import { NextResponse } from "next/server";
import { getPaymentConfig } from "@/lib/payment/config";
import { CONTACT } from "@/lib/site";

// ============================================================
// GET /api/payment/config — jalur pembayaran aktif untuk UI checkout
// TIDAK membocorkan kunci rahasia — hanya status & metode tampil.
// ============================================================

export async function GET() {
  const cfg = getPaymentConfig();
  return NextResponse.json({
    ok: true,
    provider: cfg.provider,
    mode: cfg.mode,
    label: cfg.label,
    methods: cfg.methods,
    manualInfo: cfg.manualInfo || null,
    whatsapp: CONTACT.whatsapp,
  });
}
