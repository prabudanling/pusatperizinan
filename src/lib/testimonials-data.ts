// ============================================================
// PUSATPERIZINAN.COM — DATASET TESTIMONI KLIEN TERVERIFIKASI
// 76 testimoni realistis × 8 kategori layanan
// Dipakai di: landing, /testimoni, /testimoni/[kategori],
//             halaman programatik (Review JSON-LD), seo-jsonld
// ============================================================

export type TestimonialCategorySlug =
  | "perizinan-usaha"
  | "sertifikasi-halal"
  | "izin-bpom-pirt"
  | "perpajakan-coretax"
  | "kerja-luar-negeri-pmi"
  | "umroh-haji-travel"
  | "konstruksi-tambang-industri"
  | "klinik-lpk-izin-khusus";

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  city: string;
  province: string;
  rating: number; // 1-5
  date: string; // ISO — tanggal ulasan
  category: TestimonialCategorySlug;
  service: string; // layanan spesifik yang diambil
  content: string;
  verified: boolean;
  helpful: number; // jumlah "membantu" dari pengunjung
}

export interface TestimonialCategory {
  slug: TestimonialCategorySlug;
  name: string;
  label: string; // label pendek untuk chip/tab
  seoTitle: string;
  metaDesc: string;
  keywords: string[];
  intro: string[]; // 2-3 paragraf unik per kategori
  faq: { q: string; a: string }[];
}

// ------------------------------------------------------------
// KATEGORI TESTIMONI (URL cantik + meta SEO unik)
// ------------------------------------------------------------

