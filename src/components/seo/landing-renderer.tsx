// ============================================================
// PUSATPERIZINAN.COM — Renderer Halaman SEO Ekspansi
// Dipakai rute /biaya/[slug], /syarat/[slug], /industri/[slug],
// /industri/[slug]/[service] — satu gaya, konten dari SeoPage.
// Server component (JSON-LD + Accordion shadcn).
// ============================================================

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ChevronRight,
  Clock,
  HelpCircle,
  ListChecks,
  PhoneCall,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { WHATSAPP_NUMBER } from "@/lib/landing-data";
import { SITE_URL } from "@/lib/site";
import type { SeoPage } from "@/lib/seo-pages";

const KIND_LABEL: Record<string, string> = {
  biaya: "Biaya & Harga",
  syarat: "Syarat & Dokumen",
  industri: "Panduan Sektor Industri",
  "svc-industry": "Layanan × Industri",
};

export function SeoLandingView({ page }: { page: SeoPage }) {
  const waText = `Halo, saya membaca halaman "${page.h1}" di PusatPerizinan.com. Kondisi usaha saya: `;
  const canonical = page.kind === "svc-industry" ? `/industri/${page.slug}` : `/${page.kind}/${page.slug}`;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: `${SITE_URL}/` },
      ...page.breadcrumbs.slice(1).map((b, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: b.name,
        item: `${SITE_URL}${b.href}`,
      })),
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.h1,
    description: page.metaDesc,
    author: { "@type": "Organization", name: "PusatPerizinan.com", url: SITE_URL },
    publisher: { "@type": "Organization", name: "PusatPerizinan.com", url: SITE_URL },
    about: KIND_LABEL[page.kind],
    mainEntityOfPage: `${SITE_URL}${canonical}`,
  };

  return (
    <main className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      {/* Header */}
      <div className="border-b bg-card/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Beranda PusatPerizinan.com">
            <img src="/logo-icon.png" alt="Logo PusatPerizinan.com" className="h-8 w-8" />
            <span className="font-bold text-[15px] tracking-tight">
              Pusat<span className="text-primary">Perizinan</span>
              <span className="text-gold">.com</span>
            </span>
            <span className="text-sm text-muted-foreground hidden sm:inline">/ {KIND_LABEL[page.kind]}</span>
          </Link>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:shadow-md min-h-[44px]"
          >
            <PhoneCall className="h-4 w-4" aria-hidden />
            Konsultasi Gratis
          </a>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-6">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground flex flex-wrap items-center">
          {page.breadcrumbs.map((b, i) => (
            <span key={b.href} className="flex items-center">
              {i > 0 && <ChevronRight className="mx-1 h-3.5 w-3.5" aria-hidden />}
              {i < page.breadcrumbs.length - 1 ? (
                <Link href={b.href} className="hover:text-primary">{b.name}</Link>
              ) : (
                <span className="font-medium text-foreground">{b.name}</span>
              )}
            </span>
          ))}
        </nav>
      </div>

      {/* Hero */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge className="bg-primary/10 text-primary border border-primary/20">
            <Sparkles className="h-3 w-3 mr-1" aria-hidden /> {KIND_LABEL[page.kind]}
          </Badge>
          <Badge variant="outline" className="text-muted-foreground">
            <ShieldCheck className="h-3 w-3 mr-1" aria-hidden /> Garansi uang kembali 100%
          </Badge>
        </div>
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-balance">{page.h1}</h1>
        <div className="mt-4 space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed">
          {page.intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm md:text-base font-bold text-primary-foreground shadow-md transition-all hover:shadow-lg min-h-[44px]"
          >
            <PhoneCall className="h-5 w-5" aria-hidden /> Konsultasi Gratis 15 Menit
          </a>
          <Link
            href="/layanan"
            className="inline-flex items-center gap-2 rounded-xl border bg-background px-6 py-3 text-sm md:text-base font-semibold hover:border-primary/50 transition-colors min-h-[44px]"
          >
            Lihat Katalog Layanan <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>

      {/* Sections */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-6 space-y-8">
        {page.sections.map((s, si) => (
          <section key={si} aria-labelledby={`sec-${si}`} className="rounded-2xl border bg-card p-5 md:p-6">
            <h2 id={`sec-${si}`} className="font-bold text-lg md:text-xl flex items-start gap-2.5">
              <span className="mt-0.5 shrink-0 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {si === 0 ? <ListChecks className="h-4 w-4" aria-hidden /> : si === page.sections.length - 1 ? <BadgeCheck className="h-4 w-4" aria-hidden /> : <CheckCircle2 className="h-4 w-4" aria-hidden />}
              </span>
              {s.heading}
            </h2>
            {s.paras?.length ? (
              <div className="mt-3 space-y-2.5 text-sm md:text-base text-muted-foreground leading-relaxed">
                {s.paras.map((p, pi) => (
                  <p key={pi}>{p}</p>
                ))}
              </div>
            ) : null}
            {s.bullets?.length ? (
              <ul className="mt-3 space-y-2.5 text-sm md:text-base">
                {s.bullets.map((b, bi) => (
                  <li key={bi} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4.5 w-4.5 text-primary mt-1 shrink-0" aria-hidden />
                    <span className="text-muted-foreground leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>

      {/* FAQ */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-6">
        <h2 className="font-bold text-xl md:text-2xl mb-4 flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-primary" aria-hidden /> Pertanyaan yang Sering Diajukan
        </h2>
        <Accordion type="single" collapsible className="space-y-3">
          {page.faq.map((f, i) => (
            <AccordionItem key={i} value={`f-${i}`} className="rounded-xl border bg-card overflow-hidden px-4">
              <AccordionTrigger className="text-left font-semibold text-sm md:text-base hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* CTA + Related links */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-6">
        <div className="rounded-2xl border bg-gradient-to-br from-primary/5 to-gold/5 p-6 text-center">
          <h2 className="font-bold text-lg">Siap diurus sampai terbit?</h2>
          <p className="text-sm text-muted-foreground mt-1.5">
            Konsultasi awal gratis — roadmap, biaya & timeline tertulis sebelum mulai. 95% proses online.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-bold text-primary-foreground shadow-md transition-all hover:shadow-lg min-h-[44px]"
          >
            <PhoneCall className="h-5 w-5" aria-hidden /> Chat WhatsApp Sekarang
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-14">
        <h2 className="font-bold text-xl mb-4">Halaman Terkait</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {page.relatedLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group rounded-2xl border bg-card p-4 hover:shadow-md transition-shadow"
            >
              <span className="font-semibold text-sm leading-snug group-hover:text-primary transition-colors">
                {l.label}
              </span>
              <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Buka <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
        <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" aria-hidden /> Halaman ini diperbarui untuk kondisi regulasi {new Date().getFullYear()}.
        </p>
      </div>
    </main>
  );
}
