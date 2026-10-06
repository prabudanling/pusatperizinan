// ============================================================
// PUSATPERIZINAN.COM — Generator Katalog 1.000+ Halaman SEO
// Kombinasi deterministik: layanan × provinsi × kota × negara × sektor
// Murni TS (tanpa DB/AI) → aman untuk static export
// ============================================================

import { SERVICES } from "@/lib/landing-data";
import { TAX_ALL } from "@/lib/tax-services";
import { PMI_B2B_SERVICES, PMI_B2C_SERVICES, PMI_COUNTRIES } from "@/lib/pmi-services";
import { PROVINCES } from "@/lib/coverage-data";
import { PERMIT_GUIDES } from "@/lib/seo-content";
import type { ServicePage, ServiceFaq, CatalogCategory } from "./types";
import { CATEGORY_META } from "./types";
import { LICENSE_DETAIL_MAP, GUIDE_MAP } from "./detail-licenses";
import { TAX_DETAIL_MAP, PMI_DETAIL_MAP, PMI_COUNTRY_MAP } from "./detail-tax-pmi";
import { VO_PAGES } from "./virtual-office";
import { CERT_PAGES } from "./certifications";
import { CERT_REGION_PAGES, CERT_PROV_HUBS } from "./sertifikasi-provinsi";
import { slugify, parsePrice } from "./utils";

// ------------------------------------------------------------
// KONSTANTAS KOMBINASI
// ------------------------------------------------------------

/** Layanan perizinan yang dibuatkan halaman untuk SEMUA 38 provinsi */
const REGION_FULL_SERVICES = [
  "nib", "pt", "cv", "pt-perorangan", "halal", "bpom", "merek", "pbg",
  "lingkungan", "iso", "api-impex", "koperasi-yayasan", "sni", "ppi-umroh",
];

/** Provinsi utama untuk layanan yang lebih spesifik (8 provinsi) */
const REGION_LITE_PROVINCES = [
  "DKI Jakarta", "Jawa Barat", "Jawa Tengah", "Jawa Timur",
  "Bali", "Sumatera Utara", "Sulawesi Selatan", "Kalimantan Timur",
];

/** Layanan perizinan yang dibuatkan halaman × kota besar */
const CITY_SERVICES = ["nib", "pt", "cv", "halal", "bpom", "merek"];

/** 10 kota besar */
export const BIG_CITIES = [
  "Jakarta", "Surabaya", "Bandung", "Medan", "Semarang",
  "Makassar", "Denpasar", "Tangerang", "Bekasi", "Batam",
];

/** Layanan pajak yang dibuatkan halaman × 15 kota */
const TAX_CITY_SERVICES = [
  "tax-npwp-op", "tax-spt-op", "tax-umkm",
  "tax-npwp-badan", "tax-pkp-badan", "tax-spt-masa-badan", "tax-spt-tahunan-badan",
];

/** Layanan pajak × SEMUA 38 provinsi (paling dicari secara lokal) */
const REGION_TAX_SERVICES = [
  "tax-npwp-op", "tax-spt-op", "tax-umkm", "tax-npwp-badan",
  "tax-pkp-badan", "tax-spt-masa-badan", "tax-spt-tahunan-badan", "tax-planning",
];

/** Layanan PMI B2C × 8 provinsi utama pengirim pekerja migran */
const REGION_PMI_SERVICES = [
  "dokumen-pmi", "jepang-ssw", "korea-eps", "taiwan-hk-sg", "timur-tengah-pmi",
];

/** Provinsi utama pengirim PMI (porsi terbesar penempatan nasional) */
const PMI_SOURCE_PROVINCES = [
  "Jawa Barat", "Jawa Tengah", "Jawa Timur", "DKI Jakarta",
  "Sumatera Utara", "Nusa Tenggara Barat", "Sulawesi Selatan", "Kalimantan Timur",
];

/** 15 kota untuk pajak */
export const TAX_CITIES = [
  "Jakarta", "Surabaya", "Bandung", "Medan", "Semarang", "Makassar",
  "Palembang", "Tangerang", "Tangerang Selatan", "Denpasar",
  "Yogyakarta", "Bogor", "Depok", "Batam", "Malang",
];

// ------------------------------------------------------------
// HELPER
// ------------------------------------------------------------

export { slugify, parsePrice };

/** Potong metaDesc agar tidak melebihi batas mesin pencari dengan rapi */
function capMeta(text: string, max = 300): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastStop = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("— "), cut.lastIndexOf(", "));
  return (lastStop > max * 0.6 ? cut.slice(0, lastStop) : cut.replace(/[,;\s]+$/, "")) + ".";
}

const WA_LINK = "https://wa.me/6281269999910";

function makeCtaFaq(serviceName: string, regionName: string, ctaText: string): ServiceFaq {
  return {
    q: `Bagaimana cara mulai pengurusan ${serviceName} di ${regionName}?`,
    a: `Sangat mudah — klik tombol "${ctaText}" di halaman ini atau hubungi WhatsApp kami. Konsultasi awal gratis: ceritakan kondisi usaha Anda, dan tim kami susun roadmap lengkap (dokumen, biaya, timeline) dalam hitungan jam. 95% proses berjalan online tanpa Anda perlu ke kantor kami di SCBD Jakarta.`,
  };
}

// ------------------------------------------------------------
// BUILD DATA MASTER: layanan dasar dari 3 file + detail kaya
// ------------------------------------------------------------

interface BaseServiceRecord {
  id: string;
  category: CatalogCategory;
  title: string;
  desc: string;
  price: string;
  duration: string;
  features: string[];
  long: string;
  audience: string[];
  legalBasis: string;
  authority: string;
  requirements: string[];
  steps: string[];
  faq: ServiceFaq[];
  keywords: string[];
}

