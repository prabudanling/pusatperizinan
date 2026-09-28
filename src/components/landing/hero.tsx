"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Clock,
  BadgeCheck,
  ChevronDown,
  CheckCircle2,
  Loader2,
  Star,
  FileCheck,
  Building2,
  Leaf,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { SECTORS, WHATSAPP_NUMBER } from "@/lib/landing-data";
import { useLanguage } from "@/lib/i18n/language-provider";

const PACKAGES = ["UMKM", "Bisnis", "Enterprise", "Belum tahu"];

interface HeroFormState {
  name: string;
  whatsapp: string;
  businessType: string;
  businessDesc: string;
  package: string;
}

export function Hero() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [form, setForm] = useState<HeroFormState>({
    name: "",
    whatsapp: "",
    businessType: "",
    businessDesc: "",
    package: "Belum tahu",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "hero" }),
      });
      const json = await res.json();
      if (json.success) {
        setDone(true);
        toast({
          title: t("toastSuccess"),
          description: json.message,
        });
      } else {
        toast({
          title: t("toastFail"),
          description: json.error || "Coba lagi dalam sejenak.",
          variant: "destructive",
        });
      }
    } catch {
      // Hosting statis (tanpa Node.js): API tidak tersedia —
      // fallback MULUS ke WhatsApp resmi agar lead tetap masuk, tidak pernah hangus.
      const waText = encodeURIComponent(
        `Halo PusatPerizinan.com! Saya ${form.name || "(nama)"} (${form.whatsapp || "via form"}).\nJenis usaha: ${form.businessType || "-"}.\nKebutuhan: ${form.businessDesc || "-"}.\nPaket: ${form.package}.\nMohon konsultasi lanjutan. Terima kasih!`
      );
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`, "_blank", "noopener,noreferrer");
      setDone(true);
      toast({
        title: t("toastSuccess"),
        description: "Pesanan Anda diteruskan via WhatsApp — konsultan kami segera merespons.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="beranda" className="hero-gradient pattern-grid pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              {t("heroBadge")}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold tracking-tight leading-[1.1] text-foreground">
              {t("heroTitle1")} <span className="text-gradient-brand">{t("heroHigh1")}</span>,
              <br />
              {t("heroTitle2")} <span className="relative inline-block">{t("heroHigh2")}
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 120 10" fill="none" aria-hidden="true">
                  <path d="M2 8C30 2 90 2 118 8" stroke="oklch(0.769 0.16 70.08)" strokeWidth="3.5" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>

            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              {t("heroSubtitle")}
            </p>

            <ul className="mt-8 space-y-3.5">
              {[
                { icon: Clock, text: t("heroBullet1") },
                { icon: ShieldCheck, text: t("heroBullet2") },
                { icon: BadgeCheck, text: t("heroBullet3") },
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.15 }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <item.icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-[15px] text-foreground/85">{item.text}</span>
                </motion.li>
              ))}
            </ul>

            {/* Mini social proof */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-2.5">
                {["RK", "BS", "AW", "HG"].map((initials, i) => (
                  <div
                    key={i}
                    className="h-9 w-9 rounded-full border-2 border-white dark:border-card bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-[10px] font-bold text-white"
                  >
                    {initials}
                  </div>
                ))}
                <div className="h-9 w-9 rounded-full border-2 border-white dark:border-card bg-gold flex items-center justify-center text-[9px] font-bold text-gold-foreground">
                  +1.2k
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1" aria-label="Rating 4.9 dari 5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-sm font-bold ml-1">4.9</span>
                </div>
                <p className="text-xs text-muted-foreground">{t("heroReviews")}</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Lead Form */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Floating decorative cards */}
            <div className="absolute -top-6 -left-4 md:-left-10 glass-card rounded-xl shadow-lg px-4 py-3 animate-float hidden sm:flex items-center gap-2.5 z-10">
              <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileCheck className="h-4.5 w-4.5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-bold leading-none">NIB Terbit</p>
                <p className="text-[10px] text-muted-foreground mt-1">Hari ini • 12:40 WIB</p>
              </div>
              <CheckCircle2 className="h-4 w-4 text-primary" />
            </div>

            <div className="absolute -bottom-5 -right-2 md:-right-6 glass-card rounded-xl shadow-lg px-4 py-3 animate-float-delayed hidden sm:flex items-center gap-2.5 z-10">
              <div className="h-9 w-9 rounded-lg bg-gold/15 flex items-center justify-center">
                <Leaf className="h-4.5 w-4.5 text-amber-600" />
              </div>
              <div>
                <p className="text-xs font-bold leading-none">Sertifikat Halal</p>
                <p className="text-[10px] text-muted-foreground mt-1">Kuliner • Surabaya</p>
              </div>
              <CheckCircle2 className="h-4 w-4 text-amber-600" />
            </div>

            <div className="relative glass-card rounded-2xl shadow-xl shadow-primary/5 p-6 md:p-8">
              {done ? (
                <div className="text-center py-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-5"
                  >
                    <CheckCircle2 className="h-9 w-9 text-primary" />
                  </motion.div>
                  <h3 className="text-xl font-bold">{t("successTitle")}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
                    {t("successBody").replace("{name}", form.name)}
                  </p>
                  <Button
                    variant="outline"
                    className="mt-6 rounded-full"
                    onClick={() => {
                      setDone(false);
                      setForm({ name: "", whatsapp: "", businessType: "", businessDesc: "", package: "Belum tahu" });
                    }}
                  >
                    {t("btnAnother")}
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold">{t("formTitle")}</h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        {t("formSubtitle")}
                      </p>
                    </div>
                    <div className="hidden sm:block text-right shrink-0">
                      <p className="text-2xl font-extrabold text-primary">{t("labelFree")}</p>
                      <p className="text-[10px] text-muted-foreground line-through">Rp 500rb</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="hero-name">{t("labelName")}</Label>
                        <Input
                          id="hero-name"
                          placeholder="cth: Budi Santoso"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          required
                          minLength={2}
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="hero-wa">{t("labelWa")}</Label>
                        <Input
                          id="hero-wa"
                          type="tel"
                          inputMode="tel"
                          placeholder="cth: 0812 3456 7890"
                          value={form.whatsapp}
                          onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                          required
                          className="h-11"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="hero-sector">{t("labelSector")}</Label>
                        <Select value={form.businessType} onValueChange={(v) => setForm({ ...form, businessType: v })}>
                          <SelectTrigger id="hero-sector" className="h-11">
                            <SelectValue placeholder={t("phSector")} />
                          </SelectTrigger>
                          <SelectContent>
                            {SECTORS.map((s) => (
                              <SelectItem key={s} value={s}>
                                {s}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="hero-package">{t("labelNeed")}</Label>
                        <Select value={form.package} onValueChange={(v) => setForm({ ...form, package: v })}>
                          <SelectTrigger id="hero-package" className="h-11">
                            <SelectValue placeholder={t("phNeed")} />
                          </SelectTrigger>
                          <SelectContent>
                            {PACKAGES.map((p) => (
                              <SelectItem key={p} value={p}>
                                {p === "Belum tahu" ? t("pkgNotSure") : t("pkgPrefix").replace("{p}", p)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="hero-desc">{t("labelDesc")}</Label>
                      <Textarea
                        id="hero-desc"
                        placeholder="cth: Saya mau buka kafe di Bandung, sudah punya tempat, belum punya badan usaha..."
                        rows={2}
                        value={form.businessDesc}
                        onChange={(e) => setForm({ ...form, businessDesc: e.target.value })}
                        className="resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full h-12 rounded-xl font-bold text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          {t("btnSending")}
                        </>
                      ) : (
                        <>
                          {t("btnSubmit")}
                          <ChevronDown className="h-5 w-5 rotate-[-90deg]" />
                        </>
                      )}
                    </Button>

                    <p className="text-[11px] text-center text-muted-foreground flex items-center justify-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                      {t("privacyNote")}
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
