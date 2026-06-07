import { motion } from "framer-motion";

export default function SectionHeader({ eyebrow, title }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55 }}
      className="mb-10"
    >
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-600 dark:text-cyan-300">{eyebrow}</p>
      <h2 className="max-w-3xl text-3xl font-bold leading-tight text-slate-950 dark:text-white md:text-5xl">{title}</h2>
    </motion.div>
  );
}
