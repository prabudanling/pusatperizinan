// ============================================================
// PUSATPERIZINAN.COM — MESIN PERBANDINGAN PROGRAMATIK
// 38 pasangan layanan dibangun dari data katalog nyata
// (harga, durasi, audiens, syarat, langkah, otoritas) —
// deterministik, anti-duplikat, lulus audit similarity.
// ============================================================

import { ALL_SERVICE_PAGES } from "@/lib/catalog/generators";
import type { ServicePage } from "@/lib/catalog/types";
import type { Comparison, CompareAspect } from "./comparisons";
import { CURRENT_YEAR } from "@/lib/site";

/** Label pendek per layanan (fallback: potongan h1) */
const SHORT_MAP: Record<string, string> = {
  nib: "NIB", pt: "PT", cv: "CV", "pt-perorangan": "PT Perorangan",
  halal: "Sertifikat Halal", bpom: "BPOM", pbg: "PBG", lingkungan: "Izin Lingkungan",
  merek: "Merek", "paten-hki": "Paten & HKI", "api-impex": "API U/P", hscoo: "HS & COO",
  iso: "ISO", "iso-9001": "ISO 9001", "iso-14001": "ISO 14001", "iso-45001": "ISO 45001",
  "iso-27001": "ISO 27001", "iso-27701": "ISO 27701", "iso-22000": "ISO 22000",
  "iso-17025": "ISO 17025", "iso-15189": "ISO 15189", smk3: "SMK3", pirt: "PIRT", sni: "SNI",
  haccp: "HACCP", "b3-proper": "Limbah B3 & PROPER", "slo-kelistrikan": "SLO Kelistrikan",
  "sbu-lpjk": "SBU LPJK", "skttk-tenaga-teknik": "SKTTK",
  "tax-npwp-op": "NPWP Orang Pribadi", "tax-npwp-badan": "NPWP Badan",
  "tax-umkm": "PPh Final UMKM", "tax-spt-tahunan-badan": "SPT Tahunan Badan",
  "tax-pkp-op": "PKP Orang Pribadi", "tax-pkp-badan": "PKP Badan",
  "tax-spt-op": "SPT Tahunan OP", "tax-spt-masa-op": "SPT Masa OP",
  "tax-sengketa": "Sengketa Pajak", "tax-audit": "Pendampingan Audit Pajak",
  "tax-planning": "Tax Planning",
  "ppi-umroh": "PPIU", "ppi-haji": "PIHK",
  "jepang-ssw": "Jepang (SSW)", "korea-eps": "Korea (EPS)",
  "taiwan-hk-sg": "Taiwan/HK/Singapura", "timur-tengah-pmi": "Timur Tengah",
  "virtual-office-address": "VO Alamat Bisnis", "virtual-office-serviced": "Serviced Office",
  "virtual-office-plus-pajak": "VO + Pajak", "virtual-office-bundle-pt": "VO + PT",
  "virtual-office-pma": "VO PPA PMA",
  "halal-jasa-restoran": "Halal Restoran", "halal-jasa-hotel": "Halal Hotel",
  "ppmp-pihk": "PPMP-PIHK", "upgrade-ppiu-ke-pihk": "Upgrade PPIU → PIHK",
  "paket-pendirian-travel-umrah": "Pendirian Travel Umrah", "kepatuhan-pmh-2-2026": "Kepatuhan PMHU",
  "dokumen-pmi": "Dokumen PMI", "kontrak-visa-pmi": "Kontrak & Visa PMI",
  ekspansi: "PT PMA", "ekspansi-asing": "PT PMA",
};

