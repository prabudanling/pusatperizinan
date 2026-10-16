import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Zap,
} from "lucide-react";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ContactForm } from "./contact-form";
import { SITE_NAME, SITE_URL, absUrl, CONTACT, LEGAL_ENTITY } from "@/lib/site";

// ============================================================
// PUSATPERIZINAN.COM — /kontak (Conversion & Trust — M17)
// Ujung funnel situs: form lead (POST /api/leads, source "kontak")
// + kartu kanal resmi. NAP diambil dari site.ts — satu sumber untuk
// schema, footer, dan halaman ini (entity consistency untuk local SEO).
// ============================================================

const META_TITLE = "Kontak — Konsultasi Gratis 15 Menit | Kantor SCBD Jakarta";
// ~141 karakter — menyebut WhatsApp, alamat kantor, dan jam operasional
const META_DESCRIPTION =
  "Konsultasi gratis 15 menit: WhatsApp 0812-6999-9910, email, atau kantor SCBD Jakarta. Layanan Senin–Sabtu 08.00–20.00 WIB, respons < 5 menit.";
const PAGE_URL = absUrl("/kontak");

export const metadata: Metadata = {
  title: { absolute: META_TITLE },
  description: META_DESCRIPTION,
  alternates: {
    canonical: PAGE_URL,
    languages: {
      "id-ID": PAGE_URL,
      "x-default": PAGE_URL,
    },
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: META_TITLE,
    description: META_DESCRIPTION,
    url: PAGE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "id_ID",
  },
};

// ------------------------------------------------------------
// JSON-LD @graph: ContactPage + ContactPoint[] + ProfessionalService
// (ringkas: name, address, geo, telephone, email, jam Senin–Sabtu
// 08:00–20:00) + BreadcrumbList — tersambung ke graph situs
// (${SITE_URL}/#website dan /#organization) agar entity konsisten.
// ------------------------------------------------------------
const OPENING_HOURS = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "08:00",
    closes: "20:00",
  },
];

const kontakJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": `${SITE_URL}/kontak#webpage`,
      url: PAGE_URL,
      name: META_TITLE,
      description: META_DESCRIPTION,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      publisher: { "@id": `${SITE_URL}/#organization` },
      about: { "@id": `${SITE_URL}/kontak#professionalservice` },
      inLanguage: "id",
      dateModified: "2026-10-13",
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/kontak#professionalservice`,
      name: SITE_NAME,
      legalName: LEGAL_ENTITY,
      url: SITE_URL,
      telephone: CONTACT.phoneIntl,
      email: CONTACT.email,
      image: [
        absUrl("/kantor/kantor-jakarta.jpg"),
        absUrl("/kantor/kantor-bandung-lobi.jpg"),
        absUrl("/kantor/kantor-resepsionis.jpg"),
      ],
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
      openingHoursSpecification: OPENING_HOURS,
      areaServed: "ID",
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer service",
          telephone: CONTACT.phoneIntl,
          url: `https://wa.me/${CONTACT.whatsapp}`,
          areaServed: "ID",
          availableLanguage: ["id", "en"],
          hoursAvailable: OPENING_HOURS,
        },
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: CONTACT.email,
          areaServed: "ID",
          availableLanguage: ["id", "en"],
          hoursAvailable: OPENING_HOURS,
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Kontak", item: PAGE_URL },
      ],
    },
  ],
};

// Escape "<" agar aman dirender di dalam <script> HTML
const kontakJsonLdHtml = JSON.stringify(kontakJsonLd).replace(/</g, "\\u003c");

