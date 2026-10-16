import type { Metadata } from "next";
import Link from "next/link";
import {
  BadgeCheck,
  CalendarCheck,
  Clock,
  FileText,
  Landmark,
  ListChecks,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { LeadForm } from "@/components/lead-form";
import { WHATSAPP_NUMBER, WHATSAPP_DISPLAY } from "@/lib/landing-data";
import { SITE_NAME, SITE_URL, absUrl } from "@/lib/site";

// ============================================================
// PUSATPERIZINAN.COM — /konsultasi (server component)
// Halaman CTA resmi "Konsultasi Gratis" — tujuan akhir funnel
// dari SELURUH CTA sitewide (header, footer, 500+ halaman layanan).
// SEO: JSON-LD WebPage + Service + FAQPage + BreadcrumbList.
// ============================================================

const PAGE_URL = absUrl("/konsultasi");

export const metadata: Metadata = {
  title: "Konsultasi Perizinan Usaha Gratis 30 Menit",
  description:
    "Konsultasi gratis 30 menit bersama konsultan senior: peta izin lengkap usaha Anda, rekomendasi KBLI teraman, estimasi biaya resmi, dan timeline jelas. Dijadwalkan ≤ 24 jam via WhatsApp, Zoom, atau kantor SCBD. Tanpa komitmen.",
  keywords: [
    "konsultasi perizinan gratis",
    "konsultan perizinan usaha",
    "konsultasi izin usaha online",
    "konsultasi gratis pendirian pt",
    "jasa konsultan izin murah",
    "konsultasi nib oss gratis",
    "konsultan perizinan jakarta",
  ],
  alternates: { canonical: "/konsultasi" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Konsultasi Perizinan Usaha Gratis 30 Menit — PusatPerizinan.com",
    description:
      "30 menit bersama konsultan senior: peta izin usaha Anda, KBLI teraman, estimasi biaya & timeline. Dijadwalkan ≤ 24 jam. Gratis & tanpa komitmen.",
    url: "/konsultasi",
    siteName: SITE_NAME,
    type: "website",
    locale: "id_ID",
  },
};

const WA_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Halo PusatPerizinan, saya ingin menjadwalkan konsultasi gratis 30 menit untuk izin usaha saya."
)}`;

const WHAT_YOU_GET = [
  "Analisis kebutuhan izin sesuai bidang & skala usaha Anda",
  "Daftar izin wajib + estimasi biaya resmi negara per item",
  "Rekomendasi KBLI paling aman & menguntungkan (pajak & peluang)",
  "Timeline realistis: urutan pengurusan yang paling hemat waktu",
  "Deteksi risiko: denda, sanksi, dan kewajiban pasca-terbit (LKPM dll.)",
  "Rekam jejak konsultasi dikirim ke WhatsApp Anda setelah sesi",
];

const TOPICS = [
  {
    icon: Landmark,
    title: "Pilihan Badan Usaha",
    desc: "Perseorangan, CV, PT Perorangan, atau PT — mana yang paling efisien untuk modal dan rencana Anda.",
  },
  {
    icon: ListChecks,
    title: "Peta Izin Lengkap",
    desc: "NIB, sertifikat standar, izin sektor (halal, BPOM/PIRT, PBG/SLF, AMDAL) — tidak ada yang terlewat.",
  },
  {
    icon: FileText,
    title: "KBLI Strategis",
    desc: "Kode lapangan usaha yang menentukan kewajiban pajak, kelonggaran insentif, dan peluang ekspansi.",
  },
  {
    icon: Clock,
    title: "Timeline & Biaya",
    desc: "Berapa lama dan berapa total — biaya jasa kami vs biaya resmi negara/notaris yang ditagih terpisah.",
  },
  {
    icon: ShieldCheck,
    title: "Mitigasi Sanksi",
    desc: "Jatuh tempo LKPM, pajak, dan perizinan berkala — supaya izin Anda tidak hangus atau kena denda.",
  },
  {
    icon: CalendarCheck,
    title: "Rencana Ekspansi",
    desc: "PMA, ekspor impor, tender, pengajuan financing — struktur legal yang siap sejak awal.",
  },
];

const STEPS = [
  {
    n: "1",
    t: "Isi form atau chat WA",
    d: "Ceritakan usaha Anda dalam 2–3 kalimat. Respons tim kami < 15 menit pada jam operasional.",
  },
  {
    n: "2",
    t: "Sesi 30 menit 1-on-1",
    d: "Via WhatsApp call, Zoom, atau langsung di kantor SCBD Jakarta — Anda pilih yang paling nyaman.",
  },
  {
    n: "3",
    t: "Terima ringkasan tertulis",
    d: "Peta izin + estimasi biaya + timeline dikirim ke WhatsApp Anda. Bisa dipakai sebagai DP jasa lanjutan.",
  },
];

const MINI_FAQ = [
  {
    q: "Benar-benar gratis? Ada biaya tersembunyi?",
    a: "Gratis 100%, tanpa komitmen. Jika setelah konsultasi Anda lanjut menggunakan jasa kami, sesi ini diakui sebagai bagian dari layanan — tidak ada tagihan tambahan.",
  },
  {
    q: "Berapa lama saya harus menunggu?",
    a: "Setelah form terkirim, admin menghubungi WhatsApp Anda untuk menjadwalkan — umumnya ≤ 24 jam kerja (Senin–Sabtu, 08.00–20.00 WIB).",
  },
  {
    q: "Usaha saya masih ide, belum jalan. Bisa?",
    a: "Bisa, justru ideal. Anda mendapat peta izin dan estimasi biaya sejak perencanaan — banyak klien kami mulai dari sini.",
  },
  {
    q: "Saya di luar Jakarta/Bandung, bagaimana?",
    a: "Sepenuhnya online via WhatsApp/Zoom. Kami melayani 38 provinsi dan 514 kabupaten/kota — proses perizinan mayoritas sudah daring.",
  },
  {
    q: "Apa yang harus saya siapkan sebelum sesi?",
    a: "Cukup gambaran usaha (bidang, lokasi, skala) dan KTP pemilik. Dokumen lain menyusul jika Anda lanjut pengurusan.",
  },
  {
    q: "Bisakah langsung dikerjakan setelah konsultasi?",
    a: "Ya. Setelah Anda setuju dengan penawaran, tim langsung mengeksekusi — NIB bisa terbit 1 hari kerja, pendirian PT rata-rata 3 hari.",
  },
];

// JSON-LD: WebPage + Service + FAQPage + BreadcrumbList
const konsultasiJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/konsultasi#webpage`,
      url: PAGE_URL,
      name: "Konsultasi Perizinan Usaha Gratis 30 Menit",
      description:
        "Konsultasi gratis 30 menit bersama konsultan senior perizinan: peta izin, KBLI teraman, estimasi biaya, timeline. Dijadwalkan ≤ 24 jam.",
      inLanguage: "id",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/konsultasi#service` },
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}/konsultasi#service`,
      name: "Konsultasi Perizinan Usaha 30 Menit",
      serviceType: "Business licensing consultation",
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: "Indonesia",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "IDR",
        availability: "https://schema.org/InStock",
        url: PAGE_URL,
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/konsultasi#faqpage`,
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
        { "@type": "ListItem", position: 2, name: "Konsultasi Gratis", item: PAGE_URL },
      ],
    },
  ],
};

