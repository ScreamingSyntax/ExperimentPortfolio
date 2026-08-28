import { useState } from 'react';
import { Server, Database, ShieldCheck, Network, ChevronDown } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';

/** The six that lead. Everything else lives in the marquee or the full list. */
const headline = ['C#', '.NET', 'Kafka', 'PostgreSQL', 'Docker', 'Redis'];

/** The belt. Long enough to fill the strip twice without obvious repetition. */
const belt = [
  'ASP.NET Core', 'Entity Framework Core', 'Microservices', 'Event-Driven Architecture',
  'gRPC', 'YARP', 'Polly', 'RabbitMQ', 'SignalR', 'Keycloak', 'OAuth 2.0', 'JWT',
  'RBAC', 'MFA / 2FA', 'SQL Server', 'AWS S3', 'SonarQube', 'xUnit', 'Clean Architecture',
];

const focusAreas = [
  {
    icon: Server,
    title: 'Backend Engineering',
    body: 'Secure APIs and distributed microservices with C#, .NET, ASP.NET Core, and EF Core.',
    fill: 'bg-lime text-on-lime',
  },
  {
    icon: Database,
    title: 'Data & Messaging',
    body: 'Reliable data flows with SQL Server, PostgreSQL, Redis, Kafka, and RabbitMQ.',
    fill: 'bg-paper text-ink',
  },
  {
    icon: ShieldCheck,
    title: 'Platform Security',
    body: 'Auth with Keycloak, OAuth 2.0, OpenID Connect, JWT, and dynamic RBAC.',
    fill: 'bg-paper text-ink',
  },
  {
    icon: Network,
    title: 'Distributed Systems',
    body: 'gRPC, YARP API Gateway, event-driven patterns, and Polly resilience.',
    fill: 'bg-violet text-on-violet',
  },
];

const skillGroups = [
  {
    title: 'Frameworks & Libraries',
    skills: ['ASP.NET Core', 'ASP.NET Core Web API', 'Entity Framework Core', 'LINQ', 'SignalR', 'EPPlus', 'gRPC'],
  },
  { title: 'Databases & Messaging', skills: ['SQL Server', 'PostgreSQL', 'Redis', 'Kafka', 'RabbitMQ'] },
  {
    title: 'Web & APIs',
    skills: ['REST APIs', 'YARP API Gateway', 'JWT', '2FA / MFA', 'Device Fingerprinting', 'OAuth 2.0', 'OpenID Connect', 'Keycloak'],
  },
  { title: 'Tools & Platforms', skills: ['Git', 'GitHub', 'Bitbucket', 'Docker', 'IIS', 'AWS S3', 'SonarQube'] },
  {
    title: 'Architecture & Patterns',
    skills: ['Microservices', 'Clean Architecture', 'Event-Driven Architecture', 'Multi-tenant', 'RBAC', 'Polly'],
  },
  { title: 'Testing', skills: ['xUnit', 'Moq', 'Shouldly', 'EF Core InMemory'] },
  { title: 'Methodologies', skills: ['Agile', 'Scrum', 'Jira', 'Trello'] },
  { title: 'Other', skills: ['Flutter', 'BLoC', 'Stripe Integration', 'IoT & Biometric Systems'] },
];

const Skills: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {/* The belt runs full-bleed, outside the container. */}
      <div className="marquee my-4" aria-hidden="true">
        {[0, 1].map((i) => (
          <div key={i} className="marquee__track">
            {belt.map((item) => (
              <span key={item} className="px-5">
                {item} <span className="opacity-40">·</span>
              </span>
            ))}
          </div>
        ))}
      </div>

      <section id="skills" className="container py-12 sm:py-16">
        <SectionHeading num="01" title="Skills" subtitle="What I reach for, and what I build with it" />

        {/* Six headline technologies */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {headline.map((name, i) => (
            <Reveal
              key={name}
              index={i}
              className="no-grid flex items-center justify-center border-3 border-ink bg-paper p-5 text-center font-display text-base shadow-hard-sm"
            >
              {name}
            </Reveal>
          ))}
        </div>

        {/* Four focus areas */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {focusAreas.map(({ icon: Icon, title, body, fill }, i) => (
            <Reveal
              key={title}
              index={i}
              className={`cell ${fill}`}
            >
              <Icon size={26} strokeWidth={2.5} />
              <h3 className="mb-2 mt-4 text-lg">{title}</h3>
              <p className="measure text-2xs">{body}</p>
            </Reveal>
          ))}
        </div>

        {/* Full stack list, folded away by default */}
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          className="btn btn-ghost mt-8"
        >
          {expanded ? 'Hide full stack' : 'See the full stack'}
          <ChevronDown
            size={18}
            className={`transition-transform duration-150 ${expanded ? 'rotate-180' : ''}`}
          />
        </button>

        {expanded && (
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {skillGroups.map((group) => (
              <div key={group.title} className="cell-flat">
                <h3 className="label mb-3 text-violet">{group.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span key={skill} className="tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Skills;
