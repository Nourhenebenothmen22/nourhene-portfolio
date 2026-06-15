import useInView from "../hooks/useInView.js";

export default function SectionHeader({ eyebrow, title }) {
  const [ref, inView] = useInView({ threshold: 0.4 });

  return (
    <div
      ref={ref}
      className={`animate-in mb-10 ${inView ? "visible" : ""}`}
    >
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-600 dark:text-cyan-300">{eyebrow}</p>
      <h2 className="max-w-3xl text-3xl font-bold leading-tight text-slate-950 dark:text-white md:text-5xl">{title}</h2>
    </div>
  );
}
