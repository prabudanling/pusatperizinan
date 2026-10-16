import type { Metadata } from "next";
import Link from "next/link";
import {
  Award,
  BadgeCheck,
  BookOpenCheck,
  Building2,
  CalendarCheck,
  CheckCircle2,
  FileSignature,
  GraduationCap,
  Handshake,
  Landmark,
  MapPin,
  Megaphone,
  MessageCircle,
  Percent,
  Rocket,
  ShieldCheck,
  Sparkles,
  Store,
  Target,
  Users,
} from "lucide-react";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { LeadForm } from "@/components/lead-form";
import { PartnerProfitSimulator } from "@/components/landing/partner-profit-simulator";
import { SITE_NAME, SITE_URL, absUrl, TRUST_METRICS } from "@/lib/site";
import { WHATSAPP_NUMBER } from "@/lib/landing-data";

// ============================================================
// PUSATPERIZINAN.COM — /mitra
// PROGRAM KEMITRAAN CABANG RESMI ("Pusat Partner Network")
// Model hub-and-spoke: mitra membuka kantor cabang di kotanya,
// SELURUH proses izin diolah di Pusat (SCBD Jakarta) — mitra
// cukup menyambut klien, serah terima dokumen, dan jaga relasi.
// SEO: JSON-LD WebPage + Service(3 Offer) + FAQPage + Breadcrumb.
// ============================================================

const PAGE_URL = absUrl("/mitra");

export const metadata: Metadata = {
  title: "Program Kemitraan Cabang Resmi — Franchise Jasa Perizinan No.1",
  description:
    "Buka cabang resmi PusatPerizinan.com di kota Anda: Anda sambut klien, PUSAT yang mengurus seluruh proses izin. Komisi hingga 45%, lead nasional mengalir, akademi 7 hari, garansi tertulis. Kuota wilayah terbatas — ajukan hari ini.",
  keywords: [
    "program kemitraan perizinan",
    "franchise jasa perizinan",
    "peluang usaha jasa perizinan",
    "jadi cabang pusatperizinan",
    "agen perizinan usaha",
    "kemitraan konsultan legalitas",
    "bisnis jasa izin usaha",
    "franchise konsultan perizinan indonesia",
    "peluang bisnis 2026 tanpa pengalaman",
    "usaha jasa legalitas usaha",
  ],
  alternates: { canonical: "/mitra" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Program Kemitraan Cabang Resmi PusatPerizinan.com",
    description:
      "Anda buka kantor, pusat yang mengurus segalanya. Komisi hingga 45% + lead nasional mengalir ke cabang Anda. Kuota wilayah terbatas.",
    url: "/mitra",
    siteName: SITE_NAME,
    type: "website",
    locale: "id_ID",
  },
};

/* ---------------- Data program ---------------- */

const TRUST_STRIP = [
  { value: `${TRUST_METRICS.rating}/5`, label: `${TRUST_METRICS.reviewCount} ulasan klien` },
  { value: TRUST_METRICS.clientsServed, label: "klien terlayani" },
  { value: TRUST_METRICS.permitsIssued, label: "izin berhasil diproses" },
  { value: `${TRUST_METRICS.provinces}/${TRUST_METRICS.cities}`, label: "provinsi / kota terjangkau" },
  { value: "500+", label: "layanan dalam katalog" },
];

/** Konsep inti: pembagian peran cabang vs pusat. */
const BRANCH_DUTIES = {
  title: "Di Kantor Cabang Anda",
  tagline: "Wajah merek & pemilik relasi",
  items: [
    "Menyambut & mengedukasi calon klien (materi presentasi kami sediakan)",
    "Menerima berkas awal dengan checklist baku dari pusat",
    "Menjaga hubungan & memberi update progres via dashboard mitra",
    "Membuka jaringan lokal: komunitas, BUMDes, kampus, asosiasi",
  ],
};

const HQ_DUTIES = {
  title: "Di Pusat — SCBD, Jakarta",
  tagline: "Mesin produksi seluruh izin",
  items: [
    "Memproses SELURUH dokumen ke OSS-RBA, kementerian & notaris rekanan",
    "Tim AI 24/7 melayani klien cabang Anda (Cek Izin AI, RIZKI, kalkulator)",
    "Legal, quality assurance & kepatuhan — garansi tertulis level nasional",
    "Customer service lanjutan, penagihan & pembukuan kontrak",
    "Riset produk baru — katalog 500+ layanan otomatis jadi amunisi cabang Anda",
  ],
};

const BENEFITS = [
  {
    icon: Rocket,
    title: "Bisnis Siap Jalan Sehari Pertama",
    desc: "Anda tidak merintis dari nol: merek terpercaya, website, materi jualan, SOP, dan pricelist 500+ layanan langsung Anda pakai sejak hari pembukaan.",
  },
  {
    icon: Megaphone,
    title: "Lead Nasional Mengalir ke Anda",
    desc: `Lebih dari 10.000 halaman SEO + asisten AI kami mendatangkan pencari izin setiap hari. Permintaan dari kota Anda otomatis diteruskan ke cabang Anda — bukan dijual ulang.`,
  },
  {
    icon: Building2,
    title: "Pusat yang Bekerja, Anda yang Untung",
    desc: "Seluruh proses teknis, legal, dan kepatuhan ditangani tim pusat di SCBD. Anda tidak perlu paham detail regulasi — cukup jaga klien Anda.",
  },
  {
    icon: GraduationCap,
    title: "Akademi Mitra 7 Hari + Sertifikat",
    desc: "Onboarding intensif: produk, SOP, sistem, teknik closing, dan etika. Lulus = berhak memakai gelar “Konsultan Bersertifikat PusatPerizinan”.",
  },
  {
    icon: ShieldCheck,
    title: "Garansi Tertulis & Kontrak Jelas",
    desc: "MOU transparan: komisi, wilayah, hak & kewajiban, jalur keluar. Semua tercatat — reputasi kami, reputasi Anda.",
  },
  {
    icon: MapPin,
    title: "Wilayah Dilindungi",
    desc: "Gerai maksimal 2 mitra/kota, Cabang Resmi eksklusif 1 kota, Master Franchise eksklusif 1 provinsi. Yang lebih dulu lolos screening, yang dapat.",
  },
];

const TIERS = [
  {
    id: "gerai",
    name: "Gerai Mitra",
    tag: "MULAI TANPA MODAL",
    fee: "Rp0",
    feeNote: "bergabung gratis — hanya screening",
    rate: "25%",
    color: "border",
    features: [
      "Wilayah 1 kota/kabupaten (maks. 2 mitra per kota)",
      "Komisi 25% dari seluruh nilai kontrak",
      "Portal mitra + dashboard lead & progres",
      "Materi jualan, pricelist & kartu nama digital",
      "Akademi daring (materi mandiri + kuis)",
      "Cocok untuk: konsultan independen, notaris, tukang urus, agen properti",
    ],
  },
  {
    id: "cabang",
    name: "Cabang Resmi",
    tag: "PALING DIPILIH",
    fee: "Rp25 juta",
    feeNote: "investasi sekali — bukan per tahun",
    rate: "35%",
    color: "border-primary ring-2 ring-primary/20 relative",
    features: [
      "Wilayah EKSKLUSIF 1 kota — hanya Anda",
      "Komisi 35% + bonus pencapaian kuartal",
      "Signage merek & fasilitas kantor cabang",
      "Website mini cabang (1 halaman, domain cabang)",
      "2 staf dilatih Akademi Mitra 7 hari (daring + tatap muka)",
      "Pendampingan legalitas kantor cabang (NIB, KBLI kemitraan)",
      "Cocok untuk: kantor jasa/properti/konsultan yang sudah punya ruang klien",
    ],
  },
  {
    id: "master",
    name: "Master Franchise",
    tag: "PEMERINTAH WILAYAH",
    fee: "Rp100 juta",
    feeNote: "hak kawasan provinsi",
    rate: "45%",
    color: "border",
    features: [
      "Wilayah EKSKLUSIF 1 provinsi",
      "Komisi 45% + overriding 5% dari seluruh gerai di provinsi Anda",
      "Hak membuka & mengelola gerai bawahan",
      "Co-branding, dukungan PR & peluncuran daerah",
      "Account manager khusus + rapat strategi bulanan",
      "Cocok untuk: grup usaha, BUMD, pengusaha daerah",
    ],
  },
];

