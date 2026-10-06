// ============================================================
// PUSATPERIZINAN.COM — Generator Katalog Virtual Office
// 1.168 halaman programatik: paket × lokasi × keperluan × kota
//   × area × provinsi × panduan (zero thin content)
// Murni TS (tanpa DB/AI) — konsisten dengan generators.ts
// ============================================================

import type { ServicePage, ServiceFaq } from "./types";
import {
  VO_PACKAGES,
  VO_LOCATIONS,
  VO_PURPOSES,
  VO_CITIES,
  VO_AREAS,
  VO_GUIDES,
  type VoPackage,
  type VoLocation,
  type VoPurpose,
  type VoCity,
  type VoArea,
  type VoGuide,
} from "@/lib/virtual-office-data";
import { PROVINCES } from "@/lib/coverage-data";

const WA_LINK = "https://wa.me/6281269999910";
const VO_AUTHORITY = "OSS-RBA + KPP/DJP + Kemenkumham (koordinasi sesuai kebutuhan)";
const VO_LEGAL = "UU Cipta Kerja & PP 5/2021 (OSS-RBA); praktik PPA sesuai hukum perjanjian Indonesia; kepatuhan PKP sesuai UU KUP & PMK terkait";

// ------------------------------------------------------------
// HELPER LOKAL (hindari circular import dengan generators)
// ------------------------------------------------------------

export function voSlugify(text: string): string {
  return text.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

function capMeta(text: string, max = 300): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastStop = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("— "), cut.lastIndexOf(", "));
  return (lastStop > max * 0.6 ? cut.slice(0, lastStop) : cut.replace(/[,;\s]+$/, "")) + ".";
}

function fmtHargaTahun(n: number): string {
  if (n >= 1_000_000) {
    const juta = (n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 2).replace(".", ",").replace(/,00$/, "");
    return `Rp ${juta}jt/thn`;
  }
  return `Rp ${Math.round(n / 1000)}rb/thn`;
}

function fmtHargaBulan(n: number): string {
  if (n >= 1_000_000) {
    const juta = (n / 1_000_000).toFixed(1).replace(".", ",");
    return `Rp ${juta}jt/bln`;
  }
  return `Rp ${Math.round(n / 1000)}rb/bln`;
}

function hargaPaketDiLokasi(pkg: VoPackage, multiplier: number): { yearly: number; monthly: number } {
  const raw = pkg.priceNumeric >= 1_000_000 ? pkg.priceNumeric * multiplier : pkg.priceNumeric; // meeting room per jam tidak didiskon
  const yearly = Math.max(250_000, Math.round(raw / 50_000) * 50_000);
  const monthly = Math.max(100_000, Math.round(yearly / 12 / 25_000) * 25_000);
  return { yearly, monthly };
}

const VO_AUDIENCE = ["UMKM", "Startup", "PT/CV", "PT PMA & Investor"];
const TIER_LABEL: Record<VoLocation["tier"], string> = {
  premium: "Lokasi Premium",
  bisnis: "Lokasi Bisnis",
  smart: "Lokasi Smart-Ekonomis",
};

function breadcrumbBeranda(): { name: string; href: string } {
  return { name: "Beranda", href: "/" };
}

const CRUMB_VO = { name: "Virtual Office", href: "/virtual-office" } as const;

// ------------------------------------------------------------
// A. HALAMAN INDUK PAKET (6) — kind "base"
// ------------------------------------------------------------

function buildVoPackageBase(pkg: VoPackage): ServicePage {
  const premium = VO_LOCATIONS.filter((l) => l.tier === "premium").slice(0, 5);
  const nLoc = VO_LOCATIONS.length;
  const harga = hargaPaketDiLokasi(pkg, 1);
  const slug = `virtual-office-${pkg.id}`;

  return {
    slug,
    kind: "base",
    category: "virtual-office",
    title: `${pkg.name} — Harga, Fasilitas & ${nLoc} Lokasi 2026`,
    h1: pkg.name,
    desc: pkg.desc,
    metaDesc: capMeta(
      `${pkg.name}: ${pkg.desc} Mulai ${fmtHargaTahun(harga.yearly)} (${fmtHargaBulan(harga.monthly)}) di ${nLoc} lokasi Indonesia — SCBD, Sudirman, BSD, Bandung, Surabaya, Bali. Aktif ${pkg.duration}. Konsultasi & aktivasi via WhatsApp.`
    ),
    intro: `${pkg.desc} Paket ini tersedia di ${nLoc} lokasi kami di ${VO_CITIES.length} kota & 38 provinsi — dari SCBD Jakarta hingga Bali, Batam dan Makassar. Semua lokasi adalah gedung nyata dengan resepsionis, papan nama usaha, dan layanan penerimaan surat yang tercatat — bukan alamat papan nama liar.`,
    longDesc: [
      pkg.desc,
      `Yang membedakan paket ${pkg.name} kami dari pasar: (1) harga transparan — semua fitur inti termasuk, tanpa biaya SKDU/papan nama/surat tersembunyi; (2) perjanjian resmi tertulis dengan tanda tangan elektronik yang sah untuk NIB, PKP, bank & BKPM; (3) terintegrasi jasa perizinan — bila Anda butuh NIB, PKP, halal atau BPOM, tim legal yang sama yang mengurus, sehingga dokumen alamat dan perizinan selalu konsisten.`,
      `Lokasi paling diminati untuk paket ini: ${premium.map((l) => l.name).join(", ")}, dan ${nLoc - premium.length} lokasi lainnya di seluruh Indonesia. Aktivasi cepat — ${pkg.duration} sejak dokumen lengkap, 100% proses daring dengan kurir dokumen bila perlu. Garansi: bila dokumen alamat kami ditolak instansi karena kesalahan proses kami, uang kembali 100%.`,
    ],
    price: fmtHargaTahun(harga.yearly),
    priceNumeric: harga.yearly,
    duration: pkg.duration,
    audience: VO_AUDIENCE,
    features: pkg.features,
    requirements: pkg.requirements,
    steps: pkg.steps,
    faq: [
      ...pkg.faq,
      {
        q: `Lokasi mana yang paling cocok untuk ${pkg.name}?`,
        a: `Tergantung tujuan: SCBD/Sudirman/Thamrin untuk kredibilitas korporat & investor maksimal; TB Simatupang/BSD/Gatot Subroto untuk keseimbangan citra & harga; Kemang/Depok/Bandung untuk ekosistem kreatif; kota lain untuk kedekatan pasar lokal. Harga menyesuaikan tier lokasi (premium 100%, bisnis 55-85%, smart 40-65%) — peta lengkap & harganya ada di halaman ini.`,
      },
    ],
    keywords: [...pkg.keywords, `${pkg.name.toLowerCase()} harga`, `${pkg.name.toLowerCase()} lokasi`, "virtual office 2026"],
    legalBasis: VO_LEGAL,
    authority: VO_AUTHORITY,
    related: [],
    breadcrumbs: [breadcrumbBeranda(), CRUMB_VO, { name: pkg.name, href: `/layanan/${slug}` }],
  };
}

