import { lazy, Suspense, useEffect, useState } from "react";
import { LanguageProvider, useLanguage } from "./context/LanguageContext.jsx";
import { useTheme } from "./context/ThemeContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { profileData } from "./data/profile.js";
import IntroShow from "./components/IntroShow.jsx";
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

function SectionsFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent" />
    </div>
  );
}

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
      {introDone && (
        <div className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-950 transition-colors duration-500 dark:bg-ink dark:text-white">
          <Navbar />
          <main>
            <Suspense fallback={<SectionsFallback />}>
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
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
          <Suspense fallback={null}>
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
          </Suspense>
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
