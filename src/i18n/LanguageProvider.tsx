"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { TRANSLATIONS, type Lang, type TKey } from "./translations";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TKey, vars?: Record<string, string | number>) => string;
};

const LanguageContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "ete-lang";

/**
 * Always renders `en` on the server + first client paint — then, on mount,
 * swaps in whatever language the user chose last (persisted in localStorage).
 * This keeps SSR hydration identical and only visibly flips once if needed.
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "hi" || saved === "en") setLangState(saved);
    } catch {
      // localStorage may be unavailable (private mode) — safe to ignore
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      // ignore
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = l === "hi" ? "hi" : "en";
    }
  }, []);

  const t = useCallback(
    (key: TKey, vars?: Record<string, string | number>) => {
      let out = TRANSLATIONS[lang][key] ?? TRANSLATIONS.en[key] ?? key;
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          out = out.replace(`{${k}}`, String(v));
        }
      }
      return out;
    },
    [lang],
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useT() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useT must be used inside <LanguageProvider>");
  return ctx;
}
