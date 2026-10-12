import raw from "@/data/layanan-500.json";

// ============================================================
// PUSATPERIZINAN.COM — KATALOG 500 LAYANAN (Single Source of Truth)
// ============================================================
// Sumber: Dataset_500_Layanan_Pusatperizinan.json (edisi Oktober 2025).
// 500 layanan aktif · 4 kategori besar · 38 sub-kategori · kode item
// terstruktur (BU-PT-001 ... SK-PU-012) · kupon diskon bertingkat 10-30%.
//
// ATURAN:
//  - Angka agregat DIHITUNG DINAMIS dari data — jangan hardcode.
//  - Slug halaman detail = segmen terakhir `tautan` (URL root level).
//  - Semua konsumen (katalog, sitemap, JSON-LD) WAJIB lewat helper di sini.
// ============================================================

export interface Layanan500 {
  no: number;
  /** Kode item unik, mis. "BU-PT-001". */
  kode: string;
  nama: string;
  kategori: string;
  kategori_kode: string;
  sub: string;
  sub_kode: string;
  harga: number;
  /** Persentase kupon, mis. 0.25 = 25%. */
  diskon: number;
  harga_diskon: number;
  hemat: number;
  deskripsi: string;
  /** URL referensi dataset — slug halaman = segmen terakhir. */
  tautan: string;
}

export const LAYANAN_500: Layanan500[] = raw as Layanan500[];

/** Ambil slug URL dari baris layanan. */
export function slugOf(s: Layanan500): string {
  return s.tautan.split("/").filter(Boolean).pop() as string;
}

const BY_SLUG = new Map<string, Layanan500>(LAYANAN_500.map((s) => [slugOf(s), s]));
const BY_KODE = new Map<string, Layanan500>(LAYANAN_500.map((s) => [s.kode, s]));

export function getLayananBySlug(slug: string): Layanan500 | undefined {
  return BY_SLUG.get(slug);
}

export function getLayananByKode(kode: string): Layanan500 | undefined {
  return BY_KODE.get(kode);
}

export const ALL_LAYANAN_SLUGS: string[] = LAYANAN_500.map(slugOf);

// ------------------------------------------------------------
// STRUKTUR KATEGORI & SUB-KATEGORI
// ------------------------------------------------------------

export interface LayananSubKategori {
  kode: string;
  nama: string;
  layanan: Layanan500[];
}

export interface LayananKategori {
  kode: string;
  nama: string;
  sub: LayananSubKategori[];
  total: number;
}

function buildKategori(): LayananKategori[] {
  const map = new Map<string, LayananKategori>();
  for (const s of LAYANAN_500) {
    let k = map.get(s.kategori_kode);
    if (!k) {
      k = { kode: s.kategori_kode, nama: s.kategori, sub: [], total: 0 };
      map.set(s.kategori_kode, k);
    }
    let sk = k.sub.find((x) => x.kode === s.sub_kode);
    if (!sk) {
      sk = { kode: s.sub_kode, nama: s.sub, layanan: [] };
      k.sub.push(sk);
    }
    sk.layanan.push(s);
    k.total += 1;
  }
  for (const k of map.values()) k.sub.sort((a, b) => a.kode.localeCompare(b.kode));
  return [...map.values()].sort((a, b) => a.kode.localeCompare(b.kode));
}

export const LAYANAN_KATEGORI: LayananKategori[] = buildKategori();

// ------------------------------------------------------------
// STATISTIK DINAMIS
// ------------------------------------------------------------

export const LAYANAN_STATS = {
  total: LAYANAN_500.length,
  kategori: LAYANAN_KATEGORI.length,
  subKategori: LAYANAN_KATEGORI.reduce((n, k) => n + k.sub.length, 0),
  hargaMin: Math.min(...LAYANAN_500.map((s) => s.harga_diskon)),
  hargaMax: Math.max(...LAYANAN_500.map((s) => s.harga)),
  totalHemat: LAYANAN_500.reduce((n, s) => n + s.hemat, 0),
  diskonMax: Math.max(...LAYANAN_500.map((s) => Math.round(s.diskon * 100))),
  diskonMin: Math.min(...LAYANAN_500.map((s) => Math.round(s.diskon * 100))),
} as const;

// ------------------------------------------------------------
// FORMAT & KONTEN SEO
// ------------------------------------------------------------

/** Format angka → "Rp 3.380.000" (id-ID, deterministik — aman SSR). */
export function fmtIdr(n: number): string {
  return `Rp ${new Intl.NumberFormat("id-ID").format(n)}`;
}

