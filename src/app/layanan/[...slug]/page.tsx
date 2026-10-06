import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock,
  Compass,
  FileText,
  Globe2,
  ListChecks,
  MapPin,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  getAnyPage,
  getServicePage,
  getAllSlugs,
  getHubSlugs,
  CATEGORY_META,
  ALL_SERVICE_PAGES,
  slugify,
} from "@/lib/catalog";
import { PROVINCES } from "@/lib/coverage-data";
import { INDUSTRIES } from "@/lib/seo-pages";
import { WHATSAPP_NUMBER } from "@/lib/landing-data";
import { pickTestimonialsForCatalogCategory, getAverageRating, getTestimonialsByCategory } from "@/lib/testimonials-data";
import { CERT_MAP } from "@/lib/catalog/certifications";
import { TestimonialGrid } from "@/components/testimonials/testimonial-card";
import { HubPage } from "../hub-page";
import { classifyPage } from "@/lib/seo-policy";
import { SITE_URL } from "@/lib/site";

// ============================================================
// STATIC EXPORT READY — catch-all [...slug]
// Menangani: /layanan/nib, /layanan/nib-jawa-barat,
//            /layanan/kerja-di-jepang-kaigo,
//            /layanan/kategori/pajak, /layanan/wilayah/bali
// ============================================================

export const dynamicParams = false;

export function generateStaticParams(): { slug: string[] }[] {
  const paths = [...getAllSlugs(), ...getHubSlugs()];
  return paths.map((path) => ({ slug: path.split("/") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getAnyPage(slug.join("/"));
  if (!page) return {};

  return {
    title: page.title,
    description: page.metaDesc,
    keywords: page.keywords,
    alternates: { canonical: `/layanan/${page.slug}` },
    openGraph: {
      title: page.title,
      description: page.metaDesc,
      url: `/layanan/${page.slug}`,
      type: "article",
      siteName: "PusatPerizinan.com",
      locale: "id_ID",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.metaDesc,
    },
    // P0-03: halaman tipis (tier D/E) dinilai noindex,follow
    robots: { index: classifyPage(page).index, follow: true },
  };
}

// ------------------------------------------------------------
// JSON-LD Structured Data (Service + FAQPage + BreadcrumbList)
// ------------------------------------------------------------

function ServiceJsonLd({ page }: { page: NonNullable<ReturnType<typeof getServicePage>> }) {
  const isHub = page.kind === "hub";
  

  const jsonLd: Record<string, unknown>[] = [];

  // 1. Service schema
  if (!isHub) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "Service",
      name: page.h1,
      description: page.metaDesc,
      serviceType: page.category,
      provider: {
        "@type": "ProfessionalService",
        name: "PusatPerizinan.com",
        url: SITE_URL,
        telephone: "+6281269999910",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Indonesia Stock Exchange Building, Tower 2, Lantai 5, SCBD Lot 13, Jl. Jend. Sudirman Kav. 52-53",
          addressLocality: "Jakarta Selatan",
          addressRegion: "DKI Jakarta",
          postalCode: "12190",
          addressCountry: "ID",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "1247",
          bestRating: "5",
        },
      },
      areaServed: page.region
        ? { "@type": "Place", name: page.region }
        : page.country
          ? { "@type": "Country", name: page.country }
          : { "@type": "Country", name: "Indonesia" },
      ...(page.priceNumeric > 0
        ? {
            offers: {
              "@type": "Offer",
              price: page.priceNumeric,
              priceCurrency: "IDR",
              description: `Mulai dari ${page.price}`,
            },
          }
        : {}),
      ...(page.legalBasis ? { termsOfService: page.legalBasis } : {}),
      // Review klien + agregat di level Service (rich result bintang di SERP)
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        bestRating: "5",
        reviewCount: "1247",
      },
      review: pickTestimonialsForCatalogCategory(page.category, 3).map((t) => ({
        "@type": "Review",
        name: `${t.name} — ${t.service}`,
        reviewBody: t.content,
        datePublished: t.date,
        author: { "@type": "Person", name: t.name },
        publisher: {
          "@type": "Organization",
          name: "PusatPerizinan.com",
          url: SITE_URL,
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: String(t.rating),
          bestRating: "5",
          worstRating: "1",
        },
      })),
    });
  }

  // 2. FAQPage schema
  if (page.faq.length > 0) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  // 3. BreadcrumbList schema
  jsonLd.push({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: page.breadcrumbs.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.name,
      item: `${SITE_URL}${b.href}`,
    })),
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