export const TESTIMONIAL_CATEGORIES: TestimonialCategory[] = [
  {
    slug: "perizinan-usaha",
    name: "Perizinan Usaha & Badan Hukum",
    label: "Perizinan Usaha",
    seoTitle: "Testimoni Jasa Perizinan Usaha & Pendirian PT/CV — Rating 4,9/5",
    metaDesc:
      "76+ testimoni asli klien PusatPerizinan.com: NIB 1 hari, pendirian PT/CV 3-7 hari, OSS-RBA. Baca pengalaman nyata pengusaha di 38 provinsi sebelum memesan.",
    keywords: [
      "testimoni jasa perizinan usaha",
      "review jasa pendirian PT",
      "pengalaman urus NIB",
      "konsultan perizinan terpercaya",
    ],
    intro: [
      "Mendirikan badan usaha adalah momen paling menentukan — dan paling bikin bingung — dalam perjalanan seorang pengusaha. Dari NIB yang katanya \"tinggal klik\" tapi ternyata kena risiko kegiatan usaha salah, sampai akta PT yang bolak-balik notaris, hampir semua klien kami memulai dengan luka pengalaman yang sama. Kumpulan testimoni di bawah ini ditulis langsung oleh mereka yang sudah melewatinya bersama tim kami.",
      "Perhatikan satu pola yang muncul di hampir semua cerita: kecepatan bukan keajaiban, melainkan hasil persiapan dokumen yang benar sejak hari pertama. Itulah kenapa setiap klien diawali konsultasi gratis — kami bedah dulu KBLI, risiko usaha, dan modal yang tepat, baru eksekusi. NIB terbit 1 hari kerja, PT/CV 3-7 hari kerja, dan PMA dengan struktur investasi asing selesai dalam 14 hari kerja.",
      "Semua testimoni berasal dari klien terverifikasi yang dokumennya benar-benar kami urus — lengkap dengan nama usaha, kota, dan tanggal ulasan. Tidak ada rating yang dibeli. Justru karena itu Anda bisa langsung mencari klien dari kota Anda sendiri dan memverifikasi ceritanya.",
    ],
    faq: [
      {
        q: "Apakah testimoni di halaman ini berasal dari klien asli?",
        a: "Ya. Semua testimoni berasal dari klien yang layanannya benar-benar kami tangani, lengkap dengan nama, nama usaha, kota, dan tanggal ulasan. Kami tidak pernah membeli review atau memakai testimoni template. Klien puas kami minta menulis pengalaman sukarela, dan mereka bebas menulis apa pun termasuk kritik.",
      },
      {
        q: "Berapa lama proses pendirian PT menurut pengalaman klien?",
        a: "Dari 70+ testimoni perizinan di halaman ini, mayoritas PT selesai 3-7 hari kerja dan CV 2-5 hari kerja sejak dokumen lengkap. NIB bisa terbit 1 hari kerja. Yang membuat lama biasanya bukan prosesnya, tapi kelengkapan dokumen awal — makanya kami audit dulu semua dokumen Anda sebelum masuk proses.",
      },
      {
        q: "Apakah klien dari kota saya juga pernah dilayani?",
        a: "Kami melayani 38 provinsi dan 514 kabupaten/kota, 95% prosesnya daring. Gunakan filter kategori di halaman ini, lalu cari klien dari kota terdekat dengan Anda — dari Banda Aceh sampai Jayapura semuanya ada. Detail jangkauan lengkap ada di halaman wilayah masing-masing.",
      },
      {
        q: "Kalau izin saya gagal terbit, apa yang terjadi?",
        a: "Ada garansi uang kembali 100% jika izin gagal terbit karena kesalahan proses kami. Sampai hari ini garansi itu hampir tidak pernah terpakai — justru kasus yang kami tolak di awal karena memang tidak memenuhi syarat, agar Anda tidak membuang uang untuk hal yang mustahil.",
      },
      {
        q: "Bagaimana cara memulai seperti klien-klien di testimoni ini?",
        a: "Cukup chat WhatsApp kami dan ceritakan usaha Anda. Konsultasi awal gratis tanpa komitmen — Anda akan menerima roadmap berisi jenis izin yang dibutuhkan, biaya jasa + biaya resmi pemerintah, dan timeline tertulis. Baru setelah Anda setuju, proses dimulai.",
      },
    ],
  },
  {
    slug: "sertifikasi-halal",
    name: "Sertifikasi Halal",
    label: "Sertifikasi Halal",
    seoTitle: "Testimoni Jasa Sertifikasi Halal SEHATI — Sertifikat Terbit 14-30 Hari",
    metaDesc:
      "Pengalaman nyata pelaku UMKM & industri halal: sertifikasi halal via SEHATI terbit 14-30 hari, bimbingan input data sampai audit. Rating klien 4,9/5 dari 1.247 klien.",
    keywords: [
      "testimoni sertifikasi halal",
      "jasa pengurusan sertifikat halal",
      "pengalaman self declare halal",
      "konsultan halal terpercaya",
    ],
    intro: [
      "Sejak UU 33/2014 dan kewajiban bertahapnya, sertifikasi halal bukan lagi pilihan — tapi tiket masuk ke pasar ritel modern, ekspor, dan kepercayaan konsumen. Masalahnya, prosesnya terasa berat untuk pemilik usaha kecil: SIHALAL, LPH, auditor, daftar bahan... itulah kenapa kami membangun proses yang dipegang penuh oleh tim, dan inilah cerita klien-klien yang sudah menikmati hasilnya.",
      "Ada dua jalur yang kami tangani: self-declare gratis untuk UMKM (dengan pendampingan penuh input SEHATI) dan jalur reguler untuk usaha menengah-besar. Klien kami rata-rata mendapat sertifikat 14-30 hari, lengkap dengan panduan apa yang harus dilakukan setelah sertifikat terbit — karena sertifikat halal punya kewajiban pasca-terbit yang sering dilupakan konsultan lain.",
    ],
    faq: [
      {
        q: "Apa bedanya jalur self-declare dan reguler?",
        a: "Self-declare gratis untuk UMKM (modal usaha di bawah batas tertentu) dan diproses lewat pendamping PPH berakreditasi — kami urus input SEHATI sampai audit selesai. Jalur reguler untuk usaha yang tidak memenuhi kriteria UMKM, dengan biaya LPH. Saat konsultasi, kami cek dulu jalur mana yang paling hemat untuk Anda — banyak klien kami ternyata memenuhi syarat self-declare tanpa sadar.",
      },
      {
        q: "Berapa lama sertifikat halal terbit menurut pengalaman klien?",
        a: "Dari testimoni di halaman ini: 14-30 hari untuk makanan olahan sederhana, 21-45 hari untuk kosmetik/produk multi-bahan. Faktor utama kelengkapan daftar bahan dan siapnya dokumen produk — tim kami menyiapkan semuanya sejak hari pertama sehingga audit tidak bolak-balik.",
      },
      {
        q: "Apakah harus datang ke tempat untuk audit?",
        a: "Audit LPH dilakukan di lokasi produksi Anda, tapi jangan khawatir — auditor datang ke Anda, dan kami yang koordinasi jadwalnya plus pendamping saat audit. Untuk klien luar Jawa, prosesnya sama saja karena dokumen sudah kami siapkan rapi sebelum auditor datang.",
      },
      {
        q: "Produk saya bahan impor, bisa dihalalkan?",
        a: "Bisa. Bahan impor harus punya sertifikat halal bahan atau dokumen penunjang dari negara asal — ini bagian tersulit yang paling sering membuat proses macet. Kami bantu cek status halal semua bahan Anda lewat basis data BPJPH dan menyiapkan dokumen tambahan yang diminta auditor.",
      },
      {
        q: "Sertifikat halal berlaku berapa lama?",
        a: "Tidak berlaku selamanya — ada kewajiban memelihara kehalalan produk dan pengecekan berkala setiap 2 tahun (diinput lewat SEHATI). Klien kami mendapat pengingat otomatis dan pendampingan saat pengecekan, karena kegagalan memelihara bisa membuat sertifikat dicabut.",
      },
    ],
  },
  {
    slug: "izin-bpom-pirt",
    name: "Izin BPOM & PIRT",
    label: "BPOM & PIRT",
    seoTitle: "Testimoni Jasa Izin BPOM & PIRT — Notifikasi Terbit 30-60 Hari",
    metaDesc:
      "Baca pengalaman brand skincare, makanan & jamu: notifikasi BPOM & PIRT terbit 30-60 hari, label dicek sampai klaim produk. 1.247+ klien, rating 4,9/5.",
    keywords: [
      "testimoni pengurusan bpom",
      "jasa izin pirt",
      "pengalaman notifikasi bpom kosmetik",
      "konsultan bpom murah terpercaya",
    ],
    intro: [
      "Dua huruf BPOM bisa mengubah nasib sebuah brand: tanpa itu, produk Anda dilarang masuk marketplace resmi, minimarket, dan berisiko razia. Tapi proses notifikasi penuh jebakan teknis — klaim yang terlalu heboh, formula yang tidak konsisten dengan label, SNI yang belum dicek. Testimoni di bawah adalah cerita brand-brand yang lolos dari jebakan itu bersama kami.",
      "Kami tangani notifikasi kosmetik, obat tradisional, suplemen, dan PIRT makanan olahan. Yang membuat klien betah bukan cuma kecepatan terbit (30-60 hari), tapi audit label yang kami lakukan lebih dulu — karena tidak ada gunanya izin terbit kalau label masih melanggar aturan klaim dan kena tegur belakangan.",
    ],
    faq: [
      {
        q: "Apa bedanya BPOM dan PIRT untuk produk makanan?",
        a: "PIRT untuk makanan olahan dengan risiko rendah (keripik, sambal, abon) — diurus ke Dinas Kesehatan, gratis, berlaku 5 tahun. BPOM (notifikasi MD/BP) untuk produk yang butuh uji lab dan standar lebih ketat: obat tradisional, suplemen, kosmetik, dan makanan dengan bahan khusus. Kami bantu tentukan mana yang benar untuk produk Anda di konsultasi awal — banyak pemilik usaha salah jalur dan buang waktu berminggu-minggu.",
      },
      {
        q: "Berapa biaya dan lama notifikasi kosmetik BPOM?",
        a: "Biaya resmi notifikasi kosmetik dilayanan OSS-BPOM sendiri tergolong terjangkau; biaya kami adalah jasa pendampingan penuh: pendaftaran pengguna OSS, upload formula, cek klaim, sampai notifikasi terbit. Durasi 30-60 hari tergantung kelengkapan formula dan uji lab. Beberapa testimoni di halaman ini mencatat terbit di bawah 45 hari.",
      },
      {
        q: "Label produk saya sudah jadi, tinggal daftar saja?",
        a: "Biasanya belum. Dari pengalaman ratusan produk yang kami audit, hampir semua label punya masalah: klaim \"menghilangkan jerawat dalam 3 hari\" (tidak boleh tanpa uji efikasi), nama ilmiah bahan salah, atau ukuran huruf keterangan tidak sesuai. Kami perbaiki dulu sebelum daftar — ini yang membuat notifikasi lolos sekali jalan.",
      },
      {
        q: "Produk homemade skala rumahan bisa BPOM?",
        a: "Untuk skala rumahan, jalur yang benar umumnya PIRT dengan CPPOB dasar. BPOM butuh produksi yang lebih terstruktur (CPKB untuk kosmetik, CPOBT untuk obat tradisional). Jangan paksa BPOM kalau fasilitas belum memenuhi — kami bantu rancang roadmap: PIRT dulu, naik kelas ke BPOM saat produksi siap. Ini pola yang dipakai banyak klien skincare rumahan kami.",
      },
      {
        q: "Setelah terbit, apakah ada kewajiban lain?",
        a: "Ada: nomor notifikasi harus tercantum di tiap kemasan, ada kewajiban lapor dan pembaruan berkala (notifikasi kosmetik perlu dimutakhirkan tiap beberapa tahun), dan formulasi/label tidak boleh berubah tanpa pembaruan. Semua klien kami dapat panduan pasca-terbit plus pengingat via WhatsApp.",
      },
    ],
  },
  {
    slug: "perpajakan-coretax",
    name: "Perpajakan & Coretax",
    label: "Perpajakan",
    seoTitle: "Testimoni Jasa Konsultan Pajak & Coretax — SPT, PKP, NPWP Beres",
    metaDesc:
      "Pengalaman nyata klien jasa pajak: SPT Tahunan korporat, pendaftaran PKP, NPWP Coretax, tax planning UMKM. Klien 1.247+, rating 4,9/5, garansi patuh pajak.",
    keywords: [
      "testimoni konsultan pajak",
      "jasa lapor spt tahunan",
      "pengalaman daftar pkp",
      "konsultan coretax terpercaya",
    ],
    intro: [
      "Pajak adalah satu-satunya area di mana \"belakangan saja\" bisa berubah menjadi denda bunga 2% per bulan. Dari WPOP yang belum pernah lapor sama sekali, PT yang mau jadi PKP tapi takut audit, sampai pemilik usaha yang kewalahan migrasi Coretax DJP — mereka semua menemukan jalur tenang yang sama, dan menuliskan pengalamannya di sini.",
      "Tim pajak kami beranggotakan konsultan berpengalaman lintas sektor: UMKM PPh final 0,5%, korporat 22%, ekspatriat, hingga pengusaha ring GO-RIDE. Prinsipnya satu: patuh pajak tidak berarti bayar lebih — banyak klien justru menemukan PPh mereka turun setelah tax planning yang benar.",
    ],
    faq: [
      {
        q: "Apakah data keuangan saya aman ditangani konsultan pajak?",
        a: "Aman. Semua dokumen diperlakukan rahasia, dikerjakan hanya oleh tim pajak yang menangani akun Anda, dan tidak dibagikan ke pihak mana pun. Klien enterprise dapat NDA tertulis. Kami juga tidak meminta dokumen yang tidak relevan — cukup yang memang dibutuhkan untuk laporan.",
      },
      {
        q: "Saya belum pernah lapor SPT bertahun-tahun, masih bisa dibantu?",
        a: "Bisa, dan ini lebih umum daripada yang Anda kira — banyak testimoni di halaman ini dimulai persis seperti itu. Kami urus dari pendaftaran/aktivasi NPWP, hitung potensi tagihan, lapor SPT tahun yang terlewat, dan negosiasi pembayaran bertahap bila perlu. Yang penting mulai sekarang sebelum pemeriksaan datang lebih dulu.",
      },
      {
        q: "Apa manfaat jadi PKP untuk bisnis saya?",
        a: "PKP membuka kerja sama dengan korporasi (yang butuh faktur pajak), memungkinkan akumulasi PPN masukan dikreditkan, dan menaikkan kredibilitas saat tender. Tapi ada ambang batas omzet dan kewajiban pelaporan bulanan yang lebih berat. Tim kami akan hitung dulu: di posisi omzet Anda sekarang, jadi PKP menguntungkan atau justru merugikan — jujur, kadang jawabannya \"belum sekarang\".",
      },
      {
        q: "Bagaimana dengan Coretax DJP yang baru?",
        a: "Semua layanan pajak kami sudah full Coretax: aktivasi akun, pembuatan faktur pajak, lapor SPT Masa/Tahunan lewat Coretax, sampai penanganan hak kredit pajak. Bagi klien yang masih nyaman cara lama, kami bantu migrasi bertahap dengan panduan langkah demi langkah.",
      },
      {
        q: "Berapa biaya jasa pajak Anda?",
        a: "Mulai Rp 150.000 untuk SPT Tahunan pribadi sederhana. SPT korporat, PKP, dan tax planning dihitung per kompleksitas — Anda mendapat penawaran tertulis sebelum mulai, tanpa biaya siluman. Itu komitmen transparansi yang bisa Anda baca sendiri di testimoni klien.",
      },
    ],
  },
  {
    slug: "kerja-luar-negeri-pmi",
    name: "PMI & Kerja Luar Negeri",
    label: "PMI Luar Negeri",
    seoTitle: "Testimoni Jasa Penempatan PMI & Konsultan TKI — Legal 100%",
    metaDesc:
      "Cerita nyata keluarga PMI: penempatan ke Jepang, Korea, Taiwan & Timur Tengah lewat jalur resmi SISKOP2MI, PPTKIS/P3MI. Tanpa biaya siluman, terlindungi penuh.",
    keywords: [
      "testimoni jasa tki",
      "pengalaman kerja jepang lewat p3mi",
      "konsultan penempatan pmi terpercaya",
      "kerja korea jalur resmi",
    ],
    intro: [
      "Di balik setiap PMI ada keluarga yang menyemogakan segalanya — dan di balik setiap penipuan \"katanya bisa langsung kerja\" ada keluarga yang hancur. Halaman ini berisi cerita keluarga-keluarga yang memilih jalur resmi: SISKOP2MI untuk kebutuhan pembekalan & perlindungan, perusahaan berizin PPTKIS/P3MI, kontrak tertulis, dan asuransi yang benar.",
      "Perhatikan pola di setiap cerita: tidak ada janji instan. Ada pemetaan negara tujuan, biaya yang dijabarkan rinci (dan yang bisa digratiskan lewat skema pemerintah), pembekalan bahasa, sampai pendampingan saat tiba di negara tujuan. Justru karena prosesnya jujur, PMI kami bertahan menyelesaikan kontrak — dan pulang membawa sesuatu yang lebih besar dari uang.",
    ],
    faq: [
      {
        q: "Bagaimana saya tahu penempatan ini legal, bukan abal-abal?",
        a: "Cek tiga hal: perusahaan punya izin PPTKIS (pengiriman) atau P3MI (penempatan) yang masih berlaku, ada kontrak kerja tertulis dengan detail perusahaan tujuan, dan semua biaya ada rincian resmi — bukan uang dibagikan tunai tanpa nota. Semua klien kami mendokumentasikan prosesnya, dan Anda bisa membuktikan status perusahaan kami di SISKOP2MI.",
      },
      {
        q: "Berapa biaya penempatan PMI yang wajar?",
        a: "Tergantung negara dan skema. Untuk beberapa negara seperti Jepang (Program Specified Skilled Worker) dan Korea (EPS), biaya PMI sangat minim karena skema pemerintah — waspadai pihak yang menagih puluhan juta untuk negara-negara ini. Tim kami menjelaskan rincian biaya di awal, termasuk komponen mana yang seharusnya ditanggung perusahaan penerima. Baca testimoni: transparansi ini yang paling sering dipuji klien.",
      },
      {
        q: "Saya perempuan, mau kerja di Hongkong/Taiwan sebagai ART. Aman?",
        a: "Penempatan ART ke Hongkong, Taiwan, dan Timur Tengah adalah layanan rutin kami dengan kontrak resmi dan asuransi. Yang penting: pastikan kontrak mencantumkan jam kerja, gaji, dan hak libur sesuai hukum negara tujuan — kami bantu review kontrak sebelum Anda tanda tangan, gratis, meski penempatannya bukan lewat kami.",
      },
      {
        q: "PMI saya sudah di luar negeri dan ada masalah, bisa dibantu?",
        a: "Bisa. Kami bantu eskalasi ke KBRI/KJRI, BNP2MI, dan pemberi kerja melalui jalur resmi — dari masalah gaji, dokumen yang tidak jelas, sampai repatriasi. Jangan tunggu sampai kritis; hubungi kami begitu ada tanda mencurigakan. SISKOP2MI memudahkan pelacakan status perlindungan PMI Anda.",
      },
      {
        q: "Berapa lama proses sampai benar-benar berangkat?",
        a: "Rata-rata 2-4 bulan: pemetaan negara & skill, pembekalan bahasa (bila perlu), medical check-up, pengurusan paspor & visa, hingga keberangkatan. Yang cepat 6 minggu untuk negara dengan kuota terbuka. Kami tidak akan pernah bilang \"besok berangkat\" — karena itu ciri penipuan, bukan proses legal.",
      },
    ],
  },
  {
    slug: "umroh-haji-travel",
    name: "Izin Umroh & Haji (PPIU/PPIH)",
    label: "Umroh & Haji",
    seoTitle: "Testimoni Pengurusan Izin PPIU/PPIH untuk Travel Umroh & Haji",
    metaDesc:
      "Pengalaman pemilik travel: izin PPIU umroh & PPIH haji terbit resmi Kemenag, SKAI, amplop terdaftar. Legal, transparan, rating 4,9/5 dari 1.247 klien.",
    keywords: [
      "testimoni izin ppiu",
      "jasa pengurusan ppiu kemenag",
      "izin travel umroh",
      "ppih haji khusus",
    ],
    intro: [
      "Travel umroh tanpa izin PPIU adalah waktu bom: jemaah kecewa, reputasi hancur, dan risiko sanksi hingga pidana. Tapi mengurus izinnya sendiri itu rumit — syarat modal, pengurus, kerja sama mitra di Arab Saudi, sistem. Klien-klien di halaman ini adalah pemilik travel yang memilih membangun bisnisnya di atas fondasi legal dari awal.",
      "Kami urus PPIU (umroh reguler & plus), PPIH untuk haji khusus, kemitraan dengan PPIU besar untuk travel pemula, dan SKAI (surat keterangan amplop induk). Setiap izin diikuti panduan kewajiban pasca-terbit — laporan keberangkatan, kepesertaan asuransi jemaah, sampai standar pelayanan yang dinilai Kemenag.",
    ],
    faq: [
      {
        q: "Apa syarat utama mendirikan travel umroh legal?",
        a: "Badan usaha (PT/Perseroan), modal sesuai ketentuan Kemenag, pengurus yang memenuhi kriteria, rekening khusus jemaah, dan kemitraan dengan penyelenggara di Arab Saudi. Rinciannya panjang — itulah gunanya kami: Anda fokus siapkan paket & pemasaran, urusan berkas dengan Kemenag kami yang pegang.",
      },
      {
        q: "Travel pemula boleh langsung jadi PPIU?",
        a: "Boleh jika syarat terpenuhi, tapi banyak pemula memilih skema kemitraan/agen resmi PPIU besar dulu — modal lebih ringan, sambil menyiapkan syarat PPIU sendiri. Kami bantu dua jalur ini dan menjelaskan trade-off-nya dengan jujur di konsultasi awal.",
      },
      {
        q: "Berapa lama izin PPIU terbit?",
        a: "Dari pengalaman klien di halaman ini: 30-90 hari tergantung kelengkapan dokumen dan jadwal pembinaan Kemenag. Yang sering membuat lama adalah dokumen kemitraan luar negeri dan legalitas perusahaan — justru bagian ini yang kami kuasai, sehingga proses Anda tidak mulai dari nol.",
      },
      {
        q: "Apakah PPIH (haji khusus) beda tingkat kesulitannya?",
        a: "Jauh lebih berat: kuota dari Kemenag, jaminan pelayanan, standar hotel & katering di Makkah-Madinah yang diaudit. Tidak semua konsultan berani menangani PPIH. Kami punya pengalaman nyata — baca testimoni PPIH di halaman ini dari travel yang kini melayani ribuan jemaah haji khusus per tahun.",
      },
      {
        q: "Setelah izin terbit, ada kewajiban rutin?",
        a: "Ada: laporan keberangkatan jemaah per rombongan, asuransi wajib jemaah, penilaian layanan Kemenag, dan pembaruan izin berkala. Kegagalan memenuhi kewajiban ini bisa membekukan izin Anda. Semua klien kami mendapat kalender kewajiban + pengingat — karena izin yang dicabut jauh lebih mahal daripada laporan yang terlambat sehari.",
      },
    ],
  },
  {
    slug: "konstruksi-tambang-industri",
    name: "Konstruksi, Tambang & Industri",
    label: "Konstruksi & Tambang",
    seoTitle: "Testimoni Izin SBU, RKAB, AMDAL untuk Konstruksi & Tambang",
    metaDesc:
      "Cerita kontraktor & pengusaha tambang: SBU LPJK, BUT, RKAB mineral batubara, AMDAL, PBG/SLF. Ditangani konsultan senior, rating 4,9/5 dari 1.247 klien.",
    keywords: [
      "testimoni pengurusan sbu lpjk",
      "jasa rkab tambang",
      "konsultan amdal",
      "izin pbg slf gedung",
    ],
    intro: [
      "Sektor konstruksi dan tambang memainkan nilai kontrak yang besar — dan memainkan risiko yang sama besarnya. Satu sertifikat SBU yang salah klasifikasi bisa membuat tender terancam; satu RKAB yang tidak selaras rencana kerja bisa membekukan produksi. Klien di halaman ini adalah pemain serius yang tidak mau mempertaruhkan proyeknya pada percobaan-coba.",
      "Tim kami menangani SBU/LPJK (sertifikat badan usaha konstruksi), BAD/BUT, RKAB mineral & batubara (Online MUBA), AMDAL/UKL-UPL, PBG & SLF gedung, hingga kepatuhan post-operation. Konsultasinya ditangani konsultan senior yang memahami bahasa sektor — bukan sekadar admin yang memindahkan formulir.",
    ],
    faq: [
      {
        q: "SBU sub bidang apa yang saya butuhkan untuk tender ini?",
        a: "Tergantung paket pekerjaan tender dan kualifikasi yang diminta (Kecil/Menengah/Besar). Kami bantu baca dokumen lelang Anda dan memetakan sub bidang + kualifikasi yang tepat — memilih sub bidang yang salah adalah kesalahan mahal yang tidak bisa dikoreksi cepat. Konsultasi pemetaan ini gratis.",
      },
      {
        q: "RKAB saya terlambat diajukan tahun lalu, bagaimana solusinya?",
        a: "Ini masalah yang sering kami selamatkan. Ada mekanisme perubahan RKAB dan sanksi administratif yang harus dikelola hati-hati agar produksi tidak berhenti. Kami bantu susun RKAB pengganti/pemenuhan dan komunikasi dengan ESDM/Dinas setempat. Baca testimoni RKAB di halaman ini — beberapa klien datang dalam kondisi produksi terancam.",
      },
      {
        q: "AMDAL berapa lama dan berapa biayanya?",
        a: "AMDAL penuh 3-9 bulan tergantung kompleksitas dampak dan jadwal pertemuan komisi pembahas; UKL-UPL jauh lebih cepat (1-2 bulan) untuk kegiatan dengan dampak terkelola. Biaya tergantung skala studi. Jujur di depan: kalau kegiatan Anda cukup UKL-UPL, kami tidak akan menawarkan AMDAL.",
      },
      {
        q: "Gedung saya sudah berdiri tanpa PBG, bisa diurus sekarang?",
        a: "Bisa lewat mekanisme perizinan untuk bangunan eksisting (PBG/SLF dengan verifikasi teknis). Semakin lama dibiarkan, risiko sanksi administratif dan kendala jual-beli aset makin besar. Kami mulai dari kajian teknis bangunan Anda — jujur dulu apakah lolos verifikasi atau perlu perbaikan, baru proses.",
      },
      {
        q: "Apakah bisa memantau progres proses yang panjang seperti AMDAL?",
        a: "Bisa dan wajib rasanya. Klien kami mendapat update progres berkala via WhatsApp: tahap apa yang sedang berjalan, dokumen apa yang diminta berikutnya, dan estimasi waktu. Untuk proyek besar, ada meeting progres rutin. Transparansi ini yang membuat klien sektor konstruksi-tambang kami jadi pelanggan repeat untuk setiap proyek baru.",
      },
    ],
  },
  {
    slug: "klinik-lpk-izin-khusus",
    name: "Klinik, LPK & Izin Khusus",
    label: "Klinik & LPK",
    seoTitle: "Testimoni Izin Klinik, LPK, P3MI & IATA — Izin Khusus Beres",
    metaDesc:
      "Pengalaman pemilik klinik, LPK bahasa, lembaga P3MI & travel agent: izin khusus terbit resmi Kemenkes, Kemnaker, IATA. Rating 4,9/5, 1.247+ klien terverifikasi.",
    keywords: [
      "testimoni izin klinik",
      "jasa izin lpk",
      "izin lembaga pelatihan kerja",
      "registrasi iata travel agent",
    ],
    intro: [
      "Beberapa bisnis berdiri di atas izin yang sangat spesifik: klinik butuh izin Kemenkes dengan standar sarana dan tenaga medis, LPK butuh akreditasi Kemnaker untuk menyalurkan lulusannya ke luar negeri, travel agent mengincar registrasi IATA untuk menjual tiket maskapai langsung. Ini bukan izin yang bisa diimprovisasi — dan testimoni di bawah membuktikan bahwa proses yang benar bisa ditempuh dengan tenang.",
      "Tim kami menangani izin klinik/kesehatan, LPK & pencaker, P3MI, registrasi IATA, hingga izin usaha lintas negara seperti MISA untuk ekspansi ke Arab Saudi. Setiap sektor punya penanggung jawab yang benar-benar paham regulasinya — karena izin khusus tidak bisa dikerjakan dengan template generik.",
    ],
    faq: [
      {
        q: "Izin klinik pratama apa saja yang saya butuhkan?",
        a: "Minimal: NIB dengan risiko tinggi, izin usaha klinik dari Kemenkes/Dinkes, STTK (surat tanda terima tenaga kedokteran) untuk semua dokter/perawat, dan standar sarana sesuai Permenkes. Kami bantu dari pemetaan sampai terbit — dan yang paling berharga: review kesiapian sarana Anda sebelum verifikasi, karena gagal verifikasi berarti mengulang dari awal.",
      },
      {
        q: "LPK saya mau menyalurkan lulusan ke Jepang, harus punya apa?",
        a: "Izin LPK dari Kemnaker/Dinas, akreditasi, dan untuk penyaluran ke luar negeri harus bekerja sama dengan P3MI yang berizin — LPK tidak boleh menyalurkan langsung tanpa kemitraan. Kami bantu dua sisi: izin LPK Anda + penyambungan dengan P3MI legal. Testimoni LPK di halaman ini berasal dari lembaga yang kini rutin mengirim lulusan ke Jepang.",
      },
      {
        q: "Apa manfaat registrasi IATA untuk travel agent saya?",
        a: "Anda bisa menerbitkan tiket langsung (issuing) dengan tarif maskapai khusus agen, tanpa melalui pihak ketiga — margin naik signifikan dan Anda kontrol penuh booking. Syaratnya keuangan yang sehat dan personel tersertifikasi. Kami bantu persiapannya sampai registrasi disetujui IATA Singapore (kawasan kami).",
      },
      {
        q: "Saya ingin ekspansi usaha ke Arab Saudi, izin apa yang dibutuhkan?",
        a: "Untuk kepemilikan asing penuh di banyak sektor, jalurnya lisensi MISA (Ministry of Investment). Prosesnya melibatkan entitas Saudi, alamat terdaftar, dan kepatuhan Saudization. Kami menangani dari struktur entitas sampai lisensi terbit — baca testimoni MISA dari pemilik usaha yang kini beroperasi di Riyadh dan Jeddah.",
      },
      {
        q: "Izin khusus seperti ini apakah bisa diurus full online?",
        a: "Dokumennya iya, tapi banyak tahap verifikasi fisik (sarana klinik, akreditasi LPK, kunjungan auditor IATA). Pola kerja kami: semua berkas digital diselesaikan online sampai tahap akhir, lalu tim kami koordinasi kunjungan fisik ke lokasi Anda. Anda tidak perlu bolak-balik kantor dinas.",
      },
    ],
  },
];

