"use client";

import { motion } from "framer-motion";
import { Star, Quote, BadgeCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TESTIMONIALS } from "@/lib/landing-data";
import { useLanguage } from "@/lib/i18n/language-provider";

function initialsOf(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Testimonials() {
  const { t } = useLanguage();
  return (
    <section id="testimoni" className="py-20 md:py-28 bg-secondary/40 border-y scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <Badge variant="outline" className="rounded-full border-gold/40 bg-gold/10 text-gold-foreground font-semibold px-4 py-1">
            Testimoni Klien
          </Badge>
          <h2 className="mt-5 text-3xl md:text-4xl font-extrabold tracking-tight">
            {t("testiT1")} <span className="text-gradient-brand">{t("testiTHigh")}</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            {t("testiSub")}
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
            >
              <Card className="h-full border-border/70 hover:shadow-lg hover:border-primary/20 transition-all duration-300">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-0.5" aria-label={`Rating ${t.rating} dari 5 bintang`}>
                      {[...Array(t.rating)].map((_, j) => (
                        <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <Quote className="h-5 w-5 text-primary/20" aria-hidden="true" />
                  </div>
                  <p className="mt-4 text-sm text-foreground/85 leading-relaxed flex-1">
                    &ldquo;{t.content}&rdquo;
                  </p>
                  <div className="mt-5 pt-4 border-t flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-primary/20">
                      <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-emerald-700 text-white text-xs font-bold">
                        {initialsOf(t.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="text-sm font-bold flex items-center gap-1.5 truncate">
                        {t.name}
                        <BadgeCheck className="h-3.5 w-3.5 text-primary shrink-0" aria-label="Klien terverifikasi" />
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {t.role} • {t.city}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