function buildBaseServices(): Map<string, BaseServiceRecord> {
  const map = new Map<string, BaseServiceRecord>();

  // A. Perizinan (SERVICES)
  for (const s of SERVICES) {
    const guideId = GUIDE_MAP[s.id];
    const guide = guideId ? PERMIT_GUIDES.find((g) => g.id === guideId) : undefined;
    const detail = LICENSE_DETAIL_MAP.get(s.id);

    const long =
      detail?.long ??
      (guide
        ? guide.long
        : `${s.desc} Layanan ini ditangani tim ahli ${CATEGORY_META.perizinan.label.toLowerCase()} PusatPerizinan.com yang sudah menangani ribuan kasus serupa di 38 provinsi — proses resmi, transparan, dan bergaransi.`);

    const requirements =
      detail?.requirements ?? guide?.requirements ?? [
        "KTP & NPWP pemilik/pengurus",
        "Dokumen badan usaha (bila sudah ada)",
        "Alamat usaha & kontak aktif",
        "Dokumen khusus sesuai jenis layanan (kami pandu)",
      ];

    const steps =
      detail?.steps ?? guide?.steps ?? [
        "Konsultasi gratis: petakan kebutuhan & dokumen Anda",
        "Penawaran transparan: biaya & timeline jelas sejak awal",
        "Kami proses: koordinasi instansi & notaris penuh",
        "Monitoring progres real-time via WhatsApp",
        "Dokumen terbit + panduan kewajiban pasca-terbit",
      ];

    const faq =
      detail?.faq ?? guide?.faq ?? [
        { q: `Berapa biaya jasa ${s.title}?`, a: `Harga jasa kami mulai ${s.price} dengan durasi proses ${s.duration}. Biaya resmi pemerintah/notaris terpisah dan transparan — semua tercantum di penawaran sebelum mulai. Tidak ada biaya tersembunyi, dan garansi uang kembali 100% bila gagal karena kesalahan proses kami.` },
        { q: `Berapa lama proses ${s.title}?`, a: `Estimasi proses ${s.duration} sejak dokumen lengkap. Timeline bisa lebih cepat bila dokumen Anda sudah rapi sejak awal — kami bantu audit dokumen di konsultasi gratis pertama.` },
        { q: `Apakah harus datang ke kantor?`, a: `Tidak perlu. 95% proses daring + kurir dokumen. Layanan kami menjangkau seluruh 38 provinsi dan 514 kabupaten/kota. Untuk kebutuhan audit fisik, tim kami yang datang ke lokasi Anda.` },
      ];

    map.set(s.id, {
      id: s.id,
      category: "perizinan",
      title: s.title,
      desc: s.desc,
      price: s.price,
      duration: s.duration,
      features: s.features,
      long,
      audience: detail?.audience ?? ["Individu", "UMKM", "Perusahaan"],
      legalBasis: detail?.legalBasis ?? guide?.legalBasis ?? "UU Cipta Kerja, PP 5/2021, PP 22/2021",
      authority: detail?.authority ?? guide?.authority ?? "OSS-RBA + Instansi terkait",
      requirements,
      steps,
      faq,
      keywords: detail?.keywords ?? [s.title.toLowerCase(), `jasa ${s.title.toLowerCase()}`, `biaya ${s.title.toLowerCase()}`],
    });
  }

  // B. Pajak (TAX_ALL)
  for (const s of TAX_ALL) {
    const d = TAX_DETAIL_MAP.get(s.id);
    map.set(s.id, {
      id: s.id,
      category: "pajak",
      title: s.title,
      desc: s.desc,
      price: s.price,
      duration: s.duration,
      features: s.features,
      long: d?.long ?? s.desc,
      audience: d?.audience ?? ["Individu", "UMKM", "Perusahaan"],
      legalBasis: d?.legalBasis ?? "UU KUP, UU HPP, PER DJP terkini",
      authority: d?.authority ?? "DJP (Direktorat Jenderal Pajak)",
      requirements: d?.requirements ?? [
        "NPWP aktif & akses Coretax DJP",
        "Dokumen transaksi/ penghasilan yang relevan",
        "Data penerima/ karyawan (bila pemotong pajak)",
      ],
      steps: d?.steps ?? [
        "Konsultasi gratis: bedah kondisi pajak Anda",
        "Penyusunan strategi & dokumen yang tepat",
        "Eksekusi via Coretax/e-Filing dengan monitoring",
        "Laporan & arsip digital yang rapi",
        "Panduan kewajiban berikutnya",
      ],
      faq: d?.faq ?? [
        { q: `Berapa biaya jasa ${s.title}?`, a: `Mulai ${s.price} dengan durasi ${s.duration}. Konsultasi awal gratis — kami beri penawaran presisi setelah memahami kondisi Anda. Semua transparan, tanpa biaya tersembunyi.` },
        { q: `Apakah bisa sekalian diperiksa/diperbaiki pajak tahun lalu?`, a: `Bisa. Banyak klien kami mulai dari situasi "pajak berantakan" dan berakhir rapi: SPT tertunda dilaporkan, denda ditangani, dan sistem ke depan dibangun benar. Bawa kondisi Anda — kami bedah dulu sebelum menawarkan.` },
        { q: `Apakah prosesnya online?`, a: `Ya — semua administrasi pajak kini elektronik (Coretax DJP). Kami kerja penuh daring + rapat online bila perlu. Dokumen dikirim digital, laporan bisa Anda pantau dari dashboard.` },
      ],
      keywords: d?.keywords ?? [s.title.toLowerCase(), "jasa pajak", s.id.replace("tax-", "").replace(/-/g, " ")],
    });
  }

  // C. PMI (B2B + B2C)
  for (const s of [...PMI_B2B_SERVICES, ...PMI_B2C_SERVICES]) {
    const d = PMI_DETAIL_MAP.get(s.id);
    map.set(s.id, {
      id: s.id,
      category: "pmi",
      title: s.title,
      desc: s.desc,
      price: s.price,
      duration: s.duration,
      features: s.features,
      long: d?.long ?? s.desc,
      audience: d?.audience ?? [s.audience === "perusahaan" ? "Perusahaan" : "Individu"],
      legalBasis: d?.legalBasis ?? "UU 18/2017 (PSMI), PP 22/2022",
      authority: d?.authority ?? "KemenP2MI + BP2MI + SISKOP2MI",
      requirements: d?.requirements ?? [
        "KTP & Kartu Keluarga (individu) / akta badan usaha (perusahaan)",
        "Dokumen dasar sesuai skema (kami pandu)",
      ],
      steps: d?.steps ?? [
        "Konsultasi gratis: profil & tujuan Anda",
        "Pemetaan skema & negara yang paling cocok",
        "Persiapan dokumen & pelatihan (bila perlu)",
        "Eksekusi: kontrak, visa & keberangkatan",
        "Pendampingan purna sesuai UU 18/2017",
      ],
      faq: d?.faq ?? [
        { q: `Berapa biaya ${s.title}?`, a: `Mulai ${s.price} dengan durasi ${s.duration}. Semua biaya tercantum di perjanjian resmi — tidak ada biaya bawah tangan. Untuk penempatan PMI, kami hanya kerja dengan job order resmi SISKOP2MI & majikan terverifikasi.` },
        { q: `Apakah ini legal & aman?`, a: `Mutlak legal — sesuai UU 18/2017 dan jalur resmi KemenP2MI/BP2MI. Kami bukan pihak yang menjanjikan kerja ilegal atau "merpati putih". Perlindungan Anda sejak dokumen sampai purna adalah bagian dari layanan kami.` },
        { q: `Bagaimana memulai?`, a: `Hubungi WhatsApp kami untuk konsultasi gratis. Ceritakan profil Anda (atau kebutuhan perusahaan), dan tim kami susun roadmap lengkap dengan biaya & timeline yang transparan.` },
      ],
      keywords: d?.keywords ?? [s.title.toLowerCase(), "jasa pmi", "penempatan tki"],
    });
  }

  return map;
}