// ------------------------------------------------------------
// B. PAKET × LOKASI (6 × 48 = 288) — kind "vo"
// ------------------------------------------------------------

function buildVoPackageLocation(pkg: VoPackage, loc: VoLocation): ServicePage {
  const slug = `virtual-office-${pkg.id}-${loc.slug}`;
  const { yearly, monthly } = hargaPaketDiLokasi(pkg, loc.multiplier);
  const sibling = VO_LOCATIONS.filter((l) => l.city === loc.city && l.slug !== loc.slug);

  return {
    slug,
    kind: "vo",
    category: "virtual-office",
    parent: `virtual-office-${pkg.id}`,
    title: `${pkg.name} di ${loc.name} — ${fmtHargaTahun(yearly)} (2026)`,
    h1: `${pkg.name} di ${loc.name}`,
    desc: `${pkg.desc} Alamat: ${loc.address}.`,
    metaDesc: capMeta(
      `${pkg.name} di ${loc.name}, ${loc.city}: ${fmtHargaTahun(yearly)} / ${fmtHargaBulan(monthly)}. Gedung nyata di ${loc.address} — resepsionis, papan nama & penerimaan surat. Dekat ${loc.landmark}. Aktif ${pkg.duration}. Konsultasi gratis!`
    ),
    intro: `${pkg.name} dengan alamat ${loc.building}, ${loc.address} — ${TIER_LABEL[loc.tier]} dengan harga ${fmtHargaTahun(yearly)} (setara ${fmtHargaBulan(monthly)}). ${loc.note} Lokasi ini dikelilingi ${loc.landmark} — nama yang langsung dikenali klien, bank & mitra Anda.`,
    longDesc: [
      `${pkg.desc} Di lokasi ${loc.name}, paket ini bekerja penuh: perjanjian pakai alamat resmi untuk NIB/OSS-RBA, PKP di KPP, pembukaan rekening bank, Google Business Profile, sampai pendaftaran marketplace. Resepsionis menelepon dengan nama usaha Anda, dan setiap surat/paket yang datang dinotifikasikan ke WhatsApp Anda dengan foto label.`,
      `Akses & sekitar: ${loc.transport.join("; ")}. Landmark terdekat: ${loc.landmark}. Fasilitas gedung yang bisa Anda pakai: ${loc.facilities.slice(0, 4).join(", ").toLowerCase()}. Untuk pertemuan klien, tersedia meeting room di lokasi (booking per jam, jatah gratis untuk pelanggan paket bulanan/tahunan).`,
      `${sibling.length > 0 ? `Lokasi alternatif di ${loc.city}: ${sibling.map((s) => s.name).join(", ")}. ` : ""}Semua harga sudah termasuk papan nama (sesuai paket), layanan surat, dan dukungan koordinasi verifikasi — tanpa biaya tersembunyi. Bila dokumen alamat ditolak instansi karena kesalahan proses kami, garansi uang kembali 100%.`,
    ],
    price: fmtHargaTahun(yearly),
    priceNumeric: yearly,
    duration: pkg.duration,
    audience: VO_AUDIENCE,
    features: [...pkg.features.slice(0, 4), `Alamat: ${loc.address}`, `Fasilitas: ${loc.facilities.slice(0, 3).join(", ")}`],
    requirements: [...pkg.requirements, "Tidak ada biaya keanggotaan — bayar per periode yang Anda pilih"],
    steps: pkg.steps,
    faq: [
      {
        q: `Berapa ${pkg.name} di ${loc.name}?`,
        a: `${fmtHargaTahun(yearly)} atau ${fmtHargaBulan(monthly)} untuk ${loc.name} (${TIER_LABEL[loc.tier]}, ${loc.city}). Harga sudah termasuk seluruh fitur paket — perjanjian resmi, penerimaan surat, dan ${pkg.features[0].toLowerCase()} — tanpa biaya tersembunyi. Pembayaran tahunan lebih hemat dibanding bulanan.`,
      },
      {
        q: `Apakah alamat ${loc.address} bisa untuk NIB, PKP & rekening bank?`,
        a: `Bisa — alamat ini gedung nyata dengan resepsionis dan papan nama (sesuai paket), dilengkapi perjanjian pakai alamat + surat keterangan domisili yang diterima OSS-RBA, KPP/DJP, mayoritas bank, dan marketplace. Untuk kebutuhan PKP, paket yang tepat adalah VO Plus Pajak (papan nama + koordinasi survei KPP termasuk).`,
      },
      ...pkg.faq.slice(0, 1),
      {
        q: `Bagaimana saya atau klien menuju lokasi ${loc.name}?`,
        a: `${loc.transport.join("; ")}. Alamat lengkap: ${loc.address}. Bila klien mampir tanpa jadwal, resepsionis kami menerima mereka atas nama usaha Anda — dan Anda bisa booking meeting room di lokasi yang sama untuk pertemuan formal.`,
      },
    ],
    keywords: [
      `${pkg.name.toLowerCase()} ${loc.name.toLowerCase()}`,
      `virtual office ${loc.city.toLowerCase()}`,
      `sewa alamat ${loc.areaSlug.replace(/-/g, " ")}`,
      `${pkg.name.toLowerCase()} ${loc.city.toLowerCase()} harga`,
      "alamat bisnis 2026",
    ],
    legalBasis: VO_LEGAL,
    authority: VO_AUTHORITY,
    region: `${loc.name}, ${loc.city}`,
    related: [],
    breadcrumbs: [
      breadcrumbBeranda(),
      CRUMB_VO,
      { name: pkg.name, href: `/layanan/virtual-office-${pkg.id}` },
      { name: loc.name, href: `/layanan/${slug}` },
    ],
  };
}

