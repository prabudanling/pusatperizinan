/**
 * PUSAT PERIZINAN — Central Site Configuration
 * Single source of truth untuk SEO, struktur data, dan konten.
 * Dipakai oleh: layout.tsx, sitemap.ts, robots.ts, manifest.ts, JSON-LD
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://pusatperizinan.com";

export const SITE = {
  name: "Pusat Perizinan",
  legalName: "PusatPerizinan.com",
  shortName: "PusatPerizinan",
  url: SITE_URL,
  domain: "pusatperizinan.com",
  tagline: "Jasa Pengurusan Izin Usaha Tercepat & Terpercaya di Indonesia",
  description:
    "Pusat Perizinan membantu pelaku usaha Indonesia mengurus NIB OSS-RBA, pendirian PT/CV/PMA, Sertifikat Standar, izin UMKM, NPWP, dan seluruh perizinan berusaha berbasis risiko — cepat, resmi, dan bergaransi. Konsultasi gratis via WhatsApp.",
  locale: "id_ID",
  language: "id",
  founded: "2020",
  // Kontak (sesuaikan dengan kanal resmi PusatPerizinan.com)
  contact: {
    phone: "+62-811-1212-1508",
    phoneDisplay: "0811-1212-1508",
    whatsapp: "6281112121508",
    email: "halo@pusatperizinan.com",
    address: {
      street: "Jl. Perizinan Usaha No. 1",
      city: "Jakarta",
      region: "DKI Jakarta",
      postalCode: "10110",
      country: "ID",
      countryName: "Indonesia",
    },
    hours: "Senin–Sabtu, 08.00–20.00 WIB",
  },
  social: {
    instagram: "https://www.instagram.com/pusatperizinan",
    facebook: "https://www.facebook.com/pusatperizinan",
    tiktok: "https://www.tiktok.com/@pusatperizinan",
    youtube: "https://www.youtube.com/@pusatperizinan",
  },
  keywords: [
    "jasa pengurusan izin usaha",
    "buatan NIB",
    "NIB OSS RBA",
    "pendirian PT",
    "pendirian CV",
    "pendirian PMA",
    "izin UMKM",
    "sertifikat standar",
    "perizinan berusaha berbasis risiko",
    "OSS online single submission",
    "jasa izin usaha murah",
    "pengurusan legalitas usaha",
    "npwp usaha",
    "konsultasi perizinan",
    "izin edar",
    "halal certificate",
    "siup",
    "iui",
    "legalitas badan usaha",
    "jasa legalitas perusahaan",
  ],
} as const;

/** Skema warna emas-emerald untuk schema.org & identitas */
export const BRAND = {
  primary: "#059669", // emerald-600
  secondary: "#D97706", // amber-600
} as const;

/* -------------------------------------------------------------------------- */
/*  DATA LAYANAN — dipakai UI + schema.org Service                             */
/* -------------------------------------------------------------------------- */

export interface ServiceItem {
  slug: string;
  icon: string;
  title: string;
  short: string;
  detail: string;
  price: string;
  duration: string;
  category: "Legalitas Dasar" | "Badan Hukum" | "Izin Usaha" | "Pendampingan";
}

