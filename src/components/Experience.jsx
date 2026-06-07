import { motion } from "framer-motion";
import { FiBriefcase, FiCalendar, FiMapPin } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext.jsx";
import { experienceData } from "../data/experience.js";

export default function Experience() {
  const { language, dir } = useLanguage();
  const copy = experienceData[language];

  return (
    <section id="experience" dir={dir} className="bg-white dark:bg-ink">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55 }}
          className="mb-12"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-600 dark:text-cyan-300">{copy.title}</p>
          <h2 className="max-w-3xl text-3xl font-bold leading-tight text-slate-950 dark:text-white md:text-5xl">{copy.subtitle}</h2>
        </motion.div>

        <div className="relative mx-auto max-w-6xl">
          <div className="absolute bottom-0 top-0 w-px overflow-hidden rounded-full bg-slate-200 dark:bg-white/10 ltr:left-4 rtl:right-4 md:left-1/2 md:-translate-x-1/2 rtl:md:left-1/2 rtl:md:right-auto">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1.1, ease: "easeInOut" }}
              style={{ transformOrigin: "top" }}
              className="h-full w-full bg-gradient-to-b from-blue-500 via-cyan-400 to-violet-500"
            />
          </div>

          <div className="space-y-8 md:space-y-10">
            {copy.items.map((item, index) => {
              const isEven = index % 2 === 0;
              const sideClass = isEven
                ? "md:col-start-1 md:pr-12 rtl:md:pr-0 rtl:md:pl-12"
                : "md:col-start-2 md:pl-12 rtl:md:pl-0 rtl:md:pr-12";

              return (
                <motion.article
                  key={`${item.organization}-${item.date}`}
                  initial={{ opacity: 0, y: 34 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.24 }}
                  transition={{ delay: index * 0.1, duration: 0.58, ease: "easeOut" }}
                  className="relative grid gap-4 ps-12 md:grid-cols-2 md:ps-0"
                >
                  <motion.div
                    initial={{ scale: 0.65, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ delay: index * 0.1 + 0.12, duration: 0.4, ease: "easeOut" }}
                    className="absolute top-6 z-10 grid h-9 w-9 place-items-center rounded-full border border-blue-200 bg-white text-electric shadow-lg shadow-blue-900/10 ring-8 ring-white dark:border-cyan-300/20 dark:bg-slate-950 dark:text-cyan-200 dark:ring-ink ltr:left-0 rtl:right-0 md:left-1/2 md:-translate-x-1/2 rtl:md:left-1/2 rtl:md:right-auto"
                  >
                    <FiBriefcase aria-hidden="true" />
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -6 }}
                    className={`group ${sideClass}`}
                  >
                    <div className="glass glow-border relative overflow-hidden rounded-2xl p-6 transition duration-300 group-hover:shadow-2xl group-hover:shadow-blue-500/15 dark:group-hover:shadow-cyan-500/10">
                      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-violet-600" />

                      <div className="mb-5 flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-3 py-1 text-xs font-bold text-white shadow-md shadow-blue-500/20">
                          <FiCalendar aria-hidden="true" />
                          {copy.labels.date}: {item.date}
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 dark:border-cyan-300/15 dark:bg-cyan-300/10 dark:text-cyan-100">
                          <FiMapPin aria-hidden="true" />
                          {copy.labels.location}: {item.location}
                        </span>
                      </div>

                      <h3 className="text-xl font-extrabold leading-snug text-slate-950 dark:text-white">{item.organization}</h3>
                      <p className="mt-2 text-sm font-bold text-electric dark:text-cyan-200">
                        {copy.labels.position}: {item.position}
                      </p>

                      <div className="mt-6">
                        <h4 className="text-sm font-extrabold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-300">{copy.labels.missions}</h4>
                        <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700 dark:text-slate-200">
                          {item.missions.map((mission) => (
                            <li key={mission} className="flex gap-2">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />
                              <span>{mission}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-6">
                        <h4 className="text-sm font-extrabold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-300">{copy.labels.technologies}</h4>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {item.technologies.map((technology, tagIndex) => (
                            <motion.span
                              key={technology}
                              initial={{ opacity: 0, y: 8 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.06 + tagIndex * 0.035 }}
                              className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 shadow-sm transition group-hover:border-violet-200 group-hover:bg-violet-50 dark:border-cyan-300/15 dark:bg-cyan-300/10 dark:text-cyan-100 dark:group-hover:border-violet-300/20 dark:group-hover:bg-violet-400/10"
                            >
                              {technology}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
