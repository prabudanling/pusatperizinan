// ============================================================
// PUSATPERIZINAN.COM — TRIPAY PROVIDER
// ============================================================
// Dokumentasi resmi: https://tripay.co.id/developer
// Keunggulan untuk usaha perorangan: pendaftaran MUDAH (tanpa PT),
// biaya rendah, QRIS + VA + e-wallet + retail (Alfamart/Indomaret).
//
// Verifikasi keamanan webhook:
//   signature = HMAC-SHA256(merchant_ref + status, privateKey)
// Bila valid WAJIB membalas HTTP 200 {"success": true}.
// ============================================================

import { createHmac } from "crypto";
import { getTripayKeys } from "./config";

export function tripayBase(isProduction: boolean): string {
  return isProduction ? "https://tripay.co.id/api" : "https://tripay.co.id/api-sandbox";
}

export interface TripayCreateArgs {
  orderNo: string;
  amount: number;
  itemName: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  method: string; // kode kanal: QRIS, BRIVA, ...
  appUrl: string;
}

export interface TripayCreateResult {
  ok: boolean;
  reference?: string;
  checkoutUrl?: string;
  error?: string;
}

/** HMAC-SHA256 hex(merchantCode + merchantRef + amount, privateKey) */
export function tripayCreateSignature(orderNo: string, amount: number): string | null {
  const { privateKey, merchantCode } = getTripayKeys();
  if (!privateKey || !merchantCode) return null;
  return createHmac("sha256", privateKey)
    .update(merchantCode + orderNo + amount)
    .digest("hex");
}

export async function createTripayTransaction(
  args: TripayCreateArgs
): Promise<TripayCreateResult> {
  const { apiKey, isProduction, merchantCode } = getTripayKeys();
  if (!apiKey || !merchantCode) return { ok: false, error: "Tripay belum dikonfigurasi" };

  const signature = tripayCreateSignature(args.orderNo, args.amount);
  if (!signature) return { ok: false, error: "Tanda tangan Tripay gagal dibuat" };

  const body: Record<string, unknown> = {
    method: args.method,
    merchant_ref: args.orderNo,
    amount: args.amount,
    customer_name: args.customerName.slice(0, 100),
    customer_phone: args.customerPhone,
    order_items: [
      {
        sku: "JASA-PERIZINAN",
        name: args.itemName.slice(0, 80),
        price: args.amount,
        quantity: 1,
      },
    ],
    callback_url: `${args.appUrl}/api/payment/webhook/tripay`,
    return_url: `${args.appUrl}/payment/${args.orderNo}`,
    expired_time: Math.floor(Date.now() / 1000) + 24 * 3600, // 24 jam
    signature,
  };
  if (args.customerEmail) body.customer_email = args.customerEmail;

  try {
    const res = await fetch(`${tripayBase(isProduction)}/transaction/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(20_000),
    });
    const json = (await res.json().catch(() => null)) as
      | { success?: boolean; message?: string; data?: { reference?: string; checkout_url?: string } }
      | null;

    if (res.ok && json?.success && json?.data?.checkout_url) {
      return { ok: true, reference: json.data.reference, checkoutUrl: json.data.checkout_url };
    }
    return { ok: false, error: json?.message || `Tripay HTTP ${res.status}` };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Koneksi Tripay gagal" };
  }
}

/** Verifikasi tanda tangan webhook: HMAC-SHA256(merchant_ref + status) */
export function verifyTripayWebhook(merchantRef: string, status: string, signature: string): boolean {
  const { privateKey } = getTripayKeys();
  if (!privateKey) return false;
  const expected = createHmac("sha256", privateKey)
    .update(merchantRef + status)
    .digest("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature || ""));
  } catch {
    return false;
  }
}

/** Cek status transaksi langsung ke API Tripay (fallback bila webhook telat). */
export async function checkTripayStatus(orderNo: string): Promise<{
  ok: boolean;
  status?: string;
  error?: string;
}> {
  const { apiKey, isProduction } = getTripayKeys();
  if (!apiKey) return { ok: false, error: "Tripay belum dikonfigurasi" };
  try {
    const res = await fetch(
      `${tripayBase(isProduction)}/merchant/transaction/detail?ref=${encodeURIComponent(orderNo)}`,
      { headers: { Authorization: `Bearer ${apiKey}` }, signal: AbortSignal.timeout(15_000) }
    );
    const json = (await res.json().catch(() => null)) as
      | { success?: boolean; message?: string; data?: { status?: string } }
      | null;
    if (!res.ok || !json?.success) return { ok: false, error: json?.message || `HTTP ${res.status}` };
    return { ok: true, status: json.data?.status };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Koneksi gagal" };
  }
}

/** Petakan status Tripay → status Order internal. */
export function mapTripayStatus(status?: string): "PENDING" | "PAID" | "FAILED" | "EXPIRED" | "CANCELLED" {
  switch (status) {
    case "PAID":
      return "PAID";
    case "EXPIRED":
      return "EXPIRED";
    case "FAILED":
      return "FAILED";
    case "UNPAID":
      return "PENDING";
    default:
      return "PENDING";
  }
}
