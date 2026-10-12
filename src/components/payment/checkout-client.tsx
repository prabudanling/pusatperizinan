"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ShieldCheck, Clock, BadgeCheck, Loader2, ChevronRight,
  Wallet, Landmark, QrCode, Store, Sparkles, Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { PACKAGES, getPackage, fmtRupiah, PAKET_LABEL, type PaketLayanan } from "@/lib/pricing";

// ============================================================
// CHECKOUT CLIENT — pilih paket → isi data → bayar
// Jalur otomatis: Midtrans / Tripay (QRIS, VA, e-wallet, retail)
// Jalur cadangan: Mode Uji Coba (simulasi) / Transfer manual + WA
// ============================================================

interface CfgResponse {
  ok: boolean;
  provider: "midtrans" | "tripay" | "demo" | "manual";
  mode: string;
  label: string;
  methods: { code: string; label: string; group: string }[];
  manualInfo: string | null;
  whatsapp: string;
}

interface CreateResponse {
  ok: boolean;
  orderNo?: string;
  statusUrl?: string;
  redirectUrl?: string | null;
  manualMode?: boolean;
  demoMode?: boolean;
  error?: string;
}

const CATEGORY_ORDER: PaketLayanan["category"][] = ["konsultasi", "izin", "legalitas", "sertifikasi"];

