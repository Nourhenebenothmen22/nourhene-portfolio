import { lazy, Suspense, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { AnimatePresence } from "framer-motion";
import { LanguageProvider, useLanguage } from "./context/LanguageContext.jsx";
import { useTheme } from "./context/ThemeContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { profileData } from "./data/profile.js";
import ProfileIntro from "./components/IntroShow.jsx";
import Navbar from "./components/Navbar.jsx";

const Hero = lazy(() => import("./components/Hero.jsx"));
const Skills = lazy(() => import("./components/Skills.jsx"));
const Projects = lazy(() => import("./components/Projects.jsx"));
const Experience = lazy(() => import("./components/Experience.jsx"));
const Education = lazy(() => import("./components/Education.jsx"));
const Languages = lazy(() => import("./components/Languages.jsx"));
const Leadership = lazy(() => import("./components/Leadership.jsx"));
const Contact = lazy(() => import("./components/Contact.jsx"));
const Footer = lazy(() => import("./components/Footer.jsx"));
const ToastContainer = lazy(() => import("react-toastify").then((m) => ({ default: m.ToastContainer })));

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

  useEffect(() => {
    import("./components/Hero.jsx");
    import("./components/Skills.jsx");
    import("./components/Projects.jsx");
    import("./components/Experience.jsx");
    import("./components/Education.jsx");
    import("./components/Languages.jsx");
    import("./components/Leadership.jsx");
    import("./components/Contact.jsx");
    import("./components/Footer.jsx");
    import("react-toastify");
  }, []);

  return (
    <>
      <AnimatePresence>
        {!introDone && <ProfileIntro onComplete={() => setIntroDone(true)} />}
      </AnimatePresence>
      {introDone && (
        <div className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-950 transition-colors duration-500 dark:bg-ink dark:text-white">
          <Navbar />
          <main>
            <Suspense fallback={null}>
              <Hero />
              <Skills />
              <Projects />
              <Experience />
              <Education />
              <Languages />
              <Leadership />
              <Contact />
            </Suspense>
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
        </div>
      )}
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
