import { useState } from 'react';
import { Copy, Check, Download } from 'lucide-react';
import Reveal from './ui/Reveal';

const resumeJson = {
  name: 'Aaryan Jha',
  title: 'Mid-Level Backend Software Engineer',
  location: 'Kathmandu, Nepal',
  technicalExpertise: [
    'C#', '.NET', 'ASP.NET Core', 'Entity Framework Core', 'LINQ', 'SignalR',
    'Microservices', 'Event-Driven Architecture', 'REST APIs', 'gRPC', 'YARP', 'Polly',
    'SQL Server', 'PostgreSQL', 'Redis', 'Kafka', 'RabbitMQ',
    'Keycloak', 'OAuth 2.0', 'OpenID Connect', 'JWT', 'RBAC', 'MFA / 2FA',
    'Docker', 'SonarQube', 'xUnit', 'Moq', 'Shouldly', 'AWS S3',
  ],
  experience: [
    {
      title: 'Mid-Level Software Engineer',
      company: 'Ureka Systems Pvt. Ltd.',
      period: 'July 2026 - Present',
      highlights: [
        'Distributed .NET microservices for an enterprise fintech platform',
        'Kafka and Rebus messaging over RabbitMQ with Redis caching',
        'Keycloak authentication, gRPC communication, and YARP API routing',
        'Polly resilience patterns, shared libraries, and SonarQube quality checks',
      ],
    },
    {
      title: 'Software Engineer',
      company: 'Vertex Special Technologies',
      period: 'June 2024 - July 2026',
      highlights: [
        'OCR-driven document processing with AWS S3 & SignalR',
        'Multi-tenant architecture with MFA & device fingerprinting',
        'RBAC securing 325+ APIs',
        'Financial reporting & HRMS modules',
        'Secure API Gateway with Argon2',
      ],
    },
    {
      title: 'Tutor & FYP Supervisor',
      company: 'Islington College',
      period: 'Aug 2025 - Aug 2026',
      highlights: [
        'Lectures on .NET Core Web API, MAUI, and Blazor',
        'Final-year project mentoring, code reviews & defenses',
      ],
    },
  ],
  education: {
    degree: 'BSc (Hons) Computing - 74% (Straight A)',
    institution: 'Itahari International College (London Metropolitan University)',
    year: '2022 - 2025',
  },
  certifications: [
    { name: 'Back-End Development with .NET', issuer: 'Microsoft' },
    { name: 'Introduction to Programming With C#', issuer: 'Microsoft' },
    { name: 'Database Integration and Management', issuer: 'Microsoft' },
    { name: 'Data Structures and Algorithms', issuer: 'Microsoft' },
    { name: 'Foundations of Coding Back-End', issuer: 'Microsoft' },
    { name: 'Design Patterns', issuer: 'University of Alberta' },
  ],
  awards: [
    'Triple A Scholarship (all academic years)',
    '30-Second Pitch Challenge - 3rd Place (Thailand, 2024)',
    'International Exposure Program (Thailand, 2024)',
    'Hack4SafeFood Mentor - Winning Team (2025)',
  ],
  contact: {
    phone: '+977 9745471881',
    email: 'whcloud91@gmail.com',
    github: 'github.com/screamingsyntax',
    linkedin: 'linkedin.com/in/aaryanjha',
    portfolio: 'jhaaaryan.com.np',
  },
  languages: ['English (Fluent)', 'Nepali (Native)', 'Hindi (Conversational)'],
};

const Resume: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(JSON.stringify(resumeJson, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="resume" className="container py-12 sm:py-16">
      <Reveal
        className="border-3 border-ink shadow-hard"
      >
        {/* Terminal chrome */}
        <div className="no-grid flex flex-wrap items-center justify-between gap-3 border-b-3 border-ink bg-cream p-4">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="h-3 w-3 border-2 border-ink bg-pink" />
              <span className="h-3 w-3 border-2 border-ink bg-lime" />
              <span className="h-3 w-3 border-2 border-ink bg-violet" />
            </div>
            <span className="label">resume.json</span>
          </div>

          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={handleCopy} className="btn btn-ghost !px-3 !py-2 text-2xs">
              {copied ? <Check size={15} /> : <Copy size={15} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
            <a href="/resume.pdf" download className="btn btn-primary !px-3 !py-2 text-2xs">
              <Download size={15} /> PDF
            </a>
          </div>
        </div>

        <div className="terminal no-grid max-h-[26rem] overflow-auto p-5">
          <pre className="text-2xs leading-relaxed">
            <code>{JSON.stringify(resumeJson, null, 2)}</code>
          </pre>
        </div>
      </Reveal>
    </section>
  );
};

export default Resume;
