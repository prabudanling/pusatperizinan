import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Info, Landmark, MessageCircle, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { INSTITUTIONS } from "@/lib/institutions";
import { InstitutionSeal } from "@/components/institutions/institution-seal";
import { WHATSAPP_NUMBER } from "@/lib/landing-data";
import { SITE_URL } from "@/lib/site";


const PAGE_TITLE = "Direktori 20 Kanal Resmi Pemerintah — Kementerian & Lembaga Terkait";
const PAGE_DESC =
  "Direktori lengkap 20 kementerian, lembaga & otoritas yang kami urus setiap hari: Kemenkumham, DJP, OSS-RBA, BPJPH, BPOM, Kemenag, ESDM, LPJK, Kementerian PU, KLH, BNP2MI, IATA, MISA — beserta izin yang kami proses di masing-masing kanal.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  keywords: [
    "kementerian terkait perizinan usaha",
    "instansi pengurusan izin indonesia",
    "logo kementerian ri",
    "kanal resmi oss-rba djp bpom",
    "jasa pengurusan izin jalur resmi pemerintah",
    "direktori lembaga pemerintah perizinan",
  ],
  alternates: { canonical: "/kanal-resmi" },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESC,
    url: "/kanal-resmi",
    type: "website",
    siteName: "PusatPerizinan.com",
    locale: "id_ID",
  },
  twitter: { card: "summary_large_image", title: PAGE_TITLE, description: PAGE_DESC },
  robots: { index: true, follow: true },
};

const FAQ_KANAL = [
  {
    q: "Apakah PusatPerizinan.com bagian dari pemerintah atau instansi di halaman ini?",
    a: "Tidak. Kami konsultan swasta independen — bukan kementerian, bukan lembaga pemerintah, dan tidak pernah mengaku mewakili mereka. Kami membantu Anda mempersiapkan, mengajukan, dan memantau proses di kanal resmi instansi (OSS-RBA, AHU Online, Coretax DJP, SIHALAL, SimBG, dsb). Semua dokumen terbit atas nama Anda dan dapat diverifikasi langsung ke instansi terkait.",
  },
  {
    q: "Bagaimana cara memastikan situs instansi yang saya akses resmi?",
    a: "Situs resmi instansi pemerintah Indonesia menggunakan domain .go.id (contoh: oss.go.id, pajak.go.id, pom.go.id). Periksa gembok SSL di browser, hindari link dari SMS/WA tidak dikenal, dan jangan pernah membayar biaya ke rekening pribadi — semua pembayaran resmi menuju bendahara negara/rekening instansi. Jika ragu, konsultasikan dulu ke kami — gratis.",
  },
  {
    q: "Apakah kami punya kemitraan resmi dengan kementerian/lembaga tersebut?",
    a: "Kami tidak memiliki mandat atau afiliasi dari instansi mana pun — dan berhati-hati terhadap jasa yang mengklaim 'bisa acc karena kenal orang dalam'. Keunggulan kami murni prosesional: pemahaman regulasi mendalam, dokumen yang disiapkan benar sejak hari pertama, dan pengalaman memproses ribuan permohonan di sistem-sistem resmi tersebut.",
  },
  {
    q: "Apakah semua proses perizinan bisa dilakukan online?",
    a: "Mayoritas ya: NIB (OSS-RBA), akta & SK badan hukum (AHU Online), pajak (Coretax DJP), halal (SIHALAL), PBG/SLF (SimBG), RKAB (Online MUBA), PSE (Komdigi). Sebagian proses memerlukan verifikasi fisik — audit LPH halal di lokasi produksi, verifikasi sarana klinik, pemeriksaan bangunan untuk SLF. Kami mengoordinasikan semua kunjungan tersebut ke lokasi Anda.",
  },
  {
    q: "Saya menemukan penipuan mengatasnamakan instansi pemerintah, apa yang harus dilakukan?",
    a: "Jangan transfer atau berikan data pribadi apa pun. Dokumentasikan (screenshot nomor, nama rekening, link situs), lalu laporkan ke instansi terkait melalui situs resminya, ke lapor.go.id, atau hubungi kami — kami bantu identifikasi apakah tawaran yang Anda terima masuk akal atau tanda-tanda penipuan. Konsultasi deteksi penipuan ini gratis.",
  },
];