// ------------------------------------------------------------
// C. PAKET × KOTA (6 × 28 = 168) — kind "vo"
// ------------------------------------------------------------

function buildVoPackageCity(pkg: VoPackage, city: VoCity): ServicePage {
  const slug = `virtual-office-${pkg.id}-di-${city.slug}`;
  const locs = city.locations.map((s) => VO_LOCATIONS.find((l) => l.slug === s)).filter((l): l is VoLocation => Boolean(l));
  const base = locs.find((l) => l.tier === "smart") ?? locs[0];
  const harga = hargaPaketDiLokasi(pkg, base?.multiplier ?? 0.6);

  return {
    slug,
    kind: "vo",
    category: "virtual-office",
    parent: `virtual-office-${pkg.id}`,
    title: `${pkg.name} di ${city.name} — Mulai ${fmtHargaTahun(harga.yearly)}`,
    h1: `${pkg.name} di ${city.name}`,
    desc: `${pkg.desc} Tersedia di ${locs.length} lokasi ${city.name}.`,
    metaDesc: capMeta(
      `${pkg.name} di ${city.name}, ${city.province}: mulai ${fmtHargaTahun(harga.yearly)} di ${locs.length} lokasi (${locs.map((l) => l.name).join(", ")}). ${city.note} Aktif ${pkg.duration} — konsultasi gratis via WhatsApp.`
    ),
    intro: `${pkg.name} di ${city.name}, ${city.province} — tersedia di ${locs.length} lokasi kami: ${locs.map((l) => l.name).join(", ")}. ${city.note} Permintaan virtual office di ${city.name}: ${city.demand.toLowerCase()}.`,
    longDesc: [
      `${pkg.desc} Untuk usaha yang beroperasi di ${city.name}, paket ini memberi legalitas alamat yang diterima OSS-RBA, KPP, bank dan marketplace — dengan harga menyesuaikan tier lokasi yang Anda pilih (mulai ${fmtHargaTahun(harga.yearly)} untuk lokasi paling efisien).`,
      `${city.note} Pilih lokasi berdasarkan strategi Anda: lokasi premium untuk citra maksimal di depan klien korporat, lokasi smart-ekonomis untuk efisiensi UMKM. Semua lokasi tetap memiliki standar yang sama: resepsionis nyata, penerimaan surat tercatat, dan perjanjian alamat resmi.`,
      `Kami juga melayani seluruh kabupaten sekitar ${city.name} — proses 100% daring, dokumen dikirim digital, dan bila klien Anda berkunjung, meeting room bisa dibooking per jam di lokasi terdekat. Aktivasi ${pkg.duration} sejak dokumen lengkap, dengan garansi uang kembali 100% bila dokumen alamat ditolak karena kesalahan proses kami.`,
    ],
    price: fmtHargaTahun(harga.yearly),
    priceNumeric: harga.yearly,
    duration: pkg.duration,
    audience: VO_AUDIENCE,
    features: [
      ...pkg.features.slice(0, 4),
      `${locs.length} pilihan lokasi di ${city.name}`,
      "Bisa ganti lokasi 1x gratis pada kontrak tahunan",
    ],
    requirements: pkg.requirements,
    steps: pkg.steps,
    faq: [
      {
        q: `Berapa biaya ${pkg.name} di ${city.name}?`,
        a: `Mulai ${fmtHargaTahun(harga.yearly)} (${fmtHargaBulan(harga.monthly)}) untuk lokasi paling efisien di ${city.name}, dan naik untuk lokasi premium. Semua harga terbuka di halaman ini per lokasi — tanpa biaya tersembunyi, dan pembayaran tahunan lebih hemat.`,
      },
      {
        q: `Lokasi apa saja yang tersedia di ${city.name}?`,
        a: `${locs.map((l) => `${l.name} (${TIER_LABEL[l.tier]})`).join("; ")}. Setiap lokasi punya halaman detail lengkap dengan harga & fasilitasnya — klik lokasi di atas untuk detail.`,
      },
      ...pkg.faq.slice(0, 2),
    ],
    keywords: [
      `${pkg.name.toLowerCase()} di ${city.name.toLowerCase()}`,
      `virtual office ${city.name.toLowerCase()} 2026`,
      `sewa alamat kantor ${city.name.toLowerCase()}`,
      `alamat bisnis ${city.name.toLowerCase()} ${city.province.toLowerCase()}`,
    ],
    legalBasis: VO_LEGAL,
    authority: VO_AUTHORITY,
    region: city.name,
    related: [],
    breadcrumbs: [
      breadcrumbBeranda(),
      CRUMB_VO,
      { name: pkg.name, href: `/layanan/virtual-office-${pkg.id}` },
      { name: city.name, href: `/layanan/${slug}` },
    ],
  };
}

// ------------------------------------------------------------
// D. KEPERLUAN × LOKASI (8 × 48 = 384) — kind "vo"
// ------------------------------------------------------------

