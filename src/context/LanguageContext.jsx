import { createContext, useContext, useMemo, useState } from "react";
import { translations } from "../data/translations.js";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("fr");
  const dir = language === "ar" ? "rtl" : "ltr";
  const t = translations[language];

  const value = useMemo(() => ({ language, setLanguage, dir, t }), [language, dir, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
