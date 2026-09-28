"use client";

import { BookOpen, FileText, Globe2, Landmark, MapPin, Wrench, Languages } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SERVICES } from "@/lib/landing-data";
import { PERMIT_GUIDES } from "@/lib/seo-content";
import { BLOG_ARTICLES } from "@/lib/blog-content";
import { ISLANDS, PROVINCES } from "@/lib/coverage-data";
import { useLanguage } from "@/lib/i18n/language-provider";

// ============================================================
// PUSATPERIZINAN.COM — Peta Situs HTML (internal-link powerhouse)
// Semua konten tersambung dalam satu klik: layanan, panduan,
// artikel, wilayah — crawlable untuk mesin pencari
// ============================================================

function openGuide(id: string) {
  window.dispatchEvent(new CustomEvent("open-guide", { detail: id }));
}

function openArticle(slug: string) {
  window.dispatchEvent(new CustomEvent("open-blog-article", { detail: slug }));
}

const TOOLS = [
  { label: "Cek Izin AI", href: "#cek-izin" },
  { label: "Kalkulator Biaya", href: "#kalkulator" },
  { label: "Kursus Email 7 Hari", href: "#kursus" },
  { label: "Konsultasi Gratis", href: "#konsultasi" },
];

export function HtmlSitemap() {
  const { t } = useLanguage();
  return (
    <section
      id="peta-situs"
      className="py-16 md:py-20 bg-secondary/40 scroll-mt-20 border-t border-border/60"
      aria-label="Peta situs dan direktori konten"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <Badge variant="outline" className="rounded-full border-primary/30 bg-primary/5 text-primary font-semibold px-4 py-1">
            <Globe2 className="h-3.5 w-3.5 mr-1.5" />
            Peta Situs
          </Badge>
          <h2 className="mt-5 text-3xl md:text-4xl font-extrabold tracking-tight">
            {t("sitemapT1")} <span className="text-gradient-brand">{t("sitemapTHigh")}</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            {t("sitemapSub")}
          </p>
          <p className="mt-2.5 flex items-center justify-center gap-1.5 text-xs text-muted-foreground/85">
            <Languages className="h-3.5 w-3.5 text-primary" aria-hidden /> {t("contentNote")}
          </p>
        </div>

        {/* Stat strip */}
        <div className="mt-7 flex flex-wrap justify-center gap-2.5">
          {[
            { n: `${SERVICES.length}`, l: "Layanan" },
            { n: `${PERMIT_GUIDES.length}`, l: "Panduan" },
            { n: `${BLOG_ARTICLES.length}`, l: "Artikel" },
            { n: "38", l: "Provinsi" },
            { n: "514", l: "Kab/Kota" },
          ].map((s) => (
            <Badge
              key={s.l}
              variant="outline"
              className="rounded-full border-border bg-card px-3.5 py-1.5 text-xs font-semibold"
            >
              <strong className="text-primary">{s.n}</strong>
              <span className="ml-1 text-muted-foreground font-normal">{s.l}</span>
            </Badge>
          ))}
        </div>

        {/* Grid direktori */}
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Kolom 1: Layanan */}
          <nav aria-label="Direktori layanan" className="rounded-2xl border border-border/60 bg-card p-5">
            <h3 className="flex items-center gap-2 text-sm font-extrabold">
              <Landmark className="h-4 w-4 text-primary" aria-hidden />
              Layanan Perizinan
            </h3>
            <ul className="mt-3.5 space-y-2 max-h-96 overflow-y-auto scrollbar-thin pr-2">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <a
                    href="#layanan"
                    title={s.desc}
                    className="text-[13px] text-foreground/75 hover:text-primary transition-colors"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Kolom 2: Panduan */}
          <nav aria-label="Direktori panduan" className="rounded-2xl border border-border/60 bg-card p-5">
            <h3 className="flex items-center gap-2 text-sm font-extrabold">
              <FileText className="h-4 w-4 text-primary" aria-hidden />
              Panduan Mendalam
            </h3>
            <ul className="mt-3.5 space-y-2 max-h-96 overflow-y-auto scrollbar-thin pr-2">
              {PERMIT_GUIDES.map((g) => (
                <li key={g.id}>
                  <a
                    href="#panduan"
                    title={g.short}
                    onClick={() => openGuide(g.id)}
                    className="text-[13px] text-foreground/75 hover:text-primary transition-colors"
                  >
                    {g.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Kolom 3: Artikel */}
          <nav aria-label="Direktori artikel blog" className="rounded-2xl border border-border/60 bg-card p-5">
            <h3 className="flex items-center gap-2 text-sm font-extrabold">
              <BookOpen className="h-4 w-4 text-primary" aria-hidden />
              Artikel Blog
            </h3>
            <ul className="mt-3.5 space-y-2 max-h-96 overflow-y-auto scrollbar-thin pr-2">
              {BLOG_ARTICLES.map((a) => (
                <li key={a.slug}>
                  <a
                    href="#blog"
                    title={a.excerpt}
                    onClick={() => openArticle(a.slug)}
                    className="text-[13px] text-foreground/75 hover:text-primary transition-colors"
                  >
                    {a.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Kolom 4: Wilayah */}
          <nav aria-label="Direktori wilayah" className="rounded-2xl border border-border/60 bg-card p-5">
            <h3 className="flex items-center gap-2 text-sm font-extrabold">
              <MapPin className="h-4 w-4 text-primary" aria-hidden />
              Jangkauan 38 Provinsi
            </h3>
            <div className="mt-3.5 max-h-96 overflow-y-auto scrollbar-thin pr-2">
              {ISLANDS.map((island) => (
                <div key={island} className="mb-3 last:mb-0">
                  <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-primary">
                    {island}
                  </h4>
                  <ul className="mt-1.5 space-y-1.5">
                    {PROVINCES.filter((p) => p.island === island).map((p) => (
                      <li key={p.name}>
                        <a
                          href="#jangkauan"
                          title={`Perizinan ${p.name}: ${p.note}`}
                          className="text-xs text-foreground/70 hover:text-primary transition-colors"
                        >
                          {p.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>
        </div>

        {/* Alat gratis */}
        <div className="mt-8 flex flex-col sm:flex-row flex-wrap items-center justify-between gap-4 rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/5 to-gold/5 p-5">
          <p className="flex items-center gap-2 text-sm font-bold">
            <Wrench className="h-4.5 w-4.5 text-primary" aria-hidden />
            Alat Gratis untuk Anda:
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {TOOLS.map((t) => (
              <a
                key={t.href}
                href={t.href}
                className="rounded-full bg-primary px-4.5 py-2 text-xs font-bold text-primary-foreground shadow-md shadow-primary/20 hover:shadow-primary/40 transition-shadow"
              >
                {t.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
