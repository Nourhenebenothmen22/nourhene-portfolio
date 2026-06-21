import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext.jsx";
import { publicAsset } from "../utils/publicAsset.js";

const heroProfileImage = "/image-portfolio/nourhene-profile.webp";
const LOADER_DURATION = 5500;
const MAX_DURATION = 7500;

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
        completeTimerRef.current = setTimeout(onComplete, 150);
      } else if (pct < 100) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    safetyTimerRef.current = setTimeout(() => {
      if (!calledRef.current) {
        calledRef.current = true;
        setProgress(100);
        onComplete();
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
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-ink text-white"
      initial={shouldAnimate ? { opacity: 0 } : { opacity: 1 }}
      animate={{ opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }}
      exit={shouldAnimate ? { opacity: 0, scale: 1.02, filter: "blur(2px)", transition: { duration: 0.35, ease: "easeInOut" } } : { opacity: 0, transition: { duration: 0.1 } }}
      role="progressbar"
      aria-label={t.loadingLabel}
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(37,99,235,0.18),transparent_34%),radial-gradient(circle_at_50%_55%,rgba(124,58,237,0.12),transparent_42%)]" />

      <motion.div
        className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/15"
        animate={shouldAnimate ? { scale: [1, 1.08, 1], opacity: [0.6, 0.15, 0.6] } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center gap-8">
        <motion.div
          initial={shouldAnimate ? { opacity: 0, scale: 0.86, filter: "blur(10px)" } : {}}
          animate={shouldAnimate ? { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut", delay: 0.1 } } : {}}
          className="relative h-28 w-28 overflow-hidden rounded-full border border-cyan-300/25 bg-white/5 p-1 shadow-2xl shadow-cyan-950/40 md:h-36 md:w-36"
        >
          <div className="absolute -inset-1 z-[1] rounded-full bg-gradient-to-br from-blue-500 via-cyan-300 to-violet-500 opacity-60" />
          <div className="absolute -inset-1 z-[2] rounded-full bg-ink" style={{ clipPath: "inset(2px)" }} />
          <img
            src={publicAsset(heroProfileImage)}
            alt={t.hero.imageAlt}
            className="relative z-[3] h-full w-full rounded-full object-cover"
          />
        </motion.div>

        <div className="flex flex-col items-center gap-4">
          <div className="text-6xl font-extralight tabular-nums tracking-tight md:text-7xl">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
              {progress}
            </span>
            <span className="text-3xl text-white/40 md:text-4xl">%</span>
          </div>

          <div className="h-[2px] w-48 overflow-hidden rounded-full bg-white/10 md:w-72">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500"
              style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
            />
          </div>

          <motion.p
            initial={shouldAnimate ? { opacity: 0 } : { opacity: 0.5 }}
            animate={shouldAnimate ? { opacity: 0.5, transition: { delay: 0.8, duration: 0.6 } } : { opacity: 0.5 }}
            className="text-xs tracking-[0.25em] uppercase text-white/50"
          >
            {progress < 100 ? t.intro[0] : t.intro[3]}
          </motion.p>
        </div>
      </div>

      <motion.div
        initial={shouldAnimate ? { opacity: 0 } : { opacity: 0.3 }}
        animate={shouldAnimate ? { opacity: 0.3, transition: { delay: 1.2, duration: 0.8 } } : { opacity: 0.3 }}
        className="absolute bottom-6 right-6 flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-white/30"
      >
        <span className="inline-block h-[3px] w-[3px] rounded-full bg-cyan-400" />
        AI / Data Science
      </motion.div>
    </motion.div>
  );
}
