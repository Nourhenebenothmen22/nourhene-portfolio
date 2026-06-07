import { motion } from "framer-motion";
import { FiArrowDown, FiArrowRight } from "react-icons/fi";

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

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay: index * 0.08 }}
      className={`glass rounded-3xl p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl ${accent.shadow}`}
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
          <motion.div
            initial={{ scale: 0.94, opacity: 0.7 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            className={`absolute inset-10 rounded-full border ${accent.ring}`}
          />
          <div className={`absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br ${accent.line} opacity-15 blur-xl`} />
          {cycle.nodes.map((node, nodeIndex) => {
            const Icon = node.icon;
            return (
              <motion.div
                key={node.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 + nodeIndex * 0.06 }}
                className={`absolute ${positions[nodeIndex]} w-28`}
              >
                <div className={`mx-auto flex h-24 w-24 flex-col items-center justify-center rounded-full border bg-white/85 p-2 text-center shadow-lg shadow-slate-900/10 transition hover:-translate-y-1 dark:bg-slate-950/70 ${accent.ring}`}>
                  <Icon className="mb-1 text-xl text-electric dark:text-cyan-300" />
                  <span className="text-[11px] font-extrabold leading-tight text-slate-900 dark:text-white">{node.label}</span>
                </div>
              </motion.div>
            );
          })}
          {cycle.nodes.map((node, nodeIndex) => (
            <motion.span
              key={`${node.label}-arrow`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 + nodeIndex * 0.05 }}
              className={`absolute grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br ${accent.line} text-white shadow-md`}
              style={{
                left: `${50 + 37 * Math.cos(((nodeIndex * 360) / cycle.nodes.length - 70) * (Math.PI / 180))}%`,
                top: `${50 + 37 * Math.sin(((nodeIndex * 360) / cycle.nodes.length - 70) * (Math.PI / 180))}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <FiArrowRight className="text-sm" />
            </motion.span>
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
    </motion.article>
  );
}
