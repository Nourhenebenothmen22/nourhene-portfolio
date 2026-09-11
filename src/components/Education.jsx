import { FaGraduationCap } from "react-icons/fa6";
import SectionHeader from "./SectionHeader.jsx";
import { educationItems } from "../data/education.js";
import { useLanguage } from "../context/LanguageContext.jsx";
import useInView from "../hooks/useInView.js";

export default function Education() {
  const { t, dir } = useLanguage();

  return (
    <section id="education" dir={dir} className="bg-slate-50/70 dark:bg-navy/70">
      <div className="section-shell">
        <SectionHeader eyebrow={t.sections.educationEyebrow} title={t.sections.educationTitle} />
        <div className="relative">
          {/* Vertical line with LTR/RTL support */}
          <div className="absolute bottom-0 top-0 hidden w-px bg-gradient-to-b from-blue-400 via-cyan-400 to-violet-400 dark:from-cyan-400/40 dark:to-violet-400/30 ltr:left-6 rtl:right-6 md:block" />

          <div className="grid gap-5">
            {educationItems.map((item, index) => {
              const copy = t.education.items[item.key];
              return (
                <EducationCard key={item.key} item={copy} index={index} />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function EducationCard({ item, index }) {
  const [ref, inView] = useInView({ threshold: 0.25 });

  return (
    <article
      ref={ref}
      className={`animate-in-left flex flex-col md:flex-row items-start gap-4 ${inView ? "visible" : ""}`}
      style={{ transitionDelay: `${index * 0.06}s` }}
    >
      <div className="relative z-10 hidden h-12 w-12 shrink-0 place-items-center rounded-full border border-blue-200 bg-white text-electric shadow-lg shadow-slate-900/10 dark:border-cyan-300/20 dark:bg-slate-950 dark:text-cyan-300 md:grid">
        <FaGraduationCap className="text-lg" />
      </div>
      <div className="glass glow-border flex-1 rounded-3xl p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-cyan-500/10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-xl font-black text-slate-950 dark:text-white">{item.title}</h3>
            <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300 text-sm sm:text-base">{item.degree}</p>
          </div>
          <span className="w-fit shrink-0 rounded-full border border-blue-100 bg-blue-50/80 px-4 py-1.5 text-xs font-bold text-blue-700 dark:border-cyan-300/20 dark:bg-cyan-950/50 dark:text-cyan-200 shadow-sm">
            {item.year}
          </span>
        </div>
      </div>
    </article>
  );
}
