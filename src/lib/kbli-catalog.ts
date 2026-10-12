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

    // metaDesc kaya konten spesifik kode (bukan boilerplate) — membedakan
    // kode-kode sekembar (mis. 41011 vs 41012) bagi mesin pencari & pembaca.
    const dTrim = raw.d.length > 150 ? raw.d.slice(0, 150).replace(/[,;\s]+\S*$/, "") + "…" : raw.d;
    const metaDesc =
      `KBLI ${raw.c} ${raw.t} — ${dTrim} ` +
      `Risiko ${riskMeta.label.toLowerCase()}; izin utama: ${raw.lic?.[0] ?? "NIB via OSS-RBA"}. ` +
      `Arti, syarat, pajak & cara pengurusan KBLI ${raw.c} di sini.`.slice(0, 310);

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
      metaDesc,
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

// ============================================================
// HALAMAN KATEGORI KBLI — /kbli/kategori/{id} (+17 halaman)
// Indeks semua kode dalam satu bidang + layanan terkait.
// ============================================================

import { CURRENT_YEAR } from "@/lib/site";

export interface KbliCategoryMember {
  code: string;
  slug: string;
  title: string;
  riskLabel: string;
}

export interface KbliCategoryPage {
  slug: string; // "kategori/{id}"
  id: string;
  name: string;
  letter: string;
  icon: string;
  title: string;
  h1: string;
  metaDesc: string;
  intro: string[];
  longDesc: string[];
  members: KbliCategoryMember[];
  riskSpread: { label: string; count: number }[];
  relatedServices: { slug: string; title: string }[];
  faq: KbliFaq[];
  keywords: string[];
}