function buildVoPurposeLocation(purpose: VoPurpose, loc: VoLocation): ServicePage {
  const slug = `vo-untuk-${purpose.id}-${loc.slug}`;
  const bestPkg = VO_PACKAGES.find((p) => p.id === purpose.bestPackage) ?? VO_PACKAGES[0];
  const { yearly, monthly } = hargaPaketDiLokasi(bestPkg, loc.multiplier);

  return {
    slug,
    kind: "vo",
    category: "virtual-office",
    parent: `virtual-office-${bestPkg.id}`,
    title: `${purpose.name} di ${loc.name} — ${fmtHargaTahun(yearly)} (2026)`,
    h1: `${purpose.name} di ${loc.name}`,
    desc: `${purpose.desc} Rekomendasi paket: ${bestPkg.name}.`,
    metaDesc: capMeta(
      `${purpose.name} menggunakan alamat ${loc.name}, ${loc.city}: ${fmtHargaTahun(yearly)} dengan paket ${bestPkg.name}. Gedung nyata di ${loc.address}, dokumen resmi untuk ${purpose.name.toLowerCase()}. Konsultasi & aktivasi cepat via WhatsApp!`
    ),
    intro: `${purpose.name} dengan alamat ${loc.name} (${loc.address}) — ${loc.note} Paket yang kami rekomendasikan untuk keperluan ini: ${bestPkg.name} sebesar ${fmtHargaTahun(yearly)} di lokasi ini (${fmtHargaBulan(monthly)}/bulan).`,
    longDesc: [
      purpose.long,
      `Kenapa lokasi ${loc.name} cocok untuk ${purpose.name.toLowerCase()}: alamatnya gedung nyata dengan resepsionis (${loc.facilities.slice(0, 3).join(", ").toLowerCase()} tersedia), akses mudah via ${loc.transport[0].toLowerCase()}, dan nama ${loc.landmark} memperkuat profil usaha Anda di dokumen, marketplace, dan profil Google Business. ${loc.note}`,
      `Dokumen yang Anda terima: perjanjian pakai alamat tertulis, surat keterangan domisili, dan (sesuai paket) foto papan nama — semua konsisten untuk ${purpose.name.toLowerCase()}. ${purpose.requirements.length > 0 ? `Yang perlu Anda siapkan: ${purpose.requirements.slice(0, 3).join("; ").toLowerCase()}.` : ""} Aktivasi ${bestPkg.duration} — dan bila butuh perizinan lanjutan (NIB, PKP, halal, BPOM), tim legal yang sama mengurusnya dalam satu ekosistem.`,
    ],
    price: fmtHargaTahun(yearly),
    priceNumeric: yearly,
    duration: bestPkg.duration,
    audience: VO_AUDIENCE,
    features: [
      ...purpose.requirements.map((r) => `Tersedia: ${r}`),
      `Paket rekomendasi: ${bestPkg.name} (${bestPkg.features[0].toLowerCase()})`,
      `Alamat premium: ${loc.building}, ${loc.city}`,
    ],
    requirements: purpose.requirements,
    steps: bestPkg.steps,
    faq: [
      ...purpose.faq,
      {
        q: `Paket apa yang tepat untuk ${purpose.name.toLowerCase()} di ${loc.name}?`,
        a: `${bestPkg.name} — ${bestPkg.desc} Di ${loc.name}, harganya ${fmtHargaTahun(yearly)} (${fmtHargaBulan(monthly)}/bulan). Bila kebutuhan Anda berkembang (misal dari alamat saja ke PKP), upgrade ke paket lebih tinggi bisa dilakukan kapan pun tanpa ganti alamat.`,
      },
      {
        q: `Apakah alamat ${loc.name} tampak profesional di dokumen?`,
        a: `Ya — alamat lengkapnya ${loc.address}, dekat ${loc.landmark}. Nama kawasan ini dikenal luas sehingga dokumen Anda (kartu nama, profil perusahaan, invoice) langsung terlihat kredibel.`,
      },
    ],
    keywords: [
      `${purpose.name.toLowerCase()} ${loc.city.toLowerCase()}`,
      `${purpose.keywords[0]} ${loc.city.toLowerCase()}`,
      `alamat ${loc.areaSlug.replace(/-/g, " ")} untuk usaha`,
      `${purpose.keywords[1] ?? purpose.keywords[0]} 2026`,
    ],
    legalBasis: VO_LEGAL,
    authority: VO_AUTHORITY,
    region: `${loc.name}, ${loc.city}`,
    related: [],
    breadcrumbs: [
      breadcrumbBeranda(),
      CRUMB_VO,
      { name: purpose.name, href: `/virtual-office#keperluan` },
      { name: loc.name, href: `/layanan/${slug}` },
    ],
  };
}

// ------------------------------------------------------------
// E. KEPERLUAN × KOTA (8 × 28 = 224) — kind "vo"
// ------------------------------------------------------------

function buildVoPurposeCity(purpose: VoPurpose, city: VoCity): ServicePage {
  const slug = `vo-untuk-${purpose.id}-di-${city.slug}`;
  const locs = city.locations.map((s) => VO_LOCATIONS.find((l) => l.slug === s)).filter((l): l is VoLocation => Boolean(l));
  const bestPkg = VO_PACKAGES.find((p) => p.id === purpose.bestPackage) ?? VO_PACKAGES[0];
  const base = locs.find((l) => l.tier === "smart") ?? locs[0];
  const harga = hargaPaketDiLokasi(bestPkg, base?.multiplier ?? 0.6);

  return {
    slug,
    kind: "vo",
    category: "virtual-office",
    parent: `virtual-office-${bestPkg.id}`,
    title: `${purpose.name} di ${city.name} — ${locs.length} Lokasi, Mulai ${fmtHargaTahun(harga.yearly)}`,
    h1: `${purpose.name} di ${city.name}`,
    desc: `${purpose.desc} ${locs.length} lokasi tersedia di ${city.name}, ${city.province}.`,
    metaDesc: capMeta(
      `${purpose.name} di ${city.name}: alamat resmi dari ${fmtHargaTahun(harga.yearly)} di ${locs.length} lokasi (${locs.map((l) => l.name).join(", ")}). Paket ${bestPkg.name} — dokumen lengkap untuk ${purpose.name.toLowerCase()}. Konsultasi gratis!`
    ),
    intro: `${purpose.name} di ${city.name}, ${city.province} — pilih dari ${locs.length} lokasi kami: ${locs.map((l) => l.name).join(", ")}. ${city.note}`,
    longDesc: [
      `${purpose.long} Di ${city.name}, semua keperluan ini kami layani dengan dokumen yang konsisten: perjanjian alamat, surat keterangan domisili, dan koordinasi verifikasi bila instansi memanggil.`,
      `${city.note} Untuk ${purpose.name.toLowerCase()}, kami rekomendasikan ${bestPkg.name} — ${bestPkg.desc} Harga menyesuaikan lokasi: mulai ${fmtHargaTahun(harga.yearly)} (${fmtHargaBulan(harga.monthly)}/bulan) di ${base?.name ?? city.name}.`,
      `Alur aktivasi: konsultasi gratis via WhatsApp → pilih lokasi & paket → kirim dokumen digital → aktivasi (${bestPkg.duration}) → dokumen alamat siap dipakai untuk ${purpose.name.toLowerCase()}. Butuh perizinan lanjutan di ${city.name} (NIB, PKP, halal, BPOM, PBG)? Satu tim, satu WhatsApp — semua diurus.`,
    ],
    price: fmtHargaTahun(harga.yearly),
    priceNumeric: harga.yearly,
    duration: bestPkg.duration,
    audience: VO_AUDIENCE,
    features: [
      ...bestPkg.features.slice(0, 3),
      `Tersedia di ${locs.length} lokasi ${city.name}`,
      `Direkomendasikan untuk: ${purpose.name}`,
    ],
    requirements: purpose.requirements,
    steps: bestPkg.steps,
    faq: [
      ...purpose.faq,
      {
        q: `Berapa biaya ${purpose.name.toLowerCase()} di ${city.name}?`,
        a: `Mulai ${fmtHargaTahun(harga.yearly)} (${fmtHargaBulan(harga.monthly)}/bulan) dengan paket ${bestPkg.name} di lokasi paling efisien ${city.name}. Harga naik untuk lokasi premium — semua terbuka di halaman lokasi, tanpa biaya tersembunyi.`,
      },
      {
        q: `Lokasi mana di ${city.name} yang terbaik untuk ${purpose.name.toLowerCase()}?`,
        a: `Untuk citra maksimal pilih lokasi ${TIER_LABEL.premium.toLowerCase()}; untuk efisiensi pilih ${TIER_LABEL.smart.toLowerCase()} seperti ${base?.name ?? city.name}. Semua lokasi memberi dokumen legal yang sama kuatnya — perbedaannya di nama kawasan & harga. Konsultasi gratis untuk memilih yang paling pas.`,
      },
    ],
    keywords: [
      `${purpose.name.toLowerCase()} ${city.name.toLowerCase()}`,
      ...purpose.keywords.slice(0, 2).map((k) => `${k} ${city.name.toLowerCase()}`),
      `alamat bisnis ${city.name.toLowerCase()} 2026`,
    ],
    legalBasis: VO_LEGAL,
    authority: VO_AUTHORITY,
    region: city.name,
    related: [],
    breadcrumbs: [
      breadcrumbBeranda(),
      CRUMB_VO,
      { name: purpose.name, href: `/virtual-office#keperluan` },
      { name: city.name, href: `/layanan/${slug}` },
    ],
  };
}

