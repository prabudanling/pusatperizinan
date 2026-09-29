// ============================================================
// PUSATPERIZINAN.COM — Katalog & Generator Halaman KBLI
// 142 kode KBLI → halaman detail SEO lengkap (izin, pajak, FAQ)
// ============================================================

import { KBLI_RAW, KBLI_CATEGORIES, KBLI_TOTAL } from "./kbli-database";
import type { KbliRisk, KbliCategoryMeta } from "./kbli-database";
import { slugify } from "./catalog/generators";

export interface KbliFaq {
  q: string;
  a: string;
}

export interface KbliPage {
  code: string;
  slug: string; // "56101-usaha-restoran"
  title: string; // meta title
  h1: string;
  metaDesc: string;
  category: KbliCategoryMeta;
  risk: KbliRisk;
  riskLabel: string;
  desc: string;
  includes: string[];
  licenses: { name: string; note: string }[];
  taxNotes: string[];
  incentives: string[];
  faq: KbliFaq[];
  relatedServices: { slug: string; title: string }[];
  relatedKbli: { code: string; slug: string; title: string }[];
  keywords: string[];
}

const RISK_META: Record<KbliRisk, { label: string; licenses: { name: string; note: string }[]; color: string }> = {
  rendah: {
    label: "Risiko Rendah",
    licenses: [
      { name: "NIB (Nomor Induk Berusaha)", note: "Terbit via OSS-RBA dengan pernyataan mandiri — proses paling cepat (1 hari kerja). Inilah legalitas inti usaha Anda." },
    ],
    color: "emerald",
  },
  "menengah-rendah": {
    label: "Risiko Menengah Rendah",
    licenses: [
      { name: "NIB + Sertifikat Standar (Self-Declare)", note: "Selain NIB, Anda wajib menerbitkan Sertifikat Standar via OSS dengan pernyataan mandiri bahwa usaha memenuhi standar bisnis sektor ini." },
    ],
    color: "amber",
  },
  "menengah-tinggi": {
    label: "Risiko Menengah Tinggi",
    licenses: [
      { name: "NIB + Sertifikat Standar (Terverifikasi)", note: "Sertifikat Standar untuk kegiatan berisiko menengah tinggi perlu diverifikasi oleh instansi/lembaga sertifikasi sebelum operasional penuh." },
      { name: "Verifikasi Dokumen/Sertifikasi Teknis", note: "Instansi teknis (DPMPTSP, Dinas terkait) memverifikasi kesiapan usaha: sarana, personel, dan standar operasional." },
    ],
    color: "orange",
  },
  tinggi: {
    label: "Risiko Tinggi",
    licenses: [
      { name: "NIB + Izin (Persetujuan Pemerintah)", note: "Kegiatan berisiko tinggi membutuhkan izin/persetujuan khusus dari kementerian/lembaga — proses lebih panjang dan butuh dokumen teknis lengkap." },
      { name: "Dokumen Lingkungan", note: "Umumnya membutuhkan UKL-UPL atau AMDAL + Persetujuan Lingkungan terintegrasi OSS." },
    ],
    color: "red",
  },
};

