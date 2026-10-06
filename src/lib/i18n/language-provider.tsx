"use client";

// ============================================================
// PUSATPERIZINAN.COM — Language Provider
// Client-side i18n untuk 30 bahasa: deteksi browser, ?lang= URL,
// localStorage, dukungan RTL (ar/fa/ur/he), fallback id -> key.
// ============================================================

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { DEFAULT_LANG, LANG_MAP, type LanguageMeta } from "./languages";
import { TRANSLATIONS } from "./index";
import type { LangCode, Translation } from "./types";

const STORAGE_KEY = "pp-lang";

interface LanguageContextValue {
  lang: LangCode;
  setLang: (code: LangCode) => void;
  /** Terjemahan dengan fallback: bahasa aktif -> id -> key */
  t: (key: keyof Translation) => string;
  /** Metadata bahasa aktif */
  meta: LanguageMeta;
  rtl: boolean;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function detectFromBrowser(): LangCode | null {
  if (typeof navigator === "undefined") return null;
  const candidates = [...(navigator.languages ?? []), navigator.language].filter(Boolean);
  for (const c of candidates) {
    const lower = c.toLowerCase();
    if (LANG_MAP[lower]) return lower as LangCode;
    const base = lower.split("-")[0];
    if (LANG_MAP[base]) return base as LangCode;
  }
  return null;
}

/** Prioritas: ?lang= URL -> localStorage -> bahasa browser -> id */
function detectInitialLang(): LangCode {
  if (typeof window === "undefined") return DEFAULT_LANG;
  try {
    const fromUrl = new URLSearchParams(window.location.search).get("lang");
    if (fromUrl && LANG_MAP[fromUrl.toLowerCase()]) return fromUrl.toLowerCase() as LangCode;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && LANG_MAP[stored]) return stored as LangCode;
  } catch {
    // localStorage bisa terblokir — abaikan
  }
  return detectFromBrowser() ?? DEFAULT_LANG;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Selalu mulai dari 'id' agar SSR & render pertama client identik (no hydration mismatch)
  const [lang, setLangState] = useState<LangCode>(DEFAULT_LANG);
  const initializedRef = useRef(false);

  // Deteksi bahasa setelah mount (URL -> storage -> browser) via microtask
  // agar setState tidak dipanggil sinkron di dalam effect
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    queueMicrotask(() => {
      setLangState(detectInitialLang());
    });
  }, []);

  // Sinkronkan <html lang/dir> + persist setiap kali bahasa berubah
  useEffect(() => {
    const meta = LANG_MAP[lang];
    const root = document.documentElement;
    root.lang = lang;
    root.dir = meta?.rtl ? "rtl" : "ltr";
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // abaikan
    }
  }, [lang]);

  const setLang = useCallback((code: LangCode) => {
    setLangState(code);
  }, []);

  const t = useCallback(
    (key: keyof Translation): string => {
      const dict = TRANSLATIONS[lang] as Partial<Translation> | undefined;
      return dict?.[key] ?? TRANSLATIONS.id[key] ?? String(key);
    },
    [lang]
  );

  const value = useMemo<LanguageContextValue>(() => {
    const meta = LANG_MAP[lang] ?? LANG_MAP[DEFAULT_LANG];
    return { lang, setLang, t, meta, rtl: !!meta?.rtl };
  }, [lang, setLang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage harus dipakai di dalam <LanguageProvider>");
  return ctx;
}
