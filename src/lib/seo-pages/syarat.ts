// ============================================================
// PUSATPERIZINAN.COM — Generator Halaman Syarat (/syarat/{slug})
// 110 halaman: satu per layanan dasar. Konten: prasyarat utama,
// dokumen per profil pemohon, kesalahan umum, langkah lanjut, FAQ.
// Data nyata dari katalog (requirements/steps/audience).
// ============================================================

import { ALL_SERVICE_PAGES } from "@/lib/catalog/generators";
import { CATEGORY_META } from "@/lib/catalog/types";
import type { ServicePage, CatalogCategory } from "@/lib/catalog/types";
import { CURRENT_YEAR } from "@/lib/site";
import type { SeoPage, SeoFaq } from "./types";

function hashStr(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function capMeta(text: string, max = 300): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastStop = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("— "), cut.lastIndexOf(", "));
  return (lastStop > max * 0.6 ? cut.slice(0, lastStop) : cut.replace(/[,;\s]+$/, "")) + ".";
}

function mistakeList(category: CatalogCategory, serviceName: string): string[] {
  const pool: string[] = [
    "Dokumen identitas (KTP/NPWP) yang datanya tidak sinkron dengan dokumen lain — nama, alamat, atau status berbeda membuat instansi minta klarifikasi",
    "Menunda karena merasa belum siap — sebagian besar syarat bisa dipersiapkan paralel; menunda hanya menunda terbit",
    "Mengisi KBLI/aktivitas asal-asalan tanpa memetakan rencana usaha — kemudian harus mengubah ulang dengan biaya baru",
    "Mengandalkan template internet tanpa menyesuaikan kondisi sendiri — setiap kasus punya kekhasan yang perlu disesuaikan",
  ];
  const perCat: Record<CatalogCategory, string[]> = {
    perizinan: [
      "Alamat usaha yang tidak bisa dibuktikan domisilinya (kontrak/sewa/pernyataan bila diminta instansi)",
      "Mengabaikan kewajiban pasca-terbit (LKPM, pelaporan berkala) hingga dokumen bermasalah saat paling dibutuhkan",
    ],
    pajak: [
      "Transaksi yang tidak terdokumentasi sejak awal — penyusunan laporan jadi rekonstruksi mahal",
      "Mencampur rekening pribadi dan usaha — mempersulit pembuktian penghasilan",
    ],
    pmi: [
      "Menerima tawaran kerja dari agen tanpa memverifikasi job order resmi SISKOP2MI",
      "Paspor/SKCK yang akan kedaluwarsa sebelum keberangkatan — perbarui sejak awal",
    ],
    sertifikasi: [
      "Sistem internal belum dijalankan sama sekali sebelum audit — hasilnya temuan & audit ulang berbayar",
      "Dokumen mutu yang disalin mentah dari template vendor lain — auditor mudah mengenali dan mempertanyakan",
    ],
    "virtual-office": [
      "Memakai alamat yang tidak didukung dokumen resmi gedung — NPWP/PKP bisa ditolak saat verifikasi",
      "Tidak memperbarui perjanjian sewa sebelum kedaluwarsa — korespondensi resmi terhenti",
    ],
  };
  const list = [...pool, ...perCat[category]];
  return list.slice(0, 5 + (serviceName.length % 2));
}

