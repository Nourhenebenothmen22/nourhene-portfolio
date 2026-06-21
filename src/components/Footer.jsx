import { motion, useReducedMotion } from "framer-motion";
import { FaEnvelope, FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa6";
import { useLanguage } from "../context/LanguageContext.jsx";
import { profileData } from "../data/profile.js";

export default function Footer() {
  const { language } = useLanguage();
  const profile = profileData[language];
  const prefersReduced = useReducedMotion();

  return (
    <motion.footer
      initial={!prefersReduced ? { opacity: 0, y: 16 } : {}}
      whileInView={!prefersReduced ? { opacity: 1, y: 0 } : {}}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="border-t border-slate-200 bg-white py-8 dark:border-white/10 dark:bg-ink"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-center md:flex-row md:text-start">
        <p className="font-semibold text-slate-700 dark:text-slate-300">
          {profile.name} © 2026 — {profile.footerRole}
        </p>
        <div className="flex gap-3">
          {[
            [FaLinkedin, "LinkedIn", "https://www.linkedin.com/in/nourhene-ben-othmen-dev/"],
            [FaGithub, "GitHub", "https://github.com/Nourhenebenothmen22"],
            [FaYoutube, "YouTube", "https://www.youtube.com/@JnounAI"],
            [FaEnvelope, "Email", "#contact"],
          ].map(([Icon, label, href]) => (
            <a key={label} href={href} aria-label={label} className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-700 transition hover:-translate-y-1 hover:text-electric focus:outline-cyan-400 dark:bg-white/10 dark:text-white">
              <Icon />
            </a>
          ))}
        </div>
      </div>
    </motion.footer>
  );
}
