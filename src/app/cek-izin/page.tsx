import type { Metadata } from "next";
import Link from "next/link";
import { Bot, Clock, Gift, ListChecks, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { LicenseChecker } from "@/components/landing/license-checker";
import { SITE_NAME, SITE_URL, absUrl } from "@/lib/site";

// ============================================================
// PUSATPERIZINAN.COM — /cek-izin (server component)
// Halaman CTA resmi "Cek Izin AI" — tool analisis izin 60 detik.
// Mereuse <LicenseChecker /> dari landing; dibungkus konten SEO.
// JSON-LD: WebPage + SoftwareApplication + FAQPage + BreadcrumbList.
// ============================================================

const PAGE_URL = absUrl("/cek-izin");

export const metadata: Metadata = {
  title: "Cek Izin Usaha AI — Analisis Kebutuhan Izin 60 Detik, Gratis",
  description:
    "Ketik jenis usaha Anda — AI menganalisis izin apa saja yang wajib diurus: NIB/OSS, sertifikat standar, izin sektor (halal, BPOM, PBG/SLF, AMDAL), KBLI teraman, dan estimasi waktunya. Hasil instan, 100% gratis.",
  keywords: [
    "cek izin usaha",
    "cek izin online",
    "ai cek izin",
    "izin apa saja untuk usaha saya",
    "daftar izin usaha kuliner",
    "izin usaha wajib",
    "cek kebutuhan izin gratis",
    "simulasi izin usaha",
  ],
  alternates: { canonical: "/cek-izin" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Cek Izin Usaha dengan AI — Hasil 60 Detik, Gratis | PusatPerizinan.com",
    description:
      "Ketik jenis usaha → AI menyusun peta izin wajib, KBLI teraman, dan estimasi waktu. Gratis, tanpa daftar akun.",
    url: "/cek-izin",
    siteName: SITE_NAME,
    type: "website",
    locale: "id_ID",
  },
};

const HOW_IT_WORKS = [
  {
    n: "1",
    t: "Deskripsikan usaha Anda",
    d: "Cukup 1–2 kalimat: \"kafe di Bandung dengan roastery sendiri\" atau \"jasa konstruksi gedung 2 lantai\". Semakin spesifik, semakin tajam hasilnya.",
  },
  {
    n: "2",
    t: "AI menganalisis 60 detik",
    d: "Engine kami mencocokkan usaha Anda dengan KBLI, level risiko OSS-RBA, dan peraturan sektor — basisnya regulasi terkini.",
  },
  {
    n: "3",
    t: "Terima peta izin Anda",
    d: "Daftar izin wajib + opsional, urutan pengerjaan, dan estimasi waktu. Mau lanjut? Konsultan kami merapikan 1-on-1, gratis.",
  },
];

const MINI_FAQ = [
  {
    q: "Apakah hasil Cek Izin AI akurat?",
    a: "AI kami bekerja di atas basis pengetahuan regulasi Indonesia (UU Cipta Kerja, PP 5/2021, Peraturan OSS, peraturan sektor) dan dipantau konsultan senior. Hasilnya adalah peta awal yang sangat andal — untuk kepastian hukum final, konsultan kami memverifikasi 1-on-1 secara gratis setelahnya.",
  },
  {
    q: "Apakah benar gratis? Datanya dijual?",
    a: "Gratis 100%, tanpa kartu kredit. Kami tidak menjual data Anda. Jika Anda tinggalkan WhatsApp untuk dihubungi konsultan, itu pilihan Anda — sesuai Kebijakan Privasi UU PDP 27/2022.",
  },
  {
    q: "Apa bedanya dengan cek di OSS sendiri?",
    a: "OSS hanya menampilkan katalog saat Anda sudah tahu KBLI dan alurnya. Cek Izin AI mulai dari bahasa sehari-hari Anda, lalu menyusun urutan izin, KBLI yang aman untuk pajak, dan apa yang sering terlewat pemula.",
  },
  {
    q: "Usaha online/tokopedia/shopee perlu izin?",
    a: "Ya — umumnya NIB + sertifikat standar sesuai level risiko, plus izin spesifik bila Anda memasarkan pangan, kosmetik, atau obat. Coba ketik usaha online Anda di tool ini untuk peta lengkapnya.",
  },
  {
    q: "Setelah dapat peta izin, lalu apa?",
    a: "Tiga pilihan: (1) urus sendiri memakai panduan kami di /panduan, (2) lanjut konsultasi gratis 30 menit untuk merapikan rencana, (3) serahkan penuh ke kami — NIB 1 hari, PT 3 hari, garansi 100%.",
  },
  {
    q: "Bahasa lain didukung?",
    a: "Ya — ketik dalam English, 中文, العربية, dan 27 bahasa lainnya; AI kami menjawab dalam bahasa yang sama.",
  },
];

// JSON-LD: WebPage + SoftwareApplication + FAQPage + BreadcrumbList
const cekIzinJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/cek-izin#webpage`,
      url: PAGE_URL,
      name: "Cek Izin Usaha AI — Analisis Kebutuhan Izin 60 Detik",
      description:
        "Tool AI gratis untuk menganalisis izin wajib, KBLI teraman, dan estimasi waktu pengurusan usaha Anda di Indonesia.",
      inLanguage: "id",
      isPartOf: { "@id": `${SITE_URL}/#website` },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/cek-izin#app`,
      name: "Cek Izin AI — PusatPerizinan.com",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "IDR" },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "890",
      },
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/cek-izin#faqpage`,
      mainEntity: MINI_FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Cek Izin AI", item: PAGE_URL },
      ],
    },
  ],
};

