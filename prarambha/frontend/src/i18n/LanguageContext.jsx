import React, { createContext, useContext, useState, useMemo } from "react";
import en from "./en.json";
import mr from "./mr.json";
import hi from "./hi.json";

const translations = {
  en,
  mr,
  hi,
};

const LanguageContext = createContext({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
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
      const keys = path.split(".");
      let val = currentDict;
      for (const k of keys) {
        if (val && typeof val === "object" && k in val) {
          val = val[k];
        } else {
          val = undefined;
          break;
        }
      }

      if (val !== undefined && typeof val === "string") {
        return val;
      }

      // Fallback to English
      let fallbackVal = fallbackDict;
      for (const k of keys) {
        if (fallbackVal && typeof fallbackVal === "object" && k in fallbackVal) {
          fallbackVal = fallbackVal[k];
        } else {
          return path;
        }
      }
      return typeof fallbackVal === "string" ? fallbackVal : path;
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