export default function KonsultasiPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(konsultasiJsonLd) }}
      />
      <Header />
      <main className="min-h-screen bg-background">
        {/* ===== HERO ===== */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-b pt-24 md:pt-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-10 md:pb-14">
            <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary">Beranda</Link>
              <span className="mx-1.5">/</span>
              <span className="font-medium text-foreground">Konsultasi Gratis</span>
            </nav>
            <Badge className="bg-primary text-primary-foreground border-0 mb-4">
              <Sparkles className="h-3 w-3 mr-1" aria-hidden /> GRATIS 30 MENIT · TANPA KOMITMEN
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-balance max-w-3xl">
              Konsultasi Perizinan Usaha{" "}
              <span className="bg-gradient-to-r from-primary to-gold bg-clip-text text-transparent">Gratis 30 Menit</span>
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              30 menit 1-on-1 bersama konsultan senior: Anda keluar dengan{" "}
              <strong className="text-foreground">peta izin lengkap, KBLI teraman, estimasi biaya, dan timeline jelas</strong>{" "}
              — untuk semua jenis usaha, di 38 provinsi Indonesia.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-primary" aria-hidden /> Respons &lt; 15 menit
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-primary" aria-hidden /> 46+ pakar lintas disiplin
              </span>
              <span className="flex items-center gap-1.5">
                <BadgeCheck className="h-4 w-4 text-primary" aria-hidden /> 1.247 klien · rating 4,9/5
              </span>
            </div>
          </div>
        </section>

        {/* ===== FORM + PANEL ===== */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 md:py-14" aria-labelledby="form-heading">
          <h2 id="form-heading" className="sr-only">Formulir penjadwalan konsultasi</h2>
          <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr] items-start">
            {/* Form */}
            <div className="rounded-2xl border bg-card p-6 md:p-8 shadow-sm">
              <h3 className="text-xl font-bold">Jadwalkan Sekarang — Gratis</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Isi 3 kolom ini. Tim kami menghubungi WhatsApp Anda untuk atur jadwal — umumnya &lt; 15 menit.
              </p>
              <div className="mt-6">
                <LeadForm
                  source="konsultasi"
                  cta="Kirim — Jadwalkan Konsultasi Saya"
                  note="Dengan mengirim, Anda setuju dihubungi tim kami via WhatsApp. Data Anda aman sesuai Kebijakan Privasi (UU PDP 27/2022)."
                  needs={[
                    { value: "Kuliner / F&B", label: "Kuliner / F&B" },
                    { value: "Retail / Toko", label: "Retail / Toko" },
                    { value: "Jasa / Konsultan", label: "Jasa / Konsultan" },
                    { value: "Konstruksi / Properti", label: "Konstruksi / Properti" },
                    { value: "Kesehatan / Klinik", label: "Kesehatan / Klinik" },
                    { value: "Manufaktur / Pabrik", label: "Manufaktur / Pabrik" },
                    { value: "Travel Ibadah (Haji/Umroh)", label: "Travel Ibadah (Haji/Umroh)" },
                    { value: "Tambang / Energi", label: "Tambang / Energi" },
                    { value: "Digital / Startup", label: "Digital / Startup" },
                    { value: "Logistik / Transportasi", label: "Logistik / Transportasi" },
                    { value: "Pariwisata / Hotel", label: "Pariwisata / Hotel" },
                    { value: "Pendidikan", label: "Pendidikan" },
                    { value: "Lainnya", label: "Lainnya" },
                  ]}
                />
              </div>
            </div>

            {/* Panel: what you get + WA */}
            <div className="space-y-6 lg:sticky lg:top-24">
              <div className="rounded-2xl border bg-gradient-to-br from-primary/10 via-card to-card p-6 md:p-7 shadow-sm">
                <h3 className="font-bold text-lg">Yang Anda Dapatkan dalam 30 Menit</h3>
                <ul className="mt-4 space-y-3">
                  {WHAT_YOU_GET.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm leading-relaxed">
                      <BadgeCheck className="h-5 w-5 shrink-0 text-primary mt-0.5" aria-hidden />
                      <span className="text-foreground/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border bg-card p-6 shadow-sm">
                <h3 className="font-bold">Lebih Suka Langsung Chat?</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Klik tombol di bawah — chat WhatsApp kami langsung terbuka dengan template pesan siap kirim.
                </p>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 font-semibold text-white shadow-lg transition-all hover:brightness-105 min-h-[44px]"
                >
                  <PhoneCall className="h-5 w-5" aria-hidden />
                  WhatsApp {WHATSAPP_DISPLAY}
                </a>
                <p className="mt-3 text-xs text-muted-foreground text-center">
                  Senin–Sabtu, 08.00–20.00 WIB · Kantor: SCBD Lot 13, Jakarta Selatan
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== CARA KERJA ===== */}
        <section className="bg-secondary/40 border-y" aria-labelledby="cara-heading">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <h2 id="cara-heading" className="text-2xl md:text-3xl font-extrabold tracking-tight text-center">
              Tiga Langkah, Selesai dalam 24 Jam
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {STEPS.map((s) => (
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

        {/* ===== TOPIK ===== */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-16" aria-labelledby="topik-heading">
          <h2 id="topik-heading" className="text-2xl md:text-3xl font-extrabold tracking-tight text-center">
            Apa Saja yang Bisa Anda Tanyakan?
          </h2>
          <p className="mt-3 text-center text-muted-foreground max-w-2xl mx-auto">
            Sesi ini milik Anda. Enam topik inilah yang paling sering dibahas — bawa pertanyaan Anda sendiri, kami siap.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TOPICS.map((t) => (
              <div key={t.title} className="rounded-2xl border bg-card p-6 hover:shadow-md transition-shadow">
                <t.icon className="h-6 w-6 text-primary" aria-hidden />
                <h3 className="mt-3 font-semibold">{t.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="bg-secondary/40 border-y" aria-labelledby="faq-heading">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <h2 id="faq-heading" className="text-2xl md:text-3xl font-extrabold tracking-tight text-center">
              Pertanyaan Sebelum Sesi
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
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Masih ada pertanyaan lain? Lihat{" "}
              <Link href="/faq" className="font-semibold text-primary hover:underline">51 FAQ lengkap</Link> kami.
            </p>
          </div>
        </section>

        {/* ===== RELATED + CTA ===== */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="rounded-2xl border bg-card p-6 md:p-8 text-center shadow-sm">
            <h2 className="text-xl md:text-2xl font-extrabold tracking-tight">
              Siap Urus Izin, Tinggal Terima Beres?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-xl mx-auto">
              Sebelum sesi, kenali dulu kebutuhan Anda lewat alat gratis kami — atau langsung lanjut pakai jasa lengkap kami.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3 text-sm">
              <Link href="/cek-izin" className="rounded-full border bg-background px-4 py-2.5 font-semibold hover:border-primary/50 hover:text-primary transition-colors min-h-[44px] inline-flex items-center">
                ✨ Cek Izin AI — 60 Detik
              </Link>
              <Link href="/kalkulator" className="rounded-full border bg-background px-4 py-2.5 font-semibold hover:border-primary/50 hover:text-primary transition-colors min-h-[44px] inline-flex items-center">
                💰 Kalkulator Biaya
              </Link>
              <Link href="/paket" className="rounded-full border bg-background px-4 py-2.5 font-semibold hover:border-primary/50 hover:text-primary transition-colors min-h-[44px] inline-flex items-center">
                📦 Paket & Harga
              </Link>
              <Link href="/panduan" className="rounded-full border bg-background px-4 py-2.5 font-semibold hover:border-primary/50 hover:text-primary transition-colors min-h-[44px] inline-flex items-center">
                📚 Panduan Perizinan
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
