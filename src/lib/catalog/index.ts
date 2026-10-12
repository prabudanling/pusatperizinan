// ============================================================
// PUSATPERIZINAN.COM — API Katalog Layanan
// Entry point tunggal untuk semua konsumsi katalog
// ============================================================

export * from "./types";
export {
  getServicePage,
  getAnyPage,
  getAllSlugs,
  getHubSlugs,
  getCategoryHub,
  getRegionHub,
  getCityHubs,
  ALL_SERVICE_PAGES,
  BIG_CITIES,
  TAX_CITIES,
  slugify,
  parsePrice,
} from "./generators";
export {
  VO_PAGES,
  getVoPackageBySlug,
  getVoLocationBySlug,
  getVoLocationsByCity,
  getVoLocationsByArea,
  VO_TOTAL_LOCATIONS,
  VO_TOTAL_CITIES,
  VO_TOTAL_PACKAGES,
  VO_TOTAL_PURPOSES,
  VO_TOTAL_PAGES,
} from "./virtual-office";
