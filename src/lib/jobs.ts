// ============================================================
// src/lib/jobs.ts — Data lowongan kerja statis PusatPerizinan.com
// Dalam negeri (kantor & lapangan) + penempatan PMI luar negeri
// Sesuai UU 18/2017 & ekosistem BNP2MI / SISKOP2MI
// ============================================================

export type JobCategory = "pmi" | "kantor" | "lapangan";
export type JobLocationType = "onsite" | "hybrid" | "remote";
export type EmploymentType = "FULL_TIME" | "CONTRACT";

export interface Job {
  slug: string;
  title: string;
  company: string;
  category: JobCategory;
  location: {
    city: string;
    region: string;
    country: string;
    type: JobLocationType;
  };
  employmentType: EmploymentType;
  datePosted: string; // ISO date (YYYY-MM-DD)
  validThrough: string; // ISO date (YYYY-MM-DD)
  description: string; // 3-4 paragraf, dipisah "\n\n"
  responsibilities: string[];
  qualifications: string[];
  benefits: string[];
  skills: string[];
  salary: {
    min: number;
    max: number;
    currency: string; // ISO 4217
    unit: "MONTH";
  };
  education: string;
  experience: string;
  featured?: boolean;
  occupationalCategory: string;
}

// ------------------------------------------------------------
// Label kategori (dipakai badge, tab filter, dan meta)
// ------------------------------------------------------------

export const JOB_CATEGORY_LABEL: Record<JobCategory, string> = {
  pmi: "Luar Negeri (PMI)",
  kantor: "Kantor Pusat",
  lapangan: "Lapangan & Proyek",
};

export const EMPLOYMENT_TYPE_LABEL: Record<EmploymentType, string> = {
  FULL_TIME: "Full-time",
  CONTRACT: "Kontrak",
};

export const LOCATION_TYPE_LABEL: Record<JobLocationType, string> = {
  onsite: "On-site",
  hybrid: "Hybrid",
  remote: "Remote",
};

// ------------------------------------------------------------
// Helper format (dipakai bersama oleh card & halaman detail)
// ------------------------------------------------------------

export function formatSalaryValue(value: number, currency: string): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol", // ¥ / ₩ / SAR / NT$ / € / RM / Rp
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatSalaryRange(salary: Job["salary"]): string {
  return `${formatSalaryValue(salary.min, salary.currency)} – ${formatSalaryValue(
    salary.max,
    salary.currency
  )}`;
}

export function formatJobDate(isoDate: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(isoDate));
}

// ------------------------------------------------------------
// DATA — 12 lowongan aktif
// ------------------------------------------------------------

