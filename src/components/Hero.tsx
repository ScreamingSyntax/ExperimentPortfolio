import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import HeroCanvas from './three/HeroCanvas';
import { ChevronDown, ArrowRight } from 'lucide-react';

const roles = [
  'Software Engineer',
  '.NET Core Expert',
  'Backend Architect',
  'Flutter Developer',
  'Tech Mentor',
];

const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const typeText = useCallback(() => {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      if (displayText.length < currentRole.length) {
        setDisplayText(currentRole.slice(0, displayText.length + 1));
      } else {
        setTimeout(() => setIsDeleting(true), 2000);
        return;
      }
    } else {
      if (displayText.length > 0) {
        setDisplayText(displayText.slice(0, -1));
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
        return;
      }
    }
  }, [displayText, isDeleting, roleIndex]);

  useEffect(() => {
    const speed = isDeleting ? 40 : 80;
    const timeout = setTimeout(typeText, speed);
    return () => clearTimeout(timeout);
  }, [typeText, isDeleting]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <HeroCanvas />

      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/70 text-sm mb-8"
              >
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Available for opportunities
              </motion.div>

              <h1 className="heading-xl mb-4 text-white">
                <span className="block text-lg sm:text-xl md:text-2xl font-normal text-white/60 mb-3 font-sans">
                  Hello, I'm
                </span>
                <span className="text-gradient block">Aaryan Jha</span>
              </h1>

              <div className="h-12 md:h-14 flex items-center justify-center mb-8">
                <span className="text-xl md:text-2xl lg:text-3xl font-display text-white/80">
                  {displayText}
                  <span className="typing-cursor text-primary-400">&nbsp;</span>
                </span>
              </div>

              <motion.p
                className="text-base md:text-lg max-w-2xl mx-auto text-white/50 mb-10 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                Building scalable, secure, and performant applications with
                <span className="text-primary-300 font-medium"> .NET Core</span>,
                <span className="text-accent-300 font-medium"> Flutter</span>, and modern architectures.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.3 }}
                className="flex flex-col sm:flex-row justify-center items-center gap-4"
              >
                <a
                  href="#contact"
                  className="group px-8 py-3.5 bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 flex items-center gap-2 font-medium"
                >
                  Get in Touch
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#projects"
                  className="px-8 py-3.5 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white border border-white/10 hover:border-white/20 rounded-xl transition-all duration-300 transform hover:scale-105 font-medium"
                >
                  View My Work
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <a
          href="#about"
          className="flex flex-col items-center text-white/40 hover:text-white/70 transition-colors group"
        >
          <span className="text-xs font-mono mb-2 tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={20} className="group-hover:text-primary-400 transition-colors" />
          </motion.div>
        </a>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-dark-900 to-transparent z-[5]" />
    </section>
  );
};

export default Hero;
