// ============================================================
// PUSATPERIZINAN.COM — i18n Types (Top 30 World Languages)
// Kontrak translation lintas-file. JANGAN mengubah nama key
// tanpa sinkronisasi dengan translations-core.ts.
//
// Konvensi token (HARUS dipertahankan apa adanya):
//   {p}    -> nama paket (UMKM / Bisnis / Enterprise)
//   {n}    -> angka dinamis (jumlah provinsi/kabupaten/artikel)
//   {name} -> nama user dari form
//   {year} -> tahun berjalan (copyright)
//   \n     -> newline di chatWelcome
//   **...**-> bold di chatWelcome (markdown mini)
// ============================================================

export type LangCode =
  | "id" | "en" | "zh" | "ja" | "ko" | "vi" | "th" | "tl" | "ms"
  | "hi" | "ta" | "bn" | "ar" | "fa" | "ur" | "he"
  | "es" | "fr" | "de" | "it" | "nl" | "pt" | "el"
  | "ru" | "pl" | "uk" | "tr" | "sw" | "pa" | "jv";

export interface Translation {
  // ===== Header =====
  navServices: string;
  navCheckAI: string;
  navCalculator: string;
  navGuides: string;
  navBlog: string;
  navCoverage: string;
  navPricing: string;
  navFaq: string;
  headerTagline: string;
  ctaFree: string;
  // ===== Hero =====
  heroBadge: string;
  heroTitle1: string;
  heroHigh1: string;
  heroTitle2: string;
  heroHigh2: string;
  heroSubtitle: string;
  heroBullet1: string;
  heroBullet2: string;
  heroBullet3: string;
  heroReviews: string;
  // ===== Hero form =====
  formTitle: string;
  formSubtitle: string;
  labelFree: string;
  labelName: string;
  labelWa: string;
  labelSector: string;
  phSector: string;
  labelNeed: string;
  phNeed: string;
  pkgNotSure: string;
  pkgPrefix: string; // token {p}
  labelDesc: string;
  phDesc: string;
  btnSubmit: string;
  btnSending: string;
  privacyNote: string;
  successTitle: string;
  successBody: string; // token {name}
  btnAnother: string;
  // ===== Toasts =====
  toastSuccess: string;
  toastFail: string;
  toastConn: string;
  // ===== Stats bar =====
  statClients: string;
  statPermits: string;
  statProvinces: string;
  statCities: string;
  statSatisfaction: string;
  statAvgTime: string;
  statHours: string;
  // ===== Section titles (3 bagian: normal + highlight + normal) =====
  servicesT1: string;
  servicesTHigh: string;
  servicesT2: string;
  checkerT1: string;
  checkerTHigh: string;
  checkerT2: string;
  calcT1: string;
  calcTHigh: string;
  calcT2: string;
  hubT1: string;
  hubTHigh: string;
  hubT2: string;
  blogT1: string;
  blogTHigh: string;
  blogT2: string;
  courseT1: string;
  courseTHigh: string;
  courseT2: string;
  coverageT1: string; // token {n}
  coverageTHigh: string; // token {n}
  coverageT2: string;
  whyT1: string;
  whyTHigh: string;
  whyT2: string;
  processT1: string;
  processTHigh: string;
  processT2: string;
  pricingT1: string;
  pricingTHigh: string;
  pricingT2: string;
  testiT1: string;
  testiTHigh: string;
  testiT2: string;
  compT1: string;
  compTHigh: string;
  compT2: string;
  faqT1: string;
  faqTHigh: string;
  faqT2: string;
  ctaT1: string;
  ctaTHigh: string;
  ctaT2: string;
  sitemapT1: string;
  sitemapTHigh: string;
  sitemapT2: string;
  // ===== Section subtitles =====
  servicesSub: string;
  checkerSub: string;
  calcSub: string;
  hubSub: string;
  blogSub: string; // token {n}
  courseSub: string;
  coverageSub: string;
  whySub: string;
  processSub: string;
  pricingSub: string;
  testiSub: string;
  compSub: string;
  faqSub: string;
  ctaSub: string;
  sitemapSub: string;
  // ===== Final CTA extras =====
  ctaBadge: string;
  ctaFormTitle: string;
  ctaFormSub: string;
  ctaSubmit: string;
  ctaSuccessTitle: string;
  ctaSuccessBody: string;
  ctaWaBtn: string;
  ctaPrivacy: string;
  // ===== Knowledge hub tabs =====
  tabPerIzin: string;
  tabPerSektor: string;
  tabPerWilayah: string;
  tabKbli: string;
  // ===== Email course extras =====
  courseBadge: string;
  courseFormTitle: string;
  courseFormSub: string;
  courseSuccessTitle: string;
  // ===== Footer =====
  footerTagline: string;
  footerVerified: string;
  footerColServices: string;
  footerColCompany: string;
  footerColContact: string;
  footerHours: string;
  footerNote: string;
  footerRights: string; // token {year}
  footerMade: string;
  // ===== Chat widget =====
  chatTitle: string;
  chatStatus: string;
  chatWelcome: string; // dukung **bold** dan \n
  chatPlaceholder: string;
  chatTyping: string;
  chatQr1: string;
  chatQr2: string;
  chatQr3: string;
  chatQr4: string;
  // ===== Language switcher =====
  languageLabel: string;
  searchLanguages: string;
  contentNote: string;
}