const CATEGORY_NARRATIVE: Record<string, { intro: string[]; long: string[] }> = {
  pertanian: {
    intro: ["Bidang pertanian & peternakan adalah fondasi pangan nasional — dan salah satu bidang dengan perizinan paling ramah UMKM: mayoritas kegiatan budidaya berisiko rendah sehingga cukup NIB via OSS-RBA."],
    long: ["Untuk petani individu, NIB membuka akses kredit, program pemerintah, dan kontrak dengan pabrik/offtaker. Untuk grup usaha, koperasi sering menjadi wadah yang tepat. Produk olahan hasil tani (kemasan, tepung, olahan) naik kelas ke bidang pengolahan dengan kewajiban PIRT/BPOM dan halal."],
  },
  perikanan: {
    intro: ["Perikanan mencakup penangkapan dan budidaya — dari nelayan kapal kecil sampai tambak udang intensif dan hatchery. Sebagian kegiatan penangkapan menuntut izin khusus (SIPI) di luar perizinan berusaha basis risiko."],
    long: ["Budidaya air tawar adalah pintu masuk paling ringan untuk UMKM; tambak intensif dan pengolahan produk memerlukan perhatian pada izin lingkungan dan kualitas air. Produk perikanan olahan punya peluang ekspor besar — dokumen API-P, HS Code, dan sertifikat mutu menjadi krusial."],
  },
  pengolahan: {
    intro: ["Industri pengolahan adalah bidang dengan pilihan KBLI terbanyak — dari konveksi, pengolahan pangan, sampai komponen manufaktur. Perizinan mengikuti skala & dampak: NIB + sertifikat standar untuk sebagian besar, izin lingkungan untuk yang berdampak."],
    long: ["Pemain pangan wajib memahami jalur PIRT vs BPOM dan kewajiban halal; pemain non-pangan perlu memeriksa daftar wajib SNI. Untuk pasar B2B dan ekspor, sertifikasi sistem (ISO 9001/22000) sering menjadi syarat buyer. LKPM berkala wajib bagi NIB menengah-besar."],
  },
  listrik: {
    intro: ["Bidang listrik, gas & energi berada di kategori risiko menengah-tinggi ke atas — keamanan dan jaringan publik menjadi alasan verifikasi tambahan. Pemainnya: pembangkit, distribusi, jasa instalasi, dan energi terbarukan."],
    long: ["Instalasi pemanfaatan tenaga listrik menuntut SLO (Sertifikat Laik Operasi); pembangkit menuntut dokumen lingkungan yang lebih berat. Energi terbarukan (surya, bioenergi) mendapat dukungan regulasi — perizinan yang rapi membuka akses program & PPA."],
  },
  konstruksi: {
    intro: ["Konstruksi adalah bidang dengan standar teknis paling menonjol: selain NIB, kualifikasi dibuktikan lewat SBU LPJK dan sertifikat tenaga teknik (SKA/SKT). Tender dan kontrak korporat hampir selalu menuntut keduanya."],
    long: ["Urutan yang biasa dijalani: badan usaha (PT/CV) → NIB → pemetaan personel bersertifikat → SBU sesuai sub-bidang. Untuk proyek berisiko tinggi dan pekerja besar, SMK3 menjadi kewajiban. Bangunan yang dibangun sendiri juga butuh PBG."],
  },
  dagang: {
    intro: ["Perdagangan & e-commerce adalah bidang perizinan paling ringan — mayoritas berisiko rendah (NIB cukup). Tantangannya justru di detail: KBLI yang tepat untuk pola jualan (fisik vs online vs grosir), dan legalitas produk yang dijual."],
    long: ["Untuk importer perlu API-U dan pemahaman HS Code; untuk brand sendiri, pendaftaran merek adalah aset wajib. E-commerce dengan platform sendiri menambah kewajiban PSE Komdigi. Pajak: PPh final 0,5% untuk UMKM hingga ambang tertentu."],
  },
  transportasi: {
    intro: ["Transportasi & logistik perizinannya mengikuti moda: darat (Dishub), laut, udara — plus gudang & kurir yang tergabung dalam rantai logistik modern. NIB mencakup kegiatan, izin moda menilai armada & keselamatan."],
    long: ["Pemain last-mile (kurir) adalah yang paling ringan; armada angkutan barang butuh uji & registrasi kendaraan; forwarding internasional butuh API dan pemahaman bea cukai. Gudang skala besar menambah PBG dan potensi dokumen lingkungan."],
  },
  akomodasi: {
    intro: ["Akomodasi & makan-minum adalah bidang UMKM terpopuler — restoran, kafe, hotel, guesthouse. Mayoritas berisiko rendah-menengah; yang menentukan kesuksesan legalitasnya adalah rantai pendukung: PBG bangunan, izin lingkungan dapur, dan sertifikasi halal."],
    long: ["Restoran & kafe: NIB + halal + PBG + UKL-UPL sesuai skala. Hotel: menambah izin pariwisata (TDAU) dan standar fasilitas. Untuk yang produksi pangan kemasan, jalurnya bergeser ke bidang pengolahan (PIRT/BPOM)."],
  },
  informasi: {
    intro: ["Informasi & digital mencakup software house, portal, aplikasi, dan layanan cloud. Perizinannya ringan (NIB), tetapi lapisan sistem elektronik menambah kewajiban: PSE Komdigi dan kepatuhan UU PDP."],
    long: ["Software house yang mengerjakan proyek korporat cukup NIB + pajak yang rapi. Yang menjalankan platform dengan pengguna & data pribadi wajib PSE. Merek dan hak cipta software adalah aset IP yang perlu dikelola sejak awal."],
  },
  keuangan: {
    intro: ["Jasa keuangan adalah bidang dengan regulasi paling ketat (OJK) — sebagian besar kegiatan membutuhkan izin usaha khusus di luar OSS. Bagi pemain non-OJK (konsultan keuangan, fintech enabler), batas kegiatan harus dipetakan hati-hati."],
    long: ["Layanan yang tidak menampung dana publik (konsultasi, edukasi, teknologi pendukung) bisa berjalan dengan badan usaha biasa; yang menyentuh dana/likuiditas publik wajib izin OJK/Bappebti. Tax planning & kepatuhan pajak korporasi menjadi layanan pendukung utama."],
  },
  properti: {
    intro: ["Real estate mencakup pengembang, agen/broker, persewaan gedung, dan manajemen properti. Perizinan perusahaan ringan — yang berat justru dokumen bangunan & kawasan: PBG, SLF, dan dokumen lingkungan untuk kawasan besar."],
    long: ["Pengembang membutuhkan struktur PT yang rapi untuk kredit konstruksi; agen/broker butuh badan usaha + pajak yang benar untuk komisi korporat. Sewa gedung wajib memastikan PBG/SLF aktif agar operasi legal."],
  },
  profesional: {
    intro: ["Jasa profesional (konsultan, akuntan, arsitek, hukum) perizinannya ringan — NIB dan badan usaha yang sesuai. Kredibilitas dibangun lewat sertifikasi profesi dan sistem mutu, bukan izin berlapis."],
    long: ["Untuk melayani korporat: PT + NPWP + (bila diminta) PKP memuluskan kontrak & faktur. Untuk tender jasa, ISO 9001 dan sertifikat kompetensi sering menjadi pembeda skor. Kepatuhan pajak B2B adalah standar vendor list."],
  },
  persewaan: {
    intro: ["Persewaan & ketenagakerjaan mencakup sewa alat, penyewaan tenaga kerja (P3MI), dan jasa penunjang. Kegiatan yang melibatkan penempatan pekerja punya regulasi khusus dan izin tersendiri."],
    long: ["Sewa alat/alat berat: NIB + legalitas aset. Penyedia jasa penempatan PMI (P3MI) wajib izin KemenP2MI — bukan sekadar NIB. Kepatuhan LKPM & pajak menjadi kewajiban berjalan yang menentukan kredibilitas."],
  },
  pendidikan: {
    intro: ["Pendidikan mencakup formal (sekolah — umumnya yayasan) dan nonformal (bimbel, kursus, LPK). Badan usaha + izin operasional dari dinas terkait adalah kombinasi yang dibutuhkan."],
    long: ["Lembaga nonformal (bimbel/kursus) di bawah dinas pendidikan; LPK di bawah Disnaker; sekolah formal di bawah jalur yayasan + izin dinas. Edutech dengan platform menambah kewajiban PSE Komdigi. Sertifikat kompetensi (BNSP) menaikkan kredibilitas program."],
  },
  kesehatan: {
    intro: ["Kesehatan adalah bidang berisiko tinggi dengan verifikasi paling ketat: klinik & fasilitas butuh izin operasional Dinkes di atas perizinan berusaha; produk kesehatan lewat BPOM."],
    long: ["Klinik: badan usaha + NIB + izin operasional (sarana, personel STR/SIP). Distribusi alkes: izin distribusi (DAK/IDAK). Produksi/impor produk: izin edar BPOM per produk. Limbah medis B3 masuk kewajiban lingkungan."],
  },
  hiburan: {
    intro: ["Seni, hiburan & rekreasi mencakup produksi acara, studio, wisata, dan konten digital. Perizinan dasar ringan; kekhasannya ada pada izin lokasi/event dan PSE untuk platform konten."],
    long: ["Event organizer menambah kepatuhan perizinan event dari pemerintah daerah. Platform konten & streaming wajib PSE Komdigi. Merek melindungi nama grup/studio; hak cipta melindungi karya produksi."],
  },
  "jasa-lain": {
    intro: ["Bidang jasa lainnya menampung kegiatan yang tidak masuk kategori lain — dari salon, layanan perawatan, sampai jasa pendukung rumah tangga. Mayoritas berisiko rendah dan ramah UMKM."],
    long: ["Kunci legalitasnya: NIB yang benar + kepatuhan pajak + izin khusus bila menyentuh kesehatan (misal klinik kecantikan medis). Untuk jasa berbasis brand, merek menjadi pelindung utama reputasi."],
  },
};

