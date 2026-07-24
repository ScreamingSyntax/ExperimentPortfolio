import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeading from './ui/SectionHeading';
import { Briefcase, GraduationCap, Laptop, ChevronDown, ChevronUp, MapPin } from 'lucide-react';

const experiences = [
  {
    title: 'Software Engineer',
    company: 'Vertex Special Technologies',
    location: 'Lalitpur, Nepal',
    period: 'Jun 2024 — Present',
    type: 'Full-time · On-site',
    description: [
      'Built an OCR-driven financial document processing platform with AWS S3, SignalR, webhooks, and version-controlled workflows',
      'Developed financial reporting modules (General Ledger, Trial Balance, P&L, Balance Sheet) with PDF, Excel, CSV, and JSON export',
      'Designed multi-tenant architecture and enterprise security including MFA/2FA, trusted devices, and device fingerprinting',
      'Engineered dynamic RBAC with module/action-level permissions securing 325+ APIs',
      'Developed HRMS modules for attendance, leave, recruitment, and employee lifecycle with biometric device integration',
      'Built secure API Gateway solutions using API keys, Argon2 hashing, and idempotent webhook processing',
      'Improved scalability by restructuring APIs, containerizing with Docker, and adding automated tests (xUnit, Moq, Shouldly)',
      'Led backend development from design to deployment, collaborating with teams across the US, Nepal, and Pakistan',
    ],
    roles: undefined,
    skills: ['C#', '.NET Core', 'SQL Server', 'PostgreSQL', 'AWS S3', 'SignalR', 'Docker', 'RBAC', 'Clean Architecture'],
    icon: <Briefcase className="w-5 h-5" />,
    color: 'from-primary-500 to-primary-600',
    dotColor: 'bg-primary-500',
  },
  {
    title: 'Tutor & Final Year Project Supervisor',
    company: 'Islington College',
    location: 'Kathmandu, Nepal',
    period: 'Aug 2025 — Jul 2026',
    type: 'On-site',
    description: [],
    roles: [
      {
        title: 'Final Year Project Supervisor',
        period: 'Aug 2025 — Jul 2026',
        bullets: [
          'Mentored and evaluated final-year projects with technical guidance and code reviews',
          'Assessed project quality through documentation reviews, vivas, and defense sessions',
        ],
      },
      {
        title: 'Academic Tutor',
        period: 'Aug 2025 — Jul 2026',
        bullets: [
          'Delivered lectures and practical training in .NET Core Web API, MAUI, and Blazor',
        ],
      },
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
    roles: undefined,
    skills: ['IoT', 'React', 'Django', 'Leadership', 'Pitching'],
    icon: <Laptop className="w-5 h-5" />,
    color: 'from-accent-500 to-accent-600',
    dotColor: 'bg-accent-500',
  },
];

function ExperienceCard({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [cardRef, cardInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const hasRoles = exp.roles && exp.roles.length > 0;
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
                  {exp.company}
                </h3>
              </div>
              <div className="flex items-center gap-3 text-sm">
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

          {hasRoles ? (
            <div className="space-y-5">
              {exp.roles!.map((role, ri) => (
                <div key={ri} className={ri > 0 ? 'pt-5 border-t border-gray-100 dark:border-dark-600' : ''}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                    <h4 className="text-base font-semibold text-gray-800 dark:text-white">
                      {role.title}
                    </h4>
                    <span className="text-xs font-mono text-gray-400 dark:text-dark-300">
                      {role.period}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {role.bullets.map((bullet, bi) => (
                      <li
                        key={bi}
                        className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-dark-200"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 bg-gradient-to-r ${exp.color}`} />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <>
              {!hasRoles && exp.title !== exp.company && (
                <h4 className="text-base font-semibold text-gray-800 dark:text-white mb-3">
                  {exp.title}
                </h4>
              )}
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
            </>
          )}

          <div className={`flex flex-wrap gap-2 pt-4 border-t border-gray-100 dark:border-dark-600 ${hasRoles ? 'mt-5' : ''}`}>
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
