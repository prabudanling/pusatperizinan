// ============================================================
// PUSATPERIZINAN.COM — KATALOG LENGKAP (Single Source of Truth)
// ============================================================
// Sumber: katalog layanan terpadu PusatPerizinan.com (31 divisi,
// 150+ jenis layanan, 6 paket bundel unggulan).
//
// ATURAN:
//  - Harga = KISARAN JASA KONSULTAN (bukan biaya resmi negara).
//  - Angka agregat (jumlah layanan/kategori) DIHITUNG DINAMIS
//    lewat helper di bawah — jangan hardcode di halaman.
//  - Klaim bisnis tetap mengikuti src/lib/site.ts (TRUST_METRICS).
// ============================================================

export interface CatalogService {
  /** Kode layanan sesuai katalog, mis. "A.1a", "R.1". */
  code: string;
  name: string;
  priceFrom: number | null;
  priceTo: number | null;
  desc: string;
  /** Checklist paket (untuk layanan flagship). */
  includes?: string[];
  timeline?: string;
  badge?: "FLAGSHIP" | "MOST POPULAR" | "BEST VALUE" | "NEW" | "RECURRING";
  /** Varian paket (mis. PT punya 6 pilihan paket). */
  variants?: { name: string; priceFrom: number; desc: string }[];
}

export interface CatalogCategory {
  /** Kode divisi, mis. "A", "AA". */
  code: string;
  slug: string;
  name: string;
  icon: string;
  tier: "primer" | "sekunder";
  /** Divisi andalan — tampil duluan & diberi highlight. */
  flagship?: boolean;
  tagline: string;
  desc: string;
  services: CatalogService[];
  faq: { q: string; a: string }[];
  /** Tautan silang ke halaman pengetahuan/layanan yang sudah ada. */
  related: { label: string; href: string }[];
}

export interface CatalogBundle {
  name: string;
  price: number;
  /** Estimasi hemat dibanding beli satuan. */
  save: number;
  audience: string;
  badge?: "MOST POPULAR" | "FLAGSHIP" | "BEST VALUE";
  includes: string[];
}

// ------------------------------------------------------------
// FORMAT & STATISTIK DINAMIS
// ------------------------------------------------------------

/** Format angka → "Rp 15.000.000" (id-ID, deterministik — aman SSR). */
export function fmtIdr(n: number): string {
  return `Rp ${new Intl.NumberFormat("id-ID").format(n)}`;
}

/** Rentang harga rapi: "Rp 5–15 juta", "Rp 450 ribu", "Rp 500 juta". */
export function fmtRange(from: number | null, to: number | null): string {
  const unit = (v: number): string => {
    if (v >= 1_000_000_000) {
      const m = v / 1_000_000_000;
      return `${Number.isInteger(m) ? m : m.toFixed(1)} miliar`;
    }
    if (v >= 1_000_000) {
      const j = v / 1_000_000;
      return `${Number.isInteger(j) ? j : j.toFixed(1)} juta`;
    }
    if (v >= 1_000) return `${v / 1_000} ribu`;
    return String(v);
  };
  if (from && to) return `Rp ${unit(from)} – ${unit(to)}`;
  if (from) return `Rp ${unit(from)}`;
  if (to) return `Rp ${unit(to)}`;
  return "Hubungi kami";
}

