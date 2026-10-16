// ============================================================
// PUSATPERIZINAN.COM — Data Master SEO & Knowledge Hub
// Konten terdalam perizinan Indonesia untuk dominasi mesin pencari
// Sumber: UU Cipta Kerja, PP 5/2021, Per OSS, peraturan sektor terkini
// ============================================================

// ---------- PANDUAN PER JENIS IZIN ----------
export interface PermitGuide {
  id: string;
  name: string;
  short: string;
  long: string;
  authority: string;
  legalBasis: string;
  cost: string;
  timeline: string;
  requirements: string[];
  steps: string[];
  tips: string[];
  faq: { q: string; a: string }[];
}

export const PERMIT_GUIDES: PermitGuide[] = [
  {
    id: "nib",
    name: "NIB (Nomor Induk Berusaha)",
    short:
      "NIB adalah identitas resmi satu-satunya untuk setiap pelaku usaha di Indonesia, terbit via OSS-RBA dan berlaku sebagai NPWP, identitas imigrasi, dan akses perizinan lainnya.",
    long:
      "NIB (Nomor Induk Berusaha) adalah nomor identitas resmi yang diberikan kepada setiap pelaku usaha — perseorangan maupun badan hukum — melalui sistem OSS-RBA (Online Single Submission Risk-Based Approach) berdasarkan PP 5/2021 dan UU Cipta Kerja. Sejak dihapuskannya SIUP, NIB kini menjadi dokumen legal utama yang sekaligus berlaku sebagai: (1) identitas penyelenggaraan dan tanggung jawab sosial, (2) NPWP badan usaha, (3) identitas imigrasi (untuk PMA), (4) akses untuk mengurus izin sektoral, dan (5) jaminan kepastian hukum dalam bertransaksi. NIB wajib dimiliki oleh SEMUA bentuk usaha, dari warung online hingga perusahaan besar, dan proses penerbitannya gratis di OSS namun membutuhkan ketelitian dalam pemilihan KBLI dan skala risiko agar tidak salah struktur pajak.",
    authority: "OSS (Online Single Submission) — Kementerian Investasi/BKPM",
    legalBasis: "UU Cipta Kerja, PP 5/2021, Peraturan BKPM No. 3/2021, Perpres 5/2024",
    cost: "Rp 350rb (jasa kami, termasuk konsultasi KBLI) — resmi pemerintah gratis",
    timeline: "1 hari kerja",
    requirements: [
      "KTP & NPWP pemilik/pengurus (wajib)",
      "Alamat usaha & kode pos (domisili)",
      "Nomor HP aktif & email yang belum terdaftar di OSS",
      "Untuk badan hukum: akta pendirian & SK Kemenkumham",
      "Untuk PMA: dokumen investasi & paspor pengurus",
    ],
    steps: [
      "Konsultasi pemilihan KBLI yang paling menguntungkan untuk pajak & modal",
      "Persiapan dokumen & pembuatan akun OSS atas nama Anda",
      "Pengajuan NIB melalui OSS-RBA dengan kode risiko yang tepat",
      "Penerbitan NIB & Sertifikat Standar (jika diperlukan)",
      "Panduan kewajiban pasca-terbit: LKPM & laporan berkala",
    ],
    tips: [
      "Salah memilih KBLI bisa membuat Anda kena pajak lebih tinggi — selalu konsultasikan dulu",
      "NIB perseorangan berbeda profil pajaknya dengan NIB badan hukum",
      "LKPM wajib dilaporkan berkala; lalai laporan bisa membuat NIB terancam dicabut",
    ],
    faq: [
      {
        q: "Apakah NIB bisa diurus tanpa badan usaha?",
        a: "Bisa. Sejak UU Cipta Kerja, pelaku usaha perseorangan (termasuk UMKM dan freelancer) dapat memiliki NIB tanpa perlu badan hukum. NIB perseorangan justru membuka akses kekurangan — ikut tender, pinjaman bank, hingga program pemerintah.",
      },
      {
        q: "Berapa biaya resmi penerbitan NIB?",
        a: "NIB 100% gratis diterbitkan pemerintah melalui OSS. Biaya yang Anda bayarkan kepada kami adalah jasa konsultasi KBLI, pengisian data yang benar, dan pendampingan agar tidak salah struktur — yang justru bisa menghemat jutaan rupiah pajak.",
      },
    ],
  },
  {
    id: "pt",
    name: "Pendirian PT (Perseroan Terbatas)",
    short:
      "PT adalah badan hukum paling kredibel untuk bisnis serius: akses investasi, tender, kredit bank, dan perlindungan aset pribadi pemegang saham sepenuhnya terpisah.",
    long:
      "Perseroan Terbatas (PT) adalah badan hukum berdasarkan UU No. 40/2007 tentang Perseroan Terbatas yang memberikan status legal paling kredibel di Indonesia. PT wajib bagi perusahaan yang berencana: menerima investasi/pendanaan, mengikuti tender pemerintah & BUMN, mengajukan kredit bank bernilai besar, merekrut tenaga kerja asing (TKA), atau melindungi aset pribadi pemilik dari risiko bisnis. Pendirian PT membutuhkan minimal 2 pemegang saham, akta notaris resmi, pengesahan SK dari Kemenkumham (yang kini terintegrasi dengan AHU Online), NPWP badan, dan pendaftaran NIB. Untuk asing/PMA, ada ketentuan modal disetor minimum (umumnya Rp 10 miliar per KBLI tertentu) yang harus dihitung cermat sejak awal.",
    authority: "Notaris + Kemenkumham (AHU Online) + OSS untuk NIB",
    legalBasis: "UU 40/2007, PP 8/2021 (PMA), Permenkumham terkait",
    cost: "Mulai Rp 3,5jt (jasa + akta; biaya resmi notaris sesuai modal)",
    timeline: "3-7 hari kerja",
    requirements: [
      "Minimal 2 pemegang saham (orang/badan hukum)",
      "KTP/paspor & NPWP para pemegang saham & pengurus",
      "Nama PT (3 pilihan) — akan dicek ketersediaan di AHU",
      "Alamat kantor (domisili + bukti sewa/milik)",
      "Rencana modal dasar, modal disetor & komposisi saham",
    ],
    steps: [
      "Konsultasi struktur kepemilikan, modal optimal & KBLI utama",
      "Pengecekan & reservasi nama PT di sistem AHU Online",
      "Pembuatan akta pendirian oleh notaris resmi",
      "Pengajuan SK Menkumham (badan hukum sah) via AHU",
      "Penerbitan NPWP badan, NIB, dan dokumen pendukung",
      "Panduan kewajiban rutin: laporan tahunan AHU & LKPM",
    ],
    tips: [
      "PT lokal vs PMA punya aturan modal berbeda — jangan samakan",
      "Struktur saham yang rapi sejak awal menghindari konflik saat masuknya investor",
      "Wajib lapor keterkinian & laporan tahunan ke Kemenkumham agar tidak sanksi",
    ],
    faq: [
      {
        q: "Berapa modal minimum mendirikan PT lokal?",
        a: "Secara hukum (UU 40/2007) modal dasar PT minimal Rp 50 juta dengan minimal 25% modal disetor, sehingga praktis Rp 12,5 juta. Namun beberapa KBLI/sektor memiliki ketentuan modal khusus — kami bantu cek sesuai bidang usaha Anda.",
      },
      {
        q: "PT atau CV mana yang lebih cocok untuk saya?",
        a: "CV cocok untuk usaha kecil-menengah berbasis kepercayaan antar-partner dengan biaya murah. PT wajib jika: butuh investor, ikut tender besar, target kredit bank besar, atau ingin perlindungan aset pribadi penuh. Kami konsultasikan gratis sesuai rencana 3-5 tahun Anda.",
      },
    ],
  },
  {
    id: "halal",
    name: "Sertifikasi Halal (SJPH — Sertifikasi Jaminan Produk Halal)",
    short:
      "Sertifikasi Halal kini WAJIB bagi semua produk makanan, minuman, dan jasa yang dipergunakan masyarakat — prosesnya via SIHALAL/BPJPH, dengan kuota subsidi gratis untuk UMKM.",
    long:
      "Berdasarkan UU No. 33/2014 tentang Jaminan Produk Halal (JPH) dan aturan pelaksanaannya, semua produk yang masuk kategori makanan, minuman, obat, kosmetik, hingga jasa (termasuk hotel & restoran) yang dipergunakan masyarakat Indonesia WAJIB bersertifikat halal. Batas waktu implementasi bertahap hingga Oktober 2024-2026 tergantung kategori (UMKM mendapat prioritas pendampingan). Proses sertifikasi melalui sistem SIHALAL milik BPJPH (Badan Penyelenggara Jaminan Produk Halal) dengan pendampingan PPP (Proses Produk Halal), pemeriksaan oleh LPH (Lembaga Pemeriksa Halal) seperti LPPOM MUI, dan fatwa KKP (Komisi Kaji Fatwa). Kabar baiknya: UMKM dapat mendaftar kuota subsidi 100% GRATIS melalui program SEHATI.",
    authority: "BPJPH (Kemenag) + LPPOM MUI/LPH + KKP",
    legalBasis: "UU 33/2014, PP 39/2021, PP 42/2024",
    cost: "Rp 1,2jt (jasa pendampingan penuh) — kuota subsidi UMKM tersedia",
    timeline: "14-30 hari kerja (UMKM subsidi bisa lebih cepat)",
    requirements: [
      "NIB usaha aktif",
      "Daftar produk, bahan baku & pemasok (matriks bahan)",
      "Dokumen proses produksi / SOP Proses Produk Halal",
      "Data fasilitas & lokasi produksi (untuk audit LPH)",
      "Akun SIHALAL (kami buatkan & urus penuh)",
    ],
    steps: [
      "Audit awal kesiapan bahan baku & proses produksi Anda",
      "Pembuatan akun SIHALAL & pengisian form pengajuan",
      "Penyusunan dokumen PPH (Proses Produk Halal) sesuai standar",
      "Koordinasi penjadwalan audit dengan LPH (LPPOM MUI/dll)",
      "Penunjukan auditor & proses pemeriksaan di lokasi",
      "Sidang fatwa & penerbitan sertifikat + label halal",
    ],
    tips: [
      "UMKM berhenti kuota subsidi 100% — jangan bayar mahal sebelum cek kelayakan",
      "Satu sertifikat bisa mencakup banyak produk dalam satu grup proses",
      "Label halal wajib tercantum di kemasan setelah sertifikat terbit",
    ],
    faq: [
      {
        q: "Apakah sertifikat halal wajib untuk usaha kecil?",
        a: "Ya — UU JPH mewajibkan produk makanan/minuman yang dipergunakan masyarakat. Namun pemerintah menyediakan kuota subsidi gratis untuk UMKM (pendampingan, audit, sampai sertifikat) sehingga Anda tidak perlu membayar biaya pemeriksaan. Kami bantu klaim kuota ini.",
      },
      {
        q: "Berapa lama masa berlaku sertifikat halal?",
        a: "Sertifikat halal berlaku 4 tahun sejak terbit. Sebelum masa berlaku habis, wajib direcertification. Kami mengingatkan & mendampingi recertification agar produk Anda tidak kehilangan label halal.",
      },
    ],
  },
  {
    id: "bpom",
    name: "Izin Edar BPOM & PIRT",
    short:
      "Untuk menjual produk olahan legal di marketplace & toko: PIRT untuk makanan berisiko rendah, MD BPOM untuk suplemen & obat tradisional — plus label edar yang benar.",
    long:
      "PIRT (Pengawasan Izin Edar Pangan Olahan) diterbitkan Dinas Kesehatan kabupaten/kota untuk pangan olahan risiko rendah (sambal, keripik, minuman, dll), berlaku 5 tahun & kini diurus melalui sistem OTT BPOM. Sementara itu, Izin Pendaftaran (MD) dari BPOM wajib untuk suplemen kesehatan, obat tradisional, dan kosmetika sebelum diedarkan. Keduanya membutuhkan persyaratan produksi yang layak (CPPOB/CPOH untuk produsen, atau kontrak dengan pabrik yang sudah bersertifikat), hasil uji laboratorium, dan desain label sesuai BPOM RI/MKMI. Tanpa izin edar, produk Anda berisiko diblokir marketplace (Tokopedia, Shopee, TikTok Shop kini menuntut nomor izin), disita pengawas, dan kehilangan kepercayaan konsumen.",
    authority: "BPOM (Badan POM) & Dinas Kesehatan — via sistem OTT/e-Registration",
    legalBasis: "UU 18/2012, PP 86/2019, Peraturan BPOM terkait (RI/MKMI, OTT)",
    cost: "PIRT mulai Rp 1,5jt • MD BPOM mulai Rp 2,5jt (jasa, uji lab diatur terpisah)",
    timeline: "PIRT 14-21 hari • MD BPOM 30-60 hari",
    requirements: [
      "NIB usaha & KBLI yang sesuai",
      "Sertifikat CPPOB/CPOH fasilitas produksi (atau kontrak pabrik)",
      "Hasil uji lab parameter produk (kami arahkan lab terakreditasi)",
      "Mock-up label produk sesuai regulasi (kami bantu desain & review)",
      "Untuk MD: data khasiat/klaim & komposisi detail",
    ],
    steps: [
      "Pengecekan kelayakan produk: PIRT atau MD? (bisa konsultasi AI kami)",
      "Perbaikan/penyiapan fasilitas produksi & dokumen CPPOB/CPOH",
      "Pengurusan uji lab sesuai parameter wajib produk",
      "Review & revisi label sampai lolos standar",
      "Pengajuan di sistem OTT (PIRT) atau e-Registration (MD)",
      "Penerbitan izin & panduan kewajiban pasca-terbit",
    ],
    tips: [
      "Marketplace besar mulai 2024 menuntut nomor izin edar untuk kategori tertentu — jangan tunggu diblokir",
      "Home industry punya jalur PIRT yang jauh lebih murah & cepat dari MD",
      "Label yang salah klaim adalah penyebab utama pengajuan ditolak",
    ],
    faq: [
      {
        q: "PIRT atau BPOM (MD) mana yang saya butuhkan?",
        a: "PIRT untuk pangan olahan umum berisiko rendah (makanan kemasan, minuman). MD BPOM wajib untuk suplemen kesehatan, obat tradisional, dan kosmetika. Gunakan fitur Cek Izin AI di halaman ini — cukup ketik produk Anda, langsung diketahui jalurnya.",
      },
      {
        q: "Apakah home industry bisa dapat izin edar?",
        a: "Sangat bisa. Jalur PIRT memang dirancang untuk home industry. Fasilitas produksi harus memenuhi kriteria CPS (Cara Produksi Pangan yang baik) — tim kami memberikan checklist & pendampingan audit agar lolos.",
      },
    ],
  },
  {
    id: "oss",
    name: "OSS-RBA & Sertifikat Standar",
    short:
      "Sistem perizinan berusaha terintegrasi berbasis risiko: rendah cukup NIB, menengah perlu sertifikat standar, tinggi butuh izin khusus — memahami levelnya menentukan legalitas Anda.",
    long:
      "OSS-RBA (Online Single Submission — Risk-Based Approach) adalah sistem tunggal pemerintah yang mengklasifikasikan setiap KBLI ke dalam 4 tingkat risiko: RENDAH (cukup NIB), MENENGAH RENDAH (NIB + Sertifikat Standar), MENENGAH TINGGI (NIB + Sertifikat Standar yang diverifikasi), dan TINGGI (NIB + Izin khusus). Sebelum memulai operasional, pelaku usaha WAJIB memastikan semua KBLI-nya sudah memenuhi persyaratan level risikonya — banyak pengusaha yang tidak sadar beroperasi 'ilegal' karena lupa sertifikat standar untuk KBLI menengah. Kami ahli memetakan portofolio KBLI Anda, menentukan persyaratan per level, dan mengurus sertifikat standar (termasuk yang butuh verifikasi dokumen teknis) sampai terbit.",
    authority: "OSS — Kementerian Investasi/BKPM bersama K/L terkait",
    legalBasis: "PP 5/2021 jo. PP 8/2021, Perpres 5/2024, Peraturan BKPM 3/2021",
    cost: "Mulai Rp 350rb per KBLI (jasa pemetaan + pengurusan)",
    timeline: "1-5 hari kerja tergantung level risiko",
    requirements: [
      "NIB aktif (kami urus sekaligus jika belum ada)",
      "KBLI usaha yang tepat (dipetakan ulang oleh tim kami)",
      "Dokumen teknis sesuai persyaratan level (kapasitas, alat, SDM)",
      "Untuk KBLI verifikasi: komitmen & dokumen pendukung",
    ],
    steps: [
      "Pemetaan seluruh KBLI Anda ke level risikonya",
      "Analisis kesenjangan (gap analysis) dokumen yang dibutuhkan",
      "Penyusunan dokumen teknis untuk sertifikat standar",
      "Pengajuan di OSS & pemantauan verifikasi (jika ada)",
      "Penerbitan sertifikat & checklist kewajiban berkelanjutan",
    ],
    tips: [
      "Cek dulu level risiko KBLI Anda di halaman Cek Izin AI — gratis",
      "Sertifikat standar menengah tinggi butuh verifikasi instansi teknis — siapkan dokumen lebih awal",
      "Sertifikat standar punya kewajiban pemenuhan standar yang harus dilaporkan",
    ],
    faq: [
      {
        q: "Apa bedanya sertifikat standar dan izin?",
        a: "Sertifikat standar adalah pernyataan bahwa usaha Anda memenuhi standar (persyaratan teknis) untuk KBLI berisiko menengah — diterbitkan setelah dokumen/diverifikasi. Izin khusus untuk risiko tinggi melalui proses penilaian penuh. Sertifikat standar terbit via OSS; izin khusus bisa melibatkan instansi teknis.",
      },
      {
        q: "Usaha saya sudah punya NIB, apakah otomatis legal?",
        a: "Belum tentu. Jika KBLI Anda berlevel risiko menengah atau tinggi, Anda WAJIB memenuhi persyaratan sertifikat standar/izin sebelum operasional. Banyak pengusaha baru sadar saat audit atau masalah hukum. Konsultasikan pemetaan KBLI Anda ke tim kami.",
      },
    ],
  },
  {
    id: "pbg",
    name: "PBG & SLF (Persetujuan Bangunan Gedung)",
    short:
      "PBG menggantikan IMB untuk bangunan baru/renovasi; SLF adalah sertifikat laik fungsi — keduanya syarat mutlak kantor, toko, gudang, dan usaha berbasis lokasi.",
    long:
      "Sejak UU Cipta Kerja dan PP 16/2021, IMB resmi digantikan oleh PBG (Persetujuan Bangunan Gedung) yang diurus melalui SIMBG. PBG wajib sebelum membangun/merehabilitasi gedung. Sementara SLF (Sertifikat Laik Fungsi) wajib dimiliki setelah gedung selesai sebelum difungsikan — inilah bukti bangunan Anda aman secara struktural, keamanan, kesehatan, dan kemudahan akses. Untuk usaha berbasis tempat (kafe, toko, klinik, gudang, pabrik), DPMPTSP umumnya menuntut PBG/SLF sebelum menerbitkan izin operasional. Keduanya melibatkan gambar teknis sesuai standar, mekanisme arsitektur, dan pengecekan lapangan oleh tim teknis daerah.",
    authority: "SIMBG — Kementerian PUPR & DPMPTSP daerah",
    legalBasis: "UU Cipta Kerja, PP 16/2021, Permen PUPR terkait",
    cost: "Mulai Rp 2jt per dokumen (jasa; biaya resmi daerah diatur terpisah)",
    timeline: "PBG 14-30 hari • SLF 14-30 hari",
    requirements: [
      "Bukti kepemilikan/sewa lahan & bangunan",
      "Gambar teknis (denah, tampak, potongan, mekanikal) — kami bantu susun",
      "Data luas bangunan, fungsi & kapasitas",
      "Untuk SLF: dokumen pengawasan pembangunan (jika ada)",
    ],
    steps: [
      "Survei dokumen & kondisi bangunan Anda",
      "Penyusunan gambar teknis sesuai standar kota (IGA/kawasan)",
      "Pengajuan PBG/SLF di SIMBG/DPMPTSP",
      "Koordinasi pengecekan lapangan tim teknis (bila diperlukan)",
      "Penerbitan dokumen & serah terima berkas fisik/digital",
    ],
    tips: [
      "Bangunan tanpa PBG/SLF = sulit dapat izin usaha, sulit dijual, sulit diajukan asuransi",
      "Renovasi ringan sekalipun bisa menuntut PBG baru — konsultasikan dulu",
      "SLF berlaku selama bangunan tidak diubah fungsi/struktur",
    ],
    faq: [
      {
        q: "Bangunan lama saya hanya punya IMB, harus diganti PBG?",
        a: "IMB yang masih sah tetap diakui, namun untuk perubahan, perluasan, atau saat instansi meminta (misal untuk izin usaha), Anda akan diminta PBG/SLF. Kami bantu konversi & pengurusan SLF untuk bangunan existing tanpa drama.",
      },
      {
        q: "Ruko sewa untuk kafe, wajib PBG sendiri?",
        a: "Yang penting adalah bangunan Anda LAIK FUNGSI — SLF boleh atas nama pemilik. Namun beberapa daerah menuntut persetujuan pemilik + dokumen laik fungsi saat pengajuan izin usaha. Kami bantu koordinasi dengan pemilik gedung & DPMPTSP.",
      },
    ],
  },
  {
    id: "lingkungan",
    name: "Izin Lingkungan (SPPL / UKL-UPL / AMDAL)",
    short:
      "Dokumen lingkungan wajib sesuai tingkat dampak: SPPL untuk kegiatan minim, UKL-UPL untuk menengah, AMDAL penuh untuk aktivitas besar seperti pabrik & tambang.",
    long:
      "Berdasarkan PP 22/2021, setiap kegiatan usaha berpotensi mencemari lingkungan WAJIB memiliki dokumen lingkungan sebelum izin usaha terbit. Tingkatannya: SPPL (Surat Pernyataan Kesanggupan) untuk kegiatan minim dampak; UKL-UPL (Upaya Pengelolaan & Pemantauan Lingkungan) untuk kegiatan berdampak menengah; dan AMDAL (Analisis Mengenai Dampak Lingkungan) penuh untuk kegiatan besar — pabrik, tambang, PLTU, hotel besar, kawasan industri. AMDAL melibatkan kaandungan (komite andalan dampak), pengumuman publik, konsultasi publik, dan forum teknis yang bisa memakan waktu 3-6 bulan jika tidak dikelola ahli. Kami punya tim penyusun dokumen lingkungan berpengalaman lintas sektor yang terbiasa berkoordinasi dengan DPMPTSP & forum teknis daerah.",
    authority: "DPMPTSP daerah / Kementerian LHK (untuk kegiatan tertentu)",
    legalBasis: "UU Cipta Kerja, PP 22/2021, Permen LHK terkait",
    cost: "SPPL mulai Rp 750rb • UKL-UPL mulai Rp 3,5jt • AMDAL mulai Rp 25jt",
    timeline: "SPPL 3-7 hari • UKL-UPL 30-45 hari • AMDAL 90-180 hari",
    requirements: [
      "NIB & KBLI kegiatan usaha",
      "Data lokasi (koordinat, batas, peta lingkungan sekitar)",
      "Deskripsi teknis kegiatan: kapasitas, proses, emisi/limbah",
      "Untuk AMDAL: dokumen dasar intensif (kami pandu penuh)",
    ],
    steps: [
      "Penentuan jenis dokumen (SPPL/UKL-UPL/AMDAL) via kriteria formal",
      "Pengumpulan data dasar & survei (bila perlu)",
      "Penyusunan dokumen lingkungan oleh tim ahli",
      "Pengumuman & konsultasi publik (untuk AMDAL)",
      "Forum teknis & perbaikan dokumen",
      "Penerbitan surat keputusan lingkungan (PPL untuk AMDAL)",
    ],
    tips: [
      "Mulai AMDAL SEBELUM konstruksi — setelah gedung berdiri jauh lebih rumit",
      "Kegiatan di kawasan industri sering mewarisi AMDAL induk — bisa lebih cepat",
      "Matriks RKL-RPL wajib dilaporkan berkala setelah operasional",
    ],
    faq: [
      {
        q: "Usaha saya butuh SPPL, UKL-UPL, atau AMDAL?",
        a: "Tergantung klasifikasi risiko KBLI & skala kegiatan (kapasitas produksi, luas, lokasi). Gunakan Cek Izin AI kami atau konsultasi gratis — dalam 15 menit Anda tahu persis dokumen apa yang dibutuhkan & estimasi waktunya.",
      },
      {
        q: "Apakah AMDAL bisa diproses sambil konstruksi?",
        a: "Secara hukum, dokumen lingkungan harus SAH sebelum izin usaha & konstruksi dimulai. Melanggar berisiko penghentian paksa. Jika Anda sudah terlanjur, konsultasikan regularisasi ke tim kami — ada jalur penyelesaian bertahap.",
      },
    ],
  },
  {
    id: "cv",
    name: "Pendirian CV (Commanditaire Vennootschap)",
    short:
      "CV adalah persekutuan komanditer yang ideal untuk usaha keluarga/kemitraan: murah, cepat pendiriannya, tetap diakui bank & lembaga keuangan — tanpa struktur rumit PT.",
    long:
      "CV (Commanditaire Vennootschap) adalah persekutuan yang didirikan berdasarkan KUHD (Kitab Undang-Undang Hukum Dagang) dengan minimal 1 sekutu aktif (beheerder) yang menanggung tanggung jawab penuh dan 1 sekutu pasif (commanditaire) yang tanggung jawabnya sebatas modal. CV sangat populer untuk usaha keluarga, kemitraan supplier-reseller, dan usaha kreatif karena: pendirian murah & cepat (2-3 hari), tidak ada kewajiban modal minimum formal, dan tetap diakui oleh bank untuk pembukaan rekening usaha serta beberapa lembaga keuangan. Perlu dicatat: CV tidak memiliki badan hukum terpisah seperti PT, sehingga untuk usaha yang menanggung risiko besar atau menarik investor, PT tetap pilihan yang lebih aman.",
    authority: "Notaris + pendataan via OSS untuk NIB",
    legalBasis: "KUHD (Kitab Undang-Undang Hukum Dagang) Pasal 19-21",
    cost: "Mulai Rp 1,5jt (jasa + akta notaris)",
    timeline: "2-3 hari kerja",
    requirements: [
      "KTP & NPWP para sekutu (aktif & pasif)",
      "Nama CV & alamat kantor/domisili",
      "Kegiatan usaha utama (KBLI)",
      "Perjanjian kerja sama internal (kami susunkan)",
    ],
    steps: [
      "Konsultasi struktur sekutu aktif/pasif & pembagian untung",
      "Penyusunan akta pendirian CV (notaris)",
      "Penerbitan NPWP CV & pendaftaran NIB",
      "Surat keterangan domisili (bila perlu)",
      "Panduan kewajiban pajak & pembukuan",
    ],
    tips: [
      "Tulis perjanjian sekutu sejelas mungkin — CV rawan konflik jika sepi aturan",
      "Sekutu aktif bertanggung jawab penuh; jadilah sekutu pasif jika hanya menanam modal",
      "Ketika omzet & risiko tumbuh, pertimbangkan upgrade ke PT — kami bantu transformasi",
    ],
    faq: [
      {
        q: "Apakah CV bisa ikut tender pemerintah?",
        a: "CV bisa ikut beberapa tender, namun banyak tender (terutama di atas nilai tertentu & proyek BUMN) mensyaratkan badan hukum PT. Jika target Anda tender, kami sarankan PT sejak awal.",
      },
      {
        q: "Apakah CV diakui bank untuk rekening usaha?",
        a: "Ya. Bank umumnya mengakui CV dengan akta notaris + NPWP. Namun kebijakan tiap bank berbeda — kami berikan panduan dokumen yang disukai bank utama di Indonesia.",
      },
    ],
  },
  {
    id: "klinik",
    name: "Izin Klinik, Farmasi & Kesehatan",
    short:
      "Sektor kesehatan punya tumpukan izin berlapis: NIB, izin usaha sarana (SIA), izin praktik tenaga medis (SIP/STR), sampai izin apotek — kami kuasai seluruh regulasi Kemenkes.",
    long:
      "Membuka usaha kesehatan di Indonesia berarti menavigasi regulasi berlapis: NIB untuk badan usaha, izin usaha sarana kesehatan dari Dinkes (klinik: SIA — Surat Izin Aurusa; apotek: SIA Apotek; laboratorium: SIL), sertifikat standar berbasis risiko di OSS, plus izin praktik bagi tenaga medis (SIPA untuk dokter, SIKIA untuk perawat, dsb) yang melekat pada STR (Surat Tanda Registrasi). Untuk klinik dengan fasilitas rawat inap ada tambahan ketentuan akreditasi. Kementerian Kesehatan melalui berbagai Permenkes mengatur standar sarana, SDM minimum, dan tata letak. Kesalahan urutan pengurusan (misal izin praktik sebelum izin sarana) bisa membuat pengajuan macet berbulan-bulan — tim kami memahami sekuen yang benar untuk setiap bentuk usaha kesehatan.",
    authority: "Dinkes daerah, DPMPTSP, Kemenkes (Yankes online)",
    legalBasis: "UU 17/2023 (Kesehatan), Permenkes terkait sarana & tenaga medis",
    cost: "Mulai Rp 7,5jt paket klinik lengkap",
    timeline: "30-60 hari kerja",
    requirements: [
      "Badan usaha (PT/CV) + NIB dengan KBLI kesehatan",
      "Data & STR/SIP seluruh tenaga medis yang bertugas",
      "Rencana tata letak sarana sesuai standar Permenkes",
      "Daftar alat kesehatan & obat (untuk klinik/apotek)",
    ],
    steps: [
      "Pemetaan jenis izin sesuai layanan yang akan dibuka",
      "Pendirian badan usaha & NIB (bila belum ada)",
      "Pengurusan izin praktik tenaga medis (SIP)",
      "Pengajuan izin sarana (SIA) ke Dinkes + pengecekan",
      "Koordinasi akreditasi (bila wajib) & serah terima dokumen",
    ],
    tips: [
      "Izin praktik tenaga medis melekat pada lokasi — pindah klinik = izin baru",
      "Akreditasi klinik wajib dalam batas waktu tertentu setelah beroperasi",
      "Home care & telemedicine punya aturan berbeda — konsultasikan sebelum launch",
    ],
    faq: [
      {
        q: "Buka klinik kecantikan butuh izin apa saja?",
        a: "Umumnya: badan usaha + NIB KBLI klinik, SIA klinik dari Dinkes, izin praktik dokter (SIPA), dan jika menggunakan alat kesehatan/produk medis ada tambahan pendaftaran. Bila menyediakan layanan tindakan medis estetika, standar SDM lebih ketat. Konsultasikan layanan spesifik Anda ke tim kami.",
      },
      {
        q: "Apakah apotek harus dimiliki apoteker?",
        a: "Apotek WAJIB memiliki apoteker penanggung jawab dengan SIPA yang bertugas penuh. Struktur kepemilikan bisa non-apoteker, namun operasional harian harus diawasi apoteker — kami bantu skema kepatuhan yang benar.",
      },
    ],
  },
  {
    id: "pma",
    name: "Pendirian PMA (Investasi Asing)",
    short:
      "PMA adalah PT berskala investasi asing: akses 100% kepemilikan asing di banyak sektor, butuh perencanaan modal disetor ≥ Rp 10 miliar & kepatuhan OSS khusus investor asing.",
    long:
      "PMA (Penanaman Modal Asing) adalah bentuk PT dengan asing sebagai pemegang saham, diatur PP 8/2021 & UU 25/2007 tentang Penanaman Modal. Keunggulannya: asing bisa memegang 100% saham di banyak bidang usaha (tergantung Daftar Negatif Investasi/DNI terbaru — sebagian sektor menuntut patungan lokal), mendapat kepastian hukum untuk repatriasi laba, akses imigrasi (ITAS/KITAS direksi & TKA), dan fasilitas pajak investasi. Persyaratannya: rencana investasi total ≥ Rp 10 miliar di luar tanah & bangunan per KBLI 5-digit, dengan modal disetor yang harus realisasi sesuai komitmen OSS. Kesalahan umum pendiri PMA: salah pilih KBLI yang ditutup untuk asing, atau modal disetor yang tidak terealisasi sehingga izin terancam — tim kami khusus menangani due diligence & strukturisasi PMA dari awal.",
    authority: "Kementerian Investasi/BKPM, Kemenkumham, Imigrasi",
    legalBasis: "UU 25/2007, PP 8/2021, Perpres 10/2021 jo. 49/2021 (DNI)",
    cost: "Mulai Rp 15jt paket pendirian PMA lengkap",
    timeline: "7-14 hari kerja (+ ITAS/KITAS bila perlu)",
    requirements: [
      "Paspor semua pemegang saham & pengurus asing",
      "Surat pernyataan pemenuhan modal ( Letter of Intent & Statement)",
      "Rencana investasi & KBLI yang terbuka untuk asing",
      "Alamat kantor di Indonesia (virtual office diperbolehkan untuk beberapa sektor)",
    ],
    steps: [
      "Due diligence KBLI: sektor terbuka/patungan/tutup untuk asing",
      "Strukturisasi saham & perencanaan modal disetor",
      "Akta pendirian PT PMA & SK Kemenkumham",
      "NPWP badan, NIB, & perizinan sektoral (bila perlu)",
      "Dukungan imigrasi: ITAS/KITAS direksi & TKA",
      "Panduan kewajiban LKPM berkala investor asing",
    ],
    tips: [
      "Modal disetor Rp 10 miliar harus terealisasi sesuai jadwal OSS — bukan sekadar angka di akta",
      "Sektor dengan DNI khusus (misal telekomunikasi, farmasi) punya batas kepemilikan asing — cek dulu!",
      "PMA wajib laporan LKPM berkala; kelalaian bisa mempengaruhi perpanjangan izin & imigrasi",
    ],
    faq: [
      {
        q: "Apakah asing bisa 100% memiliki bisnis di Indonesia?",
        a: "Di banyak sektor — ya, tergantung Daftar Negatif Investasi terbaru (Perpres 10/2021 jo. 49/2021). Sektor tertentu menuntut patungan dengan lokal (misal 51/49) atau tertutup penuh. Tim kami melakukan due diligence KBLI demi KBLI sebelum pendirian agar Anda aman.",
      },
      {
        q: "Apa risiko jika modal disetor tidak direalisasikan?",
        a: "Komitmen modal di OSS adalah dokumen hukum. Ketidak-realisasian bisa berujung sanksi administratif hingga pencabutan NIB & kesulitan perpanjangan KITAS direksi. Kami bantu strategi realisasi bertahap yang patuh aturan.",
      },
    ],
  },
  {
    id: "pajak",
    name: "Pajak Usaha: NPWP, PKP & PPh UMKM",
    short:
      "Memahami struktur pajak sejak awal menghemat ratusan juta: PPh final 0,5% untuk UMKM, PKP saat omzet > Rp 4,8 M, dan kewajiban pembukuan yang benar dari hari pertama.",
    long:
      "Struktur pajak usaha Indonesia untuk pemula: (1) NPWP — nomor pokok wajib pajak untuk badan/pribadi, (2) PPh UMKM Pasal 2 UU HPP — tarif final 0,5% dari omzet kotor untuk usaha dengan omzet < Rp 4,8 miliar/tahun (paling ramah untuk UMKM yang memenuhi syarat), (3) SPPKP — pengukuhan PKP (Pengusaha Kena Pajak) WAJIB saat omzet mencapai Rp 4,8 miliar, membuka kewajiban PPN 11-12%, (4) PPh Badan 22% untuk PT (dengan fasilitas untuk usaha kecil peredaran bruto < Rp 50 M — pasal 31E), dan (5) kewajiban administrasi: e-Faktur, bukti potong, SPT masa & tahunan. Keputusan struktur sejak awal (perseorangan vs badan hukum, KBLI, omzet proyeksi) menentukan beban pajak Anda bertahun-tahun ke depan — konsultasi ini kami berikan GRATIS di setiap pengurusan izin.",
    authority: "DJP (Direktorat Jenderal Pajak) — Kemenkeu",
    legalBasis: "UU HPP, UU Harmonisasi, PP & Peraturan DJP terkait",
    cost: "Konsultasi pajak usaha GRATIS untuk klien pengurusan izin",
    timeline: "NPWP 1 hari • SPPKP 1-3 hari kerja",
    requirements: [
      "KTP/NPWP pribadi (untuk perseorangan)",
      "Akta & SK (untuk badan hukum)",
      "NIB aktif & data usaha (omzet, KBLI)",
      "Untuk PKP: proyeksi omzet & dokumen transaksi",
    ],
    steps: [
      "Analisis struktur usaha & proyeksi omzet Anda",
      "Rekomendasi skema pajak optimal (PPh final 0,5% vs badan)",
      "Pengurusan NPWP badan/perseorangan",
      "Pengukuhan PKP & aktivasi e-Faktur (bila wajib)",
      "Panduan kewajiban bulanan & kalender pajak Anda",
    ],
    tips: [
      "PPh final 0,5% hanya sampai omzet Rp 4,8 M & maksimal 7 tahun — rencanakan transisi",
      "PKP bukan hanya beban PPN — justru penting untuk deal dengan korporasi yang minta faktur pajak",
      "Lalai SPT masa = denda Rp 100rb/bulan — kalender pajak kami bantu jaga",
    ],
    faq: [
      {
        q: "Omzet saya masih kecil, apakah wajib bayar pajak usaha?",
        a: "Jika memilih skema PPh final UMKM 0,5%, pajak Anda sangat kecil (0,5% dari omzet) namun WAJIB lapor bulanan. Transaksi kecil yang tertib pajak sejak awal justru membangun riwayat kredit usaha untuk pinjaman bank di masa depan.",
      },
      {
        q: "Kapan saya wajib jadi PKP dan kena PPN?",
        a: "WAJIB saat peredaran bruto melewati Rp 4,8 miliar dalam 12 bulan. Anda juga bisa mengajukan sukarela di bawah ambang tersebut jika klien korporasi Anda membutuhkan faktur pajak. Kami analisis mana yang lebih menguntungkan.",
      },
    ],
  },
  {
    id: "ppi-umroh",
    name: "Izin Umroh (PPIU — Perusahaan Perjalanan Ibadah Umrah)",
    short:
      "PPIU adalah legalitas resmi travel umroh dari Kementerian Agama: SPPU (pendaftaran) dan SIPU (izin perjalanan) yang terbit via sistem Kemenag. Tanpa SIPU, menjual paket umroh adalah kejahatan perjalanan ibadah palsu.",
    long:
      "PPIU (Perusahaan Perjalanan Ibadah Umrah) adalah badan usaha yang telah memenuhi syarat Kementerian Agama untuk menyelenggarakan perjalanan ibadah umrah. Alurnya: pendirian PT (tidak boleh perseorangan), pendaftaran SPPU di Kemenag provinsi tempat kantor, lalu pengurusan SIPU (Surat Izin Perjalanan Umrah) yang diperbarui berkala melalui sistem SIMPONI/e-Katalog Kemenag. PPIU wajib memiliki rekening kolektif jamaah (escrow), kontrak kerja sama dengan maktab/operator Arab Saudi, dan pembimbing ibadah yang bersertifikat. Regulasi berbasis UU 13/2008 tentang Penyelenggaraan Haji beserta peraturan Kemenag terkini — dan pengawasan ketat karena melibatkan dana jamaah. Legalitas PPIU adalah tiket masuk ke e-Katalog & kerja sama resmi, serta pelindung utama Anda dari sanksi pidana penyalahgunaan jamaah.",
    authority: "Kementerian Agama RI — Dirjen Penyelenggaraan Haji & Umrah (Kemenag Provinsi)",
    legalBasis: "UU 13/2008 tentang Penyelenggaraan Haji, PP 61/2015 & peraturan Kemenag terkait PPIU/PPIH (SIMPONI)",
    cost: "Paket lengkap mulai Rp 12 juta (di luar modal disetor PT)",
    timeline: "30-45 hari kerja (SPPU dulu, SIPU menyusul)",
    requirements: [
      "Badan hukum PT (akta notaris + SK Kemenkumham + NIB)",
      "Modal disetor sesuai ketentuan Kemenag wilayah (mulai Rp 100 juta)",
      "Kantor usaha fisik & layak + bukti kepemilikan/sewa",
      "Rekening kolektif jamaah di bank bekerja sama Kemenag",
      "Kontrak kerja sama dengan maktab & vendor di Arab Saudi + pembimbing ibadah bersertifikat",
    ],
    steps: [
      "Analisis kelayakan & roadmap: sektor, modal, rencana paket perjalanan",
      "Pendirian PT travel + NPWP + NIB (3-7 hari kerja)",
      "Pendaftaran SPPU ke Kemenag provinsi + verifikasi kantor",
      "Pembukaan rekening kolektif & penyiapan dokumen teknis (maktab, pembimbing, itinerary)",
      "Pengajuan SIPU + aktivasi SIMPONI/e-Katalog",
      "SIPU terbit — travel Anda resmi berangkatkan jamaah",
    ],
    tips: [
      "Jangan pernah jual paket sebelum SIPU terbit — sanksinya pidana & bisa blacklisted seumur hidup",
      "Timing terbaik pengajuan: 3-4 bulan sebelum Ramadan & musim haji, karena antrean verifikasi menumpuk",
      "Nama PT jangan mengandung kata 'Haji' sebelum Anda lolos PPIH — biasanya ditolak Kemenag",
    ],
    faq: [
      {
        q: "Apa bedanya SPPU dan SIPU untuk travel umroh?",
        a: "SPPU (Surat Pendaftaran Perjalanan Umrah) adalah status pendaftaran awal PPIU Anda di Kemenag — travel sudah terdaftar tapi belum boleh berangkatkan jamaah. SIPU (Surat Izin Perjalanan Umrah) adalah izin operasional penuh untuk menjual & berangkatkan paket umroh. Keduanya diperbarui berkala via sistem SIMPONI Kemenag.",
      },
      {
        q: "Travel saya masih kecil, apakah tetap bisa jadi PPIU?",
        a: "Bisa, asalkan berbadan hukum PT dengan modal disetor minimum sesuai ketentuan Kemenag (umumnya mulai Rp 100 juta) dan punya kantor fisik. Banyak PPIU baru mulai dari 1-2 grup jamaah per keberangkatan — yang penting legalitasnya benar sejak awal agar aman berkembang.",
      },
    ],
  },
  {
    id: "ppi-haji",
    name: "Izin Haji (PPIH — Perusahaan Perjalanan Ibadah Haji)",
    short:
      "PPIH adalah tingkat tertinggi legalitas travel ibadah: izin khusus penyelenggaraan perjalanan haji dari Kemenag. Syaratnya paling berat — modal disetor miliaran & uji kelayakan — tapi posisinya paling eksklusif.",
    long:
      "PPIH (Perusahaan Perjalanan Ibadah Haji) adalah perusahaan yang berizin khusus menyelenggarakan perjalanan ibadah haji — jauh lebih ketat daripada PPIU karena menyangkut gelar wajib haji. Syarat inti: berbadan hukum PT milik penuh WNI, modal disetor signifikan (umumnya hingga Rp 3 miliar dalam bentuk uang tunai/setara kas yang bisa diaudit), tidak boleh menarik dana jamaah sebelum SK terbit, dan wajib lolos masa pembinaan serta uji kelayakan Kemenag. PPIH otomatis berhak menyelenggarakan umrah dan terhubung dengan penempatan PPUMI (Petugas Pemeriksa Umrah & Haji Indonesia) serta kemitraan maktab resmi di Arab Saudi. Dengan kuota haji Indonesia ±200 ribu orang per tahun dan antrean puluhan tahun, izin PPIH adalah aset bernilai sangat tinggi yang diperdagangkan sangat hati-hati — prosesnya wajib didampingi ahli.",
    authority: "Kementerian Agama RI — Dirjen Penyelenggaraan Haji & Umrah",
    legalBasis: "UU 13/2008 jo. UU 8/2019, PP 96/2012 jo. PP 61/2015 & peraturan Kemenag tentang PPIH",
    cost: "Paket Enterprise mulai Rp 25 juta (di luar modal disetor & audit)",
    timeline: "60-120 hari — termasuk masa administrasi pembinaan Kemenag",
    requirements: [
      "PT murni milik WNI (susunan saham bersih dari asing)",
      "Modal disetor sesuai ketentuan (hingga Rp 3 miliar, tunai/setara kas & teraudit)",
      "Kantor usaha layak + sarana pelayanan jamaah",
      "Dokumen keuangan bersih — tanpa penarikan dana jamaah sebelum SK",
      "Siap ikut pembinaan & uji kelayakan Kemenag (kunjungan fisik tim verifikasi)",
    ],
    steps: [
      "Audit pra-izin: kelayakan modal, legalitas & struktur saham",
      "Penyiapan/pembenahan PT + dokumen sesuai checklist Kemenag",
      "Pengajuan administrasi pembinaan ke Kemenag",
      "Uji kelayakan & kunjungan verifikasi tim Kemenag ke kantor Anda",
      "SK PPIH terbit + penempatan PPUMI & kemitraan maktab haji",
    ],
    tips: [
      "Modal Rp 3 miliar harus benar-benar tunai & dapat ditelusuri (traceable) — dana pinjaman bersyarat biasanya terbongkar saat audit",
      "PPIH boleh juga menjalankan umrah (PPIU included) — strategis untuk cash flow selama menunggu musim haji",
      "Jangan gunakan klaim 'travel haji resmi' di marketing sebelum SK terbit — pelanggarannya sangat fatal",
    ],
    faq: [
      {
        q: "Apakah PPIU bisa naik kelas jadi PPIH?",
        a: "Bisa — jalurnya justru paling umum: PPIU yang sehat keuangan dan administrasinya kemudian mengajukan PPIH dengan menambah modal disetor hingga ambang yang disyaratkan serta lolos pembinaan & uji kelayakan Kemenag. Kami bantu dari tahap audit awal sampai SK terbit.",
      },
      {
        q: "Berapa modal minimal untuk PPIH?",
        a: "Sesuai regulasi Kemenag, modal disetor PPIH hingga Rp 3 miliar dalam bentuk uang tunai dan/atau setara kas yang dapat diverifikasi. Angka final bergantung pada peraturan terbaru saat Anda mengajukan — kami selalu pakai checklist regulasi terkini saat konsultasi.",
      },
    ],
  },
  {
    id: "iata",
    name: "Registrasi IATA (Agen Tiket Penerbangan Internasional)",
    short:
      "Akreditasi IATA (International Air Transport Association) membuat agen travel Anda berhak menerbitkan tiket internasional langsung via BSP/CASS — standar diakui 300+ maskapai dunia.",
    long:
      "IATA (International Air Transport Association) adalah asosiasi maskapai penerbangan dunia. Akreditasi IATA Agent membuat travel Anda resmi sebagai penerbit tiket: akses langsung ke BSP (Billing and Settlement Plan) untuk tiket domestik/internasional dan CASS untuk kargo, ID IATA resmi, komisi & nett fare langsung dari maskapai, serta kredibilitas kelas dunia di mata korporasi. Kuncinya: legalitas badan usaha travel, kesehatan keuangan dengan financial security (umumnya bank guarantee dalam USD sesuai proyeksi penjualan), personel yang bersertifikat kompetensi tiket (mis. IATA Foundation), dan kantor operasional layak. Untuk agen yang belum siap akreditasi penuh, tersedia TIDS (Travel Industry Designator Service) sebagai ID resmi IATA untuk transaksi non-BSP — strategi awal yang cerdas sebelum full accreditation.",
    authority: "IATA — International Air Transport Association (Area Office Singapura untuk Indonesia)",
    legalBasis: "Kriteria akreditasi IATA Passenger Agent / TIDS Resolution + regulasi lokal penjualan tiket",
    cost: "Mulai Rp 10 juta + biaya resmi IATA (registration & annual) + bank guarantee (USD)",
    timeline: "45-90 hari (tergantung bank guarantee & audit IATA)",
    requirements: [
      "Badan usaha legal (PT/CV) dengan objek kegiatan travel + NIB",
      "Sertifikat Usaha Pariwisata/TDAU untuk kredibilitas maksimal",
      "Laporan keuangan sehat + financial security (bank guarantee USD sesuai kriteria IATA)",
      "Personel bersertifikat kompetensi (IATA Foundation / course tiket)",
      "Kantor operasional layak + tidak ada riwayat fraud maskapai",
    ],
    steps: [
      "Konsultasi skema: full Accredited Agent vs TIDS vs sub-agent transisi",
      "Pembenahan legalitas + persiapan laporan keuangan sesuai kriteria IATA",
      "Pengurusan bank guarantee & pengisian formulir akreditasi",
      "Audit/verifikasi IATA (dokumen & kantor)",
      "Akreditasi terbit: ID IATA aktif, akses BSP/CASS, kontrak maskapai",
    ],
    tips: [
      "Bank guarantee adalah biaya terbesar — besarnya mengikuti proyeksi penjualan; kami bantu optimalkan dari data riil Anda",
      "TIDS dulu, akreditasi penuh kemudian — banyak agen sukses pakai jalur ini untuk bangun riwayat dulu",
      "Kombinasikan dengan TDAU/Sertifikat Usaha Pariwisata: satu paket, kredibilitas ganda di mata maskapai & korporasi",
    ],
    faq: [
      {
        q: "Tanpa IATA, apakah travel tetap bisa jual tiket internasional?",
        a: "Bisa, sebagai sub-agent (menjual ulang tiket dari agen IATA lain) — tapi Anda kehilangan komisi penuh, akses nett fare langsung, dan kontrol penerbitan. Dengan akreditasi IATA, margin jauh lebih sehat dan korporasi bisa jadi klien langsung Anda.",
      },
      {
        q: "Berapa total biaya IATA per tahunnya?",
        a: "Ada biaya registration awal, annual fee IATA, biaya pemeliharaan bank guarantee, plus pelatihan personel. Totalnya bervariasi sesuai proyeksi penjualan Anda — saat konsultasi kami susun total cost of ownership transparan sejak hari pertama.",
      },
    ],
  },
  {
    id: "saudi-arabia",
    name: "Izin Usaha Arab Saudi (Lisensi MISA & CR)",
    short:
      "MISA (Ministry of Investment Saudi Arabia) adalah pintu masuk legal untuk usaha asing di Arab Saudi era Vision 2030 — banyak sektor kini terbuka 100% kepemilikan asing, tanpa wajib mitra lokal.",
    long:
      "Ekspansi ke Arab Saudi sedang emas: Vision 2030 membuka ekonomi terbesar di Timur Tengah dengan reformasi perizinan masif. Alur legalnya: (1) MISA License — lisensi investasi dari Ministry of Investment Saudi Arabia yang mengizinkan kepemilikan asing (di banyak sektor kini 100% tanpa mitra lokal); (2) pendirian entitas + Commercial Registration (CR) dari Ministry of Commerce; (3) registrasi ZATCA untuk pajak & e-invoice; (4) Chamber of Commerce, GOSI (jaminan sosial karyawan), dan Iqama untuk direksi/General Manager; (5) bila memenuhi kriteria, program Regional Headquarters (RHQ) Riyadh memberi insentif pajak hingga 30 tahun. Dokumen Indonesia (akta, SK, NIB) wajib dialihbahasakan & dialegalkan (apostille — Arab Saudi kini sudah menerima jalur apostille). Tim internasional kami menangani end-to-end dari Jakarta, termasuk memilih ISIC codes Saudi yang tepat sesuai KBLI bisnis Anda.",
    authority: "MISA (Ministry of Investment Saudi Arabia) + Ministry of Commerce — Kerajaan Arab Saudi",
    legalBasis: "Saudi Investment Law & regulasi MISA, Companies Law Saudi, kerangka Vision 2030 / RHQ Program",
    cost: "Paket Internasional mulai Rp 45 juta + biaya resmi pemerintah Saudi (SAR)",
    timeline: "60-120 hari sampai CR terbit & siap operasional",
    requirements: [
      "Dokumen legalitas usaha Indonesia (akta, SK, NIB) + terjemahan resmi & apostille",
      "Paspor & data pribadi pemegang saham/direksi",
      "Rencana investasi singkat + pemilihan aktivitas (ISIC codes Saudi)",
      "Alamat kantor di Arab Saudi (bisa mulai dari serviced office sesuai sektor)",
      "Modal sesuai jenis lisensi — banyak sektor kini tanpa syarat mitra lokal (100% foreign ownership)",
    ],
    steps: [
      "Konsultasi struktur: sektor, negative list, kelayakan 100% ownership & opsi RHQ",
      "Pengajuan MISA License (elektronik, via portal MISA)",
      "Pendirian entitas + Commercial Registration (CR) Ministry of Commerce",
      "Registrasi ZATCA (pajak, e-invoice), Chamber of Commerce & GOSI",
      "Iqama GM/direksi + pembukaan rekening korporat Saudi",
      "Operasional siap — kami tetap jadi compliance partner tahunan Anda",
    ],
    tips: [
      "Cek Negative List terbaru sebelum memutuskan struktur — banyak sektor yang dulu wajib mitra lokal kini terbuka 100%",
      "Program Regional HQ (RHQ) di Riyadh memberi insentif pajak hingga 30 tahun + akses kontrak pemerintah — layak dipertimbangkan sejak awal",
      "Gunakan jalur apostille untuk dokumen Indonesia — jauh lebih cepat daripada legalisasi konsuler",
    ],
    faq: [
      {
        q: "Apakah PT Indonesia bisa 100% memiliki perusahaan di Arab Saudi?",
        a: "Ya — sejak reformasi Vision 2030, sebagian besar sektor terbuka 100% kepemilikan asing melalui lisensi MISA tanpa wajib mitra lokal. Sektor tertentu masih punya batasan (negative list). Kirim jenis usaha Anda, kami cek kelayakannya gratis dalam 1x konsultasi.",
      },
      {
        q: "Apakah saya harus tinggal di Arab Saudi untuk mengurus izin ini?",
        a: "Tidak harus selama proses — mayoritas pengurusan MISA & CR bisa secara elektronik dari Jakarta dengan power of attorney. Kunjungan fisik biasanya baru diperlukan untuk Iqama direksi & pembukaan rekening korporat. Tim kami mengatur jadwal minimal yang efisien.",
      },
    ],
  },
  {
    id: "rkab-tambang",
    name: "RKAB & Kepatuhan Tambang (IUP/IUPK — ESDM & Minerba)",
    short:
      "RKAB (Rencana Kerja & Anggaran Biaya) kini 3 tahunan, izin jual & angkut via MODI, perpanjangan IUP/IUPK — kepatuhan tambang adalah rutinitas berisiko tinggi yang tidak boleh telat sehari pun.",
    long:
      "Pemegang IUP/IUPK berdiri di atas lapisan kewajiban berkala: RKAB (Rencana Kerja dan Anggaran Biaya) yang sejak 2023 diajukan untuk periode 3 tahun melalui Minerba Online Processing System (e-RKAB), laporan berkala (LKPM minerba), kewajiban DMO/DPO untuk batubara, royalti & pajak kepatuhan, dokumen lingkungan, hingga izin penjualan (izin jual via MODI — Minerba One Data Indonesia) dan izin pengangkutan. Terlambat atau salah strategi RKAB = produksi terhenti & sanksi. Perpanjangan IUP/IUPK harus mulai diproses 6-12 bulan sebelum masa berlaku habis, termasuk kajian kelayakan, kewajiban pengusahaan (wajib pengolahan/divestasi sesuai konteks), dan koordinasi dengan Ditjen Minerba ESDM. Tim kami — yang benar-benar paham bahasa teknis minerba — menangani audit kepatuhan, penyusunan RKAB & justifikasi teknis, sampai negosiasi forum evaluasi.",
    authority: "Ditjen Mineral dan Batubara — Kementerian ESDM (+ DMO/DPO & provinsi terkait)",
    legalBasis: "UU 3/2020 (perubahan UU 4/2009 Minerba), PP 96/2021, Permen ESDM RKAB & Permen Minerba terkini",
    cost: "Mulai Rp 8 juta per dokumen/program (paket tahunan tersedia)",
    timeline: "30-90 hari per dokumen (RKAB mengikuti kalender evaluasi ESDM)",
    requirements: [
      "IUP/IUPK aktif + data kewajiban pengusahaan & laporan berkala",
      "Data teknis eksplorasi/operasi produksi untuk justifikasi RKAB",
      "Status kepatuhan: royalti, DMO/DPO, dokumen lingkungan",
      "Akun & data bersih di Minerba Online (e-RKAB) dan MODI",
      "Untuk perpanjangan: kajian kelayakan & pemenuhan kewajiban pengusahaan",
    ],
    steps: [
      "Audit kepatuhan tahunan: mapping semua kewajiban & tenggat",
      "Penyusunan RKAB 3 tahun + justifikasi teknis (produksi, biaya, program)",
      "Pengajuan via Minerba Online Processing System (e-RKAB)",
      "Koordinasi forum evaluasi & revisi hingga disetujui",
      "Turunan operasional: izin jual via MODI, izin angkut, pelaporan LKPM",
    ],
    tips: [
      "RKAB kini 3 tahunan — susun strategi produksi 3 tahun dalam satu dokumen; revisi tengah periode mahal secara waktu",
      "Perpanjangan IUP/IUPK mulai diajukan 6-12 bulan sebelum habis — telat 1 bulan bisa berarti produksi berhenti",
      "Izin jual & angkut kini dikelola via MODI — pastikan akun, data produksi & laporan MODI Anda konsisten sejak awal",
    ],
    faq: [
      {
        q: "IUP saya telat lapor/RKAB ditolak, apakah bisa diselamatkan?",
        a: "Sering kali bisa — melalui regularisasi: perbaikan dokumen, penyelesaian administrasi kewajiban, dan komunikasi teknis dengan evaluator ESDM. Semakin cepat ditangani, semakin kecil sanksi administratifnya. Konsultasikan riwayat izin Anda untuk analisis kelayakan.",
      },
      {
        q: "Apa bedanya RKAB lama dan RKAB sekarang?",
        a: "Sejak 2023, RKAB tidak lagi tahunan melainkan diajukan untuk periode 3 tahun melalui sistem Minerba Online. Isinya lebih strategis (rencana produksi & anggaran 3 tahun) dengan kemampuan penyesuaian tertentu. Format & evaluasinya berbeda — dokumen lama tidak bisa hanya diperbarui, harus disusun ulang dengan justifikasi teknis yang benar.",
      },
    ],
  },
];

