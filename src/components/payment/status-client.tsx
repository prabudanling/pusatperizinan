"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2, Clock3, XCircle, Hourglass, Loader2, Copy, Check,
  ChevronRight, Sparkles, Wallet, PartyPopper, Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fmtRupiah } from "@/lib/pricing";
import { CONTACT } from "@/lib/site";

// ============================================================
// STATUS CLIENT — halaman status pesanan (dipoll tiap 4 detik)
// PENDING → animasi menunggu + tombol bayar ulang
// PAID    → perayaan + langkah selanjutnya + tombol WA
// ============================================================

interface OrderView {
  orderNo: string;
  serviceName: string;
  amount: number;
  customerName: string;
  customerPhone: string;
  provider: string;
  paymentMethod: string | null;
  checkoutUrl: string | null;
  status: string;
  paidAt: string | null;
  expiresAt: string | null;
  createdAt: string;
}

const NEXT_STEPS: Record<string, string[]> = {
  "konsultasi-30": [
    "Admin menghubungi WhatsApp-mu untuk mengatur jadwal sesi",
    "Sesi konsultasi 30 menit via WA call / Zoom",
    "Kamu terima ringkasan peta izin + estimasi biaya",
  ],
  default: [
    "Admin menghubungi WhatsApp-mu untuk melengkapi data usaha",
    "Tim kami memproses pengajuan sesuai paket",
    "Dokumen resmi dikirim ke WhatsApp & email-mu",
  ],
};

function StatusIcon({ status }: { status: string }) {
  const cls = "h-14 w-14";
  if (status === "PAID")
    return (
      <div className="mx-auto h-20 w-20 rounded-full bg-green-100 text-green-600 flex items-center justify-center animate-in zoom-in-50 duration-500">
        <CheckCircle2 className={cls} />
      </div>
    );
  if (status === "PENDING")
    return (
      <div className="mx-auto h-20 w-20 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
        <Clock3 className={`${cls} animate-pulse`} />
      </div>
    );
  if (status === "CHALLENGE")
    return (
      <div className="mx-auto h-20 w-20 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
        <Hourglass className={cls} />
      </div>
    );
  return (
    <div className="mx-auto h-20 w-20 rounded-full bg-destructive/10 text-destructive flex items-center justify-center">
      <XCircle className={cls} />
    </div>
  );
}

const STATUS_TITLE: Record<string, string> = {
  PAID: "Pembayaran Berhasil!",
  PENDING: "Menunggu Pembayaran",
  CHALLENGE: "Sedang Diperiksa (Fraud Check)",
  FAILED: "Pembayaran Gagal",
  EXPIRED: "Pesanan Kedaluwarsa",
  CANCELLED: "Pesanan Dibatalkan",
  REFUNDED: "Dana Dikembalikan",
};

const STATUS_DESC: Record<string, string> = {
  PAID: "Pembayaranmu sudah kami terima. Tim kami langsung bergerak!",
  PENDING: "Selesaikan pembayaran sebelum batas waktu. Status halaman ini diperbarui otomatis.",
  CHALLENGE: "Transaksi kamu sedang diperiksa singkat oleh penyedia pembayaran. Biasanya selesai dalam hitungan menit.",
  FAILED: "Pembayaran tidak berhasil. Silakan coba lagi dengan metode lain.",
  EXPIRED: "Batas waktu pembayaran lewat. Buat pesanan baru — datamu tidak hilang.",
  CANCELLED: "Pesanan dibatalkan. Buat pesanan baru bila ingin lanjut.",
  REFUNDED: "Dana sudah dikembalikan sesuai kebijakan.",
};

