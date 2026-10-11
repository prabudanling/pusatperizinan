// ============================================================
// PUSATPERIZINAN.COM — Halaman Industri Hub (/industri/{slug})
// + Halaman indeks famili (/biaya, /syarat, /industri)
// ============================================================

import { CURRENT_YEAR } from "@/lib/site";
import { BASE_SERVICES } from "@/lib/catalog/generators";
import { INDUSTRIES } from "./industries";
import type { SeoPage, SeoIndexPage, SeoBreadcrumb } from "./types";

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

function buildIndustryPage(industrySlug: string): SeoPage | null {
  const industry = INDUSTRIES.find((i) => i.slug === industrySlug);
  if (!industry) return null;
  const v = hashStr(industrySlug);

  const services = industry.services
    .map((s) => ({ entry: s, base: BASE_SERVICES.get(s.id) }))
    .filter((x): x is { entry: { id: string; why: string }; base: NonNullable<ReturnType<typeof BASE_SERVICES.get>> } => Boolean(x.base));

  const cheapest = services.reduce(
    (min, x) => {
      const n = x.base.priceNumeric;
      return n > 0 && (min === 0 || n < min) ? n : min;
    },
    0
  );
  const cheapestLabel = cheapest > 0 ? `mulai Rp${cheapest.toLocaleString("id-ID")}` : "harga transparan sejak penawaran";

  const intros = [
    `Legalitas usaha ${industry.name.toLowerCase()} berbeda karakternya dari sektor lain — ${industry.tagline.toLowerCase()} menghadapi kombinasi perizinan yang unik. Halaman ini memetakan semuanya: tantangan khas sektor, ${services.length} layanan paling relevan (dengan alasan spesifiknya), KBLI yang biasa dipakai, dan regulasi yang mengatur. Pakai sebagai roadmap — lalu hubungi kami untuk mengeksekusinya.`,
    `Panduan lengkap legalitas untuk pemain ${industry.name.toLowerCase()} ${CURRENT_YEAR}: dari ${services[0]?.base.title.toLowerCase() ?? "NIB"} sampai sertifikasi pembeda kompetitif. ${industry.challenges[0].title} adalah tantangan yang paling sering kami tangani di sektor ini — dan setiap layanan di bawah punya perannya menjawabnya.`,
    `Apa saja izin yang dibutuhkan usaha ${industry.name.toLowerCase()}? Jawaban jujurnya: tergantung model usaha Anda — tapi polanya bisa dipetakan. Di halaman ini kami susun berdasarkan urutan yang biasanya kami jalani untuk klien ${industry.shortName.toLowerCase()}: legalitas dasar dulu, lalu izin operasional, lalu sertifikasi pembeda. ${services.length} layanan relevan lengkap dengan biaya ${cheapestLabel}.`,
  ];

  const sections: SeoPage["sections"] = [
    {
      heading: `Profil Legalitas Sektor ${industry.name}`,
      paras: industry.profile,
    },
    {
      heading: `4-5 Tantangan Legalitas yang Paling Sering Kami Tangani`,
      paras: [
        `Pengalaman menangani ribuan kasus ${industry.shortName.toLowerCase()} menunjukkan pola yang sama — inilah tantangan yang paling sering membuat pemilik usaha tersendat:`,
      ],
      bullets: industry.challenges.map((c) => `${c.title} — ${c.detail}`),
    },
    {
      heading: `Layanan Perizinan Prioritas untuk ${industry.name}`,
      paras: [
        `Dipetakan khusus untuk sektor ini — bukan daftar generik. Setiap layanan dijelaskan mengapa relevan untuk ${industry.shortName.toLowerCase()}:`,
      ],
      bullets: services.map((s) => `${s.base.title} (mulai ${s.base.price}, ${s.base.duration}) — ${s.entry.why}`),
    },
    {
      heading: `KBLI yang Biasa Dipakai Sektor ${industry.shortName}`,
      paras: [
        `Pemilihan KBLI menentukan cakupan izin — salah KBLI berarti mengulang proses. Kode yang paling umum di sektor ini:`,
      ],
      bullets: industry.kbliCommon.map((k) => `${k.code} — ${k.title}`),
    },
    {
      heading: "Regulasi Utama yang Membingkai Sektor Ini",
      bullets: industry.regulations,
    },
    {
      heading: "Urutan yang Biasanya Kami Jalani untuk Klien Baru",
      paras: [
        `Bukan semua sekaligus — urutan yang benar menghemat biaya dan waktu: (1) legalitas dasar (NIB/badan usaha) supaya semua dokumen lain menumpuk di entitas yang benar; (2) izin operasional yang disyaratkan sebelum jalan; (3) sertifikasi pembeda (halal, ISO, SNI) saat pasar mulai memintanya; (4) kepatuhan berjalan (LKPM, pajak) supaya dokumen tidak hangus. Konsultasi awal gratis memetakan urutan spesifik kondisi Anda.`,
      ],
    },
  ];

  const related: SeoBreadcrumb[] = services.slice(0, 8).map((s) => ({
    label: `${s.base.title} untuk ${industry.shortName}`,
    href: `/industri/${industry.slug}/${s.entry.id}`,
  }));
  related.push({ label: "Semua sektor industri", href: "/industri" });

  return {
    slug: industry.slug,
    kind: "industri",
    industrySlug: industry.slug,
    title: `Perizinan & Legalitas Usaha ${industry.name} ${CURRENT_YEAR} — Panduan Sektor`,
    h1: `Legalitas Usaha ${industry.name}`,
    metaDesc: capMeta(`Panduan legalitas usaha ${industry.name.toLowerCase()} ${CURRENT_YEAR}: ${services.length} layanan prioritas dengan alasan spesifik sektor, KBLI umum, regulasi utama, tantangan khas. ${cheapestLabel} — garansi 100%.`),
    intro: [intros[v % intros.length]],
    sections,
    faq: industry.faq,
    keywords: [
      `perizinan usaha ${industry.name.toLowerCase()}`,
      `legalitas usaha ${industry.shortName.toLowerCase()}`,
      `izin usaha ${industry.shortName.toLowerCase()} ${CURRENT_YEAR}`,
      ...industry.keywords.slice(0, 3),
    ],
    breadcrumbs: [
      { name: "Beranda", href: "/" },
      { name: "Industri", href: "/industri" },
      { name: industry.name, href: `/industri/${industry.slug}` },
    ],
    relatedLinks: related,
  };
}

