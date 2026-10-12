import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Clock,
  FileText,
  Landmark,
  Mail,
  MapPin,
  PhoneCall,
  ShieldCheck,
  Star,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  VO_PACKAGES,
  VO_LOCATIONS,
  VO_PURPOSES,
  VO_CITIES,
  VO_GUIDES,
} from "@/lib/virtual-office-data";
import { WHATSAPP_NUMBER } from "@/lib/landing-data";
import { SITE_URL } from "@/lib/site";

// ============================================================
// PUSATPERIZINAN.COM — Halaman Hub Virtual Office
// Gateway 1.200+ halaman programatik VO (paket × lokasi × keperluan)
// Server component — SEO aman, tanpa client JS.
// ============================================================


const TIER_LABEL: Record<string, string> = {
  premium: "Premium",
  bisnis: "Bisnis",
  smart: "Smart-Ekonomis",
};

export const metadata: Metadata = {
  title: "Virtual Office Jakarta SCBD & 48 Lokasi Indonesia — Mulai Rp 500rb/bln",
  description:
    "Virtual office premium di SCBD, Sudirman, Kuningan, BSD, Bandung, Surabaya & Bali. Alamat bisnis resmi untuk NIB, PKP, rekening bank & marketplace — resepsionis, penerimaan surat, papan nama. 6 paket, 48 lokasi, 30 kota. Konsultasi gratis via WhatsApp!",
  keywords: [
    "virtual office",
    "virtual office jakarta",
    "virtual office scbd",
    "sewa alamat kantor",
    "virtual office murah",
    "virtual office untuk pkp",
    "alamat bisnis premium",
    "virtual office pma",
    "serviced office",
    "sewa meeting room",
  ],
  alternates: { canonical: "/virtual-office" },
  openGraph: {
    title: "Virtual Office SCBD & 48 Lokasi Indonesia — Mulai Rp 500rb/bln",
    description:
      "Alamat bisnis resmi di gedung korporat premium: NIB, PKP, bank & marketplace. 6 paket lengkap dengan resepsionis & penerimaan surat.",
    url: "/virtual-office",
    type: "website",
    siteName: "PusatPerizinan.com",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Virtual Office SCBD & 48 Lokasi — Mulai Rp 500rb/bln",
    description: "Alamat bisnis resmi untuk NIB, PKP, bank & marketplace. 6 paket, 48 lokasi, 30 kota.",
  },
  robots: { index: true, follow: true },
};

function JsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Virtual Office & Alamat Bisnis PusatPerizinan.com",
      description:
        "Alamat bisnis premium di 48 lokasi gedung korporat Indonesia untuk NIB, PKP, rekening bank & marketplace — dengan resepsionis, penerimaan surat & perjanjian resmi.",
      serviceType: "virtual-office",
      provider: {
        "@type": "ProfessionalService",
        name: "PusatPerizinan.com",
        url: SITE_URL,
        telephone: "+6281269999910",
        address: {
          "@type": "PostalAddress",
          streetAddress:
            "Indonesia Stock Exchange Building, Tower 2, Lantai 5, SCBD Lot 13, Jl. Jend. Sudirman Kav. 52-53",
          addressLocality: "Jakarta Selatan",
          addressRegion: "DKI Jakarta",
          postalCode: "12190",
          addressCountry: "ID",
        },
      },
      areaServed: { "@type": "Country", name: "Indonesia" },
      offers: {
        "@type": "Offer",
        price: 500000,
        priceCurrency: "IDR",
        description: "Virtual Office Address mulai Rp 500rb/bulan atau Rp 4,5jt/tahun",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        bestRating: "5",
        reviewCount: "1247",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Paket Virtual Office",
        itemListElement: VO_PACKAGES.map((p) => ({
          "@type": "Offer",
          name: p.name,
          price: p.priceNumeric,
          priceCurrency: "IDR",
          description: p.desc,
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Apakah virtual office bisa untuk NIB dan OSS-RBA?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Bisa. Sertifikat hak pakai alamat + surat keterangan domisili dari kami memenuhi syarat alamat usaha pada pendaftaran NIB via OSS-RBA untuk mayoritas skala usaha. Untuk sektor yang mewajibkan alamat operasional fisik (misal manufaktur), tim kami arahkan skema yang tepat sejak konsultasi awal.",
          },
        },
        {
          "@type": "Question",
          name: "Apakah alamat virtual office bisa untuk PKP di KPP?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Bisa, dengan paket yang tepat. VO Plus Pajak menyediakan papan nama usaha, dokumen domisili lengkap berfoto, dan koordinasi survei KPP. Kunci pengukuhan PKP adalah koherensi: alamat benar-benar ada, papan nama sesuai nama badan usaha, dan aktivitas sesuai KBLI.",
          },
        },
        {
          "@type": "Question",
          name: "Berapa harga virtual office terbaik di Indonesia?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Mulai Rp 500rb/bulan (Rp 4,5jt/tahun) untuk alamat standar, dan naik untuk lokasi premium seperti SCBD dan Sudirman. Semua harga transparan per lokasi di situs ini, tanpa biaya tersembunyi — pembayaran tahunan hemat 15-25%.",
          },
        },
        {
          "@type": "Question",
          name: "Apakah PT PMA (investor asing) bisa memakai virtual office?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Bisa, melalui skema PPA (Penggunaan Penunjuk Alamat) — perjanjian resmi tertulis yang diterima BKPM, OSS-RBA, dan bank. Paket VO PPA kami termasuk support bahasa Inggris dan koordinasi notaris untuk pendirian PT PMA.",
          },
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Virtual Office", item: `${SITE_URL}/virtual-office` },
      ],
    },
  ];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const waHref = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export default function VirtualOfficePage() {
  const premiumLocs = VO_LOCATIONS.filter((l) => l.tier === "premium");
  const popularLocs = VO_LOCATIONS.filter((l) => l.popular);

  return (
    <main className="min-h-screen bg-background">
      <JsonLd />

      {/* Header mini */}
      <div className="border-b bg-card/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Kembali ke beranda">
            <img src="/logo-icon.png" alt="Logo PusatPerizinan.com" className="h-8 w-8" />
            <span className="font-bold text-[15px] tracking-tight">
              Pusat<span className="text-primary">Perizinan</span>
              <span className="text-gold">.com</span>
            </span>
          </Link>
          <a
            href={waHref("Halo PusatPerizinan.com, saya ingin konsultasi Virtual Office.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full bg-[#25D366] px-3.5 py-2 sm:px-4 text-sm font-semibold text-white shadow-md transition-all hover:brightness-105 min-h-[44px] shrink-0"
          >
            <PhoneCall className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">Konsultasi</span>
            <span className="sm:hidden">Chat</span>
            <span className="hidden sm:inline">Gratis</span>
          </a>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-950 via-[oklch(0.23_0.03_165)] to-emerald-900 text-emerald-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-emerald-200/80">
            <ol className="flex items-center gap-1.5">
              <li><Link href="/" className="hover:text-emerald-50 transition-colors">Beranda</Link></li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="font-medium text-emerald-50">Virtual Office</li>
            </ol>
          </nav>

          <Badge className="mb-4 bg-gold/15 text-gold border border-gold/30 hover:bg-gold/20">
            <Star className="h-3.5 w-3.5 mr-1" aria-hidden /> 4,9/5 dari 1.247+ klien di 38 provinsi
          </Badge>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight text-balance">
            Virtual Office Premium — Alamat Bisnis di{" "}
            <span className="text-gold">SCBD, Sudirman & 48 Lokasi</span> Indonesia
          </h1>
          <p className="mt-5 max-w-3xl text-base md:text-lg text-emerald-100/90 leading-relaxed">
            Gedung korporat nyata dengan resepsionis, penerimaan surat & papan nama usaha — dokumen
            resmi untuk <strong className="text-emerald-50">NIB, PKP, rekening bank, BPOM & marketplace</strong>.
            Mulai <strong className="text-gold">Rp 500rb/bulan</strong>, aktif 1-2 hari kerja, 100% proses daring.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={waHref("Halo, saya tertarik Virtual Office. Mohon info paket & lokasi.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 font-semibold text-white shadow-lg transition-all hover:brightness-105 min-h-[44px]"
            >
              <PhoneCall className="h-5 w-5" aria-hidden />
              Chat WhatsApp — Aktivasi Hari Ini
            </a>
            <a
              href="#paket"
              className="flex items-center justify-center gap-2 rounded-xl bg-emerald-50/10 border border-emerald-100/30 px-6 py-3.5 font-semibold text-emerald-50 transition-all hover:bg-emerald-50/20 min-h-[44px]"
            >
              Lihat 6 Paket & Harga
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>

          <dl className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { n: "48", l: "Lokasi gedung nyata" },
              { n: "30", l: "Kota di 38 provinsi" },
              { n: "6", l: "Paket lengkap" },
              { n: "1-2", l: "Hari kerja aktif" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl bg-emerald-50/5 border border-emerald-100/15 p-4">
                <dt className="sr-only">{s.l}</dt>
                <dd className="text-2xl md:text-3xl font-extrabold text-gold">{s.n}</dd>
                <dd className="mt-1 text-xs md:text-sm text-emerald-100/80">{s.l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Keunggulan */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12" aria-labelledby="kenapa">
        <h2 id="kenapa" className="text-2xl md:text-3xl font-bold text-center">
          Kenapa Alamat Bisnis Kami Berbeda
        </h2>
        <p className="mt-3 text-center text-muted-foreground max-w-2xl mx-auto">
          Bukan sekadar papan nama — setiap lokasi adalah gedung nyata yang berfungsi penuh untuk
          legalitas, operasional & citra usaha Anda.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Building2, t: "Gedung nyata & berresepsionis", d: "Alamat kawasan premium (SCBD, Sudirman, Mega Kuningan) dengan resepsionis yang menelepon atas nama usaha Anda — bukan PO box liar." },
            { icon: Mail, t: "Mail handling tercatat", d: "Surat & paket diterima, difoto, dan dinotifikasi ke WhatsApp Anda di hari yang sama. Surat pajak & dokumen legal tidak akan hilang." },
            { icon: FileText, t: "Dokumen legal lengkap", d: "Perjanjian pakai alamat + surat keterangan domisili + foto papan nama — diterima OSS-RBA, KPP/DJP, bank & marketplace." },
            { icon: BadgeCheck, t: "PKP-ready & PPA PMA", d: "Paket khusus pendaftaran PKP dengan koordinasi survei KPP, dan PPA resmi untuk PT PMA (investor asing) — support bilingual." },
            { icon: ShieldCheck, t: "Terintegrasi perizinan", d: "Butuh NIB, halal, BPOM, merek atau pajak? Tim legal yang sama mengurus — dokumen alamat dan perizinan selalu konsisten." },
            { icon: Clock, t: "Aktif 1-2 hari, garansi 100%", d: "Proses 100% daring, tanpa datang ke kantor. Dokumen alamat ditolak instansi karena kesalahan kami? Uang kembali 100%." },
          ].map((f) => (
            <div key={f.t} className="rounded-2xl border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-md">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                <f.icon className="h-5 w-5 text-primary" aria-hidden />
              </div>
              <h3 className="mt-4 font-bold leading-snug">{f.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Paket */}
      <section id="paket" className="bg-muted/40 border-y" aria-labelledby="paket-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <h2 id="paket-heading" className="text-2xl md:text-3xl font-bold text-center">
            6 Paket Virtual Office — Harga Transparan
          </h2>
          <p className="mt-3 text-center text-muted-foreground max-w-2xl mx-auto">
            Semua fitur inti sudah termasuk — tanpa biaya SKDU, papan nama, atau surat tersembunyi.
            Harga menyesuaikan tier lokasi yang Anda pilih.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {VO_PACKAGES.map((p) => (
              <article
                key={p.id}
                className={`relative flex flex-col rounded-2xl border bg-card p-6 transition-all hover:shadow-lg ${
                  p.popular ? "border-primary shadow-md" : ""
                }`}
              >
                {p.popular && (
                  <Badge className="absolute -top-2.5 left-5 bg-primary text-primary-foreground border-0">
                    Paling Diminati
                  </Badge>
                )}
                <h3 className="text-lg font-bold">{p.name}</h3>
                <p className="mt-2 flex items-baseline gap-1.5">
                  <span className="text-2xl font-extrabold text-primary">{p.priceMonthly}</span>
                  <span className="text-sm text-muted-foreground">· {p.priceYearly}</span>
                </p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                <ul className="mt-4 space-y-2 text-sm flex-1">
                  {p.features.slice(0, 4).map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-primary" aria-hidden />
                      <span className="leading-snug">{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" aria-hidden /> {p.duration}
                </div>
                <a
                  href={waHref(`Halo, saya tertarik paket ${p.name}. Mohon info lengkap.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground shadow-md transition-all hover:brightness-110 min-h-[44px]"
                >
                  Ambil Paket Ini
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
                <Link
                  href={`/layanan/virtual-office-${p.id}`}
                  className="mt-2 text-center text-xs font-semibold text-primary hover:underline"
                >
                  Detail lengkap paket →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Keperluan */}
      <section id="keperluan" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12" aria-labelledby="keperluan-heading">
        <h2 id="keperluan-heading" className="text-2xl md:text-3xl font-bold text-center">
          Dipakai untuk Apa Saja?
        </h2>
        <p className="mt-3 text-center text-muted-foreground max-w-2xl mx-auto">
          Klik keperluan Anda — setiap kombinasi keperluan × lokasi punya halaman detail dengan harga spesifik.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {VO_PURPOSES.map((u) => (
            <div key={u.id} className="rounded-2xl border bg-card p-5">
              <h3 className="font-bold leading-snug">{u.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{u.desc}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {popularLocs.slice(0, 3).map((l) => (
                  <Link
                    key={l.slug}
                    href={`/layanan/vo-untuk-${u.id}-${l.slug}`}
                    className="rounded-full border bg-background px-2.5 py-1 text-[11px] font-medium transition-all hover:border-primary hover:text-primary"
                  >
                    {l.area}
                  </Link>
                ))}
                <Link
                  href={`/layanan/vo-untuk-${u.id}-di-jakarta-selatan`}
                  className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary transition-colors hover:bg-primary/15"
                >
                  + semua lokasi
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lokasi */}
      <section id="lokasi" className="bg-muted/40 border-y" aria-labelledby="lokasi-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <h2 id="lokasi-heading" className="text-2xl md:text-3xl font-bold text-center flex flex-wrap items-center justify-center gap-2">
            <MapPin className="h-6 w-6 text-primary" aria-hidden />
            48 Lokasi di 30 Kota
          </h2>
          <p className="mt-3 text-center text-muted-foreground max-w-2xl mx-auto">
            Lokasi premium: {premiumLocs.map((l) => l.name).join(" · ")} — dan 44 lokasi lain dari
            Sabang sampai Sorong (Papua Barat Daya).
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {VO_CITIES.slice(0, 12).map((c) => {
              const locs = c.locations
                .map((s) => VO_LOCATIONS.find((l) => l.slug === s))
                .filter((l): l is (typeof VO_LOCATIONS)[number] => Boolean(l));
              return (
                <div key={c.slug} className="rounded-2xl border bg-card p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-bold">
                      <Link href={`/layanan/virtual-office-di-${c.slug}`} className="hover:text-primary transition-colors">
                        {c.name}
                      </Link>
                    </h3>
                    <Badge variant="outline" className="text-[10px]">{c.demand}</Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{c.note}</p>
                  <ul className="mt-3 space-y-1.5 max-h-40 overflow-y-auto pr-1 [scrollbar-width:thin]">
                    {locs.map((l) => (
                      <li key={l.slug}>
                        <Link
                          href={`/layanan/virtual-office-address-${l.slug}`}
                          className="group flex items-start gap-1.5 text-sm hover:text-primary transition-colors"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-1 text-primary/60 group-hover:text-primary" aria-hidden />
                          <span className="leading-snug">
                            {l.building} <span className="text-muted-foreground">· {TIER_LABEL[l.tier]}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {VO_CITIES.slice(12).map((c) => (
              <Link
                key={c.slug}
                href={`/layanan/virtual-office-di-${c.slug}`}
                className="rounded-full border bg-card px-3.5 py-1.5 text-sm font-medium transition-all hover:border-primary hover:bg-primary/5 hover:text-primary"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Panduan */}
      <section id="panduan" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12" aria-labelledby="panduan-heading">
        <h2 id="panduan-heading" className="text-2xl md:text-3xl font-bold text-center">
          Panduan Virtual Office — Gratis
        </h2>
        <p className="mt-3 text-center text-muted-foreground max-w-2xl mx-auto">
          14 panduan mendalam ditulis tim legal kami — dari PPA, PKP, sampai strategi memilih lokasi.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {VO_GUIDES.map((g) => (
            <Link
              key={g.id}
              href={`/layanan/panduan-virtual-office-${g.id}`}
              className="group rounded-2xl border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-md"
            >
              <Badge variant="secondary" className="mb-2 text-[10px] uppercase tracking-wide">
                Panduan
              </Badge>
              <h3 className="font-bold leading-snug group-hover:text-primary transition-colors">{g.title}</h3>
              <p className="mt-2 text-xs text-muted-foreground line-clamp-2 leading-relaxed">{g.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted/40 border-y" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <h2 id="faq-heading" className="text-2xl md:text-3xl font-bold text-center mb-8">
            Pertanyaan yang Sering Diajukan
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="faq-1">
              <AccordionTrigger className="text-left text-[15px] font-semibold hover:text-primary hover:no-underline">
                Apakah virtual office bisa untuk NIB dan OSS-RBA?
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                Bisa. Sertifikat hak pakai alamat + surat keterangan domisili memenuhi syarat alamat usaha
                pada pendaftaran NIB via OSS-RBA untuk mayoritas skala usaha. Untuk sektor yang mewajibkan
                alamat operasional fisik (misal manufaktur), tim kami arahkan skema yang tepat sejak konsultasi awal.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-2">
              <AccordionTrigger className="text-left text-[15px] font-semibold hover:text-primary hover:no-underline">
                Apakah alamatnya bisa untuk PKP di KPP?
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                Bisa, dengan paket VO Plus Pajak: papan nama usaha terpasang, dokumen domisili lengkap berfoto,
                dan koordinasi survei KPP bila dipanggil. Kunci pengukuhan PKP adalah koherensi — alamat benar-benar
                ada, papan nama sesuai nama badan usaha, dan aktivitas usaha sesuai KBLI yang didaftarkan.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-3">
              <AccordionTrigger className="text-left text-[15px] font-semibold hover:text-primary hover:no-underline">
                Berapa harga paling murah?
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                Virtual Office Address mulai Rp 500rb/bulan (Rp 4,5jt/tahun) di lokasi smart-ekonomis, dan naik
                untuk lokasi premium (SCBD/Sudirman/Thamrin). Semua harga terbuka per lokasi di situs ini — tanpa
                biaya tersembunyi, dan pembayaran tahunan hemat 15-25%.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-4">
              <AccordionTrigger className="text-left text-[15px] font-semibold hover:text-primary hover:no-underline">
                Apakah PT PMA bisa pakai virtual office?
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                Bisa, via skema PPA (Penggunaan Penunjuk Alamat) — perjanjian resmi tertulis yang diterima BKPM,
                OSS-RBA dan bank. Paket VO PPA kami termasuk support bahasa Inggris, koordinasi notaris untuk
                pendirian PT PMA, dan pendampingan LKPM berkala.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-5">
              <AccordionTrigger className="text-left text-[15px] font-semibold hover:text-primary hover:no-underline">
                Apa yang terjadi jika ada surat/paket datang?
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                Resepsionis menerima, mencatat, dan mengirim foto label ke WhatsApp Anda di hari yang sama. Anda
                bisa ambil sendiri, minta scan isi (maks 1×24 jam), atau forward ke alamat lain. Surat berbatas
                waktu (tagihan pajak, somasi, undangan RUPS) selalu tercatat waktunya — ini proteksi legal, bukan
                fitur sampingan.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-6">
              <AccordionTrigger className="text-left text-[15px] font-semibold hover:text-primary hover:no-underline">
                Bisakah upgrade dari alamat ke serviced office nanti?
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                Sangat bisa — dan ini alur paling sehat. Bila Anda upgrade ke serviced office di lokasi yang sama,
                alamat perusahaan di dokumen legal (NIB, NPWP, akta) tidak perlu diubah sama sekali. Pada kontrak
                tahunan, pindah lokasi 1x gratis sesuai ketersediaan.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-gradient-to-br from-emerald-950 to-[oklch(0.23_0.03_165)] text-emerald-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-14 text-center">
          <Landmark className="mx-auto h-10 w-10 text-gold" aria-hidden />
          <h2 className="mt-4 text-2xl md:text-4xl font-extrabold tracking-tight">
            Alamat Anda yang Membisnis — Mulai Hari Ini
          </h2>
          <p className="mt-4 text-emerald-100/85 max-w-2xl mx-auto leading-relaxed">
            Konsultasi gratis: ceritakan usaha Anda, dan tim kami rekomendasikan lokasi + paket yang
            paling strategis. Aktivasi 1-2 hari kerja, dokumen legal lengkap, garansi uang kembali 100%.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={waHref("Halo PusatPerizinan.com, saya ingin mulai Virtual Office. Boleh konsultasi?")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 font-semibold text-white shadow-lg transition-all hover:brightness-105 min-h-[44px]"
            >
              <PhoneCall className="h-5 w-5" aria-hidden />
              Chat WhatsApp Sekarang
            </a>
            <a
              href="/#konsultasi"
              className="flex items-center justify-center gap-2 rounded-xl bg-emerald-50/10 border border-emerald-100/30 px-6 py-3.5 font-semibold transition-all hover:bg-emerald-50/20 min-h-[44px]"
            >
              Form Konsultasi Lengkap
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