// ------------------------------------------------------------
// F. KOTA HUB (28) — kind "vo"
// ------------------------------------------------------------

function buildVoCityHub(city: VoCity): ServicePage {
  const slug = `virtual-office-di-${city.slug}`;
  const locs = city.locations.map((s) => VO_LOCATIONS.find((l) => l.slug === s)).filter((l): l is VoLocation => Boolean(l));
  const cheapest = locs.reduce((acc, l) => (l.multiplier < acc.multiplier ? l : acc), locs[0]);
  const cheapestPkg = VO_PACKAGES[0];
  const harga = hargaPaketDiLokasi(cheapestPkg, cheapest.multiplier);

  return {
    slug,
    kind: "vo",
    category: "virtual-office",
    title: `Virtual Office di ${city.name} — ${locs.length} Lokasi, Mulai ${fmtHargaTahun(harga.yearly)}`,
    h1: `Virtual Office di ${city.name}`,
    desc: `${locs.length} lokasi virtual office di ${city.name}, ${city.province} — ${locs.map((l) => l.name).join(", ")}. Mulai ${fmtHargaTahun(harga.yearly)}.`,
    metaDesc: capMeta(
      `Virtual office di ${city.name}, ${city.province}: ${locs.length} lokasi gedung nyata mulai ${fmtHargaTahun(harga.yearly)}/thn. Alamat untuk NIB, PKP, bank & marketplace — resepsionis & penerimaan surat. ${city.note} Konsultasi gratis!`
    ),
    intro: `Virtual office di ${city.name}, ${city.province} — ${locs.length} lokasi gedung nyata: ${locs.map((l) => l.name).join(", ")}. Mulai ${fmtHargaTahun(harga.yearly)} per tahun (${fmtHargaBulan(harga.monthly)}/bulan) dengan paket Virtual Office Address. ${city.note}`,
    longDesc: [
      `Permintaan virtual office di ${city.name} berada di level ${city.demand.toLowerCase()} — ${city.note} Setiap lokasi kami di ${city.name} adalah gedung nyata dengan resepsionis, penerimaan surat tercatat, dan perjanjian alamat resmi yang diterima OSS-RBA, KPP/DJP, bank, dan marketplace.`,
      `6 paket tersedia untuk semua lokasi: Virtual Office Address (mulai ${fmtHargaTahun(harga.yearly)} di ${cheapest.name}), VO Plus Pajak untuk PKP, VO + Pendirian PT bundle, Serviced Office untuk tim yang butuh kantor fisik, Meeting Room per jam, dan VO PPA untuk PT PMA. Semua harga transparan per lokasi — tanpa biaya tersembunyi.`,
      `Kenapa pelaku usaha ${city.name} memilih kami: (1) satu tim untuk alamat + perizinan + pajak — dokumen selalu konsisten; (2) aktivasi 1-2 hari kerja, 100% daring; (3) garansi uang kembali 100% bila dokumen alamat ditolak karena kesalahan proses kami; (4) support WhatsApp tetap aktif setelah aktivasi. Bila Anda berkembang ke kota lain (atau ke Jakarta), pindah lokasi 1x gratis pada kontrak tahunan.`,
    ],
    price: fmtHargaTahun(harga.yearly),
    priceNumeric: harga.yearly,
    duration: "Aktif 1-2 hari kerja",
    audience: VO_AUDIENCE,
    features: [
      `${locs.length} lokasi di ${city.name}: ${locs.map((l) => l.name).join(", ")}`,
      "6 paket: Address, Plus Pajak (PKP), + Pendirian PT, Serviced, Meeting Room, PMA",
      "Perjanjian alamat resmi untuk NIB, PKP, bank & marketplace",
      "Penerimaan surat + notifikasi WhatsApp real-time",
      "Ganti lokasi 1x gratis pada kontrak tahunan",
    ],
    requirements: [
      "KTP pemilik/pengurus usaha",
      "NPWP (pribadi/badan — bisa kami bantu)",
      "Nama usaha yang akan memakai alamat",
      "Tidak perlu datang ke lokasi — proses 100% daring",
    ],
    steps: [
      `Chat WhatsApp kami: sebutkan kebutuhan virtual office di ${city.name}`,
      "Pilih lokasi & paket dengan bantuan konsultasi gratis",
      "Kirim dokumen digital — verifikasi 1 hari kerja",
      "Tanda tangan perjanjian alamat elektronik",
      "Aktivasi: surat domisili + panduan Google Business + papan nama",
    ],
    faq: [
      {
        q: `Berapa harga virtual office di ${city.name}?`,
        a: `Mulai ${fmtHargaTahun(harga.yearly)} (${fmtHargaBulan(harga.monthly)}/bulan) untuk paket Virtual Office Address di ${cheapest.name} (${TIER_LABEL[cheapest.tier]}). Lokasi & paket lain berbeda harga sesuai tier — semua terbuka di halaman ini. Pembayaran tahunan lebih hemat 15-25%.`,
      },
      {
        q: `Lokasi apa saja yang tersedia di ${city.name}?`,
        a: `${locs.map((l) => `${l.name} — ${l.address} (${TIER_LABEL[l.tier]})`).join("; ")}. Setiap lokasi punya halaman detail dengan harga per paket, akses & fasilitas lengkap.`,
      },
      {
        q: `Apakah alamat bisa untuk PKP & rekening bank di ${city.name}?`,
        a: `Bisa. Semua lokasi kami memberi perjanjian alamat resmi + surat keterangan domisili. Untuk PKP, gunakan paket VO Plus Pajak (papan nama + koordinasi survei KPP termasuk) — dan untuk rekening bank, paket Address sudah cukup di mayoritas bank. Konsultasikan profil usaha Anda gratis.`,
      },
      {
        q: `Berapa lama aktivasi virtual office di ${city.name}?`,
        a: `1-2 hari kerja sejak dokumen lengkap — 100% proses daring. Perjanjian elektronik sah, surat domisili dikirim digital, dan papan nama terpasang dalam 1-2 hari kerja berikutnya (sesuai paket).`,
      },
      {
        q: `Apakah melayani kabupaten sekitar ${city.name}?`,
        a: `Ya — alamat di ${city.name} sah untuk usaha yang beroperasi di mana pun, termasuk kabupaten sekitar ${city.province}. Proses tetap 100% daring dan kurir dokumen tersedia bila diperlukan.`,
      },
    ],
    keywords: [
      `virtual office ${city.name.toLowerCase()}`,
      `sewa alamat kantor ${city.name.toLowerCase()}`,
      `virtual office ${city.province.toLowerCase()} 2026`,
      `alamat bisnis ${city.name.toLowerCase()} murah`,
      `virtual office untuk pkp ${city.name.toLowerCase()}`,
    ],
    legalBasis: VO_LEGAL,
    authority: VO_AUTHORITY,
    region: city.name,
    related: [],
    breadcrumbs: [
      breadcrumbBeranda(),
      CRUMB_VO,
      { name: city.name, href: `/layanan/${slug}` },
    ],
  };
}

