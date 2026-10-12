"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Loader2,
  Send,
  Building2,
  AlertTriangle,
  BadgeCheck,
  Clock,
  Landmark,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { SECTORS } from "@/lib/landing-data";
import { useLanguage } from "@/lib/i18n/language-provider";

interface PermitItem {
  name: string;
  description: string;
  authority: string;
  estimatedTime: string;
  riskLevel: string;
  mandatory: boolean;
}

interface CheckResult {
  summary: string;
  businessScale: string;
  permits: PermitItem[];
  warnings: string[];
  estimatedTotalTime: string;
  recommendedPackage: string;
}

const SCALES = [
  { value: "mikro", label: "Mikro (< Rp 2 M/yr)" },
  { value: "kecil", label: "Kecil (Rp 2–15 M/yr)" },
  { value: "menengah", label: "Menengah (Rp 15–50 M/yr)" },
  { value: "besar", label: "Besar (> Rp 50 M/yr)" },
];

function riskColor(level: string): string {
  const l = level.toLowerCase();
  if (l.includes("rendah") && !l.includes("menengah")) return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300";
  if (l.includes("menengah rendah")) return "bg-lime-100 text-lime-800 dark:bg-lime-900/40 dark:text-lime-300";
  if (l.includes("menengah tinggi")) return "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300";
  if (l.includes("tinggi")) return "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300";
  return "bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300";
}

