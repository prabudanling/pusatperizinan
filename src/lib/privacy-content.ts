// ============================================================
// PUSATPERIZINAN.COM — Konten Kebijakan Privasi v2.0
// Sumber data untuk /kebijakan-privasi: struktur GDPR-grade
// dipetakan ke UU No. 27 Tahun 2022 (UU PDP).
//
// - PRIVACY_SECTIONS : konten penuh bilingual (id & en, paritas 1:1)
// - PRIVACY_UI       : string UI 15 kunci untuk 30 bahasa (fallback en -> id)
// - Dipakai bersama oleh page.tsx (server) dan privacy-content.tsx (client).
//
// Kontrak token: {lang} pada langNotice diganti nama native bahasa
// konten yang benar-benar ditampilkan (mis. "Bahasa Indonesia").
// ============================================================

import type { LangCode } from "@/lib/i18n/types";
import { CONTACT, LEGAL_ENTITY } from "@/lib/site";

export type PrivacyContentLang = "id" | "en";

export type PrivacyBlock =
  | { type: "p"; text: string }
  | { type: "bullets"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] };

export interface PrivacySection {
  /** Anchor id untuk navigasi ToC & deep-link (#ringkasan, dst.) */
  anchor: string;
  title: string;
  blocks: PrivacyBlock[];
}

export const PRIVACY_VERSION = "2.0";

export const PRIVACY_UPDATED: Record<PrivacyContentLang, string> = {
  id: "13 Oktober 2026",
  en: "13 October 2026",
};

// Alamat lengkap satu baris — dari site.ts agar NAP konsisten.
const ALAMAT_KANTOR = `${CONTACT.address.street}, ${CONTACT.address.city}, ${CONTACT.address.region} ${CONTACT.address.postalCode}`;

