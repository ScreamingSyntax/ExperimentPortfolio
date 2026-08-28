import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Experience from './components/Experience';
import Education from './components/Education';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/ui/CustomCursor';
import ScrollToTop from './components/ui/ScrollToTop';
import Loader from './components/ui/Loader';

const THEME_KEY = 'theme-v2';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  // Versioned key: the previous design stored 'dark' here and defaulted to it,
  // so returning visitors would otherwise keep landing in the old preference
  // rather than the light default this design is built around.
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(THEME_KEY) || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="custom-cursor">
      {/* The loader is an overlay, never a gate. The page below is mounted and
          readable from the first paint, so a backgrounded tab (where animation
          frames are throttled) can never strand the visitor on a splash. */}
      <Loader done={!isLoading} />

      <CustomCursor />
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <Skills />
        <Certifications />
        <Experience />
        <Education />
        <Resume />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
