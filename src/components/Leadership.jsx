import { useState } from "react";
import { FaAward } from "react-icons/fa6";
import SectionHeader from "./SectionHeader.jsx";
import { leadershipItems } from "../data/leadership.js";
import { useLanguage } from "../context/LanguageContext.jsx";
import { publicAsset } from "../utils/publicAsset.js";
import useInView from "../hooks/useInView.js";

function LeadershipCard({ item, index }) {
  const { t } = useLanguage();
  const [failed, setFailed] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.25 });
  const copy = t.leadership.items[item.key];

  return (
    <article
      ref={ref}
      className={`animate-in glass glow-border group flex h-full flex-col overflow-hidden rounded-3xl p-3 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10 dark:hover:shadow-black/25 ${inView ? "visible" : ""}`}
      style={{ transitionDelay: `${index * 0.08}s` }}
    >
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border border-slate-200/70 bg-gradient-to-br from-white via-blue-50 to-violet-50 shadow-inner shadow-slate-900/5 dark:border-white/10 dark:from-slate-950 dark:via-navy dark:to-violet-950 dark:shadow-black/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.18),transparent_34%),radial-gradient(circle_at_75%_70%,rgba(124,58,237,0.16),transparent_36%)]" />
        {!failed ? (
          <img
            src={publicAsset(item.image)}
            alt={`${t.leadership.imageAlt} ${copy.title}`}
            decoding="async"
            fetchpriority="high"
            onError={() => setFailed(true)}
            className="relative z-10 h-4/5 w-4/5 rounded-xl object-contain object-center drop-shadow-[0_18px_24px_rgba(15,23,42,0.12)] transition duration-500 group-hover:scale-[1.035] dark:drop-shadow-[0_18px_28px_rgba(0,0,0,0.35)]"
          />
        ) : (
          <div className="relative z-10 grid place-items-center">
            <div className="grid h-20 w-20 place-items-center rounded-3xl bg-white/70 text-3xl text-electric shadow-lg dark:bg-white/10 dark:text-cyan-200">
              <FaAward />
            </div>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/45 dark:ring-white/10" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 dark:bg-cyan-300/10 dark:text-cyan-200">
          <FaAward /> {copy.role}
        </span>
        <h3 className="mt-4 text-xl font-extrabold leading-tight text-slate-950 dark:text-white">{copy.title}</h3>
        <p className="mt-4 leading-7 text-slate-700 dark:text-slate-200">{copy.description}</p>
      </div>
    </article>
  );
}

export default function Leadership() {
  const { t } = useLanguage();

  return (
    <section id="leadership" className="bg-white dark:bg-ink">
      <div className="section-shell">
        <SectionHeader eyebrow={t.sections.leadershipEyebrow} title={t.sections.leadershipTitle} />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {leadershipItems.map((item, index) => (
            <LeadershipCard key={item.key} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