export function CheckoutClient({ initialPaket }: { initialPaket: string }) {
  const [cfg, setCfg] = useState<CfgResponse | null>(null);
  const [selectedId, setSelectedId] = useState<string>(
    getPackage(initialPaket) ? initialPaket : PACKAGES.find((p) => p.popular)?.id || PACKAGES[0].id
  );
  const [method, setMethod] = useState<string>("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState<CreateResponse | null>(null);

  useEffect(() => {
    fetch("/api/payment/config")
      .then((r) => r.json())
      .then((j: CfgResponse) => {
        setCfg(j);
        if (j.methods.length > 0) setMethod(j.methods[0].code);
      })
      .catch(() => setError("Gagal memuat konfigurasi pembayaran"));
  }, []);

  const paket = useMemo(() => getPackage(selectedId) ?? PACKAGES[0], [selectedId]);

  async function submit() {
    setError(null);
    if (name.trim().length < 3) return setError("Mohon isi nama lengkap (min. 3 huruf).");
    const digits = phone.replace(/[^0-9]/g, "");
    if (digits.length < 10) return setError("Nomor WhatsApp belum benar (contoh: 081234567890).");

    setSubmitting(true);
    try {
      const res = await fetch("/api/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paketId: paket.id,
          name: name.trim(),
          phone,
          email: email.trim() || undefined,
          notes: notes.trim() || undefined,
          method: method || undefined,
        }),
      });
      const json: CreateResponse = await res.json();
      if (!json.ok) {
        setError(json.error || "Gagal membuat pesanan. Coba lagi.");
        setSubmitting(false);
        return;
      }

      if (json.redirectUrl) {
        // Midtrans Snap / Tripay checkout — pindah ke halaman bayar
        window.location.href = json.redirectUrl;
        return;
      }
      // demo / manual — tampilkan panel konfirmasi
      setCreated(json);
      setSubmitting(false);
    } catch {
      setError("Koneksi bermasalah. Pastikan internet stabil lalu coba lagi.");
      setSubmitting(false);
    }
  }

  // ---------- Panel setelah order dibuat (demo / manual) ----------
  if (created) {
    const waText = encodeURIComponent(
      `Halo, saya ${name} sudah membuat pesanan ${created.orderNo} untuk ${paket.name}. Mohon informasi pembayarannya.`
    );
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <Card className="border-primary/30 shadow-xl">
          <CardContent className="p-6 sm:p-10 text-center space-y-4">
            <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              {created.demoMode ? <Sparkles className="h-8 w-8" /> : <Wallet className="h-8 w-8" />}
            </div>
            <h1 className="text-2xl font-extrabold">
              {created.demoMode ? "Pesanan Uji Coba Dibuat!" : "Pesanan Dibuat!"}
            </h1>
            <p className="text-muted-foreground">
              Nomor pesanan: <span className="font-mono font-bold text-foreground">{created.orderNo}</span>
            </p>

            {created.demoMode && (
              <div className="rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4 text-sm text-left space-y-3">
                <p className="font-semibold text-primary">🧪 MODE UJI COBA</p>
                <p className="text-muted-foreground">
                  Pembayaran disimulasikan — tidak ada uang sungguhan. Lanjut ke halaman status untuk
                  menekan tombol simulasi bayar, lalu lihat alur konfirmasi otomatisnya.
                </p>
                <Link href={created.statusUrl || "#"}>
                  <Button className="w-full rounded-xl font-bold">
                    Buka Halaman Status Pesanan <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}

            {!created.demoMode && (
              <div className="rounded-xl border bg-muted/40 p-4 text-sm text-left space-y-3">
                <p className="font-semibold">Cara membayar (transfer manual):</p>
                {cfg?.manualInfo ? (
                  <pre className="whitespace-pre-wrap font-sans text-foreground/80">{cfg.manualInfo}</pre>
                ) : (
                  <p className="text-muted-foreground">
                    Info rekening akan dikirim admin ke WhatsApp-mu sekarang juga.
                  </p>
                )}
                <a href={`https://wa.me/${cfg?.whatsapp}?text=${waText}`} target="_blank" rel="noreferrer">
                  <Button className="w-full rounded-xl font-bold">Konfirmasi via WhatsApp</Button>
                </a>
                <Link href={created.statusUrl || "#"} className="block text-center text-xs text-primary hover:underline">
                  Lihat status pesanan →
                </Link>
              </div>
            )}

            <p className="text-xs text-muted-foreground">
              Simpan nomor pesanan ini. Tim kami menghubungi kamu maksimal 15 menit di jam kerja
              (08.00–20.00 WIB).
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ---------- Form utama ----------
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <Badge variant="outline" className="rounded-full border-primary/30 bg-primary/5 text-primary font-semibold px-4 py-1">
          <Lock className="h-3 w-3 mr-1.5" /> Checkout Aman
        </Badge>
        <h1 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight">
          Pesan & <span className="text-gradient-brand">Bayar Langsung</span>
        </h1>
        <p className="mt-3 text-muted-foreground">
          Pilih layanan, isi data singkat, selesaikan pembayaran — dokumen diproses otomatis setelah
          bayar terkonfirmasi.
        </p>
      </div>

      {/* Strip kepercayaan */}
      <div className="mt-8 grid grid-cols-3 gap-3 text-center">
        {[
          { icon: QrCode, label: "QRIS & e-wallet" },
          { icon: Landmark, label: "VA semua bank" },
          { icon: Store, label: "Alfamart/Indomaret" },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="rounded-xl border bg-card p-3">
            <Icon className="mx-auto h-5 w-5 text-primary" aria-hidden />
            <p className="mt-1.5 text-[11px] sm:text-xs font-semibold text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid lg:grid-cols-5 gap-6 items-start">
        {/* KIRI: pilih paket */}
        <div className="lg:col-span-3 space-y-4">
          <h2 className="font-bold text-lg">1. Pilih layanan</h2>
          <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1 pay-scroll">
            {CATEGORY_ORDER.map((cat) => {
              const items = PACKAGES.filter((p) => p.category === cat);
              if (!items.length) return null;
              return (
                <div key={cat}>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                    {PAKET_LABEL[cat]}
                  </p>
                  <div className="space-y-2.5">
                    {items.map((p) => {
                      const active = p.id === selectedId;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setSelectedId(p.id)}
                          aria-pressed={active}
                          className={`w-full text-left rounded-xl border p-4 transition-all ${
                            active
                              ? "border-primary ring-2 ring-primary/30 bg-primary/5 shadow-md"
                              : "border-border hover:border-primary/40 hover:bg-muted/40"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-bold text-sm">{p.name}</span>
                                {p.popular && (
                                  <Badge className="rounded-full bg-gold text-gold-foreground text-[9px] font-bold px-2 py-0">
                                    TERLARIS
                                  </Badge>
                                )}
                              </div>
                              <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{p.tagline}</p>
                              <p className="mt-1.5 flex items-center gap-1 text-[11px] text-muted-foreground">
                                <Clock className="h-3 w-3" /> {p.duration}
                              </p>
                            </div>
                            <div className="text-right shrink-0">
                              <p className={`font-extrabold text-sm ${active ? "text-primary" : ""}`}>
                                {fmtRupiah(p.price)}
                              </p>
                              {p.strike && (
                                <p className="text-[11px] text-muted-foreground line-through">{fmtRupiah(p.strike)}</p>
                              )}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* KANAN: data + ringkasan */}
        <div className="lg:col-span-2 space-y-4 lg:sticky lg:top-24">
          <h2 className="font-bold text-lg">2. Data pemesan</h2>
          <Card className="border-border/70 shadow-sm">
            <CardContent className="p-5 space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="ck-name">Nama lengkap *</Label>
                <Input
                  id="ck-name"
                  placeholder="Nama sesuai KTP"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ck-phone">Nomor WhatsApp *</Label>
                <Input
                  id="ck-phone"
                  type="tel"
                  inputMode="tel"
                  placeholder="0812xxxxxxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                />
                <p className="text-[11px] text-muted-foreground">
                  Dokumen & konfirmasi dikirim ke nomor ini.
                </p>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ck-email">Email (opsional)</Label>
                <Input
                  id="ck-email"
                  type="email"
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ck-notes">Catatan (opsional)</Label>
                <Textarea
                  id="ck-notes"
                  rows={2}
                  placeholder="cth: usaha kopi kecil di Bandung, mau NIB dulu"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              {/* Metode Tripay */}
              {cfg?.provider === "tripay" && cfg.methods.length > 0 && (
                <div className="space-y-2">
                  <Label>3. Metode pembayaran</Label>
                  <div className="grid grid-cols-2 gap-2 max-h-44 overflow-y-auto pr-1 pay-scroll">
                    {cfg.methods.map((m) => (
                      <button
                        key={m.code}
                        type="button"
                        onClick={() => setMethod(m.code)}
                        aria-pressed={method === m.code}
                        className={`rounded-lg border px-3 py-2 text-left text-xs font-semibold transition-all ${
                          method === m.code
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary/40"
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {cfg && cfg.provider !== "tripay" && (
                <div className="rounded-lg bg-muted/50 border px-3 py-2.5 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">Pembayaran:</span> {cfg.label}
                </div>
              )}

              {error && (
                <p role="alert" className="rounded-lg bg-destructive/10 text-destructive text-xs font-semibold px-3 py-2">
                  {error}
                </p>
              )}

              <Button
                className="w-full rounded-xl font-extrabold text-base h-12 shadow-lg shadow-primary/20"
                onClick={submit}
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Menyiapkan pembayaran…
                  </>
                ) : (
                  <>Bayar Sekarang — {fmtRupiah(paket.price)}</>
                )}
              </Button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Terenkripsi
                </span>
                <span className="inline-flex items-center gap-1">
                  <BadgeCheck className="h-3.5 w-3.5 text-primary" /> Dokumen resmi
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-primary" /> Diproses hari ini
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Ringkasan harga */}
          <Card className="border-primary/25 bg-primary/5">
            <CardContent className="p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Ringkasan</p>
              <p className="mt-1 font-bold text-sm">{paket.name}</p>
              <div className="mt-2 flex items-baseline justify-between">
                <div>
                  {paket.strike && (
                    <span className="mr-2 text-xs text-muted-foreground line-through">{fmtRupiah(paket.strike)}</span>
                  )}
                  <span className="text-2xl font-extrabold text-primary">{fmtRupiah(paket.price)}</span>
                </div>
                {paket.strike && (
                  <Badge className="rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                    Hemat {fmtRupiah(paket.strike - paket.price)}
                  </Badge>
                )}
              </div>
              <ul className="mt-3 space-y-1.5">
                {paket.features.slice(0, 3).map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-foreground/75">
                    <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-primary mt-0.5" /> {f}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Catatan bawah */}
      <p className="mt-10 text-center text-xs text-muted-foreground max-w-2xl mx-auto">
        Harga adalah jasa konsultan PusatPerizinan.com. Biaya resmi negara/notaris (bila ada)
        ditagihkan terpisah sesuai zonasi wilayah & jenis usaha — selalu diinformasikan lebih dulu,
        tidak pernah ada biaya kejutan.
      </p>
    </div>
  );
}