// ------------------------------------------------------------
// KONTEN — BAHASA INDONESIA (versi yang mengikat / governing)
// ------------------------------------------------------------
const SECTIONS_ID: PrivacySection[] = [
  {
    anchor: "ringkasan",
    title: "Ringkasan Singkat",
    blocks: [
      {
        type: "p",
        text: "Kebijakan ini menjelaskan dalam bahasa sederhana bagaimana PusatPerizinan.com (PT Digital Bisnis Manajemen) menangani data pribadi Anda: apa yang kami kumpulkan, untuk apa, dibagikan kepada siapa, berapa lama disimpan, dan hak-hak Anda. Intinya:",
      },
      {
        type: "bullets",
        items: [
          "Yang kami kumpulkan: data kontak yang Anda kirim lewat formulir (nama, WhatsApp, email), data usaha, dokumen perizinan bila Anda menjadi klien, serta data teknis situs yang terbatas.",
          "Alasannya: merespons konsultasi Anda, memproses pengurusan izin, memenuhi kewajiban hukum, dan memperbaiki layanan — bukan untuk menjual data.",
          "Kami tidak menjual data pribadi dan tidak memasang pelacak iklan pihak ketiga; satu-satunya penyimpanan di peramban Anda adalah preferensi bahasa.",
          "Hak Anda: akses, perbaikan, penghapusan, penarikan persetujuan, dan keberatan — ajukan ke privacy@pusatperizinan.com, kami merespons maksimal 14 hari kerja.",
        ],
      },
    ],
  },
  {
    anchor: "pengendali",
    title: "Siapa Pengendali Data & Cara Menghubungi Kami",
    blocks: [
      {
        type: "p",
        text: `Pengendali data pribadi Anda adalah ${LEGAL_ENTITY} ("PusatPerizinan.com", "kami"), badan hukum Indonesia yang mengelola situs pusatperizinan.com dan seluruh layanan konsultasi perizinan di dalamnya.`,
      },
      {
        type: "p",
        text: `Alamat kantor: ${ALAMAT_KANTOR}.`,
      },
      {
        type: "p",
        text: "Untuk semua hal terkait privasi — pertanyaan, permintaan akses/perbaikan/penghapusan data, atau keluhan — hubungi kanal pelindungan data kami:",
      },
      {
        type: "bullets",
        items: [
          "Email privasi: privacy@pusatperizinan.com (kanal utama permintaan subjek data)",
          `Email umum: ${CONTACT.email}`,
          `WhatsApp: ${CONTACT.phoneDisplay} (dijawab ${CONTACT.hours})`,
        ],
      },
    ],
  },
  {
    anchor: "ruang-lingkup",
    title: "Ruang Lingkup & Siapa yang Dilindungi",
    blocks: [
      {
        type: "p",
        text: "Kebijakan ini berlaku untuk semua data pribadi yang kami proses melalui situs pusatperizinan.com dan layanan turunannya: pengunjung yang membaca konten, calon klien yang mengirim formulir konsultasi/checkout, klien yang menitipkan pengurusan izin, serta pengguna tools interaktif (chat AI RIZKI, license checker, dan kalkulator biaya).",
      },
      {
        type: "p",
        text: "Bagi pengunjung dari Uni Eropa/EEA, kebijakan ini disusun mengikuti struktur GDPR dan kami mengakui hak-hak Anda menurut GDPR berlaku sepenuhnya sebagai standar minimum — di samping UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP) sebagai hukum yang mengatur pemrosesan kami di Indonesia.",
      },
    ],
  },
  {
    anchor: "dasar-hukum",
    title: "Basis Hukum Pemrosesan",
    blocks: [
      {
        type: "p",
        text: "UU PDP Pasal 20 mengenal beberapa dasar pemrosesan data pribadi. Untuk setiap tujuan, kami hanya menggunakan satu dasar yang relevan — tidak ada pemrosesan tanpa dasar hukum:",
      },
      {
        type: "bullets",
        items: [
          "Persetujuan — Anda secara aktif mengirim formulir konsultasi, berlangganan, atau memakai fitur tertentu; persetujuan dapat ditarik kapan saja.",
          "Pelaksanaan perjanjian — pemrosesan yang diperlukan untuk melaksanakan jasa pengurusan izin yang Anda pesan.",
          "Kewajiban hukum — pelaporan kepada instansi, arsip perpajakan, dan kewajiban lain berdasarkan peraturan perundang-undangan.",
          "Kepentingan yang sah — keamanan situs, pencegahan penyalahgunaan, dan perbaikan layanan, dengan penilaian yang seimbang terhadap hak Anda.",
          "Kewajiban pelaksanaan peraturan perundang-undangan sektor tertentu — misalnya kewajiban verifikasi identitas (KYC) pada pengurusan izin tertentu.",
        ],
      },
      {
        type: "p",
        text: "Bagi pengunjung EU/EEA, dasar-dasar di atas setara dengan Pasal 6 GDPR (consent, contract, legal obligation, legitimate interests).",
      },
    ],
  },
  {
    anchor: "data-dikumpulkan",
    title: "Data Pribadi yang Kami Kumpulkan",
    blocks: [
      {
        type: "p",
        text: "Kami menerapkan prinsip minimisasi data: hanya meminta apa yang benar-benar diperlukan suatu tujuan. Berikut persisnya apa yang dapat sampai kepada kami dan dari mana sumbernya:",
      },
      {
        type: "table",
        head: ["Kategori", "Contoh", "Sumber"],
        rows: [
          ["Data identitas & kontak", "Nama, nomor WhatsApp/telepon, email", "Formulir konsultasi, checkout, email/WhatsApp yang Anda kirim"],
          ["Data usaha", "Jenis usaha, deskripsi kebutuhan, kode KBLI", "Formulir konsultasi, chat AI, license checker"],
          ["Dokumen legalisasi", "KTP, NPWP, akta pendirian, paspor — hanya bila Anda menjadi klien pengurusan izin", "Anda, melalui kanal yang disepakati saat onboarding"],
          ["Data teknis", "Halaman yang dikunjungi, interaksi situs, informasi perangkat/peramban secara agregat", "Server kami saat Anda menjelajah"],
          ["Preferensi", "Pilihan bahasa situs", "Tersimpan di localStorage peramban Anda (kunci \"pp-lang\"), tidak dikirim ke server"],
          ["Riwayat chat AI", "Pesan yang Anda tulis ke chatbot RIZKI dan balasannya", "Widget chat di situs ini"],
        ],
      },
      {
        type: "p",
        text: "Kami tidak menjual data pribadi Anda kepada siapa pun, dan kami tidak membagikannya untuk iklan. Data yang tidak diperlukan untuk suatu tujuan tidak kami minta sejak awal.",
      },
    ],
  },
  {
    anchor: "tujuan",
    title: "Tujuan Pemrosesan & Dasar Hukumnya",
    blocks: [
      {
        type: "p",
        text: "Setiap tujuan di bawah terikat pada satu dasar hukum menurut UU PDP. Kami tidak menggunakan data Anda di luar tujuan yang dinyatakan di sini:",
      },
      {
        type: "table",
        head: ["Tujuan", "Dasar Hukum (UU PDP)"],
        rows: [
          ["Merespons pertanyaan & permintaan konsultasi", "Persetujuan dan/atau kepentingan yang sah"],
          ["Memproses pengurusan izin & legalisasi usaha yang Anda titipkan", "Pelaksanaan perjanjian"],
          ["Kepatuhan hukum & pelaporan kepada instansi (OSS, DJP, Kemenkumham, dll.)", "Kewajiban hukum"],
          ["Perbaikan layanan, keamanan situs & pencegahan penyalahgunaan", "Kepentingan yang sah"],
          ["Pemasaran layanan (newsletter/promo) — hanya bila Anda berlangganan, dengan opsi berhenti di setiap pesan", "Persetujuan"],
        ],
      },
    ],
  },
  {
    anchor: "cookie",
    title: "Cookie, LocalStorage & Teknologi Serupa",
    blocks: [
      {
        type: "p",
        text: "Jujur saja: saat ini satu-satunya teknologi penyimpanan yang kami gunakan di peramban Anda adalah localStorage dengan kunci \"pp-lang\", yang menyimpan pilihan bahasa situs (mis. \"en\" atau \"jv\"). Ini bukan pelacak: isinya tidak dapat dibaca pihak lain, tidak berisi identitas Anda, dan tidak dikirim ke server kami.",
      },
      {
        type: "bullets",
        items: [
          "Kami belum memasang cookie iklan pihak ketiga, pixel iklan, maupun fingerprinting.",
          "Anda dapat menghapus/memblokir localStorage dan cookie kapan saja lewat pengaturan peramban (mis. Chrome: Pengaturan → Privasi dan keamanan → Cookie situs).",
          "Menghapus \"pp-lang\" hanya membuat situs kembali ke Bahasa Indonesia.",
          "Bila di kemudian hari kami memasang analytics pihak ketiga (mis. statistik kunjungan), kebijakan ini akan diperbarui lebih dulu di halaman ini sebelum teknologinya aktif.",
        ],
      },
    ],
  },
  {
    anchor: "pembagian",
    title: "Pembagian Data kepada Pihak Ketiga",
    blocks: [
      {
        type: "p",
        text: "Data — terutama dokumen legalisasi — hanya kami bagikan sebatas yang diperlukan untuk mengurus izin Anda, melalui kanal resmi berikut:",
      },
      {
        type: "bullets",
        items: [
          "Portal OSS-RBA (LGOSS) — sistem perizinan berusaha terintegrasi yang dikelola pemerintah; untuk NIB, sertifikat standar, dan izin lainnya.",
          "Kemenkumham (AHU Online) — pendirian & perubahan badan hukum (PT, CV, yayasan, perkumpulan).",
          "DJP Coretax — registrasi NPWP, pengukuhan PKP, dan kepatuhan perpajakan.",
          "BPJPH/SIHALAL — sertifikasi halal produk; BPOM — izin edar & registrasi produk; DPMPTSP — perizinan tingkat daerah.",
          "Mitra notaris/PPAT — pembuatan akta yang menjadi syarat legalisasi Anda.",
          "Payment gateway berlisensi (Midtrans/Tripay) — pemrosesan pembayaran; data kartu Anda diproses langsung oleh penyedia berlisensi dan tidak pernah disimpan di server kami.",
          "Penyedia hosting/infrastruktur — penyimpanan data pada server yang kami sewa, terikat perjanjian kerahasiaan.",
        ],
      },
      {
        type: "p",
        text: "Di luar daftar di atas, data hanya dapat kami berikan bila diwajibkan hukum — misalnya atas perintah pengadilan atau permintaan resmi penegak hukum sesuai prosedur peraturan perundang-undangan. Sekali lagi: tidak ada penjualan data, dan tidak ada pemberian data untuk pemasaran pihak ketiga.",
      },
    ],
  },
  {
    anchor: "transfer-internasional",
    title: "Transfer Data Internasional",
    blocks: [
      {
        type: "p",
        text: "Secara utama, data pribadi Anda kami simpan di Indonesia.",
      },
      {
        type: "p",
        text: "Bila suatu saat kami menggunakan penyedia infrastruktur/global (mis. CDN, email, atau layanan cloud) yang servernya berada di luar negeri, transfer hanya dilakukan ke negara yang memiliki tingkat perlindungan data pribadi yang setara, atau dengan jaminan yang memadai seperti klausul kontraktual yang mengikat — sejalan dengan Pasal 55–56 UU PDP. Bagi pengunjung EU/EEA, standar klausul kontraktual GDPR kami jadikan acuan.",
      },
    ],
  },
  {
    anchor: "retensi",
    title: "Berapa Lama Kami Menyimpan Data",
    blocks: [
      {
        type: "p",
        text: "Kami menyimpan data pribadi hanya selama tujuan pemrosesannya berjalan, lalu menghapusnya atau menganonimkannya:",
      },
      {
        type: "table",
        head: ["Jenis Data", "Periode Retensi", "Dasar"],
        rows: [
          ["Data leads (formulir konsultasi yang belum menjadi klien)", "Maksimal 24 bulan sejak kontak terakhir", "Minimisasi data; kepentingan sah untuk menghubungi ulang"],
          ["Dokumen & data pengurusan izin (klien)", "Sesuai kewajiban hukum & arsip — minimal 5–10 tahun", "Ketentuan arsip & perpajakan; pelaksanaan perjanjian"],
          ["Riwayat chat AI (RIZKI)", "Maksimal 12 bulan", "Kepentingan sah: kualitas layanan, pencegahan penyalahgunaan"],
          ["Data & catatan pembayaran", "10 tahun", "Kewajiban perpajakan (bukti pembukuan)"],
          ["Preferensi bahasa (localStorage \"pp-lang\")", "Sampai Anda menghapusnya", "Sepenuhnya di kendali Anda melalui peramban"],
        ],
      },
      {
        type: "p",
        text: "Setelah periode di atas berlalu, data dihapus atau dianonimkan. Bila Anda meminta penghapusan lebih awal, kami proses kecuali ada kewajiban hukum untuk menyimpannya.",
      },
    ],
  },
  {
    anchor: "keamanan",
    title: "Bagaimana Kami Melindungi Data",
    blocks: [
      {
        type: "bullets",
        items: [
          "Enkripsi TLS (HTTPS) untuk seluruh lalu lintas situs — termasuk formulir dan chat.",
          "Akses data terbatas berdasarkan peran (need-to-know): hanya staf yang menangani permintaan Anda yang dapat membuka datanya.",
          "Basis data dan dokumen klien disimpan pada infrastruktur yang terlindungi dan tidak dapat diakses publik.",
          "Minimisasi data: kami tidak meminta dokumen yang tidak diperlukan untuk tahap layanan yang sedang berjalan.",
          "Kewajiban kerahasiaan mengikat seluruh tim, termasuk setelah hubungan kerja berakhir.",
          "Saat ini sistem pembayaran berjalan dalam mode uji/demo (PAYMENT_DEMO_MODE), sehingga tidak ada data kartu pembayaran yang diproses atau disimpan sistem kami.",
        ],
      },
      {
        type: "p",
        text: "Meski kami menerapkan kehati-hatian yang wajar, tidak ada sistem yang 100% aman. Bila terjadi insiden kebocoran yang berpotensi menimbulkan kerugian, kami akan memberi tahu Anda dan Otoritas Pelindungan Data Pribadi sesuai kewajiban notifikasi UU PDP.",
      },
    ],
  },
  {
    anchor: "hak-anda",
    title: "Hak-Hak Anda & Cara Menggunakannya",
    blocks: [
      {
        type: "p",
        text: "UU PDP (dan GDPR bagi pengunjung EU/EEA) memberi Anda hak-hak berikut atas data pribadi Anda:",
      },
      {
        type: "bullets",
        items: [
          "Hak atas informasi — mengetahui tujuan dan detail pemrosesan data Anda.",
          "Hak akses — memperoleh salinan data pribadi Anda yang kami simpan.",
          "Hak perbaikan — meminta koreksi data yang tidak akurat atau tidak lengkap.",
          "Hak penghapusan — meminta data Anda dihapus bila tidak lagi diperlukan atau persetujuan ditarik.",
          "Hak menarik persetujuan — menghentikan pemrosesan berbasis persetujuan, kapan saja.",
          "Hak keberatan — menolak pemrosesan berbasis kepentingan sah atau untuk pemasaran langsung.",
          "Hak portabilitas data — memperoleh data dalam format yang umum digunakan dan dapat dibaca mesin.",
          "Hak penundaan/pembatasan pemrosesan — menunda pemrosesan selama verifikasi permintaan Anda berjalan.",
        ],
      },
      {
        type: "p",
        text: `Cara menggunakannya: kirim permintaan ke privacy@pusatperizinan.com atau WhatsApp ${CONTACT.phoneDisplay}. Kami akan memverifikasi identitas Anda (untuk melindungi dari penyalahgunaan), lalu merespons paling lambat 14 hari kerja. Permintaan tidak dikenakan biaya.`,
      },
    ],
  },
  {
    anchor: "ai-otomatis",
    title: "Pemrosesan Otomatis, AI & Keputusan",
    blocks: [
      {
        type: "p",
        text: "Situs ini memakai AI dalam dua fitur: chatbot RIZKI (model bahasa yang berjalan di server kami) dan AI license checker untuk estimasi awal jalur perizinan.",
      },
      {
        type: "p",
        text: "Jawaban AI bersifat edukatif dan informatif — bukan nasihat hukum, bukan keputusan hukum, dan tidak mengikat. Rekomendasi izin akhir selalu melalui telaah manusia (konsultan kami) sebelum ada tindakan atas permintaan Anda; tidak ada keputusan berakibat hukum yang dihasilkan murni secara otomatis. Riwayat chat Anda digunakan hanya untuk melayani dan meningkatkan kualitas jawaban — tidak digunakan melatih model publik.",
      },
    ],
  },
  {
    anchor: "anak",
    title: "Privasi Anak",
    blocks: [
      {
        type: "p",
        text: "Layanan konsultasi perizinan usaha kami ditujukan untuk usia 18 tahun ke atas; situs ini tidak sengaja mengumpulkan data anak.",
      },
      {
        type: "p",
        text: "Sesuai UU PDP, pemrosesan data anak memerlukan persetujuan orang tua/wali. Bila kami mengetahui data anak (di bawah 18 tahun) terkumpul tanpa persetujuan yang sah, kami akan segera menghapusnya. Orang tua/wali dapat mengajukan permintaan penghapusan ke privacy@pusatperizinan.com.",
      },
    ],
  },
  {
    anchor: "keberatan",
    title: "Keberatan & Otoritas Pengawas",
    blocks: [
      {
        type: "bullets",
        items: [
          "Bila Anda merasa data Anda diproses melanggar ketentuan, Anda berhak mengajukan keberatan kepada kami terlebih dahulu — kami akan menjawab dan memperbaiki bila memang ada kelalaian.",
          "Anda juga berhak mengadu langsung ke otoritas pengawas: Otoritas Pelindungan Data Pribadi (AU-PDP) di bawah Kementerian Komunikasi dan Digital, sesuai UU PDP.",
          "Bagi pengunjung EU/EEA: Anda berhak mengadu ke otoritas pengawas GDPR di negara tempat Anda tinggal, bekerja, atau tempat dugaan pelanggaran terjadi.",
        ],
      },
    ],
  },
  {
    anchor: "perubahan",
    title: "Perubahan Kebijakan Ini",
    blocks: [
      {
        type: "p",
        text: "Kebijakan ini dapat kami perbarui sewaktu-waktu untuk mencerminkan perubahan layanan atau regulasi. Versi terbaru selalu dipublikasikan di halaman ini beserta tanggal pembaruannya; bila perubahannya material (mis. tujuan baru atau pihak ketiga baru), kami memberi tahu melalui kanal komunikasi yang relevan (email/situs) sebelum berlaku.",
      },
      {
        type: "table",
        head: ["Versi", "Tanggal", "Perubahan"],
        rows: [
          ["1.0", "2024", "Versi awal ringkas"],
          ["2.0", "13 Oktober 2026", "Penataan ulang menyeluruh mengikuti standar internasional UU PDP 27/2022 & GDPR"],
        ],
      },
    ],
  },
  {
    anchor: "kontak-privasi",
    title: "Kontak & Bahasa yang Tersedia",
    blocks: [
      {
        type: "p",
        text: `Pertanyaan privasi, permintaan hak subjek data, atau laporan insiden: hubungi privacy@pusatperizinan.com (kanal pelindungan data resmi kami) atau WhatsApp ${CONTACT.phoneDisplay}. Surat resmi dapat dikirim ke kantor kami: ${ALAMAT_KANTOR}.`,
      },
      {
        type: "p",
        text: "Kebijakan ini tersedia dalam Bahasa Indonesia dan English. Bila terdapat perbedaan tafsir, versi Bahasa Indonesia yang berlaku.",
      },
      {
        type: "p",
        text: "Informasi terkait juga tersedia pada halaman Syarat & Ketentuan (/syarat-ketentuan) dan FAQ (/faq).",
      },
    ],
  },
];

