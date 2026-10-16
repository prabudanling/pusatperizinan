import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckoutFromQuery } from "@/components/payment/checkout-client";

// ============================================================
// PUSATPERIZINAN.COM — CHECKOUT (Bayar Langsung)
// /checkout?paket=nib — halaman transaksi, noindex (thin content).
// Static-export friendly: `?paket=` dibaca CLIENT-side via
// useSearchParams (CheckoutFromQuery + Suspense), sehingga halaman
// bisa di-prerender untuk hosting statis TANPA mengubah perilaku
// runtime (dev & standalone tetap identik).
// ============================================================

export const metadata: Metadata = {
  title: "Checkout — Pesan & Bayar Langsung | PusatPerizinan.com",
  description:
    "Selesaikan pesanan jasa perizinan: QRIS, Virtual Account semua bank, e-wallet, dan gerai retail. Struk otomatis, diproses langsung setelah bayar.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <Suspense fallback={null}>
      <CheckoutFromQuery />
    </Suspense>
  );
}
