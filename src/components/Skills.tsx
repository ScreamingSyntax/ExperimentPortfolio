import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeading from './ui/SectionHeading';

type Skill = {
  name: string;
  level: number;
  category: 'backend' | 'database' | 'frontend' | 'mobile' | 'devops';
};

const skills: Skill[] = [
  { name: 'ASP.NET Core', level: 90, category: 'backend' },
  { name: 'Entity Framework', level: 85, category: 'backend' },
  { name: 'Web API / REST', level: 90, category: 'backend' },
  { name: 'ASP.NET MVC', level: 85, category: 'backend' },
  { name: 'Clean Architecture', level: 85, category: 'backend' },
  { name: 'Multi-tenant', level: 85, category: 'backend' },
  { name: 'C#', level: 90, category: 'backend' },
  { name: 'LINQ', level: 90, category: 'backend' },
  { name: 'PostgreSQL', level: 80, category: 'database' },
  { name: 'SQL Server', level: 85, category: 'database' },
  { name: 'Redis', level: 60, category: 'database' },
  { name: 'Flutter', level: 80, category: 'mobile' },
  { name: 'Dart', level: 75, category: 'mobile' },
  { name: 'Firebase', level: 65, category: 'mobile' },
  { name: 'JavaScript', level: 60, category: 'frontend' },
  { name: 'HTML / CSS', level: 70, category: 'frontend' },
  { name: 'React', level: 55, category: 'frontend' },
  { name: 'Docker', level: 60, category: 'devops' },
  { name: 'IIS', level: 75, category: 'devops' },
  { name: 'AWS S3', level: 65, category: 'devops' },
  { name: 'SignalR', level: 70, category: 'devops' },
];

const categories = [
  { id: 'all', name: 'All', color: 'from-primary-500 to-accent-500' },
  { id: 'backend', name: 'Backend', color: 'from-primary-500 to-primary-600' },
  { id: 'database', name: 'Database', color: 'from-secondary-500 to-secondary-600' },
  { id: 'mobile', name: 'Mobile', color: 'from-orange-500 to-orange-600' },
  { id: 'frontend', name: 'Frontend', color: 'from-violet-500 to-violet-600' },
  { id: 'devops', name: 'DevOps & Tools', color: 'from-cyan-500 to-cyan-600' },
];

function getSkillColor(category: string) {
  switch (category) {
    case 'backend': return 'from-primary-500 to-primary-400';
    case 'database': return 'from-secondary-500 to-secondary-400';
    case 'mobile': return 'from-orange-500 to-orange-400';
    case 'frontend': return 'from-violet-500 to-violet-400';
    case 'devops': return 'from-cyan-500 to-cyan-400';
    default: return 'from-primary-500 to-accent-500';
  }
}

function getSkillBgColor(category: string) {
  switch (category) {
    case 'backend': return 'bg-primary-500/10 text-primary-500 border-primary-500/20';
    case 'database': return 'bg-secondary-500/10 text-secondary-500 border-secondary-500/20';
    case 'mobile': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
    case 'frontend': return 'bg-violet-500/10 text-violet-500 border-violet-500/20';
    case 'devops': return 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20';
    default: return 'bg-primary-500/10 text-primary-500 border-primary-500/20';
  }
}

const Skills: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="section relative">
      <div className="container relative z-10">
        <SectionHeading
          title="Technical Skills"
          subtitle="Technologies and tools I use to build great software"
          label="My Stack"
        />

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-dark-200 hover:bg-gray-200 dark:hover:bg-dark-600'
              }`}
            >
              {activeCategory === cat.id && (
                <motion.div
                  layoutId="activeSkillTab"
                  className={`absolute inset-0 bg-gradient-to-r ${cat.color} rounded-xl`}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat.name}</span>
            </button>
          ))}
        </div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative p-5 rounded-2xl bg-white dark:bg-dark-700 border border-gray-100 dark:border-dark-600 hover:border-primary-200 dark:hover:border-primary-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${getSkillColor(skill.category)}`} />
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                      {skill.name}
                    </h3>
                  </div>
                  <span className={`text-xs font-mono px-2 py-1 rounded-md border ${getSkillBgColor(skill.category)}`}>
                    {skill.level}%
                  </span>
                </div>

                <div className="w-full bg-gray-100 dark:bg-dark-600 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${getSkillColor(skill.category)} progress-bar-fill`}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
