import type { Metadata } from "next";
import { StatusClient } from "@/components/payment/status-client";

// ============================================================
// PUSATPERIZINAN.COM — STATUS PESANAN
// /payment/INV-20261011-XXXXXX — noindex (data pribadi).
// ============================================================

export const metadata: Metadata = {
  title: "Status Pesanan | PusatPerizinan.com",
  robots: { index: false, follow: false },
};

export default async function PaymentStatusPage({
  params,
}: {
  params: Promise<{ orderNo: string }>;
}) {
  const { orderNo } = await params;
  return <StatusClient orderNo={orderNo} />;
}