/** Rentang harga katalog: "Rp 210 ribu – Rp 130,5 juta". */
export function fmtRentang(min: number, max: number): string {
  const unit = (v: number): string => {
    if (v >= 1_000_000_000) {
      const m = v / 1_000_000_000;
      return `${Number.isInteger(m) ? m : m.toFixed(1).replace(".", ",")} miliar`;
    }
    if (v >= 1_000_000) {
      const j = v / 1_000_000;
      return `${Number.isInteger(j) ? j : j.toFixed(1).replace(".", ",")} juta`;
    }
    return `${v / 1_000} ribu`;
  };
  return `Rp ${unit(min)} – ${unit(max)}`;
}

/** Estimasi durasi proses per kategori (untuk konten SEO & FAQ). */
const TIMELINE_KATEGORI: Record<string, string> = {
  BU: "1–14 hari kerja (NIB 1 hari; pendirian PT/CV 3–7 hari; restrukturisasi 7–14 hari)",
  LH: "14–90 hari kerja (SPPL 3–5 hari; UKL-UPL 2–4 minggu; AMDAL 4–9 bulan sesuai skala)",
  KP: "3 hari–3 bulan (NIB/PIRT 1–3 hari; notifikasi kosmetik 2–4 minggu; izin edar MD 1–3 bulan)",
  SK: "1–30 hari kerja (PBG 7–14 hari; API 3–5 hari; izin OJK/fintech 30–60 hari sesuai regulator)",
};

export function timelineOf(s: Layanan500): string {
  return TIMELINE_KATEGORI[s.kategori_kode] ?? "3–14 hari kerja sesuai kompleksitas";
}

/** Cakupan kerja standar per kategori — dipakai di halaman detail. */
const CAKUPAN_KATEGORI: Record<string, string[]> = {
  BU: [
    "Konsultasi pemilihan KBLI & struktur badan usaha yang tepat",
    "Penyusunan & pengesahan akta notaris di notaris mitra resmi",
    "Pengurusan SK Kemenkumham, NPWP Badan, dan NIB via OSS-RBA",
    "Pendampingan perizinan turunan sesuai bidang usaha",
    "Pemantauan status & pengarsipan digital seluruh dokumen",
  ],
  LH: [
    "Kajian awal penentuan jenis dokumen lingkungan (SPPL/UKL-UPL/AMDAL)",
    "Penyusunan dokumen oleh tim ahli MGL bersertifikat",
    "Koordinasi pengujian laboratorium terakreditasi KAN",
    "Pendampingan evaluasi komisi penilai & rapat publik",
    "Pemantauan persetujuan lingkungan hingga terbit",
  ],
  KP: [
    "Klasifikasi produk & penentuan jalur registrasi yang tepat",
    "Persiapan berkas sesuai standar regulator (BPOM/BPJPH/BSN/Dinkes)",
    "Pendampingan uji laboratorium & audit fasilitas",
    "Korespondensi dengan regulator sampai nomor izin terbit",
    "Pengarsipan dokumen & pengingat jadwal perpanjangan",
  ],
  SK: [
    "Pemetaan perizinan sektoral sesuai KBLI & aktivitas operasional",
    "Penyusunan dokumen teknis & administratif lengkap",
    "Koordinasi lintas instansi (kementerian teknis, DPMPTSP, lembaga)",
    "Pendampingan inspeksi/verifikasi lapangan bila diperlukan",
    "Laporan progres berkala & arsip digital dokumen terbit",
  ],
};

export function cakupanOf(s: Layanan500): string[] {
  return CAKUPAN_KATEGORI[s.kategori_kode] ?? [
    "Konsultasi kebutuhan & pemetaan dokumen",
    "Penyusunan berkas lengkap sesuai standar instansi",
    "Pengurusan hingga izin terbit",
    "Pendampingan pasca terbit & pengarsipan digital",
  ];
}

/** Syarat umum per kategori — dipakai di halaman detail. */
const SYARAT_KATEGORI: Record<string, string[]> = {
  BU: [
    "KTP & NPWP seluruh pendiri/pemegang saham",
    "Alamat domisili usaha (bisa virtual office)",
    "Bidang usaha / rencana KBLI",
    "Modal dasar & komposisi saham (untuk PT/PMA)",
  ],
  LH: [
    "NIB & dokumen badan usaha aktif",
    "Data teknis kegiatan (kapasitas produksi, lokasi, luas lahan)",
    "Dokumen kepemilikan/sewa lahan (KKPR bila tersedia)",
    "Rencana lokasi & denah kegiatan",
  ],
  KP: [
    "NIB & NPWP badan usaha",
    "Data formulasi produk & label kemasan",
    "Dokumen fasilitas produksi/gudang",
    "Analisis lab (bila diwajibkan regulator — kami bantu koordinasi)",
  ],
  SK: [
    "NIB & dokumen badan usaha aktif",
    "Dokumen teknis sesuai sektor (SBU, SKTTK, sertifikat kompetensi, dll.)",
    "Bukti kepemilikan/izin sarana (kendaraan, gedung, peralatan)",
    "Kualifikasi personel (bila diwajibkan regulator)",
  ],
};

