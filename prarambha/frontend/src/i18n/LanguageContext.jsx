import React, { createContext, useContext, useState, useMemo } from "react";
import en from "./en.json";
import mr from "./mr.json";
import hi from "./hi.json";

const translations = {
  en,
  mr,
  hi,
};

function resolveTranslation(dict, path) {
  const keys = path.split(".");
  let value = dict;

  for (const key of keys) {
    if (value && typeof value === "object" && key in value) {
      value = value[key];
    } else {
      return undefined;
    }
  }

  return typeof value === "string" ? value : undefined;
}

const LanguageContext = createContext({
  language: "en",
  setLanguage: () => {},
  t: (key) => resolveTranslation(translations.en, key) ?? key,
  supportedLanguages: [
    { code: "en", name: "English", label: "English" },
    { code: "mr", name: "मराठी", label: "Marathi" },
    { code: "hi", name: "हिंदी", label: "Hindi" },
  ],
});

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("krishimitra_lang") || "en";
  });

  const handleSetLanguage = (newLang) => {
    if (translations[newLang]) {
      setLanguage(newLang);
      localStorage.setItem("krishimitra_lang", newLang);
    }
  };

  const t = useMemo(() => {
    const currentDict = translations[language] || translations.en;
    const fallbackDict = translations.en;

    return (path) => {
      const currentValue = resolveTranslation(currentDict, path);
      if (currentValue) return currentValue;

      const fallbackValue = resolveTranslation(fallbackDict, path);
      if (fallbackValue) return fallbackValue;

      return path;
    };
  }, [language]);

  const value = {
    language,
    setLanguage: handleSetLanguage,
    t,
    supportedLanguages: [
      { code: "en", name: "English", label: "English" },
      { code: "mr", name: "मराठी", label: "Marathi" },
      { code: "hi", name: "हिंदी", label: "Hindi" },
    ],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
export default LanguageContext;
