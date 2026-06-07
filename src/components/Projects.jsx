import SectionHeader from "./SectionHeader.jsx";
import ProjectCard from "./ProjectCard.jsx";
import { projects } from "../data/projects.js";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function Projects() {
  const { t } = useLanguage();
  return (
    <section id="projects" className="bg-white dark:bg-ink">
      <div className="section-shell">
        <SectionHeader eyebrow={t.sections.projectsEyebrow} title={t.sections.projectsTitle} />
        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project, index) => <ProjectCard key={project.key} project={project} index={index} />)}
        </div>
      </div>
    </section>
  );
}