export const SERVICES: ServiceItem[] = [
  {
    slug: "nib-oss-rba",
    icon: "FileBadge",
    title: "NIB OSS-RBA",
    short: "Nomor Induk Berusaha via OSS-RBA resmi Kemeninvest/BKPM.",
    detail:
      "Nomor Induk Berusaha (NIB) adalah identitas resmi usaha Anda sekaligus kartu izin dasar dalam sistem OSS-RBA. Kami mengurus lengkap: registrasi akun, pengisian profil risiko, hingga NIB terbit dan siap dipakai untuk buka rekening, daftar marketplace, dan ikut tender.",
    price: "Mulai Rp 150rb",
    duration: "1 hari kerja",
    category: "Legalitas Dasar",
  },
  {
    slug: "pendirian-pt",
    icon: "Building2",
    title: "Pendirian PT",
    short: "Perseroan Terbatas legal, akta notaris + SK Kemenkumham.",
    detail:
      "Pendirian Perseroan Terbatas lengkap: akta notaris, SK Menkumham, NPWP badan, NIB, hingga domisili usaha. Cocok untuk usaha yang siap skalabel, butuh investor, atau mengikuti lelang proyek pemerintah dan BUMN.",
    price: "Mulai Rp 2,5jt",
    duration: "3–7 hari kerja",
    category: "Badan Hukum",
  },
  {
    slug: "pendirian-cv",
    icon: "Handshake",
    title: "Pendirian CV",
    short: "Commanditaire Vennootschap untuk usaha kemitraan.",
    detail:
      "Cuma umum dan sekuritas terbaik untuk usaha keluarga & kemitraan. Kami urus akta pendirian, pengesahan Kemenkumham, NPWP, NIB, dan surat keterangan domisili — semua dalam satu paket transparan.",
    price: "Mulai Rp 1,8jt",
    duration: "3–5 hari kerja",
    category: "Badan Hukum",
  },
  {
    slug: "pma-ptma",
    icon: "Globe",
    title: "Pendirian PMA/PTMA",
    short: "Badan usaha asing 100% legal untuk investor mancanegara.",
    detail:
      "Foreign investment company (PMA/PTMA) dengan perizinan lengkap untuk investasi asing: modal disetor, DGT approval, KITAS investor, hingga izin khusus sesuai sektor. Pendampingan bilingual Inggris–Indonesia.",
    price: "Mulai Rp 15jt",
    duration: "10–14 hari kerja",
    category: "Badan Hukum",
  },
  {
    slug: "sertifikat-standar",
    icon: "ShieldCheck",
    title: "Sertifikat Standar",
    short: "Izin kepatuhan untuk usaha risiko menengah & tinggi.",
    detail:
      "Sertifikat Standar (SS) wajib bagi usaha dengan tingkat risiko menengah–tinggi: makanan, konstruksi, perdagangan, kesehatan, dan lainnya. Kami sinkronkan KBLI, persyaratan teknis, dan verifikasi hingga SS terbit di OSS.",
    price: "Mulai Rp 500rb",
    duration: "1–3 hari kerja",
    category: "Izin Usaha",
  },
  {
    slug: "izin-umkm",
    icon: "Store",
    title: "Izin UMKM & Halal",
    short: "Legalitas UMKM + sertifikasi halal untuk naik kelas.",
    detail:
      "Izin UMKM (NIB perorangan), pendaftaran merek, hingga sertifikasi halal seluruh proses dibantu bersama LP3H resmi. Buka akses ke pembinaan, KUR, bantuan pemerintah, dan program onboarding marketplace.",
    price: "Mulai Rp 100rb",
    duration: "1 hari kerja",
    category: "Legalitas Dasar",
  },
  {
    slug: "npwp-pajak",
    icon: "Receipt",
    title: "NPWP & Pajak Usaha",
    short: "Registrasi NPWP, PPN, hingga SPT tahunan tepat waktu.",
    detail:
      "Kami urus NPWP badan/perorangan, aktivasi PPN, sertifikasi elektronik, hingga pelaporan SPT Masa & Tahunan. Harta pajak Anda beres tanpa drama, dengan kalendar pajak otomatis dari tim kami.",
    price: "Mulai Rp 300rb",
    duration: "1–2 hari kerja",
    category: "Pendampingan",
  },
  {
    slug: "izin-khusus",
    icon: "BadgeCheck",
    title: "Izin Khusus Sektor",
    short: "Izin edar, distro, logistik, konstruksi, kesehatan & lainnya.",
    detail:
      "Izin edar POM, SIUP MB, izin distro, SIUJK konstruksi, izin PIRT, izin apotek/klinik — seluruh izin teknis sektor diurus ahlinya, termasuk koordinasi dengan dinas teknis di provinsi Anda.",
    price: "Konsultasi",
    duration: "3–14 hari kerja",
    category: "Izin Usaha",
  },
];

