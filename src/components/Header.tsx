import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, ArrowUpRight } from 'lucide-react';
import { cn } from '../lib/utils';
import CharacterArt from './ui/CharacterArt';

interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
}

const navLinks = [
  { href: '#skills', label: 'Skills' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#experience', label: 'Experience' },
  { href: '#education', label: 'Education' },
];

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0);

      const sections = navLinks.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div className="no-grid border-b-3 border-ink bg-paper">
        <div className="mx-auto flex max-w-[1280px] items-stretch">
          {/* Logo block — violet, the one persistent accent in the shell */}
          <a
            href="#"
            className="flex shrink-0 items-center gap-2 border-r-3 border-ink bg-violet px-4 py-3 font-display text-base text-on-violet sm:px-6"
          >
            <span aria-hidden="true">{'</>'}</span>
            <span>AARYAN JHA</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden flex-1 items-center justify-center gap-1 px-4 lg:flex">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'label border-2 px-3 py-1.5 transition-colors duration-100',
                    isActive
                      ? 'border-ink bg-ink text-paper'
                      : 'border-transparent text-ink hover:border-ink'
                  )}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className="flex flex-1 items-center justify-end lg:flex-none">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              className="flex h-full items-center border-l-3 border-ink px-4 transition-colors duration-100 hover:bg-cream"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <a
              href="#contact"
              className="hidden h-full items-center gap-2 border-l-3 border-ink bg-lime px-5 label text-on-lime transition-colors duration-100 hover:bg-pink hover:text-on-pink sm:flex"
            >
              Contact me <ArrowUpRight size={16} />
            </a>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              className="flex h-full items-center border-l-3 border-ink px-4 lg:hidden"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Scroll progress — a hard lime bar, no gradient */}
      <div
        className="h-[5px] origin-left border-b-3 border-ink bg-lime transition-transform duration-75"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
        aria-hidden="true"
      />

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.2, 0, 0, 1] }}
            className="no-grid overflow-hidden border-b-3 border-ink bg-paper lg:hidden"
          >
            <ul className="mx-auto max-w-[1280px]">
              <li className="flex items-center justify-between gap-4 border-b-3 border-ink bg-pink px-5 text-on-pink">
                <div>
                  <p className="eyebrow text-on-pink opacity-70">Menu</p>
                  <p className="font-display text-base">Aaryan Jha</p>
                </div>
                <CharacterArt
                  name="smile"
                  widths={[160, 240, 400]}
                  width={400}
                  height={400}
                  sizes="88px"
                  alt=""
                  className="character-swap h-24 w-24 self-end object-contain object-bottom"
                  loading="lazy"
                />
              </li>

              {navLinks.map((link) => (
                <li key={link.href} className="border-b-2 border-grid last:border-b-0">
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="label block px-5 py-4 hover:bg-cream"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="border-t-3 border-ink">
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="label block bg-lime px-5 py-4 text-on-lime"
                >
                  Contact me →
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
