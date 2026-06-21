import { motion, useReducedMotion } from "framer-motion";

export default function SectionHeader({ eyebrow, title }) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={!prefersReduced ? { opacity: 0, y: 14 } : {}}
      whileInView={!prefersReduced ? { opacity: 1, y: 0 } : {}}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="mb-10"
    >
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-600 dark:text-cyan-300">{eyebrow}</p>
      <h2 className="max-w-3xl text-3xl font-bold leading-tight text-slate-950 dark:text-white md:text-5xl">{title}</h2>
    </motion.div>
  );
}
