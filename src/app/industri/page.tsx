import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, HelpCircle, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { INDUSTRIES, INDUSTRY_PAGES, buildIndustriIndexPage } from "@/lib/seo-pages";
import { WHATSAPP_NUMBER } from "@/lib/landing-data";
import { SITE_URL } from "@/lib/site";

export const dynamicParams = false;

const INDEX = buildIndustriIndexPage(INDUSTRIES.length);

export function generateMetadata(): Metadata {
  return {
    title: INDEX.title,
    description: INDEX.metaDesc,
    keywords: INDEX.keywords,
    alternates: { canonical: "/industri" },
    openGraph: { title: INDEX.title, description: INDEX.metaDesc, url: "/industri", type: "website", siteName: "PusatPerizinan.com", locale: "id_ID" },
  };
}

export default function IndustriIndexPage() {
  const waText = "Halo, saya ingin memetakan legalitas untuk sektor usaha saya: ";
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: INDEX.faq.map((f) => ({
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
      { "@type": "ListItem", position: 2, name: "Per Sektor Industri", item: `${SITE_URL}/industri` },
    ],
  };

  return (
    <main className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="border-b bg-card/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Beranda PusatPerizinan.com">
            <img src="/logo-icon.png" alt="Logo PusatPerizinan.com" className="h-8 w-8" />
            <span className="font-bold text-[15px] tracking-tight">
              Pusat<span className="text-primary">Perizinan</span>
              <span className="text-gold">.com</span>
            </span>
            <span className="text-sm text-muted-foreground hidden sm:inline">/ Sektor Industri</span>
          </Link>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:shadow-md min-h-[44px]"
          >
            <PhoneCall className="h-4 w-4" aria-hidden /> Konsultasi Gratis
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">{INDEX.h1}</h1>
        <div className="mt-3 space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed max-w-3xl">
          {INDEX.intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <h2 className="mt-8 font-bold text-xl">{INDUSTRY_PAGES.length} Panduan Sektor Industri</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRY_PAGES.map((p) => (
            <Link
              key={p.slug}
              href={`/industri/${p.slug}`}
              className="group rounded-2xl border bg-card p-5 hover:shadow-md transition-shadow flex flex-col"
            >
              <span className="font-bold leading-snug group-hover:text-primary transition-colors">{p.h1}</span>
              <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Lihat panduan sektor <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </Link>
          ))}
        </div>

        <h2 className="mt-10 font-bold text-xl flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-primary" aria-hidden /> Pertanyaan Umum
        </h2>
        <Accordion type="single" collapsible className="mt-4 space-y-3">
          {INDEX.faq.map((f, i) => (
            <AccordionItem key={i} value={`f-${i}`} className="rounded-xl border bg-card px-4">
              <AccordionTrigger className="text-left font-semibold text-sm md:text-base hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-8 rounded-2xl border bg-gradient-to-br from-primary/5 to-gold/5 p-6 text-center">
          <Badge className="bg-primary/10 text-primary border border-primary/20 mb-2">Roadmap spesifik sektor</Badge>
          <h2 className="font-bold text-lg">Sektor Anda butuh kombinasi izin yang tepat.</h2>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-bold text-primary-foreground shadow-md min-h-[44px]"
          >
            <PhoneCall className="h-5 w-5" aria-hidden /> Petakan Legalitas Saya
          </a>
        </div>
      </div>
    </main>
  );
}
