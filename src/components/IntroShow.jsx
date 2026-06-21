import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext.jsx";
import { publicAsset } from "../utils/publicAsset.js";

const heroProfileImage = "/image-portfolio/nourhene-profile.webp";
const FULL_DURATION = 6000;
const SHORT_DURATION = 1500;
const MAX_DURATION = 8000;

const INTRO_MODULES = [
  { id: "identity", label: "Identity Module", initials: "ID", status: "Loaded" },
  { id: "skills", label: "Skills Matrix", initials: "SK", status: "Mapped" },
  { id: "projects", label: "Projects Engine", initials: "PR", status: "Indexed" },
  { id: "experience", label: "Experience Timeline", initials: "EX", status: "Synced" },
  { id: "interface", label: "Interface Optimization", initials: "UI", status: "Optimized" },
  { id: "hero", label: "Hero Launch", initials: "HR", status: "Ready" },
];

function Particles({ count = 18 }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        duration: Math.random() * 5 + 4,
        delay: Math.random() * 4,
        floatY: -(Math.random() * 16 + 4),
      })),
    [count],
  );

  return items.map((p) => (
    <motion.div
      key={p.id}
      className="absolute rounded-full bg-cyan-400/15"
      style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
      animate={{ y: [0, p.floatY, 0], opacity: [0.1, 0.4, 0.1] }}
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
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  const shouldAnimate = !prefersReduced;

  const [isReturning] = useState(() => !!localStorage.getItem("op_intro_seen"));
  const DURATION = isReturning ? SHORT_DURATION : FULL_DURATION;

  useEffect(() => {
    localStorage.setItem("op_intro_seen", "1");
  }, []);

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
      const raw = Math.min(elapsed / DURATION, 1);
      const eased = 1 - Math.pow(1 - raw, 1.5);
      const pct = Math.min(Math.round(eased * 100), 100);

      setProgress(pct);

      if (pct >= 100 && !calledRef.current) {
        calledRef.current = true;
        completeTimerRef.current = setTimeout(() => onCompleteRef.current(), 400);
      } else if (pct < 100) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    safetyTimerRef.current = setTimeout(() => {
      if (!calledRef.current) {
        calledRef.current = true;
        setProgress(100);
        setTimeout(() => onCompleteRef.current(), 200);
      }
    }, MAX_DURATION);

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(safetyTimerRef.current);
      clearTimeout(completeTimerRef.current);
    };
  }, [DURATION]);

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const totalModules = INTRO_MODULES.length;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-ink text-white"
      initial={shouldAnimate ? { opacity: 0 } : { opacity: 1 }}
      animate={{ opacity: 1, transition: { duration: 0.4, ease: "easeOut" } }}
      exit={shouldAnimate ? { opacity: 0, scale: 1.02, filter: "blur(4px)", transition: { duration: 0.45, ease: "easeInOut" } } : { opacity: 0, transition: { duration: 0.1 } }}
      role="progressbar"
      aria-label={t.loadingLabel}
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-[#090e2a] to-ink" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_35%,rgba(37,99,235,0.10),transparent_40%),radial-gradient(circle_at_75%_65%,rgba(124,58,237,0.08),transparent_35%)]" />

      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {shouldAnimate && (
        <motion.div
          className="absolute rounded-full border border-cyan-400/6"
          style={{ width: "min(420px, 70vw)", height: "min(420px, 70vw)" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      )}

      {shouldAnimate && <Particles />}

      <div className="relative z-10 flex w-full max-w-lg flex-col items-center px-4">
        <motion.div
          initial={shouldAnimate ? { opacity: 0, y: -10 } : {}}
          animate={shouldAnimate ? { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.15 } } : {}}
          className="mb-1 flex items-center gap-2 text-[10px] font-bold tracking-[0.28em] text-cyan-300/60 uppercase"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.5)]" />
          AI Portfolio System
        </motion.div>

        <motion.h2
          initial={shouldAnimate ? { opacity: 0 } : {}}
          animate={shouldAnimate ? { opacity: 1, transition: { duration: 0.5, delay: 0.25 } } : {}}
          className="mb-6 text-center text-base font-light tracking-[0.12em] text-white/40 uppercase md:text-lg"
        >
          Assembling Digital Experience
        </motion.h2>

        <div className="relative w-full">
          {shouldAnimate && (
            <div className="pointer-events-none absolute -inset-4 z-10 overflow-hidden" style={{ maskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)" }}>
              <motion.div
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
                animate={{ top: ["-5%", "105%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 0.8 }}
              />
            </div>
          )}

          <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 shadow-2xl shadow-black/30 backdrop-blur-sm md:p-7">
            <div className="pointer-events-none absolute -inset-10 rounded-full bg-cyan-500/[0.04] blur-3xl" />

            <div className="relative z-10">
              <motion.div
                className="grid grid-cols-2 gap-2.5 md:gap-3"
                initial={shouldAnimate ? { opacity: 0 } : {}}
                animate={shouldAnimate ? { opacity: 1, transition: { duration: 0.4, delay: 0.35 } } : {}}
              >
                {INTRO_MODULES.map((module, i) => {
                  const threshold = i / totalModules;
                  const nextThreshold = (i + 1) / totalModules;
                  const ratio = progress / 100;
                  const isCompleted = ratio >= nextThreshold;
                  const isActive = !isCompleted && ratio >= threshold;

                  return (
                    <motion.div
                      key={module.id}
                      initial={shouldAnimate ? { opacity: 0, y: 14, scale: 0.94 } : {}}
                      animate={shouldAnimate
                        ? {
                            opacity: isCompleted || isActive ? 1 : 0.35,
                            y: 0,
                            scale: 1,
                            transition: {
                              opacity: { duration: 0.3 },
                              y: { duration: 0.4, delay: 0.4 + i * 0.09 },
                              scale: { duration: 0.4, delay: 0.4 + i * 0.09 },
                            },
                          }
                        : { opacity: 1, y: 0, scale: 1 }}
                      className={`relative rounded-xl border p-3 transition-all duration-500 md:p-4 ${
                        isCompleted
                          ? "border-cyan-400/25 bg-cyan-400/[0.04]"
                          : isActive
                            ? "border-cyan-400/40 bg-cyan-400/[0.06] shadow-[0_0_24px_rgba(34,211,238,0.06)]"
                            : "border-white/[0.05] bg-white/[0.01]"
                      }`}
                    >
                      {isActive && shouldAnimate && (
                        <motion.div
                          className="pointer-events-none absolute inset-0 rounded-xl"
                          animate={{ boxShadow: ["0 0 0px rgba(34,211,238,0)", "0 0 18px rgba(34,211,238,0.06)", "0 0 0px rgba(34,211,238,0)"] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                      )}

                      <div className="flex items-start gap-3">
                        <div
                          className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-xs font-bold transition-all duration-500 md:h-9 md:w-9 md:text-sm ${
                            isCompleted
                              ? "bg-cyan-400/20 text-cyan-300"
                              : isActive
                                ? "bg-cyan-400/15 text-cyan-300"
                                : "bg-white/[0.04] text-white/25"
                          }`}
                        >
                          {isCompleted ? (
                            <motion.span
                              initial={shouldAnimate ? { scale: 0 } : {}}
                              animate={shouldAnimate ? { scale: 1, transition: { type: "spring", stiffness: 300, damping: 15 } } : {}}
                            >
                              ✓
                            </motion.span>
                          ) : (
                            module.initials
                          )}
                        </div>

                        <div className="flex flex-col gap-0.5">
                          <span
                            className={`text-xs font-medium leading-tight transition-colors duration-500 md:text-sm ${
                              isCompleted
                                ? "text-white/80"
                                : isActive
                                  ? "text-white"
                                  : "text-white/30"
                            }`}
                          >
                            {module.label}
                          </span>
                          <span
                            className={`text-[10px] font-medium uppercase tracking-wider transition-all duration-500 md:text-[11px] ${
                              isCompleted
                                ? "text-cyan-300/60"
                                : isActive
                                  ? "text-cyan-300/80"
                                  : "text-white/15"
                            }`}
                          >
                            {isActive ? (
                              <motion.span
                                animate={shouldAnimate ? { opacity: [0.5, 1, 0.5] } : {}}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                              >
                                ● Processing
                              </motion.span>
                            ) : isCompleted ? (
                              `${module.status} ✓`
                            ) : (
                              "Pending"
                            )}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

              <motion.div
                initial={shouldAnimate ? { opacity: 0 } : {}}
                animate={shouldAnimate ? { opacity: 1, transition: { duration: 0.5, delay: 0.9 } } : {}}
                className="relative mt-5 h-[2px] overflow-hidden rounded-full bg-white/[0.06] md:mt-6"
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500"
                  style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
                />
                <div
                  className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]"
                  style={{ left: `calc(${progress}% - 4px)` }}
                />
                <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[9px] font-medium tracking-wider text-white/25">
                  {progress}%
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        initial={shouldAnimate ? { opacity: 0 } : { opacity: 0.15 }}
        animate={shouldAnimate ? { opacity: 0.15, transition: { delay: 1.5, duration: 0.8 } } : { opacity: 0.15 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[9px] tracking-[0.25em] text-white/15 uppercase"
      >
        <span className="inline-block h-px w-5 bg-white/15 align-middle" />
        <span className="mx-3">AI / Data Science Engine</span>
        <span className="inline-block h-px w-5 bg-white/15 align-middle" />
      </motion.div>
    </motion.div>
  );
}