export function StatusClient({ orderNo }: { orderNo: string }) {
  const [order, setOrder] = useState<OrderView | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [simulating, setSimulating] = useState(false);
  const [copied, setCopied] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch(`/api/payment/status/${encodeURIComponent(orderNo)}`, { cache: "no-store" });
      if (res.status === 404) {
        setNotFound(true);
        return;
      }
      const json = (await res.json()) as { ok: boolean; order?: OrderView };
      if (json.ok && json.order) setOrder(json.order);
    } catch {
      // biarkan polling mencoba lagi
    } finally {
      setLoading(false);
    }
  }, [orderNo]);

  useEffect(() => {
    void load();
    pollRef.current = setInterval(() => {
      void load();
    }, 4000);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [load]);

  function copyOrderNo() {
    if (!order) return;
    navigator.clipboard?.writeText(order.orderNo).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  }

  async function simulatePay() {
    if (!order) return;
    setSimulating(true);
    try {
      await fetch("/api/payment/demo-pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderNo: order.orderNo }),
      });
      await load();
    } finally {
      setSimulating(false);
    }
  }

  // ---------- Loading ----------
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center space-y-3">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Memuat status pesanan…</p>
        </div>
      </div>
    );
  }

  // ---------- Tidak ditemukan ----------
  if (notFound || !order) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <XCircle className="mx-auto h-12 w-12 text-muted-foreground" />
        <h1 className="mt-4 text-xl font-bold">Pesanan tidak ditemukan</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Periksa kembali nomor pesanan, atau buat pesanan baru di halaman checkout.
        </p>
        <Link href="/checkout">
          <Button className="mt-6 rounded-xl font-bold">Buat Pesanan Baru</Button>
        </Link>
      </div>
    );
  }

  const paid = order.status === "PAID";
  const isDemo = order.provider === "demo";
  const steps = NEXT_STEPS[order.serviceName.startsWith("Konsultasi") ? "konsultasi-30" : "default"] ?? [];
  const waText = encodeURIComponent(
    `Halo PusatPerizinan, saya ${order.customerName} — pesanan ${order.orderNo} (${order.serviceName}, ${fmtRupiah(order.amount)}) status: ${order.status}. Mohon bantuannya.`
  );

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 md:py-16">
      <Card className={`border shadow-xl ${paid ? "border-green-500/40" : "border-border"}`}>
        <CardContent className="p-6 sm:p-10 space-y-6 text-center">
          <StatusIcon status={order.status} />

          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">
              {STATUS_TITLE[order.status] || order.status}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">{STATUS_DESC[order.status] || ""}</p>
          </div>

          {isDemo && (
            <p className="rounded-full bg-primary/10 text-primary text-xs font-bold px-4 py-1.5 inline-flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" /> MODE UJI COBA — tidak ada uang sungguhan
            </p>
          )}

          {/* Rincian */}
          <div className="rounded-xl border bg-muted/30 p-4 text-left space-y-2.5 text-sm">
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground">No. Pesanan</span>
              <button onClick={copyOrderNo} className="font-mono font-bold inline-flex items-center gap-1.5 hover:text-primary" aria-label="Salin nomor pesanan">
                {order.orderNo}
                {copied ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground">Layanan</span>
              <span className="font-semibold text-right">{order.serviceName}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground">Nama</span>
              <span className="font-semibold">{order.customerName}</span>
            </div>
            {order.paymentMethod && (
              <div className="flex items-center justify-between gap-2">
                <span className="text-muted-foreground">Metode</span>
                <span className="font-semibold">{order.paymentMethod}</span>
              </div>
            )}
            <div className="flex items-center justify-between gap-2 border-t pt-2.5">
              <span className="text-muted-foreground">Total</span>
              <span className="text-xl font-extrabold text-primary">{fmtRupiah(order.amount)}</span>
            </div>
          </div>

          {/* Aksi sesuai status */}
          {order.status === "PENDING" && (
            <div className="space-y-3">
              {isDemo ? (
                <Button
                  onClick={simulatePay}
                  disabled={simulating}
                  className="w-full h-12 rounded-xl font-extrabold text-base"
                >
                  {simulating ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <PartyPopper className="h-5 w-5" /> Simulasikan Pembayaran Berhasil
                    </>
                  )}
                </Button>
              ) : (
                <>
                  {order.checkoutUrl && (
                    <a href={order.checkoutUrl} target="_blank" rel="noreferrer">
                      <Button className="w-full h-12 rounded-xl font-extrabold text-base">
                        <Wallet className="h-5 w-5" /> Bayar Sekarang
                      </Button>
                    </a>
                  )}
                  <a href={`https://wa.me/${CONTACT.whatsapp}?text=${waText}`} target="_blank" rel="noreferrer">
                    <Button variant="outline" className="w-full rounded-xl font-bold">
                      <Phone className="h-4 w-4" /> Tanya Admin via WhatsApp
                    </Button>
                  </a>
                </>
              )}
            </div>
          )}

          {order.status === "FAILED" || order.status === "EXPIRED" || order.status === "CANCELLED" ? (
            <Link href="/checkout">
              <Button className="w-full h-12 rounded-xl font-extrabold text-base">
                Buat Pesanan Baru <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          ) : null}

          {/* Langkah selanjutnya (setelah PAID) */}
          {paid && (
            <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-4 text-left space-y-3">
              <p className="font-bold text-sm text-green-700">Langkah selanjutnya:</p>
              <ol className="space-y-2">
                {steps.map((s, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm">
                    <span className="h-5 w-5 shrink-0 rounded-full bg-green-600 text-white text-[10px] font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ol>
              <a href={`https://wa.me/${CONTACT.whatsapp}?text=${waText}`} target="_blank" rel="noreferrer" className="block">
                <Button className="w-full rounded-xl font-bold bg-green-600 hover:bg-green-700 text-white">
                  <Phone className="h-4 w-4" /> Hubungi Admin Sekarang
                </Button>
              </a>
            </div>
          )}

          {/* Info polling */}
          {order.status === "PENDING" && (
            <p className="flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
              <Loader2 className="h-3 w-3 animate-spin" /> Status diperbarui otomatis setiap 4 detik —
              tidak perlu muat ulang halaman.
            </p>
          )}

          <Link href="/" className="inline-block text-xs text-primary hover:underline">
            ← Kembali ke beranda
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