// ------------------------------------------------------------
// KONTEN — ENGLISH (paritas penuh dengan versi Indonesia)
// ------------------------------------------------------------
const SECTIONS_EN: PrivacySection[] = [
  {
    anchor: "ringkasan",
    title: "Quick Summary",
    blocks: [
      {
        type: "p",
        text: "This policy explains in plain language how PusatPerizinan.com (PT Digital Bisnis Manajemen) handles your personal data: what we collect, why, with whom it is shared, how long we keep it, and your rights. In short:",
      },
      {
        type: "bullets",
        items: [
          "What we collect: contact details you send through forms (name, WhatsApp, email), business information, licensing documents if you become a client, and limited technical site data.",
          "Why: to answer your consultation requests, process your licensing orders, meet legal obligations, and improve our services — never to sell your data.",
          "We do not sell personal data and we run no third-party ad trackers; the only thing stored in your browser is your language preference.",
          "Your rights: access, rectification, erasure, withdrawal of consent, and objection — email privacy@pusatperizinan.com and we respond within 14 business days.",
        ],
      },
    ],
  },
  {
    anchor: "pengendali",
    title: "Who Controls Your Data & How to Reach Us",
    blocks: [
      {
        type: "p",
        text: `The controller of your personal data is ${LEGAL_ENTITY} ("PusatPerizinan.com", "we"), an Indonesian company that operates pusatperizinan.com and all licensing consultancy services within it.`,
      },
      {
        type: "p",
        text: `Office address: ${ALAMAT_KANTOR}.`,
      },
      {
        type: "p",
        text: "For everything privacy-related — questions, access/rectification/erasure requests, or complaints — contact our data protection channel:",
      },
      {
        type: "bullets",
        items: [
          "Privacy email: privacy@pusatperizinan.com (main channel for data-subject requests)",
          `General email: ${CONTACT.email}`,
          `WhatsApp: ${CONTACT.phoneIntl} (answered ${CONTACT.hours})`,
        ],
      },
    ],
  },
  {
    anchor: "ruang-lingkup",
    title: "Scope & Who Is Protected",
    blocks: [
      {
        type: "p",
        text: "This policy covers all personal data we process through pusatperizinan.com and its related services: visitors reading our content, prospective clients submitting consultation/checkout forms, clients entrusting us with licensing work, and users of our interactive tools (the RIZKI AI chat, license checker, and cost calculator).",
      },
      {
        type: "p",
        text: "For visitors from the EU/EEA, this policy follows the structure of the GDPR and we fully honour your GDPR rights as a minimum standard — alongside Indonesia's Law No. 27 of 2022 on Personal Data Protection (the PDP Law), which governs our processing in Indonesia.",
      },
    ],
  },
  {
    anchor: "dasar-hukum",
    title: "Legal Basis for Processing",
    blocks: [
      {
        type: "p",
        text: "Article 20 of Indonesia's PDP Law recognises several legal bases for processing personal data. Each purpose below uses exactly one relevant basis — there is no processing without a legal basis:",
      },
      {
        type: "bullets",
        items: [
          "Consent — you actively submit a consultation form, subscribe, or use a specific feature; you may withdraw it at any time.",
          "Performance of a contract — processing needed to carry out the licensing services you ordered.",
          "Legal obligation — reporting to government agencies, tax archiving, and other statutory duties.",
          "Legitimate interests — site security, abuse prevention, and service improvement, balanced against your rights.",
          "Compliance with sector-specific statutory obligations — for example identity verification (KYC) requirements in certain licensing procedures.",
        ],
      },
      {
        type: "p",
        text: "For EU/EEA visitors, these bases correspond to Article 6 of the GDPR (consent, contract, legal obligation, legitimate interests).",
      },
    ],
  },
  {
    anchor: "data-dikumpulkan",
    title: "Personal Data We Collect",
    blocks: [
      {
        type: "p",
        text: "We practise data minimisation: we only ask for what a given purpose genuinely requires. Here is exactly what can reach us, and from where:",
      },
      {
        type: "table",
        head: ["Category", "Examples", "Source"],
        rows: [
          ["Identity & contact data", "Name, WhatsApp/phone number, email", "Consultation forms, checkout, emails/WhatsApp you send us"],
          ["Business data", "Type of business, description of needs, KBLI codes", "Consultation forms, AI chat, license checker"],
          ["Legalisation documents", "ID card (KTP), tax number (NPWP), deeds, passports — only if you become a licensing client", "You, through the channel agreed during onboarding"],
          ["Technical data", "Pages visited, site interactions, aggregated device/browser information", "Our servers as you browse"],
          ["Preferences", "Your site language choice", "Stored in your browser's localStorage (key \"pp-lang\"), never sent to our servers"],
          ["AI chat history", "Messages you write to the RIZKI chatbot and its replies", "The chat widget on this site"],
        ],
      },
      {
        type: "p",
        text: "We do not sell your personal data to anyone, and we do not share it for advertising. Data that is not necessary for a given purpose is not requested in the first place.",
      },
    ],
  },
  {
    anchor: "tujuan",
    title: "Purposes of Processing & Their Legal Basis",
    blocks: [
      {
        type: "p",
        text: "Every purpose below is tied to one legal basis under the PDP Law. We do not use your data beyond the purposes stated here:",
      },
      {
        type: "table",
        head: ["Purpose", "Legal Basis (PDP Law)"],
        rows: [
          ["Responding to questions & consultation requests", "Consent and/or legitimate interests"],
          ["Processing the licensing & legalisation work you entrust to us", "Performance of a contract"],
          ["Legal compliance & reporting to agencies (OSS, DJP, Kemenkumham, etc.)", "Legal obligation"],
          ["Service improvement, site security & abuse prevention", "Legitimate interests"],
          ["Marketing (newsletters/promotions) — only if you subscribe, with an opt-out in every message", "Consent"],
        ],
      },
    ],
  },
  {
    anchor: "cookie",
    title: "Cookies, LocalStorage & Similar Technologies",
    blocks: [
      {
        type: "p",
        text: "To be honest: the only storage technology we currently use in your browser is localStorage with the key \"pp-lang\", which remembers your site language choice (e.g. \"en\" or \"jv\"). It is not a tracker: its contents cannot be read by other parties, it contains no identity data, and it is never sent to our servers.",
      },
      {
        type: "bullets",
        items: [
          "We run no third-party advertising cookies, ad pixels, or fingerprinting.",
          "You can clear or block localStorage and cookies at any time via your browser settings (e.g. Chrome: Settings → Privacy and security → Site cookies).",
          "Deleting \"pp-lang\" simply resets the site to Bahasa Indonesia.",
          "If we ever add third-party analytics (e.g. traffic statistics), this policy will be updated on this page before the technology goes live.",
        ],
      },
    ],
  },
  {
    anchor: "pembagian",
    title: "Sharing Data with Third Parties",
    blocks: [
      {
        type: "p",
        text: "Data — especially legalisation documents — is shared only as far as needed to process your permits, through these official channels:",
      },
      {
        type: "bullets",
        items: [
          "The OSS-RBA portal (LGOSS) — the government-managed integrated business licensing system; for NIB, standard certificates, and other permits.",
          "Kemenkumham (AHU Online) — incorporation and changes of legal entities (PT, CV, foundations, associations).",
          "DJP Coretax — tax registration (NPWP), VAT confirmation (PKP), and tax compliance.",
          "BPJPH/SIHALAL — halal product certification; BPOM — marketing authorisation & product registration; DPMPTSP — regional licensing.",
          "Notary/PPAT partners — execution of deeds required for your legalisation.",
          "Licensed payment gateways (Midtrans/Tripay) — payment processing; your card data is processed directly by the licensed provider and is never stored on our servers.",
          "Hosting/infrastructure providers — data storage on servers we rent, under confidentiality agreements.",
        ],
      },
      {
        type: "p",
        text: "Beyond the list above, data may only be disclosed when the law requires it — for example, by court order or an official law-enforcement request under due process. Once again: no selling of data, and no disclosure for third-party marketing.",
      },
    ],
  },
  {
    anchor: "transfer-internasional",
    title: "International Data Transfers",
    blocks: [
      {
        type: "p",
        text: "Primarily, your personal data is stored in Indonesia.",
      },
      {
        type: "p",
        text: "Should we ever use a global infrastructure provider (e.g. CDN, email, or cloud services) whose servers are located abroad, transfers would only be made to countries offering an equivalent level of personal data protection, or under adequate safeguards such as binding contractual clauses — in line with Articles 55–56 of the PDP Law. For EU/EEA visitors, the GDPR Standard Contractual Clauses serve as our reference standard.",
      },
    ],
  },
  {
    anchor: "retensi",
    title: "How Long We Keep Your Data",
    blocks: [
      {
        type: "p",
        text: "We keep personal data only as long as its processing purpose lasts, then delete or anonymise it:",
      },
      {
        type: "table",
        head: ["Data Type", "Retention Period", "Basis"],
        rows: [
          ["Lead data (consultation forms that did not become clients)", "Max. 24 months from last contact", "Data minimisation; legitimate interest in follow-up"],
          ["Licensing documents & client data", "As required by law & archiving — minimum 5–10 years", "Archival & tax regulations; performance of a contract"],
          ["AI chat history (RIZKI)", "Max. 12 months", "Legitimate interests: service quality, abuse prevention"],
          ["Payment data & records", "10 years", "Tax obligations (bookkeeping evidence)"],
          ["Language preference (localStorage \"pp-lang\")", "Until you delete it", "Fully under your control via the browser"],
        ],
      },
      {
        type: "p",
        text: "Once the periods above lapse, data is deleted or anonymised. If you request earlier erasure, we will process it unless a legal obligation requires us to keep the data.",
      },
    ],
  },
  {
    anchor: "keamanan",
    title: "How We Protect Your Data",
    blocks: [
      {
        type: "bullets",
        items: [
          "TLS encryption (HTTPS) for all site traffic — including forms and chat.",
          "Role-based, need-to-know access: only staff handling your request can open your data.",
          "Client databases and documents are kept on protected infrastructure that is not publicly accessible.",
          "Data minimisation: we never ask for documents that are not needed for the current stage of your service.",
          "Binding confidentiality obligations for the entire team, including after the working relationship ends.",
          "Our payment system currently runs in demo/test mode (PAYMENT_DEMO_MODE), so no card data is processed or stored by our systems at all.",
        ],
      },
      {
        type: "p",
        text: "Although we apply reasonable care, no system is 100% secure. If a breach occurs that is likely to cause harm, we will notify you and the Personal Data Protection Authority in line with the notification duties of the PDP Law.",
      },
    ],
  },
  {
    anchor: "hak-anda",
    title: "Your Rights & How to Exercise Them",
    blocks: [
      {
        type: "p",
        text: "The PDP Law (and the GDPR for EU/EEA visitors) grants you the following rights over your personal data:",
      },
      {
        type: "bullets",
        items: [
          "Right to information — to know the purposes and details of the processing of your data.",
          "Right of access — to obtain a copy of the personal data we hold about you.",
          "Right to rectification — to correct inaccurate or incomplete data.",
          "Right to erasure — to have your data deleted when it is no longer needed or consent is withdrawn.",
          "Right to withdraw consent — to stop consent-based processing at any time.",
          "Right to object — to refuse processing based on legitimate interests or direct marketing.",
          "Right to data portability — to receive your data in a commonly used, machine-readable format.",
          "Right to postpone/limit processing — to pause processing while your request is being verified.",
        ],
      },
      {
        type: "p",
        text: `How to exercise them: send your request to privacy@pusatperizinan.com or WhatsApp ${CONTACT.phoneIntl}. We will verify your identity (to protect against misuse) and respond within 14 business days at the latest. Requests are free of charge.`,
      },
    ],
  },
  {
    anchor: "ai-otomatis",
    title: "Automated Processing, AI & Decisions",
    blocks: [
      {
        type: "p",
        text: "This site uses AI in two features: the RIZKI chatbot (a language model running on our server) and the AI license checker for preliminary licensing-route estimates.",
      },
      {
        type: "p",
        text: "AI answers are educational and informational — not legal advice, not a legal decision, and not binding. Any final licensing recommendation always goes through human review by our consultants before any action is taken on your behalf; no decision with legal effect for you is made purely automatically. Your chat history is used only to serve you and improve answer quality — never to train public models.",
      },
    ],
  },
  {
    anchor: "anak",
    title: "Children's Privacy",
    blocks: [
      {
        type: "p",
        text: "Our business-licensing consultancy services are intended for people aged 18 and above; this site does not knowingly collect children's data.",
      },
      {
        type: "p",
        text: "Under the PDP Law, processing a child's data requires parental/guardian consent. If we learn that a child's data (under 18) has been collected without lawful consent, we will delete it promptly. Parents/guardians may request erasure via privacy@pusatperizinan.com.",
      },
    ],
  },
  {
    anchor: "keberatan",
    title: "Objections & Supervisory Authority",
    blocks: [
      {
        type: "bullets",
        items: [
          "If you believe your data has been processed unlawfully, you have the right to complain to us first — we will answer and fix any lapse on our part.",
          "You also have the right to complain directly to the supervisory authority: the Personal Data Protection Authority (AU-PDP) under the Ministry of Communication and Digital Affairs, pursuant to the PDP Law.",
          "For EU/EEA visitors: you have the right to lodge a complaint with your local GDPR supervisory authority — in the member state of your residence, workplace, or the place of the alleged infringement.",
        ],
      },
    ],
  },
  {
    anchor: "perubahan",
    title: "Changes to This Policy",
    blocks: [
      {
        type: "p",
        text: "We may update this policy to reflect changes in our services or regulation. The latest version is always published on this page with its update date; if a change is material (e.g. a new purpose or a new third party), we will announce it through the relevant communication channels (email/site) before it takes effect.",
      },
      {
        type: "table",
        head: ["Version", "Date", "Changes"],
        rows: [
          ["1.0", "2024", "Initial short version"],
          ["2.0", "13 October 2026", "Full restructuring to international UU PDP 27/2022 & GDPR standards"],
        ],
      },
    ],
  },
  {
    anchor: "kontak-privasi",
    title: "Contact & Available Languages",
    blocks: [
      {
        type: "p",
        text: `Privacy questions, data-subject requests, or incident reports: contact privacy@pusatperizinan.com (our official data protection channel) or WhatsApp ${CONTACT.phoneIntl}. Formal mail can be sent to our office: ${ALAMAT_KANTOR}.`,
      },
      {
        type: "p",
        text: "This policy is available in Bahasa Indonesia and English. In case of any difference in interpretation, the Bahasa Indonesia version prevails.",
      },
      {
        type: "p",
        text: "Related information is also available on our Terms of Service page (/syarat-ketentuan) and FAQ (/faq).",
      },
    ],
  },
];

