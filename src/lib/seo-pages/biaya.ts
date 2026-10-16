// ============================================================
// PUSATPERIZINAN.COM — Generator Halaman Biaya (/biaya/{slug})
// 110 halaman: satu per layanan dasar. ANTI-DOORWAY: mayoritas
// token per halaman berasal dari data layanan nyata (desc,
// features, requirements, steps, audience, authority) —
// templat generik dipangkas & divariasikan hash FNV-1a.
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

/** Catatan biaya resmi per kategori */
function officialFeeNote(category: CatalogCategory): string {
  switch (category) {
    case "pajak":
      return "biaya resmi DJP (PNBP/norma)";
    case "pmi":
      return "biaya resmi KemenP2MI/BP2MI";
    case "sertifikasi":
      return "biaya lembaga sertifikasi terakreditasi";
    case "virtual-office":
      return "biaya operasional gedung & layanan pendukung";
    default:
      return "biaya resmi pemerintah termasuk PNBP daerah";
  }
}

function buildBiayaPage(base: ServicePage): SeoPage | null {
  const b = base;
  const catMeta = CATEGORY_META[b.category];
  const v = hashStr(`biaya-${b.slug}`);
  const fee = officialFeeNote(b.category);
  const feeCap = fee.charAt(0).toUpperCase() + fee.slice(1);

  // --- 3 varian intro; semuanya memuat desc layanan (token unik dominan) ---
  const intros = [
    `${b.desc} Pertanyaan berikutnya yang paling sering muncul: "berapa totalnya?" Jasa kami mulai ${b.price} dengan estimasi ${b.duration}, dan ${fee} dibayar terpisah ke instansi — indikasinya kami sampaikan tertulis sebelum Anda memutuskan apa pun. Halaman ini membedah struktur biaya ${b.h1.toLowerCase()} dari pengalaman menangani ribuan kasus serupa via ${b.authority ?? "instansi resmi"}.`,
    `Menghitung anggaran untuk ${b.h1.toLowerCase()}? Dua komponen yang harus Anda pahami: (1) jasa profesional — mulai ${b.price}, mencakup ${b.features.slice(0, 2).join(", ").toLowerCase()}; (2) ${fee} yang terpisah dan transparan. Durasi normal ${b.duration} sejak dokumen lengkap. Di bawah kami rinci semua faktor yang membuat angka bergerak — supaya Anda tidak kejutan di tengah jalan.`,
    `${b.h1.toLowerCase()} diuruskannya berapa? Jawaban jujurnya tergantung kondisi awal Anda: ${b.desc} Titik mulai jelas: jasa mulai ${b.price}, proses ${b.duration} via ${b.authority ?? "instansi resmi"}. Faktor pengeranya, skema pembayaran, dan cara menghemat tanpa risiko — semuanya kami buka di halaman ini.`,
  ];

  // Faktor biaya — diturunkan dari data layanan nyata (unik per halaman)
  const factors = [
    `Cakupan layanan: ${b.features.join("; ")}`,
    `Kondisi dokumen awal — ${b.requirements[0].toLowerCase()} adalah hal pertama yang kami periksa; dokumen yang siap sejak awal memangkas pekerjaan revisi`,
    `Profil pemohon: ${b.audience.join(", ")} — kondisi masing-masing menentukan dokumen dan jalur`,
    v % 2 === 0
      ? `Kebutuhan tahapan proses: ${b.steps.length} tahap penuh dari konsultasi sampai terbit — urgensi tertentu bisa masuk jalur prioritas`
      : `Jumlah entitas/produk yang diurus sekaligus — bundling lebih efisien daripada satu-per-satu`,
  ];
  if (b.category === "perizinan") factors.push("Jumlah KBLI yang dicakup dan kategori risikonya — risiko menengah-tinggi menuntut verifikasi tambahan instansi");
  else if (b.category === "pajak") factors.push("Kerumitan transaksi: sumber penghasilan, status PKP, dan kondisi historis (SPT tertunda/denda)");
  else if (b.category === "pmi") factors.push("Negara tujuan & skema penempatan — setiap negara punya biaya resmi dan durasi berbeda");
  else if (b.category === "sertifikasi") factors.push("Jumlah lokasi/produk yang dicakup audit dan kesiapan sistem internal sebelum audit");

  // Tips hemat — berbasis requirements/steps layanan (unik) + kategori
  const perCatTip: Record<CatalogCategory, string> = {
    perizinan: "Pilih KBLI yang tepat sejak awal — salah KBLI berarti mengulang proses dengan biaya baru",
    pajak: "Manfaatkan skema UMKM PPh final 0,5% bila memenuhi syarat — tarif jauh lebih ringan",
    pmi: "Pastikan jalur resmi (SISKOP2MI/job order terverifikasi) — jalur gelap berakhir mahal di tengah jalan",
    sertifikasi: "Jalankan gap analysis dulu — mencegah audit ulang berbayar",
    "virtual-office": "Ambil paket tahunan + fasilitas yang benar-benar dipakai — jangan bayar yang menganggur",
  };
  const tips = [
    `Mulai dari pemetaan yang benar: konsultasi gratis kami bedah ${b.h1.toLowerCase()} yang benar-benar Anda butuhkan — bukan paket besar yang tidak perlu`,
    `Rapikan ${b.requirements[1]?.toLowerCase() ?? b.requirements[0].toLowerCase()} sejak awal — audit dokumen gratis di konsultasi pertama memangkas revisi berulang`,
    perCatTip[b.category],
  ];

  // Garansi — 4 varian pendek (templat dipangkas, variasi hash)
  const garansi = [
    `Bila ${b.h1.toLowerCase()} gagal terbit karena kesalahan proses kami, uang jasa kembali 100% — tertulis di perjanjian, bukan janji verbal.`,
    `Semua pengurusan ${b.h1.toLowerCase()} kami lindungi garansi uang kembali 100% bila gagal terbit karena kesalahan proses kami — dan progres Anda terdokumentasi di satu thread WhatsApp.`,
    `Risiko proses kami tanggung: gagal terbit karena kesalahan kami berarti jasa kembali 100%. Klien kami memberi rating 4,9/5 dari 890+ ulasan — karena standar ini diterapkan konsisten.`,
    `Perjanjian tertulis + garansi uang kembali 100% bila gagal karena kesalahan proses kami. Itu standar yang berlaku untuk setiap kasus ${b.h1.toLowerCase()} yang kami tangani di 38 provinsi.`,
  ];

  const sections: SeoPage["sections"] = [
    {
      heading: `Rincian Komponen Biaya ${b.h1}`,
      bullets: [
        `Jasa profesional: mulai ${b.price} — sudah mencakup ${b.features.join("; ").toLowerCase()}`,
        `${feeCap} — terpisah dari jasa, dibayar ke instansi (${b.authority ?? "instansi resmi"}), indikasinya tertulis di penawaran`,
        "Biaya dokumen pendukung bila diperlukan (materai, kurir fisik, sworn translation dokumen asing)",
        "Yang tidak ada: biaya tersembunyi, 'biaya percepatan' tidak resmi, atau tambahan di tengah jalan",
      ],
    },
    {
      heading: "Apa yang Mempengaruhi Besarnya Biaya?",
      paras: [
        `Angka untuk ${b.h1.toLowerCase()} bergerak sesuai kondisi awal — dua pemohon bisa mendapat total berbeda karena faktor-faktor ini:`,
      ],
      bullets: factors,
    },
    {
      heading: "Kapan Bayar & Bagaimana Skemanya?",
      paras: [
        `Pembayaran ke rekening perusahaan resmi (PT Digital Bisnis Manajemen) dengan invoice & perjanjian tertulis — bukan rekening pribadi. Untuk pengurusan bernilai besar, pembayaran bisa bertahap: bagian awal saat mulai, sisanya setelah dokumen terbit. Estimasi total ${b.duration} sejak dokumen lengkap, dengan ${b.steps.length} tahapan yang bisa Anda pantau real-time.`,
      ],
      bullets: b.steps.slice(0, 3),
    },
    {
      heading: "Cara Mendapatkan Biaya Paling Efisien",
      bullets: tips,
    },
    {
      heading: "Garansi & Perlindungan Anda",
      paras: [garansi[v % garansi.length]],
    },
  ];

  const faq: SeoFaq[] = [
    {
      q: `Berapa biaya ${b.h1.toLowerCase()} ${CURRENT_YEAR}?`,
      a: `Jasa mulai ${b.price} dengan durasi ${b.duration}. ${feeCap} terpisah — indikasinya kami berikan di penawaran tertulis sebelum Anda memutuskan apa pun.`,
    },
    {
      q: `Apakah harga mulai ${b.price} sudah termasuk semua?`,
      a: `Harga itu mencakup jasa: ${b.features.join("; ").toLowerCase()}, monitoring progres, dan pendampingan sampai terbit. ${feeCap} terpisah — begitu juga biaya dokumen pendukung bila kondisi Anda memerlukannya.`,
    },
    {
      q: `Mengapa vendor lain bisa lebih murah?`,
      a: `Periksa tiga hal: (1) apakah termasuk biaya resmi atau jasa saja, (2) apakah ada perjanjian & garansi tertulis, (3) apakah jalurnya resmi via ${b.authority ?? "instansi resmi"}. Harga murah tanpa garansi biasanya berakhir lebih mahal saat proses gagal atau diulang.`,
    },
    ...b.faq.slice(0, 2),
  ];

  return {
    slug: b.slug,
    kind: "biaya",
    serviceId: b.slug,
    title: `Biaya ${b.h1} ${CURRENT_YEAR} — Rincian Jasa & Biaya Resmi`,
    h1: `Biaya ${b.h1} ${CURRENT_YEAR}`,
    metaDesc: capMeta(`Biaya ${b.h1.toLowerCase()} ${CURRENT_YEAR}: jasa mulai ${b.price} termasuk ${b.features[0]?.toLowerCase() ?? "pendampingan penuh"}, ${fee} terpisah & transparan. ${b.duration}, garansi uang kembali 100%.`),
    intro: [intros[v % intros.length]],
    sections,
    faq,
    keywords: [
      `biaya ${b.h1.toLowerCase()}`,
      `biaya ${b.h1.toLowerCase()} ${CURRENT_YEAR}`,
      `jasa ${b.h1.toLowerCase()} berapa`,
      `harga jasa ${b.h1.toLowerCase()}`,
      `biaya pengurusan ${b.h1.toLowerCase()}`,
    ],
    breadcrumbs: [
      { name: "Beranda", href: "/" },
      { name: "Biaya Layanan", href: "/biaya" },
      { name: b.h1, href: `/biaya/${b.slug}` },
    ],
    relatedLinks: [
      { label: `Jasa ${b.h1} — halaman layanan lengkap`, href: `/layanan/${b.slug}` },
      { label: `Syarat ${b.h1} — checklist dokumen`, href: `/syarat/${b.slug}` },
      { label: `Kategori ${catMeta.label}`, href: `/layanan/kategori/${catMeta.slug}` },
    ],
  };
}

/** Semua halaman induk layanan (110): base kind dari katalog penuh */
const BASE_RECORDS = ALL_SERVICE_PAGES.filter((p) => p.kind === "base");

export const BIAYA_PAGES: SeoPage[] = BASE_RECORDS.map(buildBiayaPage).filter(
  (p): p is SeoPage => p !== null
);

export function getBiayaPage(slug: string): SeoPage | undefined {
  return BIAYA_PAGES.find((p) => p.slug === slug);
}

export const BIAYA_TOTAL = BIAYA_PAGES.length;
