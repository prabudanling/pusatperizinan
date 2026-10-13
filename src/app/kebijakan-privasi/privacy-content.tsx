"use client";

// ============================================================
// PUSATPERIZINAN.COM — /kebijakan-privasi (client renderer)
// Merender konten dari src/lib/privacy-content.ts sesuai bahasa
// aktif: konten penuh id/en, string UI 30 bahasa, ToC sticky,
// notice bahasa untuk bahasa tanpa terjemahan penuh, kartu kontak
// DPO, dan tautan terkait. RTL aman (memakai properti logis CSS).
// ============================================================

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/language-provider";
import { LANG_MAP } from "@/lib/i18n/languages";
import {
  PRIVACY_SECTIONS,
  PRIVACY_UPDATED,
  PRIVACY_VERSION,
  privacyContentLang,
  privacyLangName,
  privacyUiT,
  type PrivacyBlock,
} from "@/lib/privacy-content";
import { CONTACT } from "@/lib/site";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

/** Render satu blok konten: paragraf, bullet list, atau tabel responsif. */
function PrivacyBlockView({ block, caption }: { block: PrivacyBlock; caption: string }) {
  if (block.type === "p") {
    return <p className="text-[15px] leading-relaxed text-foreground/85">{block.text}</p>;
  }

  if (block.type === "bullets") {
    return (
      <ul className="space-y-2.5">
        {block.items.map((item, i) => (
          <li key={i} className="flex gap-2.5">
            {/* Marker titik kustom — dekoratif, teks tetap jadi list semantik */}
            <span
              aria-hidden="true"
              className="mt-[9px] inline-block size-1.5 shrink-0 rounded-full bg-primary/70"
            />
            <span className="text-[15px] leading-relaxed text-foreground/85">{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  // Tabel responsif: wrapper overflow-x-auto agar tak mecah layout di ponsel
  return (
    <div className="overflow-x-auto rounded-xl border border-border/70">
      <table className="w-full min-w-[480px] text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-muted/50">
          <tr>
            {block.head.map((h, i) => (
              <th
                key={i}
                scope="col"
                className="border-b border-border/70 px-3.5 py-2.5 text-start font-semibold text-foreground"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, i) => (
            <tr key={i} className="border-b border-border/60 last:border-b-0">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={cn(
                    "px-3.5 py-2.5 align-top leading-relaxed",
                    j === 0 ? "font-medium text-foreground" : "text-foreground/85"
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PrivacyContent() {
  const { lang, rtl } = useLanguage();

  // Bahasa konten yang benar-benar ditampilkan ("en" hanya untuk lang en)
  const contentLang = privacyContentLang(lang);
  const sections = PRIVACY_SECTIONS[contentLang];
  const updated = PRIVACY_UPDATED[contentLang];

  const ui = (key: Parameters<typeof privacyUiT>[1]) => privacyUiT(lang, key);

  // Notice bahasa: pengguna memilih bahasa tanpa terjemahan penuh (bukan id/en).
  // Token {lang} diganti nama native bahasa konten yang ditampilkan — jujur.
  const showLangNotice = contentLang === "id" && lang !== "id" && lang !== "en";
  const displayedNative = LANG_MAP[contentLang]?.native ?? privacyLangName(contentLang);
  const langNotice = ui("langNotice").replace("{lang}", displayedNative);

  // Scroll-spy sederhana: tandai seksi aktif di ToC lewat IntersectionObserver
  const [activeAnchor, setActiveAnchor] = useState<string>(sections[0]?.anchor ?? "");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveAnchor(entry.target.id);
        }
      },
      // Band pengamatan sedikit di bawah header fixed (72px)
      { rootMargin: "-112px 0px -65% 0px", threshold: 0 }
    );
    for (const s of sections) {
      const el = document.getElementById(s.anchor);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [sections]);

  const tocTitle = ui("tocTitle");

  return (
    <main id="pp-top" className="min-h-screen bg-background">
      {/* ===== Hero band ===== */}
      <div className="border-b border-border/60 bg-gradient-to-b from-primary/10 via-primary/5 to-background">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-24 sm:px-6 md:pb-12 md:pt-28">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-primary">
                  {ui("breadcrumbHome")}
                </Link>
              </li>
              <li aria-hidden="true" className="text-muted-foreground/50">/</li>
              <li aria-current="page" className="font-semibold text-foreground">
                {ui("breadcrumbPrivacy")}
              </li>
            </ol>
          </nav>

          <h1 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {ui("title")}
          </h1>

          {/* Baris badge: versi, tanggal pembaruan (per bahasa), tanggal efektif */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="bg-background/60">
              {ui("versionLabel")}: {PRIVACY_VERSION}
            </Badge>
            <Badge variant="outline" className="bg-background/60">
              {ui("updatedLabel")}: {updated}
            </Badge>
            <Badge variant="outline" className="bg-background/60">
              {ui("effectiveLabel")}: {updated}
            </Badge>
          </div>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {ui("subtitle")}
          </p>
        </div>
      </div>

      {/* ===== Konten dua kolom (ToC sticky di lg) ===== */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="lg:grid lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-10 xl:gap-14">
          {/* ToC sidebar — desktop only */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto py-12 pe-2 scrollbar-thin">
              <nav aria-label={tocTitle}>
                <p className="text-sm font-bold text-foreground">{tocTitle}</p>
                <Separator className="my-3" />
                <ul className="space-y-0.5">
                  {sections.map((s) => (
                    <li key={s.anchor}>
                      <a
                        href={`#${s.anchor}`}
                        aria-current={activeAnchor === s.anchor ? "true" : undefined}
                        className={cn(
                          "block rounded-lg px-3 py-1.5 text-sm leading-snug transition-colors",
                          activeAnchor === s.anchor
                            ? "bg-primary/10 font-semibold text-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* Kolom konten utama */}
          <div className="py-10 lg:py-12">
            <div className="max-w-3xl space-y-12">
              {/* Notice bahasa — muncul bila bahasa pengguna belum punya versi penuh */}
              {showLangNotice && (
                <div
                  role="note"
                  className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-sm leading-relaxed text-foreground/90"
                >
                  {langNotice}
                </div>
              )}

              {sections.map((s) => (
                <section key={s.anchor} aria-labelledby={s.anchor}>
                  <h2
                    id={s.anchor}
                    className="scroll-mt-28 text-xl font-bold tracking-tight sm:text-2xl"
                  >
                    {s.title}
                  </h2>
                  <div className="mt-4 space-y-3.5">
                    {s.blocks.map((block, i) => (
                      <PrivacyBlockView key={i} block={block} caption={s.title} />
                    ))}
                  </div>
                </section>
              ))}

              {/* ===== Kartu kontak DPO ===== */}
              <section
                aria-labelledby="pp-contact-title"
                className="rounded-2xl border border-primary/25 bg-primary/5 p-6"
              >
                <h2 id="pp-contact-title" className="text-lg font-bold tracking-tight">
                  {ui("contactTitle")}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {ui("contactSub")}
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button asChild>
                    <a href="mailto:privacy@pusatperizinan.com">{ui("btnEmail")}</a>
                  </Button>
                  <Button asChild variant="outline">
                    <a
                      href={`https://wa.me/${CONTACT.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {ui("btnWa")}
                    </a>
                  </Button>
                </div>
              </section>

              {/* ===== Tautan terkait ===== */}
              <div>
                <p className="text-sm font-semibold text-foreground">{ui("relatedLabel")}</p>
                <div className="mt-2.5 flex flex-wrap gap-2.5">
                  <Button asChild variant="outline" size="sm">
                    <Link href="/syarat-ketentuan">
                      Syarat &amp; Ketentuan
                      <span aria-hidden="true">{rtl ? "←" : "→"}</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/faq">
                      FAQ
                      <span aria-hidden="true">{rtl ? "←" : "→"}</span>
                    </Link>
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Catatan bahasa yang mengikat (small print) */}
              <p className="text-xs leading-relaxed text-muted-foreground">
                {ui("governingLangNote")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
