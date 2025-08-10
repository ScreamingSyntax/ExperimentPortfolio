import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#experience', label: 'Experience' },
    { href: '#resume', label: 'Resume' },
    { href: '#contact', label: 'Contact' },
  ];

  const handleMenuToggle = () => setIsOpen(!isOpen);
  const handleNavClick = () => setIsOpen(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled 
          ? 'bg-white/80 dark:bg-dark-800/80 backdrop-blur-lg py-3 shadow-md'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto flex justify-between items-center">
        <a 
          href="#" 
          className="text-xl font-bold z-10 relative"
        >
          <span className="text-gradient">Aaryan Jha</span>
        </a>

        {/* Mobile menu button */}
        <button 
          onClick={handleMenuToggle} 
          className="md:hidden z-10 relative"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-dark-500 dark:text-dark-100 hover:text-primary-500 dark:hover:text-primary-400 transition-colors relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-dark-700 hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        <motion.nav
  initial={false}
  animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: '100%' }}
  transition={{ type: 'tween', duration: 0.3 }}
  className={cn(
    'fixed inset-0 bg-white dark:bg-dark-800 flex flex-col items-center justify-center space-y-8 md:hidden',
    !isOpen && 'pointer-events-none' // prevent interaction when closed
  )}
>
  {navLinks.map((link) => (
    <a
      key={link.href}
      href={link.href}
      onClick={handleNavClick}
      className="text-2xl font-medium hover:text-primary-500 transition-colors"
    >
      {link.label}
    </a>
  ))}
  <button
    onClick={toggleTheme}
    className="p-3 rounded-full bg-gray-100 dark:bg-dark-700 hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors mt-4"
    aria-label="Toggle theme"
  >
    {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
  </button>
</motion.nav>

      </div>
    </motion.header>
  );
};

export default Header;