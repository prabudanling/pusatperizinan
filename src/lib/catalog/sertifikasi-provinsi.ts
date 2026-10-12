// ============================================================
// PUSATPERIZINAN.COM — SERTIFIKASI × 38 PROVINSI (Task 21)
// 43 sertifikasi × 38 provinsi = 1.634 halaman kombinasi
// + 38 hub "Konsultan Sertifikasi di {provinsi}" = 1.672 URL baru
// Konten per-provinsi UNIK: profil ekonomi × 6 sektor sertifikasi.
// Murni TS (tanpa DB/AI) → aman static export.
// ============================================================

import type { ServicePage, ServiceFaq } from "./types";
import { CATEGORY_META } from "./types";
import { PROVINCES } from "@/lib/coverage-data";
import { CERTS, type CertEntry, type CertGroup } from "./certifications";
import { slugify, parsePrice } from "./utils";

// ------------------------------------------------------------
// PROFIL PROVINSI — konteks unik per provinsi × kelompok sertifikasi
// ------------------------------------------------------------

export interface ProvCertProfile {
  /** Nama provinsi (harus urut & sinkron dengan PROVINCES di coverage-data) */
  name: string;
  /** 1 kalimat: penunjang ekonomi utama provinsi */
  economy: string;
  /** konteks travel ibadah haji-umrah (kelompok travel-ibadah) */
  travel: string;
  /** konteks pangan & halal (kelompok halal + pangan) */
  food: string;
  /** konteks industri & sistem manajemen (kelompok iso-manajemen) */
  industry: string;
  /** konteks laboratorium & kesehatan (kelompok lab-kesehatan) */
  health: string;
  /** konteks konstruksi & badan usaha (kelompok badan-usaha) */
  build: string;
}

/** Kalimat "onsite" per kelompok — bagian proses yang perlu datang ke lokasi */
const ONSITE_NOTE: Record<CertGroup, string> = {
  "travel-ibadah":
    "Verifikasi kantor atau pengecekan lapangan instansi haji-umrah (bila diperlukan) tim kami yang datang ke lokasi.",
  halal:
    "Audit kehalalan produk/proses di lokasi usaha dilakukan penguji lembaga sertifikasi — kami pandu persiapannya sampai lolos.",
  pangan:
    "Audit sistem keamanan pangan & sampling (bila ada) di lokasi usaha — kami siapkan seluruh bukti implementasinya lebih dulu.",
  "iso-manajemen":
    "Audit sertifikasi tahap 1 & 2 di lokasi usaha dilakukan auditor lembaga terakreditasi — kami yang memandu hari-H-nya.",
  "lab-kesehatan":
    "Penilaian & observasi teknis di lokasi (lab/fasilitas) dilakukan badan akreditasi — kami pandu dokumen dan praktiknya.",
  "badan-usaha":
    "Pengecekan instalasi/fasilitas atau verifikasi personel (bila disyaratkan) tim kami yang datang ke lokasi.",
};

