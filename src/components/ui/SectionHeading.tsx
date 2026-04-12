import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center' | 'right';
  label?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  alignment = 'center',
  label,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={`flex flex-col ${alignmentClasses[alignment]} mb-12 md:mb-16`}
    >
      {label && (
        <motion.span
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
          className="text-primary-500 font-mono text-sm tracking-wider uppercase mb-3"
        >
          {'// '}{label}
        </motion.span>
      )}

      <motion.h2
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
        }}
        className="text-3xl md:text-4xl lg:text-5xl font-bold font-display relative"
      >
        {title}
      </motion.h2>

      <motion.div
        variants={{
          hidden: { scaleX: 0, opacity: 0 },
          visible: { scaleX: 1, opacity: 1, transition: { duration: 0.8, ease: 'easeInOut', delay: 0.2 } },
        }}
        className="w-20 h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500 mt-4 mb-4 rounded-full origin-left"
      />

      {subtitle && (
        <motion.p
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.6, delay: 0.4 } },
          }}
          className="text-gray-500 dark:text-dark-300 text-lg max-w-2xl"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
