import { useEffect, useState } from "react";
import { FaEnvelope, FaGithub, FaLinkedin, FaReact, FaYoutube } from "react-icons/fa6";
import { FiDownload, FiSend } from "react-icons/fi";
import { TbRobot, TbSparkles } from "react-icons/tb";
import { SiFastapi, SiPostgresql, SiPython, SiTypescript } from "react-icons/si";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext.jsx";
import { profileData } from "../data/profile.js";
import { publicAsset } from "../utils/publicAsset.js";

const links = {
  email: "#contact",
  linkedin: "https://www.linkedin.com/in/nourhene-ben-othmen-dev/",
  github: "https://github.com/Nourhenebenothmen22",
  youtube: "https://www.youtube.com/@JnounAI",
};

const profileImage = "/image-portfolio/nourhene-profile.webp";

function useTypewriter(words, speed = 80, delay = 2200) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (!words || words.length === 0) return;
    if (subIndex === words[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), delay);
      return () => clearTimeout(timeout);
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words, speed, delay]);

  return words && words.length > 0 ? words[index].substring(0, subIndex) : "";
}

const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const fadeUp = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.45, ease: "easeOut" } },
};

const scaleFade = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Hero() {
  const { language, t, dir } = useLanguage();
  const profile = profileData[language];
  const prefersReduced = useReducedMotion();
  const shouldAnimate = !prefersReduced;
  const typedWord = useTypewriter(t.hero.typingWords);

  return (
    <section
      id="hero"
      dir={dir}
      className="professional-bg relative flex min-h-dvh flex-col justify-center px-4 pt-28 pb-16 md:pt-32 md:pb-20"
    >
      {/* Decorative top accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          variants={shouldAnimate ? containerVariants : {}}
          initial={shouldAnimate ? "hidden" : {}}
          animate={shouldAnimate ? "visible" : {}}
          className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]"
        >
          {/* Left: Text & CTAs */}
          <div className="text-center lg:text-start">
            {/* Availability / Eyebrow badge */}
            {/* Availability Eyebrow */}
            <motion.div variants={shouldAnimate ? fadeUp : {}} className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-black text-emerald-800 dark:border-emerald-400/30 dark:bg-emerald-950/40 dark:text-emerald-300 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>{t.nav.available}</span>
            </motion.div>

            {/* Main title */}
            <motion.h1
              variants={shouldAnimate ? fadeUp : {}}
              className="max-w-4xl text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl md:text-5xl lg:text-6xl"
            >
              <span className="block">{profile.name}</span>
              <span className="mt-2 block text-2xl font-extrabold text-slate-700 dark:text-slate-300 sm:text-3xl md:text-4xl">
                {t.hero.title}
              </span>
            </motion.h1>

            {/* Typewriter subtitle */}
            <motion.div
              variants={shouldAnimate ? fadeUp : {}}
              className="mt-4 flex min-h-[36px] flex-wrap items-center justify-center gap-2 text-base font-bold sm:text-lg lg:justify-start"
            >
              <span className="text-slate-600 dark:text-slate-400">{t.hero.typingPrefix} :</span>
              <span className="gradient-text font-black tracking-wide">
                {typedWord}
                <span className="typewriter-cursor" />
              </span>
            </motion.div>

            {/* Short bio */}
            <motion.p
              variants={shouldAnimate ? fadeUp : {}}
              className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-base"
            >
              {t.about.paragraph}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={shouldAnimate ? fadeUp : {}}
              className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            >
              <a
                href={publicAsset("/cv/Resume_Nourhene_Ben_Othmen.pdf")}
                target="_blank"
                rel="noopener noreferrer"
                className="shimmer-btn inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-violet-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition hover:-translate-y-0.5 hover:shadow-cyan-500/30 focus:outline-cyan-400"
              >
                <FiDownload className="text-base" />
                <span>{t.hero.cv}</span>
              </a>

              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent("open-ai-copilot"))}
                className="group relative inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-5 py-3 text-sm font-bold text-cyan-800 transition hover:-translate-y-0.5 hover:bg-cyan-500/20 hover:shadow-lg hover:shadow-cyan-500/20 dark:border-cyan-400/30 dark:bg-cyan-950/50 dark:text-cyan-200 dark:hover:bg-cyan-900/50 focus:outline-cyan-400"
                aria-label="Open AI Copilot"
              >
                <TbRobot className="text-lg text-cyan-600 dark:text-cyan-300 transition-transform group-hover:scale-110" />
                <span>{language === "en" ? "Ask AI Copilot" : language === "ar" ? "اسأل المساعد الذكي" : "Poser une question à l'IA"}</span>
              </button>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-5 py-3 text-sm font-bold text-blue-700 transition hover:-translate-y-0.5 hover:bg-blue-100 dark:border-cyan-400/20 dark:bg-cyan-950/40 dark:text-cyan-200 dark:hover:bg-cyan-900/40 focus:outline-cyan-400"
              >
                <FiSend className="text-sm" />
                <span>{t.hero.contactBtn || "Contact"}</span>
              </a>

              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300/80 bg-white/80 px-5 py-3 text-sm font-bold text-slate-800 transition hover:-translate-y-0.5 hover:border-slate-400 focus:outline-cyan-400 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-white/30"
              >
                <FiArrowDown className="text-sm" />
                <span>{t.hero.projects}</span>
              </a>

              {/* Social icons */}
              <div className="flex items-center gap-2 pt-2 sm:pt-0">
                {[
                  [FaLinkedin, links.linkedin, t.hero.social.linkedin],
                  [FaGithub, links.github, t.hero.social.github],
                  [FaYoutube, links.youtube, t.hero.social.youtube],
                  [FaEnvelope, links.email, t.hero.social.email],
                ].map(([Icon, href, label]) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={label}
                    className="grid h-11 w-11 place-items-center rounded-full border border-slate-200/80 bg-white/80 text-slate-700 transition hover:-translate-y-1 hover:border-cyan-400 hover:text-cyan-600 focus:outline-cyan-400 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-cyan-400 dark:hover:text-cyan-300"
                  >
                    <Icon className="text-base" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Avatar with floating badges */}
          <motion.div
            variants={shouldAnimate ? scaleFade : {}}
            className="relative mx-auto grid w-full max-w-[380px] place-items-center lg:mx-0 lg:justify-self-end"
          >
            {/* Background glowing rings */}
            <div className="avatar-float relative h-72 w-72 md:h-88 md:w-88">
              <div className="avatar-ring absolute -inset-4 rounded-full bg-gradient-to-tr from-blue-600 via-cyan-400 to-violet-600 opacity-70 blur-md" />
              <div className="absolute -inset-8 rounded-full bg-cyan-400/15 blur-2xl dark:bg-cyan-300/15" />

              {/* Avatar Frame */}
              <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-white/90 bg-white p-2.5 shadow-2xl shadow-slate-900/20 dark:border-cyan-300/30 dark:bg-navy dark:shadow-black/50">
                <img
                  src={publicAsset(profileImage)}
                  alt={profile.imageAlt}
                  className="h-full w-full rounded-full object-cover object-center transition-transform duration-700 hover:scale-105"
                />
              </div>

              {/* Floating Tech Chips around avatar */}
              <div className="absolute -left-3 top-6 flex items-center gap-2 rounded-2xl border border-slate-200/80 bg-white/90 px-3 py-1.5 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-navy/90">
                <SiPython className="text-amber-500" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Python & IA</span>
              </div>

              <div className="absolute -right-3 top-16 flex items-center gap-2 rounded-2xl border border-slate-200/80 bg-white/90 px-3 py-1.5 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-navy/90">
                <FaReact className="text-cyan-500 animate-spin" style={{ animationDuration: "10s" }} />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">React & Next.js</span>
              </div>

              <div className="absolute -left-2 bottom-10 flex items-center gap-2 rounded-2xl border border-slate-200/80 bg-white/90 px-3 py-1.5 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-navy/90">
                <SiFastapi className="text-emerald-500" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">FastAPI & RAG</span>
              </div>

              <div className="absolute -right-2 bottom-8 flex items-center gap-2 rounded-2xl border border-slate-200/80 bg-white/90 px-3 py-1.5 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-navy/90">
                <SiPostgresql className="text-blue-500" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">pgvector & SQL</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Impact Statistics Ribbon */}
        {t.hero.stats && (
          <motion.div
            initial={shouldAnimate ? { opacity: 0, y: 24 } : {}}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:mt-20"
          >
            {Object.entries(t.hero.stats).map(([key, stat]) => (
              <div
                key={key}
                className="glass glow-border rounded-2xl p-4 text-center transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-cyan-500/5"
              >
                <span className="block text-2xl font-black tracking-tight gradient-text sm:text-3xl md:text-4xl">
                  {stat.value}
                </span>
                <span className="mt-1 block text-xs font-bold text-slate-600 dark:text-slate-300">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
