import type { Metadata } from "next";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { FaqBrowser } from "./faq-browser";
import { FAQ_CATEGORIES, FAQ_META } from "@/lib/faq-data";
import { SITE_NAME, SITE_URL, absUrl } from "@/lib/site";

// ============================================================
// PUSATPERIZINAN.COM — /faq (server component)
// Halaman FAQ pusat berstandar internasional:
//   - 51 Q&A kanonik Indonesia dari src/lib/faq-data.ts
//   - JSON-LD FAQPage (seluruh Q&A) + BreadcrumbList
//   - UI 30 bahasa via FAQ_UI; konten en full + zh/ar/ja/es top-10
//   - Pencarian & filter kategori oleh <FaqBrowser /> (client)
// ============================================================

const PAGE_URL = absUrl("/faq");

export const metadata: Metadata = {
  title: FAQ_META.title,
  description: FAQ_META.description,
  alternates: { canonical: "/faq" },
  robots: { index: true, follow: true },
  openGraph: {
    title: FAQ_META.title,
    description: FAQ_META.description,
    url: "/faq",
    siteName: SITE_NAME,
    type: "website",
    locale: "id_ID",
  },
};

// JSON-LD: FAQPage + BreadcrumbList — FAQPage memuat SELURUH Q&A
// kanonik (id) agar memenuhi syarat rich result FAQ di mesin pencari.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/faq#faqpage`,
      url: PAGE_URL,
      name: FAQ_META.title,
      description: FAQ_META.description,
      inLanguage: "id",
      dateModified: "2026-10-13",
      mainEntity: FAQ_CATEGORIES.flatMap((c) =>
        c.items.map((it) => ({
          "@type": "Question",
          name: it.q,
          acceptedAnswer: { "@type": "Answer", text: it.a },
        })),
      ),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "FAQ", item: PAGE_URL },
      ],
    },
  ],
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />
      <FaqBrowser />
      <Footer />
    </>
  );
}