// ------------------------------------------------------------
// G. AREA HUB (18) — kind "vo"
// ------------------------------------------------------------

function buildVoAreaHub(area: VoArea): ServicePage {
  const slug = `virtual-office-area-${area.slug}`;
  const locs = area.locations.map((s) => VO_LOCATIONS.find((l) => l.slug === s)).filter((l): l is VoLocation => Boolean(l));
  const base = locs[0];
  const harga = hargaPaketDiLokasi(VO_PACKAGES[0], base?.multiplier ?? 0.8);

  return {
    slug,
    kind: "vo",
    category: "virtual-office",
    title: `Virtual Office ${area.name} — Alamat ${area.city} Mulai ${fmtHargaTahun(harga.yearly)}`,
    h1: `Virtual Office ${area.name}`,
    desc: `Alamat bisnis di kawasan ${area.name}, ${area.city} — segmen: ${area.profile}. Mulai ${fmtHargaTahun(harga.yearly)}/thn.`,
    metaDesc: capMeta(
      `Virtual office ${area.name}, ${area.city}: alamat gedung nyata mulai ${fmtHargaTahun(harga.yearly)}/thn. Segmen kawasan: ${area.profile}. Perjanjian resmi untuk NIB, PKP, bank & marketplace. Konsultasi gratis via WhatsApp!`
    ),
    intro: `Virtual office di kawasan ${area.name}, ${area.city} (${area.province}) — kawasan dengan profil: ${area.profile}. ${area.note} Harga mulai ${fmtHargaTahun(harga.yearly)} per tahun dengan paket Virtual Office Address.`,
    longDesc: [
      `${area.name} adalah salah satu kawasan paling dicari di ${area.city} untuk alamat bisnis — profilnya: ${area.profile}. ${area.note} Memakai alamat ${area.name} di kartu nama, website, dan dokumen legal memberi sinyal kualitas yang langsung terbaca oleh klien, bank dan mitra.`,
      `Akses kawasan: ${area.transport.join("; ")}. Lokasi kami di kawasan ini: ${locs.map((l) => `${l.name} (${l.address})`).join("; ")}. Semua dengan resepsionis nyata, penerimaan surat + notifikasi WhatsApp, dan perjanjian alamat resmi untuk NIB, PKP, rekening bank serta marketplace.`,
      `Paket yang tersedia di ${area.name}: Virtual Office Address mulai ${fmtHargaTahun(harga.yearly)}, VO Plus Pajak untuk kebutuhan PKP, bundling Pendirian PT, Serviced Office, Meeting Room per jam, dan PPA untuk PT PMA. Harga transparan, aktivasi 1-2 hari kerja, dan garansi uang kembali 100% bila dokumen ditolak karena kesalahan proses kami.`,
    ],
    price: fmtHargaTahun(harga.yearly),
    priceNumeric: harga.yearly,
    duration: "Aktif 1-2 hari kerja",
    audience: VO_AUDIENCE,
    features: [
      `Kawasan ${area.name}: ${area.profile}`,
      `${locs.length} lokasi: ${locs.map((l) => l.name).join(", ")}`,
      "Akses: " + area.transport.join(", "),
      "Perjanjian alamat resmi + surat domisili",
      "Penerimaan surat + notifikasi WhatsApp",
    ],
    requirements: ["KTP pemilik/pengurus usaha", "NPWP (bisa kami bantu buat)", "Nama usaha yang memakai alamat"],
    steps: [
      "Konsultasi gratis via WhatsApp",
      `Pilih lokasi di kawasan ${area.name} & paket`,
      "Dokumen digital + verifikasi 1 hari",
      "Perjanjian alamat elektronik",
      `Aktivasi — alamat ${area.name} siap dipakai`,
    ],
    faq: [
      {
        q: `Kenapa memilih alamat kawasan ${area.name}?`,
        a: `${area.note} Untuk segmen ${area.profile.toLowerCase()}, nama kawasan ini sudah menjadi bagian dari kredibilitas usaha — klien, bank dan mitra mengenalinya seketika.`,
      },
      {
        q: `Berapa harga virtual office di ${area.name}?`,
        a: `Mulai ${fmtHargaTahun(harga.yearly)} (${fmtHargaBulan(harga.monthly)}/bulan) untuk paket Address. Lokasi di kawasan premium (${locs.filter((l) => l.tier === "premium").map((l) => l.name).join(", ") || "bila tersedia"}) berbeda harga sesuai tier — detailnya di halaman tiap lokasi.`,
      },
      {
        q: `Kawasan apa lain yang tersedia di ${area.city}?`,
        a: `Lihat halaman Virtual Office di ${area.city} untuk semua kawasan & lokasinya — plus perbandingan harga per tier (premium, bisnis, smart-ekonomis) agar Anda paling strategis dengan budget.`,
      },
    ],
    keywords: [
      `virtual office ${area.name.toLowerCase()}`,
      `sewa alamat ${area.name.toLowerCase()}`,
      `alamat bisnis ${area.city.toLowerCase()} ${area.name.toLowerCase()}`,
      "virtual office premium 2026",
    ],
    legalBasis: VO_LEGAL,
    authority: VO_AUTHORITY,
    region: `${area.name}, ${area.city}`,
    related: [],
    breadcrumbs: [
      breadcrumbBeranda(),
      CRUMB_VO,
      { name: area.city, href: `/layanan/virtual-office-di-${voSlugify(area.city)}` },
      { name: area.name, href: `/layanan/${slug}` },
    ],
  };
}

