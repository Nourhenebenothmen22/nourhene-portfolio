import SectionHeader from "./SectionHeader.jsx";
import StackCycleCard from "./StackCycleCard.jsx";
import { stackCycles } from "../data/skills.js";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="bg-slate-50 dark:bg-navy/80">
      <div className="section-shell">
        <SectionHeader eyebrow={t.sections.skillsEyebrow} title={t.stack.title} />
        <p className="mb-10 max-w-3xl text-lg leading-8 text-slate-700 dark:text-slate-200">{t.stack.description}</p>
        <div className="grid gap-6 lg:grid-cols-3">
          {stackCycles.map((cycle, index) => (
            <StackCycleCard key={cycle.id} cycle={cycle} copy={t.stack.cycles[cycle.id]} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