export const CATEGORIES: CatalogCategory[] = [
  // ==========================================================
  // LAYANAN PRIMER (CORE EXPERTISE)
  // ==========================================================
  {
    code: "R",
    slug: "travel-haji-umrah",
    name: "Perizinan Ibadah & Perjalanan Haji-Umrah",
    icon: "🕌",
    tier: "primer",
    flagship: true,
    tagline: "Spesialis inti kami — perizinan travel haji & umrah dari nol sampai jamaah berangkat",
    desc: "Divisi paling dalam expertise kami. Kami menangani seluruh rantai legalitas bisnis travel ibadah: pendirian badan usaha dengan KBLI yang tepat, TDUP, PPIU dari Kementerian Agama, hingga PIHK untuk travel besar yang ingin menjual program haji plus. Setiap layanan disertai pendampingan ke Kemenag (Kantor Pusat & Kanwil), persiapan dokumen komitmen operasional, dan edukasi compliance agar izin tidak bermasalah saat audit.",
    services: [
      {
        code: "R.1",
        name: "PPIU — Penyelenggara Perjalanan Ibadah Umrah",
        priceFrom: 15_000_000,
        priceTo: 25_000_000,
        badge: "FLAGSHIP",
        timeline: "90–120 hari",
        desc: "Izin dasar yang WAJIB dimiliki sebelum bisa mengajukan PIHK (Haji Khusus). Kami urus dari PT dengan KBLI 79120, SIUP Pariwisata (TDUP) aktif, NIB via OSS, NPWP badan, rekening khusus operasional, registrasi SISKOPATUH, hingga rekomendasi Kanwil Kemenag setempat.",
        includes: [
          "Konsultasi mendalam bisnis travel umrah & analisis kelayakan",
          "Pendirian PT (jika belum ada) dengan nama & KBLI tepat",
          "Pengurusan SIUP Pariwisata (TDUP) status Efektif",
          "Pengurusan NIB & izin usaha via OSS RBA",
          "Pengurusan NPWP Badan & SKT",
          "Pendampingan buka rekening khusus keperluan PPIU",
          "Koordinasi dengan Kemenag (Kantor Pusat & Kanwil)",
          "Persiapan lengkap dokumen administratif & komitmen operasional",
          "Pendampingan hingga izin PPIU terbit resmi",
          "Training guideline operasional PPIU terbaru (compliance)",
          "Template SOP keselamatan jamaah & manajemen keuangan",
          "Akses jaringan mitra travel PusatPerizinan untuk networking",
        ],
      },
      {
        code: "R.2",
        name: "PIHK — Penyelenggara Ibadah Haji Khusus (Haji Plus)",
        priceFrom: 25_000_000,
        priceTo: 40_000_000,
        badge: "FLAGSHIP",
        timeline: "120–150 hari (setelah PPIU 2 tahun aktif)",
        desc: "Izin paling bernilai untuk travel besar: membuka kuota haji plus di luar kuota reguler dengan harga premium. Syarat intinya PPIU aktif 2 tahun, track record minimal 2.000 jamaah umrah, laporan keuangan auditan 2 tahun, nol keluhan signifikan, dan rekomendasi asosiasi/dewan penasehat.",
        includes: [
          "Analisis kelayakan & proyeksi revenue PIHK terperinci",
          "Persiapan dokumentasi pengalaman PPIU (jurnal jamaah, laporan)",
          "Koordinasi intensif dengan Kemenag & Ditjen PHU",
          "Pengurusan & verifikasi seluruh syarat administratif",
          "Konsultasi strategi operasional haji plus",
          "Training khusus pengurusan tamu haji (berbeda dari umrah)",
          "Dukungan penuh laporan & compliance Kemenag",
          "Template perjanjian jamaah haji plus sesuai syariah",
          "Integrasi dengan sistem monitoring Kemenag (SISKOHAT)",
          "Pengenalan ke operator haji Saudi berpengalaman",
        ],
      },
      {
        code: "R.3",
        name: "Izin Keberangkatan Haji Plus (Kuota Tambahan)",
        priceFrom: 5_000_000,
        priceTo: 15_000_000,
        badge: "RECURRING",
        timeline: "30–60 hari per musim haji",
        desc: "Layanan tahunan untuk travel yang sudah memegang PIHK: pengajuan kuota tambahan tiap musim haji. Proses cepat, permintaan stabil, dan klien kami umumnya repeat order setiap musim.",
        includes: [
          "Verifikasi kelengkapan dokumen permohonan",
          "Pengajuan resmi ke Kemenag (Ditjen PHU)",
          "Follow-up tracking hingga approval",
          "Konsultasi strategi pemasaran kuota tambahan",
          "Update compliance regulasi musim haji terbaru",
        ],
      },
      {
        code: "R.4",
        name: "Sertifikasi Tour Leader (Pemandu Jamaah Haji-Umrah)",
        priceFrom: 5_000_000,
        priceTo: 8_000_000,
        badge: "NEW",
        timeline: "30–60 hari termasuk training & ujian",
        desc: "Tour leader haji-umrah wajib bersertifikat resmi Kemenag (valid 5 tahun) yang membuktikan kompetensi kepemimpinan jamaah, pengetahuan ibadah, dan manajemen krisis. Syarat: SMA/SMK, pengalaman guide 1–2 tahun, pelatihan 40 jam, ujian teori & praktik.",
        includes: [
          "Pendaftaran ke lembaga sertifikasi terakreditasi Kemenag",
          "Materi training komprehensif (bahasa Arab dasar, ibadah, manajemen krisis)",
          "Simulasi dengan jamaah nyata",
          "Persiapan ujian teori & praktik",
          "Penerbitan sertifikat resmi",
        ],
      },
      {
        code: "R.5",
        name: "Sertifikasi Tour Guide (Kemenpar)",
        priceFrom: 3_500_000,
        priceTo: 5_500_000,
        badge: "NEW",
        timeline: "15–30 hari",
        desc: "Lisensi pemandu wisata resmi Kemenpar (valid 5 tahun) — prasyarat bekerja sebagai guide profesional. Mencakup pelatihan 20 jam, ujian lisan & praktik, hingga sertifikat resmi.",
        includes: ["Training materi tour guide profesional", "Persiapan ujian lisan & praktik", "Sertifikat resmi Kemenpar"],
      },
      {
        code: "R.6",
        name: "Paket Legalitas Perusahaan untuk Bisnis Haji-Umrah",
        priceFrom: 3_000_000,
        priceTo: 8_000_000,
        badge: "NEW",
        timeline: "60–90 hari",
        desc: "Paket all-in-one untuk pelaku baru: pendirian PT (akta & SK Kemenkumham), NIB & NPWP, SIUP Pariwisata (TDUP), izin OSS lengkap, virtual office 1 tahun bila diperlukan, dan setup akun SISKOPATUH — langsung siap mengajukan PPIU.",
        includes: [
          "Pendirian PT (akta, SK Menteri)",
          "NIB & NPWP",
          "SIUP Pariwisata (TDUP)",
          "Izin OSS lengkap",
          "Virtual office 1 tahun (jika diperlukan)",
          "Setup akun SISKOPATUH (siap untuk PPIU)",
        ],
      },
      {
        code: "R.7",
        name: "Perpajakan & Keuangan Bisnis Haji-Umrah",
        priceFrom: 2_000_000,
        priceTo: 5_000_000,
        badge: "NEW",
        desc: "Travel haji-umrah punya regulasi pajak khusus — terutama penempatan dana jamaah (escrow). Kami bantu setup NPWP & PKP, struktur akun escrow yang tax-compliant, laporan SPT tahunan, dan perencanaan keuangan bisnis.",
        includes: [
          "Setup NPWP & PKP (jika perlu)",
          "Konsultasi pajak travel (PPh, PPN, PPnBM)",
          "Struktur akun escrow jamaah yang tax-compliant",
          "Laporan SPT tahunan travel",
          "Konsultasi perencanaan keuangan bisnis",
        ],
      },
      {
        code: "R.8",
        name: "Perpanjangan PPIU/PIHK (Siklus 5 Tahun)",
        priceFrom: 8_000_000,
        priceTo: 15_000_000,
        badge: "RECURRING",
        timeline: "60–90 hari sebelum izin kedaluwarsa",
        desc: "PPIU & PIHK berlaku 5 tahun. Kami menangani verifikasi dokumen, pembaruan data, persiapan laporan compliance, pengajuan ke Kemenag, dan follow-up hingga izin baru terbit — bisnis tetap legal tanpa jeda.",
        includes: [
          "Verifikasi dokumen & update data",
          "Persiapan laporan compliance",
          "Pengajuan perpanjangan ke Kemenag",
          "Follow-up hingga terbit izin baru",
        ],
      },
      {
        code: "R.9",
        name: "Audit Compliance PPIU/PIHK (Persiapan Pra-Audit)",
        priceFrom: 5_000_000,
        priceTo: 12_000_000,
        badge: "NEW",
        desc: "Kemenag rutin mengaudit PPIU/PIHK. Kami bantu travel mempersiapkan diri: review kelengkapan dokumen, pengecekan kesesuaian dengan peraturan terbaru, identifikasi gap, sesi mock audit, dan training staf.",
        includes: [
          "Review kelengkapan dokumen",
          "Cek compliance dengan peraturan terbaru",
          "Identifikasi gap dan rekomendasi perbaikan",
          "Sesi mock audit",
          "Training staf untuk menghadapi audit",
        ],
      },
    ],
    faq: [
      {
        q: "Apa bedanya PPIU dan PIHK?",
        a: "PPIU adalah izin umrah dari Kemenag — pintu masuk bisnis travel ibadah. PIHK (haji khusus/haji plus) adalah izin tingkat lanjut yang hanya bisa diajukan travel dengan PPIU aktif minimal 2 tahun dan track record kuat, serta membuka hak menjual paket haji plus bermargin jauh lebih tinggi.",
      },
      {
        q: "Berapa modal minimal untuk bisnis travel umrah yang legal?",
        a: "Untuk legalitas dasar, paket legalitas perusahaan (R.6) mulai Rp 3 juta dan PPIU mulai Rp 15 juta, dengan timeline realistis 90–120 hari. Kementerian Agama juga mensyaratkan kantor operasional tetap yang layak — persiapannya kami bahas di sesi konsultasi kelayakan.",
      },
      {
        q: "Apakah izin PPIU/PIHK bisa hangus saat audit Kemenag?",
        a: "Izin tidak otomatis hangus, tetapi temuan audit serius (jamaah tertahan, dana tidak di escrow, laporan palsu) bisa menggantung atau mencabut izin. Layanan pra-audit kami (R.9) dirancang untuk menemukan dan menutup gap sebelum auditor datang.",
      },
    ],
    related: [
      { label: "Halaman layanan PPI Umroh", href: "/layanan/ppi-umroh" },
      { label: "Halaman layanan PPI Haji", href: "/layanan/ppi-haji" },
      { label: "Panduan PPI Umroh", href: "/panduan/ppi-umroh" },
      { label: "Panduan PPI Haji", href: "/panduan/ppi-haji" },
      { label: "Cara membuka travel umroh (PPIU)", href: "/blog/cara-membuka-travel-umroh-ppiu" },
      { label: "Testimoni kategori umroh-haji", href: "/testimoni/umroh-haji-travel" },
    ],
  },
  {
    code: "D",
    slug: "pariwisata-perhotelan",
    name: "Perizinan Pariwisata & Perhotelan",
    icon: "🏨",
    tier: "primer",
    tagline: "Solusi lengkap untuk bisnis travel, hotel, restoran & event",
    desc: "Divisi pendukung langsung bisnis travel ibadah sekaligus berdiri sendiri untuk hotel, restoran, dan event organizer. Mulai TDUP sebagai izin dasar pariwisata, izin usaha hotel dengan SLF, hingga sertifikasi halal untuk hospitality.",
    services: [
      {
        code: "D.1",
        name: "Tanda Daftar Usaha Pariwisata (TDUP)",
        priceFrom: 12_000_000,
        timeline: "± 30–60 hari",
        desc: "Tanda daftar usaha pariwisata status Efektif untuk travel, restoran, coffee shop, dan event organizer — sekaligus prasyarat pengajuan PPIU.",
      },
      {
        code: "D.2",
        name: "Izin Usaha Hotel",
        priceFrom: 15_000_000,
        badge: "NEW",
        desc: "Paket lengkap operasional hotel: NIB dengan KBLI perhotelan, sertifikat standar usaha hotel, Sertifikat Laik Fungsi (SLF), dan izin operasional.",
      },
      {
        code: "D.3",
        name: "Pengurusan MICE (Meeting, Incentive, Conference, Exhibition)",
        priceFrom: 11_700_000,
        desc: "Untuk event organizer profesional yang membutuhkan konvensi & licensing ruang acara skala besar.",
      },
      {
        code: "D.4",
        name: "BPW — Biro Perjalanan Wisata (Izin Dasar Travel)",
        priceFrom: 8_000_000,
        desc: "Pendaftaran biro perjalanan wisata dalam sistem TDUP Kemenpar — prasyarat sebelum mengajukan PPIU/PIHK. Termasuk dalam paket TDUP.",
      },
      {
        code: "D.5",
        name: "Sertifikasi Laik Hygiene Sanitasi (Restoran/Hotel)",
        priceFrom: 3_500_000,
        desc: "Sertifikasi laik hygiene sanitasi untuk jasa boga, katering, dan restoran melalui audit Dinkes setempat.",
      },
      {
        code: "D.6",
        name: "Sertifikasi Halal untuk Produk Hospitality",
        priceFrom: 4_500_000,
        desc: "Sertifikat halal BPJPH untuk hotel dengan katering halal — fatwa MUI terintegrasi dalam prosesnya.",
      },
    ],
    faq: [
      {
        q: "Apakah TDUP wajib untuk semua bisnis pariwisata?",
        a: "TDUP wajib bagi penyelenggara jasa pariwisata termasuk biro perjalanan, dan menjadi prasyarat pengajuan PPIU. Restoran dan event organizer juga umumnya membutuhkannya tergantung klasifikasi usaha di OSS.",
      },
      {
        q: "Izin hotel butuh dokumen bangunan apa saja?",
        a: "Minimal SLF (Sertifikat Laik Fungsi) yang menegaskan bangunan layak dioperasikan, plus NIB dengan KBLI perhotelan dan sertifikat standar usaha. Jika bangunan belum ber-SLF, prosesnya kami mulai dari situ agar tidak jadi temuan saat operasional.",
      },
      {
        q: "Apakah sertifikat halal hotel membedakan dari halal produk pangan?",
        a: "Prinsipnya sama dari BPJPH, tetapi cakupannya berbeda: hospitality menilai seluruh rantai katering internal hotel, mulai dari pengadaan bahan sampai dapur dan penyajian. Karena itu auditnya lebih luas dibanding sertifikasi produk kemasan.",
      },
    ],
    related: [
      { label: "Halaman layanan Halal", href: "/layanan/halal" },
      { label: "Panduan sertifikasi halal", href: "/panduan/halal" },
      { label: "Panduan PBG & perizinan bangunan", href: "/panduan/pbg" },
    ],
  },
  {
    code: "G",
    slug: "iso-sertifikasi-internasional",
    name: "ISO & Sertifikasi Mutu Internasional",
    icon: "⭐",
    tier: "primer",
    tagline: "Naikkan kredibilitas bisnis dengan sertifikasi internasional",
    desc: "Sertifikasi ISO opsional namun sangat menentukan untuk travel premium, pemenang tender, dan perusahaan yang mengejar standar global. Kami menyediakan konsultasi, audit internal, hingga pendampingan sertifikasi lembaga terakreditasi — dengan paket bundel untuk perusahaan yang ingin mengamankan tiga dimensi sekaligus: mutu, lingkungan, dan keselamatan.",
    services: [
      {
        code: "G.1",
        name: "ISO 9001:2015 — Quality Management System",
        priceFrom: 9_000_000,
        desc: "Sistem manajemen mutu: konsultasi, audit internal, dan pembuktian komitmen kualitas kepada pelanggan/mitra.",
      },
      {
        code: "G.2",
        name: "ISO 14001:2015 — Environmental Management",
        priceFrom: 9_000_000,
        badge: "NEW",
        desc: "Sistem manajemen lingkungan — kredensial green tourism dan praktik bisnis berkelanjutan.",
      },
      {
        code: "G.3",
        name: "ISO 45001:2018 — Health & Safety Management",
        priceFrom: 9_000_000,
        badge: "NEW",
        desc: "Sistem manajemen K3. Kritis untuk travel haji/umrah sebagai bentuk pengelolaan risiko dan komitmen keselamatan jamaah.",
      },
      {
        code: "G.4",
        name: "ISO 27001:2022 — Information Security Management",
        priceFrom: 12_000_000,
        badge: "NEW",
        desc: "Keamanan informasi untuk perusahaan dengan sistem digital/booking online: perlindungan data pelanggan dan standar keamanan siber global.",
      },
      {
        code: "G.5",
        name: "Bundel \u201cTravel Excellence Certification\u201d",
        priceFrom: 30_000_000,
        badge: "BEST VALUE",
        desc: "ISO 9001 + ISO 14001 + ISO 45001 dalam satu paket dengan diskon bundel Rp 6 juta — profesional di tiga dimensi sekaligus: mutu, lingkungan, keselamatan.",
        includes: [
          "ISO 9001 (Quality Management)",
          "ISO 14001 (Environmental)",
          "ISO 45001 (Health & Safety — kritis untuk travel)",
          "Konsultasi + audit internal + persiapan sertifikasi",
          "Pendampingan implementasi",
        ],
      },
    ],
    faq: [
      {
        q: "Berapa lama proses sertifikasi ISO dari nol?",
        a: "Umumnya 3–6 bulan tergantung kesiapan dokumen dan siklus audit lembaga sertifikasi. Perusahaan dengan SOP yang sudah tertata bisa lebih cepat karena tahap dokumentasi sistem tidak dikerjakan dari nol.",
      },
      {
        q: "Apakah sertifikat ISO wajib diperbarui?",
        a: "Ya, sertifikat ISO berlaku 3 tahun dengan audit pemantauan tahunan (surveillance). Kami membantu mempersiapkan siklus audit tersebut agar sertifikat tidak tergantung.",
      },
      {
        q: "Kenapa ISO 45001 disebut kritis untuk travel ibadah?",
        a: "Karena bisnis travel ibadah menangani kelompok besar orang lanjut usia di area yang padat. Sistem manajemen K3 menjadi bukti nyata pengelolaan risiko jamaah — sinyal kuat bagi regulator maupun calon jamaah.",
      },
    ],
    related: [
      { label: "Sertifikasi × provinsi (hub DKI Jakarta)", href: "/layanan/sertifikasi/dki-jakarta" },
      { label: "Semua sertifikasi × 38 provinsi", href: "/layanan/sertifikasi/jawa-barat" },
    ],
  },

  // ==========================================================
  // LAYANAN SEKUNDER (SUPPORTING) — SEMUA KEBUTUHAN UMUM
  // ==========================================================
  {
    code: "A",
    slug: "pendirian-badan-usaha",
    name: "Pendirian Badan Usaha",
    icon: "🏢",
    tier: "sekunder",
    tagline: "Semua jenis badan usaha: PT, CV, Firma, Yayasan, PMA, UD",
    desc: "Fondasi semua bisnis. Kami menyediakan 23 varian paket pendirian dari PT Perorangan yang ringan sampai PMA dengan izin lengkap — semuanya dengan pengecekan nama, akta notaris, SK pengesahan, dan opsi tambahan NPWP, NIB, rekening, stempel, hingga virtual office.",
    services: [
      {
        code: "A.1",
        name: "Pendirian PT (Perseroan Terbatas) — 6 pilihan paket",
        priceFrom: 2_000_000,
        priceTo: 7_900_000,
        desc: "Dari PT Perorangan yang ringan hingga paket premium all-in-one dengan izin lengkap dan virtual office.",
        variants: [
          { name: "PT Perorangan", priceFrom: 2_000_000, desc: "Pengecekan nama, SK Menteri, hingga 20 KBLI" },
          { name: "PT + Izin Lengkap", priceFrom: 4_500_000, desc: "Semua di atas + NPWP, NIB, rekening, stempel" },
          { name: "PT Sederhana", priceFrom: 3_000_000, desc: "Pengecekan nama, akta, SK Menteri" },
          { name: "PT + Izin Komprehensif", priceFrom: 5_500_000, desc: "Fitur paket izin lengkap + akses OSS penuh" },
          { name: "PT + Izin + Virtual Office", priceFrom: 6_000_000, desc: "Semua di atas + virtual office 1 tahun" },
          { name: "PT + Izin + Virtual Premium", priceFrom: 7_900_000, desc: "All-in-one paling lengkap" },
        ],
      },
      {
        code: "A.2",
        name: "Pendirian CV (Commanditaire Vennootschap) — 3 paket",
        priceFrom: 2_250_000,
        priceTo: 6_900_000,
        desc: "CV Dasar Rp 2,25 juta; CV + Izin Rp 4,5 juta; CV + Izin + Virtual Office Rp 6,9 juta.",
      },
      {
        code: "A.3",
        name: "Pendirian Firma — 3 paket",
        priceFrom: 2_250_000,
        priceTo: 6_900_000,
        desc: "Untuk kemitraan profesional: Firma Dasar Rp 2,25 juta; Firma + Izin Rp 4,5 juta; Firma + Izin + Virtual Office Rp 6,9 juta.",
      },
      {
        code: "A.4",
        name: "Pendirian Persekutuan Perdata — 3 paket",
        priceFrom: 2_250_000,
        priceTo: 6_900_000,
        desc: "Persekutuan Perdata Dasar Rp 2,25 juta; + Izin Rp 4,5 juta; + Izin + Virtual Office Rp 6,9 juta.",
      },
      {
        code: "A.5",
        name: "Pendirian Yayasan — 3 paket",
        priceFrom: 3_000_000,
        priceTo: 8_400_000,
        desc: "Yayasan Dasar Rp 3 juta; Yayasan + Izin Rp 6 juta; Yayasan + Izin + Virtual Office Rp 8,4 juta.",
      },
      {
        code: "A.6",
        name: "Pendirian Perkumpulan",
        priceFrom: 6_000_000,
        desc: "Perkumpulan + izin dalam satu paket.",
      },
      {
        code: "A.7",
        name: "Pendirian PMA (Penanaman Modal Asing) — 3 paket",
        priceFrom: 5_250_000,
        priceTo: 12_400_000,
        desc: "PMA Dasar Rp 5,25 juta; PMA + Izin Rp 10,5 juta; PMA + Izin + Virtual Office Rp 12,4 juta.",
      },
      {
        code: "A.8",
        name: "Pendirian UD (Usaha Dagang)",
        priceFrom: 5_400_000,
        desc: "UD lengkap: NIB + NPWP + izin usaha.",
      },
    ],
    faq: [
      {
        q: "Lebih aman PT atau CV untuk usaha saya?",
        a: "PT membatasi tanggung jawab sesuai modal disetor dan lebih dipercaya investor/bank; CV lebih murah dan ringan untuk usaha keluarga. Kami menyiapkan perbandingan lengkapnya — silakan baca halaman perbandingan badan usaha kami, lalu putuskan di konsultasi.",
      },
      {
        q: "Apa itu PT Perorangan dan siapa yang cocok?",
        a: "PT Perorangan adalah bentuk badan usaha baru untuk usaha mikro-kecil: modal tercatat = modal disetor, pendirian ringkas, dan tanggung jawab terbatas. Cocok untuk pelaku UMKM yang ingin tampil lebih kredibel tanpa biaya PT konvensional.",
      },
      {
        q: "Apakah paket pendirian sudah termasuk virtual office?",
        a: "Tidak semua. Paket yang menyertakan virtual office sudah kami tandai; Anda juga bisa menambahkannya belakangan lewat layanan virtual office kami di gedung perkantoran berprofil tinggi.",
      },
    ],
    related: [
      { label: "Halaman layanan PT", href: "/layanan/pt" },
      { label: "Perbandingan PT vs CV", href: "/bandingkan/pt-vs-cv" },
      { label: "Panduan pendirian PT", href: "/panduan/pt" },
      { label: "Virtual office", href: "/virtual-office" },
    ],
  },
  {
    code: "B",
    slug: "perpajakan-registrasi",
    name: "Perpajakan & Registrasi",
    icon: "💼",
    tier: "sekunder",
    tagline: "Semua kebutuhan registrasi pajak perusahaan",
    desc: "Registrasi dasar pajak yang sering menjadi syarat izin lain: NPWP badan, SKT, pengukuhan PKP, dan EFIN. Proses cepat dengan pendampingan pemenuhan persyaratan di KPP setempat.",
    services: [
      { code: "B.1", name: "NPWP Badan", priceFrom: 450_000, desc: "Untuk PT, CV, Firma, Yayasan." },
      { code: "B.2", name: "SKT Badan", priceFrom: 450_000, desc: "Surat Keterangan Terdaftar." },
      { code: "B.3", name: "Pengukuhan PKP", priceFrom: 1_800_000, desc: "Penetapan sebagai Pengusaha Kena Pajak." },
      { code: "B.4", name: "EFIN", priceFrom: 500_000, desc: "Electronik Filing Identification Number untuk layanan pajak online." },
    ],
    faq: [
      {
        q: "Kapan badan usaha wajib jadi PKP?",
        a: "Pengusaha wajib dikukuhkan sebagai PKP ketika peredaran bruto melewati ambang batas yang diatur DJP (saat ini Rp 4,8 miliar per tahun), meski banyak usaha mengajukan sukarela agar bisa mengeluarkan faktur pajak untuk klien korporat.",
      },
      {
        q: "Apa fungsi EFIN?",
        a: "EFIN adalah kode identitas elektronik dari DJP yang dibutuhkan untuk mengakses layanan perpajakan online seperti lapor SPT dan e-Registration. Tanpa EFIN, administasi pajak digital perusahaan tidak bisa berjalan.",
      },
      {
        q: "Apakah NPWP badan bisa diproses tanpa datang ke KPP?",
        a: "Untuk sebagian jenis badan usaha, pendaftaran NPWP bisa elektronik. Namun kasus tertentu (dokumen kurang, badan bentukan notaris lama) tetap perlu klarifikasi kantor. Kami menangani kedua jalur termasuk pendampingannya.",
      },
    ],
    related: [
      { label: "Kalkulator pajak interaktif", href: "/kalkulator-pajak" },
      { label: "Hub kategori pajak", href: "/layanan/kategori/pajak" },
    ],
  },
  {
    code: "C",
    slug: "izin-usaha-perdagangan",
    name: "Izin Usaha & Perdagangan",
    icon: "🏪",
    tier: "sekunder",
    tagline: "Izin-izin esensial untuk menjalankan bisnis",
    desc: "Dari NIB sebagai identitas usaha di OSS sampai izin spesifik perdagangan: impor (API, NIK Bea Cukai), industri (IUI), fasilitas kepabeanan (KITE), sampai waralaba (STPW). Semua dengan penjelasan dampak regulasinya bagi model bisnis Anda.",
    services: [
      { code: "C.1", name: "NIB di OSS", priceFrom: 1_800_000, desc: "Nomor Induk Berusaha — identitas utama usaha di OSS RBA.", timeline: "3–7 hari kerja" },
      { code: "C.2", name: "SIUP di OSS", priceFrom: 900_000, desc: "Surat Izin Usaha Perdagangan (Status Efektif)." },
      { code: "C.3", name: "API (Izin Impor)", priceFrom: 1_000_000, desc: "Angka Pengenal Importir." },
      { code: "C.4", name: "NIK Bea Cukai", priceFrom: 1_000_000, desc: "Nomor Induk Kepabeanan." },
      { code: "C.5", name: "IUMK", priceFrom: 1_350_000, desc: "Izin Usaha Mikro Kecil untuk UMKM." },
      { code: "C.6", name: "IUI (Izin Usaha Industri)", priceFrom: 45_000_000, desc: "Untuk manufaktur berbasis risiko." },
      { code: "C.7", name: "KITE", priceFrom: 13_500_000, desc: "Kemudahan impor untuk tujuan ekspor." },
      { code: "C.8", name: "Persetujuan Ekspor (PE)", priceFrom: 8_500_000, desc: "Untuk komoditas tertentu (migas, CPO, dll)." },
      { code: "C.9", name: "STP Distributor", priceFrom: 3_500_000, desc: "Surat Tanda Pendaftaran Distributor." },
      { code: "C.10", name: "STPW Waralaba", priceFrom: 12_000_000, desc: "Izin operasi waralaba/franchise." },
    ],
    faq: [
      {
        q: "Apa beda NIB dan SIUP?",
        a: "NIB adalah nomor induk berusaha — identitas tunggal di OSS yang berlaku untuk semua skala. SIUP adalah tanda daftar perdagangan yang kini berstatus efektif dan diterbitkan mengikuti NIB untuk usaha perdagangan. Keduanya saling melengkapi, bukan menggantikan.",
      },
      {
        q: "Kapan usaha butuh API dan NIK Bea Cukai?",
        a: "API dibutuhkan saat Anda menjadi importir, dan NIK Bea Cukai menyertainya untuk aktivitas kepabeanan di pelabuhan. Tanpa keduanya, kiriman impor atas nama perusahaan tidak bisa diklaim.",
      },
      {
        q: "KITE itu apa dan untuk siapa?",
        a: "KITE (Kemudahan Impor Tujuan Ekspor) membebaskan atau menunda bea masuk untuk bahan baku impor yang akan diolah lalu diekspor. Cocok untuk manufaktur padat impor dengan komponen ekspor tinggi.",
      },
    ],
    related: [
      { label: "Halaman layanan NIB", href: "/layanan/nib" },
      { label: "Panduan NIB & OSS RBA", href: "/panduan/nib" },
      { label: "Panduan OSS", href: "/panduan/oss" },
      { label: "Database KBLI", href: "/kbli" },
    ],
  },
  {
    code: "E",
    slug: "konstruksi-properti",
    name: "Perizinan Konstruksi & Properti",
    icon: "🏗️",
    tier: "sekunder",
    tagline: "Perizinan lengkap untuk proyek konstruksi",
    desc: "Dari kualifikasi SBU/SIUJK untuk tender sampai perizinan bangunan: PBG sebagai pengganti IMB, SLF untuk kelayakan fungsi, dan sertifikat standar. Semua sesuai regulasi terbaru UU Cipta Kerja & PP 16/2021.",
    services: [
      { code: "E.1", name: "SBU + SIUJK K1", priceFrom: 31_500_000, desc: "Kualifikasi kelas kecil, status Efektif." },
      { code: "E.2", name: "SBU + SIUJK M1", priceFrom: 40_500_000, desc: "Kualifikasi kelas menengah." },
      { code: "E.3", name: "SBU + SIUJK B1", priceFrom: 70_200_000, desc: "Kualifikasi kelas besar." },
      { code: "E.4", name: "IMB (Jabodetabek)", priceFrom: 27_000_000, desc: "Izin Mendirikan Bangunan untuk kasus yang masih berlaku IMB." },
      { code: "E.5", name: "PBG", priceFrom: 20_000_000, desc: "Persetujuan Bangunan Gedung — pengganti IMB pasca UU Cipta Kerja." },
      { code: "E.6", name: "SLF", priceFrom: 18_000_000, desc: "Sertifikat Laik Fungsi Bangunan." },
    ],
    faq: [
      {
        q: "IMB sudah tidak berlaku, kenapa masih ada layanannya?",
        a: "Pascapemberlakuan UU Cipta Kerja, izin baru bernama PBG. Tetapi sebagian kasus warisan (proses lama yang belum selesai, penyesuaian administrasi) masih menyentuh dokumen IMB. Kami menangani keduanya termasuk migrasinya ke PBG.",
      },
      {
        q: "Kapan SLF dibutuhkan?",
        a: "SLF wajib sebelum bangunan difungsikan — menjadi syarat operasional hotel, pabrik, ruko, hingga penerbitan izin usaha tertentu. Bangunan tanpa SLF berisiko tidak bisa dihubungkan utilitas resmi dan bermasalah saat audit.",
      },
      {
        q: "Apa beda SBU dan SIUJK?",
        a: "SBU (Sertifikat Badan Usaha) adalah kualifikasi kompetensi kontraktor dari LJK/LPJK, sedangkan SIUJK adalah izin usaha jasa konstruksi. Keduanya dipakai bersama untuk mengikuti tender — itulah kenapa kami menjualnya sebagai paket.",
      },
    ],
    related: [
      { label: "Halaman layanan PBG", href: "/layanan/pbg" },
      { label: "Panduan PBG", href: "/panduan/pbg" },
    ],
  },
  {
    code: "F",
    slug: "perizinan-lingkungan",
    name: "Perizinan Lingkungan",
    icon: "🌍",
    tier: "sekunder",
    tagline: "Kelengkapan dokumen lingkungan untuk beroperasi legal",
    desc: "Tingkat kewajiban lingkungan ditentukan skala risiko usaha: SPPL untuk risiko rendah, UKL-UPL menengah, AMDAL untuk kegiatan besar berdampak penting. Kami bantu penapisan risiko sampai dokumen disetujui.",
    services: [
      { code: "F.1", name: "AMDAL", priceFrom: 35_000_000, desc: "Analisis Mengenai Dampak Lingkungan untuk kegiatan berdampak penting." },
      { code: "F.2", name: "UKL-UPL", priceFrom: 15_000_000, desc: "Upaya Pengelolaan & Pemantauan Lingkungan." },
      { code: "F.3", name: "SPPL", priceFrom: 3_500_000, desc: "Surat Pernyataan Kesanggupan Pengelolaan Lingkungan." },
    ],
    faq: [
      {
        q: "Usaha saya butuh AMDAL atau cukup SPPL?",
        a: "Tergantung penapisan jenis kegiatan di Amdalnet: usaha risiko rendah cukup SPPL, menengah UKL-UPL, sedangkan yang masuk daftar kegiatan wajib AMDAL (mis. tertentu di pertambangan, kertas, semen) harus menyusun AMDAL penuh. Kami bantu menapis dulu supaya Anda tidak bayar lebih.",
      },
      {
        q: "Berapa lama proses AMDAL?",
        a: "AMDAL adalah dokumen paling berat: umumnya 3–9 bulan termasuk keterlibatan masyarakat dan persetujuan berjenjang. Untuk mempercepat, pastikan dokumen awal (lokasi, rona awal, rencana kegiatan) lengkap sejak awal.",
      },
      {
        q: "Apakah SPPL cukup untuk izin lingkungan pabrik kecil?",
        a: "Bisa, selama kegiatan Anda tidak masuk daftar wajib UKL-UPL/AMDAL. Banyak UMKM skala menengah justru terjebak mengira SPPL cukup padahal kapasitas produksinya memicu UKL-UPL — penapisan kami mencegah kesalahan itu.",
      },
    ],
    related: [
      { label: "Database KBLI (klasifikasi usaha)", href: "/kbli" },
      { label: "Hub kategori perizinan", href: "/layanan" },
    ],
  },
  {
    code: "H",
    slug: "kesehatan-farmasi",
    name: "Perizinan Kesehatan & Farmasi",
    icon: "🏥",
    tier: "sekunder",
    tagline: "BPOM, halal, klinik, apotek, dan distribusi farmasi",
    desc: "Divisi paling regulatif: izin edar BPOM, PKRT, obat tradisional, PIRT, sertifikat halal BPJPH, sampai izin klinik, PBF, IPAK, SIA, dan SIPA. Kami menangani jalur registrasi penuh termasuk uji lab dan penunjukan teknis.",
    services: [
      { code: "H.1", name: "PKRT", priceFrom: 13_500_000, desc: "Izin Perbekalan Kesehatan Rumah Tangga (kosmetik & produk rumah tangga)." },
      { code: "H.2", name: "TDG Obat Tradisional", priceFrom: 13_500_000, desc: "Tanda Daftar Golongan Obat tradisional." },
      { code: "H.3", name: "Izin Edar BPOM (MD)", priceFrom: 9_500_000, desc: "Makanan/minuman domestik." },
      { code: "H.4", name: "Izin Edar BPOM (ML)", priceFrom: 15_000_000, desc: "Makanan/minuman impor." },
      { code: "H.5", name: "PIRT", priceFrom: 2_500_000, desc: "Produk Industri Rumah Tangga untuk UMKM pangan." },
      { code: "H.6", name: "Sertifikat Halal BPJPH", priceFrom: 4_500_000, desc: "Sertifikasi halal resmi." },
      { code: "H.7", name: "Izin Klinik", priceFrom: 16_200_000, desc: "Izin operasional klinik." },
      { code: "H.8", name: "PBF", priceFrom: 25_000_000, desc: "Izin Pedagang Besar Farmasi." },
      { code: "H.9", name: "IPAK", priceFrom: 13_500_000, desc: "Izin Penyalur Alat Kesehatan." },
      { code: "H.10", name: "SIA (Surat Izin Apotek)", priceFrom: 12_000_000, desc: "Izin mendirikan & menjalankan apotek." },
      { code: "H.11", name: "SIPA", priceFrom: 3_500_000, desc: "Surat Izin Praktik Apoteker." },
    ],
    faq: [
      {
        q: "PIRT atau izin edar BPOM, kapan yang mana?",
        a: "PIRT untuk pangan olahan skala UMKM dengan umur simpan terbatas dan penjualan lokal; izin edar BPOM untuk pangan olahan yang didistribusikan luas/berumur panjang. Aturan praktisnya: kalau produk Anda masuk supermarket nasional, jalurnya BPOM.",
      },
      {
        q: "Apakah setiap produk kosmetik wajib BPOM?",
        a: "Ya, semua produk kosmetik yang diedarkan komersial wajib terdaftar (notifikasi PKRT di BPOM) — termasuk home industry. Tanpa nomor notifikasi, produk berisiko diretar dan platform marketplace memblokir listing-nya.",
      },
      {
        q: "Apa urutan izin membuka klinik?",
        a: "Umumnya: badan usaha & NIB, lalu izin operasional klinik yang mensyaratkan tenaga medis ber-STrA/serdi, sarana sesuai standar, dan persetujuan tempat usaha. Kami menyusunnya berurutan supaya tidak ada izin yang menunggu izin lain terbalik.",
      },
    ],
    related: [
      { label: "Halaman layanan BPOM", href: "/layanan/bpom" },
      { label: "Panduan BPOM", href: "/panduan/bpom" },
      { label: "Halaman layanan Halal", href: "/layanan/halal" },
      { label: "Panduan halal", href: "/panduan/halal" },
    ],
  },
  {
    code: "I",
    slug: "ketenagakerjaan-tka",
    name: "Ketenagakerjaan & TKA",
    icon: "👷",
    tier: "sekunder",
    tagline: "Tenaga kerja asing & dokumen perjalanan karyawan",
    desc: "Menghadirkan tenaga kerja asing legal: RPTKA sebagai fondasi, KITAS untuk investor maupun tenaga kerja, KITAP untuk menetap, sampai pengurusan paspor RI elektronik untuk kebutuhan perjalanan bisnis.",
    services: [
      { code: "I.1", name: "RPTKA", priceFrom: 15_000_000, desc: "Rencana Penggunaan Tenaga Kerja Asing — dasar legal semua TKA." },
      { code: "I.2", name: "KITAS Investor", priceFrom: 18_000_000, desc: "Kartu Izin Tinggal Sementara untuk investor." },
      { code: "I.3", name: "KITAS Tenaga Kerja", priceFrom: 16_200_000, desc: "KITAS untuk tenaga kerja asing dengan indeks kerja." },
      { code: "I.4", name: "KITAP", priceFrom: 23_400_000, desc: "Kartu Izin Tinggal Tetap." },
      { code: "I.5", name: "Paspor RI (elektronik)", priceFrom: 1_800_000, desc: "Paspor Indonesia dengan chip." },
    ],
    faq: [
      {
        q: "Bolehkah perusahaan mempekerjakan TKA tanpa RPTKA?",
        a: "Tidak. RPTKA adalah prasyarat legal utama — tanpa itu, KITAS kerja tidak bisa terbit dan perusahaan berisiko sanksi administratif sampai pidana. Pengecualian hanya untuk posisi tertentu yang diatur pemerintah.",
      },
      {
        q: "Apa beda KITAS investor dan KITAS tenaga kerja?",
        a: "KITAS investor terbit untuk pemegang saham/direktur dengan nilai modal tertentu dan tidak memerlukan RPTKA, sedangkan KITAS tenaga kerja untuk pekerja asing dengan RPTKA + DKPTKA. Kebutuhan dana dan kebebasan aktivitasnya berbeda.",
      },
      {
        q: "Apa itu DKPTKA dan berapa nominalnya?",
        a: "DKPTKA (Dana Kompensasi Penggunaan TKA) adalah kewajiban US$100/bulan per tenaga kerja asing yang dibayar saat pengajuan RPTKA. Nominal ini di luar jasa kami dan menempel pada proses RPTKA.",
      },
    ],
    related: [
      { label: "Kategori kerja luar negeri", href: "/layanan/kategori/kerja-luar-negeri" },
      { label: "Layanan PMI & pekerja luar negeri", href: "/layanan/kategori/kerja-luar-negeri" },
    ],
  },
  {
    code: "J",
    slug: "keselamatan-kerja-k3",
    name: "Keselamatan Kerja (K3)",
    icon: "⚠️",
    tier: "sekunder",
    tagline: "Keselamatan kerja adalah prioritas — dan kewajiban hukum",
    desc: "Registrasi K3L, sertifikasi Ahli K3 untuk berbagai spesialisasi (umum, konstruksi, listrik, kimia), pemeriksaan APAR, hingga izin proteksi kebakaran. Semua untuk memenuhi kewajiban P2K3 dan menghindari sanksi Kemnaker.",
    services: [
      { code: "J.1", name: "Registrasi K3L", priceFrom: 10_000_000, desc: "Uji lab + izin K3L dari OSS." },
      { code: "J.2", name: "Ahli K3 Umum (Kemnaker)", priceFrom: 6_500_000, desc: "Pelatihan 12 hari + sertifikat resmi." },
      { code: "J.3", name: "Ahli K3 Umum (BNSP)", priceFrom: 3_500_000, desc: "Pelatihan 4 hari + uji kompetensi." },
      { code: "J.4", name: "Ahli K3 Konstruksi", priceFrom: 7_500_000, desc: "Sertifikat Kemnaker untuk proyek konstruksi." },
      { code: "J.5", name: "Ahli K3 Listrik", priceFrom: 8_000_000, desc: "Sertifikat Kemnaker untuk instalasi & pemeliharaan listrik." },
      { code: "J.6", name: "Ahli K3 Kimia", priceFrom: 8_500_000, desc: "Sertifikat Kemnaker untuk industri kimia." },
      { code: "J.7", name: "Sertifikasi APAR", priceFrom: 2_500_000, desc: "Pemeriksaan Alat Pemadam Api Ringan." },
      { code: "J.8", name: "Izin Proteksi Kebakaran", priceFrom: 9_000_000, desc: "Sistem keselamatan kebakaran gedung." },
    ],
    faq: [
      {
        q: "Perusahaan dengan berapa karyawan wajib punya P2K3?",
        a: "Perusahaan dengan pekerja ≥100 orang atau memiliki potensi bahaya tinggi wajib membentuk Ahli K3 (PP 7/2019). Di bawah itu, penugasan petugas K3 tetap dianjurkan dan banyak instansi menanganinya lewat SK penunjukan.",
      },
      {
        q: "Ahli K3 Kemnaker atau BNSP, mana yang diminta audit?",
        a: "Untuk kepatuhan pengawasan Kettenaker umumnya diminta sertifikat Ahli K3 Umum Kemnaker. Sertifikasi BNSP membuktikan kompetensi untuk kebutuhan proyek/klien tertentu. Kami bantu memilih sesuai tujuan penggunaannya.",
      },
      {
        q: "Apakah APAR perlu disertifikasi berkala?",
        a: "Ya. Pemeriksaan dan pengujian APAR wajib dilakukan berkala oleh perusahaan ahli K3 kebakaran yang tersertifikasi — hasilnya jadi bukti kepatuhan saat inspeksi damkar/Disnaker.",
      },
    ],
    related: [
      { label: "Sertifikasi ISO 45001 (K3 internasional)", href: "/katalog/iso-sertifikasi-internasional" },
      { label: "Hub kategori perizinan", href: "/layanan" },
    ],
  },
  {
    code: "K",
    slug: "transportasi-logistik",
    name: "Transportasi & Logistik",
    icon: "🚚",
    tier: "sekunder",
    tagline: "Izin untuk bisnis transportasi & logistik",
    desc: "SIUJPT untuk perusahaan jasa transportasi, izin angkutan barang dengan izin trayek, dan izin angkutan penumpang. Meliputi pengurusan di Dishub/Hubdat sesuai moda.",
    services: [
      { code: "K.1", name: "SIUJPT", priceFrom: 22_500_000, desc: "Surat Izin Usaha Perusahaan Jasa Transportasi." },
      { code: "K.2", name: "Izin Angkutan Barang", priceFrom: 18_000_000, desc: "Izin usaha & izin trayek." },
      { code: "K.3", name: "Izin Angkutan Penumpang", priceFrom: 20_000_000, desc: "Izin usaha & izin trayek." },
    ],
    faq: [
      {
        q: "Apa itu izin trayek dan kenapa terpisah dari izin usaha?",
        a: "Izin usaha (SIUJPT) mengizinkan perusahaan beroperasi sebagai penyedia jasa transportasi, sedangkan izin trayek mengatur rute spesifik yang dilayani. Keduanya wajib untuk armada komersial reguler.",
      },
      {
        q: "Bisnis kurir/aplikasi butuh SIUJPT juga?",
        a: "Tergantung model: kurir barang (goods) umumnya melalui izin angkutan barang, sementara platform taksi online beroperasi dengan skema kemitraan armada yang tetap mensyaratkan izin usaha armada mitranya. Kami petakan dulu model bisnis Anda sebelum menyarankan izin.",
      },
      {
        q: "Berapa lama proses izin transportasi?",
        a: "Umumnya 60–120 hari karena melibatkan pengujian armada (uji KIR), kedatangan unit, dan persetujuan trayek. Persiapan dokumen armada yang rapi adalah kunci mempercepat.",
      },
    ],
    related: [
      { label: "Hub kategori perizinan", href: "/layanan" },
      { label: "Database KBLI", href: "/kbli" },
    ],
  },
  {
    code: "L",
    slug: "digital-teknologi",
    name: "Digital & Teknologi",
    icon: "💻",
    tier: "sekunder",
    tagline: "Perizinan untuk bisnis digital & e-commerce",
    desc: "Untuk startup dan platform: izin e-commerce, PMSE (Kemendag), dan PSE (Kominfo) — prasyarat kepercayaan konsumen, kemitraan payment gateway, dan kepatuhan UU ITE/PDP.",
    services: [
      { code: "L.1", name: "Izin E-Commerce", priceFrom: 9_000_000, desc: "Izin transaksi elektronik." },
      { code: "L.2", name: "PMSE", priceFrom: 11_000_000, desc: "Perdagangan Melalui Sistem Elektronik (Kemendag)." },
      { code: "L.3", name: "PSE", priceFrom: 5_000_000, desc: "Penyelenggara Sistem Elektronik (Kominfo) — pendaftaran TDPSE." },
    ],
    faq: [
      {
        q: "Apakah startup kecil wajib daftar PSE?",
        a: "Ya, semua penyelenggara sistem elektronik — termasuk aplikasi dan marketplace kecil — wajib terdaftar TDPSE Privasi/Umum di Kominfo. Tanpa pendaftaran, layanan bisa diblokir dan kemitraan pembayaran sulit berjalan.",
      },
      {
        q: "PSE atau PMSE dulu?",
        a: "Umumnya PSE (registrasi sistem elektronik) diurus bersamaan NIB, lalu PMSE ketika platform sudah benar-benar bertransaksi barang. Urutannya menyesuaikan fase produk Anda — kami bantu menentukannya di konsultasi.",
      },
      {
        q: "Apa konsekuensi UU PDP untuk bisnis digital?",
        a: "UU PDP 27/2022 mewajibkan pengendali data menjaga data pribadi pengguna: dasar pemrosesan, kebijakan privasi, dan notifikasi kebocoran. Pendaftaran PSE yang rapi menjadi fondasi kepatuhan ini — halaman kebijakan privasi kami bisa jadi contoh penerapannya.",
      },
    ],
    related: [
      { label: "Kebijakan privasi (contoh kepatuhan UU PDP)", href: "/kebijakan-privasi" },
      { label: "Database KBLI sektor digital", href: "/kbli" },
    ],
  },
  {
    code: "M",
    slug: "minuman-beralkohol",
    name: "Minuman Beralkohol",
    icon: "🍺",
    tier: "sekunder",
    tagline: "Izin khusus bisnis minuman beralkohol",
    desc: "SIUP-MB per golongan kadar alkohol (A: 1–5%, B: 5–20%, C: >20%) dan SITU-MB untuk tempat usaha penjualan. Kita bantu menentukan golongan sesuai produk dan wilayah operasional.",
    services: [
      { code: "M.1", name: "SIUP-MB Golongan A", priceFrom: 15_000_000, desc: "Kadar 1–5% (bir, minuman ringan beralkohol)." },
      { code: "M.2", name: "SIUP-MB Golongan B", priceFrom: 18_000_000, desc: "Kadar 5–20% (wine, cider)." },
      { code: "M.3", name: "SIUP-MB Golongan C", priceFrom: 22_000_000, desc: "Kadar >20% (spirits, minuman keras)." },
      { code: "M.4", name: "SITU-MB", priceFrom: 8_000_000, desc: "Surat Izin Tempat Usaha penjualan minuman beralkohol." },
    ],
    faq: [
      {
        q: "Golongan SIUP-MB ditentukan oleh apa?",
        a: "Kadar alkohol produk yang diedarkan: golongan A (1–5%), B (5–20%), C (>20%). Satu SIUP-MB berlaku untuk golongan yang dimohon — produk lintas golongan butuh pengurusan tambahan.",
      },
      {
        q: "Apakah daerah tertentu melarang penjualan minuman beralkohol?",
        a: "Ya, sejumlah daerah memiliki peraturan daerah yang membatasi atau melarang. Sebelum mengurus, kami cek regulasi daerah operasional Anda — halaman wilayah kami memuat catatan lokal per provinsi.",
      },
      {
        q: "SITU-MB untuk siapa?",
        a: "Untuk tempat usaha yang menjual minuman beralkohol secara langsung ke konsumen (bar, resto, toko), melengkapi SIUP-MB pemegang merek/distributor.",
      },
    ],
    related: [
      { label: "Catatan lokal per provinsi", href: "/layanan/wilayah/dki-jakarta" },
      { label: "Hub kategori perizinan", href: "/layanan" },
    ],
  },
  {
    code: "N",
    slug: "sertifikasi-produk-standar",
    name: "Sertifikasi Produk & Standar",
    icon: "📦",
    tier: "sekunder",
    tagline: "Sertifikasi produk untuk akses pasar",
    desc: "SNI untuk akses pasar nasional dan retail modern, Sertifikasi Industri Hijau, CPPOB/GMP untuk pangan olahan, dan sertifikasi kompetensi BNSP untuk tenaga kerja profesional.",
    services: [
      { code: "N.1", name: "Sertifikasi SNI", priceFrom: 12_000_000, desc: "Standar Nasional Indonesia." },
      { code: "N.2", name: "Sertifikasi Industri Hijau (SIH)", priceFrom: 8_500_000, desc: "Standar industri hijau." },
      { code: "N.3", name: "Sertifikasi CPPOB/GMP", priceFrom: 7_000_000, desc: "Cara Produksi Pangan Olahan yang Baik." },
      { code: "N.4", name: "Sertifikasi Kompetensi BNSP", priceFrom: 2_500_000, priceTo: 5_000_000, desc: "Sertifikasi profesi berbagai bidang." },
    ],
    faq: [
      {
        q: "Kapan produk wajib SNI?",
        a: "Untuk produk yang masuk daftar wajib SNI (mis. sejumlah elektronik, ban, kabel, sebagian baja dan pangan). Selain itu SNI sukarela sering menjadi syarat masuk retail modern dan tender pemerintah.",
      },
      {
        q: "Apa hubungan CPPOB dengan izin edar BPOM?",
        a: "CPPOB (GMP) adalah sistem jaminan proses produksi pangan olahan yang aman — menjadi prasyarat kuat untuk registrasi MD BPOM dan bukti kepatuhan saat audit pabrik. Banyak klien menguruskannya sebelum izin edar.",
      },
      {
        q: "Sertifikasi kompetensi BNSP untuk profesi apa saja?",
        a: "Lisensi profesional dari okupasi teknis (welder, operator, admin HR sampai digital marketing) sesuai skema yang terakreditasi BNSP. Kami bantu pemilihan skema, persiapan uji, dan penerbitan sertifikat.",
      },
    ],
    related: [
      { label: "Halaman layanan BPOM", href: "/layanan/bpom" },
      { label: "Semua sertifikasi × 38 provinsi", href: "/layanan/sertifikasi/jawa-barat" },
    ],
  },
  {
    code: "O",
    slug: "perizinan-khusus",
    name: "Perizinan Khusus Lainnya",
    icon: "🎯",
    tier: "sekunder",
    tagline: "Perizinan spesifik untuk sektor tertentu",
    desc: "Kumpulan izin yang jarang ditawarkan kompetitor: TDY untuk yayasan, LKP/LPK untuk lembaga pelatihan, izin penyalur BBM, sampai CBAM untuk eksportir yang berhadapan dengan mekanisme karbon Uni Eropa.",
    services: [
      { code: "O.1", name: "Izin Operasional Yayasan (TDY)", priceFrom: 4_500_000, desc: "Tanda Daftar Yayasan." },
      { code: "O.2", name: "Izin LKP/LPK", priceFrom: 9_500_000, desc: "Lembaga Kursus & Pelatihan." },
      { code: "O.3", name: "Sertifikat Laik Hygiene Sanitasi", priceFrom: 3_500_000, desc: "Untuk rumah makan/restoran." },
      { code: "O.4", name: "Izin Usaha Penyalur BBM", priceFrom: 35_000_000, desc: "Izin usaha niaga BBM." },
      { code: "O.5", name: "CBAM Registration", priceFrom: 25_000_000, desc: "Carbon Border Adjustment Mechanism (Uni Eropa) untuk eksportir." },
    ],
    faq: [
      {
        q: "Apa itu CBAM dan siapa yang terdampak?",
        a: "CBAM adalah pungutan karbon Uni Eropa atas produk impor berintensitas karbon tinggi (semen, baja, aluminium, pupuk, listrik, hidrogen). Eksportir Indonesia ke UE mulai terdampak fase transisi — pendaftaran dan pelaporan emisi kami siapkan end-to-end.",
      },
      {
        q: "Apa beda TDY dan izin operasional yayasan?",
        a: "TDY (Tanda Daftar Yayasan) adalah legalitas keberadaan yayasan, sementara izin operasional mengatur kegiatan tertentu yayasan (mis. sosial, pendidikan). Banyak yayasan berhenti di TDY padahal kegiatannya butuh izin operasional.",
      },
      {
        q: "LKP dan LPK sama saja?",
        a: "Mirip tapi berbeda regulator: LKP (lembaga kursus & pelatihan) di bawah Kemendikbud, LPK (lembaga pelatihan kerja) di bawah Kemnaker. Pilihan jalur menentukan izin yang terbit dan sertifikat yang bisa diberikan lembaga Anda.",
      },
    ],
    related: [
      { label: "Hub kategori perizinan", href: "/layanan" },
      { label: "Katalog pendidikan & pelatihan", href: "/katalog/pendidikan-pelatihan" },
    ],
  },
  {
    code: "P",
    slug: "perubahan-perpanjangan",
    name: "Perubahan & Perpanjangan",
    icon: "🔄",
    tier: "sekunder",
    tagline: "Layanan berkelanjutan untuk izin Anda",
    desc: "Bisnis bergerak — alamat berubah, pengurus berganti, izin mendekati kedaluwarsa. Kami menangani perubahan data perusahaan, perpanjangan izin, sampai pembubaran perusahaan yang rapi secara hukum.",
    services: [
      { code: "P.1", name: "Perubahan Data Perusahaan", priceFrom: 3_500_000, desc: "Update alamat, pengurus, modal (akta + NIB + izin turunan)." },
      { code: "P.2", name: "Perpanjangan Izin Usaha", priceFrom: 2_000_000, desc: "Perpanjangan NIB & izin operasional." },
      { code: "P.3", name: "Penutupan/Pembubaran Perusahaan", priceFrom: 8_000_000, desc: "Likuidasi & pencabutan izin — agar tidak meninggalkan kewajiban menggantung." },
    ],
    faq: [
      {
        q: "Apa risiko membiarkan izin kedaluwarsa?",
        a: "Izin yang kedaluwarsa bisa berujung pencabutan, denda administratif, dan masalah saat audit, krediting bank, atau due diligence pembeli. Perpanjangan jauh lebih murah daripada menerbitkan ulang.",
      },
      {
        q: "Kalau ganti alamat, izin apa saja yang harus diubah?",
        a: "Minimal: akta (jika domisili berbeda kota), NIB, dan izin turunan yang mencantumkan alamat (TDUP, SIUP-MB, PIRT, dsb.) serta NPWP. Kami memetakan daftar izin Anda lalu menguruskannya sekaligus.",
      },
      {
        q: "Kenapa pembubaran perusahaan harus diurus resmi?",
        a: "Perusahaan yang ditinggalkan tanpa likuidasi tetap dianggap eksis: pajak terutang, denda menumpuk, dan pemilik bisa kesulitan mendirikan badan baru. Pembubaran resmi memberi kepastian hukum bahwa tanggung jawab selesai.",
      },
    ],
    related: [
      { label: "Hub kategori perizinan", href: "/layanan" },
      { label: "Kontak tim kami", href: "/kontak" },
    ],
  },
  {
    code: "Q",
    slug: "penerbangan",
    name: "Penerbangan & Transportasi Udara",
    icon: "✈️",
    tier: "sekunder",
    tagline: "Izin untuk bisnis penerbangan",
    desc: "Layanan paling premium dalam katalog: Air Operator Certificate untuk operator maskapai dan Sertifikat Standar Angkutan Udara untuk angkutan niaga berjadwal/tidak berjadwal — pengurusan intensif bersama Kemenhub.",
    services: [
      { code: "Q.1", name: "Air Operator Certificate (AOC)", priceFrom: 50_000_000, priceTo: 150_000_000, desc: "Sertifikat Operator Maskapai." },
      { code: "Q.2", name: "Sertifikat Standar Angkutan Udara", priceFrom: 25_000_000, priceTo: 75_000_000, desc: "Izin angkutan niaga berjadwal/tidak berjadwal." },
    ],
    faq: [
      {
        q: "Apa syarat dasar mendirikan maskapai (AOC)?",
        a: "Badan usaha angkutan udara dengan modal besar sesuai regulasi Kemenhub, armada terdaftar, organisasi manajemen & buku manual (MMO/MOE/MDP), serta personel bersertifikat. Prosesnya berjenjang: izin prinsip → sertifikat standar → AOC.",
      },
      {
        q: "Berapa lama mendapatkan AOC?",
        a: "Realistisnya 12–24 bulan dari pendirian badan usaha, tergantung kelengkapan manual sistem dan audit Kemenhub. Biaya layanan kami berada di kisaran yang tercantum, sementara investasi operasionalnya jauh lebih besar.",
      },
      {
        q: "Bisnis apa yang butuh Sertifikat Standar tanpa AOC?",
        a: "Operator angkutan udara non-komersial atau tahap awal sebelum operasi niaga penuh. Sertifikat standar menjadi fondasi menuju AOC.",
      },
    ],
    related: [
      { label: "Hub kategori perizinan", href: "/layanan" },
      { label: "Katalog transportasi & logistik", href: "/katalog/transportasi-logistik" },
    ],
  },
  {
    code: "S",
    slug: "perikanan-kelautan",
    name: "Perikanan & Kelautan",
    icon: "🐟",
    tier: "sekunder",
    tagline: "Izin untuk bisnis perikanan & kelautan",
    desc: "SIUP (Surat Izin Usaha Perikanan) untuk kegiatan penangkapan, pengumpulan, budidaya, dan pengolahan ikan — dikalibrasi dengan armada dan lokasi usaha Anda.",
    services: [
      { code: "S.1", name: "SIUP (Surat Izin Usaha Perikanan)", priceFrom: 5_000_000, priceTo: 20_000_000, desc: "Penangkapan, pengumpulan, budidaya, pengolahan ikan." },
    ],
    faq: [
      {
        q: "SIUP perikanan per kapal atau per perusahaan?",
        a: "SIUP diterbitkan untuk perusahaan, sedangkan kapal menempel pada SIUPI/SIUP sesuai alat tangkap dan ukuran. Keduanya diurus bersama bila usaha Anda berbasis armada.",
      },
      {
        q: "Apakah budidaya ikan juga butuh SIUP?",
        a: "Ya, budidaya masuk kategori usaha perikanan yang memerlukan izin usaha — skalanya menyesuaikan (mikro bisa cukup NIB & sertifikat budidaya). Kami cek dulu skala usaha Anda sebelum menyarankan jalur.",
      },
      {
        q: "Apa hubungan SIUP dengan eksportir produk laut?",
        a: "Eksportir produk perikanan wajib legal usaha + pendaftaran pengolahan (mis. HACCP/EU approval untuk pasar tertentu). SIUP menjadi fondasi, lalu kami arahkan sertifikat pasar tujuan yang dibutuhkan.",
      },
    ],
    related: [
      { label: "Database KBLI", href: "/kbli" },
      { label: "Hub kategori perizinan", href: "/layanan" },
    ],
  },
  {
    code: "T",
    slug: "pertambangan",
    name: "Pertambangan",
    icon: "⛏️",
    tier: "sekunder",
    tagline: "Izin untuk bisnis penambangan",
    desc: "IUP untuk mineral logam/non-logam dari eksplorasi sampai operasi produksi, dan WIUP untuk tahap awal penunjukan wilayah — melalui proses kewilayahan dan kajian yang ketat.",
    services: [
      { code: "T.1", name: "IUP (Izin Usaha Pertambangan)", priceFrom: 50_000_000, priceTo: 500_000_000, desc: "Mineral logam/non-logam: eksplorasi sampai operasi produksi." },
      { code: "T.2", name: "WIUP (Wilayah Izin Usaha)", priceFrom: 25_000_000, priceTo: 100_000_000, desc: "Tahap awal penunjukan wilayah." },
    ],
    faq: [
      {
        q: "Apa urutan izin tambang yang benar?",
        a: "WIUP (penunjukan wilayah) → IUP Eksplorasi → laporan & kajian → IUP Operasi Produksi. Melompati tahap atau salah penggunaan wilayah adalah penyebab utama izin bermasalah di kemudian hari.",
      },
      {
        q: "Kenapa biaya pengurusan tambang sangat bervariasi?",
        a: "Karena ditentukan komoditas, luas wilayah (ha), tahapan izin, dan kajian yang wajib (teknis, lingkungan/AMDAL, sosial). Kisaran di katalog adalah jasa konsultan — bukan kewajiban negara maupun biaya kajian pihak ketiga yang nilainya proyektif.",
      },
      {
        q: "Apakah tambang skala kecil (WPR) juga bisa dibantu?",
        a: "Ya, izin penambangan rakyat (WPR) punya jalur berbeda di tingkat kabupaten/kota dengan biaya jauh lebih ringan. Kami bantu memetakan kelayakan WPR vs IUP sejak awal.",
      },
    ],
    related: [
      { label: "Perizinan lingkungan (AMDAL)", href: "/katalog/perizinan-lingkungan" },
      { label: "Database KBLI", href: "/kbli" },
    ],
  },
  {
    code: "U",
    slug: "pertanian-perkebunan",
    name: "Pertanian & Perkebunan",
    icon: "🌾",
    tier: "sekunder",
    tagline: "Izin untuk bisnis pertanian & agribisnis",
    desc: "Izin usaha pertanian via portal SIMPEL dan izin usaha perkebunan untuk komoditas sawit, karet, kopi, kakao, dan teh — terhubung dengan kewajiban lingkungan dan sertifikasi pasar.",
    services: [
      { code: "U.1", name: "Izin Usaha Pertanian", priceFrom: 3_000_000, priceTo: 15_000_000, desc: "Via portal SIMPEL (Sistem Perizinan Pertanian Elektronik)." },
      { code: "U.2", name: "Izin Usaha Perkebunan", priceFrom: 10_000_000, priceTo: 50_000_000, desc: "Kelapa sawit, karet, kopi, kakao, teh." },
    ],
    faq: [
      {
        q: "Apa itu portal SIMPEL?",
        a: "SIMPEL adalah sistem perizinan pertanian elektronik Kementerian Pertanian — jalur resmi izin usaha tanaman pangan/hortikultura. Kami mengelola pendaftaran akun, dokumen teknis, dan follow-up persetujuannya.",
      },
      {
        q: "Perkebunan butuh dokumen lahan apa saja?",
        a: "Umumnya bukti hak atas lahan/HGU, izin lokasi, dan dokumen teknis budidaya. Untuk skala besar, kajian lingkungan (UKL-UPL/AMDAL) menyusul sesuai risikonya.",
      },
      {
        q: "Apakah ekspor CPO butuh izin tambahan?",
        a: "Ya, ekspor CPO dan turunannya memerlukan Persetujuan Ekspor (PE) plus ketentuan levy/dana sawit yang berlaku. Kami menangani rangkaiannya lewat divisi izin perdagangan.",
      },
    ],
    related: [
      { label: "Izin perdagangan & ekspor", href: "/katalog/izin-usaha-perdagangan" },
      { label: "Perizinan lingkungan", href: "/katalog/perizinan-lingkungan" },
    ],
  },
  {
    code: "V",
    slug: "gudang-logistik",
    name: "Gudang & Logistik",
    icon: "🏭",
    tier: "sekunder",
    tagline: "Izin untuk bisnis gudang & logistik",
    desc: "Tanda Daftar Gudang (TDG) untuk seluruh tipe fasilitas penyimpanan: gudang tertutup, terbuka, silo, dan tangki — fondasi legal untuk bisnis 3PL dan distribusi.",
    services: [
      { code: "V.1", name: "Tanda Daftar Gudang (TDG)", priceFrom: 2_000_000, priceTo: 8_000_000, desc: "Gudang tertutup, terbuka, silo, tangki." },
    ],
    faq: [
      {
        q: "Apakah sewa gudang pihak ketiga wajib TDG?",
        a: "Yang wajib TDG adalah pengelola/penyelenggara fasilitas penyimpanan. Penyewa tetap perlu memastikan gudang yang dipakai terdaftar — bagian dari due diligence yang sering terlewat saat audit rantai pasok.",
      },
      {
        q: "TDG untuk silo/tangki beda prosesnya?",
        a: "Prinsipnya sama (pendaftaran fasilitas penyimpanan), namun teknisnya melibatkan standar keselamatan fasilitas khusus. Kami sesuaikan persyaratannya per tipe fasilitas.",
      },
      {
        q: "TDG berlaku selamanya?",
        a: "TDG terikat pada data fasilitas dan kegiatan; perubahan lokasi, kapasitas, atau jenis penyimpanan wajib diperbarui. Kami masukkan layanan pembaruan datanya.",
      },
    ],
    related: [
      { label: "Transportasi & logistik", href: "/katalog/transportasi-logistik" },
      { label: "Hub kategori perizinan", href: "/layanan" },
    ],
  },
  {
    code: "W",
    slug: "media-komunikasi",
    name: "Media & Komunikasi",
    icon: "📻",
    tier: "sekunder",
    tagline: "Izin untuk bisnis media & penyiaran",
    desc: "Izin prinsip radio dengan hak frekuensi, izin televisi swasta, sampai izin penyiaran streaming untuk media online & konten — mengikuti regulasi Kominfo/Komisi Penyiaran terbaru.",
    services: [
      { code: "W.1", name: "Izin Prinsip Radio", priceFrom: 10_000_000, priceTo: 30_000_000, desc: "Stasiun radio swasta + hak frekuensi." },
      { code: "W.2", name: "Izin Televisi", priceFrom: 20_000_000, priceTo: 50_000_000, desc: "Stasiun televisi swasta." },
      { code: "W.3", name: "Izin Penyiaran Streaming", priceFrom: 5_000_000, priceTo: 15_000_000, desc: "Media online & streaming konten." },
    ],
    faq: [
      {
        q: "Apa itu izin prinsip dan kenapa radio butuh hak frekuensi?",
        a: "Izin prinsip adalah persetujuan awal mendirikan lembaga penyiaran, sementara hak frekuensi memastikan kanal siaran Anda teralokasi resmi tanpa saling ganggu. Keduanya berjalan berurutan.",
      },
      {
        q: "Podcast/YouTube butuh izin penyiaran?",
        a: "Konten pribadi tidak. Tetapi entitas media online yang melakukan penyiaran secara terstruktur (redaksi, jadwal, monetisasi iklan) memasuki kategori yang diatur — izin streaming menjadi jalur kepatuhannya.",
      },
      {
        q: "Apakah TV kabel/streaming lokal perlu izin televisi penuh?",
        a: "Tergantung model: IPTV/streaming lokal umumnya melalui izin penyiaran streaming, sementara siaran terestrial menuntut izin televisi lengkap. Kami petakan dulu model siaran Anda.",
      },
    ],
    related: [
      { label: "Izin digital & teknologi (PSE)", href: "/katalog/digital-teknologi" },
      { label: "Hub kategori perizinan", href: "/layanan" },
    ],
  },
  {
    code: "X",
    slug: "jasa-profesional",
    name: "Jasa Profesional & Konsultasi",
    icon: "🏢",
    tier: "sekunder",
    tagline: "Izin untuk kantor jasa profesional",
    desc: "Izin operasional untuk firma konsultan manajemen, kantor hukum, konsultan pajak bersertifikat, dan Kantor Akuntan Publik (KAP) — termasuk pemenuhan kualifikasi personel profesionalnya.",
    services: [
      { code: "X.1", name: "Izin Konsultan Manajemen", priceFrom: 5_000_000, priceTo: 10_000_000, desc: "Firma konsultan manajemen bisnis." },
      { code: "X.2", name: "Izin Konsultan Hukum", priceFrom: 6_000_000, priceTo: 12_000_000, desc: "Law firm / kantor hukum." },
      { code: "X.3", name: "Izin Konsultan Pajak", priceFrom: 4_500_000, priceTo: 9_000_000, desc: "Praktik konsultan pajak bersertifikat." },
      { code: "X.4", name: "Izin Praktik Akuntan Publik (KAP)", priceFrom: 7_000_000, priceTo: 15_000_000, desc: "Kantor Akuntan Publik." },
    ],
    faq: [
      {
        q: "Apa syarat personel untuk izin jasa profesional?",
        a: "Kualifikasi profesional personel adalah intinya: advokat terdaftar PERADI untuk kantor hukum, konsultan pajak bersertifikat USKP untuk kantor pajak, AP terdaftar untuk KAP. Kami memetakan kesiapan personel sebelum pengajuan izin.",
      },
      {
        q: "Firma atau PT untuk kantor jasa?",
        a: "Firma menonjolkan reputasi dan tanggung jawab bersama para mitra — lazim untuk kantor hukum. PT lebih fleksibel untuk investasi dan ekspansi. Kami bandingkan keduanya di sesi konsultasi bersama pertimbangan profesi masing-masing.",
      },
      {
        q: "Konsultan perizinan seperti PusatPerizinan sendiri butuh izin apa?",
        a: "Jasa konsultasi perizinan beroperasi sebagai badan usaha jasa dengan KBLI konsultasi bisnis/legalitas — bukan kewenangan kementerian teknis karena bukan penerbit izin. Kredibilitas kami dibangun lewat rekam jejak, garansi tertulis, dan transparansi proses (baca halaman tentang kami).",
      },
    ],
    related: [
      { label: "Tentang PusatPerizinan.com", href: "/tentang-kami" },
      { label: "Pendirian badan usaha (firma & PT)", href: "/katalog/pendirian-badan-usaha" },
    ],
  },
  {
    code: "Y",
    slug: "jasa-keamanan",
    name: "Jasa Keamanan & Perlindungan",
    icon: "🛡️",
    tier: "sekunder",
    tagline: "Izin untuk jasa keamanan & perlindungan",
    desc: "Izin BUJP untuk badan usaha jasa pengamanan, sertifikasi satpam per personel, dan izin jasa pemadam kebakaran swasta — termasuk pemenuhan kualifikasi personel dan Gada Pratama.",
    services: [
      { code: "Y.1", name: "Izin Jasa Pengamanan (BUJP)", priceFrom: 18_000_000, priceTo: 35_000_000, desc: "Badan Usaha Jasa Pengamanan." },
      { code: "Y.2", name: "Sertifikasi Satpam", priceFrom: 3_500_000, priceTo: 7_000_000, desc: "Sertifikasi Satuan Pengamanan (Gada Pratama)." },
      { code: "Y.3", name: "Izin Jasa Pemadam Kebakaran", priceFrom: 12_000_000, priceTo: 20_000_000, desc: "Jasa pemadam kebakaran swasta." },
    ],
    faq: [
      {
        q: "Apa syarat pendirian BUJP?",
        a: "Badan usaha dengan pemenuhan modal & personel (min. jumlah satpam bersertifikat Gada Pratama sesuai skala izin), kantor operasional, dan persetujuan Kepolisian. Sertifikasi personel biasanya jalur terpanjangnya — kami atur paralel.",
      },
      {
        q: "Sertifikasi satpam ditanggung siapa?",
        a: "Lazimnya BUJP/perusahaan pemberi kerja, karena sertifikasi Gada Pratama adalah prasyarat personel resmi. Untuk kandidat individual, kami juga melayani jalur pribadi.",
      },
      {
        q: "Jasa pemadam swasta butuh izin apa lagi selain izin usaha?",
        a: "Personel damkar swasta perlu kompetensi terstandar (Damkar muda/madya/utama) dan armada sesuai kelas layanan. Izin usaha + kualifikasi personel kami urus satu paket.",
      },
    ],
    related: [
      { label: "Keselamatan kerja (K3)", href: "/katalog/keselamatan-kerja-k3" },
      { label: "Hub kategori perizinan", href: "/layanan" },
    ],
  },
  {
    code: "Z",
    slug: "pendidikan-pelatihan",
    name: "Pendidikan & Pelatihan",
    icon: "📚",
    tier: "sekunder",
    tagline: "Izin untuk lembaga pendidikan & pelatihan",
    desc: "Izin operasional sekolah, perizinan kampus/perguruan tinggi, izin LKP, dan sertifikasi BNSP untuk lembaga pelatihan terakreditasi — lengkap dengan pemenuhan kualifikasi pendidik.",
    services: [
      { code: "Z.1", name: "Izin Operasional Sekolah", priceFrom: 8_000_000, priceTo: 20_000_000, desc: "SD/SMP/SMA." },
      { code: "Z.2", name: "Izin Kampus (Perguruan Tinggi)", priceFrom: 15_000_000, priceTo: 40_000_000, desc: "Perguruan tinggi/universitas." },
      { code: "Z.3", name: "Izin LKP (Lembaga Kursus Pelatihan)", priceFrom: 6_000_000, priceTo: 15_000_000, desc: "Lembaga kursus & pelatihan profesi." },
      { code: "Z.4", name: "Sertifikasi BNSP Lembaga", priceFrom: 5_000_000, priceTo: 12_000_000, desc: "Lembaga pelatihan terakreditasi." },
    ],
    faq: [
      {
        q: "Apa beda izin sekolah negeri dan swasta?",
        a: "Sekolah swasta memerlukan badan penyelenggara (yayasan/PT) plus izin operasional dari dinas pendidikan, sementara negeri dibangun pemerintah. Kualifikasi kepala sekolah, pendidik, dan sarpras tetap dinilai keduanya.",
      },
      {
        q: "LKP butuh izin apa untuk menerbitkan sertifikat?",
        a: "Izin operasional LKP dari dinas terkait; untuk kompetensi kerja, kemitraan/akreditasi BNSP membuat lembaga Anda bisa menguji dan menerbitkan sertifikat kompetensi yang diakui.",
      },
      {
        q: "Berapa lama izin kampus (proses awal)?",
        a: "Perizinan awal program studi & operasional melibatkan LLDikti dengan tahapan kelayakan akademik, sarpras, dan kualifikasi dosen — realistisnya berbulan-bulan. Kami susun dokumen kelayakannya sejak awal agar tidak bolak-balik revisi.",
      },
    ],
    related: [
      { label: "Perizinan khusus (TDY, LKP/LPK)", href: "/katalog/perizinan-khusus" },
      { label: "Hub kategori perizinan", href: "/layanan" },
    ],
  },
  {
    code: "AA",
    slug: "keuangan-asuransi",
    name: "Keuangan & Asuransi",
    icon: "💰",
    tier: "sekunder",
    tagline: "Izin untuk bisnis keuangan & asuransi",
    desc: "Divisi dengan ambang kepatuhan tertinggi: izin usaha bank, perusahaan pembiayaan, asuransi/reasuransi, pialang, dan fintech lending P2P — semuanya di bawah pengawasan OJK/BI dengan standar kelayakan ketat.",
    services: [
      { code: "AA.1", name: "Izin Usaha Bank", priceFrom: 50_000_000, priceTo: 200_000_000, desc: "Bank umum atau BPR (jasa konsultan; modal inti diatur OJK)." },
      { code: "AA.2", name: "Izin Perusahaan Pembiayaan", priceFrom: 25_000_000, priceTo: 75_000_000, desc: "Leasing / multifinance." },
      { code: "AA.3", name: "Izin Perusahaan Asuransi", priceFrom: 75_000_000, priceTo: 300_000_000, desc: "Asuransi / reasuransi." },
      { code: "AA.4", name: "Izin Pialang Asuransi", priceFrom: 15_000_000, priceTo: 40_000_000, desc: "Broker asuransi / reasuransi." },
      { code: "AA.5", name: "Izin Fintech Lending (P2P)", priceFrom: 20_000_000, priceTo: 60_000_000, desc: "Platform peer-to-peer lending terdaftar OJK." },
    ],
    faq: [
      {
        q: "Kisaran harga jasa di sini belum termasuk modal inti?",
        a: "Benar. Untuk sektor keuangan, modal inti minimum ditetapkan OJK jauh melebihi biaya jasa (mis. bank umum triliunan). Angka katalog adalah jasa konsultan penyusunan dokumen & proses perizinan.",
      },
      {
        q: "Fintech P2P harus terdaftar atau berizin OJK?",
        a: "Berizin. Penyelenggara layanan pendanaan gabungan wajib izin usaha OJK — status terdaftar hanya tahap transisi penyelenggara baru. Kami bantu sampai terbitnya izin usaha.",
      },
      {
        q: "Bisakah asing memiliki perusahaan asuransi di Indonesia?",
        a: "Bisa melalui PMA dengan batas kepemilikan asing tertentu per jenis usaha. Struktur kepemilikan kami rancang sejak pendirian badan usaha agar tidak perlu restrukturisasi mahal belakangan.",
      },
    ],
    related: [
      { label: "Pendirian badan usaha (PMA)", href: "/katalog/pendirian-badan-usaha" },
      { label: "Hub kategori perizinan", href: "/layanan" },
    ],
  },
  {
    code: "AB",
    slug: "event-hiburan-kreatif",
    name: "Event, Hiburan & Kreatif",
    icon: "🎪",
    tier: "sekunder",
    tagline: "Izin untuk event, hiburan & industri kreatif",
    desc: "Izin event organizer, bioskop, production house, dan reklame — meliputi perizinan daerah (reklame, tontonan) dan kekayaan intelektual untuk karya yang diproduksi.",
    services: [
      { code: "AB.1", name: "Izin Event Organizer (EO)", priceFrom: 8_000_000, priceTo: 15_000_000, desc: "Penyelenggara event & konser." },
      { code: "AB.2", name: "Izin Bioskop", priceFrom: 12_000_000, priceTo: 25_000_000, desc: "Bioskop & teater." },
      { code: "AB.3", name: "Izin Production House", priceFrom: 6_000_000, priceTo: 12_000_000, desc: "Studio film / video production." },
      { code: "AB.4", name: "Izin Reklame", priceFrom: 3_000_000, priceTo: 8_000_000, desc: "Izin pemasangan billboard / iklan." },
    ],
    faq: [
      {
        q: "Izin EO cukup untuk konser besar?",
        a: "Izin usaha EO adalah fondasi, tetapi konser besar menuntut izin tontonan, persetujuan tempat/keramaian (polisi & pemda), dan keamanan. Kami susun timeline izinnya sesuai kalender event Anda.",
      },
      {
        q: "Izin reklame diterbitkan siapa?",
        a: "Pemerintah daerah (berbeda-beda per kota) dengan ketentuan lokasi, ukuran, dan pajak reklame. Kami urus perizinan sekaligus edukasi kewajiban pajaknya.",
      },
      {
        q: "Production house perlu hak cipta juga?",
        a: "Karya yang diproduksi otomatis mendapat perlindungan hak cipta, tetapi pendaftaran hak cipta memberi bukti kepemilikan yang kuat saat sengketa atau lisensi. Kami tawarkan paketnya lewat divisi KI.",
      },
    ],
    related: [
      { label: "Kekayaan intelektual (HAKI)", href: "/katalog/kekayaan-intelektual" },
      { label: "Hub kategori perizinan", href: "/layanan" },
    ],
  },
  {
    code: "AC",
    slug: "kekayaan-intelektual",
    name: "Kekayaan Intelektual (HAKI)",
    icon: "💡",
    tier: "sekunder",
    tagline: "Perlindungan merek, paten & hak cipta",
    desc: "Pendaftaran merek (nasional atau Madrid Protocol), paten standar/sederhana, dan hak cipta karya — aset tak berwujud yang sering lebih bernilai dari aset fisik bisnis Anda.",
    services: [
      { code: "AC.1", name: "Pendaftaran Merek Dagang", priceFrom: 3_500_000, priceTo: 8_000_000, desc: "Merek nasional atau Madrid Protocol." },
      { code: "AC.2", name: "Pendaftaran Paten", priceFrom: 5_000_000, priceTo: 15_000_000, desc: "Paten standar atau sederhana." },
      { code: "AC.3", name: "Pendaftaran Hak Cipta", priceFrom: 2_000_000, priceTo: 5_000_000, desc: "Hak cipta karya (musik, software, dll)." },
    ],
    faq: [
      {
        q: "Sebaiknya merek didaftarkan sebelum atau sesudah usaha jalan?",
        a: "Sebelum — Indonesia memakai first-to-file: yang mendaftar lebih dulu berhak. Kasus pembajakan merek justru paling sering terjadi pada bisnis yang sudah ramai tapi belum mendaftar.",
      },
      {
        q: "Apa beda paten standar dan sederhana?",
        a: "Paten standar melindungi penemuan dengan langkah inventif penuh (20 tahun), paten sederhana untuk pengembangan produk/proses yang sudah ada (10 tahun). Penapisan cepat kami menentukan jalur yang tepat.",
      },
      {
        q: "Software otomatis terlindungi, kenapa harus daftar hak cipta?",
        a: "Perlindungan lahir otomatis, tetapi pendaftaran memberi bukti kepemilikan resmi — krusial saat pitch ke investor, lisensi ke pihak ketiga, atau tuntutan pelanggaran.",
      },
    ],
    related: [
      { label: "Event & industri kreatif", href: "/katalog/event-hiburan-kreatif" },
      { label: "Hub kategori perizinan", href: "/layanan" },
    ],
  },
  {
    code: "AD",
    slug: "legalitas-korporasi",
    name: "Legalitas Perusahaan & Perubahan Korporasi",
    icon: "📑",
    tier: "sekunder",
    tagline: "Perubahan & restrukturisasi perusahaan",
    desc: "Perubahan akta (nama, maksud tujuan, alamat), perubahan pengurus/direksi, sampai merger & akuisisi — dengan sinkronisasi ke seluruh izin turunan agar tidak ada dokumen yang nyasar.",
    services: [
      { code: "AD.1", name: "Perubahan Akta Perusahaan", priceFrom: 3_500_000, priceTo: 7_000_000, desc: "Perubahan nama, maksud tujuan, alamat." },
      { code: "AD.2", name: "Perubahan Pengurus/Direksi", priceFrom: 2_500_000, priceTo: 5_000_000, desc: "Perubahan struktur manajemen." },
      { code: "AD.3", name: "Merger & Akuisisi", priceFrom: 10_000_000, priceTo: 50_000_000, desc: "Penggabungan/pengambilalihan perusahaan." },
    ],
    faq: [
      {
        q: "Setelah ganti direksi, dokumen apa yang harus diikuti?",
        a: "Akta + SK Kemenkumham, lalu sinkronisasi NPWP, NIB, perizinan turunan, rekening bank, dan kontrak berjalan. Perubahan yang berhenti di akta adalah sumber konflik saat krediting/audit.",
      },
      {
        q: "Apa proses due diligence sebelum akuisisi?",
        a: "Pengecekan legalitas badan, izin berjalan, kewajiban pajak, ketenagakerjaan, dan litigasi. Kami menyediakan kesiapan dokumen dari sisi terjual/beli agar transaksi tidak menemui kejutan.",
      },
      {
        q: "Merger menghapus izin lama?",
        a: "Sebagian izin bisa mengikuti kesinambungan badan, sebagian harus diterbitkan ulang atas nama entitas baru. Pemetaan portofolio izin adalah langkah pertama yang kami kerjakan.",
      },
    ],
    related: [
      { label: "Perubahan & perpanjangan", href: "/katalog/perubahan-perpanjangan" },
      { label: "Hub kategori perizinan", href: "/layanan" },
    ],
  },
  {
    code: "AE",
    slug: "perpajakan-akuntansi",
    name: "Perpajakan & Akuntansi",
    icon: "💳",
    tier: "sekunder",
    tagline: "Pajak, akuntansi & laporan keuangan",
    desc: "Penyusunan SPT tahunan badan/pribadi, laporan keuangan auditan untuk bank/investor/lelang, dan konsultasi insentif pajak (tax holiday, super deduction) — dikerjakan tim yang paham regulasi terbaru.",
    services: [
      { code: "AE.1", name: "Penyusunan SPT Tahunan", priceFrom: 2_000_000, priceTo: 8_000_000, desc: "SPT Badan/Pribadi + audit keuangan." },
      { code: "AE.2", name: "Laporan Keuangan Audit", priceFrom: 5_000_000, priceTo: 30_000_000, desc: "Opini auditor & laporan keuangan tahunan." },
      { code: "AE.3", name: "Konsultasi Pajak & Insentif", priceFrom: 3_000_000, priceTo: 20_000_000, desc: "Tax holiday, PPnBM, super deduction, dll." },
    ],
    faq: [
      {
        q: "Kapan perusahaan butuh laporan keuangan auditan?",
        a: "Untuk krediting bank di atas threshold, kemitraan korporat, tender, dan kewajiban regulasi per jenis badan usaha (mis. emiten, asuransi). Klien travel kami juga butuh laporan auditan sebagai syarat upgrade PIHK.",
      },
      {
        q: "Apa itu super deduction dan siapa yang bisa memanfaatkan?",
        a: "Super deduction adalah pengurang penghasilan neto lebih besar untuk biaya riset, vokasi, dan rehabilitasi disability — diklaim di SPT badan sesuai syarat DJP. Tim kami bantu menyusun dokumen kelayakannya.",
      },
      {
        q: "Apakah SPT bisa lapor sendiri tanpa konsultan?",
        a: "Bisa untuk kasus sederhana. Tetapi begitu ada transaksi kompleks (kerugian fiskal, transaksi hubungan istimewa, PKP lintas wilayah), kesalahan pelaporan mahal harganya: koreksi, denda, dan pemeriksaan. Nilai jasa konsultan adalah mitigasi risiko itu.",
      },
    ],
    related: [
      { label: "Kalkulator pajak interaktif", href: "/kalkulator-pajak" },
      { label: "Perpajakan & registrasi dasar", href: "/katalog/perpajakan-registrasi" },
    ],
  },
];

