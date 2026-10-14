"use client";

// ============================================================
// PUSATPERIZINAN.COM — FAQ Browser (client)
// Halaman /faq interaktif:
//   - Pencarian instan lintas pertanyaan & jawaban (nama lokal +
//     kanonik Indonesia, sehingga keyword Indonesia selalu kena)
//   - Filter chip kategori (Semua + 10 kategori)
//   - Accordion multi-open + deep-link #qid (shareable)
//   - i18n: UI 30 bahasa (FAQ_UI), konten en full + zh/ar/ja/es
//     top-10 (FAQ_CONTENT) + notice bahasa yang jujur
// ============================================================

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, X, MessageCircle, Sparkles, HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/lib/i18n/language-provider";
import { LANG_MAP } from "@/lib/i18n/languages";
import type { LangCode } from "@/lib/i18n/types";
import {
  FAQ_CATEGORIES,
  FAQ_UI,
  faqUiT,
  faqCategoryLabelT,
  faqItemT,
  faqContentCoverage,
  type FaqCategory,
  type FaqItem,
} from "@/lib/faq-data";
import { CONTACT } from "@/lib/site";

/** Ganti token {n} / {lang} pada template string UI. */
function fmt(template: string, vars: Record<string, string>): string {
  return Object.entries(vars).reduce(
    (acc, [k, v]) => acc.replaceAll(`{${k}}`, v),
    template,
  );
}

