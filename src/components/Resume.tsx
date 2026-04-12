import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeading from './ui/SectionHeading';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check, Download, Code2, Eye } from 'lucide-react';

const resumeJson = {
  name: 'Aaryan Jha',
  title: 'Software Engineer',
  technicalExpertise: [
    'ASP.NET Core', 'ASP.NET MVC', 'Entity Framework Core', 'LINQ',
    'REST APIs', 'JWT Authentication', '2FA & Device Fingerprinting',
    'Clean Architecture', 'Flutter', 'SQL Server', 'PostgreSQL',
  ],
  experience: [
    {
      title: 'Software Engineer',
      company: 'Vertex Special Technologies',
      period: 'Jul 2024 - Present',
      highlights: [
        'Multi-tenant architecture with 2FA & device fingerprinting',
        'RBAC across 325+ APIs',
        'OCR processing with AWS S3 & SignalR',
        'Secure API Gateway with Argon2',
      ],
    },
    {
      title: 'Tutor & FYP Supervisor',
      company: 'Islington College',
      period: 'Aug 2025 - Present',
      highlights: [
        'Lectures on .NET Core, MAUI, and Blazor',
        'Final-year project mentoring & code reviews',
      ],
    },
  ],
  education: {
    degree: 'BSc (Hons) Computing',
    institution: 'Itahari International College (London Metropolitan University)',
    year: '2025',
  },
  awards: [
    'Triple A Scholarship (2024-2026)',
    '30-Second Pitch Challenge - 3rd Place (Thailand, 2024)',
    'International Exposure Program (Thailand, 2024)',
    'Hack4SafeFood Mentor - Winning Team (2025)',
  ],
  contact: {
    email: 'whcloud91@gmail.com',
    github: 'github.com/screamingsyntax',
    linkedin: 'linkedin.com/in/aaryanjha',
    portfolio: 'aaryanj.com.np',
  },
};

type ViewMode = 'json' | 'visual';

const Resume: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('json');

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(resumeJson, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="resume" className="section bg-gray-50/50 dark:bg-dark-800/50">
      <div className="container">
        <SectionHeading
          title="Resume"
          subtitle="My professional profile — because developers read JSON"
          label="Download & Explore"
        />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="rounded-2xl overflow-hidden bg-white dark:bg-dark-700 border border-gray-100 dark:border-dark-600 shadow-xl">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-600 border-b border-gray-100 dark:border-dark-500">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-sm font-mono text-gray-500 dark:text-dark-300">resume.json</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-dark-500">
                  <button
                    onClick={() => setViewMode('json')}
                    className={`px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 transition-colors ${
                      viewMode === 'json'
                        ? 'bg-primary-500 text-white'
                        : 'bg-white dark:bg-dark-600 text-gray-600 dark:text-dark-200 hover:bg-gray-50 dark:hover:bg-dark-500'
                    }`}
                  >
                    <Code2 size={12} /> JSON
                  </button>
                  <button
                    onClick={() => setViewMode('visual')}
                    className={`px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 transition-colors ${
                      viewMode === 'visual'
                        ? 'bg-primary-500 text-white'
                        : 'bg-white dark:bg-dark-600 text-gray-600 dark:text-dark-200 hover:bg-gray-50 dark:hover:bg-dark-500'
                    }`}
                  >
                    <Eye size={12} /> Visual
                  </button>
                </div>
                <button
                  onClick={handleCopy}
                  className="p-2 rounded-lg bg-white dark:bg-dark-500 hover:bg-gray-100 dark:hover:bg-dark-400 transition-colors flex items-center gap-1.5 text-xs font-medium text-gray-600 dark:text-dark-200"
                >
                  {copied ? <><Check size={14} className="text-green-500" /> Copied</> : <><Copy size={14} /> Copy</>}
                </button>
              </div>
            </div>

            {viewMode === 'json' ? (
              <div className="max-h-[500px] overflow-auto custom-scrollbar">
                <SyntaxHighlighter
                  language="json"
                  style={vscDarkPlus}
                  showLineNumbers
                  wrapLines
                  customStyle={{ margin: 0, borderRadius: 0, fontSize: '13px', background: '#1e1e2e' }}
                >
                  {JSON.stringify(resumeJson, null, 2)}
                </SyntaxHighlighter>
              </div>
            ) : (
              <div className="p-6 max-h-[500px] overflow-auto custom-scrollbar space-y-6">
                <div>
                  <h3 className="text-2xl font-bold font-display text-gradient">{resumeJson.name}</h3>
                  <p className="text-gray-500 dark:text-dark-300">{resumeJson.title}</p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-primary-500 mb-3">Technical Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {resumeJson.technicalExpertise.map((skill, i) => (
                      <span key={i} className="px-3 py-1 text-xs font-medium bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-300 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-primary-500 mb-3">Experience</h4>
                  <div className="space-y-4">
                    {resumeJson.experience.map((exp, i) => (
                      <div key={i} className="p-4 rounded-xl bg-gray-50 dark:bg-dark-600 border border-gray-100 dark:border-dark-500">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h5 className="font-semibold">{exp.title}</h5>
                            <p className="text-sm text-primary-500">{exp.company}</p>
                          </div>
                          <span className="text-xs text-gray-400 dark:text-dark-300 font-mono">{exp.period}</span>
                        </div>
                        <ul className="space-y-1">
                          {exp.highlights.map((h, j) => (
                            <li key={j} className="text-sm text-gray-600 dark:text-dark-200 flex items-start gap-2">
                              <span className="w-1 h-1 rounded-full bg-primary-500 mt-2 flex-shrink-0" /> {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-primary-500 mb-3">Awards</h4>
                  <ul className="space-y-1">
                    {resumeJson.awards.map((a, i) => (
                      <li key={i} className="text-sm text-gray-600 dark:text-dark-200 flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-accent-500 mt-2 flex-shrink-0" /> {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 text-center">
            <a
              href="/resume.pdf"
              download
              className="group inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl transition-all duration-300 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:scale-105 font-medium"
            >
              <Download size={18} className="group-hover:-translate-y-0.5 transition-transform" />
              Download Full Resume (PDF)
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;
