// ============================================================
// PUSATPERIZINAN.COM — Data Perbandingan Badan Usaha (SEO)
// 12 halaman perbandingan × 10 entitas badan usaha
// Sumber regulasi: UU 40/2007, UU 6/2023 (Cipta Kerja),
// UU 18/2008 (KUHD), UU 16/2001 jo. UU 28/2004, UU 25/1992,
// UU 25/2007, Peraturan BKPM 5/2021, PP 23/2018 jo. PP 55/2022,
// UU HPP (PPh Badan 22%), PMK 128/2019, PMK 168/2023
// Murni TS (tanpa DB/AI) → aman untuk static export
// ============================================================

export interface ComparisonEntity {
  /** Nama singkat, mis. "PT" */
  name: string;
  /** Nama lengkap/formal, mis. "Perseroan Terbatas" */
  fullName: string;
  /** Emoji ikon */
  icon: string;
  /** Dasar hukum utama */
  legalBasis: string;
  /** Kepemilikan / struktur pemegang */
  ownership: string;
  /** Ketentuan modal minimum */
  minCapital: string;
  /** Tanggung jawab hukum pemilik */
  liability: string;
  /** Ringkasan perlakuan pajak */
  taxSummary: string;
  /** Rentang biaya pendirian realistis */
  setupCost: string;
  /** Estimasi durasi pendirian */
  setupDays: string;
  pros: string[];
  cons: string[];
  bestFor: string[];
}

export interface ComparisonTableRow {
  aspect: string;
  a: string;
  b: string;
}

export interface ComparisonFaq {
  q: string;
  a: string;
}

export interface Comparison {
  slug: string;
  title: string;
  h1: string;
  metaDesc: string;
  keywords: string[];
  /** 2 paragraf pembuka SEO */
  intro: string[];
  entityA: ComparisonEntity;
  entityB: ComparisonEntity;
  /** Minimal 10 baris */
  tableRows: ComparisonTableRow[];
  /** Poin "Pilih A jika…" */
  verdictA: string[];
  /** Poin "Pilih B jika…" */
  verdictB: string[];
  /** 2-3 paragraf rekomendasi akhir */
  recommendation: string[];
  /** Minimal 6 FAQ */
  faq: ComparisonFaq[];
  /** Slug comparison lain (2-3) */
  relatedSlugs: string[];
}

// ------------------------------------------------------------
// ENTITAS BADAN USAHA (didefinisikan sekali, dipakai lintas
// perbandingan agar angka regulasi konsisten)
// ------------------------------------------------------------

const E_PT: ComparisonEntity = {
  name: "PT",
  fullName: "Perseroan Terbatas",
  icon: "🏢",
  legalBasis: "UU 40/2007 tentang Perseroan Terbatas jo. UU 6/2023 (Cipta Kerja)",
  ownership: "Minimal 2 pemegang saham (orang pribadi atau badan hukum); kepemilikan saham dapat berpindah",
  minCapital: "Modal dasar bebas ditentukan pendiri — praktik umum Rp 10 juta; untuk PT kecil tidak wajib menyetor 25% dari modal dasar",
  liability: "Terbatas — pemegang saham hanya menanggung sebesar modal disetor; harta pribadi aman",
  taxSummary: "PPh Badan 22% (UU HPP); dividen ke orang pribadi PPh final 10% bila memenuhi syarat PMK 128/2019; PPh 21 karyawan pakai tarif efektif TER (PMK 168/2023); wajib SPT Tahunan Badan + audit bila memenuhi kriteria",
  setupCost: "Rp 1–3 juta (biaya notaris) + gratis NIB via OSS-RBA",
  setupDays: "5–10 hari kerja",
  pros: [
    "Badan hukum penuh — paling dipercaya bank, investor, dan panitia tender",
    "Tanggung jawab pemegang saham terbatas pada modal disetor",
    "Bisa menerima investor saham, merger, hingga IPO",
    "Usaha berkelanjutan (going concern) — tidak mati meski pemilik berubah",
    "Saham mudah dialihkan untuk perencanaan kepemilikan & warisan usaha",
  ],
  cons: [
    "Wajib akta notaris + SK Menkumham (AHU Online)",
    "Biaya pendirian Rp 1–3 juta lebih mahal dari CV/UD",
    "Kepatuhan lebih berat: SPT Tahunan Badan, pembukuan, audit bila memenuhi kriteria",
    "Minimal 2 pemegang saham (kecuali memilih PT Perorangan)",
    "PPh Badan 22% — ada kewajiban pph akhir dividen bagi pemilik orang pribadi",
  ],
  bestFor: [
    "Startup & bisnis yang akan mencari investor",
    "Perusahaan yang ikut tender / proyek B2B besar",
    "Bisnis dengan risiko hukum & utang tinggi",
    "Usaha jangka panjang multi-generasi",
  ],
};

const E_CV: ComparisonEntity = {
  name: "CV",
  fullName: "Commanditaire Vennootschap",
  icon: "🤝",
  legalBasis: "UU 18/2008 (perubahan Kitab Undang-Undang Hukum Dagang/KUHD)",
  ownership: "Minimal 2 orang: sekutu aktif (mengelola) + sekutu pasif (memodali)",
  minCapital: "Tidak ada modal minimum — disepakati para sekutu dalam akta",
  liability: "Bukan badan hukum — sekutu AKTIF menanggung utang CV dengan seluruh harta pribadi (tak terbatas); sekutu pasif sebatas modalnya",
  taxSummary: "Pajak dikenakan pada para sekutu (bukan pada badan) — omzet < Rp 4,8 M/tahun dapat PPh final 0,5% (PP 23/2018 jo. PP 55/2022) atau tarif progresif Pasal 17; NPWP CV memakai NPWP para sekutu",
  setupCost: "Rp 500 ribu–1,5 juta (akta notaris/PPNS)",
  setupDays: "2–4 hari kerja",
  pros: [
    "Biaya pendirian paling murah di kelas legalitas kemitraan (Rp 500 rb–1,5 juta)",
    "Proses cepat 2–4 hari kerja di notaris/PPNS",
    "Kepatuhan ringan — tak wajib audit, NPWP memakai para sekutu",
    "Pajak personal 0,5% final bila omzet < Rp 4,8 M/tahun",
    "Struktur sekutu pasif ideal untuk pemodal yang tidak ikut mengelola",
  ],
  cons: [
    "Bukan badan hukum — kredibilitas di bawah PT di mata bank & partner besar",
    "Sekutu aktif tanggung jawab tak terbatas: harta pribadi bisa tersita",
    "Tidak bisa menerima investor saham, merger, atau IPO",
    "Wajib minimal 2 orang sejak akta pendirian",
    "Sebagian tender BUMN/proyek besar mensyaratkan PT",
  ],
  bestFor: [
    "Usaha keluarga & warung besar",
    "Kemitraan pemodal diam + pengelola harian",
    "Toko, distributor, agen menengah",
    "Duo freelancer / jasa profesional",
  ],
};

const E_PTP: ComparisonEntity = {
  name: "PT Perorangan",
  fullName: "Perusahaan Perorangan (UU Cipta Kerja)",
  icon: "👤",
  legalBasis: "UU 6/2023 (Cipta Kerja) tentang Perusahaan Perorangan + Peraturan OSS-RBA",
  ownership: "Tepat 1 pemilik, wajib WNI (tidak bisa ada pemegang saham lain)",
  minCapital: "Modal bebas — standar Rp 10 juta tanpa verifikasi penyetoran",
  liability: "Terbatas — pemilik hanya bertanggung jawab sebesar modal disetor",
  taxSummary: "Bisa PPh final 0,5% dari omzet (PP 23/2018 jo. PP 55/2022) bila omzet < Rp 4,8 M/tahun; gabungan usaha orang pribadi dihitung dalam batas 4,8 M",
  setupCost: "Gratis (pemberitahuan elektronik via OSS-RBA — tanpa notaris)",
  setupDays: "1 hari kerja (NIB terbit sebagai akta pendirian sekaligus identitas badan hukum)",
  pros: [
    "100% gratis & online — tanpa biaya notaris sama sekali",
    "Status badan hukum otomatis: NIB berlaku sebagai akta pendirian",
    "Tanggung jawab terbatas sebesar modal disetor",
    "Pajak ringan PPh final 0,5% untuk omzet < Rp 4,8 M",
    "Cukup 1 orang — solusi legalitas terbaik untuk wirausaha solo",
  ],
  cons: [
    "Hanya 1 pemilik WNI — tidak bisa menerima mitra atau investor saham",
    "Kredibilitas menengah: bank & partner korporat masih lebih percaya PT",
    "Tidak bisa konversi saham; pindah ke PT biasa = pendirian baru + alih aset",
    "Satu pemilik membatasi skalabilitas & pemisahan modal",
    "Wajib LKPM (laporan kegiatan usaha pemodal) rutin via OSS",
  ],
  bestFor: [
    "Wirausaha solo & online shop",
    "Freelancer & konsultan profesional",
    "UMKM yang naik kelas dari UD",
    "Reseller & dropshipper",
  ],
};

const E_UD: ComparisonEntity = {
  name: "UD",
  fullName: "Usaha Dagang / Perseorangan",
  icon: "🏪",
  legalBasis: "Bentuk dagang perseorangan — legalitas via NIB OSS-RBA (tidak ada UU khusus badan usaha)",
  ownership: "1 pemilik penuh (orang pribadi)",
  minCapital: "Tanpa modal minimum",
  liability: "TAK TERBATAS — utang usaha menyatu dengan harta pribadi pemilik",
  taxSummary: "PPh Orang Pribadi tarif progresif Pasal 17 — atau PPh final 0,5% dari omzet bila omzet < Rp 4,8 M/tahun (PP 23/2018 jo. PP 55/2022)",
  setupCost: "Rp 0–500 ribu (NIB gratis via OSS-RBA; SKDU/Surat Keterangan Usaha opsional)",
  setupDays: "1 hari kerja",
  pros: [
    "Paling mudah, paling murah, dan tercepat didirikan",
    "Pajak sederhana 0,5% final untuk omzet < Rp 4,8 M",
    "Tanpa kewajiban pembukuan formal yang ketat",
    "Bebas dikendalikan penuh oleh pemilik",
  ],
  cons: [
    "Harta pribadi menyatu dengan utang usaha (risiko tak terbatas)",
    "Bukan badan hukum — sulit dapat kredit besar, investor & tender",
    "Kredibilitas paling rendah di mata mitra korporat",
    "Tidak bisa multi-pemilik atau penambahan modal saham",
  ],
  bestFor: [
    "Warung & toko mikro",
    "Pedagang pasar & online shop kecil",
    "Jasa perorangan (laundry, cukur, servis)",
    "Usaha baru tahap uji pasar",
  ],
};

const E_FIRMA: ComparisonEntity = {
  name: "Firma",
  fullName: "Firma (Fa)",
  icon: "🧾",
  legalBasis: "KUHD (Kitab Undang-Undang Hukum Dagang) Pasal 16–35",
  ownership: "Minimal 2 sekutu — SEMUA sekutu aktif dan menandatangani nama firma",
  minCapital: "Tidak ada modal minimum",
  liability: "Bukan badan hukum — SEMUA sekutu menanggung utang dengan harta pribadi (tak terbatas, tanpa pemodal diam)",
  taxSummary: "Pajak dikenakan pada masing-masing sekutu (bukan badan) — PPh final 0,5% bila omzet < Rp 4,8 M/tahun atau tarif progresif Pasal 17",
  setupCost: "Rp 500 ribu–1,5 juta (akta notaris)",
  setupDays: "2–4 hari kerja",
  pros: [
    "Semua sekutu berwenang penuh mengelola & mewakili firma",
    "Biaya & proses pendirian murah di notaris",
    "Pajak di tingkat personal — ringan untuk omzet < Rp 4,8 M",
    "Nama firma menampung reputasi kolektif para ahli",
  ],
  cons: [
    "Bukan badan hukum",
    "SEMUA sekutu berisiko harta pribadi tanpa batas",
    "Tidak ada posisi pemodal diam (berbeda dari CV)",
    "Tidak menarik bagi investor & lembaga pembiayaan besar",
  ],
  bestFor: [
    "Kantor profesional berdua: arsitek, advokat, konsultan",
    "Bisnis jasa kolektif antar ahli",
    "Kemitraan setara dengan pembagian kerja seimbang",
  ],
};

const E_YAYASAN: ComparisonEntity = {
  name: "Yayasan",
  fullName: "Yayasan (UU 16/2001)",
  icon: "🤲",
  legalBasis: "UU 16/2001 jo. UU 28/2004 tentang Yayasan",
  ownership: "Tanpa pemilik/pemodal — dikelola organ Pembina, Pengurus, dan Pengawas",
  minCapital: "Modal awal minimal Rp 10 juta berupa uang tunai",
  liability: "Badan hukum — yayasan menanggung; pengurus bertanggung jawab sesuai AD/ART",
  taxSummary: "Tidak didirikan untuk mencari laba (kegiatan sosial). Kegiatan ekonomi/unit usaha dikenakan PPh Badan 22% — atau PPh final 0,5% bila omzet unit usaha < Rp 4,8 M/tahun",
  setupCost: "Rp 1,5–3 juta (akta notaris + SK Menkumham)",
  setupDays: "5–10 hari kerja",
  pros: [
    "Badan hukum resmi untuk misi sosial, pendidikan & keagamaan",
    "Akses hibah, dana CSR, dan donasi resmi",
    "Struktur organ jelas: pembina, pengurus, pengawas",
    "Berjalan terus meski pendiri/pengurus berganti",
  ],
  cons: [
    "DILARANG membagi keuntungan ke pendiri, pembina, atau pengurus",
    "Modal awal tunai minimal Rp 10 juta",
    "Pengawasan ketat: laporan tahunan & kewajiban organ lengkap",
    "Unit ekonominya tetap kena PPh Badan 22% (atau final 0,5%)",
  ],
  bestFor: [
    "Lembaga pendidikan, pesantren & sekolah",
    "Organisasi sosial, amal & keagamaan",
    "Yayasan rumah sakit / klinik sosial",
    "Organisasi penerima CSR & hibah",
  ],
};

const E_PERKUMPULAN: ComparisonEntity = {
  name: "Perkumpulan",
  fullName: "Perkumpulan (UU 16/2001)",
  icon: "👥",
  legalBasis: "UU 16/2001 tentang Perkumpulan yang Mempunyai Badan Hukum",
  ownership: "Anggota orang pribadi — didirikan lewat rapat anggota + akta notaris",
  minCapital: "Tanpa modal minimum (iuran & kekayaan organisasi)",
  liability: "Badan hukum (bila didaftarkan ke Kemenkumham) — organisasi yang menanggung",
  taxSummary: "Kegiatan ekonomi/bisnis dikenakan PPh Badan 22% (atau PPh final 0,5% bila omzet < Rp 4,8 M/tahun); iuran anggota & kegiatan non-ekonomi umumnya bukan objek PPh",
  setupCost: "Rp 1–2 juta (rapat pendirian + akta notaris + SK Menkumham)",
  setupDays: "5–10 hari kerja",
  pros: [
    "Ideal untuk asosiasi, komunitas profesi & organisasi keanggotaan",
    "Struktur demokratis — keputusan lewat rapat anggota",
    "Bisa menjadi badan hukum via SK Menkumham",
    "Biaya pendirian terjangkau",
  ],
  cons: [
    "Bukan wadah mencari laba pribadi anggota",
    "Pengambilan keputusan bisa lambat bila anggota banyak",
    "Perkumpulan tanpa SK tidak bisa berakta & sulit buka rekening korporat",
    "Kegiatan bisnisnya tetap kena pajak badan",
  ],
  bestFor: [
    "Asosiasi & serikat profesi",
    "Komunitas & kelompok kepentingan",
    "Organisasi alumni & gotong royong",
  ],
};

