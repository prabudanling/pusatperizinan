// ============================================================
// PUSATPERIZINAN.COM — Data FAQ Lengkap + i18n 30 Bahasa
// Task 4-a — Sumber data tunggal untuk halaman /faq.
//
// STRUKTUR:
//   1. FAQ_CATEGORIES      — konten kanonik Indonesia (10 kategori, 51 Q&A)
//   2. FAQ_UI + faqUiT     — string UI halaman, lengkap 30 bahasa (20 key/bahasa)
//   3. FAQ_CATEGORY_I18N   — label kategori (id/en/zh/ar/ja/es)
//   4. FAQ_CONTENT + faqItemT — terjemahan konten Q&A:
//        en  = full (semua qid), zh/ar/ja/es = top-10 universal
//        bahasa lain = fallback ke item kanonik (Indonesia)
//   5. FAQ_META            — title & description untuk metadata halaman
//
// KONVENSI:
//   - Token {n} dan {lang} DIPERTAHANKAN apa adanya (disubstitusi UI).
//   - Fakta brand mengikuti src/lib/site.ts (1.247+ klien, 3.890+ izin,
//     38 provinsi, 514 kab/kota, 890+ ulasan 4.9, garansi 100%, Rp 350 rb).
//   - Jawaban bersifat spesifik, faktual, menenangkan, dan jujur.
// ============================================================

import type { LangCode } from "@/lib/i18n/types";

// ------------------------------------------------------------
// Kontrak tipe
// ------------------------------------------------------------

/** Satu item Q&A kanonik (konten Indonesia = sumber kebenaran). */
export interface FaqItem {
  /** ID unik kebab-case — kunci untuk terjemahan di FAQ_CONTENT */
  qid: string;
  /** Pertanyaan (kanonik Indonesia) */
  q: string;
  /** Jawaban 2-4 kalimat (kanonik Indonesia) */
  a: string;
}

/** Kategori FAQ berisi sekumpulan item. */
export interface FaqCategory {
  /** ID kategori kebab-case — kunci untuk FAQ_CATEGORY_I18N */
  cid: string;
  /** Label kanonik Indonesia */
  label: string;
  /** Emoji pendamping di chip/kartu kategori */
  emoji: string;
  /** Deskripsi singkat kategori (1 kalimat) */
  desc: string;
  /** Daftar Q&A dalam kategori ini */
  items: FaqItem[];
}

/** String UI halaman FAQ (20 key). */
export interface FaqUi {
  title1: string;
  titleHigh: string;
  title2: string;
  subtitle: string;
  searchPlaceholder: string;
  searchLabel: string;
  /** Label aksesibilitas tombol bersihkan pencarian */
  searchClear: string;
  noResultsTitle: string;
  noResultsSub: string;
  allLabel: string;
  questionsSuffix: string;
  /** Template — mengandung token {n} */
  resultCount: string;
  contactTitle: string;
  contactSub: string;
  contactBtnWa: string;
  contactBtnConsult: string;
  /** Template — mengandung token {lang} (nama bahasa native) */
  langNotice: string;
  allFaqCta: string;
  breadcrumbHome: string;
  breadcrumbFaq: string;
  updatedLabel: string;
}