/** Mapping kategori KBLI → slug layanan katalog yang relevan */
const CATEGORY_SERVICES: Record<string, { slug: string; title: string }[]> = {
  pertanian: [
    { slug: "nib", title: "NIB & OSS-RBA" },
    { slug: "koperasi-yayasan", title: "Koperasi Petani" },
    { slug: "api-impex", title: "Ekspor Hasil Pertanian" },
  ],
  perikanan: [
    { slug: "nib", title: "NIB & OSS-RBA" },
    { slug: "api-impex", title: "Ekspor Perikanan" },
    { slug: "pt", title: "Pendirian PT" },
  ],
  pengolahan: [
    { slug: "nib", title: "NIB & OSS-RBA" },
    { slug: "halal", title: "Sertifikasi Halal" },
    { slug: "bpom", title: "Izin Edar BPOM/PIRT" },
    { slug: "sni", title: "SNI" },
    { slug: "iso", title: "ISO Sistem Manajemen" },
  ],
  listrik: [
    { slug: "lingkungan", title: "Izin Lingkungan" },
    { slug: "tambang", title: "Perizinan Energi" },
  ],
  konstruksi: [
    { slug: "nib", title: "NIB & OSS-RBA" },
    { slug: "smk3", title: "SMK3 & Kepatuhan K3" },
    { slug: "iso", title: "ISO 9001/45001" },
  ],
  dagang: [
    { slug: "nib", title: "NIB & OSS-RBA" },
    { slug: "api-impex", title: "API Impor-Ekspor" },
    { slug: "hscoo", title: "HS Code & COO" },
    { slug: "merek", title: "Pendaftaran Merek" },
  ],
  transportasi: [
    { slug: "logistik", title: "Izin Logistik & Angkutan" },
    { slug: "api-impex", title: "API Impor-Ekspor" },
  ],
  akomodasi: [
    { slug: "nib", title: "NIB & OSS-RBA" },
    { slug: "halal", title: "Sertifikasi Halal" },
    { slug: "pbg", title: "PBG & SLF" },
    { slug: "pariwisata", title: "Izin Pariwisata (TDAU)" },
  ],
  informasi: [
    { slug: "nib", title: "NIB & OSS-RBA" },
    { slug: "pse-komdigi", title: "PSE Komdigi" },
    { slug: "merek", title: "Pendaftaran Merek" },
    { slug: "paten-hki", title: "Hak Cipta Software" },
  ],
  keuangan: [
    { slug: "tax-planning", title: "Tax Planning Korporasi" },
    { slug: "pt", title: "Pendirian PT" },
  ],
  properti: [
    { slug: "nib", title: "NIB & OSS-RBA" },
    { slug: "pbg", title: "PBG & SLF" },
  ],
  profesional: [
    { slug: "nib", title: "NIB & OSS-RBA" },
    { slug: "pt", title: "Pendirian PT/Kantor" },
    { slug: "rptka-kitas", title: "TKA Expatriat" },
  ],
  persewaan: [
    { slug: "nib", title: "NIB & OSS-RBA" },
    { slug: "pptkis", title: "Izin P3MI (KBLI 78202)" },
    { slug: "lkpm", title: "LKPM & Kepatuhan" },
  ],
  pendidikan: [
    { slug: "pendidikan", title: "Izin Lembaga Pendidikan" },
    { slug: "nib", title: "NIB & OSS-RBA" },
  ],
  kesehatan: [
    { slug: "kesehatan", title: "Izin Klinik & Farmasi" },
    { slug: "alkes", title: "Izin Alkes & PKRT" },
    { slug: "nib", title: "NIB & OSS-RBA" },
  ],
  hiburan: [
    { slug: "nib", title: "NIB & OSS-RBA" },
    { slug: "pariwisata", title: "Izin Pariwisata" },
    { slug: "pse-komdigi", title: "PSE Komdigi" },
  ],
  "jasa-lain": [
    { slug: "nib", title: "NIB & OSS-RBA" },
    { slug: "merek", title: "Pendaftaran Merek" },
    { slug: "pbg", title: "PBG & SLF" },
  ],
};

function buildTaxNotes(risk: KbliRisk, halal?: boolean): string[] {
  const notes = [
    "PPh Final 0,5% dari omzet (PP 55/2022) tersedia untuk usaha dengan omzet ≤ Rp4,8 miliar/tahun — rezim pajak paling ringan untuk UMKM.",
  ];
  if (risk !== "rendah") {
    notes.push("Bila omzet mendekati atau melewati Rp4,8 miliar, wajib dikukuhkan sebagai PKP: terbit faktur pajak & lapor SPT Masa PPN bulanan.");
  } else {
    notes.push("Jika omzet melewati Rp4,8 miliar/tahun, wajib PKP: faktur pajak PPN 11% & SPT Masa bulanan.");
  }
  notes.push("Kewajiban rutin: lapor SPT Tahunan via e-Filing Coretax (deadline 31 Maret untuk orang pribadi, 30 April untuk badan) + LKPM berkala di OSS.");
  if (halal) {
    notes.push("Produk makanan/minuman wajib bersertifikat halal sesuai UU JPH — subsidi kuota UMKM 100% tersedia via SEHATI.");
  }
  return notes;
}

