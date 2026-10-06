// ============================================================
// PUSATPERIZINAN.COM — SITE CONFIG (Single Source of Truth)
// ============================================================
// SEMUA URL absolut, identitas bisnis, dan metrik trust WAJIB
// mengimpor dari file ini. DILARANG hardcode
// "https://pusatperizinan.com" di file lain.
//
// CANONICAL HOST DECISION (P0-01):
//   https://pusatperizinan.com  (apex, HTTPS, tanpa www)
//   Semua varian lain (www / http) WAJIB 301 ke host ini —
//   dikonfigurasi di .htaccess (hosting statis) / Caddy (self-host).
// ============================================================

/** Canonical host — satu-satunya bentuk URL yang diindeks. */
export const SITE_URL = "https://pusatperizinan.com";

/** Tahun berjalan untuk pola konten freshness ("Biaya & Proses 2026").
 *  Dihitung saat module load — generator tidak perlu diedit tiap tahun.
 *  CATATAN: hanya untuk pola freshness, BUKAN untuk mengubah
 *  sitasi regulasi (mis. PMHU 2/2026, PP 42/2024 — JANGAN disentuh). */
export const CURRENT_YEAR: number = new Date().getFullYear();

// ------------------------------------------------------------
// IDENTITAS & KONTAK (NAP — Name, Address, Phone)
// Satu definisi; dipakai schema, footer, halaman kontak, dan
// halaman lokasi agar entity consistency terjaga.
// ------------------------------------------------------------

export const SITE_NAME = "PusatPerizinan.com";
export const LEGAL_ENTITY = "PT Digital Bisnis Manajemen";

export const CONTACT = {
  phoneIntl: "+62-812-6999-9910",
  phoneDisplay: "0812-6999-9910",
  whatsapp: "6281269999910",
  email: "halo@pusatperizinan.com",
  address: {
    street: "Indonesia Stock Exchange Building, Tower 2, Lantai 5, SCBD Lot 13, Jl. Jend. Sudirman Kav. 52-53",
    city: "Jakarta Selatan",
    region: "DKI Jakarta",
    postalCode: "12190",
    country: "ID",
  },
  geo: { lat: -6.2249, lng: 106.809 },
  hours: "Senin–Sabtu, 08.00–20.00 WIB",
  foundingYear: "2024",
} as const;

// ------------------------------------------------------------
// METRIK TRUST (P0-05)
// ------------------------------------------------------------
// ⚠️ SATU-SATUNYA tempat angka-angka ini boleh didefinisikan.
// Nilai di bawah adalah klaim bisnis yang saat ini dipakai di
// seluruh situs — WAJIB diverifikasi/diperbarui owner dari data
// aktual (CRM + platform review) sebelum dipublikasikan.
// Ketidaksesuaian antar-halaman = sinyal trust negatif.
// ------------------------------------------------------------

export const TRUST_METRICS = {
  /** Rata-rata rating klien (skala 1–5) — dipakai schema + UI. */
  rating: "4.9",
  /** Jumlah ulasan yang menjadi dasar rating di atas. */
  reviewCount: "890",
  /** Jumlah klien terlayani (kumulatif). */
  clientsServed: "1.247",
  /** Jumlah izin berhasil diproses (kumulatif). */
  permitsIssued: "3.890",
  /** Jangkauan wilayah. */
  provinces: 38,
  cities: 514,
} as const;

/** URL absolut dari path relatif. */
export function absUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Harga string ("Rp 3,5jt" / "Rp 350rb") → number IDR utuh.
 *  Memperbaiki bug schema lama: "Rp 3,5jt" pernah diparse jadi "35". */
export function priceToIdr(price: string): number | null {
  const m = price.match(/([\d.,]+)\s*(jt|juta|rb|ribu|k)?/i);
  if (!m) return null;
  const raw = parseFloat(m[1].replace(/\./g, "").replace(",", "."));
  if (Number.isNaN(raw)) return null;
  const unit = (m[2] ?? "").toLowerCase();
  if (unit === "jt" || unit === "juta") return Math.round(raw * 1_000_000);
  if (unit === "rb" || unit === "ribu" || unit === "k") return Math.round(raw * 1_000);
  return Math.round(raw);
}
