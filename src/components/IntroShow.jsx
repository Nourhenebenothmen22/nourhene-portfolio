import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { publicAsset } from "../utils/publicAsset.js";

const portfolioImage = "/image-portfolio/nourhene-profile.webp";

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
    <div
      className="fixed inset-0 z-[100] overflow-hidden bg-ink text-white"
      style={{
        opacity: leaving ? 0 : 1,
        scale: leaving ? 1.02 : 1,
        transition: "opacity 0.65s ease-in-out, scale 0.65s ease-in-out",
      }}
      role="status"
      aria-label={t.loadingLabel}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(37,99,235,0.22),transparent_34%),radial-gradient(circle_at_50%_55%,rgba(124,58,237,0.16),transparent_42%)]" />
      <div
        className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/15"
        style={{ animation: "intro-ring 2.8s ease-out forwards" }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/10 blur-3xl"
        style={{ animation: "intro-glow 2.7s ease-in-out forwards" }}
      />
      <div className="absolute left-1/2 top-1/2 w-[min(360px,82vw)] -translate-x-1/2 -translate-y-1/2">
        <div
          className="relative mx-auto h-40 w-40 overflow-hidden rounded-full border border-cyan-300/25 bg-white/5 p-1 shadow-2xl shadow-cyan-950/40 md:h-52 md:w-52"
          style={{ animation: "intro-content 1.5s ease-out forwards" }}
        >
          <div
            className="absolute -inset-1 rounded-full bg-gradient-to-br from-blue-500 via-cyan-300 to-violet-500 opacity-60"
            style={{ animation: "avatar-ring 4s linear infinite" }}
          />
          <img src={publicAsset(portfolioImage)} alt={t.hero.imageAlt} className="relative h-full w-full rounded-full object-cover" />
        </div>
      </div>
    </div>
  );
}