function buildKbliCategoryPages(): KbliCategoryPage[] {
  const pages: KbliCategoryPage[] = [];
  for (const cat of KBLI_CATEGORIES) {
    const members = KBLI_PAGES.filter((p) => p.category.id === cat.id);
    if (members.length === 0) continue;
    const slug = `kategori/${cat.id}`;
    const narrative = CATEGORY_NARRATIVE[cat.id] ?? {
      intro: [`Bidang ${cat.name} mencakup ${members.length} kode KBLI yang kami ringkas lengkap dengan risiko & izinnya.`],
      long: [`Setiap kode di bidang ${cat.name} memiliki halaman detail sendiri: deskripsi kegiatan, cakupan, izin yang dibutuhkan, catatan pajak, dan FAQ.`],
    };

    // Distribusi risiko nyata dari member
    const riskMap = new Map<string, number>();
    for (const m of members) riskMap.set(m.riskLabel, (riskMap.get(m.riskLabel) ?? 0) + 1);
    const riskSpread = [...riskMap.entries()].map(([label, count]) => ({ label, count }));

    pages.push({
      slug,
      id: cat.id,
      name: cat.name,
      letter: cat.letter,
      icon: cat.icon,
      title: `KBLI Bidang ${cat.name} ${CURRENT_YEAR} — ${members.length} Kode & Izinnya`,
      h1: `Kode KBLI Bidang ${cat.name}`,
      metaDesc: `Daftar lengkap ${members.length} kode KBLI bidang ${cat.name.toLowerCase()} ${CURRENT_YEAR}: risiko, izin yang dibutuhkan, pajak & layanan pengurusan. Cari KBLI usaha Anda di sini.`,
      intro: narrative.intro,
      longDesc: [
        ...narrative.long,
        `Distribusi risiko di bidang ini: ${riskSpread.map((r) => `${r.count} kode ${r.label.toLowerCase()}`).join(", ")}. Skala risiko menentukan perizinan: risiko rendah cukup NIB, menengah butuh sertifikat standar, tinggi menuntut izin khusus & verifikasi instansi.`,
      ],
      members: members.map((m) => ({ code: m.code, slug: m.slug, title: m.h1, riskLabel: m.riskLabel })),
      riskSpread,
      relatedServices: CATEGORY_SERVICES[cat.id] ?? [{ slug: "nib", title: "NIB & OSS-RBA" }],
      faq: [
        {
          q: `Kode KBLI bidang ${cat.name.toLowerCase()} mana yang paling ramah UMKM?`,
          a: `Kode berisiko rendah adalah yang paling ramah — cukup NIB dengan pernyataan mandiri via OSS-RBA, terbit cepat, tanpa verifikasi tambahan. Gunakan pencarian di halaman ini dan periksa label risiko pada tiap kode.`,
        },
        {
          q: `Apakah satu usaha bisa punya beberapa KBLI di bidang ini sekaligus?`,
          a: `Ya — NIB dapat mencakup beberapa KBLI sesuai aktivitas nyata usaha Anda. Pemetaan KBLI yang tepat sejak awal penting: salah KBLI berarti mengulang proses. Kami bantu memetakannya di konsultasi gratis.`,
        },
        {
          q: `Bagaimana cara mengurus NIB untuk kegiatan di bidang ${cat.name.toLowerCase()}?`,
          a: `Via OSS-RBA: siapkan NIK, NPWP, dan data usaha — NIB terbit cepat untuk kegiatan berisiko rendah. Untuk kegiatan menengah-tinggi, sertifikat standar/izin menyusul sesuai risiko. Tim kami bisa mengurus penuh — Anda cukup siapkan dokumen dasar.`,
        },
      ],
      keywords: [
        `kbli ${cat.name.toLowerCase()}`,
        `daftar kbli ${cat.id}`,
        `kbli bidang ${cat.letter}`,
        `izin usaha ${cat.name.toLowerCase()} ${CURRENT_YEAR}`,
      ],
    });
  }
  return pages;
}

export const KBLI_CATEGORY_PAGES: KbliCategoryPage[] = buildKbliCategoryPages();

export function getKbliCategoryPage(slug: string): KbliCategoryPage | undefined {
  return KBLI_CATEGORY_PAGES.find((p) => p.slug === slug);
}

export { KBLI_CATEGORIES, KBLI_TOTAL };
