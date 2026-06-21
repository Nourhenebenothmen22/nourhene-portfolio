import { motion, useReducedMotion } from "framer-motion";
import SectionHeader from "./SectionHeader.jsx";
import ProjectCard from "./ProjectCard.jsx";
import { projects } from "../data/projects.js";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function Projects() {
  const { t } = useLanguage();
  const prefersReduced = useReducedMotion();
  return (
    <section id="projects" className="bg-white dark:bg-ink">
      <motion.div
        initial={!prefersReduced ? { opacity: 0, y: 12 } : {}}
        whileInView={!prefersReduced ? { opacity: 1, y: 0 } : {}}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="section-shell"
      >
        <SectionHeader eyebrow={t.sections.projectsEyebrow} title={t.sections.projectsTitle} />
        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project, index) => <ProjectCard key={project.key} project={project} index={index} />)}
        </div>
      </motion.div>
    </section>
  );
}