// ------------------------------------------------------------
// PAKET BUNDEL UNGGULAN
// ------------------------------------------------------------

export const BUNDLES: CatalogBundle[] = [
  {
    name: "GO UMRAH!",
    price: 45_000_000,
    save: 5_000_000,
    badge: "MOST POPULAR",
    audience: "Untuk startup travel yang ingin langsung operasional umrah",
    includes: [
      "Pendirian PT lengkap (akta, SK Menteri)",
      "Semua izin usaha (NPWP, NIB, SIUP/TDUP)",
      "Izin PPIU (Kemenag) — siap jemput jamaah",
      "Virtual office 1 tahun (jika diperlukan)",
      "Training operasional PPIU dasar",
      "Akses jaringan mitra travel PusatPerizinan",
      "Konsultasi AI 24/7 via RIZKI + validasi dokumen AI",
    ],
  },
  {
    name: "GO HAJI PLUS!",
    price: 80_000_000,
    save: 10_000_000,
    badge: "FLAGSHIP",
    audience: "Untuk travel yang serius menjadi generator revenue haji plus",
    includes: [
      "Pendirian PT + semua izin lengkap",
      "Izin PPIU (umrah)",
      "Izin PIHK (haji plus) — jalan tol revenue",
      "Virtual office 1 tahun premium",
      "Training & pendampingan operasional lengkap",
      "Konsultasi strategi PIHK",
      "Akses jaringan mitra + partner Saudi",
      "Monitoring kepatuhan lewat dashboard layanan berjalan",
    ],
  },
  {
    name: "UPGRADE PPIU KE PIHK",
    price: 30_000_000,
    save: 5_000_000,
    audience: "Untuk travel yang sudah punya PPIU dan ingin naik level",
    includes: [
      "Analisis kelayakan upgrade ke PIHK",
      "Persiapan dokumentasi lengkap",
      "Koordinasi intensif dengan Kemenag",
      "Dukungan hingga approval PIHK",
      "Training operasional PIHK",
    ],
  },
  {
    name: "SERTIFIKASI ISO LENGKAP",
    price: 30_000_000,
    save: 5_000_000,
    badge: "BEST VALUE",
    audience: "Untuk upgrade kredibilitas perusahaan travel & korporasi",
    includes: [
      "ISO 9001 (Quality Management)",
      "ISO 14001 (Environmental)",
      "ISO 45001 (Health & Safety — kritis untuk travel)",
      "Konsultasi + audit internal + persiapan",
      "Pendampingan implementasi",
    ],
  },
  {
    name: "PERIZINAN HOTEL COMPLETE",
    price: 55_000_000,
    save: 12_000_000,
    audience: "Untuk bisnis hospitality resort/hotel",
    includes: [
      "TDUP (Pariwisata)",
      "Izin usaha hotel",
      "SLF (Sertifikat Laik Fungsi)",
      "Sertifikat halal",
      "Sertifikasi hotel bintang (1–5)",
      "Sertifikat kualitas air",
    ],
  },
  {
    name: "LEGALITAS LENGKAP STARTUP",
    price: 25_000_000,
    save: 3_500_000,
    audience: "Untuk startup apa pun yang perlu semua izin dasar",
    includes: [
      "Pendirian PT",
      "NPWP + NIB + SIUP",
      "Virtual office 3 bulan",
      "Konsultasi bisnis dasar",
    ],
  },
];