export const PROV_CERT_PROFILES: ProvCertProfile[] = [
  // ===== SUMATERA =====
  {
    name: "Aceh",
    economy: "pemerintahan, agro (kopi Gayo & kakao), perikanan, dan migas menjadi penopang utama",
    travel: "Jamaah umrah dari Aceh tumbuh konsisten tahun demi tahun — Banda Aceh dan Lhokseumawe menjadi pusat travel ibadah lokal.",
    food: "Kuliner khas (kuah beulangong, kopi Gayo) plus kekhususan syariat menjadikan sertifikasi halal di Aceh kebanggaan, bukan sekadar kewajiban — pemerintah daerah pun memfasilitasi.",
    industry: "UMKM, koperasi, dan lembaga pendidikan kuat — pasangan ideal ISO 9001 (mutu) dan ISO 21001 (lembaga pendidikan).",
    health: "Dinas Kesehatan dan laboratorium provinsi aktif menstandarkan klinik; RS pusat menjadi rujukan yang makin menuntut akreditasi berbasis standar.",
    build: "Pembangunan kota & infrastruktur bergerak — kontraktor kecil-menengah butuh SBU dan SKTTK untuk masuk proyek daerah.",
  },
  {
    name: "Sumatera Utara",
    economy: "perkebunan raksasa (sawit, karet, teh), industri pangan, dan perdagangan Medan",
    travel: "Medan salah satu pasar jamaah terbesar di Sumatera — puluhan PPIU beroperasi dan persaingan menuntut legalitas makin rapi.",
    food: "Industri mi, bumbu, seafood, dan UMKM kuliner padat — sertifikasi halal, SPP-IRT, dan HACCP tumbuh paling cepat di sini.",
    industry: "Manufaktur & agroindustri besar memakai ISO 9001, 14001, dan 45001 sebagai standar akses pasar dan mitigasi risiko lingkungan.",
    health: "RS rujukan dan laboratorium besar — akreditasi ISO 15189 & 17025 menjaga kredibilitas hasil uji di mata BPOM dan mitra global.",
    build: "Konstruksi Medan dan kawasan industri Sei Mangkei membeludak — SBU LPJK dan SKTTK jadi tiket masuk tender.",
  },
  {
    name: "Sumatera Barat",
    economy: "pariwisata, rantai kuliner nusantara (restoran Padang), dan UMKM kerajinan",
    travel: "Travel umrah Padang dan Bukittinggi beroperasi sejak lama — pasar jamaah yang rajin dan tahu membedakan yang legal.",
    food: "Rantai restoran Padang menembus nasional dan ekspor — sertifikasi halal dan ISO 22000 menjadi tiket masuk pasar modern & ritel besar.",
    industry: "UMKM dan jasa dominan — ISO 9001 jadi alat naik kelas: menang lelang, memasok korporasi, dan membuka cabang baru dengan sistem.",
    health: "Klinik dan lab kesehatan berkembang di Padang & Bukittinggi; wisata kesehatan menuntut standar mutu yang terbukti.",
    build: "Properti Padang & Bukittinggi tumbuh — PBG, SLF, dan SBU ramai diurus seiring ekspansi hotel dan perumahan.",
  },
  {
    name: "Riau",
    economy: "migas, sawit, pulp & paper, serta industri energi",
    travel: "Pekanbaru dan Dumai menjadi jendela jamaah Riau — travel ibadah berkembang di sela ekonomi korporasi.",
    food: "Agroindustri sawit dan pangan olahan — HACCP dan ISO 22000 dipakai memenuhi syarat pasar ekspor CPO turunannya & olahan.",
    industry: "Korporasi besar memeluk ISO 14001 & 45001 untuk kepatuhan lingkungan-K3, plus ISO 37001 (anti-suap) yang makin dituntut di procurement migas & sawit.",
    health: "Klinik industri migas dan RS Dumai/Pekanbaru — standar keselamatan & mutu layanan jadi prasyarat kerja sama perusahaan energi.",
    build: "Kontraktor migas dan infrastruktur — SBU LPJK, SKTTK, dan BNSP wajib untuk mengikuti tender pemegang kuasa blok.",
  },
  {
    name: "Kepulauan Riau",
    economy: "manufaktur Batam (elektronik, galangan), wisata, dan kawasan ekonomi khusus",
    travel: "Travel umrah Batam tumbuh cepat — jamaah lokal plus peluang pasar lintas Singapura-Malaysia.",
    food: "F&B kawasan industri dan hotel wisata — sertifikasi halal dan HACCP menjadi syarat memasok katering pabrik & hotel.",
    industry: "Pabrik multinasional berISO 9001/14001/45001; gelombang data center Batam menjadikan ISO 27001 & 27701 paling dicari.",
    health: "Klinik perusahaan dan lab medis industri — keandalan hasil uji dirawat lewat sistem mutu terstandar.",
    build: "Galangan dan properti industri — SBU, SKTTK, dan SLO kelistrikan jadi paket wajib pemilik fasilitas.",
  },
  {
    name: "Jambi",
    economy: "sawit, batubara, karet, dan agroindustri",
    travel: "Travel umrah Jambi membesar — kelas menengah baru tumbuh dari ekonomi komoditas.",
    food: "Pangan lokal & olahan — SPP-IRT dan sertifikasi halal menjadi pintu masuk UMKM ke ritel modern dan marketplace.",
    industry: "Tambang & sawit mengadopsi ISO 14001/45001; adopsi ISO 26000 (tanggung jawab sosial) dipakai memperkuat program CSR.",
    health: "RS dan lab provinsi — standar mutu menopang layanan kesehatan kawasan tambang.",
    build: "Infrastruktur dan jalan tambang — SBU LPJK syaratnya kontraktor daerah.",
  },
  {
    name: "Sumatera Selatan",
    economy: "batubara, karet, dan industri F&B Palembang",
    travel: "Palembang pasar jamaah besar di Sumatera — travel ibadah tumbuh bersama kelas menengah perkotaan.",
    food: "Pempek dan pangan olahan masif — SPP-IRT, halal, dan HACCP untuk ekspor frozen food jadi progres wajar bagi pelaku usaha.",
    industry: "Energi & konstruksi — ISO 45001 dan 9001 menopang keselamatan proyek dan mutu kerja.",
    health: "RSUD dan lab kesehatan — akreditasi sistem mutu menaikkan daya saing layanan.",
    build: "Konstruksi Palembang pasca-event internasional — SBU dan SKTTK laris dikalangan kontraktor lokal.",
  },
  {
    name: "Kepulauan Bangka Belitung",
    economy: "timah, perikanan, dan wisata bahari",
    travel: "Jamaah umrah dari Pangkalpinang tumbuh — pasar kecil tapi loyal.",
    food: "Olahan ikan & kerupuk — PIRT dan halal membuka pasar regional & online.",
    industry: "Pertambangan timah menuntut ISO 45001 & 14001 ketat — keselamatan tambang dan pengelolaan dampak lingkungan disorot regulator.",
    health: "Klinik tambang dan RS — standar kesehatan kerja jadi kebutuhan nyata pemilik tambang dan vendor.",
    build: "Reklamasi & konstruksi — SBU dan sertifikasi personel menopang proyek pasca-tambang.",
  },
  {
    name: "Bengkulu",
    economy: "perikanan, kopi, dan UMKM",
    travel: "Travel ibadah kecil tapi tumbuh — peluang pasar jamaah belum padat pesaing.",
    food: "Olahan ikan & kopi — sertifikasi produk (halal, PIRT) menjadi gerbang ekspor dan ritel modern.",
    industry: "UMKM — ISO 9001 membantu naik kelas: sistem kerja tertib, kualitas konsisten, siap memasok jaringan distributor.",
    health: "Lab provinsi dan klinik — mutu layanan dijaga lewat standar terukur.",
    build: "Infrastruktur daerah — SBU untuk kontraktor kecil-menengah.",
  },
  {
    name: "Lampung",
    economy: "sawit, kopi, tapioka, dan pelabuhan (KEK tanjung api-api)",
    travel: "Travel umrah Bandar Lampung berkembang — akses pelabuhan memudahkan koneksi jamaah.",
    food: "Tapioka dan industri pangan ekspor — HACCP, FSSC 22000, dan ISO 22000 dipakai memenuhi syarat pembeli global.",
    industry: "Agroindustri — ISO 14001 & 45001 menopang kepatuhan lingkungan dan keselamatan pabrik.",
    health: "Lab & klinik industri — standar mutu menopang rantai pasok pangan.",
    build: "Infrastruktur pelabuhan & tol — SBU LPJK dan SKTTK dipakai kontraktor nasional & lokal.",
  },
  // ===== JAWA =====
  {
    name: "DKI Jakarta",
    economy: "pusat ekonomi nasional — kantor pusat korporasi, jasa keuangan, teknologi, dan perdagangan",
    travel: "Kantor pusat mayoritas PPIU & PIHK nasional ada di Jakarta — regulasi terkini (PMHU 2/2026) paling cepat dipelajari di sini.",
    food: "Rantai F&B korporat, food court, dan hotel — sertifikasi halal & ISO 22000 jadi standar ekspansi ke ritel dan marketplace.",
    industry: "Kantor pusat memakai ISO 9001, 27001, 37001, dan 22301 sebagai bahasa tender, keamanan data, dan kepercayaan investor.",
    health: "RS top dan lab terakreditasi nasional — ISO 15189 & 17025 menjaga kredibilitas hasil di mata BPOM, LPJK, dan mitra global.",
    build: "Kontraktor besar, properti, dan fasilitas — SBU, SLO, dan SLF adalah paket kepatuhan harian SCBD hingga industri pinggir kota.",
  },
  {
    name: "Jawa Barat",
    economy: "basis manufaktur terbesar nasional (Bekasi-Karawang: otomotif & elektronik), UMKM kuliner, dan tekstil",
    travel: "Bandung, Bogor, dan Bekasi — pasar jamaah terbesar kedua; persaingan travel ibadah paling sengit, legalitas jadi pembeda.",
    food: "Industri pangan besar & UMKM — halal, SPP-IRT, dan HACCP memungkinkan masuk jaringan ritel modern & ekspor.",
    industry: "Pabrik ekspor berISO 9001/14001/45001; vendor otomotif mengejar IATF 16949; pabrik teknologi mengejar ISO 27001.",
    health: "RS dan lab banyak — akreditasi sistem mutu menentukan kerja sama dengan BPJS, asuransi, dan klien industri.",
    build: "Konstruksi & SBU padat — proyek infrastruktur dan properti menuntut SKTTK serta sertifikasi personel BNSP.",
  },
  {
    name: "Jawa Tengah",
    economy: "tekstil, kerajinan (Jepara), industri pangan, dan logistik Semarang",
    travel: "Semarang dan Solo — jamaah kuat dengan kultur santri; travel ibadah tumbuh di seluruh kota besar provinsi.",
    food: "UMKM & industri kecil-menengah — SPP-IRT dan halal membuka pintu pasar; ekspor furnitur & tekstil menuntut sistem mutu.",
    industry: "Manufaktur & furnitur ekspor — ISO 9001 dan 14001 menjadi syarat buyer Eropa & Amerika.",
    health: "Lab & RS — ISO 15189/17025 menjaga kualitas hasil uji kesehatan daerah.",
    build: "Properti & konstruksi — SBU untuk kontraktor menengah; SLF untuk gedung komersial.",
  },
  {
    name: "DI Yogyakarta",
    economy: "pendidikan, pariwisata, ekonomi kreatif, dan elektronika",
    travel: "Jamaah santri & keluarga — travel umrah Yogyakarta kuat; khalayak cerdas menuntut transparansi legalitas penuh.",
    food: "Kuliner wisata & UMKM — halal menjadi kepercayaan utama pelancong Muslim domestik.",
    industry: "Lembaga pendidikan berISO 21001; ekonomi kreatif & startup berISO 9001 — bahkan BUMD pun menuntut standar.",
    health: "Kampus kesehatan & lab — akreditasi sistem mutu menopang riset dan layanan.",
    build: "Properti wisata — SLF dan SLO melengkapi pengelolaan hotel & vila.",
  },
  {
    name: "Jawa Timur",
    economy: "industri terbesar kedua — Surabaya (logistik, pangan, galangan) plus UMKM masif",
    travel: "Surabaya dan Gresik salah satu pasar jamaah terbesar Indonesia — PPIU tua dan baru berebut kepercayaan.",
    food: "Pangan olahan & ekspor — ISO 22000, HACCP, dan GMP/CPPOB dipakai pabrik besar dan UMKM ekspor.",
    industry: "Manufaktur & logistik — ISO 9001, 28000 (keamanan rantai pasok), dan 45001 menopang kerja sama korporasi.",
    health: "RS & lab besar — akreditasi dan sistem mutu menentukan reputasi layanan di timur Jawa.",
    build: "Kontraktor nasional — SBU LPJK, SKTTK, dan SLO fasilitas industri jadi rutinitas.",
  },
  {
    name: "Banten",
    economy: "industri berat Cilegon (baja, petrokimia) dan manufaktur Tangerang",
    travel: "Tangerang & Serang — jamaah padat dekat ibu kota; travel ibadah tumbuh mengikuti kawasan hunian baru.",
    food: "F&B kawasan industri — halal dan HACCP untuk katering pabrik serta ritel.",
    industry: "Industri berat memeluk ISO 45001, 14001, dan 50001 (energi) — keselamatan pabrik baja & petrokimia tak bisa ditawar.",
    health: "Klinik industri — standar kesehatan kerja jadi kepatuhan harian pabrik.",
    build: "Konstruksi berat — SBU kelas besar dan SKTTK personel menentukan kelayakan tender.",
  },
  {
    name: "Bali",
    economy: "pariwisata global — hotel, F&B, spa, dan MICE",
    travel: "Travel umrah Bali unik — paket umrah plus wisata jadi produk khas; khalayak Muslim lokal & transmigran tumbuh.",
    food: "F&B wisata internasional — sertifikasi halal, HACCP, dan GMP membuka pasar Muslim domestik & timur tengah.",
    industry: "Hospitality berISO 9001 & 22000; event besar (MICE) mengejar ISO 20121 — standar jadi pembeda di pasar global.",
    health: "Klinik wisata & RS — standar mutu layanan menopang reputasi destinasi kelas dunia.",
    build: "Properti hotel & vila — SLF, SLO, dan PBG padat diurus seiring siklus pembangunan wisata.",
  },
  // ===== BALI & NUSA TENGGARA =====
  {
    name: "Nusa Tenggara Barat",
    economy: "pariwisata Lombok, mutiara, dan UMKM",
    travel: "Jamaah Mataram tumbuh — komunitas Muslim kuat; travel ibadah lokal membesar di sela pariwisata.",
    food: "F&B wisata & olahan — halal dan PIRT membuka pasar hotel serta wisatawan.",
    industry: "UMKM & properti wisata — ISO 9001 menolong operator wisata memenangkan kerja sama OTA dan korporasi.",
    health: "Klinik wisata — standar layanan jadi pertimbangan turis & asuransi.",
    build: "Properti wisata & SLF hotel — pembangun vila butuh SBU kecil-menengah.",
  },
  {
    name: "Nusa Tenggara Timur",
    economy: "UMKM tenun, kopi, dan perikanan",
    travel: "Jamaah Kupang tumbuh — peluang travel ibadah masih terbuka lebar.",
    food: "Kopi & olahan ikan — sertifikasi produk (halal, PIRT) menjadi gerbang ekspor & ritel.",
    industry: "UMKM — ISO 9001 menaikkan kualitas konsisten; lab uji kopi mengejar ISO 17025.",
    health: "Lab kesehatan — standar mutu menopang layanan kepulauan.",
    build: "Infrastruktur — SBU untuk kontraktor daerah.",
  },
  // ===== KALIMANTAN =====
  {
    name: "Kalimantan Barat",
    economy: "karet, sawit, perikanan, dan perdagangan perbatasan",
    travel: "Jamaah Pontianak & Singkawang — komunitas Muslim tumbuh; travel ibadah membesar bertahap.",
    food: "Pangan olahan Pontianak & Singkawang — halal dan PIRT membuka pasar lintas provinsi.",
    industry: "Agro & tambang — ISO 14001/45001 menopang kepatuhan lingkungan & keselamatan kerja.",
    health: "Lab & RS — standar mutu layanan menopang kesehatan kawasan perkebunan.",
    build: "Konstruksi perbatasan & jalan lintas — SBU syaratnya kontraktor lokal.",
  },
  {
    name: "Kalimantan Tengah",
    economy: "sawit, tambang, dan kawasan hutan produksi",
    travel: "Jamaah Palangkaraya — pasar yang mulai terbentuk.",
    food: "Pangan lokal — PIRT dan halal untuk UMKM & katering.",
    industry: "Sawit — ISO 14001/45001 untuk kepatuhan; RSPO dipakai memenuhi syarat pasar ekspor.",
    health: "Klinik tambang — standar kesehatan kerja jadi kebutuhan perusahaan.",
    build: "Jalan & jembatan (tol trans-Kalimantan) — SBU LPJK dan SKTTK jadi tiket proyek.",
  },
  {
    name: "Kalimantan Selatan",
    economy: "batubara, logistik Banjarmasin, dan perdagangan sungai",
    travel: "Jamaah Banjarmasin kuat — kultur keagamaan kuat menjadikan travel ibadah pasar besar.",
    food: "F&B lokal — halal dan PIRT untuk UMKM dan ritel modern.",
    industry: "Energi & logistik — ISO 28000 (keamanan rantai pasok) dan 45001 menopang operasi tambang & bongkar muat.",
    health: "RS & lab — standar mutu menopang kesehatan pekerja tambang.",
    build: "Konstruksi & SBU tambang — kontraktor lokal bersaing dengan nasional.",
  },
  {
    name: "Kalimantan Timur",
    economy: "IKN Nusantara, migas, dan tambang — pusat proyek terbesar Indonesia saat ini",
    travel: "Jamaah Samarinda & Balikpapan kuat — travel ibadah tumbuh bersama kelas menengah proyek.",
    food: "Katering kawasan proyek — HACCP dan ISO 22000 menjadi syarat memasok katering ribuan pekerja.",
    industry: "Proyek IKN & migas — ISO 9001, 45001, 37001, dan 55001 paling padat dicari; sertifikat menjadi prasyarat tender raksasa.",
    health: "Klinik proyek & RS — standar kesehatan kerja dan mutu layanan dituntut ketat.",
    build: "Konstruksi raksasa — SBU LPJK, SKTTK, dan BNSP jadi paket wajib setiap kontraktor yang masuk IKN.",
  },
  {
    name: "Kalimantan Utara",
    economy: "batubara, sawit, dan kawasan perbatasan",
    travel: "Jamaah Tarakan — pasar kecil yang tumbuh.",
    food: "Pangan lokal — PIRT dan halal untuk UMKM perbatasan.",
    industry: "Energi — ISO 45001 untuk keselamatan operasi tambang.",
    health: "Klinik — standar layanan menopang kesehatan pekerja.",
    build: "Infrastruktur energi — SBU untuk kontraktor kawasan.",
  },
  // ===== SULAWESI =====
  {
    name: "Sulawesi Utara",
    economy: "perikanan, wisata, koperasi, dan agro",
    travel: "Jamaah Manado — komunitas Muslim tumbuh; travel ibadah berkembang bertahap.",
    food: "Olahan ikan (cakalang) — halal, PIRT, dan HACCP membuka ekspor hasil laut.",
    industry: "Koperasi & UMKM — ISO 9001 menaikkan kelas kerja sama bisnis.",
    health: "RS & lab — akreditasi sistem mutu menopang layanan kesehatan timur.",
    build: "Properti & infrastruktur — SBU untuk kontraktor lokal.",
  },
  {
    name: "Sulawesi Tengah",
    economy: "nikel Morowali dan smelter industri besar",
    travel: "Jamaah Palu — pasar tumbuh pasca-rekonstruksi.",
    food: "Katering kawasan industri — HACCP untuk memasok ribuan pekerja smelter.",
    industry: "Smelter — ISO 45001, 14001, dan 50001 (energi) jadi paket kepatuhan utama industri ekstraktif.",
    health: "Klinik industri & RS — standar kesehatan kerja kawasan smelter dituntut ketat.",
    build: "Konstruksi smelter & pelabuhan — SBU dan SKTTK untuk kontraktor & personel.",
  },
  {
    name: "Sulawesi Selatan",
    economy: "pusat ekonomi Indonesia Timur — logistik, pangan, kakao, dan galangan",
    travel: "Makassar gerbang jamaah Indonesia Timur terbesar — PPIU lokal bersaing memenangkan kepercayaan.",
    food: "Cokelat & pangan olahan — sertifikasi ekspor (HACCP, ISO 22000) membuka pasar global.",
    industry: "Manufaktur & logistik — ISO 9001 dan 45001 menopang operasi & kerja sama korporasi.",
    health: "RS & lab besar — akreditasi mutu menopang layanan rujukan timur Indonesia.",
    build: "Kontraktor timur — SBU LPJK dan SKTTK menentukan kelayakan tender Sulsel & sekitarnya.",
  },
  {
    name: "Sulawesi Tenggara",
    economy: "nikel, aspal, dan perikanan",
    travel: "Jamaah Kendari — pasar tumbuh bertahap.",
    food: "Ikan & olahan — PIRT dan halal untuk UMKM pesisir.",
    industry: "Smelter & tambang — ISO 45001 untuk keselamatan kerja industri ekstraktif.",
    health: "Klinik industri — standar kesehatan kerja jadi kebutuhan perusahaan.",
    build: "Infrastruktur — SBU untuk kontraktor daerah.",
  },
  {
    name: "Gorontalo",
    economy: "jagung, perikanan, dan UMKM",
    travel: "Jamaah Gorontalo — komunitas Muslim kuat, pasar tumbuh.",
    food: "Olahan jagung & ikan — halal dan PIRT membuka ritel & ekspor.",
    industry: "Agroindustri — ISO 9001 & 22000 menopang rantai pasok pangan.",
    health: "Lab provinsi — standar mutu layanan kesehatan daerah.",
    build: "Infrastruktur — SBU untuk kontraktor lokal.",
  },
  {
    name: "Sulawesi Barat",
    economy: "kakao, perikanan, dan UMKM",
    travel: "Jamaah Mamuju — pasar kecil yang berkembang.",
    food: "Kakao & olahan — sertifikasi produk membuka ekspor & ritel.",
    industry: "UMKM — ISO 9001 menaikkan konsistensi kualitas.",
    health: "Lab — standar mutu layanan daerah.",
    build: "Infrastruktur — SBU untuk kontraktor daerah.",
  },
  // ===== MALUKU & PAPUA =====
  {
    name: "Maluku",
    economy: "perikanan, pala & cengkih, dan wisata bahari",
    travel: "Jamaah Ambon — travel ibadah tumbuh di tengah keterbatasan jadwal keberangkatan.",
    food: "Olahan ikan & rempah — halal dan HACCP membuka ekspor rempah ke pasar global.",
    industry: "UMKM — ISO 9001 menaikkan kelas kerja sama distributor.",
    health: "Lab provinsi — standar mutu menopang kesehatan kepulauan.",
    build: "Infrastruktur — SBU untuk kontraktor daerah.",
  },
  {
    name: "Maluku Utara",
    economy: "nikel Weda Bay dan emas — industri ekstraktif besar",
    travel: "Jamaah Ternate — pasar tumbuh bersama kawasan industri.",
    food: "Cengkih & pala — sertifikasi produk membuka ekspor.",
    industry: "Smelter — ISO 45001 & 14001 jadi kepatuhan utama kawasan industri logam.",
    health: "Klinik industri — standar kesehatan kerja kawasan smelter dituntut ketat.",
    build: "Konstruksi industri — SBU dan SKTTK untuk proyek kawasan.",
  },
  {
    name: "Papua",
    economy: "migas, kehutanan, dan UMKM",
    travel: "Jamaah Jayapura tumbuh — travel ibadah berkembang bertahap.",
    food: "UMKM lokal — PIRT dan halal untuk pasar lokal & katering.",
    industry: "Korporasi migas & kehutanan — ISO 45001 & 14001 jadi kepatuhan operasional.",
    health: "Klinik korporat & RS — standar kesehatan kerja & layanan dituntut.",
    build: "Infrastruktur Trans-Papua — SBU LPJK jadi tiket kontraktor nasional & lokal.",
  },
  {
    name: "Papua Barat",
    economy: "LNG Tangguh dan sawit",
    travel: "Jamaah Sorong — pasar tumbuh bersama ekonomi energi.",
    food: "Pangan lokal — PIRT dan halal untuk UMKM & katering proyek.",
    industry: "Energi — ISO 45001 & 50001 menopang keselamatan & efisiensi operasi LNG.",
    health: "Klinik migas — standar kesehatan kerja industri ekstraktif.",
    build: "Konstruksi LNG & infrastruktur — SBU untuk kontraktor proyek.",
  },
  {
    name: "Papua Selatan",
    economy: "proyek pangan megah (Merauke) dan agrikultur strategis nasional",
    travel: "Jamaah Merauke — pasar kecil yang tumbuh bersama proyek.",
    food: "Proyek pangan — sertifikasi keamanan pangan jadi kebutuhan besar rantai pasoknya.",
    industry: "Proyek strategis nasional — ISO 9001 & 45001 jadi bahasa kerja kontraktor & operator.",
    health: "Klinik proyek — standar kesehatan kerja kawasan agrikultur besar.",
    build: "Konstruksi proyek pangan — SBU LPJK & SKTTK menentukan kelayakan personel.",
  },
  {
    name: "Papua Tengah",
    economy: "tambang emas Grasberg — salah satu yang terbesar di dunia",
    travel: "Jamaah Timika & Nabire — komunitas tumbuh bersama kawasan tambang.",
    food: "Katering proyek — HACCP untuk memasok katering kawasan tambang.",
    industry: "Tambang — ISO 45001, 14001, dan 37001 jadi paket kepatuhan utama.",
    health: "Klinik tambang — standar kesehatan kerja dituntut ketat.",
    build: "Konstruksi tambang — SBU & SKTTK untuk kontraktor dan personel teknis.",
  },
  {
    name: "Papua Pegunungan",
    economy: "provinsi baru — infrastruktur dan pertanian dataran tinggi",
    travel: "Jamaah Wamena — komunitas kecil yang berkembang.",
    food: "Pertanian lokal — PIRT dan halal untuk UMKM dataran tinggi.",
    industry: "Konstruksi & jasa — ISO 9001 menopang kualitas kerja proyek baru.",
    health: "Klinik & puskesmas — standar layanan kesehatan daerah baru.",
    build: "Infrastruktur — SBU jadi tiket kontraktor yang membangun provinsi baru.",
  },
  {
    name: "Papua Barat Daya",
    economy: "maritim Sorong, migas, dan perikanan",
    travel: "Jamaah Sorong — salah satu gerbang jamaah timur.",
    food: "Perikanan — halal dan HACCP membuka ekspor hasil laut.",
    industry: "Energi & maritim — ISO 45001 menopang keselamatan operasi.",
    health: "Klinik — standar kesehatan kerja kawasan pelabuhan.",
    build: "Properti & pelabuhan — SBU untuk kontraktor kawasan.",
  },
];

