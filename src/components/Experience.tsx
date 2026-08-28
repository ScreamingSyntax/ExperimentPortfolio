import { useState } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';

interface Role {
  title: string;
  period: string;
  bullets: string[];
}

interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  type: string;
  current?: boolean;
  description: string[];
  roles?: Role[];
  skills: string[];
}

const experiences: Experience[] = [
  {
    title: 'Mid-Level Software Engineer',
    company: 'Ureka Systems',
    location: 'Kathmandu, Nepal',
    period: 'Jul 2026 — Present',
    type: 'Full-time · On-site',
    current: true,
    description: [
      'Contribute to an enterprise fintech platform built on .NET and a distributed microservices architecture',
      'Develop event-driven services with Kafka and Rebus messaging over RabbitMQ, using Redis for distributed caching',
      'Implement authentication and authorization with Keycloak, JWT, and role-based access control',
      'Build gRPC service-to-service communication and manage API routing through YARP API Gateway',
      'Apply Polly resilience patterns and create shared libraries used across multiple microservices',
      'Use SonarQube to resolve code smells and maintain quality across .NET services',
    ],
    skills: ['C#', '.NET', 'Microservices', 'Kafka', 'RabbitMQ', 'Redis', 'Keycloak', 'gRPC', 'YARP', 'Polly'],
  },
  {
    title: 'Software Engineer',
    company: 'Vertex Special Technologies',
    location: 'Lalitpur, Nepal',
    period: 'Jun 2024 — Jul 2026',
    type: 'Full-time · On-site',
    description: [
      'Built an OCR-driven financial document processing platform with AWS S3, SignalR, webhooks, and version-controlled workflows',
      'Engineered dynamic RBAC with module and action-level permissions securing 325+ APIs',
      'Designed multi-tenant architecture and enterprise security including MFA/2FA, trusted devices, and device fingerprinting',
      'Developed financial reporting modules (General Ledger, Trial Balance, P&L, Balance Sheet) with PDF, Excel, CSV, and JSON export',
      'Developed HRMS modules for attendance, leave, recruitment, and employee lifecycle with biometric device integration',
      'Built secure API Gateway solutions using API keys, Argon2 hashing, and idempotent webhook processing',
      'Improved scalability by restructuring APIs, containerizing with Docker, and adding automated tests (xUnit, Moq, Shouldly)',
      'Led backend development from design to deployment, collaborating with teams across the US, Nepal, and Pakistan',
    ],
    skills: ['C#', '.NET Core', 'SQL Server', 'PostgreSQL', 'AWS S3', 'SignalR', 'Docker', 'RBAC', 'Clean Architecture'],
  },
  {
    title: 'Tutor & Final Year Project Supervisor',
    company: 'Islington College',
    location: 'Kathmandu, Nepal',
    period: 'Aug 2025 — Aug 2026',
    type: 'On-site',
    description: [],
    roles: [
      {
        title: 'Final Year Project Supervisor',
        period: 'Aug 2025 — Aug 2026',
        bullets: [
          'Mentored and evaluated final-year projects with technical guidance and code reviews',
          'Assessed project quality through documentation reviews, vivas, and defense sessions',
        ],
      },
      {
        title: 'Academic Tutor',
        period: 'Aug 2025 — Aug 2026',
        bullets: ['Delivered lectures and practical training in .NET Core Web API, MAUI, and Blazor'],
      },
    ],
    skills: ['C#', '.NET Core', 'MAUI', 'Blazor', 'Mentoring', 'Code Review'],
  },
  {
    title: 'Full Stack Developer & IoT Engineer',
    company: 'ING Skill Academy',
    location: 'Nepal',
    period: '2023',
    type: 'Contract',
    description: [
      'Developed and delivered multiple college web applications',
      'Led IoT projects including the Remote Control Smart Dustbin',
      'Showcased projects at 12 nationwide Futurama events, reaching 46,000+ students',
    ],
    skills: ['IoT', 'React', 'Django', 'Leadership', 'Pitching'],
  },
];

function ExperienceCard({ exp, index }: { exp: Experience; index: number }) {
  const [expanded, setExpanded] = useState(false);

  const hasRoles = Boolean(exp.roles?.length);
  const visible = expanded ? exp.description : exp.description.slice(0, 3);
  const hidden = exp.description.length - 3;

  return (
    <Reveal as="article" index={index} className="relative pl-8 sm:pl-12">
      {/* Timeline rail + square node */}
      <div
        className="absolute left-[7px] top-4 bottom-0 w-[3px] bg-ink"
        aria-hidden="true"
      />
      <div
        className={`absolute left-0 top-4 h-4 w-4 border-3 border-ink ${
          exp.current ? 'bg-pink' : 'bg-paper'
        }`}
        aria-hidden="true"
      />

      <div className="no-grid mb-6 border-3 border-ink bg-paper shadow-hard-sm">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b-3 border-ink p-5">
          <div>
            <h3 className="text-lg">{exp.company}</h3>
            <p className="mt-1 text-2xs text-ink-soft">{exp.title}</p>
            <p className="eyebrow mt-2 flex items-center gap-1.5">
              <MapPin size={12} strokeWidth={2.5} /> {exp.location}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className={`tag tabular ${exp.current ? 'tag-fill' : ''}`}>{exp.period}</span>
            <span className="tag">{exp.type}</span>
          </div>
        </div>

        <div className="p-5">
          {hasRoles ? (
            <div className="flex flex-col gap-5">
              {exp.roles!.map((role, ri) => (
                <div key={role.title} className={ri > 0 ? 'border-t-2 border-grid pt-5' : ''}>
                  <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="text-base">{role.title}</h4>
                    <span className="eyebrow tabular">{role.period}</span>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {role.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2.5 text-2xs text-ink-soft">
                        <span className="mt-[0.45em] h-2 w-2 shrink-0 bg-violet" aria-hidden="true" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <>
              <ul className="flex flex-col gap-2">
                {visible.map((item) => (
                  <li key={item} className="flex gap-2.5 text-2xs text-ink-soft">
                    <span className="mt-[0.45em] h-2 w-2 shrink-0 bg-violet" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>

              {hidden > 0 && (
                <button
                  type="button"
                  onClick={() => setExpanded(!expanded)}
                  aria-expanded={expanded}
                  className="label mt-4 inline-flex items-center gap-1.5 border-b-2 border-ink pb-0.5 hover:text-violet"
                >
                  {expanded ? 'Show less' : `Show ${hidden} more`}
                  <ChevronDown
                    size={14}
                    strokeWidth={3}
                    className={`transition-transform duration-150 ${expanded ? 'rotate-180' : ''}`}
                  />
                </button>
              )}
            </>
          )}

          <div className="mt-5 flex flex-wrap gap-2 border-t-2 border-grid pt-4">
            {exp.skills.map((skill) => (
              <span key={skill} className="tag">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

const Experience: React.FC = () => (
  <section id="experience" className="container py-12 sm:py-16">
    <SectionHeading num="03" title="Experience" subtitle="Four roles, two countries' worth of teams" />
    <div className="max-w-4xl">
      {experiences.map((exp, index) => (
        <ExperienceCard key={exp.company} exp={exp} index={index} />
      ))}
    </div>
  </section>
);

export default Experience;