// ---------- PANDUAN PER SEKTOR ----------
export interface SectorGuide {
  id: string;
  name: string;
  desc: string;
  permits: string[];
  kbliHint: string;
  caseNote: string;
}

export const SECTOR_GUIDES: SectorGuide[] = [
  {
    id: "kuliner",
    name: "Kuliner / F&B",
    desc: "Dari warung online sampai franchise — F&B adalah sektor dengan izin paling banyak ditanya. Kuncinya: NIB, halal, dan izin edar sesuai produk.",
    permits: ["NIB + Sertifikat Standar", "Sertifikat Halal", "PIRT / MD BPOM", "PBG & SLF (ruang usaha)", "NPWP & PPh 0,5%"],
    kbliHint: "KBLI 56xxx (restoran, katering, kedai minuman) & 107xx (industri pengolahan)",
    caseNote: "Klien kami: kafe roastery Yogyakarta — 6 izin selesai 3 minggu, paket Bisnis.",
  },
  {
    id: "konstruksi",
    name: "Konstruksi / Properti",
    desc: "Ikut tender & proyek menuntut badan hukum + kualifikasi. PT konstruksi membutuhkan SBU, sertifikasi personel, dan kepatuhan AMDAL untuk proyek besar.",
    permits: ["Pendirian PT", "NIB & SBU Konstruksi", "SKA/SKT personel", "Izin Lingkungan (proyek besar)", "PBG & SLF"],
    kbliHint: "KBLI 41xxx (bangunan gedung) & 42xxx (konstruksi sipil)",
    caseNote: "Klien kami: BS Konstruksi — BUT, NIB, SBU lengkap; tender lancar.",
  },
  {
    id: "retail",
    name: "Retail / Toko & E-commerce",
    desc: "Jualan online maupun offline tetap wajib NIB. Marketplace kini menuntut legalitas produk — NIB + izin edar adalah tiket masuk resmi.",
    permits: ["NIB Perseorangan/PT", "Izin Edar produk (PIRT/MD)", "Sertifikat Halal (produk F&B)", "SPPKP (bila perlu faktur pajak)"],
    kbliHint: "KBLI 47xxx (perdagangan eceran) & 62xxx (jasa e-commerce)",
    caseNote: "Klien kami: brand skincare — MD BPOM 45 hari, langsung lolos kurasi marketplace.",
  },
  {
    id: "manufaktur",
    name: "Manufaktur / Pabrik",
    desc: "Sektor paling kompleks: lingkungan, keselamatan kerja, dan standardisasi produk. Perencanaan berurutan dari awal menghemat 3-6 bulan.",
    permits: ["NIB + Sertifikat Standar industri", "Izin Lingkungan (UKL-UPL/AMDAL)", "PBG & SLF pabrik", "SNI (bila wajib)", "P2K3 & K3 keselamatan"],
    kbliHint: "KBLI 10xxx-33xxx sesuai industri pengolahan",
    caseNote: "Tim kami menangani AMDAL pabrik lintas provinsi dengan forum teknis penuh.",
  },
  {
    id: "kesehatan",
    name: "Kesehatan / Klinik / Farmasi",
    desc: "Regulasi berlapis Kemenkes: izin sarana, izin praktik, akreditasi. Urutan pengurusan yang salah = macet berbulan-bulan.",
    permits: ["Badan usaha & NIB", "SIA klinik/apotek", "SIP & STR tenaga medis", "Akreditasi (bila wajib)", "Izin edar alat/obat"],
    kbliHint: "KBLI 86xxx (rumah sakit & klinik) & 477xx (apotek/retail obat)",
    caseNote: "Paket klinik lengkap 30-60 hari, termasuk koordinasi Dinkes.",
  },
  {
    id: "pariwisata",
    name: "Pariwisata / Hotel / Travel",
    desc: "TDAU & sertifikasi usaha pariwisata adalah identitas resmi sektor ini. Untuk travel agensi & wisata bahari ada izin khusus tambahan.",
    permits: ["Badan usaha & NIB", "TDAU (Tanda Daftar Usaha Pariwisata)", "Sertifikat Usaha Pariwisata", "Izin wisata bahari/khusus", "Halal (hotel & restoran)"],
    kbliHint: "KBLI 79xxx (travel) & 55xxx (akomodasi)",
    caseNote: "Klien travel Bali: TDAU 12 hari, kini 3 cabang jadi pelanggan repeat.",
  },
  {
    id: "logistik",
    name: "Logistik / Transportasi / Ekspor",
    desc: "Perizinan armada, gudang, hingga ekspor-impor. Kesalahan KBLI di sektor ini mahal karena mempengaruhi izin niaga & dokumen kepabeanan.",
    permits: ["NIB sektor transportasi", "TDUP & uji KIR armada", "Izin niaga/gudang/depot", "NIB ekspor & dokumen kepabeanan"],
    kbliHint: "KBLI 49xxx-53xxx (angkutan & pergudangan)",
    caseNote: "Izin depot & gudang kami tuntaskan lintas kota dengan kurir dokumen.",
  },
  {
    id: "tambang",
    name: "Tambang / Energi",
    desc: "Sektor paling berat regulasinya: IUP/IUPK, RKAB, hingga kewajiban pengusahaan. Butuh tim yang benar-benar paham ESDM & Minerba.",
    permits: ["IUP / IUPK", "RKAB & kewajiban pengusahaan", "Izin lingkungan (AMDAL)", "Izin angkut & jual", "IUP OP (olahan) bila perlu"],
    kbliHint: "KBLI 07xxx (tambang) & 35xxx (listrik/energi)",
    caseNote: "Paket Enterprise: dokumen IUP, koordinasi ESDM, RKAB — 90-180 hari.",
  },
  {
    id: "travel-ibadah",
    name: "Travel Ibadah (Haji & Umroh)",
    desc: "Sektor paling sensitif regulasinya — melibatkan dana jamaah & kepercayaan publik. Legalitas PPIU/PPIH adalah segalanya; tanpa itu, bisnis ini pidana.",
    permits: ["Pendirian PT travel", "SPPU & SIPU (PPIU) Kemenag", "SK PPIH untuk haji", "Rekening kolektif jamaah", "Pembimbing ibadah bersertifikat"],
    kbliHint: "KBLI 79120 (biro perjalanan wisata) + pendaftaran khusus sistem Kemenag (SIMPONI)",
    caseNote: "Klien travel umroh Jakarta: PT + SPPU + SIPU terbit 38 hari, langsung lolos e-Katalog.",
  },
  {
    id: "internasional",
    name: "Ekspansi Internasional",
    desc: "Buka perusahaan di Arab Saudi era Vision 2030, atau akreditasi IATA untuk tiket global — tim internasional kami mengurus dari Jakarta sampai Riyadh.",
    permits: ["Lisensi MISA (100% asing)", "Commercial Registration (CR)", "Iqama GM & GOSI", "ZATCA e-invoice & pajak", "Apostille dokumen Indonesia"],
    kbliHint: "Aktivitas dipetakan ke ISIC codes Saudi dari KBLI Anda — kami yang petakan",
    caseNote: "Alur kami: MISA → CR → ZATCA → Iqama — end-to-end tanpa bolak-balik Riyadh.",
  },
];

