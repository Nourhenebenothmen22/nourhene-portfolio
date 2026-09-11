import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import SectionHeader from "./SectionHeader.jsx";
import ProjectCard from "./ProjectCard.jsx";
import { projects } from "../data/projects.js";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function Projects() {
  const { t, dir } = useLanguage();
  const prefersReduced = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { key: "all", label: t.projects.filters.all },
    { key: "ai", label: t.projects.filters.ai },
    { key: "web", label: t.projects.filters.web },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <section id="projects" dir={dir} className="bg-white dark:bg-ink">
      <motion.div
        initial={!prefersReduced ? { opacity: 0, y: 16 } : {}}
        whileInView={!prefersReduced ? { opacity: 1, y: 0 } : {}}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="section-shell"
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow={t.sections.projectsEyebrow}
            title={t.sections.projectsTitle}
          />

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pb-6">
            {filters.map((filter) => {
              const isActive = activeFilter === filter.key;
              return (
                <button
                  key={filter.key}
                  type="button"
                  onClick={() => setActiveFilter(filter.key)}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 via-cyan-500 to-violet-600 text-white shadow-md shadow-blue-500/25"
                      : "border border-slate-200 bg-slate-50 text-slate-700 hover:border-cyan-400 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-cyan-400/40"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid gap-6 lg:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.key}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
}
