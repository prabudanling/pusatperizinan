"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Clock,
  Languages,
  User2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  BLOG_ARTICLES,
  BLOG_CATEGORIES,
  type BlogArticle,
} from "@/lib/blog-content";
import { fmtDateID } from "@/lib/format";
import { useLanguage } from "@/lib/i18n/language-provider";

// ============================================================
// PUSATPERIZINAN.COM — Blog Hub (direfactori, P0-02)
// Kartu artikel kini berupa <Link href="/blog/[slug]"> asli:
// - Google dapat crawl setiap artikel dari homepage
// - Konten artikel TIDAK lagi terduplikasi di homepage
//   (sebelumnya reader in-page merender artikel penuh di /)
// Desain kartu dipertahankan persis.
// ============================================================

export function BlogHub() {
  const { t } = useLanguage();
  const [category, setCategory] = useState<string>("Semua");

  const filtered = useMemo(
    () =>
      (category === "Semua"
        ? BLOG_ARTICLES
        : BLOG_ARTICLES.filter((a) => a.category === category)
      ).slice(0, 9),
    [category]
  );

  return (
    <section id="blog" aria-label="Blog dan artikel perizinan" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header — desain asli dipertahankan */}
        <div className="text-center max-w-3xl mx-auto">
          <Badge variant="outline" className="rounded-full border-gold/40 bg-gold/5 text-gold-foreground font-semibold px-4 py-1">
            <BookOpen className="h-3.5 w-3.5 mr-1.5" aria-hidden />
            Blog &amp; Wawasan Perizinan
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
          <Link
            href="/blog"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
          >
            Lihat semua artikel <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        {/* Filter kategori */}
        <div className="mt-10 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter artikel per kategori">
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

        {/* Grid kartu artikel — LINK NYATA ke /blog/[slug] */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((a: BlogArticle, i) => (
            <motion.article
              key={a.slug}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.05 }}
            >
              <Link
                href={`/blog/${a.slug}`}
                className="group flex h-full flex-col rounded-3xl border border-border/70 bg-card p-6 transition-all hover:shadow-xl hover:border-primary/40"
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
                <h3 className="mt-4 font-bold text-[15.5px] leading-snug group-hover:text-primary transition-colors">
                  {a.title}
                </h3>
                <p className="mt-2.5 text-[13px] text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                  {a.excerpt}
                </p>
                <div className="mt-4 pt-4 border-t border-border/60 text-[11px] text-muted-foreground">
                  <p className="flex items-center gap-1.5">
                    <User2 className="h-3 w-3" aria-hidden /> {a.author}
                  </p>
                  <p className="mt-1 flex items-center gap-1.5">
                    <CalendarDays className="h-3 w-3" aria-hidden /> Diperbarui {fmtDateID(a.updatedAt)}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 font-bold text-primary">
                    Baca Artikel <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
