"use client";

import { motion } from "framer-motion";
import { Star, Quote, BadgeCheck, ThumbsUp, CalendarDays, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { getFeaturedTestimonials, formatTanggalID, getRatingStats } from "@/lib/testimonials-data";
import { useLanguage } from "@/lib/i18n/language-provider";

function initialsOf(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Rating ${rating} dari 5 bintang`}>
      {[...Array(rating)].map((_, j) => (
        <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden />
      ))}
    </div>
  );
}

export function Testimonials() {
  const { t } = useLanguage();
  const featured = getFeaturedTestimonials(6);
  const stats = getRatingStats();

  return (
    <section id="testimoni" className="py-20 md:py-28 bg-secondary/40 border-y scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <Badge variant="outline" className="rounded-full border-gold/40 bg-gold/10 text-gold-foreground font-semibold px-4 py-1">
            Testimoni Klien Terverifikasi
          </Badge>
          <h2 className="mt-5 text-3xl md:text-4xl font-extrabold tracking-tight">
            {t("testiT1")} <span className="text-gradient-brand">{t("testiTHigh")}</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            {t("testiSub")}
          </p>
        </div>

        {/* Aggregate rating bar */}
        <div className="mt-10 mx-auto max-w-3xl rounded-2xl border bg-card p-5 md:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8">
            <div className="flex items-center gap-3">
              <span className="text-5xl font-extrabold tracking-tight">{stats.average.toFixed(1).replace(".", ",")}</span>
              <div>
                <Stars rating={5} />
                <p className="mt-1 text-xs text-muted-foreground">dari 5 bintang</p>
              </div>
            </div>
            <div className="h-10 w-px bg-border hidden sm:block" aria-hidden />
            <div className="text-center sm:text-left">
              <p className="text-sm font-semibold">
                {stats.verifiedCount} ulasan terverifikasi di halaman ini
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                dari 1.247 klien di 38 provinsi · {stats.helpfulTotal.toLocaleString("id-ID")} pembaca menilai "membantu"
              </p>
            </div>
            <Link
              href="/testimoni"
              className="group inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 min-h-[44px]"
            >
              Semua Testimoni
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
            >
              <Card className="h-full border-border/70 hover:shadow-lg hover:border-primary/20 transition-all duration-300">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center justify-between">
                    <Stars rating={t.rating} />
                    <Quote className="h-5 w-5 text-primary/20" aria-hidden="true" />
                  </div>
                  <p className="mt-4 text-sm text-foreground/85 leading-relaxed flex-1">
                    &ldquo;{t.content.length > 240 ? `${t.content.slice(0, 240).trimEnd()}…` : t.content}&rdquo;
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant="secondary" className="text-[10px] font-medium">
                      {t.service}
                    </Badge>
                    <span className="flex items-center gap-1">
                      <CalendarDays className="h-3 w-3" aria-hidden />
                      {formatTanggalID(t.date)}
                    </span>
                  </div>
                  <div className="mt-4 pt-4 border-t flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-primary/20">
                      <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-emerald-700 text-white text-xs font-bold">
                        {initialsOf(t.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold flex items-center gap-1.5 truncate">
                        {t.name}
                        <BadgeCheck className="h-3.5 w-3.5 text-primary shrink-0" aria-label="Klien terverifikasi" />
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {t.role}, {t.company} • {t.city}
                      </p>
                    </div>
                    <span className="flex items-center gap-1 text-[11px] text-muted-foreground shrink-0" aria-label={`${t.helpful} orang menilai membantu`}>
                      <ThumbsUp className="h-3 w-3" aria-hidden /> {t.helpful}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/testimoni"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            Baca {stats.total} testimoni lengkap per kategori layanan
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
