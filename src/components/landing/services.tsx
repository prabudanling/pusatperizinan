"use client";

import { motion } from "framer-motion";
import { Clock, ArrowRight, Flame } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SERVICES } from "@/lib/landing-data";
import { useLanguage } from "@/lib/i18n/language-provider";

export function Services() {
  const { t } = useLanguage();
  return (
    <section id="layanan" className="py-20 md:py-28 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto">
          <Badge variant="outline" className="rounded-full border-primary/30 bg-primary/5 text-primary font-semibold px-4 py-1">
            Layanan Kami
          </Badge>
          <h2 className="mt-5 text-3xl md:text-4xl font-extrabold tracking-tight">
            {t("servicesT1")} <span className="text-gradient-brand">{t("servicesTHigh")}</span> {t("servicesT2")}
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            {t("servicesSub")}
          </p>
        </div>

        {/* Services grid */}
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
            >
              <Card
                id={`layanan-${service.id}`}
                className={`group relative h-full hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 border-border/70 scroll-mt-24 ${
                  service.popular ? "ring-1 ring-primary/40" : ""
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-2.5 left-5 z-10">
                    <Badge className="rounded-full bg-gold text-gold-foreground font-bold text-[10px] px-3 py-0.5 shadow-md">
                      <Flame className="h-3 w-3 mr-1" />
                      TERLARIS
                    </Badge>
                  </div>
                )}
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-start justify-between">
                    <div
                      className={`h-12 w-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                        service.popular
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      <service.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-extrabold text-foreground">{service.price}</p>
                      <p className="flex items-center justify-end gap-1 text-[11px] text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {service.duration}
                      </p>
                    </div>
                  </div>

                  <h3 className="mt-4 text-lg font-bold tracking-tight">{service.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{service.desc}</p>

                  <ul className="mt-4 space-y-1.5 flex-1">
                    {service.features.slice(0, 3).map((f, j) => (
                      <li key={j} className="flex items-start gap-2 text-[13px] text-foreground/75">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#konsultasi"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all"
                  >
                    Urus sekarang
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">
            Butuh izin yang tidak tercantum?{" "}
            <a href="#konsultasi" className="font-semibold text-primary hover:underline">
              Konsultasikan gratis
            </a>{" "}
            — kami menangani 40+ jenis perizinan lainnya.
          </p>
        </div>
      </div>
    </section>
  );
}
