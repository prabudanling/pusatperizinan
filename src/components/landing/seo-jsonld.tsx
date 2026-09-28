// ============================================================
// PUSATPERIZINAN.COM — JSON-LD Structured Data
// Server component (tanpa "use client") untuk SEO maksimal
// ============================================================

import { SERVICES, FAQS, TESTIMONIALS } from "@/lib/landing-data";
import { FOUNDER, TEAM } from "@/lib/team-data";
import { PERMIT_GUIDES, SECTOR_GUIDES } from "@/lib/seo-content";
import { BLOG_ARTICLES } from "@/lib/blog-content";
import { LANGUAGES } from "@/lib/i18n/languages";

const SITE_URL = "https://pusatperizinan.com";

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function SeoJsonLd() {
  // 1. Organization + ProfessionalService (local SEO)
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#organization`,
    name: "PusatPerizinan.com",
    alternateName: "PT Digital Bisnis Manajemen",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/logo.png`,
    description:
      "Konsultan perizinan usaha #1 Indonesia. Jasa pengurusan NIB, pendirian PT/CV/PMA, OSS-RBA, sertifikasi halal, izin BPOM, PBG/SLF, AMDAL, izin umroh (PPIU) & haji (PPIH), registrasi IATA, izin usaha Arab Saudi (MISA), RKAB & perizinan tambang — melayani 38 provinsi & 514 kabupaten/kota dengan garansi 100% uang kembali.",
    telephone: "+62-812-6999-9910",
    email: "halo@pusatperizinan.com",
    foundingDate: "2024",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Indonesia Stock Exchange Building, Tower 2, Lantai 5, SCBD Lot 13, Jl. Jend. Sudirman Kav. 52-53",
      addressLocality: "Jakarta Selatan",
      addressRegion: "DKI Jakarta",
      postalCode: "12190",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -6.2249,
      longitude: 106.809,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "08:00",
        closes: "20:00",
      },
    ],
    areaServed: {
      "@type": "Country",
      name: "Indonesia",
    },
    priceRange: "Rp 350.000 - Rp 45.000.000",
    currenciesAccepted: "IDR",
    paymentAccepted: "Bank Transfer",
    // Founder + tim konsultan (branding Task 19)
    founder: {
      "@type": "Person",
      name: FOUNDER.name,
      jobTitle: FOUNDER.title.id,
      description: FOUNDER.bio.id,
      worksFor: { "@id": `${SITE_URL}/#organization` },
    },
    employee: TEAM.map((m) => ({
      "@type": "Person",
      name: m.name,
      jobTitle: m.title.id,
      description: m.bio.id,
      worksFor: { "@id": `${SITE_URL}/#organization` },
    })),
    // 30 bahasa teratas dunia — situs multibahasa (switcher + hreflang)
    availableLanguage: LANGUAGES.map((l) => ({
      "@type": "Language",
      name: l.english,
      alternateName: l.code,
    })),
    sameAs: [],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      reviewCount: "890",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Layanan Perizinan Usaha",
      itemListElement: SERVICES.map((s, i) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.desc,
          serviceType: s.title,
        },
        priceCurrency: "IDR",
        price: s.price.replace(/[^\d]/g, "") || "0",
        position: i + 1,
      })),
    },
  };

  // 2. WebSite + SearchAction
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "PusatPerizinan.com",
    inLanguage: "id-ID",
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  // 3. FAQPage (harus cocok dengan konten FAQ section yang terlihat)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: [
      ...FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
      // FAQ dari panduan izin (juga tampil di halaman)
      ...PERMIT_GUIDES.flatMap((g) =>
        g.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        }))
      ),
    ],
  };

  // 4. ItemList panduan izin (knowledge hub)
  const guideSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}/#guides`,
    name: "Panduan Lengkap Perizinan Usaha Indonesia",
    description:
      "Panduan mendalam NIB, PT, CV, PMA, Sertifikasi Halal, BPOM, PBG/SLF, Izin Lingkungan, OSS-RBA, Klinik, Pajak Usaha, Izin Umroh (PPIU), Izin Haji (PPIH), Registrasi IATA, Izin Usaha Arab Saudi (MISA), dan RKAB & Kepatuhan Tambang — di Indonesia.",
    itemListElement: PERMIT_GUIDES.map((g, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Article",
        headline: `Panduan Lengkap ${g.name} Indonesia`,
        description: g.short,
        articleSection: "Perizinan Usaha",
        author: { "@id": `${SITE_URL}/#organization` },
        about: { "@type": "Thing", name: g.name },
      },
    })),
  };

  // 5. ItemList sektor
  const sectorSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}/#sectors`,
    name: "Perizinan per Bidang Usaha",
    itemListElement: SECTOR_GUIDES.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Article",
        headline: `Izin Usaha ${s.name} — Lengkap & Terkini`,
        description: s.desc,
      },
    })),
  };

  // 6. Reviews (testimoni terverifikasi)
  const reviewsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: TESTIMONIALS.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: String(t.rating),
          bestRating: "5",
        },
        author: { "@type": "Person", name: t.name },
        reviewBody: t.content,
        itemReviewed: { "@id": `${SITE_URL}/#organization` },
      },
    })),
  };

  // 7. Blog + BlogPosting (content hub — 13 artikel panduan)
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}/#blog`,
    name: "Blog PusatPerizinan.com — Wawasan Perizinan Usaha",
    description:
      "Artikel mendalam seputar perizinan usaha Indonesia: NIB, PT, PMA, halal, BPOM, PBG/SLF, tambang (RKAB), travel umroh/haji (PPIU/PPIH), IATA, dan izin usaha Arab Saudi (MISA).",
    url: `${SITE_URL}/#blog`,
    inLanguage: "id-ID",
    publisher: { "@id": `${SITE_URL}/#organization` },
    blogPost: BLOG_ARTICLES.map((a) => ({
      "@type": "BlogPosting",
      headline: a.title,
      description: a.excerpt,
      datePublished: a.publishedAt,
      dateModified: a.updatedAt,
      articleSection: a.category,
      keywords: a.keywords.join(", "),
      author: { "@type": "Person", name: a.author, jobTitle: a.authorRole },
      publisher: { "@id": `${SITE_URL}/#organization` },
      mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/#blog` },
    })),
  };

  // 8. BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Beranda",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Layanan Perizinan",
        item: `${SITE_URL}/#layanan`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Kalkulator Biaya Perizinan",
        item: `${SITE_URL}/#kalkulator`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Panduan Perizinan",
        item: `${SITE_URL}/#panduan`,
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Blog & Artikel Perizinan",
        item: `${SITE_URL}/#blog`,
      },
      {
        "@type": "ListItem",
        position: 6,
        name: "Jangkauan 38 Provinsi & 514 Kabupaten/Kota",
        item: `${SITE_URL}/#jangkauan`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={orgSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={guideSchema} />
      <JsonLd data={sectorSchema} />
      <JsonLd data={reviewsSchema} />
      <JsonLd data={blogSchema} />
      <JsonLd data={breadcrumbSchema} />
    </>
  );
}
