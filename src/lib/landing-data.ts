// ============================================================
// PUSATPERIZINAN.COM — Data Master Layanan & Konten
// Single source of truth untuk seluruh landing page
// ============================================================

import {
  FileCheck,
  Building2,
  Store,
  Scale,
  Leaf,
  FlaskConical,
  ShieldCheck,
  Plane,
  HardHat,
  HeartPulse,
  Truck,
  Coins,
  MoonStar,
  Landmark,
  PlaneTakeoff,
  Globe2,
  Pickaxe,
  type LucideIcon,
} from "lucide-react";

export interface ServiceItem {
  id: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  price: string;
  duration: string;
  popular?: boolean;
  features: string[];
}

export const SERVICES: ServiceItem[] = [
  {
    id: "nib",
    title: "NIB & OSS-RBA",
    desc: "Nomor Induk Berusaha via OSS. Fondasi legal semua usaha — proses cepat, resmi pemerintah.",
    icon: FileCheck,
    price: "Rp 350rb",
    duration: "1 hari kerja",
    popular: true,
    features: ["Pendaftaran NIB resmi", "Konsultasi KBLI terbaik", "Sertifikat Standar sesuai risiko", "Panduan kewajiban pasca-terbit"],
  },
  {
    id: "pt",
    title: "Pendirian PT & PMA",
    desc: "Badan usaha paling kredibel untuk investasi, tender, dan skala besar. Akta resmi + SK Kemenkumham.",
    icon: Building2,
    price: "Rp 3,5jt",
    duration: "3-7 hari kerja",
    popular: true,
    features: ["Akta notaris + SK Kemenkumham", "NPWP badan & NIB", "Konsultasi struktur saham", "Domisili virtual opsional"],
  },
  {
    id: "cv",
    title: "Pendirian CV & Firma",
    desc: "Ideal untuk UMKM yang siap naik kelas. Murah, cepat, dan diakui lembaga keuangan.",
    icon: Store,
    price: "Rp 1,5jt",
    duration: "2-3 hari kerja",
    features: ["Akta notaris resmi", "NPWP & NIB", "Surat Keterangan Domisili", "Konsultasi perjanjian kerja sama"],
  },
  {
    id: "halal",
    title: "Sertifikasi Halal",
    desc: "Wajib bagi produk F&B (UU JPH). Proses via SEHATI — kami urus sampai label halal terbit.",
    icon: Leaf,
    price: "Rp 1,2jt",
    duration: "14-30 hari",
    features: ["Pendampingan Proses Produk (PPP)", "Koordinasi LPPOM & BPJPH", "Pemeriksaan bahan & dokumen", "Gratis subsidi kuota UMKM"],
  },
  {
    id: "bpom",
    title: "Izin Edar BPOM & PIRT",
    desc: "Jualan produk legally di marketplace & toko. MD untuk suplemen, PIRT untuk makanan olahan.",
    icon: FlaskConical,
    price: "Rp 2,5jt",
    duration: "30-60 hari",
    features: ["Pendaftaran CPPOB/MD", "Uji lab terhubung", "Desain label sesuai regulasi", "Pendampingan audit fasilitas"],
  },
  {
    id: "pbg",
    title: "PBG & SLF",
    desc: "Persetujuan Bangunan Gedung + Sertifikat Laik Fungsi — syarat buka usaha berbasis lokasi.",
    icon: HardHat,
    price: "Rp 2jt",
    duration: "14-30 hari",
    features: ["Pengukuran & gambar teknis", "Pengurusan ke DPMPTSP", "Checklist keselamatan", "SLF untuk bangunan existing"],
  },
  {
    id: "lingkungan",
    title: "Izin Lingkungan (AMDAL/UKL-UPL)",
    desc: "Legalitas lingkungan sesuai PP 22/2021 — penting untuk pabrik, tambang, dan konstruksi.",
    icon: ShieldCheck,
    price: "Rp 7,5jt",
    duration: "30-90 hari",
    features: ["Penyusunan dokumen lingkungan", "SPPL / UKL-UPL / AMDAL", "Koordinasi forum teknis", "Pendampingan matriks RKL-RPL"],
  },
  {
    id: "sni",
    title: "SNI & Sertifikasi Mutu",
    desc: "Standar nasional produk — buka akses tender dan kepercayaan pasar modern.",
    icon: Scale,
    price: "Rp 5jt",
    duration: "60-90 hari",
    features: ["Pemilihan SNI sesuai KBLI", "Persiapan audit LSPro", "Uji sampel lab terakreditasi", "Perbaikan dokumen mutu"],
  },
  {
    id: "pariwisata",
    title: "Izin Pariwisata & Hotel",
    desc: "TDAU, Sertifikat Usaha Pariwisata, hingga pendirian travel & wisata bahari.",
    icon: Plane,
    price: "Rp 2,5jt",
    duration: "14-21 hari",
    features: ["Tanda Daftar Usaha Pariwisata", "Sertifikasi usaha travel", "Izin wisata khusus", "Konsultasi BHP & gaya hidup halal"],
  },
  {
    id: "kesehatan",
    title: "Izin Klinik & Farmasi",
    desc: "SIPA, SIA, SIKIA hingga izin apotek — kami paham betul regulasi Kemenkes.",
    icon: HeartPulse,
    price: "Rp 7,5jt",
    duration: "30-60 hari",
    features: ["Izin usaha & izin praktik", "Koordinasi Dinkes & DPMPTSP", "Persyaratan sarana kesehatan", "NIB & sertifikat standar"],
  },
  {
    id: "logistik",
    title: "Izin Logistik & Angkutan",
    desc: "TDUP, Izin Niaga, hingga armada perizinan gudang & distribusi antar-pulau.",
    icon: Truck,
    price: "Rp 3,5jt",
    duration: "21-45 hari",
    features: ["TDUP & uji kelayakan armada", "Izin depot & gudang", "TPI & dokumen ekspor", "NIB sektor transportasi"],
  },
  {
    id: "tambang",
    title: "IUP / IUPK & Energi",
    desc: "Perizinan tambang, pengolahan, dan energi terbarukan bersama tim ahli komoditas.",
    icon: Coins,
    price: "Rp 25jt",
    duration: "90-180 hari",
    features: ["Penyusunan dokumen IUP/IUPK", "Koordinasi ESDM & Minerba", "RKAB & kewajiban pengusahaan", "Izin pengangkutan & penjualan"],
  },
  {
    id: "ppi-umroh",
    title: "Izin Umroh (PPIU)",
    desc: "Legalitas travel umroh resmi Kemenag: SIPU & SPPU via SIMPONI. Jamaah aman, travel naik kelas.",
    icon: MoonStar,
    price: "Rp 12jt",
    duration: "30-45 hari",
    popular: true,
    features: ["Pendirian PT + NIB sektor travel", "SPPU & SIPU ke Kemenag provinsi", "Pendaftaran SIMPONI / e-Katalog", "Rekening kolektif jamaah & kontrak maktab"],
  },
  {
    id: "ppi-haji",
    title: "Izin Haji (PPIH)",
    desc: "Puncak legalitas travel ibadah — izin PPIH Kemenag. Modal, dokumen & uji kelayakan kami pandu penuh.",
    icon: Landmark,
    price: "Rp 25jt",
    duration: "60-120 hari",
    features: ["Audit kelayakan modal & legalitas", "Pengajuan izin PPIH ke Kemenag", "Uji kelayakan & pembinaan Kemenag", "SK PPIH + penempatan PPUMI"],
  },
  {
    id: "iata",
    title: "Registrasi IATA",
    desc: "Akreditasi IATA untuk terbitkan tiket internasional resmi — standar global, akses BSP & komisi penuh.",
    icon: PlaneTakeoff,
    price: "Rp 10jt",
    duration: "45-90 hari",
    features: ["Konsultasi kriteria akreditasi IATA", "Bank guarantee & dokumen keuangan", "Registrasi IATA ID (Accredited/TIDS)", "Panduan BSP, CASS & settlement"],
  },
  {
    id: "saudi-arabia",
    title: "Izin Usaha Arab Saudi (MISA)",
    desc: "Ekspansi ke Arab Saudi era Vision 2030: lisensi MISA, CR & kepatuhan lokal — tim internasional kami.",
    icon: Globe2,
    price: "Rp 45jt",
    duration: "60-120 hari",
    features: ["Lisensi investasi MISA (100% asing)", "Commercial Registration (CR)", "Iqama GM, GOSI & Chamber of Commerce", "Kepatuhan ZATCA e-invoice & Saudization"],
  },
  {
    id: "rkab-tambang",
    title: "RKAB & Kepatuhan Tambang",
    desc: "RKAB 3 tahunan, perpanjangan IUP/IUPK, izin angkut & jual via MODI — kepatuhan penuh ESDM-Minerba.",
    icon: Pickaxe,
    price: "Rp 8jt",
    duration: "30-90 hari",
    features: ["Penyusunan RKAB 3 tahun + justifikasi", "Perpanjangan & regularisasi IUP/IUPK", "Izin angkut & penjualan via MODI", "LKPM minerba & good mining practice"],
  },
];

