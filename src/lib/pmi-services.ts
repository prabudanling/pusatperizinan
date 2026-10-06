// ============================================================
// PUSATPERIZINAN.COM — Data Master Jasa Penempatan PMI
// Pekerja Migran Indonesia ke Luar Negeri (TKI)
// Riset 2025: UU 18/2017, KemenP2MI, BP2MI, SISKOP2MI, G2G
// ============================================================

import {
  FileBadge,
  GraduationCap,
  Award,
  Stamp,
  Languages,
  FileSignature,
  PlaneTakeoff,
  ShieldCheck,
  Users,
  BriefcaseBusiness,
  HeartPulse,
  Globe2,
  type LucideIcon,
} from "lucide-react";

export interface PmiServiceItem {
  id: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  price: string;
  duration: string;
  audience: "perusahaan" | "individu";
  popular?: boolean;
  features: string[];
}

export interface PmiCountry {
  code: string;
  name: string;
  flag: string;
  region: "timur-tengah" | "asia" | "barat";
  sectors: string;
  scheme: string;
  salary: string;
  note?: string;
}

// ------------------------------------------------------------
// A. LAYANAN UNTUK PERUSAHAAN (B2B)
// ------------------------------------------------------------
export const PMI_B2B_SERVICES: PmiServiceItem[] = [
  {
    id: "pptkis",
    title: "Izin P3MI / PPTKIS",
    desc: "Perizinan lengkap badan usaha penempatan PMI: pendirian PT + NIB KBLI 78202, Surat Izin Pengerahan (SIP) per negara, deposito bank, sampai sertifikasi manajemen.",
    icon: FileBadge,
    price: "Rp 25jt",
    duration: "2-4 bulan",
    audience: "perusahaan",
    popular: true,
    features: [
      "Pendirian PT + NIB KBLI 78202 + legalitas penuh",
      "SIP pengerahan per negara tujuan ke KemenP2MI",
      "Pendampingan deposito bank & sumpah jabatan",
      "Kepatuhan laporan SISKOP2MI + izin kantor cabang",
    ],
  },
  {
    id: "lpk-pmi",
    title: "Pendirian LPK Berizin (LPK-P)",
    desc: "Legalitas Lembaga Pendidikan & Pelatihan kerja: izin Disnaker, verifikasi kesiapan penempatan PMI oleh BP2MI, kurikulum bahasa & keterampilan sesuai job order.",
    icon: GraduationCap,
    price: "Rp 10jt",
    duration: "1-2 bulan",
    audience: "perusahaan",
    features: [
      "NIB + izin penyelenggaraan LPK dari Disnaker",
      "Verifikasi kesiapan LPK oleh BP3MI/BP2MI",
      "Kurikulum bahasa, budaya kerja & keterampilan",
      "Integrasi job order PPTKIS & skema G2G",
    ],
  },
  {
    id: "bnsp-pmi",
    title: "Sertifikasi Kompetensi BNSP",
    desc: "Sertifikasi kompetensi kerja PMI via LSP berlisensi BNSP — meningkatkan nilai jual di negara tujuan (perawat, kaigo, CRT, konstruksi, manufaktur).",
    icon: Award,
    price: "Rp 1,5jt",
    duration: "2-4 minggu",
    audience: "perusahaan",
    features: [
      "Uji kompetensi via LSP berlisensi BNSP",
      "Skema sesuai SKKNI sektor tujuan",
      "Sertifikat kompetensi resmi nasional",
      "Persiapan uji + simulasi praktik",
    ],
  },
];

