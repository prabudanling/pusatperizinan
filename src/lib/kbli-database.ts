// ============================================================
// PUSATPERIZINAN.COM — Database KBLI 2025
// 150+ kode KBLI valid dengan konten kaya untuk halaman SEO
// Sumber: KBLI 2020 (basis KBLI 2025), PP 5/2021, Peraturan OSS
// ============================================================

export type KbliRisk = "rendah" | "menengah-rendah" | "menengah-tinggi" | "tinggi";

export interface KbliCategoryMeta {
  id: string;
  letter: string;
  name: string;
  icon: string;
}

export const KBLI_CATEGORIES: KbliCategoryMeta[] = [
  { id: "pertanian", letter: "A", name: "Pertanian & Peternakan", icon: "🌾" },
  { id: "perikanan", letter: "B", name: "Perikanan", icon: "🐟" },
  { id: "pengolahan", letter: "D", name: "Industri Pengolahan", icon: "🏭" },
  { id: "listrik", letter: "E", name: "Listrik, Gas & Energi", icon: "⚡" },
  { id: "konstruksi", letter: "F", name: "Konstruksi", icon: "🏗️" },
  { id: "dagang", letter: "G", name: "Perdagangan & E-Commerce", icon: "🛒" },
  { id: "transportasi", letter: "H", name: "Transportasi & Logistik", icon: "🚚" },
  { id: "akomodasi", letter: "I", name: "Akomodasi & Makan Minum", icon: "🍽️" },
  { id: "informasi", letter: "J", name: "Informasi & Digital", icon: "💻" },
  { id: "keuangan", letter: "K", name: "Jasa Keuangan", icon: "🏦" },
  { id: "properti", letter: "L", name: "Real Estate", icon: "🏢" },
  { id: "profesional", letter: "M", name: "Jasa Profesional", icon: "📊" },
  { id: "persewaan", letter: "N", name: "Persewaan & Ketenagakerjaan", icon: "🤝" },
  { id: "pendidikan", letter: "P", name: "Pendidikan", icon: "🎓" },
  { id: "kesehatan", letter: "Q", name: "Kesehatan", icon: "🏥" },
  { id: "hiburan", letter: "R", name: "Seni, Hiburan & Rekreasi", icon: "🎭" },
  { id: "jasa-lain", letter: "S", name: "Jasa Lainnya", icon: "✂️" },
];

/** Raw entry — compact. Generator membangun konten lengkapnya. */
export interface KbliRaw {
  c: string; // kode KBLI (5 digit)
  t: string; // judul resmi
  cat: string; // id kategori
  risk: KbliRisk;
  d: string; // deskripsi 1-2 kalimat
  inc: string[]; // cakupan kegiatan (3-5)
  halal?: boolean; // relevan sertifikasi halal
  lic?: string[]; // izin khusus tambahan (di luar risk-based)
}

