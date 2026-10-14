import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getPackage, generateOrderNo, normalizeWa } from "@/lib/pricing";
import { getPaymentConfig } from "@/lib/payment/config";
import { createMidtransTransaction } from "@/lib/payment/midtrans";
import { createTripayTransaction } from "@/lib/payment/tripay";
import { appUrlFromHeaders } from "@/lib/payment/orders";
import { notifyOrder } from "@/lib/notify";

// ============================================================
// POST /api/payment/create — buat order + sesi pembayaran
// Body: { paketId, name, phone, email?, notes?, method? }
// Harga SELALU dari pricing.ts (server) — input client tidak dipercaya.
// ============================================================

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => null)) as {
      paketId?: string;
      name?: string;
      phone?: string;
      email?: string;
      notes?: string;
      method?: string;
    } | null;

    const paket = getPackage(String(body?.paketId || ""));
    if (!paket) {
      return NextResponse.json({ ok: false, error: "Paket tidak ditemukan" }, { status: 400 });
    }

    const name = String(body?.name || "").trim();
    if (name.length < 3 || name.length > 100) {
      return NextResponse.json({ ok: false, error: "Nama wajib diisi (3-100 karakter)" }, { status: 400 });
    }

    const phone = normalizeWa(String(body?.phone || ""));
    if (!phone) {
      return NextResponse.json(
        { ok: false, error: "Nomor WhatsApp tidak valid (contoh: 081234567890)" },
        { status: 400 }
      );
    }

    const email = body?.email ? String(body.email).trim().slice(0, 120) : null;
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "Format email tidak valid" }, { status: 400 });
    }
    const notes = body?.notes ? String(body.notes).trim().slice(0, 500) : null;

    const cfg = getPaymentConfig();
    const appUrl = appUrlFromHeaders(req.headers);
    const orderNo = generateOrderNo();

    const provider = cfg.provider;
    let paymentMethod: string | null = null;
    let paymentRef: string | null = null;
    let checkoutUrl: string | null = null;
    const expiresAt = new Date(Date.now() + 24 * 3600 * 1000);
    let rawPayload: string | null = null;

    // ---------- MIDTRANS ----------
    if (provider === "midtrans") {
      const snap = await createMidtransTransaction({
        orderNo,
        amount: paket.price,
        itemName: paket.name,
        customerName: name,
        customerPhone: phone,
        customerEmail: email || undefined,
        appUrl,
      });
      if (!snap.ok) {
        return NextResponse.json(
          { ok: false, error: `Gagal membuat pembayaran Midtrans: ${snap.error}` },
          { status: 502 }
        );
      }
      paymentRef = snap.token ?? null;
      checkoutUrl = snap.redirectUrl ?? null;
      rawPayload = JSON.stringify({ token: snap.token });
    }

    // ---------- TRIPAY ----------
    else if (provider === "tripay") {
      const method = String(body?.method || "").toUpperCase();
      const allowed = cfg.methods.map((m) => m.code);
      if (!allowed.includes(method)) {
        return NextResponse.json(
          { ok: false, error: "Pilih salah satu metode pembayaran yang tersedia" },
          { status: 400 }
        );
      }
      paymentMethod = method;
      const tp = await createTripayTransaction({
        orderNo,
        amount: paket.price,
        itemName: paket.name,
        customerName: name,
        customerPhone: phone,
        customerEmail: email || undefined,
        method,
        appUrl,
      });
      if (!tp.ok) {
        return NextResponse.json(
          { ok: false, error: `Gagal membuat pembayaran Tripay: ${tp.error}` },
          { status: 502 }
        );
      }
      paymentRef = tp.reference ?? null;
      checkoutUrl = tp.checkoutUrl ?? null;
      rawPayload = JSON.stringify({ reference: tp.reference });
    }

    // ---------- DEMO / MANUAL ----------
    // Tidak memanggil gateway — order menunggu konfirmasi (demo-pay / transfer WA).
    if (provider === "demo") {
      paymentMethod = "DEMO";
    }

    const order = await db.order.create({
      data: {
        orderNo,
        serviceId: paket.id,
        serviceName: paket.name,
        amount: paket.price, // server-side source of truth
        customerName: name,
        customerPhone: phone,
        customerEmail: email,
        notes,
        provider,
        paymentMethod,
        paymentRef,
        checkoutUrl,
        status: "PENDING",
        rawPayload,
        expiresAt,
      },
    });

    // Notifikasi "pesanan baru dibuat" (fire-and-forget, tak menahan respons)
    void notifyOrder(
      {
        orderNo: order.orderNo,
        serviceName: order.serviceName,
        amount: order.amount,
        customerName: order.customerName,
        customerPhone: order.customerPhone,
        provider: order.provider,
        paymentMethod: order.paymentMethod,
      },
      "PENDING"
    );

    return NextResponse.json({
      ok: true,
      orderNo: order.orderNo,
      provider,
      statusUrl: `/payment/${order.orderNo}`,
      redirectUrl: checkoutUrl, // midtrans: Snap page; tripay: checkout_url
      manualMode: provider === "manual",
      demoMode: provider === "demo",
    });
  } catch (e) {
    console.error("[payment/create] error:", e);
    return NextResponse.json({ ok: false, error: "Terjadi kesalahan server" }, { status: 500 });
  }
}
