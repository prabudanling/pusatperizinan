"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Globe2, PlaneTakeoff, Building2, UserRound, ChevronDown, ShieldCheck, Banknote, Users, FileSignature, BriefcaseBusiness } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PMI_B2B_SERVICES, PMI_B2C_SERVICES, PMI_COUNTRIES, PMI_STATS, PMI_PROCESS_STEPS, type PmiServiceItem } from "@/lib/pmi-services";
import { useLanguage, type LanguageContextValue } from "@/lib/i18n/language-provider";

const REGION_LABELS: Record<string, string> = {
  "timur-tengah": "Timur Tengah",
  asia: "Asia",
  barat: "Barat",
};

function PmiServiceCard({ service, index, t }: { service: PmiServiceItem; index: number; t: LanguageContextValue["t"] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.08 }}
    >
      <Card
        id={`pmi-${service.id}`}
        className={`group relative h-full hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 border-border/70 scroll-mt-24 ${
          service.popular ? "ring-1 ring-primary/40" : ""
        }`}
      >
        {service.popular && (
          <div className="absolute -top-2.5 left-5 z-10">
            <Badge className="rounded-full bg-gold text-gold-foreground font-bold text-[10px] px-3 py-0.5 shadow-md">
              TERLARIS
            </Badge>
          </div>
        )}
        <CardContent className="p-6 flex flex-col h-full">
          <div className="flex items-start justify-between">
            <div
              className={`h-12 w-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                service.audience === "perusahaan"
                  ? "bg-gold/15 text-gold-foreground"
                  : "bg-primary/10 text-primary"
              } ${service.popular ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" : ""}`}
            >
              <service.icon className="h-6 w-6" aria-hidden="true" />
            </div>
            <div className="text-right">
              <p className="text-lg font-extrabold text-foreground">{service.price}</p>
              <p className="text-[11px] text-muted-foreground">{service.duration}</p>
            </div>
          </div>

          <h3 className="mt-4 text-base font-bold tracking-tight">{service.title}</h3>
          <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed line-clamp-3">{service.desc}</p>

          <ul className="mt-4 space-y-1.5 flex-1">
            {service.features.slice(0, 3).map((f, j) => (
              <li key={j} className="flex items-start gap-2 text-[13px] text-foreground/75">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                {f}
              </li>
            ))}
          </ul>

          <a
            href={`/layanan/${service.id}`}
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all"
          >
            {t("pmiCardCta")}
            <ArrowRight className="h-4 w-4" />
          </a>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function WorkAbroad() {
  const { t } = useLanguage();
  const [audience, setAudience] = useState<"individu" | "perusahaan">("individu");
  const [showAllCountries, setShowAllCountries] = useState(false);

  const services = audience === "individu" ? PMI_B2C_SERVICES : PMI_B2B_SERVICES;
  const visibleCountries = showAllCountries ? PMI_COUNTRIES : PMI_COUNTRIES.slice(0, 8);

  return (
    <section id="kerja-luar-negeri" className="py-20 md:py-28 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto">
          <Badge variant="outline" className="rounded-full border-primary/30 bg-primary/5 text-primary font-semibold px-4 py-1">
            <PlaneTakeoff className="h-3.5 w-3.5 mr-1.5" />
            {t("pmiBadge")}
          </Badge>
          <h2 className="mt-5 text-3xl md:text-4xl font-extrabold tracking-tight">
            {t("pmiT1")} <span className="text-gradient-brand">{t("pmiTHigh")}</span> {t("pmiT2")}
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">{t("pmiSub")}</p>
        </div>

        {/* Quick stats */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Globe2, value: `${PMI_STATS.countries} Negara`, label: t("pmiStatCountries") },
            { icon: Users, value: "425.000+", label: t("pmiStatTarget") },
            { icon: BriefcaseBusiness, value: "1,3 Juta+", label: t("pmiStatJobs") },
            { icon: ShieldCheck, value: "UU 18/2017", label: t("pmiStatLegal") },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <Card className="border-border/70 bg-card">
                <CardContent className="p-5 flex items-center gap-3.5">
                  <div className="h-11 w-11 shrink-0 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <s.icon className="h-5.5 w-5.5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-lg font-extrabold leading-tight">{s.value}</p>
                    <p className="text-xs text-muted-foreground truncate">{s.label}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Country grid */}
        <div className="mt-16">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              {t("pmiCountriesTitle")}
            </h3>
            <p className="mt-3 text-muted-foreground">{t("pmiCountriesSub")}</p>
          </div>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {visibleCountries.map((c, i) => (
              <motion.div
                key={c.code}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
              >
                <Card className="h-full hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border-border/70">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl" aria-hidden="true">{c.flag}</span>
                      <Badge variant="outline" className="text-[10px] rounded-full border-border/70 text-muted-foreground font-semibold">
                        {REGION_LABELS[c.region]}
                      </Badge>
                    </div>
                    <h4 className="mt-3 font-bold text-[15px] leading-tight">{c.name}</h4>
                    <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{c.sectors}</p>
                    <div className="mt-3 pt-3 border-t border-border/60 space-y-1.5">
                      <p className="flex items-center gap-1.5 text-[11px] text-foreground/70">
                        <Banknote className="h-3.5 w-3.5 text-primary shrink-0" aria-hidden="true" />
                        {c.salary}
                      </p>
                      <p className="flex items-center gap-1.5 text-[11px] text-foreground/70">
                        <FileSignature className="h-3.5 w-3.5 text-primary shrink-0" aria-hidden="true" />
                        {c.scheme}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowAllCountries(!showAllCountries)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              aria-expanded={showAllCountries}
            >
              {showAllCountries ? t("pmiShowLess") : t("pmiShowAllCountries")}
              <ChevronDown className={`h-4 w-4 transition-transform ${showAllCountries ? "rotate-180" : ""}`} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Process hulu ke hilir */}
        <div className="mt-16">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">{t("pmiProcessTitle")}</h3>
            <p className="mt-3 text-muted-foreground">{t("pmiProcessSub")}</p>
          </div>
          <ol className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PMI_PROCESS_STEPS.map((s, i) => (
              <motion.li
                key={s.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
                className="rounded-2xl border border-border/70 bg-card p-6 hover:shadow-md transition-shadow"
              >
                <span className="h-9 w-9 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                  {s.step}
                </span>
                <h4 className="mt-4 font-bold text-[15px]">{s.title}</h4>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* Services B2C / B2B */}
        <div className="mt-16">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">{t("pmiServicesTitle")}</h3>
            <p className="mt-3 text-muted-foreground">{t("pmiServicesSub")}</p>
          </div>
          <div className="mt-8 flex justify-center">
            <Tabs value={audience} onValueChange={(v) => setAudience(v as "individu" | "perusahaan")}>
              <TabsList className="rounded-full h-12 p-1.5 bg-accent border shadow-sm">
                <TabsTrigger
                  value="individu"
                  className="rounded-full px-5 md:px-7 py-2 text-sm font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <UserRound className="h-4 w-4 mr-2" aria-hidden="true" />
                  {t("pmiTabIndividu")}
                </TabsTrigger>
                <TabsTrigger
                  value="perusahaan"
                  className="rounded-full px-5 md:px-7 py-2 text-sm font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Building2 className="h-4 w-4 mr-2" aria-hidden="true" />
                  {t("pmiTabPerusahaan")}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, i) => (
              <PmiServiceCard key={service.id} service={service} index={i} t={t} />
            ))}
          </div>
        </div>

        {/* Legal note */}
        <div className="mt-12 max-w-3xl mx-auto">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-5 flex items-start gap-3.5">
              <ShieldCheck className="h-6 w-6 text-primary shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-sm text-foreground/80 leading-relaxed">{t("pmiLegalNote")}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