// ------------------------------------------------------------
// HELPERS
// ------------------------------------------------------------

/** Semua layanan (datar) — untuk statistik & pencarian. */
export const ALL_CATALOG_SERVICES: CatalogService[] = CATEGORIES.flatMap((c) => c.services);

/** Jumlah jenis layanan (baris kode, mis. A.1a dihitung 1). */
export const COUNT_SERVICES: number = ALL_CATALOG_SERVICES.length;

/** Jumlah varian paket total (termasuk variant PT/CV/Firma/dst). */
export const COUNT_VARIANTS: number =
  COUNT_SERVICES + ALL_CATALOG_SERVICES.reduce((acc, s) => acc + (s.variants?.length ?? 0), 0);

/** Harga terendah & tertinggi di seluruh katalog. */
export const PRICE_FLOOR: number = Math.min(
  ...ALL_CATALOG_SERVICES.flatMap((s) => [s.priceFrom, s.priceTo]).filter((v): v is number => typeof v === "number")
);
export const PRICE_CEIL: number = Math.max(
  ...ALL_CATALOG_SERVICES.flatMap((s) => [s.priceFrom, s.priceTo]).filter((v): v is number => typeof v === "number")
);

export function getCategory(slug: string): CatalogCategory | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

/** WhatsApp CTA dengan konteks halaman (nomor dari single source of truth). */
export function waLink(text: string): string {
  // Nomor terpusat di src/lib/site.ts (CONTACT.whatsapp).
  return `https://wa.me/6281269999910?text=${encodeURIComponent(text)}`;
}