export const BASE_SERVICES = buildBaseServices();

// ------------------------------------------------------------
// BUILDER: Halaman Induk Layanan
// ------------------------------------------------------------

function buildBasePage(id: string): ServicePage | null {
  const b = BASE_SERVICES.get(id);
  if (!b) return null;
  const catMeta = CATEGORY_META[b.category];
  return {
    slug: id,
    kind: "base",
    category: b.category,
    title: `Jasa ${b.title} — Resmi, Cepat & Bergaransi`,
    h1: b.title,
    desc: b.desc,
    metaDesc: capMeta(`Jasa pengurusan ${b.title} resmi & transparan. ${b.desc} Mulai ${b.price}, proses ${b.duration}. Konsultasi gratis via WhatsApp — menjangkau 38 provinsi.`),
    intro: b.long,
    longDesc: [
      b.desc,
      `Tim PusatPerizinan.com sudah menangani 3.899+ pengurusan serupa untuk 1.247+ klien di seluruh 38 provinsi dengan rating 4,9/5. Semua proses menggunakan jalur resmi — ${b.authority} — dan didokumentasikan transparan sehingga Anda bisa memantau progres setiap tahap.`,
      `Biaya jasa kami mulai ${b.price} dengan estimasi waktu ${b.duration}. Konsultasi awal gratis: kami bedah kondisi Anda, susun roadmap, dan baru bergerak setelah Anda setuju. Bergaransi uang kembali 100% bila gagal terbit karena kesalahan proses kami.`,
    ],
    price: b.price,
    priceNumeric: parsePrice(b.price),
    duration: b.duration,
    audience: b.audience,
    features: b.features,
    requirements: b.requirements,
    steps: b.steps,
    faq: b.faq,
    keywords: [
      ...b.keywords,
      `jasa ${b.title.toLowerCase()}`,
      `biaya ${b.title.toLowerCase()} 2025`,
      `${b.title.toLowerCase()} terpercaya`,
      `konsultan ${b.title.toLowerCase()}`,
    ],
    legalBasis: b.legalBasis,
    authority: b.authority,
    related: [],
    breadcrumbs: [
      { name: "Beranda", href: "/" },
      { name: "Layanan", href: "/layanan" },
      { name: catMeta.label, href: `/layanan/kategori/${catMeta.slug}` },
      { name: b.title, href: `/layanan/${id}` },
    ],
  };
}

// ------------------------------------------------------------
// BUILDER: Halaman Layanan × Provinsi
// ------------------------------------------------------------

function buildRegionPage(serviceId: string, provinceIdx: number): ServicePage | null {
  const b = BASE_SERVICES.get(serviceId);
  if (!b) return null;
  const prov = PROVINCES[provinceIdx];
  if (!prov) return null;
  const provSlug = slugify(prov.name);
  const slug = `${serviceId}-${provSlug}`;
  const catMeta = CATEGORY_META[b.category];
  const cities = prov.majors.slice(0, 4).join(", ");
  const regionTitle = `di ${prov.name}`;

  const intro = `${b.title} untuk usaha Anda ${regionTitle} diurus penuh oleh tim PusatPerizinan.com — 100% sesuai jalur resmi ${b.authority}. ${b.desc} Kami menjangkau seluruh wilayah ${prov.name}, termasuk ${cities}, dengan proses dominan daring: dokumen dikirim digital, kurir fisik mengurus dokumen yang wajib tatap muka, dan Anda memantau progres dari WhatsApp.`;

  const officialFeeNote =
    b.category === "pajak"
      ? "biaya resmi DJP (PNBP/norma)"
      : b.category === "pmi"
        ? "biaya resmi KemenP2MI/BP2MI"
        : "biaya resmi pemerintah termasuk PNBP daerah";

  const regionFaq: ServiceFaq[] = [
    {
      q: `Berapa biaya ${b.title} di ${prov.name}?`,
      a: `Jasa kami mulai ${b.price} — sama transparannya untuk semua wilayah ${prov.name}. ${officialFeeNote.charAt(0).toUpperCase() + officialFeeNote.slice(1)} terpisah dan jelas sejak penawaran. ${prov.note}`,
    },
    {
      q: `Apakah harus ke ${cities.split(",")[0]} atau ke kantor ${b.authority}?`,
      a: `Tidak perlu. Untuk ${b.title}, proses kini dominan daring (${b.authority} menyediakan sistem elektronik). Dokumen yang wajib fisik kami urus via kurir tertutup. Anda tinggal di mana pun di ${prov.name} — ${prov.majors.join(", ")} — dan tetap bisa diurus penuh.`,
    },
    {
      q: `Apa kekhasan pengurusan ${b.title} di ${prov.name}?`,
      a: `${prov.note} Setiap DPMPTSP/instansi daerah punya kecepatan & kebiasaan berbeda — tim kami sudah terbiasa dengan alur ${prov.name} sehingga antisipasi revisi dokumen lebih baik daripada mengurus sendiri tanpa pengalaman lokal.`,
    },
  ];

  return {
    slug,
    kind: "region",
    category: b.category,
    parent: serviceId,
    title: `Jasa ${b.title} ${regionTitle} — Biaya & Proses 2025`,
    h1: `${b.title} ${regionTitle}`,
    desc: b.desc,
    metaDesc: capMeta(`Pengurusan ${b.title} ${regionTitle}: resmi via ${b.authority}, mulai ${b.price}, proses ${b.duration}. Melayani ${cities} & seluruh ${prov.name}. Konsultasi gratis — proses dominan online.`),
    intro,
    longDesc: [
      `${b.long}`,
      `Permintaan ${b.title.toLowerCase()} di ${prov.name} terus naik seiring pertumbuhan UMKM & investasi. ${prov.note} Kami menangani alurnya rutin: dari pemilihan ${b.category === "perizinan" ? "KBLI" : "strategi"} yang tepat, penyusunan dokumen, koordinasi dengan ${b.authority}, sampai terbit & panduan kewajiban pasca-terbit.`,
      `Kota-kota yang paling sering kami tangani di ${prov.name}: ${prov.majors.join(", ")}. ${b.category === "perizinan" ? "Untuk wilayah lain di " + prov.name + " maupun kabupaten sekitarnya, proses tetap sama karena sistem perizinan terintegrasi OSS-RBA secara nasional." : b.category === "pajak" ? "Untuk wilayah lain di " + prov.name + ", proses sama karena layanan pajak terintegrasi Coretax DJP secara nasional — KPP/KP2KP setempat cukup diakses online." : "Untuk wilayah lain di " + prov.name + ", proses sama karena penempatan PMI terintegrasi SISKOP2MI secara nasional — LPK & medical check-up di dekat domisili Anda."}`,
    ],
    price: b.price,
    priceNumeric: parsePrice(b.price),
    duration: b.duration,
    audience: b.audience,
    features: b.features,
    requirements: [...b.requirements, `Bukti domisili usaha di ${prov.name} (bila diminta instansi)`],
    steps: b.steps.map((s, i) => (i === 1 ? `${s} (dokumen sesuai ketentuan ${prov.name})` : s)),
    faq: [...regionFaq, ...b.faq.slice(0, 2)],
    keywords: [
      `${b.title.toLowerCase()} ${prov.name.toLowerCase()}`,
      `biaya ${b.title.toLowerCase()} ${prov.name.toLowerCase()}`,
      `jasa ${b.title.toLowerCase()} ${prov.majors[0]?.toLowerCase() ?? ""}`,
      `pengurusan ${b.title.toLowerCase()} ${prov.name.toLowerCase()} 2025`,
      ...b.keywords.slice(0, 2).map((k) => `${k} ${prov.name.toLowerCase()}`),
    ],
    legalBasis: b.legalBasis,
    authority: b.authority,
    region: prov.name,
    related: [],
    breadcrumbs: [
      { name: "Beranda", href: "/" },
      { name: "Layanan", href: "/layanan" },
      { name: b.title, href: `/layanan/${serviceId}` },
      { name: prov.name, href: `/layanan/${slug}` },
    ],
  };
}

