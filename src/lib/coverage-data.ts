// ============================================================
// PUSATPERIZINAN.COM — Data Jangkauan Nasional
// 38 Provinsi (resmi pasca pemekaran Papua 2022)
// Melayani 514 Kabupaten/Kota (416 kabupaten + 98 kota)
// ============================================================

export type Island =
  | "Sumatera"
  | "Jawa"
  | "Bali & Nusa Tenggara"
  | "Kalimantan"
  | "Sulawesi"
  | "Maluku & Papua";

export interface ProvinceCoverage {
  name: string;
  island: Island;
  /** Kabupaten/kota utama yang paling sering kami tangani */
  majors: string[];
  /** Catatan khusus perizinan provinsi ini */
  note: string;
}

export const TOTAL_PROVINCES = 38;
export const TOTAL_KABKOTA = 514;

export const ISLANDS: Island[] = [
  "Sumatera",
  "Jawa",
  "Bali & Nusa Tenggara",
  "Kalimantan",
  "Sulawesi",
  "Maluku & Papua",
];

export const PROVINCES: ProvinceCoverage[] = [
  // ===== SUMATERA =====
  {
    name: "Aceh",
    island: "Sumatera",
    majors: ["Banda Aceh", "Lhokseumawe", "Langsa", "Sabang"],
    note: "Perizinan dengan kekhususan syariat (JDF/Qanun) — kami pahami batasnya dengan OSS.",
  },
  {
    name: "Sumatera Utara",
    island: "Sumatera",
    majors: ["Medan", "Binjai", "Pematangsiantar", "Tebing Tinggi"],
    note: "Perkebunan & industri pangan kuat — halal, PIRT & izin perkebunan tersubmit prioritas.",
  },
  {
    name: "Sumatera Barat",
    island: "Sumatera",
    majors: ["Padang", "Bukittinggi", "Payakumbuh", "Pariaman"],
    note: "UMKM kuliner & wisata — subsidi kuota halal melimpah di kota-kota penghasil.",
  },
  {
    name: "Riau",
    island: "Sumatera",
    majors: ["Pekanbaru", "Dumai"],
    note: "Sawit & energi — sering membutuhkan izin lingkungan + dokumen industri pangan.",
  },
  {
    name: "Jambi",
    island: "Sumatera",
    majors: ["Jambi (Kota)", "Sungai Penuh"],
    note: "Karet & sawit; perizinan usaha perdagangan hasil bumi terintegrasi NIB.",
  },
  {
    name: "Sumatera Selatan",
    island: "Sumatera",
    majors: ["Palembang", "Prabumulih", "Pagar Alam", "Lubuklinggau"],
    note: "Batu bara & F&B — kami pegang alur DPMPTSP Sumsel untuk dua-duanya.",
  },
  {
    name: "Kepulauan Bangka Belitung",
    island: "Sumatera",
    majors: ["Pangkalpinang"],
    note: "Timah & wisata — izin tambang IUP dan TDAU wisata pantai kami rutinkan.",
  },
  {
    name: "Kepulauan Riau",
    island: "Sumatera",
    majors: ["Batam", "Tanjungpinang"],
    note: "Batam = gerbang industri & FTZ — NIB, izin ekspor & PMA pebisnis pabrik sangat cepat di sini.",
  },
  {
    name: "Bengkulu",
    island: "Sumatera",
    majors: ["Bengkulu (Kota)"],
    note: "UMKM kuat — pendirian CV & PIRT 2 minggu jadi rutinitas kami di sini.",
  },
  {
    name: "Lampung",
    island: "Sumatera",
    majors: ["Bandar Lampung", "Metro"],
    note: "Gerbang Sumatera — logistik, gudang & izin niaga paling banyak ditanam di sini.",
  },
  // ===== JAWA =====
  {
    name: "DKI Jakarta",
    island: "Jawa",
    majors: ["Jakarta Selatan (SCBD)", "Jakarta Pusat", "Jakarta Barat", "Jakarta Timur", "Jakarta Utara"],
    note: "Kantor pusat kami di SCBD — NIB 1 hari, PT 3-5 hari, paling cepat se-Indonesia.",
  },
  {
    name: "Jawa Barat",
    island: "Jawa",
    majors: ["Bandung", "Bekasi", "Depok", "Bogor", "Cimahi", "Tasikmalaya", "Cirebon"],
    note: "Kota industri & kreatif — manufaktur wajib rapi dokumen lingkungan, kami urus.",
  },
  {
    name: "Jawa Tengah",
    island: "Jawa",
    majors: ["Semarang", "Surakarta (Solo)", "Magelang", "Salatiga", "Pekalongan", "Tegal"],
    note: "Basis UMKM — subsidi halal & PIRT paling ramah untuk pengusaha baru.",
  },
  {
    name: "DI Yogyakarta",
    island: "Jawa",
    majors: ["Yogyakarta (Kota)"],
    note: "Kafe, homestay & usaha kreatif — NIB gratis + pendampingan LKPM kami bantu.",
  },
  {
    name: "Jawa Timur",
    island: "Jawa",
    majors: ["Surabaya", "Malang", "Kediri", "Madiun", "Batu", "Mojokerto", "Probolinggo"],
    note: "Gerbang perdagangan Jatim — MD BPOM 30-45 hari dengan lab partner kami.",
  },
  {
    name: "Banten",
    island: "Jawa",
    majors: ["Tangerang", "Tangerang Selatan", "Serang", "Cilegon"],
    note: "Industri pesisir & bandara — pabrik, gudang & PMA perizinan ramai di sini.",
  },
  // ===== BALI & NUSA TENGGARA =====
  {
    name: "Bali",
    island: "Bali & Nusa Tenggara",
    majors: ["Denpasar"],
    note: "Pariwisata global & PMA — cek zona (green belt!) sebelum beli tanah/villa. Kami wajibkan.",
  },
  {
    name: "Nusa Tenggara Barat",
    island: "Bali & Nusa Tenggara",
    majors: ["Mataram", "Bima"],
    note: "Turis Lombok naik — hotel, homestay & wisata bahari butuh TDAU sejak awal.",
  },
  {
    name: "Nusa Tenggara Timur",
    island: "Bali & Nusa Tenggara",
    majors: ["Kupang"],
    note: "Labuan Bajo naik kelas — perizinan travel & akomodasi jadi permintaan tertinggi.",
  },
  // ===== KALIMANTAN =====
  {
    name: "Kalimantan Barat",
    island: "Kalimantan",
    majors: ["Pontianak", "Singkawang"],
    note: "Perbatasan & sawit — perizinan perdagangan lintas negara kami kerjakan rutin.",
  },
  {
    name: "Kalimantan Tengah",
    island: "Kalimantan",
    majors: ["Palangkaraya"],
    note: "Sawit & kayu — dokumen lingkungan + izin niaga hasil hutan paling sering ditanya.",
  },
  {
    name: "Kalimantan Selatan",
    island: "Kalimantan",
    majors: ["Banjarmasin", "Banjarbaru"],
    note: "Batu bara & sungai — izin angkut/niaga batubara & gudang kami dominan di sini.",
  },
  {
    name: "Kalimantan Timur",
    island: "Kalimantan",
    majors: ["Samarinda", "Balikpapan", "Bontang"],
    note: "IKN & energi — tambang, konstruksi & proyek IKN butuh legalitas super rapi.",
  },
  {
    name: "Kalimantan Utara",
    island: "Kalimantan",
    majors: ["Tarakan"],
    note: "Perbatasan & energi baru — NIB sektor energi & izin logistik batubara siap.",
  },
  // ===== SULAWESI =====
  {
    name: "Sulawesi Utara",
    island: "Sulawesi",
    majors: ["Manado", "Bitung", "Tomohon", "Kotamobagu"],
    note: "Bitung = pelabuhan ekspor — izin niaga & gudang ekspor ikan paling diminati.",
  },
  {
    name: "Gorontalo",
    island: "Sulawesi",
    majors: ["Gorontalo (Kota)"],
    note: "Jagung & kelapa — izin usaha agroindustri dengan sertifikat standar cepat.",
  },
  {
    name: "Sulawesi Tengah",
    island: "Sulawesi",
    majors: ["Palu", "Luwuk"],
    note: "Industri nikkel Morowali — IUP, lingkungan & k3 industri kami pegang standar kawasan.",
  },
  {
    name: "Sulawesi Barat",
    island: "Sulawesi",
    majors: ["Mamuju"],
    note: "Cokelat & sawit — CV & izin niaga hasil pertanian paling sering diajukan.",
  },
  {
    name: "Sulawesi Selatan",
    island: "Sulawesi",
    majors: ["Makassar", "Parepare", "Palopo"],
    note: "Hub ekonomi Timur — semua jenis izin bertransaksi lewat Makassar, tim kami siap.",
  },
  {
    name: "Sulawesi Tenggara",
    island: "Sulawesi",
    majors: ["Kendari", "Bau-Bau"],
    note: "Nikkel & wisata bahari — IUP + TDAU wisata laut kami dominan di sini.",
  },
  // ===== MALUKU & PAPUA =====
  {
    name: "Maluku",
    island: "Maluku & Papua",
    majors: ["Ambon", "Tual"],
    note: "Pala & wisata laut — izin niaga rempah & TDAU wisata bahari favorit kami.",
  },
  {
    name: "Maluku Utara",
    island: "Maluku & Papua",
    majors: ["Ternate", "Tidore"],
    note: "Nikkel & rempah — IUP industri & izin perdagangan hasil tambang rutin kami.",
  },
  {
    name: "Papua",
    island: "Maluku & Papua",
    majors: ["Jayapura"],
    note: "Proses online penuh + kurir dokumen — izin usaha dasar selesai tanpa Anda ke kantor.",
  },
  {
    name: "Papua Barat",
    island: "Maluku & Papua",
    majors: ["Manokwari", "Sorong"],
    note: "Sorong = gerbang migas — NIB sektor energi & izin logistik kami kuasai.",
  },
  {
    name: "Papua Barat Daya",
    island: "Maluku & Papua",
    majors: ["Sorong (PBD)"],
    note: "Provinsi termuda — perizinan dasar NIB & PT kami layani sejak hari pertama berdiri.",
  },
  {
    name: "Papua Tengah",
    island: "Maluku & Papua",
    majors: ["Timika (Mimika)", "Nabire"],
    note: "Timika & Grasberg — perizinan pendukung tambang & usaha katering kawasan kami pegang.",
  },
  {
    name: "Papua Pegunungan",
    island: "Maluku & Papua",
    majors: ["Wamena (Jayawijaya)"],
    note: "Dataran tinggi — izin usaha perdagangan & logistik darat kami layani online penuh.",
  },
  {
    name: "Papua Selatan",
    island: "Maluku & Papua",
    majors: ["Merauke"],
    note: "Projek pangan & sawit — izin lingkungan + perkebunan paling sering diajukan.",
  },
];
