import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, FileSpreadsheet, Landmark, PiggyBank, ShieldCheck, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { CostCalculator } from "@/components/landing/cost-calculator";
import { SITE_NAME, SITE_URL, absUrl } from "@/lib/site";

// ============================================================
// PUSATPERIZINAN.COM — /kalkulator (server component)
// Halaman CTA resmi "Kalkulator Biaya" — estimasi anggaran izin.
// Mereuse <CostCalculator /> dari landing; dibungkus konten SEO.
// JSON-LD: WebPage + WebApplication + FAQPage + BreadcrumbList.
// ============================================================

const PAGE_URL = absUrl("/kalkulator");

export const metadata: Metadata = {
  title: "Kalkulator Biaya Perizinan Usaha — Hitung Anggaran, Gratis",
  description:
    "Hitung estimasi biaya pengurusan izin usaha Anda: NIB/OSS, pendirian PT/CV, sertifikasi halal, BPOM/PIRT, PBG/SLF, AMDAL — biaya jasa konsultan vs biaya resmi negara, transparan tanpa biaya tersembunyi. Gratis.",
  keywords: [
    "kalkulator biaya perizinan",
    "biaya izin usaha",
    "biaya pendirian pt",
    "biaya nib oss",
    "biaya sertifikasi halal",
    "biaya izin bpom",
    "estimasi biaya izin usaha",
    "hitung biaya izin online",
  ],
  alternates: { canonical: "/kalkulator" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Kalkulator Biaya Perizinan Usaha — Gratis & Transparan | PusatPerizinan.com",
    description:
      "Estimasi anggaran izin usaha Anda dalam 1 menit: jasa konsultan + biaya resmi negara, rinci per item. Tanpa biaya tersembunyi.",
    url: "/kalkulator",
    siteName: SITE_NAME,
    type: "website",
    locale: "id_ID",
  },
};

const COST_COMPONENTS = [
  {
    icon: Landmark,
    t: "Biaya Resmi Negara",
    d: "PNBP OSS, permohonan notaris, materai, dan biaya instansi — ditagih sesuai tarif resmi, kami teruskan apa adanya dengan bukti.",
  },
  {
    icon: PiggyBank,
    t: "Jasa Konsultan",
    d: "Fee tetap yang Anda lihat di kalkulator dan halaman paket — tidak ada biaya kejutan di tengah jalan.",
  },
  {
    icon: FileSpreadsheet,
    t: "Opsional Sesuai Kebutuhan",
    d: "Domisili, virtual office, NPWP, pengukuhan PKP, ISO — masuk hitungan hanya jika Anda memang membutuhkannya.",
  },
];

const MINI_FAQ = [
  {
    q: "Apakah angka hasil kalkulator adalah harga final?",
    a: "Angka kalkulator adalah estimasi komponen jasa kami (fee konsultan). Biaya resmi negara/notaris ditagihkan terpisah sesuai tarif instansi dan zona wilayah — konsultan kami menguraikannya transparan sebelum Anda bayar.",
  },
  {
    q: "Kenapa ada biaya resmi negara yang tidak saya dengar sebelumnya?",
    a: "Banyak biaya kecil yang sering tidak disebut penjual layanan murah: PNBP, materai, konsultasi notaris, legalisasi, domisili. Kalkulator ini justru dirancang agar Anda tahu total biaya sejak awal — tidak ada kejutan.",
  },
  {
    q: "Apakah lebih murah urus sendiri?",
    a: "Untuk izin paling sederhana (NIB mikro), bisa. Namun pemilihan KBLI yang salah bisa membuat Anda bayar pajak lebih mahal atau gagal mengakses insentif — dan waktu Anda punya nilai. Gunakan Cek Izin AI untuk melihat seberapa kompleks usaha Anda.",
  },
  {
    q: "Bisa bayar cicil?",
    a: "Ya — skema termin 50/50 tersedia untuk paket utama: 50% saat mulai, 50% setelah izin utama terbit. Lihat detailnya di halaman Paket & Harga atau tanyakan saat konsultasi gratis.",
  },
  {
    q: "Apakah ada garansi?",
    a: "Ada. Garansi 100% uang kembali bila izin yang kami janjikan tidak terbit karena kesalahan proses kami. Syarat & cakupan dijelaskan tertulis di setiap penawaran.",
  },
  {
    q: "Kenapa harga kalkulator beda dengan toko perizinan murah online?",
    a: "Banyak penawaran murah hanya mencakup berkas awal — biaya lanjutan muncul setelah Anda jalan. Kami menampilkan komponen biaya terbuka, beri garansi tertulis, dan didukung kantor fisik di SCBD Jakarta & Bandung.",
  },
];