// ------------------------------------------------------------
// BUILDER: Halaman Layanan × Kota
// ------------------------------------------------------------

function buildCityPage(serviceId: string, city: string, category: CatalogCategory): ServicePage | null {
  const b = BASE_SERVICES.get(serviceId);
  if (!b) return null;
  const citySlug = slugify(city);
  const slug = `${serviceId}-${citySlug}`;
  const ctaText = "Konsultasi Gratis";

  const intro = `${b.title} di ${city} diurus penuh oleh PusatPerizinan.com via jalur resmi ${b.authority}. ${b.desc} Proses dominan daring — Anda tidak perlu bolak-balik kantor instansi, dan progres bisa dipantau real-time dari WhatsApp.`;

  return {
    slug,
    kind: "city",
    category: b.category,
    parent: serviceId,
    title: `Jasa ${b.title} di ${city} — Cepat & Resmi`,
    h1: `${b.title} di ${city}`,
    desc: b.desc,
    metaDesc: capMeta(`Pengurusan ${b.title} di ${city} oleh tim ahli. Mulai ${b.price}, proses ${b.duration}, jalur resmi ${b.authority}. Konsultasi gratis — 95% proses online, melayani seluruh ${city}.`),
    intro,
    longDesc: [
      b.long,
      `${city} adalah salah satu pasar paling aktif untuk ${b.category === "perizinan" ? "perizinan usaha" : b.category === "pajak" ? "layanan pajak" : "penempatan PMI"} di Indonesia. Warga & pelaku usaha ${city} memakai layanan kami karena: (1) konsultasi gratis tanpa komitmen, (2) biaya transparan sejak awal, (3) garansi uang kembali 100% bila gagal karena kesalahan kami, dan (4) support WhatsApp cepat bahkan setelah dokumen terbit.`,
    ],
    price: b.price,
    priceNumeric: parsePrice(b.price),
    duration: b.duration,
    audience: b.audience,
    features: b.features,
    requirements: b.requirements,
    steps: b.steps,
    faq: [
      ...b.faq.slice(0, 2),
      makeCtaFaq(b.title, city, ctaText),
    ],
    keywords: [
      `${b.title.toLowerCase()} di ${city.toLowerCase()}`,
      `biaya ${b.title.toLowerCase()} ${city.toLowerCase()}`,
      `jasa ${b.title.toLowerCase()} ${city.toLowerCase()} 2025`,
      ...b.keywords.slice(0, 2),
    ],
    legalBasis: b.legalBasis,
    authority: b.authority,
    region: city,
    related: [],
    breadcrumbs: [
      { name: "Beranda", href: "/" },
      { name: "Layanan", href: "/layanan" },
      { name: b.title, href: `/layanan/${serviceId}` },
      { name: city, href: `/layanan/${slug}` },
    ],
  };
}

// ------------------------------------------------------------
// BUILDER: Negara Tujuan PMI
// ------------------------------------------------------------

function buildCountryPage(code: string): ServicePage | null {
  const c = PMI_COUNTRIES.find((x) => x.code === code);
  const d = PMI_COUNTRY_MAP.get(code);
  if (!c || !d) return null;
  const slug = `kerja-di-${code}`;

  const intro = `Kerja resmi di ${d.name} ${d.flag} untuk Pekerja Migran Indonesia: skema resmi ${d.scheme}, kisaran gaji ${d.salary}, sektor dengan permintaan tertinggi (${d.sectors.map((s) => s.label.split("(")[0].trim()).join(", ")}), sampai seluruh dokumen & proses keberangkatan sesuai UU 18/2017. Semua diurus jalur resmi — tanpa agen liar, tanpa biaya bawah tangan.`;

  return {
    slug,
    kind: "country",
    category: "pmi",
    title: `Kerja di ${d.name} untuk PMI — Gaji, Syarat & Cara Daftar`,
    h1: `Kerja di ${d.name} ${d.flag} — Panduan Lengkap PMI 2025`,
    desc: `Skema resmi ${d.scheme} · gaji ${d.salary} · sektor: ${d.sectors.map((s) => s.label.split("(")[0].trim()).join(", ")}`,
    metaDesc: capMeta(`Panduan kerja di ${d.name} untuk PMI: skema resmi ${d.scheme}, gaji ${d.salary}, syarat & dokumen lengkap, sektor paling dibutuhkan. Proses resmi UU 18/2017 — konsultasi gratis.`),
    intro,
    longDesc: [
      d.salaryNote,
      `Skema penempatan yang dipakai: ${d.scheme}. Jenis visa yang umum: ${d.visaTypes.join("; ")}. Estimasi total proses dari pendaftaran sampai berangkat: ${d.timeline}.`,
      `Kami hanya bekerja dengan job order resmi terdaftar di SISKOP2MI dan majikan/agensi yang terverifikasi di ${d.name}. Setiap kontrak direview bersama Anda sebelum tanda tangan — gaji, jam kerja, fasilitas, dan hak Anda semuanya tercantum jelas. Perlindungan purna (termasuk pendampingan bermasalah via BP2MI/KBRI) bagian dari layanan.`,
    ],
    price: d.sectors[0]?.salary ?? d.salary,
    priceNumeric: 0,
    duration: d.timeline,
    audience: ["Individu (PMI/TKI)"],
    features: [
      `Skema resmi: ${d.scheme}`,
      `Gaji kisaran: ${d.salary}`,
      `Sektor tersedia: ${d.sectors.map((s) => s.label.split("(")[0].trim()).join(", ")}`,
      "Kontrak direview bersama sebelum tanda tangan",
      "Pendampingan dokumen, visa & keberangkatan penuh",
    ],
    requirements: d.documents,
    steps: d.process,
    faq: d.faq,
    keywords: d.keywords,
    authority: `KemenP2MI + ${d.scheme}`,
    country: d.name,
    related: [],
    breadcrumbs: [
      { name: "Beranda", href: "/" },
      { name: "Layanan", href: "/layanan" },
      { name: "Kerja Luar Negeri", href: "/layanan/kategori/kerja-luar-negeri" },
      { name: `Kerja di ${d.name}`, href: `/layanan/${slug}` },
    ],
  };
}

