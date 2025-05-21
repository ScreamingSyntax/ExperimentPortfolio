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

  const resumeJson = {
    "name": "Aaryan Jha",
    "title": "Software Engineer",
    "contact": {
      "email": "whcloud91@email.com",
      "github": "https://github.com/ScreamingSyntax",
      "linkedin": "https://www.linkedin.com/in/aaryanjha/",
      "location": "Nepal",
    },
    "summary": "Software Engineer passionate about delivering top-notch user experiences, with strong expertise in .NET development and mobile app development using various frameworks.",
    "skills": {
      "languages": ["C#", "Dart", "JavaScript", "HTML/CSS", "SQL"],
      "frameworks": ["ASP.NET Core", "Entity Framework", "Flutter", "MVC"],
      "databases": ["PostgreSQL", "SQL Server", "Firebase"],
      "tools": ["Visual Studio", "VS Code", "Git", "Docker", "Azure DevOps"],
      "other": ["REST APIs", "Clean Architecture", "Multi-tenant systems", "IoT Integration"]
    },
    "experience": [
      {
        "position": ".NET Developer",
        "company": "Vertex Special Technologies",
        "period": "2024 - Present",
        "highlights": [
          "Integrated IoT-based employee punch-in/out system with .NET Core backend",
          "Implemented payment system in accounting software",
          "Conducted knowledge transfer sessions across international teams",
          "Worked on multi-tenant architecture and Clean Architecture",
          "Deployed .NET Core projects to IIS"
        ]
      },
      {
        "position": "Full Stack Developer & IoT Engineer",
        "company": "ING Skill Academy",
        "period": "2023",
        "highlights": [
          "Developed multiple college web applications",
          "Created initial designs in Figma and implemented them",
          "Designed and implemented databases",
          "Led IoT projects including Remote Control Smart Dustbin",
          "Demonstrated projects at 12 locations across Nepal"
        ]
      }
    ],
    "education": {
      "degree": "Bachelor of Engineering",
      "field": "Computer Science",
      "institution": "Tribhuvan University",
      "year": "2021-2025"
    },
    "languages": [
      {"name": "English", "level": "Professional"},
      {"name": "Nepali", "level": "Native"}
    ],
    "interests": ["IoT Development", "Mobile App Development", "Open Source", "Technical Writing"]
  };

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