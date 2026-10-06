// ============================================================
// PUSATPERIZINAN.COM — Blog Engine: Artikel Panduan Mendalam
// Konten long-form untuk dominasi long-tail keyword perizinan
// E-E-A-T: penulis ahli, tanggal publikasi/update, FAQ, sumber hukum
// ============================================================

export type BlogCategory =
  | "Panduan"
  | "Biaya & Modal"
  | "Regulasi"
  | "Studi Kasus"
  | "Internasional"
  | "Tambang & Energi"
  | "Travel Ibadah"
  | "Pajak";

export const BLOG_CATEGORIES: BlogCategory[] = [
  "Panduan",
  "Biaya & Modal",
  "Regulasi",
  "Studi Kasus",
  "Internasional",
  "Tambang & Energi",
  "Travel Ibadah",
  "Pajak",
];

export interface BlogSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface BlogFAQ {
  question: string;
  answer: string;
}

export interface BlogArticle {
  slug: string;
  title: string;
  category: BlogCategory;
  excerpt: string;
  readMinutes: number;
  /** YYYY-MM-DD */
  publishedAt: string;
  /** YYYY-MM-DD */
  updatedAt: string;
  author: string;
  authorRole: string;
  keywords: string[];
  sections: BlogSection[];
  faq: BlogFAQ[];
  /** slug artikel blog terkait (harus ada di BLOG_ARTICLES) */
  relatedArticles: string[];
  /** id panduan di seo-content.ts: nib, pt, halal, bpom, oss, pbg, lingkungan, cv, klinik, pma, pajak, ppi-umroh, ppi-haji, iata, saudi-arabia, rkab-tambang */
  relatedGuides: string[];
  /** CTA penutup artikel: text + anchor section (#konsultasi, #kalkulator, #cek-izin, #layanan, #panduan) */
  cta: { text: string; anchor: string };
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: "panduan-nib-oss-rba-2025",
    title: "Panduan Lengkap NIB via OSS-RBA: Syarat, Biaya, dan Langkah demi Langkah",
    category: "Panduan",
    excerpt:
      "NIB adalah legalitas dasar setiap usaha di Indonesia dan kini terbit gratis lewat OSS-RBA. Panduan ini membongkar syarat, level risiko KBLI, dan langkah pendaftarannya langkah demi langkah.",
    readMinutes: 8,
    publishedAt: "2026-01-10",
    updatedAt: "2026-01-14",
    author: "Rizki Mahendra",
    authorRole: "Head of Regulatory Affairs",
    keywords: [
      "cara mengurus NIB untuk usaha baru",
      "NIB OSS RBA 2025",
      "syarat NIB perseorangan",
      "biaya pembuatan NIB gratis",
      "perbedaan NIB dan SIUP",
      "NIB untuk usaha online",
      "level risiko KBLI OSS",
    ],
    sections: [
      {
        heading: "Apa Itu NIB dan Mengapa Jadi Legalitas Wajib Setelah UU Cipta Kerja?",
        paragraphs: [
          "NIB (Nomor Induk Berusaha) adalah identitas resmi satu-satunya untuk setiap pelaku usaha di Indonesia, diterbitkan melalui sistem OSS-RBA (Online Single Submission Risk-Based Approach). Dasar hukumnya adalah UU Cipta Kerja dan PP 5/2021 yang diperbarui lewat Perpres 5/2024. Sejak dihapuskannya SIUP dan TDP, NIB menjadi dokumen tunggal yang menggantikan semuanya.",
          "Yang menarik, NIB bukan sekadar nomor daftar. NIB sekaligus berlaku sebagai NPWP badan usaha, identitas imigrasi untuk perusahaan asing, akses untuk mengurus izin sektoral, dan jaminan kepastian hukum saat bertransaksi. Artinya, tanpa NIB, usaha Anda praktis tidak eksis di mata pemerintah, bank, maupun marketplace.",
        ],
      },
      {
        heading: "Empat Level Risiko KBLI di OSS-RBA yang Menentukan Legalitas Anda",
        paragraphs: [
          "Salah kaprah paling sering kami temui: pelaku usaha mengira NIB terbit berarti legal sepenuhnya. Kenyataannya, legalitas Anda ditentukan oleh level risiko setiap KBLI yang Anda pilih di OSS-RBA.",
        ],
        bullets: [
          "Risiko rendah — cukup NIB, langsung beroperasi",
          "Risiko menengah rendah — NIB plus Sertifikat Standar yang diterbitkan otomatis",
          "Risiko menengah tinggi — NIB plus Sertifikat Standar dengan verifikasi dokumen teknis oleh instansi terkait",
          "Risiko tinggi — NIB plus izin khusus melalui penilaian penuh pemerintah",
        ],
      },
      {
        heading: "Syarat Lengkap NIB untuk Perseorangan dan Badan Hukum",
        paragraphs: [
          "Kabar baiknya, syarat NIB sangat ringan dan bisa dipenuhi dalam satu hari. Untuk pelaku usaha perseorangan — termasuk penjual online, freelancer, dan pemilik warung — Anda tidak perlu badan hukum sama sekali.",
        ],
        bullets: [
          "KTP dan NPWP pribadi pemilik usaha",
          "Alamat usaha lengkap dengan kode pos",
          "Nomor HP aktif dan email yang belum pernah terdaftar di OSS",
          "Untuk PT atau CV: akta pendirian dan SK Kemenkumham",
          "Untuk PMA: dokumen investasi dan paspor pengurus",
        ],
      },
      {
        heading: "Langkah demi Langkah Menerbitkan NIB di OSS-RBA",
        paragraphs: [
          "Proses pendaftarannya sepenuhnya daring, namun ketelitian di setiap langkah menentukan apakah usaha Anda berdiri di atas struktur yang benar atau justru bermasalah di kemudian hari.",
        ],
        bullets: [
          "Pilih KBLI yang paling sesuai aktivitas riil — ini menentukan pajak dan izin lanjutan Anda",
          "Buat akun di portal OSS atas nama pemilik usaha",
          "Lengkapi data identitas, alamat, dan modal usaha",
          "Kirimkan pengajuan NIB dengan kode risiko KBLI yang tepat",
          "Terbitkan NIB dan sertifikat standar bila KBLI Anda berisiko menengah",
          "Catat kewajiban pasca-terbit, terutama LKPM berkala",
        ],
      },
      {
        heading: "Biaya NIB: Gratis dari Pemerintah, Tapi Salah KBLI Bisa Merugikan Jutaan Rupiah",
        paragraphs: [
          "Biaya resmi penerbitan NIB adalah nol rupiah — pemerintah tidak memungut biaya apa pun. Jasa pendampingan profesional seperti yang kami tawarkan mulai Rp 350 ribu bukan untuk membayar sistem, melainkan membayar ketelitian: konsultasi KBLI, pemetaan risiko, dan penataan data agar tidak salah struktur.",
          "Mengapa ketelitian itu mahal nilainya? Karena salah memilih KBLI bisa memindahkan Anda ke skema pajak yang salah, memunculkan izin sektoral yang tidak pernah Anda butuhkan, atau sebaliknya membuat Anda beroperasi tanpa sertifikat standar yang wajib. Perbaikannya di kemudian hari selalu lebih mahal daripada mengatur dengan benar dari awal.",
        ],
      },
      {
        heading: "Kesalahan Umum yang Membuat NIB Bermasalah",
        paragraphs: [
          "Setiap bulan kami menangani kasus NIB yang bermasalah karena dikerjakan tergesa-gesa. Tiga pola paling sering: email yang sudah terpakai sehingga akun tidak bisa dibuat, KBLI yang tidak konsisten dengan aktivitas riil usaha, dan NIB yang terbit namun dibiarkan tanpa LKPM sehingga berisiko dicabut.",
          "Ingat, LKPM (Laporan Kegiatan Penanaman Modal) adalah kewajiban berkala yang berlaku sejak NIB terbit. Melaporkannya itu mudah, tapi melalaikannya bisa membuat NIB Anda masuk daftar bermasalah. Kami selalu memberikan kalender kewajiban di setiap pengurusan NIB.",
        ],
      },
    ],
    faq: [
      {
        question: "Apakah NIB berlaku seumur hidup?",
        answer:
          "Ya, NIB tidak memiliki masa berlaku dan tetap sah selama usaha Anda aktif. Namun NIB bisa dicabut bila Anda lalai memenuhi kewajiban berkala seperti LKPM, atau jika ditemukan data yang tidak sesuai dengan aktivitas usaha riil Anda.",
      },
      {
        question: "Bisakah saya mengurus NIB sendiri tanpa jasa konsultan?",
        answer:
          "Bisa — portal OSS terbuka untuk umum dan gratis. Namun untuk usaha dengan multi-KBLI, rencana ekspansi, atau KBLI berisiko menengah-tinggi, pendampingan meminimalkan kesalahan struktur yang dampaknya mahal di kemudian hari.",
      },
      {
        question: "NIB perseorangan dan NIB PT, apa bedanya?",
        answer:
          "NIB perseorangan terbit atas nama individu dan cocok untuk UMKM tanpa badan hukum, dengan profil pajak PPh final 0,5%. NIB PT terbit atas nama badan hukum setelah akta dan SK Kemenkumham, membuka akses investor, tender, dan kredit bank yang lebih besar.",
      },
    ],
    relatedArticles: ["biaya-mendirikan-pt-2025", "kbli-usaha-kuliner", "pajak-usaha-pemula"],
    relatedGuides: ["nib", "oss"],
    cta: { text: "Cek Izin Usaha Anda Sekarang", anchor: "#cek-izin" },
  },
  {
    slug: "biaya-mendirikan-pt-2025",
    title: "Berapa Biaya Mendirikan PT di 2026? Rincian Lengkap dari Notaris sampai NIB",
    category: "Biaya & Modal",
    excerpt:
      "Banyak yang kaget biaya pendirian PT ternyata jauh lebih terjangkau dari dugaan. Artikel ini merinci semua komponen biaya dari akta notaris, PNBP, sampai NIB — plus biaya terselubung yang sering luput.",
    readMinutes: 7,
    publishedAt: "2026-01-28",
    updatedAt: "2026-02-03",
    author: "Dewi Anggraini",
    authorRole: "Senior Legal Consultant",
    keywords: [
      "biaya pendirian PT 2026",
      "biaya notaris pendirian PT",
      "biaya akta PT",
      "modal dasar minimum PT",
      "PNBP pengesahan badan hukum",
      "syarat PT perseorangan",
      "biaya buat PT untuk usaha kecil",
    ],
    sections: [
      {
        heading: "Komponen Biaya Pendirian PT: dari Meja Notaris sampai SK Kemenkumham",
        paragraphs: [
          "Biaya pendirian PT terdiri dari dua kelompok besar: biaya jasa (terutama honorarium notaris untuk akta pendirian) dan biaya resmi pemerintah. Honorarium notaris umumnya berkisar Rp 1,5-3 juta untuk PT kecil-menengah, bergantung pada besaran modal dan kompleksitas struktur saham.",
          "Di sisi pemerintah, ada PNBP (Penerimaan Negara Bukan Pajak) atas pengesahan badan hukum di Kemenkumham, antara Rp 300 ribu hingga Rp 1 juta tergantung opsi pengumuman di Berita Negara. Selebihnya — NPWP badan dan NIB — kini terbit tanpa biaya apa pun.",
        ],
      },
      {
        heading: "Rincian Biaya Paket Pendirian PT yang Realistis",
        paragraphs: [
          "Berikut komponen yang harus Anda siapkan ketika memakai jasa pendampingan lengkap seperti milik kami:",
        ],
        bullets: [
          "Konsultasi struktur kepemilikan, modal, dan KBLI utama",
          "Reservasi nama PT di sistem AHU Online",
          "Akta notaris: umumnya Rp 1,5-3 juta sesuai modal dan jumlah pemegang saham",
          "PNBP pengesahan SK Kemenkumham: Rp 300 ribu hingga Rp 1 juta",
          "NPWP badan dan NIB: gratis",
          "Paket jasa lengkap kami mulai dari Rp 3,5 juta termasuk akta",
        ],
      },
      {
        heading: "Faktor yang Membuat Harga Notaris Berbeda-beda",
        paragraphs: [
          "Dua PT dengan modal sama bisa kena harga akta yang berbeda. Faktor pertama adalah jumlah dokumen: PT dengan banyak pemegang saham, akta pengikat saham, atau klausul khusus antar-investor membutuhkan waktu notaris lebih panjang. Faktor kedua adalah lokasi — tarif notaris di Jakarta cenderung lebih tinggi daripada kota lain.",
          "Waspada juga tawaran akta super murah yang berujung akta minimalis. Ketika Anda nanti masuk investor, buka cabang, atau ubah komposisi saham, akta yang tidak lengkap justru memaksa perubahan akta yang lebih mahal.",
        ],
      },
      {
        heading: "Biaya Setelah PT Berdiri yang Sering Dilupakan Pendiri",
        paragraphs: [
          "Pendirian PT baru babak pertama. Beberapa kewajiban tahunan ini masuk anggaran Anda setelah badan hukum sah:",
        ],
        bullets: [
          "Laporan keterkinian dan laporan tahunan ke Kemenkumham",
          "PBG/SLF untuk kantor atau tempat usaha",
          "Rekening korporat dan administrasi perbankan usaha",
          "SPPKP bila transaksi B2B Anda butuh faktur pajak",
          "LKPM dan laporan pajak bulanan serta tahunan",
        ],
      },
      {
        heading: "PT Lokal, PT Perseorangan, atau PMA: Mana yang Paling Pas?",
        paragraphs: [
          "Untuk pendiri WNI dengan modal tipis, PT Perseorangan yang diperkenalkan UU Cipta Kerja dan diatur lebih lanjut Perpres 39/2024 patut dipertimbangkan: satu pemegang saham, proses sederhana, dan cocok untuk usaha mikro-kecil. PT standar butuh minimal dua pemegang saham dengan modal dasar minimal Rp 50 juta.",
          "Adapun PMA — PT dengan pemegang saham asing — menuntut rencana investasi minimal Rp 10 miliar di luar tanah dan bangunan per KBLI. Pilih struktur ini berdasarkan rencana 3-5 tahun, bukan sekadar biaya pendirian termurah hari ini.",
        ],
      },
    ],
    faq: [
      {
        question: "Berapa modal minimum untuk mendirikan PT lokal?",
        answer:
          "Secara hukum, modal dasar PT minimal Rp 50 juta dengan minimal 25% modal disetor — praktis sekitar Rp 12,5 juta. Beberapa sektor memiliki ketentuan modal khusus, jadi selalu cek KBLI Anda sebelum menetapkan angka di akta.",
      },
      {
        question: "Apakah PT bisa didirikan sendirian?",
        answer:
          "Ya, melalui skema PT Perseorangan yang diatur Perpres 39/2024 untuk usaha mikro dan kecil. Namun begitu Anda berencana memasukkan mitra atau investor, struktur PT standar dengan dua pemegang saham lebih fleksibel.",
      },
      {
        question: "Berapa lama proses pendirian PT sampai NIB terbit?",
        answer:
          "Dengan dokumen lengkap, 3-7 hari kerja: satu hari reservasi nama dan akta, satu-dua hari pengesahan SK, lalu NPWP badan dan NIB terbit menyusul hampir otomatis.",
      },
    ],
    relatedArticles: ["panduan-nib-oss-rba-2025", "pma-vs-pt-lokal", "pajak-usaha-pemula"],
    relatedGuides: ["pt", "nib"],
    cta: { text: "Hitung Biaya Perizinan Anda", anchor: "#kalkulator" },
  },
  {
    slug: "kbli-usaha-kuliner",
    title: "KBLI untuk Usaha Kuliner: 56101, 56102, dan Kode Lain yang Wajib Anda Tahu",
    category: "Regulasi",
    excerpt:
      "Salah pilih KBLI di usaha kuliner bisa berarti salah pajak dan salah izin. Kenali perbedaan KBLI 56101, 56102, 56303, dan kode pelengkap lain yang menentukan izin halal hingga PIRT sebelum NIB terbit.",
    readMinutes: 6,
    publishedAt: "2026-02-14",
    updatedAt: "2026-02-20",
    author: "Fajar Nugroho",
    authorRole: "Business Licensing Specialist",
    keywords: [
      "KBLI usaha kuliner",
      "KBLI 56101",
      "KBLI 56102",
      "KBLI kedai kopi 56303",
      "KBLI untuk jualan online makanan",
      "KBLI restoran dan rumah makan",
      "izin usaha kuliner rumahan",
    ],
    sections: [
      {
        heading: "Mengapa KBLI Menentukan Nasib Izin dan Pajak Usaha Kuliner Anda",
        paragraphs: [
          "KBLI (Klasifikasi Baku Lapangan Usaha Indonesia) adalah kode lima digit yang menerjemahkan aktivitas usaha Anda ke dalam bahasa sistem perizinan pemerintah. Setiap KBLI membawa level risiko, persyaratan izin, dan implikasi pajak yang berbeda di OSS-RBA.",
          "Untuk usaha kuliner, pilihan KBLI menentukan apakah Anda cukup memakai NIB plus sertifikat standar, atau butuh izin sektoral tambahan. Salah kode bisa membuat warung Anda dianggap pabrik, atau sebaliknya — restoran Anda beroperasi tanpa dokumen yang seharusnya wajib.",
        ],
      },
      {
        heading: "KBLI 56101 dan 56102: Restoran dan Rumah Makan",
        paragraphs: [
          "KBLI 56101 mencakup restoran yang menyajikan makanan dan minuman lengkap dengan tempat duduk serta pelayanan — konsep pengalaman makan penuh. KBLI 56102 adalah rumah makan dan kedai makan yang lebih sederhana, termasuk warung dengan pelayanan terbatas.",
          "Keduanya umumnya berada pada risiko menengah rendah di OSS sehingga cukup NIB plus sertifikat standar. Namun begitu Anda menyajikan produk makanan dan minuman, kewajiban sertifikasi halal tetap mengejar Anda sesuai UU JPH 33/2014 — terlepas dari KBLI mana yang Anda pilih.",
        ],
      },
      {
        heading: "KBLI 56303 untuk Kedai Minuman: Kode Andalan Kafe dan Kedai Kopi",
        paragraphs: [
          "Jika bisnis Anda berfokus minuman — kafe, kedai kopi, boba, sampai kedai teh — KBLI 56303 (kedai minuman) adalah kode utamanya. Banyak pemilik kafe baru sadar pentingnya kode ini saat mengurus sertifikat halal atau bermitra dengan aplikasi pengantar makanan.",
          "Kafe yang juga menjual makanan berat idealnya mengambil kombinasi 56303 dan 56102 sekaligus. Portofolio KBLI yang jujur terhadap aktivitas riil membuat pengurusan izin lanjutan, audit halal, hingga pemeriksaan pajak berjalan tanpa gesekan.",
        ],
      },
      {
        heading: "KBLI Produksi dan Penjualan: 107xx, Katering, dan Marketplace Makanan",
        paragraphs: [
          "Menu kemasan siap jual punya dunia perizinan sendiri. Pahami pemisahan ini sejak awal:",
        ],
        bullets: [
          "KBLI 107xx — industri pengolahan makanan, wajib untuk produksi makanan kemasan sendiri dan bisa memunculkan kewajiban PIRT atau MD BPOM",
          "KBLI 56231 — jasa katering untuk pesanan acara dan kontrak boga kantor",
          "KBLI 47xxx — perdagangan eceran, termasuk penjualan makanan minuman melalui marketplace dan media daring",
        ],
      },
      {
        heading: "Cara Menyusun Kombinasi KBLI yang Tepat Tanpa Membengkakkan Pajak",
        paragraphs: [
          "Prinsip dasarnya: aktivitas produksi dan aktivitas penjualan punya KBLI berbeda. Membuat kopi racik kemasan di dapur yang sama dengan kedai Anda tetap menuntut kode industri pengolahan agar izin edar produk bisa terbit. Kesalahan umum lain adalah mengambil belasan KBLI asal lengkap — padahal setiap KBLI bisa membawa kewajiban dokumentasi tersendiri dan mempengaruhi profil omzet Anda.",
          "Rumus praktis kami: satu KBLI utama yang mencerminkan pendapatan terbesar, plus satu-dua KBLI pelengkap yang benar-benar akan dijalankan dalam 12 bulan. Susun ini bersama konsultan sebelum NIB terbit — memperbaiki KBLI setelah izin lanjutan berjalan jauh lebih ribet daripada memilihnya benar dari awal, dan kombinasi yang salah bisa mengacaukan penghitungan PPh final 0,5% maupun kebijakan PKP Anda ke depan.",
        ],
      },
    ],
    faq: [
      {
        question: "Apa beda KBLI 56101 dan 56102?",
        answer:
          "Keduanya sama-sama menyajikan makanan di tempat, namun 56101 menempatkan diri sebagai restoran dengan pelayanan lengkap, sedangkan 56102 untuk rumah makan atau kedai makan dengan pelayanan lebih sederhana. Untuk sebagian besar izin, keduanya diperlakukan serupa pada level risiko menengah rendah.",
      },
      {
        question: "Warung kecil apakah wajib sertifikat halal?",
        answer:
          "Ya. UU JPH 33/2014 mewajibkan produk makanan dan minuman yang beredar, termasuk dari usaha kecil. Kabar baiknya, UMKM bisa mengajukan kuota subsidi SEHATI sehingga sertifikasinya gratis.",
      },
      {
        question: "Berapa banyak KBLI yang sebaiknya saya ambil?",
        answer:
          "Satu KBLI utama plus satu-dua pelengkap yang riil akan dijalankan. KBLI terlalu banyak justru menambah beban dokumen dan membingungkan profil pajak usaha Anda.",
      },
    ],
    relatedArticles: ["panduan-nib-oss-rba-2025", "izin-halal-umkm-gratis", "studi-kasus-kafe-bandung-45-hari"],
    relatedGuides: ["nib", "halal", "bpom"],
    cta: { text: "Konsultasi Gratis 15 Menit", anchor: "#konsultasi" },
  },
  {
    slug: "pma-vs-pt-lokal",
    title: "PMA vs PT Lokal: Panduan Lengkap Investor Asing Membangun Bisnis di Indonesia",
    category: "Panduan",
    excerpt:
      "Investor asing sering ditawari jalur PT lokal yang sebenarnya berisiko hukum. Artikel ini membedah perbedaan PMA dan PT lokal dari kepemilikan saham, modal, hingga kepatuhan operasional.",
    readMinutes: 8,
    publishedAt: "2026-03-05",
    updatedAt: "2026-03-10",
    author: "Rizki Mahendra",
    authorRole: "Head of Regulatory Affairs",
    keywords: [
      "perbedaan PMA dan PT lokal",
      "syarat pendirian PMA Indonesia",
      "modal minimum PMA 10 miliar",
      "PT untuk investor asing",
      "jalur nominee PT berisiko",
      "KITAS direksi PMA",
      "LKPM PMA berkala",
    ],
    sections: [
      {
        heading: "Definisi Dasar: Apa Sebenarnya Bedanya PT Lokal dan PMA?",
        paragraphs: [
          "PT lokal adalah perseroan yang seluruh sahamnya dimiliki WNI atau badan hukum Indonesia, diatur UU 40/2007 tentang Perseroan Terbatas. Sementara PMA (Penanaman Modal Asing) adalah PT yang didirikan atau disertai pemegang saham asing, diatur UU 25/2007 dan PP 8/2021.",
          "Keduanya sama-sama badan hukum dengan perlindungan aset yang terpisah dari kekayaan pribadi. Perbedaannya terletak pada siapa yang boleh memegang saham, berapa modal yang dituntut, dan kewajiban kepatuhan yang mengikuti status investor.",
        ],
      },
      {
        heading: "Kepemilikan Saham: 100% Asing Bisa, Tapi Periksa Bidang Usahanya Dulu",
        paragraphs: [
          "Sejak Perpres 10/2021 beserta perubahannya (Perpres 49/2021), Indonesia mengganti sistem daftar negatif investasi dengan pendekatan prioritas. Praktisnya: banyak sektor kini terbuka penuh bagi kepemilikan asing 100%, sebagian menuntut patungan dengan mitra lokal, dan segelintir bidang tetap tertutup.",
          "Karena pengecekannya dilakukan KBLI demi KBLI, dua perusahaan yang terlihat serupa bisa punya aturan kepemilikan berbeda. Due diligence KBLI adalah langkah pertama yang tidak boleh dilewati sebelum menyusun struktur saham PMA.",
        ],
      },
      {
        heading: "Modal: Angka Rp 10 Miliar Bukan Sekadar Formalitas di Akta",
        paragraphs: [
          "Inilah perbedaan paling kentara. PMA menuntut rencana investasi total minimal Rp 10 miliar di luar tanah dan bangunan untuk setiap KBLI 5-digit, dengan komitmen modal disetor yang harus terealisasi sesuai jadwal di OSS.",
          "Bandingkan dengan PT lokal yang modal dasarnya minimal Rp 50 juta. Banyak pendiri PMA menganggap angka 10 miliar sebagai tulisan di akta — padahal keterlambatan realisasi bisa berujung sanksi administratif hingga pencabutan NIB dan kesulitan perpanjangan KITAS direksi.",
        ],
      },
      {
        heading: "Imigrasi, Rekrutmen, dan Kewajiban Berkala: Perbedaan di Arena Operasional",
        paragraphs: [
          "Setelah berdiri, kewajiban harian kedua struktur berjalan pada laju yang berbeda:",
        ],
        bullets: [
          "PMA memfasilitasi KITAS untuk direksi asing dan tenaga kerja asing (TKA) setelah RPTKA disetujui",
          "PMA wajib melaporkan LKPM berkala ke Kementerian Investasi/BKPM",
          "PT lokal hanya merekrut WNI dan tidak melewati proses imigrasi",
          "Keduanya sama-sama wajib kepatuhan pajak dan laporan tahunan Kemenkumham",
        ],
      },
      {
        heading: "Jebakan Jalur Nominee dan Cara Memilih Struktur yang Benar",
        paragraphs: [
          "Jalur nominee — asing menyembunyikan kepemilikan di balik nama WNI dengan perjanjian sampingan — masih ditawarkan pihak-pihak nakal. Faktanya, perjanjian itu tidak sah secara hukum: pengadilan akan melihat akta resmi, dan aset Anda bisa lepas ke pemilik di atas kertas.",
          "Aturannya sederhana. Jika ada pemegang saham asing, wujudkan sebagai PMA yang benar dengan anggaran yang sehat. Jika seluruh pendiri WNI dan tidak ada rencana masuknya asing, PT lokal adalah pilihan yang lebih ringan. Kami sering membantu konversi PT lokal menjadi PMA saat investor akhirnya masuk — prosesnya ada, tapi lebih mahal daripada menyusunnya benar sejak hari pertama. Anggarkan pula biaya kepatuhan tahunan PMA yang lebih tinggi karena lapisan imigrasi dan pelaporan investasi, bukan setelah izin terbit.",
        ],
      },
    ],
    faq: [
      {
        question: "Apakah orang asing boleh memegang saham PT lokal?",
        answer:
          "Tidak boleh. Kehadiran pemegang saham asing otomatis mengubah status perseroan menjadi PMA yang harus didirikan sesuai rezim investasi. Skema nominee yang menampung asing di balik nama WNI tidak sah dan sangat berisiko terhadap aset Anda.",
      },
      {
        question: "Berapa modal minimum pendirian PMA?",
        answer:
          "Rencana investasi minimal Rp 10 miliar di luar tanah dan bangunan per KBLI 5-digit, dengan modal disetor yang wajib terealisasi sesuai komitmen di OSS. Angka final per KBLI sebaiknya diverifikasi lewat due diligence sebelum akta dibuat.",
      },
      {
        question: "Apakah PMA wajib punya direktur WNI?",
        answer:
          "Tidak ada kewajiban direktur WNI dalam struktur PMA. Direktur asing boleh menjabat dengan memegang izin tinggal (ITAS/KITAS) yang kami urus bersamaan dengan pendirian perseroan.",
      },
    ],
    relatedArticles: ["biaya-mendirikan-pt-2025", "panduan-nib-oss-rba-2025", "pajak-usaha-pemula"],
    relatedGuides: ["pma", "pt"],
    cta: { text: "Konsultasi Gratis 15 Menit", anchor: "#konsultasi" },
  },
  {
    slug: "izin-halal-umkm-gratis",
    title: "Sertifikasi Halal Gratis untuk UMKM: Syarat SEHATI dan Cara Mendaftarnya",
    category: "Panduan",
    excerpt:
      "Sertifikasi halal kini wajib, tapi UMKM bisa mendapatkannya gratis lewat program SEHATI BPJPH. Ini syarat lengkapnya, jalur self-declare, dan langkah pendaftaran di SIHALAL.",
    readMinutes: 6,
    publishedAt: "2026-03-24",
    updatedAt: "2026-03-30",
    author: "Dewi Anggraini",
    authorRole: "Senior Legal Consultant",
    keywords: [
      "sertifikasi halal gratis UMKM",
      "program SEHATI BPJPH",
      "syarat sertifikat halal self declare",
      "cara daftar SIHALAL",
      "kewajiban sertifikat halal 2024",
      "biaya sertifikasi halal produk",
      "sertifikat halal untuk warung",
    ],
    sections: [
      {
        heading: "Sertifikasi Halal Kini Wajib: Tenggat yang Tidak Bisa Diabaikan",
        paragraphs: [
          "Berdasarkan UU Jaminan Produk Halal No. 33/2014 dan implementasinya lewat PP 42/2024, produk makanan dan minuman yang diperdagangkan di Indonesia wajib bersertifikat halal. Kewajiban ini sudah berlaku untuk makanan-minuman sejak 17 Oktober 2024 dan diperluas bertahap ke kategori lain.",
          "Tanpa sertifikat halal, produk Anda rentan tersenggol dari rak toko, ditolak marketplace, dan kehilangan kepercayaan konsumen Muslim yang justru mayoritas pasar Anda. Kabar baiknya, pemerintah memahami beban UMKM — dan jawabannya adalah program SEHATI.",
        ],
      },
      {
        heading: "Apa Itu SEHATI dan Siapa yang Berhak Mendaftar?",
        paragraphs: [
          "SEHATI (Sertifikasi Halal Gratis) adalah program subsidi penuh dari BPJPH yang menanggung seluruh biaya sertifikasi untuk UMKM: pendampingan, pemeriksaan, hingga penerbitan sertifikat. Ada dua jalurnya: SEHATI Mandiri untuk produk berisiko rendah dengan bahan yang sudah tercatat halal, dan SEHATI Dipandang untuk UMKM yang butuh pendamping proses produk halal (PPH).",
          "Syarat kuncinya: usaha Anda tergolong UMKM, memiliki NIB, dan produknya layak diaudit. Kuota tersedia tiap periode sesuai anggaran pemerintah — jadi makin cepat mendaftar, makin besar peluang klaim subsidi.",
        ],
      },
      {
        heading: "Syarat Lengkap Mengajukan Sertifikasi Halal Gratis",
        paragraphs: [
          "Sebelum mendaftar, pastikan dokumen dan kondisi usaha Anda memenuhi ini:",
        ],
        bullets: [
          "NIB aktif atas nama usaha Anda",
          "Akun SIHALAL yang terhubung dengan data usaha",
          "Daftar seluruh bahan baku beserta bukti kehalalannya — untuk jalur mandiri, bahan harus sudah tercatat halal di sistem",
          "Deskripsi proses produksi sederhana (materi PPH)",
          "Fasilitas produksi yang siap diperiksa, sekecil dapur rumahan pun bisa",
        ],
      },
      {
        heading: "Langkah demi Langkah: dari SIHALAL sampai Sertifikat Terbit",
        paragraphs: [
          "Alur sertifikasi halal UMKM sebenarnya dirancang sederhana:",
        ],
        bullets: [
          "Buat akun SIHALAL dan lengkapi profil usaha",
          "Ajukan pengurusan halal dan pilih jalur mandiri atau dipandang",
          "Unggah daftar bahan dan susun dokumen PPH (Proses Produk Halal)",
          "Ikuti pemeriksaan oleh auditor LPH atau pemeriksaan pendamping",
          "Menunggu sidang penetapan lalu terbitkan sertifikat dan label halal",
        ],
      },
      {
        heading: "Biaya di Luar Kuota dan Kendala yang Paling Sering Terjadi",
        paragraphs: [
          "Bila kuota SEHATI sudah habis, sertifikasi reguler menanggung biaya pemeriksaan LPH yang bervariasi menurut jumlah produk. Jasa pendampingan penuh seperti milik kami mulai Rp 1,2 juta — mencakup audit bahan, penyusunan PPH, sampai koordinasi audit. Sertifikat yang terbit berlaku empat tahun; sebelum habis, wajib ada recertification dan kami biasanya mengingatkan klien tiga bulan sebelum tenggat agar label halal tidak putus sedetik pun.",
          "Kendala nomor satu UMKM adalah bahan baku yang belum tercatat halal di sistem. Karena itu audit bahan dilakukan lebih dulu sebelum pengajuan — mengubah urutan ini adalah resep pengajuan macet. Kendala kedua: dokumen PPH yang tertulis asal, sehingga gugur saat pemeriksaan. Auditor menghargai deskripsi proses yang jujur dan realistis jauh lebih dari dokumen yang tampak sempurna tapi tidak mencerminkan dapur Anda.",
        ],
      },
    ],
    faq: [
      {
        question: "Berapa lama sertifikat halal terbit?",
        answer:
          "Untuk jalur UMKM bersubsidi, umumnya 14-30 hari kerja sejak dokumen lengkap, tergantung jadwal pemeriksaan di wilayah Anda. Jalur mandiri dengan bahan yang sudah tercatat halal bisa lebih cepat.",
      },
      {
        question: "Apakah sertifikat halal berlaku selamanya?",
        answer:
          "Tidak — sertifikat halal berlaku 4 tahun dan wajib direcertification sebelum habis. Selama masa berlaku, proses produksi dan bahan baku juga harus tetap konsisten dengan yang diaudit.",
      },
      {
        question: "Toko yang hanya menjual produk orang lain perlu sertifikat halal?",
        answer:
          "Kewajiban utama melekat pada produsen dan pengolah. Namun penyedia jasa boga seperti katering dan restoran yang mengolah makanan juga wajib bersertifikat. Untuk toko ritel yang murni menjual ulang, pastikan produk yang Anda pasang punya label halal resmi dari produsennya.",
      },
    ],
    relatedArticles: ["kbli-usaha-kuliner", "panduan-nib-oss-rba-2025", "studi-kasus-kafe-bandung-45-hari"],
    relatedGuides: ["halal", "bpom"],
    cta: { text: "Cek Izin Usaha Anda Sekarang", anchor: "#cek-izin" },
  },
  {
    slug: "izin-usaha-arab-saudi-misa",
    title: "Buka Usaha di Arab Saudi: Panduan Lengkap MISA License untuk Pengusaha Indonesia",
    category: "Internasional",
    excerpt:
      "Era Vision 2030, Arab Saudi membuka 100% kepemilikan asing di banyak sektor tanpa wajib mitra lokal. Pelajari alur MISA License, Commercial Registration, sampai ZATCA dalam panduan ini.",
    readMinutes: 8,
    publishedAt: "2026-04-14",
    updatedAt: "2026-04-20",
    author: "Fajar Nugroho",
    authorRole: "Business Licensing Specialist",
    keywords: [
      "cara buka usaha di arab saudi",
      "MISA license untuk investor Indonesia",
      "commercial registration arab saudi",
      "100% foreign ownership arab saudi",
      "izin investasi vision 2030",
      "biaya mendirikan perusahaan di arab saudi",
      "ZATCA dan iqama pengusaha",
    ],
    sections: [
      {
        heading: "Mengapa Arab Saudi Sekarang? Konteks Vision 2030",
        paragraphs: [
          "Arab Saudi sedang menjalani transformasi ekonomi terbesar dalam sejarahnya. Lewat Vision 2030, Kerajaan membuka sektor-sektor yang dulu tertutup, membangun proyek raksasa seperti NEOM, dan menarik investor asing dengan reformasi perizinan yang agresif — termasuk kepemilikan asing penuh di banyak bidang usaha.",
          "Bagi pengusaha Indonesia, daya tariknya konkret: pasar konsumen besar dan muda, jutaan jamaah Indonesia setiap tahun, serta gelombang proyek konstruksi dan energi. Yang berubah bukan hanya peluangnya, tapi juga kemudahan legal untuk masuk.",
        ],
      },
      {
        heading: "MISA License: Pintu Masuk Legal Investor Asing",
        paragraphs: [
          "Langkah pertama adalah MISA License — lisensi investasi dari Ministry of Investment Saudi Arabia. Dokumen ini yang mengizinkan entitas asing beroperasi, dan sejak reformasi, sebagian besar sektor tidak lagi menuntut mitra lokal sehingga Anda bisa memegang 100% saham.",
          "Pengajuan dilakukan elektronik lewat portal MISA: data pemegang saham, rencana investasi singkat, dan pemilihan aktivitas usaha sesuai kode ISIC Saudi. Perlu dicermati, pemetaan aktivitas dari KBLI Indonesia ke ISIC Saudi harus tepat — kesalahan di sini mengubah persyaratan lisensi Anda di kemudian hari.",
        ],
      },
      {
        heading: "Dari MISA sampai CR: Alur Lengkap Pendirian Entitas Saudi",
        paragraphs: [
          "Setelah lisensi MISA terbit, pendirian entitas berjalan lewat rantai dokumen berikut:",
        ],
        bullets: [
          "Commercial Registration (CR) dari Ministry of Commerce — identitas resmi perusahaan Anda di Saudi",
          "Registrasi ZATCA untuk kewajiban pajak dan sistem e-invoice",
          "Keanggotaan Chamber of Commerce untuk legalisasi dokumen dagang",
          "Registrasi GOSI sebagai jaminan sosial karyawan",
          "Iqama untuk General Manager atau direksi beserta pembukaan rekening korporat",
        ],
      },
      {
        heading: "Dokumen Indonesia yang Harus Dialihkatulkan: Jalur Apostille",
        paragraphs: [
          "Akta pendirian PT Anda, SK Kemenkumham, dan NIB menjadi fondasi dokumen pengajuan MISA. Semuanya harus diterjemahkan resmi lalu dialihkatulkan. Untungnya, Arab Saudi kini sudah menerima jalur apostille — jauh lebih cepat daripada legalisasi konsuler cara lama.",
          "Persiapkan juga paspor seluruh pemegang saham dan direksi, serta alamat kantor di Saudi — banyak sektor memperbolehkan mulai dari serviced office sebelum Anda menyewa kantor penuh. Mayoritas tahap bisa diurus dari Jakarta dengan power of attorney, jadi Anda tidak perlu bolak-balik ke Riyadh selama proses berjalan.",
        ],
      },
      {
        heading: "Biaya, Timeline, dan Insentif RHQ Riyadh",
        paragraphs: [
          "Dari sisi biaya, ada dua komponen: jasa pendampingan (paket internasional kami mulai Rp 45 juta) dan biaya resmi pemerintah Saudi dalam riyal — berbeda-beda menurut jenis entitas dan aktivitas. Seluruh alur MISA sampai CR memakan waktu 60-120 hari sampai perusahaan siap operasional.",
          "Satu peluang yang sering luput: program Regional Headquarters (RHQ). Perusahaan yang menempatkan kantor regionalnya di Riyadh bisa menikmati insentif pajak hingga 30 tahun plus akses kontrak pemerintah. Jika rencana ekspansi Anda regional, diskusikan struktur RHQ sejak pengajuan MISA — bukan setelah entitas berdiri.",
        ],
      },
    ],
    faq: [
      {
        question: "Apakah masih wajib punya mitra lokal di Arab Saudi?",
        answer:
          "Di sebagian besar sektor, tidak lagi — lewat MISA License Anda bisa memegang 100% kepemilikan asing. Sektor tertentu masih punya batasan, jadi selalu cek daftar kegiatan Anda sebelum menyusun struktur.",
      },
      {
        question: "Apakah saya harus tinggal di Saudi selama proses pengurusan?",
        answer:
          "Tidak harus. Mayoritas tahap MISA dan CR bisa dikerjakan elektronik dari Jakarta dengan power of attorney. Kunjungan fisik biasanya baru diperlukan untuk penerbitan Iqama direksi dan pembukaan rekening korporat.",
      },
      {
        question: "Berapa total biaya membuka perusahaan di Arab Saudi?",
        answer:
          "Tergantung sektor dan struktur, namun komponennya selalu sama: jasa pendampingan, biaya resmi pemerintah Saudi (MISA, CR, ZATCA, GOSI, Iqama), dan operasional awal. Kami susun rincian transparan sejak konsultasi pertama agar tidak ada biaya kejutan.",
      },
    ],
    relatedArticles: ["pma-vs-pt-lokal", "registrasi-iata-biro-perjalanan"],
    relatedGuides: ["saudi-arabia"],
    cta: { text: "Konsultasi Gratis 15 Menit", anchor: "#konsultasi" },
  },
  {
    slug: "cara-membuka-travel-umroh-ppiu",
    title: "Cara Membuka Travel Umroh Legal: Syarat PPIU, SIPU, dan SIMPONI",
    category: "Travel Ibadah",
    excerpt:
      "Menjual paket umroh tanpa SIPU adalah kejahatan perjalanan ibadah palsu. Pelajari jalur legal lengkapnya: pendirian PT, SPPU, SIPU, rekening kolektif jamaah, sampai sistem SIMPONI.",
    readMinutes: 8,
    publishedAt: "2026-05-04",
    updatedAt: "2026-05-08",
    author: "Rizki Mahendra",
    authorRole: "Head of Regulatory Affairs",
    keywords: [
      "syarat menjadi PPIU resmi",
      "cara buka travel umroh legal",
      "beda SPPU dan SIPU",
      "rekening kolektif jamaah",
      "izin umroh Kemenag",
      "modal disetor PPIU",
      "sistem SIMPONI Kemenag",
    ],
    sections: [
      {
        heading: "Legalitas Travel Umroh: Garis Pemisah Bisnis dan Pidana",
        paragraphs: [
          "Bisnis travel umroh adalah salah satu sektor paling sensitif regulasinya, karena yang dipercayakan kepada Anda adalah dana jamaah dan ibadah mereka. Hukumnya tegas: perusahaan yang menyelenggarakan perjalanan umroh tanpa izin PPIU dapat dijerat pidana penyalahgunaan jamaah.",
          "Kasus travel umroh fiktif yang berulang membuat Kemenag memperketat pengawasan — dan justru menjadi peluang bagi pelaku yang legalitasnya rapi. Jamaah kini aktif mengecek legalitas travel di sistem resmi Kemenag sebelum transfer uang sepeser pun.",
        ],
      },
      {
        heading: "Fondasi Pertama: PT, Modal Disetor, dan Kantor Fisik",
        paragraphs: [
          "PPIU hanya bisa berbadan hukum PT — perseorangan dan CV tidak diterima. Pendirian PT travel memakan waktu 3-7 hari kerja, disusul NIB yang menandai usaha Anda resmi di OSS.",
          "Selanjutnya: modal disetor sesuai ketentuan Kemenag provinsi tempat kantor Anda berada — kisarannya mulai Rp 100 juta dan di sejumlah wilayah menuntut lebih tinggi hingga ratusan juta rupiah. Kantor usaha fisik yang layak juga wajib, karena tim Kemenag melakukan verifikasi kantor secara langsung.",
        ],
      },
      {
        heading: "SPPU, SIPU, dan SIMPONI: Memahami Sistem Kemenag",
        paragraphs: [
          "Legalitas PPIU berjalan dua tahap. Tahap pertama adalah SPPU (Surat Pendaftaran Perjalanan Umrah) — status pendaftaran resmi Anda di Kemenag provinsi, saat ini travel Anda terdaftar tapi belum boleh berangkatkan jamaah. Tahap kedua adalah SIPU (Surat Izin Perjalanan Umrah) — izin operasional penuh untuk menjual dan memulangkan paket umroh.",
          "Keduanya terekam dan diperbarui berkala melalui SIMPONI, sistem informasi penyelenggaraan umrah dan haji milik Kemenag. Sementara e-Katalog Kemenag menjadi etalase resmi tempat jamaah mencari travel yang legal — masuk e-Katalog adalah target setiap PPIU baru dan hanya bisa dicapai dengan legalitas yang benar.",
        ],
      },
      {
        heading: "Syarat Teknis yang Sering Menggugurkan Pengajuan",
        paragraphs: [
          "Pengalaman kami, empat hal ini paling sering membuat pengajuan PPIU macet:",
        ],
        bullets: [
          "Rekening kolektif jamaah belum dibuka di bank yang bekerja sama dengan Kemenag",
          "Kontrak kerja sama dengan maktab atau operator di Arab Saudi belum ditandatangani",
          "Pembimbing ibadah belum bersertifikat kompetensi",
          "Itinerary dan paket perjalanan tidak konsisten dengan dokumen yang diajukan",
        ],
      },
      {
        heading: "Timeline dan Biaya Realistis 2026",
        paragraphs: [
          "Dengan dokumen lengkap, proses dari PT sampai SIPU terbit memakan waktu sekitar 30-45 hari kerja. Paket jasa pendampingan lengkap kami mulai Rp 12 juta — di luar modal disetor PT dan biaya operasional kantor yang nilainya tergantung kota. Siapkan keempat syarat teknis di atas sejak hari pertama mempersiapkan PT, karena menyusunnya setelah pengajuan berjalan berarti mengulang antrian verifikasi dari nol.",
          "Aturan emas yang selalu kami tanamkan: jangan pernah menjual satu paket pun sebelum SIPU terbit. Pemasaran pra-izin masih bisa dimaklumi, tapi menerima dana jamaah tanpa izin jelas pidana. Gunakan masa menunggu untuk membangun konten, kemitraan masjid, dan infrastruktur operasional.",
        ],
      },
      {
        heading: "Setelah PPIU: Jalur Naik Kelas ke PPIH",
        paragraphs: [
          "Banyak travel besar memulai dari PPIU lalu naik kelas menjadi PPIH — pemegang izin penyelenggaraan haji yang jauh lebih eksklusif. Syaratnya berat: PT murni milik WNI, modal disetor hingga Rp 3 miliar dalam bentuk tunai yang dapat diaudit, serta lolos masa pembinaan dan uji kelayakan Kemenag.",
          "Jalan itu panjang, tapi asetnya sangat bernilai: kuota haji Indonesia sekitar 200 ribu jamaah per tahun membuat izin PPIH menjadi posisi strategis dalam pasar ibadah terbesar di dunia.",
        ],
      },
    ],
    faq: [
      {
        question: "Bolehkah menjual paket umroh sebelum SIPU terbit?",
        answer:
          "Tidak, sama sekali. Menerima dana jamaah tanpa SIPU berisiko pidana penyalahgunaan jamaah dan mencoreng riwayat pendiri Anda selamanya di Kemenag. Fokuskan masa menunggu untuk menyiapkan operasional, bukan penjualan.",
      },
      {
        question: "Berapa modal disetor minimal untuk PPIU?",
        answer:
          "Mengikuti ketentuan Kemenag di provinsi tempat kantor Anda: secara umum mulai Rp 100 juta, dan di banyak wilayah menuntut lebih tinggi hingga ratusan juta rupiah dalam bentuk tunai yang dapat diverifikasi. Kami cek angka final wilayah Anda saat konsultasi awal.",
      },
      {
        question: "Boleh nama travel menggunakan kata Haji?",
        answer:
          "Jangan sebelum Anda memegang izin PPIH — penggunaan kata Haji pada nama perusahaan umumnya ditolak Kemenag untuk pemohon PPIU. Pilih nama brand yang aman sejak pendirian PT.",
      },
    ],
    relatedArticles: ["panduan-nib-oss-rba-2025", "biaya-mendirikan-pt-2025", "registrasi-iata-biro-perjalanan"],
    relatedGuides: ["ppi-umroh", "ppi-haji"],
    cta: { text: "Konsultasi Gratis 15 Menit", anchor: "#konsultasi" },
  },
  {
    slug: "rkab-panduan-perizinan-tambang",
    title: "RKAB Tambang: Cara Menyusun Rencana Kerja & Anggaran Biaya yang Lolos Verifikasi",
    category: "Tambang & Energi",
    excerpt:
      "RKAB kini diajukan 3 tahunan lewat e-RKAB ESDM dan kesalahan justifikasi bisa menghentikan produksi Anda. Pelajari struktur dokumen, alur evaluasi, dan kewajiban turunannya.",
    readMinutes: 9,
    publishedAt: "2026-05-25",
    updatedAt: "2026-05-31",
    author: "Dewi Anggraini",
    authorRole: "Senior Legal Consultant",
    keywords: [
      "cara menyusun RKAB tambang",
      "RKAB 3 tahunan ESDM",
      "pengajuan e-RKAB Minerba Online",
      "izin jual batubara MODI",
      "kewajiban DMO DPO",
      "perpanjangan IUP syarat",
      "LKPM minerba kewajiban",
    ],
    sections: [
      {
        heading: "RKAB Kini 3 Tahunan: Apa yang Berubah dan Mengapa Berdampak ke Anda",
        paragraphs: [
          "Sejak 2023, RKAB (Rencana Kerja dan Anggaran Biaya) tidak lagi diajukan tahunan. Regulasi Kementerian ESDM — di atas payung UU 3/2020 (perubahan UU 4/2009 Minerba) dan PP 96/2021 — mewajibkan pemegang IUP/IUPK menyusun RKAB untuk periode tiga tahun, diajukan melalui sistem Minerba Online Processing System (e-RKAB).",
          "Perubahan ini memaksa Anda berpikir strategis: rencana produksi, anggaran, dan program kerja tiga tahun harus masuk satu dokumen yang konsisten. Revisi di tengah periode ada, tapi mahal secara waktu — kesalahan strategi tahun pertama menular ke tahun kedua dan ketiga.",
        ],
      },
      {
        heading: "Struktur Dokumen RKAB yang Lolos Verifikasi Evaluator",
        paragraphs: [
          "Evaluator Ditjen Minerba tidak mencari dokumen tebal, melainkan konsistensi. Komponen yang harus kuat:",
        ],
        bullets: [
          "Rencana teknis produksi berbasis data eksplorasi atau operasi produksi yang riil",
          "Anggaran biaya yang proporsional terhadap rencana produksi",
          "Justifikasi teknis untuk setiap program kerja dan belanja modal",
          "Program lingkungan, keselamatan pertambangan, dan pengembangan masyarakat",
          "Kesesuaian dengan kewajiban pengusahaan dan status kepatuhan royalti",
        ],
      },
      {
        heading: "Alur Pengajuan e-RKAB sampai Persetujuan",
        paragraphs: [
          "Prosesnya berjalan penuh daring namun tetap menuntut komunikasi teknis dengan evaluator. Alur standarnya:",
        ],
        bullets: [
          "Audit kepatuhan internal: pastikan royalti, LKPM minerba, dan dokumen lingkungan bersih",
          "Penyusunan RKAB tiga tahun bersama tim teknis dan legal",
          "Pengunggahan ke sistem e-RKAB Minerba Online",
          "Evaluasi teknis dan tanggapan atas catatan evaluator",
          "Revisi dokumen hingga persetujuan diterbitkan",
        ],
      },
      {
        heading: "Kewajiban Turunan: Izin Jual via MODI, Izin Angkut, dan DMO/DPO",
        paragraphs: [
          "RKAB yang disetujui membuka pintu kewajiban operasional berikutnya. Izin penjualan (izin jual) dan izin pengangkutan kini dikelola melalui MODI — Minerba One Data Indonesia — sehingga konsistensi data produksi di MODI dengan RKAB Anda wajib terjaga sejak awal.",
          "Pemegang IUP batubara juga memikul kewajiban DMO (Domestic Market Obligation) dan DPO (Domestic Price Obligation) sesuai kebijakan ESDM terkini. Secara umum siapkan 30-90 hari per dokumen mengikuti kalender evaluasi — pengajuan yang masuk mendekati akhir tahun cenderung mengantre lebih lama. Seluruhnya bermuara ke satu prinsip: data yang tidak sinkron antar sistem adalah pintu masuk pemeriksaan.",
        ],
      },
      {
        heading: "Perpanjangan IUP/IUPK: Hitung Mundur 6-12 Bulan",
        paragraphs: [
          "Bukan hanya RKAB — perpanjangan IUP/IUPK harus mulai diproses 6-12 bulan sebelum masa berlaku habis, mencakup kajian kelayakan, pemenuhan kewajiban pengusahaan seperti pengolahan dan divestasi sesuai konteks, serta koordinasi dengan Ditjen Minerba.",
          "Telat satu bulan bisa berarti produksi berhenti, dan itu bukan dramatisasi: ada kasus nyata pemegang IUP yang terpaksa menghentikan operasi karena perpanjangan terlambat diajukan. Audit kepatuhan tahunan adalah asuransi termurah Anda dari skenario ini.",
        ],
      },
    ],
    faq: [
      {
        question: "Apakah RKAB bisa direvisi di tengah periode tiga tahun?",
        answer:
          "Ada mekanisme penyesuaian untuk perubahan kondisi tertentu, namun prosesnya memakan waktu dan menuntut justifikasi kuat. Karena itu strategi produksi tiga tahun harus disusun matang sejak awal, bukan diperbaiki belakangan.",
      },
      {
        question: "RKAB kami ditolak, apakah bisa diselamatkan?",
        answer:
          "Sering kali bisa — melalui perbaikan justifikasi teknis, penyelesaian kewajiban administrasi yang bersangkut paut, dan komunikasi dengan evaluator. Semakin cepat ditangani, semakin kecil dampaknya ke jadwal produksi Anda.",
      },
      {
        question: "Apakah wajib memakai konsultan untuk RKAB?",
        answer:
          "Tidak diwajibkan — perusahaan boleh menyusunnya sendiri. Namun kombinasi regulasi minerba yang cepat berubah, sistem e-RKAB, dan tingginya risiko penolakan membuat banyak perusahaan memilih didampingi tim yang benar-benar paham bahasa teknis ESDM.",
      },
    ],
    relatedArticles: ["amdal-vs-ukl-upl", "pajak-usaha-pemula"],
    relatedGuides: ["rkab-tambang"],
    cta: { text: "Konsultasi Gratis 15 Menit", anchor: "#konsultasi" },
  },
  {
    slug: "registrasi-iata-biro-perjalanan",
    title: "Registrasi IATA untuk Biro Perjalanan: Syarat BSP, CASS, dan Bank Guarantee",
    category: "Internasional",
    excerpt:
      "Akreditasi IATA membuka akses BSP, nett fare maskapai, dan klien korporat kelas dunia. Kenali syaratnya: legalitas travel, laporan keuangan sehat, dan bank guarantee dalam USD.",
    readMinutes: 7,
    publishedAt: "2026-06-15",
    updatedAt: "2026-06-20",
    author: "Fajar Nugroho",
    authorRole: "Business Licensing Specialist",
    keywords: [
      "syarat jadi agen IATA Indonesia",
      "registrasi IATA biro perjalanan",
      "BSP dan CASS itu apa",
      "bank guarantee IATA",
      "biaya akreditasi IATA",
      "TIDS untuk travel",
      "cara dapat nett fare maskapai",
    ],
    sections: [
      {
        heading: "Apa yang Sebenarnya Anda Dapatkan dari Akreditasi IATA?",
        paragraphs: [
          "IATA (International Air Transport Association) adalah asosiasi maskapai penerbangan dunia yang anggotanya menguasai sebagian besar lalu lintas udara global. Bagi biro perjalanan, akreditasi IATA adalah paspor komersial: Anda berhak menerbitkan tiket langsung atas nama 300-an maskapai.",
          "Manfaatnya terasa langsung di margin: akses nett fare dan komisi langsung dari maskapai, ID IATA resmi yang diakui korporasi, serta kemandirian penerbitan tiket tanpa bergantung pada agen lain. Di mata klien korporat yang menuntut invoice resmi, status IATA sering menjadi pembeda antara menang dan kalah tender.",
        ],
      },
      {
        heading: "BSP, CASS, dan TIDS: Tiga Sistem yang Harus Anda Pahami",
        paragraphs: [
          "BSP (Billing and Settlement Plan) adalah sistem penyelesaian keuangan untuk tiket penumpang — semua penjualan tiket Anda dicatat dan diselesaikan secara terpusat dengan maskapai. Adapun CASS (Cargo Accounts Settlement System) adalah padanannya untuk kargo.",
          "Untuk agen yang belum siap akreditasi penuh, ada TIDS (Travel Industry Designator Service): ID resmi IATA untuk transaksi non-BSP. Banyak travel sukses memulai dari TIDS untuk membangun riwayat transaksi, lalu naik ke akreditasi penuh begitu volume penjualan stabil.",
        ],
      },
      {
        heading: "Syarat Akreditasi: Legalitas, Keuangan, dan Personel",
        paragraphs: [
          "IATA menilai bukan hanya dokumen, tapi kelayakan bisnis Anda sebagai mitra penjualan maskapai:",
        ],
        bullets: [
          "Badan usaha legal berbentuk PT atau CV dengan KBLI travel dan NIB aktif",
          "Sertifikat Usaha Pariwisata atau TDAU sebagai penguat kredibilitas",
          "Laporan keuangan sehat yang menunjukkan kapasitas arus kas",
          "Financial security berupa bank guarantee dalam USD sesuai kriteria IATA",
          "Personel dengan sertifikat kompetensi seperti IATA Foundation",
          "Kantor operasional layak dan riwayat bersih dari fraud maskapai",
        ],
      },
      {
        heading: "Bank Guarantee: Komponen Biaya Terbesar yang Harus Dihitung Cermat",
        paragraphs: [
          "Bank guarantee adalah jaminan keuangan yang menutup risiko maskapai bila Anda gagal setor hasil penjualan tiket. Besarannya mengikuti proyeksi penjualan Anda — praktisnya sekitar dua sampai tiga bulan rata-rata penjualan tiket bulanan — dan biayanya adalah bunga jaminan yang Anda bayar ke bank per tahun.",
          "Di sinilah perencanaan dibutuhkan: guarantee terlalu besar berarti biaya bank sia-sia, terlalu kecil membatasi penjualan. Kami membantu klien menghitung angka optimal dari data riil penjualan, bukan asumsi, sebelum mengajukan ke bank.",
        ],
      },
      {
        heading: "Timeline 45-90 Hari dan Jalur Bertahap yang Realistis",
        paragraphs: [
          "Proses akreditasi melibatkan biaya registrasi awal IATA, annual fee tahunan, audit dokumen, hingga verifikasi kantor oleh Area Office IATA Singapura yang membawahi Indonesia. Secara realistis siapkan 45-90 hari, tergantung kecepatan penerbitan bank guarantee.",
          "Paket jasa pendampingan kami mulai Rp 10 juta di luar biaya resmi IATA dan bank guarantee. Bagi travel baru, jalur sub-agent lebih dulu — menjual tiket melalui agen IATA lain — tetap wajar untuk mengumpulkan riwayat penjualan yang nantinya memperkecil bank guarantee Anda.",
        ],
      },
    ],
    faq: [
      {
        question: "Tanpa IATA, apakah travel tetap bisa menjual tiket internasional?",
        answer:
          "Bisa, sebagai sub-agent yang menjual ulang tiket dari agen ber-IATA. Konsekuensinya margin lebih tipis, tidak ada akses nett fare langsung, dan klien korporat besar sulit Anda layani secara langsung.",
      },
      {
        question: "Berapa total biaya IATA per tahun?",
        answer:
          "Ada biaya registrasi awal, annual fee IATA, pemeliharaan bank guarantee, dan pelatihan personel. Totalnya bergantung skala penjualan — kami susun total cost of ownership transparan sejak konsultasi pertama.",
      },
      {
        question: "Apakah harus berbadan hukum PT untuk mendaftar IATA?",
        answer:
          "Persyaratan intinya adalah badan usaha legal dengan KBLI travel dan NIB — PT maupun CV bisa. Namun PT biasanya lebih mudah lolos penilaian kelayakan keuangan dan lebih kredibel di mata maskapai serta klien korporat.",
      },
    ],
    relatedArticles: ["izin-usaha-arab-saudi-misa", "cara-membuka-travel-umroh-ppiu"],
    relatedGuides: ["iata", "ppi-umroh"],
    cta: { text: "Hitung Biaya Perizinan Anda", anchor: "#kalkulator" },
  },
  {
    slug: "pbg-slf-perbedaan",
    title: "PBG vs SLF: Perbedaan, Syarat, dan Cara Mengurusnya (Pengganti IMB)",
    category: "Panduan",
    excerpt:
      "IMB sudah resmi digantikan PBG, dan SLF sering dikira sama padahal berbeda fungsi. Pahami perbedaan PBG vs SLF, syaratnya, dan dampaknya terhadap izin usaha bangunan Anda.",
    readMinutes: 6,
    publishedAt: "2026-07-03",
    updatedAt: "2026-07-08",
    author: "Rizki Mahendra",
    authorRole: "Head of Regulatory Affairs",
    keywords: [
      "perbedaan PBG dan SLF",
      "PBG pengganti IMB",
      "cara mengurus SLF bangunan lama",
      "SIMBG pengajuan PBG",
      "syarat PBG untuk ruko sewa",
      "SLF untuk izin usaha kafe",
      "biaya pengurusan PBG",
    ],
    sections: [
      {
        heading: "Selamat Tinggal IMB: Mengapa PBG dan SLF Lahir",
        paragraphs: [
          "Sejak UU Cipta Kerja dan PP 16/2021, IMB (Izin Mendirikan Bangunan) resmi digantikan oleh dua dokumen dengan fungsi berbeda: PBG (Persetujuan Bangunan Gedung) yang wajib sebelum membangun atau merehabilitasi, dan SLF (Sertifikat Laik Fungsi) yang wajib setelah bangunan selesai sebelum difungsikan.",
          "Keduanya diurus melalui SIMBG, sistem milik Kementerian PUPR yang bekerja sama dengan DPMPTSP daerah. Pemisahan ini logis: PBG menilai rencana bangunan Anda, sementara SLF menyatakan bangunan yang sudah berdiri itu aman untuk digunakan.",
        ],
      },
      {
        heading: "PBG: Persetujuan Sebelum Mengangkat Bata Pertama",
        paragraphs: [
          "PBG diajukan pemilik bangunan dengan melampirkan gambar teknis — denah, tampak, potongan, sampai mekanikal — yang disusun sesuai standar kota dan tata ruang kawasan. Tim teknis daerah akan menilai kesesuaiannya, termasuk pengecekan lapangan bila diperlukan.",
          "Yang sering terlewat: renovasi ringan sekalipun bisa menuntut PBG baru. Mengubah fungsi ruang, memperluas lantai, atau menambah mezzanine tanpa PBG berarti bangunan Anda berstatus tidak patuh — masalah yang muncul tepat saat Anda paling tidak butuh: saat mengurus izin usaha, menjual, atau mengklaim asuransi.",
        ],
      },
      {
        heading: "SLF: Bukti Bangunan Aman untuk Difungsikan",
        paragraphs: [
          "SLF menyatakan bangunan laik fungsi pada empat aspek: keandalan struktur, keamanan, kesehatan, dan kemudahan akses. Dokumen ini wajib dimiliki sebelum bangunan difungsikan, termasuk bangunan existing yang belum pernah punya SLF.",
          "Masa berlakunya praktis selama bangunan tidak diubah fungsi maupun strukturnya. Untuk pemilik usaha, SLF adalah dokumen yang paling sering diminta DPMPTSP saat menerbitkan izin operasional — kafe, klinik, gudang, hingga pabrik semuanya membutuhkannya.",
        ],
      },
      {
        heading: "Perbedaan Cepat PBG vs SLF dalam Satu Pandangan",
        paragraphs: [
          "Agar tidak tertukar lagi, ini perbandingan langsungnya:",
        ],
        bullets: [
          "PBG diurus sebelum bangunan dibangun atau direhabilitasi; SLF setelah bangunan selesai",
          "PBG menilai rencana teknis bangunan; SLF menyatakan keadaan laik fungsi bangunan berdiri",
          "Keduanya diurus via SIMBG dengan timeline umum 14-30 hari per dokumen",
          "SLF atas nama pemilik tetap bisa dipakai penyewa dengan persetujuan pemilik untuk kebutuhan izin usaha",
        ],
      },
      {
        heading: "Dampaknya ke Izin Usaha Anda: dari Kafe sampai Gudang",
        paragraphs: [
          "Untuk usaha berbasis tempat, pasangan PBG-SLF sering menjadi prasyarat izin operasional. Ruko sewa pun ada solusinya: yang dinilai adalah laik fungsi bangunannya, sehingga SLF milik pemilik bisa dipakai dengan surat persetujuan — koordinasi pemilik dan DPMPTSP adalah bagian dari pekerjaan kami.",
          "Bangunan lama ber-IMB tidak perlu panik: IMB yang masih sah tetap diakui. Namun begitu instansi meminta, bangunan berubah, atau Anda mengurus izin usaha baru, siapkan PBG atau SLF. Jasa pengurusannya mulai Rp 2 juta per dokumen di luar biaya resmi daerah — jauh lebih murah daripada biaya operasional berhenti karena izin ditolak.",
        ],
      },
    ],
    faq: [
      {
        question: "Bangunan saya masih ber-IMB, apakah wajib diganti PBG?",
        answer:
          "IMB yang masih sah tetap diakui dan tidak otomatis hangus. Anda akan diminta PBG atau SLF ketika ada perubahan bangunan, atau saat instansi tertentu menuntut dokumen terbaru — misalnya pengajuan izin usaha.",
      },
      {
        question: "Saya sewa ruko untuk kafe, apakah harus mengurus PBG sendiri?",
        answer:
          "Yang krusial adalah bangunan laik fungsi: SLF boleh atas nama pemilik, Anda melengkapi dengan surat persetujuan pemilik untuk kebutuhan izin usaha. Tim kami biasa mengoordinasikan ini langsung dengan pemilik gedung dan DPMPTSP setempat.",
      },
      {
        question: "Berapa lama dan berapa biaya pengurusan PBG dan SLF?",
        answer:
          "Umumnya 14-30 hari per dokumen sejak dokumen teknis lengkap. Biaya jasa pendampingan kami mulai Rp 2 juta per dokumen, di luar biaya resmi yang diatur pemerintah daerah masing-masing.",
      },
    ],
    relatedArticles: ["studi-kasus-kafe-bandung-45-hari", "panduan-nib-oss-rba-2025", "amdal-vs-ukl-upl"],
    relatedGuides: ["pbg"],
    cta: { text: "Cek Izin Usaha Anda Sekarang", anchor: "#cek-izin" },
  },
  {
    slug: "studi-kasus-kafe-bandung-45-hari",
    title: "Studi Kasus: Buka Kafe di Bandung dalam 45 Hari — Timeline Perizinan Lengkap",
    category: "Studi Kasus",
    excerpt:
      "Dua sahabat ingin kafe di Dago, Bandung, beroperasi tepat 45 hari sejak kontrak ruko ditandatangani. Ini timeline nyata perizinannya — NIB hari ketiga, PBG masuk minggu kedua, halal terbit hari ke-38.",
    readMinutes: 7,
    publishedAt: "2026-07-22",
    updatedAt: "2026-07-27",
    author: "Dewi Anggraini",
    authorRole: "Senior Legal Consultant",
    keywords: [
      "studi kasus izin kafe",
      "cara buka kafe di bandung",
      "biaya izin usaha kafe",
      "izin kafe berapa lama",
      "perizinan kedai kopi lengkap",
      "sertifikat halal kafe",
      "PBG ruko sewa usaha",
    ],
    sections: [
      {
        heading: "Profil Klien dan Tantangan Awal",
        paragraphs: [
          "Klien kami — sebut saja Raka dan Sam — menyewa ruko dua lantai di kawasan Dago, Bandung, untuk kafe konsep kedai kopi dengan menu makanan ringan dan beberapa produk kemasan. Target mereka tegas: soft opening 45 hari sejak kontrak sewa, tepat sebelum musim liburan saat permintaan kafe melonjak.",
          "Tantangannya klasik: ruko sewa yang status bangunannya belum jelas, kewajiban halal untuk seluruh menu, dan pemilik yang awalnya enggan menyerahkan dokumen bangunan. Kesabaran kedua pihak diuji sejak hari pertama.",
        ],
      },
      {
        heading: "Hari 1-7: NIB, KBLI, dan Legalitas Dasar",
        paragraphs: [
          "Hari pertama kami susun strategi KBLI: 56303 untuk kedai minuman sebagai kode utama, ditambah 56102 karena menu makanan berat, dan satu kode perdagangan daring untuk rencana jual biji kopi kemasan. NIB terbit hari ketiga lengkap dengan sertifikat standarnya — kabar baik, KBLI kuliner jenis ini berada di risiko menengah rendah.",
          "NPWP badan mengikuti, dan kami langsung mengunci struktur pajak: usaha baru dengan proyeksi di bawah ambang memilih PPh final 0,5% agar kewajiban pajak tahun pertama ringan dan tertib sejak transaksi pertama.",
        ],
      },
      {
        heading: "Hari 8-30: PBG dan Dokumen Bangunan Ruko Sewa",
        paragraphs: [
          "Rintangan terbesar ada di sini. Pemilik ruko tidak punya SLF, dan mengurusnya atas nama pemilik menuntut kesabaran diplomasi. Kami mengoordinasikan surat persetujuan, menyusun ulang gambar teknis bangunan, lalu mengajukan melalui SIMBG Bandung.",
          "Dokumen PBG terbit pada hari ke-26, disusul pengurusan laik fungsi bangunan existing. Untuk usaha berbasis tempat seperti kafe, dokumen ini adalah kunci yang membuka pemeriksaan izin usaha dari DPMPTSP kota — tanpa itu, semua pengajuan lain terhenti di tumpukan.",
        ],
      },
      {
        heading: "Hari 15-40: Sertifikat Halal Jalur Cepat",
        paragraphs: [
          "Berjalan paralel dengan PBG, pengurusan halal dimulai hari ke-15 setelah audit bahan: biji kopi aman, namun sirup dan topping perlu dicek jejak halalnya. Dokumen PPH sederhana kami susun sesuai dapur riil kafe — auditor menghargai kejujuran proses lebih daripada dokumen yang sempurna tapi tidak realistis.",
          "Pemeriksaan berjalan hari ke-31, dan sertifikat halal terbit hari ke-38 — tepat sebelum soft opening. Dengan begitu, label halal sudah bisa terpasang di menu sejak hari pertama beroperasi.",
        ],
      },
      {
        heading: "Hari 40-45: Finalisasi dan Soft Opening",
        paragraphs: [
          "Hari-hari terakhir diisi hal-hal yang sering diremehkan: rekening korporat, kalender kewajiban LKPM dan SPT masa, sampai pemastian dokumen lingkungan yang relevan dengan dapur kafe. Hari ke-45, kafe resmi menyajikan gelas pertama dengan seluruh legalitas terpasang di dinding.",
          "Total biaya jasa pendampingan masuk paket Bisnis mulai Rp 3,5 juta, ditambah biaya resmi daerah dan pemeriksaan halal. Yang lebih berharga dari itu: keduanya tidak satu hari pun kehilangan penjualan karena masalah izin.",
        ],
      },
      {
        heading: "Pelajaran Utama: Urutan Menentukan Semua",
        paragraphs: [
          "Rahasia timeline 45 hari bukan kecepatan, melainkan urutan dan paralelisasi: NIB dan halal berjalan sembari PBG, karena tahu persis mana yang bisa jalan dulu. Mulai pengurusan halal sebelum bahan teraudit, atau PBG sebelum dokumen pemilik lengkap, akan menghancurkan timeline.",
          "Kami menangani klien di 38 provinsi dan 514 kabupaten/kota, dan polanya konsisten: usaha yang mengatur perizinan sejak hari pertama selalu membuka lebih cepat daripada yang menunggu semua siap dulu. Selisihnya bisa berminggu-minggu — atau lebih parah, berbulan-bulan.",
        ],
      },
    ],
    faq: [
      {
        question: "Apakah semua kafe bisa selesai dalam 45 hari?",
        answer:
          "45 hari adalah hasil kerja paralel yang disiplin dan dokumen bangunan yang tersedia — realistisnya berkisar 30-60 hari tergantung kota dan kondisi ruko. Faktor paling menentukan adalah kelengkapan dokumen pemilik bangunan sejak awal.",
      },
      {
        question: "Berapa total biaya perizinan sebuah kafe?",
        answer:
          "Jasa pendampingan paket Bisnis kami mulai Rp 3,5 juta, di luar biaya resmi daerah untuk PBG/SLF dan pemeriksaan halal. Totalnya jauh lebih murah daripada risiko tutup sementara karena dinas menemukan legalitas kosong.",
      },
      {
        question: "Kafe take-away saja, apakah izinnya lebih ringan?",
        answer:
          "KBLI tetap berada di keluarga 56xxx, namun skala usaha mempengaruhi dokumen: kafe dengan tempat duduk umumnya menuntut dokumen bangunan lebih lengkap. Konsultasikan konsep Anda — satu percakapan bisa menghemat minggu pengurusan.",
      },
    ],
    relatedArticles: ["panduan-nib-oss-rba-2025", "pbg-slf-perbedaan", "izin-halal-umkm-gratis"],
    relatedGuides: ["nib", "pbg", "halal"],
    cta: { text: "Hitung Biaya Perizinan Anda", anchor: "#kalkulator" },
  },
  {
    slug: "amdal-vs-ukl-upl",
    title: "AMDAL vs UKL-UPL vs SPPL: Dokumen Lingkungan Mana yang Wajib untuk Usaha Anda?",
    category: "Regulasi",
    excerpt:
      "Dokumen lingkungan adalah prasyarat izin usaha, tapi tidak semua usaha butuh AMDAL. Kenali aturan PP 22/2021 untuk menentukan SPPL, UKL-UPL, atau AMDAL penuh bagi kegiatan Anda.",
    readMinutes: 7,
    publishedAt: "2026-08-08",
    updatedAt: "2026-08-13",
    author: "Fajar Nugroho",
    authorRole: "Business Licensing Specialist",
    keywords: [
      "perbedaan AMDAL UKL UPL SPPL",
      "kewajiban dokumen lingkungan usaha",
      "PP 22 2021 penjelasan",
      "biaya AMDAL pabrik",
      "UKL UPL untuk usaha kecil",
      "kapan usaha wajib AMDAL",
      "proses konsultasi publik AMDAL",
    ],
    sections: [
      {
        heading: "Satu Logika, Tiga Jalur: Bagaimana PP 22/2021 Mengatur Semuanya",
        paragraphs: [
          "Berdasarkan PP 22/2021, setiap kegiatan usaha yang berpotensi mencemari lingkungan wajib memiliki dokumen lingkungan — dan dokumen ini menjadi prasyarat terbitnya izin usaha Anda. Sistemnya sederhana namun sering disalahpahami: tingkat kedalaman dokumen mengikuti tingkat dampak kegiatan.",
          "Tiga jalurnya: SPPL untuk kegiatan berdampak minim, UKL-UPL untuk dampak menengah, dan AMDAL untuk kegiatan berdampak besar seperti pabrik, tambang, PLTU, dan hotel besar. Penentuannya tidak berdasarkan opini, melainkan kriteria formal yang menghubungkan KBLI, kapasitas produksi, dan lokasi kegiatan Anda.",
        ],
      },
      {
        heading: "SPPL: Jalur Tercepat untuk Kegiatan Berisiko Minim",
        paragraphs: [
          "SPPL (Surat Pernyataan Kesanggupan Pengelolaan dan Pemantauan Lingkungan Hidup) adalah pernyataan resmi bahwa Anda sanggup mengelola dan memantau dampak lingkungan kegiatan yang minim. Prosesnya tercepat: umumnya 3-7 hari kerja dengan biaya mulai Rp 750 ribu.",
          "SPPL cocok untuk usaha kecil berbasis jasa dan perdagangan yang tidak memproses bahan berisiko. Catatan pentingnya: jika nanti kapasitas usaha Anda naik dan melampaui kriteria, klasifikasi lingkungan bisa naik ke UKL-UPL — dokumen baru mengikuti skala baru.",
        ],
      },
      {
        heading: "UKL-UPL: Dokumen Kerja untuk Dampak Menengah",
        paragraphs: [
          "UKL-UPL (Upaya Pengelolaan Lingkungan dan Upaya Pemantauan Lingkungan) adalah dokumen teknis yang merinci bagaimana Anda mengelola emisi, limbah, dan dampak sosial kegiatan, lengkap dengan matriks pemantauannya. Kegiatan yang biasanya menuntut UKL-UPL: pabrik skala kecil-menengah, gudang besar, usaha pengolahan pangan, sampai kafe dengan dapur produksi tertentu.",
          "Timeline realistisnya 30-45 hari kerja dengan biaya mulai Rp 3,5 juta. Dokumen ini dinilai oleh tim teknis DPMPTSP daerah — kualitas data dasar dan kejujuran deskripsi proses menentukan cepat atau tidaknya persetujuan.",
        ],
      },
      {
        heading: "AMDAL: Kajian Penuh untuk Kegiatan Berdampak Besar",
        paragraphs: [
          "AMDAL (Analisis Mengenai Dampak Lingkungan) adalah kajian paling mendalam: menyertakan penyusunan oleh tim ahli, komite andalan dampak (kaAndal), pengumuman dan konsultasi publik, hingga forum teknis penuh. Realistisnya memakan 90-180 hari kerja dengan biaya mulai Rp 25 juta.",
          "Hasil akhirnya adalah persetujuan lingkungan (PPL) yang menjadi batu bata izin usaha berdampak besar. Setelah operasional, kewajiban Anda berlanjut dalam bentuk pelaporan RKL-RPL berkala — dokumen AMDAL bukan garis finis, melainkan kontrak pengelolaan jangka panjang dengan lingkungan sekitar Anda.",
        ],
      },
      {
        heading: "Menentukan Dokumen Anda dan Jebakan yang Sering Terjadi",
        paragraphs: [
          "Langkah pertama selalu sama: cek kriteria formal kegiatan Anda lewat KBLI dan parameter skala — kami biasanya tuntaskan ini lewat konsultasi singkat atau fitur Cek Izin AI. Jebakan yang paling mahal adalah menganggap hal ini sepele:",
        ],
        bullets: [
          "Memulai konstruksi sebelum dokumen lingkungan sah — berisiko penghentian paksa",
          "Mengklaim SPPL padahal skala kegiatan sudah masuk kriteria UKL-UPL",
          "Tidak memanfaatkan AMDAL induk kawasan industri yang bisa mempercepat persetujuan",
          "Melupakan kewajiban pelaporan RKL-RPL setelah operasional",
        ],
      },
      {
        heading: "Prinsip Emas: Atur Sebelum Konstruksi, Bukan Setelahnya",
        paragraphs: [
          "Prinsip kami tegas: susun dokumen lingkungan sebelum konstruksi, bukan setelah gedung berdiri. Regularisasi itu ada, tapi jauh lebih mahal, lebih lama, dan meninggalkan riwayat ketidakpatuhan yang bisa mengganggu perizinan Anda bertahun-tahun ke depan.",
          "Kegiatan di kawasan industri layak disorot khusus: kegiatan di sana sering mewarisi AMDAL induk kawasan sehingga persyaratannya jauh lebih ringan dan cepat. Mekanisme dan batasannya perlu dicek per kawasan — verifikasi ini sebaiknya dilakukan sebelum Anda menyewa lahan, bukan setelah kontrak tanda tangan.",
        ],
      },
    ],
    faq: [
      {
        question: "Bagaimana tahu usaha saya butuh SPPL, UKL-UPL, atau AMDAL?",
        answer:
          "Ditentukan kriteria formal KBLI, kapasitas produksi, dan lokasi kegiatan Anda sesuai PP 22/2021. Gunakan fitur Cek Izin AI kami atau konsultasi singkat — dalam 15 menit Anda tahu persis dokumen yang dibutuhkan dan estimasi waktunya.",
      },
      {
        question: "Apakah AMDAL bisa diproses sambil konstruksi berjalan?",
        answer:
          "Tidak. Secara hukum dokumen lingkungan harus sah sebelum izin usaha dan konstruksi dimulai — melanggarnya berisiko penghentian paksa. Jika terlanjur, ada jalur regularisasi bertahap yang bisa kita analisis kelayakannya.",
      },
      {
        question: "Usaha di kawasan industri apakah tetap perlu dokumen lingkungan sendiri?",
        answer:
          "Kegiatan di kawasan industri sering mewarisi AMDAL induk kawasan, sehingga persyaratannya bisa jauh lebih ringan dan cepat. Mekanisme dan batasannya perlu dicek per kawasan — kami bantu verifikasi sebelum Anda menyewa lahan.",
      },
    ],
    relatedArticles: ["rkab-panduan-perizinan-tambang", "pbg-slf-perbedaan", "studi-kasus-kafe-bandung-45-hari"],
    relatedGuides: ["lingkungan"],
    cta: { text: "Cek Izin Usaha Anda Sekarang", anchor: "#cek-izin" },
  },
  {
    slug: "pajak-usaha-pemula",
    title: "Pajak Usaha untuk Pemula: PPh Final 0,5%, PPN, NPWP, dan LKPM",
    category: "Pajak",
    excerpt:
      "Dari NPWP sampai LKPM, inilah peta pajak usaha untuk pendiri baru: kapan PPh final 0,5% jadi pilihan terbaik, kapan Anda wajib jadi PKP dan kena PPN, serta denda apa saja yang harus dihindari.",
    readMinutes: 7,
    publishedAt: "2026-08-20",
    updatedAt: "2026-08-28",
    author: "Rizki Mahendra",
    authorRole: "Head of Regulatory Affairs",
    keywords: [
      "pajak usaha pemula",
      "PPh final 0,5 persen UMKM",
      "kapan wajib jadi PKP",
      "NPWP badan usaha",
      "LKPM wajib untuk siapa",
      "denda telat lapor SPT",
      "pajak jualan online marketplace",
    ],
    sections: [
      {
        heading: "Langkah Nol: NPWP dan Pemilihan Struktur Usaha",
        paragraphs: [
          "Kepatuhan pajak dimulai sebelum transaksi pertama. Sejak UU Harmonisasi Peraturan Pajak, NIK Anda otomatis berfungsi sebagai NPWP pribadi, sehingga yang perlu Anda urus adalah NPWP badan saat mendirikan PT atau CV — prosesnya satu hari dan mengikuti pendirian badan hukum.",
          "Keputusan struktural ini bukan formalitas: usaha perseorangan dengan NIB menikmati kesederhanaan pajak final, sementara badan hukum membuka akses investor dan tender dengan kewajiban pembukuan yang lebih berat. Pilih berdasarkan rencana bisnis 3-5 tahun, bukan sekadar kemudahan tahun pertama.",
        ],
      },
      {
        heading: "PPh Final 0,5%: Skema Termurah untuk Usaha di Bawah Rp 4,8 Miliar",
        paragraphs: [
          "Berdasarkan Pasal 2 UU HPP, pelaku usaha dengan omzet di bawah Rp 4,8 miliar per tahun dapat memilih PPh final 0,5% dari omzet kotor. Praktisnya: usaha dengan omzet Rp 100 juta per bulan hanya membayar Rp 500 ribu pajak — persentase terendah yang tersedia untuk usaha kecil.",
          "Dua catatan penting: skema ini wajib dilaporkan bulanan meskipun angkanya kecil, dan masa pakainya maksimal 7 tahun pajak. Ketika omzet mendekati Rp 4,8 miliar atau masa 7 tahun berakhir, transisi ke skema pembukuan harus sudah direncanakan — bukan mendadak di tahun terakhir.",
        ],
      },
      {
        heading: "Kapan Anda Wajib Jadi PKP dan Membayar PPN?",
        paragraphs: [
          "Pengukuhan Pengusaha Kena Pajak (PKP) menjadi wajib ketika peredaran bruto Anda melampaui Rp 4,8 miliar dalam 12 bulan. Sebagai PKP, Anda memungut dan menyetor PPN dengan tarif dasar 11%, dengan tarif berbeda untuk kategori tertentu seperti barang mewah.",
          "Menariknya, banyak usaha B2B mengajukan PKP secara sukarela sebelum menyentuh ambang — karena klien korporasi sering menuntut faktur pajak sebagai syarat kerja sama. SPPKP-nya terbit 1-3 hari kerja, dan e-Faktur segera aktif untuk transaksi Anda.",
        ],
      },
      {
        heading: "LKPM: Kewajiban yang Paling Sering Dilupakan Pelaku Usaha",
        paragraphs: [
          "LKPM (Laporan Kegiatan Penanaman Modal) adalah kewajiban berkala ke Kementerian Investasi/BKPM melalui OSS, berlaku untuk semua pelaku usaha yang memegang NIB — termasuk UMKM. Frekuensinya mengikuti skala usaha, dari semesteran untuk usaha mikro hingga bulanan untuk usaha besar.",
          "Laporannya sederhana — seberapa banyak rencana investasi dan pekerja yang terealisasi — namun kelalaian lapor bisa membuat NIB Anda bermasalah hingga terancam dicabut. Kalimat yang kami ucapkan ke setiap klien: izin yang terbit bukan akhir, kepatuhan berkala yang menjaganya tetap hidup.",
        ],
      },
      {
        heading: "Kalender Kepatuhan dan Denda yang Harus Anda Hindari",
        paragraphs: [
          "Setelah izin dan NPWP aktif, kepatuhan Anda berjalan di atas kalender ini:",
        ],
        bullets: [
          "SPT masa pajak bulanan dengan jatuh tempo di bulan berikutnya — telat berarti denda Rp 100 ribu per bulan",
          "Setoran PPh final 0,5% paling lambat tanggal 15 bulan berikutnya",
          "SPT tahunan badan atau pribadi sesuai kalender DJP",
          "LKPM berkala sesuai skala usaha Anda",
          "e-Faktur dan bukti potong bila Anda sudah PKP atau memotong pajak pihak lain",
        ],
      },
      {
        heading: "Kebiasaan Tertib Sejak Omzet Kecil adalah Aset",
        paragraphs: [
          "Denda-denda di atas kecil di kertas, tapi kebiasaan telatnya mahal: riwayat kepatuhan yang buruk mempersulit kredit bank, tender, hingga pengurusan izin berikutnya. Kebiasaan tertib sejak omzet kecil adalah aset yang berbunga nanti.",
          "Untuk penjual daring, satu pesan penting lagi: omzet penjualan di marketplace adalah bagian dari omzet usaha Anda dan sudah diatur pemerintah melalui rezim PMSE untuk pemungutan pajak atas transaksi e-commerce. Marketplace besar kini menuntut NIB dan data pajak penjual — legalitas rapi justru membuat toko Anda makin berani tampil dan tumbuh.",
        ],
      },
    ],
    faq: [
      {
        question: "Usaha kecil apakah benar-benar wajib bayar pajak?",
        answer:
          "Ya — tetapi dengan skema PPh final 0,5% dari omzet, bebannya sangat kecil dan tetap harus dilaporkan bulanan. Justru riwayat pajak tertib sejak kecil yang membangun rekam kredit usaha untuk pinjaman bank di masa depan.",
      },
      {
        question: "PPh final 0,5% bisa dinikmati sampai kapan?",
        answer:
          "Maksimal 7 tahun pajak sejak Anda mulai memanfaatkan fasilitas, atau lebih dulu bila omzet melampaui Rp 4,8 miliar per tahun. Rencanakan transisi ke skema pembukuan sejak tahun kelima agar tidak kaget.",
      },
      {
        question: "Apakah penjualan di marketplace ikut kena pajak?",
        answer:
          "Ya. Omzet penjualan daring adalah bagian dari omzet usaha Anda, dan pemerintah telah mengatur pemungutan pajak atas transaksi e-commerce melalui rezim PMSE. Marketplace besar kini menuntut NIB dan data pajak penjual — legalitas rapi justru membuka jalan tumbuh lebih besar.",
      },
    ],
    relatedArticles: ["panduan-nib-oss-rba-2025", "biaya-mendirikan-pt-2025", "kbli-usaha-kuliner"],
    relatedGuides: ["pajak", "nib"],
    cta: { text: "Konsultasi Gratis 15 Menit", anchor: "#konsultasi" },
  },
];

export function getArticle(slug: string): BlogArticle | undefined {
  return BLOG_ARTICLES.find((a) => a.slug === slug);
}

export function getRelatedArticles(slugs: string[]): BlogArticle[] {
  return slugs
    .map((s) => getArticle(s))
    .filter((a): a is BlogArticle => Boolean(a));
}

export function getAllBlogKeywords(): string[] {
  return Array.from(new Set(BLOG_ARTICLES.flatMap((a) => a.keywords)));
}