export function LicenseChecker() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [businessInput, setBusinessInput] = useState("");
  const [sector, setSector] = useState("");
  const [location, setLocation] = useState("");
  const [scale, setScale] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CheckResult | null>(null);

  const analyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (businessInput.trim().length < 5) {
      toast({
        title: "Deskripsi terlalu singkat",
        description: "Ceritakan usaha Anda minimal 5 karakter agar analisisnya akurat.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/license-checker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessInput, sector, location, scale }),
      });
      const json = await res.json();
      if (json.success) {
        setResult(json.data);
        toast({
          title: "Analisis selesai! 🎯",
          description: `${json.data.permits?.length ?? 0} izin ditemukan untuk usaha Anda.`,
        });
      } else {
        toast({ title: "Analisis gagal", description: json.error, variant: "destructive" });
      }
    } catch {
      toast({
        title: "Koneksi bermasalah",
        description: "Coba lagi atau hubungi konsultan kami via WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const sendRoadmapToWA = () => {
    if (!result) return;
    const text = [
      "Halo PusatPerizinan! Saya baru cek izin via website.",
      "",
      `Usaha: ${businessInput}`,
      location ? `Lokasi: ${location}` : "",
      sector ? `Sektor: ${sector}` : "",
      scale ? `Skala: ${scale}` : "",
      "",
      `Hasil analisis AI: dibutuhkan ${result.permits.length} izin (${result.permits.map((p) => p.name).join(", ")}).`,
      "",
      "Mohon dibantu prosesnya. Terima kasih!",
    ]
      .filter(Boolean)
      .join("\n");
    window.open(
      `https://wa.me/6281269999910?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener"
    );
  };

  return (
    <section id="cek-izin" className="py-20 md:py-28 bg-secondary/40 pattern-grid scroll-mt-20 border-y">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
          {/* Left: input panel */}
          <div className="lg:col-span-2 lg:sticky lg:top-24">
            <Badge variant="outline" className="rounded-full border-gold/50 bg-gold/10 text-gold-foreground font-semibold px-4 py-1">
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              AI-Powered • Gratis
            </Badge>
            <h2 className="mt-5 text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
              {t("checkerT1")} <span className="text-gradient-brand">{t("checkerTHigh")}</span> {t("checkerT2")}
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {t("checkerSub")}
            </p>

            <Card className="mt-6 shadow-lg border-primary/20">
              <CardContent className="p-5 md:p-6">
                <form onSubmit={analyze} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="checker-input">Deskripsikan usaha Anda *</Label>
                    <textarea
                      id="checker-input"
                      placeholder="cth: Saya mau buka kafe dengan roastery sendiri di Yogyakarta, rencana kapasitas 20 karyawan..."
                      rows={3}
                      value={businessInput}
                      onChange={(e) => setBusinessInput(e.target.value)}
                      className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="checker-sector">Sektor</Label>
                      <Select value={sector} onValueChange={setSector}>
                        <SelectTrigger id="checker-sector">
                          <SelectValue placeholder="Pilih..." />
                        </SelectTrigger>
                        <SelectContent>
                          {SECTORS.map((s) => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="checker-scale">Skala</Label>
                      <Select value={scale} onValueChange={setScale}>
                        <SelectTrigger id="checker-scale">
                          <SelectValue placeholder="Pilih..." />
                        </SelectTrigger>
                        <SelectContent>
                          {SCALES.map((s) => (
                            <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="checker-location">Lokasi (kota/kabupaten)</Label>
                    <Input
                      id="checker-location"
                      placeholder="cth: Yogyakarta"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 rounded-xl font-bold text-base shadow-lg shadow-primary/25"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        AI sedang menganalisis...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5" />
                        Analisis Izin Saya
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Right: results */}
          <div className="lg:col-span-3 min-h-[420px]">
            <AnimatePresence mode="wait">
              {!result && !loading && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center text-center rounded-2xl border-2 border-dashed border-border p-10"
                >
                  <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                    <Building2 className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold">Roadmap perizinan Anda akan muncul di sini</h3>
                  <p className="mt-2 text-sm text-muted-foreground max-w-sm">
                    Contoh: &quot;buka toko online kosmetik di Jakarta&quot; → AI langsung menyusun daftar NIB,
                    PIRT/BPOM, NPWP, dan kebutuhan lainnya beserta estimasi waktunya.
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {["Buka kafe di Bandung", "Pendirian PT konstruksi", "Jualan skincare online", "Klinik kecantikan"].map(
                      (ex) => (
                        <button
                          key={ex}
                          onClick={() => setBusinessInput(`Saya ingin ${ex.toLowerCase()}`)}
                          className="text-xs rounded-full border px-3 py-1.5 text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors"
                        >
                          {ex}
                        </button>
                      )
                    )}
                  </div>
                </motion.div>
              )}

              {loading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center text-center rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 p-10"
                >
                  <Loader2 className="h-10 w-10 animate-spin text-primary mb-5" />
                  <h3 className="text-lg font-bold">AI Sedang Menganalisis Usaha Anda...</h3>
                  <p className="mt-2 text-sm text-muted-foreground max-w-sm">
                    Memeriksa regulasi UU Cipta Kerja, peraturan sektor, dan persyaratan OSS-RBA untuk usaha Anda.
                  </p>
                </motion.div>
              )}

              {result && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                >
                  {/* Summary header */}
                  <Card className="border-primary/25 shadow-lg">
                    <CardContent className="p-5 md:p-6">
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="flex items-center gap-2.5">
                          <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-md shadow-primary/25">
                            <BadgeCheck className="h-5.5 w-5.5 text-primary-foreground" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg leading-tight">Roadmap Perizinan Anda</h3>
                            <p className="text-xs text-muted-foreground">
                              Skala: {result.businessScale} • Total estimasi: {result.estimatedTotalTime}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="rounded-full bg-gold/15 text-gold-foreground border border-gold/30">
                            Rekomendasi: Paket {result.recommendedPackage}
                          </Badge>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setResult(null)}
                            className="h-8 w-8 p-0"
                            aria-label="Analisis ulang"
                          >
                            <RotateCcw className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="mt-4 text-sm text-foreground/85 leading-relaxed">{result.summary}</p>
                    </CardContent>
                  </Card>

                  {/* Permits list */}
                  <div className="space-y-3 max-h-[440px] overflow-y-auto scrollbar-thin pr-1">
                    {result.permits?.map((permit, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                      >
                        <Card className="border-border/70 hover:border-primary/30 transition-colors">
                          <CardContent className="p-4 md:p-5">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-start gap-3">
                                <div className="mt-0.5 h-7 w-7 shrink-0 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-extrabold">
                                  {i + 1}
                                </div>
                                <div>
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <h4 className="font-bold text-[15px]">{permit.name}</h4>
                                    {permit.mandatory ? (
                                      <Badge variant="outline" className="text-[10px] rounded-full border-primary/40 text-primary font-semibold">
                                        Wajib
                                      </Badge>
                                    ) : (
                                      <Badge variant="outline" className="text-[10px] rounded-full text-muted-foreground">
                                        Opsional
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed">
                                    {permit.description}
                                  </p>
                                </div>
                              </div>
                              <span className={`shrink-0 text-[10px] font-bold rounded-full px-2.5 py-1 ${riskColor(permit.riskLevel)}`}>
                                {permit.riskLevel}
                              </span>
                            </div>
                            <div className="mt-3 flex items-center gap-4 text-[11px] text-muted-foreground pl-10">
                              <span className="flex items-center gap-1.5">
                                <Landmark className="h-3.5 w-3.5" />
                                {permit.authority}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <Clock className="h-3.5 w-3.5" />
                                {permit.estimatedTime}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  {/* Warnings */}
                  {result.warnings?.length > 0 && (
                    <Card className="border-amber-300/50 bg-amber-50/60 dark:bg-amber-950/20 dark:border-amber-900/40">
                      <CardContent className="p-4 md:p-5">
                        <h4 className="flex items-center gap-2 font-bold text-sm text-amber-700 dark:text-amber-400">
                          <AlertTriangle className="h-4 w-4" />
                          Perhatian Penting
                        </h4>
                        <ul className="mt-2.5 space-y-1.5">
                          {result.warnings.map((w, i) => (
                            <li key={i} className="text-[13px] text-amber-800 dark:text-amber-300/90 flex items-start gap-2">
                              <ShieldAlert className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                              {w}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {/* CTA after result */}
                  <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-gold/5 shadow-lg">
                    <CardContent className="p-5 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <ShieldCheck className="h-8 w-8 text-primary shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-bold">Mau kami proseskan semua izin ini?</h4>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            Kirim roadmap ini ke WhatsApp — konsultan kami siapkan penawaran resmi & potensi diskusi harga.
                          </p>
                        </div>
                      </div>
                      <Button onClick={sendRoadmapToWA} className="rounded-full font-bold shrink-0 shadow-md shadow-primary/25">
                        <MessageCircle className="h-4 w-4" />
                        Kirim ke WhatsApp
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
