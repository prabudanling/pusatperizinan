// ============================================================
// PUSATPERIZINAN.COM — Core Translations (id + en)
// INI ADALAH SUMBER REFERENSI UTAMA untuk semua 28 bahasa lain.
// Semua key WAJIB sama persis dengan interface Translation.
// ============================================================

import type { LangCode, Translation } from "./types";

const id: Translation = {
  // Header
  navServices: "Layanan",
  navCheckAI: "Cek Izin AI",
  navCalculator: "Kalkulator",
  navGuides: "Panduan",
  navBlog: "Blog",
  navCoverage: "Jangkauan",
  navPricing: "Harga",
  navFaq: "FAQ",
  headerTagline: "Konsultan Perizinan Usaha #1",
  ctaFree: "Konsultasi Gratis",
  // Hero
  heroBadge: "Dipercaya 1.247+ bisnis di 38 provinsi & 514 kota Indonesia",
  heroTitle1: "Urus Semua",
  heroHigh1: "Izin Usaha",
  heroTitle2: "Tinggal Terima",
  heroHigh2: "Beres",
  heroSubtitle:
    "NIB, PT, CV, Halal, BPOM, sampai AMDAL — diproses tim ahli, legal 100%, garansi uang kembali. Mulai dari Rp 350 ribu, tercepat 1 hari kerja.",
  heroBullet1: "NIB 1 hari • PT 3 hari • Tanpa ribet antre instansi",
  heroBullet2: "Jalur resmi pemerintah — dokumen sah & terverifikasi",
  heroBullet3: "Garansi 100% uang kembali jika izin gagal terbit",
  heroReviews: "dari 890+ ulasan klien",
  // Hero form
  formTitle: "Konsultasi Gratis 15 Menit",
  formSubtitle: "Tanpa biaya, tanpa komitmen — langsung dari konsultan senior.",
  labelFree: "Gratis",
  labelName: "Nama Lengkap *",
  labelWa: "No. WhatsApp *",
  labelSector: "Jenis Usaha",
  phSector: "Pilih sektor",
  labelNeed: "Kebutuhan",
  phNeed: "Pilih paket",
  pkgNotSure: "Belum tahu / konsultasi dulu",
  pkgPrefix: "Paket {p}",
  labelDesc: "Ceritakan singkat usaha Anda (opsional)",
  phDesc: "cth: Saya mau buka kafe di Bandung, sudah punya tempat, belum punya badan usaha...",
  btnSubmit: "Daftar Konsultasi Gratis",
  btnSending: "Mengirim...",
  privacyNote: "Data Anda aman & tidak dibagikan ke pihak ketiga",
  successTitle: "Anda Terdaftar! 🎉",
  successBody:
    "Terima kasih, {name}! Konsultan senior kami akan menghubungi WhatsApp Anda dalam 1x24 jam (biasanya < 15 menit di jam kerja).",
  btnAnother: "Daftarkan Usaha Lain",
  // Toasts
  toastSuccess: "Konsultasi Gratis Terdaftar! 🎉",
  toastFail: "Gagal mengirim",
  toastConn: "Koneksi bermasalah",
  // Stats
  statClients: "Klien Dilayani",
  statPermits: "Izin Diproses",
  statProvinces: "Provinsi",
  statCities: "Kabupaten/Kota",
  statSatisfaction: "Kepuasan Klien",
  statAvgTime: "Rata-rata Proses",
  statHours: "jam",
  // Section titles
  servicesT1: "Satu Pintu untuk",
  servicesTHigh: "Semua Kebutuhan Legal",
  servicesT2: "Usaha Anda",
  checkerT1: "Cek Izin yang",
  checkerTHigh: "Anda Butuhkan",
  checkerT2: "dalam 30 Detik",
  calcT1: "Kalkulator Biaya Perizinan —",
  calcTHigh: "Hitung Dulu, Putuskan Kemudian",
  calcT2: "",
  hubT1: "Panduan Perizinan Usaha Indonesia —",
  hubTHigh: "Lengkap, Jelas, Terkini",
  hubT2: "",
  blogT1: "Perpustakaan Artikel Perizinan",
  blogTHigh: "Terlengkap di Indonesia",
  blogT2: "",
  courseT1: "7 Hari Menguasai Perizinan",
  courseTHigh: "Usaha Indonesia",
  courseT2: "",
  coverageT1: "{n} Provinsi &",
  coverageTHigh: "{n} Kabupaten/Kota",
  coverageT2: "— Dari Sabang sampai Merauke",
  whyT1: "Bukan Sekadar Pengurusan Izin —",
  whyTHigh: "Mitra Legal Usaha Anda",
  whyT2: "",
  processT1: "4 Langkah Menuju",
  processTHigh: "Bisnis Legal",
  processT2: "",
  pricingT1: "Harga Jelas di Awal,",
  pricingTHigh: "Tanpa Biaya Siluman",
  pricingT2: "",
  testiT1: "1.247+ Bisnis Sudah",
  testiTHigh: "Bukti Legal",
  testiT2: "",
  compT1: "Kenapa Pilih Kami Dibanding",
  compTHigh: "Konsultan Lain?",
  compT2: "",
  faqT1: "Pertanyaan yang",
  faqTHigh: "Sering Ditanyakan",
  faqT2: "",
  ctaT1: "Bisnis Anda Sudah Jalan?",
  ctaTHigh: "Pastikan Legalnya Sekarang.",
  ctaT2: "",
  sitemapT1: "Direktori Lengkap",
  sitemapTHigh: "PusatPerizinan.com",
  sitemapT2: "",
  // Section subtitles
  servicesSub:
    "Dari UMKM sampai korporasi — 40+ jenis perizinan kami urus tuntas dengan jalur resmi pemerintah.",
  checkerSub:
    "Cukup deskripsikan usaha Anda. AI kami yang terlatih regulasi UU Cipta Kerja & OSS-RBA akan menyusun roadmap perizinan lengkap — gratis, tanpa daftar akun.",
  calcSub:
    "Pilih izin yang Anda butuhkan, sistem langsung menghitung estimasi biaya & waktu. Transparan sejak menit pertama — tanpa biaya tersembunyi.",
  hubSub:
    "Segala hal tentang NIB, PT, CV, Halal, BPOM, PBG/SLF, AMDAL, PMA, hingga pajak usaha — dipelajari dari dasar hingga detail teknis. Disusun dari UU Cipta Kerja & regulasi terbaru.",
  blogSub:
    "{n} artikel mendalam dari tim ahli regulasi kami — biaya pendirian PT, KBLI kuliner, PMA, RKAB tambang, travel umroh, hingga buka usaha di Arab Saudi. Gratis dibaca, selalu diperbarui.",
  courseSub:
    "Setiap pagi, satu materi ringkas 5 menit + checklist praktis langsung ke email Anda. Ditulis tim ahli regulasi kami — bukan teori, tapi yang benar-benar dipakai di lapangan.",
  coverageSub:
    "Tidak peduli usaha Anda berada di Batam, Wamena, atau Balikpapan — seluruh proses perizinan kami kerjakan online, dokumen dikirim via kurir, dan tim on-site kami hadir untuk kebutuhan audit fisik, AMDAL, maupun sektor tambang.",
  whySub:
    "Ribuan pemilik usaha pindah ke kami setelah kecewa dengan konsultan lain. Ini alasannya:",
  processSub: "Sehari pun tidak perlu ke kantor instansi. Semua kami yang koordinasi.",
  pricingSub:
    "Semua paket sudah termasuk biaya resmi & jasa. Bayar 50% di awal, 50% setelah izin terbit.",
  testiSub:
    "Rating 4.9/5 dari 890+ ulasan. Ini cerita mereka yang bisnisnya sekarang resmi dan tenang.",
  compSub:
    "Perbandingan objektif dengan praktik umum layanan pengurusan perizinan di Indonesia (Infiniti Office, EasyLegal, Izin.co.id, dan jasa lainnya).",
  faqSub: "Masih ragu? Jawaban ini mungkin membantu. Atau tanya langsung ke AI Consultant kami.",
  ctaSub:
    "Setiap hari tanpa izin resmi = risiko denda, sanksi, dan hilangnya peluang tender serta pendanaan. Konsultasi gratis 15 menit — kami petakan semua yang Anda butuhkan, Anda bebas putuskan setelahnya.",
  sitemapSub:
    "Navigasi satu halaman ke seluruh konten & layanan kami — untuk Anda, dan untuk mesin pencari.",
  // Final CTA extras
  ctaBadge: "SLOT TERBATAS PER HARI",
  ctaFormTitle: "Book Konsultasi Gratis",
  ctaFormSub: "Isi 30 detik — konsultan senior kami yang menghubungi Anda.",
  ctaSubmit: "Booking Konsultasi Gratis",
  ctaSuccessTitle: "Permintaan Diterima! 🎉",
  ctaSuccessBody:
    "Konsultan kami menghubungi Anda via WhatsApp maksimal 1x24 jam. Sambil menunggu, coba fitur Cek Izin AI ya!",
  ctaWaBtn: "Chat WhatsApp Sekarang",
  ctaPrivacy: "100% gratis • Tanpa komitmen • Data aman",
  // Knowledge hub tabs
  tabPerIzin: "Per Izin",
  tabPerSektor: "Per Sektor",
  tabPerWilayah: "Per Wilayah",
  tabKbli: "KBLI",
  // Email course extras
  courseBadge: "Kursus Email Gratis — 100% Tanpa Biaya",
  courseFormTitle: "Daftar Gratis Sekarang",
  courseFormSub: "8 hari × 5 menit = bisnis Anda 100% legal & bebas khawatir denda.",
  courseSuccessTitle: "Selamat datang di kelas!",
  // Footer
  footerTagline:
    "Konsultan perizinan usaha terpercaya Indonesia. Legalitas bisnis Anda ditangani tim ahli — cepat, transparan, bergaransi.",
  footerVerified:
    "Terdaftar & bekerja sama dengan notaris resmi di 38 provinsi & 514 kabupaten/kota",
  footerColServices: "Layanan",
  footerColCompany: "Perusahaan",
  footerColContact: "Kontak",
  footerHours: "Senin-Sabtu, 08.00-20.00 WIB",
  footerNote:
    "Satu lantai dengan Bursa Efek Indonesia • Melayani seluruh Indonesia online",
  footerRights:
    "© {year} PusatPerizinan.com — PT Digital Bisnis Manajemen. Seluruh hak cipta dilindungi.",
  footerMade: "Dibuat dengan ❤️ untuk kemajuan UMKM Indonesia",
  // Chat
  chatTitle: "RIZKI — Konsultan AI",
  chatStatus: "Online • Balas dalam hitungan detik",
  chatWelcome:
    "Halo Kak! 👋 Saya **RIZKI**, Konsultan AI PusatPerizinan.com — siaga 24 jam untuk semua pertanyaan perizinan usaha.\n\nNIB, PT, CV, Halal, BPOM, atau izin lainnya? Tanya saja langsung! 😊",
  chatPlaceholder: "Tanya soal izin usaha...",
  chatTyping: "RIZKI sedang mengetik...",
  chatQr1: "Apa saja izin untuk buka kafe?",
  chatQr2: "Berapa biaya pendirian PT?",
  chatQr3: "Cara daftar NIB untuk UMKM",
  chatQr4: "Bedanya PIRT dan BPOM apa?",
  // Language
  languageLabel: "Bahasa",
  searchLanguages: "Cari bahasa...",
  contentNote:
    "Panduan lengkap di bawah tersedia dalam Bahasa Indonesia — tanya RIZKI AI untuk penjelasan dalam bahasa Anda.",
};

