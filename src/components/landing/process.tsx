"use client";

import { motion } from "framer-motion";
import { MessagesSquare, FileText, Cog, PartyPopper } from "lucide-react";
import { PROCESS_STEPS } from "@/lib/landing-data";
import { useLanguage } from "@/lib/i18n/language-provider";

const STEP_ICONS = [MessagesSquare, FileText, Cog, PartyPopper];

export function Process() {
  const { t } = useLanguage();
  return (
    <section id="cara-kerja" className="py-20 md:py-28 bg-secondary/40 border-y scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-semibold px-4 py-1">
            Cara Kerja
          </span>
          <h2 className="mt-5 text-3xl md:text-4xl font-extrabold tracking-tight">
            {t("processT1")} <span className="text-gradient-brand">{t("processTHigh")}</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            {t("processSub")}
          </p>
        </div>

        <div className="mt-16 relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-9 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-primary/20 via-primary/50 to-primary/20" aria-hidden="true" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
            {PROCESS_STEPS.map((step, i) => {
              const Icon = STEP_ICONS[i];
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="relative text-center"
                >
                  <div className="relative inline-flex">
                    <div className="h-[72px] w-[72px] rounded-2xl bg-gradient-to-br from-primary to-emerald-700 text-primary-foreground shadow-xl shadow-primary/25 flex items-center justify-center rotate-3">
                      <Icon className="h-8 w-8" aria-hidden="true" />
                    </div>
                    <div className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-gold text-gold-foreground text-sm font-extrabold flex items-center justify-center shadow-md border-2 border-white dark:border-card">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="mt-5 text-lg font-bold tracking-tight">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-[280px] mx-auto">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-14 text-center">
          <a
            href="#konsultasi"
            className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-8 py-3.5 font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all"
          >
            Mulai Langkah 1 — Gratis
          </a>
        </div>
      </div>
    </section>
  );
}
