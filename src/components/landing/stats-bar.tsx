"use client";

import { useEffect, useState } from "react";
import { Users, FileCheck2, MapPin, Building, ThumbsUp, Zap } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-provider";

interface Stats {
  clients: number;
  permitsProcessed: number;
  provinces: number;
  regenciesCities: number;
  satisfaction: number;
  avgProcessingHours: number;
}

const FALLBACK: Stats = {
  clients: 1247,
  permitsProcessed: 3890,
  provinces: 38,
  regenciesCities: 514,
  satisfaction: 98,
  avgProcessingHours: 24,
};

function formatNumber(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(".0", "")}rb+`;
  return `${n}`;
}

export function StatsBar() {
  const [stats, setStats] = useState<Stats | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then((json) => json.success && setStats(json.data))
      .catch(() => setStats(FALLBACK));
  }, []);

  const s = stats ?? FALLBACK;

  const items = [
    { icon: Users, label: t("statClients"), value: formatNumber(s.clients) },
    { icon: FileCheck2, label: t("statPermits"), value: formatNumber(s.permitsProcessed) },
    { icon: MapPin, label: t("statProvinces"), value: `${s.provinces}` },
    { icon: Building, label: t("statCities"), value: `${s.regenciesCities}` },
    { icon: ThumbsUp, label: t("statSatisfaction"), value: `${s.satisfaction}%` },
    { icon: Zap, label: t("statAvgTime"), value: `${s.avgProcessingHours} ${t("statHours")}` },
  ];

  return (
    <section aria-label="Statistik kepercayaan" className="border-y bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-border/60">
          {items.map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5 py-6 px-3">
              <item.icon className="h-5 w-5 text-primary mb-0.5" aria-hidden="true" />
              <span className="text-2xl font-extrabold tracking-tight text-foreground tabular-nums">
                {item.value}
              </span>
              <span className="text-xs text-muted-foreground font-medium text-center">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
