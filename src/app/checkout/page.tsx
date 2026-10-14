import type { Metadata } from "next";
import { CheckoutClient } from "@/components/payment/checkout-client";

// ============================================================
// PUSATPERIZINAN.COM — CHECKOUT (Bayar Langsung)
// /checkout?paket=nib — halaman transaksi, noindex (thin content).
// ============================================================

export const metadata: Metadata = {
  title: "Checkout — Pesan & Bayar Langsung | PusatPerizinan.com",
  description:
    "Selesaikan pesanan jasa perizinan: QRIS, Virtual Account semua bank, e-wallet, dan gerai retail. Struk otomatis, diproses langsung setelah bayar.",
  robots: { index: false, follow: false },
};

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ paket?: string }>;
}) {
  const { paket } = await searchParams;
  return <CheckoutClient initialPaket={paket || ""} />;
}