/** Komisi transparan per kelompok layanan (rata-rata nilai kontrak). */
const COMMISSION_TABLE = [
  { service: "NIB & OSS-RBA", avg: "Rp1,5 – 2,5 jt", note: "paling laris, siklus cepat 1–3 hari" },
  { service: "Pendirian PT / CV / Firma", avg: "Rp4 – 7 jt", note: "termasuk akta & SK kemenkumham" },
  { service: "PT PMA (investasi asing)", avg: "Rp15 – 35 jt", note: "nilai kontrak tertinggi" },
  { service: "Sertifikasi Halal", avg: "Rp3 – 6 jt", note: "push program pemerintah 2026" },
  { service: "Izin Edar BPOM / PIRT", avg: "Rp5 – 12 jt", note: "UMKM pangan & kosmetik" },
  { service: "PBG & SLF", avg: "Rp4 – 10 jt", note: "bangunan & properti" },
  { service: "Virtual Office", avg: "Rp1,2 – 3 jt / thn", note: "komisi RECURRING tiap perpanjangan" },
  { service: "Pajak & Kepatuhan Bulanan", avg: "Rp500 rb – 3 jt / bln", note: "komisi RECURRING selama klien aktif" },
];

const STEPS = [
  {
    icon: FileSignature,
    step: "1",
    title: "Ajukan 3 Menit",
    desc: "Isi formulir di bawah — kota, latar belakang, dan kesiapan kantor. Tanpa biaya.",
  },
  {
    icon: Users,
    step: "2",
    title: "Interview & Screening ≤ 3 Hari",
    desc: "Diskusi daring + verifikasi rekam jejak. Kami menilai kesungguhan, bukan ijazah.",
  },
  {
    icon: Handshake,
    step: "3",
    title: "MOU & Aktivasi Tier",
    desc: "Tanda tangan MOU, penetapan wilayah, dan pembukaan akses portal mitra.",
  },
  {
    icon: GraduationCap,
    step: "4",
    title: "Akademi Mitra 7 Hari",
    desc: "Produk, SOP, sistem, closing, dan simulasi klien. Lulus → sertifikat resmi.",
  },
  {
    icon: Store,
    step: "5",
    title: "Grand Opening — Lead Mengalir",
    desc: "Papan merek terpasang, kampanye lokal berjalan, lead kota Anda mulai diteruskan.",
  },
];

const REQUIREMENTS = [
  "Memiliki ruang kantor atau ruang tamu klien (rumah pun bisa untuk tier Gerai)",
  "Legalitas usaha sendiri minimal NIB (kami bantu urus bila belum ada)",
  "Tim inti minimal 1 orang (Gerai) / 2 orang (Cabang Resmi & Master)",
  "Lolos screening rekam jejak & komitmen mengikuti standar merek",
  "Tidak menjadi mitra aktif jasa perizinan merek lain selama kontrak berlaku",
];

