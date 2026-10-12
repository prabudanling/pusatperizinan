// ============================================================
// PUSATPERIZINAN.COM — i18n Index
// Menggabungkan core (id/en) + 28 bahasa dari 4 file partisi.
// ============================================================

import type { LangCode, Translation } from "./types";
import { TRANSLATIONS_CORE } from "./translations-core";
import { TRANSLATIONS_A } from "./translations-a";
import { TRANSLATIONS_B } from "./translations-b";
import { TRANSLATIONS_C } from "./translations-c";
import { TRANSLATIONS_D } from "./translations-d";

export const TRANSLATIONS: Record<LangCode, Partial<Translation>> = {
  ...TRANSLATIONS_CORE,
  ...TRANSLATIONS_A,
  ...TRANSLATIONS_B,
  ...TRANSLATIONS_C,
  ...TRANSLATIONS_D,
} as Record<LangCode, Partial<Translation>>;

export * from "./types";
export {
  LANGUAGES,
  LANG_MAP,
  LANG_CODES,
  DEFAULT_LANG,
  langEnglishName,
  isLangCode,
  type LanguageMeta,
} from "./languages";
export { TRANSLATIONS_CORE } from "./translations-core";