export const PROCESS_STEPS = [
  {
    step: 1,
    title: "Konsultasi Gratis",
    desc: "Ceritakan usaha Anda via WA atau AI Consultant kami. Dalam 15 menit, Anda tahu persis izin apa yang dibutuhkan.",
  },
  {
    step: 2,
    title: "Penawaran & Roadmap",
    desc: "Kirim dokumen via foto. Kami susun roadmap perizinan lengkap dengan estimasi waktu & biaya transparan.",
  },
  {
    step: 3,
    title: "Kami yang Proses",
    desc: "Tim ahli kami urus semua koordinasi notaris, instansi, hingga revisi dokumen. Anda pantau progres real-time.",
  },
  {
    step: 4,
    title: "Izin Terbit, Bisnis Jalan",
    desc: "Dokumen resmi dikirim ke tangan Anda + panduan kewajiban pasca-terbit. Garansi uang kembali 100%.",
  },
];

export const PRICING = [
  {
    name: "UMKM",
    tagline: "Untuk usaha yang baru memulai",
    price: "Rp 350rb",
    period: "paket mulai dari",
    highlight: false,
    features: [
      "NIB + Sertifikat Standar (OSS-RBA)",
      "Konsultasi KBLI terbaik untuk modal & pajak",
      "NPWP usaha",
      "Panduan LKPM & kewajiban pajak",
      "Support WhatsApp 30 hari",
    ],
    cta: "Mulai dari Sini",
  },
  {
    name: "Bisnis",
    tagline: "Untuk usaha yang siap tumbuh",
    price: "Rp 3,5jt",
    period: "paket mulai dari",
    highlight: true,
    features: [
      "Semua fitur paket UMKM",
      "Pendirian PT / CV lengkap (akta + SK Kemenkumham)",
      "Sertifikasi Halal atau PIRT",
      "PBG & SLF untuk kantor/toko",
      "Prioritas proses — kurir dokumen",
      "Support WhatsApp 90 hari + laporan bulanan",
    ],
    cta: "Pilih Paket Bisnis",
  },
  {
    name: "Enterprise",
    tagline: "Untuk korporasi & investasi besar",
    price: "Rp 25jt",
    period: "paket mulai dari",
    highlight: false,
    features: [
      "Semua fitur paket Bisnis",
      "Izin Lingkungan (AMDAL/UKL-UPL)",
      "Perizinan sektor khusus (tambang, klinik, logistik)",
      "Pendirian PMA & struktur investasi asing",
      "Legal due diligence & compliance audit",
      "Account manager khusus + SLA kontrak",
    ],
    cta: "Konsultasi Enterprise",
  },
];

