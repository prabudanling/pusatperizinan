// ============================================================
// MESIN PERBANDINGAN BADAN USAHA — Tier 2 SEO
// Konten berbasis: UU 40/2007 (PT), KUHD (CV/Firma/UD),
// UU Cipta Kerja (PT Perorangan, Koperasi), UU 16/2001 (Yayasan),
// UU 25/1992 (Koperasi), UU 25/2007 & PP 5/2021 (PMA),
// PP 55/2022 (PPh final 0,5%), PMK per pajak.
// ============================================================

import { PROGRAMMATIC_COMPARISONS } from "./comparisons-generated";

export type Winner = "a" | "b" | "tie";

export interface CompareAspect {
  aspect: string;
  a: string;
  b: string;
  winner: Winner;
}

export interface Comparison {
  slug: string;
  aId: string;
  bId: string;
  aName: string;
  bName: string;
  aShort: string;
  bShort: string;
  title: string;
  metaTitle: string;
  metaDesc: string;
  intro: string[];
  aspects: CompareAspect[];
  chooseA: string[];
  chooseB: string[];
  verdict: string;
  faq: { q: string; a: string }[];
  keywords: string[];
}

const WINNER_LABEL: Record<Winner, string> = { a: "kiri", b: "kanan", tie: "imbang" };

