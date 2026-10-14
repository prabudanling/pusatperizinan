// ============================================================
// PUSATPERIZINAN.COM — MIDTRANS SNAP PROVIDER
// ============================================================
// Dokumentasi resmi: https://docs.midtrans.com
// Alur: buat transaksi Snap → user diarahkan ke redirect_url →
// user bayar (QRIS/VA/e-wallet) → Midtrans kirim webhook ke
// /api/payment/webhook/midtrans → status order diperbarui otomatis.
//
// Verifikasi keamanan webhook:
//   signature_key = sha512(order_id + status_code + gross_amount + serverKey)
// ============================================================

import { createHash } from "crypto";
import { getMidtransKeys } from "./config";

export function midtransBase(isProduction: boolean): string {
  return isProduction ? "https://app.midtrans.com" : "https://app.sandbox.midtrans.com";
}

export interface MidtransCreateArgs {
  orderNo: string;
  amount: number;
  itemName: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  appUrl: string;
}

export interface MidtransCreateResult {
  ok: boolean;
  token?: string;
  redirectUrl?: string;
  error?: string;
}

export async function createMidtransTransaction(
  args: MidtransCreateArgs
): Promise<MidtransCreateResult> {
  const { serverKey, isProduction } = getMidtransKeys();
  if (!serverKey) return { ok: false, error: "Midtrans belum dikonfigurasi" };

  const auth = Buffer.from(serverKey + ":").toString("base64");
  const finish = `${args.appUrl}/payment/${args.orderNo}`;

  const body: Record<string, unknown> = {
    transaction_details: {
      order_id: args.orderNo,
      gross_amount: args.amount,
    },
    item_details: [
      {
        id: "jasa-" + args.orderNo.toLowerCase().slice(-6),
        price: args.amount,
        quantity: 1,
        name: args.itemName.slice(0, 50),
      },
    ],
    customer_details: {
      first_name: args.customerName.slice(0, 60),
      phone: args.customerPhone,
    },
    expiry: { unit: "hour", duration: 24 },
    callbacks: { finish, unfinish: finish, error: finish },
  };
  if (args.customerEmail) {
    (body.customer_details as Record<string, unknown>).email = args.customerEmail;
  }

  try {
    const res = await fetch(`${midtransBase(isProduction)}/snap/v1/transactions`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(20_000),
    });
    const json = (await res.json().catch(() => null)) as
      | { token?: string; redirect_url?: string; error_messages?: string[]; status_code?: string }
      | null;

    if (res.ok && json?.token) {
      return { ok: true, token: json.token, redirectUrl: json.redirect_url };
    }
    const msg =
      json?.error_messages?.join("; ") ||
      json?.status_code ||
      `Midtrans HTTP ${res.status}`;
    return { ok: false, error: msg };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Koneksi Midtrans gagal" };
  }
}

/** sha512(order_id + status_code + gross_amount + serverKey) */
export function verifyMidtransSignature(payload: {
  order_id: string;
  status_code: string;
  gross_amount: string;
  signature_key: string;
}): boolean {
  const { serverKey } = getMidtransKeys();
  if (!serverKey) return false;
  const expected = createHash("sha512")
    .update(payload.order_id + payload.status_code + payload.gross_amount + serverKey)
    .digest("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(payload.signature_key || ""));
  } catch {
    return false;
  }
}

/** Cek status transaksi langsung ke API Midtrans (fallback bila webhook telat). */
export async function checkMidtransStatus(orderNo: string): Promise<{
  ok: boolean;
  status?: string;
  fraudStatus?: string;
  error?: string;
}> {
  const { serverKey, isProduction } = getMidtransKeys();
  if (!serverKey) return { ok: false, error: "Midtrans belum dikonfigurasi" };
  const auth = Buffer.from(serverKey + ":").toString("base64");
  try {
    const res = await fetch(`${midtransBase(isProduction)}/v2/${encodeURIComponent(orderNo)}/status`, {
      headers: { Accept: "application/json", Authorization: `Basic ${auth}` },
      signal: AbortSignal.timeout(15_000),
    });
    const json = (await res.json().catch(() => null)) as
      | { transaction_status?: string; fraud_status?: string; status_message?: string }
      | null;
    if (!res.ok) return { ok: false, error: json?.status_message || `HTTP ${res.status}` };
    return { ok: true, status: json?.transaction_status, fraudStatus: json?.fraud_status };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Koneksi gagal" };
  }
}

/** Petakan transaction_status Midtrans → status Order internal. */
export function mapMidtransStatus(
  transactionStatus?: string,
  fraudStatus?: string
): "PENDING" | "PAID" | "FAILED" | "EXPIRED" | "CANCELLED" | "CHALLENGE" | "REFUNDED" {
  switch (transactionStatus) {
    case "capture":
    case "settlement":
      return fraudStatus === "challenge" ? "CHALLENGE" : "PAID";
    case "pending":
      return "PENDING";
    case "deny":
      return "FAILED";
    case "cancel":
      return "CANCELLED";
    case "expire":
      return "EXPIRED";
    case "refund":
    case "partial_refund":
      return "REFUNDED";
    default:
      return "PENDING";
  }
}