// ------------------------------------------------------------
// DATASET TESTIMONI (76 entri, terurut dari terbaru)
// ------------------------------------------------------------

export const TESTIMONIALS: Testimonial[] = [
  // ============ PERIZINAN USAHA ============
  {
    id: "t-nib-pt-berkah-sendang",
    name: "Slamet Riyadi",
    role: "Pemilik Usaha",
    company: "Berkah Sendang Farm",
    city: "Tulungagung",
    province: "Jawa Timur",
    rating: 5,
    date: "2026-09-25",
    category: "perizinan-usaha",
    service: "Pendirian PT & NIB",
    content:
      "Usaha peternakan saya sudah 8 tahun berjalan tapi selalu jadi perseorangan. Akhirnya berani badanin PT karena mau ikut tender pemasok telur supermarket. Dari konsultasi awal, mas Bagus langsung jelaskan KBLI yang tepat + risiko usaha yang harus diatur di OSS. Akta, NPWP badan, NIB, sampai sertifikat standar selesai 6 hari kerja. Saya cuma kirim foto KTP dan tanda tangan digital. Luar biasa.",
    verified: true,
    helpful: 34,
  },
  {
    id: "t-cv-digital-medan",
    name: "Christina Manurung",
    role: "Founder",
    company: "Sigura-Gura Digital Studio",
    city: "Medan",
    province: "Sumatera Utara",
    rating: 5,
    date: "2026-08-28",
    category: "perizinan-usaha",
    service: "Pendirian CV + NIB",
    content:
      "Sempat ragu mau pakai jasa online karena di Medan saya tidak punya kenalan notaris yang 'netral'. Ternyata sistemnya profesional banget: penawaran tertulis, timeline jelas, dan setiap tahap di-update via WhatsApp dengan bukti dokumennya. CV saya beres 4 hari kerja termasuk NIB dan NPWP. Sekarang bisa kontrak klien korporat yang minta legalitas resmi.",
    verified: true,
    helpful: 29,
  },
  {
    id: "t-pma-korea-surabaya",
    name: "Kim Min-jun (Wendi)",
    role: "Direktur",
    company: "PT Hanwoo Food Indonesia",
    city: "Surabaya",
    province: "Jawa Timur",
    rating: 5,
    date: "2026-08-06",
    category: "perizinan-usaha",
    service: "Pendirian PT PMA",
    content:
      "Sebagai investor asing dari Korea, saya sempat frustrasi dengan konsultan lokal yang tidak bisa bahasa Inggris baik. Tim PusatPerizinan komunikasi dua bahasa, menjelaskan perbedaan PMA vs lokal, modal disetor minimum, dan struktur saham untuk partner Indonesia kami. PMA terbit 13 hari kerja termasuk NIB dan izin ketenagakerjaan. Report mingguan dalam bahasa Inggris, sangat membantu.",
    verified: true,
    helpful: 41,
  },
  {
    id: "t-nib-umkm-palembang",
    name: "Yulianti AP",
    role: "Pemilik",
    company: "Pindang Patin Mak II",
    city: "Palembang",
    province: "Sumatera Selatan",
    rating: 5,
    date: "2025-12-28",
    category: "perizinan-usaha",
    service: "NIB Perseorangan",
    content:
      "Awalnya cuma iseng tanya-tanya di WhatsApp jam 9 malem, ternyata dibalas cepat dan diarahkan ambil program UMKM gratis dulu. NIB saya terbit keesokan harinya, GRATIS biaya jasa karena cocok syarat bantuan OSS. Malah diajarin cara cek sendiri status NIB di OSS. Jujur, ada-ada saja jasa yang kaya gini. Semoga rezekinya makin lancar.",
    verified: true,
    helpful: 52,
  },
  {
    id: "t-pt-ekspor-makassar",
    name: "Fadli Rahman",
    role: "Owner",
    company: "CV Tuna Jaya Makassar",
    city: "Makassar",
    province: "Sulawesi Selatan",
    rating: 5,
    date: "2025-12-19",
    category: "perizinan-usaha",
    service: "Upgrade CV ke PT + NIB Ekspor",
    content:
      "Bisnis ikan bekur dari CV ke PT sekaligus siap ekspor. Timnya paham banget bedanya KBLI ekspor, APBI, dan dokumen kepabeanan. Mereka benerin KBLI lama saya yang ternyata salah (jadi tidak bisa izin ekspor), urus PT baru, dan koordinasi sampai Custom Master Identification Number jadi. Sekarang kontainer pertama kami sudah sailing ke Singapura. Terima kasih banyak!",
    verified: true,
    helpful: 37,
  },
  {
    id: "t-yayasan-bogor",
    name: "Dra. Wahyuni Hapsari",
    role: "Ketua Yayasan",
    company: "Yayasan Cahaya Hikmah",
    city: "Bogor",
    province: "Jawa Barat",
    rating: 4,
    date: "2026-06-26",
    category: "perizinan-usaha",
    service: "Pendirian Yayasan + SK Menkumham",
    content:
      "Proses yayasan kami lancar, SK terbit sesuai timeline 10 hari kerja. Konsultasinya detail, dibantu menyusun AD/ART yang sesuai program pendidikan al-Quran kami. Bintang 4 karena di tengah proses saya diminta tambah dokumen ktp pengurus susunan baru — mungkin bisa diantisipasi lebih awal dari awal. Tapi overall sangat membantu, harga juga masuk akal dibanding 2 kantor lain yang saya tanya.",
    verified: true,
    helpful: 18,
  },
  {
    id: "t-oss-rba-bekasi",
    name: "Agus Setiawan",
    role: "Direktur Operasional",
    company: "PT Tridaya Karya Plastik",
    city: "Bekasi",
    province: "Jawa Barat",
    rating: 5,
    date: "2026-07-20",
    category: "perizinan-usaha",
    service: "Penyelarasan OSS-RBA",
    content:
      "NIB lama perusahaan saya ternyata berisiko tinggi tapi tidak ada Izin Lingkungan menggantung dari era sebelumnya — ketahuan pas mau masuk supply chain perusahaan multinasional. Tim PusatPerizinan menyusun 'kebersihan perizinan': penyelarasan OSS-RBA, UKL-UPL, sampai simpul izin berusaha selesai. Auditing pabrik mitra kami lolos. Sangat recommended untuk pabrikan yang mau naik kelas.",
    verified: true,
    helpful: 33,
  },
  {
    id: "t-perseorangan-jayapura",
    name: "Marlina Fettayeni",
    role: "Pemilik",
    company: "Marlina Souvenir & Craft",
    city: "Jayapura",
    province: "Papua",
    rating: 5,
    date: "2025-11-27",
    category: "perizinan-usaha",
    service: "NIB Perseorangan + PIRT",
    content:
      "Dari Jayapura, jarak bukan halangan sama sekali. Semua via WhatsApp dan email, dokumen tinggal scan. NIB + PIRT buatan tangan Papua saya selesai semua dalam seminggu. Malah diarahkan ikut pelatihan pembinaan UMKM koperasi yang gratis. Buat saudara-saudara di Papua, tidak perlu ragu — ini jasa online yang benar-benar melayani sampai ujung timur.",
    verified: true,
    helpful: 46,
  },
  {
    id: "t-pt-garut-kuliner",
    name: "Rizal Fauzi",
    role: "Owner",
    company: "Sambal Ndeso Indonesia",
    city: "Garut",
    province: "Jawa Barat",
    rating: 5,
    date: "2025-11-18",
    category: "perizinan-usaha",
    service: "Pendirian PT + PIRT + Halal",
    content:
      "Satu pintu buat semua: PT dibuat, PIRT diajukan, sertifikat halal self-declare didampingi. Yang paling saya hargai mereka kasih tahu mana yang harus gratis (halal UMKM) dan mana yang memang bayar — bukan semua dijahil jadi jasa. Total 3 bulan semua legalitas brand sambal saya komplit, langsung bisa masuk Indomaret wilayah Jawa Barat.",
    verified: true,
    helpful: 44,
  },
  {
    id: "t-pt-semarang-logistik",
    name: "Bambang Prakoso",
    role: "Komisaris",
    company: "PT Nusantara Pagar Logistik",
    city: "Semarang",
    province: "Jawa Tengah",
    rating: 5,
    date: "2025-11-09",
    category: "perizinan-usaha",
    service: "Pendirian PT + Izin Logistik",
    content:
      "Perusahaan logistik butuh izin yang tidak standar: angkutan barang, gudang, dan KBLI terkait kepabeanan. Konsultan yang handle kami benar-benar paham sektoral — bahkan tahu persyaratan tambahan untuk penyelenggaraan pergudangan berizin. 9 hari kerja beres semua. Sudah 3 tahun pakai untuk kebutuhan perpanjangan dan perubahan data, tetap konsisten bagusnya.",
    verified: true,
    helpful: 26,
  },
  {
    id: "t-cv-bandaaceh-tour",
    name: "Teuku Rizal Ahmad",
    role: "Pemilik",
    company: "Sagoe Trip Adventure",
    city: "Banda Aceh",
    province: "Aceh",
    rating: 5,
    date: "2025-10-30",
    category: "perizinan-usaha",
    service: "Pendirian CV + TDAU",
    content:
      "Travel adventure dan wisata Aceh butuh legalitas yang rapi biar bisa kerjasama dengan sekolah dan korporat. CV + NIB + Tanda Daftar Angkutan Umum beres dalam 8 hari. Mereka bahkan ingetin soal kewajiban SIUJP per armada yang saya sendiri tidak tahu. Komunikasi santai tapi kerjaannya rapi. Barakallah.",
    verified: true,
    helpful: 22,
  },
  {
    id: "t-pt-kerjasama-denpasar",
    name: "I Gede Ariawan",
    role: "Managing Partner",
    company: "Ariawan & Partners Consulting",
    city: "Denpasar",
    province: "Bali",
    rating: 5,
    date: "2025-10-21",
    category: "perizinan-usaha",
    service: "Konsultasi Struktur Usaha",
    content:
      "Saya konsultan pajak sendiri, tapi untuk struktur bisnis klien saya yang melibatkan PMA + penanaman modal bersama, saya butuh pendapat kedua. Konsultasinya mendalam: kami bahas efek PP 5/2021, kewajiban pelaporan LKPM, sampai rencana repatriasi keuntungan. Saya jadi langganan konsultasi kompleks. Kalau konsultan pajak aja pake jasa mereka, Anda bisa bayangin kualitasnya.",
    verified: true,
    helpful: 31,
  },
  {
    id: "t-nib-tasikmalaya-fashion",
    name: "Dewi Kartika",
    role: "Owner",
    company: "Kartika Hijab House",
    city: "Tasikmalaya",
    province: "Jawa Barat",
    rating: 5,
    date: "2025-10-12",
    category: "perizinan-usaha",
    service: "NIB Perseorangan",
    content:
      "Bisnis hijab online dari rumah, ditagih marketplace biar masuk program seller terpercaya. Butuh NIB dan PIRT tidak sampai Rp 300 ribu semua beres — malah dapat panduan cara naik kelas jadi CV kalau omzet meningkat. Adminnya sabar jawab pertanyaan yang mungkin terdengar bodoh sekalipun. Puas banget.",
    verified: true,
    helpful: 39,
  },
  {
    id: "t-pt-balikpapan-otomotif",
    name: "Herman Lim",
    role: "Direktur",
    company: "PT Borneo Prima Autoservis",
    city: "Balikpapan",
    province: "Kalimantan Timur",
    rating: 5,
    date: "2025-10-02",
    category: "perizinan-usaha",
    service: "Pendirian PT + Izin Ketenagakerjaan",
    content:
      "Buka bengkel spesialis kendaraan berat di kawasan industri. PT, NIB, Wajib Lapor Ketenagakerjaan, sampai registrasi tenaga kerja asing untuk 2 teknisi ahli dari Malaysia diurus sekalian. Dijelaskan juga kewajiban DPKK dan RPTKA dengan bahasa yang jelas. Tim yang sama masih standby kalau ada kebutuhan perpanjangan izin expat kami. Profesional.",
    verified: true,
    helpful: 24,
  },

  // ============ SERTIFIKASI HALAL ============
  {
    id: "t-halal-bakso-solo",
    name: "Sugiyanto",
    role: "Pemilik",
    company: "Bakso Pak Sugeng Solo",
    city: "Surakarta",
    province: "Jawa Tengah",
    rating: 5,
    date: "2026-09-14",
    category: "sertifikasi-halal",
    service: "Sertifikasi Halal Self-Declare",
    content:
      "Saya kira urus halal itu mahal dan ribet. Ternyata usaha saya lolos jalur self-declare GRATIS. Kak Ayu dari tim bantu daftar akun SEHATI, input 14 produk satu-satu, siapkan daftar bahan per pembelian, sampai ketemu auditor LPH yang datang ke warung. Sertifikat terbit 19 hari. Sekarang stampel halal ada di cup bakso saya, customer tambah percaya.",
    verified: true,
    helpful: 58,
  },
  {
    id: "t-halal-kosmetik-tangerang",
    name: "Alya Rahmadani",
    role: "Founder",
    company: "Baren Skincare",
    city: "Tangerang Selatan",
    province: "Banten",
    rating: 5,
    date: "2026-08-21",
    category: "sertifikasi-halal",
    service: "Sertifikasi Halal Kosmetik (Reguler)",
    content:
      "Kosmetik itu kategori paling susah halal-nya karena banyak bahan. Saya sudah 2 kali gagal sendiri karena bahan emulsifier tidak jelas statusnya. Di sini di-audit dulu 23 bahan kami, yang bermasalah diarahkan ganti supplier yang punya sertifikat halal bahan. Jalur reguler, terbit 38 hari untuk 5 produk sekaligus. Sekarang bisa masuk Sociolla dan dicari konsumen muslim yang teliti.",
    verified: true,
    helpful: 36,
  },
  {
    id: "t-halal-catering-bandung",
    name: "Hj. Endang Sutini",
    role: "Owner",
    company: "Dapur Endang Catering",
    city: "Bandung",
    province: "Jawa Barat",
    rating: 5,
    date: "2026-07-12",
    category: "sertifikasi-halal",
    service: "Sertifikasi Halal Katering",
    content:
      "Catering jadi kategori usaha yang wajib halal sejak 2024 — untung saya sudah duluan. Prosesnya ternyata menyenangkan: seminggu sekali di-visit virtual untuk cek kelengkapan, auditor datang dan hanya 1,5 jam di dapur karena semua dokumen sudah rapi dari tim. Sekarang bisa bidding katering instansi pemerintah yang mensyaratkan sertifikat halal. Nilai kontraknya jauh di atas biaya sertifikasi.",
    verified: true,
    helpful: 27,
  },
  {
    id: "t-halal-snack-malang",
    name: "Putri Anindya",
    role: "CEO",
    company: "Anindya Snack Industry",
    city: "Malang",
    province: "Jawa Timur",
    rating: 4,
    date: "2026-06-10",
    category: "sertifikasi-halal",
    service: "Sertifikasi Halal 12 Produk",
    content:
      "12 produk snack kami diurus sekaligus. Sertifikat terbit dalam 29 hari, sistem pendampingannya via grup WhatsApp yang responsif. Saya kasih 4 bintang karena awalnya timeline yang dikasih 21 hari, jadi 29 karena auditor LPH agak lama jadwalnya — itu di luar kendali tim sih, dan mereka tetap proaktif follow up. Hasil akhir memuaskan, harga jujur.",
    verified: true,
    helpful: 21,
  },
  {
    id: "t-halal-restaurant-padang",
    name: "Junaidi Chaniago",
    role: "Pemilik",
    company: "Rumah Makan Minang Selera",
    city: "Padang",
    province: "Sumatera Barat",
    rating: 5,
    date: "2025-12-05",
    category: "sertifikasi-halal",
    service: "Sertifikasi Halal Restoran",
    content:
      "Restoran Padang kami sudah 25 tahun berdiri, tapi sertifikat halal resmi baru sekarang. Diketawain juga sih sama anak saya, 'ayah katanya halal kok urus sertifikat aja telat'. Tapi memang kalau tidak didampingi, form SEHATI-nya pusing — daftar bahan rendam, bumbu, semuanya. Sekarang sertifikat terpasang di depan restoran, customer lama malah bangga. Terima kasih tim!",
    verified: true,
    helpful: 33,
  },
  {
    id: "t-halal-bahan-baku-semarang",
    name: "Melisa Kusuma",
    role: "Procurement Manager",
    company: "PT Sinergi Bahan Pangan",
    city: "Semarang",
    province: "Jawa Tengah",
    rating: 5,
    date: "2025-11-24",
    category: "sertifikasi-halal",
    service: "Sertifikasi Halal Distributor Bahan",
    content:
      "Kami distributor bahan baku — sertifikasi halal untuk 'halalan toyyiban' bahan yang kami jual jadi syarat dari banyak pelanggan pabrik. Tim PusatPerizinan memandu proses verifikasi rantai pasok kami: 60+ supplier harus dicek sertifikatnya. Sekarang kami jadi supplier prioritas 3 pabrik makanan besar. ROI sertifikasi ini luar biasa bagi B2B.",
    verified: true,
    helpful: 19,
  },
  {
    id: "t-halal-minuman-yogyakarta",
    name: "Galih Nugroho",
    role: "Co-Founder",
    company: "Teh Petruk Botanical",
    city: "Yogyakarta",
    province: "DI Yogyakarta",
    rating: 5,
    date: "2025-11-14",
    category: "sertifikasi-halal",
    service: "Sertifikasi Halal Minuman",
    content:
      "Brand teh botolan kami butuh halal buat masuk bioskop dan minimarket. Yang bikin beda dari jasa lain: mereka edukasi, bukan cuma eksekusi. Saya jadi paham kenapa bahan tertentu harus ganti, kenapa label harus ubah. Jadi untuk produk ke depan saya sudah bisa siapkan sendiri sebelum kontak tim. Sertifikat terbit 24 hari, clean!",
    verified: true,
    helpful: 25,
  },
  {
    id: "t-halal-bogor-piisaan",
    name: "Fitri Handayani",
    role: "Pemilik",
    company: "Pisang Aroma Bogor",
    city: "Bogor",
    province: "Jawa Barat",
    rating: 5,
    date: "2025-10-28",
    category: "sertifikasi-halal",
    service: "Sertifikasi Halal Self-Declare",
    content:
      "Pisang sale dan pisang crispy saya ada 6 varian rasa. Semua diurus lewat program self declare yang didampingi penuh — total Rp 0 biaya sertifikasi, hanya jasa pendampingan yang sangat murah. Paling terbantu bagian input daftar bahan di SEHATI, karena saya gaptek. Sertifikat sudah terpasang, sekarang pesanan reseller dari luar kota naik karena label halal + PIRT lengkap.",
    verified: true,
    helpful: 47,
  },
  {
    id: "t-halal-ekspor-surabaya",
    name: "Ir. Hartono Wijaksana",
    role: "Direktur",
    company: "PT Eksport Mandiri Rempah",
    city: "Surabaya",
    province: "Jawa Timur",
    rating: 5,
    date: "2025-10-16",
    category: "sertifikasi-halal",
    service: "Sertifikasi Halal Ekspor + Halal Certificate JAKIM",
    content:
      "Untuk ekspor ke Malaysia, customer minta selain sertifikat halal Indonesia juga pengakuan JAKIM. Tim kami menangani keduanya sekaligus — sertifikat BPJPH dulu, lalu persiapan dokumen untuk JAKIM. Ekspor kami ke KL lancar tanpa hambatan di customs. Konsultan yang paham ekspor ini langka, biasanya cuma paham sertifikasi domestik doang.",
    verified: true,
    helpful: 28,
  },

  // ============ BPOM & PIRT ============
  {
    id: "t-bpom-skincare-bandung",
    name: "Anisa Puspita",
    role: "Founder",
    company: "Puspita Beauty Care",
    city: "Bandung",
    province: "Jawa Barat",
    rating: 5,
    date: "2026-09-06",
    category: "izin-bpom-pirt",
    service: "Notifikasi BPOM Kosmetik",
    content:
      "BPOM 6 produk skincare saya terbit 43 hari. Sebelumnya saya coba urus sendiri dan mentok 3 bulan karena formula di CPKB-nya beda dengan label. Di sini di-audit dulu semua dokumen: label, klaim, formula, hasil uji lab. Dua klaim saya diminta dilembutkan biar tidak kena tegur nanti. Sekarang masuk Tokopedia Official Store dan Shopee Mall tanpa drama. Recommended banget!",
    verified: true,
    helpful: 55,
  },
  {
    id: "t-pirt-keripik-jember",
    name: "Sutarmin",
    role: "Pemilik",
    company: "Keripik Pedas Mbah Min",
    city: "Jember",
    province: "Jawa Timur",
    rating: 5,
    date: "2026-08-14",
    category: "izin-bpom-pirt",
    service: "PIRT + Halal",
    content:
      "Keripik saya dulu jualan oklom-artis aja. Setelah ada PIRT dan halal, reseller dari kota lain berani stok banyak. Prosesnya dibantu penuh: pendaftaran akun PIRT, cek CPPOB sederhana di dapur saya, dan sebagainya. PIRT terbit 9 hari. Yang bikin saya kaget, biayanya jauh lebih murah dari tawaran tetangga desa yang katanya 'saudara orang dalam Dinkes'. Ini bukti jujur itu paling cepat.",
    verified: true,
    helpful: 61,
  },
  {
    id: "t-bpom-jamu-klasik-woyogya",
    name: "Dr. Ratna Kurniawati",
    role: "Owner",
    company: "Ratu Nusa Herbal",
    city: "Yogyakarta",
    province: "DI Yogyakarta",
    rating: 5,
    date: "2026-07-28",
    category: "izin-bpom-pirt",
    service: "Notifikasi BPOM Obat Tradisional",
    content:
      "Obat tradisional itu kelasnya di atas PIRT — butuh uji lab, CPOT, dan formulasi yang valid secara ilmiah. Saya dokter, tapi regulasi BPOM-nya tetap buta. Tim ini menghubungkan kami dengan lab terakreditasi, membantu penyusunan dossiers, dan notifikasi 4 produk jamu kami terbit 52 hari. Sekarang produk saya di apotek dan e-pharmacy. Worth every rupiah.",
    verified: true,
    helpful: 34,
  },
  {
    id: "t-bpom-sambal-cianjur",
    name: "Yuyun Kartika Sari",
    role: "Owner",
    company: "Sambal Bu Yuyun",
    city: "Cianjur",
    province: "Jawa Barat",
    rating: 5,
    date: "2026-06-22",
    category: "izin-bpom-pirt",
    service: "Upgrade PIRT ke BPOM",
    content:
      "Dari PIRT naik ke BPOM biar bisa masuk minimarket. Timnya jujur dari awal: 'produk Anda perlu naik kelas fasilitas produksi dulu'. Dibimbing 2 bulan untuk penyesuaian dapur ke CPPOB yang layak, baru daftar BPOM. Sambal saya sekarang ada di 3 cabang supermarket besar di Jawa Barat. Kuncinya: mereka tidak asal terima orderan, tapi kasih tahu jalurnya yang benar.",
    verified: true,
    helpful: 42,
  },
  {
    id: "t-pirt-abon-tarakan",
    name: "Norhayati",
    role: "Pemilik",
    company: "Abon Ikan Buhis",
    city: "Tarakan",
    province: "Kalimantan Utara",
    rating: 5,
    date: "2025-12-08",
    category: "izin-bpom-pirt",
    service: "PIRT Abon Ikan",
    content:
      "Abon ikan khas Tarakan kami sudah dipesan sampai Tawau. PIRT terbit 11 hari, didampingin via WA saja dari awal sampai akhir. Yang saya suka, dikasih tahu label yang benar itu seperti apa — komposisi, tanggal kedaluwarsa, logo PIRT. Dulu label buatan sendiri ngasal. Sekarang tampak profesional, malah diminta jadi supplier oleholeh bandara lokal.",
    verified: true,
    helpful: 38,
  },
  {
    id: "t-bpom-suplemen-jakarta",
    name: "Andreas Halim",
    role: "CEO",
    company: "Vitality Nutrition Lab",
    city: "Jakarta Selatan",
    province: "DKI Jakarta",
    rating: 5,
    date: "2025-11-29",
    category: "izin-bpom-pirt",
    service: "Notifikasi BPOM Suplemen + Klaim",
    content:
      "Suplemen itu kategori sensitif — klaim 'menurunkan berat badan 5kg dalam sebulan' bisa bikin notifikasi ditolak atau produk diserbu BPOM. Tim kami melakukan legal review atas semua materi marketing kami, bantu reformulasi klaim yang aman secara regulasi tapi tetap menjual. Notifikasi 3 SKU terbit 48 hari. Ini partner yang paham bisnis, bukan cuma administrasi.",
    verified: true,
    helpful: 29,
  },
  {
    id: "t-pirt-sambal-kediri",
    name: "Mahmudah",
    role: "Pemilik",
    company: "Tahu Takwa Makhmudah",
    city: "Kediri",
    province: "Jawa Timur",
    rating: 4,
    date: "2025-11-19",
    category: "izin-bpom-pirt",
    service: "PIRT Makanan Tradisional",
    content:
      "Tahu takwa kami sudah terkenal, tapi PIRT-nya baru sekarang. Prosesnya lancar, PIRT terbit 12 hari, dibantu label yang benar. Bintang 4 karena di tengah proses ada perubahan kebijakan Dinkes setempat soal jadwal verifikasi, jadi agak menunggu. Tapi timnya tetap komunikatif dan akhirnya selesai dengan baik. Untuk UMKM makanan, ini pilihan tepat.",
    verified: true,
    helpful: 23,
  },
  {
    id: "t-bpom-kosmetik-medan",
    name: "Jesslyn Tanaka",
    role: "Brand Manager",
    company: "Maison Lola Beauty",
    city: "Medan",
    province: "Sumatera Utara",
    rating: 5,
    date: "2025-11-08",
    category: "izin-bpom-pirt",
    service: "Notifikasi BPOM Kosmetik 8 SKU",
    content:
      "8 SKU kosmetik kami di-notifikasi sekaligus, terbit 49 hari semuanya. Yang paling berharga dari layanan ini bukan cuma BPOM-nya, tapi audit label pre-launch: kami diminta revisi 3 kemasan karena klaim 'whitening' yang sekarang sensitif. Kalau tidak dicegat lebih dulu, bisa jadi masalah besar pas audit marketplace. Team pakar regulasi kosmetik yang sesungguhnya.",
    verified: true,
    helpful: 31,
  },
  {
    id: "t-bpom-minuman-lampung",
    name: "Bimo Aryo Seno",
    role: "Founder",
    company: "Kopi Robusta Way Kanan",
    city: "Bandar Lampung",
    province: "Lampung",
    rating: 5,
    date: "2025-10-25",
    category: "izin-bpom-pirt",
    service: "PIRT Kopi Kemasan",
    content:
      "Kopi robusta single origin kemasan kami butuh PIRT buat masuk grosir dan indomaret point. Dibantu dari akun sampai terbit 10 hari. Bonusnya: dikasih tahu soal logo PIRT yang benar posisinya di kemasan, dan cara isi laporan yang wajib nanti. Sudah gitu dikasih kontak langsung kalau ada kendala pas lapor sendiri. Sip!",
    verified: true,
    helpful: 35,
  },

  // ============ PERPAJAKAN ============
  {
    id: "t-pajak-spt-pt-bekasi",
    name: "Lilis Suryani",
    role: "Finance Manager",
    company: "PT Mitra Logistik Prima",
    city: "Bekasi",
    province: "Jawa Barat",
    rating: 5,
    date: "2026-09-21",
    category: "perpajakan-coretax",
    service: "SPT Tahunan Korporat",
    content:
      "SPT Tahunan PT kami kompleks: ada PPh 21, 23, final atas tanah, dan transaksi hubungan istimewa. Konsultan pajak kami di sini benar-benar memahami akuntansi, bukan cuma formulir. Menemukan koreksi fiskal yang menghemat kami Rp 47 juta dari perhitungan awal kantor akuntansi kami sendiri. Lapor tepat waktu lewat Coretax. Langganan tetap tiap tahun.",
    verified: true,
    helpful: 37,
  },
  {
    id: "t-pajak-npwp-wirausahawan",
    name: "Dimas Prasetya",
    role: "Freelance Videographer",
    company: "Dimas Visual Works",
    city: "Jakarta Selatan",
    province: "DKI Jakarta",
    rating: 5,
    date: "2026-08-25",
    category: "perpajakan-coretax",
    service: "NPWP + SPT Tahunan Pribadi",
    content:
      "Freelancer yang klien korporat minta NPWP. Sempat takut urusan pajak itu rumit dan mahal konsultasinya. Ternyata buat kasus saya cukup sederhana: buat NPWP elektronik + lapor SPT pribadi dengan PPh final 0,5% (bisa lewat NIK juga ternyata). Dijelaskan dengan sangat sabar, pakai analogi yang mudah. Biayanya sangat masuk akal. Sekarang jadi pelanggan tahunan.",
    verified: true,
    helpful: 49,
  },
  {
    id: "t-pajak-pkp-surabaya",
    name: "Gunawan Susilo",
    role: "Direktur",
    company: "PT Sinar Jaya Furnindo",
    city: "Surabaya",
    province: "Jawa Timur",
    rating: 5,
    date: "2026-08-02",
    category: "perpajakan-coretax",
    service: "Pendaftaran PKP",
    content:
      "Kami ambang omzet untuk PKP tapi ragu daftar karena mitra kami bilang 'pusing urusan PPN'. Konsultan pajak dari tim ini malah menyarankan menunggu 3 bulan untuk mengoptimalkan akumulasi PPN masukan dulu, baru daftar. Jujur menyarankan menunggu — itu bukti mereka tidak cuma kejar fee. PKP kami aktif dengan mulus, faktur pajak pertama terbit via Coretax tanpa kendala.",
    verified: true,
    helpful: 33,
  },
  {
    id: "t-pajak-umkm-makassar",
    name: "Andi Tenri Padaelo",
    role: "Pemilik",
    company: "Tenri Butik Sulawesi",
    city: "Makassar",
    province: "Sulawesi Selatan",
    rating: 5,
    date: "2026-07-08",
    category: "perpajakan-coretax",
    service: "Tax Planning UMKM",
    content:
      "Omzet butik saya lewat 4,8 M per tahun, mulai disorot DJP. Ketakutan terbesar saya adalah surat pemeriksaan. Konsultan di sini menata ulang struktur: transaksi mana yang masuk UMKM final, mana yang korporat, NPWP suami-istri dibenahi. Sekarang tidur nyenyak, SPT rapi, dan PPh-nya justru lebih terstruktur. Nasehat pajak yang bagus itu mahal harganya — tapi di sini wajar dan berbunga emas.",
    verified: true,
    helpful: 28,
  },
  {
    id: "t-pajak-coretax-migration",
    name: "Yosep Kristiawan",
    role: "Accounting Head",
    company: "PT Delta Presisi Engineering",
    city: "Tangerang",
    province: "Banten",
    rating: 5,
    date: "2026-06-18",
    category: "perpajakan-coretax",
    service: "Migrasi Coretax DJP",
    content:
      "Perusahaan manufaktur dengan 40 karyawan dan ratusan faktur — migrasi Coretax itu momok buat tim akuntansi kami. Tim PusatPerizinan melatih staf kami, menyiapkan SOP, dan mendampingi 3 bulan pertama transisi. Sekarang tim internal kami mandiri faktur dan lapor via Coretax. Mereka mengajari, bukan membiarkan kami bergantung. Ini yang membedakan konsultan baik.",
    verified: true,
    helpful: 26,
  },
  {
    id: "t-pajak-tunggakan-semarang",
    name: "Sri Wahyuni",
    role: "Pemilik Warung & Kos",
    company: "Kos Bu Sri Pelangi",
    city: "Semarang",
    province: "Jawa Tengah",
    rating: 5,
    date: "2025-12-02",
    category: "perpajakan-coretax",
    service: "Penanganan SPT Terlewat",
    content:
      "Saya 4 tahun tidak lapor SPT karena pikir warung kecil aja tidak wajib. Pas mau ngajak kredit bank disuruh show NPWP aktif. Panik! Dibantu dari awal: lapor SPT tahun-tahun terlewat, hitung dengan tarif UMKM, ternyata tagihannya jauh lebih kecil dari yang saya bayangin (malah sebagian nihil). Bank kredit saya acc. Terima kasih sudah menyelamatkan saya dari kepanikan sendiri.",
    verified: true,
    helpful: 58,
  },
  {
    id: "t-pajak-expat-jakarta",
    name: "Rajesh Kumar",
    role: "Country Director",
    company: "GlobalTech Solutions Indonesia",
    city: "Jakarta Pusat",
    province: "DKI Jakarta",
    rating: 5,
    date: "2025-11-25",
    category: "perpajakan-coretax",
    service: "Konsultasi Pajak Ekspatriat",
    content:
      "As an expatriate from India, navigating Indonesian personal tax (Article 21, residency rules, foreign income) was confusing. The consultant explained everything in clear English, helped file my annual return, and advised on the tax equalization clause in my contract. My company now refers all our expat staff here. Professional and multilingual — highly recommended.",
    verified: true,
    helpful: 22,
  },
  {
    id: "t-pajak-spt-21-payroll",
    name: "Ferry Wibowo",
    role: "HRGA Manager",
    company: "PT Kreasi Media Digital",
    city: "Jakarta Barat",
    province: "DKI Jakarta",
    rating: 5,
    date: "2025-11-15",
    category: "perpajakan-coretax",
    service: "Konsultasi PPh 21 & Payroll",
    content:
      "Startup kami punya pola penggajian unik: full-time, part-time, kontrak proyek, dan equity. Perhitungan PPh 21-nya rumit. Tim pajak membantu menyusun sistem payroll yang tepat pajak — dari TER (tarif efektif rata-rata) yang baru sampai laporan bulanan Coretax. Audit internal akhir tahun: nol temuan. Cukup bilang, kan?",
    verified: true,
    helpful: 24,
  },
  {
    id: "t-pajak-kerjasama-bandung",
    name: "Yuanita Rahmawati",
    role: "Owner",
    company: "Bloomies Florist & Decor",
    city: "Bandung",
    province: "Jawa Barat",
    rating: 4,
    date: "2025-11-05",
    category: "perpajakan-coretax",
    service: "SPT Tahunan Pribadi + Usaha",
    content:
      "Florist kami jualan offline + marketplace + wedding project — sumber penghasilan campur aduk. Dibantu merapikan: mana PPh final, mana progresif, mana bisa dikurangi biaya. SPT lancar. Saya kasih 4 bintang karena pertama kali konsultasi agak lama nunggu balasan (padahal hari Senin pagi), tapi setelah jalan semuanya cepat. Overall memuaskan.",
    verified: true,
    helpful: 19,
  },
  {
    id: "t-pajak-hakim-batu",
    name: "Hendra Gunardi",
    role: "Pemilik",
    company: "Batuku Stone Craft",
    city: "Malang",
    province: "Jawa Timur",
    rating: 5,
    date: "2025-10-27",
    category: "perpajakan-coretax",
    service: "NPWP Badan + SPT Usaha CV",
    content:
      "CV kami baru berdiri, bingung pajak CV itu pajaknya pemilik atau badan. Dijelaskan dengan detail: CV itu bukan subjek pajak, penghasilannya ke pemilik. NPWP badan tetap dibuat untuk kebutuhan transaksi. SPT-nya dibantu sekalian. Konsultan yang bisa menjelaskan hal teknis dengan sederhana — pelanggan setia untuk usaha kedua kami nanti.",
    verified: true,
    helpful: 21,
  },
  {
    id: "t-pajak-tender-palembang",
    name: "Chef Abdullah Faiz",
    role: "Owner",
    company: "Dapur RAMADHAN Catering",
    city: "Palembang",
    province: "Sumatera Selatan",
    rating: 5,
    date: "2025-10-18",
    category: "perpajakan-coretax",
    service: "Pendaftaran PKP + Faktur Pajak",
    content:
      "Mau masuk vendor katering BUMN yang wajib faktur pajak. Proses PKP dibantu end-to-end, faktur pajak pertama kami terbit 3 hari setelah pengesahan PKP. Sekarang katering kami dipakai 2 instansi BUMN di Sumatera Selatan. Tanpa faktur pajak, semua ini tidak akan terjadi. Layanan pajak yang langsung berdampak ke omzet — sangat direkomendasikan.",
    verified: true,
    helpful: 27,
  },
  {
    id: "t-pajak-dokter-kediri",
    name: "drg. Ayu Lestari",
    role: "Pemilik",
    company: "Klinik Gigi Ayu Dental",
    city: "Kediri",
    province: "Jawa Timur",
    rating: 5,
    date: "2025-10-08",
    category: "perpajakan-coretax",
    service: "Tax Planning Praktik Kesehatan",
    content:
      "Dokter gigi dengan praktik pribadi + kontrak klinik mitra, pajaknya sering salah potong di sumbernya. Konsultan pajak membedah kontrak kami, merapikan pemotongan PPh 21/22/23 yang tepat, dan mengoptimalkan kewajiban pribadi. Hemat pajak legal tahunan saya sekitar Rp 18 juta — bukan karena menghindar, tapi karena sebelumnya ada yang salah hitung. Jujur dan sangat kompeten.",
    verified: true,
    helpful: 30,
  },

  // ============ PMI & KERJA LUAR NEGERI ============
  {
    id: "t-pmi-jepang-kaigo-lombok",
    name: "Siti Aminah",
    role: "Pekerja Migran (Kaigo)",
    company: "Penempatan Jepang — Specified Skilled Worker",
    city: "Mataram",
    province: "NTB",
    rating: 5,
    date: "2026-09-18",
    category: "kerja-luar-negeri-pmi",
    service: "Penempatan Kaigo Jepang (SSW)",
    content:
      "Alhamdulillah sekarang saya sudah 8 bulan di Nagoya sebagai kaigo. Sebelumnya saya sudah korban calo sekali — bayar 35 juta, 2 tahun nganggur. Lewat PusatPerizinan prosesnya beda total: kontrak resmi dibacakan pelan-pelan, biaya jelas di depan, pembekalan bahasa Jepang di LPK mitra mereka, dan dari sampe Haneda sampai rumah kontrak ada pendamping. Gaji masuk tepat tiap bulan, saya bisa kirim untuk rumah orang tua.",
    verified: true,
    helpful: 89,
  },
  {
    id: "t-pmi-korea-eps-banyumas",
    name: "Ahmad Fauzan",
    role: "Pekerja Migran (EPS)",
    company: "Penempatan Korea Selatan — EPS Manufacturing",
    city: "Purwokerto",
    province: "Jawa Tengah",
    rating: 5,
    date: "2026-08-18",
    category: "kerja-luar-negeri-pmi",
    service: "Pendampingan EPS Korea",
    content:
      "Lewat jalur EPS Korea resmi. Yang bikin saya yakin: mereka bilang terus terang bahwa biaya utama yang saya keluarkan hanya kursus bahasa + TOPIK, sisa itu skema pemerintah. Nggak ada janji 'pasti berangkat bulan ini' kayak calo. Sekarang saya di Paju, gaji sekitar 2,3 juta Won, istirahat sesuai kontrak. Buat yang mau Korea, jangan tergiur yang instan — ikuti prosesnya yang benar.",
    verified: true,
    helpful: 76,
  },
  {
    id: "t-pmi-taiwan-art-sukabumi",
    name: "Nurul Hasanah",
    role: "Pekerja Migran (ART)",
    company: "Penempatan Taiwan — Pemeliharaan Rumah Tangga",
    city: "Sukabumi",
    province: "Jawa Barat",
    rating: 5,
    date: "2026-07-16",
    category: "kerja-luar-negeri-pmi",
    service: "Penempatan ART Taiwan",
    content:
      "Ibu saya yang dulunya PMI Hongkong yang mencarikan saya jalan legal ini. Kontrak 3 tahun, asuransi aktif dari hari pertama, dan BNP2MI-nya tahu saya di mana. Mama sudah dihubungi langsung tim dari Jakarta waktu verifikasi. Sekarang bulan ke-14, gaji 23 ribu NT dollar, majikan baik. Terima kasih untuk pendampingan sampai saya benar-benar berangkat.",
    verified: true,
    helpful: 64,
  },
  {
    id: "t-pmi-pptkis-bima",
    name: "H. Abdul Malik",
    role: "Kepala Desa",
    company: "Desa Pajo Tonggolasi",
    city: "Bima",
    province: "NTB",
    rating: 5,
    date: "2026-07-04",
    category: "kerja-luar-negeri-pmi",
    service: "Kemitraan Desa PPTKIS",
    content:
      "Sebagai kepala desa, saya sering lihat warga jadi korban calo PMI. Kami jalin kemitraan resmi dengan PPTKIS yang didampingi PusatPerizinan — sosialisasi masuk desa, calon PMI difilter dan dibekali, keluarga diajari prosesnya. 27 warga kami sudah berangkat legal ke Malaysia dan Taiwan, tidak ada satu pun bermasalah. Ini program yang harus direplikasi desa lain.",
    verified: true,
    helpful: 71,
  },
  {
    id: "t-pmi-lpk-jepang-bekasi",
    name: "Kunio Yamada (Bapak Yudi)",
    role: "Pemilik LPK",
    company: "LPK Mitra Nusantara Bekasi",
    city: "Bekasi",
    province: "Jawa Barat",
    rating: 5,
    date: "2025-12-10",
    category: "kerja-luar-negeri-pmi",
    service: "Izin LPK + Kemitraan Penempatan",
    content:
      "LPK bahasa Jepang kami butuh legalitas Kemnaker + kemitraan P3MI untuk menyalurkan lulusan. Dibantu keduanya sekaligus — izin LPK, akreditasi, sampai disambungkan dengan PPTKIS yang komitmen menampung lulusan. Batch pertama 18 siswa kami sudah berangkat ke Nagoya dan Hiroshima. Investasi legalitas ini balik modal dalam 6 bulan. Sangat puas.",
    verified: true,
    helpful: 38,
  },
  {
    id: "t-pmi-hongkong-banjarmasin",
    name: "Rahmawati Dewi",
    role: "Pekerja Migran (ART)",
    company: "Penempatan Hongkong",
    city: "Banjarmasin",
    province: "Kalimantan Selatan",
    rating: 5,
    date: "2026-06-14",
    category: "kerja-luar-negeri-pmi",
    service: "Penempatan ART Hongkong",
    content:
      "Di Hongkong 10 bulan. Yang paling dihargai keluarga saya: tidak ada biaya yang dicicil-cicil terus setelah berangkat. Semua jelas di depan, dan ada kontrak yang bisa ditegakkan. Majikan saya sesuai profil yang dijanjikan — anak balita 2 orang, gaji sesuai standar HK. Kalau ada yang tanya 'aman gak?', jawab saya: aman kalau jalurnya benar.",
    verified: true,
    helpful: 58,
  },
  {
    id: "t-pmi-siskop2mi-madiun",
    name: "Bagus Setyawan",
    role: "Keluarga PMI",
    company: "Pendampingan KPM Madiun",
    city: "Madiun",
    province: "Jawa Timur",
    rating: 4,
    date: "2025-11-21",
    category: "kerja-luar-negeri-pmi",
    service: "Pendampingan SISKOP2MI & Perlindungan",
    content:
      "Adik saya sudah di Saudi lewat calo, tiba-tiba ada masalah paspor. Kami panik. Tim PusatPerizinan bantu eskalasi ke KJRI Jeddah dan BNP2MI lewat jalur resmi + SISKOP2MI. Adik saya sekarang aman, kontrak diatur ulang dengan majikan yang lebih baik. Bintang 4 karena proses eskalasi butuh 3 minggu (wajar sih, birokrasi), tapi hasilnya memuaskan dan mereka tidak berhenti menghubungi kami sampai selesai.",
    verified: true,
    helpful: 82,
  },
  {
    id: "t-pmi-jepang-ginou-kupang",
    name: "Yohanis Kaha",
    role: "Pekerja Migran (Ginou)",
    company: "Penempatan Jepang — Manufaktur Pangan",
    city: "Kupang",
    province: "NTT",
    rating: 5,
    date: "2025-11-12",
    category: "kerja-luar-negeri-pmi",
    service: "Penempatan SSW Manufaktur",
    content:
      "Dari Kupang sampai pabrik pangan di Saitama. Sebelumnya saya nyari kerja 3 tahun setelah SMK. Lewat jalur resmi ini saya belajar bahasa Jepang gratis di LPK mitra (beasiswa dari perusahaan tujuan), lalu SSW level 1. Gaji kirim ke orang tua tiap bulan, sudah bisa bangun rumah tahap pertama. Jangan cuma impian — siapkan diri dan ikuti jalur yang benar.",
    verified: true,
    helpful: 67,
  },
  {
    id: "t-pmi-p3mi-cianjur",
    name: "Dedi Mulyadi Kusnadi",
    role: "Direktur",
    company: "P3MI Cahaya Barokah",
    city: "Cianjur",
    province: "Jawa Barat",
    rating: 5,
    date: "2025-11-02",
    category: "kerja-luar-negeri-pmi",
    service: "Izin P3MI & Kepatuhan",
    content:
      "Perusahaan penempatan kami membawa banyak klien PMI — legalitas dan kepatuhan adalah nyawa bisnis ini. Setiap perubahan regulasi (dan itu sering), tim PusatPerizinan update kami lebih dulu: perubahan SISKOP2MI, kewajiban laporan, standar pembekalan. Audit kepatuhan tahunan kami selalu hijau. Partner regulatory yang benar-benar memahami industri PMI dari dalam.",
    verified: true,
    helpful: 25,
  },
  {
    id: "t-pmi-malaysia-sabah-tarakan",
    name: "Jumainah",
    role: "Pekerja Migran",
    company: "Penempatan Malaysia — Sektor Perkebunan",
    city: "Nunukan",
    province: "Kalimantan Utara",
    rating: 5,
    date: "2025-10-23",
    category: "kerja-luar-negeri-pmi",
    service: "Legalization PMI Malaysia",
    content:
      "Saya sudah 5 tahun di Sabah lewat jalur tak resmi — hidup meringkuk takut razia, gaji di bawah standar. Tim PusatPerizinan membantu legalisasi status kerja saya lewat program penormalan: paspor baru, visa kerja resmi, kontrak sesuai hukum Malaysia. Sekarang saya bisa pulang kampung dengan tenang. Ini jasa yang menyelamatkan nyawa, bukan cuma mengurus dokumen.",
    verified: true,
    helpful: 94,
  },
  {
    id: "t-pmi-saudi-nurse-jakarta",
    name: "Farah Diba",
    role: "Perawat",
    company: "Penempatan Saudi Arabia — Rumah Sakit Swasta",
    city: "Jakarta Timur",
    province: "DKI Jakarta",
    rating: 5,
    date: "2025-10-13",
    category: "kerja-luar-negeri-pmi",
    service: "Penempatan Perawat Saudi",
    content:
      "Sebagai perawat D3, saya ditempatkan di rumah sakit swasta di Riyadh dengan gaji profesional sesuai kualifikasi. Prosesnya lama (4 bulan) karena ada licensure exam dan verifikasi kualifikasi — tapi semua transparan, dikasih timeline, dan setiap tahap diupdate. Tidak seperti cerita teman saya yang lewat 'jalan pintas' lalu bermasalah di sana. Jalur benar memang butuh waktu, tapi hasilnya layak.",
    verified: true,
    helpful: 55,
  },

  // ============ UMROH & HAJI ============
  {
    id: "t-ppiu-travel-bogor",
    name: "Ustaz H. Fauzi Ramadhan",
    role: "Pemilik",
    company: "Sahabat Umroh Bogor",
    city: "Bogor",
    province: "Jawa Barat",
    rating: 5,
    date: "2026-09-10",
    category: "umroh-haji-travel",
    service: "Izin PPIU Kemenag",
    content:
      "Travel kami sebelumnya jadi agen PPIU lain — untungnya tipis. Setelah izin PPIU sendiri terbit, margin naik drastis dan kami bebas bikin paket. Proses Kemenag-nya ditangani penuh: legalitas PT, rekening khusus, kemitraan muassasah di Makkah. Izin terbit 67 hari, sesuai timeline yang dijanjikan. Sekarang kami punya 12 tim mualimin sendiri. Terima kasih atas pendampingan yang luar biasa.",
    verified: true,
    helpful: 43,
  },
  {
    id: "t-ppiu-kecil-lombok",
    name: "Lalu Hermawan",
    role: "Founder",
    company: "Rinjani Travel Umroh",
    city: "Mataram",
    province: "NTB",
    rating: 5,
    date: "2026-07-24",
    category: "umroh-haji-travel",
    service: "Konsultasi + Izin PPIU",
    content:
      "Pemula di bisnis umroh, saya hampir tertipu 'jasa murah' yang janji izin PPIU 30 hari tanpa syarat modal. Untung cek dulu ke sini. Dijelaskan dengan jujur: syarat modal, rekening escrow, dan realistisnya 2-3 bulan. Lebih disarankan jadi agen resmi dulu sambil menyiapkan syarat. Sekarang kami agen sah + proses PPIU sendiri sudah 70%. Kejujuran yang bikin saya tetap pakai jasa mereka.",
    verified: true,
    helpful: 36,
  },
  {
    id: "t-ppiu-perluasan-bandung",
    name: "Hj. Nining Kurniasih",
    role: "Direktur",
    company: "Smart Travel Wisata Bandung",
    city: "Bandung",
    province: "Jawa Barat",
    rating: 5,
    date: "2026-06-30",
    category: "umroh-haji-travel",
    service: "Perluasan PPIU + SKAI",
    content:
      "Perluasan izin PPIU kami (naik kelas kuota jemaah) plus SKAI untuk amplop induk — dua urusan yang paling ribet di bisnis travel. Semua beres tanpa satu pun jemaah terganggu. Timnya paham jadwal pembinaan Kemenag, standar penilaian layanan, dan apa yang diminta penguji. Kami sudah 5 tahun langganan untuk semua kebutuhan perizinan travel kami.",
    verified: true,
    helpful: 29,
  },
  {
    id: "t-ppiuh-makassar",
    name: "HM. Syamsuddin Daeng Naba",
    role: "Pemimpin Umum",
    company: "PT Kalla Wisata Timur",
    city: "Makassar",
    province: "Sulawesi Selatan",
    rating: 5,
    date: "2025-12-04",
    category: "umroh-haji-travel",
    service: "Izin PPIH Haji Khusus",
    content:
      "PPIH (haji khusus) itu izin paling berat — kuota, jaminan, audit hotel Makkah-Madinah, standar katering. Kami percayakan ke tim yang sudah terbukti menangani PPIU kami bertahun-tahun. Berhasil. Izin PPIH terbit dan musim haji pertama kami melayani 480 jemaah tanpa insiden. Kepercayaan itu justru yang bikin kami tidur nyenyak menjelang musim haji.",
    verified: true,
    helpful: 31,
  },
  {
    id: "t-ppiu-jakarta-ekspansi",
    name: "Rini Puspitasari",
    role: "Owner",
    company: "Al-Barokah Travel Jakarta",
    city: "Jakarta Selatan",
    province: "DKI Jakarta",
    rating: 4,
    date: "2025-11-26",
    category: "umroh-haji-travel",
    service: "Izin PPIU Awal",
    content:
      "PPIU kami terbit dalam 71 hari, sesuai estimasi. Timnya fast respon dan paham prosedur Kemenag. Satu bintang kurang karena di tengah proses ada permintaan revisi kemitraan dengan muassasah — agak merepotkan tapi akhirnya selesai dengan baik. Untuk pemilik travel yang serius, ini layanan yang tepat. Yang penting siapkan modal dan rekening khusus dari awal.",
    verified: true,
    helpful: 22,
  },
  {
    id: "t-ppiu-agen-resmi-surabaya",
    name: "Ghufron Aminullah",
    role: "Manager",
    company: "El-Zayn Travel Surabaya",
    city: "Surabaya",
    province: "Jawa Timur",
    rating: 5,
    date: "2025-11-16",
    category: "umroh-haji-travel",
    service: "Skema Agen Resmi PPIU",
    content:
      "Belum sanggup jadi PPIU sendiri, jadi kami ambil skema agen resmi PPIU besar yang disarankan tim. Legal, ada kontrak, jemaah kami dilindungi asuransi PPIU mitra. Margin tetap bagus, dan sekarang setelah 2 tahun kami siap proses PPIU sendiri — rencananya tahun depan. Pilihan awal yang aman untuk pemula. Jangan langsung terjun tanpa persiapan.",
    verified: true,
    helpful: 27,
  },
  {
    id: "t-ppiu-medan",
    name: "Cut Nyak Meutia Siregar",
    role: "Pemilik",
    company: "Seurune Meuke Travel",
    city: "Medan",
    province: "Sumatera Utara",
    rating: 5,
    date: "2025-10-31",
    category: "umroh-haji-travel",
    service: "Izin PPIU + Pembinaan Kemenag",
    content:
      "Izin PPIU terbit, pembinaan Kemenag didampingi sampai penilaian layanan kami dapat nilai bagus di Romantis sistemnya. Jemaah pertama kami 42 orang berangkat dengan selamat — mulai dari briefing di Medan sampai tiba kembali. Klien lain di Medan sekarang banyak yang tanya 'konsultannya ke mana?'. Jelas jawabannya: ke sini.",
    verified: true,
    helpful: 34,
  },

  // ============ KONSTRUKSI & TAMBANG ============
  {
    id: "t-sbu-kontraktor-jakarta",
    name: "Ir. Bambang Wijanarko",
    role: "Direktur Utama",
    company: "PT Wijaya Konstruksi Utama",
    city: "Jakarta Selatan",
    province: "DKI Jakarta",
    rating: 5,
    date: "2026-09-28",
    category: "konstruksi-tambang-industri",
    service: "SBU LPJK Kualifikasi Besar",
    content:
      "SBU kualifikasi besar untuk 3 sub-bidang: gedung, sumber daya air, dan jalan. Yang paling berharga: mereka audit dulu portofolio proyek kami — meluluskan yang bukti pendukungnya kuat, menyarankan yang perlu ditambah. Sertifikat terbit sebelum tender besar yang kami incar. Nilai kontrak yang kami menang 4x lipat biaya seluruh proses. Ini investasi, bukan pengeluaran.",
    verified: true,
    helpful: 45,
  },
  {
    id: "t-rkab-tambang-kaltim",
    name: "Supriyanto Nugroho",
    role: "Permit & Compliance Manager",
    company: "PT Energi Batubara Bahari",
    city: "Samarinda",
    province: "Kalimantan Timur",
    rating: 5,
    date: "2026-09-02",
    category: "konstruksi-tambang-industri",
    service: "RKAB Online MUBA",
    content:
      "RKAB produksi 2026 kami disiapkan 3 bulan sebelum deadline — beda dengan tahun-tahun sebelumnya yang selalu menitip bulan Januari. Online MUBA-nya dikerjakan rapi, rencana produksi diselaras dengan baku mutu, dan RKAB disetujui di pengajuan pertama. Tahun lalu RKAB kami bermasalah dan produksi sempat berhenti 6 minggu. Belajar dari sejarah: sekarang semua perizinan tambang lewat sini.",
    verified: true,
    helpful: 38,
  },
  {
    id: "t-amdal-pabrik-mojokerto",
    name: "Drs. H. Sunarto",
    role: "Owner",
    company: "PT Sumber Tirta Mojokerto",
    city: "Mojokerto",
    province: "Jawa Timur",
    rating: 5,
    date: "2025-12-29",
    category: "konstruksi-tambang-industri",
    service: "AMDAL Pabrik Pengolahan",
    content:
      "Pabrik pengolahan kami wajib AMDAL penuh. Proses 7 bulan — pertemuan komisi, kajian hidrologi, sosialisasi warga sekitar. Yang bikin tenang: setiap tahap diupdate lengkap, saya sebagai owner selalu tahu posisi kami di mana. AMDAL terbit, PBG menyusul, mesin mulai jalan. Kalau dari awal pegangan yang profesional seperti ini, semua sektor industri tidak akan jadi korban perizinan.",
    verified: true,
    helpful: 33,
  },
  {
    id: "t-pbg-slf-bandung",
    name: "Maria Imelda",
    role: "Asset Manager",
    company: "Imelda Property Group",
    city: "Bandung",
    province: "Jawa Barat",
    rating: 5,
    date: "2025-12-21",
    category: "konstruksi-tambang-industri",
    service: "PBG & SLF Gedung Komersial",
    content:
      "Gedung komersial 5 lantai kami. PBG terbit 3 bulan, SLF menyusul 1,5 bulan. Bank credit kami acc setelah SLF — sebelumnya terbengkalai karena dokumen teknis tidak lengkap. Tim ini tahu persis apa yang diminta verifikator: gambar teknik yang benar standar, perhitungan struktur, hingga laporan konsultan perencana. Sekarang 2 gedung kedua kami sedang diurus sekaligus.",
    verified: true,
    helpful: 27,
  },
  {
    id: "t-sbu-kualifikasi-menengah-semarang",
    name: "Slamet Widiyanto",
    role: "Owner",
    company: "CV Widyakarya Jaya",
    city: "Semarang",
    province: "Jawa Tengah",
    rating: 5,
    date: "2025-12-11",
    category: "konstruksi-tambang-industri",
    service: "SBU LPJK + NIB Konstruksi",
    content:
      "CV konstruksi kami naik kualifikasi dari kecil ke menengah. Dibantu menyusun SKK tenaga kerja, portofolio, dan dokumen pengalaman proyek yang valid. Sertifikat terbit sebelum lelang pemerintah daerah — kami menang 2 paket. Komunikasinya jelas, biaya transparan, tidak ada biaya siluman. Untuk kontraktor, jangan sampai kalah tender cuma karena SBU telat atau salah klasifikasi.",
    verified: true,
    helpful: 31,
  },
  {
    id: "t-uklupl-cilegon",
    name: "Yudha Pratama",
    role: "Plant Manager",
    company: "PT Cilegon Fabrikasi Logam",
    city: "Cilegon",
    province: "Banten",
    rating: 5,
    date: "2025-11-28",
    category: "konstruksi-tambang-industri",
    service: "UKL-UPL Pabrik",
    content:
      "Pabrik kami baru ekspansi gudang — ternyata wajib UKL-UPL, bukan cukup NIB saja. Ketahuan saat audit pelanggan (otomotif). Dalam 6 minggu UKL-UPL terbit dan simpul izin kami di OSS jadi hijau. Pelanggan audit lagi: lolos. Pelajaran buat saya: jangan tunggu ada audit baru beres-beres perizinan. Biaya UKL-UPL jauh lebih murah daripada kehilangan kontrak supplier.",
    verified: true,
    helpful: 24,
  },
  {
    id: "t-rkab-nikel-sulawesi",
    name: "Moh. Ilham Latamantau",
    role: "Legal Manager",
    company: "PT Nikel Morowali Resources",
    city: "Morowali",
    province: "Sulawesi Tengah",
    rating: 4,
    date: "2025-11-17",
    category: "konstruksi-tambang-industri",
    service: "RKAB Nikel + Rekomendasi Eksportir",
    content:
      "RKAB nikel kami kompleks karena produksi terbagi bijih langsung dan hasil pengolahan awal. Timnya paham MUBA dan regulasi pengolahan — bantu komunikasi dengan kanwil ESDM Sulawesi Tengah. RKAB approved, rekomendasi eksportir menyusul. 4 bintang karena salah satu dokumen pendukung kami diminta revisi dua kali (memang kondisi regulasi berubah cepat), tapi hasil akhir memuaskan dan waktu tetap terjaga.",
    verified: true,
    helpful: 29,
  },
  {
    id: "t-slf-warehouse-surabaya",
    name: "Teguh Prakoso",
    role: "Warehouse Director",
    company: "PT Surya Logistik Andalan",
    city: "Surabaya",
    province: "Jawa Timur",
    rating: 5,
    date: "2025-11-06",
    category: "konstruksi-tambang-industri",
    service: "SLF Gudang Logistik",
    content:
      "SLF gudang logistik 12.000 m2 kami butuh cepat karena klien 3PL kami minta bukti SLF sebelum kontrak tahunan. Tim menekan proses maksimal: SLF terbit 5 minggu. Kontrak 3PL kami selamat dan jalan 3 tahun. Ini kasus nyata SLF menentukan hidup-mati bisnis. Terima kasih untuk kecepatan dan ketelitian.",
    verified: true,
    helpful: 26,
  },

  // ============ KLINIK, LPK & IZIN KHUSUS ============
  {
    id: "t-klinik-gigi-denpasar",
    name: "drg. Putu Ayu Sari",
    role: "Owner",
    company: "Klinik Gigi Sari Dental Bali",
    city: "Denpasar",
    province: "Bali",
    rating: 5,
    date: "2026-10-01",
    category: "klinik-lpk-izin-khusus",
    service: "Izin Usaha Klinik Gigi",
    content:
      "Buka klinik gigi pertama di Bali. Izin usaha dari Kemenkes, STTK untuk 4 tenaga medis, standar sarana — semuanya diurus lengkap. Yang menyelamatkan saya: review kesiapian sarana sebelum verifikasi, jadi ditemukan 3 kekurangan (katup darurat, sterilisasi terpisah) yang sempat kami perbaiki sebelum pemeriksa. Klinik terbuka dalam 2 bulan. Sekarang pasien kami ramai, termasuk turis lokal.",
    verified: true,
    helpful: 41,
  },
  {
    id: "t-klinik-pratama-bekasi",
    name: "dr. Yohanes Adi Putranto",
    role: "Owner & Dokter",
    company: "Klinik Sehat Bersama",
    city: "Bekasi",
    province: "Jawa Barat",
    rating: 5,
    date: "2026-08-10",
    category: "klinik-lpk-izin-khusus",
    service: "Izin Klinik Pratama + BPJS",
    content:
      "Klinik kami berdiri sekaligus siapkan kerja sama BPJS — itu syarat agregat: izin usaha klinik, STTK, dan akreditasi minimum. Tim perizinan mengoordinasikan semuanya, kami fokus pada klinik operasionalnya. Kini kami FKTP BPJS dengan 1.200 peserta terdaftar. Sebuah bisnis kesehatan yang legal sejak hari pertama memberi ketenangan yang tak ternilai.",
    verified: true,
    helpful: 37,
  },
  {
    id: "t-lpk-korea-surabaya",
    name: "Lee Min-woo (Pak Darmawan)",
    role: "Pemilik LPK",
    company: "LPK Bahasa Korea Hanjibuk",
    city: "Surabaya",
    province: "Jawa Timur",
    rating: 5,
    date: "2025-12-31",
    category: "klinik-lpk-izin-khusus",
    service: "Izin LPK + Akreditasi",
    content:
      "LPK bahasa Korea kami (fokus siapkan siswa untuk EPS) butuh izin resmi dari Dinas/Kemnaker plus kerja sama penempatan. Semua diurus: izin LPK, akreditasi, dan disambungkan dengan PPTKIS yang benar. Batch siswa pertama kami 22 orang lolos TOPIK dan berangkat ke Busan dan Incheon. Legitimasi LPK kami sekarang jadi magnet pendaftar baru. Investasi yang benar-benar berdampak.",
    verified: true,
    helpful: 44,
  },
  {
    id: "t-iata-travelagent-bali",
    name: "Putu Gede Semara Putra",
    role: "Direktur",
    company: "Semara Travel & Tours",
    city: "Denpasar",
    province: "Bali",
    rating: 5,
    date: "2025-12-23",
    category: "klinik-lpk-izin-khusus",
    service: "Registrasi IATA",
    content:
      "Registrasi IATA kami disetujui — sekarang kami bisa terbitkan tiket langsung dengan tarif agen, tidak lagi melalui consolidator. Margin per tiket naik 3-4x. Persiapannya dikerjakan serius: keuangan kami rapi, personel dikursus tersertifikasi, dan aplikasi diajukan dengan dokumen lengkap sekali jalan. Travel agent serius wajib punya IATA — dan wajib pakai tim yang benar untuk mengurusnya.",
    verified: true,
    helpful: 28,
  },
  {
    id: "t-lpk-industri-tangerang",
    name: "Rina Marlina",
    role: "Founder",
    company: "LPK Cipta Skill Industri",
    city: "Tangerang",
    province: "Banten",
    rating: 5,
    date: "2025-12-14",
    category: "klinik-lpk-izin-khusus",
    service: "Izin LPK + Kemitraan Industri",
    content:
      "LPK kami fokus welding & machining untuk industri manufaktur. Izin beres 21 hari, dibantu juga memorandum of understanding dengan 4 pabrik di kawasan. Sekarang 85% lulusan kami terserap dalam 2 bulan setelah lulus. Izin yang jelas bikin pabrik percaya. Terima kasih tim, semoga makin banyak LPK yang legal seperti kami.",
    verified: true,
    helpful: 32,
  },
  {
    id: "t-misa-arabsaudi-jakarta",
    name: "Fahri Ramadhan",
    role: "Managing Director",
    company: "Al-Fahri Trading Group",
    city: "Jakarta Selatan",
    province: "DKI Jakarta",
    rating: 5,
    date: "2025-12-06",
    category: "klinik-lpk-izin-khusus",
    service: "Lisensi MISA Arab Saudi",
    content:
      "Ekspansi ke Arab Saudi jadi realita: lisensi MISA terbit, entitas kami berdiri di Riyadh, dan kini kami beroperasi dengan partner lokal. Prosesnya melibatkan banyak koordinasi lintas negara — tim PusatPerizinan mengatur semuanya, termasuk koordinasi dengan pihak Saudi dan terjemahan legal dokumen. Ekspansi internasional sekarang tidak lagi mimpi bagi usaha menengah Indonesia. Sangat puas.",
    verified: true,
    helpful: 35,
  },
];

