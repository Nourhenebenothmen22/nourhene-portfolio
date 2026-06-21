import { motion, useReducedMotion } from "framer-motion";
import { FaMoon, FaSun } from "react-icons/fa6";
import { useLanguage } from "../context/LanguageContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import { profileData } from "../data/profile.js";
import { publicAsset } from "../utils/publicAsset.js";

// Replace nourhene-profile.jpg with the real image filename if you change the logo asset.
const logoImage = "/image-portfolio/nourhene-profile.webp";
const languageCodes = ["fr", "en", "ar"];

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const profile = profileData[language];
  const prefersReduced = useReducedMotion();

  return (
    <motion.header
      initial={!prefersReduced ? { y: -20, opacity: 0 } : {}}
      animate={!prefersReduced ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sticky inset-x-0 top-0 z-50 px-3 pt-3"
    >
      <nav className="glass mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-4 py-3 text-sm">
        <a href="#hero" className="flex items-center gap-3 focus:outline-cyan-400" aria-label={profile.name}>
          <img src={publicAsset(logoImage)} alt={profile.logoAlt} className="h-11 w-11 rounded-full border border-white/30 object-cover shadow-sm" />
        </a>
        <div className="flex items-center gap-2">
          <select
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            aria-label={t.nav.language}
            className="h-10 rounded-full border border-slate-300/50 bg-white/70 px-3 text-sm font-bold text-slate-800 transition focus:outline-cyan-400 dark:border-white/15 dark:bg-white/10 dark:text-white"
          >
            {languageCodes.map((code) => (
              <option key={code} value={code}>
                {t.nav.languages[code]}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={t.nav.theme}
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-300/50 text-slate-800 transition hover:border-cyan-400 hover:text-electric focus:outline-cyan-400 dark:border-white/15 dark:text-white"
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </nav>
    </motion.header>
  );
}
