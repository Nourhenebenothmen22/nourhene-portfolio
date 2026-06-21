import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext.jsx";
import { publicAsset } from "../utils/publicAsset.js";

const heroProfileImage = "/image-portfolio/nourhene-profile.webp";
const INTRO_DURATION = 6000;
const SHORT_DURATION = 1500;
const MAX_DURATION = 8000;

const TYPING_TEXT = "launch portfolio experience";

const introCommands = [
  { id: "identity", label: "Load identity profile" },
  { id: "skills", label: "Analyze technical stack" },
  { id: "projects", label: "Prepare project showcase" },
  { id: "experience", label: "Sync experience timeline" },
  { id: "interface", label: "Optimize interface" },
  { id: "hero", label: "Launch hero section" },
];

export default function CommandPaletteIntro({ onComplete }) {
  const { t } = useLanguage();
  const prefersReduced = useReducedMotion();
  const shouldAnimate = !prefersReduced;

  const [progress, setProgress] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [showCommands, setShowCommands] = useState(false);

  const startRef = useRef(null);
  const rafRef = useRef(null);
  const calledRef = useRef(false);
  const completeTimerRef = useRef(null);
  const safetyTimerRef = useRef(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  const [isReturning] = useState(() => !!localStorage.getItem("op_intro_seen"));
  const DURATION = isReturning ? SHORT_DURATION : INTRO_DURATION;

  useEffect(() => {
    localStorage.setItem("op_intro_seen", "1");
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = publicAsset(heroProfileImage);
  }, []);

  useEffect(() => {
    if (isReturning || !shouldAnimate) {
      setTypedText(TYPING_TEXT);
      setShowCommands(true);
      return;
    }

    let pos = 0;
    const t = setInterval(() => {
      pos++;
      setTypedText(TYPING_TEXT.slice(0, pos));
      if (pos >= TYPING_TEXT.length) {
        clearInterval(t);
        setTimeout(() => setShowCommands(true), 250);
      }
    }, 25);

    return () => clearInterval(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
        completeTimerRef.current = setTimeout(() => onCompleteRef.current(), 300);
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

  const totalCommands = introCommands.length;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#080a14]"
      initial={shouldAnimate ? { opacity: 0 } : { opacity: 1 }}
      animate={{ opacity: 1, transition: { duration: 0.3, ease: "easeOut" } }}
      exit={shouldAnimate ? { opacity: 0, scale: 1.03, filter: "blur(4px)", transition: { duration: 0.4, ease: "easeInOut" } } : { opacity: 0, transition: { duration: 0.1 } }}
      role="progressbar"
      aria-label={t.loadingLabel}
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#080a14] via-[#0c0e24] to-[#080a14]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(37,99,235,0.08),transparent_50%),radial-gradient(ellipse_at_80%_80%,rgba(124,58,237,0.06),transparent_40%)]" />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 w-full max-w-lg px-4">
        <motion.div
          initial={shouldAnimate ? { opacity: 0, y: 8 } : {}}
          animate={shouldAnimate ? { opacity: 1, y: 0, transition: { duration: 0.35, delay: 0.1 } } : {}}
          className="overflow-hidden rounded-xl border border-white/[0.06] bg-[#0c0f24]/90 shadow-2xl shadow-black/30 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between border-b border-white/[0.04] px-4 py-2">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
              <span className="ml-2 text-[10px] font-medium tracking-[0.08em] text-white/25 uppercase">
                command palette
              </span>
            </div>
            <motion.img
              src={publicAsset(heroProfileImage)}
              alt=""
              aria-hidden="true"
              initial={shouldAnimate ? { opacity: 0, scale: 0.8 } : {}}
              animate={shouldAnimate ? { opacity: 1, scale: 1, transition: { duration: 0.35, delay: 0.25 } } : {}}
              className="h-6 w-6 rounded-full border border-white/[0.12] object-cover"
            />
          </div>

          <div className="px-4 pb-3 pt-4 md:px-5 md:pb-4 md:pt-5">
            <div className="mb-4 flex items-start gap-2.5 font-mono text-sm md:text-base">
              <span className="mt-0.5 shrink-0 text-cyan-400/70">&gt;</span>
              <div className="flex-1 leading-snug tracking-wide">
                <span className="text-white/80">{typedText}</span>
                {shouldAnimate && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.7, repeat: Infinity, ease: "steps(2)" }}
                    className="ml-0.5 inline-block h-[1em] w-[2px] bg-cyan-400 align-text-bottom"
                    aria-hidden="true"
                  />
                )}
              </div>
            </div>

            <div className="space-y-0.5">
              {introCommands.map((cmd, i) => {
                const threshold = i / totalCommands;
                const nextThreshold = (i + 1) / totalCommands;
                const ratio = progress / 100;
                const isCompleted = ratio >= nextThreshold;
                const isActive = !isCompleted && ratio >= threshold;

                return (
                  <motion.div
                    key={cmd.id}
                    initial={shouldAnimate ? { opacity: 0, x: -10 } : {}}
                    animate={
                      showCommands
                        ? {
                            opacity: isCompleted ? 0.65 : isActive ? 1 : 0.3,
                            x: 0,
                            transition: {
                              opacity: { duration: 0.35 },
                              x: { duration: 0.35, delay: 0.25 + i * 0.08 },
                            },
                          }
                        : { opacity: 0, x: -10 }
                    }
                    className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors duration-500 md:text-[15px] ${
                      isActive ? "bg-cyan-400/[0.04]" : ""
                    }`}
                  >
                    <span className="grid h-4 w-4 shrink-0 place-items-center">
                      {isCompleted ? (
                        <motion.span
                          initial={shouldAnimate ? { scale: 0 } : {}}
                          animate={shouldAnimate ? { scale: 1, transition: { type: "spring", stiffness: 400, damping: 18 } } : {}}
                          className="text-cyan-400 text-xs"
                        >
                          ✓
                        </motion.span>
                      ) : isActive ? (
                        <span className="inline-flex gap-[3px]">
                          {[0, 1, 2].map((d) => (
                            <motion.span
                              key={d}
                              className="h-[3px] w-[3px] rounded-full bg-cyan-400"
                              animate={shouldAnimate ? { opacity: [0.25, 1, 0.25] } : {}}
                              transition={{ duration: 1, repeat: Infinity, delay: d * 0.2, ease: "easeInOut" }}
                            />
                          ))}
                        </span>
                      ) : (
                        <span className="text-white/15">○</span>
                      )}
                    </span>

                    <span
                      className={`flex-1 transition-colors duration-500 font-mono text-[13px] tracking-wide md:text-sm ${
                        isCompleted
                          ? "text-white/50"
                          : isActive
                            ? "text-white"
                            : "text-white/20"
                      }`}
                    >
                      {cmd.label}
                    </span>

                    {isCompleted && (
                      <span className="text-[9px] font-medium uppercase tracking-wider text-cyan-400/40">
                        done
                      </span>
                    )}
                    {isActive && (
                      <span className="text-[9px] font-medium uppercase tracking-wider text-cyan-400/60">
                        <motion.span
                          animate={shouldAnimate ? { opacity: [0.3, 1, 0.3] } : {}}
                          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                        >
                          running
                        </motion.span>
                      </span>
                    )}
                  </motion.div>
                );
              })}

              {progress >= 100 && (
                <motion.div
                  initial={shouldAnimate ? { opacity: 0, y: 4 } : {}}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.35 } }}
                  className="flex items-center gap-2.5 rounded-md border border-cyan-400/20 bg-cyan-400/[0.04] px-3 py-2.5 text-sm"
                >
                  <span className="grid h-4 w-4 shrink-0 place-items-center">
                    <motion.span
                      initial={shouldAnimate ? { scale: 0 } : {}}
                      animate={{ scale: 1, transition: { type: "spring", stiffness: 400, damping: 18 } }}
                      className="text-cyan-400 text-xs"
                    >
                      ✓
                    </motion.span>
                  </span>
                  <span className="font-mono text-[13px] font-medium text-cyan-300/80 tracking-wide md:text-sm">
                    Portfolio ready
                  </span>
                </motion.div>
              )}
            </div>

            <motion.div
              initial={shouldAnimate ? { opacity: 0 } : {}}
              animate={{ opacity: 1, transition: { duration: 0.4, delay: 0.2 } }}
              className="relative mt-4 flex items-center gap-3"
            >
              <div className="flex-1 h-[2px] overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500"
                  style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
                />
              </div>
              <div
                className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.5)]"
                style={{ left: `calc(${progress}% - 3px)` }}
              />
              <span className="text-[9px] font-medium tracking-wider text-white/20 font-mono w-6 text-right tabular-nums">
                {progress}%
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
