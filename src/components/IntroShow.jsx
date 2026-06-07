import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext.jsx";
import { publicAsset } from "../utils/publicAsset.js";

// Replace nourhene-profile.jpg with the real image filename if you change the portfolio image asset.
const portfolioImage = "/image-portfolio/nourhene-profile.jpg";

export default function IntroShow({ onComplete }) {
  const { t } = useLanguage();
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const leaveTimer = setTimeout(() => setLeaving(true), 2350);
    const doneTimer = setTimeout(onComplete, 3000);
    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      animate={{ opacity: leaving ? 0 : 1, scale: leaving ? 1.02 : 1 }}
      transition={{ duration: 0.65, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] overflow-hidden bg-ink text-white"
      role="status"
      aria-label={t.loadingLabel}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(37,99,235,0.22),transparent_34%),radial-gradient(circle_at_50%_55%,rgba(124,58,237,0.16),transparent_42%)]" />
      <motion.div
        className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/15"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: [0, 0.7, 0.15], scale: [0.7, 1.12, 1.45] }}
        transition={{ duration: 2.8, ease: "easeOut" }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/10 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.7, 0.35] }}
        transition={{ duration: 2.7, ease: "easeInOut" }}
      />
      <div className="absolute left-1/2 top-1/2 w-[min(360px,82vw)] -translate-x-1/2 -translate-y-1/2">
        <motion.div
          initial={{ opacity: 0, scale: 0.86, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: [0.86, 1.04, 1], filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative mx-auto h-40 w-40 overflow-hidden rounded-full border border-cyan-300/25 bg-white/5 p-1 shadow-2xl shadow-cyan-950/40 md:h-52 md:w-52"
        >
          <motion.div
            className="absolute -inset-1 rounded-full bg-gradient-to-br from-blue-500 via-cyan-300 to-violet-500 opacity-60"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, ease: "linear" }}
          />
          <img src={publicAsset(portfolioImage)} alt={t.hero.imageAlt} className="relative h-full w-full rounded-full object-cover" />
        </motion.div>
      </div>
    </motion.div>
  );
}
