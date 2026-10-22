"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "bn" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (bn: string, en: string) => string;
  isBangla: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_KEY = "KRISHI_DRISHTI_LANGUAGE";

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to Bangla ('bn') for authentic farmer-friendly assistant
  const [language, setLanguageState] = useState<Language>("bn");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LANGUAGE_KEY) as Language;
      if (stored === "bn" || stored === "en") {
        setLanguageState(stored);
      }
    } catch {
      // fallback
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANGUAGE_KEY, lang);
    } catch {
      // ignore
    }
  };

  const toggleLanguage = () => {
    const next = language === "bn" ? "en" : "bn";
    setLanguage(next);
  };

  const t = (bn: string, en: string) => {
    return language === "bn" ? bn : en;
  };

  const isBangla = language === "bn";

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        isBangla,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