// JSON-LD: WebPage + WebApplication + FAQPage + BreadcrumbList
const kalkulatorJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/kalkulator#webpage`,
      url: PAGE_URL,
      name: "Kalkulator Biaya Perizinan Usaha — Hitung Anggaran, Gratis",
      description:
        "Estimasi biaya pengurusan izin usaha: jasa konsultan vs biaya resmi negara, transparan per item, gratis dipakai.",
      inLanguage: "id",
      isPartOf: { "@id": `${SITE_URL}/#website` },
    },
    {
      "@type": "WebApplication",
      "@id": `${SITE_URL}/kalkulator#app`,
      name: "Kalkulator Biaya Perizinan — PusatPerizinan.com",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "IDR" },
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/kalkulator#faqpage`,
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
        { "@type": "ListItem", position: 2, name: "Kalkulator Biaya", item: PAGE_URL },
      ],
    },
  ],
};

export default function KalkulatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(kalkulatorJsonLd) }}
      />
      <Header />
      <main className="min-h-screen bg-background">
        {/* ===== HERO ===== */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-b pt-24 md:pt-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-10 md:pb-14">
            <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary">Beranda</Link>
              <span className="mx-1.5">/</span>
              <span className="font-medium text-foreground">Kalkulator Biaya</span>
            </nav>
            <Badge className="bg-primary/10 text-primary border border-primary/20 mb-4">
              <Calculator className="h-3 w-3 mr-1" aria-hidden /> GRATIS · TRANSPARAN · TANPA BIAYA TERSEMBUNYI
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-balance max-w-3xl">
              Kalkulator{" "}
              <span className="bg-gradient-to-r from-primary to-gold bg-clip-text text-transparent">Biaya Perizinan</span>{" "}
              Usaha
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Pilih layanan, skala usaha, dan kebutuhan Anda — dapatkan{" "}
              <strong className="text-foreground">estimasi anggaran terperinci</strong> dalam 1 menit: jasa konsultan dan
              komponen biaya resmi negara, tanpa kejutan di tengah jalan.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Wallet className="h-4 w-4 text-primary" aria-hidden /> Rincian per item
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-primary" aria-hidden /> Garansi 100% uang kembali
              </span>
              <span className="flex items-center gap-1.5">
                <PiggyBank className="h-4 w-4 text-primary" aria-hidden /> Termin 50/50 tersedia
              </span>
            </div>
          </div>
        </section>

        {/* ===== TOOL (reuse landing CostCalculator) ===== */}
        <CostCalculator />

        {/* ===== KOMPONEN BIAYA ===== */}
        <section className="bg-secondary/40 border-y" aria-labelledby="komponen-heading">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <h2 id="komponen-heading" className="text-2xl md:text-3xl font-extrabold tracking-tight text-center">
              Apa Saja yang Masuk dalam Biaya?
            </h2>
            <p className="mt-3 text-center text-muted-foreground max-w-2xl mx-auto">
              Kami pisahkan tiga komponen ini sejak awal — prinsip yang membuat 1.247 klien mempercayakan izinnya kepada kami.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {COST_COMPONENTS.map((c) => (
                <div key={c.t} className="rounded-2xl border bg-card p-6">
                  <c.icon className="h-6 w-6 text-primary" aria-hidden />
                  <h3 className="mt-3 font-semibold">{c.t}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{c.d}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Ingin rincian harga per layanan, langsung? Buka{" "}
              <Link href="/biaya" className="font-semibold text-primary hover:underline">Rincian Biaya</Link> atau{" "}
              <Link href="/bandingkan" className="font-semibold text-primary hover:underline">bandingkan paket</Link>.
            </p>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 md:py-16" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-2xl md:text-3xl font-extrabold tracking-tight text-center">
            Pertanyaan Umum tentang Biaya
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

        {/* ===== CTA ===== */}
        <section className="bg-secondary/40 border-y">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="rounded-2xl border bg-card p-6 md:p-8 text-center shadow-sm">
              <h2 className="text-xl md:text-2xl font-extrabold tracking-tight">
                Anggaran Sudah Ada? Jadwalkan Eksekusinya.
              </h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-xl mx-auto">
                Konsultasi gratis 30 menit: kami rapikan urutan izin, kunci KBLI paling efisien, dan mulai hari itu juga bila Anda siap.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3 text-sm">
                <Link href="/cek-izin" className="rounded-full border bg-background px-4 py-2.5 font-semibold hover:border-primary/50 hover:text-primary transition-colors min-h-[44px] inline-flex items-center">
                  ✨ Cek Izin AI — 60 Detik
                </Link>
                <Link href="/paket" className="rounded-full border bg-background px-4 py-2.5 font-semibold hover:border-primary/50 hover:text-primary transition-colors min-h-[44px] inline-flex items-center">
                  📦 Paket & Harga
                </Link>
                <Link href="/konsultasi" className="rounded-full bg-primary px-4 py-2.5 font-semibold text-primary-foreground shadow-md shadow-primary/25 hover:brightness-105 transition-all min-h-[44px] inline-flex items-center">
                  🎯 Konsultasi Gratis 30 Menit
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
