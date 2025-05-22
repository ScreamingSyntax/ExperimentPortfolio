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
        "company": "Vertex Special Technologies",
        "position": ".NET Developer",
        "timeline": "2024 - Present",
        "responsibilities": [
          "Integrated IoT-based employee punch-in/out system",
          "Implemented payment gateway for accounting software",
          "Conducted international knowledge transfer sessions",
          "Designed multi-tenant architecture",
          "Deployed .NET Core projects to IIS"
        ],
        "technologies": [
          ".NET Core",
          "PostgreSQL",
          "IIS",
          "Azure"
        ]
      },
      {
        "company": "ING Skill Academy",
        "position": "Full Stack Developer & IoT Engineer",
        "timeline": "2023",
        "responsibilities": [
          "Developed college web applications",
          "Created UI/UX designs in Figma",
          "Implemented database designs",
          "Led IoT project development",
          "Demonstrated projects across Nepal"
        ],
        "technologies": [
          "Flutter",
          "Firebase",
          "Arduino",
          "Figma"
        ]
      }
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
      "email": "whcloud91@email.com",
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
              href="/files/resume.pdf"
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