import { FAQS } from "@/lib/landing-data";
import { SITE_URL, SITE_NAME, LEGAL_ENTITY, CONTACT } from "@/lib/site";

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** Site-wide identity only. Page-specific content belongs on its own route. */
export function SeoJsonLd() {
  return <JsonLd data={{
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        legalName: LEGAL_ENTITY,
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        telephone: CONTACT.phoneIntl,
        email: CONTACT.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: CONTACT.address.street,
          addressLocality: CONTACT.address.city,
          addressRegion: CONTACT.address.region,
          postalCode: CONTACT.address.postalCode,
          addressCountry: CONTACT.address.country,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: "id-ID",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  }} />;
}

/** Matches the visible homepage FAQ; this does not promise rich results. */
export function HomeJsonLd() {
  return <JsonLd data={{
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  }} />;
}