function shortName(p: ServicePage): string {
  if (SHORT_MAP[p.slug]) return SHORT_MAP[p.slug];
  return p.h1.split(/[&(/—]/)[0].trim() || p.h1;
}

/** Parse durasi → jumlah hari minimum untuk pembanding heuristik */
function parseDays(d: string): number | null {
  const m = d.match(/(\d+)\s*hari/);
  return m ? parseInt(m[1], 10) : null;
}

interface PairSpec {
  a: string;
  b: string;
}

const PAIRS: PairSpec[] = [
  { a: "nib", b: "pt" },
  { a: "nib", b: "pt-perorangan" },
  { a: "cv", b: "pt-perorangan" },
  { a: "halal", b: "bpom" },
  { a: "halal", b: "sni" },
  { a: "sni", b: "bpom" },
  { a: "merek", b: "paten-hki" },
  { a: "pbg", b: "lingkungan" },
  { a: "api-impex", b: "hscoo" },
  { a: "iso", b: "sni" },
  { a: "iso-9001", b: "iso-14001" },
  { a: "iso-9001", b: "iso-45001" },
  { a: "iso-9001", b: "iso-27001" },
  { a: "iso-27001", b: "iso-27701" },
  { a: "iso-22000", b: "haccp" },
  { a: "iso-45001", b: "smk3" },
  { a: "iso-17025", b: "iso-15189" },
  { a: "pirt", b: "bpom" },
  { a: "pirt", b: "sni" },
  { a: "lingkungan", b: "b3-proper" },
  { a: "tax-npwp-op", b: "tax-npwp-badan" },
  { a: "tax-umkm", b: "tax-spt-tahunan-badan" },
  { a: "tax-pkp-op", b: "tax-pkp-badan" },
  { a: "tax-spt-op", b: "tax-spt-masa-op" },
  { a: "tax-sengketa", b: "tax-audit" },
  { a: "tax-planning", b: "tax-umkm" },
  { a: "ppi-umroh", b: "ppi-haji" },
  { a: "jepang-ssw", b: "korea-eps" },
  { a: "jepang-ssw", b: "taiwan-hk-sg" },
  { a: "korea-eps", b: "timur-tengah-pmi" },
  { a: "virtual-office-address", b: "virtual-office-serviced" },
  { a: "virtual-office-address", b: "virtual-office-plus-pajak" },
  { a: "virtual-office-bundle-pt", b: "virtual-office-pma" },
  { a: "halal-jasa-restoran", b: "halal-jasa-hotel" },
  { a: "sbu-lpjk", b: "skttk-tenaga-teknik" },
  { a: "dokumen-pmi", b: "kontrak-visa-pmi" },
  { a: "ppmp-pihk", b: "upgrade-ppiu-ke-pihk" },
  { a: "paket-pendirian-travel-umrah", b: "kepatuhan-pmh-2-2026" },
];

const BASE_BY_SLUG = new Map(ALL_SERVICE_PAGES.filter((p) => p.kind === "base").map((p) => [p.slug, p]));

function buildProgrammaticComparison(spec: PairSpec): Comparison | null {
  const a = BASE_BY_SLUG.get(spec.a);
  const b = BASE_BY_SLUG.get(spec.b);
  if (!a || !b) return null;

  const aShort = shortName(a);
  const bShort = shortName(b);
  const slug = `${a.slug}-vs-${b.slug}`;
  if (a.slug === b.slug) return null;

  const priceA = a.priceNumeric;
  const priceB = b.priceNumeric;
  const daysA = parseDays(a.duration);
  const daysB = parseDays(b.duration);

  const aspects: CompareAspect[] = [
    { aspect: "Fokus utama", a: a.desc, b: b.desc, winner: "tie" },
    {
      aspect: "Biaya jasa mulai",
      a: `${a.price} (estimasi ${a.duration})`,
      b: `${b.price} (estimasi ${b.duration})`,
      winner: priceA > 0 && priceB > 0 && priceA !== priceB ? (priceA < priceB ? "a" : "b") : "tie",
    },
    {
      aspect: "Durasi proses",
      a: a.duration,
      b: b.duration,
      winner: daysA && daysB && daysA !== daysB ? (daysA < daysB ? "a" : "b") : "tie",
    },
    { aspect: "Untuk siapa", a: a.audience.join(", "), b: b.audience.join(", "), winner: "tie" },
    { aspect: "Jalur & otoritas resmi", a: a.authority ?? "-", b: b.authority ?? "-", winner: "tie" },
    { aspect: "Syarat inti", a: a.requirements.slice(0, 2).join("; "), b: b.requirements.slice(0, 2).join("; "), winner: "tie" },
    { aspect: "Langkah pertama", a: a.steps[0] ?? "-", b: b.steps[0] ?? "-", winner: "tie" },
    { aspect: "Hasil yang Anda dapatkan", a: a.features.slice(0, 2).join("; "), b: b.features.slice(0, 2).join("; "), winner: "tie" },
  ];

  const aWins = aspects.filter((x) => x.winner === "a").length;
  const bWins = aspects.filter((x) => x.winner === "b").length;
  const tieCount = aspects.length - aWins - bWins;

  const intro = [
    `${aShort} dan ${bShort} adalah dua layanan yang paling sering membuat pelaku usaha ragu — keduanya sama-sama penting, tapi menjawab kebutuhan yang berbeda: ${a.desc} Sementara ${bShort}: ${b.desc}`,
    `Tabel di bawah membandingkan keduanya dalam ${aspects.length} aspek nyata — fokus, biaya mulai ${a.price} vs ${b.price}, durasi, audiens, syarat, dan hasil yang Anda dapatkan. Setelah tabel ada panduan keputusan: kapan memilih ${aShort}, kapan memilih ${bShort}, dan kapan keduanya justru diurus bersamaan dalam satu roadmap.`,
  ];

  const faq = [
    {
      q: `Apakah ${aShort} dan ${bShort} bisa diurus sekaligus?`,
      a: `Bisa — dan sering justru itu yang paling efisien. Keduanya dikerjakan dalam satu roadmap agar dokumen tidak saling menunggu, dengan diskon bundling dan satu penanggung jawab komunikasi. Konsultasi awal gratis memetakan urutannya.`,
    },
    {
      q: `Mana yang lebih dahulu: ${aShort} atau ${bShort}?`,
      a: `Tergantung kondisi — tapi pola umumnya: legalitas dasar lebih dulu, dokumen pendukung menyusul. Ceritakan kondisi Anda di konsultasi gratis, kami susun urutan yang paling cepat dan hemat.`,
    },
    ...(a.faq[0] ? [a.faq[0]] : []),
    ...(b.faq[0] ? [b.faq[0]] : []),
  ];

  return {
    slug,
    aId: a.slug,
    bId: b.slug,
    aName: a.h1,
    bName: b.h1,
    aShort,
    bShort,
    title: `${aShort} vs ${bShort}: Perbedaan, Biaya & Kapan Memilih (Tabel ${aspects.length} Aspek)`,
    metaTitle: `${aShort} vs ${bShort} — Perbandingan Biaya, Syarat & Proses | ${CURRENT_YEAR}`,
    metaDesc: `Perbandingan ${aShort} vs ${bShort} lengkap ${aspects.length} aspek: biaya mulai ${a.price} vs ${b.price}, durasi, syarat & hasil. Panduan kapan memilih mana — plus opsi urus keduanya sekaligus. Gratis.`,
    intro,
    aspects,
    chooseA: [
      `Kebutuhan Anda persis pada ${aShort} — ${a.desc}`,
      `Anggaran mulai ${a.price} dengan proses ${a.duration} sudah sesuai rencana`,
      `Profil pemohon Anda: ${a.audience.join(", ")}`,
    ],
    chooseB: [
      `Kebutuhan Anda persis pada ${bShort} — ${b.desc}`,
      `Anggaran mulai ${b.price} dengan proses ${b.duration} sudah sesuai rencana`,
      `Profil pemohon Anda: ${b.audience.join(", ")}`,
    ],
    verdict: `${aShort} dan ${bShort} menjawab kebutuhan yang berbeda — ini bukan soal mana yang lebih baik, tapi mana yang sesuai kondisi Anda. Skornya (${aWins} vs ${bWins}, ${tieCount} aspek setara) hanya alat bantu; keputusan terbaik lahir dari pemetaan kondisi usaha Anda. Banyak klien kami menguruskannya bersamaan dalam satu roadmap agar dokumen tidak saling menunggu — konsultasi awal gratis memetakan urutan yang paling efisien.`,
    faq,
    keywords: [
      `${aShort.toLowerCase()} vs ${bShort.toLowerCase()}`,
      `perbedaan ${aShort.toLowerCase()} dan ${bShort.toLowerCase()}`,
      `${aShort.toLowerCase()} atau ${bShort.toLowerCase()}`,
      `biaya ${aShort.toLowerCase()} ${bShort.toLowerCase()} ${CURRENT_YEAR}`,
    ],
  };
}

export const PROGRAMMATIC_COMPARISONS: Comparison[] = PAIRS.map(buildProgrammaticComparison).filter(
  (c): c is Comparison => c !== null
);

export const PROGRAMMATIC_COMPARISONS_TOTAL = PROGRAMMATIC_COMPARISONS.length;
