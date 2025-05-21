import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import HeroCanvas from './three/HeroCanvas';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScrollDown = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Hero Canvas Background */}
      <HeroCanvas />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h1 className="heading-xl mb-6 text-white">
              <span className="block">Hi, I'm</span>
              <span className="text-gradient">Aaryan Jha</span>
            </h1>
            
            <motion.p 
              className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              A passionate software engineer specializing in scalable web and mobile applications 
              using <span className="text-primary-300 font-medium">.NET Core</span> and <span className="text-secondary-300 font-medium">Flutter</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8"
            >
              <a 
                href="#contact" 
                className="px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary-500/20"
              >
                Get in Touch
              </a>
              <a 
                href="#resume" 
                className="px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/20 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                View Resume
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: 2,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.5
        }}
        ref={scrollRef}
        onClick={handleScrollDown}
      >
        <button 
          className="flex flex-col items-center text-white opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
          aria-label="Scroll down"
        >
          <span className="mb-2 text-sm font-light">Scroll Down</span>
          <ChevronDown size={24} />
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;