/** Tanggal pembaruan FAQ — terlokalisasi via Intl (fallback en). */
function updatedDate(lang: LangCode): string {
  try {
    return new Intl.DateTimeFormat(lang, {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(Date.UTC(2026, 9, 13)));
  } catch {
    return lang === "en" ? "13 October 2026" : "13 Oktober 2026";
  }
}

interface VisibleCat {
  cat: FaqCategory;
  /** Item hasil lokalisasi (q/a) untuk kategori ini */
  items: FaqItem[];
}

export function FaqBrowser() {
  const { lang } = useLanguage();
  const [query, setQuery] = useState("");
  const [activeCid, setActiveCid] = useState<string>("all");
  const [open, setOpen] = useState<string[]>([]);

  // --- String UI (dengan fallback lang → en → id) ----------------
  const t = useMemo(
    () => (key: keyof typeof FAQ_UI) => faqUiT(lang, key),
    [lang],
  );

  // --- Deep-link #qid: buka item & scroll saat mount -------------
  useEffect(() => {
    const h = decodeURIComponent(window.location.hash.replace("#", ""));
    if (!h) return;
    const valid = FAQ_CATEGORIES.some((c) => c.items.some((i) => i.qid === h));
    if (!valid) return;
    // setState di dalam callback async (bukan sinkron di body effect)
    const timer = setTimeout(() => {
      setActiveCid("all");
      setQuery("");
      setOpen([h]);
      document
        .getElementById(h)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => clearTimeout(timer);
  }, []);

  // --- Sinkronkan hash agar item yang terbuka bisa di-share ------
  useEffect(() => {
    if (open.length > 0) {
      history.replaceState(null, "", `#${open[open.length - 1]}`);
    } else if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname);
    }
  }, [open]);

  // --- Data terlokalisasi per kategori ---------------------------
  const localizedAll: VisibleCat[] = useMemo(
    () =>
      FAQ_CATEGORIES.map((cat) => ({
        cat,
        items: cat.items.map((it) => faqItemT(lang, it)),
      })),
    [lang],
  );

  // --- Pencarian + filter kategori -------------------------------
  const q = query.trim().toLowerCase();
  const visible: VisibleCat[] = useMemo(() => {
    if (!q) {
      return localizedAll.filter(
        (x) => activeCid === "all" || x.cat.cid === activeCid,
      );
    }
    // Cari di teks terlokalisasi DAN kanonik (keyword Indonesia
    // tetap menemukan jawaban walau UI sedang berbahasa lain)
    return localizedAll
      .map(({ cat, items }) => {
        const canonical = new Map(cat.items.map((i) => [i.qid, i]));
        const matched = items.filter((it) => {
          const c = canonical.get(it.qid);
          return (
            it.q.toLowerCase().includes(q) ||
            it.a.toLowerCase().includes(q) ||
            cat.label.toLowerCase().includes(q) ||
            (c?.q.toLowerCase().includes(q) ?? false) ||
            (c?.a.toLowerCase().includes(q) ?? false)
          );
        });
        return { cat, items: matched };
      })
      .filter((x) => x.items.length > 0);
  }, [q, activeCid, localizedAll]);

  const totalVisible = visible.reduce((n, x) => n + x.items.length, 0);
  const totalAll = FAQ_CATEGORIES.reduce((n, c) => n + c.items.length, 0);

  // --- Notice bahasa (jujur soal cakupan terjemahan konten) ------
  const coverage = faqContentCoverage(lang);
  const contentLangName =
    coverage === "top10"
      ? (LANG_MAP[lang]?.native ?? "English")
      : (LANG_MAP["en"]?.native ?? "English");
  const showNotice = coverage !== "full";

  const waHref = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Halo PusatPerizinan.com, saya punya pertanyaan seputar perizinan (dari halaman FAQ).",
  )}`;

  return (
    <main className="min-h-screen bg-background">
      {/* ---------- Hero band ---------- */}
      <section className="bg-gradient-to-b from-primary/10 via-primary/5 to-background pt-24 pb-10 md:pt-28 md:pb-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="mb-5 text-sm text-muted-foreground">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-primary">
                  {t("breadcrumbHome")}
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="font-semibold text-foreground">
                {t("breadcrumbFaq")}
              </li>
            </ol>
          </nav>

          <div className="text-center">
            <Badge
              variant="outline"
              className="rounded-full border-primary/30 bg-primary/5 px-4 py-1 font-semibold text-primary"
            >
              FAQ
            </Badge>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              {t("title1")}{" "}
              <span className="text-gradient-brand">{t("titleHigh")}</span>{" "}
              {t("title2")}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              {t("subtitle")}
            </p>

            {/* ---------- Pencarian ---------- */}
            <div className="relative mx-auto mt-8 max-w-2xl" role="search">
              <Search
                className="pointer-events-none absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <Input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (e.target.value) setActiveCid("all");
                }}
                placeholder={t("searchPlaceholder")}
                aria-label={t("searchLabel")}
                className="h-14 rounded-2xl border-border/80 bg-card ps-12 pe-12 text-base shadow-sm"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label={t("searchClear")}
                  className="absolute end-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              )}
            </div>

            {/* Notice cakupan terjemahan (bahasa non id/en) */}
            {showNotice && (
              <p className="mx-auto mt-4 max-w-2xl rounded-xl border border-primary/30 bg-primary/5 px-4 py-2.5 text-sm text-foreground/85">
                {fmt(t("langNotice"), { lang: contentLangName })}
              </p>
            )}

            {/* Baris meta: jumlah Q&A + tanggal pembaruan */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
              <Badge variant="secondary" className="rounded-full font-semibold">
                {totalAll} {t("questionsSuffix")}
              </Badge>
              <span>
                {t("updatedLabel")}: {updatedDate(lang)}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Chip kategori (sticky) ---------- */}
      <div className="sticky top-16 z-30 border-b border-border/60 bg-background/90 backdrop-blur-md md:top-[72px]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div
            role="group"
            aria-label="Filter kategori FAQ"
            className="flex gap-2 overflow-x-auto py-3 scrollbar-thin md:flex-wrap md:justify-center md:overflow-visible"
          >
            <button
              type="button"
              onClick={() => {
                setActiveCid("all");
                setQuery("");
              }}
              aria-pressed={activeCid === "all" && !q}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
                activeCid === "all" && !q
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-border/80 bg-card text-foreground/80 hover:border-primary/40 hover:text-primary"
              }`}
            >
              {t("allLabel")}
            </button>
            {FAQ_CATEGORIES.map((cat) => {
              const active = activeCid === cat.cid && !q;
              return (
                <button
                  key={cat.cid}
                  type="button"
                  onClick={() => {
                    setActiveCid(cat.cid);
                    setQuery("");
                  }}
                  aria-pressed={active}
                  className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
                    active
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "border-border/80 bg-card text-foreground/80 hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  <span aria-hidden className="me-1">
                    {cat.emoji}
                  </span>
                  {faqCategoryLabelT(lang, cat.cid, cat.label)}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ---------- Konten Q&A ---------- */}
      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {/* Baris hasil pencarian */}
          {q && (
            <p className="mb-6 text-sm font-medium text-muted-foreground" role="status">
              {fmt(t("resultCount"), { n: String(totalVisible) })}
            </p>
          )}

          {totalVisible === 0 ? (
            /* ---------- Empty state ---------- */
            <div className="mx-auto max-w-md rounded-2xl border border-border/70 bg-card p-8 text-center">
              <HelpCircle className="mx-auto h-10 w-10 text-muted-foreground/60" aria-hidden />
              <h2 className="mt-4 text-lg font-bold">{t("noResultsTitle")}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{t("noResultsSub")}</p>
              <Button
                variant="outline"
                className="mt-5 rounded-full font-semibold"
                onClick={() => setQuery("")}
              >
                <X className="h-4 w-4" aria-hidden />
                {t("allLabel")}
              </Button>
            </div>
          ) : (
            <div className="space-y-10">
              {visible.map(({ cat, items }) => (
                <div key={cat.cid}>
                  {/* Kepala kategori */}
                  <div className="flex items-start gap-3">
                    <span className="text-2xl leading-none" aria-hidden>
                      {cat.emoji}
                    </span>
                    <div>
                      <h2
                        id={`kat-${cat.cid}`}
                        className="text-xl font-bold tracking-tight"
                      >
                        {faqCategoryLabelT(lang, cat.cid, cat.label)}
                      </h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {/* Deskripsi kategori hanya tersedia kanonik Indonesia —
                            sembunyikan di bahasa lain agar tidak ada campuran */}
                        {lang === "id" && <>{cat.desc} · </>}
                        <span className="font-medium">
                          {items.length} {t("questionsSuffix")}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Accordion Q&A */}
                  <Accordion
                    type="multiple"
                    value={open}
                    onValueChange={setOpen}
                    className="mt-5 space-y-3"
                  >
                    {items.map((it) => (
                      <AccordionItem
                        key={it.qid}
                        value={it.qid}
                        id={it.qid}
                        className="scroll-mt-40 rounded-xl border border-border/70 bg-card px-5 transition-all last:border-b data-[state=open]:border-primary/30 data-[state=open]:shadow-md"
                      >
                        <AccordionTrigger className="text-start text-[15px] font-semibold hover:text-primary hover:no-underline">
                          {it.q}
                        </AccordionTrigger>
                        <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                          {it.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          )}

          {/* ---------- CTA: masih punya pertanyaan ---------- */}
          <div className="mt-14 rounded-2xl border border-primary/25 bg-primary/5 p-6 text-center md:p-8">
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
              {t("contactTitle")}
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground md:text-base">
              {t("contactSub")}
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                asChild
                className="w-full rounded-full px-6 font-semibold shadow-md shadow-primary/25 sm:w-auto"
              >
                <a href={waHref} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  {t("contactBtnWa")}
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full rounded-full border-primary/40 px-6 font-semibold text-primary hover:bg-primary/10 sm:w-auto"
              >
                <a href="/konsultasi">
                  <Sparkles className="h-4 w-4" aria-hidden />
                  {t("contactBtnConsult")}
                </a>
              </Button>
            </div>
          </div>

          {/* ---------- Tautan terkait (internal linking) ---------- */}
          <p className="mt-8 text-center text-xs text-muted-foreground">
            <Link href="/kebijakan-privasi" className="hover:text-primary hover:underline">
              Kebijakan Privasi
            </Link>
            <span aria-hidden> · </span>
            <Link href="/syarat-ketentuan" className="hover:text-primary hover:underline">
              Syarat &amp; Ketentuan
            </Link>
            <span aria-hidden> · </span>
            <Link href="/kontak" className="hover:text-primary hover:underline">
              Kontak
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