export const INDUSTRY_PAGES: SeoPage[] = INDUSTRIES.map((i) => buildIndustryPage(i.slug)).filter(
  (p): p is SeoPage => p !== null
);

export function getIndustryPage(slug: string): SeoPage | undefined {
  return INDUSTRY_PAGES.find((p) => p.industrySlug === slug);
}

// ------------------------------------------------------------
// Halaman indeks famili (/biaya, /syarat, /industri)
// ------------------------------------------------------------

export function buildBiayaIndexPage(total: number): SeoIndexPage {
  return {
    slug: "",
    kind: "biaya-index",
    title: `Biaya Layanan Pengurusan Izin ${CURRENT_YEAR} — Daftar Harga Transparan`,
    h1: "Biaya Layanan — Daftar Harga Transparan",
    metaDesc: `Daftar biaya ${total} layanan pengurusan izin & legalitas usaha: rincian jasa, biaya resmi pemerintah, faktor harga & cara hemat. Transparan sejak penawaran — garansi 100%.`,
    intro: [
      `Harga yang transparan adalah standar, bukan bonus. Di halaman ini Anda bisa membandingkan biaya ${total} layanan kami — setiap halaman merinci komponen biaya (jasa vs biaya resmi pemerintah), faktor yang membuat angka bergerak, dan cara mendapatkan harga paling efisien. Semua tanpa biaya tersembunyi, dengan garansi uang kembali 100% bila gagal karena kesalahan proses kami.`,
    ],
    faq: [
      {
        q: "Apakah harga di daftar ini final?",
        a: "Angka di setiap halaman adalah titik mulai (mulai dari). Angka pastinya tergantung kondisi dokumen & kebutuhan Anda — konsultasi awal gratis menghasilkan penawaran tertulis yang final dan mengikat.",
      },
      {
        q: "Apakah ada diskon bila mengurus beberapa layanan sekaligus?",
        a: "Ada — bundling beberapa layanan dalam satu roadmap selalu lebih efisien daripada satu-per-satu, baik biaya maupun timeline. Sebutkan kebutuhan Anda di konsultasi awal.",
      },
    ],
    keywords: ["biaya pengurusan izin", "daftar harga jasa perizinan", "biaya konsultan izin usaha", "harga jasa legalitas usaha"],
    breadcrumbs: [{ name: "Beranda", href: "/" }, { name: "Biaya Layanan", href: "/biaya" }],
  };
}