export const TESTIMONIALS = [
  {
    name: "Rina Kartika",
    role: "Owner, Dapur Rina Catering",
    city: "Bandung",
    rating: 5,
    content:
      "Sertifikat Halal yang tadinya bingung total, selesai 3 minggu. Timnya sabar banget ngajarin input SEHATI. Sekarang pesanan naik 40% karena label halal!",
  },
  {
    name: "Budi Santoso",
    role: "Direktur, BS Konstruksi",
    city: "Jakarta",
    rating: 5,
    content:
      "BUT, NIB, sampai SBU konstruksi semua dibantu. Yang paling saya suka: progres di-update tiap hari via WA. Tender pun lancar karena dokumen lengkap.",
  },
  {
    name: "Amelia Wijaya",
    role: "Founder, Skincare Ameera",
    city: "Surabaya",
    rating: 5,
    content:
      "BPOM produk skincare saya terbit dalam 45 hari. Mereka bantu sampai urusan label & klaim produk. Worth it banget untuk brand yang mau serius masuk marketplace.",
  },
  {
    name: "Hendra Gunawan",
    role: "Owner, HG Coffee House",
    city: "Yogyakarta",
    rating: 5,
    content:
      "Buka kafe pertama, bingung harus punya izin apa aja. Lewat fitur Cek Izin AI-nya langsung kelihatan 6 izin yang dibutuhkan. Paket Bisnis, 2 minggu beres semua.",
  },
  {
    name: "Siti Nurhaliza",
    role: "Pemilik, Batik Siti Store",
    city: "Solo",
    rating: 5,
    content:
      "Harga paling transparan dari semua yang saya tanya. NIB cuma sehari dan GRATIS konsultasi pajak UMKM-nya. Recommended untuk ibu-ibu pebisnis!",
  },
  {
    name: "Daniel Prasetyo",
    role: "CEO, TourJava Travel",
    city: "Bali",
    rating: 5,
    content:
      "Pindah dari konsultan lama karena prosesnya lama banget. Di sini TDAU & izin pariwisata selesai 12 hari. Sekarang kami jadi pelanggan repeat untuk 3 cabang.",
  },
];

