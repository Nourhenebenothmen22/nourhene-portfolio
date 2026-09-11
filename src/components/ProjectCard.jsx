import { useReducedMotion } from "framer-motion";
import { FaGithub, FaYoutube } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext.jsx";
import { publicAsset } from "../utils/publicAsset.js";
import useInView from "../hooks/useInView.js";

export default function ProjectCard({ project, index }) {
  const { t } = useLanguage();
  const copy = t.projects.items[project.key];
  const prefersReduced = useReducedMotion();
  const [ref, inView] = useInView({ threshold: 0.2 });
  const show = prefersReduced || inView;

  const categoryLabel =
    project.category === "ai"
      ? t.projects.filters.ai
      : t.projects.filters.web;

  return (
    <article
      ref={ref}
      className={`animate-in group glass glow-border flex h-full flex-col overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-cyan-500/10 ${
        show ? "visible" : ""
      }`}
      style={{ transitionDelay: `${index * 0.06}s` }}
    >
      {/* Image with gradient overlay and category badge */}
      <div className="relative aspect-video overflow-hidden rounded-t-3xl bg-slate-100 dark:bg-slate-950">
        <img
          src={publicAsset(project.image)}
          alt={`${t.projects.alt} ${copy.title}`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />

        {/* Category Pill on Image */}
        <div className="absolute left-4 top-4">
          <span className="inline-flex items-center rounded-full bg-slate-950/80 px-3 py-1 text-xs font-bold text-cyan-300 backdrop-blur-md border border-cyan-400/30 shadow-md">
            {categoryLabel}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="text-xl font-black leading-snug text-slate-950 dark:text-white sm:text-2xl">
          {copy.title}
        </h3>

        {/* Tech tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-blue-200/80 bg-blue-50/70 px-2.5 py-0.5 text-xs font-semibold text-blue-700 dark:border-cyan-400/20 dark:bg-cyan-950/40 dark:text-cyan-200"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300 text-sm sm:text-base">
          {copy.description}
        </p>

        {/* Action Buttons */}
        <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
          {project.github && project.github !== "#" ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-cyan-400 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
            >
              <FaGithub className="text-sm" />
              <span>{t.projects.buttons.github}</span>
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
              <FaGithub className="text-sm" />
              <span>GitHub (Repo Privé)</span>
            </span>
          )}

          {project.youtube && (
            <a
              href={project.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-red-200/80 bg-red-50/70 px-4 py-2 text-xs font-bold text-red-700 transition hover:-translate-y-0.5 hover:bg-red-100 dark:border-red-500/20 dark:bg-red-950/40 dark:text-red-300 dark:hover:bg-red-900/40 focus:outline-cyan-400"
            >
              <FaYoutube className="text-sm text-red-600 dark:text-red-400" />
              <span>{t.projects.buttons.youtube || "Démo YouTube"}</span>
            </a>
          )}

          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-xs font-bold transition hover:-translate-y-0.5 hover:border-blue-400 focus:outline-cyan-400 dark:border-white/15"
            >
              <FiExternalLink /> {t.projects.buttons.details}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
