"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Calculator,
  Clock,
  Wallet,
  Sparkles,
  Send,
  CheckSquare,
  Square,
  Info,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SERVICES, WHATSAPP_NUMBER } from "@/lib/landing-data";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/lib/i18n/language-provider";

// ---------- Parsing helpers (single source of truth: SERVICES data) ----------
function parsePriceToIdr(price: string): number {
  // "Rp 350rb" | "Rp 3,5jt" | "Rp 25jt" → angka
  const cleaned = price.replace(/[^\d,.]/g, "").replace(",", ".");
  if (price.includes("jt")) return Math.round(parseFloat(cleaned || "0") * 1_000_000);
  if (price.includes("rb")) return Math.round(parseFloat(cleaned || "0") * 1_000);
  return parseInt(cleaned || "0", 10);
}

function parseMaxDays(duration: string): number {
  // "3-7 hari kerja" | "90-180 hari" | "1 hari kerja" → angka terbesar
  const matches = duration.match(/\d+/g);
  return matches ? Math.max(...matches.map(Number)) : 7;
}

function formatIdr(v: number): string {
  if (v >= 1_000_000) {
    const jt = v / 1_000_000;
    return `Rp ${jt.toLocaleString("id-ID", { maximumFractionDigits: 1 })} jt`;
  }
  return `Rp ${Math.round(v / 1_000).toLocaleString("id-ID")} rb`;
}

const SCALES = [
  { id: "umkm", label: "UMKM / Perseorangan", multiplier: 0.9, hint: "Dokumen sederhana, banyak subsidi" },
  { id: "bisnis", label: "Bisnis (PT/CV)", multiplier: 1, hint: "Struktur standar badan usaha" },
  { id: "korporasi", label: "Korporasi / PMA / Enterprise", multiplier: 1.2, hint: "Dokumen kompleks & audit" },
] as const;

type ScaleId = (typeof SCALES)[number]["id"];