export const PRIVACY_SECTIONS: Record<PrivacyContentLang, PrivacySection[]> = {
  id: SECTIONS_ID,
  en: SECTIONS_EN,
};

// ------------------------------------------------------------
// STRING UI — 15 kunci, 30 bahasa (lengkap; fallback en -> id)
// ------------------------------------------------------------
export interface PrivacyUi {
  title: string;
  subtitle: string;
  updatedLabel: string;
  effectiveLabel: string;
  versionLabel: string;
  tocTitle: string;
  /** Token {lang} — diganti nama native bahasa konten yang ditampilkan */
  langNotice: string;
  breadcrumbHome: string;
  breadcrumbPrivacy: string;
  contactTitle: string;
  contactSub: string;
  btnEmail: string;
  btnWa: string;
  relatedLabel: string;
  /** Klausul: versi Bahasa Indonesia yang berlaku bila ada perbedaan tafsir */
  governingLangNote: string;
}

// Dideklarasikan lengkap (Record<LangCode, PrivacyUi>) agar TypeScript
// memaksa SEMUA 30 bahasa punya SEMUA 15 kunci — lalu diekspor sebagai
// Partial sesuai kontrak konsumen.
const PRIVACY_UI_COMPLETE: Record<LangCode, PrivacyUi> = {
  id: {
    title: "Kebijakan Privasi",
    subtitle: "Bagaimana kami mengumpulkan, menggunakan, dan melindungi data pribadi Anda — sesuai UU No. 27 Tahun 2022 (UU PDP) dengan struktur standar internasional (GDPR).",
    updatedLabel: "Terakhir diperbarui",
    effectiveLabel: "Berlaku efektif",
    versionLabel: "Versi",
    tocTitle: "Daftar isi",
    langNotice: "Kebijakan ini belum tersedia dalam bahasa pilihan Anda. Anda sedang membaca versi {lang} — versi resmi yang menjadi acuan.",
    breadcrumbHome: "Beranda",
    breadcrumbPrivacy: "Kebijakan Privasi",
    contactTitle: "Masih ada pertanyaan tentang data Anda?",
    contactSub: "Tim pelindungan data kami siap membantu permintaan akses, perbaikan, penghapusan, atau keberatan — respons maksimal 14 hari kerja.",
    btnEmail: "Email Tim Privasi",
    btnWa: "WhatsApp Kami",
    relatedLabel: "Lihat juga",
    governingLangNote: "Kebijakan ini tersedia dalam Bahasa Indonesia dan English. Bila terdapat perbedaan tafsir, versi Bahasa Indonesia yang berlaku.",
  },
  en: {
    title: "Privacy Policy",
    subtitle: "How we collect, use, and protect your personal data — under Indonesia's Law No. 27/2022 (PDP Law), structured to international (GDPR) standards.",
    updatedLabel: "Last updated",
    effectiveLabel: "Effective",
    versionLabel: "Version",
    tocTitle: "On this page",
    langNotice: "This policy is not yet available in your language. You are reading the {lang} version — the official Bahasa Indonesia version that governs.",
    breadcrumbHome: "Home",
    breadcrumbPrivacy: "Privacy Policy",
    contactTitle: "Still have a question about your data?",
    contactSub: "Our data protection team can help with access, rectification, erasure, or objection requests — we respond within 14 business days.",
    btnEmail: "Email the Privacy Team",
    btnWa: "Chat on WhatsApp",
    relatedLabel: "See also",
    governingLangNote: "This policy is available in Bahasa Indonesia and English. In case of any discrepancy, the Bahasa Indonesia version prevails.",
  },
  zh: {
    title: "隐私政策",
    subtitle: "我们如何收集、使用和保护您的个人数据 —— 依据印度尼西亚第 27/2022 号法律（《个人数据保护法》，UU PDP），结构对标国际 GDPR 标准。",
    updatedLabel: "最后更新",
    effectiveLabel: "生效日期",
    versionLabel: "版本",
    tocTitle: "本页目录",
    langNotice: "本政策暂无您的语言版本。您正在阅读 {lang} 版本 —— 具有正式效力的印尼语版本。",
    breadcrumbHome: "首页",
    breadcrumbPrivacy: "隐私政策",
    contactTitle: "对您的数据仍有疑问？",
    contactSub: "我们的数据保护团队可协助处理访问、更正、删除或异议请求 —— 我们将在 14 个工作日内回复。",
    btnEmail: "发送邮件给隐私团队",
    btnWa: "通过 WhatsApp 联系我们",
    relatedLabel: "另请参阅",
    governingLangNote: "本政策提供印尼语和英语版本。如有解释分歧，以印尼语版本为准。",
  },
  ja: {
    title: "プライバシーポリシー",
    subtitle: "当社がお客様の個人データを収集・利用・保護する方法 — インドネシア個人情報保護法（UU PDP、第27/2022号法）に基づき、国際標準（GDPR）の構成でご案内します。",
    updatedLabel: "最終更新日",
    effectiveLabel: "施行日",
    versionLabel: "バージョン",
    tocTitle: "目次",
    langNotice: "このポリシーはまだお使いの言語では提供されていません。現在、正式なインドネシア語版である {lang} 版を表示しています。",
    breadcrumbHome: "ホーム",
    breadcrumbPrivacy: "プライバシーポリシー",
    contactTitle: "データについてご不明点はありますか？",
    contactSub: "データ保護チームがアクセス・訂正・削除・異議申立てのご依頼をサポートします。14営業日以内にご返信いたします。",
    btnEmail: "プライバシーチームにメール",
    btnWa: "WhatsAppで問い合わせ",
    relatedLabel: "関連ページ",
    governingLangNote: "本ポリシーはインドネシア語および英語で提供されています。解釈に相違がある場合は、インドネシア語版が優先されます。",
  },
  ko: {
    title: "개인정보 처리방침",
    subtitle: "당사가 고객의 개인 데이터를 수집·이용·보호하는 방식 — 인도네시아 개인정보보호법(UU PDP, 제27/2022호)에 따르며 국제 표준(GDPR) 구조를 따릅니다.",
    updatedLabel: "최종 업데이트",
    effectiveLabel: "시행일",
    versionLabel: "버전",
    tocTitle: "목차",
    langNotice: "본 방침은 아직 고객님의 언어로 제공되지 않습니다. 현재 공식 인도네시아어 버전인 {lang} 버전을 보고 계십니다.",
    breadcrumbHome: "홈",
    breadcrumbPrivacy: "개인정보 처리방침",
    contactTitle: "데이터에 대해 궁금한 점이 있으신가요?",
    contactSub: "데이터 보호 팀이 열람·정정·삭제·이의 제기 요청을 도와드립니다 — 영업일 기준 14일 이내에 답변드립니다.",
    btnEmail: "개인정보 팀에 이메일 보내기",
    btnWa: "WhatsApp 문의",
    relatedLabel: "함께 보기",
    governingLangNote: "본 방침은 인도네시아어와 영어로 제공됩니다. 해석에 차이가 있을 경우 인도네시아어 버전이 적용됩니다.",
  },
  vi: {
    title: "Chính sách bảo mật",
    subtitle: "Chúng tôi thu thập, sử dụng và bảo vệ dữ liệu cá nhân của bạn như thế nào — theo Luật Bảo vệ dữ liệu cá nhân số 27/2022 của Indonesia (UU PDP), với cấu trúc theo chuẩn quốc tế (GDPR).",
    updatedLabel: "Cập nhật lần cuối",
    effectiveLabel: "Hiệu lực từ",
    versionLabel: "Phiên bản",
    tocTitle: "Mục lục",
    langNotice: "Chính sách này chưa có bản tiếng của bạn. Bạn đang xem bản {lang} — bản tiếng Indonesia là bản chính thức có giá trị ràng buộc.",
    breadcrumbHome: "Trang chủ",
    breadcrumbPrivacy: "Chính sách bảo mật",
    contactTitle: "Bạn vẫn còn thắc mắc về dữ liệu của mình?",
    contactSub: "Đội bảo vệ dữ liệu của chúng tôi hỗ trợ các yêu cầu truy cập, chỉnh sửa, xóa hoặc phản đối — phản hồi trong vòng 14 ngày làm việc.",
    btnEmail: "Gửi email cho đội bảo mật",
    btnWa: "Nhắn tin qua WhatsApp",
    relatedLabel: "Xem thêm",
    governingLangNote: "Chính sách này có bản tiếng Indonesia và tiếng Anh. Nếu có sự khác biệt trong cách hiểu, bản tiếng Indonesia sẽ được áp dụng.",
  },
  th: {
    title: "นโยบายความเป็นส่วนตัว",
    subtitle: "เราเก็บรวบรวม ใช้ และคุ้มครองข้อมูลส่วนบุคคลของคุณอย่างไร — ตามกฎหมายคุ้มครองข้อมูลส่วนบุคคลของอินโดนีเซีย (UU PDP ฉบับที่ 27/2022) โดยจัดโครงสร้างตามมาตรฐานสากล (GDPR)",
    updatedLabel: "อัปเดตล่าสุด",
    effectiveLabel: "มีผลบังคับใช้",
    versionLabel: "รุ่น",
    tocTitle: "สารบัญ",
    langNotice: "นโยบายนี้ยังไม่มีในภาษาของคุณ ขณะนี้คุณกำลังอ่านเวอร์ชัน {lang} ซึ่งเป็นเวอร์ชันภาษาอินโดนีเซียที่มีผลผูกพันอย่างเป็นทางการ",
    breadcrumbHome: "หน้าแรก",
    breadcrumbPrivacy: "นโยบายความเป็นส่วนตัว",
    contactTitle: "ยังมีข้อสงสัยเกี่ยวกับข้อมูลของคุณหรือไม่?",
    contactSub: "ทีมคุ้มครองข้อมูลของเราพร้อมช่วยเรื่องคำขอเข้าถึง แก้ไข ลบ หรือคัดค้าน — เราตอบกลับภายใน 14 วันทำการ",
    btnEmail: "ส่งอีเมลถึงทีมความเป็นส่วนตัว",
    btnWa: "ทักเราทาง WhatsApp",
    relatedLabel: "ดูเพิ่มเติม",
    governingLangNote: "นโยบายนี้มีทั้งเวอร์ชันภาษาอินโดนีเซียและภาษาอังกฤษ หากมีความคลาดเคลื่อนในการตีความ ให้ใช้เวอร์ชันภาษาอินโดนีเซีย",
  },
  tl: {
    title: "Patakaran sa Privacy",
    subtitle: "Kung paano namin kinokolekta, ginagamit, at pinoprotektahan ang iyong personal na data — alinsunod sa Indonesian Data Protection Law (UU PDP, Batas Blg. 27/2022), na nakaayos ayon sa pandaigdigang pamantayan (GDPR).",
    updatedLabel: "Huling pag-update",
    effectiveLabel: "Epektibo mula",
    versionLabel: "Bersyon",
    tocTitle: "Nilalaman",
    langNotice: "Wala pa sa iyong wika ang patakarang ito. Kasalukuyan mong binabasa ang bersyon sa {lang} — ang opisyal na bersyon sa Indonesian na siyang may bisa.",
    breadcrumbHome: "Home",
    breadcrumbPrivacy: "Patakaran sa Privacy",
    contactTitle: "May tanong ka pa ba tungkol sa iyong data?",
    contactSub: "Handang tumulong ang data protection team namin sa mga kahilingan ng access, rectification, erasure, o objection — sumasagot kami sa loob ng 14 na araw ng trabaho.",
    btnEmail: "I-email ang Privacy Team",
    btnWa: "I-message kami sa WhatsApp",
    relatedLabel: "Tingnan din",
    governingLangNote: "Available ang patakarang ito sa Indonesian at English. Kung magkaiba ang pagpapaliwanag, ang bersyon sa Indonesian ang mananaig.",
  },
  ms: {
    title: "Polisi Privasi",
    subtitle: "Bagaimana kami mengumpul, menggunakan dan melindungi data peribadi anda — selaras dengan Undang-Undang Perlindungan Data Peribadi Indonesia (UU PDP No. 27/2022), distrukturkan mengikut piawaian antarabangsa (GDPR).",
    updatedLabel: "Kemas kini terakhir",
    effectiveLabel: "Berkuat kuasa",
    versionLabel: "Versi",
    tocTitle: "Isi kandungan",
    langNotice: "Polisi ini belum tersedia dalam bahasa anda. Anda sedang membaca versi {lang} — versi Bahasa Indonesia yang menjadi rujukan rasmi.",
    breadcrumbHome: "Utama",
    breadcrumbPrivacy: "Polisi Privasi",
    contactTitle: "Masih ada soalan tentang data anda?",
    contactSub: "Pasukan perlindungan data kami sedia membantu permintaan akses, pembetulan, pemadaman atau bantahan — respons dalam masa 14 hari bekerja.",
    btnEmail: "E-mel Pasukan Privasi",
    btnWa: "WhatsApp Kami",
    relatedLabel: "Lihat juga",
    governingLangNote: "Polisi ini tersedia dalam Bahasa Indonesia dan English. Sekiranya terdapat percanggahan tafsiran, versi Bahasa Indonesia yang terpakai.",
  },
  hi: {
    title: "गोपनीयता नीति",
    subtitle: "हम आपके व्यक्तिगत डेटा को कैसे एकत्र करते, उपयोग करते और सुरक्षित रखते हैं — इंडोनेशिया के डेटा संरक्षण कानून (UU PDP, कानून सं. 27/2022) के अनुसार, अंतरराष्ट्रीय मानक (GDPR) संरचना में।",
    updatedLabel: "अंतिम अपडेट",
    effectiveLabel: "प्रभावी दिनांक",
    versionLabel: "संस्करण",
    tocTitle: "विषय-सूची",
    langNotice: "यह नीति अभी आपकी भाषा में उपलब्ध नहीं है। आप {lang} संस्करण पढ़ रहे हैं — आधिकारिक इंडोनेशियाई संस्करण जो मान्य है।",
    breadcrumbHome: "होम",
    breadcrumbPrivacy: "गोपनीयता नीति",
    contactTitle: "आपके डेटा को लेकर अभी भी प्रश्न हैं?",
    contactSub: "हमारी डेटा संरक्षण टीम एक्सेस, सुधार, हटाने या आपत्ति के अनुरोधों में सहायता करती है — 14 कार्य-दिवसों के भीतर उत्तर देती है।",
    btnEmail: "गोपनीयता टीम को ईमेल करें",
    btnWa: "WhatsApp पर संपर्क करें",
    relatedLabel: "यह भी देखें",
    governingLangNote: "यह नीति इंडोनेशियाई और अंग्रेज़ी में उपलब्ध है। व्याख्या में अंतर होने पर इंडोनेशियाई संस्करण मान्य होगा।",
  },
  ta: {
    title: "தனியுரிமைக் கொள்கை",
    subtitle: "உங்கள் தனிப்பட்ட தரவை நாங்கள் எவ்வாறு சேகரித்து, பயன்படுத்தி, பாதுகாக்கிறோம் — இந்தோனேசிய தரவுப் பாதுகாப்புச் சட்டம் (UU PDP, 27/2022) படி, சர்வதேச தரத்தில் (GDPR) அமைக்கப்பட்டது.",
    updatedLabel: "கடைசியாக புதுப்பிக்கப்பட்டது",
    effectiveLabel: "நடைமுறை நாள்",
    versionLabel: "பதிப்பு",
    tocTitle: "உள்ளடக்கம்",
    langNotice: "இந்தக் கொள்கை இன்னும் உங்கள் மொழியில் இல்லை. நீங்கள் படிப்பது {lang} பதிப்பு — அதிகாரப்பூர்வமான இந்தோனேசிய மொழிப் பதிப்பு.",
    breadcrumbHome: "முகப்பு",
    breadcrumbPrivacy: "தனியுரிமைக் கொள்கை",
    contactTitle: "உங்கள் தரவு குறித்து இன்னும் கேள்விகள் உள்ளதா?",
    contactSub: "அணுகல், திருத்தம், நீக்கம் அல்லது எதிர்ப்பு கோரிக்கைகளுக்கு எங்கள் தரவுப் பாதுகாப்பு குழு உதவும் — 14 வேலை நாட்களுக்குள் பதில் அளிப்போம்.",
    btnEmail: "தனியுரிமை குழுவுக்கு மின்னஞ்சல்",
    btnWa: "WhatsApp இல் தொடர்பு",
    relatedLabel: "மேலும் பார்க்க",
    governingLangNote: "இந்தக் கொள்கை இந்தோனேசிய மற்றும் ஆங்கில மொழிகளில் உள்ளது. விளக்கத்தில் வேறுபாடு இருந்தால் இந்தோனேசிய பதிப்பே நிலுவையில் இருக்கும்.",
  },
  bn: {
    title: "গোপনীয়তা নীতি",
    subtitle: "আমরা আপনার ব্যক্তিগত ডেটা কীভাবে সংগ্রহ, ব্যবহার ও সুরক্ষা করি — ইন্দোনেশিয়ার ডেটা সুরক্ষা আইন (UU PDP, ২৭/২০২২) অনুসারে, আন্তর্জাতিক মানদণ্ডে (GDPR) সাজানো।",
    updatedLabel: "সর্বশেষ হালনাগাদ",
    effectiveLabel: "কার্যকর তারিখ",
    versionLabel: "সংস্করণ",
    tocTitle: "সূচিপত্র",
    langNotice: "এই নীতিটি এখনো আপনার ভাষায় নেই। আপনি {lang} সংস্করণ পড়ছেন — আধিকারিক ইন্দোনেশিয়ান সংস্করণ যা প্রযোজ্য।",
    breadcrumbHome: "হোম",
    breadcrumbPrivacy: "গোপনীয়তা নীতি",
    contactTitle: "আপনার ডেটা নিয়ে এখনও প্রশ্ন আছে?",
    contactSub: "আমাদের ডেটা সুরক্ষা দল অ্যাক্সেস, সংশোধন, মুছে ফেলা বা আপত্তির অনুরোধে সহায়তা করে — ১৪ কর্মদিবসের মধ্যে উত্তর দেওয়া হয়।",
    btnEmail: "গোপনীয়তা দলকে ইমেইল করুন",
    btnWa: "WhatsApp-এ যোগাযোগ করুন",
    relatedLabel: "আরও দেখুন",
    governingLangNote: "এই নীতি ইন্দোনেশিয়ান ও ইংরেজিতে পাওয়া যায়। ব্যাখ্যায় অমিল হলে ইন্দোনেশিয়ান সংস্করণই প্রযোজ্য হবে।",
  },
  ar: {
    title: "سياسة الخصوصية",
    subtitle: "كيف نجمع بياناتك الشخصية ونستخدمها ونحميها — وفقاً لقانون حماية البيانات الشخصية الإندونيسي (UU PDP رقم 27/2022)، بهيكل يتماشى مع المعايير الدولية (اللائحة الأوروبية العامة لحماية البيانات GDPR).",
    updatedLabel: "آخر تحديث",
    effectiveLabel: "تاريخ النفاذ",
    versionLabel: "الإصدار",
    tocTitle: "المحتويات",
    langNotice: "هذه السياسة غير متوفرة بعد بلغتك. أنت تقرأ الآن إصدار {lang} — الإصدار الإندونيسي الرسمي المعتمد.",
    breadcrumbHome: "الرئيسية",
    breadcrumbPrivacy: "سياسة الخصوصية",
    contactTitle: "هل ما زال لديك سؤال حول بياناتك؟",
    contactSub: "فريق حماية البيانات لدينا مستعد للمساعدة في طلبات الوصول والتصحيح والحذف والاعتراض — ونرد خلال 14 يوم عمل.",
    btnEmail: "راسل فريق الخصوصية",
    btnWa: "تواصل عبر واتساب",
    relatedLabel: "انظر أيضاً",
    governingLangNote: "هذه السياسة متاحة باللغتين الإندونيسية والإنجليزية. وفي حال وجود اختلاف في التفسير، تُعتبر النسخة الإندونيسية هي المعتمدة.",
  },
  fa: {
    title: "سیاست حفظ حریم خصوصی",
    subtitle: "ما چگونه داده‌های شخصی شما را گردآوری، استفاده و محافظت می‌کنیم — مطابق قانون حفاظت از داده‌های شخصی اندونزی (UU PDP شماره 27/2022)، با ساختاری هم‌تراز با استانداردهای بین‌المللی (GDPR).",
    updatedLabel: "آخرین به‌روزرسانی",
    effectiveLabel: "تاریخ اجرا",
    versionLabel: "نسخه",
    tocTitle: "فهرست مطالب",
    langNotice: "این سیاست هنوز به زبان شما موجود نیست. در حال حاضر نسخه {lang} را می‌خوانید — نسخه رسمی اندونزیایی که معتبر است.",
    breadcrumbHome: "خانه",
    breadcrumbPrivacy: "سیاست حفظ حریم خصوصی",
    contactTitle: "هنوز درباره داده‌هایتان پرسشی دارید؟",
    contactSub: "تیم حفاظت از داده ما برای درخواست‌های دسترسی، اصلاح، حذف یا اعتراض آماده کمک است — پاسخ حداکثر ظرف ۱۴ روز کاری.",
    btnEmail: "ایمیل به تیم حریم خصوصی",
    btnWa: "گفتگو در واتس‌اپ",
    relatedLabel: "همچنین ببینید",
    governingLangNote: "این سیاست به زبان‌های اندونزیایی و انگلیسی ارائه شده است. در صورت تفاوت در تفسیر، نسخه اندونزیایی ملاک است.",
  },
  ur: {
    title: "پرائیویسی پالیسی",
    subtitle: "ہم آپ کے ذاتی ڈیٹا کو کیسے جمع، استعمال اور محفوظ رکھتے ہیں — انڈونیشیا کے ڈیٹا پروٹیکشن قانون (UU PDP، نمبر 27/2022) کے مطابق، بین الاقوامی معیار (GDPR) کے ڈھانچے کے ساتھ۔",
    updatedLabel: "آخری اپ ڈیٹ",
    effectiveLabel: "نفاذ کی تاریخ",
    versionLabel: "ورژن",
    tocTitle: "فہرست",
    langNotice: "یہ پالیسی ابھی آپ کی زبان میں دستیاب نہیں ہے۔ آپ {lang} ورژن پڑھ رہے ہیں — باضابطہ انڈونیشیائی ورژن جو نافذ العمل ہے۔",
    breadcrumbHome: "ہوم",
    breadcrumbPrivacy: "پرائیویسی پالیسی",
    contactTitle: "آپ کے ڈیٹا کے بارے میں ابھی بھی کوئی سوال ہے؟",
    contactSub: "ہماری ڈیٹا پروٹیکشن ٹیم رسائی، اصلاح، حذف یا اعتراض کی درخواستوں میں مدد کے لیے تیار ہے — 14 کاروباری دنوں کے اندر جواب دیتے ہیں۔",
    btnEmail: "پرائیویسی ٹیم کو ای میل کریں",
    btnWa: "واٹس ایپ پر رابطہ کریں",
    relatedLabel: "یہ بھی دیکھیں",
    governingLangNote: "یہ پالیسی انڈونیشیائی اور انگریزی میں دستیاب ہے۔ تشریح میں اختلاف کی صورت میں انڈونیشیائی ورژن ہی لاگو ہوگا۔",
  },
  he: {
    title: "מדיניות פרטיות",
    subtitle: "כיצד אנו אוספים, משתמשים ומגינים על הנתונים האישיים שלך — על פי חוק הגנת המידע האישי האינדונזי (UU PDP מס' 27/2022), במבנה התואם לתקנים הבינלאומיים (GDPR).",
    updatedLabel: "עודכן לאחרונה",
    effectiveLabel: "תאריך כניסה לתוקף",
    versionLabel: "גרסה",
    tocTitle: "תוכן עניינים",
    langNotice: "מדיניות זו עדיין אינה זמינה בשפה שלך. כרגע אתה קורא את גרסת {lang} — הגרסה הרשמית באינדונזית שהיא המחייבת.",
    breadcrumbHome: "דף הבית",
    breadcrumbPrivacy: "מדיניות פרטיות",
    contactTitle: "עדיין יש לך שאלה לגבי הנתונים שלך?",
    contactSub: "צוות הגנת המידע שלנו יסייע בבקשות גישה, תיקון, מחיקה או התנגדות — נענה תוך 14 ימי עסקים.",
    btnEmail: "שלחו מייל לצוות הפרטיות",
    btnWa: "צ'אט ב-WhatsApp",
    relatedLabel: "ראו גם",
    governingLangNote: "מדיניות זו זמינה באינדונזית ובאנגלית. במקרה של סתירה בפרשנות, הגרסה באינדונזית גוברת.",
  },
  es: {
    title: "Política de Privacidad",
    subtitle: "Cómo recopilamos, usamos y protegemos sus datos personales — conforme a la Ley de Protección de Datos Personales de Indonesia (UU PDP, Ley n.º 27/2022), con una estructura acorde a los estándares internacionales (RGPD).",
    updatedLabel: "Última actualización",
    effectiveLabel: "En vigor desde",
    versionLabel: "Versión",
    tocTitle: "Contenido",
    langNotice: "Esta política aún no está disponible en su idioma. Está leyendo la versión en {lang} — la versión oficial en indonesio que prevalece.",
    breadcrumbHome: "Inicio",
    breadcrumbPrivacy: "Política de Privacidad",
    contactTitle: "¿Aún tiene preguntas sobre sus datos?",
    contactSub: "Nuestro equipo de protección de datos le ayuda con solicitudes de acceso, rectificación, supresión u oposición — respondemos en un plazo de 14 días hábiles.",
    btnEmail: "Escribir al equipo de privacidad",
    btnWa: "Contactar por WhatsApp",
    relatedLabel: "Vea también",
    governingLangNote: "Esta política está disponible en indonesio e inglés. En caso de discrepancia en la interpretación, prevalece la versión en indonesio.",
  },
  fr: {
    title: "Politique de confidentialité",
    subtitle: "Comment nous collectons, utilisons et protégeons vos données personnelles — conformément à la loi indonésienne sur la protection des données (UU PDP n° 27/2022), avec une structure alignée sur les normes internationales (RGPD).",
    updatedLabel: "Dernière mise à jour",
    effectiveLabel: "En vigueur depuis",
    versionLabel: "Version",
    tocTitle: "Sommaire",
    langNotice: "Cette politique n'est pas encore disponible dans votre langue. Vous consultez la version {lang} — la version officielle en indonésien, qui fait foi.",
    breadcrumbHome: "Accueil",
    breadcrumbPrivacy: "Politique de confidentialité",
    contactTitle: "Une question sur vos données ?",
    contactSub: "Notre équipe protection des données accompagne les demandes d'accès, de rectification, d'effacement ou d'opposition — réponse sous 14 jours ouvrés.",
    btnEmail: "Écrire à l'équipe privacité",
    btnWa: "Nous contacter sur WhatsApp",
    relatedLabel: "À voir aussi",
    governingLangNote: "Cette politique est disponible en indonésien et en anglais. En cas de divergence d'interprétation, la version indonésienne prévaut.",
  },
  de: {
    title: "Datenschutzerklärung",
    subtitle: "Wie wir Ihre personenbezogenen Daten erheben, verwenden und schützen — nach dem indonesischen Datenschutzgesetz (UU PDP, Gesetz Nr. 27/2022), strukturiert nach internationalen Standards (DSGVO).",
    updatedLabel: "Zuletzt aktualisiert",
    effectiveLabel: "Gültig ab",
    versionLabel: "Version",
    tocTitle: "Inhalt",
    langNotice: "Diese Richtlinie ist noch nicht in Ihrer Sprache verfügbar. Sie lesen die {lang}-Version — die offizielle indonesische Fassung, die maßgeblich ist.",
    breadcrumbHome: "Startseite",
    breadcrumbPrivacy: "Datenschutzerklärung",
    contactTitle: "Noch Fragen zu Ihren Daten?",
    contactSub: "Unser Datenschutz-Team hilft bei Auskunfts-, Berichtigungs-, Lösch- und Widerspruchsanfragen — Antwort innerhalb von 14 Werktagen.",
    btnEmail: "E-Mail an das Datenschutz-Team",
    btnWa: "Per WhatsApp kontaktieren",
    relatedLabel: "Siehe auch",
    governingLangNote: "Diese Richtlinie liegt auf Indonesisch und Englisch vor. Bei Abweichungen in der Auslegung ist die indonesische Fassung maßgeblich.",
  },
  it: {
    title: "Informativa sulla privacy",
    subtitle: "Come raccogliamo, utilizziamo e proteggiamo i tuoi dati personali — ai sensi della legge indonesiana sulla protezione dei dati (UU PDP, Legge n. 27/2022), con una struttura conforme agli standard internazionali (GDPR).",
    updatedLabel: "Ultimo aggiornamento",
    effectiveLabel: "In vigore dal",
    versionLabel: "Versione",
    tocTitle: "Indice",
    langNotice: "Questa informativa non è ancora disponibile nella tua lingua. Stai leggendo la versione in {lang} — la versione ufficiale in indonesiano, che fa fede.",
    breadcrumbHome: "Home",
    breadcrumbPrivacy: "Informativa sulla privacy",
    contactTitle: "Hai ancora domande sui tuoi dati?",
    contactSub: "Il nostro team di protezione dei dati supporta le richieste di accesso, rettifica, cancellazione o opposizione — rispondiamo entro 14 giorni lavorativi.",
    btnEmail: "Scrivi al team privacy",
    btnWa: "Contattaci su WhatsApp",
    relatedLabel: "Vedi anche",
    governingLangNote: "Questa informativa è disponibile in indonesiano e inglese. In caso di divergenze interpretative, prevale la versione in indonesiano.",
  },
  nl: {
    title: "Privacybeleid",
    subtitle: "Hoe wij uw persoonsgegevens verzamelen, gebruiken en beschermen — overeenkomstig de Indonesische Wet bescherming persoonsgegevens (UU PDP nr. 27/2022), gestructureerd volgens internationale normen (GDPR).",
    updatedLabel: "Laatst bijgewerkt",
    effectiveLabel: "Van kracht sinds",
    versionLabel: "Versie",
    tocTitle: "Inhoud",
    langNotice: "Dit beleid is nog niet beschikbaar in uw taal. U leest de {lang}-versie — de officiële Indonesische versie die leidend is.",
    breadcrumbHome: "Home",
    breadcrumbPrivacy: "Privacybeleid",
    contactTitle: "Nog vragen over uw gegevens?",
    contactSub: "Ons gegevensbeschermingsteam helpt bij verzoeken tot inzage, rectificatie, verwijdering of bezwaar — reactie binnen 14 werkdagen.",
    btnEmail: "E-mail het privacyteam",
    btnWa: "WhatsApp ons",
    relatedLabel: "Zie ook",
    governingLangNote: "Dit beleid is beschikbaar in het Indonesisch en Engels. Bij een verschil in uitleg is de Indonesische versie leidend.",
  },
  pt: {
    title: "Política de Privacidade",
    subtitle: "Como coletamos, usamos e protegemos seus dados pessoais — conforme a Lei de Proteção de Dados Pessoais da Indonésia (UU PDP, Lei nº 27/2022), com estrutura alinhada aos padrões internacionais (RGPD/GDPR).",
    updatedLabel: "Última atualização",
    effectiveLabel: "Vigente a partir de",
    versionLabel: "Versão",
    tocTitle: "Nesta página",
    langNotice: "Esta política ainda não está disponível no seu idioma. Você está lendo a versão em {lang} — a versão oficial em indonésio, que prevalece.",
    breadcrumbHome: "Início",
    breadcrumbPrivacy: "Política de Privacidade",
    contactTitle: "Ainda tem dúvidas sobre seus dados?",
    contactSub: "Nossa equipe de proteção de dados atende pedidos de acesso, correção, exclusão ou oposição — resposta em até 14 dias úteis.",
    btnEmail: "Escrever para a equipe de privacidade",
    btnWa: "Fale conosco no WhatsApp",
    relatedLabel: "Veja também",
    governingLangNote: "Esta política está disponível em indonésio e inglês. Em caso de divergência de interpretação, prevalece a versão em indonésio.",
  },
  el: {
    title: "Πολιτική Απορρήτου",
    subtitle: "Πώς συλλέγουμε, χρησιμοποιούμε και προστατεύουμε τα προσωπικά σας δεδομένα — σύμφωνα με τον ινδονησιακό νόμο για την προστασία δεδομένων προσωπικού χαρακτήρα (UU PDP, Ν. 27/2022), με δομή ευθυγραμμισμένη με τον GDPR.",
    updatedLabel: "Τελευταία ενημέρωση",
    effectiveLabel: "Ισχύς από",
    versionLabel: "Έκδοση",
    tocTitle: "Περιεχόμενα",
    langNotice: "Αυτή η πολιτική δεν είναι ακόμη διαθέσιμη στη γλώσσα σας. Διαβάζετε την έκδοση {lang} — την επίσημη ινδονησιακή έκδοση που υπερισχύει.",
    breadcrumbHome: "Αρχική",
    breadcrumbPrivacy: "Πολιτική Απορρήτου",
    contactTitle: "Έχετε ακόμη ερωτήσεις για τα δεδομένα σας;",
    contactSub: "Η ομάδα προστασίας δεδομένων μας υποστηρίζει αιτήματα πρόσβασης, διόρθωσης, διαγραφής ή αντίρρησης — απάντηση εντός 14 εργάσιμων ημερών.",
    btnEmail: "Email στην ομάδα απορρήτου",
    btnWa: "Επικοινωνία μέσω WhatsApp",
    relatedLabel: "Δείτε επίσης",
    governingLangNote: "Η πολιτική αυτή είναι διαθέσιμη στα ινδονησιακά και τα αγγλικά. Σε περίπτωση διαφωνίας ερμηνείας, υπερισχύει η ινδονησιακή έκδοση.",
  },
  ru: {
    title: "Политика конфиденциальности",
    subtitle: "Как мы собираем, используем и защищаем ваши персональные данные — в соответствии с индонезийским законом о защите персональных данных (UU PDP № 27/2022), со структурой по международным стандартам (GDPR).",
    updatedLabel: "Последнее обновление",
    effectiveLabel: "Вступает в силу",
    versionLabel: "Версия",
    tocTitle: "Содержание",
    langNotice: "Эта политика пока недоступна на вашем языке. Вы читаете версию на {lang} — официальную индонезийскую версию, которая имеет преимущественную силу.",
    breadcrumbHome: "Главная",
    breadcrumbPrivacy: "Политика конфиденциальности",
    contactTitle: "Остались вопросы о ваших данных?",
    contactSub: "Наша команда защиты данных помогает с запросами на доступ, исправление, удаление или возражение — ответ в течение 14 рабочих дней.",
    btnEmail: "Написать команде приватности",
    btnWa: "Написать в WhatsApp",
    relatedLabel: "Смотрите также",
    governingLangNote: "Политика доступна на индонезийском и английском языках. При расхождении в толковании преимущественную силу имеет индонезийская версия.",
  },
  pl: {
    title: "Polityka prywatności",
    subtitle: "Jak zbieramy, wykorzystujemy i chronimy Twoje dane osobowe — zgodnie z indonezyjską ustawą o ochronie danych osobowych (UU PDP nr 27/2022), w strukturze zgodnej ze standardami międzynarodowymi (RODO).",
    updatedLabel: "Ostatnia aktualizacja",
    effectiveLabel: "Obowiązuje od",
    versionLabel: "Wersja",
    tocTitle: "Spis treści",
    langNotice: "Ta polityka nie jest jeszcze dostępna w Twoim języku. Czytasz wersję {lang} — oficjalną wersję indonezyjską, która ma pierwszeństwo.",
    breadcrumbHome: "Strona główna",
    breadcrumbPrivacy: "Polityka prywatności",
    contactTitle: "Masz jeszcze pytania dotyczące swoich danych?",
    contactSub: "Nasz zespół ochrony danych pomoże w żądaniach dostępu, sprostowania, usunięcia lub sprzeciwu — odpowiadamy w ciągu 14 dni roboczych.",
    btnEmail: "Napisz do zespołu prywatności",
    btnWa: "Napisz na WhatsApp",
    relatedLabel: "Zobacz także",
    governingLangNote: "Polityka dostępna jest w języku indonezyjskim i angielskim. W razie rozbieżności interpretacyjnych pierwszeństwo ma wersja indonezyjska.",
  },
  uk: {
    title: "Політика конфіденційності",
    subtitle: "Як ми збираємо, використовуємо та захищаємо ваші персональні дані — відповідно до індонезійського закону про захист персональних даних (UU PDP № 27/2022), зі структурою за міжнародними стандартами (GDPR).",
    updatedLabel: "Останнє оновлення",
    effectiveLabel: "Набуває чинності",
    versionLabel: "Версія",
    tocTitle: "Зміст",
    langNotice: "Ця політика ще не доступна вашою мовою. Ви читаєте версію {lang} — офіційну індонезійську версію, яка є визначальною.",
    breadcrumbHome: "Головна",
    breadcrumbPrivacy: "Політика конфіденційності",
    contactTitle: "Ще маєте запитання щодо ваших даних?",
    contactSub: "Наша команда захисту даних допоможе із запитами на доступ, виправлення, видалення чи заперечення — відповідь протягом 14 робочих днів.",
    btnEmail: "Написати команді приватності",
    btnWa: "Написати у WhatsApp",
    relatedLabel: "Дивіться також",
    governingLangNote: "Політика доступна індонезійською та англійською мовами. У разі розбіжностей у тлумаченні перевагу має індонезійська версія.",
  },
  tr: {
    title: "Gizlilik Politikası",
    subtitle: "Kişisel verilerinizi nasıl topluyor, kullanıyor ve koruyoruz — Endonezya Kişisel Verileri Koruma Kanunu (UU PDP No. 27/2022) uyarınca, uluslararası standartlara (GDPR) uygun yapıda.",
    updatedLabel: "Son güncelleme",
    effectiveLabel: "Yürürlük tarihi",
    versionLabel: "Sürüm",
    tocTitle: "İçindekiler",
    langNotice: "Bu politika henüz dilinizde mevcut değil. Şu anda resmi Endonezce sürüm olan {lang} sürümünü okuyorsunuz.",
    breadcrumbHome: "Ana sayfa",
    breadcrumbPrivacy: "Gizlilik Politikası",
    contactTitle: "Verileriniz hakkında hâlâ sorunuz mu var?",
    contactSub: "Veri koruma ekibimiz erişim, düzeltme, silme veya itiraz taleplerinde yardımcı olur — 14 iş günü içinde yanıt veriyoruz.",
    btnEmail: "Gizlilik ekibine e-posta gönder",
    btnWa: "WhatsApp'tan yazın",
    relatedLabel: "Şunlara da göz atın",
    governingLangNote: "Bu politika Endonezce ve İngilizce olarak sunulmaktadır. Yorumda farklılık olması hâlinde Endonezce sürüm esas alınır.",
  },
  sw: {
    title: "Sera ya Faragha",
    subtitle: "Tunavyokusanya, kutumia na kulinda data yako ya kibinafsi — kwa mujibu wa Sheria ya Ulinzi wa Data Binafsi ya Indonesia (UU PDP Na. 27/2022), kwa muundo unaofuata viwango vya kimataifa (GDPR).",
    updatedLabel: "Imesasishwa mwisho",
    effectiveLabel: "Inaanza kutumika",
    versionLabel: "Toleo",
    tocTitle: "Yaliyomo",
    langNotice: "Sera hii bado haipatikani kwa lugha yako. Unasoma toleo la {lang} — toleo rasmi la Kiindonesia linalotawala.",
    breadcrumbHome: "Mwanzo",
    breadcrumbPrivacy: "Sera ya Faragha",
    contactTitle: "Je, bado una maswali kuhusu data yako?",
    contactSub: "Timu yetu ya ulinzi wa data iko tayari kusaidia maombi ya kufikia, kurekebisha, kufuta au kupinga — tunajibu ndani ya siku 14 za kazi.",
    btnEmail: "Tuma barua pepe kwa timu ya faragha",
    btnWa: "Tujulishe kwa WhatsApp",
    relatedLabel: "Angalia pia",
    governingLangNote: "Sera hii inapatikana kwa Kiindonesia na Kiingereza. Ikiwa kuna tofauti katika tafsiri, toleo la Kiindonesia ndilo litakalotumika.",
  },
  pa: {
    title: "ਪਰਦੇਦਾਰੀ ਨੀਤੀ",
    subtitle: "ਅਸੀਂ ਤੁਹਾਡਾ ਨਿੱਜੀ ਡਾਟਾ ਕਿਵੇਂ ਇਕੱਠਾ ਕਰਦੇ, ਵਰਤਦੇ ਅਤੇ ਸੁਰੱਖਿਅਤ ਰੱਖਦੇ ਹਾਂ — ਇੰਡੋਨੇਸ਼ੀਆ ਦੇ ਨਿੱਜੀ ਡਾਟਾ ਸੁਰੱਖਿਆ ਕਾਨੂੰਨ (UU PDP, ਨੰ. 27/2022) ਅਨੁਸਾਰ, ਅੰਤਰਰਾਸ਼ਟਰੀ ਮਿਆਰ (GDPR) ਢਾਂਚੇ ਨਾਲ।",
    updatedLabel: "ਆਖਰੀ ਅੱਪਡੇਟ",
    effectiveLabel: "ਲਾਗੂ ਤਾਰੀਖ਼",
    versionLabel: "ਸੰਸਕਰਣ",
    tocTitle: "ਵਿਸ਼ਾ-ਸੂਚੀ",
    langNotice: "ਇਹ ਨੀਤੀ ਹਾਲੇ ਤੁਹਾਡੀ ਭਾਸ਼ਾ ਵਿੱਚ ਉਪਲਬਧ ਨਹੀਂ ਹੈ। ਤੁਸੀਂ {lang} ਸੰਸਕਰਣ ਪੜ੍ਹ ਰਹੇ ਹੋ — ਅਧਿਕਾਰਤ ਇੰਡੋਨੇਸ਼ੀਆਈ ਸੰਸਕਰਣ ਜੋ ਮਾਨਤਾ ਰੱਖਦਾ ਹੈ।",
    breadcrumbHome: "ਮੁੱਖ ਪੰਨਾ",
    breadcrumbPrivacy: "ਪਰਦੇਦਾਰੀ ਨੀਤੀ",
    contactTitle: "ਤੁਹਾਡੇ ਡਾਟੇ ਬਾਰੇ ਹਾਲੇ ਵੀ ਕੋਈ ਸਵਾਲ ਹੈ?",
    contactSub: "ਸਾਡੀ ਡਾਟਾ ਸੁਰੱਖਿਆ ਟੀਮ ਪਹੁੰਚ, ਸੋਧ, ਮਿਟਾਉਣ ਜਾਂ ਇਤਰਾਜ਼ ਦੀਆਂ ਬੇਨਤੀਆਂ ਵਿੱਚ ਮਦਦ ਕਰਦੀ ਹੈ — 14 ਕੰਮਕਾਜੀ ਦਿਨਾਂ ਵਿੱਚ ਜਵਾਬ।",
    btnEmail: "ਪਰਦੇਦਾਰੀ ਟੀਮ ਨੂੰ ਈਮੇਲ ਕਰੋ",
    btnWa: "WhatsApp 'ਤੇ ਸੰਪਰਕ ਕਰੋ",
    relatedLabel: "ਇਹ ਵੀ ਵੇਖੋ",
    governingLangNote: "ਇਹ ਨੀਤੀ ਇੰਡੋਨੇਸ਼ੀਆਈ ਅਤੇ ਅੰਗਰੇਜ਼ੀ ਵਿੱਚ ਉਪਲਬਧ ਹੈ। ਵਿਆਖਿਆ ਵਿੱਚ ਅੰਤਰ ਹੋਣ 'ਤੇ ਇੰਡੋਨੇਸ਼ੀਆਈ ਸੰਸਕਰਣ ਹੀ ਮਾਨਤਾ ਰੱਖੇਗਾ।",
  },
  jv: {
    title: "Kebijakan Privasi",
    subtitle: "Kepriye carane kita ngumpulake, nggunakake, lan nglindhungi data pribadimu — miturut Undhang-Undhang Perlindungan Data Pribadi Indonesia (UU PDP No. 27/2022), kanthi struktur standar internasional (GDPR).",
    updatedLabel: "Dianyari pungkasan",
    effectiveLabel: "Berlaku wiwit",
    versionLabel: "Versi",
    tocTitle: "Isi",
    langNotice: "Kebijakan iki durung kasedhiya ing basamu. Saiki sampeyan maca versi {lang} — versi Basa Indonesia resmi sing dadi rujukan.",
    breadcrumbHome: "Kaca Ngarep",
    breadcrumbPrivacy: "Kebijakan Privasi",
    contactTitle: "Isih ana pitakon babagan datamu?",
    contactSub: "Tim perlindungan data kita siap nulungi panjalukan akses, mbenerake, mbusak, utawa nolak — respons maksimal 14 dina kerja.",
    btnEmail: "Email Tim Privasi",
    btnWa: "WhatsApp Kita",
    relatedLabel: "Deleng uga",
    governingLangNote: "Kebijakan iki kasedhiya ing Basa Indonesia lan Basa Inggris. Yen ana beda tafsir, versi Basa Indonesia sing ditindakake.",
  },
};

export const PRIVACY_UI: Record<LangCode, Partial<PrivacyUi>> = PRIVACY_UI_COMPLETE;

/** Ambil string UI dengan fallback: bahasa aktif -> en -> id -> nama key */
export function privacyUiT(lang: LangCode, key: keyof PrivacyUi): string {
  return (
    PRIVACY_UI[lang]?.[key] ??
    PRIVACY_UI.en?.[key] ??
    PRIVACY_UI.id?.[key] ??
    String(key)
  );
}

/** Bahasa konten yang ditampilkan: "en" hanya untuk lang "en", sisanya "id" */
export function privacyContentLang(lang: LangCode): PrivacyContentLang {
  return lang === "en" ? "en" : "id";
}

/** Nama native bahasa konten (untuk notice & label bahasa) */
export function privacyLangName(code: PrivacyContentLang): string {
  return code === "en" ? "English" : "Bahasa Indonesia";
}