const FAQS = [
  {
    q: "Apa bedanya Program Kemitraan ini dengan franchise biasa?",
    a: "Franchise biasa menuntut Anda menguasai operasional. Di sini kebalik: seluruh produksi (proses izin ke OSS, kementerian, notaris) dikerjakan tim pusat di SCBD. Tugas cabang hanya menyambut klien, menerima berkas, dan menjaga relasi. Anda menjalankan bisnis layanan premium tanpa harus jadi ahli regulasi.",
  },
  {
    q: "Berapa modal minimal untuk bergabung?",
    a: "Tier Gerai Mitra bergabung GRATIS — Anda hanya di-screening. Cabang Resmi berinvestasi Rp25 juta sekali (bukan tahunan) untuk eksklusivitas 1 kota, fasilitas merek, dan pelatihan staf. Master Franchise Rp100 juta untuk hak kawasan 1 provinsi. Tidak ada royalti bulanan tersembunyi — komisi dibayar penuh sesuai tier.",
  },
  {
    q: "Saya tidak paham perizinan sama sekali, bisa ikut?",
    a: "Bisa — dan justru banyak mitra terbaik kami berasal dari luar industri: properti, asuransi, travel, event organizer, hingga pemilik kafe. Akademi Mitra 7 hari mengajarkan produk & SOP dari nol, dan seluruh pertanyaan teknis klien dijawab tim pusat. Yang Anda butuhkan adalah kemauan melayani dan kemampuan menjaga hubungan.",
  },
  {
    q: "Bagaimana dan kapan komisi dibayarkan?",
    a: "Komisi dihitung dari nilai kontrak riil (bukan estimasi) dan dibayarkan setiap tanggal 5 untuk periode bulan sebelumnya, setelah pembayaran klien terverifikasi. Semua transaksi tercatat real-time di dashboard mitra — Anda bisa memantau komisi menggantung kapan pun.",
  },
  {
    q: "Apakah wilayah saya masih tersedia?",
    a: "Kami melindungi wilayah: maksimal 2 Gerai per kota, 1 Cabang Resmi eksklusif per kota, dan 1 Master Franchise per provinsi. Beberapa kota besar telah terisi. Saat Anda mengajukan, tim kemitraan langsung memberi tahu status ketersediaan kota Anda — first come, first served berdasarkan kelulusan screening.",
  },
  {
    q: "Tepatnya apa yang dikerjakan pusat, apa yang dikerjakan cabang?",
    a: "Cabang: menyambut & mengedukasi klien, menerima berkas awal dengan checklist baku, menjaga relasi dan update progres. Pusat: memproses seluruh dokumen ke OSS-RBA/kementerian/notaris, melayani klien dengan tim AI 24/7, quality assurance, penagihan, pembukuan, dan garansi tertulis. Ringkasnya: cabang = wajah merek, pusat = mesin produksinya.",
  },
  {
    q: "Berapa lama biasanya balik modal?",
    a: "Berdasarkan simulasi dengan rata-rata kontrak campuran katalog kami: Cabang Resmi dengan 10 deal/bulan di kota Tier B balik modal ±6 bulan; di kota Tier A bisa di bawah 4 bulan. Gunakan simulasi profit interaktif di halaman ini untuk angka sesuai kota dan target Anda. Angka final mengikuti MOU dan realisasi wilayah.",
  },
  {
    q: "Apakah ada target penjualan wajib setiap bulan?",
    a: "Ada ekspektasi sehat, bukan penalti menindas: Gerai idealnya 3 deal/bulan, Cabang Resmi 8–10, Master Franchise mengelola 25+ melalui jaringan gerainya. Mitra yang di bawah ekspektasi 3 bulan berturut-turut akan didampingi intensif dulu sebelum keputusan lanjut/keluar diambil bersama.",
  },
  {
    q: "Bisakah saya jadi cabang sambil menjalankan usaha lain?",
    a: "Ya, dan ini model paling populer. Banyak mitra menjadikan layanan perizinan sebagai add-on pendapatan di atas usaha yang sudah berjalan (properti, pajak, konstruksi, katering). Yang kami minta: standar layanan merek tetap terjaga dan tidak menjual produk perizinan pesaing selama kontrak.",
  },
  {
    q: "Bagaimana mekanisme keluar atau berhenti dari kemitraan?",
    a: "Kontrak berlaku 2 tahun dan diperbarui otomatis kecuali salah satu pihak berhenti. Jalur keluar jelas: berhenti dengan pemberitahuan 60 hari, komisi menggantung dari klien yang masih aktif tetap dibayarkan hingga siklusnya selesai, dan investasi wilayah (Cabang/Master) dapat ditransfer ke mitra penerjemah yang lolos screening kami.",
  },
];

