import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LanguageProvider, useLanguage } from "./context/LanguageContext.jsx";
import { useTheme } from "./context/ThemeContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { profileData } from "./data/profile.js";
import IntroShow from "./components/IntroShow.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";
import Experience from "./components/Experience.jsx";
import Education from "./components/Education.jsx";
import Languages from "./components/Languages.jsx";
import Leadership from "./components/Leadership.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

function Portfolio() {
  const [introDone, setIntroDone] = useState(false);
  const { language, dir } = useLanguage();
  const { theme } = useTheme();
  const profile = profileData[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
    document.title = profile.name;
    document.querySelector('meta[name="description"]')?.setAttribute("content", profile.metaDescription);
  }, [language, dir, profile]);

  return (
    <>
      {!introDone && <IntroShow onComplete={() => setIntroDone(true)} />}
      <AnimatePresence>
        {introDone && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-950 transition-colors duration-500 dark:bg-ink dark:text-white"
          >
            <Navbar />
            <main>
              <Hero />
              <Skills />
              <Projects />
              <Experience />
              <Education />
              <Languages />
              <Leadership />
              <Contact />
            </main>
            <Footer />
            <ToastContainer
              position={language === "ar" ? "top-left" : "top-right"}
              autoClose={2500}
              hideProgressBar={false}
              closeOnClick
              pauseOnHover
              draggable
              theme={theme === "dark" ? "dark" : "light"}
              rtl={language === "ar"}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Portfolio />
      </LanguageProvider>
    </ThemeProvider>
  );
}