export const JOBS: Job[] = [
  // ================= PMI (1-6) =================
  {
    slug: "perawat-lansia-jepang",
    title: "Perawat Lansia (SSW Kaigo)",
    company: "Saitama Care Group",
    category: "pmi",
    location: {
      city: "Tokyo",
      region: "Kantō",
      country: "Jepang",
      type: "onsite",
    },
    employmentType: "CONTRACT",
    datePosted: "2026-09-22",
    validThrough: "2026-12-31",
    description:
      "Saitama Care Group, operator panti dan home care terverifikasi di wilayah Tokyo, membuka lowongan Perawat Lansia dengan status khusus keahlian Specified Skilled Worker (SSW) Kaigo. Anda akan mendampingi lansia dalam aktivitas sehari-hari di fasilitas modern dengan rasio perawat yang sehat dan lingkungan kerja yang aman.\n\nRekrutmen ini diselenggarakan melalui jalur resmi sesuai UU No. 18 Tahun 2017 tentang Perlindungan Pekerja Migran Indonesia. Seluruh proses administrasi dipantau melalui SISKOP2MI dan dokumen keberangkatan diverifikasi BNP2MI, sehingga Anda terlindungi penuh sejak penandatanganan kontrak hingga tiba di Jepang.\n\nProgram mencakup pendampingan bahasa Jepang hingga level JLPT N4 atau JFT-Basic A2, serta persiapan uji keterampilan Kaigo (SSW Skill Test). Kontrak awal 3 tahun dan dapat diperpanjang hingga maksimal 5 tahun sesuai ketentuan skema SSW.\n\nPendaftaran gratis dari biaya perekrutan ilegal — seluruh biaya pengurusan dokumen resmi mengikuti ketentuan pemerintah dan dipisahkan secara transparan dalam penawaran layanan.",
    responsibilities: [
      "Mendampingi lansia dalam aktivitas sehari-hari (makan, mandi, berpindah tempat, dan mobilitas)",
      "Memonitor kondisi kesehatan lansia dan mencatat perubahan secara rutin",
      "Mendukung program rehabilitasi dan aktivitas rekreasi di fasilitas",
      "Menjaga kebersihan, kenyamanan, dan keamanan lingkungan perawatan",
      "Berkomunikasi dengan tim perawat dan keluarga lansia dalam bahasa Jepang dasar",
    ],
    qualifications: [
      "Usia 20–35 tahun, lulusan SMA/SMK sederajat atau D3 Keperawatan",
      "Ijazah dan transkrip terverifikasi BNP2MI (legalisasi & terjemahan tersumpah)",
      "Sertifikat JLPT N4 atau JFT-Basic A2 (bila belum punya, wajib mengikuti kelas persiapan)",
      "Lulus atau bersedia mengikuti SSW Skill Test Kaigo dan uji bahasa Kaigo",
      "Dokumen umum lengkap: KTP, KK, akta lahir, buku nik (bila menikah), paspor, dan SKCK",
      "Sehat jasmani rohani, tidak bertato, dan bersedia mengikuti medical check-up sesuai standar Jepang",
      "Belum pernah dideportasi dari Jepang dan bersedia tunduk pada kontrak 3 tahun",
    ],
    benefits: [
      "Gaji pokok ¥180.000–¥220.000/bulan (sekitar Rp19–23 juta, nilai tukar mengikuti kurs)",
      "Asrama disediakan perusahaan dengan potongan subsidiabel",
      "Tunjangan lembur, transportasi, dan bonus musiman sesuai kontrak employer",
      "Asuransi kesehatan & pensiun Jepang (Shakai Hoken) penuh",
      "Pendampingan dokumen BNP2MI, SISKOP2MI, dan orientasi pra-keberangkatan",
      "Bimbingan bahasa Jepang intensif sebelum dan selama penempatan",
    ],
    skills: [
      "Perawatan lansia (kaigo)",
      "Bahasa Jepang dasar–menengah",
      "Komunikasi empati",
      "Manajemen waktu",
      "Kerja tim",
    ],
    salary: { min: 180000, max: 220000, currency: "JPY", unit: "MONTH" },
    education: "SMA/SMK sederajat, D3 Keperawatan lebih diutamakan",
    experience: "Minim 1 tahun di bidang perawatan (panti, rumah sakit, atau home care) lebih disukai; fresh graduate bersertifikat keperawatan dipertimbangkan",
    featured: true,
    occupationalCategory: "Nursing Aide / Care Worker (Kaigo)",
  },
  {
    slug: "operator-pabrik-korea",
    title: "Operator Pabrik (EPS Visa E-9)",
    company: "Hanwoo Manufacturing Co.",
    category: "pmi",
    location: {
      city: "Incheon",
      region: "Gyeonggi–Incheon",
      country: "Korea Selatan",
      type: "onsite",
    },
    employmentType: "CONTRACT",
    datePosted: "2026-09-18",
    validThrough: "2026-12-30",
    description:
      "Hanwoo Manufacturing Co., produsen komponen manufaktur mitra sistem EPS (Employment Permit System) Korea Selatan, membuka lowongan Operator Pabrik dengan Visa E-9. Penempatan di kawasan industri Incheon dengan fasilitas produksi modern dan standar K3 internasional.\n\nSeleksi mengikuti alur resmi EPS: lulus EPS-TOPIK (uji kemampuan bahasa Korea), pendaftaran roster melalui SISKOP2MI, dan verifikasi dokumen oleh BNP2MI sesuai UU 18/2017. Kontrak awal 3 tahun dan dapat diperpanjang hingga maksimal 4 tahun 8 bulan sesuai kesepakatan employer.\n\nKami mendampingi seluruh tahapan: pelatihan bahasa Korea, pemeriksaan kesehatan, penandatanganan kontrak kerja Korea (Standar Kontrak Kerja EPS), hingga keberangkatan. Tidak ada pungutan biaya perekrutan ilegal — semua ketentuan biaya resmi dijelaskan transparan di awal.",
    responsibilities: [
      "Mengoperasikan mesin produksi sesuai SOP dan standar K3 pabrik",
      "Melakukan inspeksi kualitas produk di jalur produksi",
      "Mengisi laporan produksi harian dan menyerahkan hasil ke tim QC",
      "Menjaga kebersihan area kerja dan peralatan (5S)",
      "Bekerja sistem shift sesuai jadwal yang ditetapkan employer",
    ],
    qualifications: [
      "Usia 18–35 tahun, lulusan SMA/SMK sederajat",
      "Ijazah & dokumen akademik terverifikasi BNP2MI",
      "Lulus EPS-TOPIK dengan skor minimal yang ditetapkan sistem EPS",
      "Dokumen umum lengkap: KTP, KK, akta lahir, paspor, SKCK, dan surat izin keluarga",
      "Terdaftar di SISKOP2MI dan bersedia mengikuti roster pemilihan pekerja",
      "Sehat jasmani rohani, tidak bertato, dan lolos medical check-up standar Korea",
      "Bersedia bekerja sistem shift dan tinggal di asrama perusahaan",
    ],
    benefits: [
      "Gaji pokok ₩2.100.000–₩2.600.000/bulan (belum termasuk lembur)",
      "Lembur dibayar penuh sesuai hukum ketenagakerjaan Korea",
      "Asrama dan makan subsidi sesuai standar EPS",
      "Asuransi kecelakaan, kesehatan, dan pensiun (4 Besar Asuransi Korea)",
      "Pesangon (Severance Pay) setelah kontrak berakhir sesuai ketentuan EPS",
      "Pendampingan penuh SISKOP2MI, BNP2MI, dan orientasi pra-keberangkatan",
    ],
    skills: [
      "Operasional mesin produksi",
      "Bahasa Korea dasar (EPS-TOPIK)",
      "Kedisiplinan K3",
      "Kerja shift",
      "Kontrol kualitas dasar",
    ],
    salary: { min: 2100000, max: 2600000, currency: "KRW", unit: "MONTH" },
    education: "SMA/SMK sederajat (teknik/mesin/otomotif diutamakan)",
    experience: "Tidak wajib berpengalaman; pengalaman produksi/manufaktur 1 tahun menjadi nilai tambah",
    featured: true,
    occupationalCategory: "Machine Operator (Manufacturing)",
  },
  {
    slug: "art-arab-saudi",
    title: "Karyawan Rumah Tangga (Skema Musaned)",
    company: "Al-Amal Household Services Co.",
    category: "pmi",
    location: {
      city: "Riyadh",
      region: "Riyadh Province",
      country: "Arab Saudi",
      type: "onsite",
    },
    employmentType: "CONTRACT",
    datePosted: "2026-08-15",
    validThrough: "2026-11-30",
    description:
      "Al-Amal Household Services Co., perusahaan penyalur tenaga rumah tangga resmi terdaftar di platform Musaned Kementerian Sumber Daya Manusia Arab Saudi, membuka lowongan Karyawan Rumah Tangga (ART) untuk penempatan keluarga di Riyadh. Pekerjaan utama merawat rumah, mendampingi anak, dan membantu aktivitas harian keluarga.\n\nSeluruh proses menggunakan skema Musaned resmi: kontrak kerja elektronik yang disahkan kedua pemerintah, visa kerja diterbitkan melalui platform, dan data PMI tercatat di SISKOP2MI sesuai UU 18/2017. Dokumen keberangkatan diverifikasi BNP2MI sebelum keberangkatan.\n\nKontrak 2 tahun dengan gaji yang tercantum langsung pada kontrak Musaned — apa adanya, tanpa potongan ilegal. Pemilik kontrak (employer) wajib menanggung tiket, iqama, dan asuransi kesehatan sesuai regulasi Arab Saudi.",
    responsibilities: [
      "Membersihkan dan merapikan rumah serta mencuci pakaian keluarga",
      "Membantu persiapan makanan dan kebutuhan dapur sehari-hari",
      "Mendampingi dan mengawasi anak sesuai arahan majikan",
      "Menjaga privasi, keamanan, dan ketertiban rumah tangga",
      "Beradaptasi dengan adat dan aturan rumah tangga di Arab Saudi",
    ],
    qualifications: [
      "Perempuan, usia 23–40 tahun, lulusan SMP/SMA sederajat",
      "Ijazah dan dokumen akademik terverifikasi BNP2MI",
      "Dokumen umum lengkap: KTP, KK, akta lahir, buku nik (bila menikah), paspor, dan SKCK",
      "Bersedia mengikuti pelatihan bahasa Arab dasar dan orientasi budaya",
      "Data terdaftar di SISKOP2MI dan bersedia diproses melalui platform Musaned",
      "Sehat jasmani rohani dan lolos pemeriksaan kesehatan (medical) standar Arab Saudi",
      "Bersedia mengikuti kontrak 2 tahun dan menyesuaikan budaya kerja Timur Tengah",
    ],
    benefits: [
      "Gaji SAR 1.500–2.000/bulan sesuai kontrak Musaned (sekitar Rp6–8 juta)",
      "Tiket, iqama, dan asuransi kesehatan ditanggung penuh oleh employer",
      "Hari libur dan cuti tahunan sesuai kontrak kerja yang disahkan",
      "Akomodasi dan makan ditanggung majikan",
      "Pendampingan dokumen BNP2MI dan SISKOP2MI hingga keberangkatan",
      "Layanan bantuan konsuler melalui kanal resmi selama penempatan",
    ],
    skills: [
      "Pekerjaan rumah tangga",
      "Perawatan anak dasar",
      "Bahasa Arab dasar",
      "Adaptasi budaya",
      "Kejujuran & disiplin",
    ],
    salary: { min: 1500, max: 2000, currency: "SAR", unit: "MONTH" },
    education: "SMP/SMA sederajat",
    experience: "Pengalaman menjadi ART atau mengurus rumah tangga sendiri lebih disukai",
    occupationalCategory: "Domestic Worker (Household Helper)",
  },
  {
    slug: "caregiver-taiwan",
    title: "Caregiver / Perawat Lansia",
    company: "Ruixin Long-term Care Center",
    category: "pmi",
    location: {
      city: "Taipei",
      region: "Taipei City",
      country: "Taiwan",
      type: "onsite",
    },
    employmentType: "CONTRACT",
    datePosted: "2026-08-25",
    validThrough: "2026-12-05",
    description:
      "Ruixin Long-term Care Center, fasilitas perawatan jangka panjang mitra resmi penempatan tenaga kerja Indonesia di Taiwan, membuka lowongan Caregiver/Perawat Lansia di Taipei. Tugas utama mendampingi lansia dalam perawatan harian di bawah supervisi tenaga medis Taiwan.\n\nPenempatan mengikuti prosedur resmi kerja ke Taiwan: dokumen diverifikasi BNP2MI sesuai UU 18/2017, data tercatat di SISKOP2MI, dan kontrak kerja disahkan melalui kanal resmi kedua negara. Pelatihan bahasa Mandarin dasar dan istilah perawatan disediakan sebelum keberangkatan.\n\nKontrak 3 tahun dan dapat diperpanjang berdasarkan kinerja dan persetujuan employer. Banyak alumni program Taiwan yang berhasil melanjutkan karier ke posisi senior caregiver atau kembali ke Indonesia dengan modal keterampilan perawatan profesional.",
    responsibilities: [
      "Membantu lansia dalam mandi, makan, dan mobilitas harian",
      "Memonitor tekanan darah, gula darah, dan kondisi kesehatan dasar",
      "Mencegah luka baring melalui posisi dan perawatan kulit yang benar",
      "Mendampingi lansia ke kegiatan terapi dan periksa dokter",
      "Melaporkan perubahan kondisi lansia kepada perawat supervisor",
    ],
    qualifications: [
      "Perempuan/lelaki, usia 20–38 tahun, lulusan SMA/SMK atau D3 Keperawatan",
      "Ijazah & transkrip terverifikasi BNP2MI",
      "Dokumen umum lengkap: KTP, KK, akta lahir, paspor, SKCK",
      "Bersedia mengikuti pelatihan bahasa Mandarin dasar (Hoa Yu) sebelum keberangkatan",
      "Sehat jasmani rohani dan lolos medical check-up standar Taiwan",
      "Terdaftar di SISKOP2MI dan bersedia mengikuti proses matching employer",
      "Punya minat tulus pada perawatan lansia dan kesabaran tinggi",
    ],
    benefits: [
      "Gaji TWD 29.500–34.000/bulan sesuai upah minimum Taiwan (plus lembur)",
      "BPJS Kesehatan & Ketenagakerjaan selama masa pelatihan di Indonesia",
      "Asuransi kesehatan Taiwan (NHI) dan asuransi kecelakaan dari employer",
      "Akomodasi asrama disediakan dengan potongan wajar sesuai regulasi",
      "Pendampingan dokumen BNP2MI, SISKOP2MI, dan orientasi pra-keberangkatan",
      "Kesempatan perpanjangan kontrak dan kenaikan gaji berbasis kinerja",
    ],
    skills: [
      "Perawatan lansia",
      "Bahasa Mandarin dasar",
      "Vital sign monitoring",
      "Kesabaran & empati",
      "Kerja tim",
    ],
    salary: { min: 29500, max: 34000, currency: "TWD", unit: "MONTH" },
    education: "SMA/SMK sederajat atau D3 Keperawatan",
    experience: "Pengalaman 1 tahun sebagai caregiver/perawat lebih disukai; lulusan keperawatan fresh graduate dipertimbangkan",
    occupationalCategory: "Long-term Care Aide (Caregiver)",
  },
  {
    slug: "welder-jerman",
    title: "Welder 3G/6G (Program Triple Win)",
    company: "Norddeutsche Stahlbau GmbH",
    category: "lapangan",
    location: {
      city: "Hamburg",
      region: "Hamburg",
      country: "Jerman",
      type: "onsite",
    },
    employmentType: "CONTRACT",
    datePosted: "2026-09-10",
    validThrough: "2026-12-15",
    description:
      "Norddeutsche Stahlbau GmbH, kontraktor fabrikasi baja di Hamburg, membuka lowongan Welder bersertifikat 3G/6G melalui jalur kerja profesional Jerman yang didampingi program kerja sama pemerintah (Triple Win pathway). Proyek utama meliputi fabrikasi konstruksi baja dan komponen industri maritim.\n\nJalur ini menargetkan welder berpengalaman yang siap memenuhi standar Eropa: sertifikasi las 3G/6G yang masih berlaku, pemahaman gambar teknik (WPS/blueprint), dan bahasa Jerman minimal A2 (B1 diutamakan). Dokumen akademik dan pengalaman kerja diverifikasi BNP2MI sesuai UU 18/2017 dan tercatat di SISKOP2MI.\n\nProses mencakup penandatanganan kontrak resmi dengan employer Jerman, pengurusan visa kerja terampil (Fachkräfte), dan orientasi kehidupan di Jerman. Gaji dan tunjangan mengikuti tarif kolektif industri metalurgy Jerman (Tarifvertrag) — kontrak transparan tanpa pungutan ilegal.",
    responsibilities: [
      "Melakukan pengelasan SMAW/GTAW posisi 3G/6G pada material baja konstruksi",
      "Membaca gambar teknik dan mengikuti Welding Procedure Specification (WPS)",
      "Melakukan persiapan joint, grinding, dan finishing hasil las",
      "Melakukan self-inspection dan quality check sesuai standar Eropa (EN ISO)",
      "Mematuhi prosedur K3 dan penggunaan APD di area fabrikasi",
    ],
    qualifications: [
      "Usia 21–40 tahun, lulusan SMK Teknik Las/Mesin sederajat",
      "Ijazah, sertifikat kompetensi las, dan riwayat pekerjaan terverifikasi BNP2MI",
      "Sertifikat las 3G/6G yang masih berlaku (dari lembaga bersertifikasi; bila expired, wajib re-test)",
      "Pengalaman welding minimal 3 tahun di fabrikasi, konstruksi baja, atau galangan",
      "Bahasa Jerman minimal A2 (kursus lanjutan ke B1 disediakan untuk yang lolos seleksi)",
      "Dokumen umum lengkap: KTP, KK, akta lahir, paspor, SKCK",
      "Terdaftar di SISKOP2MI dan bersedia mengikuti medical check-up standar Jerman",
    ],
    benefits: [
      "Gaji EUR 2.100–2.600/bulan sebelum pajak (tarif industri Jerman)",
      "Kontrak resmi sesuai Tarifvertrag dengan tunjangan libur dan cuti berbayar",
      "Asuransi kesehatan, kecelakaan, dan pensiun Jerman penuh",
      "Dukungan kursus bahasa Jerman A2 ke B1",
      "Pendampingan visa Fachkräfte, dokumen BNP2MI, dan SISKOP2MI",
      "Kesempatan kontrak panjang dan jalur residensi setelah masa kerja stabil",
    ],
    skills: [
      "SMAW/GTAW posisi 3G/6G",
      "Membaca WPS & blueprint",
      "Fabrikasi baja",
      "Bahasa Jerman A2+",
      "K3 industri",
    ],
    salary: { min: 2100, max: 2600, currency: "EUR", unit: "MONTH" },
    education: "SMK Teknik Las/Mesin sederajat + sertifikasi las 3G/6G",
    experience: "Minimal 3 tahun pengalaman welding industri (fabrikasi, galangan, atau konstruksi)",
    occupationalCategory: "Certified Welder (3G/6G)",
  },
  {
    slug: "teknisi-pembangkit-malaysia",
    title: "Teknisi Pembangkit Listrik",
    company: "Johor Power Engineering Sdn. Bhd.",
    category: "lapangan",
    location: {
      city: "Johor Bahru",
      region: "Johor",
      country: "Malaysia",
      type: "onsite",
    },
    employmentType: "CONTRACT",
    datePosted: "2026-09-05",
    validThrough: "2026-12-10",
    description:
      "Johor Power Engineering Sdn. Bhd., kontraktor O&M (operation & maintenance) pembangkit listrik di Malaysia, membuka lowongan Teknisi Pembangkit Listrik untuk penempatan di Johor Bahru. Anda akan bergabung dengan tim pemeliharaan turbin, boiler, dan sistem auxiliar pembangkit skala menengah.\n\nRekrutmen melalui jalur resmi: kontrak kerja disahkan, visa pekerja (PLKS – Pas Lawatan Kerja Sementara) diurus employer, dan seluruh dokumen PMI diverifikasi BNP2MI sesuai UU 18/2017 dengan pencatatan SISKOP2MI. Pengalaman di pembangkit, pabrik, atau industri berat sangat diutamakan.\n\nLingkungan kerja lintas negara dengan teknisi Malaysia, Indonesia, dan Bangladesh — kesempatan belajar langsung pada standar O&M utility Asia Tenggara. Kontrak 2 tahun dan dapat diperpanjang sesuai kinerja.",
    responsibilities: [
      "Melakukan perawatan harian (preventive maintenance) unit turbin, boiler, dan pompa",
      "Membantu troubleshoot gangguan pada sistem mekanikal dan elektrikal pembangkit",
      "Mengeksekusi work order dan mencatat hasil pekerjaan pada CMMS",
      "Melakukan rounding/inspeksi rutin area pembangkit dan melaporkan anomali",
      "Mematuhi prosedur K3, permit to work, dan LOTO saat pekerjaan berlangsung",
    ],
    qualifications: [
      "Lelaki, usia 20–38 tahun, lulusan SMK Teknik Mesin/Listrik atau D3 Teknik",
      "Ijazah dan sertifikat kompetensi terverifikasi BNP2MI",
      "Pengalaman minimal 2 tahun di pembangkit, pabrik, refinery, atau industri berat",
      "Dokumen umum lengkap: KTP, KK, akta lahir, paspor, SKCK",
      "Terdaftar di SISKOP2MI dan bersedia mengikuti proses penempatan resmi Malaysia",
      "Paham dasar preventive maintenance dan pembacaan P&ID lebih disukai",
      "Sehat jasmani rohani dan bersedia bekerja shift/on-call saat overhaul",
    ],
    benefits: [
      "Gaji MYR 3.000–4.500/bulan sesuai kualifikasi dan pengalaman",
      "Lembur dan tunjangan shift sesuai hukum ketenagakerjaan Malaysia",
      "Akomodasi dan transportasi dinas disediakan employer",
      "BPJS Kesehatan & Ketenagakerjaan selama masa persiapan di Indonesia",
      "SOCSO & asuransi kecelakaan kerja Malaysia dari employer",
      "Pendampingan PLKS, dokumen BNP2MI, dan SISKOP2MI hingga tiba di Malaysia",
    ],
    skills: [
      "Preventive maintenance",
      "Turbin/boiler auxiliar",
      "Membaca P&ID",
      "CMMS dasar",
      "K3 & LOTO",
    ],
    salary: { min: 3000, max: 4500, currency: "MYR", unit: "MONTH" },
    education: "SMK Teknik Mesin/Listrik sederajat atau D3 Teknik",
    experience: "Minimal 2 tahun di pembangkit listrik, pabrik, atau industri berat",
    occupationalCategory: "Power Plant Maintenance Technician",
  },

  // ================= KANTOR (7-12) =================
  {
    slug: "staf-administrasi-perizinan",
    title: "Staf Administrasi Perizinan",
    company: "PT Pusat Perizinan Indonesia",
    category: "kantor",
    location: {
      city: "Jakarta Selatan",
      region: "DKI Jakarta",
      country: "Indonesia",
      type: "onsite",
    },
    employmentType: "FULL_TIME",
    datePosted: "2026-09-01",
    validThrough: "2026-12-01",
    description:
      "PT Pusat Perizinan Indonesia membuka lowongan Staf Administrasi Perizinan untuk kantor pusat di Jakarta Selatan. Anda akan menjadi tulang punggung administrasi dokumen perizinan usaha klien: dari NIB, sertifikat standar, hingga izin lainnya melalui sistem OSS-RBA.\n\nPekerjaan sehari-hari mencakup kelengkapan berkas klien, input data OSS-RBA, pemetaan KBLI yang tepat untuk setiap badan usaha, serta monitoring status permohonan hingga terbit. Anda akan bekerja bersama konsultan senior dan mendapat pendampingan penuh untuk memahami regulasi perizinan berusaha terbaru.\n\nKandidat yang teliti, cepat belajar, dan nyaman bekerja dengan deadline harian akan berkembang pesat di sini. Jalur karier jelas: Staf Administrasi → Staf Perizinan Senior → Konsultan Perizinan.",
    responsibilities: [
      "Memeriksa kelengkapan dokumen klien sebelum masuk proses pengurusan",
      "Input dan monitoring permohonan perizinan di sistem OSS-RBA",
      "Membantu pemetaan KBLI sesuai kegiatan usaha klien",
      "Menyusun rekap status permohonan harian/mingguan untuk tim konsultan",
      "Mengarsipkan dokumen digital dan fisik sesuai SOP perusahaan",
    ],
    qualifications: [
      "Pendidikan minimal D3/S1 semua jurusan (Administrasi, Hukum, Manajemen diutamakan)",
      "Fresh graduate dipersilakan; pengalaman administrasi 1 tahun menjadi nilai tambah",
      "Teliti, terorganisir, dan terbiasa bekerja dengan spreadsheet",
      "Mampu berkomunikasi baik dengan klien secara tertulis dan lisan",
      "Memahami dasar-dasar NIB/OSS menjadi nilai plus (akan dilatih jika belum)",
      "Bersedia bekerja WFO di kantor Jakarta Selatan",
    ],
    benefits: [
      "Gaji IDR 4.500.000–6.000.000/bulan sesuai pengalaman",
      "BPJS Kesehatan & BPJS Ketenagakerjaan penuh",
      "THR dan bonus kinerja tahunan",
      "Tunjangan transport dan makan",
      "Pelatihan regulasi perizinan (OSS-RBA, KBLI) bersertifikat internal",
      "Jalur karier jelas menuju posisi konsultan",
    ],
    skills: [
      "Administrasi dokumen",
      "Spreadsheet",
      "OSS-RBA (dasar)",
      "KBLI",
      "Komunikasi klien",
    ],
    salary: { min: 4500000, max: 6000000, currency: "IDR", unit: "MONTH" },
    education: "D3/S1 semua jurusan",
    experience: "Fresh graduate dipersilakan; pengalaman administrasi 1 tahun lebih disukai",
    occupationalCategory: "Administrative Services Specialist",
  },
  {
    slug: "konsultan-perizinan-senior",
    title: "Konsultan Perizinan Senior",
    company: "PT Pusat Perizinan Indonesia",
    category: "kantor",
    location: {
      city: "Jakarta Selatan",
      region: "DKI Jakarta",
      country: "Indonesia",
      type: "onsite",
    },
    employmentType: "FULL_TIME",
    datePosted: "2026-09-28",
    validThrough: "2026-12-31",
    description:
      "PT Pusat Perizinan Indonesia mencari Konsultan Perizinan Senior untuk menangani portofolio klien korporat: pendirian badan usaha, pemetaan KBLI, perizinan berusaha spesifik, dan struktur ekspansi multi-wilayah melalui OSS-RBA. Posisi ini adalah peran senior yang juga menjadi penasihat teknis bagi tim junior.\n\nAnda akan memimpin analisis kelayakan perizinan untuk klien kompleks (manufaktur, tambang, logistik, F&B, hingga ekspor-impor), menyusun roadmap perizinan, dan memastikan seluruh rekomendasi selaras dengan regulasi terbaru BKPM/OSS. Interaksi langsung dengan klien C-level dan instansi pemerintah menjadi bagian rutin pekerjaan.\n\nKami menawarkan lingkungan kerja berbasis kasus nyata dengan volume proyek besar, kompensasi kompetitif, dan ruang membentuk SOP layanan. Kandidat dengan latar Hukum/Manajemen dan pengalaman konsultan perizinan 3+ tahun sangat diutamakan.",
    responsibilities: [
      "Menyusun roadmap perizinan end-to-end untuk klien korporat (OSS-RBA, perizinan spesifik)",
      "Melakukan analisis dan pemetaan KBLI untuk struktur usaha kompleks",
      "Menjadi PIC komunikasi dengan klien senior dan instansi terkait",
      "Meninjau pekerjaan tim junior dan menjaga mutu dokumen konsultasi",
      "Memantau perubahan regulasi perizinan berusaha dan menerjemahkannya ke SOP layanan",
      "Mendukung proposal bisnis dan presentasi solusi kepada calon klien",
    ],
    qualifications: [
      "S1 Hukum, Manajemen, Administrasi Bisnis, atau bidang terkait (IPK memadai)",
      "Pengalaman minimal 3 tahun di konsultan perizinan, jasa legal, atau internal legal perusahaan",
      "Menguasai OSS-RBA, KBLI 2020, NIB, sertifikat standar, dan izin spesifik (sektor apa pun)",
      "Terbiasa membaca regulasi (PP, Perpres BKPM, PMK, Permen) dan menyusun dokumen profesional",
      "Kemampuan presentasi dan negosiasi yang kuat",
      "Bersedia WFO di Jakarta Selatan dengan kunjungan klien/instansi di luar kota bila diperlukan",
    ],
    benefits: [
      "Gaji IDR 8.000.000–12.000.000/bulan sesuai pengalaman",
      "BPJS Kesehatan & BPJS Ketenagakerjaan penuh",
      "THR, bonus kinerja, dan bonus penjualan proyek",
      "Tunjangan transport, makan, dan pulsa",
      "Kesempatan sertifikasi profesional dan pelatihan regulasi lanjutan",
      "Lingkungan kerja kolaboratif dengan portofolio klien korporat besar",
    ],
    skills: [
      "OSS-RBA",
      "KBLI & perizinan berusaha",
      "Analisis regulasi",
      "Konsultasi klien",
      "Penyusunan roadmap",
      "Manajemen tim",
    ],
    salary: { min: 8000000, max: 12000000, currency: "IDR", unit: "MONTH" },
    education: "S1 Hukum/Manajemen/Administrasi Bisnis atau bidang terkait",
    experience: "Minimal 3 tahun sebagai konsultan perizinan atau peran legal/perizinan korporat",
    featured: true,
    occupationalCategory: "Business Licensing Consultant (Senior)",
  },
  {
    slug: "staf-pajak-coretax",
    title: "Staf Pajak (Coretax & Compliance)",
    company: "PT Pusat Perizinan Indonesia",
    category: "kantor",
    location: {
      city: "Bandung",
      region: "Jawa Barat",
      country: "Indonesia",
      type: "onsite",
    },
    employmentType: "FULL_TIME",
    datePosted: "2026-09-12",
    validThrough: "2026-12-20",
    description:
      "PT Pusat Perizinan Indonesia membuka posisi Staf Pajak di kantor Bandung untuk mendukung layanan kepatuhan pajak klien. Fokus utama: administrasi SPT, e-Faktur, dan migrasi/operasional di sistem Coretax DJP, termasuk penanganan kasus transaksi elektronik sesuai PMK 168/2023 untuk klien online shop dan PMSE.\n\nAnda akan menangani pembukuan pajak klien UMKM hingga PT, rekonsiliasi, penyusunan SPT Masa dan Tahunan, serta menjadi penghubung dengan KPP saat ada pemberitahuan atau koreksi. Tim pajak kami compact — Anda akan menyentuh kasus nyata dari hari pertama, bukan sekadar arsip.\n\nKandidat yang paham siklus SPT dan terbiasa dengan portal DJP (termasuk Coretax) akan cepat berkembang. Pelatihan update regulasi (P3, PMK terbaru) diselenggarakan rutin.",
    responsibilities: [
      "Menyusun dan merekam SPT Masa (PPN/PPh) serta SPT Tahunan klien",
      "Mengoperasikan Coretax DJP untuk administrasi kepatuhan klien",
      "Mengelola e-Faktur, rekonsiliasi faktur pajak, dan dokumentasi transaksi",
      "Menangani kepatuhan PMSE klien transaksi elektronik sesuai PMK 168/2023",
      "Menyiapkan data untuk respons pemberitahuan/koreksi dari KPP",
      "Membantu konsultan pajak senior dalam analisis kasus klien",
    ],
    qualifications: [
      "S1/D4 Akuntansi, Perpajakan, atau Manajemen Keuangan",
      "Pengalaman 1–2 tahun di bidang taksonomi/pajak (fresh graduate berbakat dipertimbangkan)",
      "Memahami PPh, PPN, e-Faktur, dan siklus SPT",
      "Pernah mengoperasikan portal DJP/Coretax menjadi nilai plus kuat",
      "Teliti dengan angka dan terbiasa deadline perpajakan",
      "Bersedia WFO di kantor Bandung",
    ],
    benefits: [
      "Gaji IDR 6.000.000–10.000.000/bulan sesuai pengalaman",
      "BPJS Kesehatan & BPJS Ketenagakerjaan penuh",
      "THR dan bonus kinerja",
      "Tunjangan transport dan makan",
      "Pelatihan update regulasi pajak (Coretax, PMK terbaru) rutin",
      "Dukungan sertifikasi BKP/USKP bagi yang berkomitmen jangka panjang",
    ],
    skills: [
      "Perpajakan Indonesia",
      "Coretax DJP",
      "e-Faktur",
      "Rekonsiliasi",
      "PMSE (PMK 168/2023)",
      "Spreadsheet lanjutan",
    ],
    salary: { min: 6000000, max: 10000000, currency: "IDR", unit: "MONTH" },
    education: "S1/D4 Akuntansi, Perpajakan, atau Manajemen Keuangan",
    experience: "1–2 tahun di bidang perpajakan/taksonomi; fresh graduate berbakat dipertimbangkan",
    occupationalCategory: "Tax Compliance Specialist",
  },
  {
    slug: "digital-marketing-specialist",
    title: "Digital Marketing Specialist (SEO & Konten)",
    company: "PT Pusat Perizinan Indonesia",
    category: "kantor",
    location: {
      city: "Bandung",
      region: "Jawa Barat",
      country: "Indonesia",
      type: "hybrid",
    },
    employmentType: "FULL_TIME",
    datePosted: "2026-09-15",
    validThrough: "2026-12-25",
    description:
      "PT Pusat Perizinan Indonesia mencari Digital Marketing Specialist untuk memperkuat kanal digital perusahaan: SEO, konten edukasi perizinan & pajak, serta kampanye performa. Anda akan bekerja dengan ribuan halaman layanan yang sudah hidup di Google dan bertanggung jawab mengembangkannya.\n\nTugas utama mencakup riset keyword, optimasi on-page, penyusunan brief konten untuk penulis, pengelolaan landing page layanan (perizinan, pajak, kerja luar negeri), dan pelaporan metrik organik + paid. Kolaborasi erat dengan tim konsultan untuk menerjemahkan topik regulasi (NIB, KBLI, OSS-RBA, Coretax) menjadi konten yang mudah dipahami calon klien.\n\nKandidat dengan portofolio SEO nyata (bukti pertumbuhan trafik) lebih diutamakan daripada sekadar sertifikat. Kerja hybrid dari kantor Bandung.",
    responsibilities: [
      "Menjalankan program SEO: riset keyword, on-page, internal linking, dan audit teknis",
      "Menyusun brief dan mengedit konten edukasi (artikel, landing page, materi sosial)",
      "Mengelola kampanye iklan digital dan optimasi konversi landing page",
      "Memantau metrik (trafik organik, ranking, leads) dan menyusun laporan bulanan",
      "Berkolaborasi dengan tim konsultan untuk validasi akurasi konten regulasi",
      "Menjaga konsistensi brand voice di seluruh kanal digital",
    ],
    qualifications: [
      "S1/D4 Marketing, Komunikasi, Sastra, IT, atau bidang terkait",
      "Pengalaman 2+ tahun di SEO/digital marketing (portofolio wajib disertakan)",
      "Menguasai dasar-dasar Google Search Console, Analytics, dan tool keyword research",
      "Pemahaman struktur konten SEO (heading, meta, schema) menjadi nilai utama",
      "Kemampuan menulis Bahasa Indonesia yang rapi dan persuasif",
      "Bersedia bekerja hybrid dari Bandung",
    ],
    benefits: [
      "Gaji IDR 5.000.000–8.000.000/bulan sesuai portofolio",
      "BPJS Kesehatan & BPJS Ketenagakerjaan penuh",
      "THR dan bonus pencapaian target leads",
      "Fleksibilitas kerja hybrid dan jam fleksibel",
      "Anggaran pelatihan & tool marketing",
      "Kesempatan membangun program SEO dari sisi strategi, bukan hanya eksekusi",
    ],
    skills: [
      "SEO on-page & technical",
      "Keyword research",
      "Content marketing",
      "Google Analytics / Search Console",
      "Paid ads dasar",
      "Copywriting",
    ],
    salary: { min: 5000000, max: 8000000, currency: "IDR", unit: "MONTH" },
    education: "S1/D4 Marketing, Komunikasi, Sastra, IT, atau bidang terkait",
    experience: "Minimal 2 tahun di SEO/digital marketing dengan portofolio terukur",
    occupationalCategory: "Digital Marketing Specialist",
  },
  {
    slug: "customer-success-officer",
    title: "Customer Success Officer",
    company: "PT Pusat Perizinan Indonesia",
    category: "kantor",
    location: {
      city: "Jakarta Selatan",
      region: "DKI Jakarta",
      country: "Indonesia",
      type: "hybrid",
    },
    employmentType: "FULL_TIME",
    datePosted: "2026-09-08",
    validThrough: "2026-12-08",
    description:
      "PT Pusat Perizinan Indonesia membuka posisi Customer Success Officer untuk memastikan klien mendapat pengalaman terbaik setelah layanan dimulai. Anda menjadi titik kontak utama klien: menjawab pertanyaan progres perizinan, mengelola ekspektasi, dan menjaga kepuasan hingga layanan selesai — bahkan setelahnya untuk pelaporan berkala.\n\nLayanan kami tidak berhenti saat izin terbit: klien membutuhkan pendampingan kewajiban pasca-izin (laporan OSS-RBA, perizinan tahunan, kepatuhan pajak melalui Coretax). Anda akan memetakan kebutuhan lanjutan klien dan menghubungkannya dengan tim konsultan yang tepat.\n\nKandidat dengan empati tinggi, ketelitian administrasi, dan kenyamanan berbicara dengan berbagai tipe klien akan sangat cocok. Kerja hybrid dari kantor Jakarta Selatan.",
    responsibilities: [
      "Menjadi PIC komunikasi klien selama proses layanan berjalan",
      "Memberi update progres perizinan secara proaktif (WhatsApp, telepon, email)",
      "Mengelola keluhan klien dan eskalasi ke tim terkait sampai tuntas",
      "Memetakan kebutuhan layanan lanjutan (pelaporan berkala, perizinan baru) klien aktif",
      "Menyusun laporan kepuasan dan rekomendasi perbaikan layanan",
      "Menjaga database status klien tetap akurat di sistem internal",
    ],
    qualifications: [
      "S1/D4 semua jurusan (Komunikasi, Manajemen, Psikologi diutamakan)",
      "Pengalaman 1–2 tahun di customer service/success (fresh graduate berbakat dipersilakan)",
      "Komunikasi Bahasa Indonesia yang sangat baik, lisan dan tertulis",
      "Sabar, empati, dan tahan tekanan saat menghadapi keluhan",
      "Terorganisir dalam mengelola banyak klien sekaligus",
      "Bersedia bekerja hybrid dari Jakarta Selatan",
    ],
    benefits: [
      "Gaji IDR 4.500.000–7.000.000/bulan sesuai pengalaman",
      "BPJS Kesehatan & BPJS Ketenagakerjaan penuh",
      "THR dan bonus kepuasan klien",
      "Fleksibilitas kerja hybrid",
      "Tunjangan transport dan makan",
      "Pelatihan produk & regulasi perizinan menyeluruh",
    ],
    skills: [
      "Customer success",
      "Komunikasi klien",
      "Manajemen keluhan",
      "CRM dasar",
      "Administrasi",
    ],
    salary: { min: 4500000, max: 7000000, currency: "IDR", unit: "MONTH" },
    education: "S1/D4 semua jurusan",
    experience: "1–2 tahun di customer service/success; fresh graduate berbakat dipersilakan",
    occupationalCategory: "Customer Success Officer",
  },
  {
    slug: "sales-executive-legalitas",
    title: "Sales Executive Legalitas Usaha",
    company: "PT Pusat Perizinan Indonesia",
    category: "kantor",
    location: {
      city: "Surabaya",
      region: "Jawa Timur",
      country: "Indonesia",
      type: "onsite",
    },
    employmentType: "FULL_TIME",
    datePosted: "2026-09-20",
    validThrough: "2026-12-28",
    description:
      "PT Pusat Perizinan Indonesia membuka posisi Sales Executive Legalitas Usaha untuk kantor perwakilan Surabaya. Misi Anda: membantu pelaku usaha Jawa Timur memahami dan mengambil layanan legalitas — NIB, pendirian badan usaha, pemetaan KBLI, hingga paket perizinan lengkap melalui OSS-RBA.\n\nAnda akan mengelola pipeline dari inbound leads (sudah masuk dari kanal digital) dan proaktif membangun jejaring di komunitas UMKM, asosiasi, dan kantor notaris setempat. Target terukur bulanan dengan skema komisi yang jelas — semakin banyak usaha yang Anda legalize, semakin besar penghasilan Anda.\n\nKami memberi pelatihan produk menyeluruh (perizinan, pajak, PMI) sehingga Anda bisa menjual dengan kompeten, bukan sekadar menawarkan. Kandidat yang suka berjejaring dan punya motor sendiri sangat diutamakan.",
    responsibilities: [
      "Follow-up inbound leads dan melakukan presentasi layanan ke calon klien",
      "Membangun jejaring dengan UMKM, asosiasi usaha, notaris, dan PPAT di Jawa Timur",
      "Menyusun penawaran (quotation) dan menegosiasikan paket layanan",
      "Mencapai target penjualan bulanan yang disepakati",
      "Menjaga relasi klien untuk peluang layanan lanjutan (cross-sell pajak & perizinan lain)",
      "Melaporkan aktivitas dan pipeline penjualan di CRM internal",
    ],
    qualifications: [
      "Pendidikan minimal D3/S1 semua jurusan",
      "Pengalaman sales 1+ tahun (field sales/telesales); pengalaman menjual jasa sangat diutamakan",
      "Punya kendaraan sendiri dan SIM C/A yang aktif",
      "Komunikasi persuasif dan nyaman meeting langsung dengan klien",
      "Familiar dengan dunia UMKM Jawa Timur menjadi nilai plus",
      "Bersedia WFO dari kantor Surabaya dengan mobilitas kunjungan klien",
    ],
    benefits: [
      "Gaji tetap IDR 5.000.000–9.000.000/bulan + komisi penjualan berjenjang",
      "BPJS Kesehatan & BPJS Ketenagakerjaan penuh",
      "THR dan bonus pencapaian target tahunan",
      "Tunjangan transport, bensin, dan pulsa",
      "Pelatihan produk perizinan, pajak, dan teknik closing",
      "Jalur karier ke Account Manager / Area Sales Manager",
    ],
    skills: [
      "B2B sales",
      "Negosiasi",
      "Lead follow-up",
      "Presentasi",
      "CRM dasar",
      "Jejaring UMKM",
    ],
    salary: { min: 5000000, max: 9000000, currency: "IDR", unit: "MONTH" },
    education: "D3/S1 semua jurusan",
    experience: "Minimal 1 tahun pengalaman sales (jasa/B2B diutamakan)",
    occupationalCategory: "Sales Executive (Business Legality Services)",
  },
];

// ------------------------------------------------------------
// Util kategori cepat
// ------------------------------------------------------------

export function isPmiJob(job: Job): boolean {
  return job.location.country !== "Indonesia";
}

export function getFeaturedJobs(): Job[] {
  return JOBS.filter((j) => j.featured);
}
