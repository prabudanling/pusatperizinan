import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageCircle, ShieldCheck, Star, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  TESTIMONIALS,
  TESTIMONIAL_CATEGORIES,
  getTestimonialCategory,
  getTestimonialsByCategory,
  getAverageRating,
} from "@/lib/testimonials-data";
import { TestimonialGrid, Stars, CategoryLinks } from "@/components/testimonials/testimonial-card";
import { WHATSAPP_NUMBER } from "@/lib/landing-data";
import { SITE_URL } from "@/lib/site";



export const dynamicParams = false;

export function generateStaticParams(): { kategori: string }[] {
  return TESTIMONIAL_CATEGORIES.map((c) => ({ kategori: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ kategori: string }>;
}): Promise<Metadata> {
  const { kategori } = await params;
  const cat = getTestimonialCategory(kategori);
  if (!cat) return {};

  return {
    title: cat.seoTitle,
    description: cat.metaDesc,
    keywords: cat.keywords,
    alternates: { canonical: `/testimoni/${cat.slug}` },
    openGraph: {
      title: cat.seoTitle,
      description: cat.metaDesc,
      url: `/testimoni/${cat.slug}`,
      type: "website",
      siteName: "PusatPerizinan.com",
      locale: "id_ID",
    },
    twitter: { card: "summary_large_image", title: cat.seoTitle, description: cat.metaDesc },
    robots: { index: true, follow: true },
  };
}

function JsonLd({ kategori }: { kategori: string }) {
  const cat = getTestimonialCategory(kategori)!;
  const items = getTestimonialsByCategory(cat.slug);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/testimoni/${cat.slug}#page`,
    name: cat.seoTitle,
    description: cat.metaDesc,
    url: `${SITE_URL}/testimoni/${cat.slug}`,
    inLanguage: "id-ID",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
  };

  const reviewsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}/testimoni/${cat.slug}#reviews`,
    name: `Testimoni ${cat.name}`,
    numberOfItems: items.length,
    itemListElement: items.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Review",
        name: `${t.name} — ${t.service}`,
        reviewBody: t.content,
        datePublished: t.date,
        author: { "@type": "Person", name: t.name },
        publisher: { "@id": `${SITE_URL}/#organization` },
        reviewRating: {
          "@type": "Rating",
          ratingValue: String(t.rating),
          bestRating: "5",
          worstRating: "1",
        },
        itemReviewed: {
          "@type": "ProfessionalService",
          "@id": `${SITE_URL}/#organization`,
          name: "PusatPerizinan.com",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            bestRating: "5",
            reviewCount: "1247",
          },
        },
      },
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: cat.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Testimoni Klien", item: `${SITE_URL}/testimoni` },
      {
        "@type": "ListItem",
        position: 3,
        name: cat.name,
        item: `${SITE_URL}/testimoni/${cat.slug}`,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}

export default async function TestimoniKategoriPage({
  params,
}: {
  params: Promise<{ kategori: string }>;
}) {
  const { kategori } = await params;
  const cat = getTestimonialCategory(kategori);
  if (!cat) notFound();

  const items = getTestimonialsByCategory(cat.slug);
  const avg = Math.round(
    (items.reduce((a, t) => a + t.rating, 0) / Math.max(items.length, 1)) * 10
  ) / 10;
  const categoriesWithCount = TESTIMONIAL_CATEGORIES.map((c) => ({
    slug: c.slug,
    label: c.label,
    count: TESTIMONIALS.filter((t) => t.category === c.slug).length,
  }));

  return (
    <main className="min-h-screen bg-background">
      <JsonLd kategori={cat.slug} />

      {/* Header mini */}
      <div className="border-b bg-card/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Kembali ke beranda">
            <img src="/logo-icon.png" alt="Logo PusatPerizinan.com" className="h-8 w-8" />
            <span className="font-bold text-[15px] tracking-tight">
              Pusat<span className="text-primary">Perizinan</span>
              <span className="text-gold">.com</span>
            </span>
          </Link>
          <Link
            href="/testimoni"
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Semua Testimoni
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="border-b bg-gradient-to-b from-primary/5 to-transparent">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Beranda
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/testimoni" className="hover:text-primary transition-colors">
                  Testimoni Klien
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="font-medium text-foreground" aria-current="page">
                {cat.label}
              </li>
            </ol>
          </nav>

          <Badge variant="outline" className="rounded-full border-gold/40 bg-gold/10 text-gold-foreground font-semibold px-4 py-1">
            {cat.label}
          </Badge>
          <h1 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-balance leading-tight">
            Testimoni {cat.name}: <span className="text-gradient-brand">Cerita Asli Klien Kami</span>
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <span className="flex items-center gap-2">
              <Stars rating={5} />
              <strong>{avg.toFixed(1).replace(".", ",")}</strong>
              <span className="text-muted-foreground">rata-rata kategori</span>
            </span>
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Users className="h-4 w-4 text-primary" aria-hidden />
              {items.length} ulasan terverifikasi
            </span>
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" aria-hidden />
              garansi 100% uang kembali
            </span>
          </div>

          <div className="mt-6 space-y-3.5 text-[15px] leading-relaxed text-foreground/90 max-w-3xl">
            {cat.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Grid testimoni kategori */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12" aria-label={`Testimoni ${cat.name}`}>
        <h2 className="text-xl font-bold mb-6">
          Ulasan {cat.label} <span className="text-muted-foreground font-normal">({items.length}, terbaru dulu)</span>
        </h2>
        <TestimonialGrid items={items} truncateTo={340} />
      </section>

      {/* FAQ kategori */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-12" aria-labelledby="faq-testi">
        <h2 id="faq-testi" className="text-xl font-bold mb-4">
          Pertanyaan Seputar Testimoni {cat.label}
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {cat.faq.map((f, i) => (
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

      {/* Kategori lain */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-12" aria-labelledby="cat-lain">
        <h2 id="cat-lain" className="text-lg font-bold mb-4">
          Testimoni Kategori Lainnya
        </h2>
        <CategoryLinks categories={categoriesWithCount} excludeSlug={cat.slug} />
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-2xl bg-[oklch(0.23_0.03_165)] p-8 md:p-10 text-emerald-50 text-center">
          <h2 className="text-2xl font-bold">
            Ingin Pengalaman Seperti {items.length} Klien {cat.label} Ini?
          </h2>
          <p className="mt-3 text-sm md:text-base text-emerald-100/85 max-w-2xl mx-auto leading-relaxed">
            Konsultasi gratis tanpa komitmen — tim spesialis {cat.label.toLowerCase()} kami siap
            menyusun roadmap lengkap dengan biaya & timeline tertulis.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              `Halo PusatPerizinan.com, saya membaca testimoni kategori ${cat.name} dan ingin konsultasi.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 font-semibold text-white shadow-lg transition-all hover:brightness-105 min-h-[44px]"
          >
            <MessageCircle className="h-5 w-5" aria-hidden />
            Chat WhatsApp — Balas Cepat
          </a>
        </div>
      </section>
    </main>
  );
}
