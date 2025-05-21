import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center' | 'right';
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ 
  title, 
  subtitle,
  alignment = 'center' 
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, delay: 0.3 }
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 0.8, ease: "easeInOut" }
    },
  };

  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={`flex flex-col ${alignmentClasses[alignment]} mb-10`}
    >
      <motion.h2 variants={titleVariants} className="text-3xl md:text-4xl font-bold relative">
        {title}
      </motion.h2>
      
      <motion.div
        variants={lineVariants}
        className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mt-3 mb-3 rounded-full"
      />
      
      {subtitle && (
        <motion.p variants={subtitleVariants} className="text-gray-600 dark:text-gray-400 text-lg">
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionHeading;