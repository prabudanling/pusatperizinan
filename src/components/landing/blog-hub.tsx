"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  ChevronLeft,
  ArrowRight,
  Clock,
  CalendarDays,
  User2,
  Sparkles,
  Landmark,
  ListChecks,
  MessageCircleQuestion,
  Languages,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import {
  BLOG_ARTICLES,
  BLOG_CATEGORIES,
  getArticle,
  getRelatedArticles,
  type BlogArticle,
} from "@/lib/blog-content";
import { PERMIT_GUIDES } from "@/lib/seo-content";
import { useLanguage } from "@/lib/i18n/language-provider";

// ============================================================
// PUSATPERIZINAN.COM — Blog Hub (Content Center Phase 3)
// Reader artikel penuh + filter kategori + internal linking
// ============================================================

function fmtDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function guideName(id: string): string {
  return PERMIT_GUIDES.find((g) => g.id === id)?.name ?? id;
}

export function BlogHub() {
  const { t } = useLanguage();
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [category, setCategory] = useState<string>("Semua");
  const readerRef = useRef<HTMLDivElement>(null);

  const openArticle = useCallback((slug: string, scroll = true) => {
    setActiveSlug(slug);
    if (scroll) {
      setTimeout(() => {
        readerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
    }
  }, []);

  // Internal-link architecture: buka artikel dari peta situs / knowledge hub / footer
  useEffect(() => {
    const onOpen = (e: Event) => {
      const slug = (e as CustomEvent<string>).detail;
      if (slug && getArticle(slug)) openArticle(slug);
    };
    window.addEventListener("open-blog-article", onOpen);
    return () => window.removeEventListener("open-blog-article", onOpen);
  }, [openArticle]);

  const filtered = useMemo(
    () =>
      category === "Semua"
        ? BLOG_ARTICLES
        : BLOG_ARTICLES.filter((a) => a.category === category),
    [category]
  );

  const active = activeSlug ? getArticle(activeSlug) : undefined;

  return (
    <section id="blog" className="py-20 md:py-28 scroll-mt-20" aria-label="Blog dan artikel perizinan">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <Badge variant="outline" className="rounded-full border-gold/40 bg-gold/5 text-gold-foreground font-semibold px-4 py-1">
            <BookOpen className="h-3.5 w-3.5 mr-1.5" />
            Blog & Wawasan Perizinan
          </Badge>
          <h2 className="mt-5 text-3xl md:text-4xl font-extrabold tracking-tight">
            {t("blogT1")}{" "}
            <span className="text-gradient-brand">{t("blogTHigh")}</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            {t("blogSub").replace("{n}", String(BLOG_ARTICLES.length))}
          </p>
          <p className="mt-2.5 flex items-center justify-center gap-1.5 text-xs text-muted-foreground/85">
            <Languages className="h-3.5 w-3.5 text-primary" aria-hidden /> {t("contentNote")}
          </p>
        </div>

        {/* ===== Full-article reader ===== */}
        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={active.slug}
              ref={readerRef}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="mt-12 rounded-3xl border border-border/70 bg-card shadow-xl overflow-hidden scroll-mt-24"
            >
              <article className="p-6 md:p-10">
                {/* Breadcrumb */}
                <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                  <a href="#beranda" className="hover:text-primary">Beranda</a>
                  <span aria-hidden>/</span>
                  <a href="#blog" onClick={() => setActiveSlug(null)} className="hover:text-primary">Blog</a>
                  <span aria-hidden>/</span>
                  <span className="text-primary font-semibold">{active.category}</span>
                </nav>

                {/* Meta (E-E-A-T) */}
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
                  <Badge className="rounded-full bg-primary/10 text-primary border border-primary/20 font-semibold">
                    {active.category}
                  </Badge>
                  <span className="flex items-center gap-1.5">
                    <User2 className="h-3.5 w-3.5" />
                    {active.author} — {active.authorRole}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5" />
                    Terbit {fmtDate(active.publishedAt)} • Update {fmtDate(active.updatedAt)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {active.readMinutes} menit baca
                  </span>
                </div>

                <h2 className="mt-4 text-2xl md:text-3xl font-extrabold tracking-tight leading-tight">
                  {active.title}
                </h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">{active.excerpt}</p>

                {/* Isi artikel */}
                <div className="mt-8 space-y-7">
                  {active.sections.map((s, i) => (
                    <section key={i} aria-label={s.heading}>
                      <h3 className="text-lg md:text-xl font-bold flex items-start gap-2.5">
                        <span className="mt-1 h-6 w-1.5 shrink-0 rounded-full bg-gradient-to-b from-primary to-gold" aria-hidden />
                        {s.heading}
                      </h3>
                      <div className="mt-3 space-y-3">
                        {s.paragraphs.map((p, j) => (
                          <p key={j} className="text-[15px] text-foreground/85 leading-relaxed">{p}</p>
                        ))}
                      </div>
                      {s.bullets && s.bullets.length > 0 && (
                        <ul className="mt-3 space-y-2">
                          {s.bullets.map((b, j) => (
                            <li key={j} className="flex items-start gap-2.5 text-sm text-foreground/85">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                              {b}
                            </li>
                          ))}
                        </ul>
                      )}
                    </section>
                  ))}
                </div>

                {/* FAQ artikel */}
                {active.faq.length > 0 && (
                  <div className="mt-10">
                    <h3 className="text-lg md:text-xl font-bold flex items-center gap-2">
                      <MessageCircleQuestion className="h-5 w-5 text-primary" />
                      Sering Ditanya Soal Ini
                    </h3>
                    <Accordion type="single" collapsible className="mt-4 space-y-3">
                      {active.faq.map((f, i) => (
                        <AccordionItem
                          key={i}
                          value={`faq-${i}`}
                          className="border border-border/70 rounded-2xl bg-secondary/40 px-5 last:border-b"
                        >
                          <AccordionTrigger className="py-4 text-sm font-bold hover:no-underline hover:text-primary text-left">
                            {f.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                            {f.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                )}

                {/* Cross-link: panduan izin terkait */}
                {active.relatedGuides.length > 0 && (
                  <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-5">
                    <p className="flex items-center gap-1.5 text-sm font-bold">
                      <Landmark className="h-4 w-4 text-primary" />
                      Pelajari Lebih Dalam di Panduan Kami
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {active.relatedGuides.map((g) => (
                        <a
                          key={g}
                          href="#panduan"
                          onClick={() => window.dispatchEvent(new CustomEvent("open-guide", { detail: g }))}
                          className="inline-flex items-center gap-1.5 rounded-full bg-card border border-primary/25 px-3.5 py-1.5 text-xs font-semibold text-primary hover:bg-primary/10 transition-colors"
                        >
                          {guideName(g)}
                          <ArrowRight className="h-3 w-3" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cross-link: artikel terkait */}
                {getRelatedArticles(active.relatedArticles).length > 0 && (
                  <div className="mt-6">
                    <p className="flex items-center gap-1.5 text-sm font-bold">
                      <ListChecks className="h-4 w-4 text-primary" />
                      Artikel Terkait
                    </p>
                    <div className="mt-3 grid sm:grid-cols-2 gap-3">
                      {getRelatedArticles(active.relatedArticles).map((r) => (
                        <button
                          key={r.slug}
                          onClick={() => openArticle(r.slug)}
                          className="text-left rounded-2xl border border-border/70 bg-secondary/40 p-4 hover:border-primary/40 hover:shadow-md transition-all"
                        >
                          <Badge variant="outline" className="rounded-full text-[10px] border-gold/40 text-gold-foreground font-semibold">
                            {r.category}
                          </Badge>
                          <p className="mt-2 text-sm font-bold leading-snug">{r.title}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{r.readMinutes} menit baca</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA penutup */}
                <div className="mt-10 flex flex-col sm:flex-row items-center gap-3 rounded-2xl bg-gradient-to-r from-primary to-emerald-700 p-5 text-primary-foreground">
                  <Sparkles className="h-5 w-5 shrink-0 hidden sm:block" aria-hidden />
                  <p className="text-sm font-semibold flex-1 text-center sm:text-left">
                    Tidak mau repot? Serahkan semuanya ke tim ahli kami — garansi 100% uang kembali.
                  </p>
                  <Button asChild variant="secondary" className="rounded-full font-bold shrink-0 w-full sm:w-auto">
                    <a href={active.cta.anchor}>
                      {active.cta.text} <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                </div>

                <button
                  onClick={() => setActiveSlug(null)}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                >
                  <ChevronLeft className="h-4 w-4" /> Kembali ke semua artikel
                </button>
              </article>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filter kategori */}
        <div className="mt-12 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter artikel per kategori">
          {["Semua", ...BLOG_CATEGORIES].map((c) => {
            const count =
              c === "Semua"
                ? BLOG_ARTICLES.length
                : BLOG_ARTICLES.filter((a) => a.category === c).length;
            if (count === 0) return null;
            return (
              <button
                key={c}
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-bold border transition-all",
                  category === c
                    ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/25"
                    : "bg-card text-foreground/75 border-border hover:border-primary/40 hover:text-primary"
                )}
              >
                {c} ({count})
              </button>
            );
          })}
        </div>

        {/* Grid kartu artikel */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((a: BlogArticle, i) => (
            <motion.article
              key={a.slug}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.05 }}
            >
              <button
                onClick={() => openArticle(a.slug)}
                className={cn(
                  "w-full h-full text-left rounded-3xl border bg-card p-6 transition-all hover:shadow-xl hover:border-primary/40 flex flex-col",
                  activeSlug === a.slug ? "border-primary shadow-lg" : "border-border/70"
                )}
                aria-label={`Baca artikel: ${a.title}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <Badge className="rounded-full bg-primary/10 text-primary border border-primary/20 font-semibold text-[11px]">
                    {a.category}
                  </Badge>
                  <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Clock className="h-3 w-3" aria-hidden />
                    {a.readMinutes} mnt
                  </span>
                </div>
                <h3 className="mt-4 font-bold text-[15.5px] leading-snug">{a.title}</h3>
                <p className="mt-2.5 text-[13px] text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                  {a.excerpt}
                </p>
                <div className="mt-4 pt-4 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>{fmtDate(a.publishedAt)}</span>
                  <span className="inline-flex items-center gap-1 font-bold text-primary">
                    Baca Artikel <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </span>
                </div>
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
