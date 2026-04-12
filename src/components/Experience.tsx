import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeading from './ui/SectionHeading';
import { Briefcase, GraduationCap, Laptop, ChevronDown, ChevronUp, MapPin } from 'lucide-react';

const experiences = [
  {
    title: 'Software Engineer',
    company: 'Vertex Special Technologies',
    location: 'Nepal',
    period: 'Jul 2024 — Present',
    type: 'Full-time',
    description: [
      'Developed a payment system within the accounting module for seamless transactions',
      'Implemented multi-tenant architecture, 2FA with trusted devices, and device fingerprinting',
      'Built advanced Excel import/export features for efficient large-scale data handling',
      'Designed and implemented RBAC managing permissions across 325+ APIs',
      'Restructured API architecture for improved scalability and maintainability',
      'Developed OCR processing APIs using AWS S3, SignalR, and webhook-based async workflows',
      'Built version-controlled document system with multi-session tracking',
      'Implemented secure API Gateway with API key management using Argon2',
      'Designed idempotent webhook patterns for reliable async processing',
      'Led international knowledge transfer sessions (US, Nepal, Pakistan)',
      'Mentored winning team (Team Syntax Error) at Hack4SafeFood Hackathon',
    ],
    skills: ['C#', '.NET Core', 'SQL Server', 'PostgreSQL', 'AWS S3', 'SignalR', 'Docker', 'RBAC', 'Microservices'],
    icon: <Briefcase className="w-5 h-5" />,
    color: 'from-primary-500 to-primary-600',
    dotColor: 'bg-primary-500',
  },
  {
    title: 'Tutor & FYP Supervisor',
    company: 'Islington College',
    location: 'Nepal',
    period: 'Aug 2025 — Present',
    type: 'Part-time',
    description: [
      'Deliver lectures on application development using .NET Core Web API, MAUI, and Blazor',
      'Mentor final-year students throughout the project lifecycle',
      'Provide code reviews and technical guidance to improve project quality',
      'Evaluate student projects through assessments, documentation reviews, and viva',
      'Conduct project defense sessions assessing technical depth and implementation',
    ],
    skills: ['C#', '.NET Core', 'MAUI', 'Blazor', 'Mentoring', 'Code Review'],
    icon: <GraduationCap className="w-5 h-5" />,
    color: 'from-secondary-500 to-secondary-600',
    dotColor: 'bg-secondary-500',
  },
  {
    title: 'Full Stack Developer & IoT Engineer',
    company: 'ING Skill Academy',
    location: 'Nepal',
    period: '2023',
    type: 'Contract',
    description: [
      'Developed and delivered multiple college web applications',
      'Led IoT projects including "Remote Control Smart Dustbin"',
      'Showcased projects at 12 nationwide Futurama events, reaching 46,000+ students',
    ],
    skills: ['IoT', 'React', 'Django', 'Leadership', 'Pitching'],
    icon: <Laptop className="w-5 h-5" />,
    color: 'from-accent-500 to-accent-600',
    dotColor: 'bg-accent-500',
  },
];

function ExperienceCard({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [cardRef, cardInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const displayItems = expanded ? exp.description : exp.description.slice(0, 3);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: -30 }}
      animate={cardInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative pl-8 md:pl-12 pb-12 last:pb-0"
    >
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-gray-200 dark:from-dark-600 to-transparent" />

      <div className={`absolute left-0 top-2 w-3 h-3 rounded-full ${exp.dotColor} -translate-x-[6px] ring-4 ring-white dark:ring-dark-800`}>
        <div className={`absolute inset-0 rounded-full ${exp.dotColor} animate-ping opacity-20`} />
      </div>

      <div className="group bg-white dark:bg-dark-700 rounded-2xl border border-gray-100 dark:border-dark-600 hover:border-primary-200 dark:hover:border-primary-700 transition-all duration-500 overflow-hidden hover:shadow-xl">
        <div className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className={`p-1.5 rounded-lg bg-gradient-to-r ${exp.color} text-white`}>
                  {exp.icon}
                </div>
                <h3 className="text-xl font-bold font-display text-gray-800 dark:text-white">
                  {exp.title}
                </h3>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-primary-500 font-semibold">{exp.company}</span>
                <span className="flex items-center gap-1 text-gray-400 dark:text-dark-300">
                  <MapPin size={12} /> {exp.location}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 text-xs font-medium bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-300 rounded-full">
                {exp.period}
              </span>
              <span className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-dark-600 text-gray-600 dark:text-dark-200 rounded-full">
                {exp.type}
              </span>
            </div>
          </div>

          <ul className="space-y-2 mb-4">
            <AnimatePresence>
              {displayItems.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-dark-200"
                >
                  <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 bg-gradient-to-r ${exp.color}`} />
                  {item}
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          {exp.description.length > 3 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-sm text-primary-500 hover:text-primary-600 font-medium transition-colors mb-4"
            >
              {expanded ? (
                <>Show less <ChevronUp size={14} /></>
              ) : (
                <>Show {exp.description.length - 3} more <ChevronDown size={14} /></>
              )}
            </button>
          )}

          <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100 dark:border-dark-600">
            {exp.skills.map((skill, i) => (
              <span
                key={i}
                className="px-2.5 py-1 text-xs font-medium bg-gray-50 dark:bg-dark-600 text-gray-600 dark:text-dark-200 rounded-lg border border-gray-100 dark:border-dark-500 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const Experience: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="experience" className="section bg-gray-50/50 dark:bg-dark-800/50">
      <div className="container">
        <SectionHeading
          title="Professional Journey"
          subtitle="Building impactful products and mentoring the next generation"
          label="Experience"
        />

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="max-w-3xl mx-auto mt-12"
        >
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} exp={exp} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
