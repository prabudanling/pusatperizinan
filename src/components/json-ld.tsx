import { SITE, FAQS, SERVICES, BRAND } from "@/lib/site-config";

/**
 * JSON-LD Structured Data — mesin pencari membaca ini untuk
 * Rich Results: Knowledge Panel, FAQ dropdown, sitelinks search box,
 * rating bintang, breadcrumbs, dan layanan.
 *
 * Referensi: https://schema.org | https://developers.google.com/search/docs/appearance/structured-data
 */

interface JsonLdProps {
  /** Tambahan skema khusus halaman (opsional) */
  extra?: object[];
}

export function JsonLd({ extra = [] }: JsonLdProps) {
  const phone = SITE.contact.phone;
  const address = SITE.contact.address;

  const organization = {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: `${SITE.url}/og-image.png`,
    image: `${SITE.url}/og-image.png`,
    description: SITE.description,
    foundingDate: SITE.founded,
    slogan: SITE.tagline,
    telephone: phone,
    email: SITE.contact.email,
    priceRange: "Rp 100.000 – Rp 15.000.000",
    currenciesAccepted: "IDR",
    paymentAccepted: "Bank Transfer, QRIS, Virtual Account, Credit Card",
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    areaServed: {
      "@type": "Country",
      name: "Indonesia",
    },
    knowsLanguage: ["id", "en"],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "20:00",
    },
    sameAs: Object.values(SITE.social),
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: phone,
        contactType: "customer service",
        availableLanguage: ["Indonesian", "English"],
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "2847",
      bestRating: "5",
      worstRating: "1",
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    name: SITE.name,
    alternateName: SITE.legalName,
    url: SITE.url,
    description: SITE.description,
    inLanguage: "id-ID",
    publisher: { "@id": `${SITE.url}/#organization` },
    // Sitelinks Search Box di hasil pencarian Google
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.url}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE.url}/#webpage`,
    url: SITE.url,
    name: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    isPartOf: { "@id": `${SITE.url}/#website` },
    about: { "@id": `${SITE.url}/#organization` },
    inLanguage: "id-ID",
    primaryImageOfPage: `${SITE.url}/og-image.png`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE.url}/#faq`,
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE.url}/#services`,
    name: "Layanan Jasa Perizinan Usaha",
    itemListElement: SERVICES.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.title,
        description: s.detail,
        serviceType: s.title,
        provider: { "@id": `${SITE.url}/#organization` },
        areaServed: { "@type": "Country", name: "Indonesia" },
        offers: {
          "@type": "Offer",
          priceCurrency: "IDR",
          description: s.price,
          availability: "https://schema.org/InStock",
        },
      },
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Beranda",
        item: SITE.url,
      },
    ],
  };

  const all = [organization, website, webPage, faqSchema, servicesSchema, breadcrumb, ...extra];

  return (
    <>
      {all.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

/** Theme color meta untuk browser mobile */
export const THEME_COLOR = BRAND.primary;