// ------------------------------------------------------------
// 1. FAQ_CATEGORIES — Konten kanonik Indonesia (51 Q&A)
// ------------------------------------------------------------

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    cid: "umum",
    label: "Umum & Kepercayaan",
    emoji: "🤝",
    desc: "Legalitas, garansi, dan kenapa Anda bisa tenang bekerja sama dengan kami.",
    items: [
      {
        qid: "apakah-legal-100",
        q: "Apakah proses pengurusannya 100% legal dan resmi?",
        a: "Mutlak legal. Kami hanya menggunakan jalur resmi pemerintah — OSS-RBA, Kemenkumham (AHU), DPMPTSP, DJP, BPJPH, dan instansi terkait lainnya — tanpa jalan pintas. Semua dokumen terbit atas nama Anda dan bisa diverifikasi langsung di instansi penerbit. Kalau ada bagian proses Anda yang tidak memenuhi syarat, kami sampaikan apa adanya sejak awal, bukan janji manis dulu lalu minta maaf.",
      },
      {
        qid: "garansi-uang-kembali",
        q: "Bagaimana garansi 100% uang kembali bekerja?",
        a: "Jika izin gagal terbit karena kesalahan proses di pihak kami, 100% jasa yang sudah Anda bayar kami kembalikan — tertulis di kontrak kerja sama. Yang tidak termasuk garansi: biaya resmi negara (PNBP) yang sudah masuk kas negara, dan kegagalan akibat dokumen Anda tidak benar atau menyesatkan. Semua syarat dan pengecualian kami bacakan transparan sebelum Anda menandatangani apa pun.",
      },
      {
        qid: "beda-konsultan-dan-calo",
        q: "Apa bedanya konsultan resmi dengan calo atau makelar?",
        a: "Konsultan resmi bekerja di atas prosedur: kontrak tertulis, invoice fiskal, pembayaran ke rekening badan hukum, dan izin yang terbit atas nama Anda — bisa dicek langsung di OSS-RBA atau instansi terkait. Calo biasanya minta transfer ke rekening pribadi, menjanjikan \"izin instan tanpa syarat\", dan tidak memberikan dokumen sah. Kalau ada yang menawarkan NIB untuk KBLI yang jelas membutuhkan izin teknis tanpa syarat apa pun, itu red flag keras.",
      },
      {
        qid: "kontrak-invoice-resmi",
        q: "Apakah saya menerima kontrak dan invoice resmi?",
        a: "Selalu. Setiap kerja sama dibingkai kontrak tertulis yang memuat lingkup, timeline, biaya, dan garansi. Pembayaran disertai invoice resmi atas nama badan hukum kami (PT Digital Bisnis Manajemen), sehingga aman untuk pembukuan dan pelaporan pajak perusahaan Anda.",
      },
      {
        qid: "apakah-data-aman",
        q: "Apakah data pribadi dan dokumen perusahaan saya aman?",
        a: "Aman. Dokumen hanya dipakai untuk pengurusan izin yang Anda setujui, dibagikan minimal ke instansi yang mewajibkannya, dan tidak pernah dijual atau diberikan ke pihak ketiga komersial. Akses terbatas pada tim yang menangani berkas Anda — data sensitif seperti NPWP atau akun Coretax tidak diperlihatkan ke tim lain.",
      },
      {
        qid: "kenapa-percaya-kami",
        q: "Kenapa harus percaya PusatPerizinan.com?",
        a: "Rekam jejak kami terbuka: 1.247+ klien terlayani, 3.890+ izin diproses, dan 890+ ulasan dengan rating 4,9 — tersebar di 38 provinsi dan 514 kabupaten/kota Indonesia. Semua proses berjalan di jalur resmi pemerintah dengan garansi uang kembali 100% jika gagal karena kesalahan kami. Anda juga bisa membaca ulasan klien asli terlebih dulu sebelum memutuskan apa pun.",
      },
    ],
  },
  {
    cid: "badan-usaha",
    label: "Pendirian Badan Usaha",
    emoji: "🏢",
    desc: "PT, CV, atau perseorangan — pilih bentuk usaha yang tepat sejak awal.",
    items: [
      {
        qid: "pt-vs-cv-vs-perseorangan",
        q: "Sebaiknya pilih PT, CV, atau Usaha Perseorangan?",
        a: "Usaha Perseorangan (NIB perorangan) paling cepat dan murah — cocok untuk usaha kecil berisiko rendah yang asetnya menyatu dengan harta pribadi. CV pas untuk kemitraan sederhana, sementara PT adalah pilihan terbaik bila Anda butuh kepercayaan investor, tanggung jawab terbatas, atau target ikut tender dan ekspansi. Kami analisis gratis sesuai skala, sektor, dan rencana usaha Anda sebelum Anda memutuskan.",
      },
      {
        qid: "syarat-minimal-pendirian",
        q: "Apa saja syarat minimal untuk mendirikan badan usaha?",
        a: "Untuk PT dan CV lokal, minimal cukup KTP dan NPWP para pendiri/pengurus, plus alamat kantor dan nomor HP aktif untuk verifikasi. Pendirian PT kini bisa 100% online lewat sistem AHU Kemenkumham tanpa akta notaris untuk modal kecil (sesuai PP 8/2021), meski banyak klien tetap memilih akta notaris demi kredibilitas. Kami cek kelengkapan Anda di awal supaya tidak ada keterlambatan di tengah jalan.",
      },
      {
        qid: "modal-dasar-dan-tertempat-pt",
        q: "Berapa modal dasar dan modal tertempat PT yang wajib?",
        a: "Sejak UU Cipta Kerja dan PP 8/2021, tidak ada lagi batasan minimal Rp 50 juta — modal dasar ditetapkan berdasarkan kesepakatan pemegang saham, dengan ketentuan paling sedikit 25% dari modal dasar harus ditempatkan dan disetor. Untuk PT Perorangan (usaha mikro), modal sepenuhnya menyatu dengan harta pribadi pemilik. Kami bantu menentukan angka yang realistis sesuai kebutuhan KBLI dan kredibilitas usaha Anda.",
      },
      {
        qid: "pendirian-oleh-wna-pma",
        q: "Apakah WNA bisa mendirikan usaha di Indonesia?",
        a: "Bisa, melalui bentuk PT PMA (Penanaman Modal Asing) yang didaftarkan ke Kementerian Investasi/BKPM. PMA memiliki persyaratan modal tersendiri, dan banyak KBLI terbuka hingga 100% kepemilikan asing sementara sektor tertentu dibatasi (daftar positif investasi). Bagi pemegang KITAS investor, pendirian PMA juga menjadi jalur legalitas residensi. Tim kami menangani dari persetujuan investasi sampai NIB dan izin teknis.",
      },
      {
        qid: "tanpa-kantor-sendiri",
        q: "Saya belum punya kantor sendiri, bisa tetap mendirikan usaha?",
        a: "Bisa. Alamat domisili via virtual office (termasuk fasilitas NPWP dan alamat surat-menyurat) dapat dipakai untuk pendirian PT/CV dan penerbitan NIB, sepanjang KBLI dan kewenangan DPMPTSP setempat mengizinkan. Beberapa KBLI atau lokasi tertentu (misalnya ruko fisik untuk perizinan gedung) memang tetap butuh alamat nyata — kami cek dulu sebelum Anda bayar. Biayanya jauh lebih hemat dibanding sewa kantor fisik.",
      },
    ],
  },
  {
    cid: "nib-oss",
    label: "NIB & OSS-RBA",
    emoji: "🪪",
    desc: "NIB, OSS-RBA, KBLI, dan kewajiban pelaporan yang sering terlewat.",
    items: [
      {
        qid: "apa-itu-nib",
        q: "Apa itu NIB dan kenapa penting?",
        a: "NIB (Nomor Induk Berusaha) adalah identitas tunggal badan usaha yang diterbitkan lewat OSS-RBA berbasis NIK/NPWP. Fungsinya menggantikan SIUP dan TDP, menjadi syarat awal untuk memperoleh izin operasional lain, ikut tender, membuka rekening korporat, sampai verifikasi di marketplace. Tanpa NIB, usaha Anda praktis belum diakui secara administratif oleh pemerintah.",
      },
      {
        qid: "berapa-lama-nib-terbit",
        q: "Berapa lama NIB bisa terbit?",
        a: "Jika data KTP/NPWP Anda valid dan profil risiko KBLI tidak menuntut verifikasi tambahan, NIB terbit otomatis dalam hitungan menit hingga 1 hari kerja. Yang sering membuat macet: NIK tidak terdeteksi Dukcapil, NPWP tidak aktif, atau KBLI butuh izin sektoral lebih dulu. Kami pre-check semuanya sebelum submit supaya proses benar-benar secepat janjinya.",
      },
      {
        qid: "biaya-resmi-nib-pnbp",
        q: "Apakah pengurusan NIB berbayar ke pemerintah?",
        a: "Penerbitan NIB melalui OSS-RBA tidak dikenakan PNBP (Penerimaan Negara Bukan Pajak) — jadi biaya pemerintahnya Rp 0. Yang Anda bayar ke kami adalah jasa pendampingan: penentuan KBLI yang tepat, pencegahan salah level risiko, dan penyiapan izin turunannya. Hati-hati pada pihak yang menagih \"biaya OSS\" mahal — itu bukan biaya resmi negara.",
      },
      {
        qid: "level-risiko-kbli",
        q: "Apa itu level risiko KBLI (rendah, menengah, tinggi)?",
        a: "Sejak UU Cipta Kerja, setiap KBLI masuk level risiko: rendah cukup NIB, menengah rendah perlu sertifikat standar (self-declare), menengah tinggi perlu sertifikat standar terverifikasi, dan tinggi perlu izin penuh sesuai ketentuan khusus. Salah memilih level bisa membuat usaha Anda beroperasi tanpa legalitas yang sah. Kami petakan seluruh KBLI usaha Anda dan pastikan setiap level terpenuhi.",
      },
      {
        qid: "kewajiban-lkpm-oss",
        q: "Apakah ada kewajiban pelaporan setelah NIB terbit?",
        a: "Ada. Setiap pelaku usaha wajib melaporkan LKPM (Laporan Kegiatan Penanaman Modal) berkala di OSS-RBA — triwulanan untuk usaha kecil, bulanan untuk usaha menengah dan besar. Laporannya gratis tapi sering terlewat, padahal berisiko sanksi administratif. Kami bisa uruskan pelaporannya, atau Anda cukup ikuti kalender kepatuhan yang kami kirimkan.",
      },
      {
        qid: "klu-5-digit",
        q: "Kenapa KLU saya harus 5 digit dan bisa diubah?",
        a: "Sejak integrasi OSS-RBA dengan sistem DJP, KLU (Kode Lapangan Usaha) memakai format 5 digit yang selaras dengan KBLI 2020 — bukan lagi 4 digit. KLU memengaruhi perhitungan pajak dan profil risiko usaha Anda di Coretax. Jika kode Anda masih format lama atau tidak sesuai bidang usaha aktual, kami bantu ajukan pemutakhiran data agar aman saat SPT dan pemeriksaan.",
      },
    ],
  },
  {
    cid: "sektoral",
    label: "Izin Sektoral & Sertifikasi",
    emoji: "📜",
    desc: "Halal, BPOM/PIRT, PBG-SLF, lingkungan, merek, dan izin khusus lainnya.",
    items: [
      {
        qid: "halal-berapa-lama",
        q: "Berapa lama proses Sertifikasi Halal?",
        a: "Melalui jalur reguler BPJPH, sertifikasi halal umumnya selesai 14-30 hari kerja setelah dokumen dan audit rampung; jalur self-declare untuk UMKM binaan bisa lebih cepat. Semua proses berjalan di sistem SIHALAL — mulai pengajuan, penugasan LPH (Lembaga Pemeriksa Halal), sampai penetapan fatwa. Produk makanan-minuman yang dipasarkan tanpa sertifikat halal bisa kena sanksi setelah masa transisi berakhir — jadi sebaiknya diurus sejak awal.",
      },
      {
        qid: "beda-bpom-pirt",
        q: "Kapan produk saya butuh izin edar BPOM dan kapan cukup PIRT?",
        a: "PIRT untuk pangan olahan UMKM berisiko rendah dengan masa edar kurang dari 7 hari — roti, keripik, sambal botol, dan sejenisnya; diterbitkan DPMPTSP. Izin edar BPOM (MD/BP) wajib untuk produk berisiko lebih tinggi, berumur simpan panjang, atau diekspor, termasuk suplemen dan kosmetik. Kami bantu menentukan jalur yang benar sejak awal supaya Anda tidak salah mengeluarkan biaya.",
      },
      {
        qid: "pbg-slf-gedung",
        q: "Apa bedanya PBG dan SLF, dan kapan wajib?",
        a: "PBG (Persetujuan Bangunan Gedung) menggantikan IMB dan wajib sebelum membangun atau memanfaatkan bangunan — diterbitkan DPMPTSP/Kementerian PUPR via SIMBG. SLF (Sertifikat Laik Fungsi) diterbitkan setelah bangunan selesai dan terbukti memenuhi standar teknis — jadi syarat operasional usaha seperti hotel, pabrik, atau kafe di gedung komersial. Kami bantu dari pengukuran, dokumen teknis, sampai terbit keduanya.",
      },
      {
        qid: "izin-lingkungan-sppl-ukl-upl-amdal",
        q: "Izin lingkungan apa yang saya butuhkan: SPPL, UKL-UPL, atau AMDAL?",
        a: "Tergantung dampak usaha Anda: SPPL untuk usaha kecil berdampak rendah, UKL-UPL untuk usaha menengah, dan AMDAL untuk usaha besar atau berisiko tinggi (pabrik, tambang, infrastruktur besar). Dokumen lingkungan menjadi prasyarat NIB dan izin operasional sektor tertentu. Kami lakukan penapisan awal gratis supaya Anda tidak menyiapkan dokumen yang lebih berat dari yang sebenarnya dibutuhkan.",
      },
      {
        qid: "pendaftaran-merek-djki",
        q: "Bagaimana cara mengamankan merek usaha saya?",
        a: "Merek didaftarkan ke DJKI (Kemenkumham) dan berlaku 10 tahun, dapat diperpanjang. Pemeriksaan substantif bisa 15-30 hari di jalur akselerasi UMKM, sementara jalur reguler memakan waktu beberapa bulan. Prinsipnya first to file — kalau merek Anda belum terdaftar, orang lain bisa mendaftarkannya lebih dulu. Kami bantu riset kemiripan dengan merek terdaftar sebelum filing supaya pengajuan Anda tidak gugur.",
      },
      {
        qid: "izin-travel-ibadah-iata",
        q: "Bisakah diurus izin travel umroh, haji, atau registrasi IATA?",
        a: "Bisa — kami punya divisi khusus Travel Ibadah & Aviasi. Kami urus pendirian PT travel, SIPU/SPPU (PPIU) sampai izin PPIH untuk haji, termasuk pendaftaran SIMPONI & rekening kolektif jamaah. Untuk agen tiket, kami siapkan akreditasi IATA (BSP/CASS) agar Anda bisa menerbitkan tiket internasional resmi.",
      },
    ],
  },
  {
    cid: "pajak",
    label: "Pajak",
    emoji: "🧾",
    desc: "NPWP, Coretax, SPT, PPh final UMKM, PKP, dan cara menghindari sanksi.",
    items: [
      {
        qid: "npwp-16-digit-coretax",
        q: "Kenapa NPWP saya jadi 16 digit dan bagaimana dengan Coretax?",
        a: "Sejak integrasi NIK-NPWP, nomor pajak memakai 16 digit (mengikuti format NIK), dan seluruh administrasi perpajakan pindah ke sistem Coretax DJP. Untuk badan usaha, pemutakhiran profil di Coretax (KLU, pemilik, kewenangan) wajib dilakukan agar SPT dan pembayaran tidak bermasalah. Kami bantu aktivasi akun, pemutakhiran profil, sampai pendampingan kewajiban harian di sistem baru.",
      },
      {
        qid: "spt-tahunan-dan-masa",
        q: "Apa beda SPT Tahunan dan SPT Masa?",
        a: "SPT Masa dilaporkan setiap bulan untuk objek tertentu — misalnya PPN dan PPh yang dipotong pihak lain — sedangkan SPT Tahunan dilaporkan sekali setahun merangkum seluruh penghasilan. Keterlambatan SPT Tahunan kena denda Rp 100.000 untuk orang pribadi dan Rp 1.000.000 untuk badan. Kami bantu penyusunan, pelaporan, hingga koreksi bila ada kesalahan.",
      },
      {
        qid: "pph-final-umkm-05",
        q: "Apakah usaha saya bisa bayar PPh final 0,5%?",
        a: "Omzet sampai Rp 4,8 miliar per tahun bisa memakai tarif PPh final UMKM 0,5% dari omzet kotor (PP 55/2022), dengan tarif 0% untuk omzet sampai Rp 500 juta di tahun mulai usaha. Namun ada batasnya: pemilik yang juga menerima penghasilan dari pekerjaan/kegiatan lain (misalnya PNS atau karyawan) tidak boleh memakai skema ini. Kami hitungkan perbandingan skema 0,5% vs tarif normal agar Anda tidak salah pilih sejak awal.",
      },
      {
        qid: "pengukuhan-pkp-ppn",
        q: "Kapan usaha wajib jadi PKP dan kena PPN?",
        a: "Pengusaha dengan omzet di atas Rp 4,8 miliar dalam satu tahun buku wajib dikukuhkan sebagai PKP (Pengusaha Kena Pajak) dan memungut PPN 11% (12% untuk barang mewah sesuai aturan berlaku). Usaha kecil juga bisa mengajukan pengukuhan PKP secara sukarela untuk kebutuhan tender atau kerja sama dengan perusahaan besar. Kami bantu pengukuhan, faktur pajak, sampai pelaporan masa PPN di Coretax.",
      },
      {
        qid: "sanksi-keterlambatan-pajak",
        q: "Apa sanksi kalau saya terlambat bayar atau lapor pajak?",
        a: "Keterlambatan pembayaran PPh/PPN dikenakan bunga 2% per bulan (maksimal 24 bulan) dari pokok pajak, sementara terlambat lapor SPT kena denda administratif. Sanksi bisa dihindari atau ditekan lewat koreksi SPT dan pembayaran segera sebelum terbit ketetapan. Kalau sudah telanjur telat, jangan tunggu — kami bantu regularisasi supaya bebannya tidak menggembung.",
      },
    ],
  },
  {
    cid: "pmi",
    label: "Kerja Luar Negeri (PMI)",
    emoji: "✈️",
    desc: "Penempatan kerja luar negeri yang legal, aman, dan tanpa calo.",
    items: [
      {
        qid: "pmi-biaya-penempatan",
        q: "Apakah PMI harus membayar biaya penempatan kerja?",
        a: "Tidak — sesuai UU No. 18/2017 tentang Pelindungan Pekerja Migran Indonesia, PMI tidak dibebani biaya penempatan. Biaya proses seperti dokumen, pelatihan, dan sertifikasi ditanggung pemberi kerja atau PPTKIS sesuai skema; sebagian kecil dokumen kepemilikan pribadi (misalnya paspor) bisa menjadi tanggungan Anda sendiri. Kalau ada calo yang minta puluhan juta dengan janji gaji tidak wajar, itu pelanggaran hukum. Kami pastikan penempatan Anda patuh regulasi dan bebas biaya penempatan ilegal.",
      },
      {
        qid: "jalur-resmi-siskop2mi-g2g",
        q: "Apa jalur resmi untuk kerja ke luar negeri?",
        a: "Ada tiga jalur utama: penempatan melalui PPTKIS berizin dengan job order tercatat di SISKOP2MI (Kemnaker), skema pemerintah-ke-pemerintah (G2G) seperti Jepang, Korea, dan Jerman, serta penempatan mandiri yang tetap wajib diproses melalui BP2MI untuk pas dan dokumen keberangkatan. Semua jalur legal memberi Anda kontrak kerja tertulis, asuransi, dan perlindungan purna penempatan. Kami bantu memilih jalur yang sesuai profesi dan negara tujuan Anda.",
      },
      {
        qid: "negara-tujuan-pmi",
        q: "Negara tujuan apa yang paling populer untuk PMI?",
        a: "Jepang (skema SSW/Tokutei Ginou), Korea Selatan (EPS), Hong Kong, Taiwan, Malaysia, Singapura, dan Timur Tengah seperti Arab Saudi serta UEA menjadi tujuan terbanyak. Setiap negara punya syarat bahasa, keterampilan, dan sektor kerja berbeda — misalnya Jepang menuntut lolos ujian JLPT dan skill test. Kami dampingi dari pemilihan negara, pelatihan bahasa, sampai keberangkatan.",
      },
      {
        qid: "syarat-dokumen-pmi",
        q: "Dokumen apa saja yang harus disiapkan calon PMI?",
        a: "Persiapan dasarnya: KTP, akta kelahiran, ijazah (sesuai permintaan negara tujuan), paspor, hasil pemeriksaan kesehatan, dan kartu kuning. Untuk negara tertentu ditambah sertifikat kompetensi BNSP, sertifikat bahasa (JLPT/EPS-TOPIK), dan pelatihan pra-penempatan. Kami urus pemetaan dokumen per negara dan dampingi Anda sampai terbang.",
      },
    ],
  },
  {
    cid: "proses",
    label: "Proses & Timeline",
    emoji: "⏱️",
    desc: "Berapa lama, bagaimana alurnya, dan apa yang perlu Anda siapkan.",
    items: [
      {
        qid: "berapa-lama-per-jenis-izin",
        q: "Berapa lama proses untuk tiap jenis izin?",
        a: "Tergantung jenis izin: NIB bisa selesai 1 hari kerja, pendirian PT/CV 3-7 hari kerja, Sertifikasi Halal 14-30 hari, BPOM 30-60 hari, dan AMDAL 30-90 hari. Estimasi resmi kami berikan tertulis saat konsultasi gratis — sebelum Anda memutuskan apa pun. Kalau ada potensi keterlambatan dari sisi instansi, Anda kami informasikan, bukan disimpan diam-diam.",
      },
      {
        qid: "harus-datang-ke-kantor",
        q: "Apakah saya harus datang ke kantor?",
        a: "Tidak perlu. 95% proses kami lakukan secara daring + kurir dokumen ke alamat Anda. Layanan kami menjangkau seluruh 38 provinsi dan 514 kabupaten/kota Indonesia. Untuk kebutuhan khusus (audit fisik, AMDAL, sektor tambang), tim kami yang akan datang ke lokasi Anda.",
      },
      {
        qid: "jangkauan-wilayah-layanan",
        q: "Apakah layanan tersedia di kota saya?",
        a: "Ya — kami menjangkau 38 provinsi dan 514 kabupaten/kota di Indonesia, dari Sabang sampai Merauke. Mayoritas pengurusan berjalan penuh online lewat sistem resmi pemerintah (OSS-RBA, AHU, Coretax, SIMBG), jadi lokasi fisik bukan penghalang. Untuk kebutuhan tatap muka, konsultasi bisa via video call atau kunjungan terjadwal.",
      },
      {
        qid: "dokumen-yang-disiapkan",
        q: "Dokumen apa yang perlu saya siapkan di awal?",
        a: "Untuk sebagian besar pengurusan, cukup KTP, NPWP, dan nomor WhatsApp aktif — sisanya kami pandu bertahap. Untuk badan usaha dan izin sektoral, kami kirim daftar dokumen spesifik (akta, bukti alamat, dokumen teknis) dalam satu checklist yang jelas. Kami tidak minta dokumen yang tidak perlu, dan semua berkas dikembalikan atau diamankan setelah selesai.",
      },
      {
        qid: "belum-punya-badan-usaha",
        q: "Saya belum punya badan usaha, bisa diuruskan sekaligus?",
        a: "Sangat bisa — justru ini paket paling sering diambil. Kami urus dari pendirian badan usaha (PT/CV/Perseorangan), NIB, sampai izin operasional sektoral dalam satu roadmap. Anda tinggal siapkan KTP dan NPWP pribadi, sisanya kami yang koordinasi.",
      },
    ],
  },
  {
    cid: "pembayaran",
    label: "Pembayaran & Jaminan",
    emoji: "💳",
    desc: "Skema termin, metode, dan jaminan — tanpa biaya tersembunyi.",
    items: [
      {
        qid: "skema-termin-50-50",
        q: "Bagaimana skema pembayarannya?",
        a: "50% di awal (down payment) setelah kontrak ditandatangani, 50% setelah izin terbit. Skema ini menyeimbangkan komitmen kedua pihak: kami kerja penuh sejak hari pertama, dan Anda tidak menanggung seluruh risiko di muka. Untuk paket besar atau kerja sama korporat, termin bisa disesuaikan di penawaran.",
      },
      {
        qid: "metode-pembayaran",
        q: "Metode pembayaran apa saja yang tersedia?",
        a: "Transfer bank resmi atas nama badan hukum kami, atau pembayaran melalui payment gateway berlisensi (kartu, QRIS, virtual account) untuk kenyamanan. Setiap pembayaran disertai invoice resmi dan bukti yang terverifikasi. Kami tidak pernah meminta transfer ke rekening pribadi — jika ada yang melakukannya atas nama kami, laporkan segera.",
      },
      {
        qid: "biaya-tersembunyi",
        q: "Apakah ada biaya tersembunyi?",
        a: "Tidak ada. Semua komponen biaya — jasa kami, biaya resmi negara (PNBP), notaris, dan biaya teknis lain — tercantum jelas di penawaran tertulis sebelum Anda bayar. Kalau di tengah jalan muncul kebutuhan di luar lingkup, kami konfirmasi dulu, bukan langsung menagih. Prinsip kami: harga jelas di awal, tanpa biaya siluman.",
      },
      {
        qid: "harga-mulai-350-ribu",
        q: "Kenapa harga layanan mulai Rp 350 ribu? Itu untuk apa saja?",
        a: "Rp 350 ribu adalah titik masuk untuk pengurusan paling ringan — misalnya NIB perorangan tanpa izin turunan. Layanan yang menuntut akta notaris, izin teknis, atau sertifikasi (PT, Halal, BPOM) berbeda harganya sesuai kompleksitas. Gunakan kalkulator biaya di situs kami atau tanyakan langsung — kami beri angka pasti, bukan rentang yang menggantung.",
      },
      {
        qid: "kebijakan-refund",
        q: "Bagaimana kebijakan pengembalian dana (refund)?",
        a: "Jika izin gagal terbit karena kesalahan proses kami, jasa yang dibayar dikembalikan 100% sesuai kontrak — prosesnya berjalan sejak pengajuan resmi dan biasanya rampung dalam beberapa hari kerja. Biaya resmi yang sudah masuk kas negara (PNBP) atau honor notaris tidak bisa ditarik kembali karena memang diserahkan ke pihak ketiga. Semua kondisi refund kami bacakan jelas sebelum Anda menandatangani.",
      },
    ],
  },
  {
    cid: "pasca-terbit",
    label: "Pasca Terbit & Kepatuhan",
    emoji: "🔄",
    desc: "Perpanjangan, LKPM, mutakhirkan data, dan kalender kepatuhan tahunan.",
    items: [
      {
        qid: "perpanjangan-izin",
        q: "Apakah izin usaha perlu diperpanjang?",
        a: "Sebagian ya, sebagian tidak. NIB berlaku selama usaha aktif, tetapi sertifikat halal berlaku 4 tahun dan wajib diperpanjang, izin edar BPOM 5 tahun, merek 10 tahun, dan beberapa izin sektoral wajib dimutakhirkan berkala. Kami mencatat tanggal kedaluwarsa semua izin Anda dan mengingatkan jauh sebelum jatuh tempo — jangan sampai operasional terganggu karena izin lapsed.",
      },
      {
        qid: "lkpm-berkala",
        q: "Apa itu LKPM dan siapa yang wajib lapor?",
        a: "LKPM (Laporan Kegiatan Penanaman Modal) adalah laporan berkala perkembangan usaha di OSS-RBA: triwulanan untuk usaha mikro-kecil, bulanan untuk usaha menengah dan besar. Semua pemilik NIB wajib melaporkan, termasuk UMKM perorangan. Laporannya gratis dan tidak lama — tapi sanksinya nyata kalau dibiarkan, jadi kami sediakan layanan lapor rutin atau pengingat otomatis.",
      },
      {
        qid: "update-data-nib-klu",
        q: "Bagaimana kalau alamat, KBLI, atau data usaha saya berubah?",
        a: "Perubahan data usaha (alamat, modal, bidang usaha) wajib dimutakhirkan di OSS-RBA, dan bila relevan juga di akta & AHU serta profil Coretax DJP. Memutakhirkan sejak dini penting agar izin turunan dan pelaporan pajak Anda tetap konsisten. Kami bantu proses pemutakhiran end-to-end, termasuk sinkronisasi antar sistem.",
      },
      {
        qid: "sanksi-administratif",
        q: "Izin saya sudah kadaluarsa / belum pernah dilaporkan (LKPM), bisa dibantu?",
        a: "Bisa. Kami menangani regularisasi: perpanjangan izin, kewajiban LKPM di OSS, update data NIB, sampai penyelesaian sanksi administratif ringan. Konsultasikan kondisi Anda — semakin cepat dirapikan, semakin kecil risikonya.",
      },
      {
        qid: "kalender-kepatuhan-tahunan",
        q: "Apakah ada layanan pendampingan kepatuhan tahunan?",
        a: "Ada. Kami menyusun kalender kepatuhan khusus untuk usaha Anda: jadwal LKPM, SPT Masa & Tahunan, perpanjangan sertifikat, sampai kewajiban sektoral seperti halal atau izin edar. Anda menerima pengingat sebelum setiap tenggat dan bisa delegasikan pengerjaannya ke tim kami. Ini cara paling murah mencegah sanksi — jauh lebih murah daripada memperbaikinya.",
      },
    ],
  },
  {
    cid: "internasional",
    label: "Ekspansi & Investor Asing",
    emoji: "🌍",
    desc: "PMA, ekspansi ke Arab Saudi, dan layanan untuk investor & klien luar negeri.",
    items: [
      {
        qid: "pma-syarat-modal",
        q: "Apa syarat modal untuk mendirikan PMA di Indonesia?",
        a: "PT PMA umumnya mensyaratkan rencana investasi di atas Rp 10 miliar per KBLI 5 digit (di luar tanah dan bangunan), dengan komitmen modal ditempatkan minimal Rp 10 miliar. Direksi minimal satu orang, dan pemegang saham asing bisa hingga 100% untuk KBLI yang terbuka. Kami bantu uji kelayakan KBLI, struktur saham, sampai terbitnya NIB dan izin kerja direksi.",
      },
      {
        qid: "izin-usaha-arab-saudi",
        q: "Apakah bisa bantu buka usaha di Arab Saudi?",
        a: "Bisa. Tim internasional kami menangani ekspansi ke Arab Saudi era Vision 2030: lisensi investasi MISA (banyak sektor kini terbuka 100% kepemilikan asing), Commercial Registration (CR), Iqama direksi, sampai kepatuhan ZATCA e-invoice & Saudization. Semua dari Jakarta, tanpa Anda harus bolak-balik ke Riyadh.",
      },
      {
        qid: "dukungan-bahasa-inggris",
        q: "Apakah tersedia dukungan bahasa Inggris untuk investor?",
        a: "Ya. Tim kami melayani konsultasi, penawaran, kontrak, dan pelaporan progres dalam bahasa Inggris penuh — cocok untuk investor asing atau tim regional yang tidak berbahasa Indonesia. Dokumen legal tetap mengikuti format resmi instansi Indonesia, tetapi kami sediakan ringkasan eksekutif berbahasa Inggris di setiap tahap. Halaman ini pun tersedia dalam 30 bahasa lewat pengalih bahasa di situs.",
      },
      {
        qid: "layanan-klien-luar-negeri",
        q: "Saya sedang di luar negeri, apakah tetap bisa pakai layanan?",
        a: "Tetap bisa. Seluruh proses berjalan online — konsultasi via video call, tanda tangan elektronik yang sah secara hukum, dan pengiriman dokumen asli via kurir internasional bila diperlukan. Klien kami tersebar dari Singapura sampai Belanda, dan jam layanan kami (Senin-Sabtu 08.00-20.00 WIB) menjangkau zona waktu Asia, Eropa, dan Timur Tengah dengan nyaman.",
      },
    ],
  },
];