// ------------------------------------------------------------
// BUILDER: Negara × Sektor PMI
// ------------------------------------------------------------

function buildSectorPage(code: string, sectorIdx: number): ServicePage | null {
  const c = PMI_COUNTRIES.find((x) => x.code === code);
  const d = PMI_COUNTRY_MAP.get(code);
  if (!c || !d) return null;
  const sector = d.sectors[sectorIdx];
  if (!sector) return null;
  const slug = `kerja-di-${code}-${sector.slug}`;

  const intro = `Kerja sebagai ${sector.label} di ${d.name} ${d.flag}: gaji kisaran ${sector.salary}, permintaan pasar ${sector.demand}, skema resmi ${d.scheme}, dan seluruh dokumen diurus sesuai UU 18/2017. Panduan lengkap persyaratan, proses, dan strategi agar diterima — dari tim yang rutin menempatkan PMI ke ${d.name}.`;

  return {
    slug,
    kind: "sector",
    category: "pmi",
    parent: `kerja-di-${code}`,
    title: `Kerja ${sector.label} di ${d.name} — Gaji & Syarat Terbaru`,
    h1: `Kerja ${sector.label} di ${d.name} ${d.flag}`,
    desc: `${sector.label} · gaji ${sector.salary} · skema resmi ${d.scheme}`,
    metaDesc: capMeta(`Lowongan resmi ${sector.label} di ${d.name}: gaji ${sector.salary}, permintaan ${sector.demand}. Syarat, dokumen & proses lengkap via skema resmi ${d.scheme}. Konsultasi gratis.`),
    intro,
    longDesc: [
      `${sector.label} adalah salah satu sektor paling dibutuhkan di ${d.name}: ${sector.demand}. Kisaran gajinya ${sector.salary} — ${d.salaryNote}`,
      `Proses penempatannya: ${d.process.join(" → ")}. Total estimasi waktu ${d.timeline}. Dokumen yang disiapkan: ${d.documents.join(", ")}.`,
      `Untuk posisi ${sector.label}, kunci diterima adalah: (1) dokumen lengkap & legal sejak awal, (2) persiapan bahasa sesuai negara tujuan, dan (3) kontrak yang direview sebelum tanda tangan. Kami memastikan ketiga-tiganya — plus pendampingan purna bila ada kendala di ${d.name} (via kanal resmi BP2MI/KBRI).`,
    ],
    price: sector.salary,
    priceNumeric: 0,
    duration: d.timeline,
    audience: ["Individu (PMI/TKI)"],
    features: [
      `Posisi: ${sector.label}`,
      `Gaji kisaran: ${sector.salary}`,
      `Permintaan pasar: ${sector.demand}`,
      `Skema resmi: ${d.scheme}`,
      "Kontrak direview bersama & majikan terverifikasi",
    ],
    requirements: d.documents,
    steps: d.process,
    faq: [
      {
        q: `Berapa gaji ${sector.label} di ${d.name}?`,
        a: `Kisaran ${sector.salary}. ${d.salaryNote} Gaji pastinya tergantung employer, pengalaman & keterampilan — semua tercantum di kontrak sebelum Anda tanda tangan.`,
      },
      ...d.faq.slice(0, 2),
    ],
    keywords: [
      `kerja ${sector.label.toLowerCase()} di ${d.name.toLowerCase()}`,
      `gaji ${sector.slug} ${d.name.toLowerCase()}`,
      `lowongan ${sector.label.toLowerCase()} ${d.name.toLowerCase()} 2025`,
      `syarat kerja ${sector.label.toLowerCase()} di ${d.name.toLowerCase()}`,
      ...d.keywords.slice(0, 2),
    ],
    authority: `KemenP2MI + ${d.scheme}`,
    country: d.name,
    related: [],
    breadcrumbs: [
      { name: "Beranda", href: "/" },
      { name: "Layanan", href: "/layanan" },
      { name: `Kerja di ${d.name}`, href: `/layanan/kerja-di-${code}` },
      { name: sector.label, href: `/layanan/${slug}` },
    ],
  };
}

// ------------------------------------------------------------
// BUILDER: Halaman Kota Hub (wilayah/{prov}/{kota}) — indeks semua layanan di satu kota
// ------------------------------------------------------------

