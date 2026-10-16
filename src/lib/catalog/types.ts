// ============================================================
// PUSATPERIZINAN.COM — Tipe Katalog Layanan (Programmatic SEO)
// 1.000+ halaman unik: layanan × wilayah × negara × sektor
// ============================================================

export type CatalogCategory = "perizinan" | "pajak" | "pmi" | "virtual-office" | "sertifikasi";

export type CatalogKind =
  | "base" // halaman induk layanan
  | "region" // layanan × provinsi
  | "city" // layanan × kota besar
  | "country" // kerja di negara PMI
  | "sector" // negara × sektor pekerjaan
  | "vo" // halaman kombinasi virtual office (paket/lokasi/keperluan/panduan)
  | "hub"; // halaman indeks kategori/wilayah

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export interface ServicePage {
  slug: string;
  kind: CatalogKind;
  category: CatalogCategory;
  /** slug induk (untuk halaman kombinasi) */
  parent?: string;
  /** judul SEO untuk <title> (tanpa brand, brand dari template layout) */
  title: string;
  h1: string;
  /** deskripsi ringkas 1 kalimat (kartu katalog & meta og) */
  desc: string;
  metaDesc: string;
  /** paragraf pembuka (di bawah H1) */
  intro: string;
  /** paragraf-paragraf isi panjang */
  longDesc: string[];
  price: string;
  priceNumeric: number;
  duration: string;
  audience: string[];
  features: string[];
  requirements: string[];
  steps: string[];
  faq: ServiceFaq[];
  keywords: string[];
  legalBasis?: string;
  authority?: string;
  /** nama provinsi/kota untuk halaman kombinasi */
  region?: string;
  /** provinsi induk (khusus halaman kota hub) */
  province?: string;
  /** nama negara untuk halaman PMI */
  country?: string;
  related: string[];
  breadcrumbs: BreadcrumbItem[];
}

/** Data detail kaya per layanan dasar (sumber konten halaman induk) */
export interface ServiceDetail {
  id: string;
  /** Paragraf panjang pembuka (2-3 kalimat) */
  long: string;
  audience: string[];
  legalBasis: string;
  authority: string;
  requirements: string[];
  steps: string[];
  faq: ServiceFaq[];
  keywords: string[];
}

/** Detail negara tujuan PMI untuk halaman /layanan/kerja-di-* */
export interface PmiCountryDetail {
  code: string;
  name: string;
  flag: string;
  region: string;
  scheme: string;
  salary: string;
  salaryNote: string;
  sectors: { slug: string; label: string; salary: string; demand: string }[];
  visaTypes: string[];
  documents: string[];
  process: string[];
  timeline: string;
  faq: ServiceFaq[];
  keywords: string[];
}

export const CATEGORY_META: Record<
  CatalogCategory,
  { label: string; slug: string; desc: string }
> = {
  perizinan: {
    label: "Perizinan Usaha & Legalitas",
    slug: "perizinan",
    desc: "NIB, OSS-RBA, pendirian badan usaha, izin sektoral, sertifikasi produk, hingga izin khusus — semua legalitas usaha dari hulu ke hilir.",
  },
  pajak: {
    label: "Perpajakan Pribadi & Perusahaan",
    slug: "pajak",
    desc: "NPWP, SPT Tahunan, SPT Masa, PKP, UMKM PPh final, tax planning, hingga sengketa pajak — patuh pajak tanpa drama, sesuai Coretax DJP.",
  },
  pmi: {
    label: "Kerja Luar Negeri (PMI/TKI)",
    slug: "kerja-luar-negeri",
    desc: "Penempatan Pekerja Migran Indonesia ke 17+ negara tujuan resmi — dokumen, pelatihan, visa, keberangkatan, sampai perlindungan purna.",
  },
  "virtual-office": {
    label: "Virtual Office & Alamat Bisnis",
    slug: "virtual-office",
    desc: "Alamat bisnis premium di gedung korporat Jakarta SCBD & 30 kota, dukungan PKP/NPWP/BPOM, serviced office, meeting room, hingga PPA untuk PT PMA.",
  },
  sertifikasi: {
    label: "Sertifikasi & ISO",
    slug: "sertifikasi",
    desc: "Katalog sertifikasi terlengkap: PPIU & PIHK haji-umrah (PMHU 2/2026), ISO 9001:2026 edisi terbaru, ISO 27001, 22000, 37001, halal jasa PP 42/2024, SMK3, HACCP, SNI, SBU LPJK, hingga SLO — untuk PT umum maupun travel ibadah.",
  },
};