// ------------------------------------------------------------
// 2. FAQ_UI — String UI halaman FAQ (20 key × 30 bahasa, lengkap)
//    Token yang dipertahankan: {n} di resultCount, {lang} di langNotice.
// ------------------------------------------------------------

export const FAQ_UI: Record<LangCode, Partial<FaqUi>> = {
  // ===== id — kanonik Indonesia =====
  id: {
    searchClear: "Bersihkan pencarian",
    title1: "Semua Pertanyaan",
    titleHigh: "Terjawab",
    title2: "— Lengkap & Jujur",
    subtitle:
      "51 pertanyaan paling sering ditanyakan soal pengurusan izin usaha — dijawab langsung oleh tim konsultan kami, tanpa janji manis.",
    searchPlaceholder: "Cari pertanyaan… (cth: NIB, PT, Halal, pajak)",
    searchLabel: "Cari FAQ",
    noResultsTitle: "Belum ada hasil",
    noResultsSub:
      "Coba kata kunci lain, atau tanyakan langsung ke konsultan kami via WhatsApp 0812-6999-9910 — gratis.",
    allLabel: "Semua",
    questionsSuffix: "pertanyaan",
    resultCount: "{n} pertanyaan ditemukan",
    contactTitle: "Tidak menemukan jawaban Anda?",
    contactSub:
      "Konsultan senior kami siap menjawab via WhatsApp 0812-6999-9910, Senin-Sabtu 08.00-20.00 WIB. Gratis, tanpa komitmen.",
    contactBtnWa: "Chat WhatsApp",
    contactBtnConsult: "Konsultasi Gratis",
    langNotice:
      "Untuk kenyamanan Anda, jawaban ditampilkan dalam {lang} — versi lengkap tersedia dalam Bahasa Indonesia & English.",
    allFaqCta: "Lihat semua FAQ",
    breadcrumbHome: "Beranda",
    breadcrumbFaq: "FAQ",
    updatedLabel: "Terakhir diperbarui",
  },
  // ===== en =====
  en: {
    searchClear: "Clear search",
    title1: "Every Question,",
    titleHigh: "Answered",
    title2: "— Clearly & Honestly",
    subtitle:
      "The 51 most frequently asked questions about business licensing in Indonesia — answered directly by our senior consultants, no sugar-coating.",
    searchPlaceholder: "Search questions… (e.g. NIB, PT, Halal, tax)",
    searchLabel: "Search FAQ",
    noResultsTitle: "No results yet",
    noResultsSub:
      "Try a different keyword, or ask our consultants directly on WhatsApp +62 812-6999-9910 — free of charge.",
    allLabel: "All",
    questionsSuffix: "questions",
    resultCount: "{n} questions found",
    contactTitle: "Didn't find your answer?",
    contactSub:
      "Our senior consultants are ready to answer on WhatsApp +62 812-6999-9910, Monday-Saturday 08:00-20:00 WIB (GMT+7). Free, no commitment.",
    contactBtnWa: "WhatsApp Us",
    contactBtnConsult: "Free Consultation",
    langNotice:
      "For your convenience, answers are shown in {lang} — the full version is available in Bahasa Indonesia & English.",
    allFaqCta: "View all FAQs",
    breadcrumbHome: "Home",
    breadcrumbFaq: "FAQ",
    updatedLabel: "Last updated",
  },
  // ===== zh — 简体中文 =====
  zh: {
    searchClear: "清除搜索",
    title1: "所有问题，",
    titleHigh: "一一解答",
    title2: "——清晰且坦诚",
    subtitle:
      "关于印尼企业办证的最常见 51 个问题——由资深顾问团队直接作答，不吹不瞒。",
    searchPlaceholder: "搜索问题…（例如：NIB、PT、清真认证、税务）",
    searchLabel: "搜索 FAQ",
    noResultsTitle: "暂无结果",
    noResultsSub: "换个关键词试试，或直接通过 WhatsApp 咨询我们的顾问——完全免费。",
    allLabel: "全部",
    questionsSuffix: "个问题",
    resultCount: "找到 {n} 个问题",
    contactTitle: "没有找到您想要的答案？",
    contactSub:
      "资深顾问周一至周六 08:00–20:00（雅加达时间）随时通过 WhatsApp 为您解答。免费，无任何约束。",
    contactBtnWa: "WhatsApp 咨询",
    contactBtnConsult: "免费咨询",
    langNotice: "为了方便您阅读，答案以{lang}显示——完整版本提供印尼语和英语。",
    allFaqCta: "查看全部 FAQ",
    breadcrumbHome: "首页",
    breadcrumbFaq: "常见问题",
    updatedLabel: "最后更新",
  },
  // ===== ja — 日本語 =====
  ja: {
    searchClear: "検索をクリア",
    title1: "よくある質問、",
    titleHigh: "すべて回答",
    title2: "——明快かつ誠実に",
    subtitle:
      "インドネシアでの事業許可に関する最頻出 51 の質問に、シニアコンサルタントチームが直接お答えします。誇大な約束はいたしません。",
    searchPlaceholder: "質問を検索…（例：NIB、PT、ハラール、税務）",
    searchLabel: "FAQ を検索",
    noResultsTitle: "該当する結果がありません",
    noResultsSub:
      "別のキーワードをお試しいただくか、WhatsApp でコンサルタントに直接ご質問ください。無料です。",
    allLabel: "すべて",
    questionsSuffix: "件の質問",
    resultCount: "{n} 件の質問が見つかりました",
    contactTitle: "お探しの答えが見つかりませんか？",
    contactSub:
      "シニアコンサルタントが WhatsApp で対応します（月〜土 8:00〜20:00、ジャカルタ時間）。無料・契約の義務なし。",
    contactBtnWa: "WhatsApp で相談",
    contactBtnConsult: "無料相談",
    langNotice:
      "読みやすいよう、回答は{lang}で表示しています——完全版はインドネシア語と英語でご覧いただけます。",
    allFaqCta: "FAQ をすべて見る",
    breadcrumbHome: "ホーム",
    breadcrumbFaq: "FAQ",
    updatedLabel: "最終更新",
  },
  // ===== ko — 한국어 =====
  ko: {
    searchClear: "검색 지우기",
    title1: "모든 질문에",
    titleHigh: "정직하게 답합니다",
    title2: " — 명확하게",
    subtitle:
      "인도네시아 사업 인허가에 관해 가장 자주 묻는 51가지 질문을 시니어 컨설턴트 팀이 직접 답변합니다. 과장 없이 솔직하게.",
    searchPlaceholder: "질문 검색… (예: NIB, PT, 할랄, 세금)",
    searchLabel: "FAQ 검색",
    noResultsTitle: "검색 결과가 없습니다",
    noResultsSub:
      "다른 키워드로 검색하거나 WhatsApp으로 컨설턴트에게 직접 무료로 문의하세요.",
    allLabel: "전체",
    questionsSuffix: "개 질문",
    resultCount: "{n}개의 질문을 찾았습니다",
    contactTitle: "원하는 답을 찾지 못하셨나요?",
    contactSub:
      "시니어 컨설턴트가 WhatsApp으로 답변드립니다 (월~토 08:00–20:00 자카르타 시간). 무료이며 약정도 없습니다.",
    contactBtnWa: "WhatsApp 상담",
    contactBtnConsult: "무료 상담",
    langNotice:
      "편의를 위해 답변은 {lang}로 표시됩니다 — 전체 버전은 인도네시아어와 영어로 제공됩니다.",
    allFaqCta: "전체 FAQ 보기",
    breadcrumbHome: "홈",
    breadcrumbFaq: "FAQ",
    updatedLabel: "마지막 업데이트",
  },
  // ===== vi — Tiếng Việt =====
  vi: {
    searchClear: "Xóa tìm kiếm",
    title1: "Mọi câu hỏi",
    titleHigh: "đều có lời giải",
    title2: " — Rõ ràng & trung thực",
    subtitle:
      "51 câu hỏi thường gặp nhất về xin giấy phép kinh doanh tại Indonesia — do đội ngũ tư vấn viên cao cấp trực tiếp trả lời, không hoa mỹ.",
    searchPlaceholder: "Tìm câu hỏi… (vd: NIB, PT, Halal, thuế)",
    searchLabel: "Tìm kiếm FAQ",
    noResultsTitle: "Chưa có kết quả",
    noResultsSub:
      "Thử từ khóa khác, hoặc hỏi trực tiếp tư vấn viên của chúng tôi qua WhatsApp — miễn phí.",
    allLabel: "Tất cả",
    questionsSuffix: "câu hỏi",
    resultCount: "Tìm thấy {n} câu hỏi",
    contactTitle: "Chưa tìm thấy câu trả lời?",
    contactSub:
      "Tư vấn viên cao cấp sẵn sàng trả lời qua WhatsApp, thứ Hai–thứ Bảy 08:00–20:00 giờ Jakarta. Miễn phí, không ràng buộc.",
    contactBtnWa: "Chat WhatsApp",
    contactBtnConsult: "Tư vấn miễn phí",
    langNotice:
      "Để thuận tiện cho bạn, câu trả lời hiển thị bằng {lang} — bản đầy đủ có bằng tiếng Indonesia & tiếng Anh.",
    allFaqCta: "Xem tất cả FAQ",
    breadcrumbHome: "Trang chủ",
    breadcrumbFaq: "FAQ",
    updatedLabel: "Cập nhật lần cuối",
  },
  // ===== th — ไทย =====
  th: {
    searchClear: "ล้างการค้นหา",
    title1: "ทุกคำถาม",
    titleHigh: "ตอบครบจบ",
    title2: " — ชัดเจนและตรงไปตรงมา",
    subtitle:
      "51 คำถามที่พบบ่อยที่สุดเรื่องขอใบอนุญาตประกอบธุรกิจในอินโดนีเซีย — ตอบโดยตรงจากทีมที่ปรึกษาอาวุโส ไม่มีคำสัญญาฟุ้งเฟ้อ",
    searchPlaceholder: "ค้นหาคำถาม… (เช่น NIB, PT, ฮาลาล, ภาษี)",
    searchLabel: "ค้นหา FAQ",
    noResultsTitle: "ยังไม่พบผลลัพธ์",
    noResultsSub:
      "ลองใช้คำค้นอื่น หรือสอบถามที่ปรึกษาของเราผ่าน WhatsApp ได้ฟรี",
    allLabel: "ทั้งหมด",
    questionsSuffix: "คำถาม",
    resultCount: "พบ {n} คำถาม",
    contactTitle: "ยังไม่เจอคำตอบที่ต้องการ?",
    contactSub:
      "ที่ปรึกษาอาวุโสพร้อมตอบผ่าน WhatsApp จันทร์–เสาร์ 08:00–20:00 น. (เวลาจาการ์ตา) ฟรี ไม่มีข้อผูกมัด",
    contactBtnWa: "แชท WhatsApp",
    contactBtnConsult: "ปรึกษาฟรี",
    langNotice:
      "เพื่อความสะดวกของคุณ คำตอบแสดงเป็นภาษา{lang} — ฉบับเต็มมีทั้งภาษาอินโดนีเซียและอังกฤษ",
    allFaqCta: "ดู FAQ ทั้งหมด",
    breadcrumbHome: "หน้าแรก",
    breadcrumbFaq: "คำถามที่พบบ่อย",
    updatedLabel: "อัปเดตล่าสุด",
  },
  // ===== tl — Filipino =====
  tl: {
    searchClear: "I-clear ang paghahanap",
    title1: "Bawat Tanong,",
    titleHigh: "May Sagot",
    title2: " — Malinaw at Tapat",
    subtitle:
      "Ang 51 pinakamadalas na tanong tungkol sa business licensing sa Indonesia — sinagot mismo ng aming senior consultants, walang palusot.",
    searchPlaceholder: "Maghanap ng tanong… (hal: NIB, PT, Halal, buwis)",
    searchLabel: "Hanapin ang FAQ",
    noResultsTitle: "Wala pang resulta",
    noResultsSub:
      "Subukan ang ibang keyword, o itanong mismo sa aming consultants sa WhatsApp — libre.",
    allLabel: "Lahat",
    questionsSuffix: "na tanong",
    resultCount: "{n} tanong ang nahanap",
    contactTitle: "Hindi pa nahanap ang sagot mo?",
    contactSub:
      "Handang sumagot ang aming senior consultants sa WhatsApp, Lunes–Sabado 08:00–20:00 WIB. Libre, walang commitment.",
    contactBtnWa: "Chat sa WhatsApp",
    contactBtnConsult: "Libreng Konsultasyon",
    langNotice:
      "Para sa kaginhawaan mo, ipinapakita ang mga sagot sa {lang} — ang buong bersyon ay available sa Indonesian at English.",
    allFaqCta: "Tingnan lahat ng FAQ",
    breadcrumbHome: "Home",
    breadcrumbFaq: "FAQ",
    updatedLabel: "Huling na-update",
  },
  // ===== ms — Bahasa Melayu =====
  ms: {
    searchClear: "Kosongkan carian",
    title1: "Semua Soalan,",
    titleHigh: "Terjawab",
    title2: " — Lengkap & Jujur",
    subtitle:
      "51 soalan paling kerap ditanya mengenai pengurusan lesen perniagaan di Indonesia — dijawab terus oleh pasukan perunding kanan kami, tanpa janji manis.",
    searchPlaceholder: "Cari soalan… (cth: NIB, PT, Halal, cukai)",
    searchLabel: "Cari FAQ",
    noResultsTitle: "Tiada hasil lagi",
    noResultsSub:
      "Cuba kata kunci lain, atau tanya terus perunding kami melalui WhatsApp — percuma.",
    allLabel: "Semua",
    questionsSuffix: "soalan",
    resultCount: "{n} soalan ditemui",
    contactTitle: "Tidak jumpa jawapan anda?",
    contactSub:
      "Perunding kanan kami sedia menjawab melalui WhatsApp, Isnin–Sabtu 08:00–20:00 WIB. Percuma, tanpa komitmen.",
    contactBtnWa: "Chat WhatsApp",
    contactBtnConsult: "Konsultasi Percuma",
    langNotice:
      "Untuk keselesaan anda, jawapan dipaparkan dalam {lang} — versi penuh tersedia dalam Bahasa Indonesia & English.",
    allFaqCta: "Lihat semua FAQ",
    breadcrumbHome: "Utama",
    breadcrumbFaq: "FAQ",
    updatedLabel: "Kemas kini terakhir",
  },
  // ===== hi — हिन्दी =====
  hi: {
    searchClear: "खोज साफ़ करें",
    title1: "हर सवाल का",
    titleHigh: "सीधा जवाब",
    title2: " — स्पष्ट और ईमानदार",
    subtitle:
      "इंडोनेशिया में बिज़नेस लाइसेंसिंग से जुड़े 51 सबसे आम सवाल — हमारी सीनियर कंसल्टेंट टीम के जवाब, बिना मीठे वादों के।",
    searchPlaceholder: "सवाल खोजें… (जैसे: NIB, PT, हलाल, टैक्स)",
    searchLabel: "FAQ खोजें",
    noResultsTitle: "अभी कोई नतीजा नहीं",
    noResultsSub:
      "दूसरा कीवर्ड आज़माएँ, या WhatsApp पर हमारे कंसल्टेंट से सीधे पूछें — मुफ़्त।",
    allLabel: "सभी",
    questionsSuffix: "सवाल",
    resultCount: "{n} सवाल मिले",
    contactTitle: "आपका जवाब नहीं मिला?",
    contactSub:
      "हमारे सीनियर कंसल्टेंट WhatsApp पर जवाब देने के लिए तैयार हैं — सोमवार–शनिवार, 08:00–20:00 (जकार्ता समय)। मुफ़्त, कोई बाध्यता नहीं।",
    contactBtnWa: "WhatsApp पर बात करें",
    contactBtnConsult: "मुफ़्त परामर्श",
    langNotice:
      "आपकी सुविधा के लिए जवाब {lang} में दिखाए जाते हैं — पूरा संस्करण इंडोनेशियाई और अंग्रेज़ी में उपलब्ध है।",
    allFaqCta: "सभी FAQ देखें",
    breadcrumbHome: "होम",
    breadcrumbFaq: "FAQ",
    updatedLabel: "अंतिम अपडेट",
  },
  // ===== ta — தமிழ் =====
  ta: {
    searchClear: "தேடலை அழிக்கவும்",
    title1: "அனைத்து கேள்விகளுக்கும்",
    titleHigh: "தெளிவான பதில்",
    title2: " — நேர்மையாக",
    subtitle:
      "இந்தோனேசியாவில் வணிக அனுமதி பெறுவது தொடர்பான 51 மிகக் கேட்கப்படும் கேள்விகள் — எங்கள் மூத்த ஆலோசகர்கள் நேரடியாகப் பதிலளிக்கிறார்கள், வீண் வாக்குறுதிகள் இல்லை.",
    searchPlaceholder: "கேள்வியைத் தேடுங்கள்… (எ.கா: NIB, PT, ஹலால், வரி)",
    searchLabel: "FAQ தேடு",
    noResultsTitle: "இன்னும் முடிவுகள் இல்லை",
    noResultsSub:
      "வேறு சொல்லை முயற்சிக்கவும், அல்லது WhatsApp வழியாக எங்கள் ஆலோசகரிடம் நேரடியாகக் கேளுங்கள் — இலவசம்.",
    allLabel: "அனைத்தும்",
    questionsSuffix: "கேள்விகள்",
    resultCount: "{n} கேள்விகள் கண்டறியப்பட்டன",
    contactTitle: "உங்களுக்குப் பதில் கிடைக்கவில்லையா?",
    contactSub:
      "எங்கள் மூத்த ஆலோசகர்கள் WhatsApp வழியாக பதில் அளிக்க தயார் — திங்கள்–சனி, 08:00–20:00 ஜகார்த்தா நேரம். இலவசம், எந்தக் கட்டாயமும் இல்லை.",
    contactBtnWa: "WhatsApp அரட்டை",
    contactBtnConsult: "இலவச ஆலோசனை",
    langNotice:
      "உங்கள் வசதிக்காக பதில்கள் {lang} மொழியில் காட்டப்படுகின்றன — முழு பதிப்பு இந்தோனேசிய மற்றும் ஆங்கில மொழிகளில் உள்ளது.",
    allFaqCta: "அனைத்து FAQ-ஐயும் பார்க்க",
    breadcrumbHome: "முகப்பு",
    breadcrumbFaq: "FAQ",
    updatedLabel: "கடைசியாக புதுப்பிக்கப்பட்டது",
  },
  // ===== bn — বাংলা =====
  bn: {
    searchClear: "খোঁজা মুছুন",
    title1: "প্রতিটি প্রশ্নের",
    titleHigh: "স্পষ্ট উত্তর",
    title2: " — স্বচ্ছ ও সৎভাবে",
    subtitle:
      "ইন্দোনেশিয়ায় ব্যবসায়িক লাইসেন্সিং সংক্রান্ত ৫১টি সর্বাধিক জিজ্ঞাসিত প্রশ্ন — আমাদের সিনিয়র কনসালট্যান্ট দল সরাসরি উত্তর দিচ্ছে, মিথ্যা প্রতিশ্রুতি ছাড়াই।",
    searchPlaceholder: "প্রশ্ন খুঁজুন… (যেমন: NIB, PT, হালাল, কর)",
    searchLabel: "FAQ খুঁজুন",
    noResultsTitle: "এখনও কোনো ফলাফল নেই",
    noResultsSub:
      "অন্য কীওয়ার্ড দিয়ে চেষ্টা করুন, অথবা WhatsApp-এ আমাদের কনসালট্যান্টকে সরাসরি জিজ্ঞাসা করুন — বিনামূল্যে।",
    allLabel: "সব",
    questionsSuffix: "টি প্রশ্ন",
    resultCount: "{n}টি প্রশ্ন পাওয়া গেছে",
    contactTitle: "আপনার উত্তর পাননি?",
    contactSub:
      "আমাদের সিনিয়র কনসালট্যান্টরা WhatsApp-এ উত্তর দিতে প্রস্তুত — সোমবার–শনিবার, 08:00–20:00 (জাকার্তা সময়)। বিনামূল্যে, কোনো বাধ্যবাধকতা নেই।",
    contactBtnWa: "WhatsApp-এ চ্যাট করুন",
    contactBtnConsult: "বিনামূল্যে পরামর্শ",
    langNotice:
      "আপনার সুবিধার জন্য উত্তরগুলো {lang} ভাষায় দেখানো হচ্ছে — সম্পূর্ণ সংস্করণ ইন্দোনেশিয়ান ও ইংরেজিতে পাওয়া যায়।",
    allFaqCta: "সব FAQ দেখুন",
    breadcrumbHome: "হোম",
    breadcrumbFaq: "FAQ",
    updatedLabel: "সর্বশেষ আপডেট",
  },
  // ===== ar — العربية (RTL) =====
  ar: {
    searchClear: "مسح البحث",
    title1: "كل الأسئلة",
    titleHigh: "إجاباتها بين يديك",
    title2: " — بوضوح وصدق",
    subtitle:
      "أكثر 51 سؤالاً شيوعاً حول استخراج تراخيص الأعمال في إندونيسيا — تجيب عنها فريق مستشارينا مباشرة، دون وعود مبالغ فيها.",
    searchPlaceholder: "ابحث عن سؤال… (مثل: NIB، PT، الحلال، الضرائب)",
    searchLabel: "ابحث في الأسئلة الشائعة",
    noResultsTitle: "لا توجد نتائج بعد",
    noResultsSub: "جرّب كلمة مفتاحية أخرى، أو اسأل مستشارينا مباشرة عبر واتساب — مجاناً.",
    allLabel: "الكل",
    questionsSuffix: "أسئلة",
    resultCount: "تم العثور على {n} سؤالاً",
    contactTitle: "لم تجد إجابتك؟",
    contactSub:
      "مستشارونا الأقدم جاهزون للإجابة عبر واتساب، من الاثنين إلى السبت 08:00–20:00 بتوقيت جاكرتا. مجاناً ودون أي التزام.",
    contactBtnWa: "تواصل عبر واتساب",
    contactBtnConsult: "استشارة مجانية",
    langNotice: "لراحتك، تُعرض الإجابات باللغة {lang} — النسخة الكاملة متاحة بالإندونيسية والإنجليزية.",
    allFaqCta: "عرض جميع الأسئلة",
    breadcrumbHome: "الرئيسية",
    breadcrumbFaq: "الأسئلة الشائعة",
    updatedLabel: "آخر تحديث",
  },
  // ===== fa — فارسی (RTL) =====
  fa: {
    searchClear: "پاک کردن جستجو",
    title1: "هر پرسشی،",
    titleHigh: "پاسخی روشن دارد",
    title2: " — شفاف و صادقانه",
    subtitle:
      "۵۱ پرسش پرتکرار درباره اخذ مجوز کسب‌وکار در اندونزی — مستقیماً توسط تیم مشاوران ارشد ما پاسخ داده می‌شود، بدون وعده‌های اغراق‌آمیز.",
    searchPlaceholder: "جستجوی پرسش… (مثلاً NIB، PT، حلال، مالیات)",
    searchLabel: "جستجوی سؤالات متداول",
    noResultsTitle: "هنوز نتیجه‌ای یافت نشد",
    noResultsSub: "کلیدواژه دیگری را امتحان کنید یا مستقیماً از طریق واتساپ از مشاوران ما بپرسید — رایگان است.",
    allLabel: "همه",
    questionsSuffix: "پرسش",
    resultCount: "{n} پرسش یافت شد",
    contactTitle: "پاسخ خود را پیدا نکردید؟",
    contactSub:
      "مشاوران ارشد ما از دوشنبه تا شنبه، ۰۸:۰۰ تا ۲۰:۰۰ به وقت جاکارتا، در واتساپ آماده پاسخگویی هستند. رایگان و بدون تعهد.",
    contactBtnWa: "گفتگو در واتساپ",
    contactBtnConsult: "مشاوره رایگان",
    langNotice: "برای راحتی شما، پاسخ‌ها به زبان {lang} نمایش داده می‌شوند — نسخه کامل به زبان‌های اندونزیایی و انگلیسی در دسترس است.",
    allFaqCta: "مشاهده همه سؤالات",
    breadcrumbHome: "خانه",
    breadcrumbFaq: "سؤالات متداول",
    updatedLabel: "آخرین به‌روزرسانی",
  },
  // ===== ur — اردو (RTL) =====
  ur: {
    searchClear: "تلاش صاف کریں",
    title1: "ہر سوال کا",
    titleHigh: "واضح جواب",
    title2: " — سچائی کے ساتھ",
    subtitle:
      "انڈونیشیا میں بزنس لائسنسنگ سے متعلق 51 سب سے عام سوالات — ہماری سینئر کنسلٹنٹ ٹیم کے براہِ راست جوابات، بغیر کسی بھاری بھرکم وعدوں کے۔",
    searchPlaceholder: "سوال تلاش کریں… (مثلاً: NIB، PT، حلال، ٹیکس)",
    searchLabel: "FAQ تلاش کریں",
    noResultsTitle: "ابھی کوئی نتیجہ نہیں",
    noResultsSub: "کوئی اور لفظ آزما ئیں، یا WhatsApp پر ہمارے کنسلٹنٹ سے براہِ راست پوچھیں — مفت۔",
    allLabel: "سب",
    questionsSuffix: "سوالات",
    resultCount: "{n} سوالات ملے",
    contactTitle: "آپ کا جواب نہیں ملا؟",
    contactSub:
      "ہمارے سینئر کنسلٹنٹس WhatsApp پر جواب دینے کے لیے حاضر ہیں — پیر تا ہفتہ، 08:00–20:00 جکارتہ وقت۔ مفت، کوئی پابندی نہیں۔",
    contactBtnWa: "WhatsApp پر چیٹ کریں",
    contactBtnConsult: "مفت مشاورت",
    langNotice: "آپ کی سہولت کے لیے جوابات {lang} میں دکھائے جا رہے ہیں — مکمل ورژن انڈونیشیائی اور انگریزی میں دستیاب ہے۔",
    allFaqCta: "تمام FAQ دیکھیں",
    breadcrumbHome: "ہوم",
    breadcrumbFaq: "FAQ",
    updatedLabel: "آخری اپ ڈیٹ",
  },
  // ===== he — עברית (RTL) =====
  he: {
    searchClear: "נקה חיפוש",
    title1: "כל שאלה",
    titleHigh: "מקבלת תשובה",
    title2: " — בבהירות וביושר",
    subtitle:
      "51 השאלות הנפוצות ביותר על רישוי עסקים באינדונזיה — עונים עליהן ישירות היועצים הבכירים שלנו, בלי הבטחות ריקות.",
    searchPlaceholder: "חיפוש שאלה… (למשל: NIB, PT, הלאל, מס)",
    searchLabel: "חיפוש בשאלות הנפוצות",
    noResultsTitle: "אין עדיין תוצאות",
    noResultsSub: "נסו מילת חיפוש אחרת, או שאלו ישירות את היועצים שלנו בוואטסאפ — בחינם.",
    allLabel: "הכול",
    questionsSuffix: "שאלות",
    resultCount: "נמצאו {n} שאלות",
    contactTitle: "לא מצאתם תשובה?",
    contactSub:
      "היועצים הבכירים שלנו זמינים בוואטסאפ, שני–שישי 08:00–20:00 (שעון ג'קרטה). חינם, ללא התחייבות.",
    contactBtnWa: "צ'אט בוואטסאפ",
    contactBtnConsult: "ייעוץ חינם",
    langNotice: "לנוחיותכם, התשובות מוצגות ב{lang} — הגרסה המלאה זמינה באינדונזית ובאנגלית.",
    allFaqCta: "הצגת כל השאלות",
    breadcrumbHome: "ראשי",
    breadcrumbFaq: "שאלות נפוצות",
    updatedLabel: "עודכן לאחרונה",
  },
  // ===== es — Español =====
  es: {
    searchClear: "Borrar búsqueda",
    title1: "Cada pregunta,",
    titleHigh: "respondida",
    title2: " — con claridad y honestidad",
    subtitle:
      "Las 51 preguntas más frecuentes sobre licencias empresariales en Indonesia — respondidas directamente por nuestro equipo de consultores senior, sin promesas vacías.",
    searchPlaceholder: "Buscar preguntas… (p. ej.: NIB, PT, Halal, impuestos)",
    searchLabel: "Buscar en FAQ",
    noResultsTitle: "Aún no hay resultados",
    noResultsSub:
      "Prueba con otra palabra clave o pregunta directamente a nuestros consultores por WhatsApp — gratis.",
    allLabel: "Todas",
    questionsSuffix: "preguntas",
    resultCount: "{n} preguntas encontradas",
    contactTitle: "¿No encuentras tu respuesta?",
    contactSub:
      "Nuestros consultores senior responden por WhatsApp, de lunes a sábado de 08:00 a 20:00 (hora de Yakarta). Gratis y sin compromiso.",
    contactBtnWa: "Chat por WhatsApp",
    contactBtnConsult: "Consulta gratuita",
    langNotice:
      "Para tu comodidad, las respuestas se muestran en {lang} — la versión completa está disponible en indonesio e inglés.",
    allFaqCta: "Ver todas las FAQ",
    breadcrumbHome: "Inicio",
    breadcrumbFaq: "FAQ",
    updatedLabel: "Última actualización",
  },
  // ===== fr — Français =====
  fr: {
    searchClear: "Effacer la recherche",
    title1: "Chaque question,",
    titleHigh: "une réponse claire",
    title2: " — sans détour",
    subtitle:
      "Les 51 questions les plus fréquentes sur les licences d'entreprise en Indonésie — répondues directement par nos consultants seniors, sans promesses en l'air.",
    searchPlaceholder: "Rechercher une question… (ex. : NIB, PT, Halal, impôts)",
    searchLabel: "Rechercher dans la FAQ",
    noResultsTitle: "Aucun résultat pour le moment",
    noResultsSub:
      "Essayez un autre mot-clé, ou posez votre question directement à nos consultants sur WhatsApp — gratuitement.",
    allLabel: "Toutes",
    questionsSuffix: "questions",
    resultCount: "{n} questions trouvées",
    contactTitle: "Vous ne trouvez pas votre réponse ?",
    contactSub:
      "Nos consultants seniors répondent sur WhatsApp, du lundi au samedi de 8 h à 20 h (heure de Jakarta). Gratuit, sans engagement.",
    contactBtnWa: "Discuter sur WhatsApp",
    contactBtnConsult: "Consultation gratuite",
    langNotice:
      "Pour votre confort, les réponses s'affichent en {lang} — la version complète est disponible en indonésien et en anglais.",
    allFaqCta: "Voir toute la FAQ",
    breadcrumbHome: "Accueil",
    breadcrumbFaq: "FAQ",
    updatedLabel: "Dernière mise à jour",
  },
  // ===== de — Deutsch =====
  de: {
    searchClear: "Suche löschen",
    title1: "Jede Frage,",
    titleHigh: "klar beantwortet",
    title2: " — ehrlich & direkt",
    subtitle:
      "Die 51 häufigsten Fragen zur Unternehmenslizenzierung in Indonesien — beantwortet direkt von unserem Senior-Beratungsteam, ohne leere Versprechen.",
    searchPlaceholder: "Frage suchen… (z. B. NIB, PT, Halal, Steuern)",
    searchLabel: "FAQ durchsuchen",
    noResultsTitle: "Noch keine Ergebnisse",
    noResultsSub:
      "Versuchen Sie ein anderes Stichwort oder fragen Sie direkt unsere Berater per WhatsApp — kostenlos.",
    allLabel: "Alle",
    questionsSuffix: "Fragen",
    resultCount: "{n} Fragen gefunden",
    contactTitle: "Ihre Antwort nicht gefunden?",
    contactSub:
      "Unsere Senior-Berater antworten per WhatsApp, Montag–Samstag 08:00–20:00 (Jakarta-Zeit). Kostenlos, unverbindlich.",
    contactBtnWa: "WhatsApp-Chat",
    contactBtnConsult: "Kostenlose Beratung",
    langNotice:
      "Zu Ihrer Bequemlichkeit werden die Antworten auf {lang} angezeigt — die vollständige Version ist auf Indonesisch und Englisch verfügbar.",
    allFaqCta: "Alle FAQ ansehen",
    breadcrumbHome: "Startseite",
    breadcrumbFaq: "FAQ",
    updatedLabel: "Zuletzt aktualisiert",
  },
  // ===== it — Italiano =====
  it: {
    searchClear: "Cancella ricerca",
    title1: "Ogni domanda,",
    titleHigh: "una risposta chiara",
    title2: " — con onestà",
    subtitle:
      "Le 51 domande più frequenti sulle licenze aziendali in Indonesia — risposte direttamente dal nostro team di consulenti senior, senza promesse vuote.",
    searchPlaceholder: "Cerca una domanda… (es.: NIB, PT, Halal, tasse)",
    searchLabel: "Cerca nelle FAQ",
    noResultsTitle: "Ancora nessun risultato",
    noResultsSub:
      "Prova con un'altra parola chiave oppure chiedi direttamente ai nostri consulenti su WhatsApp — gratis.",
    allLabel: "Tutte",
    questionsSuffix: "domande",
    resultCount: "{n} domande trovate",
    contactTitle: "Non hai trovato la risposta?",
    contactSub:
      "I nostri consulenti senior rispondono su WhatsApp, dal lunedì al sabato 08:00–20:00 (ora di Giacarta). Gratis, senza impegno.",
    contactBtnWa: "Chat su WhatsApp",
    contactBtnConsult: "Consulenza gratuita",
    langNotice:
      "Per tua comodità, le risposte sono mostrate in {lang} — la versione completa è disponibile in indonesiano e inglese.",
    allFaqCta: "Vedi tutte le FAQ",
    breadcrumbHome: "Home",
    breadcrumbFaq: "FAQ",
    updatedLabel: "Ultimo aggiornamento",
  },
  // ===== nl — Nederlands =====
  nl: {
    searchClear: "Zoekopdracht wissen",
    title1: "Elke vraag",
    titleHigh: "beantwoord",
    title2: " — duidelijk & eerlijk",
    subtitle:
      "De 51 meestgestelde vragen over bedrijfsvergunningen in Indonesië — rechtstreeks beantwoord door ons senior consultantenteam, zonder loze beloftes.",
    searchPlaceholder: "Zoek een vraag… (bijv. NIB, PT, Halal, belasting)",
    searchLabel: "FAQ doorzoeken",
    noResultsTitle: "Nog geen resultaten",
    noResultsSub:
      "Probeer een andere zoekterm of vraag onze consultants direct via WhatsApp — gratis.",
    allLabel: "Alle",
    questionsSuffix: "vragen",
    resultCount: "{n} vragen gevonden",
    contactTitle: "Je antwoord niet gevonden?",
    contactSub:
      "Onze senior consultants antwoorden via WhatsApp, maandag–zaterdag 08:00–20:00 (Jakarta-tijd). Gratis, zonder verplichtingen.",
    contactBtnWa: "WhatsApp-chat",
    contactBtnConsult: "Gratis adviesgesprek",
    langNotice:
      "Voor jouw gemak worden de antwoorden in het {lang} weergegeven — de volledige versie is beschikbaar in het Indonesisch en Engels.",
    allFaqCta: "Bekijk alle FAQ's",
    breadcrumbHome: "Home",
    breadcrumbFaq: "FAQ",
    updatedLabel: "Laatst bijgewerkt",
  },
  // ===== pt — Português =====
  pt: {
    searchClear: "Limpar pesquisa",
    title1: "Cada pergunta,",
    titleHigh: "respondida",
    title2: " — com clareza e honestidade",
    subtitle:
      "As 51 perguntas mais frequentes sobre licenciamento empresarial na Indonésia — respondidas diretamente pela nossa equipe de consultores sêniores, sem promessas vazias.",
    searchPlaceholder: "Buscar pergunta… (ex.: NIB, PT, Halal, impostos)",
    searchLabel: "Buscar no FAQ",
    noResultsTitle: "Ainda sem resultados",
    noResultsSub:
      "Tente outra palavra-chave ou pergunte diretamente aos nossos consultores no WhatsApp — grátis.",
    allLabel: "Todas",
    questionsSuffix: "perguntas",
    resultCount: "{n} perguntas encontradas",
    contactTitle: "Não encontrou sua resposta?",
    contactSub:
      "Nossos consultores sêniores respondem pelo WhatsApp, de segunda a sábado, das 08:00 às 20:00 (horário de Jacarta). Grátis, sem compromisso.",
    contactBtnWa: "Conversar no WhatsApp",
    contactBtnConsult: "Consulta gratuita",
    langNotice:
      "Para sua comodidade, as respostas são exibidas em {lang} — a versão completa está disponível em indonésio e inglês.",
    allFaqCta: "Ver todas as FAQ",
    breadcrumbHome: "Início",
    breadcrumbFaq: "FAQ",
    updatedLabel: "Última atualização",
  },
  // ===== el — Ελληνικά =====
  el: {
    searchClear: "Εκκαθάριση αναζήτησης",
    title1: "Κάθε ερώτηση",
    titleHigh: "παίρνει απάντηση",
    title2: " — με σαφήνεια & ειλικρίνεια",
    subtitle:
      "Οι 51 πιο συχνές ερωτήσεις για τις επιχειρηματικές άδειες στην Ινδονησία — απαντώνται απευθείας από την ομάδα των έμπειρων συμβούλων μας, χωρίς κενές υποσχέσεις.",
    searchPlaceholder: "Αναζήτηση ερώτησης… (π.χ. NIB, PT, Halal, φόροι)",
    searchLabel: "Αναζήτηση στις FAQ",
    noResultsTitle: "Δεν υπάρχουν ακόμη αποτελέσματα",
    noResultsSub:
      "Δοκιμάστε άλλη λέξη-κλειδί ή ρωτήστε απευθείας τους συμβούλους μας στο WhatsApp — δωρεάν.",
    allLabel: "Όλες",
    questionsSuffix: "ερωτήσεις",
    resultCount: "Βρέθηκαν {n} ερωτήσεις",
    contactTitle: "Δεν βρήκτε την απάντησή σας;",
    contactSub:
      "Οι έμπειροι σύμβουλοί μας απαντούν στο WhatsApp, Δευτέρα–Σάββατο 08:00–20:00 (ώρα Τζακάρτα). Δωρεάν, χωρίς δέσμευση.",
    contactBtnWa: "Συνομιλία στο WhatsApp",
    contactBtnConsult: "Δωρεάν συμβουλευτική",
    langNotice:
      "Για τη δική σας άνεση, οι απαντήσεις εμφανίζονται στα {lang} — η πλήρης έκδοση είναι διαθέσιμη στα ινδονησιακά και τα αγγλικά.",
    allFaqCta: "Προβολή όλων των FAQ",
    breadcrumbHome: "Αρχική",
    breadcrumbFaq: "FAQ",
    updatedLabel: "Τελευταία ενημέρωση",
  },
  // ===== ru — Русский =====
  ru: {
    searchClear: "Очистить поиск",
    title1: "На каждый вопрос —",
    titleHigh: "чёткий ответ",
    title2: " — честно и по делу",
    subtitle:
      "51 самых частых вопросов о получении бизнес-лицензий в Индонезии — отвечают напрямую наши старшие консультанты, без пустых обещаний.",
    searchPlaceholder: "Поиск вопроса… (напр.: NIB, PT, халяль, налоги)",
    searchLabel: "Поиск по FAQ",
    noResultsTitle: "Пока ничего не найдено",
    noResultsSub:
      "Попробуйте другое ключевое слово или задайте вопрос нашим консультантам в WhatsApp — бесплатно.",
    allLabel: "Все",
    questionsSuffix: "вопросов",
    resultCount: "Найдено вопросов: {n}",
    contactTitle: "Не нашли свой ответ?",
    contactSub:
      "Наши старшие консультанты отвечают в WhatsApp, понедельник–суббота 08:00–20:00 (время Джакарты). Бесплатно, без обязательств.",
    contactBtnWa: "Чат в WhatsApp",
    contactBtnConsult: "Бесплатная консультация",
    langNotice:
      "Для вашего удобства ответы показаны на {lang} — полная версия доступна на индонезийском и английском языках.",
    allFaqCta: "Все вопросы и ответы",
    breadcrumbHome: "Главная",
    breadcrumbFaq: "FAQ",
    updatedLabel: "Последнее обновление",
  },
  // ===== pl — Polski =====
  pl: {
    searchClear: "Wyczyść wyszukiwanie",
    title1: "Każde pytanie",
    titleHigh: "z jasną odpowiedzią",
    title2: " — szczerze i konkretnie",
    subtitle:
      "51 najczęściej zadawanych pytań o licencje biznesowe w Indonezji — odpowiada na nie bezpośrednio nasz zespół starszych konsultantów, bez pustych obietnic.",
    searchPlaceholder: "Szukaj pytania… (np. NIB, PT, Halal, podatki)",
    searchLabel: "Szukaj w FAQ",
    noResultsTitle: "Na razie brak wyników",
    noResultsSub:
      "Spróbuj innego słowa kluczowego albo zapytaj naszych konsultantów bezpośrednio na WhatsAppie — bezpłatnie.",
    allLabel: "Wszystkie",
    questionsSuffix: "pytań",
    resultCount: "Znaleziono {n} pytań",
    contactTitle: "Nie znalazłeś odpowiedzi?",
    contactSub:
      "Nasi starsi konsultanci odpowiadają na WhatsAppie, poniedziałek–sobota 08:00–20:00 (czas Dżakarty). Bezpłatnie, bez zobowiązań.",
    contactBtnWa: "Czat na WhatsAppie",
    contactBtnConsult: "Bezpłatna konsultacja",
    langNotice:
      "Dla Twojej wygody odpowiedzi wyświetlane są w języku {lang} — pełna wersja dostępna jest w językach indonezyjskim i angielskim.",
    allFaqCta: "Zobacz wszystkie FAQ",
    breadcrumbHome: "Strona główna",
    breadcrumbFaq: "FAQ",
    updatedLabel: "Ostatnia aktualizacja",
  },
  // ===== uk — Українська =====
  uk: {
    searchClear: "Очистити пошук",
    title1: "На кожне питання —",
    titleHigh: "чітка відповідь",
    title2: " — чесно та по суті",
    subtitle:
      "51 найчастіших питань щодо отримання бізнес-ліцензій в Індонезії — відповідають безпосередньо наші старші консультанти, без порожніх обіцянок.",
    searchPlaceholder: "Пошук питання… (напр.: NIB, PT, халяль, податки)",
    searchLabel: "Пошук у FAQ",
    noResultsTitle: "Поки що нічого не знайдено",
    noResultsSub:
      "Спробуйте інше ключове слово або поставте питання нашим консультантам у WhatsApp — безкоштовно.",
    allLabel: "Усі",
    questionsSuffix: "питань",
    resultCount: "Знайдено питань: {n}",
    contactTitle: "Не знайшли відповіді?",
    contactSub:
      "Наші старші консультанти відповідають у WhatsApp, понеділок–субота 08:00–20:00 (час за Джакартою). Безкоштовно, без зобов'язань.",
    contactBtnWa: "Чат у WhatsApp",
    contactBtnConsult: "Безкоштовна консультація",
    langNotice:
      "Для вашої зручності відповіді показано мовою {lang} — повна версія доступна індонезійською та англійською мовами.",
    allFaqCta: "Переглянути всі FAQ",
    breadcrumbHome: "Головна",
    breadcrumbFaq: "FAQ",
    updatedLabel: "Останнє оновлення",
  },
  // ===== tr — Türkçe =====
  tr: {
    searchClear: "Aramayı temizle",
    title1: "Her soruya",
    titleHigh: "net yanıt",
    title2: " — dürüstçe ve açıkça",
    subtitle:
      "Endonezya'da işletme lisansları hakkında en çok sorulan 51 soru — kıdemli danışman ekibimizce doğrudan yanıtlanıyor, boş vaat yok.",
    searchPlaceholder: "Soru arayın… (örn. NIB, PT, Helal, vergi)",
    searchLabel: "SSS'de ara",
    noResultsTitle: "Henüz sonuç yok",
    noResultsSub:
      "Farklı bir anahtar kelime deneyin veya danışmanlarımıza WhatsApp'tan doğrudan sorun — ücretsiz.",
    allLabel: "Tümü",
    questionsSuffix: "soru",
    resultCount: "{n} soru bulundu",
    contactTitle: "Aradığınız yanıtı bulamadınız mı?",
    contactSub:
      "Kıdemli danışmanlarımız WhatsApp'tan yanıtlıyor: Pazartesi–Cumartesi 08:00–20:00 (Cakarta saati). Ücretsiz, taahhütsüz.",
    contactBtnWa: "WhatsApp'tan yazın",
    contactBtnConsult: "Ücretsiz Danışmanlık",
    langNotice:
      "Size kolaylık olsun diye yanıtlar {lang} dilinde görüntüleniyor — tam sürüm Endonezce ve İngilizce olarak mevcut.",
    allFaqCta: "Tüm SSS'leri gör",
    breadcrumbHome: "Ana Sayfa",
    breadcrumbFaq: "SSS",
    updatedLabel: "Son güncelleme",
  },
  // ===== sw — Kiswahili =====
  sw: {
    searchClear: "Futa utafutaji",
    title1: "Kila swali",
    titleHigh: "limejibiwa",
    title2: " — kwa uwazi na ukweli",
    subtitle:
      "Maswali 51 yanayoulizwa zaidi kuhusu leseni za biashara Indonesia — yanajibiwa moja kwa moja na timu yetu ya washauri wakuu, bila ahadi tupu.",
    searchPlaceholder: "Tafuta swali… (mfano: NIB, PT, Halal, kodi)",
    searchLabel: "Tafuta FAQ",
    noResultsTitle: "Hakuna matokeo bado",
    noResultsSub:
      "Jaribu neno lingine la utafutaji, au uliza moja kwa moja washauri wetu kwa WhatsApp — bila malipo.",
    allLabel: "Zote",
    questionsSuffix: "maswali",
    resultCount: "Maswali {n} yamepatikana",
    contactTitle: "Hukupata jibu lako?",
    contactSub:
      "Washauri wakuu wetu wako tayari kujibu kwa WhatsApp, Jumatatu–Jumamosi 08:00–20:00 (saa za Jakarta). Bila malipo, bila dhamana.",
    contactBtnWa: "Zungumza kwa WhatsApp",
    contactBtnConsult: "Ushauri wa Bure",
    langNotice:
      "Kwa urahisi wako, majibu yanaonyeshwa kwa {lang} — toleo kamili linapatikana kwa Kiindonesia na Kiingereza.",
    allFaqCta: "Tazama FAQ zote",
    breadcrumbHome: "Mwanzo",
    breadcrumbFaq: "FAQ",
    updatedLabel: "Imesasishwa hivi karibuni",
  },
  // ===== pa — ਪੰਜਾਬੀ =====
  pa: {
    searchClear: "ਖੋਜ ਸਾਫ਼ ਕਰੋ",
    title1: "ਹਰ ਸਵਾਲ ਦਾ",
    titleHigh: "ਸਾਫ਼ ਜਵਾਬ",
    title2: " — ਸਪਸ਼ਟ ਤੇ ਇਮਾਨਦਾਰ",
    subtitle:
      "ਇੰਡੋਨੇਸ਼ੀਆ ਵਿੱਚ ਕਾਰੋਬਾਰੀ ਲਾਇਸੰਸਿੰਗ ਬਾਰੇ 51 ਸਭ ਤੋਂ ਵੱਧ ਪੁੱਛੇ ਜਾਣ ਵਾਲੇ ਸਵਾਲ — ਸਾਡੀ ਸੀਨੀਅਰ ਸਲਾਹਕਾਰ ਟੀਮ ਵੱਲੋਂ ਸਿੱਧੇ ਜਵਾਬ, ਬਿਨਾਂ ਖਾਲੀ ਵਾਅਦਿਆਂ ਦੇ।",
    searchPlaceholder: "ਸਵਾਲ ਲੱਭੋ… (ਜਿਵੇਂ: NIB, PT, ਹਲਾਲ, ਟੈਕਸ)",
    searchLabel: "FAQ ਖੋਜੋ",
    noResultsTitle: "ਹਾਲੇ ਕੋਈ ਨਤੀਜਾ ਨਹੀਂ",
    noResultsSub:
      "ਕੋਈ ਹੋਰ ਸ਼ਬਦ ਅਜ਼ਮਾਓ, ਜਾਂ WhatsApp 'ਤੇ ਸਾਡੇ ਸਲਾਹਕਾਰਾਂ ਤੋਂ ਸਿੱਧੇ ਪੁੱਛੋ — ਮੁਫ਼ਤ।",
    allLabel: "ਸਭ",
    questionsSuffix: "ਸਵਾਲ",
    resultCount: "{n} ਸਵਾਲ ਮਿਲੇ",
    contactTitle: "ਤੁਹਾਡਾ ਜਵਾਬ ਨਹੀਂ ਮਿਲਿਆ?",
    contactSub:
      "ਸਾਡੇ ਸੀਨੀਅਰ ਸਲਾਹਕਾਰ WhatsApp 'ਤੇ ਜਵਾਬ ਦੇਣ ਲਈ ਤਿਆਰ ਹਨ — ਸੋਮਵਾਰ–ਸ਼ਨੀਵਾਰ, 08:00–20:00 (ਜਕਾਰਤਾ ਸਮਾਂ)। ਮੁਫ਼ਤ, ਕੋਈ ਪਾਬੰਦੀ ਨਹੀਂ।",
    contactBtnWa: "WhatsApp 'ਤੇ ਗੱਲ ਕਰੋ",
    contactBtnConsult: "ਮੁਫ਼ਤ ਸਲਾਹ",
    langNotice:
      "ਤੁਹਾਡੀ ਸੁਵਿਧਾ ਲਈ ਜਵਾਬ {lang} ਵਿੱਚ ਦਿਖਾਏ ਜਾ ਰਹੇ ਹਨ — ਪੂਰਾ ਵਰਜ਼ਨ ਇੰਡੋਨੇਸ਼ੀਆਈ ਅਤੇ ਅੰਗਰੇਜ਼ੀ ਵਿੱਚ ਉਪਲਬਧ ਹੈ।",
    allFaqCta: "ਸਭ FAQ ਵੇਖੋ",
    breadcrumbHome: "ਘਰ",
    breadcrumbFaq: "FAQ",
    updatedLabel: "ਆਖਰੀ ਅੱਪਡੇਟ",
  },
  // ===== jv — Basa Jawa =====
  jv: {
    searchClear: "Busak panggoleki",
    title1: "Sabeh pitakon,",
    titleHigh: "ana wangsulane",
    title2: " — cetha lan jujur",
    subtitle:
      "51 pitakon sing paling asok ditakokake babagan perizinan usaha ing Indonesia — diwangsuli langsung dening tim konsultan senior kita, tanpa janji manis.",
    searchPlaceholder: "Goleki pitakon… (conto: NIB, PT, Halal, pajak)",
    searchLabel: "Golekana FAQ",
    noResultsTitle: "Durung ana asil",
    noResultsSub:
      "Coba tembung kunci liyane, utawa takok langsung marang konsultan kita liwat WhatsApp — gratis.",
    allLabel: "Kabeh",
    questionsSuffix: "pitakon",
    resultCount: "{n} pitakon ditemokake",
    contactTitle: "Durung nemu wangsulan?",
    contactSub:
      "Konsultan senior kita siap njawab liwat WhatsApp, Senen–Setu 08.00–20.00 WIB. Gratis, tanpa ikatan.",
    contactBtnWa: "Chat WhatsApp",
    contactBtnConsult: "Konsultasi Gratis",
    langNotice:
      "Kanggo kenyamanan sampeyan, wangsulan ditampilake nganggo {lang} — versi lengkap kasedhiya nganggo Basa Indonesia & English.",
    allFaqCta: "Deleng kabeh FAQ",
    breadcrumbHome: "Beranda",
    breadcrumbFaq: "FAQ",
    updatedLabel: "Dianyari pungkasan",
  },
};