function buildCityHubPage(provIdx: number, city: string): ServicePage | null {
  const prov = PROVINCES[provIdx];
  if (!prov || !city) return null;
  const provSlug = slugify(prov.name);
  const citySlug = slugify(city);
  const slug = `wilayah/${provSlug}/${citySlug}`;

  const regionMembers = ALL_SERVICE_PAGES.filter(
    (p) => p.kind === "region" && p.region === prov.name
  );
  const cityMembers = ALL_SERVICE_PAGES.filter(
    (p) => p.kind === "city" && p.region === city
  );
  const totalServices = regionMembers.length + cityMembers.length;
  if (totalServices === 0) return null;

  const sample = cityMembers[0] ?? regionMembers[0];
  const provinceHubSlug = `wilayah/${provSlug}`;

  const intro = `Konsultan perizinan, legalitas & pajak usaha di ${city}, ${prov.name} — ${totalServices}+ layanan dalam satu genggaman: NIB & OSS-RBA, pendirian PT/CV, sertifikasi halal, BPOM, merek, PBG/SLF, sampai urusan pajak Coretax DJP dan penempatan PMI. ${prov.note} Proses dominan daring: dokumen dikirim digital, kurir mengurus bagian yang wajib fisik, dan progres dipantau real-time via WhatsApp.`;

  const longDesc = [
    `${city} adalah salah satu pasar yang paling aktif di ${prov.name} (${prov.island}) untuk legalitas usaha — dari UMKM rumahan yang butuh NIB & sertifikasi halal, sampai korporasi yang mengurus BPOM, PBG/SLF dan izin lingkungan. ${prov.note} Tim PusatPerizinan.com menangani alur lokal ${city} setiap hari sehingga pola revisi dokumen, kebiasaan instansi, dan cara mempercepat proses sudah jadi rutinitas kami.`,
    `Kenapa pelaku usaha ${city} memilih kami: (1) konsultasi awal gratis tanpa komitmen — kondisi Anda dibedah dulu, baru kami susun roadmap; (2) penawaran transparan — biaya jasa, biaya resmi pemerintah, dan timeline tertulis jelas sejak awal; (3) garansi uang kembali 100% bila gagal terbit karena kesalahan proses kami; (4) support WhatsApp tetap aktif setelah dokumen terbit — termasuk panduan kewajiban pasca-terbit. Rating kami 4,9/5 dari 1.247+ klien di 38 provinsi.`,
    `Jangkauan kami bukan hanya ${city} — seluruh kabupaten/kota di ${prov.name} dilayani dengan proses yang sama karena sistem perizinan (OSS-RBA), pajak (Coretax DJP), dan penempatan PMI (SISKOP2MI) semuanya terintegrasi secara nasional. Anda tinggal di mana pun di ${prov.name}, tim kami tetap bisa mengurus penuh — 95% tanpa tatap muka.`,
  ];

  const faq: ServiceFaq[] = [
    {
      q: `Izin apa saja yang bisa diurus di ${city}?`,
      a: `${totalServices}+ layanan: NIB & OSS-RBA, pendirian PT, CV, PT Perorangan, koperasi & yayasan, sertifikasi halal, BPOM, merek, PBG/SLF, ISO, izin lingkungan/UKL-UPL, sampai layanan pajak (NPWP, SPT, PKP, UMKM PPh final) dan penempatan kerja luar negeri. Semua halaman detailnya tersedia di halaman ini lengkap dengan biaya, syarat & timeline.`,
    },
    {
      q: `Berapa biaya jasa konsultan perizinan di ${city}?`,
      a: `Mulai dari ${sample.price} untuk layanan paling ringan, tergantung jenis izin & kompleksitas usaha. Semua biaya resmi pemerintah/notaris terpisah dan transparan di penawaran tertulis — tanpa biaya tersembunyi. Gagal terbit karena kesalahan proses kami? Uang kembali 100%.`,
    },
    {
      q: `Apakah harus datang ke kantor untuk urus izin di ${city}?`,
      a: `Tidak perlu. 95% proses kami daring via OSS-RBA, Coretax DJP & SISKOP2MI. Dokumen yang memang wajib fisik (akta, tanda tangan notaris, plat usaha) diurus lewat kurir tertutup. Kantor kami di SCBD Jakarta hanya kebutuhan khusus — mayoritas klien ${city} selesai tanpa bertemu tatap muka sekali pun.`,
    },
    {
      q: `Berapa lama proses izin usaha di ${city}?`,
      a: `NIB bisa terbit di hari yang sama (1 hari kerja), PT/CV umumnya 3-5 hari kerja setelah dokumen lengkap, sertifikasi halal & BPOM tergantung audit. Timeline pasti ada di halaman detail masing-masing layanan — dan dokumen yang rapi sejak awal (kami audit gratis di konsultasi pertama) adalah kunci proses paling cepat.`,
    },
    {
      q: `Apakah melayani wilayah kabupaten sekitar ${city}?`,
      a: `Ya — seluruh kabupaten/kota di ${prov.name} kami layani dengan proses & biaya yang sama karena sistem perizinan nasional terintegrasi. Bila Anda di kecamatan/kabupaten di sekitar ${city}, cukup hubungi WhatsApp kami: roadmap, dokumen, dan monitoring semuanya sama rapi.`,
    },
  ];

  return {
    slug,
    kind: "hub",
    category: "perizinan",
    region: city,
    province: prov.name,
    title: `Konsultan Perizinan & Legalitas Usaha di ${city} — Semua Izin`,
    h1: `Konsultan Perizinan & Legalitas Usaha di ${city}`,
    desc: `${totalServices}+ layanan perizinan, pajak & PMI untuk ${city}, ${prov.name} — NIB, PT, CV, halal, BPOM, merek, SPT. Mulai ${sample.price}, garansi 100%.`,
    metaDesc: `Jasa konsultan perizinan usaha di ${city}, ${prov.name}: NIB, PT, CV, halal, BPOM, merek & pajak. Mulai ${sample.price}, proses dominan online, garansi uang kembali 100%. Konsultasi gratis via WhatsApp!`,
    intro,
    longDesc,
    price: sample.price,
    priceNumeric: 0,
    duration: "Sesuai layanan",
    audience: ["UMKM", "Perusahaan", "Individu"],
    features: [...regionMembers.slice(0, 5), ...cityMembers.slice(0, 1)].map((m) => m.title),
    requirements: [],
    steps: [],
    faq,
    keywords: [
      `konsultan perizinan ${city.toLowerCase()}`,
      `jasa izin usaha ${city.toLowerCase()}`,
      `biaya pendirian pt ${city.toLowerCase()}`,
      `konsultan bisnis ${city.toLowerCase()}`,
      `legalitas usaha ${city.toLowerCase()} ${prov.name.toLowerCase()}`,
      `jasa pengurusan izin ${city.toLowerCase()} 2025`,
    ],
    related: regionMembers.slice(0, 6).map((m) => m.slug),
    breadcrumbs: [
      { name: "Beranda", href: "/" },
      { name: "Layanan", href: "/layanan" },
      { name: prov.name, href: `/layanan/${provinceHubSlug}` },
      { name: city, href: `/layanan/${slug}` },
    ],
  };
}

// ------------------------------------------------------------
// BUILD ALL — agregasi seluruh katalog
// ------------------------------------------------------------

