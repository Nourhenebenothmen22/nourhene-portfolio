import { FiBook, FiCheck, FiGlobe, FiStar } from "react-icons/fi";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext.jsx";
import { languagesData } from "../data/languages.js";

function ProgressRing({ percentage, index, shouldAnimate }) {
  const radius = 32;
  const circumference = 2 * Math.PI * radius;

  return (
    <svg viewBox="0 0 100 100" className="h-20 w-20 shrink-0">
      <circle
        cx="50" cy="50" r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        className="text-slate-200 dark:text-white/[0.06]"
      />
      <motion.circle
        cx="50" cy="50" r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        className="text-cyan-500 dark:text-cyan-400"
        strokeDasharray={circumference}
        initial={shouldAnimate ? { strokeDashoffset: circumference } : {}}
        animate={shouldAnimate ? { strokeDashoffset: circumference * (1 - percentage / 100) } : {}}
        transition={{ duration: 1.2, delay: 0.3 + index * 0.1, ease: "easeOut" }}
        transform="rotate(-90 50 50)"
      />
      <text
        x="50" y="50"
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-slate-800 dark:fill-white text-sm font-bold"
      >
        {percentage}%
      </text>
    </svg>
  );
}

const containerVariants = {
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function Languages() {
  const { language, dir } = useLanguage();
  const prefersReduced = useReducedMotion();
  const shouldAnimate = !prefersReduced;
  const copy = languagesData[language];

  return (
    <section id="languages" dir={dir} className="bg-white dark:bg-ink">
      <div className="section-shell">
        <motion.div
          initial={shouldAnimate ? { opacity: 0, y: 12 } : {}}
          whileInView={shouldAnimate ? { opacity: 1, y: 0 } : {}}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-8 md:mb-10"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-600 dark:text-cyan-300">
            <FiGlobe className="mr-1.5 inline-block -mt-0.5" aria-hidden="true" />
            {copy.title}
          </p>
          <h2 className="text-2xl font-bold leading-tight text-slate-950 dark:text-white md:text-3xl">
            {copy.subtitle}
          </h2>
        </motion.div>

        <motion.div
          variants={shouldAnimate ? containerVariants : {}}
          initial={shouldAnimate ? "hidden" : {}}
          whileInView={shouldAnimate ? "visible" : {}}
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {copy.items.map((item, i) => (
            <motion.article
              key={item.name}
              variants={shouldAnimate ? cardVariants : {}}
              className="group relative rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-lg dark:border-white/[0.06] dark:bg-white/[0.03] dark:shadow-xl dark:shadow-black/10 dark:hover:border-cyan-400/30 dark:hover:shadow-[0_0_28px_rgba(34,211,238,0.06)]"
            >
              <div className="pointer-events-none absolute -inset-1 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:opacity-0">
                <div className="h-full w-full rounded-2xl bg-cyan-400/[0.03] blur-xl" />
              </div>

              <div className="relative mb-4 flex justify-center">
                {item.percentage !== null ? (
                  <ProgressRing percentage={item.percentage} index={i} shouldAnimate={shouldAnimate} />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-cyan-400/30 bg-cyan-400/[0.03]">
                    <FiBook className="text-xl text-cyan-400/60" aria-hidden="true" />
                  </div>
                )}
              </div>

              <h3 className="text-lg font-extrabold text-slate-950 dark:text-white">
                {item.name}
              </h3>
              <p className="mt-0.5 text-sm font-medium text-slate-600 dark:text-slate-300">
                {item.level}
              </p>

              <div className="mt-2 flex items-center justify-center gap-1 text-xs font-semibold">
                {item.native ? (
                  <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300">
                    <FiStar className="text-[10px]" aria-hidden="true" />
                    {item.status}
                  </span>
                ) : item.percentage !== null ? (
                  <span className="flex items-center gap-1 rounded-full bg-cyan-50 px-2.5 py-1 text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-300">
                    <FiCheck className="text-[10px]" aria-hidden="true" />
                    {item.status}
                  </span>
                ) : (
                  <span className="flex items-center gap-1 rounded-full bg-violet-50 px-2.5 py-1 text-violet-700 dark:bg-violet-400/10 dark:text-violet-300">
                    <motion.span
                      animate={shouldAnimate ? { opacity: [0.5, 1, 0.5] } : {}}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="inline-block h-1.5 w-1.5 rounded-full bg-current"
                    />
                    {item.status}
                  </span>
                )}
              </div>

              <p className="mt-3 text-xs leading-relaxed italic text-slate-500 dark:text-slate-400">
                &ldquo;{item.useCase}&rdquo;
              </p>

              {item.cefr && (
                <div className="mt-3">
                  <span className="inline-block rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-bold tracking-wider text-slate-500 dark:border-white/[0.06] dark:bg-white/[0.04] dark:text-white/40">
                    {item.cefr}
                  </span>
                </div>
              )}
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial={shouldAnimate ? { opacity: 0, y: 8 } : {}}
          whileInView={shouldAnimate ? { opacity: 1, y: 0 } : {}}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
          className="mt-6 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-sm text-slate-500 dark:border-white/[0.06] dark:bg-white/[0.02] dark:text-white/50"
        >
          <FiGlobe className="mr-2 inline-block" aria-hidden="true" />
          {copy.summary}
        </motion.div>
      </div>
    </section>
  );
}
