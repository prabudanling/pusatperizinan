// ============================================================
// PUSATPERIZINAN.COM — Data Master Jasa Perpajakan
// Pajak Pribadi (Orang Pribadi) & Pajak Perusahaan (Badan)
// Riset pasar 2025: Coretax DJP, NPWP 16 digit, UU HPP, PP 55/2022
// ============================================================

import {
  User,
  Building,
  FileText,
  Receipt,
  Percent,
  Gavel,
  Scale,
  RefreshCcw,
  Landmark,
  Settings2,
  ShieldAlert,
  HandCoins,
  type LucideIcon,
} from "lucide-react";

export interface TaxServiceItem {
  id: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  price: string;
  duration: string;
  popular?: boolean;
  features: string[];
}

// ------------------------------------------------------------
// A. PAJAK PRIBADI (ORANG PRIBADI)
// ------------------------------------------------------------
export const TAX_SERVICES_PERSONAL: TaxServiceItem[] = [
  {
    id: "tax-npwp-op",
    title: "NPWP Pribadi 16 Digit & NITKU",
    desc: "Daftar NPWP baru, konversi NPWP 15→16 digit berbasis NIK (PER-6/PJ/2024), NITKU usaha, aktivasi EFIN & akun Coretax DJP.",
    icon: User,
    price: "Rp 150rb",
    duration: "1-3 hari kerja",
    popular: true,
    features: [
      "Konversi NPWP 15→16 digit via NIK",
      "NITKU 22 digit + kode KLU usaha",
      "Aktivasi akun Coretax & kode EFIN",
      "Pendampingan verifikasi KPP/KP2KP",
    ],
  },
  {
    id: "tax-spt-op",
    title: "Lapor SPT Tahunan Orang Pribadi",
    desc: "Penyusunan & pelaporan SPT 1770/1770S/1770SS via e-Filing Coretax — termasuk skema final 0,5% UU HPP untuk omzet ≤ Rp500 juta.",
    icon: FileText,
    price: "Rp 250rb",
    duration: "1-3 hari kerja",
    popular: true,
    features: [
      "Formulir 1770 / 1770S / 1770SS tepat sasaran",
      "Rekap bukti potong PPh 21/23 prepopulated",
      "Skema PPh final 0,5% UU HPP (omzet ≤ 500 jt)",
      "Penanganan kurang bayar & denda keterlambatan",
    ],
  },
  {
    id: "tax-spt-masa-op",
    title: "SPT Masa PPh (21/23/4(2)) & e-Bupot",
    desc: "Hitung, potong, buat bukti potong digital (e-Bupot Coretax format PER-11/PJ/2025) dan lapor SPT Masa bulanan — untuk karyawan, tenaga ahli, dan pemotong pajak.",
    icon: Receipt,
    price: "Rp 400rb/bln",
    duration: "Berkelanjutan",
    features: [
      "Tarif Efektif Rata-rata (TER) PPh 21 terbaru",
      "Bukti potong A1/A2 digital e-Bupot Coretax",
      "PPh 23/4(2) jasa profesional (2%)",
      "Pengingat deadline setor (tgl 15) & lapor (tgl 20)",
    ],
  },
  {
    id: "tax-pkp-op",
    title: "Pengukuhan PKP Orang Pribadi (SPPKP)",
    desc: "Pengukuhan Pengusaha Kena Pajak untuk usaha pribadi — wajib saat omzet > Rp4,8 M/tahun (PMK 164/2023), termasuk penanganan PKP divergence.",
    icon: Percent,
    price: "Rp 1,5jt",
    duration: "2-4 minggu",
    features: [
      "Analisis ambang PKP Rp4,8 M tahun buku",
      "Pengajuan via Coretax + verifikasi KPP",
      "Sertifikat elektronik & akses faktur pajak",
      "Strategi anti-pencabutan (PER-7/PJ/2022)",
    ],
  },
  {
    id: "tax-sengketa",
    title: "Keberatan, Banding & Pengadilan Pajak",
    desc: "Kuasa pajak untuk keberatan ke DJP, banding & Peninjauan Kembali di Pengadilan Pajak, serta pengurangan/pendewasaan pajak (Pasal 17B KUP).",
    icon: Gavel,
    price: "Rp 10jt",
    duration: "6-18 bulan",
    features: [
      "Surat keberatan (maks 3 bulan sejak SPHP)",
      "Uraian banding & negosiasi/PK",
      "Penundaan penagihan sengketa",
      "Representasi penuh di Pengadilan Pajak",
    ],
  },
  {
    id: "tax-aset",
    title: "Konsultasi Aset, Warisan & BPHTB",
    desc: "Perencanaan pajak kepemilikan aset pribadi: properti, saham, bisnis keluarga — efisiensi PPh final pengalihan hak (2,5%) & BPHTB (5%).",
    icon: Scale,
    price: "Rp 500rb/sesi",
    duration: "1-4 minggu",
    features: [
      "Pemetaan aset & pajak pengalihan hak",
      "Struktur perusahaan keluarga & hibah",
      "Uji kelayakan PPh final vs tarif progresif",
      "Kajian regulasi pajak daerah (UU HKPD)",
    ],
  },
];

