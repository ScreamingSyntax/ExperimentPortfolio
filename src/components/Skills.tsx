import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeading from './ui/SectionHeading';

type SkillGroup = {
  title: string;
  color: string;
  bg: string;
  border: string;
  skills: string[];
};

const skillGroups: SkillGroup[] = [
  {
    title: 'Frameworks & Libraries',
    color: 'text-primary-500',
    bg: 'bg-primary-500/10',
    border: 'border-primary-500/20 hover:border-primary-500/40',
    skills: [
      'ASP.NET Core',
      '.NET MVC',
      'Entity Framework',
      'LINQ',
      'SignalR',
      'EPPlus',
      'Flutter',
      'MAUI',
      'Blazor',
    ],
  },
  {
    title: 'Databases',
    color: 'text-secondary-500',
    bg: 'bg-secondary-500/10',
    border: 'border-secondary-500/20 hover:border-secondary-500/40',
    skills: ['MS SQL', 'PostgreSQL', 'Redis'],
  },
  {
    title: 'Web & APIs',
    color: 'text-accent-500',
    bg: 'bg-accent-500/10',
    border: 'border-accent-500/20 hover:border-accent-500/40',
    skills: [
      'REST APIs',
      'JWT',
      '2FA / MFA',
      'Device Fingerprinting',
      'JSON',
      'CSV',
      'Excel',
    ],
  },
  {
    title: 'Tools & Platforms',
    color: 'text-cyan-500',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20 hover:border-cyan-500/40',
    skills: [
      'Git',
      'GitHub',
      'Bitbucket',
      'Docker',
      'IIS',
      'RabbitMQ',
      'AWS S3',
    ],
  },
  {
    title: 'Architecture & Patterns',
    color: 'text-violet-500',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20 hover:border-violet-500/40',
    skills: ['Clean Architecture', 'Multi-tenant', 'RBAC', 'Bloc'],
  },
  {
    title: 'Testing',
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20 hover:border-orange-500/40',
    skills: ['xUnit', 'Moq', 'Shouldly', 'EF Core InMemory'],
  },
  {
    title: 'Methodologies',
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20 hover:border-emerald-500/40',
    skills: ['Agile', 'Scrum', 'Jira', 'Trello'],
  },
  {
    title: 'Other',
    color: 'text-rose-500',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20 hover:border-rose-500/40',
    skills: ['Stripe Integration', 'IoT Systems', 'C#'],
  },
];

const Skills: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" className="section relative">
      <div className="container relative z-10">
        <SectionHeading
          title="Technical Skills"
          subtitle="Technologies and tools I use to build great software"
          label="My Stack"
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          {skillGroups.map((group) => (
            <motion.div
              key={group.title}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
              }}
              className="p-6 rounded-2xl bg-white dark:bg-dark-700 border border-gray-100 dark:border-dark-600"
            >
              <h3 className={`text-sm font-semibold uppercase tracking-wider font-mono mb-4 ${group.color}`}>
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors duration-200 ${group.bg} ${group.color} ${group.border}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