function buildIncentives(halal?: boolean): string[] {
  const inc = [
    "Subsidi kuota Sertifikasi Halal 100% untuk UMKM (BPJPH) — bila memproduksi/jual produk makan-minum",
    "Insentif pajak PPh final 0,5% untuk omzet ≤ Rp4,8 miliar",
    "Akses program pemerintah: PNM Mekaar, KUR, dan pembinaan UMKM Daerah",
  ];
  if (halal) inc.unshift("Prioritas masuk katalog produk halal & akses pasar Muslim global (miliaran konsumen)");
  return inc;
}

function buildFaq(code: string, title: string, risk: KbliRisk, cat: string, halal?: boolean): KbliFaq[] {
  const faq: KbliFaq[] = [
    {
      q: `Apa itu KBLI ${code} ${title}?`,
      a: `KBLI ${code} adalah kode klasifikasi bidang usaha resmi (Klasifikasi Baku Lapangan Usaha Indonesia) untuk kegiatan ${title.toLowerCase()}. Kode ini wajib dipilih saat pendaftaran NIB via OSS-RBA — dan menentukan jenis izin, tingkat risiko, serta kewajiban pajak usaha Anda.`,
    },
    {
      q: `Izin apa saja yang dibutuhkan untuk KBLI ${code}?`,
      a: risk === "rendah"
        ? `Karena KBLI ${code} termasuk kelompok risiko RENDAH, Anda cukup menerbitkan NIB via OSS-RBA dengan pernyataan mandiri — prosesnya cepat (1 hari kerja) dan murah. Namun cek juga izin khusus yang mungkin relevan dengan aktivitas spesifik usaha Anda.`
        : `KBLI ${code} termasuk kelompok ${RISK_META[risk].label}. Anda butuh NIB + ${risk === "menengah-rendah" ? "Sertifikat Standar (pernyataan mandiri)" : risk === "menengah-tinggi" ? "Sertifikat Standar yang terverifikasi instansi" : "izin/persetujuan khusus pemerintah"}. Tim PusatPerizinan.com bisa mengurus seluruh alurnya sampai terbit.`,
    },
  ];

  if (halal) {
    faq.push({
      q: `Apakah KBLI ${code} wajib sertifikasi halal?`,
      a: `Ya — bila usaha Anda memproduksi, mengolah, atau menjual produk makanan/minuman, sertifikasi halal WAJIB sesuai UU JPH (Penyelenggaraan Produk Halal). Kabar baiknya: UMKM bisa dapat subsidi kuota 100% via program SEHATI BPJPH. Kami bantu prosesnya dari pengisian PPP sampai label halal terbit.`,
    });
  } else if (cat === "dagang" || cat === "informasi") {
    faq.push({
      q: `Apakah KBLI ${code} cocok untuk toko online / marketplace?`,
      a: `KBLI ${code} sangat relevan untuk aktivitas ${title.toLowerCase()}. Untuk jualan online penuh, banyak pelaku usaha menggabungkan kode ini dengan KBLI 47911 (perdagangan eceran media daring). Pastikan juga platform digital Anda terdaftar PSE Komdigi bila punya website/aplikasi sendiri.`,
    });
  } else {
    faq.push({
      q: `Apakah KBLI ${code} bisa untuk ikut tender & pinjaman bank?`,
      a: `Bisa — dengan NIB yang aktif dan LKPM terlaporkan rutin, usaha Anda legal penuh untuk: ikut tender, mengajukan kredit bank, kerja sama korporat, dan program pemerintah. Pastikan badan usahanya sesuai kebutuhan (PT/CV untuk tender besar, perseorangan cukup untuk skala kecil).`,
    });
  }

  faq.push({
    q: `Bagaimana cara mengurus KBLI ${code}?`,
    a: `Caranya mudah: (1) konsultasi gratis dengan tim kami untuk memastikan kode ini (dan KBLI pendukungnya) paling optimal untuk pajak & modal Anda, (2) siapkan KTP & NPWP, (3) kami daftarkan via OSS-RBA sampai NIB terbit, (4) Anda dapat panduan kewajiban pasca-terbit (LKPM, pajak). Proses dominan online — tanpa harus ke kantor kami di SCBD.`,
  });

  return faq;
}

