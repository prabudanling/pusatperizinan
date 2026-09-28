"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  PhoneCall,
  MessageCircle,
  Loader2,
  CheckCircle2,
  ShieldCheck,
  Clock,
  CalendarClock,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { SECTORS, WHATSAPP_NUMBER, WHATSAPP_DISPLAY } from "@/lib/landing-data";
import { useLanguage } from "@/lib/i18n/language-provider";

export function FinalCta() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [form, setForm] = useState({
    name: "",
    whatsapp: "",
    businessType: "",
    businessDesc: "",
    package: "Belum tahu",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "final-cta" }),
      });
      const json = await res.json();
      if (json.success) {
        setDone(true);
        toast({ title: "Berhasil! 🎉", description: json.message });
      } else {
        toast({ title: "Gagal mengirim", description: json.error, variant: "destructive" });
      }
    } catch {
      // Hosting statis (tanpa Node.js): API tidak tersedia —
      // fallback MULUS ke WhatsApp resmi agar lead tetap masuk.
      const waText = encodeURIComponent(
        `Halo PusatPerizinan.com! Saya ${form.name || "(nama)"} (${form.whatsapp || "via form"}).\nJenis usaha: ${form.businessType || "-"}.\nKebutuhan: ${form.businessDesc || "-"}.\nPaket: ${form.package}.\nMohon konsultasi lanjutan. Terima kasih!`
      );
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`, "_blank", "noopener,noreferrer");
      setDone(true);
      toast({
        title: "Berhasil! 🎉",
        description: "Pesanan Anda diteruskan via WhatsApp — konsultan kami segera merespons.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="konsultasi" className="py-20 md:py-28 scroll-mt-20 hero-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block rounded-full bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 shadow-md shadow-primary/25">
              {t("ctaBadge")}
            </span>
            <h2 className="mt-5 text-3xl md:text-[2.75rem] font-extrabold tracking-tight leading-[1.12]">
              {t("ctaT1")}
              <br />
              <span className="text-gradient-brand">{t("ctaTHigh")}</span>
            </h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              {t("ctaSub")}
            </p>

            <div className="mt-8 space-y-4">
              {[
                { icon: Clock, title: "Respons < 15 Menit", desc: "Di jam kerja, konsultan senior langsung membalas WA Anda." },
                { icon: CalendarClock, title: "Jadwal Fleksibel", desc: "Konsultasi via WA, Zoom, atau datang ke kantor — Anda pilih." },
                { icon: Zap, title: "Langsung Roadmap", desc: "Selesai konsultasi, Anda dapat roadmap izin + estimasi biaya tertulis." },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3.5">
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-bold text-[15px]">{item.title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct contact buttons */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full font-bold shadow-lg shadow-primary/25">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    "Halo PusatPerizinan! Saya ingin konsultasi gratis untuk usaha saya."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-5 w-5" />
                  {t("ctaWaBtn")}
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full font-bold">
                <a href={`tel:+${WHATSAPP_NUMBER}`}>
                  <PhoneCall className="h-5 w-5" />
                  {WHATSAPP_DISPLAY}
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Right form card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <Card className="shadow-2xl shadow-primary/10 border-primary/20">
              <CardContent className="p-6 md:p-8">
                {done ? (
                  <div className="text-center py-12">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-5"
                    >
                      <CheckCircle2 className="h-9 w-9 text-primary" />
                    </motion.div>
                    <h3 className="text-xl font-bold">{t("ctaSuccessTitle")}</h3>
                    <p className="mt-3 text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
                      {t("ctaSuccessBody")}
                    </p>
                    <a href="#cek-izin" className="mt-3 inline-block text-sm font-semibold text-primary hover:underline">
                      {t("navCheckAI")} →
                    </a>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-bold">{t("ctaFormTitle")}</h3>
                    <p className="text-sm text-muted-foreground mt-1.5">
                      {t("ctaFormSub")}
                    </p>

                    <form onSubmit={submit} className="mt-6 space-y-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="cta-name">{t("labelName")}</Label>
                        <Input
                          id="cta-name"
                          placeholder="cth: Budi Santoso"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          required
                          minLength={2}
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="cta-wa">{t("labelWa")}</Label>
                        <Input
                          id="cta-wa"
                          type="tel"
                          inputMode="tel"
                          placeholder="cth: 0812 3456 7890"
                          value={form.whatsapp}
                          onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                          required
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="cta-sector">{t("labelSector")}</Label>
                        <Select
                          value={form.businessType}
                          onValueChange={(v) => setForm({ ...form, businessType: v })}
                        >
                          <SelectTrigger id="cta-sector" className="h-11">
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
                        <Label htmlFor="cta-desc">{t("labelDesc")}</Label>
                        <textarea
                          id="cta-desc"
                          rows={3}
                          placeholder="cth: Usaha saya 2 tahun berjalan tanpa badan hukum, mau ikut tender pemerintah..."
                          value={form.businessDesc}
                          onChange={(e) => setForm({ ...form, businessDesc: e.target.value })}
                          className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={submitting}
                        className="w-full h-12 rounded-xl font-bold text-base shadow-lg shadow-primary/25"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            {t("btnSending")}
                          </>
                        ) : (
                          t("ctaSubmit")
                        )}
                      </Button>
                      <p className="text-[11px] text-center text-muted-foreground flex items-center justify-center gap-1.5">
                        <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                        {t("ctaPrivacy")}
                      </p>
                    </form>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