// ------------------------------------------------------------
// B. LAYANAN UNTUK INDIVIDU (B2C) — HULU KE HILIR
// ------------------------------------------------------------
export const PMI_B2C_SERVICES: PmiServiceItem[] = [
  {
    id: "dokumen-pmi",
    title: "Bundle Dokumen Keberangkatan",
    desc: "Semua dokumen dasar PMI diurus satu paket: e-Paspor, SKU/SKCK, MCU (medical check-up), SO (Surat Keterangan Sehat), hingga vaksin lengkap.",
    icon: Stamp,
    price: "Rp 2,5jt",
    duration: "7-21 hari",
    audience: "individu",
    popular: true,
    features: [
      "e-Paspor (reguler 5/10 tahun) via Migrasi",
      "SKU, SKCK & rekap data kependudukan",
      "Medical Check-Up + Surat Keterangan Sehat",
      "Vaksin lengkap (termasuk meningitis Timur Tengah)",
    ],
  },
  {
    id: "bahasa-pmi",
    title: "Pelatihan Bahasa & Budaya Kerja",
    desc: "Kelas bahasa sesuai negara tujuan: JFT-Basic/JLPT N4 (Jepang), EPS-TOPIK (Korea), bahasa Mandarin dasar (Taiwan), bahasa Inggris kerja (HK/SG/Barat).",
    icon: Languages,
    price: "Rp 3jt",
    duration: "1-4 bulan",
    audience: "individu",
    features: [
      "JFT-Basic A2 / JLPT N4 untuk Jepang",
      "EPS-TOPIK untuk Korea Selatan",
      "Mandarin dasar & budaya kerja Taiwan",
      "English for Work (HK, Singapura, Barat)",
    ],
  },
  {
    id: "kontrak-visa-pmi",
    title: "Kontrak Kerja, Visa & Legalisasi",
    desc: "Pencocokan job order resmi SISKOP2MI, kontrak kerja sah, legalisasi dokumen, visa kerja & permit negara tujuan (Musaned Saudi, e-visa Taiwan, COE Jepang).",
    icon: FileSignature,
    price: "Rp 3,5jt",
    duration: "2-8 minggu",
    audience: "individu",
    popular: true,
    features: [
      "Job order resmi terdaftar SISKOP2MI",
      "Kontrak kerja sah + legalisasi dokumen",
      "Visa kerja: Musaned (Saudi), COE (Jepang), dll",
      "Verifikasi majikan & agensi tujuan",
    ],
  },
  {
    id: "keberangkatan-pmi",
    title: "Ticketing BI, Asuransi & Keberangkatan",
    desc: "Finishing hulu-hilir: tiket BI via BNI, asuransi JPKK BPJS Ketenagakerjaan, registrasi SISKOP2MI, pengurusan OPP sampai penerbangan berangkat.",
    icon: PlaneTakeoff,
    price: "Rp 2jt",
    duration: "3-14 hari",
    audience: "individu",
    features: [
      "Tiket BI (Biaya Infrastruktur) via BNI",
      "Asuransi JPKK BPJS Ketenagakerjaan",
      "Registrasi SISKOP2MI + E-PMI + OPP",
      "Pendampingan di bandara & briefing akhir",
    ],
  },
  {
    id: "jepang-ssw",
    title: "Penempatan Jepang — SSW/Specified Skilled Worker",
    desc: "Kerja resmi Jepang skema Tokutei Ginou (SSW): 12 sektor (kaigo, manufaktur, konstruksi, pangan) atau program magang via IMJ — gaji ¥180-300 ribu/bulan.",
    icon: Globe2,
    price: "Rp 30jt",
    duration: "3-6 bulan",
    audience: "individu",
    popular: true,
    features: [
      "Skema SSW Tokutei Ginou atau Magang IMJ",
      "Persiapan JLPT/JFT + uji keterampilan sektor",
      "COE (Certificate of Eligibility) & visa",
      "Pendampingan G2G maupun jalur PPTKIS",
    ],
  },
  {
    id: "korea-eps",
    title: "Penempatan Korea Selatan — EPS",
    desc: "Program EPS Korea (G2G): lulus EPS-TOPIK, masuk roster giga hiring, kontrak manufaktur/pertanian/perikanan — gaji mulai ₩2,1 juta/bulan.",
    icon: Globe2,
    price: "Rp 15jt",
    duration: "4-8 bulan",
    audience: "individu",
    features: [
      "Kursus + ujian EPS-TOPIK (Kemenaker)",
      "Pendaftaran roster & seleksi giga hiring",
      "Kontrak resmi G2G Korea-Indonesia",
      "Pengurusan visa E-9 & keberangkatan",
    ],
  },
  {
    id: "taiwan-hk-sg",
    title: "Penempatan Asia: Taiwan, Hong Kong, Singapura",
    desc: "Fabrik Taiwan (NT$29.500+/bln), pembantu rumah tangga Hong Kong (HK$5.100+ tunjangan makan) & Singapura (S$650+) — jalur resmi agen berizin.",
    icon: BriefcaseBusiness,
    price: "Rp 15jt",
    duration: "2-4 bulan",
    audience: "individu",
    features: [
      "Taiwan: manufaktur + pelatihan Mandarin dasar",
      "Hong Kong: PRT dengan kontrak standar resmi",
      "Singapura: housemaid & service sector",
      "Semua via agen tujuan terverifikasi",
    ],
  },
  {
    id: "timur-tengah-pmi",
    title: "Penempatan Timur Tengah: Saudi, UAE, Qatar, Kuwait",
    desc: "PRT, sopir, teknisi & profesional ke Arab Saudi (Musaned), UAE, Qatar, Kuwait, Oman — vaksin meningitis, SO, dan kontrak embassy attestation lengkap.",
    icon: Globe2,
    price: "Rp 8jt",
    duration: "1-3 bulan",
    audience: "individu",
    features: [
      "Registrasi Musaned untuk Arab Saudi",
      "Profesional: SAR 6.000-18.000 (perawat/teknisi)",
      "Visa kerja + embassy attestation kontrak",
      "Pendampingan purna via KBRI/KJRI",
    ],
  },
  {
    id: "barat-pmi",
    title: "Penempatan Barat: Jerman, UK, Canada, Australia",
    desc: "Skema terbaik gaji tertinggi: Triple Win Jerman (perawat EUR 2.000-2.800), Health & Care Worker UK, caregiver/nurse Canada (CAD 15-20/jam), seasonal Australia/NZ.",
    icon: Globe2,
    price: "Rp 35jt",
    duration: "4-9 bulan",
    audience: "individu",
    features: [
      "Jerman: G2G Triple Win + kelas B1/B2",
      "UK: Health & Care Worker visa (sponsor resmi)",
      "Canada: TFWP/caregiver + LMIA employer",
      "Seleksi ketat: bahasa, kompetensi, MCU lanjutan",
    ],
  },
  {
    id: "purna-pmi",
    title: "Layanan Purna & Perlindungan PMI",
    desc: "Perlindungan sesuai UU 18/2017: pendampingan keluhan, repatriasi, reintegrasi & pemberdayaan dana PMI (KUR hingga Rp100 juta) kembali ke kampung halaman.",
    icon: HeartPulse,
    price: "Gratis*",
    duration: "Sesuai kebutuhan",
    audience: "individu",
    features: [
      "Kanal pengaduan & pendampingan kasus",
      "Koordinasi BP2MI/KBRI saat bermasalah",
      "Repatriasi & reintegrasi usaha",
      "Pendampingan KUR PMI & literasi keuangan",
    ],
  },
];