// ---------- PANDUAN PER WILAYAH ----------
export interface RegionGuide {
  name: string;
  note: string;
  fastFacts: string;
}

export const REGION_GUIDES: RegionGuide[] = [
  {
    name: "DKI Jakarta",
    note: "DPMPTSP DKI dengan sistem online terlengkap; dominasi usaha jasa, F&B & korporasi. PBG via SIMBG terpusat.",
    fastFacts: "Kantor kami berada di SCBD — jantung bisnis Indonesia. NIB 1 hari, PT 3-5 hari.",
  },
  {
    name: "Jawa Barat (Bandung, Bekasi)",
    note: "Kota industri & kreatif; kewajiban dokumen lingkungan ketat untuk manufaktur. Bandung kuat di F&B & kreatif.",
    fastFacts: "NIB 1 hari; sertifikat halal subsidi kuota melimpah untuk UMKM.",
  },
  {
    name: "Jawa Tengah (Semarang, Solo)",
    note: "Basis UMKM & manufaktur kecil; dukungan subsidi halal & PIRT sangat baik; proses DPMPTSP relatif cepat.",
    fastFacts: "Pendirian CV 2 hari; PIRT 14 hari — favorit pengusaha baru.",
  },
  {
    name: "DI Yogyakarta",
    note: "Kota usaha kreatif & pariwisata budaya; banyak usaha milik pemuda dengan skema perseorangan.",
    fastFacts: "NIB gratis + pendampingan LKPM; kafe & homestay jadi segmen terbanyak.",
  },
  {
    name: "Jawa Timur (Surabaya, Malang)",
    note: "Gerbang perdagangan & industri Jatim; Surabaya punya OSS daerah matang, Malang kuat di F&B & pendidikan.",
    fastFacts: "MD BPOM 30-45 hari dengan lab partner kami di Surabaya.",
  },
  {
    name: "Bali",
    note: "Pariwisata global; banyak investor asing (PMA) untuk hotel, villa & F&B. Perizinan zona (green belt!) sangat krusial.",
    fastFacts: "PMA Bali 7-14 hari + konsultasi zona sebelum beli tanah/villa.",
  },
  {
    name: "Sumatera Utara (Medan)",
    note: "Agr bisnis & perkebunan; kuat di perdagangan & manufaktur pangan.",
    fastFacts: "Izin perkebunan & PIRT mendapat prioritas dari tim Sumatera kami.",
  },
  {
    name: "Sulawesi & Kalimantan",
    note: "Pertambangan, kelapa sawit & energi; kebutuhan IUP/IUPK & dokumen lingkungan paling kompleks.",
    fastFacts: "Tim Enterprise kami on-site: AMDAL, RKAB & koordinasi ESDM.",
  },
  {
    name: "Luar Negeri (Investor Asing)",
    note: "Investor asing membangun bisnis Indonesia via PMA; tim kami berbahasa Inggris & berpengalaman lintas negara. Untuk ekspansi sebaliknya, kami juga menangani izin usaha Arab Saudi (MISA) era Vision 2030.",
    fastFacts: "PMA full service + Izin Usaha Arab Saudi (MISA, CR, ZATCA) end-to-end.",
  },
];

