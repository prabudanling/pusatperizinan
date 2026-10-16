import type { Metadata } from "next";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { PrivacyContent } from "./privacy-content";
import { SITE_NAME, SITE_URL, absUrl } from "@/lib/site";

// ============================================================
// PUSATPERIZINAN.COM — /kebijakan-privasi (server component)
// Kebijakan privasi standar internasional: UU PDP 27/2022 +
// struktur GDPR-grade. Konten bilingual dirender oleh
// <PrivacyContent /> (client) dari src/lib/privacy-content.ts.
// ============================================================

const META_TITLE = "Kebijakan Privasi — UU PDP & GDPR";
// 151 karakter — menyebut UU 27/2022, GDPR, hak subjek data, kontak DPO
const META_DESCRIPTION =
  "Kebijakan privasi PusatPerizinan.com sesuai UU 27/2022 (UU PDP) & GDPR: data yang dikumpulkan, dasar hukum, hak subjek data, dan kontak DPO resmi kami.";

export const metadata: Metadata = {
  title: META_TITLE,
  description: META_DESCRIPTION,
  alternates: { canonical: "/kebijakan-privasi" },
  robots: { index: true, follow: true },
  openGraph: {
    title: META_TITLE,
    description: META_DESCRIPTION,
    url: "/kebijakan-privasi",
    siteName: SITE_NAME,
    type: "website",
    locale: "id_ID",
  },
};

// JSON-LD: WebPage + BreadcrumbList — @id tersambung ke graph situs
// (${SITE_URL}/#website dan /#organization) agar entity konsisten.
const privacyJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/kebijakan-privasi#webpage`,
      url: absUrl("/kebijakan-privasi"),
      name: META_TITLE,
      description: META_DESCRIPTION,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "id",
      dateModified: "2026-10-13",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Kebijakan Privasi",
          item: absUrl("/kebijakan-privasi"),
        },
      ],
    },
  ],
};

export default function KebijakanPrivasiPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacyJsonLd) }}
      />
      <Header />
      <PrivacyContent />
      <Footer />
    </>
  );
}
