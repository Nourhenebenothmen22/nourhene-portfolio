import { FiGlobe, FiStar } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext.jsx";
import { languagesData } from "../data/languages.js";
import useInView from "../hooks/useInView.js";

export default function Languages() {
  const { language, dir } = useLanguage();
  const copy = languagesData[language];
  const [headerRef, headerInView] = useInView({ threshold: 0.35 });

  return (
    <section id="languages" dir={dir} className="bg-white dark:bg-ink">
      <div className="section-shell">
        <div
          ref={headerRef}
          className={`animate-in glass glow-border relative mx-auto max-w-5xl overflow-hidden rounded-3xl p-6 shadow-xl shadow-slate-900/8 dark:shadow-black/20 md:p-8 ${headerInView ? "visible" : ""}`}
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-violet-600" />
          <div className="absolute -right-20 -top-24 h-48 w-48 rounded-full bg-cyan-300/15 blur-3xl dark:bg-cyan-300/10" />
          <div className="absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-violet-400/15 blur-3xl dark:bg-violet-400/10" />

          <div className="relative mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-600 dark:text-cyan-300">{copy.title}</p>
              <h2 className="text-3xl font-bold leading-tight text-slate-950 dark:text-white md:text-5xl">{copy.subtitle}</h2>
            </div>
            <div className="hidden h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 via-cyan-500 to-violet-600 text-2xl text-white shadow-lg shadow-blue-500/20 md:grid">
              <FiGlobe aria-hidden="true" />
            </div>
          </div>

          <div className="relative divide-y divide-slate-200/70 dark:divide-white/10">
            {copy.items.map((item, index) => (
              <LanguageItem key={item.name} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LanguageItem({ item, index }) {
  const [ref, inView] = useInView({ threshold: 0.35 });

  return (
    <article
      ref={ref}
      className={`animate-in group py-4 first:pt-0 last:pb-0 ${inView ? "visible" : ""}`}
      style={{ transitionDelay: `${index * 0.08}s` }}
    >
      <div className="rounded-2xl p-3 transition duration-300 hover:-translate-y-0.5 hover:bg-white/65 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:bg-white/5 dark:hover:shadow-cyan-500/10">
        <div className="grid gap-4 md:grid-cols-[minmax(220px,0.9fr)_1fr_auto] md:items-center">
          <div className="flex items-center gap-4">
            <div
              className={`grid h-11 w-11 shrink-0 place-items-center rounded-full text-lg shadow-md ${
                item.native
                  ? "bg-gradient-to-br from-blue-600 via-cyan-500 to-violet-600 text-white shadow-blue-500/25 ring-4 ring-cyan-300/20"
                  : "border border-blue-100 bg-blue-50 text-electric dark:border-cyan-300/15 dark:bg-cyan-300/10 dark:text-cyan-100"
              }`}
            >
              {item.native ? <FiStar aria-hidden="true" /> : <FiGlobe aria-hidden="true" />}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-extrabold text-slate-950 dark:text-white">{item.name}</h3>
                {item.native && (
                  <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.12em] text-cyan-700 shadow-sm dark:bg-cyan-300/10 dark:text-cyan-100">
                    {item.nativeBadge}
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm font-semibold text-slate-600 dark:text-slate-300">
                {item.levelLabel}: {item.level}
              </p>
            </div>
          </div>

          <div className="min-w-0">
            <div className="mb-2 flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
              <span>{item.cefrLabel}: {item.cefr}</span>
              <span>{item.percentageLabel}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-200/90 shadow-inner dark:bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-violet-600 animate-progress"
                style={{
                  "--progress-width": `${item.percentage}%`,
                  transitionDelay: `${index * 0.1 + 0.15}s`,
                  width: inView ? `${item.percentage}%` : "0%",
                  transition: "width 0.85s ease-out",
                }}
              />
            </div>
          </div>

          <span
            className="w-fit rounded-full border border-blue-100 bg-white px-3.5 py-1.5 text-sm font-extrabold text-blue-700 shadow-sm dark:border-cyan-300/15 dark:bg-white/5 dark:text-cyan-100"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "scale(1)" : "scale(0.9)",
              transition: "opacity 0.35s ease-out, transform 0.35s ease-out",
              transitionDelay: `${index * 0.1 + 0.25}s`,
            }}
          >
            {item.percentage}%
          </span>
        </div>
      </div>
    </article>
  );
}
