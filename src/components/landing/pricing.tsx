"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PRICING } from "@/lib/landing-data";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/language-provider";

export function Pricing() {
  const { t } = useLanguage();
  return (
    <section id="harga" className="py-20 md:py-28 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <Badge variant="outline" className="rounded-full border-primary/30 bg-primary/5 text-primary font-semibold px-4 py-1">
            Harga Transparan
          </Badge>
          <h2 className="mt-5 text-3xl md:text-4xl font-extrabold tracking-tight">
            {t("pricingT1")} <span className="text-gradient-brand">{t("pricingTHigh")}</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            {t("pricingSub")}
          </p>
        </div>

        <div className="mt-14 grid lg:grid-cols-3 gap-6 items-stretch max-w-5xl mx-auto">
          {PRICING.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={cn(tier.highlight && "lg:-mt-4 lg:mb-[-1rem]")}
            >
              <Card
                className={cn(
                  "relative h-full flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1",
                  tier.highlight
                    ? "border-primary/50 shadow-2xl shadow-primary/15 ring-1 ring-primary/30"
                    : "border-border/70 hover:shadow-lg"
                )}
              >
                {tier.highlight && (
                  <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary via-emerald-500 to-gold" />
                )}
                <CardContent className="p-6 md:p-7 flex flex-col flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-extrabold tracking-tight">{tier.name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{tier.tagline}</p>
                    </div>
                    {tier.highlight && (
                      <Badge className="rounded-full bg-primary text-primary-foreground font-bold text-[10px] px-3 py-1 shadow-md">
                        <Sparkles className="h-3 w-3 mr-1" />
                        PALING POPULER
                      </Badge>
                    )}
                  </div>

                  <div className="mt-5 pb-5 border-b">
                    <div className="flex items-end gap-2">
                      <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-1.5">
                        {tier.period}
                      </span>
                    </div>
                    <p className={cn("mt-0.5 font-extrabold tracking-tight", tier.highlight ? "text-4xl text-primary" : "text-3xl")}>
                      {tier.price}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-1">*harga dapat menyesuaikan kompleksitas & lokasi</p>
                  </div>

                  <ul className="mt-5 space-y-3 flex-1">
                    {tier.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm">
                        <span
                          className={cn(
                            "mt-0.5 h-5 w-5 shrink-0 rounded-full flex items-center justify-center",
                            tier.highlight ? "bg-primary/15 text-primary" : "bg-muted text-primary"
                          )}
                        >
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </span>
                        <span className="text-foreground/85 leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    size="lg"
                    className={cn(
                      "mt-7 w-full rounded-xl font-bold h-12",
                      tier.highlight
                        ? "shadow-lg shadow-primary/30"
                        : ""
                    )}
                    variant={tier.highlight ? "default" : "outline"}
                  >
                    <a href="#konsultasi">{tier.cta}</a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Guarantee strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 mx-auto max-w-3xl rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/5 via-transparent to-gold/5 p-5 flex flex-col sm:flex-row items-center justify-center gap-3 text-center"
        >
          <ShieldCheck className="h-8 w-8 text-primary shrink-0" />
          <p className="text-sm md:text-[15px] font-medium text-foreground/85">
            <strong className="text-primary">Garansi PusatPerizinan:</strong> Izin gagal terbit karena kesalahan proses kami?{" "}
            <strong>Dana 100% kembali</strong> — tertulis resmi di kontrak kerja sama.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
