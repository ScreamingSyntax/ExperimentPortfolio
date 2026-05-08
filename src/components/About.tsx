import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeading from './ui/SectionHeading';
import { Server, Database, Cpu, Smartphone, Award, Calendar, Code2, Users, Trophy, Globe, GraduationCap, Flame } from 'lucide-react';

const stats = [
  { icon: <Calendar size={20} />, value: 2, suffix: '+', label: 'Years Experience' },
  { icon: <Code2 size={20} />, value: 10000, suffix: '+', label: 'APIs Designed' },
  { icon: <Users size={20} />, value: 46000, suffix: '+', label: 'Students Reached' },
  { icon: <Award size={20} />, value: 4, suffix: '', label: 'Awards & Honors' },
];

const awards = [
  {
    icon: <GraduationCap className="w-5 h-5" />,
    title: 'Triple A Scholarship',
    period: '2024 — 2026',
    description: 'Awarded for excellence in academics, attendance, and discipline throughout the entire Bachelor\'s degree',
    color: 'text-yellow-500',
    bg: 'bg-yellow-500/10',
  },
  {
    icon: <Trophy className="w-5 h-5" />,
    title: '30-Second Pitch Challenge — 3rd Place',
    period: '2024',
    description: 'Competed against international participants at DesignThinkers Academy, Thailand',
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
  },
  {
    icon: <Globe className="w-5 h-5" />,
    title: 'International Exposure Program',
    period: '2024 · Thailand',
    description: 'Selected as 1 of 4 students from the college for an international academic and innovation program',
    color: 'text-primary-500',
    bg: 'bg-primary-500/10',
  },
  {
    icon: <Flame className="w-5 h-5" />,
    title: 'Hack4SafeFood Hackathon Mentor',
    period: '2025',
    description: 'Mentored Team Syntax Error to 1st place, guiding them on architecture, pitching, and time management',
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
  },
];

const focusAreas = [
  {
    icon: <Server className="w-6 h-6" />,
    title: 'Backend Development',
    description: 'Robust APIs & microservices with ASP.NET Core, Clean Architecture, and Entity Framework',
    color: 'from-primary-500 to-primary-600',
    iconBg: 'bg-primary-500/10 text-primary-500',
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: 'Database Design',
    description: 'Scalable data systems with PostgreSQL, SQL Server, and advanced LINQ queries',
    color: 'from-secondary-500 to-secondary-600',
    iconBg: 'bg-secondary-500/10 text-secondary-500',
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: 'IoT Systems',
    description: 'Smart attendance tracking, IoT integrations, and real-time monitoring solutions',
    color: 'from-accent-500 to-accent-600',
    iconBg: 'bg-accent-500/10 text-accent-500',
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: 'Mobile Development',
    description: 'Beautiful cross-platform applications with Flutter, Dart, and Firebase',
    color: 'from-orange-500 to-orange-600',
    iconBg: 'bg-orange-500/10 text-orange-500',
  },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [counterRef, inView] = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={counterRef}>
      <span ref={ref}>{count.toLocaleString()}</span>{suffix}
    </span>
  );
}

const About: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section id="about" className="section bg-gray-50/50 dark:bg-dark-800/50">
      <div className="container">
        <SectionHeading
          title="About Me"
          subtitle="A passionate engineer who loves turning complex problems into elegant solutions"
          label="Who I Am"
        />

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div
            variants={itemVariants}
            className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 mb-16"
          >
            <div className="relative flex-shrink-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="relative"
              >
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden border-2 border-primary-500/20 shadow-xl shadow-primary-500/10">
                  <img
                    src="/aaryan_photo.jpg"
                    alt="Aaryan Jha"
                    className="w-full h-full object-cover object-top"
                    loading="eager"
                  />
                </div>
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary-500/20 via-accent-500/10 to-secondary-500/20 -z-10 blur-sm" />
                <div className="absolute -bottom-3 -right-3 w-8 h-8 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center text-white text-xs font-bold shadow-lg">
                  <Code2 size={14} />
                </div>
              </motion.div>
            </div>

            <div className="text-center lg:text-left max-w-2xl">
              <p className="text-lg md:text-xl text-gray-600 dark:text-dark-200 leading-relaxed">
                Software Engineer at{' '}
                <span className="text-primary-500 font-semibold">Vertex Special Technologies</span>{' '}
                and Academic Tutor at{' '}
                <span className="text-primary-500 font-semibold">Islington College</span>.
                I mentor the next generation of developers by morning and build enterprise systems by evening.
              </p>
            </div>
          </motion.div>
{/* 
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16"
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="relative group text-center p-6 rounded-2xl bg-white dark:bg-dark-700 border border-gray-100 dark:border-dark-600 hover:border-primary-200 dark:hover:border-primary-800 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="flex justify-center mb-3 text-primary-500">
                    {stat.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold font-display text-gradient mb-1">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-gray-500 dark:text-dark-300 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </motion.div> */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {focusAreas.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative p-6 rounded-2xl bg-white dark:bg-dark-700 border border-gray-100 dark:border-dark-600 hover:border-transparent transition-all duration-500 hover:-translate-y-2 hover:shadow-xl overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />

                <div className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold font-display mb-2 group-hover:text-primary-500 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-500 dark:text-dark-300 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants}>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary-500 font-mono mb-6 text-center">
              {'// '}Awards & Recognition
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {awards.map((award, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="group flex gap-4 p-5 rounded-2xl bg-white dark:bg-dark-700 border border-gray-100 dark:border-dark-600 hover:border-primary-200 dark:hover:border-primary-800 transition-all duration-400 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className={`flex-shrink-0 w-10 h-10 rounded-xl ${award.bg} ${award.color} flex items-center justify-center`}>
                    {award.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="font-semibold text-sm leading-tight group-hover:text-primary-500 transition-colors">
                        {award.title}
                      </h4>
                      <span className="flex-shrink-0 text-xs font-mono text-gray-400 dark:text-dark-300 mt-0.5">
                        {award.period}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-dark-300 leading-relaxed">
                      {award.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
