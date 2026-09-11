import { motion, useReducedMotion } from "framer-motion";
import { FiAward, FiExternalLink, FiShield } from "react-icons/fi";
import { TbCertificate } from "react-icons/tb";
import { useLanguage } from "../context/LanguageContext.jsx";
import { certificationsData } from "../data/certifications.js";

const issuerColors = {
  IBM: "border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-300",
  Cisco: "border-cyan-500/20 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300",
  "Linux Foundation": "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  "Saylor Academy": "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  "Neoxion Technologies": "border-violet-500/20 bg-violet-500/10 text-violet-700 dark:text-violet-300",
};

export default function Certifications() {
  const { language, dir } = useLanguage();
  const copy = certificationsData[language] || certificationsData.fr;
  const prefersReduced = useReducedMotion();

  return (
    <section id="certifications" dir={dir} className="bg-slate-50/70 dark:bg-navy/60">
      <motion.div
        initial={!prefersReduced ? { opacity: 0, y: 16 } : {}}
        whileInView={!prefersReduced ? { opacity: 1, y: 0 } : {}}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="section-shell"
      >
        <div className="mb-10 md:mb-12">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-cyan-600 dark:text-cyan-400">
            <TbCertificate className="mr-1.5 inline-block text-base -mt-0.5" />
            Certifications
          </p>
          <h2 className="max-w-3xl text-3xl font-black leading-tight text-slate-950 dark:text-white md:text-4xl">
            {copy.title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
            {copy.subtitle}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {copy.items.map((cert, index) => {
            const issuerStyle = issuerColors[cert.issuer] || "border-slate-200 bg-slate-100 text-slate-800";
            const categoryLabel = copy.categories[cert.category];

            return (
              <motion.article
                key={cert.id}
                initial={!prefersReduced ? { opacity: 0, y: 18 } : {}}
                whileInView={!prefersReduced ? { opacity: 1, y: 0 } : {}}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className="glass glow-border flex flex-col justify-between rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-cyan-500/10"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`inline-flex items-center rounded-lg border px-2.5 py-0.5 text-[11px] font-bold ${issuerStyle}`}>
                      {cert.issuer}
                    </span>
                    <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                      {cert.year}
                    </span>
                  </div>

                  <h3 className="text-sm font-black leading-snug text-slate-950 dark:text-white">
                    {cert.title}
                  </h3>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 truncate">
                    {categoryLabel}
                  </span>
                  {cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300"
                    >
                      <FiAward />
                      <FiExternalLink className="text-[10px]" />
                    </a>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
