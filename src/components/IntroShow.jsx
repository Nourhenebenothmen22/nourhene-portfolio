import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext.jsx";
import { publicAsset } from "../utils/publicAsset.js";

const heroProfileImage = "/image-portfolio/nourhene-profile.webp";
const DURATION = 3000;

export default function ProfileIntro({ onComplete }) {
  const { t } = useLanguage();
  const prefersReduced = useReducedMotion();
  const shouldAnimate = !prefersReduced;

  const calledRef = useRef(false);
  const timerRef = useRef(null);
  const safetyRef = useRef(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  useEffect(() => {
    const restore = [];
    const lock = (el) => {
      const prev = el.style.overflow;
      el.style.overflow = "hidden";
      restore.push(() => { el.style.overflow = prev; });
    };
    lock(document.documentElement);
    lock(document.body);
    return () => restore.forEach((fn) => fn());
  }, []);

  useEffect(() => {
    calledRef.current = false;

    timerRef.current = setTimeout(() => {
      calledRef.current = true;
      onCompleteRef.current();
    }, DURATION);

    safetyRef.current = setTimeout(() => {
      if (!calledRef.current) {
        calledRef.current = true;
        onCompleteRef.current();
      }
    }, DURATION + 2000);

    return () => {
      clearTimeout(timerRef.current);
      clearTimeout(safetyRef.current);
    };
  }, [DURATION]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#080a14]"
      initial={shouldAnimate ? { opacity: 0 } : { opacity: 1 }}
      animate={{ opacity: 1, transition: { duration: 0.4, ease: "easeOut" } }}
      exit={shouldAnimate ? { opacity: 0, scale: 1.04, filter: "blur(4px)", transition: { duration: 0.35, ease: "easeInOut" } } : { opacity: 0, transition: { duration: 0.1 } }}
      aria-label={t.loadingLabel}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#080a14] via-[#0c0e24] to-[#080a14]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(37,99,235,0.08),transparent_60%)]" />

      <div className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <motion.div
        initial={shouldAnimate ? { opacity: 0, scale: 0.88 } : {}}
        animate={shouldAnimate ? { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } } : {}}
        className="relative flex flex-col items-center"
      >
        <motion.div
          animate={shouldAnimate ? { y: [0, -6, 0] } : {}}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          {shouldAnimate && (
            <motion.div
              className="absolute -inset-5 rounded-full bg-gradient-to-br from-blue-500 via-cyan-400 to-violet-500 opacity-60 blur-[2px]"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
          )}
          <motion.div
            animate={shouldAnimate ? { scale: [1, 1.04, 1] } : {}}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -inset-4 rounded-full bg-cyan-400/15 blur-2xl"
          />
          <div className="relative h-40 w-40 overflow-hidden rounded-full border-2 border-white/20 bg-[#0c0e24] shadow-2xl shadow-black/50 md:h-48 md:w-48">
            <img
              src={publicAsset(heroProfileImage)}
              alt=""
              className="h-full w-full object-cover object-center"
            />
          </div>
        </motion.div>

        <motion.p
          initial={shouldAnimate ? { opacity: 0, y: 8 } : {}}
          animate={shouldAnimate ? { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } } : {}}
          className="mt-5 text-sm font-medium tracking-[0.15em] text-white/40 uppercase"
        >
          Nourhene Ben Othmen
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
