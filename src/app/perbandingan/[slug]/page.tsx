import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Check,
  ChevronRight,
  Clock,
  FileText,
  Landmark,
  PhoneCall,
  Scale,
  ShieldCheck,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { COMPARISONS, getComparison } from "@/lib/catalog/comparisons";
import { WHATSAPP_NUMBER } from "@/lib/landing-data";

// ============================================================
// /perbandingan/[slug] — Detail Duel Badan Usaha (SEO)
// Static export ready: generateStaticParams dari COMPARISONS
// ============================================================

const BASE_URL = "https://pusatperizinan.com";

export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return COMPARISONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) return {};

  return {
    title: c.h1,
    description: c.metaDesc,
    keywords: c.keywords,
    alternates: { canonical: `${BASE_URL}/perbandingan/${c.slug}` },
    openGraph: {
      title: c.h1,
      description: c.metaDesc,
      url: `${BASE_URL}/perbandingan/${c.slug}`,
      type: "article",
      siteName: "PusatPerizinan.com",
      locale: "id_ID",
    },
    twitter: {
      card: "summary_large_image",
      title: c.h1,
      description: c.metaDesc,
    },
    robots: { index: true, follow: true },
  };
}

// ------------------------------------------------------------
// JSON-LD: FAQPage + BreadcrumbList + Article
// ------------------------------------------------------------