// ------------------------------------------------------------
// H. PROVINSI HUB (38) — kind "vo"
// ------------------------------------------------------------

function buildVoProvinceHub(provName: string): ServicePage | null {
  const prov = PROVINCES.find((p) => p.name === provName);
  if (!prov) return null;
  const provSlug = voSlugify(provName);
  const slug = `virtual-office-provinsi-${provSlug}`;
  const local = VO_LOCATIONS.filter((l) => l.province === provName);
  const islandLocs = VO_LOCATIONS.filter((l) => l.province !== provName && l.island === prov.island).slice(0, 3);
  const nearest = local.length > 0 ? local : islandLocs.length > 0 ? islandLocs : VO_LOCATIONS.filter((l) => l.tier === "premium").slice(0, 3);
  const cheapest = nearest.reduce((acc, l) => (l.multiplier < acc.multiplier ? l : acc), nearest[0]);
  const harga = hargaPaketDiLokasi(VO_PACKAGES[0], cheapest.multiplier);

  return {
    slug,
    kind: "vo",
    category: "virtual-office",
    title: `Virtual Office ${provName} — Alamat Bisnis Mulai ${fmtHargaTahun(harga.yearly)} (2026)`,
    h1: `Virtual Office di ${provName}`,
    desc: `Alamat bisnis resmi untuk seluruh ${provName} — ${nearest.length} lokasi terdekat: ${nearest.map((l) => l.name).join(", ")}. Mulai ${fmtHargaTahun(harga.yearly)}/thn.`,
    metaDesc: capMeta(
      `Virtual office untuk seluruh ${provName} (${prov.majors.slice(0, 3).join(", ")} & sekitarnya): mulai ${fmtHargaTahun(harga.yearly)}/thn. Perjanjian alamat resmi untuk NIB, PKP, bank & marketplace — 100% proses daring. ${prov.note}`
    ),
    intro: `Virtual office untuk seluruh ${provName} — meliputi ${prov.majors.join(", ")} dan kabupaten/kota lainnya. ${prov.note} Lokasi terdekat: ${nearest.map((l) => `${l.name} (${l.city})`).join(", ")}. Harga mulai ${fmtHargaTahun(harga.yearly)} per tahun.`,
    longDesc: [
      `Pelaku usaha di ${provName} memakai virtual office untuk tiga tujuan: legalitas alamat di NIB & dokumen perusahaan, kredibilitas di depan klien/bank/marketplace, dan perlindungan privasi alamat rumah. Proses 100% daring — Anda di mana pun di ${provName} (termasuk ${prov.majors.join(", ")}), alamat aktif dalam 1-2 hari kerja.`,
      `${prov.note} Lokasi yang paling relevan untuk ${provName}: ${nearest.map((l) => `${l.name} di ${l.city}`).join("; ")}. ${local.length > 0 ? `Semuanya berada langsung di ${provName}.` : `Semuanya dapat dijangkau dari ${provName} dengan proses yang sama karena layanan kami 100% daring.`}`,
      `Semua paket tersedia: Virtual Office Address mulai ${fmtHargaTahun(harga.yearly)}, VO Plus Pajak untuk PKP, bundling Pendirian PT/CV/PT Perorangan, Serviced Office, Meeting Room, dan PPA untuk PT PMA. Kombinasikan dengan jasa perizinan kami (NIB, halal, BPOM, merek, pajak) — satu tim, dokumen selalu konsisten, garansi uang kembali 100%.`,
    ],
    price: fmtHargaTahun(harga.yearly),
    priceNumeric: harga.yearly,
    duration: "Aktif 1-2 hari kerja",
    audience: VO_AUDIENCE,
    features: [
      `Melayani seluruh ${provName}: ${prov.majors.join(", ")} & kabupaten lain`,
      `Lokasi terdekat: ${nearest.map((l) => l.name).join(", ")}`,
      "6 paket lengkap: Address, Plus Pajak, + PT, Serviced, Meeting Room, PMA",
      "100% proses daring + kurir dokumen bila perlu",
      "Integrasi jasa perizinan & pajak satu tim",
    ],
    requirements: ["KTP pemilik/pengurus usaha", "NPWP (bisa kami bantu)", "Nama usaha", "Tidak perlu datang — proses daring"],
    steps: [
      "Konsultasi gratis via WhatsApp",
      "Pilih lokasi & paket",
      "Dokumen digital — verifikasi 1 hari",
      "Perjanjian alamat elektronik",
      "Aktivasi + surat domisili siap pakai",
    ],
    faq: [
      {
        q: `Apakah usaha di ${provName} boleh memakai alamat virtual office di kota lain?`,
        a: `Boleh — alamat kantor usaha sah berada di provinsi mana pun di Indonesia. Namun perhatikan: alamat menentukan KPP & DPMPTSP wilayah pendaftaran. Tim kami hitungkan implikasinya (pajak, perizinan daerah) di konsultasi gratis sebelum Anda memilih lokasi.`,
      },
      {
        q: `Berapa harga virtual office untuk ${provName}?`,
        a: `Mulai ${fmtHargaTahun(harga.yearly)} (${fmtHargaBulan(harga.monthly)}/bulan) untuk lokasi paling efisien yang relevan dengan ${provName}. Semua paket & lokasi terbuka harganya di halaman ini — tanpa biaya tersembunyi.`,
      },
      {
        q: `Apakah harus datang ke ${prov.majors[0]}?`,
        a: `Tidak perlu — proses 100% daring: dokumen dikirim digital, perjanjian elektronik sah, dan surat domisili dikirim digital. ${prov.note}`,
      },
    ],
    keywords: [
      `virtual office ${provName.toLowerCase()}`,
      `sewa alamat kantor ${provName.toLowerCase()}`,
      `alamat bisnis ${prov.majors[0]?.toLowerCase() ?? ""}`,
      `virtual office ${prov.majors[0]?.toLowerCase() ?? ""} 2026`,
    ],
    legalBasis: VO_LEGAL,
    authority: VO_AUTHORITY,
    region: provName,
    related: [],
    breadcrumbs: [breadcrumbBeranda(), CRUMB_VO, { name: provName, href: `/layanan/${slug}` }],
  };
}

