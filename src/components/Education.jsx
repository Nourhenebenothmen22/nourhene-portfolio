import { FaGraduationCap } from "react-icons/fa6";
import SectionHeader from "./SectionHeader.jsx";
import { educationItems } from "../data/education.js";
import { useLanguage } from "../context/LanguageContext.jsx";
import useInView from "../hooks/useInView.js";

export default function Education() {
  const { t } = useLanguage();

  return (
    <section id="education" className="bg-slate-50 dark:bg-navy/80">
      <div className="section-shell">
        <SectionHeader eyebrow={t.sections.educationEyebrow} title={t.sections.educationTitle} />
        <div className="relative">
          <div className="absolute bottom-0 left-6 top-0 hidden w-px bg-gradient-to-b from-blue-300 via-cyan-300 to-violet-300 dark:from-cyan-300/40 dark:to-violet-300/30 md:block" />
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
  const [ref, inView] = useInView({ threshold: 0.35 });

  return (
    <article
      ref={ref}
      className={`animate-in-left grid gap-4 md:grid-cols-[52px_1fr] ${inView ? "visible" : ""}`}
      style={{ transitionDelay: `${index * 0.06}s` }}
    >
      <div className="relative z-10 hidden h-12 w-12 place-items-center rounded-full border border-blue-200 bg-white text-electric shadow-lg shadow-slate-900/10 dark:border-cyan-300/15 dark:bg-slate-950 dark:text-cyan-300 md:grid">
        <FaGraduationCap />
      </div>
      <div className="glass rounded-3xl p-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-xl font-extrabold text-slate-950 dark:text-white">{item.title}</h3>
            <p className="mt-2 leading-7 text-slate-700 dark:text-slate-200">{item.degree}</p>
          </div>
          <span className="w-fit shrink-0 rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700 dark:bg-cyan-300/10 dark:text-cyan-200">
            {item.year}
          </span>
        </div>
      </div>
    </article>
  );
}