/** Ambil string UI FAQ dengan fallback: lang -> en -> id -> nama key. */
export function faqUiT(lang: LangCode, key: keyof FaqUi): string {
  const entry =
    FAQ_UI[lang]?.[key] ?? FAQ_UI.en?.[key] ?? FAQ_UI.id?.[key];
  return entry ?? String(key);
}

// ------------------------------------------------------------
// 3. FAQ_CATEGORY_I18N — Label kategori per bahasa
//    (id/en/zh/ar/ja/es — bahasa lain otomatis fallback)
// ------------------------------------------------------------

export const FAQ_CATEGORY_I18N: Partial<Record<LangCode, Record<string, string>>> = {
  id: {
    umum: "Umum & Kepercayaan",
    "badan-usaha": "Pendirian Badan Usaha",
    "nib-oss": "NIB & OSS-RBA",
    sektoral: "Izin Sektoral & Sertifikasi",
    pajak: "Pajak",
    pmi: "Kerja Luar Negeri (PMI)",
    proses: "Proses & Timeline",
    pembayaran: "Pembayaran & Jaminan",
    "pasca-terbit": "Pasca Terbit & Kepatuhan",
    internasional: "Ekspansi & Investor Asing",
  },
  en: {
    umum: "General & Trust",
    "badan-usaha": "Business Entity Formation",
    "nib-oss": "NIB & OSS-RBA",
    sektoral: "Sectoral Permits & Certifications",
    pajak: "Taxes",
    pmi: "Working Abroad (Migrant Workers)",
    proses: "Process & Timeline",
    pembayaran: "Payment & Guarantee",
    "pasca-terbit": "Post-Issuance & Compliance",
    internasional: "Expansion & Foreign Investors",
  },
  zh: {
    umum: "常见问题与信任",
    "badan-usaha": "企业主体注册",
    "nib-oss": "NIB 与 OSS-RBA",
    sektoral: "行业许可与认证",
    pajak: "税务",
    pmi: "海外就业（印尼劳工）",
    proses: "流程与时间",
    pembayaran: "付款与保障",
    "pasca-terbit": "发证后与合规",
    internasional: "海外扩张与外国投资者",
  },
  ar: {
    umum: "أسئلة عامة والموثوقية",
    "badan-usaha": "تأسيس الكيان التجاري",
    "nib-oss": "NIB و OSS-RBA",
    sektoral: "التراخيص القطاعية والشهادات",
    pajak: "الضرائب",
    pmi: "العمل بالخارج (العمّال المهاجرون)",
    proses: "العملية والإطار الزمني",
    pembayaran: "الدفع والضمان",
    "pasca-terbit": "ما بعد الإصدار والامتثال",
    internasional: "التوسع والمستثمرون الأجانب",
  },
  ja: {
    umum: "一般・信頼",
    "badan-usaha": "法人設立",
    "nib-oss": "NIBとOSS-RBA",
    sektoral: "業種別許可・認証",
    pajak: "税務",
    pmi: "海外就労（PMI）",
    proses: "プロセスと期間",
    pembayaran: "支払いと保証",
    "pasca-terbit": "許可後のフォローとコンプライアンス",
    internasional: "海外展開と外国投資家",
  },
  es: {
    umum: "General y confianza",
    "badan-usaha": "Constitución de sociedades",
    "nib-oss": "NIB y OSS-RBA",
    sektoral: "Permisos sectoriales y certificaciones",
    pajak: "Impuestos",
    pmi: "Trabajo en el extranjero (PMI)",
    proses: "Proceso y plazos",
    pembayaran: "Pago y garantía",
    "pasca-terbit": "Pos emisión y cumplimiento",
    internasional: "Expansión e inversores extranjeros",
  },
};

