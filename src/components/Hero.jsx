import { FaEnvelope, FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa6";
import { FiArrowDown, FiDownload } from "react-icons/fi";
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

const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

const fadeUp = {
  hidden: { y: 18 },
  visible: { y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const scaleFade = {
  hidden: { scale: 0.92 },
  visible: { scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function Hero() {
  const { language, t } = useLanguage();
  const profile = profileData[language];
  const prefersReduced = useReducedMotion();
  const shouldAnimate = !prefersReduced;

  return (
    <section id="hero" className="professional-bg relative flex min-h-dvh flex-col justify-center px-4 pt-24 pb-12 md:pb-10">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
      <motion.div
        variants={shouldAnimate ? containerVariants : {}}
        initial={shouldAnimate ? "hidden" : {}}
        animate={shouldAnimate ? "visible" : {}}
        className="mx-auto grid w-full max-w-7xl items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]"
      >
        <div className="text-center lg:text-start">
          <motion.p variants={shouldAnimate ? fadeUp : {}} className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-electric dark:text-cyan-300">{t.sections.aboutEyebrow}</motion.p>
          <motion.p variants={shouldAnimate ? fadeUp : {}} className="mb-4 text-base font-extrabold text-slate-950 dark:text-white">{profile.name}</motion.p>
          <motion.h1 variants={shouldAnimate ? fadeUp : {}} className="max-w-4xl text-3xl font-extrabold leading-tight text-slate-950 dark:text-white md:text-5xl">{t.hero.title}</motion.h1>
          <motion.p variants={shouldAnimate ? fadeUp : {}} className="mt-4 max-w-2xl text-base font-semibold text-slate-700 dark:text-slate-200 md:text-lg">{t.hero.subtitle}</motion.p>
          <motion.p variants={shouldAnimate ? fadeUp : {}} className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300 md:text-base md:line-clamp-3">{t.about.paragraph}</motion.p>
          <motion.div variants={shouldAnimate ? fadeUp : {}} className="mt-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <a href={publicAsset("/cv/Nourhene-Ben-Othmen-CV.pdf")} className="inline-flex items-center gap-2 rounded-full bg-electric px-6 py-3 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 focus:outline-cyan-400">
              <FiDownload /> {t.hero.cv}
            </a>
            <a href="#projects" className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/70 px-6 py-3 font-bold text-slate-950 transition hover:-translate-y-0.5 hover:border-blue-400 focus:outline-cyan-400 dark:border-white/15 dark:bg-white/10 dark:text-white">
              <FiArrowDown /> {t.hero.projects}
            </a>
            {[
              [FaLinkedin, links.linkedin, t.hero.social.linkedin],
              [FaGithub, links.github, t.hero.social.github],
              [FaYoutube, links.youtube, t.hero.social.youtube],
              [FaEnvelope, links.email, t.hero.social.email],
            ].map(([Icon, href, label]) => (
              <a key={label} href={href} aria-label={label} className="grid h-11 w-11 place-items-center rounded-full border border-slate-300 bg-white/70 text-slate-800 transition hover:-translate-y-0.5 hover:border-blue-400 hover:text-electric focus:outline-cyan-400 dark:border-white/15 dark:bg-white/10 dark:text-white">
                <Icon />
              </a>
            ))}
          </motion.div>
        </div>
        <motion.div variants={shouldAnimate ? scaleFade : {}} className="mx-auto grid w-full max-w-[360px] place-items-center lg:mx-0 lg:justify-self-end">
          <div className="avatar-float relative h-64 w-64 rounded-full md:h-80 md:w-80">
            <div className="avatar-ring absolute -inset-3 rounded-full bg-gradient-to-br from-blue-500 via-cyan-400 to-violet-500 opacity-80 blur-[1px]" />
            <div className="absolute -inset-6 rounded-full bg-cyan-400/10 blur-2xl dark:bg-cyan-300/10" />
            <div className="relative h-full w-full overflow-hidden rounded-full border border-white/50 bg-white p-2 shadow-2xl shadow-slate-900/15 dark:border-cyan-300/20 dark:bg-slate-950 dark:shadow-black/35">
              <img src={publicAsset(profileImage)} alt={profile.imageAlt} className="h-full w-full rounded-full object-cover object-center" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