const WA_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Halo PusatPerizinan, saya tertarik dengan Program Kemitraan Cabang. Boleh info ketersediaan wilayah kota saya?"
)}`;

/* ---------------- JSON-LD ---------------- */

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL + "/" },
          { "@type": "ListItem", position: 2, name: "Program Kemitraan Cabang", item: PAGE_URL },
        ],
      },
      {
        "@type": "WebPage",
        "@id": PAGE_URL + "#webpage",
        url: PAGE_URL,
        name: "Program Kemitraan Cabang Resmi — Franchise Jasa Perizinan No.1",
        description: metadata.description,
        inLanguage: "id-ID",
        isPartOf: { "@id": SITE_URL + "/#website" },
        breadcrumb: { "@id": PAGE_URL + "#breadcrumb" },
      },
      {
        "@type": "Service",
        "@id": PAGE_URL + "#service",
        name: "Program Kemitraan Cabang Resmi PusatPerizinan.com",
        serviceType: "Franchise & kemitraan jasa konsultan perizinan usaha",
        provider: { "@id": SITE_URL + "/#organization" },
        areaServed: { "@type": "Country", name: "Indonesia" },
        description:
          "Mitra membuka kantor cabang resmi PusatPerizinan.com di kotanya; seluruh proses perizinan diolah di pusat (SCBD Jakarta). Komisi 25–45%, wilayah dilindungi, akademi 7 hari, garansi tertulis.",
        offers: [
          {
            "@type": "Offer",
            name: "Gerai Mitra",
            price: "0",
            priceCurrency: "IDR",
            description: "Bergabung gratis, komisi 25%, maksimal 2 mitra per kota.",
          },
          {
            "@type": "Offer",
            name: "Cabang Resmi",
            price: "25000000",
            priceCurrency: "IDR",
            description: "Eksklusif 1 kota, komisi 35%, signage merek, akademi 7 hari untuk 2 staf.",
          },
          {
            "@type": "Offer",
            name: "Master Franchise",
            price: "100000000",
            priceCurrency: "IDR",
            description: "Hak kawasan 1 provinsi, komisi 45% + overriding 5% dari gerai bawahan.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": PAGE_URL + "#faq",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}

/* ---------------- Page ---------------- */

export default function MitraPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
            <ol className="flex items-center gap-1.5">
              <li><Link href="/" className="hover:text-primary">Beranda</Link></li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="font-semibold text-foreground">Program Kemitraan Cabang</li>
            </ol>
          </nav>

          {/* HERO */}
          <header className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              PUSAT PARTNER NETWORK • KUOTA WILAYAH TERBATAS
            </p>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Program Kemitraan Cabang Resmi — Anda Buka Kantor, Pusat yang Mengurus Segalanya
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Buka cabang resmi <strong>{SITE_NAME}</strong> di kota Anda. Anda jadi wajah merek:
              menyambut klien dan menjaga relasi. <strong>Seluruh proses izin diolah tim pusat
              di SCBD Jakarta</strong> — dari NIB sampai PMA, lengkap dengan tim AI 24/7, garansi
              tertulis, dan lead nasional yang mengalir ke kantor Anda.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#daftar"
                className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-sm transition hover:opacity-90"
              >
                <Rocket className="h-4 w-4" aria-hidden />
                Ajukan Kemitraan — Gratis
              </a>
              <a
                href="#simulasi"
                className="inline-flex min-h-11 items-center gap-2 rounded-lg border bg-card px-6 py-3 text-sm font-bold transition hover:bg-accent"
              >
                <Percent className="h-4 w-4" aria-hidden />
                Cek Simulasi Profit
              </a>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-lg border bg-card px-6 py-3 text-sm font-bold transition hover:bg-accent"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                Tanya via WhatsApp
              </a>
            </div>
          </header>

          {/* Trust strip */}
          <section aria-label="Rekam jejak nasional" className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {TRUST_STRIP.map((s) => (
              <div key={s.label} className="rounded-xl border bg-card p-4 text-center">
                <p className="text-xl font-extrabold text-emerald-700 sm:text-2xl">{s.value}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </section>

          {/* KONSEP INTI: cabang vs pusat */}
          <section className="mt-14" aria-labelledby="konsep">
            <h2 id="konsep" className="text-2xl font-bold sm:text-3xl">
              Satu Bisnis, Dua Meja Kerja — Semua yang Berat Ada di Meja Kami
            </h2>
            <p className="mt-3 max-w-3xl text-muted-foreground">
              Model <strong>hub-and-spoke</strong>: cabang adalah pintu depan yang dipercaya
              masyarakat kota Anda, pusat adalah pabrik perizinannya. Ini alasan mitra bisa
              jalan dalam hitungan hari — bukan bulan.
            </p>
            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              {[BRANCH_DUTIES, HQ_DUTIES].map((col, i) => (
                <article
                  key={col.title}
                  className={`rounded-2xl border p-6 ${i === 1 ? "bg-emerald-50/50" : "bg-card"}`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${i === 1 ? "bg-emerald-600 text-white" : "bg-emerald-50 text-emerald-700"}`}
                      aria-hidden
                    >
                      {i === 0 ? <Store className="h-5 w-5" /> : <Landmark className="h-5 w-5" />}
                    </span>
                    <div>
                      <h3 className="font-bold">{col.title}</h3>
                      <p className="text-xs text-muted-foreground">{col.tagline}</p>
                    </div>
                  </div>
                  <ul className="mt-4 space-y-2.5">
                    {col.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed">
                        <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${i === 1 ? "text-emerald-600" : "text-emerald-500"}`} aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          {/* BENEFIT */}
          <section className="mt-14" aria-labelledby="keuntungan">
            <h2 id="keuntungan" className="text-2xl font-bold sm:text-3xl">
              6 Alasan Cabang Ini Menarik Sekalipun Anda Belum Punya Pengalaman Perizinan
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {BENEFITS.map((b) => (
                <article key={b.title} className="rounded-2xl border bg-card p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700" aria-hidden>
                    <b.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-3 font-bold leading-snug">{b.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
                </article>
              ))}
            </div>
          </section>

          {/* TIER */}
          <section className="mt-14" aria-labelledby="tier">
            <h2 id="tier" className="text-2xl font-bold sm:text-3xl">3 Tingkat Kemitraan — Pilih Skala Anda</h2>
            <p className="mt-3 max-w-3xl text-muted-foreground">
              Semua tier menikmati lead nasional, portal mitra, dan garansi merek. Bedanya:
              luas wilayah, besaran komisi, dan fasilitas. Naik tier kapan saja saat kuota masih ada.
            </p>
            <div className="mt-6 grid gap-5 lg:grid-cols-3">
              {TIERS.map((t) => (
                <article key={t.id} className={`rounded-2xl bg-card p-6 ${t.color}`}>
                  {t.id === "cabang" && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-bold text-primary-foreground">
                      {t.tag}
                    </span>
                  )}
                  {t.id !== "cabang" && (
                    <span className="inline-block rounded-full bg-muted px-3 py-0.5 text-xs font-bold text-muted-foreground">
                      {t.tag}
                    </span>
                  )}
                  <h3 className="mt-3 text-xl font-extrabold">{t.name}</h3>
                  <p className="mt-2">
                    <span className="text-3xl font-extrabold text-emerald-700">{t.rate}</span>
                    <span className="text-sm text-muted-foreground"> komisi nilai kontrak</span>
                  </p>
                  <p className="mt-1 text-sm">
                    <span className="font-bold">{t.fee}</span>{" "}
                    <span className="text-muted-foreground">— {t.feeNote}</span>
                  </p>
                  <ul className="mt-4 space-y-2 border-t pt-4">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm leading-relaxed">
                        <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#daftar"
                    className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition hover:opacity-90"
                  >
                    Ajukan Tier {t.name}
                  </a>
                </article>
              ))}
            </div>
          </section>

          {/* SIMULASI */}
          <section className="mt-14 scroll-mt-24" id="simulasi" aria-labelledby="simulasi-title">
            <h2 id="simulasi-title" className="text-2xl font-bold sm:text-3xl">Hitung Sendiri: Berapa Potensi Cabang di Kota Anda?</h2>
            <p className="mt-3 max-w-3xl text-muted-foreground">
              Dibuat transparan sejak awal — karena kemitraan yang baik dimulai dari angka yang jujur.
            </p>
            <div className="mt-6">
              <PartnerProfitSimulator />
            </div>
          </section>

          {/* KOMISI PER LAYANAN */}
          <section className="mt-14" aria-labelledby="komisi">
            <h2 id="komisi" className="text-2xl font-bold sm:text-3xl">Dari Mana Komisi Itu Datang? Transparan Per Layanan</h2>
            <p className="mt-3 max-w-3xl text-muted-foreground">
              Katalog 500+ layanan berarti cabang Anda punya amunisi jualan untuk setiap jenis
              usaha klien — dari warung yang butuh NIB sampai investor asing yang membangun pabrik.
            </p>
            <div className="mt-6 overflow-x-auto rounded-2xl border bg-card">
              <table className="w-full min-w-[560px] text-sm">
                <caption className="sr-only">Rata-rata nilai kontrak per kelompok layanan PusatPerizinan.com</caption>
                <thead>
                  <tr className="border-b bg-muted/50 text-left">
                    <th scope="col" className="px-4 py-3 font-bold">Kelompok Layanan</th>
                    <th scope="col" className="px-4 py-3 font-bold">Rata-rata Nilai Kontrak</th>
                    <th scope="col" className="px-4 py-3 font-bold">Catatan</th>
                  </tr>
                </thead>
                <tbody>
                  {COMMISSION_TABLE.map((row) => (
                    <tr key={row.service} className="border-b last:border-0">
                      <th scope="row" className="px-4 py-3 text-left font-semibold">{row.service}</th>
                      <td className="px-4 py-3 font-bold text-emerald-700">{row.avg}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Komisi cabang dihitung dari nilai kontrak riil yang masuk. Layanan virtual office &
              kepatuhan pajak bersifat <strong>recurring</strong> — komisi terus mengalir selama
              klien aktif.
            </p>
          </section>

          {/* LANGKAH */}
          <section className="mt-14" aria-labelledby="langkah">
            <h2 id="langkah" className="text-2xl font-bold sm:text-3xl">5 Langkah dari Pendaftaran ke Grand Opening</h2>
            <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {STEPS.map((s) => (
                <li key={s.step} className="rounded-xl border bg-card p-5">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white" aria-hidden>{s.step}</span>
                    <s.icon className="h-5 w-5 text-emerald-700" aria-hidden />
                  </div>
                  <h3 className="mt-3 font-semibold leading-snug">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* SYARAT */}
          <section className="mt-14" aria-labelledby="syarat">
            <div className="grid gap-5 rounded-2xl border bg-card p-6 sm:p-8 lg:grid-cols-2">
              <div>
                <h2 id="syarat" className="text-2xl font-bold">Syarat Menjadi Cabang</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Sengaja kami buat ramping — kemitraan yang baik tidak menyulitkan pihak yang
                  akan tumbuh bersama kami.
                </p>
                <ul className="mt-4 space-y-2.5">
                  {REQUIREMENTS.map((r) => (
                    <li key={r} className="flex items-start gap-2.5 text-sm leading-relaxed">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl bg-emerald-50/60 p-5">
                <h3 className="flex items-center gap-2 font-bold">
                  <Award className="h-5 w-5 text-emerald-700" aria-hidden />
                  Yang Anda Terima Setelah Lolos
                </h3>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed">
                  <li className="flex gap-2"><BookOpenCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden /> Sertifikat “Konsultan Bersertifikat PusatPerizinan”</li>
                  <li className="flex gap-2"><CalendarCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden /> Jadwal akademi & grand opening yang Anda tentukan</li>
                  <li className="flex gap-2"><Target className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden /> Target 90 hari pertama + pendampingan mentor</li>
                  <li className="flex gap-2"><Megaphone className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden /> Paket peluncuran: materi sosial media & pengumuman komunitas</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mt-14" aria-labelledby="faq">
            <h2 id="faq" className="text-2xl font-bold sm:text-3xl">Pertanyaan yang Paling Sering Diajukan Calon Mitra</h2>
            <div className="mt-6 space-y-3">
              {FAQS.map((f, i) => (
                <details key={i} className="group rounded-xl border bg-card px-5 py-4 open:shadow-sm">
                  <summary className="cursor-pointer list-none font-semibold leading-snug marker:hidden">
                    <span className="mr-2 inline-block text-emerald-600 transition group-open:rotate-90" aria-hidden>▸</span>
                    {f.q}
                  </summary>
                  <p className="mt-3 pl-6 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* FORM */}
          <section className="mt-14 scroll-mt-24 rounded-2xl border bg-card p-6 sm:p-8" id="daftar" aria-labelledby="daftar-title">
            <h2 id="daftar-title" className="text-xl font-bold sm:text-2xl">Ajukan Kemitraan Sekarang — Gratis & Respons ≤ 3 Hari Kerja</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Sampaikan kota dan latar belakang Anda. Tim kemitraan membalas dengan status
              ketersediaan wilayah + brosur resmi program.
            </p>
            <div className="mt-5 max-w-2xl">
              <LeadForm
                source="mitra"
                cta="Ajukan Kemitraan Cabang"
                note="Data hanya untuk screening kemitraan — tidak dibagikan ke pihak mana pun."
                needs={[
                  { value: "Konsultan/tukang urus izin", label: "Konsultan / tukang urus izin" },
                  { value: "Notaris/PPAT", label: "Notaris / PPAT / staf notaris" },
                  { value: "Konsultan pajak", label: "Konsultan pajak / akuntan" },
                  { value: "Agen properti/konstruksi", label: "Agen properti / jasa konstruksi" },
                  { value: "Pemilik usaha lain", label: "Pemilik usaha lain (jelaskan kota & usaha di pesan)" },
                ]}
              />
            </div>
          </section>

          {/* CROSS-LINK ALAT */}
          <section className="mt-14" aria-label="Alat gratis lainnya">
            <h2 className="text-lg font-bold">Coba Dulu Alat Gratis Kami — Ini Sistem yang Nanti Anda Jual</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { href: "/cek-izin", label: "Cek Izin AI", desc: "Klien jawab 5 pertanyaan → rekomendasi izin" },
                { href: "/kalkulator", label: "Kalkulator Biaya", desc: "Estimasi biaya per layanan, transparan" },
                { href: "/konsultasi", label: "Konsultasi Gratis", desc: "30 menit dengan konsultan senior" },
                { href: "/panduan", label: "16 Panduan", desc: "NIB sampai MISA Arab Saudi" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-xl border bg-card p-4 transition hover:border-emerald-300 hover:bg-accent"
                >
                  <p className="font-bold">{l.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{l.desc}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
