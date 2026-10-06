// ============================================================
// PUSATPERIZINAN.COM — Generator Matriks Industri × Layanan
// /industri/{industry}/{service} — halaman kombinasi dengan
// konteks industri spesifik (challenges, KBLI, regulasi) +
// data layanan nyata (harga, durasi, syarat, langkah).
// ============================================================

import { ALL_SERVICE_PAGES } from "@/lib/catalog/generators";
import { CATEGORY_META } from "@/lib/catalog/types";
import type { ServicePage } from "@/lib/catalog/types";
import { CURRENT_YEAR } from "@/lib/site";
import { INDUSTRIES } from "./industries";
import type { SeoPage, SeoFaq, SeoBreadcrumb } from "./types";

/** Semua halaman induk layanan (110) — dipetakan by slug */
const BASE_MAP = new Map<string, ServicePage>(
  ALL_SERVICE_PAGES.filter((p) => p.kind === "base").map((p) => [p.slug, p])
);

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

function buildMatrixPage(industrySlug: string, serviceId: string): SeoPage | null {
  const industry = INDUSTRIES.find((i) => i.slug === industrySlug);
  const svcEntry = industry?.services.find((s) => s.id === serviceId);
  const b = BASE_MAP.get(serviceId);
  if (!industry || !svcEntry || !b) return null;

  const slug = `${industry.slug}/${serviceId}`;
  const v = hashStr(slug);
  const catMeta = CATEGORY_META[b.category];
  /** Label bersih utk kalimat: buang sufiks em-dash ("... — Resmi, Cepat & Bergaransi") */
  const svcLabel = b.h1.replace(/\s*—.*$/, "");

  const intros = [
    `${svcLabel} untuk usaha ${industry.name.toLowerCase()} — kenapa sektor ini membutuhkannya lebih dari sektor lain: ${svcEntry.why} Halaman ini menyatukan dua hal yang biasanya terpisah: pengalaman industri ${industry.shortName} dan data teknis ${svcLabel.toLowerCase()} (syarat, biaya mulai ${b.price}, proses ${b.duration}).`,
    `Pemain ${industry.name.toLowerCase()} menghadapi tantangan legalitas yang khas: ${industry.challenges[0].title.toLowerCase()}. Di titik itulah ${svcLabel.toLowerCase()} masuk — ${svcEntry.why} Di bawah: syarat, proses, biaya (mulai ${b.price}), dan pertanyaan yang paling sering diajukan pelaku ${industry.shortName.toLowerCase()} tentang layanan ini.`,
    `${industry.challenges[0].title} adalah salah satu isu paling sering kami tangani di sektor ${industry.shortName.toLowerCase()} — dan ${svcLabel.toLowerCase()} adalah bagian dari jawabannya. ${svcEntry.why} Data lengkap: syarat, langkah, biaya mulai ${b.price}, durasi ${b.duration}, via ${b.authority}.`,
  ];

  const challengesBullets = industry.challenges
    .slice(0, 3)
    .map((c) => `${c.title} — ${c.detail}`);

  const sections: SeoPage["sections"] = [
    {
      heading: `Kenapa ${b.h1} Krusial untuk ${industry.name}`,
      paras: [svcEntry.why],
      bullets: b.category === "perizinan"
        ? undefined
        : b.features.slice(0, 4),
    },
    {
      heading: `Situasi Khas Legalitas di Sektor ${industry.name}`,
      paras: [
        industry.profile[1] ?? industry.profile[0],
      ],
      bullets: challengesBullets,
    },
    {
      heading: `Syarat ${b.h1} untuk Pelaku ${industry.shortName}`,
      paras: [
        `Syarat dasarnya sama untuk semua sektor — yang berbeda adalah dokumen khusus sektor ${industry.shortName.toLowerCase()} dan pemetaan KBLI:`,
      ],
      bullets: b.requirements,
    },
    {
      heading: "Proses Pengurusan — Langkah demi Langkah",
      paras: [
        `Alur penuh via ${b.authority}: dari konsultasi gratis (kami bedah kondisi ${industry.shortName.toLowerCase()} Anda), audit dokumen, eksekusi, sampai dokumen terbit dan panduan kewajiban pasca-terbit. Estimasi total: ${b.duration} sejak dokumen lengkap.`,
      ],
      bullets: b.steps,
    },
    {
      heading: "Biaya & Timeline",
      paras: [
        `Jasa mulai ${b.price} dengan estimasi ${b.duration}. Biaya resmi instansi terpisah dan transparan sejak penawaran — tidak ada biaya yang muncul di tengah jalan. Gagal terbit karena kesalahan proses kami? Uang kembali 100%.`,
      ],
    },
    {
      heading: `KBLI yang Biasa Dipakai Usaha ${industry.name}`,
      paras: [
        industry.kbliCommon.map((k) => `${k.code} — ${k.title}`).join(" · "),
      ],
    },
  ];

  const faq: SeoFaq[] = [
    {
      q: `Apakah usaha ${industry.shortName.toLowerCase()} wajib punya ${b.title.toLowerCase()}?`,
      a: svcEntry.why.endsWith(".") ? svcEntry.why : `${svcEntry.why}.`,
    },
    {
      q: `Berapa biaya ${b.title.toLowerCase()} untuk usaha ${industry.shortName.toLowerCase()}?`,
      a: `Mulai ${b.price} — sama transparannya untuk semua sektor. Yang membuat angka bergerak: jumlah KBLI/lokasi, kondisi dokumen, dan urgensi. ${industry.challenges[0].detail.split("—")[0].trim()} sering menjadi faktor tambahan di sektor ini.`,
    },
    {
      q: `Berapa lama prosesnya?`,
      a: `${b.duration} sejak dokumen lengkap via ${b.authority}. Untuk sektor ${industry.shortName.toLowerCase()}, dokumen yang paling sering menunda adalah ${b.requirements[0].toLowerCase()} — rapikan itu dulu, sisanya jalan mulus.`,
    },
    {
      q: `Bisa diurus 100% online?`,
      a: `Ya, 95% proses daring. ${industry.regulations[0]} membuat sistemnya terintegrasi nasional — Anda di mana pun di Indonesia, tim kami proses penuh dan laporkan progres via WhatsApp.`,
    },
    ...b.faq.slice(0, 1).map((f) => ({ q: f.q, a: f.a })),
  ];

  const breadcrumbs: SeoBreadcrumb[] = [
    { name: "Beranda", href: "/" },
    { name: "Industri", href: "/industri" },
    { name: industry.name, href: `/industri/${industry.slug}` },
    { name: b.title, href: `/industri/${industry.slug}/${serviceId}` },
  ];

  // Tautan silang: layanan induk, industri induk, halaman seindustri, seservis
  const related: SeoBreadcrumb[] = [
    { label: `Halaman layanan ${b.h1}`, href: `/layanan/${serviceId}` },
    { label: `Biaya ${b.h1}`, href: `/biaya/${serviceId}` },
    { label: `Syarat ${b.h1}`, href: `/syarat/${serviceId}` },
    { label: `Semua layanan untuk ${industry.name}`, href: `/industri/${industry.slug}` },
  ];
  const siblings = industry.services.filter((s) => s.id !== serviceId).slice(0, 2);
  for (const s of siblings) {
    const sb = BASE_MAP.get(s.id);
    if (sb) related.push({ label: `${sb.h1} untuk ${industry.shortName}`, href: `/industri/${industry.slug}/${s.id}` });
  }

  return {
    slug,
    kind: "svc-industry",
    serviceId,
    industrySlug: industry.slug,
    title: `${b.h1} untuk Usaha ${industry.name} ${CURRENT_YEAR} — Syarat, Biaya & Proses`,
    h1: `${b.h1} untuk Usaha ${industry.name}`,
    metaDesc: capMeta(`${b.h1} untuk sektor ${industry.name.toLowerCase()}: kenapa krusial, syarat khusus sektor, proses via ${b.authority}. Mulai ${b.price}, ${b.duration}, garansi 100%. Konsultasi gratis.`),
    intro: [intros[v % intros.length]],
    sections,
    faq,
    keywords: [
      `${b.title.toLowerCase()} ${industry.name.toLowerCase()}`,
      `${b.title.toLowerCase()} untuk ${industry.shortName.toLowerCase()}`,
      `izin ${industry.shortName.toLowerCase()} ${CURRENT_YEAR}`,
      `legalitas usaha ${industry.name.toLowerCase()}`,
      ...industry.keywords.slice(0, 2),
    ],
    breadcrumbs,
    relatedLinks: related,
  };
}

export const INDUSTRY_SERVICE_PAGES: SeoPage[] = INDUSTRIES.flatMap((i) =>
  i.services.map((s) => buildMatrixPage(i.slug, s.id))
).filter((p): p is SeoPage => p !== null);

export function getIndustryServicePage(industrySlug: string, serviceId: string): SeoPage | undefined {
  return INDUSTRY_SERVICE_PAGES.find((p) => p.industrySlug === industrySlug && p.serviceId === serviceId);
}

export const INDUSTRY_SERVICE_TOTAL = INDUSTRY_SERVICE_PAGES.length;