// ---------- KBLI POPULER ----------
export interface KbliItem {
  code: string;
  name: string;
  risk: string;
  sector: string;
}

export const KBLI_POPULAR: KbliItem[] = [
  { code: "56101", name: "Restoran", risk: "Menengah Rendah", sector: "Kuliner" },
  { code: "56303", name: "Kedai Kopi / Coffee Shop", risk: "Menengah Rendah", sector: "Kuliner" },
  { code: "56201", name: "Katering / Jasa Boga", risk: "Menengah Rendah", sector: "Kuliner" },
  { code: "10792", name: "Industri Kue & Roti", risk: "Menengah", sector: "Kuliner" },
  { code: "47111", name: "Perdagangan Eceran Toko/Semua Barang", risk: "Rendah", sector: "Retail" },
  { code: "47912", name: "Perdagangan Eceran Online / Marketplace", risk: "Rendah", sector: "Digital" },
  { code: "62019", name: "Aktivitas Pemrograman Komputer Lainnya", risk: "Rendah", sector: "Digital" },
  { code: "63122", name: "Portal Web / Search Engine", risk: "Rendah", sector: "Digital" },
  { code: "41011", name: "Konstruksi Bangunan Gedung Tinggi", risk: "Tinggi", sector: "Konstruksi" },
  { code: "42101", name: "Konstruksi Jalan Raya", risk: "Tinggi", sector: "Konstruksi" },
  { code: "86101", name: "Kegiatan Perawatan Rumah Sakit Umum", risk: "Tinggi", sector: "Kesehatan" },
  { code: "86202", name: "Klinik Rawat Inap", risk: "Tinggi", sector: "Kesehatan" },
  { code: "86909", name: "Aktivitas Kesehatan Lainnya (Praktik Perorangan)", risk: "Menengah", sector: "Kesehatan" },
  { code: "55112", name: "Hotel Bintang", risk: "Menengah Tinggi", sector: "Pariwisata" },
  { code: "79120", name: "Biro Perjalanan Wisata", risk: "Menengah", sector: "Pariwisata" },
  { code: "49311", name: "Angkutan Barang Kota/Regional", risk: "Menengah", sector: "Logistik" },
  { code: "52101", name: "Penyimpanan / Gudang", risk: "Menengah", sector: "Logistik" },
  { code: "10330", name: "Pengolahan & Pengawetan Daging", risk: "Menengah Tinggi", sector: "Manufaktur" },
  { code: "10711", name: "Industri Penggilingan & Penyulingan Gula", risk: "Menengah Tinggi", sector: "Manufaktur" },
  { code: "07231", name: "Pertambangan Bijih Besi", risk: "Tinggi", sector: "Tambang" },
];