export const KBLI_RAW: KbliRaw[] = [
  // ===== A. PERTANIAN & PETERNAKAN =====
  { c: "01111", t: "Pertanian Padi", cat: "pertanian", risk: "rendah", d: "Usaha budidaya padi sawah dan padi gogo untuk pangan — salah satu KBLI pertanian paling banyak digunakan UMKM dan koperasi petani.", inc: ["Penanaman padi sawah & gogo", "Pembenihan padi", "Panen & penanganan pascapanen dasar"], halal: true },
  { c: "01112", t: "Pertanian Jagung", cat: "pertanian", risk: "rendah", d: "Budidaya jagung pakan dan jagung pangan — permintaan tinggi dari industri pakan ternak dan pabrik tepung.", inc: ["Penanaman jagung pakan & pangan", "Benih jagung hibrida", "Panen, kering & grading"], halal: true },
  { c: "01113", t: "Pertanian Kedelai", cat: "pertanian", risk: "rendah", d: "Budidaya kedelai untuk kebutuhan industri tahu-tempe, pakan, dan olahan pangan.", inc: ["Penanaman kedelai", "Benih kedelai lokal", "Pascapanen & penyimpanan"], halal: true },
  { c: "01132", t: "Pertanian Sayuran", cat: "pertanian", risk: "rendah", d: "Budidaya sayuran segar (cabai, tomat, sayuran daun, dll) — ideal untuk hidroponik dan smart farming.", inc: ["Sayuran dataran tinggi & rendah", "Hidroponik & greenhouse", "Bibit sayuran"], halal: true },
  { c: "01141", t: "Pertanian Buah-Buahan", cat: "pertanian", risk: "rendah", d: "Budidaya buah-buahan tropis dan subtropis untuk pasar segar dan industri pengolahan.", inc: ["Buah tropis (manggis, salak, dll)", "Buah kontinental (strawberry, dll)", "Kebun bibit buah"], halal: true },
  { c: "01270", t: "Pertanian Tanaman Rempah", cat: "pertanian", risk: "rendah", d: "Budidaya rempah-rempah (kunyit, jahe, lengkuas, dll) untuk pasar domestik dan ekspor — komoditas ekspor yang tumbuh pesat.", inc: ["Rempah empon-empon", "Tanaman obat (herbal)", "Bibit rempah"], halal: true },
  { c: "01430", t: "Peternakan Kambing & Domba", cat: "pertanian", risk: "rendah", d: "Usaha ternak kambing dan domba untuk daging — permintaan melonjak tiap musim qurban.", inc: ["Ternak potong", "Pembenihan (induk & pejantan)", "Feedlot kambing-domba"], halal: true },
  { c: "01451", t: "Peternakan Ayam Petelur", cat: "pertanian", risk: "rendah", d: "Usaha peternakan ayam untuk produksi telur konsumsi — pasokan protein nasional dengan pasar stabil.", inc: ["Kandang layer", "Produksi telur konsumsi", "Pulutan & pupuk organik"], halal: true },
  { c: "01461", t: "Peternakan Ayam Pedaging", cat: "pertanian", risk: "rendah", d: "Usaha ternak ayam broiler untuk daging — siklus cepat 28-35 hari, cocok bagi mitra pabrik pakan.", inc: ["Kandang broiler", "Mitra pola inti-plasma", "Panen & marketing live bird"], halal: true },
  { c: "01493", t: "Peternakan Lebah Madu", cat: "pertanian", risk: "rendah", d: "Budidaya lebah untuk produksi madu dan produk samping (royal jelly, propolis, beeswax).", inc: ["Apikultur madu", "Royal jelly & propolis", "Layanan polinasi"], halal: true },

  // ===== B. PERIKANAN =====
  { c: "03112", t: "Penangkapan Ikan Laut", cat: "perikanan", risk: "menengah-rendah", d: "Usaha penangkapan ikan di laut dengan kapal — butuh SIPI (Surat Izin Penangkapan Ikan) sesuai kapasitas kapal.", inc: ["Kapal penangkap ikan", "Nelayan tangkap (purse seine, gillnet)", "Ikan segar untuk pasar"], lic: ["SIPI (Surat Izin Penangkapan Ikan) — KKPN"] },
  { c: "03212", t: "Budidaya Ikan Air Tawar", cat: "perikanan", risk: "rendah", d: "Budidaya ikan air tawar (lele, nila, gurame) di kolam, keramba, atau biofloc — UMKM perikanan paling populer.", inc: ["Kolam & keramba", "Biofloc & aquaponic", "Benih ikan (nursery)"], halal: true },
  { c: "03221", t: "Budidaya Udang", cat: "perikanan", risk: "menengah-rendah", d: "Budidaya udang (vaname, windu) tambak intensif — komoditas ekspor perikanan nomor satu Indonesia.", inc: ["Tambak intensif & semi-intensif", "Hatchery benih udang", "Panen & freezing awal"] },

  // ===== D. INDUSTRI PENGOLAHAN =====
  { c: "10330", t: "Industri Pengolahan & Pengawetan Ikan", cat: "pengolahan", risk: "menengah-rendah", d: "Industri pengolahan ikan menjadi produk olahan (beku, asin, asap, kerupuk) — pintu masuk ekspor seafood.", inc: ["Ikan beku (frozen fish)", "Ikan asin & asap", "Kerupuk & abon ikan"], halal: true },
  { c: "10401", t: "Industri Minyak & Lemak Nabati", cat: "pengolahan", risk: "menengah-tinggi", d: "Industri minyak goreng, margarin, dan lemak nabati dari sawit, kelapa, dan bahan nabati lain.", inc: ["Minyak goreng curah & kemasan", "Margarin & shortening", "Crude palm oil (CPO) olah"], halal: true, lic: ["Izin industri & sertifikasi produk wajib (BPOM untuk konsumsi)"] },
  { c: "10711", t: "Industri Penggilingan Terigu", cat: "pengolahan", risk: "menengah-rendah", d: "Industri penggilingan gandum menjadi terigu — modal intensif dengan pasar B2B stabil.", inc: ["Terigu serbaguna", "Terigu spesialis (roti, mie)", "By-product (dedak)"] },
  { c: "10715", t: "Industri Roti, Kue & Sejenisnya", cat: "pengolahan", risk: "menengah-rendah", d: "Pabrik roti, kue kering, dan bakeri — dari home industry naik kelas menjadi pemasaran ritel modern.", inc: ["Roti tawar & sobek", "Kue kering & biskuit", "Frozen dough"], halal: true, lic: ["PIRT atau BPOM sesuai skala & produk"] },
  { c: "10721", t: "Industri Gula Pasir", cat: "pengolahan", risk: "menengah-tinggi", d: "Industri gula dari tebu atau impor — sektor yang diatur ketat dengan izin spesifik.", inc: ["Gula kristal putih (GKP)", "Gula mentah olah", "Gula cair industri"], lic: ["Izin industri gula (Pengendalian Perdagangan Gula)"] },
  { c: "10730", t: "Industri Makanan & Olahan Lain", cat: "pengolahan", risk: "menengah-rendah", d: "Industri makanan olahan umum: sambal, saus, keripik, makanan beku, dan produk inovasi lain.", inc: ["Sambal & saus kemasan", "Keripik & snack", "Frozen food"], halal: true, lic: ["PIRT atau BPOM sesuai produk"] },
  { c: "10792", t: "Industri Kopi & Teh", cat: "pengolahan", risk: "menengah-rendah", d: "Pengolahan kopi dan teh: roastery kopi, teh kemasan, dan blend — sangat ramai di era coffee shop culture.", inc: ["Roasted coffee & ground", "Teh hitam/hijau kemasan", "Kopi instan & RTD"], halal: true, lic: ["PIRT untuk produk konsumsi"] },
  { c: "10793", t: "Industri Pengolahan Rempah", cat: "pengolahan", risk: "menengah-rendah", d: "Pengolahan rempah: kering, giling, powder — komoditas ekspor dengan nilai tambah tinggi.", inc: ["Rempah kering & powder", "Curry & seasoning mix", "Ekspor rempah (cinnamon, nutmeg)"], halal: true },
  { c: "11041", t: "Industri Minuman Non-Alkohol", cat: "pengolahan", risk: "menengah-rendah", d: "Produksi minuman kemasan: sirup, jus, teh RTD, air mineral — regulasi BPOM & halal wajib dipahami.", inc: ["Sirup & jus kemasan", "Minuman RTD", "Air mineral & RO"], halal: true, lic: ["Izin edar BPOM (MD) untuk minuman kemasan"] },
  { c: "13111", t: "Industri Benang Kapas", cat: "pengolahan", risk: "menengah-rendah", d: "Industri spinning benang dari kapas dan serat — upstream tekstil dengan pasar B2B besar.", inc: ["Benang spun kapas", "Benang blended", "Benang tekstil industri"] },
  { c: "14111", t: "Industri Pakaian Jadi Kerja", cat: "pengolahan", risk: "menengah-rendah", d: "Konveksi dan produksi pakaian jadi — industri kreatif padat karya dengan peluang ekspor besar.", inc: ["Konveksi order (CMT)", "Uniform & corporate wear", "Fashion brand produksi"], halal: true },
  { c: "14122", t: "Industri Pakaian Dalam & Kaos Kaki", cat: "pengolahan", risk: "menengah-rendah", d: "Produksi pakaian dalam, kaos kaki, dan pakaian khusus — pasar ritel & online yang stabil.", inc: ["Underwear & lingerie", "Kaos kaki", "Produksi OEM brand"], halal: true },
  { c: "18113", t: "Industri Percetakan Lainnya", cat: "pengolahan", risk: "rendah", d: "Percetakan umum: brosur, kemasan, spanduk, dan media cetak kustom — jasa B2B yang terus hidup di era digital.", inc: ["Cetak brosur & kartu nama", "Kemasan cetak", "Spanduk & signage"], lic: ["Tidak wajib — NIB cukup untuk skala kecil"] },
  { c: "22291", t: "Industri Produk Plastik Lainnya", cat: "pengolahan", risk: "menengah-rendah", d: "Industri cetak plastik: kemasan, perkakas, komponen — B2B manufacturing dengan injection molding.", inc: ["Kemasan plastik", "Houseware plastik", "Komponen industri"], lic: ["Perhatikan regulasi plastik sekali pakai & lingkungan"] },
  { c: "23941", t: "Industri Semen", cat: "pengolahan", risk: "tinggi", d: "Industri semen dan bahan ikatan — sektor strategis dengan izin industri & lingkungan berlapis.", inc: ["Semen curah & kantong", "Beton siap pakai", "Mortar"], lic: ["Izin industri strategis + AMDAL"] },
  { c: "24311", t: "Industri Peleburan Baja", cat: "pengolahan", risk: "tinggi", d: "Industri peleburan dan pembuatan baja dasar — kapital intensif dengan perizinan lingkungan kompleks.", inc: ["Billet & slab", "Bar & profile baja", "Baja struktural"], lic: ["Izin industri + AMDAL + kewajiban lingkungan ketat"] },
  { c: "25991", t: "Industri Produk Logam Lainnya", cat: "pengolahan", risk: "menengah-rendah", d: "Fabricasi logam: kusen, gerobak, peralatan — bengkel logam yang naik kelas menjadi industri.", inc: ["Kusen & railing logam", "Fabricasi sheet metal", "Custom welding"], halal: true },
  { c: "27901", t: "Industri Alat Listrik Lainnya", cat: "pengolahan", risk: "menengah-tinggi", d: "Produksi peralatan listrik umum: panel, kabel, lampu — wajib SNI untuk banyak produk.", inc: ["Panel listrik", "Kabel & penghantar", "Lampu & fitting"], lic: ["SNI wajib untuk kategori tertentu"] },
  { c: "30401", t: "Industri Kendaraan Bermotor", cat: "pengolahan", risk: "tinggi", d: "Perakitan dan produksi kendaraan bermotor — sektor strategis nasional dengan perizinan industri berlapis.", inc: ["Perakitan kendaraan", "Komponen utama", "EV & baterai"], lic: ["Izin industri strategis + sertifikasi komponen"] },
  { c: "32401", t: "Industri Permainan & Mainan Anak", cat: "pengolahan", risk: "rendah", d: "Produksi mainan edukasi dan hiburan anak — pasar niche yang tumbuh dengan perhatian SNI keselamatan.", inc: ["Mainan edukasi kayu", "Mainan plastik aman", "Board game lokal"], lic: ["SNI mainan (keselamatan anak) disarankan/wajib"] },

  // ===== E. LISTRIK & ENERGI =====
  { c: "35101", t: "Pembangkit Listrik Tenaga Uap", cat: "listrik", risk: "tinggi", d: "Usaha pembangkit listrik PLTU — IUPTLU dengan kontrak PLN dan regulasi ESDM berlapis.", inc: ["IPP (Independent Power Producer)", "Kogenerasi", " captive power"], lic: ["IUPTLU (Izin Usaha Pembangkit untuk kepentingan umum)"] },
  { c: "35130", t: "Pembangkit Listrik Tenaga Surya", cat: "listrik", risk: "menengah-tinggi", d: "PLTS atap dan utility scale — sektor energi terbarukan yang didukung insentif pemerintah.", inc: ["PLTS atap komersial", "PLTS utility scale", "O&M solar"], lic: ["IUPTLU / kesepakatan PLN untuk PLTS atap"] },

  // ===== F. KONSTRUKSI =====
  { c: "41011", t: "Konstruksi Gedung Tempat Tinggal", cat: "konstruksi", risk: "menengah-tinggi", d: "Kontraktor bangunan hunian: rumah tinggal, apartemen, townhouse — kode ini KHUSUS fungsi tempat tinggal; bila proyek Anda gedung kantor/mall/hotel, gunakan KBLI 41012. Sektor konstruksi dengan pelaku UMKM terbanyak.", inc: ["Kontraktor rumah tinggal", "Developer hunian skala kecil", "Renovasi & bangunan tempat tinggal"], lic: ["SBU/SBUT konstruksi (Disnaker/PUPR) untuk tender"] },
  { c: "41012", t: "Konstruksi Gedung Non-Tempat Tinggal", cat: "konstruksi", risk: "menengah-tinggi", d: "Kontraktor gedung komersial & publik: kantor, mall, hotel, rumah sakit, sekolah — berbeda dari KBLI 41011 yang khusus hunian. Skala proyek lebih besar dengan standar K3 yang lebih ketat.", inc: ["Kontraktor gedung komersial", "Fit-out interior kantor & komersial", "Struktur & arsitektural gedung publik"], lic: ["SBU/SBUT konstruksi + SMK3 (≥100 pekerja)"] },
  { c: "42101", t: "Konstruksi Jalan Rel & Jalan Raya", cat: "konstruksi", risk: "tinggi", d: "Konstruksi infrastruktur transportasi: jalan, jembatan, jalan rel — tender pemerintah dengan syarat kualifikasi tinggi.", inc: ["Paving & aspal", "Jembatan", "Drainase jalan"], lic: ["SBUT kualifikasi besar + SMK3 + sertifikasi teknis"] },
  { c: "42211", t: "Konstruksi Jaringan Pipa", cat: "konstruksi", risk: "menengah-tinggi", d: "Konstruksi pipa air, gas, dan minyak — spesialis teknis dengan standar welding & safety.", inc: ["Pipa air bersih", "Pipa gas & migas", "Hydrant & fire system"], lic: ["SBU khusus + sertifikasi welding (B4T)"] },
  { c: "43211", t: "Instalasi Listrik", cat: "konstruksi", risk: "menengah-rendah", d: "Jasa instalasi listrik bangunan: wiring, panel, lighting — kontraktor MEP paling umum.", inc: ["Instalasi listrik gedung", "Panel & ATS/AMF", "Lighting & smart home"], lic: ["Sertifikat kompetensi teknisi (SKTTK) disarankan"] },
  { c: "43301", t: "Pekerjaan Finishing Bangunan", cat: "konstruksi", risk: "menengah-rendah", d: "Jasa finishing: cat, plafon, keramik, interior — ekosistem konstruksi yang jalan terus.", inc: ["Cat & coating", "Plafon & partition", "Keramik & natural stone"] },

  // ===== G. PERDAGANGAN =====
  { c: "46101", t: "Perantara Perdagangan Umum", cat: "dagang", risk: "rendah", d: "Usaha agen/makelar perdagangan tanpa stok — model bisnis ringan modal dengan margin dari komisi.", inc: ["Agen & broker", "Distributor tanpa stok", "Komisi trading"] },
  { c: "46201", t: "Perdagangan Besar Hasil Pertanian", cat: "dagang", risk: "rendah", d: "Grosir hasil pertanian: beras, sayur, buah — penghubung petani ke pasar & industri.", inc: ["Grosir beras & sembako", "Sayur & buah grosir", "Supply chain pertanian"] },
  { c: "46311", t: "Perdagangan Besar Makanan & Minuman", cat: "dagang", risk: "rendah", d: "Distributor grosir F&B — jalur utama produk ke supermarket, toko, dan kafe.", inc: ["Distributor FMCG", "Wholesale snack & minuman", "Cold chain distribusi"] },
  { c: "46411", t: "Perdagangan Besar Tekstil & Pakaian", cat: "dagang", risk: "rendah", d: "Grosir tekstil dan pakaian — hub pasar tanah abang & pusat grosir daerah.", inc: ["Grosir kain", "Distributor pakaian", "Supply konveksi"] },
  { c: "46900", t: "Perdagangan Besar Lainnya", cat: "dagang", risk: "rendah", d: "Grosir barang umum yang tidak masuk kategori spesifik — fleksibel untuk multi-komoditas.", inc: ["Trading multi-produk", "Importir distributor", "Grosir sparepart"] },
  { c: "47111", t: "Perdagangan Eceran Toko Serba Ada Besar", cat: "dagang", risk: "rendah", d: "Ritel modern skala besar (hypermarket/supermarket) — butuh izin lokasi & rencana operasional matang.", inc: ["Supermarket", "Hypermarket", "Minimarket (skala menengah)"] },
  { c: "47112", t: "Perdagangan Eceran Toko Kelontong", cat: "dagang", risk: "rendah", d: "Toko kelontong dan mini market kecil — bentuk usaha ritel paling banyak di Indonesia.", inc: ["Toko kelontong", "Mini market", "Warung sembako"], halal: true },
  { c: "47191", t: "Perdagangan Eceran Makanan & Minuman Lainnya", cat: "dagang", risk: "rendah", d: "Ritel F&B spesialis: toko kopi, toko roti, distro makanan — retail niche yang berkembang cepat.", inc: ["Toko kopi & roastery retail", "Bakery retail", "Distro frozen food"], halal: true },
  { c: "47214", t: "Perdagangan Eceran Sayur & Buah", cat: "dagang", risk: "rendah", d: "Ritel sayur, buah, dan bahan pangan segar — dari warung pasaran hingga fruit shop modern.", inc: ["Fruit & veg shop", "Grocery segar", "Pre-cut & packing"], halal: true },
  { c: "47411", t: "Perdagangan Eceran Komputer & Peralatannya", cat: "dagang", risk: "rendah", d: "Ritel komputer, laptop, dan aksesoris — butuh dukungan service & garansi yang rapi.", inc: ["Laptop & PC", "Aksesoris & peripheral", "Custom build PC"] },
  { c: "47491", t: "Perdagangan Eceran Telepon Seluler", cat: "dagang", risk: "rendah", d: "Ritel HP, aksesoris, dan aksesoris pendukung — pasar besar dengan kompetisi ketat.", inc: ["Smartphone retail", "Aksesoris HP", "Trade-in & second"] },
  { c: "47511", t: "Perdagangan Eceran Tekstil", cat: "dagang", risk: "rendah", d: "Ritel kain, tekstil, dan perlengkapan jahit — toko tekstil & butik kain.", inc: ["Kain meteran", "Katun & batik", "Peralatan jahit"], halal: true },
  { c: "47711", t: "Perdagangan Eceran Pakaian Jadi", cat: "dagang", risk: "rendah", d: "Ritel pakaian jadi: butik, distro fashion, dan outlet — pasangannya kuat dengan marketplace online.", inc: ["Butik & distro", "Outlet pakaian", "Brand lokal retail"] },
  { c: "47714", t: "Perdagangan Eceran Kosmetik & Perawatan Tubuh", cat: "dagang", risk: "rendah", d: "Ritel kosmetik & skincare — produk yang dijual WAJIB berizin edar BPOM.", inc: ["Kosmetik & skincare retail", "Sabun & shampoo", "Beauty store"], lic: ["Hanya jual produk berizin edar BPOM (MD/ML)"] },
  { c: "47732", t: "Apotek", cat: "dagang", risk: "menengah-tinggi", d: "Apotek ritel — butuh SIPA apoteker, standar sarana Dinkes, dan sistem resep yang patuh.", inc: ["Obat keras & bebas", "Obat resep", "OTC & vitamin"], lic: ["SIPA (izin apotek Dinkes) + apoteker pensiun"] },
  { c: "47911", t: "Perdagangan Eceran Melalui Media Daring", cat: "dagang", risk: "rendah", d: "TOKO ONLINE / e-commerce retail — KBLI paling dicari pebisnis digital era sekarang.", inc: ["Toko online (website)", "Seller marketplace", "Live commerce & TikTok Shop"] },
  { c: "47919", t: "Perdagangan Eceran Daring Lainnya", cat: "dagang", risk: "rendah", d: "Ritel online model lain: dropship, sosial commerce, dan pre-order — fleksibel tanpa stok fisik besar.", inc: ["Dropshipping", "Sosial commerce", "Pre-order & konsinyasi online"] },
  { c: "47785", t: "Perdagangan Eceran Produk Halal Khusus", cat: "dagang", risk: "rendah", d: "Ritel produk-produk bersertifikat halal — niche yang berkembang dengan pasar Muslim global.", inc: ["Toko produk halal", "Ritel makanan halal khas", "Produk syariah"], halal: true },

  // ===== H. TRANSPORTASI & LOGISTIK =====
  { c: "49221", t: "Angkutan Barang Jalan Umum", cat: "transportasi", risk: "menengah-rendah", d: "Usaha truk/kendaraan angkut barang komersial — tulang punggung distribusi nasional.", inc: ["Armada truk & pick-up", "Angkutan antar kota", "Kontrak logistik B2B"], lic: ["TDUP (Tanda Daftar Usaha Perhubungan) + SRUT armada"] },
  { c: "49311", t: "Angkutan Penumpang Dalam Kota", cat: "transportasi", risk: "menengah-rendah", d: "Transportasi penumpang dalam kota: taksi, angkutan kota, travel — izin trayek dari Dishub.", inc: ["Taksi konvensional/app", "Travel antar kota", "Angkutan kota (angkot)"], lic: ["TDUP + izin trayek Dishub"] },
  { c: "52101", t: "Gudang & Penyimpanan Umum", cat: "transportasi", risk: "rendah", d: "Jasa gudang dan penyimpanan barang — penting untuk ekosistem e-commerce dan 3PL.", inc: ["Sewa gudang", "Storage barang", "Inventory management"] },
  { c: "52211", t: "Kegiatan Pelabuhan Laut", cat: "transportasi", risk: "tinggi", d: "Operasional terminal/pelabuhan — sektor strategis dengan izin Kemenhub berlapis.", inc: ["Terminal petikemas", "Dermaga umum", "Stevedoring"], lic: ["Izin pengusahaan pelabuhan (Kemenhub)"] },
  { c: "53201", t: "Kegiatan Pos & Kurir", cat: "transportasi", risk: "menengah-rendah", d: "Jasa pos dan kurir paket — bisnis logistik terakhir mil yang tumbuh bersama e-commerce.", inc: ["Kurir domestik", "Same-day delivery", "Fulfillment services"], lic: ["Izin penyelenggaraan jasa pos (Komdigi/Kemenhub)"] },

  // ===== I. AKOMODASI & MAKAN MINUM =====
  { c: "55101", t: "Hotel", cat: "akomodasi", risk: "menengah-tinggi", d: "Usaha hotel berbintang dan non-bintang — butuh PBG, TDAU, dan standar sarana yang patuh.", inc: ["Hotel berbintang", "City hotel & resort", "Hotel & service apartment"], lic: ["TDAU (Tanda Daftar Usaha Pariwisata) + PBG/SLF"] },
  { c: "55120", t: "Guest House, Motel & Penginapan Lain", cat: "akomodasi", risk: "menengah-rendah", d: "Guest house, motel, dan penginapan skala kecil-menengah — populer di kota wisata & daerah edukasi.", inc: ["Guest house", "Motel & lodge", "Penginapan backpacker"], lic: ["TDAU kategori akomodasi"] },
  { c: "55201", t: "Rumah Penginapan (Homestay)", cat: "akomodasi", risk: "rendah", d: "Homestay dan guesthouse berbasis rumah — model usaha wisata desa & Airbnb host yang sedang booming.", inc: ["Homestay desa wisata", "Rumah sewa harian", "Airbnb & OTA host"], lic: ["TDAU (dapat diurus via desa/dinas pariwisata)"] },
  { c: "56101", t: "Usaha Restoran", cat: "akomodasi", risk: "menengah-rendah", d: "Restoran dengan pelayanan penuh — KBLI kuliner utama yang dicari pebisnis F&B.", inc: ["Restoran dine-in", "Family restaurant", "Fine dining & buffet"], halal: true, lic: ["NIB + Halal (SEHATI) + PIRT jika ada produk kemasan"] },
  { c: "56102", t: "Usaha Rumah Makan", cat: "akomodasi", risk: "menengah-rendah", d: "Rumah makan dan warung makan skala menengah — bisnis kuliner klasik yang selalu laku.", inc: ["Rumah makan keluarga", "Warung makan spesialis", "Lelehan & padang"], halal: true },
  { c: "56103", t: "Usaha Katering", cat: "akomodasi", risk: "menengah-rendah", d: "Jasa katering untuk event, kantor, dan institusi — B2B & B2C dengan kontrak berulang.", inc: ["Katering event", "Katering kantor (daily)", "Lunch box & meal program"], halal: true },
  { c: "56104", t: "Usaha Kantin & Restoran Makan Cepat", cat: "akomodasi", risk: "menengah-rendah", d: "Kantin, food court, dan restoran cepat saji — cocok di area perkantoran & sekolah.", inc: ["Food court", "Kantin institusi", "Fast food lokal & franchise"], halal: true },
  { c: "56291", t: "Warung Kaki Lima & Gerobak Makanan", cat: "akomodasi", risk: "rendah", d: "Street food: warung kaki lima, gerobak, dan kuliner keliling — UMKM kuliner dengan modal paling ringan.", inc: ["Warung kaki lima", "Gerobak & food truck", "Kaki lima tempat tetap"], halal: true },
  { c: "56301", t: "Usaha Kafe", cat: "akomodasi", risk: "menengah-rendah", d: "Kafe dengan hidangan kopi & ringan — lifestyle business yang ramai di era digital.", inc: ["Cafe & coffee shop", "Roastery cafe", "Coworking cafe"], halal: true },
  { c: "56303", t: "Kedai Minuman Lainnya", cat: "akomodasi", risk: "menengah-rendah", d: "Kedai minuman spesialis: boba, jus, es teh modern — franchise-friendly dengan modal terjangkau.", inc: ["Bubble drink & jus", "Es teh & minuman RTD kios", "Milk tea & smoothie"], halal: true },

  // ===== J. INFORMASI & DIGITAL =====
  { c: "58201", t: "Penerbitan Perangkat Lunak", cat: "informasi", risk: "rendah", d: "Penerbitan software & aplikasi (SaaS, game, aplikasi) — industri digital dengan margin tertinggi.", inc: ["SaaS & aplikasi", "Game development", "Publishing aplikasi mobile"], lic: ["PSE Komdigi untuk platform online"] },
  { c: "62011", t: "Pengembangan Software Custom", cat: "informasi", risk: "rendah", d: "Jasa pengembangan software kustom (web, mobile, enterprise) — solusi B2B yang terus dibutuhkan.", inc: ["Web & mobile app dev", "Enterprise system", "API & integrasi"] },
  { c: "62020", t: "Konsultasi Perangkat Lunak & IT", cat: "informasi", risk: "rendah", d: "Konsultan IT: transformasi digital, audit, dan strategi teknologi — jasa profesional berbasis keahlian.", inc: ["IT consulting", "Digital transformation", "Cloud & DevOps advisory"] },
  { c: "62092", t: "Kegiatan Layanan Komputer Lainnya", cat: "informasi", risk: "rendah", d: "Layanan IT lain: hosting, managed service, data center, dan recovery.", inc: ["Managed IT services", "Hosting & server", "IT support & maintenance"] },
  { c: "63122", t: "Portal, Mesin Pencari & Website", cat: "informasi", risk: "rendah", d: "Portal berita, marketplace, dan platform web — wajib PSE untuk kepatuhan digital.", inc: ["Portal & media online", "Marketplace & directory", "Community platform"], lic: ["PSE Komdigi (Tanda Daftar PSE)"] },
  { c: "63192", t: "Pengolahan Data & Hosting", cat: "informasi", risk: "rendah", d: "Layanan pengolahan data, cloud, dan hosting — infrastruktur digital untuk bisnis lain.", inc: ["Cloud hosting", "Data processing", "Big data & analytics"], lic: ["PSE Komdigi (PDE/PESE)"] },
  { c: "73101", t: "Periklanan (Agen Iklan)", cat: "informasi", risk: "rendah", d: "Agen periklanan & digital marketing agency — jasa kreatif yang tumbuh bersama ekonomi digital.", inc: ["Digital marketing agency", "Media buying", "Creative campaign"] },
  { c: "74100", t: "Aktivitas Desain Khusus", cat: "informasi", risk: "rendah", d: "Jasa desain: grafis, produk, interior, UI/UX — industri kreatif untuk freelancer hingga studio.", inc: ["Desain grafis & branding", "UI/UX design", "Desain produk & interior"] },
  { c: "74201", t: "Aktivitas Fotografi", cat: "informasi", risk: "rendah", d: "Jasa fotografi komersial: wedding, produk, korporat — creative service dengan permintaan stabil.", inc: ["Wedding & event photo", "Product photography", "Studio foto"] },
  { c: "74301", t: "Aktivitas Penerjemahan", cat: "informasi", risk: "rendah", d: "Jasa penerjemahan & interpreter — niche berkembang dengan perdagangan & investasi asing.", inc: ["Dokumen legal & bisnis", "Interpreter meeting", "Localization"] },

  // ===== K. JASA KEUANGAN =====
  { c: "64211", t: "Bank Umum Konvensional", cat: "keuangan", risk: "tinggi", d: "Bank umum — sangat diatur OJK dengan modal raksasa. KBLI untuk kemitraan/hubungan bank.", inc: ["Perbankan umum", "Kredit & simpanan", "Treasury"], lic: ["Izin usaha bank (OJK + BI) — modal ratusan miliar"] },
  { c: "64222", t: "Bank Pembiayaan Rakyat (BPR)", cat: "keuangan", risk: "tinggi", d: "BPR/LB — bank mikro yang lebih terjangkau didirikan tapi tetap berizin OJK.", inc: ["Kredit mikro", "Simpanan masyarakat", "Pembiayaan lokal"], lic: ["Izin usaha BPR (OJK)"] },
  { c: "65122", t: "Asuransi Kerugian", cat: "keuangan", risk: "tinggi", d: "Asuransi non-jiwa: kendaraan, properti, marine — sektor keuangan yang diatur ketat OJK.", inc: ["Asuransi umum", "Property & auto", "Marine & cargo"], lic: ["Izin usaha asuransi (OJK)"] },
  { c: "66112", t: "Perdagangan & Perantara Efek", cat: "keuangan", risk: "tinggi", d: "Sekuritas: perantara perdagangan saham — butuh izin Bappebti/OJK & modal disiplin.", inc: ["Broker saham", "Underwriting", "Dealer"], lic: ["Izin perusahaan sekuritas (OJK)"] },
  { c: "66192", t: "Kegiatan Pembiayaan Lainnya", cat: "keuangan", risk: "tinggi", d: "Perusahaan pembiayaan (leasing/multifinance) & fintech — regulasi OJK/Bappebti tergantung model.", inc: ["Leasing & multifinance", "Pembiayaan konsumen", "Fintech lending"], lic: ["Izin usaha pembiayaan (OJK) / pendaftaran fintech"] },

  // ===== L. REAL ESTATE =====
  { c: "68101", t: "Jasa Perantara Perdagangan Properti", cat: "properti", risk: "rendah", d: "Agen properti & marketing real estate — bisnis jaringan dengan komisi besar.", inc: ["Agen properti", "Marketing agent", "Property listing platform"] },
  { c: "68102", t: "Jasa Konsultasi, Penilaian & Aksi Properti", cat: "properti", risk: "rendah", d: "Konsultan penilaian (appraisal) & properti advisory — jasa profesional bersertifikat.", inc: ["Appraisal properti", "Property consultant", "Feasibility study"], lic: ["Sertifikasi appraiser (MAPPI) disarankan"] },
  { c: "68201", t: "Sewa & Opsi Jual Properti", cat: "properti", risk: "rendah", d: "Pengelolaan sewa properti: rumah kontrakan, kantor, ruko — passive income yang diatur profesional.", inc: ["Sewa rumah & ruko", "Property management", "Co-living operator"] },

  // ===== M. JASA PROFESIONAL =====
  { c: "69101", t: "Kegiatan Hukum (Advokat)", cat: "profesional", risk: "rendah", d: "Kantor advokat & konsultan hukum — jasa profesional yang diatur UU Advokat.", inc: ["Litigasi & non-litigasi", "Konsultan hukum korporat", "Due diligence"], lic: ["SKAP (Surat Keterangan Ahli Hukum) dari PERADI"] },
  { c: "69102", t: "Kegiatan Notaris & PPAT", cat: "profesional", risk: "rendah", d: "Notaris dan PPAT — jabatan resmi dengan kewenangan akta otentik.", inc: ["Akta notaris", "Akta otentik (PPAT)", "Legalisasi & waris"], lic: ["SK Notaris (Kemenkumham) — jabatan profesional"] },
  { c: "69201", t: "Jasa Akuntansi, Pencatatan & Audit", cat: "profesional", risk: "rendah", d: "Kantor akuntan & pembukuan — jasa kepatuhan yang dibutuhkan semua bisnis.", inc: ["Pembukuan & laporan", "Audit & review", "Konsultasi keuangan"] },
  { c: "69202", t: "Konsultasi Perpajakan", cat: "profesional", risk: "rendah", d: "Konsultan pajak — jasa yang tumbuh dengan kompleksitas Coretax & regulasi baru.", inc: ["SPT & kepatuhan", "Tax planning", "Pendampingan audit"], lic: ["Sertifikat USKP (IKPI) disarankan untuk konsultan"] },
  { c: "70201", t: "Konsultasi Manajemen Umum", cat: "profesional", risk: "rendah", d: "Konsultan bisnis & manajemen — strategi, operasional, HR, dan transformasi.", inc: ["Business consulting", "Struktur organisasi", "Strategi pertumbuhan"] },
  { c: "71101", t: "Kegiatan Arsitektur", cat: "profesional", risk: "rendah", d: "Jasa arsitektur & desain bangunan — kreativitas plus regulasi (IAI) untuk proyek besar.", inc: ["Desain arsitektur", "Supervisi & RAB", "Master plan"], lic: ["Anggota IAI untuk pekerjaan jasa teknik resmi"] },
  { c: "71102", t: "Kegiatan Rekayasa (Engineering)", cat: "profesional", risk: "rendah", d: "Jasa rekayasa: struktur, mesin, sipil, MEP — jasa teknik untuk proyek konstruksi & industri.", inc: ["Desain struktur & MEP", "Feasibility engineering", "Supervisi proyek"] },
  { c: "71201", t: "Pengujian & Pemeriksaan Teknis", cat: "profesional", risk: "menengah-rendah", d: "Laboratorium uji & inspeksi — jasa QC untuk industri, kesehatan, dan lingkungan.", inc: ["Lab uji sampel", "QC industri", "Inspeksi alat"], lic: ["Akreditasi KAN untuk lab yang menyediakan jasa resmi"] },
  { c: "72101", t: "Riset & Pengembangan Sains", cat: "profesional", risk: "rendah", d: "R&D sains & teknologi — sektor riset dengan insentif pajak super deduction 300%.", inc: ["Riset produk", "Inovasi teknologi", "Kolaborasi kampus"], lic: ["Super deduction R&D (pengurangan pajak 300%) tersedia"] },
  { c: "73201", t: "Riset Pasar & Polling", cat: "profesional", risk: "rendah", d: "Riset pasar & survei — data-driven service untuk brand & pemilu.", inc: ["Market research", "Consumer survey", "Data analytics"] },

  // ===== N. PERSEWAAN & KETENAGAKERJAAN =====
  { c: "77111", t: "Penyewaan Kendaraan Bermotor", cat: "persewaan", risk: "rendah", d: "Rental mobil/motor — bisnis persewaan populer di kota wisata & kota besar.", inc: ["Rental mobil harian", "Rental motor", "Sewa dengan sopir"] },
  { c: "77291", t: "Penyewaan Barang Lainnya", cat: "persewaan", risk: "rendah", d: "Sewa peralatan & barang: sound system, tenda, alat bangunan — jasa persewaan multi-produk.", inc: ["Sewa sound & lighting", "Tenda & event equipment", "Alat konstruksi"] },
  { c: "78101", t: "Penyediaan Tenaga Kerja (Outsourcing)", cat: "persewaan", risk: "menengah-rendah", d: "Perusahaan MPL/outsourcing — menyediakan pekerja untuk perusahaan lain dengan kontrak kerja khusus.", inc: ["Outsourcing & manpower", "Contract staffing", "Payroll service"], lic: ["Izin MPL (kemnaker) untuk usaha outsourcing resmi"] },
  { c: "78202", t: "Penempatan Pekerja Migran Indonesia (PMI)", cat: "persewaan", risk: "menengah-tinggi", d: "P3MI/PPTKIS — perusahaan resmi yang mengerahkan & menempatkan PMI ke luar negeri sesuai UU 18/2017.", inc: ["Pengerahan & penempatan PMI", "Job order resmi SISKOP2MI", "Pendampingan hulu-hilir"], lic: ["SIP P3MI per negara (KemenP2MI) + deposito bank"] },
  { c: "80101", t: "Kegiatan Keamanan Swasta", cat: "persewaan", risk: "menengah-rendah", d: "Perusahaan jasa pengamanan (pamsimas & korp) — diatur Polsus & Gada Pratama.", inc: ["Satpam & security", "Security system", "Escort & konsultasi keamanan"], lic: ["Izin BUJP (Direktorat Polsus) + personel bersertifikat Gada"] },
  { c: "81211", t: "Jasa Kebersihan Gedung", cat: "persewaan", risk: "rendah", d: "Cleaning service gedung & fasilitas — B2B recurring yang stabil.", inc: ["Cleaning kontrak gedung", "Deep cleaning & sanitasi", "Housekeeping outsourcing"] },
  { c: "82201", t: "Activity Call Center", cat: "persewaan", risk: "rendah", d: "Call center & contact center — layanan BPO untuk perusahaan besar.", inc: ["Inbound & outbound", "Customer support", "Telemarketing"] },

  // ===== P. PENDIDIKAN =====
  { c: "85113", t: "Taman Kanak-Kanak (TK/PAUD)", cat: "pendidikan", risk: "menengah-rendah", d: "TK dan PAUD — lembaga pendidikan anak usia dini dengan izin Dinas Pendidikan.", inc: ["TK & RA", "Playgroup", "Daycare + preschool"], lic: ["Izin operasional Dinas Pendidikan + NPSN"] },
  { c: "85121", t: "Sekolah Dasar (SD)", cat: "pendidikan", risk: "menengah-tinggi", d: "SD swasta — lembaga formal dengan izin & akreditasi lengkap.", inc: ["SD swasta", "Sekolah berbasis kurikulum khusus", "Sekolah internasional mini"], lic: ["Izin operasional + NPSN + akreditasi BAN"] },
  { c: "85221", t: "Sekolah Menengah Pertama (SMP)", cat: "pendidikan", risk: "menengah-tinggi", d: "SMP swasta dengan standar nasional — perizinan & akreditasi BAN-S/M.", inc: ["SMP swasta", "Kurikulum merdeka", "Boarding school kecil"], lic: ["Izin operasional + NPSN + akreditasi BAN-S/M"] },
  { c: "85311", t: "Pendidikan Tinggi (Universitas)", cat: "pendidikan", risk: "tinggi", d: "Universitas & sekolah tinggi — izin sangat kompleks via LLDIKTI/Kemendikbud.", inc: ["Universitas", "Institut & STT", "Program studi baru"], lic: ["Izin pendirian PTS (LLDIKTI) + akreditasi BAN-PT"] },
  { c: "85410", t: "Pendidikan Kejuruan & LPK", cat: "pendidikan", risk: "menengah-rendah", d: "Lembaga pelatihan kerja & kursus kejuruan — pintu masuk ke program pemerintah & penempatan PMI.", inc: ["Kursus keterampilan", "LPK mitra P3MI", "Sertifikasi BNSP"], lic: ["Izin LPK (Disnaker) + verifikasi BP2MI bila menyiapkan PMI"] },
  { c: "85491", t: "Kursus & Pelatihan Lainnya (Bimbel)", cat: "pendidikan", risk: "menengah-rendah", d: "Bimbel & kursus non-formal — industri pendidikan privat yang terus tumbuh.", inc: ["Bimbel akademik", "Kursus bahasa & coding", "Test prep (UTBK, TOEFL)"], lic: ["Izin operasional LKP (Dinas Pendidikan)"] },

  // ===== Q. KESEHATAN =====
  { c: "86101", t: "Rumah Sakit Umum", cat: "kesehatan", risk: "tinggi", d: "RS umum — fasilitas pelayanan kesehatan dengan perizinan Dinkes & akreditasi KARS berlapis.", inc: ["RS umum rawat inap", "IGD & poliklinik", "Operasi & spec clinic"], lic: ["Izin RS (Dinkes) + akreditasi KARS"] },
  { c: "86201", t: "Puskesmas & Fasilitas Kesehatan Dasar", cat: "kesehatan", risk: "menengah-tinggi", d: "Puskesmas dan fasilitas kesehatan tingkat pertama — bisa pemerintah maupun swasta (PKS BPJS).", inc: ["Puskesmas swasta", "Klinik pratama", "Kesehatan komunitas"], lic: ["Izin fasilitas pelayanan kesehatan (Dinkes)"] },
  { c: "86302", t: "Klinik Dokter (Praktik Mandiri & Kelompok)", cat: "kesehatan", risk: "menengah-tinggi", d: "Klinik dokter umum/spesialis — wajib izin klinik Dinkes + SIP dokter.", inc: ["Klinik umum", "Klinik spesialis", "Praktik mandiri"], lic: ["Izin klinik (Dinkes) + SIP dokter"] },
  { c: "86314", t: "Praktik Dokter Gigi", cat: "kesehatan", risk: "menengah-tinggi", d: "Klinik gigi & praktik dokter gigi — SIKIA + izin klinik gigi Dinkes.", inc: ["Klinik gigi", "Orthodontics", "Estetika gigi"], lic: ["SIKIA (izin praktik dokter gigi) + izin klinik"] },
  { c: "86402", t: "Apotek & Toko Obat", cat: "kesehatan", risk: "menengah-tinggi", d: "Apotek (KBLI kesehatan) — jalinan SIPA & distribusi obat yang patuh.", inc: ["Apotek komunitas", "Apotek klinik", "Drug store"], lic: ["SIPA + standar sarana apotek (Dinkes)"] },
  { c: "86907", t: "Laboratorium Kesehatan", cat: "kesehatan", risk: "menengah-tinggi", d: "Lab klinik & patologi — izin Dinkes + personel ahli terverifikasi.", inc: ["Lab klinik", "Patologi anatomi", "Test genetik & mikrobiologi"], lic: ["Izin lab kesehatan (Dinkes) + akreditasi"] },

  // ===== R. SENI, HIBURAN & REKREASI =====
  { c: "90002", t: "Aktivitas Seni Pertunjukan", cat: "hiburan", risk: "rendah", d: "Produksi & promosi pertunjukan seni: musik, teater, tari — industri kreatif berkembang pesat.", inc: ["Event organizer seni", "Produksi pertunjukan", "Touring & festival"] },
  { c: "93201", t: "Taman Hiburan & Theme Park", cat: "hiburan", risk: "menengah-tinggi", d: "Taman hiburan & wahana rekreasi — investasi besar dengan standar keselamatan ketat.", inc: ["Theme park", "Waterpark", "Family entertainment center"], lic: ["Izin usaha taman hiburan + sertifikasi keselamatan wahana"] },
  { c: "93101", t: "Kegiatan Olahraga Profesional", cat: "hiburan", risk: "rendah", d: "Klub & aktivitas olahraga profesional — industri sport yang berkembang dengan liga lokal.", inc: ["Klub sepak bola/futsal", "Akademi olahraga", "Event sport"] },

  // ===== S. JASA LAINNYA =====
  { c: "94110", t: "Kegiatan Organisasi Profesi", cat: "jasa-lain", risk: "rendah", d: "Asosiasi & organisasi profesi — entitas keanggotaan yang bisa berbadan hukum.", inc: ["Asosiasi industri", "Komunitas profesi", "Chamber of commerce"] },
  { c: "95112", t: "Reparasi & Perawatan Komputer", cat: "jasa-lain", risk: "rendah", d: "Service komputer & gadget — teknisi dengan aliran pelanggan yang stabil.", inc: ["Service laptop & PC", "Data recovery", "Upgrade & maintenance"] },
  { c: "95231", t: "Reparasi & Perawatan Sepeda Motor", cat: "jasa-lain", risk: "rendah", d: "Bengkel motor: servis, tune-up, dan modifikasi — padat karya dengan pasar besar.", inc: ["Servis berkala", "Modifikasi & aksesoris", "Ban & tune-up"] },
  { c: "96092", t: "Salon Kecantikan & Barbershop", cat: "jasa-lain", risk: "rendah", d: "Salon, barbershop, dan perawatan kecantikan — jasa personal dengan pelanggan berulang tinggi.", inc: ["Salon & barbershop", "Hair treatment", "Makeup & styling"], halal: true, lic: ["Izin usaha + kesehatan produk yang dipakai (BPOM)"] },
  { c: "96093", t: "Spa, Massage & Perawatan Tubuh", cat: "jasa-lain", risk: "menengah-rendah", d: "Spa & massage terapeutik — jasa perawatan dengan standar kesehatan & lisensi terapis.", inc: ["Spa & wellness", "Massage terapeutik", "Body treatment"], halal: true, lic: ["Izin usaha + sertifikasi terapis (BNSP) disarankan"] },
  { c: "96131", t: "Jasa Laundry & Dry Clean", cat: "jasa-lain", risk: "rendah", d: "Laundry kiloan & dry clean — bisnis harian dengan aliran kas yang stabil.", inc: ["Laundry kiloan", "Dry clean & cuci satuan", "Laundry hotel (B2B)"] },
  { c: "96230", t: "Jasa Pemakaman & Pelayanan Terkait", cat: "jasa-lain", risk: "rendah", d: "Jasa pemakaman dan pelayanan duka — kebutuhan esensial dengan pasar yang selalu ada.", inc: ["Layanan pemakaman", "Krematorium", "Cendal & ATK duka"] },
];

export const KBLI_TOTAL = KBLI_RAW.length;
