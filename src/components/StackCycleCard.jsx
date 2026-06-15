import { FiArrowDown, FiArrowRight } from "react-icons/fi";
import useInView from "../hooks/useInView.js";

const accents = {
  cyan: {
    ring: "border-cyan-300/60 dark:border-cyan-300/25",
    soft: "bg-cyan-50 text-cyan-700 dark:bg-cyan-300/10 dark:text-cyan-200",
    line: "from-cyan-400 to-blue-500",
    shadow: "hover:shadow-cyan-900/10",
  },
  violet: {
    ring: "border-violet-300/60 dark:border-violet-300/25",
    soft: "bg-violet-50 text-violet-700 dark:bg-violet-300/10 dark:text-violet-200",
    line: "from-violet-500 to-indigo-500",
    shadow: "hover:shadow-violet-900/10",
  },
  emerald: {
    ring: "border-emerald-300/60 dark:border-emerald-300/25",
    soft: "bg-emerald-50 text-emerald-700 dark:bg-emerald-300/10 dark:text-emerald-200",
    line: "from-emerald-500 to-teal-500",
    shadow: "hover:shadow-emerald-900/10",
  },
};

const positions = [
  "left-1/2 top-0 -translate-x-1/2",
  "right-1 top-1/4",
  "right-8 bottom-8",
  "left-8 bottom-8",
  "left-1 top-1/4",
  "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
];

export default function StackCycleCard({ cycle, copy, index }) {
  const accent = accents[cycle.accent];
  const CycleIcon = cycle.icon;
  const [ref, inView] = useInView({ threshold: 0.25 });

  return (
    <article
      ref={ref}
      className={`animate-in glass rounded-3xl p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl ${accent.shadow} ${inView ? "visible" : ""}`}
      style={{ transitionDelay: `${index * 0.08}s` }}
    >
      <div className="mb-5 flex items-start gap-4">
        <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${accent.soft}`}>
          <CycleIcon className="text-2xl" />
        </span>
        <div>
          <h3 className="text-xl font-extrabold text-slate-950 dark:text-white">{copy.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">{copy.description}</p>
        </div>
      </div>

      <div className="hidden min-h-[330px] sm:block">
        <div className="relative mx-auto h-[310px] max-w-[330px]">
          <div
            className={`absolute inset-10 rounded-full border ${accent.ring}`}
            style={{
              animation: inView ? "pulse-ring 1.4s ease-in-out infinite alternate" : "none",
            }}
          />
          <div className={`absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br ${accent.line} opacity-15 blur-xl`} />
          {cycle.nodes.map((node, nodeIndex) => {
            const Icon = node.icon;
            return (
              <NodeIcon key={node.label} Icon={Icon} label={node.label} position={positions[nodeIndex]} delay={index * 0.08 + nodeIndex * 0.06} accent={accent} />
            );
          })}
          {cycle.nodes.map((node, nodeIndex) => (
            <ArrowIcon key={`${node.label}-arrow`} nodeIndex={nodeIndex} total={cycle.nodes.length} delay={0.25 + nodeIndex * 0.05} accent={accent} />
          ))}
        </div>
      </div>

      <div className="space-y-3 sm:hidden">
        {cycle.nodes.map((node, nodeIndex) => {
          const Icon = node.icon;
          return (
            <div key={node.label}>
              <div className={`flex items-center gap-3 rounded-2xl border bg-white/80 p-4 dark:bg-slate-950/50 ${accent.ring}`}>
                <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${accent.soft}`}>
                  <Icon />
                </span>
                <span className="font-extrabold text-slate-950 dark:text-white">{node.label}</span>
              </div>
              {nodeIndex < cycle.nodes.length - 1 && <FiArrowDown className="mx-auto my-2 text-slate-400" />}
            </div>
          );
        })}
      </div>
    </article>
  );
}

function NodeIcon({ Icon, label, position, delay, accent }) {
  const [ref, inView] = useInView({ threshold: 0, triggerOnce: true });
  return (
    <div
      ref={ref}
      className={`absolute ${position} w-28 ${inView ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
      style={{ transition: "opacity 0.3s ease-out, transform 0.3s ease-out", transitionDelay: `${delay}s` }}
    >
      <div className={`mx-auto flex h-24 w-24 flex-col items-center justify-center rounded-full border bg-white/85 p-2 text-center shadow-lg shadow-slate-900/10 transition hover:-translate-y-1 dark:bg-slate-950/70 ${accent.ring}`}>
        <Icon className="mb-1 text-xl text-electric dark:text-cyan-300" />
        <span className="text-[11px] font-extrabold leading-tight text-slate-900 dark:text-white">{label}</span>
      </div>
    </div>
  );
}

function ArrowIcon({ nodeIndex, total, delay, accent }) {
  const [ref, inView] = useInView({ threshold: 0, triggerOnce: true });
  return (
    <span
      ref={ref}
      className={`absolute grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br ${accent.line} text-white shadow-md ${inView ? "opacity-100" : "opacity-0"}`}
      style={{
        left: `${50 + 37 * Math.cos(((nodeIndex * 360) / total - 70) * (Math.PI / 180))}%`,
        top: `${50 + 37 * Math.sin(((nodeIndex * 360) / total - 70) * (Math.PI / 180))}%`,
        transform: "translate(-50%, -50%)",
        transition: "opacity 0.3s ease-out",
        transitionDelay: `${delay}s`,
      }}
    >
      <FiArrowRight className="text-sm" />
    </span>
  );
}
