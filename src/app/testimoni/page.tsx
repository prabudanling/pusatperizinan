import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BadgeCheck, MessageCircle, Star, ThumbsUp, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  TESTIMONIALS,
  TESTIMONIAL_CATEGORIES,
  getRatingStats,
  formatTanggalID,
} from "@/lib/testimonials-data";
import { TestimonialGrid, Stars } from "@/components/testimonials/testimonial-card";
import { WHATSAPP_NUMBER } from "@/lib/landing-data";
import { SITE_URL } from "@/lib/site";


const PAGE_TITLE = "Testimoni Klien PusatPerizinan.com — 76 Ulasan Terverifikasi Rating 4,9/5";
const PAGE_DESC =
  "76 testimoni asli & terverifikasi dari 1.247 klien di 38 provinsi: perizinan usaha, sertifikasi halal, BPOM, pajak Coretax, penempatan PMI, izin umroh PPIU, konstruksi & tambang. Rating 4,9/5.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  keywords: [
    "testimoni pusatperizinan",
    "review jasa perizinan",
    "testimoni konsultan izin usaha",
    "ulasan klien pusatperizinan.com",
    "jasa perizinan terpercaya rating 4.9",
    "testimoni jasa pajak",
    "testimoni penempatan tki",
  ],
  alternates: { canonical: "/testimoni" },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESC,
    url: "/testimoni",
    type: "website",
    siteName: "PusatPerizinan.com",
    locale: "id_ID",
  },
  twitter: { card: "summary_large_image", title: PAGE_TITLE, description: PAGE_DESC },
  robots: { index: true, follow: true },
};

function JsonLd() {
  const stats = getRatingStats();
  const sorted = [...TESTIMONIALS].sort((a, b) => b.date.localeCompare(a.date));

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/testimoni#page`,
    name: PAGE_TITLE,
    description: PAGE_DESC,
    url: `${SITE_URL}/testimoni`,
    inLanguage: "id-ID",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
  };

  // AggregateRating + seluruh Review (datePublished & author lengkap)
  const reviewsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}/testimoni#reviews`,
    name: "Testimoni Klien Terverifikasi",
    numberOfItems: sorted.length,
    itemListElement: sorted.map((t, i) => ({
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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Testimoni Klien", item: `${SITE_URL}/testimoni` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}

export default function TestimoniPage() {
  const stats = getRatingStats();
  const sorted = [...TESTIMONIALS].sort((a, b) => b.date.localeCompare(a.date));
  const maxBd = Math.max(...Object.values(stats.breakdown), 1);

  return (
    <main className="min-h-screen bg-background">
      <JsonLd />

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
            href="/"
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Beranda
          </Link>
        </div>
      </div>

      {/* Hero + agregat */}
      <section className="border-b bg-gradient-to-b from-primary/5 to-transparent">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Beranda
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="font-medium text-foreground" aria-current="page">
                Testimoni Klien
              </li>
            </ol>
          </nav>

          <Badge variant="outline" className="rounded-full border-gold/40 bg-gold/10 text-gold-foreground font-semibold px-4 py-1">
            Ulasan Klien Terverifikasi
          </Badge>
          <h1 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-balance leading-tight">
            Testimoni Klien Asli:{" "}
            <span className="text-gradient-brand">Pengalaman Nyata di 38 Provinsi</span>
          </h1>
          <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
            {stats.verifiedCount} ulasan terverifikasi lengkap dengan nama usaha, kota, dan tanggal —
            dari pendirian PT, sertifikasi halal, BPOM, pajak Coretax, penempatan PMI, izin umroh PPIU,
            sampai RKAB tambang. Tidak ada review yang dibeli; semua cerita dari layanan yang benar-benar kami tangani.
          </p>

          {/* Panel agregat */}
          <div className="mt-8 rounded-2xl border bg-card p-6 md:p-8 shadow-sm">
            <div className="grid gap-8 md:grid-cols-[auto_1fr]">
              <div className="flex flex-col items-center justify-center text-center md:pr-8 md:border-r">
                <p className="text-6xl font-extrabold tracking-tight text-primary">
                  {stats.average.toFixed(1).replace(".", ",")}
                </p>
                <Stars rating={5} className="h-5 w-5" />
                <p className="mt-2 text-xs text-muted-foreground">rata-rata dari 5 bintang</p>
                <p className="mt-3 flex items-center gap-1.5 text-sm font-semibold">
                  <Users className="h-4 w-4 text-primary" aria-hidden />
                  1.247 klien
                </p>
              </div>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((star) => {
                  const n = stats.breakdown[star] ?? 0;
                  const pct = Math.round((n / stats.total) * 100);
                  return (
                    <div key={star} className="flex items-center gap-3 text-sm">
                      <span className="flex items-center gap-1 w-12 shrink-0 font-medium">
                        {star} <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden />
                      </span>
                      <div className="h-2.5 flex-1 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-amber-400"
                          style={{ width: `${Math.max((n / maxBd) * 100, n > 0 ? 4 : 0)}%` }}
                        />
                      </div>
                      <span className="w-16 text-right text-xs text-muted-foreground">
                        {n} ulasan ({pct}%)
                      </span>
                    </div>
                  );
                })}
                <p className="pt-2 text-xs text-muted-foreground flex items-center gap-1.5">
                  <ThumbsUp className="h-3.5 w-3.5" aria-hidden />
                  {stats.helpfulTotal.toLocaleString("id-ID")} pembaca menilai ulasan ini "membantu" ·{" "}
                  <BadgeCheck className="h-3.5 w-3.5 text-primary" aria-hidden />
                  semua klien terverifikasi
                </p>
              </div>
            </div>
          </div>

          {/* Chips kategori */}
          <div className="mt-8 flex flex-wrap gap-2" aria-label="Filter testimoni per kategori">
            {TESTIMONIAL_CATEGORIES.map((c) => {
              const n = TESTIMONIALS.filter((t) => t.category === c.slug).length;
              return (
                <Link
                  key={c.slug}
                  href={`/testimoni/${c.slug}`}
                  className="group flex items-center gap-1.5 rounded-full border bg-card px-4 py-2 text-sm font-medium transition-all hover:border-primary hover:bg-primary/5 hover:text-primary min-h-[44px]"
                >
                  {c.label}
                  <span className="text-xs text-muted-foreground">({n})</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Grid semua testimoni */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12" aria-label="Semua testimoni klien">
        <h2 className="text-xl font-bold mb-6">
          Semua Ulasan <span className="text-muted-foreground font-normal">({sorted.length}, terbaru dulu)</span>
        </h2>
        <TestimonialGrid items={sorted} truncateTo={300} />
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-2xl bg-[oklch(0.23_0.03_165)] p-8 md:p-10 text-emerald-50 text-center">
          <h2 className="text-2xl font-bold">Bergabung dengan 1.247 Klien yang Sudah Puas</h2>
          <p className="mt-3 text-sm md:text-base text-emerald-100/85 max-w-2xl mx-auto leading-relaxed">
            Konsultasi gratis, penawaran transparan sebelum mulai, dan garansi uang kembali 100%.
            Ceritakan kebutuhan Anda — pengalaman seperti di atas bisa jadi milik Anda juga.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              "Halo PusatPerizinan.com, saya membaca testimoni klien Anda dan ingin konsultasi kebutuhan perizinan/pajak/PMI saya."
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