// ------------------------------------------------------------
// C. NEGARA TUJUAN (17 negara besar)
// ------------------------------------------------------------
export const PMI_COUNTRIES: PmiCountry[] = [
  { code: "sa", name: "Arab Saudi", flag: "🇸🇦", region: "timur-tengah", sectors: "PRT, Teknisi, Perawat", scheme: "Musaned / PPTKIS", salary: "SAR 1.000-18.000/bln" },
  { code: "ae", name: "Uni Emirat Arab", flag: "🇦🇪", region: "timur-tengah", sectors: "PRT, Retail, Hospitality", scheme: "PPTKIS / agen resmi", salary: "AED 1.500-8.000/bln" },
  { code: "qa", name: "Qatar", flag: "🇶🇦", region: "timur-tengah", sectors: "PRT, Konstruksi, Hospitality", scheme: "PPTKIS / agen resmi", salary: "QAR 1.400-7.000/bln" },
  { code: "kw", name: "Kuwait", flag: "🇰🇼", region: "timur-tengah", sectors: "PRT, Kebersihan", scheme: "PPTKIS / agen resmi", salary: "KWD 120-450/bln" },
  { code: "om", name: "Oman", flag: "🇴🇲", region: "timur-tengah", sectors: "PRT, Teknisi", scheme: "PPTKIS / agen resmi", salary: "OMR 150-500/bln" },
  { code: "bh", name: "Bahrain", flag: "🇧🇭", region: "timur-tengah", sectors: "PRT, Retail", scheme: "PPTKIS / agen resmi", salary: "BHD 130-400/bln" },
  { code: "jo", name: "Yordania", flag: "🇯🇴", region: "timur-tengah", sectors: "PRT, Manufaktur (QIZ)", scheme: "PPTKIS / agen resmi", salary: "JOD 140-350/bln" },
  { code: "my", name: "Malaysia", flag: "🇲🇾", region: "asia", sectors: "Manufaktur, Konstruksi, PRT", scheme: "G2G + agen berizin", salary: "RM 1.700-3.000/bln" },
  { code: "sg", name: "Singapura", flag: "🇸🇬", region: "asia", sectors: "PRT, Service, Maritim", scheme: "Agen berizin MOM", salary: "S$650-2.500/bln" },
  { code: "hk", name: "Hong Kong", flag: "🇭🇰", region: "asia", sectors: "PRT (FDH)", scheme: "Agen berizin + kontrak standar", salary: "HK$5.100+ tunjangan/bln" },
  { code: "tw", name: "Taiwan", flag: "🇹🇼", region: "asia", sectors: "Manufaktur, Perawat, Perikanan", scheme: "Broker resmi / G2G", salary: "NT$29.500+/bln" },
  { code: "jp", name: "Jepang", flag: "🇯🇵", region: "asia", sectors: "Kaigo, Manufaktur, Konstruksi, Pangan", scheme: "SSW Tokutei Ginou / Magang IMJ", salary: "¥180.000-314.000/bln" },
  { code: "kr", name: "Korea Selatan", flag: "🇰🇷", region: "asia", sectors: "Manufaktur, Pertanian, Perikanan", scheme: "EPS G2G (E-9)", salary: "₩2.100.000+/bln" },
  { code: "bn", name: "Brunei Darussalam", flag: "🇧🇳", region: "asia", sectors: "PRT, Teknisi Migas", scheme: "Agen berizin", salary: "BND 450-1.500/bln" },
  { code: "de", name: "Jerman", flag: "🇩🇪", region: "barat", sectors: "Perawat (Pflege), Hospitality", scheme: "G2G Triple Win", salary: "EUR 2.000-2.800/bln" },
  { code: "uk", name: "Inggris Raya", flag: "🇬🇧", region: "barat", sectors: "Perawat, Health & Care", scheme: "Health & Care Worker Visa", salary: "GBP 22.000-27.000/thn" },
  { code: "ca", name: "Kanada", flag: "🇨🇦", region: "barat", sectors: "Caregiver, Nurse, Food Processing", scheme: "TFWP / Caregiver PR Pathway", salary: "CAD 15-20/jam" },
];

