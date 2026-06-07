import { FaGithub } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext.jsx";
import { publicAsset } from "../utils/publicAsset.js";

export default function ProjectCard({ project, index }) {
  const { t } = useLanguage();
  const copy = t.projects.items[project.key];
  return (
    <motion.article initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ delay: index * 0.05 }} className="group glass flex h-full flex-col overflow-hidden rounded-3xl transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10 dark:hover:shadow-black/25">
      <div className="relative aspect-video overflow-hidden rounded-t-3xl bg-slate-100 dark:bg-slate-950">
        <img src={publicAsset(project.image)} alt={`${t.projects.alt} ${copy.title}`} className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.025]" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-2xl font-extrabold leading-tight text-slate-950 dark:text-white">{copy.title}</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:border-cyan-300/15 dark:bg-cyan-300/10 dark:text-cyan-100">{tag}</span>
          ))}
        </div>
        <p className="mt-5 line-clamp-6 leading-7 text-slate-700 dark:text-slate-200">{copy.description}</p>
        <div className="mt-auto flex flex-wrap gap-3 pt-6">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white transition hover:-translate-y-0.5 focus:outline-cyan-400 dark:bg-white dark:text-slate-950">
            <FaGithub /> {t.projects.buttons.github}
          </a>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-bold transition hover:-translate-y-0.5 hover:border-blue-400 focus:outline-cyan-400 dark:border-white/15">
              <FiExternalLink /> {t.projects.buttons.details}
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