export function syaratOf(s: Layanan500): string[] {
  return SYARAT_KATEGORI[s.kategori_kode] ?? ["Dokumen identitas & badan usaha", "Data teknis kegiatan usaha"];
}

/** Layanan terkait: se-sub-kategori dulu, lalu se-kategori. */
export function relatedOf(s: Layanan500, limit = 6): Layanan500[] {
  const sameSub = LAYANAN_500.filter((x) => x.sub_kode === s.sub_kode && x.kode !== s.kode);
  const sameKat = LAYANAN_500.filter((x) => x.kategori_kode === s.kategori_kode && x.sub_kode !== s.sub_kode);
  return [...sameSub, ...sameKat].slice(0, limit);
}

// ------------------------------------------------------------
// FAQ TEMPLATED PER HALAMAN DETAIL (unik via nama/kode/harga)
// ------------------------------------------------------------

export interface LayananFaq {
  q: string;
  a: string;
}

export function faqOf(s: Layanan500): LayananFaq[] {
  return [
    {
      q: `Berapa biaya jasa pengurusan ${s.nama}?`,
      a: `Jasa konsultan ${s.nama} adalah ${fmtIdr(s.harga)} (harga normal). Dengan kupon diskon bertingkat edisi ini Anda hanya membayar ${fmtIdr(s.harga_diskon)} — hemat ${fmtIdr(s.hemat)} (${Math.round(s.diskon * 100)}%). Sebutkan kode item ${s.kode} saat konsultasi agar kupon langsung dipotong dari penawaran resmi.`,
    },
    {
      q: `Berapa lama proses ${s.nama} berlangsung?`,
      a: `Estimasi proses: ${timelineOf(s)}. Estimasi berlaku untuk kondisi dokumen lengkap dan tanpa komplikasi; setiap progres kami laporkan berkala hingga dokumen terbit.`,
    },
    {
      q: `Apa saja syarat mengurus ${s.nama}?`,
      a: `Syarat utama: ${syaratOf(s).join("; ")}. Daftar lengkap per kasus kami konfirmasikan saat konsultasi gratis — tim kami menyesuaikan dengan kondisi dokumen Anda.`,
    },
    {
      q: `Apakah harga ${s.nama} sudah termasuk biaya resmi pemerintah?`,
      a: `Belum. Angka ${fmtIdr(s.harga_diskon)} adalah jasa pengurusan (tenaga kerja konsultan). PNBP, retribusi daerah, notaris/pengesahan, dan pengujian laboratorium dihitung terpisah lalu kami kunci transparan di penawaran resmi sebelum kerja dimulai.`,
    },
    {
      q: `Apakah ${s.nama} bisa diurus di luar kota saya?`,
      a: `Ya. Kami melayani seluruh 38 provinsi Indonesia lewat koordinasi DPMPTSP daerah, kementerian teknis, dan notaris mitra lokal. Tanda tangan bisa elektronik atau kirim-terima dokumen — Anda tidak perlu datang ke kantor kami.`,
    },
    {
      q: `Apakah ada garansi untuk ${s.nama}?`,
      a: `Ada — garansi proses: dokumen dikerjakan sesuai check-list yang disepakati dan bila proses tersendat karena faktor internal tim kami, pengerjaan berlanjut tanpa biaya tambahan hingga izin terbit. Data Anda dilindungi perjanjian kerahasiaan.`,
    },
  ];
}

// ------------------------------------------------------------
// HELPERS PEMASARAN
// ------------------------------------------------------------

/** Teks WhatsApp pra-isi per layanan. */
export function waTextOf(s: Layanan500): string {
  return `Halo PusatPerizinan.com, saya tertarik dengan layanan ${s.nama} (kode item ${s.kode}). Mohon info harga kupon ${fmtIdr(s.harga_diskon)} dan estimasi prosesnya. Terima kasih.`;
}

/** Label kupon: "Hemat 25%". */
export function diskonLabel(s: Layanan500): string {
  return `Hemat ${Math.round(s.diskon * 100)}%`;
}

/** Badge nilai: harga kupon < 1jt = "TERMURAH DI KELASNYA" dst. */
export function nilaiBadge(s: Layanan500): string | null {
  if (s.harga_diskon <= 1_000_000) return "PALING TERJANGKAU";
  if (s.diskon >= 0.25) return "KUPON TERBESAR";
  if (s.harga >= 25_000_000) return "PAKET ENTERPRISE";
  return null;
}