function buildKbliPages(): KbliPage[] {
  return KBLI_RAW.map((raw) => {
    const category = KBLI_CATEGORIES.find((c) => c.id === raw.cat) ?? KBLI_CATEGORIES[0];
    const riskMeta = RISK_META[raw.risk];
    const slug = `${raw.c}-${slugify(raw.t)}`;

    const extraLicenses = (raw.lic ?? []).map((name) => ({
      name,
      note: "Izin khusus sektor ini — tim kami berpengalaman mengurusnya di seluruh Indonesia.",
    }));

    const licenses = [...riskMeta.licenses, ...extraLicenses];

    // Related KBLI: 3 lainnya dalam satu kategori
    const relatedKbli = KBLI_RAW.filter((r) => r.cat === raw.cat && r.c !== raw.c)
      .slice(0, 3)
      .map((r) => ({ code: r.c, slug: `${r.c}-${slugify(r.t)}`, title: r.t }));

    return {
      code: raw.c,
      slug,
      title: `KBLI ${raw.c} ${raw.t} — Izin, Risiko & Cara Pengurusan`,
      h1: `KBLI ${raw.c} — ${raw.t}`,
      metaDesc: `KBLI ${raw.c} (${raw.t}): arti, tingkat risiko ${riskMeta.label.toLowerCase()}, izin yang dibutuhkan (${licenses.map((l) => l.name.split("(")[0].trim()).slice(0, 2).join(", ")}), kewajiban pajak & cara pengurusan via OSS-RBA. Panduan lengkap 2025.`,
      category,
      risk: raw.risk,
      riskLabel: riskMeta.label,
      desc: raw.d,
      includes: raw.inc,
      licenses,
      taxNotes: buildTaxNotes(raw.risk, raw.halal),
      incentives: buildIncentives(raw.halal),
      faq: buildFaq(raw.c, raw.t, raw.risk, raw.cat, raw.halal),
      relatedServices: CATEGORY_SERVICES[raw.cat] ?? [{ slug: "nib", title: "NIB & OSS-RBA" }],
      relatedKbli,
      keywords: [
        `kbli ${raw.c}`,
        `kbli ${raw.c} ${raw.t.toLowerCase()}`,
        `izin ${raw.t.toLowerCase()}`,
        `kbli ${raw.t.toLowerCase()}`,
        `${raw.t.toLowerCase()} kbli berapa`,
        `biaya izin ${raw.t.toLowerCase()}`,
        `kbli ${raw.c} izin apa saja`,
      ],
    };
  });
}

export const KBLI_PAGES: KbliPage[] = buildKbliPages();

const KBLI_MAP = new Map(KBLI_PAGES.map((p) => [p.code, p]));

export function getKbliPage(code: string): KbliPage | undefined {
  return KBLI_MAP.get(code);
}

export function getKbliBySlug(slug: string): KbliPage | undefined {
  const code = slug.split("-")[0];
  const page = KBLI_MAP.get(code);
  return page && page.slug === slug ? page : undefined;
}

export function getAllKbliSlugs(): string[] {
  return KBLI_PAGES.map((p) => p.slug);
}

export function searchKbli(query: string): KbliPage[] {
  const q = query.toLowerCase().trim();
  if (!q) return KBLI_PAGES.slice(0, 12);
  return KBLI_PAGES.filter(
    (p) =>
      p.code.includes(q) ||
      p.h1.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q) ||
      p.category.name.toLowerCase().includes(q)
  ).slice(0, 24);
}

export { KBLI_CATEGORIES, KBLI_TOTAL };