// ---------- PERBANDINGAN KOMPETITOR ----------
export interface ComparisonRow {
  feature: string;
  us: string;
  others: string;
}

export const COMPARISON: ComparisonRow[] = [
  {
    feature: "Konsultan AI 24/7 via website",
    us: "Tersedia — jawaban instan kapan pun",
    others: "Umumnya hanya form kontak, balas di jam kantor",
  },
  {
    feature: "Cek kebutuhan izin dengan AI",
    us: "Gratis, 30 detik, tanpa daftar",
    others: "Harus isi form & tunggu sales menghubungi",
  },
  {
    feature: "Garansi uang kembali tertulis",
    us: "100% di kontrak jika izin gagal karena proses kami",
    others: "Sering hanya 'best effort' tanpa jaminan tertulis",
  },
  {
    feature: "Transparansi harga di website",
    us: "Harga paket tertera jelas & all-in",
    others: "Harga sering baru muncul saat konsultasi sales",
  },
  {
    feature: "Kantor fisik kelas korporasi",
    us: "Kawasan SCBD — satu lantai dengan Bursa Efek Indonesia",
    others: "Umumnya kantor ruko atau virtual office",
  },
  {
    feature: "Update progres harian",
    us: "PIC personal via WhatsApp, laporan tiap hari",
    others: "Umumnya dijawab saat klien bertanya",
  },
  {
    feature: "Knowledge base regulasi",
    us: "Panduan izin, sektor, wilayah & KBLI di satu halaman",
    others: "Tersebut di banyak artikel blog yang sulit dicari",
  },
  {
    feature: "Jangkauan wilayah",
    us: "38 provinsi & 514 kabupaten/kota, proses online penuh + kurir dokumen",
    others: "Umumnya terkonsentrasi di kota besar saja",
  },
  {
    feature: "Layanan khusus ibadah (Haji/Umroh) & internasional (IATA, Arab Saudi)",
    us: "Ada — divisi Travel Ibadah (PPIU/PPIH), aviasi (IATA) & tim ekspansi MENA (MISA)",
    others: "Sangat jarang ditawarkan konsultan perizinan lokal",
  },
];

// ---------- PHASE 2 (Rencana Konten Mendatang) ----------
export const NEXT_PHASES = [
  {
    phase: "Phase 2",
    title: "Masa Depan: Blog Engine & Kalkulator",
    items: [
      "100+ artikel SEO long-tail (kbli terpisah per kode, panduan per kota)",
      "Kalkulator biaya perizinan interaktif",
      "Peta heatmap tingkat risiko KBLI",
      "Email course 'Legal Bisnis 7 Hari'",
    ],
  },
];
