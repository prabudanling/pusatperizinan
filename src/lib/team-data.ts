// ============================================================
// PUSATPERIZINAN.COM — Data Tim & Konsultan (Single Source of Truth)
// Dipakai oleh: components/landing/team.tsx + seo-jsonld.tsx
// Bilingual (id/en) dengan fallback otomatis ke Indonesia.
// ============================================================

export interface LocalizedText {
  id: string;
  en: string;
}

export interface TeamMember {
  name: string;
  initials: string;
  title: LocalizedText;
  credentials: string;
  bio: LocalizedText;
  focus: { id: string[]; en: string[] };
}

/** Founder — kartu utama (featured) */
export const FOUNDER: TeamMember = {
  name: "Tuan Haji Gugun Gunara",
  initials: "GG",
  title: { id: "Founder & Principal Consultant", en: "Founder & Principal Consultant" },
  credentials: "15+ Tahun · SCBD · Haji",
  bio: {
    id: "Pengusaha sekaligus konsultan senior dengan pengalaman 15+ tahun lintas industri — dari tambang & energi hingga travel ibadah. Memimpin jaringan advisory bersama konsultan alumni McKinsey dan mitra analis risiko geopolitik untuk menuntaskan kasus perizinan tersulit: PMA, RKAB tambang, hingga lisensi usaha Arab Saudi (MISA). Berbasis di SCBD, Jakarta, melayani klien di 38 provinsi.",
    en: "Entrepreneur and senior consultant with 15+ years of cross-industry experience — from mining & energy to hajj travel. Leads an advisory network alongside McKinsey-alumni consultants and geopolitical risk partners to solve the hardest cases: PMA, mining RKAB, and Saudi Arabia (MISA) business licenses. Based in SCBD, Jakarta, serving clients across all 38 provinces.",
  },
  focus: {
    id: [
      "Strategi Perizinan & Ekspansi",
      "PMA & Investasi Asing",
      "RKAB & Perizinan Tambang",
      "Lisensi Arab Saudi (MISA)",
    ],
    en: [
      "Permit Strategy & Expansion",
      "Foreign Investment (PMA)",
      "Mining RKAB & Compliance",
      "Saudi Arabia Licensing (MISA)",
    ],
  },
};

/** Tim konsultan senior */
export const TEAM: TeamMember[] = [
  {
    name: "Drs. H. Arif Rachman Hakim, M.M.",
    initials: "AR",
    title: { id: "Senior Business Consultant", en: "Senior Business Consultant" },
    credentials: "Drs. · M.M. · Ex-Praktisi Birokrasi",
    bio: {
      id: "Praktisi birokrasi senior dengan pemahaman mendalam atas seluk-beluk instansi dan OSS-RBA. Spesialis NIB, legalitas badan usaha PT/CV, dan perizinan lintas kementerian — terbiasa menuntaskan urusan yang bikin orang lain menyerah.",
      en: "Senior bureaucratic practitioner with deep understanding of agency processes and OSS-RBA. Specialist in NIB, PT/CV legal entity setup, and cross-ministry permits — used to solving cases others give up on.",
    },
    focus: {
      id: ["NIB & OSS-RBA", "Pendirian PT/CV", "Perizinan Lintas Kementerian"],
      en: ["NIB & OSS-RBA", "PT/CV Establishment", "Cross-Ministry Permits"],
    },
  },
  {
    name: "Dadang Suryana, S.H.",
    initials: "DS",
    title: { id: "Legal & Regulatory Specialist", en: "Legal & Regulatory Specialist" },
    credentials: "S.H. · Hukum Bisnis",
    bio: {
      id: "Pengacara bisnis yang memastikan setiap dokumen legal bulletproof — dari perizinan daerah, izin usaha sektoral, hingga penyiapan perjanjian kerja sama bisnis.",
      en: "Business lawyer ensuring every legal document is bulletproof — from regional permits, sectoral business licenses, to business cooperation agreements.",
    },
    focus: {
      id: ["Perizinan Daerah", "Izin Usaha Sektoral", "Legalitas & Perjanjian"],
      en: ["Regional Permits", "Sectoral Licenses", "Legal & Agreements"],
    },
  },
  {
    name: "Ratna Sari, S.T.P.",
    initials: "RS",
    title: { id: "Halal & Produk Specialist", en: "Halal & Product Specialist" },
    credentials: "S.T.P. · BPOM · SEHATI",
    bio: {
      id: "Ahli perizinan produk: sertifikasi halal (SEHATI), izin edar BPOM, PIRT, dan CPPOB. Ratusan brand UMKM & FMCG sudah meluncur aman berkat pendampingannya.",
      en: "Product licensing expert: halal certification (SEHATI), BPOM distribution permits, PIRT, and CPPOB. Hundreds of SME & FMCG brands have launched safely under her guidance.",
    },
    focus: {
      id: ["Sertifikasi Halal", "BPOM & PIRT", "CPPOB"],
      en: ["Halal Certification", "BPOM & PIRT", "CPPOB"],
    },
  },
  {
    name: "Bambang Wijaya, S.T.",
    initials: "BW",
    title: { id: "Building & Environment Specialist", en: "Building & Environment Specialist" },
    credentials: "S.T. · PBG/SLF · AMDAL",
    bio: {
      id: "Insinyur yang paham bahasa Dinas PUPR: PBG & SLF gedung, izin lingkungan (AMDAL, UKL-UPL, SPPL), hingga kelengkapan konstruksi untuk klinik, pabrik, dan properti.",
      en: "Engineer fluent in the language of the public works agency: PBG & SLF building approvals, environmental permits (AMDAL, UKL-UPL, SPPL), and construction compliance for clinics, factories, and property.",
    },
    focus: {
      id: ["PBG & SLF", "AMDAL / UKL-UPL", "Izin Lingkungan"],
      en: ["PBG & SLF", "AMDAL / UKL-UPL", "Environmental Permits"],
    },
  },
  {
    name: "Rangga Pratama, S.E., M.Ak.",
    initials: "RP",
    title: { id: "Investment & Aviation Specialist", en: "Investment & Aviation Specialist" },
    credentials: "S.E. · M.Ak. · PPIU/IATA",
    bio: {
      id: "Spesialis investasi & aviasi: pendirian PMA, izin travel umroh/haji (PPIU/PPIH), registrasi IATA, hingga kepatuhan pajak (NPWP, PKP, LKPM) untuk perusahaan berkembang.",
      en: "Investment & aviation specialist: PMA incorporation, hajj/umrah travel licenses (PPIU/PPIH), IATA registration, and tax compliance (NPWP, PKP, LKPM) for growing companies.",
    },
    focus: {
      id: ["PMA & Investasi", "PPIU / PPIH / IATA", "Pajak & Kepatuhan"],
      en: ["PMA & Investment", "PPIU / PPIH / IATA", "Tax & Compliance"],
    },
  },
];