/** Label kategori dengan fallback: lang -> en -> label kanonik. */
export function faqCategoryLabelT(
  lang: LangCode,
  cid: string,
  fallback: string
): string {
  return (
    FAQ_CATEGORY_I18N[lang]?.[cid] ?? FAQ_CATEGORY_I18N.en?.[cid] ?? fallback
  );
}

// ------------------------------------------------------------
// 4. FAQ_CONTENT — Terjemahan konten Q&A per qid
//    en  = full (semua 51 qid)
//    zh/ar/ja/es = top-10 universal
//    Tidak ada entri "id" — item kanonik di FAQ_CATEGORIES sudah Indonesia.
// ------------------------------------------------------------

export const FAQ_CONTENT: Partial<
  Record<LangCode, Record<string, { q: string; a: string }>>
> = {
  en: {
    "apakah-legal-100": {
      q: "Is the licensing process 100% legal and official?",
      a: "Absolutely legal. We only use official government channels — OSS-RBA, Kemenkumham (AHU), DPMPTSP, DJP, BPJPH, and other relevant agencies — with no shortcuts. Every document is issued in your name and can be verified directly with the issuing authority. If any part of your process doesn't meet the requirements, we tell you upfront instead of promising first and apologizing later.",
    },
    "garansi-uang-kembali": {
      q: "How does the 100% money-back guarantee work?",
      a: "If your permit fails to be issued due to an error on our side, we refund 100% of the service fees you have paid — written into the cooperation contract. What is not covered: official government fees (PNBP) already paid to the state, and failures caused by incorrect or misleading documents on your side. All conditions and exclusions are explained transparently before you sign anything.",
    },
    "beda-konsultan-dan-calo": {
      q: "What's the difference between a licensed consultant and a broker (calo)?",
      a: "A licensed consultant works on top of proper procedure: written contracts, fiscal invoices, payment to a legal-entity bank account, and permits issued in your own name — verifiable directly in OSS-RBA or at the issuing agency. Brokers typically ask for transfers to personal accounts, promise \"instant permits without requirements\", and provide no lawful documentation. If anyone offers an NIB for KBLI codes that clearly require technical permits with no conditions attached, that's a red flag.",
    },
    "kontrak-invoice-resmi": {
      q: "Will I receive a proper contract and invoice?",
      a: "Always. Every engagement is framed by a written cooperation contract covering scope, timeline, cost, and guarantees. Payments come with an official invoice issued under our legal entity (PT Digital Bisnis Manajemen), so it is safe for your company's bookkeeping and tax reporting.",
    },
    "apakah-data-aman": {
      q: "Are my personal data and company documents safe?",
      a: "Yes. Documents are used only for the licensing work you approve, shared with the minimum agencies that require them, and never sold or handed to commercial third parties. Access is restricted to the team handling your file, and sensitive data such as NPWP or Coretax credentials are never exposed to other teams.",
    },
    "kenapa-percaya-kami": {
      q: "Why should I trust PusatPerizinan.com?",
      a: "Our track record is public: 1,247+ clients served, 3,890+ permits processed, and 890+ reviews with a 4.9 rating — spread across 38 provinces and 514 regencies/cities of Indonesia. Everything runs through official channels with a 100% money-back guarantee if we fail. You can read genuine client reviews before deciding anything.",
    },
    "pt-vs-cv-vs-perseorangan": {
      q: "Should I choose a PT, CV, or sole proprietorship?",
      a: "A sole proprietorship (individual NIB) is fastest and cheapest — ideal for small, low-risk businesses where personal and business assets are one. A CV suits simple partnerships, while a PT is the best choice if you need investor trust, limited liability, or plan to join tenders and expand. We analyze your scale, sector, and plans for free before you commit.",
    },
    "syarat-minimal-pendirian": {
      q: "What are the minimum requirements to establish a business entity?",
      a: "For local PTs and CVs, you minimally need the KTP and NPWP of the founders/directors, plus an office address and an active phone number for verification. PT incorporation can now be done 100% online through the Kemenkumham AHU system without a notarial deed for small capital (per PP 8/2021), though many clients still choose a notarial deed for credibility. We check your documents at the start so nothing stalls halfway.",
    },
    "modal-dasar-dan-tertempat-pt": {
      q: "What is the required minimum capital for a PT?",
      a: "Since the Job Creation Law and PP 8/2021, there is no longer a fixed minimum of IDR 50 million — the authorized capital is set by agreement between shareholders, with at least 25% of it issued and paid up. For an individual PT (micro entity), capital is fully merged with the owner's personal assets. We help you pick a realistic figure based on your KBLI needs and business credibility.",
    },
    "pendirian-oleh-wna-pma": {
      q: "Can a foreign national (WNA) establish a business in Indonesia?",
      a: "Yes, through a PT PMA (foreign investment company) registered with the Ministry of Investment/BKPM. PT PMAs have their own capital requirements, and many KBLI codes are open to 100% foreign ownership while certain sectors are restricted under the positive investment list. For investor KITAS holders, establishing a PMA is also the legal path to residency. Our team handles everything from investment approval to NIB and technical permits.",
    },
    "tanpa-kantor-sendiri": {
      q: "I don't have my own office yet — can I still register a business?",
      a: "Yes. A virtual office address (including NPWP facilities and a mailing address) can be used for PT/CV incorporation and NIB issuance, as long as the KBLI and the local DPMPTSP allow it. Certain KBLI codes or locations (for example physical premises for building permits) still require a real address — we check this before you pay anything. Virtual office packages cost a fraction of a physical office.",
    },
    "apa-itu-nib": {
      q: "What is an NIB and why does it matter?",
      a: "The NIB (Business Identification Number) is the single identity of a business entity issued through OSS-RBA (Indonesia's Online Single Submission system) based on your NIK/NPWP. It replaces the old SIUP and TDP, and is the prerequisite for obtaining operational permits, joining tenders, opening corporate bank accounts, and verifying your business on marketplaces. Without an NIB, your business is administratively invisible to the government.",
    },
    "berapa-lama-nib-terbit": {
      q: "How long does it take for an NIB to be issued?",
      a: "If your KTP/NPWP data is valid and the risk profile of your KBLI codes requires no additional verification, the NIB is issued automatically within minutes to 1 working day. The usual blockers are a NIK not matched by Dukcapil, an inactive NPWP, or KBLI codes that require sectoral permits first. We pre-check everything before submitting so the process truly is that fast.",
    },
    "biaya-resmi-nib-pnbp": {
      q: "Do I have to pay government fees for the NIB?",
      a: "NIB issuance through OSS-RBA carries no PNBP (non-tax state revenue) — the government fee is Rp 0. What you pay us is the service fee: choosing the right KBLI codes, preventing wrong risk-level selection, and preparing the downstream permits. Be wary of parties charging a hefty \"OSS fee\"; that is not an official state charge.",
    },
    "level-risiko-kbli": {
      q: "What are KBLI risk levels (low, medium, high)?",
      a: "Since the Job Creation Law, every KBLI code falls into a risk level: low requires only an NIB; medium-low requires a self-declared standard certificate; medium-high requires a verified standard certificate; high requires a full license under specific rules. Choosing the wrong level can leave your business operating without lawful legitimacy. We map all of your business KBLIs and make sure every level is fulfilled.",
    },
    "kewajiban-lkpm-oss": {
      q: "Are there reporting obligations after the NIB is issued?",
      a: "Yes. Every business owner must submit the LKPM (Investment Activity Report) periodically through OSS-RBA — quarterly for small businesses, monthly for medium and large ones. The report is free but often forgotten, and it carries administrative sanctions. We can file it for you, or keep you on track with a compliance calendar.",
    },
    "klu-5-digit": {
      q: "Why must my KLU be 5 digits, and can it be changed?",
      a: "Since OSS-RBA was integrated with the DJP system, the KLU (Field of Business Code) uses a 5-digit format aligned with KBLI 2020 — no longer 4 digits. Your KLU affects tax calculation and your business risk profile in Coretax. If your code is still the old format or no longer matches your actual business, we help you file a data update so you stay safe during SPT filing and audits.",
    },
    "halal-berapa-lama": {
      q: "How long does Halal certification take?",
      a: "Through the regular BPJPH route, halal certification generally completes within 14–30 working days after documents and the audit are done; the self-declare route for assisted MSMEs can be faster. Everything runs on the SIHALAL system — from application and the assignment of an LPH (Halal Inspection Agency) to the fatwa ruling. Food and beverage products marketed without a halal certificate face sanctions after the transition period, so it's best to start early.",
    },
    "beda-bpom-pirt": {
      q: "When does my product need BPOM authorization and when is PIRT enough?",
      a: "PIRT is for low-risk processed foods made by MSMEs with a shelf life under 7 days — bread, chips, bottled sambal and similar — issued by the DPMPTSP. BPOM market authorization (MD/BP) is mandatory for higher-risk products, long shelf-life goods, exports, and categories like supplements and cosmetics. We help determine the correct route from the start so you don't spend on the wrong one.",
    },
    "pbg-slf-gedung": {
      q: "What's the difference between PBG and SLF, and when are they required?",
      a: "The PBG (Building Approval) replaced the IMB and is required before constructing or occupying a building, issued by the DPMPTSP/Ministry of PUPR via SIMBG. The SLF (Certificate of Functional Feasibility) is issued once construction is complete and technical standards are proven — a prerequisite for operating businesses such as hotels, factories, and cafés in commercial buildings. We handle everything from measurements and technical documents to issuance of both.",
    },
    "izin-lingkungan-sppl-ukl-upl-amdal": {
      q: "Which environmental permit do I need: SPPL, UKL-UPL, or AMDAL?",
      a: "It depends on your impact level: SPPL for small, low-impact businesses; UKL-UPL for medium ones; and AMDAL for large or high-risk operations (factories, mining, major infrastructure). Environmental documents are prerequisites for the NIB and certain sectoral operational permits. We do a free initial screening so you don't prepare heavier documents than you actually need.",
    },
    "pendaftaran-merek-djki": {
      q: "How do I protect my business brand (trademark)?",
      a: "Trademarks are registered with DJKI (Kemenkumham) and are valid for 10 years, renewable. Substantive examination can take 15–30 days on the accelerated MSME track, while the regular route may take several months. Indonesia follows first-to-file — if your brand isn't registered, someone else can register it first. We run a similarity search before filing so your application isn't rejected.",
    },
    "izin-travel-ibadah-iata": {
      q: "Can you handle umrah/hajj travel licenses or IATA accreditation?",
      a: "Yes — we have a dedicated Travel Ibadah & Aviation division. We handle travel PT incorporation, SIPU/SPPU (PPIU) up to PPIH licenses for hajj, including SIMPONI registration and the collective pilgrim account. For ticketing agents, we prepare IATA accreditation (BSP/CASS) so you can issue official international tickets.",
    },
    "npwp-16-digit-coretax": {
      q: "Why is my NPWP now 16 digits, and what about Coretax?",
      a: "Since the NIK-NPWP integration, tax IDs use 16 digits (following the NIK format), and all tax administration has moved to the DJP Coretax system. For business entities, updating your Coretax profile (KLU, owners, authorities) is mandatory so filings and payments don't break. We help with account activation, profile updates, and day-to-day compliance in the new system.",
    },
    "spt-tahunan-dan-masa": {
      q: "What's the difference between annual and monthly tax returns (SPT)?",
      a: "The SPT Masa is filed monthly for specific objects — such as VAT (PPN) and withholding taxes — while the SPT Tahunan is filed once a year summarizing all income. Late annual returns carry a fine of Rp 100,000 for individuals and Rp 1,000,000 for companies. We handle preparation, filing, and corrections if anything goes wrong.",
    },
    "pph-final-umkm-05": {
      q: "Does my business qualify for the 0.5% final income tax?",
      a: "Turnover up to IDR 4.8 billion per year can use the MSME final tax of 0.5% of gross revenue (PP 55/2022), with a 0% rate on turnover up to IDR 500 million in your first year of operation. There are limits: owners who also earn income from employment or other activities (e.g. civil servants or employees) cannot use this scheme. We compare the 0.5% scheme against regular rates so you choose correctly from day one.",
    },
    "pengukuhan-pkp-ppn": {
      q: "When must a business become PKP and charge VAT (PPN)?",
      a: "A business with turnover above IDR 4.8 billion in one book year must be confirmed as PKP (VAT-registered entrepreneur) and collect VAT at 11% (12% applies to luxury goods under current rules). Small businesses can also voluntarily register as PKP for tenders or deals with large companies. We handle the confirmation, tax invoices, and monthly VAT reporting in Coretax.",
    },
    "sanksi-keterlambatan-pajak": {
      q: "What are the penalties for late tax payment or filing?",
      a: "Late payment of income tax or VAT incurs interest of 2% per month (up to 24 months) on the tax due, while late returns carry administrative fines. Penalties can be avoided or reduced through return corrections and prompt payment before an assessment is issued. If you're already late, don't wait — we help regularize before the bill balloons.",
    },
    "pmi-biaya-penempatan": {
      q: "Do migrant workers (PMI) have to pay placement fees?",
      a: "No — under Law No. 18/2017 on the Protection of Indonesian Migrant Workers, PMI must not be charged illegal placement fees. Process costs such as documents, training, and certification are borne by the employer or the licensed agency (PPTKIS) depending on the scheme; only some personal documents (e.g. passport) may be your own responsibility. Anyone demanding tens of millions with unrealistic salary promises is breaking the law — a hard red flag. We make sure your placement follows the regulation, without illegal charges.",
    },
    "jalur-resmi-siskop2mi-g2g": {
      q: "What are the official channels for working abroad?",
      a: "There are three main routes: placement through a licensed PPTKIS with job orders recorded in SISKOP2MI (Ministry of Manpower), government-to-government (G2G) schemes such as Japan, South Korea, and Germany, and independent placement which still must be processed through BP2MI for departure papers. Every legal route gives you a written work contract, insurance, and post-arrival protection. We help you pick the route that fits your profession and destination.",
    },
    "negara-tujuan-pmi": {
      q: "Which destination countries are most popular for PMI?",
      a: "Japan (SSW/Tokutei Ginou scheme), South Korea (EPS), Hong Kong, Taiwan, Malaysia, Singapore, and Middle East countries such as Saudi Arabia and the UAE receive the most Indonesian workers. Each country has different language, skill, and sector requirements — Japan, for example, requires passing JLPT and skills tests. We help from country selection and language training to departure.",
    },
    "syarat-dokumen-pmi": {
      q: "What documents do prospective migrant workers need to prepare?",
      a: "The basics: KTP, birth certificate, diploma (per the destination country's requirement), passport, medical check results, and the yellow health card. Certain countries add BNSP competency certificates, language certificates (JLPT/EPS-TOPIK), and pre-departure training. We map the document list per country and accompany you until you fly.",
    },
    "berapa-lama-per-jenis-izin": {
      q: "How long does each type of permit take?",
      a: "An NIB can be done in 1 working day, PT/CV incorporation 3–7 working days, Halal certification 14–30 days, BPOM 30–60 days, and AMDAL 30–90 days. The official estimate is given to you in writing during the free consultation — before you commit to anything. If there's potential delay from an agency's side, we tell you rather than keep it quiet.",
    },
    "harus-datang-ke-kantor": {
      q: "Do I have to come to your office?",
      a: "Not at all. 95% of the process is done online, plus document courier to your address. Our service covers all 38 provinces and 514 regencies/cities of Indonesia. For special needs (physical audits, AMDAL, mining sectors), our team comes to your location instead.",
    },
    "jangkauan-wilayah-layanan": {
      q: "Is your service available in my city?",
      a: "Yes — we cover 38 provinces and 514 regencies/cities across Indonesia, from Sabang to Merauke. Most filings run fully online through official government systems (OSS-RBA, AHU, Coretax, SIMBG), so a physical office is not a barrier. For face-to-face needs, consultation can be done by video call or a scheduled visit.",
    },
    "dokumen-yang-disiapkan": {
      q: "What documents do I need to prepare at the start?",
      a: "For most filings you only need your KTP, NPWP, and an active WhatsApp number — we guide the rest step by step. For business entities and sectoral permits, we send a specific checklist (deed, address proof, technical documents) upfront. We never ask for unnecessary documents, and all files are returned or safely archived after completion.",
    },
    "belum-punya-badan-usaha": {
      q: "I don't have a business entity yet — can you handle everything at once?",
      a: "Absolutely — this is actually our most popular package. We handle it all in one roadmap: establishing the entity (PT/CV/sole proprietorship), the NIB, and sectoral operational permits. You just prepare your personal KTP and NPWP; we coordinate the rest.",
    },
    "skema-termin-50-50": {
      q: "How does the payment scheme work?",
      a: "50% upfront (down payment) after the contract is signed, 50% after the permit is issued. The scheme balances commitment on both sides: we work fully from day one, and you don't carry all the risk upfront. For large packages or corporate engagements, installments can be adjusted in the quotation.",
    },
    "metode-pembayaran": {
      q: "What payment methods are available?",
      a: "Bank transfer to our official legal-entity account, or payment through a licensed payment gateway (cards, QRIS, virtual accounts) for convenience. Every payment comes with an official invoice and verifiable proof. We never ask for transfers to personal accounts — if someone does that in our name, report it immediately.",
    },
    "biaya-tersembunyi": {
      q: "Are there any hidden fees?",
      a: "No. Every cost component — our service fee, official state fees (PNBP), notary, and other technical costs — is clearly listed in the written quotation before you pay. If something outside the scope becomes necessary mid-process, we confirm with you first instead of just invoicing. Our principle: clear price upfront, no surprise fees.",
    },
    "harga-mulai-350-ribu": {
      q: "Why do services start from Rp 350 thousand — what does that include?",
      a: "Rp 350 thousand is the entry point for the lightest filings — for example an individual NIB with no downstream permits. Services requiring notarial deeds, technical permits, or certifications (PT, Halal, BPOM) are priced according to complexity. Use the cost calculator on our site or just ask — we give you a firm number, not a vague range.",
    },
    "kebijakan-refund": {
      q: "What is your refund policy?",
      a: "If the permit fails to be issued due to an error in our process, 100% of the service fee is refunded as stated in the contract — processing starts from the formal request and usually completes within a few working days. Official fees already paid to the state (PNBP) or notary honorariums cannot be recovered because they went to third parties. All refund conditions are read out clearly before you sign.",
    },
    "perpanjangan-izin": {
      q: "Do business permits need renewal?",
      a: "Some do, some don't. The NIB stays valid as long as the business is active, but halal certificates must be renewed (valid 4 years), BPOM marketing authorizations last 5 years, trademarks 10 years, and several sectoral permits require periodic updates. We track the expiry dates of all your permits and remind you well before they lapse — don't let operations stall over an expired license.",
    },
    "lkpm-berkala": {
      q: "What is the LKPM and who must report it?",
      a: "The LKPM (Investment Activity Report) is a periodic business-progress report filed in OSS-RBA: quarterly for micro/small businesses, monthly for medium and large ones. Every NIB holder must report, including individual MSMEs. It's free and quick — but the sanctions are real if ignored, so we offer routine filing or automated reminders.",
    },
    "update-data-nib-klu": {
      q: "What if my address, KBLI, or business data changes?",
      a: "Any change to business data (address, capital, line of business) must be updated in OSS-RBA and, where relevant, in the deed/AHU and your DJP Coretax profile. Early updates keep your downstream permits and tax reporting consistent. We handle end-to-end updates including cross-system synchronization.",
    },
    "sanksi-administratif": {
      q: "My permit has expired / I've never filed the LKPM — can you fix it?",
      a: "Yes. We handle regularization: permit renewals, LKPM obligations in OSS, NIB data updates, and resolution of light administrative sanctions. Tell us your situation — the sooner it's cleaned up, the smaller the risk.",
    },
    "kalender-kepatuhan-tahunan": {
      q: "Do you offer annual compliance assistance?",
      a: "Yes. We build a compliance calendar specific to your business: LKPM schedules, monthly and annual SPTs, certificate renewals, and sectoral duties such as halal or marketing authorizations. You get reminders ahead of every deadline and can delegate the work to our team. It's the cheapest way to avoid sanctions — far cheaper than fixing them.",
    },
    "pma-syarat-modal": {
      q: "What are the capital requirements for a PMA in Indonesia?",
      a: "A PT PMA generally requires an investment plan above IDR 10 billion per 5-digit KBLI (excluding land and buildings), with a minimum paid-up capital commitment of IDR 10 billion. At least one director is required, and foreign shareholders can hold up to 100% for open KBLI codes. We assist with KBLI feasibility, share structure, up to NIB issuance and directors' work permits.",
    },
    "izin-usaha-arab-saudi": {
      q: "Can you help open a business in Saudi Arabia?",
      a: "Yes. Our international team handles expansion into Saudi Arabia in the Vision 2030 era: MISA investment licenses (many sectors now open to 100% foreign ownership), Commercial Registration (CR), directors' Iqama, through to ZATCA e-invoicing and Saudization compliance. All handled from Jakarta — no back-and-forth trips to Riyadh required.",
    },
    "dukungan-bahasa-inggris": {
      q: "Is English-language support available for foreign investors?",
      a: "Yes. Our team serves consultations, quotations, contracts, and progress reports fully in English — ideal for foreign investors or regional teams who don't speak Indonesian. Legal documents still follow official Indonesian agency formats, but we provide an English executive summary for every stage. This page is also available in 30 languages via the site's language switcher.",
    },
    "layanan-klien-luar-negeri": {
      q: "I'm currently abroad — can I still use your service?",
      a: "Absolutely. The entire process runs online — consultations by video call, legally valid electronic signatures, and courier delivery of original documents internationally when needed. Our clients are spread from Singapore to the Netherlands, and our service hours (Monday–Saturday 08:00–20:00 WIB) comfortably cover Asia, Europe, and the Middle East time zones.",
    },
  },
  // ===== zh — 中文（简体）Top-10 =====
  zh: {
    "apa-itu-nib": {
      q: "什么是 NIB？为什么它很重要？",
      a: "NIB（企业识别号）是通过 OSS-RBA（印尼在线单一提交系统）基于 NIK/NPWP 签发的企业唯一身份编号。它取代了过去的 SIUP 和 TDP，是申请运营许可、参与投标、开立企业银行账户以及在电商平台上验证企业身份的前提。没有 NIB，您的企业在行政上还不被政府承认。",
    },
    "berapa-lama-nib-terbit": {
      q: "NIB 多久能办下来？",
      a: "只要您的 KTP/NPWP 数据有效，且 KBLI 风险等级不需要额外核验，NIB 会在几分钟到 1 个工作日内自动签发。常见的卡点包括 NIK 未通过民政部门（Dukcapil）核验、NPWP 未激活，或 KBLI 需要先取得行业许可。我们在提交前都会预先核查，确保流程真正这么快。",
    },
    "apakah-legal-100": {
      q: "整个办理流程是 100% 合法合规的吗？",
      a: "绝对合法。我们只走官方政府渠道——OSS-RBA、法律与人权部（AHU）、DPMPTSP、税务总局（DJP）、BPJPH 等相关机构——绝无捷径。所有文件都以您的名义签发，可直接向签发机构核验。如果您的条件中有不满足要求的部分，我们会一开始就如实相告，而不是先许诺后道歉。",
    },
    "garansi-uang-kembali": {
      q: "100% 全额退款保证是如何运作的？",
      a: "如果因我方流程失误导致执照未能签发，我们将退还您已支付的 100% 服务费——并写入合作协议。不包含在内的是：已上缴国库的官方规费（PNBP），以及因您方文件不实或误导造成的失败。所有条件和免责条款都会在签约前透明说明。",
    },
    "harga-mulai-350-ribu": {
      q: "为什么服务 35 万印尼盾起？包含什么？",
      a: "35 万印尼盾是最轻量级业务的起步价——例如不含后续许可的个人 NIB。需要公证书、技术许可或认证的服务（PT、清真认证、BPOM）会按复杂程度另行定价。您可以使用网站上的费用计算器，或直接咨询——我们给出确切数字，而不是模糊区间。",
    },
    "skema-termin-50-50": {
      q: "付款方式是怎样的？",
      a: "合同签署后支付 50% 预付款，执照签发后再支付 50%。这一模式平衡了双方的承诺：我们从第一天起全力工作，您也无需提前承担全部风险。对于大额套餐或企业合作，分期方式可在报价单中调整。",
    },
    "harus-datang-ke-kantor": {
      q: "我需要亲自到办公室办理吗？",
      a: "完全不需要。95% 的流程在线完成，并安排文件快递送到您的地址。我们的服务覆盖印尼全部 38 个省和 514 个县市。如有特殊需求（实地审计、AMDAL、矿业），是我们的团队前往您的所在地。",
    },
    "jangkauan-wilayah-layanan": {
      q: "我所在的城市能享受服务吗？",
      a: "可以——我们的服务覆盖印尼 38 个省、514 个县市，从沙璜到马老奇。绝大多数申报都通过官方政府系统（OSS-RBA、AHU、Coretax、SIMBG）在线完成，实体办公室不构成障碍。如需面对面沟通，可以通过视频会议或预约拜访进行。",
    },
    "pt-vs-cv-vs-perseorangan": {
      q: "应该选择 PT、CV 还是个体经营？",
      a: "个体经营（个人 NIB）最快最省——适合个人资产与经营合一的小型低风险业务。CV 适合简单的合伙经营；如果您需要吸引投资人、享受有限责任保护，或计划参与投标和扩张，PT 是最佳选择。签约前我们会根据您的规模、行业和规划免费分析。",
    },
    "halal-berapa-lama": {
      q: "清真认证需要多长时间？",
      a: "走 BPJPH 常规通道，文件与审核完成后一般 14–30 个工作日办结；受辅导微型企业的自主申报（self-declare）通道可能更快。整个流程都在 SIHALAL 系统上进行——从申请、指派清真检验机构（LPH），到颁布 fatwa。过渡期结束后，无清真证书上市销售的食品饮料将面临处罚，建议尽早办理。",
    },
  },
  // ===== ar — العربية Top-10 =====
  ar: {
    "apa-itu-nib": {
      q: "ما هو رقم NIB ولماذا هو مهم؟",
      a: "رقم NIB (رقم الهوية التجارية) هو الهوية الموحدة للمنشأة التجارية التي تُصدر عبر نظام OSS-RBA (نظام التقديم الموحد الإلكتروني الإندونيسي) استناداً إلى NIK/NPWP. يحل هذا الرقم محل شهادتي SIUP وTDP السابقتين، وهو شرط أساسي للحصول على تراخيص التشغيل والمشاركة في المناقصات وفتح حسابات مصرفية للشركات والتحقق من نشاطك على المنصات التجارية. بدون NIB، لا تعترف الدولة بنشاطك إدارياً بعد.",
    },
    "berapa-lama-nib-terbit": {
      q: "كم يستغرق إصدار رقم NIB؟",
      a: "إذا كانت بيانات KTP/NPWP لديك سليمة ولم يتطلب مستوى مخاطر رموز KBLI تحققاً إضافياً، يصدر رقم NIB تلقائياً خلال دقائق حتى يوم عمل واحد. أما العوائق المعتادة فهي عدم تطابق NIK لدى جهة Dukcapil، أو NPWP غير مفعّل، أو رموز KBLI تتطلب ترخيصاً قطاعياً أولاً. نتحقق من كل شيء قبل التقديم حتى تكون العملية سريعة فعلاً كما نعد.",
    },
    "apakah-legal-100": {
      q: "هل عملية الاستخراج 100% قانونية ورسمية؟",
      a: "قانونية بشكل مطلق. نستخدم القنوات الحكومية الرسمية فقط — OSS-RBA، ووزارة القانون وحقوق الإنسان (AHU)، وDPMPTSP، وDJP، وBPJPH وغيرها — دون أي طرق مختصرة. تُصدر جميع الوثائق باسمك ويمكن التحقق منها مباشرة لدى الجهة المُصدِرة. وإذا لم يستوفِ جزء من إجراءاتك الشروط، نخبرك بذلك منذ البداية بدلاً من الوعود أولاً والاعتذار لاحقاً.",
    },
    "garansi-uang-kembali": {
      q: "كيف تعمل ضمان استرداد 100% من المبلغ؟",
      a: "إذا فشل إصدار الترخيص بسبب خطأ من فريقنا، نسترد لك 100% من أتعاب الخدمة التي دفعتها — وهو ما يُنص عليه في عقد التعاون. لا يشمل الضمان: الرسوم الرسمية (PNBP) التي أودعت في خزينة الدولة، والفشل الناتج عن وثائق من طرفك غير صحيحة أو مضللة. ونوضح جميع الشروط والاستثناءات بشفافية قبل توقيع أي عقد.",
    },
    "harga-mulai-350-ribu": {
      q: "لماذا تبدأ الأسعار من 350 ألف روبية؟ وما الذي تشمله؟",
      a: "مبلغ 350 ألف روبية هو نقطة الدخول لأخف الخدمات — مثل رقم NIB للأفراد دون تراخيص تابعة. أما الخدمات التي تتطلب صحيفة رسمية أو تراخيص فنية أو شهادات (PT، الحلال، BPOM) فتُسعّر حسب درجة التعقيد. استخدم حاسبة التكاليف على موقعنا أو اسأل مباشرة — نعطيك رقماً محدداً، لا مجالاً غامضاً.",
    },
    "skema-termin-50-50": {
      q: "كيف يعمل نظام الدفع؟",
      a: "دفعة أولى 50% بعد توقيع العقد، و50% بعد صدور الترخيص. يوازن هذا النظام التزام الطرفين: نعمل بكامل طاقتنا منذ اليوم الأول، ولا تتحمل أنت المخاطرة كاملة مقدماً. وبالنسبة للباقات الكبيرة أو التعاون المؤسسي، يمكن تعديل الدفعات في عرض السعر.",
    },
    "harus-datang-ke-kantor": {
      q: "هل عليّ التوجه إلى مكتبكم؟",
      a: "لا داعي إطلاقاً. تُنجز 95% من العملية عبر الإنترنت مع توصيل المستندات بالبريد السريع إلى عنوانك. تغطي خدماتنا جميع المحافظ الـ38 و514 مدينة/ضاحية في إندونيسيا. وفي الحالات الخاصة (التدقيق الميداني، AMDAL، قطاع التعدين)، يصل فريقنا هو إلى موقعك.",
    },
    "jangkauan-wilayah-layanan": {
      q: "هل تتوفر خدمتكم في مدينتي؟",
      a: "نعم — نغطي 38 محافظة و514 مدينة/ضاحية في جميع أنحاء إندونيسيا، من سابانغ إلى ميراوقي. تُنجز معظم الطلبات إلكترونياً عبر الأنظمة الحكومية الرسمية (OSS-RBA، AHU، Coretax، SIMBG)، لذا فإن عدم وجود مكتب فعلي ليس عائقاً. وعند الحاجة للقاء المباشر، يمكن إجراء الاستشارة عبر مكالمة مرئية أو زيارة مجدولة.",
    },
    "pt-vs-cv-vs-perseorangan": {
      q: "ماذا ينبغي أن أختار: PT أم CV أم نشاط فردي؟",
      a: "النشاط الفردي (NIB للأفراد) هو الأسرع والأقل تكلفة — مثالي للأعمال الصغيرة منخفضة المخاطر حيث تندمج الأصول الشخصية بأصول النشاط. ويناسب CV الشراكات البسيطة، بينما PT هو الخيار الأفضل إذا كنت تحتاج ثقة المستثمرين أو محدودية المسؤولية أو تخطط للمشاركة في المناقصات والتوسع. نحلل حجم نشاطك وقطاعك وخططك مجاناً قبل أن تقرر.",
    },
    "halal-berapa-lama": {
      q: "كم تستغرق الشهادة الحلال؟",
      a: "عبر المسار المنتظم لدى BPJPH، تكتمل الشهادة الحلال عموماً خلال 14–30 يوم عمل بعد استيفاء الوثائق والتدقيق، بينما قد يكون مسار الإقرار الذاتي للمشاريع الصغيرة المدعومة أسرع. تتم كل العملية عبر نظام SIHALAL — من التقديم، وتعيين جهة الفحص (LPH)، حتى صدور الفتوى. وستواجه المنتجات الغذائية المسوّقة بدون شهادة حلال عقوبات بعد انتهاء الفترة الانتقالية — لذا يُفضل البدء مبكراً.",
    },
  },
  // ===== ja — 日本語 Top-10 =====
  ja: {
    "apa-itu-nib": {
      q: "NIB とは何ですか？なぜ重要なのですか？",
      a: "NIB（Nomor Induk Berusaha／事業識別番号）は、NIK/NPWP に基づき OSS-RBA（インドネシアのオンライン単一申請システム）を通じて発行される事業体の統一識別番号です。旧 SIUP・TDP に代わるもので、営業許可の取得、入札参加、法人口座の開設、モールでの事業者認証などの前提となります。NIB がなければ、行政上あなたの事業はまだ政府に認められていない状態です。",
    },
    "berapa-lama-nib-terbit": {
      q: "NIB の発行にはどのくらいかかりますか？",
      a: "KTP/NPWP の情報が有効で、KBLI のリスクレベルに追加審査が不要な場合、NIB は数分〜1営業日で自動発行されます。つまずきやすいのは、Dukcapil で NIK が照合できない、NPWP が未アクティブ、KBLI に業種別許可が必要、といったケースです。当社は提出前にすべて事前チェックするため、約束どおりの速さで進みます。",
    },
    "apakah-legal-100": {
      q: "手続きは 100% 正規・合法ですか？",
      a: "全面的に合法です。OSS-RBA、法務人権省（AHU）、DPMPTSP、税務総局（DJP）、BPJPH など、政府の正規ルートのみを使用し、近道はしません。すべての書類はお客様の名義で発行され、発行機関で直接確認できます。要件を満たさない部分があれば、美化せずに最初からお伝えします。",
    },
    "garansi-uang-kembali": {
      q: "100% 返金保証はどのように機能しますか？",
      a: "当社側の手続きミスで許可が取得できなかった場合は、お支払いいただいたサービス料の 100% を返金します——協業契約に明記しています。対象外となるのは、すでに国庫に納付された公式手数料（PNBP）と、お客様側の書類の虚偽・不備が原因の失敗です。条件と除外事項は、署名前にすべて透明にご説明します。",
    },
    "harga-mulai-350-ribu": {
      q: "なぜ 35 万ルピアからなのですか？何が含まれますか？",
      a: "35 万ルピアは、最も軽い手続きの入り口の価格です——たとえば下位許可を伴わない個人事業の NIB など。公証人手続きや技術許可、認証（PT、ハラール、BPOM）を要するサービスは、複雑さに応じて価格が変わります。サイトの費用計算ツールを使うか、直接ご質問ください——曖昧なレンジではなく、確定した金額をお出しします。",
    },
    "skema-termin-50-50": {
      q: "支払いスキームはどのようになっていますか？",
      a: "契約締結後に前払い 50%、許可発行後に残り 50%。この方式は双方のコミットメントのバランスを取ります。当社は初日から全力で動き、お客様が最初に全リスクを負うことはありません。大型パッケージや法人向けのご契約では、見積書の中で分割条件を調整できます。",
    },
    "harus-datang-ke-kantor": {
      q: "オフィスに来る必要はありますか？",
      a: "一切不要です。プロセスの 95% はオンラインで完結し、書類はご住所まで宅配便でお届けします。サービスはインドネシア全 38 州・514 市県区をカバーしています。実地監査・AMDAL・鉱業セクターなどの特殊案件では、こちらから現地へ伺います。",
    },
    "jangkauan-wilayah-layanan": {
      q: "私の都市でもサービスを利用できますか？",
      a: "はい——サバンからメラウケまで、インドネシア全 38 州・514 市県区をカバーしています。ほとんどの申請は OSS-RBA、AHU、Coretax、SIMBG など政府の公式システムを通じて完全オンラインで完結するため、実オフィスの有無は障害になりません。対面をご希望の場合は、ビデオ通話または予定訪問で対応します。",
    },
    "pt-vs-cv-vs-perseorangan": {
      q: "PT・CV・個人事業のどれを選ぶべきですか？",
      a: "個人事業（個人 NIB）が最も速く安価で——資産が個人と一体の小規模・低リスク事業に向いています。CV はシンプルな共同経営に、PT は投資家の信頼、有限責任、入札参加や拡大を視野に入れるなら最良の選択肢です。規模・業種・計画に応じて、契約前に無料で分析いたします。",
    },
    "halal-berapa-lama": {
      q: "ハラール認証にはどのくらいかかりますか？",
      a: "BPJPH の通常ルートでは、書類と監査の完了後、おおむね 14〜30 営業日で完了します。伴走支援を受けた中小事業者向けの自己申告（セルフ宣言）ルートならさらに早い場合もあります。すべて SIHALAL システム上で進み——申請、検査機関（LPH）の指名、ファトワー（裁決）まで一貫しています。移行期間後はハラール証明なしで食品を販売すると処罰の対象になるため、早めの着手がおすすめです。",
    },
  },
  // ===== es — Español Top-10 =====
  es: {
    "apa-itu-nib": {
      q: "¿Qué es el NIB y por qué es importante?",
      a: "El NIB (Número de Identificación Empresarial) es la identidad única de la empresa que se emite a través de OSS-RBA (el sistema Online Single Submission de Indonesia) basado en tu NIK/NPWP. Sustituye a los antiguos SIUP y TDP, y es el requisito previo para obtener permisos operativos, participar en licitaciones, abrir cuentas bancarias corporativas y verificar tu negocio en los marketplaces. Sin NIB, tu empresa todavía no existe administrativamente para el gobierno.",
    },
    "berapa-lama-nib-terbit": {
      q: "¿Cuánto tarda en emitirse el NIB?",
      a: "Si tus datos de KTP/NPWP son válidos y el perfil de riesgo de tus códigos KBLI no exige verificación adicional, el NIB se emite automáticamente entre minutos y 1 día hábil. Los bloqueos habituales son un NIK no coincidente en Dukcapil, un NPWP inactivo o códigos KBLI que requieren primero un permiso sectorial. Lo verificamos todo antes de enviar para que el proceso sea realmente tan rápido.",
    },
    "apakah-legal-100": {
      q: "¿El proceso es 100% legal y oficial?",
      a: "Totalmente legal. Solo utilizamos canales gubernamentales oficiales — OSS-RBA, Kemenkumham (AHU), DPMPTSP, DJP, BPJPH y demás agencias pertinentes — sin atajos. Todos los documentos se emiten a tu nombre y pueden verificarse directamente con la autoridad emisora. Si alguna parte de tu trámite no cumple los requisitos, te lo decimos desde el principio en lugar de prometer primero y disculparnos después.",
    },
    "garansi-uang-kembali": {
      q: "¿Cómo funciona la garantía de devolución del 100%?",
      a: "Si el permiso no llega a emitirse por un error de nuestro lado, devolvemos el 100% de los honorarios que hayas pagado — quedó escrito en el contrato de colaboración. No está incluido: las tasas oficiales (PNBP) ya ingresadas al Estado y los fallos causados por documentos tuyos incorrectos o engañosos. Todas las condiciones y exclusiones se explican de forma transparente antes de firmar nada.",
    },
    "harga-mulai-350-ribu": {
      q: "¿Por qué los servicios empiezan en Rp 350 mil? ¿Qué incluye?",
      a: "Rp 350 mil es el punto de entrada para los trámites más ligeros — por ejemplo, un NIB individual sin permisos derivados. Los servicios que requieren escritura notarial, permisos técnicos o certificaciones (PT, Halal, BPOM) se cotizan según su complejidad. Usa la calculadora de costos de nuestro sitio o pregúntanos directamente — te damos una cifra concreta, no un rango vago.",
    },
    "skema-termin-50-50": {
      q: "¿Cómo funciona el esquema de pago?",
      a: "50% por adelantado (anticipo) tras firmar el contrato y 50% cuando el permiso está emitido. El esquema equilibra el compromiso de ambas partes: trabajamos a pleno rendimiento desde el primer día y tú no asumes todo el riesgo por adelantado. Para paquetes grandes o colaboraciones corporativas, los plazos de pago pueden ajustarse en la cotización.",
    },
    "harus-datang-ke-kantor": {
      q: "¿Tengo que ir a su oficina?",
      a: "Para nada. El 95% del proceso se hace en línea, más el envío de documentos por mensajería a tu dirección. Nuestro servicio cubre las 38 provincias y los 514 regencias/ciudades de Indonesia. Para necesidades especiales (auditorías presenciales, AMDAL, sector minero), nuestro equipo es quien viaja a tu ubicación.",
    },
    "jangkauan-wilayah-layanan": {
      q: "¿El servicio está disponible en mi ciudad?",
      a: "Sí — cubrimos 38 provincias y 514 regencias/ciudades en toda Indonesia, de Sabang a Merauke. La mayoría de los trámites se realizan completamente en línea a través de los sistemas oficiales del gobierno (OSS-RBA, AHU, Coretax, SIMBG), así que no tener oficina física no es un obstáculo. Si necesitas trato personal, la consulta puede ser por videollamada o con una visita programada.",
    },
    "pt-vs-cv-vs-perseorangan": {
      q: "¿Debería elegir una PT, una CV o un negocio unipersonal?",
      a: "El negocio unipersonal (NIB individual) es lo más rápido y económico — ideal para negocios pequeños de bajo riesgo donde el patrimonio personal y el empresarial son uno. La CV encaja con sociedades simples, mientras que la PT es la mejor opción si necesitas confianza de inversores, responsabilidad limitada o planeas licitarte y expandirte. Analizamos tu escala, sector y planes gratis antes de que decidas.",
    },
    "halal-berapa-lama": {
      q: "¿Cuánto tarda la certificación Halal?",
      a: "Por la vía regular de BPJPH, la certificación halal suele completarse en 14–30 días hábiles una vez listos los documentos y la auditoría; la vía de autodeclaración para microempresas acompañadas puede ser más rápida. Todo el proceso corre en el sistema SIHALAL — desde la solicitud y la asignación del LPH (organismo de inspección halal) hasta la fatwa. Los alimentos y bebidas que se comercialicen sin certificado halal enfrentarán sanciones al terminar el periodo de transición — conviene empezar cuanto antes.",
    },
  },
};