export function buildSyaratIndexPage(total: number): SeoIndexPage {
  return {
    slug: "",
    kind: "syarat-index",
    title: `Syarat Layanan Pengurusan Izin ${CURRENT_YEAR} — Checklist Dokumen`,
    h1: "Syarat Layanan — Checklist Dokumen Lengkap",
    metaDesc: `Checklist syarat ${total} layanan perizinan & legalitas usaha: dokumen dasar, dokumen khusus per profil pemohon, kesalahan yang bikin gagal. Audit dokumen gratis di konsultasi awal.`,
    intro: [
      `Sebagian besar proses pengurusan tersendat bukan karena instansi lambat — tapi karena dokumen belum lengkap sejak awal. Halaman ini merangkum syarat ${total} layanan kami dalam checklist yang bisa langsung dipakai: dokumen dasar, dokumen tambahan per profil pemohon, dan kesalahan yang paling sering membuat proses berulang. Dokumen Anda belum lengkap? Tidak apa-apa — audit dokumen gratis di konsultasi pertama.`,
    ],
    faq: [
      {
        q: "Kalau dokumen saya belum lengkap sama sekali?",
        a: "Mulai saja dari konsultasi gratis — kami petakan apa yang sudah ada, apa yang kurang, dan urutan melengkapinya paling efisien. Mayoritas klien memulai dari kondisi yang sama.",
      },
      {
        q: "Apakah syaratnya sama di semua provinsi?",
        a: "Syarat nasional (OSS-RBA, Coretax DJP) sama di seluruh Indonesia. Yang bisa berbeda adalah kebiasaan lokal instansi daerah — dan itu bagian dari pengalaman kami di 38 provinsi.",
      },
    ],
    keywords: ["syarat pengurusan izin", "checklist dokumen izin usaha", "persyaratan legalitas usaha", "syarat izin usaha 2026"],
    breadcrumbs: [{ name: "Beranda", href: "/" }, { name: "Syarat Layanan", href: "/syarat" }],
  };
}

export function buildIndustriIndexPage(total: number): SeoIndexPage {
  return {
    slug: "",
    kind: "industri-index",
    title: `Perizinan per Sektor Industri ${CURRENT_YEAR} — Panduan Legalitas ${total} Sektor`,
    h1: "Perizinan per Sektor Industri",
    metaDesc: `Panduan legalitas per sektor: ${total} industri dipetakan layanan prioritasnya, KBLI umum, regulasi utama & tantangan khas. Dari kuliner sampai pertambangan — roadmap spesifik sektor Anda.`,
    intro: [
      `Legalitas usaha bukan soal satu izin untuk semua — sektor kuliner berbeda dengan pertambangan, startup digital berbeda dengan travel umrah. Di halaman ini ${total} sektor industri dipetakan satu per satu: layanan prioritasnya (dengan alasan spesifik sektor), KBLI yang biasa dipakai, regulasi yang mengatur, dan tantangan yang paling sering kami tangani. Pilih sektor Anda — atau hubungi kami untuk memetakan kondisi spesifik Anda.`,
    ],
    faq: [
      {
        q: "Sektor saya tidak ada di daftar, bagaimana?",
        a: `${total} sektor di bawah mencakup mayoritas kasus yang kami tangani — tapi setiap usaha unik. Hubungi kami via WhatsApp: konsultasi awal gratis memetakan kebutuhan legalitas kondisi Anda, apa pun sektornya.`,
      },
      {
        q: "Usaha saya lintas sektor (misal kafe di dalam hotel), ikut yang mana?",
        a: "Berdasarkan aktivitas utama — dan kombinasi KBLI-nya kami petakan agar semua aktivitas ter-cover. Kasus lintas sektor justru keahlian kami; sebutkan model usahanya di konsultasi awal.",
      },
    ],
    keywords: ["perizinan per sektor", "legalitas per industri", "izin usaha per bidang", "panduan perizinan sektor industri"],
    breadcrumbs: [{ name: "Beranda", href: "/" }, { name: "Industri", href: "/industri" }],
  };
}

export const INDUSTRY_TOTAL_PAGES = INDUSTRY_PAGES.length;