// Pastikan profil & provinsi selalu sinkron (38-38)
if (PROV_CERT_PROFILES.length !== PROVINCES.length) {
  // Cegah mismatch diam-diam saat pengembangan: builder tetap aman karena lookup by index
  // namun kita beri tanda via konsol build-time bila terjadi.
  console.warn(
    `[sertifikasi-provinsi] Profil provinsi (${PROV_CERT_PROFILES.length}) ≠ PROVINCES (${PROVINCES.length})`
  );
}

// ------------------------------------------------------------
// MAPPING KELOMPOK SERTIFIKASI → KOLOM PROFIL
// ------------------------------------------------------------

const GROUP_FIELD: Record<CertGroup, keyof ProvCertProfile> = {
  "travel-ibadah": "travel",
  halal: "food",
  pangan: "food",
  "iso-manajemen": "industry",
  "lab-kesehatan": "health",
  "badan-usaha": "build",
};

/** Paragraf unik kelompok × provinsi × sertifikat */
function groupParagraph(cert: CertEntry, provName: string, profile: ProvCertProfile): string {
  const field = GROUP_FIELD[cert.group];
  const note = profile[field];
  switch (cert.group) {
    case "travel-ibadah":
      return `${note} Dengan ${cert.name}, usaha ibadah Anda di ${provName} berdiri di atas regulasi terkini (${cert.legalBasis}) — bukan template lama yang berisiko ditolak saat verifikasi berkala instansi haji-umrah.`;
    case "halal":
      return `${note} ${cert.name} membuat usaha Anda tampil beda di ${provName}: bukti kepatuhan resmi PP 42/2024 yang makin dituntut konsumen, pasar, dan mitra distribusi.`;
    case "pangan":
      return `${note} Untuk ${cert.name} (${cert.code}), standarnya mengikat sampai rantai pasok — klien besar dan eksportir dari ${provName} makin menuntut bukti sistem yang terdokumentasi, bukan sekadar klaim.`;
    case "iso-manajemen":
      return `${note} ${cert.name} (${cert.code}) adalah bahasa bersama klien besar dan mitra global di ${provName} — lembaga sertifikasi terakreditasi KAN yang kami rekomendasikan memastikan sertifikat Anda diterima di mana pun.`;
    case "lab-kesehatan":
      return `${note} Untuk ${cert.name}, kredibilitas lembaga adalah segalanya — kami pandu usaha di ${provName} dari dokumentasi mutu sampai hari penilaian badan akreditasi.`;
    case "badan-usaha":
      return `${note} ${cert.name} di ${provName} sering menjadi syarat masuk proyek dan kepatuhan fasilitas — kami susun dokumennya sekali benar, supaya setiap tender atau inspeksi berikutnya tinggal salin-tempel.`;
  }
}