/* -------------------------------------------------------------------------- */
/*  FAQ — dipakai UI + FAQPage schema (rich results)                           */
/* -------------------------------------------------------------------------- */

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    question: "Apa itu NIB dan mengapa usaha saya wajib memilikinya?",
    answer:
      "NIB (Nomor Induk Berusaha) adalah identitas resmi pelaku usaha yang diterbitkan melalui sistem OSS-RBA milik Kemeninvest/BKPM. Sejak UU Cipta Kerja, NIB berlaku sebagai izin usaha sekaligus menggantikan SIUP dan Surat Keterangan Domisili. Tanpa NIB, usaha Anda tidak bisa membuka rekening korporat, mendaftar marketplace besar, mengikuti tender, atau mengajukan pembiayaan bank.",
  },
  {
    question: "Berapa lama proses pengurusan izin usaha di Pusat Perizinan?",
    answer:
      "NIB OSS-RBA selesai 1 hari kerja setelah data lengkap. Pendirian PT/CV memakan waktu 3–7 hari kerja termasuk akta notaris dan SK Kemenkumham. Izin teknis tertentu seperti izin edar atau sertifikasi halal bisa 3–14 hari kerja tergantung sektor. Anda mendapat update progres setiap tahap via WhatsApp.",
  },
  {
    question: "Apakah izin yang diterbitkan resmi dan terdata pemerintah?",
    answer:
      "100% resmi. Seluruh dokumen terbit melalui sistem resmi pemerintah: OSS-RBA (Kemeninvest/BKPM), SIAK (Kemenkumham), DJP Online (Kemenkeu), dan sistem perizinan dinas teknis. Anda dapat memverifikasi langsung setiap dokumen di portal resmi terkait.",
  },
  {
    question: "Usaha saya masih kecil, apakah perlu PT atau cukup NIB perorangan?",
    answer:
      "Jika omzet di bawah Rp 4,8 miliar/tahun, NIB perorangan + sertifikat standar biasanya cukup dan biayanya sangat terjangkau. PT diperlukan ketika Anda butuh investor, karyawan dengan kontrak formal, perlindungan aset pribadi, atau mengikuti lelang besar. Tim kami akan merekomendasikan struktur paling efisien lewat konsultasi gratis.",
  },
  {
    question: "Berapa biaya jasa pengurusan perizinan?",
    answer:
      "Biaya mulai dari Rp 100 ribu untuk izin UMKM, Rp 150 ribu untuk NIB OSS-RBA, hingga Rp 2,5 juta untuk pendirian PT. Semua tarif transparan tanpa biaya tersembunyi — Anda menerima rincian tertulis sebelum pembayaran.",
  },
  {
    question: "Apakah bisa mengurus izin meskipun saya di luar Jakarta?",
    answer:
      "Bisa. Proses OSS-RBA berbasis online sehingga kami melayani seluruh Indonesia dan WNI di luar negeri. Untuk kebutuhan notaris atau dinas daerah tertentu, kami bekerja sama dengan mitra lokal di 34 provinsi.",
  },
  {
    question: "Dokumen apa saja yang perlu saya siapkan?",
    answer:
      "Umumnya cukup KTP, NPWP (jika ada), alamat usaha, dan deskripsi kegiatan usaha. Untuk PT/CV tambah pas foto dan data pengurus. Kami kirim checklist personal tepat setelah konsultasi awal — tidak perlu bingung menyiapkan apa-apa.",
  },
  {
    question: "Apakah ada garansi jika izin ditolak atau bermasalah?",
    answer:
      "Ya, layanan kami bergaransi. Jika pengajuan ditolak karena kelalaian administratif di sisi kami, pengurusan diulang tanpa biaya tambahan. Selama 12 bulan setelah layanan, Anda juga mendapat pendampingan konsultasi legal gratis kapan pun ada kendala.",
  },
];

/* -------------------------------------------------------------------------- */
/*  PROSES — langkah kerja                                                     */
/* -------------------------------------------------------------------------- */