const E_KOPERASI: ComparisonEntity = {
  name: "Koperasi",
  fullName: "Koperasi (UU 25/1992)",
  icon: "🌾",
  legalBasis: "UU 25/1992 tentang Perkoperasian",
  ownership: "Anggota — prinsip keanggotaan sukarela & terbuka; 1 anggota 1 suara",
  minCapital: "Simpanan pokok & simpanan wajib anggota (besarannya diatur AD/ART)",
  liability: "Badan hukum — koperasi yang menanggung; anggota terbatas pada simpanannya",
  taxSummary: "PPh 22% dengan sejumlah fasilitas perpajakan; keuntungan berupa SHU (Sisa Hasil Usaha) dibagikan ke anggota sesuai jasa & keaktifan",
  setupCost: "Rp 1–2,5 juta (akta/RKSM + pengesahan badan hukum KemenkopUKM)",
  setupDays: "7–14 hari kerja",
  pros: [
    "SHU kembali ke anggota — bukan ke pemodal asing",
    "RAT (Rapat Anggota Tahunan) adalah pemegang kekuasaan tertinggi",
    "Akses program, pelatihan & pembiayaan KemenkopUKM",
    "1 anggota 1 suara — tata kelola demokratis",
  ],
  cons: [
    "Wajib RAT tahunan & tata kelola keanggotaan rutin",
    "SHU bukan laba pemodal — tidak cocok untuk profit pribadi",
    "Pengesahan via KemenkopUKM (SM-Online), proses 7–14 hari",
    "PPh 22% meski tersedia sejumlah fasilitas",
  ],
  bestFor: [
    "Komunitas petani, peternak & nelayan",
    "Koperasi karyawan, sekolah & desa",
    "Usaha simpan pinjam jasa",
    "Pemberdayaan ekonomi daerah",
  ],
};

const E_PMA: ComparisonEntity = {
  name: "PT PMA",
  fullName: "Perseroan Terbatas Penanaman Modal Asing",
  icon: "🌏",
  legalBasis: "UU 25/2007 (Penanaman Modal) + Peraturan BKPM 5/2021 (OSS-RBA) — cek ketentuan investasi terbaru BKPM/Perpres 5/2025",
  ownership: "Saham asing hingga 100% tergantung KBLI (sebagian bidang usaha dibatasi/ditetapkan patungan)",
  minCapital: "Modal disetor minimal Rp 10 miliar dengan komitmen investasi terencana (cek ketentuan investasi terbaru BKPM/Perpres 5/2025)",
  liability: "Terbatas sebesar modal disetor (badan hukum penuh)",
  taxSummary: "PPh Badan 22%; wajib SPT Tahunan Badan + LKPM (laporan kegiatan penanaman modal) berkala via OSS-RBA; dapat insentif fasilitas investasi tertentu",
  setupCost: "Rp 8–20 juta (akta notaris, legalisasi dokumen, persetujuan BKPM — tergantung kompleksitas)",
  setupDays: "10–20 hari kerja",
  pros: [
    "Saham asing hingga 100% sesuai KBLI yang diizinkan",
    "Badan hukum penuh: rekening korporat, multi-cabang, ekspor-impor",
    "Jalur KITAS/izin tinggal investor bagi pemegang saham asing",
    "Akses insentif & fasilitas investasi (perdagangan, manufaktur, KPBU)",
  ],
  cons: [
    "Modal disetor min Rp 10 miliar + komitmen investasi terencana",
    "Wajib LKPM investasi rutin ke BKPM/OSS-RBA",
    "Beberapa KBLI dibatasi atau tertutup untuk asing",
    "Biaya & waktu pendirian paling tinggi di antara bentuk PT",
  ],
  bestFor: [
    "Investor asing ekspansi ke Indonesia",
    "Startup dengan pendanaan modal asing",
    "Perusahaan multinasional & manufacturing",
    "Proyek FDI skala besar",
  ],
};

const E_KP3A: ComparisonEntity = {
  name: "Kantor Perwakilan",
  fullName: "Kantor Perwakilan Perusahaan Asing (KP3A)",
  icon: "🏛️",
  legalBasis: "Peraturan BKPM 5/2021 (OSS-RBA) tentang Kantor Perwakilan",
  ownership: "Perpanjangan tangan perusahaan asing — tanpa struktur saham lokal",
  minCapital: "Tanpa modal disetor — sepenuhnya dibiayai perusahaan induk di luar negeri",
  liability: "Bukan entitas hukum terpisah — tanggung jawab menyatu dengan perusahaan induk",
  taxSummary: "TIDAK boleh bertransaksi & mencari laba di Indonesia → umumnya tidak menimbulkan kewajiban pajak atas penghasilan lokal; kegiatan terbatas koordinasi & uji pasar",
  setupCost: "Rp 5–10 juta (surat persetujuan BKPM/OSS + legalisasi dokumen induk)",
  setupDays: "7–14 hari kerja",
  pros: [
    "Cara termurah & tercepat hadir secara legal di Indonesia",
    "Tanpa kewajiban modal Rp 10 miliar seperti PT PMA",
    "Ideal untuk riset & uji pasar sebelum investasi penuh",
    "Bisa mengurus KITAS untuk kepala perwakilan & staf",
  ],
  cons: [
    "TIDAK boleh bertransaksi, menerima pendapatan, atau mencari laba",
    "Tanpa NIB usaha penuh — tidak bisa ekspor-impor sendiri",
    "Penjualan harus lewat induk, agen, atau entitas PMA",
    "Tidak bisa jadi pihak kontrak komersial independen",
  ],
  bestFor: [
    "Perwakilan riset & koordinasi grup regional",
    "Uji pasar sebelum mendirikan PT PMA",
    "Kantor penghubung mitra, vendor & brand",
    "Kehadiran branding tanpa aktivitas komersial",
  ],
};

// ------------------------------------------------------------
// 12 PERBANDINGAN
// ------------------------------------------------------------