// ------------------------------------------------------------
// I. PANDUAN (14) — kind "vo"
// ------------------------------------------------------------

function buildVoGuide(guide: VoGuide): ServicePage {
  const slug = `panduan-virtual-office-${guide.id}`;
  return {
    slug,
    kind: "vo",
    category: "virtual-office",
    title: `${guide.title} — PusatPerizinan.com`,
    h1: guide.title,
    desc: guide.desc,
    metaDesc: capMeta(`${guide.desc} ${guide.takeaways[0]} — panduan lengkap dari tim yang menangani 1.247+ klien virtual office & perizinan di 38 provinsi. Gratis, jujur, tanpa jargon.`),
    intro: guide.desc,
    longDesc: guide.long,
    price: "Gratis (panduan)",
    priceNumeric: 0,
    duration: "Waktu baca ±5 menit",
    audience: ["UMKM", "Startup", "PT/CV", "PT PMA & Investor"],
    features: guide.takeaways,
    requirements: [],
    steps: [],
    faq: guide.faq,
    keywords: guide.keywords,
    legalBasis: VO_LEGAL,
    authority: VO_AUTHORITY,
    related: [],
    breadcrumbs: [
      breadcrumbBeranda(),
      CRUMB_VO,
      { name: "Panduan", href: "/virtual-office#panduan" },
      { name: guide.title, href: `/layanan/${slug}` },
    ],
  };
}

// ------------------------------------------------------------
// BUILD ALL — agregasi katalog virtual office
// ------------------------------------------------------------

function buildAllVoPages(): ServicePage[] {
  const pages: ServicePage[] = [];

  // 1. Paket induk (6)
  for (const pkg of VO_PACKAGES) pages.push(buildVoPackageBase(pkg));

  // 2. Paket × 48 lokasi (288)
  for (const pkg of VO_PACKAGES) {
    for (const loc of VO_LOCATIONS) {
      pages.push(buildVoPackageLocation(pkg, loc));
    }
  }

  // 3. Paket × 30 kota (180)
  for (const pkg of VO_PACKAGES) {
    for (const city of VO_CITIES) {
      pages.push(buildVoPackageCity(pkg, city));
    }
  }

  // 4. Keperluan × 48 lokasi (384)
  for (const purpose of VO_PURPOSES) {
    for (const loc of VO_LOCATIONS) {
      pages.push(buildVoPurposeLocation(purpose, loc));
    }
  }

  // 5. Keperluan × 30 kota (240)
  for (const purpose of VO_PURPOSES) {
    for (const city of VO_CITIES) {
      pages.push(buildVoPurposeCity(purpose, city));
    }
  }

  // 6. Kota hub (28)
  for (const city of VO_CITIES) pages.push(buildVoCityHub(city));

  // 7. Area hub (18)
  for (const area of VO_AREAS) pages.push(buildVoAreaHub(area));

  // 8. Provinsi hub (38)
  for (const prov of PROVINCES) {
    const p = buildVoProvinceHub(prov.name);
    if (p) pages.push(p);
  }

  // 9. Panduan (14)
  for (const guide of VO_GUIDES) pages.push(buildVoGuide(guide));

  return pages;
}

export const VO_PAGES: ServicePage[] = buildAllVoPages();

// ------------------------------------------------------------
// HELPERS untuk halaman /virtual-office & interlink
// ------------------------------------------------------------

export function getVoPackageBySlug(slug: string): VoPackage | undefined {
  return VO_PACKAGES.find((p) => p.id === slug);
}

export function getVoLocationBySlug(slug: string): VoLocation | undefined {
  return VO_LOCATIONS.find((l) => l.slug === slug);
}

export function getVoLocationsByCity(citySlug: string): VoLocation[] {
  return VO_LOCATIONS.filter((l) => l.citySlug === citySlug);
}

export function getVoLocationsByArea(areaSlug: string): VoLocation[] {
  return VO_LOCATIONS.filter((l) => l.areaSlug === areaSlug);
}

export const VO_TOTAL_LOCATIONS = VO_LOCATIONS.length;
export const VO_TOTAL_CITIES = VO_CITIES.length;
export const VO_TOTAL_PACKAGES = VO_PACKAGES.length;
export const VO_TOTAL_PURPOSES = VO_PURPOSES.length;
export const VO_TOTAL_PAGES = VO_PAGES.length;

export { WA_LINK as VO_WA_LINK, VO_LEGAL, VO_AUTHORITY };