const en: Translation = {
  // Header
  navServices: "Services",
  navCheckAI: "AI License Check",
  navCalculator: "Calculator",
  navGuides: "Guides",
  navBlog: "Blog",
  navCoverage: "Coverage",
  navPricing: "Pricing",
  navFaq: "FAQ",
  headerTagline: "Indonesia's #1 Business Licensing Consultant",
  ctaFree: "Free Consultation",
  // Hero
  heroBadge: "Trusted by 1,247+ businesses across 38 provinces & 514 cities in Indonesia",
  heroTitle1: "Get Every",
  heroHigh1: "Business License",
  heroTitle2: "Handled — Sit Back &",
  heroHigh2: "Relax",
  heroSubtitle:
    "From NIB, PT, CV, Halal, BPOM to AMDAL — processed by experts, 100% legal, money-back guarantee. Starting from Rp 350 thousand, as fast as 1 business day.",
  heroBullet1: "NIB in 1 day • PT in 3 days • No queuing at government offices",
  heroBullet2: "Official government channels — valid & verified documents",
  heroBullet3: "100% money-back guarantee if your license fails to issue",
  heroReviews: "from 890+ client reviews",
  // Hero form
  formTitle: "Free 15-Minute Consultation",
  formSubtitle: "No fees, no commitment — straight from a senior consultant.",
  labelFree: "Free",
  labelName: "Full Name *",
  labelWa: "WhatsApp Number *",
  labelSector: "Business Type",
  phSector: "Choose a sector",
  labelNeed: "Your Needs",
  phNeed: "Choose a package",
  pkgNotSure: "Not sure / consult first",
  pkgPrefix: "{p} Package",
  labelDesc: "Briefly tell us about your business (optional)",
  phDesc: "e.g.: I want to open a café in Bandung, I have a place but no legal entity yet...",
  btnSubmit: "Register for Free Consultation",
  btnSending: "Sending...",
  privacyNote: "Your data is safe & never shared with third parties",
  successTitle: "You're Registered! 🎉",
  successBody:
    "Thank you, {name}! Our senior consultant will contact your WhatsApp within 24 hours (usually < 15 minutes on business days).",
  btnAnother: "Register Another Business",
  // Toasts
  toastSuccess: "Free Consultation Registered! 🎉",
  toastFail: "Failed to send",
  toastConn: "Connection problem",
  // Stats
  statClients: "Clients Served",
  statPermits: "Permits Processed",
  statProvinces: "Provinces",
  statCities: "Cities & Regencies",
  statSatisfaction: "Client Satisfaction",
  statAvgTime: "Avg. Processing Time",
  statHours: "hours",
  // Section titles
  servicesT1: "One Door for",
  servicesTHigh: "All Your Legal Needs",
  servicesT2: "as a Business",
  checkerT1: "Find the Licenses",
  checkerTHigh: "You Need",
  checkerT2: "in 30 Seconds",
  calcT1: "License Cost Calculator —",
  calcTHigh: "Calculate First, Decide Later",
  calcT2: "",
  hubT1: "Indonesia Business Licensing Guides —",
  hubTHigh: "Complete, Clear, Up to Date",
  hubT2: "",
  blogT1: "Licensing Article Library",
  blogTHigh: "Most Complete in Indonesia",
  blogT2: "",
  courseT1: "Master Business Licensing in",
  courseTHigh: "7 Days",
  courseT2: "",
  coverageT1: "{n} Provinces &",
  coverageTHigh: "{n} Cities & Regencies",
  coverageT2: "— From Sabang to Merauke",
  whyT1: "More Than a Licensing Agent —",
  whyTHigh: "Your Legal Business Partner",
  whyT2: "",
  processT1: "4 Steps to a",
  processTHigh: "Fully Legal Business",
  processT2: "",
  pricingT1: "Clear Pricing Upfront,",
  pricingTHigh: "No Hidden Fees",
  pricingT2: "",
  testiT1: "1,247+ Businesses",
  testiTHigh: "Legally Proven",
  testiT2: "",
  compT1: "Why Choose Us Over",
  compTHigh: "Other Consultants?",
  compT2: "",
  faqT1: "Questions",
  faqTHigh: "Frequently Asked",
  faqT2: "",
  ctaT1: "Your Business Is Already Running?",
  ctaTHigh: "Make It Official Now.",
  ctaT2: "",
  sitemapT1: "Complete Directory of",
  sitemapTHigh: "PusatPerizinan.com",
  sitemapT2: "",
  // Section subtitles
  servicesSub:
    "From SMEs to corporations — 40+ license types handled end-to-end through official government channels.",
  checkerSub:
    "Just describe your business. Our AI, trained on the Job Creation Law & OSS-RBA regulations, builds your complete licensing roadmap — free, no sign-up needed.",
  calcSub:
    "Pick the licenses you need and instantly get estimated costs & timelines. Transparent from the first minute — no hidden fees.",
  hubSub:
    "Everything about NIB, PT, CV, Halal, BPOM, PBG/SLF, AMDAL, PMA, and business taxes — from the basics to technical details. Based on the Job Creation Law & latest regulations.",
  blogSub:
    "{n} in-depth articles from our regulatory experts — PT setup costs, culinary KBLI, PMA, mining RKAB, Umrah travel, to doing business in Saudi Arabia. Free to read, always updated.",
  courseSub:
    "Every morning: one 5-minute lesson + a practical checklist straight to your inbox. Written by our regulatory experts — not theory, but what is actually used in the field.",
  coverageSub:
    "Whether your business is in Batam, Wamena, or Balikpapan — the entire licensing process is done online, documents are shipped by courier, and our on-site team comes for physical audits, AMDAL, or the mining sector.",
  whySub:
    "Thousands of business owners switched to us after being disappointed by other consultants. Here's why:",
  processSub: "Not a single day needed at government offices. We handle all the coordination.",
  pricingSub:
    "Every package includes official fees & service fees. Pay 50% upfront, 50% after the license is issued.",
  testiSub:
    "4.9/5 rating from 890+ reviews. Stories from clients whose businesses are now official and worry-free.",
  compSub:
    "An objective comparison with common practices among licensing service providers in Indonesia (Infiniti Office, EasyLegal, Izin.co.id, and others).",
  faqSub: "Still unsure? These answers might help. Or ask our AI Consultant directly.",
  ctaSub:
    "Every day without official permits = risk of fines, sanctions, and lost tender & funding opportunities. Free 15-minute consultation — we map everything you need, and you decide afterward.",
  sitemapSub:
    "One-page navigation to all our content & services — for you, and for search engines.",
  // Final CTA extras
  ctaBadge: "LIMITED SLOTS PER DAY",
  ctaFormTitle: "Book a Free Consultation",
  ctaFormSub: "Fill in 30 seconds — our senior consultant contacts you.",
  ctaSubmit: "Book Free Consultation",
  ctaSuccessTitle: "Request Received! 🎉",
  ctaSuccessBody:
    "Our consultant will contact you via WhatsApp within 24 hours. While waiting, try our AI License Check feature!",
  ctaWaBtn: "Chat on WhatsApp Now",
  ctaPrivacy: "100% free • No commitment • Data is safe",
  // Knowledge hub tabs
  tabPerIzin: "Per License",
  tabPerSektor: "Per Sector",
  tabPerWilayah: "Per Region",
  tabKbli: "KBLI",
  // Email course extras
  courseBadge: "Free Email Course — 100% No Charge",
  courseFormTitle: "Register Free Now",
  courseFormSub: "8 days × 5 minutes = a 100% legal business with no fine worries.",
  courseSuccessTitle: "Welcome to the class!",
  // Footer
  footerTagline:
    "Indonesia's trusted business licensing consultant. Your business legality handled by experts — fast, transparent, guaranteed.",
  footerVerified:
    "Registered & partnered with official notaries across 38 provinces & 514 cities/regencies",
  footerColServices: "Services",
  footerColCompany: "Company",
  footerColContact: "Contact",
  footerHours: "Monday-Saturday, 08.00-20.00 WIB",
  footerNote:
    "Same floor as the Indonesia Stock Exchange • Serving all of Indonesia online",
  footerRights:
    "© {year} PusatPerizinan.com — PT Digital Bisnis Manajemen. All rights reserved.",
  footerMade: "Made with ❤️ for the progress of Indonesian SMEs",
  // Chat
  chatTitle: "RIZKI — AI Consultant",
  chatStatus: "Online • Replies in seconds",
  chatWelcome:
    "Hello! 👋 I'm **RIZKI**, the AI Consultant of PusatPerizinan.com — on duty 24 hours for all your business licensing questions.\n\nNIB, PT, CV, Halal, BPOM, or any other license? Just ask! 😊",
  chatPlaceholder: "Ask about business licenses...",
  chatTyping: "RIZKI is typing...",
  chatQr1: "What licenses do I need to open a café?",
  chatQr2: "How much does it cost to set up a PT (limited company)?",
  chatQr3: "How to register NIB for SMEs",
  chatQr4: "What's the difference between PIRT and BPOM?",
  // Language
  languageLabel: "Language",
  searchLanguages: "Search language...",
  contentNote:
    "The full guides below are in Indonesian — ask RIZKI AI for an explanation in your language.",
};

export const TRANSLATIONS_CORE: Record<"id" | "en", Translation> = { id, en };