// ------------------------------------------------------------
// BUILDER: Halaman Sertifikasi × Provinsi
// ------------------------------------------------------------

function buildCertRegionPage(cert: CertEntry, provIdx: number): ServicePage | null {
  const prov = PROVINCES[provIdx];
  const profile = PROV_CERT_PROFILES[provIdx];
  if (!prov || !profile) return null;

  const provSlug = slugify(prov.name);
  const slug = `${cert.id}-${provSlug}`;
  const catMeta = CATEGORY_META.sertifikasi;
  const cities = prov.majors.slice(0, 4).join(", ");
  const authorityShort = cert.authority.split("(")[0].trim();
  const certNameLower = cert.name.toLowerCase();

  const intro = `${cert.desc} Di ${prov.name}, ${profile.economy} — sehingga ${cert.name} kerap menjadi dokumen penentu saat usaha mengikuti lelang, memasok klien besar, atau memperluas pasar. Kami mengurus penuh dari ${prov.majors[0]} sampai kabupaten sekitarnya: audit kesiapan, penyusunan dokumen, koordinasi dengan ${authorityShort}, sampai terbit. Proses dominan daring — 95% tanpa Anda harus keluar kantor.`;

  const faq: ServiceFaq[] = [
    {
      q: `Berapa biaya ${certNameLower} di ${prov.name}?`,
      a: `Jasa kami mulai ${cert.price} — transparan sama untuk seluruh wilayah ${prov.name}, diperkirakan selesai ${cert.duration} setelah dokumen lengkap. Biaya resmi instansi atau lembaga sertifikasi terpisah dan tertulis jelas di penawaran. ${prov.note}`,
    },
    {
      q: `Apakah pengurusan ${certNameLower} di ${prov.name} harus lewat kantor di Jakarta?`,
      a: `Umumnya tidak harus. Pengajuan berjalan lewat sistem nasional (OSS-RBA, sistem elektronik instansi, atau lembaga sertifikasi daring). Dokumen fisik kami urus via kurir, dan ${ONSITE_NOTE[cert.group]} Anda tinggal di mana pun di ${prov.name} — ${prov.majors.join(", ")} — tetap bisa diurus penuh.`,
    },
    {
      q: `Kenapa usaha di ${prov.name} perlu ${certNameLower}?`,
      a: `Sertifikat yang terbit diakui nasional dan (untuk standar internasional) global — yang membedakan hanya kesiapan dokumen dan pemilihan lembaga yang benar. ${profile[GROUP_FIELD[cert.group]]} Di situlah pengalaman kami menangani 43 sertifikasi di 38 provinsi berguna: antisipasi revisi sejak awal.`,
    },
    ...cert.faq.slice(0, 2),
  ];

  return {
    slug,
    kind: "region",
    category: "sertifikasi",
    parent: cert.id,
    title: `Jasa ${cert.name} di ${prov.name} — Biaya & Proses 2026`,
    h1: `${cert.name} di ${prov.name}`,
    desc: `${cert.desc} Melayani ${cities} & seluruh ${prov.name}.`,
    metaDesc: `Pengurusan ${certNameLower} di ${prov.name}: resmi via ${authorityShort}, mulai ${cert.price}, proses ${cert.duration}. Melayani ${cities} & seluruh ${prov.name}. Konsultasi gratis via WhatsApp — garansi 100%.`,
    intro,
    longDesc: [
      cert.longDesc[1],
      groupParagraph(cert, prov.name, profile),
      `Alur untuk usaha di ${prov.name}: konsultasi gratis & audit dokumen, penyusunan berkas sesuai ketentuan ${authorityShort}, pengajuan resmi, pendampingan klarifikasi, sampai terbit + panduan kewajiban pasca-terbit. ${prov.note} Kota yang paling sering kami tangani: ${prov.majors.join(", ")} — dan kabupaten/kota lain di ${prov.name} dilayani dengan proses yang sama karena sistem pengajuannya terintegrasi nasional. 95% proses daring; ${ONSITE_NOTE[cert.group]}`,
    ],
    price: cert.price,
    priceNumeric: parsePrice(cert.price),
    duration: cert.duration,
    audience: cert.audience,
    features: cert.features,
    requirements: [...cert.requirements, `Alamat usaha di ${prov.name} (bila diminta verifikasi)`],
    steps: cert.steps.map((s, i) => (i === 1 ? `${s} (dokumen sesuai ketentuan ${prov.name})` : s)),
    faq,
    keywords: [
      `${certNameLower} di ${prov.name.toLowerCase()}`,
      `biaya ${certNameLower} ${prov.name.toLowerCase()}`,
      `jasa ${certNameLower} ${prov.majors[0]?.toLowerCase() ?? ""}`,
      `konsultan ${certNameLower} ${prov.name.toLowerCase()}`,
      `${cert.code.toLowerCase()} ${prov.name.toLowerCase()}`,
    ],
    legalBasis: cert.legalBasis,
    authority: cert.authority,
    region: prov.name,
    related: [],
    breadcrumbs: [
      { name: "Beranda", href: "/" },
      { name: "Layanan", href: "/layanan" },
      { name: catMeta.label, href: `/layanan/kategori/${catMeta.slug}` },
      { name: cert.name, href: `/layanan/${cert.id}` },
      { name: prov.name, href: `/layanan/${slug}` },
    ],
  };
}