function JsonLd() {
  // ItemList GovernmentOrganization + FAQPage + BreadcrumbList
  const directorySchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}/kanal-resmi#directory`,
    name: PAGE_TITLE,
    description: PAGE_DESC,
    numberOfItems: INSTITUTIONS.length,
    itemListElement: INSTITUTIONS.map((inst, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "GovernmentOrganization" as const,
        name: inst.fullName,
        shortName: inst.name,
        url: inst.website,
        description: inst.role,
      },
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_KANAL.map((f) => ({
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
      { "@type": "ListItem", position: 2, name: "Direktori Kanal Resmi", item: `${SITE_URL}/kanal-resmi` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(directorySchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}

export default function KanalResmiPage() {
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

      {/* Hero */}
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
                Direktori Kanal Resmi
              </li>
            </ol>
          </nav>

          <Badge variant="outline" className="rounded-full border-primary/30 bg-primary/5 text-primary font-semibold px-4 py-1">
            <Landmark className="mr-1.5 h-3.5 w-3.5" aria-hidden />
            Kementerian, Lembaga & Otoritas
          </Badge>
          <h1 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-balance leading-tight">
            Direktori{" "}
            <span className="text-gradient-brand">20 Kanal Resmi</span> yang Kami Urus Setiap Hari
          </h1>
          <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Setiap izin yang kami tangani diproses di sistem resmi instansi berikut — bukan jalur
            gelap, bukan "orang dalam". Semua dokumen terbit atas nama Anda dan dapat diverifikasi
            langsung ke instansi penerbit. Klik instansi mana pun untuk melihat layanan terkait.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <span className="flex items-center gap-1.5">
              <Landmark className="h-4 w-4 text-primary" aria-hidden />
              <strong>20 instansi</strong>
              <span className="text-muted-foreground">kementerian, lembaga & otoritas</span>
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-primary" aria-hidden />
              <span className="text-muted-foreground">Jalur resmi 100% · Garansi uang kembali</span>
            </span>
          </div>
        </div>
      </section>

      {/* Disclaimer transparan */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-8" aria-label="Catatan transparansi">
        <div className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm">
          <Info className="h-4.5 w-4.5 shrink-0 mt-0.5 text-amber-600" aria-hidden />
          <p className="leading-relaxed text-foreground/85">
            <strong>Catatan transparansi:</strong> PusatPerizinan.com adalah konsultan swasta
            independen — <strong>tidak berafiliasi</strong> dengan kementerian/lembaga mana pun dan
            tidak pernah mengaku mewakili pemerintah. Seal di halaman ini adalah identifikasi visual
            kanal yang kami proses, bukan logo resmi instansi. Keunggulan kami = penguasaan
            regulasi + proses yang benar sejak hari pertama.
          </p>
        </div>
      </section>

      {/* Grid direktori */}
      <section
        className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12"
        aria-label="Daftar instansi"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {INSTITUTIONS.map((inst) => (
            <article
              key={inst.id}
              className="group flex flex-col rounded-2xl border bg-card p-5 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
            >
              <header className="flex items-start gap-3.5">
                <InstitutionSeal inst={inst} size="md" />
                <div className="min-w-0">
                  <h2 className="text-[15px] font-bold leading-snug">{inst.name}</h2>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                    {inst.fullName}
                  </p>
                  <p className="mt-1.5 inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                    {inst.role}
                  </p>
                </div>
              </header>

              <p className="mt-3.5 text-sm text-foreground/85 leading-relaxed flex-1">{inst.desc}</p>

              {/* Chip layanan terkait (internal linking) */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {inst.services.map((slug, idx) => (
                  <Link
                    key={slug}
                    href={`/layanan/${slug}`}
                    className="rounded-full border bg-background px-2.5 py-1 text-[11px] font-medium text-muted-foreground transition-all hover:border-primary hover:bg-primary/5 hover:text-primary"
                  >
                    {inst.serviceLabels[idx]}
                  </Link>
                ))}
              </div>

              {/* Link situs resmi */}
              <div className="mt-4 border-t pt-3.5 flex items-center justify-between gap-3">
                <a
                  href={inst.website}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-primary"
                  aria-label={`Kunjungi situs resmi ${inst.name} (terbuka di tab baru)`}
                >
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                  {inst.websiteLabel}
                </a>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    `Halo PusatPerizinan.com, saya ingin konsultasi pengurusan dokumen di ${inst.name} (${inst.role}).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
                >
                  Urus di {inst.name}
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-12" aria-labelledby="faq-kanal">
        <h2 id="faq-kanal" className="text-xl font-bold mb-4">
          Pertanyaan Seputar Kanal Resmi & Status Kami
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {FAQ_KANAL.map((f, i) => (
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

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-2xl bg-[oklch(0.23_0.03_165)] p-8 md:p-10 text-emerald-50 text-center">
          <h2 className="text-2xl font-bold">Butuh Urusan di Instansi Mana Pun di Atas?</h2>
          <p className="mt-3 text-sm md:text-base text-emerald-100/85 max-w-2xl mx-auto leading-relaxed">
            Satu konsultasi gratis — kami petakan instansi apa saja yang relevan untuk usaha Anda,
            berapa biayanya, dan berapa lama. Transparan sejak detik pertama.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              "Halo PusatPerizinan.com, saya melihat direktori kanal resmi Anda dan ingin konsultasi kebutuhan perizinan saya."
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
