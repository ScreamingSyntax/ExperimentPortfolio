import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
}

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#resume', label: 'Resume' },
  { href: '#contact', label: 'Contact' },
];

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0);

      const sections = navLinks.map(l => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'glass-strong py-3 shadow-lg shadow-black/5 dark:shadow-black/20'
            : 'bg-transparent py-5'
        )}
      >
        <div className="container mx-auto flex justify-between items-center">
          <a href="#" className="relative z-10 group">
            <span className="text-xl font-bold font-display text-gradient">
              AJ
            </span>
            <span className="text-xl font-light text-dark-400 dark:text-dark-200 ml-1 hidden sm:inline group-hover:text-primary-500 transition-colors">
              Aaryan Jha
            </span>
          </a>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden z-10 relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300',
                    isActive
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-dark-400 dark:text-dark-200 hover:text-primary-500 dark:hover:text-primary-400'
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute inset-0 bg-primary-50 dark:bg-primary-900/20 rounded-lg -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
            <div className="w-px h-6 bg-gray-200 dark:bg-dark-600 mx-2" />
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-gray-100 dark:bg-dark-700 hover:bg-gray-200 dark:hover:bg-dark-600 transition-all duration-300 hover:scale-105 active:scale-95"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </nav>

          <AnimatePresence>
            {isOpen && (
              <motion.nav
                initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 2rem) 2rem)' }}
                animate={{ opacity: 1, clipPath: 'circle(150% at calc(100% - 2rem) 2rem)' }}
                exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 2rem) 2rem)' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-0 bg-white dark:bg-dark-900 flex flex-col items-center justify-center gap-6 md:hidden"
              >
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className={cn(
                      'text-2xl font-display font-medium transition-colors',
                      activeSection === link.href.slice(1)
                        ? 'text-gradient'
                        : 'hover:text-primary-500'
                    )}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.button
                  onClick={toggleTheme}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="p-3 rounded-xl bg-gray-100 dark:bg-dark-700 mt-4"
                  aria-label="Toggle theme"
                >
                  {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
                </motion.button>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500 z-[60] origin-left"
        style={{ scaleX: scrollProgress / 100 }}
      />
    </>
  );
};

export default Header;