function Breadcrumbs({ page }: { page: NonNullable<ReturnType<typeof getServicePage>> }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        {page.breadcrumbs.map((b, i) => {
          const isLast = i === page.breadcrumbs.length - 1;
          return (
            <li key={b.href} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="h-3.5 w-3.5 opacity-50" aria-hidden />}
              {isLast ? (
                <span className="font-medium text-foreground" aria-current="page">
                  {b.name}
                </span>
              ) : (
                <Link href={b.href} className="hover:text-primary transition-colors">
                  {b.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function LeadForm({ page }: { page: NonNullable<ReturnType<typeof getServicePage>> }) {
  return (
    <div className="rounded-2xl border-2 border-primary/15 bg-gradient-to-br from-primary/5 to-gold/5 p-6 md:p-8">
      <div className="flex items-center gap-2 mb-1.5">
        <Sparkles className="h-5 w-5 text-primary" aria-hidden />
        <h2 className="text-xl font-bold">Konsultasi Gratis — Balas Cepat</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-5">
        Ceritakan kebutuhan {page.kind === "country" || page.kind === "sector" ? "profil & negara tujuan" : "kondisi usaha"} Anda. Tim kami balas dalam hitungan menit (jam kerja) dengan roadmap lengkap — biaya & timeline transparan.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
            `Halo PusatPerizinan.com, saya ingin konsultasi tentang: ${page.h1}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3.5 font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-105 min-h-[44px]"
        >
          <PhoneCall className="h-5 w-5" aria-hidden />
          Chat WhatsApp Sekarang
        </a>
        <a
          href="/#konsultasi"
          className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 font-semibold text-primary-foreground shadow-md transition-all hover:shadow-lg hover:brightness-110 min-h-[44px]"
        >
          <FileText className="h-5 w-5" aria-hidden />
          Form Konsultasi Lengkap
        </a>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" aria-hidden /> Garansi 100%
        </span>
        <span className="flex items-center gap-1">
          <BadgeCheck className="h-3.5 w-3.5 text-primary" aria-hidden /> Jalur resmi pemerintah
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5 text-primary" aria-hidden /> Konsultasi tanpa komitmen
        </span>
      </div>
    </div>
  );
}

function RegionLinks({ page }: { page: NonNullable<ReturnType<typeof getServicePage>> }) {
  // Untuk halaman induk perizinan & sertifikasi: tampilkan link × provinsi populer
  if (page.kind !== "base" || (page.category !== "perizinan" && page.category !== "sertifikasi")) return null;
  const popularProvinces = ["DKI Jakarta", "Jawa Barat", "Jawa Tengah", "Jawa Timur", "Bali", "Sumatera Utara", "Sulawesi Selatan", "Kalimantan Timur"];
  const links = PROVINCES.filter((p) => popularProvinces.includes(p.name));

  return (
    <section className="mt-10" aria-labelledby="region-heading">
      <h2 id="region-heading" className="flex items-center gap-2 text-lg font-bold mb-4">
        <MapPin className="h-5 w-5 text-primary" aria-hidden />
        Tersedia di Provinsi Utama
      </h2>
      <div className="flex flex-wrap gap-2">
        {links.map((p) => (
          <Link
            key={p.name}
            href={`/layanan/${page.slug}-${slugify(p.name)}`}
            className="group flex items-center gap-1.5 rounded-full border bg-card px-3.5 py-1.5 text-sm font-medium transition-all hover:border-primary hover:bg-primary/5 hover:text-primary"
          >
            {p.name}
            <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
          </Link>
        ))}
      </div>
    </section>
  );
}

function RelatedSection({ page }: { page: NonNullable<ReturnType<typeof getServicePage>> }) {
  const related = page.related
    .map((slug) => ALL_SERVICE_PAGES.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (related.length === 0) return null;

  return (
    <section className="mt-12" aria-labelledby="related-heading">
      <h2 id="related-heading" className="flex items-center gap-2 text-xl font-bold mb-5">
        <Globe2 className="h-5 w-5 text-primary" aria-hidden />
        Layanan Terkait
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((r) => (
          <Link
            key={r.slug}
            href={`/layanan/${r.slug}`}
            className="group rounded-xl border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-md"
          >
            <Badge variant="secondary" className="mb-2 text-[10px] uppercase tracking-wide">
              {CATEGORY_META[r.category].label.split(" ")[0]}
            </Badge>
            <h3 className="font-semibold leading-snug group-hover:text-primary transition-colors">
              {r.h1}
            </h3>
            <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2">{r.metaDesc}</p>
          </Link>
        ))}
      </div>
      <div className="mt-4">
        <Link
          href="/layanan"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          Lihat semua layanan
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}

/**
 * Deep-link ekspansi (Task 25): dari halaman layanan dasar →
 * /biaya/{slug}, /syarat/{slug}, dan matriks industri relevan.
 * Hanya tampil untuk kind "base" (110 halaman induk).
 */
function DeepLinksSection({ page }: { page: NonNullable<ReturnType<typeof getServicePage>> }) {
  if (page.kind !== "base") return null;
  const industryLinks = INDUSTRIES.flatMap((i) =>
    i.services.some((s) => s.id === page.slug)
      ? [{ label: `${page.h1} untuk ${i.name}`, href: `/industri/${i.slug}/${page.slug}` }]
      : []
  ).slice(0, 3);
  const links = [
    { label: `Biaya ${page.h1} — rincian & cara hemat`, href: `/biaya/${page.slug}` },
    { label: `Syarat ${page.h1} — checklist dokumen`, href: `/syarat/${page.slug}` },
    ...industryLinks,
  ];
  return (
    <section className="mt-12" aria-labelledby="deep-links-heading">
      <h2 id="deep-links-heading" className="flex items-center gap-2 text-xl font-bold mb-5">
        <Compass className="h-5 w-5 text-primary" aria-hidden />
        Panduan Detail Layanan Ini
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="group rounded-xl border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-md"
          >
            <h3 className="font-semibold leading-snug group-hover:text-primary transition-colors">{l.label}</h3>
            <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">
              Buka halaman <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

/**
 * Section testimoni klien — 3 ulasan relevan per kategori layanan.
 * Tampil di 1.300+ halaman programatik (E-E-A-T + interlink ke /testimoni).
 */
function ServiceTestimonials({ page }: { page: NonNullable<ReturnType<typeof getServicePage>> }) {
  // Kelompok sertifikasi (untuk label & testimoni yang relevan)
  const certGroup =
    page.category === "sertifikasi"
      ? CERT_MAP.get(page.kind === "region" ? page.parent ?? "" : page.slug)?.group ?? null
      : null;
  const testimonials =
    certGroup === "travel-ibadah"
      ? getTestimonialsByCategory("umroh-haji-travel").slice(0, 3)
      : pickTestimonialsForCatalogCategory(page.category, 3);
  const catLabel =
    page.category === "pajak"
      ? "Perpajakan"
      : page.category === "pmi"
        ? "PMI & Kerja Luar Negeri"
        : page.category === "virtual-office"
          ? "Virtual Office & Alamat Bisnis"
          : certGroup
            ? "Sertifikasi & ISO"
            : "Perizinan";
  const catSlug =
    page.category === "pajak"
      ? "perpajakan-coretax"
      : page.category === "pmi"
        ? "kerja-luar-negeri-pmi"
        : page.category === "virtual-office"
          ? "perizinan-usaha"
          : certGroup === "travel-ibadah"
            ? "umroh-haji-travel"
            : "sertifikasi-halal";

  return (
    <section className="mt-12" aria-labelledby="testi-heading">
      <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
        <div>
          <h2 id="testi-heading" className="flex items-center gap-2 text-xl font-bold">
            <Star className="h-5 w-5 text-amber-400" aria-hidden />
            Testimoni Klien untuk Layanan {catLabel}
          </h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Rating rata-rata {getAverageRating().toFixed(1).replace(".", ",")} dari 5 — ulasan klien terverifikasi.
          </p>
        </div>
        <Link
          href={`/testimoni/${catSlug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          Lihat semua testimoni
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
      <TestimonialGrid items={testimonials} truncateTo={220} />
    </section>
  );
}

// ------------------------------------------------------------
// PAGE
// ------------------------------------------------------------

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const page = getAnyPage(slug.join("/"));
  if (!page) notFound();

  const isHub = page.kind === "hub";

  if (isHub) {
    return <HubPage page={page} />;
  }

  return (
    <main className="min-h-screen bg-background">
      <ServiceJsonLd page={page} />

      {/* Header mini (konsisten dengan situs) */}
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

      <article className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Breadcrumbs page={page} />

        {/* Hero */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15">
              {CATEGORY_META[page.category].label}
            </Badge>
            {page.region && (
              <Badge variant="outline" className="gap-1">
                <MapPin className="h-3 w-3" aria-hidden /> {page.region}
              </Badge>
            )}
            {page.country && (
              <Badge variant="outline" className="gap-1">
                <Globe2 className="h-3 w-3" aria-hidden /> {page.country}
              </Badge>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-balance">
            {page.h1}
          </h1>
          <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
            {page.intro}
          </p>

          {/* Quick info bar */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-xl border bg-card p-3.5">
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground font-semibold">Mulai dari</p>
              <p className="mt-0.5 text-lg font-bold text-primary">{page.price}</p>
            </div>
            <div className="rounded-xl border bg-card p-3.5">
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground font-semibold">Durasi</p>
              <p className="mt-0.5 text-sm font-semibold leading-snug">{page.duration}</p>
            </div>
            <div className="rounded-xl border bg-card p-3.5">
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground font-semibold">Untuk</p>
              <p className="mt-0.5 text-sm font-semibold leading-snug">{page.audience.slice(0, 2).join(" & ")}</p>
            </div>
            <div className="rounded-xl border bg-card p-3.5">
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground font-semibold">Garansi</p>
              <p className="mt-0.5 text-sm font-semibold leading-snug text-primary">100% uang kembali</p>
            </div>
          </div>
        </header>

        {/* Konten utama + sidebar CTA */}
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="space-y-8 min-w-0">
            {/* Deskripsi panjang */}
            <section aria-labelledby="tentang">
              <h2 id="tentang" className="flex items-center gap-2 text-xl font-bold mb-4">
                <FileText className="h-5 w-5 text-primary" aria-hidden />
                {isHub ? "Kenapa PusatPerizinan.com" : `Tentang ${page.kind === "base" ? "Layanan Ini" : "Layanan di Wilayah Ini"}`}
              </h2>
              <div className="space-y-3.5 text-[15px] leading-relaxed text-foreground/90">
                {page.longDesc.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              {page.legalBasis && (
                <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-muted/60 p-4 text-sm">
                  <ShieldCheck className="h-4 w-4 mt-0.5 shrink-0 text-primary" aria-hidden />
                  <p>
                    <strong>Dasar hukum:</strong> {page.legalBasis}
                    {page.authority && (
                      <>
                        {" "}· <strong>Instansi:</strong> {page.authority}
                      </>
                    )}
                  </p>
                </div>
              )}
            </section>

            {/* Fitur */}
            {page.features.length > 0 && (
              <section aria-labelledby="fitur">
                <h2 id="fitur" className="flex items-center gap-2 text-xl font-bold mb-4">
                  <ListChecks className="h-5 w-5 text-primary" aria-hidden />
                  Yang Anda Dapatkan
                </h2>
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {page.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 rounded-xl border bg-card p-3.5 text-sm">
                      <CheckCircle2 className="h-4.5 w-4.5 shrink-0 mt-0.5 text-primary" aria-hidden />
                      <span className="leading-snug">{f}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Persyaratan */}
            {page.requirements.length > 0 && (
              <section aria-labelledby="syarat">
                <h2 id="syarat" className="flex items-center gap-2 text-xl font-bold mb-4">
                  <FileText className="h-5 w-5 text-primary" aria-hidden />
                  Persyaratan Dokumen
                </h2>
                <ol className="space-y-2">
                  {page.requirements.map((r, i) => (
                    <li key={i} className="flex items-start gap-3 rounded-xl border bg-card p-3.5 text-sm">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {i + 1}
                      </span>
                      <span className="leading-snug">{r}</span>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {/* Proses */}
            {page.steps.length > 0 && (
              <section aria-labelledby="proses">
                <h2 id="proses" className="flex items-center gap-2 text-xl font-bold mb-4">
                  <Clock className="h-5 w-5 text-primary" aria-hidden />
                  Proses Pengurusan
                </h2>
                <div className="relative space-y-0 pl-1">
                  {page.steps.map((s, i) => (
                    <div key={i} className="relative flex gap-4 pb-5 last:pb-0">
                      {/* Timeline line */}
                      {i < page.steps.length - 1 && (
                        <div className="absolute left-[15px] top-8 h-full w-0.5 bg-primary/15" aria-hidden />
                      )}
                      <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {i + 1}
                      </span>
                      <p className="pt-1.5 text-sm leading-relaxed">{s}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* FAQ */}
            {page.faq.length > 0 && (
              <section aria-labelledby="faq">
                <h2 id="faq" className="flex items-center gap-2 text-xl font-bold mb-4">
                  <Users className="h-5 w-5 text-primary" aria-hidden />
                  Pertanyaan yang Sering Diajukan
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {page.faq.map((f, i) => (
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
            )}

            <RegionLinks page={page} />
            <ServiceTestimonials page={page} />
            <RelatedSection page={page} />
            <DeepLinksSection page={page} />
          </div>

          {/* Sidebar sticky */}
          <aside className="lg:sticky lg:top-24 lg:self-start space-y-4">
            <LeadForm page={page} />

            <div className="rounded-2xl border bg-card p-5">
              <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5">
                <Building2 className="h-4 w-4 text-primary" aria-hidden />
                Info Cepat
              </h3>
              <dl className="space-y-2.5 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Kategori</dt>
                  <dd className="font-medium text-right">{CATEGORY_META[page.category].label.split(" & ")[0]}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Biaya mulai</dt>
                  <dd className="font-medium text-primary">{page.price}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Estimasi</dt>
                  <dd className="font-medium text-right">{page.duration}</dd>
                </div>
                {page.authority && (
                  <div className="pt-1 border-t">
                    <dt className="text-muted-foreground mt-2">Instansi resmi</dt>
                    <dd className="font-medium mt-0.5 leading-snug">{page.authority}</dd>
                  </div>
                )}
              </dl>
            </div>

            <div className="rounded-2xl bg-[oklch(0.23_0.03_165)] p-5 text-emerald-50">
              <p className="text-sm leading-relaxed">
                <strong className="text-emerald-300">1.247+ klien</strong> di 38 provinsi sudah kami bantu dengan rating{" "}
                <strong className="text-emerald-300">4,9/5</strong>.
              </p>
              <p className="mt-2 text-xs text-emerald-100/70 leading-relaxed">
                3.899+ izin terbit · Garansi 100% · Support WhatsApp setelah selesai
              </p>
            </div>
          </aside>
        </div>
      </article>
    </main>
  );
}