/** 43 sertifikasi × 38 provinsi = 1.634 halaman */
export const CERT_REGION_PAGES: ServicePage[] = CERTS.flatMap((cert) =>
  PROVINCES.map((_, i) => buildCertRegionPage(cert, i)).filter(
    (p): p is ServicePage => p !== null
  )
);

// ------------------------------------------------------------
// BUILDER: Hub "Konsultan Sertifikasi di {Provinsi}" (38)
// ------------------------------------------------------------

function buildCertProvHub(provIdx: number): ServicePage | null {
  const prov = PROVINCES[provIdx];
  const profile = PROV_CERT_PROFILES[provIdx];
  if (!prov || !profile) return null;

  const provSlug = slugify(prov.name);
  const slug = `sertifikasi/${provSlug}`;
  const catMeta = CATEGORY_META.sertifikasi;
  const members = CERT_REGION_PAGES.filter((p) => p.region === prov.name);
  if (members.length === 0) return null;

  const cheapest = [...CERTS].sort((a, b) => parsePrice(a.price) - parsePrice(b.price))[0];
  const sample = members[0];
  const travelMember = members.find((m) => m.parent === "paket-pendirian-travel-umrah") ?? sample;

  const faq: ServiceFaq[] = [
    {
      q: `Sertifikasi apa saja yang bisa diurus di ${prov.name}?`,
      a: `${members.length} sertifikasi: izin travel ibadah (PPIU/SPPU-SIPU, PIHK haji khusus sesuai PMHU 2/2026), keluarga ISO (9001:2026, 14001, 45001, 27001, 22000, 37001, dan lainnya), halal jasa PP 42/2024, keamanan pangan (HACCP, CPPOB, SPP-IRT), laboratorium (17025, 15189), sampai SBU LPJK, SKTTK, dan SLO. Semua halaman detailnya tersedia di halaman ini.`,
    },
    {
      q: `Berapa biaya jasa sertifikasi di ${prov.name}?`,
      a: `Mulai dari ${cheapest.price} untuk sertifikasi paling ringan, tergantung jenis & skala usaha. Biaya resmi lembaga sertifikasi/instansi terpisah dan tertulis di penawaran — tanpa biaya tersembunyi. Gagal terbit karena kesalahan proses kami? Uang kembali 100%.`,
    },
    {
      q: `Apakah harus ke ${prov.majors[0]} atau ke Jakarta untuk audit?`,
      a: `Tidak perlu ke Jakarta. Pengajuan & dokumen berjalan daring; audit atau penilaian lapangan dilakukan auditor/lembaga di lokasi usaha Anda — kami pandu persiapannya sampai lolos. Seluruh ${prov.name} dilayani dengan proses yang sama.`,
    },
    {
      q: `Lembaga sertifikasi mana yang dipakai untuk ${prov.name}?`,
      a: `Kami bekerja dengan lembaga sertifikasi terakreditasi KAN (untuk ISO/standar teknis) dan lembaga resmi sesuai jenis layanan — BPJPH untuk halal, instansi haji-umrah untuk PPIU/PIHK, unit pemeriksa berlisensi ESDM untuk SLO. Nama lembaga selalu kami putuskan bersama Anda di penawaran — transparan sejak awal.`,
    },
    {
      q: `Bisa sekalian urus beberapa sertifikasi sekaligus di ${prov.name}?`,
      a: `Bisa — bahkan disarankan. Sistem manajemen yang dibangun sekali (misal dokumen mutu + K3) bisa memenuhi beberapa standar sekaligus (IMS), dan izin travel ibadah bisa digabung dengan halal jasa. Konsultasi awal gratis: kami petakan kombinasi paling hemat untuk kondisi Anda.`,
    },
  ];

  return {
    slug,
    kind: "hub",
    category: "sertifikasi",
    region: prov.name,
    title: `Konsultan Sertifikasi & ISO di ${prov.name} — ${members.length} Layanan Terlengkap`,
    h1: `Konsultan Sertifikasi & ISO di ${prov.name}`,
    desc: `${members.length} sertifikasi (PPIU/PIHK, ISO 9001:2026, 27001, halal PP 42/2024, HACCP, SBU) untuk ${prov.name} — ${prov.majors.slice(0, 3).join(", ")}. Mulai ${cheapest.price}, garansi 100%.`,
    metaDesc: `Jasa sertifikasi & ISO di ${prov.name}: PPIU/PIHK haji-umrah, ISO 9001:2026, 27001, halal jasa, HACCP, SBU LPJK — ${members.length} layanan, mulai ${cheapest.price}. Melayani ${prov.majors.join(", ")}. Konsultasi gratis!`,
    intro: `${members.length} sertifikasi resmi untuk usaha di ${prov.name}: izin travel ibadah haji-umrah (PPIU/PIHK sesuai PMHU 2/2026), keluarga ISO (termasuk 9001:2026 edisi terbaru), halal jasa PP 42/2024, keamanan pangan, laboratorium & kesehatan, sampai SBU untuk tender. ${profile.economy.charAt(0).toUpperCase() + profile.economy.slice(1)} — katalisator alami permintaan sertifikasi yang rapi.`,
    longDesc: [
      `${profile.travel} ${profile.industry}`,
      `${profile.food} ${profile.build} Dari sisi kewajiban pun ${prov.note} Semuanya kami tangani satu pintu: konsultasi gratis, penawaran transparan, penyusunan dokumen, koordinasi lembaga sertifikasi/instansi, dan monitoring progres real-time via WhatsApp.`,
      `Untuk usaha di ${prov.majors.join(", ")} dan kabupaten/kota lainnya, sertifikasi yang terbit berlaku nasional (untuk standar internasional: global). Proses dominan daring dengan rating klien 4,9/5 dari 1.247+ pelanggan — dan garansi uang kembali 100% bila gagal terbit karena kesalahan proses kami.`,
    ],
    price: cheapest.price,
    priceNumeric: 0,
    duration: "Sesuai layanan",
    audience: travelMember?.audience ?? ["UMKM", "Perusahaan"],
    features: members.slice(0, 6).map((m) => m.h1),
    requirements: [],
    steps: [],
    faq,
    keywords: [
      `sertifikasi ${prov.name.toLowerCase()}`,
      `konsultan iso ${prov.name.toLowerCase()}`,
      `jasa sertifikasi perusahaan ${prov.majors[0]?.toLowerCase() ?? ""}`,
      `biaya sertifikasi halal ${prov.name.toLowerCase()}`,
      `ppiu ${prov.name.toLowerCase()}`,
      `iso 9001 ${prov.name.toLowerCase()}`,
    ],
    legalBasis: "PMHU 2/2026, PP 42/2024, standar ISO terkini, PP 50/2012",
    authority: "Lembaga sertifikasi terakreditasi KAN, BPJPH, instansi haji-umrah, ESDM",
    related: members.slice(0, 6).map((m) => m.slug),
    breadcrumbs: [
      { name: "Beranda", href: "/" },
      { name: "Layanan", href: "/layanan" },
      { name: catMeta.label, href: `/layanan/kategori/${catMeta.slug}` },
      { name: prov.name, href: `/layanan/${slug}` },
    ],
  };
}

/** 38 hub sertifikasi per provinsi */
export const CERT_PROV_HUBS: ServicePage[] = PROVINCES.map((_, i) => buildCertProvHub(i)).filter(
  (p): p is ServicePage => p !== null
);

/** Statistik untuk badge/hub UI */
export const CERT_REGION_STATS = {
  combos: CERT_REGION_PAGES.length,
  hubs: CERT_PROV_HUBS.length,
  total: CERT_REGION_PAGES.length + CERT_PROV_HUBS.length,
  certs: CERTS.length,
  provinces: PROVINCES.length,
};