export default function CekIzinPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cekIzinJsonLd) }}
      />
      <Header />
      <main className="min-h-screen bg-background">
        {/* ===== HERO ===== */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-b pt-24 md:pt-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-10 md:pb-14">
            <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary">Beranda</Link>
              <span className="mx-1.5">/</span>
              <span className="font-medium text-foreground">Cek Izin AI</span>
            </nav>
            <Badge className="bg-primary/10 text-primary border border-primary/20 mb-4">
              <Sparkles className="h-3 w-3 mr-1" aria-hidden /> GRATIS · TANPA DAFTAR AKUN
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-balance max-w-3xl">
              Cek Izin Usaha dengan{" "}
              <span className="bg-gradient-to-r from-primary to-gold bg-clip-text text-transparent">AI — 60 Detik</span>
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Tuliskan usaha Anda dengan bahasa sehari-hari. AI menyusun{" "}
              <strong className="text-foreground">peta izin wajib, KBLI paling aman, dan urutan pengerjaan</strong>{" "}
              — lalu konsultan senior memverifikasinya untuk Anda, gratis.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-primary" aria-hidden /> Hasil ~60 detik
              </span>
              <span className="flex items-center gap-1.5">
                <Gift className="h-4 w-4 text-primary" aria-hidden /> Gratis, tanpa kartu kredit
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-primary" aria-hidden /> Berbasis regulasi terkini
              </span>
              <span className="flex items-center gap-1.5">
                <Bot className="h-4 w-4 text-primary" aria-hidden /> 30 bahasa didukung
              </span>
            </div>
          </div>
        </section>

        {/* ===== TOOL (reuse landing LicenseChecker) ===== */}
        <LicenseChecker />

        {/* ===== CARA KERJA ===== */}
        <section className="bg-secondary/40 border-y" aria-labelledby="cara-heading">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <h2 id="cara-heading" className="text-2xl md:text-3xl font-extrabold tracking-tight text-center">
              Cara Kerja Cek Izin AI
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {HOW_IT_WORKS.map((s) => (
                <div key={s.n} className="rounded-2xl border bg-card p-6">
                  <div className="h-9 w-9 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center">
                    {s.n}
                  </div>
                  <h3 className="mt-3 font-semibold">{s.t}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 md:py-16" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-2xl md:text-3xl font-extrabold tracking-tight text-center">
            Pertanyaan Umum tentang Cek Izin AI
          </h2>
          <div className="mt-8 space-y-3">
            {MINI_FAQ.map((f) => (
              <details key={f.q} className="group rounded-xl border bg-card px-5 py-4 open:shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-semibold text-[15px]">
                  {f.q}
                  <span className="text-primary transition-transform group-open:rotate-45" aria-hidden>＋</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ===== CROSS-LINK ALAT & CTA ===== */}
        <section className="bg-secondary/40 border-y">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="rounded-2xl border bg-card p-6 md:p-8 text-center shadow-sm">
              <h2 className="text-xl md:text-2xl font-extrabold tracking-tight">
                Lanjutkan Perjalanan Legalitas Anda
              </h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-xl mx-auto">
                Peta izin sudah di tangan? Estimasi biayanya, baca panduannya, atau langsung jadwalkan konsultasi gratis.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3 text-sm">
                <Link href="/kalkulator" className="rounded-full border bg-background px-4 py-2.5 font-semibold hover:border-primary/50 hover:text-primary transition-colors min-h-[44px] inline-flex items-center">
                  💰 Kalkulator Biaya
                </Link>
                <Link href="/kalkulator-pajak" className="rounded-full border bg-background px-4 py-2.5 font-semibold hover:border-primary/50 hover:text-primary transition-colors min-h-[44px] inline-flex items-center">
                  🧾 Kalkulator Pajak
                </Link>
                <Link href="/cek-dokumen" className="rounded-full border bg-background px-4 py-2.5 font-semibold hover:border-primary/50 hover:text-primary transition-colors min-h-[44px] inline-flex items-center">
                  📷 Cek Dokumen
                </Link>
                <Link href="/panduan" className="rounded-full border bg-background px-4 py-2.5 font-semibold hover:border-primary/50 hover:text-primary transition-colors min-h-[44px] inline-flex items-center">
                  📚 Panduan Perizinan
                </Link>
                <Link href="/konsultasi" className="rounded-full bg-primary px-4 py-2.5 font-semibold text-primary-foreground shadow-md shadow-primary/25 hover:brightness-105 transition-all min-h-[44px] inline-flex items-center">
                  <ListChecks className="h-4 w-4 mr-1.5" aria-hidden /> Konsultasi Gratis 30 Menit
                </Link>
              </div>
              <p className="mt-4 text-xs text-muted-foreground flex items-center justify-center gap-1.5">
                <Clock className="h-3.5 w-3.5" aria-hidden /> Respons konsultan &lt; 15 menit, Senin–Sabtu 08.00–20.00 WIB
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