export function CostCalculator() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [scale, setScale] = useState<ScaleId>("bisnis");
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [sending, setSending] = useState(false);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const estimate = useMemo(() => {
    const items = SERVICES.filter((s) => selected.has(s.id)).map((s) => ({
      ...s,
      base: parsePriceToIdr(s.price),
      days: parseMaxDays(s.duration),
    }));
    const base = items.reduce((acc, it) => acc + it.base, 0);
    const mult = SCALES.find((s) => s.id === scale)?.multiplier ?? 1;
    const days = items.reduce((acc, it) => Math.max(acc, it.days), 0);
    return {
      items,
      low: base * mult * 0.9,
      high: base * mult * 1.15,
      days,
    };
  }, [selected, scale]);

  const hasSelection = estimate.items.length > 0;

  const waMessage = useMemo(() => {
    const list = estimate.items.map((i) => `• ${i.title} (${i.price})`).join("\n");
    return encodeURIComponent(
      `Halo PusatPerizinan! Saya baru menghitung via Kalkulator Biaya:\n${list}\n\nSkala usaha: ${
        SCALES.find((s) => s.id === scale)?.label
      }\nEstimasi: ${formatIdr(estimate.low)} - ${formatIdr(estimate.high)}\nEstimasi waktu: ~${
        estimate.days
      } hari\n\nMohon penawaran resminya. Terima kasih!`
    );
  }, [estimate, scale]);

  const handleSend = async () => {
    if (!hasSelection) return;
    if (name.trim().length < 2 || whatsapp.replace(/[^0-9]/g, "").length < 9) {
      toast({
        title: "Lengkapi dulu ya",
        description: "Isi nama & nomor WhatsApp Anda agar estimasi tercatat dan tim kami follow-up.",
        variant: "destructive",
      });
      return;
    }
    setSending(true);
    try {
      // Simpan lead (fire & log) — WA langsung dibuka
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          whatsapp,
          businessDesc: `Kalkulator: ${estimate.items.map((i) => i.title).join(", ")} | Estimasi ${formatIdr(
            estimate.low
          )}-${formatIdr(estimate.high)} | ~${estimate.days} hari`,
          package: scale === "korporasi" ? "Enterprise" : scale === "bisnis" ? "Bisnis" : "UMKM",
          source: "kalkulator",
        }),
      }).catch(() => null);
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`, "_blank", "noopener,noreferrer");
      toast({
        title: "Estimasi dikirim ke WhatsApp ✅",
        description: "Konsultan kami akan membalas dengan penawaran resmi. Pantau WA Anda!",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="kalkulator" className="py-20 md:py-28 scroll-mt-20" aria-label="Kalkulator biaya perizinan">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <Badge variant="outline" className="rounded-full border-gold/40 bg-gold/10 text-gold-foreground font-semibold px-4 py-1">
            <Calculator className="h-3.5 w-3.5 mr-1.5" />
            Gratis &amp; Tanpa Daftar
          </Badge>
          <h2 className="mt-5 text-3xl md:text-4xl font-extrabold tracking-tight">
            {t("calcT1")}{" "}
            <span className="text-gradient-brand">{t("calcTHigh")}</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            {t("calcSub")}
          </p>
        </div>

        <div className="mt-12 grid lg:grid-cols-5 gap-6">
          {/* Kiri: input */}
          <Card className="lg:col-span-3 border-border/70">
            <CardContent className="p-6 space-y-6">
              {/* Step 1 */}
              <div>
                <p className="text-sm font-bold mb-1.5 flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground text-[11px] font-bold flex items-center justify-center">1</span>
                  Pilih izin yang dibutuhkan ({selected.size} dipilih)
                </p>
                <div className="mt-3 grid sm:grid-cols-2 gap-2 max-h-80 overflow-y-auto scrollbar-thin pr-1">
                  {SERVICES.map((service) => {
                    const active = selected.has(service.id);
                    return (
                      <button
                        key={service.id}
                        onClick={() => toggle(service.id)}
                        aria-pressed={active}
                        className={`flex items-start gap-2.5 rounded-xl border p-3 text-left transition-all ${
                          active
                            ? "border-primary bg-primary/5 shadow-sm"
                            : "border-border/70 bg-card hover:border-primary/30"
                        }`}
                      >
                        {active ? (
                          <CheckSquare className="h-4.5 w-4.5 mt-0.5 shrink-0 text-primary" />
                        ) : (
                          <Square className="h-4.5 w-4.5 mt-0.5 shrink-0 text-muted-foreground/50" />
                        )}
                        <span className="min-w-0">
                          <span className="block text-[13px] font-bold leading-tight">{service.title}</span>
                          <span className="block text-[11px] text-muted-foreground mt-0.5">
                            {service.price} • {service.duration}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2 */}
              <div>
                <p className="text-sm font-bold mb-1.5 flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground text-[11px] font-bold flex items-center justify-center">2</span>
                  Skala usaha Anda
                </p>
                <div className="mt-3 grid sm:grid-cols-3 gap-2">
                  {SCALES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setScale(s.id)}
                      aria-pressed={scale === s.id}
                      className={`rounded-xl border p-3 text-left transition-all ${
                        scale === s.id
                          ? "border-primary bg-primary/5 shadow-sm"
                          : "border-border/70 bg-card hover:border-primary/30"
                      }`}
                    >
                      <span className="block text-[13px] font-bold leading-tight">{s.label}</span>
                      <span className="block text-[11px] text-muted-foreground mt-0.5">{s.hint}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3 */}
              <div>
                <p className="text-sm font-bold mb-1.5 flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground text-[11px] font-bold flex items-center justify-center">3</span>
                  Terima penawaran resmi via WhatsApp
                </p>
                <div className="mt-3 grid sm:grid-cols-2 gap-2">
                  <Input
                    placeholder="Nama Anda / usaha"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    aria-label="Nama untuk penawaran"
                    maxLength={80}
                  />
                  <Input
                    placeholder="Nomor WhatsApp (08xx…)"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    inputMode="tel"
                    aria-label="Nomor WhatsApp untuk penawaran"
                    maxLength={16}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Kanan: hasil */}
          <motion.div layout className="lg:col-span-2">
            <Card className="sticky top-24 border-primary/25 bg-gradient-to-b from-primary/5 to-card shadow-lg shadow-primary/5 h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-gold" />
                  Estimasi Transparan
                </p>

                {hasSelection ? (
                  <>
                    <p className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground tabular-nums">
                      {formatIdr(estimate.low)}{" "}
                      <span className="text-muted-foreground font-semibold text-lg">—</span>{" "}
                      {formatIdr(estimate.high)}
                    </p>
                    <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 text-primary" />
                      Perkiraan selesai: <strong className="text-foreground">±{estimate.days} hari</strong>{" "}
                      (izin paling lama di daftar Anda)
                    </p>

                    <div className="mt-4 space-y-1.5 max-h-44 overflow-y-auto scrollbar-thin rounded-xl bg-secondary/50 p-3">
                      {estimate.items.map((it) => (
                        <div key={it.id} className="flex items-center justify-between text-[12.5px]">
                          <span className="text-foreground/85 truncate pr-2">{it.title}</span>
                          <span className="font-semibold text-primary shrink-0">{it.price}</span>
                        </div>
                      ))}
                    </div>

                    <p className="mt-3 flex items-start gap-1.5 text-[11.5px] text-muted-foreground leading-relaxed">
                      <Info className="h-3.5 w-3.5 mt-0.5 shrink-0 text-gold" />
                      Estimasi mencakup jasa pengurusan + biaya resmi standar. Biaya pemerintah
                      tertentu (notaris, uji lab, bank guarantee) dihitung presisi saat konsultasi
                      gratis — tanpa kejutan di tengah jalan.
                    </p>

                    <div className="mt-auto pt-5 space-y-2.5">
                      <button
                        onClick={handleSend}
                        disabled={sending}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-md shadow-primary/25 hover:shadow-primary/40 hover:bg-primary/95 transition-all disabled:opacity-60"
                      >
                        <Send className="h-4 w-4" />
                        {sending ? "Mengirim…" : "Kirim Estimasi ke WhatsApp"}
                      </button>
                      <a
                        href="#konsultasi"
                        className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold hover:border-primary/40 hover:text-primary transition-colors"
                      >
                        <Wallet className="h-4 w-4" />
                        Diskusikan di Konsultasi Gratis
                      </a>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center py-10">
                    <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <Calculator className="h-8 w-8 text-primary" />
                    </div>
                    <p className="mt-4 text-sm font-semibold text-foreground/80">
                      Belum ada izin dipilih
                    </p>
                    <p className="mt-1 text-[12.5px] text-muted-foreground max-w-[240px]">
                      Centang minimal satu izin di samping kiri — estimasi biaya &amp; waktu
                      langsung muncul di sini.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
