// ============================================================
// PUSATPERIZINAN.COM — GEO TAG DINAMIS (M05)
// ============================================================
// Masalah lama: meta geo.region "ID-JK" + geo.placename "Jakarta"
// hardcoded di layout untuk SEMUA halaman — halaman layanan
// provinsi (mis. /layanan/nib-jawa-barat) mengirim sinyal lokasi
// yang salah ke mesin pencari.
//
// Solusi: PROVINCE_GEO memetakan slug provinsi (konvensi slugify
// yang sama dengan src/lib/coverage-data.ts via lib/catalog/utils)
// ke kode ISO 3166-2:ID + nama + koordinat pusat provinsi
// (ibu kota provinsi). geoMetaForSlug() mengekstrak provinsi dari
// slug halaman layanan dan mengembalikan meta "other" siap pakai.
//
// Pemakaian di generateMetadata:
//   const geo = geoMetaForSlug(slug);
//   metadata.other = { ...geo }   // undefined → tidak diubah
// Halaman tanpa lokasi → undefined → geo default layout tetap.
// ============================================================

import { PROVINCES } from "@/lib/coverage-data";

export interface ProvinceGeo {
  /** Kode ISO 3166-2:ID resmi (mis. "ID-JB"). */
  region: string;
  /** Nama provinsi resmi. */
  name: string;
  /** Koordinat pusat provinsi (ibu kota), lat/lng desimal. */
  lat: number;
  lng: number;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

/** 38 provinsi (resmi pasca pemekaran Papua 2022) — urut alfabet. */
export const PROVINCE_GEO: Record<string, ProvinceGeo> = {
  "aceh": { region: "ID-AC", name: "Aceh", lat: 5.5483, lng: 95.3238 },
  "bali": { region: "ID-BA", name: "Bali", lat: -8.6705, lng: 115.2126 },
  "bengkulu": { region: "ID-BE", name: "Bengkulu", lat: -3.8004, lng: 102.2655 },
  "di-yogyakarta": { region: "ID-YO", name: "DI Yogyakarta", lat: -7.7956, lng: 110.3695 },
  "dki-jakarta": { region: "ID-JK", name: "DKI Jakarta", lat: -6.2088, lng: 106.8456 },
  "gorontalo": { region: "ID-GO", name: "Gorontalo", lat: 0.5433, lng: 123.0576 },
  "jambi": { region: "ID-JA", name: "Jambi", lat: -1.6101, lng: 103.6131 },
  "jawa-barat": { region: "ID-JB", name: "Jawa Barat", lat: -6.9175, lng: 107.6191 },
  "jawa-tengah": { region: "ID-JT", name: "Jawa Tengah", lat: -6.9667, lng: 110.4167 },
  "jawa-timur": { region: "ID-JI", name: "Jawa Timur", lat: -7.2575, lng: 112.7521 },
  "kalimantan-barat": { region: "ID-KB", name: "Kalimantan Barat", lat: -0.0263, lng: 109.3425 },
  "kalimantan-selatan": { region: "ID-KS", name: "Kalimantan Selatan", lat: -3.3186, lng: 114.5944 },
  "kalimantan-tengah": { region: "ID-KT", name: "Kalimantan Tengah", lat: -2.2088, lng: 113.9213 },
  "kalimantan-timur": { region: "ID-KI", name: "Kalimantan Timur", lat: -0.5011, lng: 117.1536 },
  "kalimantan-utara": { region: "ID-KU", name: "Kalimantan Utara", lat: 3.3131, lng: 117.5913 },
  "kepulauan-bangka-belitung": { region: "ID-BB", name: "Kepulauan Bangka Belitung", lat: -2.1291, lng: 106.1083 },
  "kepulauan-riau": { region: "ID-KR", name: "Kepulauan Riau", lat: 0.1921, lng: 104.5366 },
  "lampung": { region: "ID-LA", name: "Lampung", lat: -5.4292, lng: 105.2611 },
  "maluku": { region: "ID-MA", name: "Maluku", lat: -3.6954, lng: 128.1814 },
  "maluku-utara": { region: "ID-MU", name: "Maluku Utara", lat: 0.7906, lng: 127.3842 },
  "nusa-tenggara-barat": { region: "ID-NB", name: "Nusa Tenggara Barat", lat: -8.5833, lng: 116.1167 },
  "nusa-tenggara-timur": { region: "ID-NT", name: "Nusa Tenggara Timur", lat: -10.1772, lng: 123.5971 },
  "papua": { region: "ID-PA", name: "Papua", lat: -2.5916, lng: 140.669 },
  "papua-barat": { region: "ID-PB", name: "Papua Barat", lat: -0.8619, lng: 134.0619 },
  "papua-barat-daya": { region: "ID-PD", name: "Papua Barat Daya", lat: -0.8796, lng: 131.261 },
  "papua-pegunungan": { region: "ID-PE", name: "Papua Pegunungan", lat: -4.0869, lng: 138.9757 },
  "papua-selatan": { region: "ID-PS", name: "Papua Selatan", lat: -8.4894, lng: 140.3984 },
  "papua-tengah": { region: "ID-PT", name: "Papua Tengah", lat: -4.0536, lng: 136.9107 },
  "riau": { region: "ID-RI", name: "Riau", lat: 0.5071, lng: 101.4478 },
  "sulawesi-barat": { region: "ID-SR", name: "Sulawesi Barat", lat: -2.6764, lng: 118.8861 },
  "sulawesi-selatan": { region: "ID-SN", name: "Sulawesi Selatan", lat: -5.1477, lng: 119.4327 },
  "sulawesi-tengah": { region: "ID-ST", name: "Sulawesi Tengah", lat: -0.9017, lng: 119.8707 },
  "sulawesi-tenggara": { region: "ID-SG", name: "Sulawesi Tenggara", lat: -3.9985, lng: 122.5131 },
  "sulawesi-utara": { region: "ID-SA", name: "Sulawesi Utara", lat: 1.4748, lng: 124.8421 },
  "sumatera-barat": { region: "ID-SB", name: "Sumatera Barat", lat: -0.9471, lng: 100.4172 },
  "sumatera-selatan": { region: "ID-SS", name: "Sumatera Selatan", lat: -2.9761, lng: 104.7754 },
  "sumatera-utara": { region: "ID-SU", name: "Sumatera Utara", lat: 3.5952, lng: 98.6722 },
};

/** Slug provinsi diurutkan terpanjang-dulu (anti salah cocok: "sulawesi-barat" sebelum pola pendek). */
const PROVINCE_SLUGS = Object.keys(PROVINCE_GEO).sort((a, b) => b.length - a.length);

/** Map slug kota (dari PROVINCES.majors — dataset eksisting) → slug provinsi. */
const CITY_PROVINCE: Record<string, string> = Object.fromEntries(
  PROVINCES.flatMap((p) => {
    const provSlug = slugify(p.name);
    return provSlug in PROVINCE_GEO ? p.majors.map((c) => [slugify(c), provSlug] as const) : [];
  })
);

/**
 * Cari provinsi dari slug halaman.
 * 1) Cocokkan slug provinsi di segmen path mana pun, atau sebagai
 *    akhiran "-<provSlug>" dari segmen terakhir (mis. "nib-jawa-barat").
 * 2) Bila tidak ada, cocokkan slug kota (majors) di segmen terakhir
 *    (mis. "nib-bandung" → Jawa Barat).
 */
export function provinceFromSlug(slug: string): ProvinceGeo | undefined {
  const segments = slug.toLowerCase().split("/").filter(Boolean);
  for (const seg of segments) {
    for (const prov of PROVINCE_SLUGS) {
      if (seg === prov || seg.endsWith(`-${prov}`)) {
        return PROVINCE_GEO[prov];
      }
    }
  }
  const last = segments[segments.length - 1];
  if (last) {
    const provSlug = CITY_PROVINCE[last];
    if (provSlug) return PROVINCE_GEO[provSlug];
  }
  return undefined;
}

// Type alias (bukan interface) agar dapat implicit index signature —
// dipakai langsung sebagai metadata.other di Next Metadata.
export type GeoMeta = {
  "geo.region": string;
  "geo.placename": string;
  "geo.position": string;
  ICBM: string;
};

/**
 * Meta geo siap-merge ke metadata.other — undefined bila halaman tanpa lokasi.
 * Contoh pemetaan:
 *   "nib-jawa-barat"          → geo Jawa Barat (ID-JB)
 *   "alkes-aceh"              → geo Aceh (ID-AC)
 *   "tax-aset-sulawesi-barat" → geo Sulawesi Barat (ID-SR)
 *   "wilayah/bali"            → geo Bali (ID-BA)
 *   "nib-bandung"             → geo Jawa Barat (kota dari dataset majors)
 *   "nib" / "kategori/pajak"  → undefined (tanpa lokasi)
 */
export function geoMetaForSlug(slug: string): GeoMeta | undefined {
  const prov = provinceFromSlug(slug);
  if (!prov) return undefined;
  return {
    "geo.region": prov.region,
    "geo.placename": prov.name,
    "geo.position": `${prov.lat};${prov.lng}`,
    ICBM: `${prov.lat}, ${prov.lng}`,
  };
}
