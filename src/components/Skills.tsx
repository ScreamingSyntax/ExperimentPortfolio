import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeading from './ui/SectionHeading';
import SkillsCanvas from './three/SkillsCanvas';

type Skill = {
  name: string;
  level: number;
  category: 'backend' | 'database' | 'frontend' | 'mobile';
  icon: string;
};

const Skills: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeCategory, setActiveCategory] = useState<string>('all');

  const skills: Skill[] = [
    { name: 'ASP.NET Core', level: 90, category: 'backend', icon: '⚙️' },
    { name: 'Entity Framework', level: 85, category: 'backend', icon: '🔌' },
    { name: 'Web API', level: 90, category: 'backend', icon: '🌐' },
    { name: 'ASP .NET MVC', level: 85, category: 'backend', icon: '🏛️' },
    { name: 'Clean Architecture', level: 85, category: 'backend', icon: '🏛️' },
    { name: 'Multitenant Architecture', level: 85, category: 'backend', icon: '🏛️' },
    { name: 'PostgreSQL', level: 80, category: 'database', icon: '🐘' },
    { name: 'SQL Server', level: 85, category: 'database', icon: '🗄️' },
    { name: 'LINQ', level: 90, category: 'database', icon: '🔍' },
    { name: 'Flutter', level: 80, category: 'mobile', icon: '📱' },
    { name: 'Dart', level: 50, category: 'mobile', icon: '🎯' },
    { name: 'Firebase', level: 50, category: 'mobile', icon: '🔥' },
    { name: 'JavaScript', level: 50, category: 'frontend', icon: '📜' },
    { name: 'HTML/CSS', level: 70, category: 'frontend', icon: '🎨' },
  ];

  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  const categories = [
    { id: 'all', name: 'All Skills' },
    { id: 'backend', name: 'Backend' },
    { id: 'database', name: 'Database' },
    { id: 'mobile', name: 'Mobile' },
    { id: 'frontend', name: 'Frontend' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    },
  };

  return (
    <section id="skills" className="section relative">
      <div className="container relative z-10">
        <SectionHeading 
          title="Technical Skills" 
          subtitle="Technologies I work with" 
        />

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mt-8 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-dark-700 hover:bg-gray-200 dark:hover:bg-dark-600 text-gray-800 dark:text-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* 3D Skills Canvas */}
        <div className="h-64 md:h-80 mb-12 relative">
          <SkillsCanvas skills={filteredSkills} />
        </div>

        {/* Skills Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
        >
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="skill-card group"
            >
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-2">{skill.icon}</span>
                <h3 className="text-lg font-semibold">{skill.name}</h3>
              </div>
              
              <div className="w-full bg-gray-200 dark:bg-dark-600 rounded-full h-2.5 mb-1">
                <motion.div 
                  className="h-2.5 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
              
              <div className="text-sm text-gray-600 dark:text-gray-400 text-right">
                {skill.level}%
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;