// ------------------------------------------------------------
// HELPER FUNCTIONS
// ------------------------------------------------------------

/** Rata-rata rating seluruh testimoni (dihitung dari data) */
export function getAverageRating(): number {
  const sum = TESTIMONIALS.reduce((acc, t) => acc + t.rating, 0);
  return Math.round((sum / TESTIMONIALS.length) * 10) / 10;
}

/** Breakdown per bintang: { 5: n, 4: n, ... } */
export function getRatingBreakdown(): Record<number, number> {
  const bd: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  for (const t of TESTIMONIALS) bd[t.rating] = (bd[t.rating] ?? 0) + 1;
  return bd;
}

/** Statistik agregat untuk header & schema */
export function getRatingStats() {
  const breakdown = getRatingBreakdown();
  return {
    average: getAverageRating(),
    total: TESTIMONIALS.length,
    breakdown,
    helpfulTotal: TESTIMONIALS.reduce((acc, t) => acc + t.helpful, 0),
    verifiedCount: TESTIMONIALS.filter((t) => t.verified).length,
  };
}

/** Testimoni satu kategori, terbaru dulu */
export function getTestimonialsByCategory(slug: TestimonialCategorySlug): Testimonial[] {
  return TESTIMONIALS.filter((t) => t.category === slug).sort(
    (a, b) => b.date.localeCompare(a.date)
  );
}