/** Ambil item FAQ terlokalisasi dengan fallback: lang -> en -> item kanonik.
 *  Catatan: lang "id" SELALU memakai item kanonik (FAQ_CONTENT memang
 *  tidak berisi entri "id" — konten kanoniknya sudah bahasa Indonesia). */
export function faqItemT(lang: LangCode, item: FaqItem): FaqItem {
  if (lang === "id") return item;
  const localized = FAQ_CONTENT[lang]?.[item.qid] ?? FAQ_CONTENT.en?.[item.qid];
  return localized ? { ...item, q: localized.q, a: localized.a } : item;
}

// ------------------------------------------------------------
// 5. Cakupan konten & metadata halaman
// ------------------------------------------------------------

export type FaqContentCoverage = "full" | "top10" | "fallback";

/** Bahasa dengan terjemahan Q&A lengkap (51 item). */
export const FAQ_FULL_LANGS: LangCode[] = ["id", "en"];

/** Bahasa dengan terjemahan Top-10 universal. */
export const FAQ_TOP10_LANGS: LangCode[] = ["zh", "ar", "ja", "es"];

/** Cakupan konten untuk bahasa tertentu. */
export function faqContentCoverage(lang: LangCode): FaqContentCoverage {
  if (FAQ_FULL_LANGS.includes(lang)) return "full";
  if (FAQ_TOP10_LANGS.includes(lang)) return "top10";
  return "fallback";
}

/** Metadata halaman /faq — suffix "| PusatPerizinan.com" ditambahkan layout. */
export const FAQ_META = {
  title: "FAQ — Pertanyaan Umum Pengurusan Izin Usaha",
  description:
    "Jawaban lengkap & jujur seputar pengurusan izin usaha: biaya NIB, pendirian PT & CV, sertifikasi Halal, BPOM, pajak Coretax, dan garansi uang kembali.",
} as const;