function buildSyaratPage(base: ServicePage): SeoPage | null {
  const b = base;
  const catMeta = CATEGORY_META[b.category];
  const v = hashStr(`syarat-${b.slug}`);

  const intros = [
    `Sebelum ${b.h1.toLowerCase()} bisa terbit, ada prasyarat yang harus Anda siapkan — dan kabar baiknya, sebagian besar sederhana. Halaman ini merangkum semua yang dibutuhkan untuk ${b.h1.toLowerCase()}: dokumen dasar, dokumen khusus sesuai profil pemohon (${b.audience.join(", ").toLowerCase()}), dan kesalahan yang paling sering membuat proses tersendat. Baca sampai selesai, kumpulkan dokumennya, lalu proses bisa langsung jalan.`,
    `Syarat ${b.h1.toLowerCase()} ${CURRENT_YEAR}: apa saja yang wajib disiapkan dan apa yang bisa menyelamatkan timeline Anda. Proses ${b.duration} itu dihitung sejak dokumen lengkap — jadi kelengkapan dokumen sejak hari pertama adalah pembeda antara proses mulus dan proses berbulan-bulan. Kami bedah satu per satu di bawah.`,
    `Checklist lengkap syarat ${b.h1.toLowerCase()} — disusun dari pengalaman menangani ribuan kasus serupa via ${b.authority ?? "instansi resmi"}. Tidak semua pemohon butuh dokumen yang sama: profil Anda (${b.audience.join(", ").toLowerCase()}) menentukan dokumen tambahannya. Kami susun berdasarkan pengalaman, bukan teori.`,
  ];

  const docByCategory: Record<CatalogCategory, string> = {
    perizinan: "Badan usaha yang sudah ada cukup melampirkan akta & NIB; individu/UMKM baru cukup identitas dasar — kami pandu sesuai kondisi Anda.",
    pajak: "Akses aktif ke Coretax DJP mempercepat semua proses — bila belum punya, kami bantu aktivasi di awal.",
    pmi: "Untuk perusahaan (job order/employer): akta badan usaha, izin resmi, dokumen majikan terverifikasi. Untuk individu: dokumen perjalanan & kesehatan.",
    sertifikasi: "Untuk sertifikasi sistem: dokumentasi proses internal (SOP, mutu) diminta sebelum audit — kami bantu menyusunnya agar sesuai standar.",
    "virtual-office": "Untuk verifikasi alamat: KTP/identitas pengguna, dokumen usaha bila ada, dan pilihan paket lokasi — selebihnya kami yang urus.",
  };

  const sections: SeoPage["sections"] = [
    {
      heading: `Prasyarat Utama ${b.h1}`,
      paras: [
        `Ini adalah syarat dasar yang berlaku untuk semua pemohon ${b.h1.toLowerCase()} — sesuai ketentuan ${b.authority ?? "instansi resmi"}:`,
      ],
      bullets: b.requirements,
    },
    {
      heading: "Dokumen Sesuai Profil Pemohon",
      paras: [
        `Profil pemohon menentukan dokumen tambahan. Untuk pemohon ${b.audience.join("/").toLowerCase()}, yang umumnya diminta:`,
        docByCategory[b.category],
      ],
    },
    {
      heading: "Kesalahan yang Paling Sering Membuat Proses Tersendat",
      bullets: mistakeList(b.category, b.h1),
    },
    {
      heading: "Dokumen Lengkap — Lalu Apa?",
      paras: [
        `Setelah dokumen terkumpul, alurnya: kami audit dokumen (gratis, bagian dari konsultasi awal) → penawaran tertulis → eksekusi penuh via ${b.authority ?? "instansi resmi"} → monitoring & laporan progres → dokumen terbit + panduan kewajiban pasca-terbit. Estimasi keseluruhan: ${b.duration}.`,
      ],
      bullets: b.steps.slice(0, 5),
    },
    {
      heading: "Kalau Dokumen Saya Belum Lengkap?",
      paras: [
        "Itu normal — mayoritas klien memulai dengan dokumen belum rapi. Konsultasi awal gratis kami dipakai untuk: memetakan apa yang sudah ada, apa yang kurang, dan bagaimana melengkapinya paling cepat. Tidak perlu menunggu semuanya siap untuk mulai bertanya.",
      ],
    },
  ];

  const faq: SeoFaq[] = [
    {
      q: `Apa saja syarat ${b.h1.toLowerCase()} ${CURRENT_YEAR}?`,
      a: `Syarat dasar: ${b.requirements.slice(0, 3).join("; ")}. Dokumen tambahan menyesuaikan profil pemohon (${b.audience.join(", ").toLowerCase()}) — checklist lengkap ada di halaman ini, dan kami audit gratis di konsultasi pertama.`,
    },
    {
      q: `Apakah harus punya badan usaha dulu untuk ${b.h1.toLowerCase()}?`,
      a: b.category === "perizinan"
        ? "Tidak selalu — banyak pengurusan bisa diurus perorangan/UMKM. Bila usaha Anda rencananya bertumbuh (investor, tender, multi-cabang), mendirikan badan usaha dulu membuat semua izin menumpuk di satu entitas yang benar."
        : `Tergantung layanannya — sebagian ditujukan untuk badan usaha, sebagian perorangan. Audiens ${b.h1.toLowerCase()}: ${b.audience.join(", ")}. Ceritakan kondisi Anda, kami arahkan jalurnya.`,
    },
    {
      q: "Berapa lama proses setelah dokumen lengkap?",
      a: `Estimasi ${b.duration} sejak dokumen lengkap via ${b.authority ?? "instansi resmi"}. Dokumen yang rapi sejak awal adalah faktor terbesar yang mempercepat.`,
    },
    {
      q: "Kalau KTP/NPWP saya bermasalah (beda alamat/dulu hilang), masih bisa?",
      a: "Bisa — banyak kasus seperti itu. Sebutkan kondisinya di konsultasi awal; biasanya cukup dokumen pendukung (domisili, surat keterangan) dan kami urus penyesuaiannya bersamaan.",
    },
    {
      q: "Apakah semua prosesnya online?",
      a: "95% proses kami daring — dokumen dikirim digital, kurir mengurus yang wajib fisik. Anda tinggal di mana pun di 38 provinsi dan tetap bisa diurus penuh.",
    },
  ];

  return {
    slug: b.slug,
    kind: "syarat",
    serviceId: b.slug,
    title: `Syarat ${b.h1} ${CURRENT_YEAR} — Checklist Dokumen Lengkap`,
    h1: `Syarat ${b.h1} ${CURRENT_YEAR}`,
    metaDesc: capMeta(`Syarat ${b.h1.toLowerCase()} lengkap ${CURRENT_YEAR}: checklist dokumen dasar & khusus, kesalahan yang bikin gagal, langkah setelah dokumen lengkap. Audit dokumen gratis — garansi 100%.`),
    intro: [intros[v % intros.length]],
    sections,
    faq,
    keywords: [
      `syarat ${b.h1.toLowerCase()}`,
      `syarat ${b.h1.toLowerCase()} ${CURRENT_YEAR}`,
      `dokumen ${b.h1.toLowerCase()}`,
      `persyaratan ${b.h1.toLowerCase()}`,
      `${b.h1.toLowerCase()} butuh apa saja`,
    ],
    breadcrumbs: [
      { name: "Beranda", href: "/" },
      { name: "Syarat Layanan", href: "/syarat" },
      { name: b.h1, href: `/syarat/${b.slug}` },
    ],
    relatedLinks: [
      { label: `Jasa ${b.h1} — halaman layanan lengkap`, href: `/layanan/${b.slug}` },
      { label: `Biaya ${b.h1} — rincian & cara hemat`, href: `/biaya/${b.slug}` },
      { label: `Kategori ${catMeta.label}`, href: `/layanan/kategori/${catMeta.slug}` },
    ],
  };
}

/** Semua halaman induk layanan (110) dari katalog penuh */
const BASE_RECORDS = ALL_SERVICE_PAGES.filter((p) => p.kind === "base");

export const SYARAT_PAGES: SeoPage[] = BASE_RECORDS.map(buildSyaratPage).filter(
  (p): p is SeoPage => p !== null
);

export function getSyaratPage(slug: string): SeoPage | undefined {
  return SYARAT_PAGES.find((p) => p.slug === slug);
}

export const SYARAT_TOTAL = SYARAT_PAGES.length;
