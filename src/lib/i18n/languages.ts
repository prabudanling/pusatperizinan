// ============================================================
// PUSATPERIZINAN.COM — 30 Bahasa Teratas Dunia
// Registry bahasa untuk language switcher + SEO hreflang.
// Urutan: Indonesia dulu (default), lalu berdasarkan regional.
// ============================================================

import type { LangCode } from "./types";

export interface LanguageMeta {
  code: LangCode;
  /** Nama bahasa dalam aksaranya sendiri (ditampilkan di switcher) */
  native: string;
  /** Nama bahasa dalam Inggris (subtitle di switcher + API chat) */
  english: string;
  /** Flag emoji */
  flag: string;
  /** Arah teks kanan-ke-kiri */
  rtl?: boolean;
  /** Regional untuk pengelompokan visual */
  region: "Southeast Asia" | "East Asia" | "South Asia" | "Middle East" | "Europe" | "Africa" | "Global";
  /** Perkiraan total penutur (juta) — social proof di switcher */
  speakers: string;
}

export const LANGUAGES: LanguageMeta[] = [
  { code: "id", native: "Bahasa Indonesia", english: "Indonesian", flag: "🇮🇩", region: "Southeast Asia", speakers: "199M" },
  { code: "en", native: "English", english: "English", flag: "🇬🇧", region: "Global", speakers: "1,515M" },
  { code: "zh", native: "中文", english: "Chinese (Mandarin)", flag: "🇨🇳", region: "East Asia", speakers: "1,140M" },
  { code: "hi", native: "हिन्दी", english: "Hindi", flag: "🇮🇳", region: "South Asia", speakers: "609M" },
  { code: "es", native: "Español", english: "Spanish", flag: "🇪🇸", region: "Europe", speakers: "560M" },
  { code: "fr", native: "Français", english: "French", flag: "🇫🇷", region: "Europe", speakers: "310M" },
  { code: "ar", native: "العربية", english: "Arabic", flag: "🇸🇦", rtl: true, region: "Middle East", speakers: "335M" },
  { code: "bn", native: "বাংলা", english: "Bengali", flag: "🇧🇩", region: "South Asia", speakers: "278M" },
  { code: "pt", native: "Português", english: "Portuguese", flag: "🇧🇷", region: "Europe", speakers: "264M" },
  { code: "ru", native: "Русский", english: "Russian", flag: "🇷🇺", region: "Europe", speakers: "255M" },
  { code: "ur", native: "اردو", english: "Urdu", flag: "🇵🇰", rtl: true, region: "South Asia", speakers: "232M" },
  { code: "de", native: "Deutsch", english: "German", flag: "🇩🇪", region: "Europe", speakers: "134M" },
  { code: "ja", native: "日本語", english: "Japanese", flag: "🇯🇵", region: "East Asia", speakers: "125M" },
  { code: "tr", native: "Türkçe", english: "Turkish", flag: "🇹🇷", region: "Europe", speakers: "90M" },
  { code: "ko", native: "한국어", english: "Korean", flag: "🇰🇷", region: "East Asia", speakers: "82M" },
  { code: "vi", native: "Tiếng Việt", english: "Vietnamese", flag: "🇻🇳", region: "Southeast Asia", speakers: "86M" },
  { code: "th", native: "ไทย", english: "Thai", flag: "🇹🇭", region: "Southeast Asia", speakers: "61M" },
  { code: "it", native: "Italiano", english: "Italian", flag: "🇮🇹", region: "Europe", speakers: "68M" },
  { code: "nl", native: "Nederlands", english: "Dutch", flag: "🇳🇱", region: "Europe", speakers: "25M" },
  { code: "ms", native: "Bahasa Melayu", english: "Malay", flag: "🇲🇾", region: "Southeast Asia", speakers: "34M" },
  { code: "fa", native: "فارسی", english: "Persian (Farsi)", flag: "🇮🇷", rtl: true, region: "Middle East", speakers: "80M" },
  { code: "pl", native: "Polski", english: "Polish", flag: "🇵🇱", region: "Europe", speakers: "41M" },
  { code: "uk", native: "Українська", english: "Ukrainian", flag: "🇺🇦", region: "Europe", speakers: "33M" },
  { code: "tl", native: "Filipino", english: "Filipino (Tagalog)", flag: "🇵🇭", region: "Southeast Asia", speakers: "29M" },
  { code: "ta", native: "தமிழ்", english: "Tamil", flag: "🇱🇰", region: "South Asia", speakers: "81M" },
  { code: "he", native: "עברית", english: "Hebrew", flag: "🇮🇱", rtl: true, region: "Middle East", speakers: "9M" },
  { code: "el", native: "Ελληνικά", english: "Greek", flag: "🇬🇷", region: "Europe", speakers: "13M" },
  { code: "sw", native: "Kiswahili", english: "Swahili", flag: "🇰🇪", region: "Africa", speakers: "200M" },
  { code: "pa", native: "ਪੰਜਾਬੀ", english: "Punjabi", flag: "🇮🇳", region: "South Asia", speakers: "113M" },
  { code: "jv", native: "Basa Jawa", english: "Javanese", flag: "🇮🇩", region: "Southeast Asia", speakers: "68M" },
];

export const DEFAULT_LANG: LangCode = "id";

export const LANG_MAP: Record<string, LanguageMeta> = Object.fromEntries(
  LANGUAGES.map((l) => [l.code, l])
) as Record<string, LanguageMeta>;

/** Daftar kode untuk SEO (hreflang/availableLanguage) */
export const LANG_CODES: LangCode[] = LANGUAGES.map((l) => l.code);

/** Nama bahasa Inggris — dipakai API chat untuk instruksi bahasa jawaban */
export function langEnglishName(code: string): string {
  return LANG_MAP[code]?.english ?? "Indonesian";
}

/** Cek apakah kode bahasa valid */
export function isLangCode(v: string | null | undefined): v is LangCode {
  return !!v && !!LANG_MAP[v];
}