export const FAQS = [
  {
    q: "Apakah prosesnya 100% legal dan aman?",
    a: "Mutlak legal. Kami bekerja sama dengan notaris resmi dan hanya menggunakan jalur resmi pemerintah (OSS-RBA, Kemenkumham, DPMPTSP, dsb). Semua dokumen terbit atas nama Anda dan dapat diverifikasi langsung di instansi. Kami juga memberikan garansi uang kembali 100% jika izin gagal terbit karena kesalahan proses kami.",
  },
  {
    q: "Berapa lama proses pengurusan izin?",
    a: "Tergantung jenis izin: NIB bisa selesai 1 hari kerja, pendirian PT/CV 3-7 hari kerja, Sertifikasi Halal 14-30 hari, BPOM 30-60 hari, dan AMDAL 30-90 hari. Saat konsultasi gratis, Anda akan mendapat estimasi waktu yang jelas per jenis izin sebelum memutuskan.",
  },
  {
    q: "Saya belum punya badan usaha, bisa diuruskan sekaligus?",
    a: "Sangat bisa — justru ini paket paling sering diambil. Kami urus dari pendirian badan usaha (PT/CV/Perseorangan), NIB, sampai izin operasional sektoral dalam satu roadmap. Anda tinggal siapkan KTP dan NPWP pribadi, sisanya kami yang koordinasi.",
  },
  {
    q: "Apakah saya harus datang ke kantor?",
    a: "Tidak perlu. 95% proses kami lakukan secara daring + kurir dokumen ke alamat Anda. Layanan kami menjangkau seluruh 38 provinsi dan 514 kabupaten/kota Indonesia. Untuk kebutuhan khusus (audit fisik, AMDAL, sektor tambang), tim kami yang akan datang ke lokasi Anda.",
  },
  {
    q: "Bisakah diurus izin travel umroh, haji, atau registrasi IATA?",
    a: "Bisa — kami punya divisi khusus Travel Ibadah & Aviasi. Kami urus pendirian PT travel, SIPU/SPPU (PPIU) sampai izin PPIH untuk haji, termasuk pendaftaran SIMPONI & rekening kolektif jamaah. Untuk agen tiket, kami siapkan akreditasi IATA (BSP/CASS) agar Anda bisa terbitkan tiket internasional resmi.",
  },
  {
    q: "Apakah bisa bantu buka usaha di Arab Saudi?",
    a: "Bisa. Tim internasional kami menangani ekspansi ke Arab Saudi era Vision 2030: lisensi investasi MISA (banyak sektor kini terbuka 100% kepemilikan asing), Commercial Registration (CR), Iqama direksi, sampai kepatuhan ZATCA e-invoice & Saudization. Semua dari Jakarta, tanpa Anda harus bolak-balik ke Riyadh.",
  },
  {
    q: "Bagaimana sistem pembayarannya?",
    a: "Transparan dan aman: 50% di awal (down payment), 50% setelah izin terbit. Pembayaran via transfer bank resmi atas nama badan hukum kami, lengkap dengan invoice & kontrak kerja sama. Tidak ada biaya tersembunyi — semua tercantum di penawaran resmi.",
  },
  {
    q: "Izin saya sudah kadaluarsa / belum pernah dilaporkan (LKPM), bisa dibantu?",
    a: "Bisa. Kami menangani regularisasi: perpanjangan izin, kewajiban LKPM di OSS, update data NIB, sampai penyelesaian sanksi administratif ringan. Konsultasikan kondisi Anda — semakin cepat dirapikan, semakin kecil risikonya.",
  },
];

export const SECTORS = [
  "Kuliner / F&B",
  "Retail / Toko",
  "Konstruksi / Properti",
  "Manufaktur / Pabrik",
  "Jasa / Konsultan",
  "Logistik / Transportasi",
  "Kesehatan / Klinik",
  "Pariwisata / Hotel",
  "Travel Ibadah (Haji/Umroh)",
  "Pendidikan",
  "Pertanian / Perkebunan",
  "Tambang / Energi",
  "Digital / Startup",
  "Lainnya",
];

export const WHATSAPP_NUMBER = "6281269999910"; // Nomor WA bisnis (official pusatperizinan.com)
export const WHATSAPP_DISPLAY = "0812-6999-9910";
export const OFFICE_NAME = "PusatPerizinan.com — Kantor Pusat SCBD";
export const OFFICE_ADDRESS = "Indonesia Stock Exchange Building, Tower 2, Lantai 5, SCBD Lot 13, Jl. Jend. Sudirman Kav. 52-53, Jakarta Selatan 12190";
export const OFFICE_SHORT = "SCBD Lot 13, Jl. Jend. Sudirman Kav. 52-53, Jakarta Selatan 12190";
