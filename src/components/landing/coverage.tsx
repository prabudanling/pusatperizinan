"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MapPinned, Building, Globe, Clock, Wifi, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/lib/i18n/language-provider";
import {
  PROVINCES,
  ISLANDS,
  TOTAL_PROVINCES,
  TOTAL_KABKOTA,
  type Island,
} from "@/lib/coverage-data";

type Filter = "semua" | Island;

const BIG_STATS = [
  { icon: MapPinned, value: `${TOTAL_PROVINCES}`, label: "Provinsi Seluruh Indonesia" },
  { icon: Building, value: `${TOTAL_KABKOTA}`, label: "Kabupaten & Kota Terjangkau" },
  { icon: Clock, value: "3", label: "Zona Waktu (WIB-WIT)" },
  { icon: Wifi, value: "100%", label: "Proses Online + Kurir Dokumen" },
];

export function CoverageSection() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<Filter>("semua");

  const visible = useMemo(
    () => (filter === "semua" ? PROVINCES : PROVINCES.filter((p) => p.island === filter)),
    [filter]
  );

  return (
    <section id="jangkauan" className="py-20 md:py-28 scroll-mt-20 bg-secondary/30" aria-label="Jangkauan nasional">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <Badge variant="outline" className="rounded-full border-primary/30 bg-primary/5 text-primary font-semibold px-4 py-1">
            <Globe className="h-3.5 w-3.5 mr-1.5" />
            {t("navCoverage")}
          </Badge>
          <h2 className="mt-5 text-3xl md:text-4xl font-extrabold tracking-tight">
            {t("coverageT1").replace("{n}", String(TOTAL_PROVINCES))}{" "}
            <span className="text-gradient-brand">{t("coverageTHigh").replace("{n}", String(TOTAL_KABKOTA))}</span>{" "}
            {t("coverageT2")}
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            {t("coverageSub")}
          </p>
        </div>

        {/* Big stats */}
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {BIG_STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="rounded-2xl border border-border/70 bg-card p-5 flex items-center gap-4"
            >
              <div className="h-11 w-11 shrink-0 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <s.icon className="h-5.5 w-5.5" />
              </div>
              <div>
                <p className="text-2xl font-extrabold tracking-tight tabular-nums leading-none">{s.value}</p>
                <p className="text-xs text-muted-foreground font-medium mt-1">{s.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Island filter */}
        <div className="mt-10 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter per pulau">
          <button
            onClick={() => setFilter("semua")}
            className={`rounded-full px-4 py-2 text-xs sm:text-sm font-semibold border transition-all ${
              filter === "semua"
                ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/25"
                : "bg-card text-foreground/70 border-border hover:border-primary/40 hover:text-primary"
            }`}
            aria-pressed={filter === "semua"}
          >
            Semua ({TOTAL_PROVINCES})
          </button>
          {ISLANDS.map((island) => {
            const count = PROVINCES.filter((p) => p.island === island).length;
            return (
              <button
                key={island}
                onClick={() => setFilter(island)}
                className={`rounded-full px-4 py-2 text-xs sm:text-sm font-semibold border transition-all ${
                  filter === island
                    ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/25"
                    : "bg-card text-foreground/70 border-border hover:border-primary/40 hover:text-primary"
                }`}
                aria-pressed={filter === island}
              >
                {island} ({count})
              </button>
            );
          })}
        </div>

        {/* Province cards */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((province, i) => (
            <motion.div
              key={province.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 6) * 0.05 }}
            >
              <Card className="h-full border-border/70 hover:border-primary/30 hover:shadow-lg transition-all">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-[15px]">{province.name}</h3>
                    <Badge variant="outline" className="rounded-full text-[10px] font-semibold border-primary/25 text-primary shrink-0">
                      {province.island}
                    </Badge>
                  </div>
                  <p className="mt-2.5 text-[12.5px] text-muted-foreground leading-relaxed">{province.note}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {province.majors.map((city) => (
                      <span
                        key={city}
                        className="rounded-md bg-secondary/70 px-2 py-1 text-[11px] font-medium text-foreground/75"
                      >
                        {city}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/10 via-primary/5 to-gold/10 p-6">
          <p className="text-sm sm:text-base text-foreground/85 font-medium text-center sm:text-left">
            Kota Anda tidak tercantum? <strong className="text-foreground">{TOTAL_KABKOTA} kabupaten/kota</strong> kami
            layani semua — cukup sebutkan lokasi Anda saat konsultasi.
          </p>
          <a
            href="#konsultasi"
            className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-md shadow-primary/25 hover:shadow-primary/40 transition-shadow"
          >
            Konsultasi Kota Saya
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