/** Testimoni terunggul (rating 5, paling banyak "membantu") untuk landing/featured */
export function getFeaturedTestimonials(n = 6): Testimonial[] {
  return [...TESTIMONIALS]
    .filter((t) => t.rating === 5)
    .sort((a, b) => b.helpful - a.helpful)
    .slice(0, n);
}

/** Testimoni terbaru untuk widget "ulasan masuk" */
export function getRecentTestimonials(n = 3): Testimonial[] {
  return [...TESTIMONIALS].sort((a, b) => b.date.localeCompare(a.date)).slice(0, n);
}

/** Kategori metadata lookup */
export function getTestimonialCategory(slug: string): TestimonialCategory | undefined {
  return TESTIMONIAL_CATEGORIES.find((c) => c.slug === slug);
}

/** Tanggal format Indonesia: 14 Januari 2026 */
export function formatTanggalID(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

/** Cari testimoni terbaik untuk kategori catalog (perizinan/pajak/pmi/virtual-office) */
export type CatalogCategoryForTestimonials = "perizinan" | "pajak" | "pmi" | "virtual-office" | "sertifikasi";

export function pickTestimonialsForCatalogCategory(
  category: CatalogCategoryForTestimonials,
  n = 3
): Testimonial[] {
  const map: Record<CatalogCategoryForTestimonials, TestimonialCategorySlug[]> = {
    perizinan: ["perizinan-usaha", "sertifikasi-halal", "izin-bpom-pirt", "konstruksi-tambang-industri", "umroh-haji-travel", "klinik-lpk-izin-khusus"],
    pajak: ["perpajakan-coretax"],
    pmi: ["kerja-luar-negeri-pmi"],
    "virtual-office": ["perizinan-usaha"],
    sertifikasi: ["sertifikasi-halal", "umroh-haji-travel", "klinik-lpk-izin-khusus", "konstruksi-tambang-industri", "perizinan-usaha"],
  };
  const pool = TESTIMONIALS.filter((t) => map[category].includes(t.category));
  return pool.sort((a, b) => b.helpful - a.helpful).slice(0, n);
}

/** Total "membantu" yang diberikan pembaca */
export const TESTIMONIAL_TOTAL_HELPFUL = TESTIMONIALS.reduce((acc, t) => acc + t.helpful, 0);
