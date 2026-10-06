// ============================================================
// DATA LOWONGAN KERJA — PusatPerizinan.com & Mitra
// Spesifikasi mengikuti Google Jobs (schema.org/JobPosting):
// tanggal posting dinamis saat build, validThrough +90 hari.
// ============================================================

export type EmploymentType = "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERN";

export interface Job {
  id: string;
  slug: string;
  title: string;
  organization: string; // hiring organization (utama atau mitra)
  isPartner: boolean;
  category: "Penjualan & Marketing" | "Operasional & Legal" | "Konten & Kreatif" | "PMI & Ketenagakerjaan";
  employmentType: EmploymentType;
  workType: "onsite" | "hybrid" | "remote";
  city: string;
  province: string;
  address: string;
  description: string[];
  responsibilities: string[];
  qualifications: string[];
  benefits: string[];
  skills: string[];
  salaryMin: number; // per bulan IDR
  salaryMax: number;
  salaryNote?: string;
  education: string;
  experienceMonths: number;
  featured?: boolean;
  postedDaysAgo: number;
}

const ORG_MAIN = "PusatPerizinan.com";
const ORG_LPK = "LPK Mitra Kerja Luar Negeri (jaringan PusatPerizinan.com)";

export const JOBS: Job[] = [
  {
    id: "job-mkt-perizinan",
    slug: "marketing-consultant-perizinan",
    title: "Marketing Consultant Perizinan (B2B Sales)",
    organization: ORG_MAIN,
    isPartner: false,
    category: "Penjualan & Marketing",
    employmentType: "FULL_TIME",
    workType: "hybrid",
    city: "Jakarta Selatan",
    province: "DKI Jakarta",
    address: "Gedung perkantoran area Mampang, Jakarta Selatan",
    description: [
      "PusatPerizinan.com membantu ribuan UMKM dan korporasi mengurus legalitas usaha dari hulu ke hilir — NIB, PT/PMA, izin sektoral, sertifikasi, hingga kepatuhan pajak. Tim marketing adalah ujung tombak kami.",
      "Anda akan menangani prospek yang datang sendiri dari website (1.000+ halaman SEO, alat AI gratis) dan campaign digital — bukan cold calling tanpa arah. Target jelas, pipeline jelas, komisi transparan.",
    ],
    responsibilities: [
      "Menangani lead inbound dari website, WhatsApp, dan campaign digital",
      "Melakukan konsultasi kebutuhan perizinan awal dan mengarahkan ke layanan yang tepat",
      "Menyusun penawaran paket layanan dan follow-up hingga closing",
      "Membangun relasi jangka panjang dengan klien UMKM & korporasi",
      "Mencapai target penjualan bulanan bersama tim",
    ],
    qualifications: [
      "Pendidikan minimal D3 semua jurusan",
      "Pengalaman sales/B2B minimal 2 tahun (fresh graduate berpotensi kuat dipertimbangkan)",
      "Komunikasi persuasif via WhatsApp & telepon",
      "Tertarik dengan dunia legalitas usaha, pajak, dan UMKM",
      "Nyaman dengan target dan sistem komisi",
    ],
    benefits: [
      "Gaji pokok + komisi tidak dibatasi (rata-rata tim 30-60% dari komisi)",
      "Tunjangan transport & komunikasi",
      "Pelatihan produk perizinan intensif dari konsultan senior",
      "BPJS Kesehatan & Ketenagakerjaan",
      "Karier cepat: Consultant → Senior → Team Lead",
    ],
    skills: ["B2B Sales", "WhatsApp Business", "Negosiasi", "CRM", "Komunikasi", "Follow-up"],
    salaryMin: 6000000,
    salaryMax: 12000000,
    salaryNote: "Gaji pokok + komisi; total income realistis pemain baru Rp8-15 juta/bulan",
    education: "Minimal D3 semua jurusan",
    experienceMonths: 24,
    featured: true,
    postedDaysAgo: 2,
  },
  {
    id: "job-admin-legal",
    slug: "staf-administrasi-legalitas",
    title: "Staf Administrasi Legalitas (OSS & Sektoral)",
    organization: ORG_MAIN,
    isPartner: false,
    category: "Operasional & Legal",
    employmentType: "FULL_TIME",
    workType: "onsite",
    city: "Jakarta Selatan",
    province: "DKI Jakarta",
    address: "Kantor operasional area Mampang, Jakarta Selatan",
    description: [
      "Tim administrasi legalitas adalah jantung operasional kami: setiap dokumen klien — NIB, sertifikat standar, izin sektoral, LKPM — harus rapi, tepat waktu, dan terlacak.",
      "Anda akan ditempa menjadi praktisi perizinan sungguhan: membaca KBLI, mengoperasikan OSS-RBA, dan berkoordinasi dengan instansi. Pelatihan penuh diberikan bagi yang rajin dan teliti.",
    ],
    responsibilities: [
      "Memproses pengajuan NIB, sertifikat standar, dan izin usaha di OSS-RBA",
      "Memastikan dokumen klien lengkap sebelum diajukan ke instansi",
      "Menginput dan memantau LKPM berkala klien",
      "Mengarsipkan dokumen digital dengan rapi dan rahasia",
      "Melaporkan progres pengurusan ke konsultan penanggung jawab",
    ],
    qualifications: [
      "Pendidikan minimal SMA/SMK/D3 (semua jurusan)",
      "Teliti, rapi, dan disiplin tenggat",
      "Mahir spreadsheet (Excel/Google Sheets) dan belajar sistem cepat",
      "Pengalaman administrasi 1 tahun lebih disukai",
      "Faham dasar perizinan usaha adalah nilai tambah",
    ],
    benefits: [
      "Gaji tetap + tunjangan makan & transport",
      "Pelatihan praktis OSS-RBA, KBLI, dan izin sektoral dari nol",
      "Jam kerja bersih Senin-Jumat (tidak lembur kronis)",
      "BPJS Kesehatan & Ketenagakerjaan",
      "Kesempatan naik menjadi Konsultan Perizinan junior",
    ],
    skills: ["Administrasi", "OSS-RBA", "Excel", "Ketelitian", "Arsip Digital", "Koordinasi"],
    salaryMin: 4000000,
    salaryMax: 6000000,
    education: "Minimal SMA/SMK/D3",
    experienceMonths: 12,
    postedDaysAgo: 5,
  },
  {
    id: "job-konsultan-junior",
    slug: "konsultan-junior-perizinan-umkm",
    title: "Konsultan Junior Perizinan UMKM",
    organization: ORG_MAIN,
    isPartner: false,
    category: "Operasional & Legal",
    employmentType: "FULL_TIME",
    workType: "hybrid",
    city: "Jakarta Selatan",
    province: "DKI Jakarta",
    address: "Kantor area Mampang + kunjungan klien se-Jabodetabek",
    description: [
      "Kami sedang membentuk generasi baru konsultan perizinan yang dekat dengan UMKM. Anda akan menangani klien usaha kecil-menengah dari konsultasi pertama sampai izin terbit — didampingi konsultan senior.",
      "Ini adalah peran learning-intensive: dalam 6 bulan Anda akan menguasai alur NIB → sertifikat standar → izin sektoral → sertifikasi halal/PIRT → kepatuhan pajak dasar.",
    ],
    responsibilities: [
      "Melakukan konsultasi kebutuhan izin untuk klien UMKM (online & kunjungan)",
      "Menyusun daftar persyaratan dan jadwal pengurusan per klien",
      "Mendampingi proses pengurusan bersama tim administrasi",
      "Mengedukasi klien via konten singkat (WA, video call)",
      "Menjaga kepuasan klien agar merekomendasikan kami",
    ],
    qualifications: [
      "S1 semua jurusan (hukum/ekonomi/manajemen jadi nilai plus)",
      "Fresh graduate dipersilakan — yang penting komunikasi hangat",
      "Suka menjelaskan hal rumit dengan cara sederhana",
      "Berani menelepon dan bertemu orang baru",
      "Bersedia kunjungan klien dalam kota",
    ],
    benefits: [
      "Gaji pokok + bonus kepuasan klien",
      "Mentor langsung konsultan senior 10+ tahun",
      "Jalur karier jelas: Junior → Konsultan → Senior (18-24 bulan)",
      "BPJS Kesehatan & Ketenagakerjaan",
      "Klien datang dari website — fokus Anda melayani, bukan cari klien",
    ],
    skills: ["Konsultasi", "Komunikasi Publik", "OSS-RBA", "KBLI", "Perizinan UMKM", "Empati"],
    salaryMin: 5000000,
    salaryMax: 8000000,
    education: "S1 semua jurusan",
    experienceMonths: 0,
    postedDaysAgo: 7,
  },
  {
    id: "job-content-writer",
    slug: "content-writer-seo",
    title: "Content Writer SEO (Perizinan & Pajak)",
    organization: ORG_MAIN,
    isPartner: false,
    category: "Konten & Kreatif",
    employmentType: "FULL_TIME",
    workType: "remote",
    city: "Remote (WIB)",
    province: "Nasional",
    address: "Bekerja penuh dari rumah, meeting online harian",
    description: [
      "Website kami melayani jutaan pencari informasi perizinan lewat 1.000+ halaman SEO dan alat AI gratis. Kami butuh penulis yang bisa mengubah regulasi yang berat menjadi konten yang ringan, akurat, dan menang di Google.",
      "Anda akan menulis artikel panduan, FAQ, dan halaman layanan — dari riset kata kunci sampai struktur heading. Konten diuji nyata di SERP, bukan sekadar ditumpuk.",
    ],
    responsibilities: [
      "Menulis artikel SEO seputar perizinan, pajak, dan kerja luar negeri",
      "Melakukan riset kata kunci dan analisis konten kompetitor",
      "Memastikan akurasi regulasi (dengan materi riset dari tim legal)",
      "Menyusun FAQ dan schema markup untuk featured snippet",
      "Evaluasi performa via Google Search Console & revisi berkala",
    ],
    qualifications: [
      "Pengalaman menulis SEO minimal 1 tahun (portofolio wajib)",
      "Penulisan bahasa Indonesia rapi + kemampuan membaca regulasi",
      "Paham dasar on-page SEO (heading, internal link, search intent)",
      "Familiar dengan Google Docs/Sheets dan CMS sederhana",
      "NLP/konten AI-adjacent adalah nilai tambah",
    ],
    benefits: [
      "Full remote dengan jam fleksibel (hasil berbasis tenggat)",
      "Gaji tetap + bonus artikel yang masuk top 3 SERP",
      "Pelatihan SEO lanjutan & akses alat riset",
      "BPJS Kesehatan & Ketenagakerjaan",
      "Byline di artikel (credits) untuk portofolio Anda",
    ],
    skills: ["SEO Writing", "Riset Keyword", "Search Intent", "GSC", "Penulisan FAQ", "Editing"],
    salaryMin: 4500000,
    salaryMax: 7000000,
    education: "Minimal D3 semua jurusan",
    experienceMonths: 12,
    postedDaysAgo: 4,
  },
  {
    id: "job-telemarketing",
    slug: "telemarketing-inside-sales",
    title: "Telemarketing / Inside Sales (Perizinan)",
    organization: ORG_MAIN,
    isPartner: false,
    category: "Penjualan & Marketing",
    employmentType: "FULL_TIME",
    workType: "onsite",
    city: "Jakarta Selatan",
    province: "DKI Jakarta",
    address: "Kantor operasional area Mampang, Jakarta Selatan",
    description: [
      "Setiap hari ratusan pemilik usaha meninggalkan nomor mereka di website kami meminta bantuan perizinan. Tim telemarketing menghubungi mereka lebih dulu — sebelum kompetitor.",
      "Anda cukup menelepon, mendengarkan kebutuhan, dan menjadwalkan konsultasi. Konsultan senior yang melanjutkan penjualan teknisnya.",
    ],
    responsibilities: [
      "Menelepon daftar lead harian dari website & campaign",
      "Mengidentifikasi kebutuhan usaha calon klien secara singkat",
      "Menjadwalkan konsultasi gratis ke konsultan",
      "Mencatat hasil panggilan dengan disiplin di sistem",
      "Follow-up ulang lead yang tertarik tapi belum siap",
    ],
    qualifications: [
      "Pendidikan minimal SMA/SMK sederajat",
      "Nyaman berbicara via telepon sepanjang hari",
      "Bicara bahasa Indonesia sopan dan jelas",
      "Pengalaman telemarketing/call center nilai tambah",
      "Fokus pada volume & konsistensi harian",
    ],
    benefits: [
      "Gaji pokok + bonus per janji konsultasi terjadwal",
      "Daftar lead disediakan — tidak perlu mencari sendiri",
      "Skrip & pelatihan komunikasi tersedia",
      "BPJS Kesehatan & Ketenagakerjaan",
      "Kesempatan pindah ke posisi Sales Consultant",
    ],
    skills: ["Telemarketing", "Komunikasi Telepon", "Lead Handling", "CRM Entry", "Ketekunan"],
    salaryMin: 4000000,
    salaryMax: 5500000,
    salaryNote: "Pokok + bonus per appointment; rata-rata tim Rp5,5-7 juta/bulan",
    education: "Minimal SMA/SMK sederajat",
    experienceMonths: 6,
    postedDaysAgo: 9,
  },
  {
    id: "job-legal-officer",
    slug: "legal-officer",
    title: "Legal Officer (Perizinan & Kontrak)",
    organization: ORG_MAIN,
    isPartner: false,
    category: "Operasional & Legal",
    employmentType: "FULL_TIME",
    workType: "hybrid",
    city: "Jakarta Selatan",
    province: "DKI Jakarta",
    address: "Kantor area Mampang, Jakarta Selatan",
    description: [
      "Tim legal memastikan setiap layanan yang kami jual berdiri di atas regulasi yang benar: dari perizinan korporasi hingga kontrak kerja sama klien dan vendor.",
      "Anda akan bekerja berdampingan dengan konsultan senior dan tim konten agar saran yang kami berikan selalu berdasar regulasi terbaru (UU Cipta Kerja, PP 5/2021, PMK terkini).",
    ],
    responsibilities: [
      "Menyusun dan meninjau akta, perjanjian kerja sama, dan kontrak klien",
      "Riset regulasi perizinan terbaru dan menyusun ringkasannya untuk tim",
      "Memberi masukan legal pada halaman layanan & konten website",
      "Memantau perubahan regulasi OSS, pajak, dan ketenagakerjaan",
      "Mendukung penanganan keluhan/klausa sengketa ringan",
    ],
    qualifications: [
      "S1 Hukum (IPK minimal 3,00)",
      "Pengalaman legal officer/paralegal minimal 2 tahun",
      "Terbiasa membaca UU/PP/PMK dan merangkumnya jelas",
      "Kemampuan menyusun kontrak dengan bahasa hukum yang baik",
      "Minat pada hukum bisnis & perizinan",
    ],
    benefits: [
      "Gaji kompetitif sesuai pengalaman",
      "Eksposur lintas sektor: konstruksi, kuliner, tambang, PMI, digital",
      "Jam kerja bersih & fleksibilitas hybrid",
      "BPJS Kesehatan & Ketenagakerjaan",
      "Sertifikasi dan pelatihan hukum bisnis didanai",
    ],
    skills: ["Hukum Bisnis", "Kontrak", "Riset Regulasi", "OSS-RBA", "Penyusunan Dokumen", "Negosiasi"],
    salaryMin: 7000000,
    salaryMax: 11000000,
    education: "S1 Hukum",
    experienceMonths: 24,
    postedDaysAgo: 11,
  },
  {
    id: "job-trainer-jepang",
    slug: "trainer-bahasa-jepang-lpk",
    title: "Trainer Bahasa Jepang (JFT-Basic / JLPT N4)",
    organization: ORG_LPK,
    isPartner: true,
    category: "PMI & Ketenagakerjaan",
    employmentType: "CONTRACT",
    workType: "onsite",
    city: "Bekasi",
    province: "Jawa Barat",
    address: "Kampus pelatihan LPK mitra area Bekasi, Jawa Barat",
    description: [
      "LPK mitra kami menyiapkan CPMI (calon pekerja migran) untuk penempatan ke Jepang lewat skema Tokutei Ginou (SSW) dan Magang — membutuhkan kelulusan JFT-Basic A4 atau JLPT N4.",
      "Anda akan melatih kelas bahasa Jepang intensif: kosakata sehari-hari, bahasa kerja kaigo/manufaktur, serta persiapan ujian. Kurikulum dan materi ujian disediakan.",
    ],
    responsibilities: [
      "Mengajar kelas bahasa Jepang intensif (offline & hybrid)",
      "Menyiapkan peserta menghadapi JFT-Basic A2 / JLPT N4",
      "Melatih bahasa kerja: kaiso, keigo dasar, SOP tempat kerja",
      "Menilai kemajuan peserta dan memberi program remedial",
      "Membimbing simulasi wawancara kerja (mensetsu)",
    ],
    qualifications: [
      "Kemampuan bahasa Jepang minimal JLPT N3 (N2 diutamakan)",
      "Pengalaman mengajar/les bahasa Jepang minimal 1 tahun",
      "Berbahasa Indonesia jelas untuk menjelaskan gramatika",
      "Sabar dengan peserta dari beragam latar pendidikan",
      "Sertifikasi ATPLN/pedagogi nilai tambah",
    ],
    benefits: [
      "Kontrak 6 bulan dapat diperpanjang (kelas berjalan sepanjang tahun)",
      "Gaji kompetitif + bonus rasio kelulusan ujian",
      "Materi & kurikulum disediakan — fokus mengajar",
      "Dampak nyata: membantu PMI berangkat legal & bergaji baik",
      "Peluang menjadi kepala program bahasa",
    ],
    skills: ["Bahasa Jepang", "JFT-Basic", "JLPT N4", "Mengajar", "Kelas Dewasa", "Penilaian"],
    salaryMin: 5000000,
    salaryMax: 8000000,
    education: "Minimal D3; sertifikasi bahasa Jepang wajib",
    experienceMonths: 12,
    postedDaysAgo: 6,
  },
  {
    id: "job-coordinator-pmi",
    slug: "coordinator-penempatan-pmi",
    title: "Coordinator Penempatan PMI (SISKOP2MI)",
    organization: ORG_LPK,
    isPartner: true,
    category: "PMI & Ketenagakerjaan",
    employmentType: "FULL_TIME",
    workType: "onsite",
    city: "Bekasi",
    province: "Jawa Barat",
    address: "Kantor LPK mitra area Bekasi, Jawa Barat",
    description: [
      "Mengawal calon pekerja migran dari pendaftaran SISKOP2MI hingga keberangkatan adalah pekerjaan yang menuntut ketelitian dan empati — setiap dokumen yang salah menunda mimpi seseorang dan keluarganya.",
      "Anda akan mengkoordinasi dokumen CPMI (paspor, SKU, SKCK, MCU, vaksin), memantau job order, dan berkoordinasi dengan PPTKIS/P3MI serta instansi (BP2MI/KemenP2MI).",
    ],
    responsibilities: [
      "Mengelola pendaftaran & verifikasi CPMI di SISKOP2MI",
      "Memantau kelengkapan dokumen keberangkatan per PMI",
      "Berkoordinasi dengan PPTKIS/P3MI dan negara tujuan",
      "Mengedukasi PMI & keluarga soal kontrak, gaji, dan kanal pengaduan",
      "Menyusun laporan penempatan berkala",
    ],
    qualifications: [
      "D3/S1 semua jurusan",
      "Paham alur UU 18/2017 & sistem SISKOP2MI (atau siap belajar cepat)",
      "Pengalaman koordinasi/administrasi 2 tahun",
      "Komunikasi hangat ke orang-orang dari berbagai latar",
      "Tertarik pada isu perlindungan pekerja migran",
    ],
    benefits: [
      "Gaji tetap + tunjangan periode keberangkatan",
      "Pelatihan regulasi PPMI terbaru (Perpres 166/2024, SE 715/2025)",
      "BPJS Kesehatan & Ketenagakerjaan",
      "Jaringan profesional nasional PPMI",
      "Kepuasan melihat PMI berangkat legal & pulang sukses",
    ],
    skills: ["SISKOP2MI", "PPMI", "Koordinasi Dokumen", "Komunikasi", "Edukasi PMI", "Pelaporan"],
    salaryMin: 6000000,
    salaryMax: 9000000,
    education: "D3/S1 semua jurusan",
    experienceMonths: 24,
    postedDaysAgo: 8,
  },
  {
    id: "job-digital-marketing",
    slug: "digital-marketing-specialist",
    title: "Digital Marketing Specialist (Ads & Funnel)",
    organization: ORG_MAIN,
    isPartner: false,
    category: "Penjualan & Marketing",
    employmentType: "FULL_TIME",
    workType: "hybrid",
    city: "Jakarta Selatan",
    province: "DKI Jakarta",
    address: "Kantor area Mampang + hybrid WFH 2 hari/minggu",
    description: [
      "Kami menghabiskan anggaran iklan harian untuk membawa pemilik usaha ke alat gratis kami (kalkulator pajak, AI roadmap, cek dokumen) — lalu mengubahnya menjadi klien. Funnel ini butuh pengelola yang haus data.",
      "Anda akan memegang Meta Ads & Google Ads end-to-end: kreatif, targeting, budget, dan eksperimen. Keputusan diambil dari angka, bukan perasaan.",
    ],
    responsibilities: [
      "Mengelola kampanye Meta & Google Ads untuk layanan perizinan/pajak",
      "Membangun funnel dari alat gratis → lead WhatsApp → closing",
      "Menyusun laporan CPL, CAC, dan konversi mingguan",
      "Berkolaborasi dengan content writer untuk landing page konversi",
      "A/B testing kreatif, copy, dan audiens secara rutin",
    ],
    qualifications: [
      "Pengalaman running ads minimal 2 tahun (bukti hasil wajib)",
      "Paham pixel, event, dan pengukuran konversi",
      "Terbiasa bekerja dengan target CPL ketat",
      "Mampu menulis copy iklan bahasa Indonesia yang menjual",
      "Analytics (GA4) dan spreadsheet tingkat lanjut",
    ],
    benefits: [
      "Gaji + bonus performa CPL & volume lead",
      "Akses budget iklan real & eksperimen tanpa birokrasi",
      "Tim konten & SEO pendukung penuh",
      "BPJS Kesehatan & Ketenagakerjaan",
      "Belajar langsung strategi akuisisi lead-gen premium",
    ],
    skills: ["Meta Ads", "Google Ads", "Funnel", "GA4", "Copywriting", "A/B Testing", "CPL Optimization"],
    salaryMin: 7000000,
    salaryMax: 11000000,
    education: "S1 semua jurusan",
    experienceMonths: 24,
    postedDaysAgo: 3,
  },
  {
    id: "job-data-entry-oss",
    slug: "data-entry-oss-lkpm",
    title: "Data Entry OSS & LKPM (Remote)",
    organization: ORG_MAIN,
    isPartner: false,
    category: "Operasional & Legal",
    employmentType: "PART_TIME",
    workType: "remote",
    city: "Remote (WIB)",
    province: "Nasional",
    address: "Bekerja dari rumah, koordinasi via aplikasi",
    description: [
      "Ribuan klien UMKM kami wajib melaporkan LKPM (Laporan Kegiatan Penanaman Modal) berkala di OSS. Data entry yang teliti menjaga NIB klien tetap aman dari dicabut.",
      "Posisi paruh waktu remote — cocok untuk mahasiswa tingkat akhir/pemula yang ingin mendalami dunia perizinan dengan pendapatan tetap.",
    ],
    responsibilities: [
      "Menginput data laporan LKPM klien di portal OSS per periode",
      "Memverifikasi kelengkapan data sebelum submit",
      "Memperbarui spreadsheet pemantauan deadline per klien",
      "Melaporkan anomali data ke supervisi harian",
    ],
    qualifications: [
      "Mahasiswa tingkat akhir / fresh graduate / pekerja sampingan",
      "Ketelitian tinggi dan disiplin deadline (tanggal 1-10 tiap bulan)",
      "Terhubung internet stabil untuk kerja remote",
      "Dasar spreadsheet (Sheets/Excel)",
    ],
    benefits: [
      "Remote penuh — tanpa biaya transport",
      "Jam fleksibel dalam periode penginputan",
      "Belajar sistem OSS langsung dari praktisi",
      "Bonus volume klien yang dihandle rapi",
      "Peluang konversi full-time ke tim administrasi",
    ],
    skills: ["Input Data", "OSS", "LKPM", "Spreadsheet", "Ketelitian", "Remote Work"],
    salaryMin: 1500000,
    salaryMax: 3000000,
    salaryNote: "Berbasis volume laporan per bulan",
    education: "Minimal SMA/SMK/mahasiswa aktif",
    experienceMonths: 0,
    postedDaysAgo: 12,
  },
  {
    id: "job-graphic-designer",
    slug: "graphic-designer",
    title: "Graphic Designer (Konten Sosial & Iklan)",
    organization: ORG_MAIN,
    isPartner: false,
    category: "Konten & Kreatif",
    employmentType: "FULL_TIME",
    workType: "remote",
    city: "Remote (WIB)",
    province: "Nasional",
    address: "Bekerja penuh dari rumah, review desain online",
    description: [
      "Setiap hari kami menerbitkan edukasi perizinan di sosial media dan iklan berbayar. Desainer kami menentukan apakah orang berhenti scroll — atau lanjut scroll.",
      "Anda akan membuat desain carousel edukasi, iklan, infografis regulasi, dan aset landing page. Template sistem kami tersedia — konsistensi brand tetap dijaga.",
    ],
    responsibilities: [
      "Membuat desain konten sosial media (carousel, reels cover)",
      "Mendesain iklan Meta/Google untuk funnel layanan",
      "Membuat infografis regulasi yang mudah dipahami",
      "Menjaga konsistensi identitas visual brand",
      "Iterasi cepat berdasarkan performa iklan",
    ],
    qualifications: [
      "Mahir Figma dan/atau Canva Pro + Photoshop",
      "Pengalaman desain sosial/iklan minimal 1 tahun (portofolio wajib)",
      "Memahami hierarki teks dan desain untuk konversi",
      "Responsif revisi — ritme produksi harian",
      "Minat pada konten edukasi bisnis",
    ],
    benefits: [
      "Full remote dengan deadline harian yang jelas",
      "Gaji tetap + bonus desain performa terbaik",
      "Brief jelas dari tim konten & marketing",
      "BPJS Kesehatan & Ketenagakerjaan",
      "Portofolio iklan beranggaran nyata",
    ],
    skills: ["Figma", "Canva", "Photoshop", "Desain Iklan", "Carousel", "Infografis"],
    salaryMin: 5000000,
    salaryMax: 7500000,
    education: "Minimal D3 (DKV/komunikasi) atau portofolio kuat",
    experienceMonths: 12,
    postedDaysAgo: 10,
  },
  {
    id: "job-ae-pajak",
    slug: "account-executive-pajak",
    title: "Account Executive Jasa Pajak (Coretax Era)",
    organization: ORG_MAIN,
    isPartner: false,
    category: "Penjualan & Marketing",
    employmentType: "FULL_TIME",
    workType: "hybrid",
    city: "Jakarta Selatan",
    province: "DKI Jakarta",
    address: "Kantor area Mampang + kunjungan klien",
    description: [
      "Era Coretax DJP membuat jutaan pelaku usaha butuh bantuan kepatuhan pajak bulanan & tahunan. Tim jasa pajak kami tumbuh cepat dan butuh akuisisi yang agresif namun elegan.",
      "Anda akan menjual paket kepatuhan pajak (SPT masa, tahunan, PKP, payroll) ke UMKM dan perusahaan — didukung kalkulator online kami yang sudah dikenal pasar.",
    ],
    responsibilities: [
      "Menjual paket layanan jasa pajak ke UMKM & korporasi",
      "Menganalisis profil pajak calon klien (omzet, PKP, karyawan)",
      "Menyusun penawaran bersama konsultan pajak senior",
      "Menjaga retensi klien perpanjangan perjanjian tahunan",
      "Mencapai target revenue layanan pajak bulanan",
    ],
    qualifications: [
      "S1 semua jurusan (akuntansi/pajak nilai plus)",
      "Pengalaman sales layanan keuangan/legalitas 2 tahun",
      "Memahami dasar-dasar pajak Indonesia (PPh, PPN, PKP)",
      "Nyaman bertemu pemilik usaha lintas sektor",
      "Ulet menghadapi siklus closing bulanan",
    ],
    benefits: [
      "Gaji pokok + komisi recurring (perjanjian tahunan)",
      "Produk jelas & harga transparan — mudah dijual",
      "Didampingi konsultan pajak berpengalaman",
      "BPJS Kesehatan & Ketenagakerjaan",
      "Pelatihan Coretax DJP & produk pajak intensif",
    ],
    skills: ["Sales", "Pajak Dasar", "Coretax", "Penawaran", "Retensi Klien", "Negosiasi"],
    salaryMin: 6000000,
    salaryMax: 10000000,
    salaryNote: "Pokok + komisi recurring tahunan",
    education: "S1 semua jurusan",
    experienceMonths: 24,
    featured: true,
    postedDaysAgo: 1,
  },
];

// ============================================================
// Helper API
// ============================================================

export function getJobBySlug(slug: string): Job | undefined {
  return JOBS.find((j) => j.slug === slug);
}

export function isoDaysAgo(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
}

export function isoValidThrough(): string {
  const d = new Date();
  d.setDate(d.getDate() + 90);
  return `${d.toISOString().slice(0, 10)}T23:59:59+07:00`;
}

export function formatRupiah(n: number): string {
  return `Rp${(n / 1_000_000).toLocaleString("id-ID", { maximumFractionDigits: 1 })} jt`;
}

export const JOB_CATEGORIES = [
  "Penjualan & Marketing",
  "Operasional & Legal",
  "Konten & Kreatif",
  "PMI & Ketenagakerjaan",
] as const;