export const COMPARISONS: Comparison[] = [
  // ============================================================
  // 1. PT vs CV — FLAGSHIP
  // ============================================================
  {
    slug: "pt-vs-cv",
    title: "PT vs CV: Perbedaan Lengkap Biaya, Pajak & Tanggung Jawab Hukum (2026)",
    h1: "PT vs CV: Perbedaan Lengkap Biaya, Pajak & Tanggung Jawab Hukum",
    metaDesc: "Beda PT dan CV dijelaskan tuntas: modal, tanggung jawab hukum, pajak 22% vs 0,5%, biaya notaris Rp 1–3 juta vs Rp 500 ribu–1,5 juta, hingga rekomendasi mana yang cocok untuk bisnis Anda.",
    keywords: [
      "beda pt dan cv",
      "pt vs cv",
      "pilih pt atau cv",
      "perbedaan pt dan cv",
      "biaya pendirian pt",
      "biaya pendirian cv",
      "pajak pt dan cv",
      "cv atau pt untuk usaha baru",
    ],
    intro: [
      "PT (Perseroan Terbatas) dan CV (Commanditaire Vennootschap) adalah dua bentuk badan usaha paling banyak didirikan di Indonesia — tetapi karakter keduanya sangat berbeda. PT adalah badan hukum penuh di mana tanggung jawab pemegang saham hanya sebesar modal disetor, sedangkan CV bukan badan hukum: sekutu aktifnya menanggung utang usaha dengan seluruh harta pribadi. Perbedaan ini menentukan seberapa besar risiko pribadi Anda, bagaimana pajak dihitung, dan seberapa jauh bisnis dapat tumbuh di kemudian hari.",
      "Di halaman ini kami membedah perbandingan PT vs CV secara menyeluruh — dari dasar hukum (UU 40/2007 vs UU 18/2008), modal, tanggung jawab, pajak (PPh Badan 22% vs PPh final 0,5% untuk omzet di bawah Rp 4,8 miliar), biaya pendirian (notaris Rp 1–3 juta vs Rp 500 ribu–1,5 juta), sampai akses investor dan tender. Di bagian akhir tersedia rekomendasi konkret berdasarkan profil usaha, lengkap dengan FAQ yang paling sering ditanyakan pendiri baru.",
    ],
    entityA: E_PT,
    entityB: E_CV,
    tableRows: [
      { aspect: "Dasar hukum", a: "UU 40/2007 jo. UU 6/2023 (Cipta Kerja)", b: "UU 18/2008 (perubahan KUHD)" },
      { aspect: "Status badan hukum", a: "Ya — badan hukum penuh dengan SK Menkumham", b: "Bukan badan hukum" },
      { aspect: "Jumlah pemilik", a: "Minimal 2 pemegang saham (orang pribadi/badan hukum)", b: "Minimal 2 orang: sekutu aktif + sekutu pasif" },
      { aspect: "Modal minimum", a: "Modal dasar bebas — praktik umum Rp 10 juta; PT kecil tak wajib menyetor 25%", b: "Tidak ada modal minimum — disepakati para sekutu" },
      { aspect: "Tanggung jawab hukum", a: "Terbatas sebesar modal disetor; harta pribadi aman", b: "Sekutu aktif tak terbatas — menanggung dengan seluruh harta pribadi" },
      { aspect: "Pajak penghasilan", a: "PPh Badan 22% (UU HPP)", b: "Dikenakan ke para sekutu: final 0,5% bila omzet < Rp 4,8 M (PP 23/2018 jo. PP 55/2022) atau progresif Pasal 17" },
      { aspect: "Perlakuan laba/dividen", a: "Dividen ke orang pribadi PPh final 10% bila memenuhi syarat PMK 128/2019", b: "Laba langsung menjadi penghasilan sekutu (dilaporkan SPT pribadi)" },
      { aspect: "NPWP", a: "NPWP korporat sendiri", b: "Memakai NPWP para sekutu" },
      { aspect: "Kewajiban laporan", a: "SPT Tahunan Badan + audit bila memenuhi kriteria", b: "Kepatuhan ringan — tidak wajib audit" },
      { aspect: "Biaya pendirian", a: "Rp 1–3 juta (biaya notaris)", b: "Rp 500 ribu–1,5 juta (akta notaris/PPNS)" },
      { aspect: "Waktu pendirian", a: "5–10 hari kerja", b: "2–4 hari kerja" },
      { aspect: "Proses legalitas", a: "Akta notaris → SK Menkumham (AHU Online) → NIB via OSS-RBA", b: "Akta notaris/PPNS — tidak perlu SK Kemenkumham" },
      { aspect: "Akses investor & tender", a: "Bisa terima investor saham, IPO, dan hampir semua tender", b: "Tidak bisa IPO; banyak tender besar mensyaratkan PT" },
      { aspect: "Kelangsungan usaha", a: "Berlanjut seumur hidup meski saham berpindah", b: "Bergantung kesepakatan & keberadaan para sekutu" },
    ],
    verdictA: [
      "Bisnis Anda akan mencari investor atau memasuki pasar modal",
      "Anda sering ikut tender pemerintah/BUMN atau kontrak B2B besar",
      "Risiko operasional tinggi (utang, garansi produk, klaim pihak ketiga)",
      "Anda ingin harta pribadi terpisah tegas dari utang usaha",
      "Usaha dirancang jangka panjang dan bisa diwariskan lewat saham",
    ],
    verdictB: [
      "Omzet tahunan di bawah Rp 4,8 miliar sehingga pajak 0,5% final sangat ringan",
      "Anda punya pemodal yang percaya tapi tidak ikut mengelola (sekutu pasif)",
      "Anggaran legalitas terbatas — hanya Rp 500 ribu–1,5 juta",
      "Ingin legalitas cepat (2–4 hari kerja) tanpa urusan SK Kemenkumham",
      "Kepatuhan ringan: tanpa audit dan NPWP cukup dari para sekutu",
    ],
    recommendation: [
      "Pilih PT bila bisnis Anda bergerak ke arah skala besar: butuh investor, ikut tender, menanggung risiko hukum signifikan, atau membutuhkan kredibilitas penuh di mata bank. Biaya Rp 1–3 juta dan waktu 5–10 hari kerja adalah harga yang wajar untuk perlindungan tanggung jawab terbatas dan status badan hukum penuh. Konsekuensinya, Anda harus disiplin kepatuhan: SPT Tahunan Badan, pembukuan rapi, PPh Badan 22%, dan audit bila memenuhi kriteria.",
      "Pilih CV bila usaha Anda adalah kemitraan sederhana beromzet di bawah Rp 4,8 miliar per tahun — misalnya toko, distributor, atau usaha keluarga dengan pemodal diam. Pajak final 0,5% dari omzet (PP 23/2018 jo. PP 55/2022) dan biaya pendirian Rp 500 ribu–1,5 juta membuat CV sangat hemat. Namun pahami risikonya: sekutu aktif menanggung utang dengan seluruh harta pribadi karena CV bukan badan hukum.",
      "Aturan praktis kami: mulai dengan CV bila kemitraan masih kecil dan risiko rendah, lalu konversi menjadi PT saat omzet naik, butuh investor, atau mulai ikut tender. Proses konversi CV ke PT dapat diurus langsung — dan tim PusatPerizinan.com menangani seluruh rantainya, dari akta, SK Menkumham, hingga migrasi NIB via OSS-RBA.",
    ],
    faq: [
      { q: "Apa perbedaan paling mendasar antara PT dan CV?", a: "PT adalah badan hukum: tanggung jawab pemegang saham hanya sebesar modal disetor dan harta pribadi aman. CV bukan badan hukum — sekutu aktif menanggung seluruh utang usaha dengan harta pribadinya. Ini perbedaan risiko terbesar di antara keduanya, melebihi soal biaya atau pajak." },
      { q: "Berapa biaya pendirian PT vs CV?", a: "Pendirian PT melalui notaris umumnya Rp 1–3 juta ditambah SK Menkumham via AHU Online dan NIB gratis via OSS-RBA. CV cukup akta notaris/PPNS sekitar Rp 500 ribu–1,5 juta tanpa SK Kemenkumham. Dengan konsultan, seluruh proses PT selesai 5–10 hari kerja, CV 2–4 hari kerja." },
      { q: "Pajak PT dan CV mana yang lebih murah?", a: "Untuk omzet di bawah Rp 4,8 miliar/tahun, CV lebih ringan karena para sekutu bisa memakai PPh final 0,5% dari omzet (PP 23/2018 jo. PP 55/2022). Saat omzet besar, PT menjadi lebih efisien: PPh Badan 22% dengan pembukuan, dan dividen ke orang pribadi hanya kena final 10% bila memenuhi syarat PMK 128/2019." },
      { q: "Apakah CV bisa diubah menjadi PT?", a: "Bisa. Prosesnya berupa pendirian PT baru melalui notaris, pengalihan aset dan operasional dari CV ke PT, lalu pembubaran/perubahan status CV secara administratif. Kami menangani seluruh tahapannya termasuk migrasi NIB di OSS-RBA dan penyesuaian NPWP agar tidak ada masalah pajak." },
      { q: "Bisnis apa saja yang praktis wajib PT?", a: "Kegiatan yang umumnya menuntut PT: tender BUMN/pemerintah tertentu, kegiatan dengan modal asing (PT PMA), franchise besar, fintech/kesehatan teregulasi, serta kontraktor proyek besar. Untuk e-commerce, F&B, dan jasa menengah, CV masih sangat lazim dipakai." },
      { q: "Apakah sekutu pasif CV ikut menanggung utang usaha?", a: "Tidak sebatas sekutu aktif. Sekutu pasif hanya menanggung sebatas modal yang ia serahkan, karena ia tidak ikut mengelola. Sebaliknya, sekutu aktif menanggung tak terbatas dengan seluruh harta pribadinya — inilah ciri khas CV menurut UU 18/2008 (perubahan KUHD)." },
      { q: "Berapa lama proses pendirian masing-masing?", a: "CV umumnya selesai 2–4 hari kerja sejak dokumen lengkap. PT memakan waktu 5–10 hari kerja karena ada tahap akta notaris, pengesahan SK Menkumham via AHU Online, lalu NIB via OSS-RBA. Dengan persiapan dokumen yang rapi, keduanya bisa dipercepat." },
      { q: "Untuk online shop atau UMKM, mana yang lebih baik?", a: "Jika Anda sendirian, PT Perorangan (gratis via OSS-RBA) justru paling efisien. Jika berdua dengan pemodal diam, CV paling cocok. Upgrade ke PT biasa saat omzet mendekati Rp 4,8 miliar, butuh investor, atau mulai ikut tender — jangan buru-buru menanggung biaya kepatuhan PT sebelum usahanya siap." },
    ],
    relatedSlugs: ["pt-vs-pt-perorangan", "cv-vs-pt-perorangan", "pt-pma-vs-pt-lokal"],
  },

  // ============================================================
  // 2. PT vs PT Perorangan
  // ============================================================
  {
    slug: "pt-vs-pt-perorangan",
    title: "PT vs PT Perorangan: Beda Status, Biaya, Pajak & Kapan Harus Pilih Mana",
    h1: "PT vs PT Perorangan: Mana yang Tepat untuk Bisnis Anda?",
    metaDesc: "Beda PT dan PT Perorangan: badan hukum penuh via notaris Rp 1–3 juta vs badan hukum gratis via OSS-RBA. Modal, pajak 22% vs 0,5%, jumlah pemilik, dan rekomendasi lengkap.",
    keywords: [
      "pt vs pt perorangan",
      "beda pt dan pt perorangan",
      "pt perorangan atau pt biasa",
      "pendirian pt perorangan",
      "pt perorangan gratis",
      "pajak pt perorangan",
    ],
    intro: [
      "Sejak UU Cipta Kerja (UU 6/2023), Indonesia memiliki bentuk usaha baru: PT Perorangan — perusahaan perorangan yang berbadan hukum tanpa perlu akta notaris. Kini calon pendiri punya dua pilihan 'PT': PT biasa berdasarkan UU 40/2007 dengan minimal 2 pemegang saham, atau PT Perorangan dengan tepat 1 pemilik WNI yang didirikan gratis melalui OSS-RBA.",
      "Keduanya sama-sama berbadan hukum dan memberi perlindungan tanggung jawab terbatas, tetapi berbeda total dalam biaya (Rp 1–3 juta vs gratis), proses (notaris + SK Menkumham vs pemberitahuan elektronik), dan kapasitas tumbuh (multi-investor vs 1 pemilik selamanya). Halaman ini membedah semua aspeknya sehingga Anda tidak salah memilih bentuk sejak awal.",
    ],
    entityA: E_PT,
    entityB: E_PTP,
    tableRows: [
      { aspect: "Dasar hukum", a: "UU 40/2007 jo. UU 6/2023 (Cipta Kerja)", b: "UU 6/2023 (Cipta Kerja) — Perusahaan Perorangan" },
      { aspect: "Status badan hukum", a: "Ya — via SK Menkumham (AHU Online)", b: "Ya — otomatis, NIB berlaku sebagai akta pendirian" },
      { aspect: "Jumlah pemilik", a: "Minimal 2 pemegang saham (orang pribadi/badan hukum)", b: "Tepat 1 pemilik, wajib WNI" },
      { aspect: "Modal minimum", a: "Modal dasar bebas — praktik umum Rp 10 juta; PT kecil tak wajib menyetor 25%", b: "Modal bebas — standar Rp 10 juta tanpa verifikasi setor" },
      { aspect: "Tanggung jawab hukum", a: "Terbatas sebesar modal disetor", b: "Terbatas sebesar modal disetor" },
      { aspect: "Pajak penghasilan", a: "PPh Badan 22%; dividen final 10% bila memenuhi syarat PMK 128/2019", b: "PPh final 0,5% dari omzet bila omzet < Rp 4,8 M/tahun" },
      { aspect: "Biaya pendirian", a: "Rp 1–3 juta (biaya notaris)", b: "Gratis — tanpa notaris via OSS-RBA" },
      { aspect: "Waktu pendirian", a: "5–10 hari kerja", b: "1 hari kerja" },
      { aspect: "Proses legalitas", a: "Akta notaris → SK Menkumham → NIB via OSS-RBA", b: "Cukup pemberitahuan elektronik di OSS-RBA" },
      { aspect: "Kewajiban laporan", a: "SPT Tahunan Badan + audit bila memenuhi kriteria; PPh 21 karyawan pakai TER (PMK 168/2023)", b: "SPT sederhana + kewajiban LKPM rutin via OSS" },
      { aspect: "Akses investor", a: "Bisa menambah pemegang saham, menerima investor & IPO", b: "Tidak bisa — jumlah pemegang saham dibatasi 1 orang" },
      { aspect: "Cocok untuk", a: "Bisnis dengan mitra & rencana ekspansi besar", b: "Wirausaha solo, freelancer, online shop" },
    ],
    verdictA: [
      "Anda punya mitra atau berencana membuka kepemilikan bagi investor",
      "Target bisnis menembus tender dan kontrak korporat besar",
      "Omzet akan melewati Rp 4,8 miliar sehingga skema 0,5% tidak berlaku",
      "Butuh struktur saham untuk perencanaan kepemilikan jangka panjang",
    ],
    verdictB: [
      "Anda wirausaha solo tanpa mitra sama sekali",
      "Anggaran legalitas nol — tidak ingin bayar notaris",
      "Butuh badan hukum hari ini: NIB terbit 1 hari via OSS-RBA",
      "Omzet masih di bawah Rp 4,8 miliar sehingga PPh final 0,5% paling hemat",
    ],
    recommendation: [
      "PT Perorangan adalah titik masuk legalitas termurah: gratis, 1 hari kerja, dan langsung berbadan hukum dengan tanggung jawab terbatas. Untuk wirausaha solo, freelancer, dan pemilik online shop, bentuk ini nyaris selalu lebih masuk akal daripada langsung mendirikan PT biasa. Pajak PPh final 0,5% juga jauh lebih ringan dibanding PPh Badan 22% selama omzet masih di bawah Rp 4,8 miliar per tahun.",
      "PT biasa menjadi pilihan tepat begitu ada mitra, investor, atau target tender — sesuatu yang tidak bisa dilakukan PT Perorangan karena pemiliknya dibatasi tepat 1 orang WNI. Kepatuhan PT memang lebih berat (SPT Tahunan Badan, pembukuan, audit bila memenuhi kriteria), tetapi itulah harga untuk struktur yang bisa tumbuh tanpa batas jumlah pemilik.",
      "Strategi yang kami rekomendasikan: mulai dari PT Perorangan hari ini, lalu saat bisnis butuh mitra atau investor, kami bantu konversi — pendirian PT biasa via notaris, pengalihan aset, hingga pembatalan PT Perorangan yang bersih secara pajak. Banyak klien kami menempuh jalur dua tahap ini dan menghemat biaya kepatuhan di tahun-tahun awal.",
    ],
    faq: [
      { q: "Apakah PT Perorangan sama dengan PT biasa?", a: "Tidak. Keduanya berbadan hukum, tetapi PT Perorangan hanya boleh 1 pemilik WNI, didirikan gratis via OSS-RBA tanpa notaris, sedangkan PT biasa minimal 2 pemegang saham melalui akta notaris (Rp 1–3 juta) plus SK Menkumham. Struktur dan skalabilitasnya pun berbeda." },
      { q: "Apakah PT Perorangan benar-benar berbadan hukum?", a: "Benar. UU 6/2023 menyatakan NIB PT Perorangan berlaku sebagai akta pendirian sekaligus identitas badan hukum, sehingga status badan hukum terbentuk otomatis. Tanggung jawab pemilik terbatas sebesar modal disetor — sama seperti prinsip PT pada umumnya." },
      { q: "Bisakah PT Perorangan menambah pemegang saham atau investor?", a: "Tidak bisa. Jumlah pemegang saham PT Perorangan dibatasi tepat 1 orang WNI. Bila bisnis membutuhkan mitra atau investor, jalurnya adalah mendirikan PT biasa melalui notaris, mengalihkan aset, lalu membatalkan PT Perorangan secara administratif." },
      { q: "Pajak mana yang lebih murah: PT atau PT Perorangan?", a: "Untuk omzet di bawah Rp 4,8 miliar/tahun, PT Perorangan menang dengan PPh final 0,5% dari omzet. Di atas ambang itu, skema final tidak lagi tersedia dan PT biasa dengan PPh Badan 22% plus dividen final 10% (PMK 128/2019) biasanya menjadi lebih rapi dan efisien." },
      { q: "Berapa biaya dan lama proses keduanya?", a: "PT Perorangan gratis dan terbit 1 hari kerja via OSS-RBA. PT biasa membutuhkan biaya notaris Rp 1–3 juta dan waktu 5–10 hari kerja untuk akta, SK Menkumham (AHU Online), dan NIB. Selisih biayanya sangat besar di tahun-tahun pertama usaha." },
      { q: "Bagaimana cara pindah dari PT Perorangan ke PT biasa?", a: "Prosesnya: mendirikan PT baru via notaris, melakukan pengalihan aset dan kontrak ke PT, lalu mengajukan pembatalan PT Perorangan di OSS-RBA. Aspek pajak pengalihan aset perlu disusun benar agar tidak menimbulkan beban ganda — kami menangani ini end-to-end untuk klien." },
    ],
    relatedSlugs: ["pt-vs-cv", "cv-vs-pt-perorangan", "pt-vs-ud"],
  },

  // ============================================================
  // 3. CV vs PT Perorangan
  // ============================================================
  {
    slug: "cv-vs-pt-perorangan",
    title: "CV vs PT Perorangan: Perbandingan Biaya, Pajak & Badan Hukum (2026)",
    h1: "CV vs PT Perorangan: Mana yang Lebih Cocok?",
    metaDesc: "Beda CV dan PT Perorangan: kemitraan 2 orang Rp 500 ribu–1,5 juta vs badan hukum 1 pemilik gratis via OSS. Tanggung jawab, pajak 0,5%, dan rekomendasi lengkap di sini.",
    keywords: [
      "cv vs pt perorangan",
      "beda cv dan pt perorangan",
      "pilih cv atau pt perorangan",
      "cv atau pt perorangan untuk umkm",
      "legalitas usaha berdua",
    ],
    intro: [
      "CV dan PT Perorangan adalah dua jawaban berbeda untuk dua masalah berbeda. CV (UU 18/2008) menjawab kebutuhan 'kami berdua atau lebih ingin usaha bersama' — kemitraan sekutu aktif dan sekutu pasif dengan biaya Rp 500 ribu–1,5 juta. PT Perorangan (UU 6/2023) menjawab kebutuhan 'saya sendirian tapi ingin badan hukum' — gratis, online, dan terbit sehari.",
      "Menariknya, keduanya sama-sama bisa menikmati pajak final 0,5% untuk omzet di bawah Rp 4,8 miliar, sehingga pilihan sering jatuh pada struktur pemilik dan tanggung jawab hukum: CV bukan badan hukum dengan risiko harta pribadi bagi sekutu aktif, sementara PT Perorangan berbadan hukum dengan tanggung jawab terbatas. Bedah lengkapnya ada di halaman ini.",
    ],
    entityA: E_CV,
    entityB: E_PTP,
    tableRows: [
      { aspect: "Dasar hukum", a: "UU 18/2008 (perubahan KUHD)", b: "UU 6/2023 (Cipta Kerja) — Perusahaan Perorangan" },
      { aspect: "Status badan hukum", a: "Bukan badan hukum", b: "Ya — badan hukum otomatis via NIB OSS-RBA" },
      { aspect: "Jumlah pemilik", a: "Minimal 2 orang: sekutu aktif + sekutu pasif", b: "Tepat 1 pemilik WNI" },
      { aspect: "Tanggung jawab hukum", a: "Sekutu aktif tak terbatas dengan harta pribadi", b: "Terbatas sebesar modal disetor" },
      { aspect: "Modal minimum", a: "Tidak ada — disepakati para sekutu", b: "Modal bebas — standar Rp 10 juta" },
      { aspect: "Pajak penghasilan", a: "Pada para sekutu: final 0,5% bila omzet < Rp 4,8 M atau progresif Pasal 17", b: "PPh final 0,5% dari omzet bila omzet < Rp 4,8 M/tahun" },
      { aspect: "NPWP", a: "Memakai NPWP para sekutu", b: "NPWP tersendiri dalam konteks usaha di OSS" },
      { aspect: "Biaya pendirian", a: "Rp 500 ribu–1,5 juta (akta notaris/PPNS)", b: "Gratis — tanpa notaris via OSS-RBA" },
      { aspect: "Waktu pendirian", a: "2–4 hari kerja", b: "1 hari kerja" },
      { aspect: "Kewajiban laporan", a: "Kepatuhan ringan, tidak wajib audit", b: "SPT sederhana + LKPM rutin via OSS" },
      { aspect: "Skalabilitas", a: "Bisa tambah sekutu sesuai akta; tanpa investor saham", b: "Terkunci 1 pemilik; tidak bisa ada mitra" },
      { aspect: "Cocok untuk", a: "Usaha berdua/berkelompok dengan pemodal diam", b: "Wirausaha solo & online shop" },
    ],
    verdictA: [
      "Usaha dijalankan 2 orang atau lebih sejak awal",
      "Ada pemodal diam yang percaya pada pengelola (struktur sekutu pasif)",
      "Anda ingin menambah sekutu lagi di kemudian hari lewat akta",
      "Kredibilitas akta notaris klasik sudah cukup untuk mitra & bank Anda",
    ],
    verdictB: [
      "Anda benar-benar sendirian mengelola usaha",
      "Tidak ingin menanggung risiko harta pribadi (tanggung jawab terbatas)",
      "Ingin legalitas gratis dan selesai dalam 1 hari kerja",
      "Status badan hukum dibutuhkan untuk kredibilitas marketplace atau bank",
    ],
    recommendation: [
      "Pertanyaan kuncinya cuma satu: berapa orang pemiliknya? Kalau berdua atau lebih, PT Perorangan otomatis gugur karena dibatasi tepat 1 pemilik WNI — CV (atau PT biasa) menjadi pilihan realistis. Kalau sendirian, PT Perorangan hampir selalu lebih baik daripada CV: gratis, sehari jadi, berbadan hukum, dan tanggung jawab terbatas sebesar modal disetor.",
      "Perhatikan juga profil risikonya. CV bukan badan hukum — sekutu aktif menanggung utang usaha dengan seluruh harta pribadi. PT Perorangan memberi tameng tanggung jawab terbatas. Untuk usaha dengan risiko utang atau klaim (misalnya kontraktor kecil, distribusi barang mahal), perlindungan PT Perorangan bernilai jauh lebih besar daripada selisih biaya pendiriannya yang nol.",
      "Kedua bentuk ini sama-sama kompatibel dengan PPh final 0,5% untuk omzet di bawah Rp 4,8 miliar (PP 23/2018 jo. PP 55/2022), jadi faktor pajak bukan penentu utama. Ketika usaha tumbuh dan butuh investor: CV dapat dikonversi ke PT, dan PT Perorangan ditingkatkan ke PT biasa — keduanya kami layani penuh termasuk aspek perpajakannya.",
    ],
    faq: [
      { q: "Apa beda paling mendasar CV dan PT Perorangan?", a: "CV adalah kemitraan minimal 2 orang (sekutu aktif + sekutu pasif) yang bukan badan hukum, dengan sekutu aktif menanggung utang secara tak terbatas. PT Perorangan adalah usaha 1 pemilik WNI yang berbadan hukum dengan tanggung jawab terbatas sebesar modal disetor." },
      { q: "Saya buka online shop berdua, pilih yang mana?", a: "Karena berdua, PT Perorangan tidak bisa dipakai (maksimal 1 pemilik). CV adalah pilihan termurah: akta notaris/PPNS Rp 500 ribu–1,5 juta, selesai 2–4 hari kerja, dan pajak bisa 0,5% final selama omzet di bawah Rp 4,8 miliar. Jika salah satu hanya memodali, posisilah ia sebagai sekutu pasif." },
      { q: "Mana yang lebih cepat dan murah didirikan?", a: "PT Perorangan: gratis dan terbit 1 hari kerja via OSS-RBA tanpa notaris. CV: Rp 500 ribu–1,5 juta dan 2–4 hari kerja. Selama Anda sendirian, tidak ada alasan membayar CV; biaya CV baru masuk akal ketika ada lebih dari satu pemilik." },
      { q: "Bagaimana perlakuan pajak masing-masing?", a: "Keduanya bisa menikmati PPh final 0,5% dari omzet bila omzet < Rp 4,8 miliar/tahun (PP 23/2018 jo. PP 55/2022). Bedanya, pajak CV dikenakan pada para sekutu dan NPWP-nya memakai NPWP sekutu, sedangkan PT Perorangan melaporkan sebagai usaha orang pribadi pemiliknya." },
      { q: "Yang mana lebih dipercaya bank dan marketplace?", a: "PT Perorangan punya status badan hukum + tanggung jawab terbatas sehingga profilnya lebih kuat untuk kredit usaha. CV sudah lama dikenal bank dan tetap diterima luas, tetapi kredibilitasnya kalah dari entitas berbadan hukum. Untuk tender besar, keduanya biasanya kalah dari PT biasa." },
      { q: "Bisakah nanti pindah bentuk usaha?", a: "Bisa. CV dapat dikonversi menjadi PT biasa saat omzet dan kebutuhan investor meningkat. PT Perorangan juga dapat dinaikkan ke PT biasa melalui pendirian baru + pengalihan aset. Keduanya kami tangani lengkap termasuk dokumentasi OSS-RBA dan aspek pajaknya." },
    ],
    relatedSlugs: ["pt-vs-cv", "pt-vs-pt-perorangan", "cv-vs-ud"],
  },

  // ============================================================
  // 4. PT vs UD
  // ============================================================
  {
    slug: "pt-vs-ud",
    title: "PT vs UD: Perbedaan Tanggung Jawab, Pajak & Biaya Pendirian (2026)",
    h1: "PT vs UD (Usaha Dagang): Kapan Harus Naik Kelas?",
    metaDesc: "Beda PT dan UD: badan hukum tanggung jawab terbatas vs perseorangan tanpa batas. Pajak 22% vs 0,5%, biaya Rp 1–3 juta vs gratis, tender, kredit bank — panduan lengkap.",
    keywords: [
      "pt vs ud",
      "beda pt dan ud",
      "usaha dagang atau pt",
      "badan usaha perseorangan",
      "naik kelas dari ud ke pt",
      "legalitas warung toko",
    ],
    intro: [
      "UD (Usaha Dagang) adalah bentuk paling sederhana: usaha milik seorang perseorangan tanpa pemisahan hukum antara uang usaha dan uang pribadi. PT berada di kutub sebaliknya — badan hukum penuh (UU 40/2007) yang memisahkan tanggung jawab pemilik dari utang perusahaan. Selisih karakter ini memengaruhi pajak, akses kredit, tender, hingga keberanian Anda mengambil risiko bisnis.",
      "Banyak pemilik UD bertanya kapan saat yang tepat 'naik kelas' ke PT. Jawabannya ada di tiga sinyal: omzet yang membesar, kebutuhan kontrak formal, dan risiko utang yang meningkat. Halaman ini membedah perbandingan PT vs UD baris per baris — dari biaya (Rp 1–3 juta vs praktis gratis) sampai perlakuan pajak (PPh Badan 22% vs 0,5% final) — supaya Anda naik kelas di waktu yang tepat, bukan terlambat.",
    ],
    entityA: E_PT,
    entityB: E_UD,
    tableRows: [
      { aspect: "Dasar hukum", a: "UU 40/2007 jo. UU 6/2023 (Cipta Kerja)", b: "Perdagangan perseorangan — legalitas via NIB OSS-RBA" },
      { aspect: "Status badan hukum", a: "Ya — badan hukum penuh (SK Menkumham)", b: "Bukan badan hukum" },
      { aspect: "Jumlah pemilik", a: "Minimal 2 pemegang saham", b: "1 pemilik penuh" },
      { aspect: "Tanggung jawab hukum", a: "Terbatas sebesar modal disetor — harta pribadi aman", b: "TAK terbatas — utang usaha menyatu dengan harta pribadi" },
      { aspect: "Modal minimum", a: "Modal dasar bebas — praktik umum Rp 10 juta; PT kecil tak wajib menyetor 25%", b: "Tanpa modal minimum" },
      { aspect: "Pajak penghasilan", a: "PPh Badan 22% (UU HPP); dividen final 10% bila memenuhi syarat PMK 128/2019", b: "PPh Orang Pribadi: final 0,5% bila omzet < Rp 4,8 M/tahun atau progresif Pasal 17" },
      { aspect: "Kewajiban laporan", a: "SPT Tahunan Badan + audit bila memenuhi kriteria", b: "SPT orang pribadi — paling ringan" },
      { aspect: "Biaya pendirian", a: "Rp 1–3 juta (notaris) + SK Menkumham + NIB OSS", b: "Rp 0–500 ribu (NIB gratis via OSS; SKDU opsional)" },
      { aspect: "Waktu pendirian", a: "5–10 hari kerja", b: "1 hari kerja" },
      { aspect: "Akses kredit & tender", a: "Kredit korporat, invoice financing, hampir semua tender", b: "Kredit mikro/kecil; tender besar sulit diakses" },
      { aspect: "Kelangsungan usaha", a: "Terus berjalan meski saham berpindah tangan", b: "Menyatu dengan keberadaan pemiliknya" },
      { aspect: "Cocok untuk", a: "Bisnis bertumbuh, berisiko & berkontrak besar", b: "Warung, toko & jasa mikro" },
    ],
    verdictA: [
      "Omzet sudah stabil dan berencana ekspansi gudang/cabang",
      "Butuh kredit modal kerja di atas skala mikro dari bank",
      "Mulai ikut tender atau kontrak korporat yang minta legalitas PT",
      "Risiko utang & garansi meningkat — harta pribadi harus dilindungi",
    ],
    verdictB: [
      "Usaha masih mikro: warung, toko, jasa perorangan",
      "Omzet jauh di bawah Rp 4,8 miliar sehingga pajak 0,5% final paling hemat",
      "Belum ada kebutuhan investor, kredit besar, atau tender",
      "Ingin legalitas secepat dan seringan mungkin (NIB 1 hari)",
    ],
    recommendation: [
      "Tetaplah di bentuk UD (perseorangan) selama usaha masih mikro dan risikonya rendah. PPh final 0,5% dan NIB gratis via OSS-RBA membuat beban administratifnya nyaris nol. Menaikkan kelas terlalu dini hanya menambah biaya kepatuhan tanpa manfaat: PT menuntut SPT Tahunan Badan, pembukuan, dan PPh Badan 22%.",
      "Naik kelas ke PT ketika tiga sinyal muncul: (1) Anda butuh kredit atau investor yang menuntut badan hukum, (2) mulai masuk tender/kontrak formal, atau (3) risiko usaha membesar sehingga harta pribadi harus dipisahkan. Tanggung jawab terbatas PT adalah asuransi hukum terbaik untuk pemilik usaha yang mulai menanggung utang dan garansi besar.",
      "Alternatif menarik di tengah jalan: PT Perorangan. Ia memberi status badan hukum dan tanggung jawab terbatas tanpa biaya notaris — ideal untuk pemilik UD solo yang ingin kredibilitas lebih tanpa struktur PT penuh. Kami siap menghitungkan pilihan paling hemat antara UD, PT Perorangan, dan PT biasa berdasarkan omzet dan rencana Anda.",
    ],
    faq: [
      { q: "Apa perbedaan utama PT dan UD?", a: "PT adalah badan hukum: utang usaha terpisah dari harta pribadi pemegang saham. UD menyatu — pemilik menanggung seluruh utang usaha dengan harta pribadinya. PT juga lebih dipercaya bank, investor, dan panitia tender, sementara UD paling ringan secara administrasi." },
      { q: "Berapa biaya mendirikan PT dan UD?", a: "PT membutuhkan biaya notaris Rp 1–3 juta plus SK Menkumham; NIB-nya gratis via OSS-RBA. UD praktis gratis: NIB bisa diterbitkan sendiri via OSS-RBA tanpa notaris, dan sebagian daerah masih meminta Surat Keterangan Usaha (SKDU) yang biayanya sangat kecil." },
      { q: "Pajak UD dan PT mana yang lebih murah?", a: "UD lebih murah pada skala kecil: omzet < Rp 4,8 miliar/tahun cukup PPh final 0,5% dari omzet (PP 23/2018 jo. PP 55/2022). PT dikenakan PPh Badan 22% dengan pembukuan — namun pada omzet besar dengan struktur biaya kompleks, PT justru bisa lebih efisien dan dividen kena final 10% (PMK 128/2019)." },
      { q: "Kapan sebaiknya UD naik kelas menjadi PT?", a: "Tiga sinyal utama: omzet tumbuh konsisten, kebutuhan kredit/tender yang menuntut badan hukum, dan meningkatnya risiko utang atau klaim. Jika hanya ingin kredibilitas lebih tanpa biaya notaris, pertimbangkan PT Perorangan sebagai jembatan sebelum PT penuh." },
      { q: "Apakah UD bisa ikut tender?", a: "UD dengan NIB bisa mengikuti sebagian tender kecil untuk usaha mikro/kecil, tetapi banyak paket dan klien korporat mensyaratkan badan hukum seperti PT. Jika rencana Anda serius masuk tender, mendirikan PT sejak dini menghindarkan Anda kehilangan kesempatan." },
      { q: "Apakah utang UD bisa menyeret harta pribadi?", a: "Ya. Karena UD bukan badan hukum, kreditur dapat mengejar harta pribadi pemilik — kendaraan, tabungan, bahkan rumah — untuk menutup utang usaha. Inilah alasan terbesar memindahkan usaha ke PT ketika nilai transaksi dan utang mulai besar." },
    ],
    relatedSlugs: ["pt-vs-cv", "cv-vs-ud", "pt-vs-pt-perorangan"],
  },

  // ============================================================
  // 5. CV vs UD
  // ============================================================
  {
    slug: "cv-vs-ud",
    title: "CV vs UD: Perbedaan Legalitas, Pajak & Mana yang Tepat untuk Usaha Kecil",
    h1: "CV vs UD: Legalitas Termurah untuk Usaha Kecil, Pilih yang Mana?",
    metaDesc: "Beda CV dan UD: kemitraan 2 orang via notaris Rp 500 rb–1,5 jt vs usaha 1 orang gratis NIB. Tanggung jawab sekutu aktif, pajak 0,5%, dan panduan memilihnya di sini.",
    keywords: [
      "cv vs ud",
      "beda cv dan ud",
      "pilih cv atau ud",
      "legalitas usaha kecil",
      "usaha dagang atau cv",
      "cv untuk usaha keluarga",
    ],
    intro: [
      "CV dan UD adalah dua legalitas paling ramah kantong di Indonesia. UD adalah usaha satu orang tanpa badan hukum — NIB gratis via OSS-RBA dan pajak 0,5% final. CV adalah usaha bersama minimal dua orang (sekutu aktif + sekutu pasif) menurut UU 18/2008, didirikan di notaris/PPNS dengan biaya Rp 500 ribu–1,5 juta.",
      "Karena sama-sama bukan badan hukum, keduanya menanggung risiko tanggung jawab pribadi — tetapi strukturnya berbeda: di UD seluruh beban ada di satu pemilik, di CV sekutu aktif yang menanggung tak terbatas sedangkan sekutu pasif hanya sebatas modal. Halaman ini membantu Anda memilih antara legalitas paling murah (UD) dan struktur kemitraan termurah (CV).",
    ],
    entityA: E_CV,
    entityB: E_UD,
    tableRows: [
      { aspect: "Dasar hukum", a: "UU 18/2008 (perubahan KUHD)", b: "Perdagangan perseorangan — legalitas via NIB OSS-RBA" },
      { aspect: "Status badan hukum", a: "Bukan badan hukum", b: "Bukan badan hukum" },
      { aspect: "Jumlah pemilik", a: "Minimal 2 orang: sekutu aktif + sekutu pasif", b: "1 pemilik penuh" },
      { aspect: "Tanggung jawab hukum", a: "Sekutu aktif tak terbatas; sekutu pasif sebatas modal", b: "Pemilik menanggung seluruh utang (tak terbatas)" },
      { aspect: "Modal minimum", a: "Tidak ada — disepakati para sekutu", b: "Tanpa modal minimum" },
      { aspect: "Pajak penghasilan", a: "Pada para sekutu: final 0,5% bila omzet < Rp 4,8 M atau progresif Pasal 17", b: "PPh Orang Pribadi: final 0,5% bila omzet < Rp 4,8 M/tahun" },
      { aspect: "Biaya pendirian", a: "Rp 500 ribu–1,5 juta (akta notaris/PPNS)", b: "Rp 0–500 ribu (NIB gratis via OSS)" },
      { aspect: "Waktu pendirian", a: "2–4 hari kerja", b: "1 hari kerja" },
      { aspect: "NPWP", a: "Memakai NPWP para sekutu", b: "NPWP pemilik" },
      { aspect: "Kredibilitas", a: "Akta notaris — lebih meyakinkan untuk kemitraan & pembiayaan", b: "Paling sederhana — cukup untuk transaksi harian" },
      { aspect: "Cocok untuk", a: "Usaha berdua, keluarga besar & pemodal diam", b: "Warung, toko & jasa satu orang" },
    ],
    verdictA: [
      "Usaha dijalankan bersama (minimal 2 orang) dengan pembagian peran jelas",
      "Ada anggota keluarga/pemodal yang hanya menyetor dana (sekutu pasif)",
      "Butuh akta untuk membuka rekening CV, mengajukan kredit, atau meyakinkan supplier",
      "Perjanjian kemitraan ingin tercatat resmi di akta notaris",
    ],
    verdictB: [
      "Anda menjalankan sendiri tanpa mitra",
      "Anggaran legalitas nyaris nol — NIB gratis via OSS-RBA",
      "Skala masih mikro: warung, toko online kecil, jasa",
      "Tidak ingin dokumen akta & perjanjian sekutu sama sekali",
    ],
    recommendation: [
      "Jika Anda sendirian, UD adalah jawaban paling efisien: gratis, 1 hari kerja, pajak 0,5% final, dan tanpa kewajiban pembukuan berat. Tidak ada gunanya membayar akta CV untuk usaha satu orang — struktur kemitraan CV baru relevan saat ada minimal dua pihak dengan peran modal atau pengelolaan.",
      "Pilih CV ketika usaha melibatkan dua orang atau lebih dan Anda ingin pembagian hak-kewajiban tercatat resmi dalam akta. Struktur sekutu pasif sangat cocok untuk pola 'satu orang kerja, satu orang modal' yang umum di usaha keluarga. Biaya Rp 500 ribu–1,5 juta adalah investasi kecil untuk menghindari sengketa kekeluargaan di kemudian hari.",
      "Ingat, keduanya bukan badan hukum: sekutu aktif CV dan pemilik UD sama-sama menanggung utang dengan harta pribadi. Saat omzet tumbuh besar atau risiko meningkat, jalur upgrade naturalnya adalah CV → PT, atau UD → PT Perorangan/PT biasa. Kami menangani seluruh skenario transisi ini, termasuk aspek perpajakannya.",
    ],
    faq: [
      { q: "Apa beda mendasar CV dan UD?", a: "CV adalah kemitraan minimal 2 orang (sekutu aktif + sekutu pasif) berdasarkan akta notaris menurut UU 18/2008. UD adalah usaha satu orang tanpa struktur kemitraan. Keduanya bukan badan hukum, tetapi CV memiliki akta perjanjian sekutu sementara UD sepenuhnya menyatu dengan pemiliknya." },
      { q: "CV atau UD yang lebih murah?", a: "UD lebih murah: NIB gratis via OSS-RBA dan biaya tambahan nyaris nol. CV membutuhkan akta notaris/PPNS Rp 500 ribu–1,5 juta. Namun biaya CV membeli sesuatu yang UD tidak punya: perjanjian kemitraan resmi antara para sekutu." },
      { q: "Apakah sekutu pasif CV berisiko kehilangan harta pribadi?", a: "Tidak sebatas sekutu aktif. Sekutu pasif hanya menanggung sebatas modal yang disetorkan karena tidak ikut mengelola usaha. Sekutu aktif yang mengelola CV menanggung utang secara tak terbatas dengan seluruh harta pribadinya." },
      { q: "Pajak CV dan UD bagaimana?", a: "Keduanya menikmati PPh final 0,5% dari omzet selama omzet di bawah Rp 4,8 miliar/tahun (PP 23/2018 jo. PP 55/2022). Pajak CV dikenakan pada para sekutu (NPWP sekutu), sedangkan UD dilaporkan dalam SPT orang pribadi pemilik. Tidak ada yang wajib audit." },
      { q: "Usaha keluarga sebaiknya CV atau UD?", a: "Kalau hanya satu anggota keluarga yang aktif, UD cukup. Kalau ada dua orang atau lebih dengan modal bersama — misalnya suami-istri atau kakak-adik — CV lebih aman karena hak, kewajiban, dan porsi masing-masing tercatat di akta, mengurangi potensi sengketa." },
      { q: "Kapan CV atau UD harus diupgrade?", a: "Saat omzet mendekati Rp 4,8 miliar, kebutuhan tender/kredit besar muncul, atau risiko utang meningkat. CV dapat dikonversi ke PT biasa; UD dapat naik ke PT Perorangan (jika solo) atau PT biasa (jika berdua). Semua jalur ini kami tangani lengkap." },
    ],
    relatedSlugs: ["cv-vs-pt-perorangan", "pt-vs-ud", "cv-vs-firma"],
  },

  // ============================================================
  // 6. PT PMA vs PT Lokal
  // ============================================================
  {
    slug: "pt-pma-vs-pt-lokal",
    title: "PT PMA vs PT Lokal: Modal Rp 10 Miliar, Kepemilikan Asing & Perbedaan Lengkap",
    h1: "PT PMA vs PT Lokal: Perbedaan Modal, Kepemilikan & Kewajiban",
    metaDesc: "Beda PT PMA dan PT lokal: saham asing hingga 100%, modal disetor min Rp 10 miliar (BKPM 5/2021), LKPM investasi wajib, vs PT lokal bebas modal Rp 10 juta. Panduan investor.",
    keywords: [
      "pt pma vs pt lokal",
      "beda pt pma dan pt lokal",
      "modal minimum pt pma",
      "pendirian pt pma",
      "saham asing indonesia",
      "bkpm 5/2021",
    ],
    intro: [
      "PT PMA (Penanaman Modal Asing) dan PT lokal sama-sama Perseroan Terbatas berbadan hukum Indonesia — tetapi keduanya hidup di dunia regulasi berbeda. PT lokal diatur UU 40/2007 dengan modal dasar bebas (praktik umum Rp 10 juta), sementara PT PMA tunduk pada rezim investasi UU 25/2007 dan Peraturan BKPM 5/2021 melalui OSS-RBA, termasuk kewajiban modal disetor minimal Rp 10 miliar dengan komitmen investasi terencana (selalu cek ketentuan investasi terbaru BKPM/Perpres 5/2025).",
      "Perbedaan terbesarnya ada pada kepemilikan: PT PMA boleh dimiliki saham asing hingga 100% tergantung KBLI, sementara PT lokal wajib dimiliki WNI/badan hukum Indonesia. Konsekuensinya menjalar ke biaya pendirian (Rp 8–20 juta vs Rp 1–3 juta), kewajiban laporan LKPM investasi, hingga akses visa investor. Ini perbandingan wajib dibaca sebelum memutuskan struktur investasi di Indonesia.",
    ],
    entityA: E_PMA,
    entityB: E_PT,
    tableRows: [
      { aspect: "Dasar hukum", a: "UU 25/2007 + Peraturan BKPM 5/2021 (OSS-RBA); cek ketentuan investasi terbaru BKPM/Perpres 5/2025", b: "UU 40/2007 jo. UU 6/2023 (Cipta Kerja)" },
      { aspect: "Pemegang saham", a: "Asing hingga 100% tergantung KBLI (sebagian bidang dibatasi/patungan)", b: "WNI atau badan hukum Indonesia" },
      { aspect: "Modal minimum", a: "Modal disetor min Rp 10 miliar + komitmen investasi terencana (cek ketentuan investasi terbaru BKPM/Perpres 5/2025)", b: "Modal dasar bebas — praktik umum Rp 10 juta; PT kecil tak wajib menyetor 25%" },
      { aspect: "Pajak penghasilan", a: "PPh Badan 22%; SPT Tahunan Badan wajib", b: "PPh Badan 22%; dividen final 10% (PMK 128/2019) untuk pemilik orang pribadi" },
      { aspect: "Kewajiban laporan khusus", a: "LKPM (laporan kegiatan penanaman modal) berkala via OSS-RBA", b: "Tidak ada laporan investasi khusus; cukup kewajiban umum" },
      { aspect: "Biaya pendirian", a: "Rp 8–20 juta (notaris + legalisasi + persetujuan BKPM)", b: "Rp 1–3 juta (biaya notaris)" },
      { aspect: "Waktu pendirian", a: "10–20 hari kerja", b: "5–10 hari kerja" },
      { aspect: "NIB & izin usaha", a: "NIB + izin berusaha via OSS-RBA sesuai risiko KBLI", b: "NIB + izin berusaha via OSS-RBA sesuai risiko KBLI" },
      { aspect: "Visa & izin tinggal", a: "Jalur KITAS investor bagi pemegang saham asing", b: "WNA di direksi butuh RPTKA + KITAS kerja" },
      { aspect: "Akses bidang usaha", a: "Mengikuti Daftar Bidang Usaha Penanaman Modal (positive list)", b: "Bebas semua bidang untuk warga Indonesia" },
      { aspect: "Akses tender", a: "Beberapa paket tender dibatasi untuk entitas asing", b: "Hampir semua tender terbuka" },
      { aspect: "Cocok untuk", a: "Investor asing & dana luar negeri", b: "Wirausaha & investor Indonesia" },
    ],
    verdictA: [
      "Modal berasal dari luar negeri dan harus tercatat sebagai investasi asing",
      "Pemegang saham WNA ingin memegang saham hingga 100% sesuai KBLI",
      "Butuh KITAS investor dan struktur grup multinasional",
      "Proyek manufaktur/perdagangan skala besar yang menuntut komitmen investasi",
    ],
    verdictB: [
      "Pendiri semua WNI dan modalnya domestik",
      "Anggaran legalitas ringan: Rp 1–3 juta, 5–10 hari kerja",
      "Modal usaha masih kecil — tidak realistis menyetor Rp 10 miliar",
      "Target pasar/tender domestik penuh tanpa batasan kepemilikan asing",
    ],
    recommendation: [
      "Pilihan ini bukan soal selera, tetapi soal kewarganegaraan modal. Jika ada saham yang dimiliki WNA atau dana dari luar negeri, bentuknya hampir selalu PT PMA — pendiri WNI tidak boleh 'menampung' saham untuk orang asing (praktik nominee dilarang UU 25/2007 dan berisiko pembatalan kepemilikan). PT PMA memberi kepastian hukum, jalur KITAS investor, dan akses insentif fasilitas investasi.",
      "Kalau seluruh pendiri WNI dan modalnya domestik, PT lokal adalah pilihan jelas: lebih murah (Rp 1–3 juta), lebih cepat (5–10 hari kerja), dan bebas dari kewajiban modal Rp 10 miliar serta LKPM investasi. Kepatuhan pajak keduanya setara — PPh Badan 22% dan SPT Tahunan Badan — jadi perbedaannya terpusat pada rezim investasi BKPM.",
      "Catatan penting 2026: ketentuan investasi terus disesuaikan — modal disetor dan komitmen investasi PT PMA mengacu Peraturan BKPM 5/2021 dengan pembaruan lewat Perpres 5/2025. Sebelum memutuskan, selalu cek ketentuan investasi terbaru BKPM/Perpres 5/2025 dan konsultasikan KBLI Anda: sebagian bidang dibatasi atau menuntut patungan dengan lokal. Tim kami memantau regulasi ini harian dan menyiapkan struktur yang patuh sejak akta pertama.",
    ],
    faq: [
      { q: "Berapa modal minimum PT PMA?", a: "Berdasarkan Peraturan BKPM 5/2021, modal disetor PT PMA minimal Rp 10 miliar per lokasi proyek dengan rencana investasi terencana — merujuk ketentuan investasi terbaru BKPM/Perpres 5/2025. PT lokal tidak punya syarat ini: modal dasar bebas dengan praktik umum Rp 10 juta." },
      { q: "Bisakah PT PMA dimiliki 100% oleh asing?", a: "Bisa, tergantung KBLI-nya. Daftar Bidang Usaha Penanaman Modal menentukan bidang yang terbuka 100% untuk asing, yang wajib patungan dengan lokal, hingga yang tertutup. Kami bantu verifikasi KBLI usaha Anda sebelum akta dibuat agar struktur sahamnya benar sejak awal." },
      { q: "Apakah PT PMA wajib laporan LKPM?", a: "Ya. PT PMA wajib melaporkan LKPM (laporan kegiatan penanaman modal) berkala via OSS-RBA — biasanya triwulanan atau semesteran sesuai skala investasi. Keterlambatan LKPM dapat mempersulit perpanjangan izin dan KITAS investor. PT lokal tidak punya kewajiban laporan investasi ini." },
      { q: "Apakah WNA bisa menjadi direksi di PT lokal?", a: "PT lokal didirikan oleh WNI, tetapi WNA dapat menjabat direksi dengan syarat perusahaan mengajukan RPTKA (rencana penggunaan tenaga kerja asing) dan memperoleh KITAS kerja bagi yang bersangkutan. Perlu diingat, jabatan direksi tidak menyamakan statusnya dengan pemegang saham." },
      { q: "Berapa biaya dan waktu pendirian keduanya?", a: "PT lokal: Rp 1–3 juta dan 5–10 hari kerja melalui notaris + SK Menkumham. PT PMA: Rp 8–20 juta dan 10–20 hari kerja karena ada persetujuan investasi, legalisasi dokumen asing, dan penyesuaian KBLI pada OSS-RBA." },
      { q: "Apakah pajak PT PMA berbeda dengan PT lokal?", a: "Tarifnya sama: PPh Badan 22% dengan SPT Tahunan Badan. Perbedaannya ada pada kewajiban pelaporan investasi (LKPM) dan akses insentif — PT PMA tertentu dapat memperoleh fasilitas investasi seperti tax allowance/holiday sesuai ketentuan BKPM yang berlaku." },
    ],
    relatedSlugs: ["pt-pma-vs-kantor-perwakilan", "pt-vs-cv", "pt-vs-pt-perorangan"],
  },

  // ============================================================
  // 7. CV vs Firma
  // ============================================================
  {
    slug: "cv-vs-firma",
    title: "CV vs Firma: Perbedaan Sekutu Aktif, Pasif & Tanggung Jawab (KUHD)",
    h1: "CV vs Firma: Kemitraan dengan Pemodal Diam vs Kemitraan Setara",
    metaDesc: "Beda CV dan Firma: CV punya sekutu pasif pemodal diam, Firma semua sekutu aktif menandatangani. Keduanya bukan badan hukum, pajak 0,5%, biaya Rp 500 rb–1,5 jt. Cek perbandingannya.",
    keywords: [
      "cv vs firma",
      "beda cv dan firma",
      "firma atau cv",
      "sekutu aktif sekutu pasif",
      "kemitraan kuhd",
      "firma untuk kantor profesional",
    ],
    intro: [
      "CV dan Firma sama-sama kemitraan di bawah rezim KUHD yang bukan badan hukum — dan sering tertukar. Perbedaan intinya ada pada pola sekutu: CV memungkinkan sekutu pasif (pemodal yang tidak mengelola) berdampingan dengan sekutu aktif, sedangkan Firma menuntut SEMUA sekutu aktif, semuanya menandatangani nama firma, dan semuanya menanggung utang tanpa batas.",
      "Pilihan di antara keduanya sering menentukan keberlangsungan relasi bisnis: CV melindungi pemodal diam sebatas modalnya, Firma menegaskan kesetaraan penuh antar para ahli. Halaman ini membedah perbedaan CV vs Firma dari dasar hukum, tanggung jawab, pajak, sampai skenario penggunaan yang paling tepat untuk masing-masing.",
    ],
    entityA: E_CV,
    entityB: E_FIRMA,
    tableRows: [
      { aspect: "Dasar hukum", a: "UU 18/2008 (perubahan KUHD)", b: "KUHD Pasal 16–35" },
      { aspect: "Status badan hukum", a: "Bukan badan hukum", b: "Bukan badan hukum" },
      { aspect: "Jumlah pemilik", a: "Minimal 2 orang: sekutu aktif + sekutu pasif", b: "Minimal 2 sekutu — SEMUA aktif & menandatangani nama firma" },
      { aspect: "Pemodal diam", a: "Ada — sekutu pasif hanya memodali tanpa mengelola", b: "Tidak dikenal — semua sekutu ikut mengelola" },
      { aspect: "Tanggung jawab hukum", a: "Sekutu aktif tak terbatas; sekutu pasif sebatas modal", b: "SEMUA sekutu tak terbatas dengan harta pribadi" },
      { aspect: "Kewenangan mengelola", a: "Hanya sekutu aktif yang mewakili CV", b: "Setiap sekutu berwenang mewakili firma" },
      { aspect: "Pajak penghasilan", a: "Pada para sekutu: final 0,5% bila omzet < Rp 4,8 M atau progresif Pasal 17", b: "Pada masing-masing sekutu: final 0,5% bila omzet < Rp 4,8 M atau progresif" },
      { aspect: "Biaya pendirian", a: "Rp 500 ribu–1,5 juta (akta notaris/PPNS)", b: "Rp 500 ribu–1,5 juta (akta notaris)" },
      { aspect: "Waktu pendirian", a: "2–4 hari kerja", b: "2–4 hari kerja" },
      { aspect: "Kewajiban laporan", a: "Kepatuhan ringan, tidak wajib audit", b: "Kepatuhan ringan, tidak wajib audit" },
      { aspect: "Cocok untuk", a: "Usaha keluarga & kombinasi pemodal-pengelola", b: "Kantor profesional setara: advokat, arsitek, konsultan" },
    ],
    verdictA: [
      "Ada pihak yang hanya memodali tanpa ikut mengelola (sekutu pasif)",
      "Anda ingin posisi pemodal dilindungi sebatas modalnya",
      "Kewenangan pengelolaan perlu terpusat ke satu/dua orang saja",
      "Usaha keluarga dengan pembagian peran modal vs operasional",
    ],
    verdictB: [
      "Semua anggota sama-sama ahli dan aktif mengelola",
      "Kesetaraan penuh diinginkan: semua sekutu berwenang mewakili firma",
      "Bisnis jasa profesional yang menjual reputasi kolektif (firma advokat, arsitek)",
      "Tidak ada pihak yang sekadar memodali diam-diam",
    ],
    recommendation: [
      "Perbedaan penentunya adalah keberadaan pemodal diam. Jika ada pihak yang menyuntikkan modal tapi tidak ikut bekerja, CV adalah satu-satunya bentuk yang mengakomodasinya dengan jelas: sekutu pasif menanggung sebatas modal, sekutu aktif mengelola dan menanggung tak terbatas. Struktur ini ideal untuk usaha keluarga dan kombinasi pemodal-pengelola.",
      "Pilih Firma ketika semua anggota adalah pekerja aktif dengan keahlian setara — pola klasik kantor advokat, arsitek, atau konsultan yang menjual nama bersama. Kewenangan setiap sekutu untuk mewakili firma mempercepat operasional, tetapi imbangi dengan perjanjian internal yang rapi karena semua sekutu menanggung utang secara pribadi tanpa batas.",
      "Baik CV maupun Firma bukan badan hukum, sehingga keduanya tidak menarik bagi investor saham dan keduanya menikmati pajak ringan 0,5% final untuk omzet di bawah Rp 4,8 miliar. Ketika skala usaha membesar atau risiko meningkat, konversi ke PT adalah jalur alaminya — termasuk penataan aset dan pajak yang kami tangani end-to-end.",
    ],
    faq: [
      { q: "Apa beda inti CV dan Firma?", a: "CV menampung dua jenis sekutu: aktif yang mengelola dan pasif yang hanya memodali. Firma tidak mengenal pemodal diam — semua sekutu aktif, semuanya menandatangani nama firma, dan semuanya menanggung utang dengan harta pribadi tanpa batas menurut KUHD." },
      { q: "Apakah Firma dan CV berbadan hukum?", a: "Keduanya bukan badan hukum. Legalitasnya cukup akta notaris (CV via notaris/PPNS Rp 500 ribu–1,5 juta; Firma via akta notaris dengan rentang biaya serupa), tanpa SK Kemenkumham. Konsekuensinya, tanggung jawab pribadi para sekutu tidak terbatas sesuai perannya." },
      { q: "Bagaimana pajak CV dan Firma?", a: "Sama-sama pajak di tingkat para sekutu, bukan pada badannya. Dengan omzet di bawah Rp 4,8 miliar/tahun, masing-masing sekutu dapat memakai PPh final 0,5% dari omzet (PP 23/2018 jo. PP 55/2022) atau tarif progresif Pasal 17. NPWP memakai NPWP para sekutu dan tidak ada kewajiban audit." },
      { q: "Kantor advokat/arsitek sebaiknya CV atau Firma?", a: "Jika semua anggota praktik aktif dan ingin nama bersama yang setara, Firma adalah bentuk tradisionalnya. Jika ada pihak yang hanya memodali atau ingin kewenangan terpusat pada pengelola utama, CV lebih tepat. Banyak kantor profesional akhirnya mendirikan PT ketika skalanya membesar." },
      { q: "Berapa biaya dan lama pendirian keduanya?", a: "Setara: akta notaris sekitar Rp 500 ribu–1,5 juta dan selesai 2–4 hari kerja sejak dokumen para sekutu lengkap. Biaya utamanya adalah jasa notaris dan pembuatan akta perjanjian kemitraan yang menjabat hak-kewajiban tiap sekutu." },
      { q: "Mana yang bisa menerima investor?", a: "Tidak keduanya. CV dan Firma bukan badan hukum sehingga tidak ada struktur saham untuk investor. Investor besar umumnya menuntut konversi ke PT. Jika rencana Anda menerima pendanaan dalam 1–2 tahun ke depan, pertimbangkan mendirikan PT sejak awal." },
    ],
    relatedSlugs: ["cv-vs-ud", "pt-vs-cv", "cv-vs-koperasi"],
  },

  // ============================================================
  // 8. PT vs Yayasan
  // ============================================================
  {
    slug: "pt-vs-yayasan",
    title: "PT vs Yayasan: Beda Tujuan, Modal, Pajak & Boleh Cari Laba?",
    h1: "PT vs Yayasan: Bisnis atau Sosial — Struktur Mana yang Anda Butuhkan?",
    metaDesc: "Beda PT dan yayasan: PT mencari laba dengan PPh Badan 22%, yayasan untuk tujuan sosial dengan modal awal Rp 10 juta & dilarang membagi keuntungan. Panduan pendirian lengkap.",
    keywords: [
      "pt vs yayasan",
      "beda pt dan yayasan",
      "pendirian yayasan",
      "yayasan bisa bisnis",
      "modal awal yayasan",
      "uu 16/2001 yayasan",
    ],
    intro: [
      "PT dan yayasan dibangun untuk tujuan berlawanan. PT (UU 40/2007) dirancang mencari keuntungan bagi pemegang saham — laba boleh dibagikan sebagai dividen. Yayasan (UU 16/2001 jo. UU 28/2004) justru dilarang didirikan untuk mencari laba: kekayaannya dialokasikan untuk tujuan sosial, keagamaan, atau kemanusiaan, dan pendiri tidak boleh menerima surplus.",
      "Masalahnya, banyak organisasi sosial juga menjalankan aktivitas ekonomi (sekolah berbayar, rumah sakit, unit usaha donasi) — dan di sinilah pertanyaan struktur menjadi serius: kapan butuh PT, kapan cukup yayasan, dan bagaimana pajak masing-masing? Halaman ini menjawabnya dengan angka nyata: modal awal yayasan minimal Rp 10 juta tunai, biaya pendirian Rp 1,5–3 juta, dan unit ekonomi yayasan tetap kena PPh Badan 22%.",
    ],
    entityA: E_PT,
    entityB: E_YAYASAN,
    tableRows: [
      { aspect: "Dasar hukum", a: "UU 40/2007 jo. UU 6/2023 (Cipta Kerja)", b: "UU 16/2001 jo. UU 28/2004 tentang Yayasan" },
      { aspect: "Tujuan utama", a: "Mencari keuntungan bagi pemegang saham", b: "Kegiatan sosial, keagamaan & kemanusiaan — dilarang mencari laba" },
      { aspect: "Status badan hukum", a: "Ya — badan hukum penuh", b: "Ya — badan hukum penuh" },
      { aspect: "Struktur kepemilikan", a: "Pemegang saham (minimal 2 orang)", b: "Tanpa pemilik — organ Pembina, Pengurus, Pengawas" },
      { aspect: "Modal minimum", a: "Modal dasar bebas — praktik umum Rp 10 juta", b: "Modal awal minimal Rp 10 juta berupa uang tunai" },
      { aspect: "Pembagian keuntungan", a: "Boleh — dividen ke pemegang saham (final 10% bila memenuhi syarat PMK 128/2019)", b: "DILARANG membagi ke pendiri, pembina, pengurus & pengawas" },
      { aspect: "Pajak penghasilan", a: "PPh Badan 22% atas seluruh penghasilan usaha", b: "Kegiatan sosial bukan objek; unit ekonomi kena PPh Badan 22% (atau final 0,5% bila omzet < Rp 4,8 M/tahun)" },
      { aspect: "Biaya pendirian", a: "Rp 1–3 juta (notaris) + SK Menkumham", b: "Rp 1,5–3 juta (akta notaris + SK Menkumham)" },
      { aspect: "Waktu pendirian", a: "5–10 hari kerja", b: "5–10 hari kerja" },
      { aspect: "Kewajiban laporan", a: "SPT Tahunan Badan + audit bila memenuhi kriteria", b: "Laporan tahunan pengelolaan + kepatuhan pajak unit usaha" },
      { aspect: "Akses dana", a: "Investor saham, kredit bank komersial", b: "Hibah, dana CSR, donasi & wakaf" },
      { aspect: "Cocok untuk", a: "Bisnis komersial dengan target laba", b: "Sekolah, rumah sakit sosial, lembaga amal & keagamaan" },
    ],
    verdictA: [
      "Tujuan utama usaha Anda adalah keuntungan yang boleh dinikmati pendiri",
      "Anda ingin menerima investor atau membagi dividen secara legal",
      "Model bisnis komersial penuh: retail, jasa, manufaktur, digital",
      "Perlu fleksibilitas saham untuk kepemilikan dan warisan usaha",
    ],
    verdictB: [
      "Misi Anda sosial, keagamaan, atau kemanusiaan — bukan laba pribadi",
      "Rencana mendanai lewat hibah, CSR korporasi, atau donasi",
      "Kegiatan utama: sekolah, pesantren, rumah sakit/klinin sosial, amal",
      "Anda siap dengan tata kelola organ: pembina, pengurus, pengawas",
    ],
    recommendation: [
      "Aturannya sederhana: kalau keuntungan akan dikembalikan ke pemilik, bentuknya harus PT — bukan yayasan. Membungkus bisnis komersial dalam yayasan untuk 'hemat pajak' adalah kesalahan fatal: unit ekonomi yayasan tetap dikenakan PPh Badan 22% (atau final 0,5% untuk omzet unit di bawah Rp 4,8 miliar), dan pembagian keuntungan ke pendiri/pengurus dilarang keras oleh UU 16/2001.",
      "Pilih yayasan ketika misi utamanya sosial dan sumber dananya hibah, donasi, atau CSR. Kegiatan ekonomi tetap boleh — sekolah berbayar atau unit usaha produktif — asalkan surplusnya diinvestasikan kembali untuk tujuan sosial yayasan. Banyak yayasan besar mengombinasikan keduanya: yayasan untuk misi, PT afiliasi untuk bisnis yang mendanainya.",
      "Struktur hibrida ini justru yang paling sering kami bangun untuk klien pendidikan dan kesehatan: yayasan memegang misi dan aset sosial, sementara PT mengoperasikan bisnis yang dapat dibagikan ke investor. Konsultasikan pemisahan ini sejak awal — salah struktur sejak akta pertama sangat mahal untuk diperbaiki setelah aset dan kegiatan berjalan.",
    ],
    faq: [
      { q: "Apakah yayasan boleh punya bisnis?", a: "Boleh. Yayasan dapat menjalankan kegiatan ekonomi melalui unit usaha, tetapi penghasilannya dikenakan PPh Badan 22% — atau PPh final 0,5% bila omzet unit usaha < Rp 4,8 miliar/tahun. Seluruh surplus harus digunakan untuk tujuan sosial yayasan, bukan dibagi ke pendiri atau pengurus." },
      { q: "Berapa modal awal minimum yayasan?", a: "UU 16/2001 menetapkan modal awal yayasan minimal Rp 10 juta berupa uang tunai, yang dapat berupa hibah dari pihak ketiga atau uang milik pendiri. Bandingkan dengan PT yang modal dasarnya bebas ditentukan pendiri dengan praktik umum Rp 10 juta." },
      { q: "Bolehkah keuntungan yayasan dibagi ke pendiri?", a: "Dilarang. UU 16/2001 jo. UU 28/2004 melarang pendiri, pembina, pengurus, dan pengawas menerima keuntungan atau surplus yayasan. Yang diperbolehkan hanyalah penggantian biaya operasional dan imbalan wajar yang diatur AD/ART — selebihnya untuk tujuan sosial." },
      { q: "Apakah PT cocok untuk kegiatan sosial?", a: "PT bisa menjalankan program sosial sebagai CSR, tetapi strukturnya dirancang untuk laba: pemegang saham berhak dividen. Jika misi utama Anda sosial dan dana dari hibah/donasi, yayasan memberi legitimasi yang lebih kuat di mata donatur dan regulator." },
      { q: "Berapa biaya dan lama pendirian keduanya?", a: "PT: biaya notaris Rp 1–3 juta, SK Menkumham, dan NIB via OSS-RBA — selesai 5–10 hari kerja. Yayasan: akta notaris plus SK Menkumham sekitar Rp 1,5–3 juta, juga 5–10 hari kerja. Biayanya setara; yang membedakan adalah struktur organ dan tujuan yang dicantumkan." },
      { q: "Bagaimana struktur ideal lembaga pendidikan yang juga berbisnis?", a: "Pola yang kami rekomendasikan: yayasan memegang misi, izin lembaga, dan aset sosial; PT afiliasi mengoperasikan unit komersial (misalnya program berbayar atau unit produk) sehingga laba bisnis dapat dikelola lewat rezim pajak PT. Pemisahan ini menjaga kepatuhan UU 16/2001 sekaligus membuka ruang investor untuk sisi bisnisnya." },
    ],
    relatedSlugs: ["yayasan-vs-perkumpulan", "pt-vs-koperasi", "pt-vs-cv"],
  },

  // ============================================================
  // 9. Yayasan vs Perkumpulan
  // ============================================================
  {
    slug: "yayasan-vs-perkumpulan",
    title: "Yayasan vs Perkumpulan: Perbedaan Struktur, Modal & Kepemilikan (UU 16/2001)",
    h1: "Yayasan vs Perkumpulan: Dua Badan Hukum Non-Laba, Mana untuk Anda?",
    metaDesc: "Beda yayasan dan perkumpulan menurut UU 16/2001: yayasan dikelola organ pembina-pengurus-pengawas dengan modal Rp 10 juta, perkumpulan dari rapat anggota. Panduan lengkap.",
    keywords: [
      "yayasan vs perkumpulan",
      "beda yayasan dan perkumpulan",
      "uu 16/2001",
      "badan hukum sosial",
      "pendirian perkumpulan",
      "organ yayasan",
    ],
    intro: [
      "UU 16/2001 memberi Indonesia dua wadah badan hukum non-laba: yayasan dan perkumpulan. Yayasan dipisahkan ke UU 28/2004 dengan organ pembina-pengurus-pengawas dan modal awal tunai minimal Rp 10 juta, cocok untuk kegiatan sosial yang berdiri mandiri. Perkumpulan lahir dari rapat para anggota orang pribadi, dengan struktur demokratis dan kekayaan dari iuran anggota.",
      "Keduanya sama-sama dilarang membagi keuntungan ke anggotanya, tetapi perbedaan struktur kelembagaannya menentukan mana yang cocok: yayasan untuk lembaga besar seperti sekolah dan rumah sakit sosial, perkumpulan untuk asosiasi, komunitas profesi, dan organisasi keanggotaan. Halaman ini membedah keduanya dari akta, biaya, hingga perlakuan pajak unit ekonominya.",
    ],
    entityA: E_YAYASAN,
    entityB: E_PERKUMPULAN,
    tableRows: [
      { aspect: "Dasar hukum", a: "UU 16/2001 jo. UU 28/2004 tentang Yayasan", b: "UU 16/2001 tentang Perkumpulan Berbadan Hukum" },
      { aspect: "Cara berdiri", a: "Akta pendirian notaris oleh pendiri", b: "Rapat pendirian para anggota + akta notaris" },
      { aspect: "Dasar kekayaan", a: "Modal awal minimal Rp 10 juta tunai + hibah/donasi", b: "Iuran anggota & kekayaan organisasi (tanpa modal minimum)" },
      { aspect: "Struktur tertinggi", a: "Organ Pembina, Pengurus & Pengawas", b: "Rapat Anggota — pengurus dipilih dari & oleh anggota" },
      { aspect: "Keanggotaan", a: "Tidak mengenal anggota — pengurus ditunjuk sesuai AD/ART", b: "Berbasis anggota orang pribadi yang bergabung sukarela" },
      { aspect: "Status badan hukum", a: "Badan hukum sejak SK Menkumham", b: "Badan hukum bila didaftarkan; tanpa SK tidak bisa berakta" },
      { aspect: "Tujuan", a: "Sosial, keagamaan & kemanusiaan — bukan mencari laba", b: "Kepentingan bersama anggota — bukan membagi laba" },
      { aspect: "Pajak unit ekonomi", a: "PPh Badan 22% (atau final 0,5% bila omzet < Rp 4,8 M/tahun)", b: "PPh Badan 22% untuk kegiatan ekonomi; iuran anggota umumnya bukan objek" },
      { aspect: "Biaya pendirian", a: "Rp 1,5–3 juta (akta + SK Menkumham)", b: "Rp 1–2 juta (rapat + akta + SK Menkumham)" },
      { aspect: "Waktu pendirian", a: "5–10 hari kerja", b: "5–10 hari kerja" },
      { aspect: "Contoh penggunaan", a: "Sekolah, rumah sakit, lembaga amal", b: "Asosiasi profesi, komunitas, alumni" },
    ],
    verdictA: [
      "Lembaga berdiri mandiri dengan aset & misi besar (sekolah, rumah sakit)",
      "Dana utama dari hibah, CSR, donasi & wakaf",
      "Butuh tata kelola organ formal: pembina, pengurus, pengawas",
      "Siap memenuhi modal awal tunai minimal Rp 10 juta",
    ],
    verdictB: [
      "Organisasi tumbuh dari komunitas & keanggotaan (asosiasi, alumni)",
      "Kekayaan berasal dari iuran anggota, bukan modal pendiri",
      "Menginginkan pengambilan keputusan demokratis lewat rapat anggota",
      "Anggaran pendirian lebih hemat: Rp 1–2 juta",
    ],
    recommendation: [
      "Gunakan yayasan bila lembaga Anda berdiri sebagai entitas mandiri yang menjalankan misi sosial besar — sekolah, pesantren, rumah sakit, lembaga filantropi. Kehadiran organ pembina-pengurus-pengawas memberi tata kelola yang dipercaya donatur besar dan regulator, dengan modal awal Rp 10 juta tunai sebagai fondasi yang wajar untuk lembaga bertaruh serius.",
      "Pilih perkumpulan bila kekuatan organisasi Anda justru para anggotanya — asosiasi profesi, serikat, komunitas alumni, atau kelompok kepentingan. Rapat anggota sebagai pemegang kekuasaan tertinggi membuat legitimasi pengurus selalu berasal dari bawah. Pastikan perkumpulan didaftarkan hingga memperoleh SK Menkumham, karena tanpa badan hukum ia sulit berakta dan membuka rekening korporat.",
      "Dari sisi pajak, keduanya berlaku sama: kegiatan sosial bukan objek PPh, tetapi unit ekonomi/kegiatan ekonomi dikenakan PPh Badan 22% — atau final 0,5% bila omzetnya di bawah Rp 4,8 miliar per tahun. Bila lembaga Anda mulai menjalankan bisnis besar, pertimbangkan struktur campuran: badan sosial untuk misi + PT untuk sisi komersial.",
    ],
    faq: [
      { q: "Apa perbedaan utama yayasan dan perkumpulan?", a: "Yayasan berdiri dari akta pendirian para pendiri dengan organ pembina-pengurus-pengawas dan modal awal Rp 10 juta tunai. Perkumpulan berdiri dari rapat para anggota orang pribadi dengan rapat anggota sebagai kekuasaan tertinggi. Keduanya sama-sama dilarang membagi laba ke anggotanya." },
      { q: "Apakah perkumpulan otomatis berbadan hukum?", a: "Tidak. Perkumpulan baru menjadi badan hukum setelah didaftarkan dan memperoleh SK Kemenkumham. Perkumpulan yang tidak didaftarkan tetap sah sebagai persekutuan, tetapi tidak dapat berakta, sulit membuka rekening korporat, dan lemah di mata hukum formal." },
      { q: "Berapa biaya dan lama pendirian keduanya?", a: "Yayasan: akta notaris + SK Menkumham sekitar Rp 1,5–3 juta, selesai 5–10 hari kerja. Perkumpulan: rapat pendirian, akta, dan SK sekitar Rp 1–2 juta dengan durasi serupa. Biaya terbesar di keduanya adalah jasa notaris dan penyiapan AD/ART." },
      { q: "Bagaimana pajak yayasan dan perkumpulan?", a: "Kegiatan sosial/non-ekonomi umumnya bukan objek PPh. Namun unit ekonomi (usaha produktif) dikenakan PPh Badan 22% — atau PPh final 0,5% bila omzet unit < Rp 4,8 miliar/tahun. Iuran anggota perkumpulan dan hibah murni umumnya bukan penghasilan kena pajak." },
      { q: "Komunitas hobi sebaiknya pilih yang mana?", a: "Untuk komunitas kecil yang belum bertransaksi formal, bentuk tidak resmi atau perkumpulan sederhana sudah cukup. Begitu komunitas menerima hibah besar, mengelola kegiatan berbayar, atau butuh rekening korporat, daftarkan perkumpulan hingga SK Menkumham — atau jika misinya sosial murni dengan aset besar, bentuk yayasan lebih tepat." },
      { q: "Bisakah yayasan diubah menjadi perkumpulan atau sebaliknya?", a: "Tidak ada konversi langsung yang sederhana karena karakter kelembagaannya berbeda (pendiri vs anggota). Praktik umumnya adalah membentuk entitas baru dengan struktur yang benar, lalu mengalihkan aset dan kegiatan secara bertahap dengan penataan pajak yang rapi — proses yang kami tangani untuk klien." },
    ],
    relatedSlugs: ["pt-vs-yayasan", "pt-vs-koperasi", "cv-vs-koperasi"],
  },

  // ============================================================
  // 10. PT vs Koperasi
  // ============================================================
  {
    slug: "pt-vs-koperasi",
    title: "PT vs Koperasi: Perbedaan Saham, SHU, RAT & Tata Kelola (2026)",
    h1: "PT vs Koperasi: Bisnis Modal vs Ekonomi Anggota",
    metaDesc: "Beda PT dan koperasi: saham & dividen untuk pemodal vs SHU untuk anggota dengan RAT tertinggi. PPh 22% dengan fasilitas, biaya pendirian Rp 1–3 jt vs Rp 1–2,5 jt. Cek detailnya.",
    keywords: [
      "pt vs koperasi",
      "beda pt dan koperasi",
      "pendirian koperasi",
      "shu koperasi",
      "koperasi atau pt",
      "uu 25/1992 koperasi",
    ],
    intro: [
      "PT dan koperasi sama-sama badan hukum, tetapi filosofinya berjauhan. PT (UU 40/2007) adalah kendaraan modal: suara dan dividen mengikuti porsi saham. Koperasi (UU 25/1992) adalah kendaraan anggota: satu anggota satu suara, dan keuntungan kembali ke anggota sebagai SHU (Sisa Hasil Usaha) sesuai keaktifan, bukan sebesar modal yang disetor.",
      "Bagi komunitas produsen — petani, nelayan, pelaku UMKM — koperasi sering lebih tepat karena melembagakan gotong royong dan membuka akses program KemenkopUKM. Sementara bisnis yang berorientasi tumbuh dengan investor tetap lebih cocok di PT. Halaman ini membandingkan keduanya dari kekuasaan tertinggi (RUPS vs RAT), pajak, biaya pendirian, sampai tata kelola tahunan.",
    ],
    entityA: E_PT,
    entityB: E_KOPERASI,
    tableRows: [
      { aspect: "Dasar hukum", a: "UU 40/2007 jo. UU 6/2023 (Cipta Kerja)", b: "UU 25/1992 tentang Perkoperasian" },
      { aspect: "Status badan hukum", a: "Ya — SK Menkumham (AHU Online)", b: "Ya — pengesahan badan hukum via KemenkopUKM" },
      { aspect: "Dasar kepemilikan", a: "Saham — suara & dividen proporsional dengan kepemilikan", b: "Keanggotaan — 1 anggota 1 suara" },
      { aspect: "Pengambil keputusan tertinggi", a: "RUPS (Rapat Umum Pemegang Saham)", b: "RAT (Rapat Anggota Tahunan)" },
      { aspect: "Modal minimum", a: "Modal dasar bebas — praktik umum Rp 10 juta", b: "Simpanan pokok & wajib anggota sesuai AD/ART" },
      { aspect: "Distribusi keuntungan", a: "Dividen ke pemegang saham (final 10% bila memenuhi syarat PMK 128/2019)", b: "SHU dibagikan ke anggota sesuai jasa & keaktifan" },
      { aspect: "Pajak penghasilan", a: "PPh Badan 22% (UU HPP)", b: "PPh 22% dengan sejumlah fasilitas bagi koperasi" },
      { aspect: "Biaya pendirian", a: "Rp 1–3 juta (notaris) + NIB OSS-RBA", b: "Rp 1–2,5 juta (akta/RKSM + KemenkopUKM)" },
      { aspect: "Waktu pendirian", a: "5–10 hari kerja", b: "7–14 hari kerja" },
      { aspect: "Kewajiban tahunan", a: "SPT Tahunan Badan + audit bila memenuhi kriteria", b: "RAT wajib tahunan + laporan kepada KemenkopUKM" },
      { aspect: "Akses pendanaan", a: "Investor saham, kredit bank komersial, IPO", b: "Program & pembiayaan KemenkopUKM, koperasi sekunder" },
      { aspect: "Cocok untuk", a: "Bisnis berorientasi tumbuh & investor", b: "Komunitas produsen & ekonomi keanggotaan" },
    ],
    verdictA: [
      "Anda membangun bisnis untuk investor dengan kepemilikan saham jelas",
      "Kecepatan keputusan penting: RUPS & direksi, bukan rapat massal",
      "Butuh akses kredit bank komersial & kontrak korporat besar",
      "Target ekspansi multi-cabang, merger, atau pasar modal",
    ],
    verdictB: [
      "Anggota komunitas ingin melembagakan usaha bersama (tani, nelayan, UMKM)",
      "Prinsip 1 anggota 1 suara dan SHU sesuai keaktifan diinginkan",
      "Butuh akses program, pelatihan & pembiayaan KemenkopUKM",
      "Misi ekonomi rakyat: koperasi sekolah, desa, atau karyawan",
    ],
    recommendation: [
      "Pilih PT bila logika bisnis Anda adalah logika modal: siapa menanam lebih banyak, dia punya suara dan dividen lebih besar. PT memberi struktur saham yang fleksibel, akses investor dan kredit komersial, serta kecepatan pengambilan keputusan lewat RUPS dan direksi. Biaya Rp 1–3 juta dan 5–10 hari kerja menjadikannya standar emas bisnis Indonesia.",
      "Pilih koperasi bila tujuannya memakmurkan anggota, bukan memperbesar modal pemilik. SHU yang dibagikan sesuai jasa keaktifan, RAT sebagai kekuasaan tertinggi, dan akses program KemenkopUKM membuat koperasi ideal untuk petani, nelayan, karyawan, dan ekonomi desa. Imbangi dengan kewajibannya: RAT tahunan wajib dan tata kelola keanggotaan yang tertib.",
      "Dari sisi pajak keduanya dikenakan PPh 22%, tetapi koperasi menikmati sejumlah fasilitas — dan SHU yang mengalir ke anggota memiliki perlakuan tersendiri yang perlu ditata benar. Kami membantu pendirian kedua bentuk ini: akta & SK Menkumham untuk PT, akta/RKSM dan pengesahan KemenkopUKM untuk koperasi, termasuk penataan pajaknya.",
    ],
    faq: [
      { q: "Apakah koperasi dikenakan pajak?", a: "Ya, koperasi dikenakan PPh 22% dengan sejumlah fasilitas perpajakan yang tersedia bagi koperasi. Distribusi SHU ke anggota memiliki perlakuan tersendiri — karena itu penataan pembukuan koperasi sebaiknya dibenarkan sejak awal agar fasilitasnya optimal." },
      { q: "Apa itu SHU dan bagaimana bedanya dengan dividen PT?", a: "SHU (Sisa Hasil Usaha) adalah keuntungan koperasi yang dibagikan ke anggota sesuai jasa dan keaktifan masing-masing — bukan proporsional modal. Di PT, dividen dibagikan sesuai porsi saham. Inilah perbedaan filosofi paling mendasar antara koperasi (UU 25/1992) dan PT (UU 40/2007)." },
      { q: "Siapa yang berkuasa di koperasi dan PT?", a: "Kekuasaan tertinggi koperasi ada di RAT (Rapat Anggota Tahunan) dengan prinsip 1 anggota 1 suara. Di PT kekuasaan tertingginya RUPS, dengan suara proporsional saham. Akibatnya koperasi lebih demokratis tapi bisa lebih lambat; PT lebih cepat tapi mengikuti pemodal besar." },
      { q: "Berapa modal dan biaya pendirian keduanya?", a: "PT: modal dasar bebas (praktik umum Rp 10 juta), biaya notaris Rp 1–3 juta, selesai 5–10 hari kerja. Koperasi: modal dari simpanan pokok & wajib anggota sesuai AD/ART, biaya Rp 1–2,5 juta, dan pengesahan via KemenkopUKM sekitar 7–14 hari kerja." },
      { q: "Bisakah koperasi ikut tender dan berbisnis besar?", a: "Bisa. Koperasi berbadan hukum dapat memiliki NIB, mengikuti tender (termasuk kuota khusus UMKM/koperasi di beberapa paket), dan menjalankan unit usaha. Namun untuk bisnis modal intensif dengan investor swasta, struktur PT umumnya lebih mudah digunakan." },
      { q: "Bisakah badan hukum lain menjadi anggota koperasi?", a: "Keanggotaan koperasi pada dasarnya berbasis orang pribadi, dengan kemungkinan keanggotaan badan hukum tertentu (misalnya koperasi) diatur dalam AD/ART sesuai ketentuan yang berlaku. Untuk korporasi yang ingin berpartisipasi dalam ekonomi koperasi, skema kerja sama usaha sering lebih praktis daripada keanggotaan langsung." },
    ],
    relatedSlugs: ["pt-vs-yayasan", "cv-vs-koperasi", "pt-vs-cv"],
  },

  // ============================================================
  // 11. CV vs Koperasi
  // ============================================================
  {
    slug: "cv-vs-koperasi",
    title: "CV vs Koperasi: Kemitraan Modal vs Ekonomi Anggota — Mana untuk Kelompok Anda?",
    h1: "CV vs Koperasi: Memilih Wadah Usaha Bersama yang Tepat",
    metaDesc: "Beda CV dan koperasi: CV kemitraan sekutu aktif-pasif bukan badan hukum, koperasi badan hukum 1 anggota 1 suara dengan SHU. Pajak 0,5% vs PPh 22% berfasilitas. Panduan lengkap.",
    keywords: [
      "cv vs koperasi",
      "beda cv dan koperasi",
      "koperasi atau cv",
      "usaha bersama kelompok",
      "koperasi untuk umkm",
      "legalitas kelompok tani",
    ],
    intro: [
      "Kelompok usaha punya dua wadah populer: CV dan koperasi. CV (UU 18/2008) adalah kemitraan minimal dua orang — sekutu aktif yang mengelola dan sekutu pasif yang memodali — dengan akta notaris Rp 500 ribu–1,5 juta, tetapi bukan badan hukum. Koperasi (UU 25/1992) adalah badan hukum keanggotaan dengan prinsip 1 anggota 1 suara dan SHU untuk anggota, didirikan lewat KemenkopUKM sekitar Rp 1–2,5 juta.",
      "Pilihan di antara keduanya menentukan siapa yang berkuasa (sekutu pemodal besar vs rapat anggota), bagaimana keuntungan dibagi (laba kemitraan vs SHU), dan seberapa berat tata kelolanya (CV ringan tanpa RAT vs koperasi dengan RAT tahunan wajib). Halaman ini membedah semuanya, termasuk pajak: PPh 0,5% final pada para sekutu CV vs PPh 22% berfasilitas di koperasi.",
    ],
    entityA: E_CV,
    entityB: E_KOPERASI,
    tableRows: [
      { aspect: "Dasar hukum", a: "UU 18/2008 (perubahan KUHD)", b: "UU 25/1992 tentang Perkoperasian" },
      { aspect: "Status badan hukum", a: "Bukan badan hukum", b: "Ya — pengesahan via KemenkopUKM" },
      { aspect: "Dasar kebersamaan", a: "Akta kemitraan sekutu aktif + sekutu pasif", b: "Keanggotaan sukarela & terbuka; 1 anggota 1 suara" },
      { aspect: "Pengambil keputusan", a: "Sesuai akta — kewenangan di sekutu aktif", b: "RAT (Rapat Anggota Tahunan) sebagai kekuasaan tertinggi" },
      { aspect: "Distribusi hasil usaha", a: "Laba dibagi sesuai perjanjian para sekutu", b: "SHU dibagikan sesuai jasa & keaktifan anggota" },
      { aspect: "Pajak penghasilan", a: "Pada para sekutu: final 0,5% bila omzet < Rp 4,8 M/tahun", b: "PPh 22% dengan sejumlah fasilitas bagi koperasi" },
      { aspect: "Tanggung jawab hukum", a: "Sekutu aktif tak terbatas dengan harta pribadi", b: "Badan hukum menanggung; anggota terbatas pada simpanannya" },
      { aspect: "Biaya pendirian", a: "Rp 500 ribu–1,5 juta (akta notaris/PPNS)", b: "Rp 1–2,5 juta (akta/RKSM + KemenkopUKM)" },
      { aspect: "Waktu pendirian", a: "2–4 hari kerja", b: "7–14 hari kerja" },
      { aspect: "Kewajiban rutin", a: "Kepatuhan ringan, tanpa audit", b: "RAT tahunan wajib + laporan ke KemenkopUKM" },
      { aspect: "Cocok untuk", a: "2-3 pemilik usaha dengan peran modal jelas", b: "Kelompok besar: tani, nelayan, karyawan, desa" },
    ],
    verdictA: [
      "Jumlah pelaku usaha sedikit (2–3 orang) dengan peran modal & kerja jelas",
      "Ingin proses cepat: akta 2–4 hari kerja tanpa lembaga pemerintah tambahan",
      "Keputusan diambil cepat oleh sekutu pengelola",
      "Pajak 0,5% final pada para sekutu paling menguntungkan pada skala kecil",
    ],
    verdictB: [
      "Anggota banyak dan ingin suara setara (1 anggota 1 suara)",
      "Butuh status badan hukum dengan tanggung jawab anggota terbatas",
      "Target akses program, pelatihan & pembiayaan KemenkopUKM",
      "Komunitas produktif: petani, nelayan, koperasi sekolah/karyawan/desa",
    ],
    recommendation: [
      "CV adalah pilihan cepat untuk kemitraan kecil: dua-tiga orang, akta notaris Rp 500 ribu–1,5 juta, selesai 2–4 hari kerja, dan pajak para sekutu bisa 0,5% final selama omzet di bawah Rp 4,8 miliar. Kelemahannya jelas: bukan badan hukum, sekutu aktif menanggung utang dengan harta pribadi, dan keputusan sepenuhnya mengikuti akta kemitraan.",
      "Koperasi lebih tepat bila kelompok Anda terdiri dari banyak orang dengan kontribusi setara — petani, nelayan, karyawan, atau warga desa. Status badan hukum melindungi anggota (terbatas pada simpanannya), RAT memberi legitimasi demokratis, dan akses program KemenkopUKM membuka pembiayaan yang tidak dimiliki CV. Imbanginya: RAT tahunan wajib dan tata kelola keanggotaan harus tertib.",
      "Dari sisi pajak, CV sering lebih hemat di skala kecil (0,5% final), sedangkan koperasi dikenakan PPh 22% namun dengan sejumlah fasilitas. Bila kelompok Anda berencana menerima investor swasta atau memasuki kontrak korporat besar, jalur upgrade CV → PT lebih mulus daripada restrukturisasi koperasi — rencanakan bentuknya sesuai tujuan 5 tahun ke depan.",
    ],
    faq: [
      { q: "Apa beda mendasar CV dan koperasi?", a: "CV adalah kemitraan 2 orang atau lebih berbasis akta notaris yang bukan badan hukum — sekutu aktif menanggung utang tak terbatas. Koperasi adalah badan hukum keanggotaan (UU 25/1992) dengan 1 anggota 1 suara, RAT tertinggi, dan SHU untuk anggota; anggota hanya menanggung sebatas simpanannya." },
      { q: "Kelompok tani sebaiknya CV atau koperasi?", a: "Koperasi umumnya lebih tepat: anggota banyak, suara setara, akses program KemenkopUKM, dan status badan hukum memudahkan rekening korporat serta kontrak pembeli besar. CV hanya cocok bila pelakunya cuma 2-3 orang dengan pembagian modal pribadi yang jelas." },
      { q: "Bagaimana pajak keduanya?", a: "Pajak CV dikenakan pada para sekutu — PPh final 0,5% dari omzet bila omzet < Rp 4,8 miliar/tahun (PP 23/2018 jo. PP 55/2022). Koperasi dikenakan PPh 22% dengan sejumlah fasilitas, dan SHU yang dibagikan ke anggota memiliki perlakuan pajak tersendiri yang perlu ditata." },
      { q: "Berapa biaya dan lama pendirian?", a: "CV: Rp 500 ribu–1,5 juta, 2–4 hari kerja di notaris/PPNS. Koperasi: Rp 1–2,5 juta dengan akta/RKSM dan pengesahan badan hukum via KemenkopUKM, sekitar 7–14 hari kerja. Koperasi lebih lambat karena melibatkan lembaga pemerintah tersendiri." },
      { q: "Apakah koperasi wajib RAT setiap tahun?", a: "Ya. RAT (Rapat Anggota Tahunan) adalah kewajiban tahunan sekaligus kekuasaan tertinggi koperasi — menyetujui laporan keuangan, memilih pengurus, dan memutuskan pembagian SHU. CV tidak punya kewajiban rapat formal serupa; segalanya mengikuti kesepakatan akta." },
      { q: "Mana yang lebih mudah menerima pendanaan?", a: "Untuk investor swasta, CV tidak menarik (bukan badan hukum, tak ada saham) dan koperasi membatasi logika dividen pemodal. Pendanaan koperasi umumnya datang dari program pemerintah & koperasi sekunder, sementara CV besar biasanya akhirnya dikonversi ke PT agar ramah investor." },
    ],
    relatedSlugs: ["pt-vs-koperasi", "cv-vs-firma", "yayasan-vs-perkumpulan"],
  },

  // ============================================================
  // 12. PT PMA vs Kantor Perwakilan
  // ============================================================
  {
    slug: "pt-pma-vs-kantor-perwakilan",
    title: "PT PMA vs Kantor Perwakilan (KP3A): Boleh Jualan atau Cuma Koordinasi?",
    h1: "PT PMA vs Kantor Perwakilan: Jalur Masuk Terbaik untuk Perusahaan Asing",
    metaDesc: "Beda PT PMA dan kantor perwakilan: PMA boleh bertransaksi dengan modal min Rp 10 miliar (BKPM 5/2021), KP3A hanya koordinasi & uji pasar tanpa pendapatan. Panduan investor asing.",
    keywords: [
      "pt pma vs kantor perwakilan",
      "kantor perwakilan asing",
      "kp3a indonesia",
      "biro perwakilan bkpm",
      "pendirian pt pma",
      "uji pasar indonesia",
    ],
    intro: [
      "Perusahaan asing yang ingin hadir di Indonesia punya dua pintu utama: PT PMA — entitas berbadan hukum yang boleh penuh bertransaksi dan mencari laba dengan modal disetor minimal Rp 10 miliar sesuai Peraturan BKPM 5/2021 — atau Kantor Perwakilan (KP3A), yang murah dan cepat tetapi dilarang bertransaksi: kegiatannya terbatas koordinasi, riset, dan uji pasar.",
      "Kesalahan paling mahal yang kami lihat: perusahaan mendirikan kantor perwakilan lalu diam-diam menjual dan menagih dari Indonesia — melanggar ketentuan BKPM dan berisiko sanksi. Halaman ini memetakan kapan cukup kantor perwakilan, kapan wajib langsung PT PMA, dan bagaimana jalur upgrade dari KP3A ke PMA berjalan tanpa kehilangan momentum bisnis.",
    ],
    entityA: E_PMA,
    entityB: E_KP3A,
    tableRows: [
      { aspect: "Dasar hukum", a: "UU 25/2007 + Peraturan BKPM 5/2021 (OSS-RBA); cek ketentuan investasi terbaru BKPM/Perpres 5/2025", b: "Peraturan BKPM 5/2021 (OSS-RBA)" },
      { aspect: "Status hukum", a: "Badan hukum Indonesia terpisah dari induknya", b: "Bukan entitas hukum terpisah — perpanjangan tangan induk" },
      { aspect: "Boleh bertransaksi?", a: "Ya — penuh: jual-beli, kontrak, ekspor-impor", b: "TIDAK boleh bertransaksi atau mencari laba" },
      { aspect: "Kegiatan yang diizinkan", a: "Operasi komersial penuh sesuai KBLI", b: "Koordinasi, supervisi, riset & uji pasar" },
      { aspect: "Kepemilikan", a: "Saham asing hingga 100% tergantung KBLI", b: "Milik perusahaan asing induk — tanpa saham lokal" },
      { aspect: "Modal minimum", a: "Modal disetor min Rp 10 miliar + komitmen investasi (cek ketentuan investasi terbaru BKPM/Perpres 5/2025)", b: "Tanpa modal disetor — dibiayai perusahaan induk" },
      { aspect: "NIB & izin usaha", a: "NIB usaha penuh + izin berusaha via OSS-RBA", b: "Tanpa NIB usaha penuh — hanya persetujuan kantor perwakilan" },
      { aspect: "Pajak", a: "PPh Badan 22%; SPT Tahunan Badan wajib", b: "Umumnya tidak menimbulkan pajak atas penghasilan lokal karena tidak boleh mendapat pendapatan" },
      { aspect: "Kewajiban laporan", a: "SPT Badan + LKPM investasi berkala via OSS-RBA", b: "Laporan kegiatan kantor perwakilan sesuai ketentuan BKPM" },
      { aspect: "Biaya pendirian", a: "Rp 8–20 juta (notaris + persetujuan BKPM)", b: "Rp 5–10 juta (persetujuan BKPM + legalisasi dokumen induk)" },
      { aspect: "Waktu pendirian", a: "10–20 hari kerja", b: "7–14 hari kerja" },
      { aspect: "Cocok untuk", a: "Penjualan, produksi & investasi riil di Indonesia", b: "Riset pasar, koordinasi grup & hubungan mitra" },
    ],
    verdictA: [
      "Perusahaan akan menjual produk/jasa dan menagih pendapatan dari Indonesia",
      "Butuh ekspor-impor dengan NIB usaha penuh",
      "Rencana investasi riil: pabrik, kantor cabang, gudang, tim penjualan",
      "Butuh kontrak komersial atas nama entitas Indonesia",
    ],
    verdictB: [
      "Tahap awal: mempelajari & menguji pasar sebelum investasi besar",
      "Fungsi koordinasi grup regional, riset, atau hubungan vendor",
      "Tidak ingin terikat kewajiban modal Rp 10 miliar",
      "Kehadiran branding & jaringan tanpa aktivitas komersial",
    ],
    recommendation: [
      "Aturan praktisnya sederhana: begitu perusahaan asing ingin mendapat pendapatan dari Indonesia — menjual, menagih, menandatangani kontrak komersial — bentuknya harus PT PMA. Kantor perwakilan dilarang bertransaksi dan mencari laba; pelanggaran ketentuan ini dapat berujung sanksi administratif dari BKPM dan masalah pajak yang serius.",
      "Kantor perwakilan tetap sangat bernilai di fase awal: biaya Rp 5–10 juta, 7–14 hari kerja, tanpa kewajiban modal Rp 10 miliar, dan tetap bisa mengurus KITAS untuk kepala perwakilan. Gunakan fase ini untuk menguji pasar, membangun jaringan distribusi, dan merancang rencana investasi — lalu upgrade ke PT PMA dengan persiapan modal dan komitmen investasi yang matang (selalu merujuk ketentuan investasi terbaru BKPM/Perpres 5/2025).",
      "Kami menangani kedua jalur tersebut sekaligus: pendirian KP3A dengan legalisasi dokumen induk, hingga pendirian PT PMA lengkap dari pemilihan KBLI (memastikan saham asing 100% diizinkan), akta notaris, persetujuan BKPM, NIB, sampai KITAS investor dan kewajiban LKPM. Pendekatan bertahap KP3A → PMA adalah rute paling aman yang kami rekomendasikan untuk pasar yang belum teruji.",
    ],
    faq: [
      { q: "Bolehkah kantor perwakilan bertransaksi dan mendapat pendapatan?", a: "Tidak. Sesuai Peraturan BKPM 5/2021, kantor perwakilan hanya boleh melakukan kegiatan koordinasi, supervisi, riset, dan uji pasar — tidak boleh bertransaksi, menerima pendapatan, atau mencari laba di Indonesia. Penjualan harus dilakukan melalui perusahaan induk, agen, atau entitas PT PMA." },
      { q: "Berapa modal minimum masing-masing?", a: "Kantor perwakilan tidak punya syarat modal disetor — operasionalnya dibiayai perusahaan induk. PT PMA mensyaratkan modal disetor minimal Rp 10 miliar dengan komitmen investasi terencana, merujuk ketentuan investasi terbaru BKPM/Perpres 5/2025." },
      { q: "Kapan perusahaan asing harus langsung mendirikan PT PMA?", a: "Begitu ada niat komersial: menjual produk/jasa, menagih pendapatan lokal, melakukan ekspor-impor sendiri, atau menandatangani kontrak komersial atas nama entitas Indonesia. Semua aktivitas ini di luar kewenangan kantor perwakilan dan menuntut NIB usaha penuh yang hanya dimiliki PT PMA." },
      { q: "Bisakah kantor perwakilan diubah menjadi PT PMA?", a: "Ya, dan ini jalur yang umum. KP3A tetap beroperasi sementara entitas PT PMA didirikan via OSS-RBA (pemilihan KBLI, akta notaris, persetujuan BKPM). Setelah PMA aktif, fungsi komersial berpindah ke PMA dan kantor perwakilan dapat ditutup atau dipertahankan khusus untuk fungsi koordinasi." },
      { q: "Berapa biaya dan waktu pendirian keduanya?", a: "Kantor perwakilan: Rp 5–10 juta dan 7–14 hari kerja, terdiri dari persetujuan BKPM/OSS plus legalisasi dokumen perusahaan induk. PT PMA: Rp 8–20 juta dan 10–20 hari kerja karena melibatkan akta notaris, persetujuan investasi, dan penyesuaian KBLI pada OSS-RBA." },
      { q: "Apakah keduanya bisa mengurus KITAS untuk staf asing?", a: "Bisa. Kepala kantor perwakilan dan stafnya dapat mengajukan KITAS sesuai ketentuan imigrasi yang berlaku, demikian pula pemegang saham PT PMA berhak atas KITAS investor. Dua-duanya menuntut dokumen legalitas entitas yang rapi — bagian dari layanan kami secara end-to-end." },
    ],
    relatedSlugs: ["pt-pma-vs-pt-lokal", "pt-vs-cv", "pt-vs-koperasi"],
  },
];

// ------------------------------------------------------------
// HELPER
// ------------------------------------------------------------

export function getComparison(slug: string): Comparison | undefined {
  return COMPARISONS.find((c) => c.slug === slug);
}

export function getComparisonSlugs(): string[] {
  return COMPARISONS.map((c) => c.slug);
}
