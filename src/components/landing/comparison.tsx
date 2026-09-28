"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { COMPARISON } from "@/lib/seo-content";
import { useLanguage } from "@/lib/i18n/language-provider";

export function Comparison() {
  const { t } = useLanguage();
  return (
    <section id="perbandingan" className="py-20 md:py-28 bg-secondary/40 border-y scroll-mt-20" aria-label="Perbandingan layanan">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <Badge variant="outline" className="rounded-full border-gold/40 bg-gold/10 text-gold-foreground font-semibold px-4 py-1">
            <Trophy className="h-3.5 w-3.5 mr-1.5" />
            Perbandingan Jujur
          </Badge>
          <h2 className="mt-5 text-3xl md:text-4xl font-extrabold tracking-tight">
            {t("compT1")}{" "}
            <span className="text-gradient-brand">{t("compTHigh")}</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            {t("compSub")}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 overflow-hidden rounded-2xl border border-border/70 shadow-lg bg-card"
        >
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="bg-[oklch(0.23_0.03_165)] text-white">
                  <th className="px-5 py-4 text-left font-bold text-xs uppercase tracking-wider w-[30%]">
                    Fitur
                  </th>
                  <th className="px-5 py-4 text-left font-bold text-xs uppercase tracking-wider w-[35%]">
                    <span className="text-amber-300">★ PusatPerizinan.com</span>
                  </th>
                  <th className="px-5 py-4 text-left font-bold text-xs uppercase tracking-wider w-[35%]">
                    Praktik Umum Konsultan Lain
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr
                    key={i}
                    className={`border-t border-border/60 transition-colors hover:bg-primary/5 ${
                      i % 2 ? "bg-secondary/30" : ""
                    }`}
                  >
                    <td className="px-5 py-4 font-semibold text-foreground/90">{row.feature}</td>
                    <td className="px-5 py-4">
                      <span className="flex items-start gap-2 text-foreground/85">
                        <CheckCircle2 className="h-4.5 w-4.5 shrink-0 text-primary mt-0.5" />
                        {row.us}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="flex items-start gap-2 text-muted-foreground">
                        <XCircle className="h-4.5 w-4.5 shrink-0 text-stone-400 mt-0.5" />
                        {row.others}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Perbandingan berdasarkan informasi publik di website penyedia jasa perizinan Indonesia per awal 2025.
        </p>
      </div>
    </section>
  );
}
