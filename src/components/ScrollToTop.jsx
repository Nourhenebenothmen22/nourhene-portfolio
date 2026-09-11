import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowUp } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const { dir } = useLanguage();

  useEffect(() => {
    function toggleVisibility() {
      if (window.scrollY > 350) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    }

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.7, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 16 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          aria-label="Scroll to top"
          className={`fixed bottom-6 z-40 grid h-11 w-11 place-items-center rounded-full border border-blue-200/80 bg-white/90 text-electric shadow-xl shadow-blue-500/15 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-500 hover:text-white focus:outline-cyan-400 dark:border-cyan-400/25 dark:bg-navy/90 dark:text-cyan-300 dark:hover:text-white ${
            dir === "rtl" ? "left-6" : "right-6"
          }`}
        >
          <FiArrowUp className="text-lg" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