function buildAllPages(): ServicePage[] {
  const pages: ServicePage[] = [];

  // 1. Halaman induk (61 layanan)
  for (const id of BASE_SERVICES.keys()) {
    const p = buildBasePage(id);
    if (p) pages.push(p);
  }

  // 2. Perizinan × 38 provinsi (layanan populer)
  for (const svc of REGION_FULL_SERVICES) {
    for (let i = 0; i < PROVINCES.length; i++) {
      const p = buildRegionPage(svc, i);
      if (p) pages.push(p);
    }
  }
  // 2b. Perizinan lain × 8 provinsi utama
  const liteServices = [...BASE_SERVICES.values()]
    .filter((b) => b.category === "perizinan" && !REGION_FULL_SERVICES.includes(b.id))
    .map((b) => b.id);
  for (const svc of liteServices) {
    for (const provName of REGION_LITE_PROVINCES) {
      const idx = PROVINCES.findIndex((p) => p.name === provName);
      if (idx >= 0) {
        const p = buildRegionPage(svc, idx);
        if (p) pages.push(p);
      }
    }
  }

  // 2c. Pajak × 38 provinsi (layanan pajak paling dicari)
  for (const svc of REGION_TAX_SERVICES) {
    for (let i = 0; i < PROVINCES.length; i++) {
      const p = buildRegionPage(svc, i);
      if (p) pages.push(p);
    }
  }

  // 2d. PMI B2C × 8 provinsi utama pengirim migran
  for (const svc of REGION_PMI_SERVICES) {
    for (const provName of PMI_SOURCE_PROVINCES) {
      const idx = PROVINCES.findIndex((p) => p.name === provName);
      if (idx >= 0) {
        const p = buildRegionPage(svc, idx);
        if (p) pages.push(p);
      }
    }
  }

  // 3. Perizinan × 10 kota besar
  for (const svc of CITY_SERVICES) {
    for (const city of BIG_CITIES) {
      const p = buildCityPage(svc, city, "perizinan");
      if (p) pages.push(p);
    }
  }

  // 4. Pajak × 15 kota
  for (const svc of TAX_CITY_SERVICES) {
    for (const city of TAX_CITIES) {
      const p = buildCityPage(svc, city, "pajak");
      if (p) pages.push(p);
    }
  }

  // 5. Negara PMI (17) + Negara × Sektor
  for (const c of PMI_COUNTRIES) {
    const cp = buildCountryPage(c.code);
    if (cp) pages.push(cp);
    const d = PMI_COUNTRY_MAP.get(c.code);
    if (d) {
      for (let i = 0; i < d.sectors.length; i++) {
        const sp = buildSectorPage(c.code, i);
        if (sp) pages.push(sp);
      }
    }
  }

  // 6. Virtual Office — paket × lokasi × keperluan × kota × area × provinsi × panduan (1.168)
  pages.push(...VO_PAGES);

  // 7. Sertifikasi — PPIU/PIHK, ISO (termasuk 9001:2026), halal jasa, pangan, lab, badan usaha (43)
  pages.push(...CERT_PAGES);

  // 8. Sertifikasi × 38 provinsi (1.634) + hub "Sertifikasi di {prov}" (38) = 1.672 URL
  pages.push(...CERT_REGION_PAGES);
  pages.push(...CERT_PROV_HUBS);

  return pages;
}

export const ALL_SERVICE_PAGES: ServicePage[] = buildAllPages();

const PAGE_MAP = new Map(ALL_SERVICE_PAGES.map((p) => [p.slug, p]));

export function getServicePage(slug: string): ServicePage | undefined {
  return PAGE_MAP.get(slug);
}

export function getAllSlugs(): string[] {
  return ALL_SERVICE_PAGES.map((p) => p.slug);
}

/** Related: isi internal linking (induk, saudara wilayah, cross-category) */
function buildRelated(): void {
  const byCategory = new Map<CatalogCategory, ServicePage[]>();
  const byRegion = new Map<string, ServicePage[]>();
  for (const p of ALL_SERVICE_PAGES) {
    const cat = byCategory.get(p.category) ?? [];
    cat.push(p);
    byCategory.set(p.category, cat);
    if (p.region) {
      const r = byRegion.get(p.region) ?? [];
      r.push(p);
      byRegion.set(p.region, r);
    }
  }

  // Precompute indeks (O(n)) — ALL_SERVICE_PAGES kini 4.500+ halaman
  const byParent = new Map<string, ServicePage[]>();
  const catBase = new Map<CatalogCategory, ServicePage[]>();
  for (const p of ALL_SERVICE_PAGES) {
    if (p.parent) {
      const arr = byParent.get(p.parent) ?? [];
      arr.push(p);
      byParent.set(p.parent, arr);
    }
    if (p.kind === "base") {
      const arr = catBase.get(p.category) ?? [];
      arr.push(p);
      catBase.set(p.category, arr);
    }
  }

  for (const p of ALL_SERVICE_PAGES) {
    const rel: string[] = [];
    // 1. Halaman induk (untuk kombinasi) / kombinasi populer (untuk induk)
    if (p.parent) rel.push(p.parent);
    const siblings = (byParent.get(p.parent ?? "") ?? []).filter(
      (x) => x.kind === p.kind && x.slug !== p.slug
    );
    for (const s of siblings.slice(0, 2)) rel.push(s.slug);
    // 2. Cross-category dari layanan dasar
    const others = (catBase.get(p.category) ?? []).filter(
      (x) => x.slug !== p.slug && x.slug !== p.parent
    );
    for (const o of others.slice(0, p.kind === "base" ? 3 : 2)) rel.push(o.slug);
    // 4. Halaman induk sertifikasi: tautkan 3 kombinasi provinsi populer (kedalaman crawl)
    if (p.kind === "base" && p.category === "sertifikasi") {
      const kids = byParent.get(p.slug) ?? [];
      const popular = kids.filter((k) =>
        ["DKI Jakarta", "Jawa Barat", "Jawa Timur"].includes(k.region ?? "")
      );
      for (const k of popular.slice(0, 3)) rel.push(k.slug);
    }
    // 5. Sama wilayah (untuk halaman region/city)
    if (p.region) {
      const sameRegion = (byRegion.get(p.region) ?? []).filter((x) => x.slug !== p.slug);
      for (const s of sameRegion.slice(0, 2)) rel.push(s.slug);
    }
    p.related = [...new Set(rel)].slice(0, 6);
  }
}
buildRelated();

/** Halaman kategori (hub) */
export function getCategoryHub(category: CatalogCategory): ServicePage | null {
  const meta = CATEGORY_META[category];
  const members = ALL_SERVICE_PAGES.filter((p) => p.category === category && p.kind === "base");
  if (members.length === 0) return null;
  const sample = members[0];
  return {
    slug: `kategori/${meta.slug}`,
    kind: "hub",
    category,
    title: `${meta.label} — Katalog Layanan PusatPerizinan.com`,
    h1: meta.label,
    desc: meta.desc,
    metaDesc: `${meta.desc} ${members.length}+ layanan resmi dengan harga transparan & garansi. Konsultasi gratis via WhatsApp — menjangkau 38 provinsi & 17 negara tujuan PMI.`,
    intro: meta.desc,
    longDesc: [
      `${meta.desc} Setiap layanan ditangani tim spesialis dengan jalur resmi — ${members.map((m) => m.authority).filter((v, i, a) => a.indexOf(v) === i).slice(0, 4).join(", ")} dan lainnya.`,
      `Semua layanan di kategori ini mendapat: konsultasi gratis, penawaran transparan sebelum mulai, monitoring progres real-time via WhatsApp, dan garansi uang kembali 100% bila gagal terbit karena kesalahan proses kami. Rating klien kami 4,9/5 dari 1.247+ pelanggan di 38 provinsi.`,
    ],
    price: sample.price,
    priceNumeric: 0,
    duration: "Sesuai layanan",
    audience: sample.audience,
    features: members.slice(0, 6).map((m) => m.title),
    requirements: [],
    steps: [],
    faq: [
      {
        q: `Apa saja layanan dalam kategori ${meta.label}?`,
        a: `Tersedia ${members.length} layanan utama: ${members.map((m) => m.title).join(", ")}. Setiap layanan punya halaman detail lengkap dengan biaya, syarat, proses & FAQ — dan bisa dikombinasikan dengan 38 provinsi tujuan Anda.`,
      },
      {
        q: `Bagaimana memilih layanan yang tepat?`,
        a: `Mulai dari konsultasi gratis: ceritakan kondisi Anda (usaha baru? ekspansi? masalah pajak? ingin kerja di luar negeri?), dan tim kami susun roadmap yang paling efisien — bukan menjual semua layanan, tapi yang Anda perlukan.`,
      },
    ],
    keywords: [meta.label.toLowerCase(), "jasa konsultan", "layanan lengkap", ...members.slice(0, 4).map((m) => m.title.toLowerCase())],
    related: members.slice(0, 6).map((m) => m.slug),
    breadcrumbs: [
      { name: "Beranda", href: "/" },
      { name: "Layanan", href: "/layanan" },
      { name: meta.label, href: `/layanan/kategori/${meta.slug}` },
    ],
  };
}