const HAND_MADE_COMPARISONS: Comparison[] = [
  {
    slug: "pt-vs-cv",
    aId: "pt",
    bId: "cv",
    aName: "PT (Perseroan Terbatas)",
    bName: "CV (Commanditaire Vennootschap)",
    aShort: "PT",
    bShort: "CV",
    title: "PT vs CV: Mana yang Cocok untuk Usaha Anda? (Tabel Lengkap 13 Aspek)",
    metaTitle: "PT vs CV — Perbandingan Lengkap: Pajak, Modal, Risiko, Tender | 2026",
    metaDesc:
      "Perbandingan PT vs CV lengkap 13 aspek: dasar hukum, tanggung jawab utang, pajak, biaya pendirian, durasi, tender & investor. Plus panduan kapan pilih PT, kapan pilih CV. Gratis.",
    intro: [
      "PT dan CV adalah dua badan usaha paling populer di Indonesia — dan dua pilihan yang paling sering bikin bingung pemilik usaha. Keduanya sah secara hukum, tapi karakternya sangat berbeda: PT adalah badan hukum dengan tanggung jawab terbatas, sedangkan CV adalah persekutuan orang-orang di mana sekutu aktif menanggung utang hingga harta pribadi.",
      "Tabel di bawah membandingkan keduanya dalam 13 aspek nyata — dari dasar hukum, pajak, biaya pendirian, sampai kemampuan menarik investor. Setelah tabel, ada panduan keputusan: kapan memilih PT, kapan memilih CV.",
    ],
    aspects: [
      { aspect: "Dasar hukum", a: "UU No. 40/2007 tentang Perseroan Terbatas — badan hukum penuh berbadan saham", b: "KUHD Pasal 19-21 jo. UU Cipta Kerja Pasal 157 — persekutuan dagang, bukan badan hukum", winner: "a" },
      { aspect: "Jumlah pendiri", a: "PT biasa minimal 2 pemegang saham; PT Perorangan cukup 1 orang WNI", b: "Minimal 2 orang: sekutu aktif + sekutu pasif (umumnya keluarga/percaya)", winner: "tie" },
      { aspect: "Tanggung jawab utang usaha", a: "Terbatas pada modal saham — harta pribadi pemegang saham aman", b: "Sekutu aktif bertanggung jawab tak terbatas — harta pribadi ikut terlilit", winner: "a" },
      { aspect: "Biaya pendirian (jasa + PNBP)", a: "Rp3,5-6,5 juta: akta notaris + SK Kemenkumham (yustisi) + NIB", b: "Rp2,5-4,5 juta: akta notaris saja + NIB (tanpa SK Kemenkumham)", winner: "b" },
      { aspect: "Durasi pendirian", a: "3-7 hari kerja (proses notaris + pengesahan Kemenkumham)", b: "1-3 hari kerja (cukup akta notaris + NIB di OSS)", winner: "b" },
      { aspect: "Pajak penghasilan", a: "PPh Badan 22% (19% untuk go-public); usaha mikro-kecil bisa PPh final 0,5% selama masa terbatas (PP 55/2022)", b: "CV bukan subjek PPh badan — laba dibagikan lalu tiap sekutu lapor PPh Orang Pribadi (ringan di awal, progresif saat laba naik)", winner: "b" },
      { aspect: "Pembukuan & pelaporan", a: "Wajib pembukuan lengkap + SPT Tahunan 1771; audit wajib untuk aset/pemenuhan kriteria tertentu", b: "Wajib buku dagang KUHD tetapi administrasi lebih ringan; SPT sekutu per orang", winner: "b" },
      { aspect: "Menambah investor / modal", a: "Mudah — cukup terbitkan/transfer saham; kompatibel investor, venture capital, akuisisi", b: "Sulit — tanpa saham; penambahan sekutu harus lewat revisi akta notaris", winner: "a" },
      { aspect: "Kredibilitas bank & tender", a: "Tinggi — standar tender pemerintah, pengadaan korporasi, dan kredit bank besar", b: "Menengah — diterima bank umumnya, namun banyak tender/klien korporat mensyaratkan PT", winner: "a" },
      { aspect: "Perlindungan harta pribadi", a: "Aset usaha terpisah dari aset pribadi (tanggung jawab terbatas)", b: "Sekutu aktif menanggung seluruh kewajiban — risiko harta pribadi nyata", winner: "a" },
      { aspect: "Beban administrasi bulanan", a: "Lebih berat: SPT Masa/badan, pembukuan konsisten, kewajiban LKPM", b: "Lebih ringan: pencatatan sederhana, pajak mengikuti sekutu", winner: "b" },
      { aspect: "Penutupan / restrukturisasi", a: "Proses pembubaran formal: akta pembubaran, pelaporan, penyelesaian kewajiban — 1-3 bulan", b: "Relatif mudah: pembubaran lewat akta notaris baru — lebih cepat & murah", winner: "b" },
      { aspect: "Keterlibatan mitra asing", a: "Bisa via PT PMA — asing boleh 100% (kecuali sektor tertutup PP 49/2021)", b: "Tidak tersedia — CV untuk kepentingan investasi asing tidak dipakai", winner: "a" },
    ],
    chooseA: [
      "Rencana tumbuh besar: butuh investor, venture capital, atau go-public",
      "Ikut tender pemerintah atau menjadi vendor korporasi besar",
      "Usaha berisiko (konstruksi, distribusi, F&B produksi) — butuh proteksi aset pribadi",
      "Butuh kredit bank bernilai besar atau pinjaman modal kerja formal",
      "Ada rencana melibatkan pemodal asing",
    ],
    chooseB: [
      "Usaha keluarga atau kemitraan kecil-menengah dengan kepercayaan tinggi",
      "Ingin pendirian cepat (1-3 hari) dan murah (hemat Rp1-2 juta)",
      "Laba masih sederhana — pajak PPh orang pribadi sekutu lebih ringan di awal",
      "Administrasi minimal tanpa struktur direksi/komisaris",
      "Tidak ada rencana menarik investor dalam 1-2 tahun ke depan",
    ],
    verdict:
      "Pilih PT bila Anda sedang membangun aset bisnis jangka panjang: proteksi harta pribadi, kemampuan menarik modal, dan akses tender. Pilih CV bila usaha masih tahap tumbuh bersama orang kepercayaan dan mengutamakan kecepatan, biaya, dan kemudahan administrasi. Banyak perusahaan besar Indonesia memulai dari CV lalu bertransformasi menjadi PT saat siap tumbuh besar — jadi CV bisa jadi 'pintu masuk', PT adalah 'rumah akhir'.",
    faq: [
      { q: "Apakah pendirian CV wajib pakai akta notaris?", a: "Ya. Sejak UU Cipta Kerja (perubahan Pasal 157 KUHD), persekutuan komanditer didirikan dengan akta notaris. Tanpa akta notaris, CV tidak sah sebagai persekutuan komanditer — meski NIB tetap bisa diterbitkan atas nama usaha, posisi hukum antar sekutu menjadi lemah." },
      { q: "Siapa yang membayar pajak di CV?", a: "CV itu sendiri bukan subjek PPh badan. Laba bersih CV dibagikan kepada para sekutu, lalu setiap sekutu melaporkannya sebagai penghasilan usaha dalam PPh Orang Pribadi (tarif progresif 5-35% atau PPh final 0,5% bila memenuhi kriteria UMKM). Adapun jika omzet mencapai Rp4,8 miliar, CV wajib terdaftar sebagai PKP untuk PPN." },
      { q: "Bisakah CV diubah menjadi PT?", a: "Tidak ada mekanisme 'konversi otomatis' CV menjadi PT. Praktik yang umum: mendirikan PT baru, lalu memindahkan aset, kontrak, dan aktivitas usaha secara bertahap ke PT. Kami rutin mendampingi transisi ini — termasuk menghindari pajak transfer aset yang tidak perlu." },
      { q: "Berapa biaya dan lama pendirian masing-masing?", a: "PT: Rp3,5-6,5 juta (akta notaris + PNBP SK Kemenkumham + jasa), selesai 3-7 hari kerja. CV: Rp2,5-4,5 juta (akta notaris + jasa), selesai 1-3 hari kerja. Harga bervariasi tergantung kota, jumlah KBLI, dan layanan pendampingan NIB/OSS." },
      { q: "Apakah CV bisa ikut tender pemerintah?", a: "Sebagian tender kecil masih menerima CV, namun mayoritas tender — terutama pengadaan barang/jasa lelang — mensyaratkan badan hukum PT. Jika rencana bisnis Anda memuat tender, pilih PT sejak awal agar sertifikasi (SBU/SKA) dan track record Anda menumpuk di satu badan hukum." },
      { q: "Mana yang lebih aman jika usaha bangkrut?", a: "PT secara signifikan lebih aman: tanggung jawab pemegang saham hanya sebesar modal disetor. Di CV, sekutu aktif menanggung seluruh utang usaha hingga harta pribadi — termasuk rumah dan tabungan. Inilah alasan utama usaha berisiko tinggi (distribusi, konstruksi, produksi) sebaiknya berbadan PT." },
    ],
    keywords: [
      "pt vs cv",
      "perbedaan pt dan cv",
      "pt atau cv lebih baik",
      "perbedaan pendirian pt dan cv",
      "biaya pendirian pt vs cv",
      "pajak pt vs cv",
      "cv bisa tender",
      "badan usaha untuk umkm",
    ],
  },
  {
    slug: "pt-pma-vs-pt-lokal",
    aId: "pt-pma",
    bId: "pt-lokal",
    aName: "PT PMA (Penanaman Modal Asing)",
    bName: "PT Lokal (Murni WNI)",
    aShort: "PT PMA",
    bShort: "PT Lokal",
    title: "PT PMA vs PT Lokal: Syarat, Modal, Pajak — Mana yang Anda Butuhkan?",
    metaTitle: "PT PMA vs PT Lokal — Perbedaan Modal Rp10 M, Pemilik & LKPM | 2026",
    metaDesc:
      "Perbedaan PT PMA vs PT Lokal: pemegang saham asing, modal dasar & disetor Rp10 miliar, KBLI terbatas, LKPM wajib, KITAS karyawan asing. Tabel lengkap + kapan memilih masing-masing.",
    intro: [
      "PT PMA dan PT lokal sama-sama badan hukum PT berdasarkan UU 40/2007 — tapi dibedakan oleh kepemilikan saham. Jika ada saham dipegang orang asing atau badan asing, PT itu menjadi PT PMA dan tunduk pada rezim UU Penanaman Modal (UU 25/2007) plus PP 5/2021.",
      "Konsekuensinya nyata: modal minimum lebih tinggi, daftar KBLI yang boleh dipilih lebih terbatas, kewajiban laporan LKPM lebih ketat — namun sebagai gantinya, pemilik asing mendapat kepastian hukum, kebebasan repatriasi laba, dan hak mensponsori KITAS karyawan asing.",
    ],
    aspects: [
      { aspect: "Kepemilikan saham", a: "Minimal 1 saham dipegang orang pribadi/badan asing; bisa 100% asing", b: "100% dipegang orang pribadi/badan Indonesia", winner: "tie" },
      { aspect: "Modal dasar & disetor", a: "Modal dasar & ditempatkan-disetor minimal > Rp10 miliar (di luar tanah & bangunan) — PMK 24/2019; wajib realisasi disetor", b: "Modal bebas ditentukan pendiri; wajib 25% modal dasar ditebus", winner: "b" },
      { aspect: "Daftar KBLI yang tersedia", a: "Terbatas pada daftar investasi PP 10/2021 jo. PP 49/2021 (sebagian sektor tertutup/berpersyaratan)", b: "Bebas memilih KBLI kecuali yang eksklusif PMA", winner: "b" },
      { aspect: "Sponsori KITAS karyawan asing", a: "Ya — hak langsung mengajukan RPTKA/IMTA/KITAS untuk tenaga asing", b: "Tidak — untuk mempekerjakan asing harus jadi PT PMA atau buka perwakilan", winner: "a" },
      { aspect: "Repatriasi laba & modal", a: "Terjamin oleh UU 25/2007 — transfer profit, dividen, dan modal ke luar negeri dijamin", b: "Tidak relevan (pemilik WNI)", winner: "a" },
      { aspect: "Pajak", a: "PPh Badan 22% + PPN; ada PMA zona ekonomi khusus/sarana tertentu bisa insentif tax holiday/allowance", b: "PPh Badan 22% + PPN; UMKM bisa PPh final 0,5% (masa terbatas)", winner: "tie" },
      { aspect: "Kewajiban LKPM", a: "Wajib berkala (triwulan/semester sesuai risiko) — bisa NIB dicabut jika lalai", b: "Wajib untuk usaha menengah/besar; mikro-kecil juga wajib namun insentif lebih longgar", winner: "b" },
      { aspect: "Biaya pendirian", a: "Rp8-15 juta (akta, SK, OSS, notaris, pendampingan struktur saham)", b: "Rp3,5-6,5 juta", winner: "b" },
      { aspect: "Durasi pendirian", a: "5-10 hari kerja (lebih banyak verifikasi: KBLI PMA, pernyataan modal)", b: "3-7 hari kerja", winner: "b" },
      { aspect: "Struktur organ wajib", a: "Direksi + Komisaris (boleh asing dengan paspor); RUPS", b: "Direksi + Komisaris (WNI); RUPS", winner: "tie" },
      { aspect: "Akses tender domestik", a: "Boleh, namun beberapa tender tertentu memprioritaskan lokal (preferensi kementerian terkait)", b: "Penuh — termasuk paket dengan preferensi kewarganegaraan", winner: "b" },
      { aspect: "Kredibilitas global & rekening asing", a: "Tinggi — standar untuk due diligence investor asing, perjanjian internasional, dan ekspansi", b: "Standar domestik", winner: "a" },
      { aspect: "Perubahan struktur saham", a: "Transfer saham fleksibel antar pemegang (WNA/WNI) — perhatikan daftar investasi", b: "Hanya antar pemegang WNI", winner: "a" },
    ],
    chooseA: [
      "Anda asing / perusahaan asing dan ingin memulai bisnis di Indonesia dengan 100% kepemilikan",
      "Butuh mempekerjakan tenaga kerja asing di Indonesia (KITAS sponsor sendiri)",
      "Butuh kepastian repatriasi laba dan proteksi investasi UU PMA",
      "Bisnis berada di sektor yang terbuka dan menjanjikan skala besar",
      "Menyiapkan due diligence investor luar negeri atau joint venture internasional",
    ],
    chooseB: [
      "Semua pemilik adalah WNI dan target pasar domestik",
      "Modal awal di bawah Rp10 miliar dan tidak butuh karyawan asing",
      "Butuh biaya pendirian murah dan KBLI bebas",
      "Fokus pada tender pemerintah dan pengadaan domestik",
      "Usaha mikro-kecil-menengah yang memanfaatkan insentif UMKM",
    ],
    verdict:
      "Pilih PT PMA hanya jika memang ada kepemilikan asing atau kebutuhan spesifik (sponsor KITAS sendiri, proteksi investasi asing) — karena modal minimum Rp10 miliar dan kewajiban LKPM membuat operasionalnya lebih mahal. Jika seluruh pemilik WNI, PT lokal selalu lebih mudah, murah, dan fleksibel. Ada kombinasi yang juga populer: PT lokal + perjanjian lisensi/franchise dengan entitas luar negeri untuk menangkap royalti — konsultasikan strukturnya sebelum memilih.",
    faq: [
      { q: "Apakah modal Rp10 miliar PMA harus langsung disetor penuh?", a: "Modal dasar dan modal ditempatkan-disetor minimal lebih dari Rp10 miliar (di luar tanah & bangunan) menurut PMK 24/2019 harus terrealisasi (disetor) setelah pendirian — uangnya masuk rekening perusahaan dan dipakai untuk operasional, bukan 'parkir' di kertas. Bukti realisasi diminta saat audit LKPM." },
      { q: "Bisakah WNI 100% menjadi pemegang saham PT PMA?", a: "Tidak. Jika semua saham dipegang WNI, statusnya PT lokal. PT PMA menuntut minimal satu pemegang saham asing (pribadi dengan paspor, atau badan hukum asing). Banyak pendiri WNI memilih menambahkan saham asing kecil agar status PMA terbentuk — pastikan KBLI-nya memang terbuka dan manfaatnya sepadan dengan kewajiban modal." },
      { q: "Sektor apa yang tidak boleh dimasuki PT PMA?", a: "PP 10/2021 jo. PP 49/2021 menetapkan prioritas investasi dan daftar kegiatan yang tertutup (misal sebagian pertanian pangan skala kecil, perdagangan ritel tertentu dengan batasan modal) atau berpersyaratan (kemitraan, batas kepemilikan). Kami bantu verifikasi KBLI Anda sebelum pendirian agar tidak salah langkah." },
      { q: "Apakah PT lokal bisa mempekerjakan ekspatriat?", a: "PT lokal tidak berstatus penanaman modal asing, sehingga untuk mempekerjakan asing tetap bisa melalui RPTKA (izin merekrut tenaga asing) sesuai Permenaker — namun kuota dan posisi yang diizinkan lebih terbatas, dan posisi asing tidak boleh menggantikan fungsi personel admin HR. Jika ekspatriat adalah inti bisnis Anda, PT PMA lebih efisien." },
      { q: "Apa risiko jika PT PMA tidak lapor LKPM?", a: "LKPM adalah kewajiban berkala di OSS (triwulanan untuk risiko menengah/besar). Keterlambatan berulang bisa berujung sanksi administratif hingga pencabutan NIB — artinya perusahaan berhenti beroperasi sah. Kami menawarkan layanan LKPM berlangganan agar PMA Anda bebas dari risiko ini." },
    ],
    keywords: [
      "pt pma vs pt lokal",
      "perbedaan pt pma dan pt",
      "modal minimum pt pma 10 miliar",
      "syarat pendirian pt pma",
      "pt pma untuk investor asing",
      "lkpm pt pma",
      "kitas pt pma",
      "pendirian pt pma 2026",
    ],
  },
  {
    slug: "pt-vs-pt-perorangan",
    aId: "pt",
    bId: "pt-perorangan",
    aName: "PT (Perseroan Terbatas)",
    bName: "PT Perorangan",
    aShort: "PT",
    bShort: "PT Perorangan",
    title: "PT vs PT Perorangan: Beda Modal, Notaris & Batasnya di Mana?",
    metaTitle: "PT vs PT Perorangan — Beda Notaris, Modal & Keterbatasannya | 2026",
    metaDesc:
      "Perbedaan PT biasa vs PT Perorangan: notaris vs cukup NIB, 2 pemilik vs 1 orang WNI, KBLI terbatas, tanggung jawab terbatas. Tabel 12 aspek + kapan pilih yang mana. Gratis.",
    intro: [
      "Sejak UU Cipta Kerja, wirausahawan solo punya opsi baru: PT Perorangan — badan hukum PT yang bisa didirikan 1 orang tanpa akta notaris, cukup lewat NIB di OSS. Murah, cepat, dan tanggung jawabnya terbatas.",
      "Namun PT Perorangan punya batasan penting: satu orang hanya boleh memiliki satu PT Perorangan, lingkup KBLI mengikuti kriteria usaha mikro-kecil, dan pengembangan struktur (menambah pemilik) tidak bisa dilakukan tanpa 'naik kelas' menjadi PT biasa. Tabel berikut membedah semuanya.",
    ],
    aspects: [
      { aspect: "Dasar hukum", a: "UU 40/2007 — badan hukum penuh, struktur lengkap", b: "UU Cipta Kerja Pasal 153A-153C jo. PP 8/2021 — badan hukum PT dengan 1 pemegang saham WNI", winner: "tie" },
      { aspect: "Jumlah pemegang saham", a: "Minimal 2 orang (atau badan hukum)", b: "Tepat 1 orang pribadi WNI — tidak bisa tambah pemilik selama berstatus PT Perorangan", winner: "a" },
      { aspect: "Akta notaris & SK Kemenkumham", a: "Wajib — akta notaris + pengesahan Kemenkumham (yustisi)", b: "Tidak perlu — NIB di OSS berlaku sekaligus sebagai pendirian & anggaran dasar (PP 8/2021)", winner: "b" },
      { aspect: "Biaya pendirian", a: "Rp3,5-6,5 juta (notaris + PNBP + jasa)", b: "Resmi gratis di OSS (jasa pendampingan opsional Rp350-750 ribu)", winner: "b" },
      { aspect: "Durasi pendirian", a: "3-7 hari kerja", b: "Cukup 1 hari (instan setelah kelengkapan data)", winner: "b" },
      { aspect: "Tanggung jawab utang", a: "Terbatas pada saham", b: "Terbatas — aset usaha dipisah dari aset pribadi (kecuali pembuktian penyalahgunaan)", winner: "tie" },
      { aspect: "Lingkup KBLI", a: "Bebas semua KBLI yang sah", b: "Terbatas pada kegiatan usaha mikro-kecil (kriteria modal & omzet UU 20/2008); sebagian KBLI sektoral tidak tersedia", winner: "a" },
      { aspect: "Kewarganegaraan & domisili", a: "Bebas; cabang luar negeri bisa", b: "Wajib WNI; satu orang satu PT Perorangan; aktivitas di lokasi tertentu sesuai pernyataan", winner: "a" },
      { aspect: "Pajak", a: "PPh Badan 22% (UMKM mikro-kecil: final 0,5% masa terbatas)", b: "Sebagai badan usaha mikro-kecil: PPh final 0,5% (masa terbatas 4 tahun pajak)", winner: "tie" },
      { aspect: "Investor & pertumbuhan", a: "Bisa terbit saham baru, masuk investor, merger/akuisisi", b: "Tidak bisa tambah pemegang saham — solusinya konversi/naik ke PT biasa", winner: "a" },
      { aspect: "Kredibilitas tender & kredit bank", a: "Tinggi — standar penuh", b: "Meningkat dibanding perseorangan biasa, namun sebagian tender & produk kredit tetap mensyaratkan PT biasa", winner: "a" },
      { aspect: "Cocok untuk tahap usaha", a: "Usaha menengah-besar, tim, ekspansi", b: "Freelancer, UMKM satu orang, usaha baru risiko rendah", winner: "tie" },
    ],
    chooseA: [
      "Ada rencana menambah pemilik/investor dalam 1-2 tahun",
      "Kegiatan usaha berada di KBLI yang tidak tersedia untuk PT Perorangan",
      "Butuh kredibilitas penuh untuk tender, vendor besar, atau kredit bank",
      "Usaha sudah memiliki omzet menengah ke atas dan tim",
    ],
    chooseB: [
      "Anda memulai sendiri dengan modal kecil dan ingin legalitas badan hukum hari ini",
      "Tidak ingin keluar biaya notaris terlebih dahulu (NIB gratis)",
      "Usaha masih mikro-kecil dan memakai PPh final 0,5%",
      "Butuh badan hukum cepat untuk membuka rekening usaha atau marketplace",
    ],
    verdict:
      "PT Perorangan adalah 'PT versi startup solo': gratis, sehari jadi, tanggung jawab terbatas — sempurna untuk validasi bisnis awal. Namun begitu Anda ingin menambah pemilik, masuk KBLI yang lebih luas, atau menyabet tender, jalur upgrade ke PT biasa (akta notaris + SK Kemenkumham) menjadi keharusan. Strategi cerdas: mulai dari PT Perorangan hari ini, siapkan track record, lalu naik kelas saat bisnis menggigit pasar.",
    faq: [
      { q: "Apakah benar PT Perorangan tidak perlu notaris?", a: "Benar. Berdasarkan PP 8/2021, pendirian PT Perorangan dilakukan dengan menerbitkan NIB di OSS — NIB berlaku sekaligus sebagai pengesahan pendirian dan anggaran dasar. Karena itu biaya resminya nol rupiah; yang dibayar hanya jika memakai jasa pendampingan." },
      { q: "Bagaimana cara upgrade PT Perorangan menjadi PT biasa?", a: "Tidak ada 'konversi otomatis'. Jalurnya: mendirikan PT biasa (akta notaris + SK Kemenkumham), memindahkan aset dan aktivitas, lalu menonaktifkan PT Perorangan. Riwayat omzet dan track record bisa terbawa secara komersial. Kami rutin mendampingi proses naik kelas ini." },
      { q: "Apakah PT Perorangan ikut PPh final 0,5%?", a: "Ya — sebagai badan usaha mikro-kecil, PT Perorangan dapat menerapkan PPh final 0,5% sesuai PP 55/2022 selama masa terbatas (4 tahun pajak bagi badan usaha), selama memenuhi kriteria omzet. Setelah masa berakhir, tarif umum PPh badan berlaku." },
      { q: "Bisakah PT Perorangan punya karyawan?", a: "Bisa. Statusnya tetap badan hukum yang mempekerjakan orang — wajib BPJS Ketenagakerjaan & Kesehatan, dan pembukuan penggajian (PPh 21). Keterbatasannya hanya pada jumlah pemegang saham (tetap 1 orang), bukan jumlah karyawan." },
      { q: "Apa batasan terbesar PT Perorangan?", a: "Tiga hal: (1) hanya 1 pemegang saham WNI dan 1 PT Perorangan per orang, (2) lingkup KBLI terbatas usaha mikro-kecil, (3) sebagian kepercayaan pasar (tender besar, vendor korporat) masih menuntut PT biasa. Jika batasan ini menghambat pertumbuhan Anda, saatnya naik ke PT biasa." },
    ],
    keywords: [
      "pt perorangan vs pt",
      "perbedaan pt dan pt perorangan",
      "pt perorangan gratis",
      "pendirian pt perorangan",
      "pt perorangan bisa tender",
      "upgrade pt perorangan ke pt",
      "nib pt perorangan",
      "pt perorangan pajak",
    ],
  },
  {
    slug: "cv-vs-usaha-dagang",
    aId: "cv",
    bId: "usaha-dagang",
    aName: "CV (Commanditaire Vennootschap)",
    bName: "UD / Usaha Perseorangan (NIB OP)",
    aShort: "CV",
    bShort: "UD / NIB OP",
    title: "CV vs Usaha Dagang (UD): Mana yang Tepat untuk Usaha Anda?",
    metaTitle: "CV vs UD Usaha Dagang — Perbedaan Akta Notaris & Tanggung Jawab | 2026",
    metaDesc:
      "Perbedaan CV vs UD/perseorangan: akta notaris vs cukup NIB gratis, 2 sekutu vs 1 pemilik, tanggung jawab, pajak, kredibilitas. Tabel lengkap + panduan memilih. Gratis.",
    intro: [
      "UD (usaha dagang) atau usaha perseorangan biasa adalah bentuk usaha paling sederhana: satu pemilik, cukup NIB gratis di OSS, beroperasi langsung. CV adalah langkah di atasnya: dua orang atau lebih membentuk persekutuan dengan akta notaris.",
      "Pertanyaan kuncinya bukan 'mana yang lebih bagus', melainkan: apakah Anda sendirian atau bersama orang lain? Dan seberapa penting kejelasan hukum pembagian keuntungan dan tanggung jawab? Tabel ini menjawabnya per aspek.",
    ],
    aspects: [
      { aspect: "Dasar hukum", a: "KUHD Pasal 19-21 jo. UU Cipta Kerja — persekutuan dengan akta notaris", b: "Bukan badan hukum — cukup NIB perseorangan (OSS-RBA)", winner: "a" },
      { aspect: "Jumlah pemilik", a: "Minimal 2 (sekutu aktif + pasif)", b: "1 orang", winner: "tie" },
      { aspect: "Biaya pendirian", a: "Rp2,5-4,5 juta (akta notaris + jasa)", b: "Resmi gratis — NIB bisa diterbitkan sendiri; jasa opsional mulai Rp350 ribu", winner: "b" },
      { aspect: "Durasi", a: "1-3 hari kerja", b: "1 hari (instan di OSS)", winner: "b" },
      { aspect: "Tanggung jawab utang", a: "Sekutu aktif tak terbatas (harta pribadi terlilit)", b: "Pemilik menanggung seluruh utang usaha dengan seluruh harta", winner: "tie" },
      { aspect: "Kejelasan pembagian laba", a: "Tertulis di akta — proporsi sekutu aktif/pasif jelas & mengikat", b: "Tidak relevan (pemilik tunggal); jika ada 'pemodal diam-diam', posisinya lemah hukum", winner: "a" },
      { aspect: "Pajak", a: "Laba dibagi ke sekutu → PPh OP masing-masing (atau final 0,5% UMKM per sekutu)", b: "PPh Orang Pribadi — progresif atau final 0,5% (OP bisa sampai 7 tahun pajak)", winner: "b" },
      { aspect: "Kredibilitas berbisnis", a: "Lebih tinggi — ada nama usaha resmi & akta; cocok menandatangani kontrak dengan penyalur/vendor", b: "Dasar — cukup untuk marketplace, rekening usaha, dan klien kecil", winner: "a" },
      { aspect: "Kepastian bila salah satu pemilik mundur", a: "Diatur dalam akta: sekutu pasif gampang keluar; sekutu aktif perlu kesepakatan", b: "Tidak relevan", winner: "a" },
      { aspect: "Administrasi bulanan", a: "Ringan namun perlu pencatatan laba bersama", b: "Paling ringan", winner: "b" },
      { aspect: "Jalur upgrade ke depan", a: "Mudah tumbuh menjadi PT dengan memindahkan aktivitas", b: "Bisa langsung ke PT Perorangan (gratis) lalu PT biasa", winner: "tie" },
      { aspect: "Cocok untuk", a: "Duo/trio pemilik usaha: distributor, supplier, bengkel, toko besar bersama", b: "Pedagang tunggal, freelancer, warung, jasa online", winner: "tie" },
    ],
    chooseA: [
      "Anda dan partner (keluarga/teman) bersama memutar modal usaha",
      "Butuh kejelasan hukum pembagian laba dan tanggung jawab",
      "Usaha cukup besar sehingga perlu nama usaha resmi berakta untuk kontrak",
      "Rencana tumbuh menuju CV besar → PT dalam 2-3 tahun",
    ],
    chooseB: [
      "Anda beroperasi sendirian",
      "Ingin mulai tanpa biaya sama sekali (NIB gratis) dan uji pasar dulu",
      "Usaha kecil dengan risiko terkendali",
      "Prioritas: cepat, sederhana, tanpa urusan notaris",
    ],
    verdict:
      "Jika Anda sendirian — mulailah dengan NIB perseorangan hari ini (gratis, satu hari selesai), tidak perlu 'ud-udan' berbelit. Jika dua orang atau lebih memutar usaha bersama, CV memberikan kepastian hukum yang melindungi relasi kemitraan: siapa yang aktif, siapa yang pasif, dan bagaimana laba dibagi. Hindari kesalahan klasik: berbisnis dua orang tanpa akta — begitu omzet besar, sengketa pembagian hampir pasti terjadi.",
    faq: [
      { q: "Apakah UD masih ada secara hukum setelah era OSS?", a: "Istilah 'UD' kini lebih ke istilah budaya; secara hukum bentuknya adalah usaha perseorangan yang beroperasi dengan NIB (Nomor Induk Berusaha) perseorangan di OSS-RBA. NIB itu sendiri cukup untuk membuka rekening usaha, mendaftar marketplace, dan mengajukan sertifikasi produk." },
      { q: "Bisakah dua orang berbisnis tanpa CV hanya dengan NIB?", a: "NIB perseorangan hanya untuk satu pemilik. Jika dua orang memutar modal bersama tanpa akta CV/PT, secara hukum tidak ada instrumen yang mengatur pembagian hak — risiko sengketa tinggi. Solusi termurah yang sah: akta CV (Rp2,5-4,5 juta) atau konversi ke PT Perorangan oleh salah satu pihak dengan perjanjian tertulis." },
      { q: "Siapa menanggung pajak di CV dan UD?", a: "Keduanya bukan subjek PPh badan. Di UD, pemilik lapor seluruh laba dalam PPh OP-nya (progresif 5-35% atau final 0,5% UMKM). Di CV, laba dibagikan ke sekutu lalu tiap sekutu lapor di PPh OP-nya masing-masing." },
      { q: "Apakah CV dan UD bisa sama-sama punya NIB?", a: "Ya, keduanya mendaftar NIB di OSS — NIB atas nama persekutuan untuk CV, dan NIB orang pribadi untuk usaha perseorangan. Bedanya, CV menyerahkan akta notaris sebagai dokumen pendukung." },
      { q: "Kapan sebaiknya melompat langsung ke PT?", a: "Jika target Anda dalam 12 bulan: menarik investor, ikut tender, kredit bank besar, atau mempekerjakan banyak karyawan — pendirian PT sejak awal menghemat biaya transisi ganda. Kami bisa bantu evaluasi roadmap legalitas yang paling hemat untuk kondisi Anda." },
    ],
    keywords: [
      "cv vs ud",
      "perbedaan cv dan usaha dagang",
      "nib perseorangan gratis",
      "usaha dagang perlu akta",
      "cv perlu notaris",
      "badan usaha untuk pedagang",
      "nib untuk toko online",
    ],
  },
  {
    slug: "pt-vs-yayasan",
    aId: "pt",
    bId: "yayasan",
    aName: "PT (Perseroan Terbatas)",
    bName: "Yayasan",
    aShort: "PT",
    bShort: "Yayasan",
    title: "PT vs Yayasan: Kegiatan Usaha vs Kegiatan Sosial — Bedanya di Mana?",
    metaTitle: "PT vs Yayasan — Perbedaan Tujuan, Pajak & Organ Pengurus | 2026",
    metaDesc:
      "Perbedaan PT vs Yayasan: tujuan usaha vs sosial, organ pembina-pengurus-pengawas, pajak kegiatan usaha 22%, unit usaha yayasan, biaya pendirian. Tabel lengkap + panduan. Gratis.",
    intro: [
      "PT dan yayasan sering disalahpahami sebagai 'opsi yang sama-ikut sama mudah'. Kenyataannya, keduanya dibangun untuk tujuan berbeda: PT memaksimalkan laba bagi pemegang saham; yayasan mewujudkan tujuan sosial, keagamaan, atau kemanusiaan — dan boleh punya unit usaha untuk membiayai programnya.",
      "Memilih salah satu untuk tujuan yang salah bisa fatal: yayasan untuk bisnis komersial murni melanggar ruh UU-nya, sementara PT untuk kegiatan sosial justru membebani dengan pajak yang tidak perlu. Tabel ini menjernihkannya.",
    ],
    aspects: [
      { aspect: "Dasar hukum", a: "UU 40/2007 — badan hukum berbadan saham untuk kegiatan usaha", b: "UU 16/2001 jo. UU 28/2004 — badan hukum untuk tujuan sosial/kemanusiaan", winner: "tie" },
      { aspect: "Tujuan utama", a: "Mencari laba & membagikannya ke pemegang saham", b: "Tidak membagikan laba ke pendiri — hasil dipakai untuk tujuan sosial", winner: "tie" },
      { aspect: "Struktur organ", a: "RUPS, Direksi, Komisaris", b: "Pembina, Pengurus, Pengawas — 3 organ wajib", winner: "tie" },
      { aspect: "Jumlah pendiri", a: "Minimal 2 pemegang saham", b: "Minimal 3 orang pendiri", winner: "tie" },
      { aspect: "Modal & biaya pendirian", a: "Rp3,5-6,5 juta; modal bebas", b: "Rp3-7 juta (akta notaris + SK Kemenkumham); modal bebas", winner: "tie" },
      { aspect: "Pajak atas kegiatan", a: "PPh Badan 22% atas seluruh laba + PPN", b: "Kegiatan usaha tetap dikenai PPh Badan 22%; pendapatan donasi/hibah tertentu tidak jadi objek pajak", winner: "tie" },
      { aspect: "Distribusi hasil", a: "Dividen ke pemegang saham (dipotong PPh final 10%)", b: "Tidak boleh dibagikan ke pendiri/pengurus — menyalahi UU jika ada", winner: "tie" },
      { aspect: "Unit usaha", a: "Inti bisnis itu sendiri", b: "Boleh — unit usaha untuk membiayai program, dengan pembukuan terpisah", winner: "tie" },
      { aspect: "Penerimaan dana", a: "Investor, pinjaman, pendapatan jual-beli", b: "Donasi, zakat/infak (jika lembaga), hibah, sponsor program", winner: "tie" },
      { aspect: "Akses tender komersial", a: "Penuh", b: "Terbatas — tender jasa sosial/pendidikan tertentu; umumnya bukan untuk pengadaan komersial", winner: "a" },
      { aspect: "Kepercayaan publik untuk program sosial", a: "Standar", b: "Tinggi — yayasan adalah wadah sah untuk lembaga sosial, sekolah, klinik sosial, CSR", winner: "b" },
      { aspect: "Pelaporan & transparansi", a: "Pembukuan + SPT 1771", b: "Wajib laporan tahunan ke Kemenkumham + publikasi laporan keuangan; donasi besar ditelusuri", winner: "tie" },
      { aspect: "Kepemilikan aset", a: "Aset milik PT — pemegang saham mendapat dividen", b: "Aset milik yayasan untuk tujuan sosial — pendiri tidak boleh 'memiliki'", winner: "tie" },
    ],
    chooseA: [
      "Tujuan utama bisnis komersial dan laba untuk pemilik",
      "Butuh tender, kredit bank, atau investor",
      "Kegiatan jual-beli/jasa pada umumnya",
      "Rencana ekspansi, merger, atau go-public",
    ],
    chooseB: [
      "Program sosial, pendidikan, kesehatan, keagamaan, kemanusiaan",
      "Menerima donasi/zakat/hibah secara sah dan tertata",
      "Membangun unit usaha untuk menopang program sosial",
      "Kemitraan CSR korporasi yang mensyaratkan lembaga nirlaba",
    ],
    verdict:
      "Aturan praktisnya sederhana: kalau tujuan akhirnya laba untuk pemilik — PT. Kalau tujuan akhirnya dampak sosial — yayasan. Yayasan boleh berjualan (unit usaha) untuk membiayai misinya, tapi tidak boleh menjadi kendaraan menghindari pajak atau membagi keuntungan ke pendiri — itu rawan dibatalkan fiskus dan menyeret pengurusnya. Punya ambisi keduanya? Susun dua entitas: PT untuk bisnis, yayasan untuk program sosial, dengan perjanjian pendanaan yang rapi.",
    faq: [
      { q: "Apakah yayasan bebas pajak?", a: "Tidak sepenuhnya. Pendapatan donasi, zakat, dan hibah umumnya bukan objek pajak. Namun kegiatan usaha yayasan (jualan, jasa berbayar, sewa aset) tetap dikenai PPh Badan 22% dan bisa kena PPN. Pembukuan terpisah antara dana program dan unit usaha sangat penting agar tidak saling menyeret." },
      { q: "Bisakah pendiri yayasan menerima gaji?", a: "Boleh sebagai imbalan kerja pengurus yang wajar dan tertuang dalam keputusan organ — bukan sebagai 'pembagian laba'. Yang dilarang UU adalah membagikan kelebihan pendapatan yayasan ke pendiri/pengurus seolah dividen. PPh 21 atas gaji tetap berlaku." },
      { q: "Berapa minimal pendiri yayasan dan organnya?", a: "Minimal 3 pendiri. Yayasan wajib punya 3 organ: Pembina (menetapkan arah kebijakan), Pengurus (menjalankan), dan Pengawas (mengawasi keuangan). Satu orang boleh menduduki lebih dari satu organ dengan batasan tertentu sesuai anggaran dasar." },
      { q: "Apakah yayasan bisa membuka sekolah/klinik/lembaga kursus?", a: "Bisa — justru ini pola paling umum. Namun entitas operasionalnya tetap membutuhkan izin sektoral (izin lembaga pendidikan, izin klinik Kemenkes/Dinkes, akreditasi). Kami mendampingi dari pendirian yayasan hingga izin operasionalnya terbit." },
      { q: "Yayasan atau PT untuk bisnis F&B milik komunitas?", a: "Jika komunitas ingin saling untung dan membagi hasil ke anggota — kembangkan struktur koperasi (SHU) atau PT dengan saham terbagi, bukan yayasan. Yayasan yang membagi keuntungan ke 'pendiri' melanggar UU 16/2001 dan berisiko dibubarkan." },
    ],
    keywords: [
      "pt vs yayasan",
      "perbedaan pt dan yayasan",
      "yayasan pajak",
      "unit usaha yayasan",
      "pendirian yayasan biaya",
      "yayasan untuk sekolah",
      "yayasan bebas pajak",
    ],
  },
  {
    slug: "pt-vs-koperasi",
    aId: "pt",
    bId: "koperasi",
    aName: "PT (Perseroan Terbatas)",
    bName: "Koperasi",
    aShort: "PT",
    bShort: "Koperasi",
    title: "PT vs Koperasi: Bisnis Investor vs Bisnis Bersama Anggota",
    metaTitle: "PT vs Koperasi — Beda Modal, SHU, Pajak 10% & Organisasi | 2026",
    metaDesc:
      "Perbedaan PT vs Koperasi: saham vs simpanan anggota, dividen vs SHU, pajak final 10% SHU, prinsip satu anggota satu suara, minimal pendiri. Tabel lengkap + panduan memilih. Gratis.",
    intro: [
      "Koperasi adalah badan hukum yang sering 'terlupakan' padahal tepat guna untuk usaha bersama komunitas: koperasi simpan pinjam, pertanian, desa wisata, hingga koperasi digital. Bedanya dengan PT terletak pada kepemilikan dan prinsip: PT mengikuti kepemilikan saham (siapa punya banyak, suaranya besar), koperasi mengikuti prinsip satu anggota satu suara dengan SHU dibagi sesuai partisipasi.",
      "Tabel ini membedah keduanya per aspek — supaya komunitas Anda tidak salah memilih wadah hukum.",
    ],
    aspects: [
      { aspect: "Dasar hukum", a: "UU 40/2007", b: "UU 25/1992 jo. UU Cipta Kerja (pendirian kini minimal 3 orang)", winner: "tie" },
      { aspect: "Pemilik & suara", a: "Pemegang saham — suara proporsional saham", b: "Anggota — satu anggota satu suara (idvotasi)", winner: "tie" },
      { aspect: "Jumlah pendiri", a: "Minimal 2", b: "Minimal 3 orang pribadi WNI (UU Cipta Kerja)", winner: "tie" },
      { aspect: "Biaya pendirian", a: "Rp3,5-6,5 juta (notaris + SK Kemenkumham)", b: "Rp2-5 juta (akta badan hukum koperasi/BUK via KemenkopUKM + jasa)", winner: "b" },
      { aspect: "Sumber modal", a: "Saham pendiri/investor, pinjaman bank", b: "Simpanan pokok & wajib anggota, dana cadangan, pinjaman", winner: "tie" },
      { aspect: "Distribusi hasil", a: "Dividen sesuai saham (PPh final 10%)", b: "SHU (Sisa Hasil Usaha) sesuai jasa & partisipasi anggota", winner: "tie" },
      { aspect: "Pajak", a: "PPh Badan 22% atas laba + dividen final 10%", b: "Pajak final 10% atas SHU yang dibagikan ke anggota; kegiatan usaha koperasi lain mengikuti ketentuan PPh badan", winner: "b" },
      { aspect: "Menarik investor eksternal", a: "Sangat fleksibel — terbit saham baru, VC, akuisisi", b: "Terbatas — investor non-anggota tidak mengendalikan (sesuai prinsip koperasi)", winner: "a" },
      { aspect: "Kredibilitas tender & bank", a: "Tinggi", b: "Menengah — kuat di skema khusus (pemerintah daerah, kredit usaha koperasi, program kementerian)", winner: "a" },
      { aspect: "Cocok untuk struktur komunitas", a: "Kurang cocok — kepemilikan melenceng cepat", b: "Sangat cocok — kesetaraan suara melindungi anggota kecil", winner: "b" },
      { aspect: "Administrasi", a: "Pembukuan + SPT 1771", b: "Pembukuan + RAT (Rapat Anggota Tahunan) wajib + laporan ke Dinas Koperasi", winner: "b" },
      { aspect: "Sektor yang lazim", a: "Semua sektor komersial", b: "Simpan pinjam, pertanian/perikanan, kreatif, desa wisata, digital community", winner: "tie" },
    ],
    chooseA: [
      "Bisnis berorientasi laba & pertumbuhan cepat dengan investor",
      "Butuh tender korporat dan kredit bank besar",
      "Struktur kepemilikan proporsional modal diinginkan",
      "Ekspansi merger/akuisisi/go-public dalam rencana",
    ],
    chooseB: [
      "Komunitas/petani/nelayan/warga bersama membangun ekonomi kolektif",
      "Nilai kesetaraan suara lebih penting daripada kepemilikan modal",
      "Ingin memanfaatkan program pemerintah & pajak SHU final 10%",
      "Usaha simpan pinjam atau koperasi sektor produktif",
    ],
    verdict:
      "PT adalah kendaraan modal; koperasi adalah kendaraan kebersamaan. Untuk usaha murni komersial yang mengejar skala — PT hampir selalu lebih efisien. Namun untuk komunitas yang ingin tumbuh tanpa ada yang 'dicapati' investor — koperasi menjaga kesetaraan suara dan punya manfaat pajak SHU final 10%. Bonus strategis: banyak PT besar bekerja sama dengan koperasi sebagai kanal distribusi/kemitraan CSR — keduanya bisa saling menguatkan, bukan bersaing.",
    faq: [
      { q: "Berapa minimal orang untuk mendirikan koperasi?", a: "Sejak UU Cipta Kerja mengubah UU 25/1992, koperasi didirikan minimal 3 orang pribadi WNI (turun dari 9). Anggota penuh tetap terus bertambah seiring operasional melalui rapat anggota." },
      { q: "Apa itu SHU dan bagaimana pajaknya?", a: "SHU (Sisa Hasil Usaha) adalah pendapatan koperasi dikurangi biaya dan cadangan, dibagikan ke anggota sesuai jasa/transaksi dan partisipasi modal. SHU yang dibagikan dikenai pajak final 10% — lebih ringan dibanding struktur dividen PT dalam banyak kasus komunitas." },
      { q: "Apakah koperasi bisa ikut tender?", a: "Bisa untuk paket-paket tertentu, terutama yang direserve untuk usaha mikro-kecil atau kemitraan pemerintah. Namun untuk tender korporat besar, PT tetap lebih unggul karena standar legalitas & pembukuan yang diminta. Banyak komunitas menjalankan keduanya: koperasi untuk wadah anggota, PT untuk pasar korporat." },
      { q: "Koperasi digital itu apa — apakah sah?", a: "Sah. Koperasi digital adalah koperasi yang menggunakan platform digital untuk kegiatan anggotanya (simpan pinjam online, marketplace anggota). Kementerian Koperasi mendorongnya, dengan syarat tetap memenuhi prinsip koperasi dan izin sektoral (misal P2P/OJK jika menyerupai fintech lending). Konsultasikan strukturnya sebelum launch." },
      { q: "Bisakah PT dan koperasi ada di satu grup usaha?", a: "Bisa dan lazim. Pola umum: koperasi menampung & menguatkan anggota (produksi, simpan pinjam), PT sebagai kendaraan komersial ke pasar (brand, distribusi, tender) — dihubungkan perjanjian kemitraan atau kepemilikan silang yang tertata. Kami mendampingi struktur dua entitas seperti ini." },
    ],
    keywords: [
      "pt vs koperasi",
      "perbedaan pt dan koperasi",
      "shu koperasi pajak 10 persen",
      "minimal pendirian koperasi",
      "koperasi digital",
      "pendirian koperasi biaya",
      "badan usaha komunitas",
    ],
  },
  {
    slug: "firma-vs-cv",
    aId: "firma",
    bId: "cv",
    aName: "Firma (V.O.F)",
    bName: "CV (Commanditaire Vennootschap)",
    aShort: "Firma",
    bShort: "CV",
    title: "Firma vs CV: Kapan Persekutuan Penuh Lebih Baik dari CV?",
    metaTitle: "Firma vs CV — Perbedaan Sekutu Aktif, Akta & Pajaknya | 2026",
    metaDesc:
      "Perbedaan Firma vs CV: semua sekutu aktif vs ada sekutu pasif, tanggung jawab solidaritas, akta notaris, pajak PPh OP. Tabel perbandingan + kapan pilih firma. Gratis.",
    intro: [
      "Firma dan CV sama-sama persekutuan dagang di KUHD — dan sama-sama bukan badan hukum. Bedanya ada di posisi sekutu: di firma, SEMUA sekutu aktif mengelola dan menanggung utang secara solidaritas; di CV ada pemisahan antara sekutu aktif (mengelola, tanggung jawab tak terbatas) dan sekutu pasif (hanya memodali).",
      "Jadi pertanyaannya: dalam kemitraan Anda — apakah semua pihak mau ikut bekerja dan menanggung risiko penuh (firma), atau ada yang hanya berinvestasi (CV)?",
    ],
    aspects: [
      { aspect: "Dasar hukum", a: "KUHD Pasal 19-30 — persekutuan atas nama bersama, akta notaris", b: "KUHD Pasal 16-35 jo. UU Cipta Kerja — akta notaris", winner: "tie" },
      { aspect: "Posisi sekutu", a: "Semua sekutu aktif — ikut mengelola usaha", b: "Campuran: sekutu aktif mengelola; sekutu pasif hanya memodali", winner: "tie" },
      { aspect: "Tanggung jawab utang", a: "Semua sekutu solidaritas tak terbatas — harta pribadi semua ikut", b: "Hanya sekutu aktif tak terbatas; sekutu pasif terbatas pada modalnya", winner: "b" },
      { aspect: "Biaya pendirian", a: "Rp2-4 juta (akta notaris)", b: "Rp2,5-4,5 juta (akta notaris)", winner: "tie" },
      { aspect: "Durasi pendirian", a: "1-3 hari kerja", b: "1-3 hari kerja", winner: "tie" },
      { aspect: "Pajak", a: "Firma bukan subjek PPh badan — laba dibagi, tiap sekutu lapor PPh OP", b: "Sama — laba dibagi ke sekutu, tiap sekutu lapor PPh OP", winner: "tie" },
      { aspect: "Cocok untuk", a: "Praktik profesional bersama: advokat, akuntan, dokter praktek, konsultan", b: "Usaha dagang dengan pemodal diam: distributor, supplier, bengkel", winner: "tie" },
      { aspect: "Kemudahan menerima pemodal pasif", a: "Tidak dirancang untuk itu — semua harus aktif", b: "Dirancang persis untuk itu", winner: "b" },
      { aspect: "Nama usaha", a: "Nama bersama (mis. 'Pratama & Rekan')", b: "Nama usaha CV + nama sekutu umum", winner: "tie" },
      { aspect: "Kredibilitas kontrak", a: "Kuat untuk jasa profesional — semua sekutu bertanda tangan", b: "Kuat untuk usaha dagang dengan struktur modal jelas", winner: "tie" },
      { aspect: "Risiko bagi pemodal yang tidak mau ikut urus usaha", a: "Tidak tersedia — semua terlilit solidaritas", b: "Aman — sekutu pasif hanya berisiko sebesar modalnya", winner: "b" },
      { aspect: "Jalur upgrade ke PT", a: "Bisa — pendirian PT baru + transfer aktivitas", b: "Bisa — jalur sama, umumnya lebih siap karena struktur modal sudah ada", winner: "b" },
    ],
    chooseA: [
      "Semua pihak aktif bekerja dan berbagi risiko penuh",
      "Praktik profesional bersama (hukum, akuntansi, klinik, konsultansi)",
      "Ingin kesederhanaan: satu persekutuan, semua bertanggung jawab sama",
      "Tidak ada pihak yang hanya memodali tanpa terlibat",
    ],
    chooseB: [
      "Ada pihak yang hanya ingin memodali tanpa mengelola (sekutu pasif)",
      "Ingin melindungi pemodal dari tanggung jawab utang operasional",
      "Usaha dagang dengan pembagian modal & keuntungan jelas",
      "Rencana tumbuh menuju PT dengan struktur modal terbentuk",
    ],
    verdict:
      "Firma cocok untuk 'sejajar penuh': semua anggota profesional yang bekerja dan berisiko bersama — pola klasik kantor advokat & akuntan. CV unggul saat ada pemisahan peran: pengelola aktif vs pemodal pasif, karena tanggung jawab sekutu pasif terbatas. Peringatan sama-sama berlaku: sekutu aktif di CV dan seluruh sekutu firma menanggung utang hingga harta pribadi. Jika profil risiko usaha tinggi, bandingkan juga PT — tanggung jawabnya terbatas untuk semua pihak.",
    faq: [
      { q: "Apakah firma dan CV wajib akta notaris?", a: "Ya, keduanya. UU Cipta Kerja menegaskan persekutuan komanditer (CV) dan firma didirikan dengan akta notaris. Akta menjadi bukti kunci pembagian hak & kewajiban antar sekutu jika terjadi sengketa." },
      { q: "Siapa yang membayar pajak di firma dan CV?", a: "Keduanya bukan subjek PPh badan. Laba persekutuan dibagikan ke para sekutu, lalu setiap sekutu melaporkan di PPh Orang Pribadi masing-masing (progresif 5-35% atau final 0,5% bila kriteria UMKM terpenuhi)." },
      { q: "Apakah sekutu pasif di CV bisa diuntungkan tanpa urusan operasional?", a: "Ya — itulah inti CV. Sekutu pasif berkontribusi modal dan menerima bagian laba sesuai akta, dengan tanggung jawab terbatas pada setoran modalnya. Namun jika sekutu pasif ikut campur mengelola, posisinya bisa 'terangkat' menjadi sekutu aktif di mata hukum — patuhi batas peran yang tertulis di akta." },
      { q: "Firma bisa untuk usaha dagang barang?", a: "Bisa — firma memang persekutuan dagang. Namun karena semua sekutu menanggung solidaritas penuh, pola ini paling masuk akal untuk usaha yang seluruh pemiliknya aktif bekerja dan profil risikonya terkendali. Untuk usaha dagang dengan pemodal pasif, CV lebih tepat." },
      { q: "Mana yang lebih murah: firma atau CV?", a: "Hampir sama (Rp2-4,5 juta tergantung kota & notaris), karena keduanya cukup akta notaris + NIB. Bedanya hanya kompleksitas akta — CV butuh penjabatan sekutu aktif/pasif yang lebih detail. Konsultasikan isi akta, bukan hanya harganya." },
    ],
    keywords: [
      "firma vs cv",
      "perbedaan firma dan cv",
      "sekutu aktif sekutu pasif",
      "firma persekutuan",
      "akta firma notaris",
      "badan usaha profesional",
    ],
  },
  {
    slug: "pt-perorangan-vs-perseorangan-nib",
    aId: "pt-perorangan",
    bId: "nib-op",
    aName: "PT Perorangan",
    bName: "Perseorangan (NIB OP)",
    aShort: "PT Perorangan",
    bShort: "NIB OP",
    title: "PT Perorangan vs Usaha Perseorangan Biasa (NIB OP): Bedanya penting?",
    metaTitle: "PT Perorangan vs NIB Perseorangan — Beda Badan Hukum & Risiko | 2026",
    metaDesc:
      "Perbedaan PT Perorangan vs usaha perseorangan NIB OP: status badan hukum, pemisahan aset, kredibilitas, pajak, biaya (keduanya gratis). Tabel lengkap + kapan pilih. Gratis.",
    intro: [
      "Keduanya gratis dan bisa diterbitkan dalam sehari — tapi hukumnya sangat berbeda. NIB OP (perseorangan biasa) hanya izin usaha tanpa badan hukum: pemilik dan usaha menyatu. PT Perorangan adalah badan hukum: aset usaha dipisahkan dari aset pribadi, dan namanya diawali status 'PT'.",
      "Bagi banyak UMKM, NIB OP sudah cukup. Tapi untuk yang butuh kredibilitas badan hukum tanpa biaya notaris — PT Perorangan adalah penemuannya. Tabel ini menjelaskan kapan mana.",
    ],
    aspects: [
      { aspect: "Status hukum", a: "Badan hukum PT (UU Cipta Kerja Pasal 153A) — badan usaha sah", b: "Bukan badan hukum — izin usaha orang pribadi", winner: "a" },
      { aspect: "Pemisahan aset", a: "Aset usaha dipisah dari aset pribadi (tanggung jawab terbatas)", b: "Menyatu — utang usaha = utang pribadi penuh", winner: "a" },
      { aspect: "Biaya", a: "Resmi gratis (NIB via OSS); jasa opsional Rp350-750 ribu", b: "Resmi gratis (NIB via OSS); jasa opsional Rp200-500 ribu", winner: "tie" },
      { aspect: "Durasi", a: "1 hari", b: "1 hari (bahkan menit setelah data lengkap)", winner: "tie" },
      { aspect: "Nama usaha", a: "Berawalan 'PT' — kredibilitas lebih tinggi di mata partner", b: "Nama dagang bebas tanpa status", winner: "a" },
      { aspect: "Kegiatan usaha", a: "KBLI terbatas usaha mikro-kecil; satu orang satu PT Perorangan", b: "Bebas semua KBLI yang tersedia untuk OP (paling luas)", winner: "b" },
      { aspect: "Pajak", a: "Sebagai badan usaha mikro-kecil: PPh final 0,5% (masa terbatas 4 TP)", b: "PPh OP: final 0,5% hingga 7 tahun pajak (s/d 2028) atau tarif progresif", winner: "b" },
      { aspect: "Rekening usaha & marketplace", a: "Sah dan lebih dipercaya (badan hukum)", b: "Sah — NIB cukup untuk rekening usaha & marketplace", winner: "tie" },
      { aspect: "Mitra korporat / vendor besar", a: "Lebih mudah diterima — status PT memberi bobot kontraktual", b: "Terbatas — banyak vendor besar mensyaratkan badan hukum", winner: "a" },
      { aspect: "Investor", a: "Tidak bisa tambah pemegang saham; naik kelas ke PT biasa saat butuh", b: "Tidak tersedia", winner: "a" },
      { aspect: "Kewajiban pembukuan", a: "Pembukuan badan usaha (rapi namun wajib)", b: "Pencatatan sederhana", winner: "b" },
      { aspect: "Cocok untuk tahap", a: "UMKM bertumbuh yang butuh bobot badan hukum tanpa biaya", b: "Usaha baru, freelancer, side-hustle, validasi pasar", winner: "tie" },
    ],
    chooseA: [
      "Butuh nama PT tanpa biaya notaris untuk kredibilitas partner",
      "Usaha mulai menandatangani kontrak dengan vendor/korporat",
      "Ingin pemisahan aset usaha & pribadi (proteksi)",
      "Siap menjaga pembukuan yang lebih tertata",
    ],
    chooseB: [
      "Baru memulai / masih validasi ide usaha",
      "Freelancer, kreator, atau side-hustle dengan risiko kecil",
      "Ingin fleksibilitas KBLI paling luas untuk OP",
      "Memanfaatkan masa PPh final 0,5% OP yang lebih panjang",
    ],
    verdict:
      "Mulailah dari NIB OP jika usaha masih tahap belajar pasar — gratis, fleksibel, dan pajak final OP-nya lebih panjang. Naik ke PT Perorangan saat usaha mulai menandatangani kontrak serius atau Anda ingin aset pribadi terlindungi — biayanya tetap nol, hanya butuh disiplin pembukuan. Dan saat waktunya menambah pemilik atau masuk KBLI yang lebih besar, jalur PT biasa menanti. Legalitas bukan tujuan — dia adalah gilir yang menopang pertumbuhan bisnis Anda.",
    faq: [
      { q: "Keduanya gratis — lalu kenapa memilih PT Perorangan?", a: "Karena status badan hukumnya: pemisahan aset, nama 'PT', dan bobot kontraktual di mata partner. Untuk freelancer murni, NIB OP cukup. Untuk usaha yang bertransaksi dengan korporasi, PT Perorangan memberi kepercayaan tanpa biaya apa pun." },
      { q: "Apakah NIB OP bisa diubah jadi PT Perorangan?", a: "Tidak diubah — PT Perorangan didirikan baru (tetap gratis) di OSS, lalu aktivitas usaha dipindahkan. Riwayat NIB OP tidak hilang; catatan pajaknya mengikuti orang pribadinya. Prosesnya cepat dan kami bisa pandu dari sisi perpajakan." },
      { q: "Kapan harus menaikkan level ke PT biasa?", a: "Tiga pemicu: (1) ingin menambah pemilik/investor, (2) kegiatan usaha butuh KBLI di luar kriteria mikro-kecil, (3) target pasar menuntut kredibilitas penuh (tender, vendor korporat, kredit bank besar). Sebelum itu, PT Perorangan memberi hampir semua manfaat tanpa biaya." },
      { q: "Apakah PT Perorangan bisa sampai tutup kalau bangkrut?", a: "Tanggung jawab pemiliknya terbatas pada aset usaha (kecuali terbukti penyalahgunaan). Harta pribadi seperti rumah dan tabungan dilindungi — inilah beda utamanya dengan NIB OP di mana seluruh harta pribadi terlilit utang usaha." },
      { q: "Mana yang pajaknya lebih murah?", a: "Untuk omzet kecil, NIB OP lebih menguntungkan: PPh final 0,5% untuk orang pribadi berlaku sampai 7 tahun pajak (s/d 2028). PT Perorangan sebagai badan usaha hanya menikmati final 0,5% selama 4 tahun pajak. Hitung fase pertumbuhan Anda — kami siap membantu memodelkan beban pajaknya di kalkulator pajak kami." },
    ],
    keywords: [
      "pt perorangan vs nib",
      "nib perseorangan gratis",
      "pt perorangan pajak",
      "usaha perseorangan badan hukum",
      "nib op untuk umkm",
      "pt perorangan bisa tidak",
      "legalitas toko online",
    ],
  },
];

// Gabungan: perbandingan hand-crafted + programatik (dibangun dari data katalog)
export const COMPARISONS: Comparison[] = [...HAND_MADE_COMPARISONS, ...PROGRAMMATIC_COMPARISONS];

export function getComparison(slug: string): Comparison | undefined {
  return COMPARISONS.find((c) => c.slug === slug);
}

export function getRelatedComparisons(slug: string, limit = 3): Comparison[] {
  const current = getComparison(slug);
  if (!current) return [];
  // prioritaskan yang memuat salah satu entitas yang sama
  const shared = COMPARISONS.filter(
    (c) => c.slug !== slug && (c.aId === current.aId || c.bId === current.bId || c.aId === current.bId || c.bId === current.aId)
  );
  const rest = COMPARISONS.filter((c) => c.slug !== slug && !shared.includes(c));
  return [...shared, ...rest].slice(0, limit);
}

export const WINNER_TEXT: Record<Winner, string> = WINNER_LABEL;
