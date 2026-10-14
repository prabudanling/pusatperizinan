import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, CONTACT } from "@/lib/site";
import { LeadForm } from "@/components/lead-form";

// ============================================================
// PUSATPERIZINAN.COM — /pma-company-registration (IDE #4: PMA Inbound)
// English-first SEO page for foreign investors: "company
// registration Indonesia", "PT PMA requirements", dsb.
// Angka pakai fakta regulasi + disclaimer konsultasi.
// ============================================================

export const metadata: Metadata = {
  title: "Company Registration in Indonesia — PT PMA Setup from USD 800",
  description:
    "Register your PT PMA (foreign investment company) in Indonesia with licensed consultants: OSS-RBA NIB, DGT tax registration, work permits (KITAS), office in SCBD Jakarta. 38 provinces covered, money-back guarantee.",
  alternates: { canonical: "/pma-company-registration" },
  openGraph: {
    title: "Company Registration in Indonesia — PT PMA Setup",
    description: "Foreign-owned company (PT PMA) registration by licensed Indonesian consultants. Transparent pricing, written guarantee.",
    url: "/pma-company-registration",
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};

const PLANS = [
  {
    name: "Market Validation", price: "USD 800", time: "2-3 weeks",
    items: ["Representative Office (KPPA) via BKPM/OSS", "Tax ID (NPWP 2-digit) & domicile", "Bank account guidance", "Compliance calendar for first year"],
  },
  {
    name: "PT PMA Full Setup", price: "USD 2,900", time: "3-5 weeks",
    items: ["Deed of establishment + SK Ministry of Law", "NIB via OSS-RBA with correct KBLI", "Business licence by risk level", "NPWP corporate & VAT (PKP) guidance", "First LKPM report filed for you"],
  },
  {
    name: "PMA + Team Ready", price: "USD 4,500", time: "5-8 weeks",
    items: ["Everything in PT PMA Full Setup", "Investor KITAS for 2 directors", "RPTKA & foreign worker permits", "BPJS enrolment for local hires", "Accounting & tax retainer (first 3 months)"],
  },
];

const FAQ = [
  {
    q: "Can foreigners own 100% of an Indonesian company?",
    a: "Yes, for most business lines. Indonesia's Positive Investment List (Perpres 10/2021 as amended) allows 100% foreign ownership in the majority of KBLI codes; a few sectors cap foreign ownership or require partnerships. Send us your intended activity and we will confirm your exact ownership ceiling for free.",
  },
  {
    q: "What is the minimum investment for a PT PMA?",
    a: "Under BKPM Regulation 3/2021, each KBLI 5-digit business line requires an investment plan above IDR 10 billion (excluding land and buildings), with paid-up capital of at least IDR 10 billion for large enterprises. Micro and small activities are reserved for domestic players. Your plan is a commitment schedule — not a deposit you lose.",
  },
  {
    q: "PT PMA vs Representative Office — which should I choose?",
    a: "A representative office (KPPA) is faster and cheaper, and is ideal for market research, quality control, or regional coordination — but it cannot invoice customers. If you plan to sell in Indonesia, you need a PT PMA. Many groups start with KPPA and convert to PT PMA later; we handle both paths.",
  },
  {
    q: "How long does it take and what do you need from me?",
    a: "Typically 3-5 weeks for a standard PT PMA once your documents are ready: passport copies, parent company deeds (apostilled), and a chosen address. We provide a virtual office in Jakarta's SCBD district if you do not have premises yet.",
  },
  {
    q: "Do you support after incorporation?",
    a: "Yes — this is where most foreigners get stuck. Monthly LKPM reports, VAT filings, corporate tax, work permits, and licence renewals are all handled by our compliance team, with a written guarantee: if a permit fails because of our process, you get a full refund.",
  },
];

export default function PmaRegistrationPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-primary">Home</Link></li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="font-semibold text-foreground">Company Registration</li>
          </ol>
        </nav>

        <header className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">LICENSED • SCBD JAKARTA • MONEY-BACK GUARANTEE</p>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Company Registration in Indonesia — Done Right, From Day One
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            PT PMA, representative office, work permits, tax compliance — handled end-to-end by Indonesian
            consultants who process thousands of filings across 38 provinces. Offices at Indonesia Stock
            Exchange Building, SCBD. {CONTACT.hours}.
          </p>
        </header>

        <section className="mt-10 grid gap-5 md:grid-cols-3" aria-label="Packages">
          {PLANS.map((p) => (
            <article key={p.name} className="rounded-2xl border bg-card p-6 shadow-sm">
              <h2 className="font-bold">{p.name}</h2>
              <p className="mt-1 text-2xl font-extrabold text-emerald-700">{p.price}</p>
              <p className="text-xs text-muted-foreground">Timeline: {p.time}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {p.items.map((i) => (
                  <li key={i} className="flex gap-2"><span aria-hidden className="text-emerald-600">✓</span>{i}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="mt-12 max-w-3xl" aria-label="Frequently asked questions">
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          <div className="mt-4 space-y-3">
            {FAQ.map((f) => (
              <details key={f.q} className="rounded-xl border p-4">
                <summary className="cursor-pointer font-semibold">{f.q}</summary>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-2xl border bg-card p-5 sm:p-8" aria-label="Get started">
          <h2 className="text-xl font-bold">Get Your Free Ownership & Cost Assessment</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Tell us your intended business activity — within one business day you receive: your foreign-ownership
            ceiling, the exact KBLI codes, the total government + consultancy cost, and a realistic timeline.
          </p>
          <div className="mt-5 max-w-2xl">
            <LeadForm
              source="pma-en"
              cta="Send My Inquiry — Free Assessment"
              note="Your data stays confidential. NDA available on request."
              needs={[
                { value: "PT PMA", label: "PT PMA (selling / operating in Indonesia)" },
                { value: "KPPA", label: "Representative Office (market entry first)" },
                { value: "KITAS", label: "Visa / work permit (KITAS) only" },
                { value: "Compliance", label: "Tax & compliance for existing company" },
              ]}
            />
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Prefer WhatsApp? <a className="font-semibold text-emerald-700 underline" href={`https://wa.me/${CONTACT.whatsapp}`}>Chat {CONTACT.phoneDisplay}</a> (English & Bahasa Indonesia).
          </p>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            inLanguage: "en",
            mainEntity: FAQ.map((f) => ({
              "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }) }}
        />
      </div>
    </main>
  );
}
