import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  FileText,
  Landmark,
  Lightbulb,
  ListChecks,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PERMIT_GUIDES } from "@/lib/seo-content";
import { BLOG_ARTICLES } from "@/lib/blog-content";
import { WHATSAPP_NUMBER } from "@/lib/landing-data";
import { SITE_URL, CONTACT, CURRENT_YEAR } from "@/lib/site";

// ============================================================
// PUSATPERIZINAN.COM — /panduan/[id] (Arsitektur Informasi, P0-02/F)
// 16 panduan pillar sebelumnya tersembunyi di hub JS homepage;
// kini masing-masing menjadi URL crawlable dengan:
// H1 unik, dasar hukum, syarat, langkah, biaya, FAQ, sumber
// resmi (authority), tautan ke blog + layanan (money page).
// ============================================================

export const dynamicParams = false;

export function generateStaticParams(): { id: string }[] {
  return PERMIT_GUIDES.map((g) => ({ id: g.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const guide = PERMIT_GUIDES.find((g) => g.id === id);
  if (!guide) return {};

  return {
    title: `Panduan Lengkap ${guide.name} Indonesia — Syarat, Biaya & Proses`,
    description: guide.short,
    alternates: { canonical: `/panduan/${guide.id}` },
    openGraph: {
      title: `Panduan Lengkap ${guide.name} Indonesia`,
      description: guide.short,
      url: `/panduan/${guide.id}`,
      type: "article",
      siteName: "PusatPerizinan.com",
      locale: "id_ID",
    },
    robots: { index: true, follow: true },
  };
}

export default async function PanduanPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const guide = PERMIT_GUIDES.find((g) => g.id === id);
  if (!guide) notFound();

  const relatedBlog = BLOG_ARTICLES.filter((a) =>
    a.relatedGuides.includes(guide.id)
  );

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Panduan Perizinan", item: `${SITE_URL}/#panduan` },
      { "@type": "ListItem", position: 3, name: guide.name, item: `${SITE_URL}/panduan/${guide.id}` },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Halo, saya baca panduan ${guide.name} dan ingin bertanya lebih lanjut.`
  )}`;

  return (
    <main className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li><Link href="/" className="hover:text-primary">Beranda</Link></li>
            <li aria-hidden>/</li>
            <li><Link href="/#panduan" className="hover:text-primary">Panduan</Link></li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="font-semibold text-foreground">{guide.name}</li>
          </ol>
        </nav>

        <h1 className="text-3xl font-extrabold tracking-tight leading-tight sm:text-4xl">
          Panduan Lengkap {guide.name} {CURRENT_YEAR}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{guide.short}</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-border/70 bg-secondary/40 p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Estimasi Biaya</p>
            <p className="mt-1 text-sm font-bold text-primary">{guide.cost}</p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-secondary/40 p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Estimasi Waktu</p>
            <p className="mt-1 text-sm font-bold text-primary flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden /> {guide.timeline}
            </p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-secondary/40 p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Instansi</p>
            <p className="mt-1 text-sm font-bold text-primary flex items-center gap-1.5">
              <Landmark className="h-4 w-4" aria-hidden /> {guide.authority}
            </p>
          </div>
        </div>

        {/* Konten panduan */}
        <div className="mt-10 space-y-8">
          <section aria-label="Penjelasan">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight flex items-start gap-2.5">
              <span className="mt-1.5 h-6 w-1.5 shrink-0 rounded-full bg-gradient-to-b from-primary to-gold" aria-hidden />
              Apa yang Perlu Anda Tahu
            </h2>
            <p className="mt-3 text-[15.5px] text-foreground/85 leading-relaxed">{guide.long}</p>
          </section>

          <section aria-label="Dasar hukum">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight flex items-start gap-2.5">
              <span className="mt-1.5 h-6 w-1.5 shrink-0 rounded-full bg-gradient-to-b from-primary to-gold" aria-hidden />
              Dasar Hukum &amp; Sumber Resmi
            </h2>
            <div className="mt-3 rounded-2xl border border-primary/20 bg-primary/5 p-5">
              <p className="flex items-start gap-2.5 text-sm text-foreground/85 leading-relaxed">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                {guide.legalBasis}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Sumber primer: {guide.authority}. Regulasi dapat berubah — selalu cek
                publikasi resmi instansi untuk versi terbaru sebelum mengajukan sendiri.
              </p>
            </div>
          </section>

          <section aria-label="Syarat">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight flex items-start gap-2.5">
              <span className="mt-1.5 h-6 w-1.5 shrink-0 rounded-full bg-gradient-to-b from-primary to-gold" aria-hidden />
              Syarat yang Perlu Disiapkan
            </h2>
            <ul className="mt-3 space-y-2">
              {guide.requirements.map((r, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/85">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  {r}
                </li>
              ))}
            </ul>
          </section>

          <section aria-label="Langkah-langkah">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight flex items-start gap-2.5">
              <span className="mt-1.5 h-6 w-1.5 shrink-0 rounded-full bg-gradient-to-b from-primary to-gold" aria-hidden />
              Langkah demi Langkah
            </h2>
            <ol className="mt-3 space-y-3">
              {guide.steps.map((s, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-foreground/85">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground" aria-hidden>
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
          </section>

          <section aria-label="Tips praktis">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight flex items-start gap-2.5">
              <span className="mt-1.5 h-6 w-1.5 shrink-0 rounded-full bg-gradient-to-b from-primary to-gold" aria-hidden />
              Tips dari Pengalaman Kami
            </h2>
            <ul className="mt-3 space-y-2">
              {guide.tips.map((t, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/85">
                  <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* FAQ (terlihat di halaman — schema FAQPage di atas sesuai konten ini) */}
        <div className="mt-12">
          <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" aria-hidden />
            Sering Ditanya
          </h2>
          <Accordion type="single" collapsible className="mt-4 space-y-3">
            {guide.faq.map((f, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-border/70 rounded-2xl bg-secondary/40 px-5 last:border-b"
              >
                <AccordionTrigger className="py-4 text-sm font-bold hover:no-underline hover:text-primary text-left">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Internal linking: blog terkait */}
        {relatedBlog.length > 0 && (
          <div className="mt-10">
            <p className="flex items-center gap-1.5 text-sm font-bold">
              <BookOpen className="h-4 w-4 text-primary" aria-hidden />
              Baca Juga di Blog Kami
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {relatedBlog.map((a) => (
                <Link
                  key={a.slug}
                  href={`/blog/${a.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/5 px-3.5 py-1.5 text-xs font-semibold text-primary hover:bg-primary/10 transition-colors"
                >
                  {a.title}
                  <ArrowRight className="h-3 w-3" aria-hidden />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA money page */}
        <div className="mt-12 flex flex-col sm:flex-row items-center gap-3 rounded-2xl bg-gradient-to-r from-primary to-emerald-700 p-6 text-primary-foreground">
          <p className="text-sm font-semibold flex-1 text-center sm:text-left">
            Mau {guide.name} diurus sampai terbit tanpa Anda pusing? Tim kami siap bantu.
          </p>
          <Button asChild variant="secondary" className="rounded-full font-bold shrink-0 w-full sm:w-auto">
            <a href={waHref} target="_blank" rel="noopener noreferrer">
              Konsultasi Gratis <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </Button>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
            ← Beranda
          </Link>
          <Link href="/layanan" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
            <ListChecks className="h-4 w-4" aria-hidden /> Semua layanan
          </Link>
          <span className="text-sm text-muted-foreground">{CONTACT.hours}</span>
        </div>
      </div>
    </main>
  );
}
