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
      "ASP.NET Web API",
      "ASP.NET MVC",
      "Entity Framework (EF) Core",
      "Flutter",
      "PostgreSQL",
      "SQL Server",
      "LINQ",
      "Clean Architecture"
    ],
    "experience": [
      {
        title: "Software Engineer",
        company: "Vertex Special Technologies",
        period: "Feb 2025 - Present",
        description: [
          "Implemented payment module in accounting system",
          "Built advanced Excel import/export for efficient data handling",
          "Worked on implementing a multi-tenant architecture using .NET Core",
          "Integrated two-factor authentication (2FA) using an authenticator app and email in .NET Core",
          "Added trusted device fingerprinting to skip 2FA for known devices",
          "Built Node.js microservice (Docker + LibreOffice) for Word-to-PDF conversion, integrated with multiple .NET projects",
        ],
        skills: ["C#", ".NET Core", "Docker", "Node.js", "LibreOffice", "Microservices", "2FA", "SQL Server","PostgreSQL"],
      },
      {
        title: "Mentor - Hack4SafeFood Hackathon",
        company: "Vertex Special Technologies",
        period: "Jun 2025",
        description: [
          "Mentored Team Syntax Error, winners of #Hack4SafeFood Hackathon",
          "Guided Team Pascal College on project development",
          "Advised on leadership, pitching, and time management",
          "Supported World Food Safety Day event for tech-driven food safety solutions",
        ],
        skills: ["Mentoring", "Leadership", "Public Speaking", "Hackathons", "Pitching"],
      },
      {
        title: "Software Engineer Trainee",
        company: "Vertex Special Technologies",
        period: "Jul 2024 - Feb 2025",
        description: [
          "Developed enterprise applications using .NET Core",
          "Integrated IoT punch-in/out for real-time attendance tracking",
          "Led cross-country knowledge transfer sessions (US, Nepal, Pakistan)",
          "Collaborated with BAs, developers, QA, and frontend teams for successful delivery",
          "Worked on Clean Architecture principles and implemented in real world projects",
          "Deployed .NET Core projects to IIS and maintained different servers for QA and UAT",
        ],
        skills: ["C#", ".NET Core", "MVC","IIS","Pitching", "SQL Server","PostgreSQL"],
      },
      {
        title: "Full Stack Developer & IoT Engineer",
        company: "ING Skill Academy",
        period: "2023",
        description: [
          "Developed multiple college web applications",
          "Created initial designs in Figma and implemented them",
          "Designed and implemented databases",
          'Led IoT projects including "Remote Control Smart Dustbin"',
          "Demonstrated projects at 12 locations across Nepal",
        ],
        skills: ["IOT", "Leadership", "Pitching", "Project Lead", "React","Django"],
  
      },
    ],
    "education": {
      "degree": "BSc in Computer Science",
      "institution": "Itahari International College",
      "year": "2023"
    },
    "awards": [
      {
        "title": "Triple A Scholarship",
        "year": "2023",
        "description": "Top 10% of students in faculty"
      },
      {
        "title": "30-second Pitch Challenge (3rd Place)",
        "year": "2024",
        "issuer": "Thammasat University, Thailand"
      }
    ],
    "contact": {
      "email": "whcloud91@gmail.com",
      "github": "github.com/ScreamingSyntax",
      "linkedin": "linkedin.com/in/aaryanjha"
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