import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeading from './ui/SectionHeading';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';

const Resume: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [copied, setCopied] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const resumeJson =  {
    
  "name": "Aaryan Jha",
  "title": "Software Engineer",
  "technicalExpertise": [
    "ASP.NET Core",
    "ASP.NET MVC",
    "Entity Framework Core",
    "LINQ",
    "REST APIs",
    "JWT Authentication",
    "2FA & Device Fingerprinting",
    "Clean Architecture",
    "Flutter",
    "SQL Server",
    "PostgreSQL"
  ],
  "experience": [
    {
      "title": "Software Engineer",
      "company": "Vertex Special Technologies",
      "period": "Jul 2024 - Present",
      "description": [
        "Developed a payment system within the accounting module for seamless transactions",
        "Implemented multi-tenant architecture, 2FA with trusted devices, and device fingerprinting for enhanced security",
        "Built advanced Excel import/export features for efficient large-scale data handling",
        "Developed and deployed enterprise applications using .NET Core and IIS",
        "Integrated IoT-based punch-in/out system for real-time attendance tracking",
        "Designed and implemented RBAC managing permissions across 325+ APIs",
        "Restructured API architecture for improved scalability, modularity, and maintainability",
        "Developed OCR processing APIs using AWS S3, SignalR, and webhook-based async workflows",
        "Built version-controlled document system supporting edits and multi-session tracking",
        "Implemented secure API Gateway with API key management using Argon2",
        "Designed idempotent webhook patterns for reliable asynchronous processing",
        "Collaborated with cross-functional teams and conducted knowledge transfer sessions across US, Nepal, and Pakistan",
        "Prepared technical documentation including SRS, ERD, sequence diagrams, and architecture designs",
        "Owned backend development lifecycle from design to deployment",
        "Mentored Team Syntax Error (winners) and other teams during Hack4SafeFood Hackathon",
        "Guided participants during Hack4SafeFood Hackathon on development, architecture, pitching, and time management",
        "Contributed to World Food Safety Day initiatives through mentorship during Hack4SafeFood Hackathon"
      ],
      "skills": [
        "C#",
        ".NET Core",
        "ASP.NET Core",
        "IIS",
        "Microservices",
        "SQL Server",
        "PostgreSQL",
        "2FA",
        "Device Fingerprinting",
        "RBAC",
        "AWS S3",
        "SignalR",
        "Docker",
        "Mentoring",
        "Leadership",
        "Public Speaking",
        "Hackathons",
        "Pitching"
      ]
    },
    {
      "title": "Tutor & Final Year Project Supervisor",
      "company": "Islington College",
      "period": "Aug 2025 - Present",
      "description": [
        "Deliver lectures on application development using .NET Core Web API, MAUI, and Blazor",
        "Mentor final-year students throughout the project lifecycle ensuring timely delivery",
        "Provide code reviews and technical guidance for project improvements",
        "Evaluate student projects through assessments, documentation review, and viva examinations",
        "Conduct project defense sessions assessing technical depth and implementation quality"
      ],
      "skills": [
        "C#",
        ".NET Core",
        "MAUI",
        "Blazor",
        "Mentoring",
        "Code Review",
        "Public Speaking"
      ]
    }
  ],
  "education": {
    "degree": "BSc (Hons) Computing",
    "institution": "Itahari International College (London Metropolitan University)",
    "year": "2025"
  },
  "awards": [
    {
      "title": "Triple A Scholarship",
      "year": "2024-2026",
      "description": "Awarded for excellence in academics, attendance, and discipline"
    },
    {
      "title": "30-Second Pitch Challenge (3rd Place)",
      "year": "2024",
      "issuer": "DesignThinkers Academy, Thailand"
    },
    {
      "title": "International Exposure Program",
      "year": "2024",
      "description": "Selected for international academic and innovation program in Thailand"
    },
    {
      "title": "Hack4SafeFood Hackathon Mentor",
      "year": "2025",
      "description": "Mentored winning team (Team Syntax Error)"
    }
  ],
  "contact": {
    "email": "whcloud91@gmail.com",
    "github": "github.com/screamingsyntax",
    "linkedin": "linkedin.com/in/aaryanjha",
    "portfolio": "aaryanj.com.np"
  }

  }
  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(resumeJson, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6 }
    },
  };

  return (
    <section id="resume" className="section">
      <div className="container">
        <SectionHeading 
          title="Resume" 
          subtitle="My professional experience in JSON format" 
        />
        
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-8 max-w-4xl mx-auto"
        >
          <div className="card relative overflow-hidden">
            <div className="flex justify-between items-center p-4 bg-gray-100 dark:bg-dark-600 border-b border-gray-200 dark:border-dark-500">
              <h3 className="text-lg font-medium">resume.json</h3>
              <div className="flex gap-2">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-md bg-gray-200 dark:bg-dark-500 hover:bg-gray-300 dark:hover:bg-dark-400 transition-colors"
                  aria-label={isDarkTheme ? "Switch to light theme" : "Switch to dark theme"}
                >
                  {isDarkTheme ? "Light" : "Dark"}
                </button>
                <button
                  onClick={handleCopy}
                  className="p-2 rounded-md bg-primary-100 dark:bg-primary-900/30 hover:bg-primary-200 dark:hover:bg-primary-800/30 text-primary-800 dark:text-primary-200 transition-colors flex items-center gap-1"
                  aria-label="Copy resume JSON"
                >
                  {copied ? (
                    <>
                      <Check size={16} />
                      <span className="hidden sm:inline">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      <span className="hidden sm:inline">Copy JSON</span>
                    </>
                  )}
                </button>
              </div>
            </div>
            
            <div className="max-h-[500px] overflow-auto custom-scrollbar">
              <SyntaxHighlighter
                language="json"
                style={isDarkTheme ? vscDarkPlus : vs}
                showLineNumbers={true}
                wrapLines={true}
                customStyle={{
                  margin: 0,
                  borderRadius: 0,
                  fontSize: '14px',
                }}
              >
                {JSON.stringify(resumeJson, null, 2)}
              </SyntaxHighlighter>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
            >
              Download Full Resume (PDF)
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;