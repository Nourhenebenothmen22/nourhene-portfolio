import { motion, useReducedMotion } from "framer-motion";
import SectionHeader from "./SectionHeader.jsx";
import { technicalSkills } from "../data/skills.js";
import { useLanguage } from "../context/LanguageContext.jsx";

const accentStyles = {
  cyan: {
    badge: "border-cyan-500/20 bg-cyan-500/10 text-cyan-800 dark:text-cyan-200 dark:bg-cyan-950/40",
    iconBg: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
    glow: "hover:shadow-cyan-500/10",
  },
  blue: {
    badge: "border-blue-500/20 bg-blue-500/10 text-blue-800 dark:text-blue-200 dark:bg-blue-950/40",
    iconBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    glow: "hover:shadow-blue-500/10",
  },
  violet: {
    badge: "border-violet-500/20 bg-violet-500/10 text-violet-800 dark:text-violet-200 dark:bg-violet-950/40",
    iconBg: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    glow: "hover:shadow-violet-500/10",
  },
  emerald: {
    badge: "border-emerald-500/20 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200 dark:bg-emerald-950/40",
    iconBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    glow: "hover:shadow-emerald-500/10",
  },
  amber: {
    badge: "border-amber-500/20 bg-amber-500/10 text-amber-800 dark:text-amber-200 dark:bg-amber-950/40",
    iconBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    glow: "hover:shadow-amber-500/10",
  },
};

export default function Skills() {
  const { language, t, dir } = useLanguage();
  const prefersReduced = useReducedMotion();

  return (
    <section id="skills" dir={dir} className="bg-slate-50/70 dark:bg-navy/60">
      <motion.div
        initial={!prefersReduced ? { opacity: 0, y: 16 } : {}}
        whileInView={!prefersReduced ? { opacity: 1, y: 0 } : {}}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="section-shell"
      >
        <SectionHeader eyebrow={t.sections.skillsEyebrow} title={t.stack.title} />
        <p className="mb-10 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base md:text-lg">
          {t.stack.description}
        </p>

        {/* 5 Technical Skills Cards from CV */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {technicalSkills.map((category, index) => {
            const Icon = category.icon;
            const accent = accentStyles[category.accent] || accentStyles.cyan;
            const title = category.title[language] || category.title.fr;

            return (
              <motion.article
                key={category.id}
                initial={!prefersReduced ? { opacity: 0, y: 18 } : {}}
                whileInView={!prefersReduced ? { opacity: 1, y: 0 } : {}}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className={`glass glow-border rounded-3xl p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${accent.glow}`}
              >
                {/* Header */}
                <div className="flex items-center gap-3.5 mb-5">
                  <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${accent.iconBg} text-xl shadow-sm`}>
                    <Icon />
                  </div>
                  <h3 className="text-lg font-black tracking-tight text-slate-950 dark:text-white">
                    {title}
                  </h3>
                </div>

                {/* Skills tags list */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`inline-flex items-center rounded-xl border px-3 py-1 text-xs font-bold transition-transform hover:scale-105 ${accent.badge}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