// CTA WhatsApp besar dengan pesan ter-prefill
const WA_CTA_HREF = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
  "Halo, saya mau konsultasi perizinan"
)}`;

export default function KontakPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: kontakJsonLdHtml }}
      />
      <Header />
      <main className="min-h-screen bg-background">
        {/* ===== HERO BAND ===== */}
        <section
          aria-labelledby="kontak-title"
          className="bg-gradient-to-b from-primary/10 via-primary/5 to-background"
        >
          <div className="mx-auto max-w-7xl px-4 pb-12 pt-24 sm:px-6 md:pb-16 md:pt-28 lg:px-8">
            <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
              <ol className="flex items-center gap-1.5">
                <li>
                  <Link href="/" className="hover:text-primary">
                    Beranda
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="font-semibold text-foreground">
                  Kontak
                </li>
              </ol>
            </nav>

            <h1
              id="kontak-title"
              className="mt-6 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
            >
              Hubungi <span className="text-gradient-brand">Konsultan Perizinan</span> Anda
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Ceritakan rencana usaha Anda — konsultan senior kami membalas dengan
              jalur perizinan paling sesuai, estimasi biaya, dan timeline yang jelas.
              Konsultasi awal{" "}
              <strong className="font-semibold text-foreground">gratis 15 menit</strong>,
              tanpa komitmen apa pun.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-semibold text-primary">
                <Clock className="h-3.5 w-3.5" aria-hidden />
                {CONTACT.hours}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-semibold text-primary">
                <Zap className="h-3.5 w-3.5" aria-hidden />
                Respons WhatsApp {"< 5 menit"}
              </span>
            </div>
          </div>
        </section>

        {/* ===== FORM (KIRI) + KANAL RESMI (KANAN) ===== */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-8">
            {/* KIRI — form lead */}
            <section aria-labelledby="form-title" className="lg:col-span-3">
              <h2
                id="form-title"
                className="text-2xl font-extrabold tracking-tight sm:text-3xl"
              >
                Formulir Konsultasi Gratis
              </h2>
              <p className="mt-2 text-muted-foreground">
                Isi 30 detik — konsultan kami yang menghubungi Anda, bukan sebaliknya.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </section>

            {/* KANAN — kartu kanal resmi */}
            <section aria-labelledby="kanal-title" className="lg:col-span-2">
              <h2
                id="kanal-title"
                className="text-2xl font-extrabold tracking-tight sm:text-3xl"
              >
                Kanal Resmi
              </h2>
              <p className="mt-2 text-muted-foreground">
                Pilih cara yang paling nyaman untuk Anda.
              </p>

              <div className="mt-6 space-y-4">
                {/* WhatsApp — kanal utama */}
                <div className="glass-card rounded-2xl p-6 transition-shadow hover:shadow-lg hover:shadow-primary/10">
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <MessageCircle className="h-6 w-6 text-primary" aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-bold">WhatsApp Bisnis — paling cepat</h3>
                      <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                        {CONTACT.phoneDisplay} — dijawab konsultan, bukan bot
                      </p>
                    </div>
                  </div>
                  <a
                    href={WA_CTA_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden />
                    Chat WhatsApp Sekarang
                  </a>
                </div>

                {/* Telepon */}
                <div className="flex items-start gap-4 rounded-2xl border border-border/70 bg-card p-5 transition-colors hover:border-primary/40">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Phone className="h-5 w-5 text-primary" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-bold">Telepon / WhatsApp</h3>
                    <a
                      href={`tel:${CONTACT.phoneIntl}`}
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      {CONTACT.phoneDisplay}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 rounded-2xl border border-border/70 bg-card p-5 transition-colors hover:border-primary/40">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-bold">Email</h3>
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      {CONTACT.email}
                    </a>
                  </div>
                </div>

                {/* Alamat SCBD */}
                <div className="flex items-start gap-4 rounded-2xl border border-border/70 bg-card p-5 transition-colors hover:border-primary/40">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <MapPin className="h-5 w-5 text-primary" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-bold">Kantor Jakarta (SCBD)</h3>
                    <address className="mt-1 text-sm not-italic leading-relaxed text-muted-foreground">
                      {CONTACT.address.street}, {CONTACT.address.city},{" "}
                      {CONTACT.address.region} {CONTACT.address.postalCode}
                    </address>
                  </div>
                </div>

                {/* Jam operasional */}
                <div className="flex items-start gap-4 rounded-2xl border border-border/70 bg-card p-5 transition-colors hover:border-primary/40">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Clock className="h-5 w-5 text-primary" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-bold">Jam Operasional</h3>
                    <p className="text-sm text-muted-foreground">{CONTACT.hours}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Pesan di luar jam kerja dijawab pagi berikutnya.
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
                Dengan menghubungi kami, data yang Anda bagikan digunakan hanya untuk
                keperluan konsultasi &amp; pengurusan izin Anda — lihat{" "}
                <Link
                  href="/kebijakan-privasi"
                  className="font-semibold text-primary hover:underline"
                >
                  Kebijakan Privasi
                </Link>
                .
              </p>
            </section>
          </div>
        </div>

        {/* ===== FAQ MINI ===== */}
        <section aria-labelledby="faq-title" className="border-t border-border/60 bg-muted/30">
          <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 md:py-16">
            <h2
              id="faq-title"
              className="text-center text-2xl font-extrabold tracking-tight sm:text-3xl"
            >
              Pertanyaan Umum Sebelum Menghubungi
            </h2>
            <p className="mt-2 text-center text-muted-foreground">
              Belum menemukan jawaban? Kirim formulir di atas atau chat WhatsApp kami.
            </p>

            <Accordion
              type="single"
              collapsible
              className="mt-8 rounded-2xl border border-border/70 bg-card px-5"
            >
              <AccordionItem value="biaya-konsultasi">
                <AccordionTrigger className="text-sm font-semibold sm:text-base">
                  Berapa biaya konsultasinya?
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  Gratis. Konsultasi awal 15 menit tanpa biaya dan tanpa komitmen —
                  Anda baru ditagih setelah menyetujui layanan dan biayanya secara
                  tertulis. Lebih dari 1.200 usaha telah memulai dari konsultasi ini.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="proses-online">
                <AccordionTrigger className="text-sm font-semibold sm:text-base">
                  Apakah bisa diproses online 100%?
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  Ya untuk sebagian besar layanan (NIB/OSS, sertifikat standar,
                  sertifikasi halal, BPOM/PIRT, pajak): dokumen dikumpulkan dan
                  diverifikasi secara digital tanpa tatap muka. Untuk kebutuhan yang
                  memang mewajibkan kehadiran (mis. tanda tangan akta notaris), kami
                  koordinasikan jadwalnya agar kunjungan Anda seminimal mungkin.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="lokasi-kantor">
                <AccordionTrigger className="text-sm font-semibold sm:text-base">
                  Kantor fisik di mana?
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  Kantor utama kami di Indonesia Stock Exchange Building, Tower 2,
                  Lantai 5, SCBD Lot 13, Jl. Jend. Sudirman Kav. 52-53, Jakarta
                  Selatan 12190. Kami juga punya kantor cabang Bandung (lihat di
                  bawah) yang melayani seluruh Jawa Barat — kunjungan dengan
                  appointment via WhatsApp.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="keamanan-data">
                <AccordionTrigger className="text-sm font-semibold sm:text-base">
                  Bagaimana keamanan data saya?
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  Data Anda hanya dipakai untuk konsultasi dan pengurusan izin Anda,
                  dibatasi pada tim yang berkepentingan, dan dilindungi sesuai UU
                  PDP No. 27 Tahun 2022. Rinciannya lengkap di halaman{" "}
                  <Link
                    href="/kebijakan-privasi"
                    className="font-semibold text-primary hover:underline"
                  >
                    Kebijakan Privasi
                  </Link>
                  .
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* ===== KANTOR KAMI — bukti fisik kehadiran lokal (E-E-A-T) ===== */}
        <section
          aria-labelledby="kantor-bandung"
          className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8"
        >
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
              Kantor Kami
            </p>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
              Kantor Nyata, Bukan Alamat Virtual
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Kunjungan dengan appointment — hubungi WhatsApp dahulu agar
              konsultan senior siap menerima Anda.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {/* JAKARTA — kantor pusat SCBD */}
            <article className="animate-fade-up reveal-1 overflow-hidden rounded-2xl border border-border/70 bg-card">
              <figure className="group relative overflow-hidden">
                <Image
                  src="/kantor/kantor-jakarta.jpg"
                  alt="Papan nama PusatPerizinan.com pada gedung kantor Jakarta"
                  width={2000}
                  height={1333}
                  className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] sm:h-64"
                  sizes="(max-width: 1024px) 100vw, 576px"
                />
                <figcaption className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                  Kantor Pusat — Jakarta
                </figcaption>
              </figure>
              <div className="p-5 sm:p-6">
                <h3 className="text-lg font-extrabold tracking-tight">
                  Jakarta — SCBD
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {CONTACT.address.street}, {CONTACT.address.city}{" "}
                  {CONTACT.address.postalCode}. Berada di kawasan Indonesia
                  Stock Exchange Building — melayani seluruh Indonesia secara
                  online dan tatap muka.
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Jam operasional:</span>{" "}
                  {CONTACT.hours}
                </p>
              </div>
            </article>

            {/* BANDUNG — kantor cabang */}
            <article className="animate-fade-up reveal-2 overflow-hidden rounded-2xl border border-border/70 bg-card">
              <figure className="group relative overflow-hidden">
                <Image
                  src="/kantor/kantor-bandung-lobi.jpg"
                  alt="Lobi kantor cabang PusatPerizinan.com di Bandung — meja resepsionis kayu dengan pemandangan kota"
                  width={2000}
                  height={1333}
                  className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] sm:h-64"
                  sizes="(max-width: 1024px) 100vw, 576px"
                />
                <figcaption className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                  Kantor Cabang — Bandung
                </figcaption>
              </figure>
              <div className="p-5 sm:p-6">
                <h3
                  id="kantor-bandung"
                  className="text-lg font-extrabold tracking-tight"
                >
                  Kantor Cabang Bandung
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Melayani Jawa Barat &amp; sekitarnya: pengurusan NIB, pendirian badan
                  usaha, PBG/SLF, izin lingkungan, hingga sertifikasi produk.
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Area layanan:</span>{" "}
                  Bandung, Cimahi, Bekasi, Bogor, Depok, Sukabumi, Cirebon, dan seluruh
                  Jawa Barat.
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* ===== FOOTER NOTE LEGAL ===== */}
        <div className="border-t border-border/60">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <p className="text-center text-xs leading-relaxed text-muted-foreground">
              {SITE_NAME} adalah layanan konsultasi perizinan usaha yang dikelola oleh{" "}
              <span className="font-semibold text-foreground">{LEGAL_ENTITY}</span>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