export const PROCESS_STEPS = [
  {
    step: 1,
    title: "Konsultasi Gratis",
    desc: "Ceritakan rencana usaha Anda via WhatsApp — tim kami pilihkan jalur perizinan paling cepat & hemat.",
  },
  {
    step: 2,
    title: "Kirim Dokumen",
    desc: "Anda cukup kirim KTP & data dasar. Checklist personal dikirim otomatis, revisi kami bantu penuh.",
  },
  {
    step: 3,
    title: "Kami Proses Total",
    desc: "Notaris, OSS-RBA, Kemenkumham, dinas teknis — semua diurus ahlinya sambil Anda pantau progres real-time.",
  },
  {
    step: 4,
    title: "Izin Terbit & Garansi",
    desc: "Dokumen resmi dikirim digital + hard copy, siap pakai. Garansi 12 bulan pendampingan pasca terbit.",
  },
] as const;

/* -------------------------------------------------------------------------- */
/*  TESTIMONI                                                                  */
/* -------------------------------------------------------------------------- */

export const TESTIMONIALS = [
  {
    name: "Ratna Wijaya",
    role: "Founder, Kopi Nusantara (UMKM F&B)",
    text: "Awalnya bingung urus NIB + sertifikat halal buat masuk supermarket. Pusat Perizinan selesaikan 3 hari semua, sekarang produk saya sudah di 40 gerai. Worth it banget!",
    rating: 5,
  },
  {
    name: "Andi Prasetyo",
    role: "Direktur, PT Bumi Konstruksi",
    text: "Pendirian PT + SIUJK dulu saya tunda setahun karena ribet. Di sini selesai seminggu, laporan tiap tahap jelas. Sekarang lancar ikut tender BUMN.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Investor, PT Asia Global Trading (PMA)",
    text: "As a foreign investor, navigating Indonesian permits was intimidating. Their bilingual team handled my PMA, KITAS, and trading licenses end-to-end. Highly professional.",
    rating: 5,
  },
  {
    name: "Siti Nurhaliza",
    role: "Owner, Batik Sejati (UMKM)",
    text: "Izin UMKM cuma bayar 100 ribuan, prosesnya cepat, adminnya sabar banget menjawab. Sekarang bisa jualan di marketplace resmi dan dapat bantuan pemerintah.",
    rating: 5,
  },
  {
    name: "Budi Santoso",
    role: "Owner, CV Distribusi Sejahtera",
    text: "CV saya jadi 5 hari, NPWP dan NIB lengkap satu paket. Harganya transparan dari awal, tidak ada biaya siluman. Recommended untuk usaha dagang.",
    rating: 5,
  },
  {
    name: "Dewi Lestari",
    role: "CEO, PT Sehat Prima Farma",
    text: "Izin klinik & apotek itu rumit banget dengan dinas kesehatan. Timnya paham detail regulasi, komunikatif, sampai izin terbit semua terkendali. Terima kasih!",
    rating: 5,
  },
] as const;

/* -------------------------------------------------------------------------- */
/*  STATISTIK KEPERCAYAAN                                                      */
/* -------------------------------------------------------------------------- */

export const TRUST_STATS = [
  { value: "12.500+", label: "Izin berhasil diterbitkan" },
  { value: "34", label: "Provinsi terjangkau" },
  { value: "98,7%", label: "Kepuasan klien" },
  { value: "1 hari", label: "Tercepat NIB terbit" },
] as const;

/* -------------------------------------------------------------------------- */
/*  NAVIGASI                                                                   */
/* -------------------------------------------------------------------------- */

export const NAV_LINKS = [
  { href: "#layanan", label: "Layanan" },
  { href: "#alasan", label: "Keunggulan" },
  { href: "#proses", label: "Cara Kerja" },
  { href: "#harga", label: "Paket" },
  { href: "#testimoni", label: "Testimoni" },
  { href: "#faq", label: "FAQ" },
] as const;

export const WA_LINK = `https://wa.me/${SITE.contact.whatsapp}?text=${encodeURIComponent(
  "Halo Pusat Perizinan, saya ingin konsultasi gratis mengenai pengurusan izin usaha."
)}`;