// ------------------------------------------------------------
// B. PAJAK PERUSAHAAN & UMKM (BADAN)
// ------------------------------------------------------------
export const TAX_SERVICES_CORPORATE: TaxServiceItem[] = [
  {
    id: "tax-npwp-badan",
    title: "NPWP Badan & Setup Coretax",
    desc: "Pendaftaran NPWP badan 16 digit + NITKU per cabang, sinkronisasi NIB-OSS, aktivasi EFIN, sertifikat elektronik & akun Coretax perusahaan.",
    icon: Building,
    price: "Rp 400rb",
    duration: "1-3 hari kerja",
    popular: true,
    features: [
      "NPWP 16 digit + NITKU per tempat usaha",
      "Sinkronisasi data OSS-RBA & Kemenkumham",
      "Aktivasi akun Coretax + EFIN perusahaan",
      "Setup e-Faktur & sertifikat elektronik BSrE",
    ],
  },
  {
    id: "tax-pkp-badan",
    title: "Pengukuhan PKP Badan & e-Faktur",
    desc: "Pengukuhan PKP wajib/sukarela, aktivasi faktur pajak Coretax, dan resolusi PKP divergence agar pengukuhan tidak dicabut.",
    icon: Percent,
    price: "Rp 1,5jt",
    duration: "2-4 minggu",
    features: [
      "Kajian ambang omzet Rp4,8 M (PMK 164/2023)",
      "Pengajuan PKP + SPPKP via Coretax",
      "Integrasi faktur pajak ke invoice internal",
      "Strategi hindari PKP divergence",
    ],
  },
  {
    id: "tax-spt-masa-badan",
    title: "Paket SPT Masa Bulanan (PPN + PPh)",
    desc: "Langganan pelaporan pajak bulanan: SPT Masa PPN (e-Faktur) + seluruh SPT Masa PPh 21/23/4(2)/25, e-Billing MPN, dan rekonsiliasi transaksi.",
    icon: Receipt,
    price: "Rp 750rb/bln",
    duration: "Berkelanjutan",
    popular: true,
    features: [
      "Buat & unggah faktur pajak Coretax",
      "e-Bupot semua pasal + e-Billing MPN",
      "Rekonsiliasi penjualan/pembelian PPN",
      "Dashboard deadline & arsip digital rapi",
    ],
  },
  {
    id: "tax-spt-tahunan-badan",
    title: "SPT Tahunan Badan (1771) & Fiskal",
    desc: "Penyusunan SPT Tahunan PPh Badan dengan rekonsiliasi komersial vs fiskal, Formulir TP, hingga opsi SPT auditan bersama KAP.",
    icon: FileText,
    price: "Rp 2,5jt",
    duration: "3-10 hari kerja",
    features: [
      "Rekonsiliasi fiskal (koreksi positif/negatif)",
      "Hitung cicilan PPh 25 tahun berikutnya",
      "Formulir Transfer Pricing terlampir",
      "Fasilitas pengembalian pendahuluan (prepay)",
    ],
  },
  {
    id: "tax-umkm",
    title: "Pajak UMKM PPh Final 0,5%",
    desc: "Pengurusan PPh final 0,5% dari omzet (PP 55/2022): orang pribadi s/d 2028, badan s/d TA 2025 — plus skema 1770-UU HPP dan transisi tarif umum.",
    icon: HandCoins,
    price: "Rp 500rb/bln",
    duration: "Berkelanjutan",
    popular: true,
    features: [
      "Hitung & setor 0,5% omzet tepat waktu",
      "SPT masa/tahunan UMKM via e-Filing",
      "Monitoring batas omzet Rp4,8 M",
      "Transisi mulus ke tarif umum 22% badan",
    ],
  },
  {
    id: "tax-transfer-pricing",
    title: "Transfer Pricing & Dokumen TP",
    desc: "Penyusunan Formulir TP, Master File & Local File (wajib bila transaksi afiliasi > Rp10 M), benchmarking studi sebanding, dan pembelaan audit TP.",
    icon: Scale,
    price: "Rp 15jt",
    duration: "2-6 minggu",
    features: [
      "Analisis metode arm's length (PMK 22/2018)",
      "Benchmarking studi sebanding",
      "Formulir TP terlampir SPT Tahunan 1771",
      "Mock audit & pembelaan saat pemeriksaan TP",
    ],
  },
  {
    id: "tax-audit",
    title: "Pendampingan Pemeriksaan & SP2DK",
    desc: "Pendampingan penuh saat SP2DK, pemeriksaan lapangan, respons SPHP, hingga penyelesaian STP/SKPKB — meminimalkan koreksi & sanksi bunga 17A.",
    icon: ShieldAlert,
    price: "Rp 7,5jt",
    duration: "1-6 bulan",
    features: [
      "Analisis risiko & simulasi mock audit",
      "Respons SP2DK & hak verifikasi data",
      "Penyusunan PBHP & negosiasi fiskal",
      "Meredam STP & bunga Pasal 17A (2%/bln)",
    ],
  },
  {
    id: "tax-restitusi",
    title: "Restitusi Pajak & Pengembalian",
    desc: "Klaim pengembalian kelebihan bayar PPh/PPN (Nihil Lebih Bayar) termasuk skema pengembalian pendahuluan bagi Wajib Pajak berkinerja kepatuhan tinggi.",
    icon: RefreshCcw,
    price: "Rp 10jt",
    duration: "3-12 bulan",
    features: [
      "Kajian kelayakan klaim & dokumen dukung",
      "Pengajuan prepay (WP unggulan) ≤ 1 bulan",
      "Pendampingan pemeriksaan pendahuluan",
      "Tracking bunga keterlambatan Pasal 17A",
    ],
  },
  {
    id: "tax-daerah",
    title: "Pajak Daerah & Retribusi (HKPD)",
    desc: "Kepatuhan & advisory pajak daerah pasca UU 1/2022: PBB-P2, BPHTB, PBJT, PBJK — termasuk keberatan & litigasi sengketa pajak daerah.",
    icon: Landmark,
    price: "Rp 1,5jt",
    duration: "1-4 minggu",
    features: [
      "Verifikasi ketetapan PBB-P2 & BPHTB",
      "Kalkulasi & pelaporan PBJT (efektif/nyata)",
      "Pengurangan & keberatan pajak daerah",
      "Litigasi sengketa ke Pengadilan Pajak",
    ],
  },
  {
    id: "tax-planning",
    title: "Tax Planning & Advisory Korporasi",
    desc: "Perencanaan pajak korporasi: struktur grup usaha, efisiensi tarif 22%/19% (tercatat), insentif tax allowance/holiday, retainer advisory bulanan.",
    icon: Settings2,
    price: "Rp 7,5jt",
    duration: "2-4 minggu",
    features: [
      "Struktur grup & efisiensi tarif PPh badan",
      "Insentif tax allowance, holiday, super deduction",
      "Review kepatuhan & kajian regulasi baru",
      "Retainer advisory + edukasi tim internal",
    ],
  },
];

export const TAX_ALL: TaxServiceItem[] = [
  ...TAX_SERVICES_PERSONAL,
  ...TAX_SERVICES_CORPORATE,
];