export const PMI_STATS = {
  countries: PMI_COUNTRIES.length,
  target2025: 425000,
  registered: "1,3 juta+",
  sectors: 12,
};

// Alur pemberangkatan hulu ke hilir
export const PMI_PROCESS_STEPS = [
  {
    step: 1,
    title: "Konsultasi & Pencocokan",
    desc: "Ceritakan skill, bahasa, dan negara tujuan Anda. Kami cocokkan dengan job order resmi di SISKOP2MI — tanpa biaya penempatan ilegal.",
  },
  {
    step: 2,
    title: "Dokumen Dasar",
    desc: "Kami urus e-Paspor, SKU/SKCK, Medical Check-Up (MCU), Surat Keterangan Sehat (SO), dan vaksin lengkap dalam satu paket.",
  },
  {
    step: 3,
    title: "Pelatihan & Bahasa",
    desc: "Kelas bahasa (JFT/JLPT Jepang, EPS-TOPIK Korea, Mandarin Taiwan, English for Work) plus budaya kerja negara tujuan.",
  },
  {
    step: 4,
    title: "Sertifikasi Kompetensi",
    desc: "Uji kompetensi BNSP via LSP berlisensi sesuai SKKNI sektor tujuan — nilai jual Anda naik, gaji lebih baik.",
  },
  {
    step: 5,
    title: "Kontrak, Visa & Legalisasi",
    desc: "Kontrak kerja sah (Musaned Saudi, COE Jepang, e-visa Taiwan), legalisasi dokumen, dan visa kerja negara tujuan.",
  },
  {
    step: 6,
    title: "Keberangkatan & Purna",
    desc: "Tiket BI via BNI, asuransi JPKK BPJS, OPP SISKOP2MI, pendampingan bandara — plus perlindungan purna sesuai UU 18/2017.",
  },
];
