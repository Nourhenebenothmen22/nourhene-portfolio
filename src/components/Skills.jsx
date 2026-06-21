import { motion, useReducedMotion } from "framer-motion";
import SectionHeader from "./SectionHeader.jsx";
import StackCycleCard from "./StackCycleCard.jsx";
import { stackCycles } from "../data/skills.js";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function Skills() {
  const { t } = useLanguage();
  const prefersReduced = useReducedMotion();

  return (
    <section id="skills" className="bg-slate-50 dark:bg-navy/80">
      <motion.div
        initial={!prefersReduced ? { opacity: 0, y: 12 } : {}}
        whileInView={!prefersReduced ? { opacity: 1, y: 0 } : {}}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="section-shell"
      >
        <SectionHeader eyebrow={t.sections.skillsEyebrow} title={t.stack.title} />
        <p className="mb-10 max-w-3xl text-lg leading-8 text-slate-700 dark:text-slate-200">{t.stack.description}</p>
        <div className="grid gap-6 lg:grid-cols-3">
          {stackCycles.map((cycle, index) => (
            <StackCycleCard key={cycle.id} cycle={cycle} copy={t.stack.cycles[cycle.id]} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
