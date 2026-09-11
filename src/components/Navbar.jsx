import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FaMoon, FaSun } from "react-icons/fa6";
import {
  FiAward,
  FiBriefcase,
  FiCpu,
  FiFolder,
  FiGlobe,
  FiMail,
  FiMenu,
  FiUser,
  FiX,
} from "react-icons/fi";
import { TbCertificate } from "react-icons/tb";
import { useLanguage } from "../context/LanguageContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import { profileData } from "../data/profile.js";
import { publicAsset } from "../utils/publicAsset.js";

const logoImage = "/image-portfolio/nourhene-profile.webp";
const languageCodes = ["fr", "en", "ar"];

export default function Navbar() {
  const { language, setLanguage, t, dir } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const profile = profileData[language];
  const prefersReduced = useReducedMotion();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "#hero", label: t.nav.about, icon: FiUser },
    { href: "#experience", label: t.nav.experience, icon: FiBriefcase },
    { href: "#projects", label: t.nav.projects, icon: FiFolder },
    { href: "#skills", label: t.nav.skills, icon: FiCpu },
    { href: "#certifications", label: t.nav.certifications, icon: TbCertificate },
    { href: "#education", label: t.nav.education, icon: FiAward },
    { href: "#contact", label: t.nav.contact, icon: FiMail },
  ];

  function closeMobile() {
    setMobileOpen(false);
  }

  return (
    <motion.header
      initial={!prefersReduced ? { y: -24, opacity: 0 } : {}}
      animate={!prefersReduced ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3"
      dir={dir}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-2.5 shadow-lg shadow-slate-900/5 backdrop-blur-xl dark:border-white/10 dark:bg-navy/90 dark:shadow-black/25">
        {/* Left: Brand & Availability */}
        <div className="flex items-center gap-3">
          <a
            href="#hero"
            className="group flex items-center gap-3 focus:outline-cyan-400"
            aria-label={profile.name}
            onClick={closeMobile}
          >
            <div className="relative">
              <img
                src={publicAsset(logoImage)}
                alt={profile.logoAlt}
                className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-sm transition-transform duration-300 group-hover:scale-105 dark:border-cyan-400/30"
              />
              <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-white bg-emerald-500 dark:border-navy" />
              </span>
            </div>
            <div className="hidden sm:block">
              <span className="block text-sm font-extrabold tracking-tight text-slate-950 dark:text-white">
                {profile.name}
              </span>
              <span className="block text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                {t.nav.available}
              </span>
            </div>
          </a>
        </div>

        {/* Center: Desktop Navigation Links */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-2.5 xl:px-3.5 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-blue-50 hover:text-electric focus:outline-cyan-400 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-cyan-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right: Language + Theme Toggle + Mobile Hamburger */}
        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <div className="relative flex items-center">
            <FiGlobe className="pointer-events-none absolute left-3 text-xs text-slate-500 dark:text-slate-400 rtl:left-auto rtl:right-3" />
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              aria-label={t.nav.language}
              className="h-9 cursor-pointer appearance-none rounded-full border border-slate-200/80 bg-slate-50/80 py-1 pl-8 pr-4 text-xs font-bold text-slate-800 transition hover:border-cyan-400 focus:outline-cyan-400 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-cyan-400 rtl:pl-4 rtl:pr-8"
            >
              {languageCodes.map((code) => (
                <option key={code} value={code} className="dark:bg-navy dark:text-white">
                  {t.nav.languages[code]}
                </option>
              ))}
            </select>
          </div>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={t.nav.theme}
            className="grid h-9 w-9 place-items-center rounded-full border border-slate-200/80 bg-slate-50/80 text-sm text-slate-700 transition hover:border-cyan-400 hover:text-electric focus:outline-cyan-400 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-cyan-400 dark:hover:text-cyan-300"
          >
            {theme === "dark" ? <FaSun className="text-amber-400" /> : <FaMoon />}
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? t.nav.close : t.nav.menu}
            className="grid h-9 w-9 place-items-center rounded-full border border-slate-200/80 bg-slate-50/80 text-base text-slate-800 transition hover:border-cyan-400 lg:hidden dark:border-white/10 dark:bg-white/5 dark:text-white"
          >
            {mobileOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 p-4 shadow-xl backdrop-blur-xl lg:hidden dark:border-white/10 dark:bg-navy/95 dark:shadow-black/40"
          >
            <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-3 dark:border-white/10">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Navigation</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {t.nav.available}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={closeMobile}
                    className="flex items-center gap-2.5 rounded-xl border border-transparent bg-slate-50/70 p-3 text-xs font-bold text-slate-800 transition hover:border-cyan-400 hover:bg-blue-50/70 hover:text-electric dark:bg-white/5 dark:text-slate-200 dark:hover:border-cyan-400/30 dark:hover:bg-white/10 dark:hover:text-cyan-300"
                  >
                    <Icon className="text-sm text-cyan-600 dark:text-cyan-400" />
                    <span>{link.label}</span>
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
