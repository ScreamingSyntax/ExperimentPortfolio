import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeading from './ui/SectionHeading';
import { ExternalLink, Github, Layers, Shield, CreditCard, FileText, Smartphone, Cpu } from 'lucide-react';

const projects = [
  {
    title: 'Enterprise Accounting Module',
    description: 'Full payment system with multi-tenant architecture, real-time tracking, and seamless transaction processing for enterprise clients.',
    tags: ['.NET Core', 'SQL Server', 'Clean Architecture', 'Multi-tenant'],
    icon: <CreditCard className="w-5 h-5" />,
    color: 'from-primary-500 to-primary-600',
    highlights: ['Payment processing', 'Multi-tenant', 'Excel import/export'],
  },
  {
    title: 'RBAC Authorization System',
    description: 'Comprehensive role-based access control managing permissions across 325+ APIs with 2FA, device fingerprinting, and trusted device support.',
    tags: ['C#', 'ASP.NET Core', '2FA', 'Argon2', 'JWT'],
    icon: <Shield className="w-5 h-5" />,
    color: 'from-secondary-500 to-secondary-600',
    highlights: ['325+ APIs', 'Device fingerprinting', 'API Gateway'],
  },
  {
    title: 'OCR Document Processing',
    description: 'Async OCR pipeline using AWS S3, SignalR for real-time updates, and idempotent webhook patterns for reliable document processing.',
    tags: ['AWS S3', 'SignalR', 'Webhooks', '.NET Core'],
    icon: <FileText className="w-5 h-5" />,
    color: 'from-accent-500 to-accent-600',
    highlights: ['Async workflows', 'Version control', 'Real-time updates'],
  },
  {
    title: 'IoT Attendance System',
    description: 'Smart punch-in/out system integrating IoT devices for real-time attendance tracking with dashboard analytics.',
    tags: ['IoT', '.NET Core', 'PostgreSQL', 'Real-time'],
    icon: <Cpu className="w-5 h-5" />,
    color: 'from-orange-500 to-orange-600',
    highlights: ['IoT integration', 'Real-time tracking', 'Analytics'],
  },
  {
    title: 'API Architecture Redesign',
    description: 'Complete restructure of legacy API architecture to improve scalability, modularity, and maintainability with clean architecture patterns.',
    tags: ['Microservices', 'Clean Architecture', 'Docker', 'REST'],
    icon: <Layers className="w-5 h-5" />,
    color: 'from-violet-500 to-violet-600',
    highlights: ['Scalable design', 'Modular codebase', 'Docker deployment'],
  },
  {
    title: 'Remote Control Smart Dustbin',
    description: 'IoT project showcased at 12 nationwide Futurama events, reaching 46,000+ students. Led development and presentations.',
    tags: ['IoT', 'Arduino', 'React', 'Django'],
    icon: <Smartphone className="w-5 h-5" />,
    color: 'from-cyan-500 to-cyan-600',
    highlights: ['46,000+ reach', '12 events', 'Award-winning'],
  },
];

const Projects: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeading
          title="Featured Projects"
          subtitle="A selection of systems and solutions I've built"
          label="My Work"
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative rounded-2xl bg-white dark:bg-dark-700 border border-gray-100 dark:border-dark-600 hover:border-primary-200 dark:hover:border-primary-700 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className={`h-1 bg-gradient-to-r ${project.color} transition-all duration-500 ${hoveredIndex === index ? 'h-1.5' : ''}`} />

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-r ${project.color} text-white shadow-lg`}>
                    {project.icon}
                  </div>
                </div>

                <h3 className="text-lg font-bold font-display mb-2 group-hover:text-primary-500 transition-colors">
                  {project.title}
                </h3>

                <p className="text-sm text-gray-500 dark:text-dark-300 leading-relaxed mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 rounded-md bg-primary-50 dark:bg-primary-900/15 text-primary-600 dark:text-primary-300 font-medium"
                    >
                      {h}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-gray-100 dark:border-dark-600">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 rounded-md bg-gray-50 dark:bg-dark-600 text-gray-500 dark:text-dark-300 border border-gray-100 dark:border-dark-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