/** Halaman wilayah (hub) — semua layanan untuk satu provinsi */
export function getRegionHub(provinceIdx: number): ServicePage | null {
  const prov = PROVINCES[provinceIdx];
  if (!prov) return null;
  const provSlug = slugify(prov.name);
  const members = ALL_SERVICE_PAGES.filter((p) => p.region === prov.name && p.kind === "region");
  const sample = members[0];
  if (!sample) return null;
  return {
    slug: `wilayah/${provSlug}`,
    kind: "hub",
    category: "perizinan",
    region: prov.name,
    title: `Layanan Perizinan & Konsultan di ${prov.name} — Semua Izin`,
    h1: `Layanan Konsultan di ${prov.name}`,
    desc: prov.note,
    metaDesc: `Semua jasa perizinan, pajak & penempatan PMI untuk ${prov.name}: NIB, PT, halal, SPT, kerja luar negeri. Melayani ${prov.majors.join(", ")}. Konsultasi gratis — garansi 100%.`,
    intro: `${prov.note} PusatPerizinan.com melayani seluruh ${prov.name} — dari ${prov.majors.join(", ")} sampai kabupaten/kota lainnya — dengan ${members.length}+ layanan yang bisa dikombinasikan sesuai kebutuhan usaha Anda.`,
    longDesc: [
      `${prov.note} Tim kami sudah menangani ratusan kasus di ${prov.name}: dari NIB UMKM sampai perizinan korporasi, dari SPT orang pribadi sampai tax planning perusahaan, dari dokumen PMI sampai keberangkatan ke 17 negara tujuan.`,
      `Kota yang paling sering kami layani: ${prov.majors.join(", ")}. Proses dominan daring + kurir dokumen — Anda tidak perlu ke kantor kami di SCBD Jakarta. Konsultasi awal gratis via WhatsApp, dan penawaran transparan sebelum mulai.`,
    ],
    price: sample.price,
    priceNumeric: 0,
    duration: "Sesuai layanan",
    audience: ["UMKM", "Perusahaan", "Individu"],
    features: members.slice(0, 6).map((m) => m.title),
    requirements: [],
    steps: [],
    faq: [
      {
        q: `Apa saja layanan yang tersedia di ${prov.name}?`,
        a: `${members.length}+ layanan, antara lain: ${members.slice(0, 8).map((m) => m.title).join(", ")}, dan lainnya. Semua bisa dilihat di halaman ini dengan link ke detail masing-masing.`,
      },
      {
        q: `Apakah harus datang ke ${prov.majors[0]}?`,
        a: `Tidak perlu — 95% proses kami daring. Dokumen fisik yang wajib (akta, tanda tangan notaris, dsb) diurus via kurir. Layanan menjangkau seluruh kabupaten/kota di ${prov.name}.`,
      },
    ],
    keywords: [
      `konsultan perizinan ${prov.name.toLowerCase()}`,
      `jasa izin usaha ${prov.name.toLowerCase()}`,
      `konsultan pajak ${prov.name.toLowerCase()}`,
      `jasa tki ${prov.name.toLowerCase()}`,
      `konsultan bisnis ${prov.majors[0]?.toLowerCase() ?? ""}`,
    ],
    related: members.slice(0, 6).map((m) => m.slug),
    breadcrumbs: [
      { name: "Beranda", href: "/" },
      { name: "Layanan", href: "/layanan" },
      { name: prov.name, href: `/layanan/wilayah/${provSlug}` },
    ],
  };
}

/** Daftar slug hub (kategori + wilayah + kota) untuk routing & sitemap */
export function getHubSlugs(): string[] {
  const slugs: string[] = [];
  for (const cat of Object.keys(CATEGORY_META) as CatalogCategory[]) {
    if (getCategoryHub(cat)) slugs.push(`kategori/${CATEGORY_META[cat].slug}`);
  }
  for (let i = 0; i < PROVINCES.length; i++) {
    const hub = getRegionHub(i);
    if (hub) slugs.push(`wilayah/${hub.slug.split("/")[1]}`);
  }
  for (const cityHub of getCityHubs()) {
    slugs.push(cityHub.slug);
  }
  return slugs;
}

/** Halaman kota hub (wilayah/{prov}/{kota}) — dibangun lazy setelah ALL_SERVICE_PAGES siap */
export function getCityHubs(): ServicePage[] {
  const pages: ServicePage[] = [];
  for (let i = 0; i < PROVINCES.length; i++) {
    for (const city of PROVINCES[i].majors) {
      const p = buildCityHubPage(i, city);
      if (p) pages.push(p);
    }
  }
  return pages;
}

/** Lookup halaman apapun (termasuk hub kategori, wilayah, dan kota) */
export function getAnyPage(slugOrPath: string): ServicePage | undefined {
  if (PAGE_MAP.has(slugOrPath)) return PAGE_MAP.get(slugOrPath);
  if (slugOrPath.startsWith("kategori/")) {
    for (const cat of Object.keys(CATEGORY_META) as CatalogCategory[]) {
      if (`kategori/${CATEGORY_META[cat].slug}` === slugOrPath) return getCategoryHub(cat) ?? undefined;
    }
  }
  if (slugOrPath.startsWith("wilayah/")) {
    const parts = slugOrPath.replace("wilayah/", "").split("/");
    const provIdx = PROVINCES.findIndex((p) => slugify(p.name) === parts[0]);
    if (provIdx < 0) return undefined;
    if (parts.length === 1) return getRegionHub(provIdx) ?? undefined;
    if (parts.length === 2) return buildCityHubPage(provIdx, PROVINCES[provIdx].majors.find((c) => slugify(c) === parts[1]) ?? "");
  }
  return undefined;
}

export { WA_LINK };
