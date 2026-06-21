import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext.jsx";
import { publicAsset } from "../utils/publicAsset.js";

const heroProfileImage = "/image-portfolio/nourhene-profile.webp";
const LOADER_DURATION = 5800;
const MAX_DURATION = 7800;

const STEPS = [
  { threshold: 0, label: "Initializing workspace", status: "Mounting virtual environment..." },
  { threshold: 15, label: "Loading digital identity", status: "Verifying credentials..." },
  { threshold: 30, label: "Mapping technical skills", status: "Indexing skill trees..." },
  { threshold: 45, label: "Indexing projects", status: "Compiling project modules..." },
  { threshold: 60, label: "Syncing experience", status: "Optimizing experience timeline..." },
  { threshold: 75, label: "Optimizing interface", status: "Calibrating UI components..." },
  { threshold: 90, label: "Preparing hero section", status: "Warming up animations..." },
  { threshold: 100, label: "Portfolio ready", status: "Launching interface..." },
];

function Particles({ count = 20 }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 0.5,
        duration: Math.random() * 5 + 4,
        delay: Math.random() * 4,
        floatY: -(Math.random() * 18 + 6),
      })),
    [count],
  );

  return items.map((p) => (
    <motion.div
      key={p.id}
      className="absolute rounded-full bg-cyan-400/20"
      style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
      animate={{ y: [0, p.floatY, 0], opacity: [0.1, 0.5, 0.1] }}
      transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
    />
  ));
}

export default function LoadingShow({ onComplete }) {
  const { t } = useLanguage();
  const prefersReduced = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const startRef = useRef(null);
  const rafRef = useRef(null);
  const calledRef = useRef(false);
  const completeTimerRef = useRef(null);
  const safetyTimerRef = useRef(null);

  const shouldAnimate = !prefersReduced;

  let activeIndex = 0;
  for (let i = 0; i < STEPS.length; i++) {
    if (progress >= STEPS[i].threshold) activeIndex = i;
  }

  const currentStep = STEPS[activeIndex];

  useEffect(() => {
    const img = new Image();
    img.src = publicAsset(heroProfileImage);
  }, []);

  useEffect(() => {
    startRef.current = null;
    calledRef.current = false;

    const animate = (timestamp) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const raw = Math.min(elapsed / LOADER_DURATION, 1);
      const eased = 1 - Math.pow(1 - raw, 1.5);
      const pct = Math.min(Math.round(eased * 100), 100);

      setProgress(pct);

      if (pct >= 100 && !calledRef.current) {
        calledRef.current = true;
        completeTimerRef.current = setTimeout(onComplete, 400);
      } else if (pct < 100) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    safetyTimerRef.current = setTimeout(() => {
      if (!calledRef.current) {
        calledRef.current = true;
        setProgress(100);
        setTimeout(onComplete, 200);
      }
    }, MAX_DURATION);

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(safetyTimerRef.current);
      clearTimeout(completeTimerRef.current);
    };
  }, [onComplete]);

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-ink text-white"
      initial={shouldAnimate ? { opacity: 0 } : { opacity: 1 }}
      animate={{ opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }}
      exit={shouldAnimate ? { opacity: 0, scale: 1.03, filter: "blur(3px)", transition: { duration: 0.4, ease: "easeInOut" } } : { opacity: 0, transition: { duration: 0.1 } }}
      role="progressbar"
      aria-label={t.loadingLabel}
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-[#0a0f2e] to-ink" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(37,99,235,0.12),transparent_40%),radial-gradient(circle_at_70%_60%,rgba(124,58,237,0.1),transparent_35%)]" />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {shouldAnimate && (
        <motion.div
          className="absolute rounded-full border border-cyan-400/8"
          style={{ width: "min(500px, 80vw)", height: "min(500px, 80vw)" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      )}

      {shouldAnimate && <Particles />}

      <motion.div
        className="relative z-10 mx-4 w-full max-w-md"
        initial={shouldAnimate ? { opacity: 0, y: 20 } : {}}
        animate={shouldAnimate ? { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.15 } } : {}}
      >
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/40 backdrop-blur-xl">
          {shouldAnimate && (
            <motion.div
              className="pointer-events-none absolute left-0 right-0 z-20 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
              animate={{ top: ["-2%", "102%"] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
            />
          )}

          <div className="pointer-events-none absolute -inset-20 rounded-full bg-cyan-500/5 blur-3xl" />

          <div className="relative z-10 flex flex-col items-center px-8 py-10 md:px-10 md:py-12">
            <motion.div
              initial={shouldAnimate ? { opacity: 0, y: -8 } : {}}
              animate={shouldAnimate ? { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.25 } } : {}}
              className="mb-2 flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] text-cyan-300/70 uppercase"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400" />
              AI / Data Science Portfolio
            </motion.div>

            <motion.h2
              initial={shouldAnimate ? { opacity: 0 } : {}}
              animate={shouldAnimate ? { opacity: 1, transition: { duration: 0.5, delay: 0.35 } } : {}}
              className="mb-8 text-center text-sm font-medium tracking-[0.15em] text-white/50 uppercase"
            >
              Building your experience...
            </motion.h2>

            <motion.div className="mb-4 text-center">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-violet-400 bg-clip-text text-7xl font-extralight tabular-nums tracking-tight text-transparent md:text-8xl">
                {progress}
              </span>
              <span className="text-3xl text-white/30 md:text-4xl">%</span>
            </motion.div>

            <div className="relative mb-8 h-1 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500"
                style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
              />
              <div
                className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.6)]"
                style={{ left: `calc(${progress}% - 6px)` }}
              />
            </div>

            <div className="mb-6 w-full space-y-0.5">
              {STEPS.map((step, i) => {
                const isActive = i === activeIndex;
                const isCompleted = i < activeIndex;

                return (
                  <motion.div
                    key={step.threshold}
                    className="flex items-center gap-3 py-1"
                    initial={shouldAnimate ? false : {}}
                    animate={shouldAnimate ? { opacity: isActive ? 1 : isCompleted ? 0.6 : 0.3 } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold transition-colors duration-300 ${
                        isCompleted
                          ? "border-cyan-400 bg-cyan-400/20 text-cyan-300"
                          : isActive
                            ? "border-cyan-400 bg-cyan-400/10 text-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.3)]"
                            : "border-white/15 text-white/20"
                      }`}
                      animate={shouldAnimate && isActive ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      {isCompleted ? "✓" : isActive ? "●" : "○"}
                    </motion.div>

                    <span
                      className={`text-sm leading-5 transition-colors duration-300 ${
                        isActive
                          ? "font-medium text-white"
                          : isCompleted
                            ? "text-white/50"
                            : "text-white/20"
                      }`}
                    >
                      {step.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              key={currentStep.status}
              initial={shouldAnimate ? { opacity: 0, y: 6 } : {}}
              animate={shouldAnimate ? { opacity: 0.5, y: 0, transition: { duration: 0.3 } } : { opacity: 0.5 }}
              className="text-center text-[11px] tracking-[0.15em] text-white/50 uppercase"
            >
              {currentStep.status}
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={shouldAnimate ? { opacity: 0 } : { opacity: 0.2 }}
        animate={shouldAnimate ? { opacity: 0.2, transition: { delay: 1.5, duration: 0.8 } } : { opacity: 0.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.2em] text-white/20 uppercase"
      >
        <span className="inline-block h-px w-6 bg-white/20 align-middle" />
        <span className="mx-3">AI / Data Science</span>
        <span className="inline-block h-px w-6 bg-white/20 align-middle" />
      </motion.div>
    </motion.div>
  );
}