function ComparisonJsonLd({
  slug,
  h1,
  metaDesc,
  faq,
}: {
  slug: string;
  h1: string;
  metaDesc: string;
  faq: { q: string; a: string }[];
}) {
  const jsonLd: Record<string, unknown>[] = [];

  // 1. FAQPage
  jsonLd.push({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  });

  // 2. BreadcrumbList: Beranda → Perbandingan → title
  jsonLd.push({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Perbandingan", item: `${BASE_URL}/perbandingan` },
      { "@type": "ListItem", position: 3, name: h1, item: `${BASE_URL}/perbandingan/${slug}` },
    ],
  });

  // 3. Article
  jsonLd.push({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: h1,
    description: metaDesc,
    datePublished: "2026-09-01",
    author: {
      "@type": "Organization",
      name: "PusatPerizinan.com",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "PusatPerizinan.com",
      url: BASE_URL,
    },
    mainEntityOfPage: `${BASE_URL}/perbandingan/${slug}`,
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ------------------------------------------------------------
// KOMPONEN KECIL
// ------------------------------------------------------------

function Breadcrumbs({ h1 }: { h1: string }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        <li className="flex items-center gap-1.5">
          <Link href="/" className="transition-colors hover:text-primary">
            Beranda
          </Link>
          <ChevronRight className="h-3.5 w-3.5 opacity-50" aria-hidden />
        </li>
        <li className="flex items-center gap-1.5">
          <Link href="/perbandingan" className="transition-colors hover:text-primary">
            Perbandingan
          </Link>
          <ChevronRight className="h-3.5 w-3.5 opacity-50" aria-hidden />
        </li>
        <li>
          <span className="font-medium text-foreground" aria-current="page">
            {h1}
          </span>
        </li>
      </ol>
    </nav>
  );
}

function EntityCard({
  entity,
  side,
}: {
  entity: { name: string; fullName: string; icon: string; legalBasis: string; ownership: string };
  side: "A" | "B";
}) {
  return (
    <div
      className={`relative flex-1 rounded-2xl border-2 bg-card p-5 md:p-6 ${
        side === "A" ? "border-primary/30" : "border-gold/40"
      }`}
    >
      <Badge
        variant="outline"
        className={`absolute -top-3 left-5 text-[10px] uppercase tracking-wider ${
          side === "A"
            ? "border-primary/30 bg-primary/10 text-primary"
            : "border-gold/40 bg-gold/15 text-amber-700 dark:text-gold"
        }`}
      >
        Kandidat {side}
      </Badge>
      <div className="mt-1 flex items-center gap-3">
        <span className="text-4xl" aria-hidden>
          {entity.icon}
        </span>
        <div>
          <h2 className="text-xl font-extrabold leading-tight md:text-2xl">{entity.name}</h2>
          <p className="text-xs text-muted-foreground md:text-sm">{entity.fullName}</p>
        </div>
      </div>
      <dl className="mt-4 space-y-2 text-sm">
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Dasar hukum
          </dt>
          <dd className="mt-0.5 leading-snug">{entity.legalBasis}</dd>
        </div>
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Kepemilikan
          </dt>
          <dd className="mt-0.5 leading-snug">{entity.ownership}</dd>
        </div>
      </dl>
    </div>
  );
}

function ProsConsCard({
  entity,
  side,
}: {
  entity: { name: string; icon: string; pros: string[]; cons: string[]; bestFor: string[] };
  side: "A" | "B";
}) {
  return (
    <div className="flex flex-col rounded-2xl border bg-card p-5 md:p-6">
      <h3 className="mb-1 flex items-center gap-2 text-lg font-bold">
        <span aria-hidden>{entity.icon}</span> {entity.name}
        <Badge
          variant="outline"
          className={`ml-auto text-[10px] ${
            side === "A"
              ? "border-primary/30 bg-primary/10 text-primary"
              : "border-gold/40 bg-gold/15 text-amber-700 dark:text-gold"
          }`}
        >
          Kandidat {side}
        </Badge>
      </h3>
      <p className="mb-4 text-xs text-muted-foreground">Kelebihan &amp; Kekurangan</p>

      <h4 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-primary">
        <ThumbsUp className="h-4 w-4" aria-hidden /> Kelebihan
      </h4>
      <ul className="mb-4 space-y-2">
        {entity.pros.map((p, i) => (
          <li key={`pro-${i}`} className="flex items-start gap-2 text-sm leading-snug">
            <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-primary/15">
              <CheckIcon />
            </span>
            <span className="text-foreground/90">{p}</span>
          </li>
        ))}
      </ul>

      <h4 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-red-600 dark:text-red-400">
        <ThumbsDown className="h-4 w-4" aria-hidden /> Kekurangan
      </h4>
      <ul className="mb-4 space-y-2">
        {entity.cons.map((k, i) => (
          <li key={`con-${i}`} className="flex items-start gap-2 text-sm leading-snug">
            <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-red-500/15">
              <XIcon />
            </span>
            <span className="text-foreground/90">{k}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          Paling cocok untuk
        </p>
        <div className="flex flex-wrap gap-1.5">
          {entity.bestFor.map((b) => (
            <Badge key={b} variant="secondary" className="text-[11px] font-normal">
              {b}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Ikon Check hijau (lucide) */
function CheckIcon() {
  return <Check className="h-3 w-3 text-primary" strokeWidth={3} aria-hidden />;
}

/** Ikon X merah (lucide) */
function XIcon() {
  return <X className="h-3 w-3 text-red-600 dark:text-red-400" strokeWidth={3} aria-hidden />;
}

// ------------------------------------------------------------
// PAGE
// ------------------------------------------------------------

export default async function PerbandinganDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) {
    // dynamicParams = false sudah membatasi ke slug valid, ini pengaman
    notFound();
  }

  const waText = encodeURIComponent(
    `Halo PusatPerizinan.com, saya baru membaca perbandingan ${c.entityA.name} vs ${c.entityB.name} dan ingin konsultasi gratis mendirikan badan usaha.`
  );

  const related = c.relatedSlugs
    .map((s) => COMPARISONS.find((x) => x.slug === s))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <ComparisonJsonLd slug={c.slug} h1={c.h1} metaDesc={c.metaDesc} faq={c.faq} />

      {/* Header mini (konsisten dengan situs) */}
      <div className="border-b bg-card/50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Kembali ke beranda">
            <img src="/logo-icon.png" alt="Logo PusatPerizinan.com" className="h-8 w-8" />
            <span className="text-[15px] font-bold tracking-tight">
              Pusat<span className="text-primary">Perizinan</span>
              <span className="text-gold">.com</span>
            </span>
          </Link>
          <Link
            href="/perbandingan"
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Semua Perbandingan
          </Link>
        </div>
      </div>

      <main className="flex-1">
        <article className="mx-auto max-w-6xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
          <Breadcrumbs h1={c.h1} />

          {/* Hero duel */}
          <header className="mb-10">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge className="border border-primary/20 bg-primary/10 text-primary hover:bg-primary/15">
                <Scale className="mr-1 h-3.5 w-3.5" aria-hidden />
                Perbandingan Badan Usaha
              </Badge>
              <Badge variant="outline" className="gap-1">
                <CalendarDays className="h-3 w-3" aria-hidden /> Diperbarui September 2026
              </Badge>
            </div>
            <h1 className="max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-balance md:text-4xl">
              {c.h1}
            </h1>

            {/* Duel cards + medal VS */}
            <div className="relative mt-8 grid items-stretch gap-6 md:grid-cols-[1fr_auto_1fr] md:gap-4">
              <EntityCard entity={c.entityA} side="A" />

              {/* Medali VS */}
              <div className="flex items-center justify-center md:px-1" aria-hidden>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-lg font-extrabold tracking-tight text-primary-foreground shadow-lg ring-4 ring-primary/20 md:h-20 md:w-20 md:text-xl">
                  VS
                </div>
              </div>

              <EntityCard entity={c.entityB} side="B" />
            </div>
          </header>

          {/* Kesimpulan cepat */}
          <section
            className="mb-10 rounded-2xl border-l-4 border-primary bg-primary/5 p-5 md:p-6"
            aria-labelledby="kesimpulan-heading"
          >
            <h2 id="kesimpulan-heading" className="mb-2 flex items-center gap-2 text-lg font-bold">
              <Sparkles className="h-5 w-5 text-primary" aria-hidden />
              Kesimpulan Cepat
            </h2>
            <p className="text-[15px] leading-relaxed text-foreground/90">{c.recommendation[0]}</p>
          </section>

          {/* Intro */}
          <section className="mb-10 max-w-3xl" aria-labelledby="pengantar-heading">
            <h2 id="pengantar-heading" className="mb-3 flex items-center gap-2 text-xl font-bold">
              <FileText className="h-5 w-5 text-primary" aria-hidden />
              Latar Belakang
            </h2>
            <div className="space-y-3.5 text-[15px] leading-relaxed text-foreground/90">
              {c.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          {/* Tabel perbandingan */}
          <section className="mb-12" aria-labelledby="tabel-heading">
            <h2 id="tabel-heading" className="mb-1 flex items-center gap-2 text-xl font-bold">
              <Scale className="h-5 w-5 text-primary" aria-hidden />
              Tabel Perbandingan {c.entityA.name} vs {c.entityB.name}
            </h2>
            <p className="mb-4 text-sm text-muted-foreground">
              {c.tableRows.length} aspek dibandingkan berdasar regulasi yang berlaku. Geser tabel ke
              samping di layar ponsel.
            </p>
            <div className="max-h-[70vh] overflow-auto rounded-2xl border shadow-sm">
              <table className="w-full min-w-[680px] border-collapse text-sm">
                <thead className="sticky top-0 z-10">
                  <tr className="bg-muted text-left">
                    <th scope="col" className="w-[22%] px-4 py-3 font-bold">
                      Aspek
                    </th>
                    <th scope="col" className="w-[39%] px-4 py-3 font-bold text-primary">
                      {c.entityA.icon} {c.entityA.name}
                    </th>
                    <th scope="col" className="w-[39%] px-4 py-3 font-bold text-amber-700 dark:text-gold">
                      {c.entityB.icon} {c.entityB.name}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {c.tableRows.map((row, i) => (
                    <tr key={i} className="odd:bg-card even:bg-muted/40">
                      <th
                        scope="row"
                        className="px-4 py-3 text-left align-top font-semibold leading-snug"
                      >
                        {row.aspect}
                      </th>
                      <td className="px-4 py-3 align-top leading-snug text-foreground/90">{row.a}</td>
                      <td className="px-4 py-3 align-top leading-snug text-foreground/90">{row.b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Kelebihan & Kekurangan */}
          <section className="mb-12" aria-labelledby="pros-cons-heading">
            <h2 id="pros-cons-heading" className="mb-4 flex items-center gap-2 text-xl font-bold">
              <BadgeCheck className="h-5 w-5 text-primary" aria-hidden />
              Kelebihan &amp; Kekurangan
            </h2>
            <div className="grid gap-4 lg:grid-cols-2">
              <ProsConsCard entity={c.entityA} side="A" />
              <ProsConsCard entity={c.entityB} side="B" />
            </div>
          </section>

          {/* Biaya & Waktu Pendirian */}
          <section className="mb-12" aria-labelledby="biaya-heading">
            <h2 id="biaya-heading" className="mb-1 flex items-center gap-2 text-xl font-bold">
              <Wallet className="h-5 w-5 text-primary" aria-hidden />
              Biaya &amp; Waktu Pendirian
            </h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Estimasi biaya jasa profesional (notaris/konsultan) yang realistis di 2026. NIB
              diterbitkan gratis via OSS-RBA untuk keduanya.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {([c.entityA, c.entityB] as const).map((e, idx) => (
                <div
                  key={e.name}
                  className={`rounded-2xl border-2 p-5 md:p-6 ${
                    idx === 0 ? "border-primary/30 bg-primary/5" : "border-gold/40 bg-gold/5"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl" aria-hidden>
                      {e.icon}
                    </span>
                    <h3 className="font-bold">{e.name}</h3>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                        <Wallet className="h-3 w-3" aria-hidden /> Biaya pendirian
                      </p>
                      <p className="mt-1 text-xl font-extrabold leading-tight text-primary">
                        {e.setupCost.split(" (")[0]}
                      </p>
                      <p className="mt-1 text-xs leading-snug text-muted-foreground">
                        {e.setupCost}
                      </p>
                    </div>
                    <div>
                      <p className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                        <Clock className="h-3 w-3" aria-hidden /> Estimasi waktu
                      </p>
                      <p className="mt-1 text-xl font-extrabold leading-tight text-primary">
                        {e.setupDays.split(" (")[0]}
                      </p>
                      <p className="mt-1 text-xs leading-snug text-muted-foreground">
                        {e.setupDays}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Rekomendasi akhir */}
          <section className="mb-12" aria-labelledby="rekomendasi-heading">
            <h2 id="rekomendasi-heading" className="mb-4 flex items-center gap-2 text-xl font-bold">
              <Landmark className="h-5 w-5 text-primary" aria-hidden />
              Rekomendasi Akhir
            </h2>
            <div className="mb-4 grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-5">
                <h3 className="mb-3 text-base font-bold text-primary">
                  Pilih {c.entityA.name} jika…
                </h3>
                <ul className="space-y-2">
                  {c.verdictA.map((v, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm leading-snug">
                      <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-primary/15">
                        <CheckIcon />
                      </span>
                      <span className="text-foreground/90">{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border-2 border-gold/40 bg-gold/5 p-5">
                <h3 className="mb-3 text-base font-bold text-amber-700 dark:text-gold">
                  Pilih {c.entityB.name} jika…
                </h3>
                <ul className="space-y-2">
                  {c.verdictB.map((v, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm leading-snug">
                      <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-gold/25">
                        <CheckIcon />
                      </span>
                      <span className="text-foreground/90">{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="max-w-3xl space-y-3.5 text-[15px] leading-relaxed text-foreground/90">
              {c.recommendation.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="mb-4 flex items-center gap-2 text-xl font-bold">
              <Users className="h-5 w-5 text-primary" aria-hidden />
              Pertanyaan yang Sering Diajukan
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {c.faq.map((f, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left text-[15px] font-semibold hover:text-primary hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* CTA WhatsApp */}
          <section className="mb-12" aria-labelledby="cta-heading">
            <div className="rounded-2xl bg-[oklch(0.23_0.03_165)] p-6 text-emerald-50 md:p-8">
              <h2 id="cta-heading" className="max-w-2xl text-xl font-bold md:text-2xl">
                Siap Mendirikan {c.entityA.name} atau {c.entityB.name}? Konsultasi Gratis via
                WhatsApp
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-emerald-100/80">
                Tim kami mengurus seluruh proses — akta notaris, SK Menkumham / pengesahan
                lembaga, NIB via OSS-RBA, sampai NPWP &amp; panduan pajak. Balasan cepat di jam
                kerja, biaya transparan sebelum mulai, garansi 100%.
              </p>
              <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 font-semibold text-white shadow-md transition-all hover:brightness-105 hover:shadow-lg"
                >
                  <PhoneCall className="h-5 w-5" aria-hidden />
                  Chat WhatsApp Sekarang
                </a>
                <a
                  href="/#konsultasi"
                  className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-emerald-950/40 px-6 py-3.5 font-semibold text-emerald-50 ring-1 ring-emerald-300/30 transition-all hover:bg-emerald-950/60"
                >
                  <FileText className="h-5 w-5" aria-hidden />
                  Form Konsultasi Lengkap
                </a>
              </div>
              <p className="mt-4 text-xs text-emerald-100/60">
                Rating klien 4,9/5 · 3.899+ izin terbit · Support WhatsApp setelah selesai
              </p>
            </div>
          </section>

          {/* Perbandingan terkait */}
          {related.length > 0 && (
            <section className="mb-12" aria-labelledby="related-heading">
              <h2 id="related-heading" className="mb-4 flex items-center gap-2 text-xl font-bold">
                <Scale className="h-5 w-5 text-primary" aria-hidden />
                Perbandingan Terkait
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/perbandingan/${r.slug}`}
                    className="group rounded-xl border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-md"
                  >
                    <p className="flex items-center gap-1.5 text-sm font-bold leading-snug transition-colors group-hover:text-primary">
                      <span aria-hidden>{r.entityA.icon}</span> {r.entityA.name} vs{" "}
                      <span aria-hidden>{r.entityB.icon}</span> {r.entityB.name}
                    </p>
                    <p className="mt-1.5 line-clamp-2 text-xs text-muted-foreground">
                      {r.metaDesc}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                      Lihat Perbandingan
                      <ArrowRight
                        className="h-3 w-3 opacity-70 transition-opacity group-hover:opacity-100"
                        aria-hidden
                      />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Internal links layanan */}
          <section className="mb-4 rounded-2xl border bg-card p-5 md:p-6" aria-labelledby="layanan-heading">
            <h2 id="layanan-heading" className="mb-3 text-lg font-bold">
              Pendalaman Materi
            </h2>
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
              Ingin membaca lebih jauh sebelum memutuskan? Pelajari detail layanan pendirian{" "}
              <Link href="/layanan/pt" className="font-semibold text-primary hover:underline">
                Perseroan Terbatas (PT)
              </Link>
              ,{" "}
              <Link href="/layanan/cv" className="font-semibold text-primary hover:underline">
                Commanditaire Vennootschap (CV)
              </Link>
              , atau lihat seluruh{" "}
              <Link
                href="/layanan/kategori/pajak"
                className="font-semibold text-primary hover:underline"
              >
                layanan kategori pajak
              </Link>{" "}
              kami — termasuk penataan PPh final 0,5% dan SPT Tahunan Badan.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button asChild size="sm" variant="outline" className="min-h-[44px]">
                <Link href="/layanan/pt">
                  Layanan PT <ArrowRight className="ml-1 h-3.5 w-3.5" aria-hidden />
                </Link>
              </Button>
              <Button asChild size="sm" variant="outline" className="min-h-[44px]">
                <Link href="/layanan/cv">
                  Layanan CV <ArrowRight className="ml-1 h-3.5 w-3.5" aria-hidden />
                </Link>
              </Button>
              <Button asChild size="sm" variant="outline" className="min-h-[44px]">
                <Link href="/layanan/kategori/pajak">
                  Layanan Pajak <ArrowRight className="ml-1 h-3.5 w-3.5" aria-hidden />
                </Link>
              </Button>
            </div>
          </section>
        </article>
      </main>

      {/* Footer mini (sticky ke bawah) */}
      <footer className="mt-auto border-t bg-card/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" aria-hidden />
            © {new Date().getFullYear()} PusatPerizinan.com — Konten edukatif, bukan nasihat hukum
            formal.
          </p>
          <nav aria-label="Tautan terkait" className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/perbandingan" className="transition-colors hover:text-primary">
              Semua Perbandingan
            </Link>
            <Link href="/layanan/pt" className="transition-colors hover:text-primary">
              Pendirian PT
            </Link>
            <Link href="/layanan/cv" className="transition-colors hover:text-primary">
              Pendirian CV
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
