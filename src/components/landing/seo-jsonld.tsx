// ============================================================
// PUSATPERIZINAN.COM — JSON-LD Structured Data
// Server component (tanpa "use client") untuk SEO maksimal
// ============================================================

import { SERVICES, FAQS } from "@/lib/landing-data";
import { TESTIMONIALS } from "@/lib/testimonials-data";
import { TAX_ALL } from "@/lib/tax-services";
import { PMI_B2B_SERVICES, PMI_B2C_SERVICES, PMI_COUNTRIES } from "@/lib/pmi-services";
import { FOUNDER, TEAM } from "@/lib/team-data";
import { PERMIT_GUIDES, SECTOR_GUIDES } from "@/lib/seo-content";
import { BLOG_ARTICLES } from "@/lib/blog-content";
import { LANGUAGES } from "@/lib/i18n/languages";
import { SITE_URL, CONTACT, TRUST_METRICS, priceToIdr } from "@/lib/site";



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
      "Konsultan perizinan usaha, perpajakan & penempatan pekerja migran #1 Indonesia. Jasa pengurusan NIB, pendirian PT/CV/PMA, OSS-RBA, sertifikasi halal, izin BPOM, PBG/SLF, AMDAL, pajak pribadi & badan (NPWP, SPT, PKP, Coretax), penempatan PMI ke 17 negara (Jepang, Korea, Saudi, dsb), izin PPTKIS/P3MI, izin umroh (PPIU) & haji (PPIH), registrasi IATA, izin usaha Arab Saudi (MISA), RKAB & perizinan tambang — melayani 38 provinsi & 514 kabupaten/kota dengan garansi 100% uang kembali.",
    telephone: CONTACT.phoneIntl,
    email: "halo@pusatperizinan.com",
    foundingDate: CONTACT.foundingYear,
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.address.street,
      addressLocality: CONTACT.address.city,
      addressRegion: CONTACT.address.region,
      postalCode: CONTACT.address.postalCode,
      addressCountry: CONTACT.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: CONTACT.geo.lat,
      longitude: CONTACT.geo.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "08:00",
        closes: "20:00",
      },
    ],
    areaServed: [
      { "@type": "Country", name: "Indonesia" },
      ...PMI_COUNTRIES.map((c) => ({ "@type": "Country", name: c.name })),
    ],
    priceRange: "Rp 150.000 - Rp 45.000.000",
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
      ratingValue: TRUST_METRICS.rating,
      bestRating: "5",
      reviewCount: TRUST_METRICS.reviewCount,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Layanan Perizinan, Perpajakan & Penempatan PMI",
      itemListElement: [
        ...SERVICES.map((s, i) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s.title,
            description: s.desc,
            serviceType: "Perizinan Usaha",
          },
          priceCurrency: "IDR",
          price: String(priceToIdr(s.price) ?? 0),
          position: i + 1,
        })),
        ...TAX_ALL.map((s, i) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s.title,
            description: s.desc,
            serviceType: "Jasa Perpajakan",
          },
          priceCurrency: "IDR",
          price: String(priceToIdr(s.price) ?? 0),
          position: SERVICES.length + i + 1,
        })),
        ...[...PMI_B2B_SERVICES, ...PMI_B2C_SERVICES].map((s, i) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s.title,
            description: s.desc,
            serviceType: "Penempatan Pekerja Migran Indonesia",
          },
          priceCurrency: "IDR",
          price: String(priceToIdr(s.price) ?? 0),
          position: SERVICES.length + TAX_ALL.length + i + 1,
        })),
      ],
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
    // CATATAN AUDIT: hanya FAQ yang terlihat di homepage.
    // FAQ panduan tidak lagi dimuat di sini — masing-masing kini
    // punya FAQPage schema sendiri di /panduan/[id] (integritas schema).
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
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

  // 6. Reviews (testimoni terverifikasi — lengkap dengan tanggal & publisher)
  const reviewsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: TESTIMONIALS.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Review",
        name: `${t.name} — ${t.service}`,
        reviewBody: t.content,
        datePublished: t.date,
        author: { "@type": "Person", name: t.name },
        publisher: { "@type": "Organization", name: "PusatPerizinan.com", url: SITE_URL },
        reviewRating: {
          "@type": "Rating",
          ratingValue: String(t.rating),
          bestRating: "5",
          worstRating: "1",
        },
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
    url: `${SITE_URL}/blog`,
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
      mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${a.slug}` },
    })),
  };

  // 8. BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    // CATATAN AUDIT: URL hash (#section) diganti halaman nyata —
    // BreadcrumbList harus menunjuk URL yang benar-benar bisa di-crawl.
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Layanan Perizinan", item: `${SITE_URL}/layanan` },
      { "@type": "ListItem", position: 3, name: "Database KBLI", item: `${SITE_URL}/kbli` },
      { "@type": "ListItem", position: 4, name: "Kalkulator Biaya", item: `${SITE_URL}/kalkulator-pajak` },
      { "@type": "ListItem", position: 5, name: "Panduan Perizinan", item: `${SITE_URL}/panduan/nib` },
      { "@type": "ListItem", position: 6, name: "Blog Perizinan", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 7, name: "Testimoni Klien", item: `${SITE_URL}/testimoni` },
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
