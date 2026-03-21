import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionHeading from "./ui/SectionHeading";
import { Briefcase, Laptop } from "lucide-react";

const Experience: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const experiences = [
 {
    title: "Software Engineer",
    company: "Vertex Special Technologies",
    period: "Jul 2024 - Present",
    description: [
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
      "Designed idempotent webhook patterns for reliable async processing",
      "Collaborated with cross-functional teams and led international knowledge transfer sessions (US, Nepal, Pakistan)",
      "Prepared technical documentation (SRS, ERD, sequence diagrams, architecture)",
      "Owned backend development lifecycle from design to deployment",
      "Mentored Team Syntax Error (winners) and other teams during Hack4SafeFood Hackathon",
      "Guided participants during Hack4SafeFood Hackathon on project development, technical decisions, pitching, and time management",
      "Contributed to World Food Safety Day initiative through mentorship and tech support during Hack4SafeFood Hackathon"
    ],
    skills: [
      "C#", ".NET Core", "ASP.NET Core", "IIS",
      "Microservices", "SQL Server", "PostgreSQL",
      "2FA", "Device Fingerprinting", "RBAC",
      "AWS S3", "SignalR", "Docker",
      "Mentoring", "Leadership", "Public Speaking",
      "Hackathons", "Pitching"
    ],
    icon: <Briefcase className="w-6 h-6" />,
  },
   {
    title: "Tutor & Final Year Project Supervisor",
    company: "Islington College",
    period: "Aug 2025 - Present",
    description: [
      "Deliver lectures on application development using .NET Core Web API, MAUI, and Blazor",
      "Mentor final-year students throughout the project lifecycle",
      "Provide code reviews and technical guidance to improve project quality",
      "Evaluate student projects through assessments, documentation reviews, and viva",
      "Conduct project defense sessions assessing technical depth and implementation"
    ],
    skills: [
      "C#", ".NET Core", "MAUI", "Blazor",
      "Mentoring", "Code Review", "Public Speaking"
    ],
    icon: <Briefcase className="w-6 h-6" />,
  },
    {
      title: "Full Stack Developer & IoT Engineer",
      company: "ING Skill Academy",
      period: "2023",
      description: [
        "Developed and delivered  multiple college web applications",
        'Led IoT projects including "Remote Control Smart Dustbin"',
        "Showcased projects at 12 nationwide Futurama events, reaching and engaging 46,000+ students."
      ],
      skills: ["IOT", "Leadership", "Pitching", "Project Lead", "React","Django"],

      icon: <Laptop className="w-6 h-6" />,
    },
  ];
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="experience" className="section bg-gray-50 dark:bg-dark-800">
      <div className="container">
        <SectionHeading
          title="Professional Journey"
          subtitle="My work experience"
        />

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-16 max-w-4xl mx-auto relative"
        >
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 to-secondary-500 transform md:-translate-x-1/2" />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`flex flex-col md:flex-row mb-16 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Content */}
              <div
                className={`md:w-1/2 px-4 ${
                  index % 2 === 0
                    ? "md:pr-12 md:text-right"
                    : "md:pl-12 md:text-left"
                } text-center`}
              >
                <h3 className="text-2xl font-bold mb-1 text-gray-800 dark:text-gray-100">
                  {exp.title}
                </h3>
                <h4 className="text-lg font-medium mb-4 text-primary-600 dark:text-primary-400">
                  {exp.company}
                </h4>
                <span className="inline-block px-3 py-1 mb-4 text-sm bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 rounded-full">
                  {exp.period}
                </span>

                <ul
                  className={`space-y-2 text-gray-600 dark:text-gray-300 ${
                    index % 2 === 0 ? "md:text-right" : ""
                  }`}
                >
                  {exp.description.map((item, i) => (
                    <li
                      key={i}
                      className={`flex items-start gap-2 ${
                        index % 2 === 0
                          ? "justify-end md:pl-4"
                          : "justify-start md:pr-4"
                      }`}
                    >
                      <span className="w-1 h-1 mt-2 rounded-full bg-primary-500 flex-shrink-0" />
                      <span className="max-w-prose text-left">{item}</span>
                    </li>
                  ))}
                </ul>
                <div
  className={`mt-4 inline-block px-4 py-3 bg-white dark:bg-dark-700 rounded-lg shadow-md border border-gray-200 dark:border-gray-600 ${
    index % 2 === 0 ? "md:ml-auto" : "md:mr-auto"
  }`}
>
  <h5 className="text-sm font-semibold text-primary-600 dark:text-primary-400 mb-2">
    Skills
  </h5>
  <div className="flex flex-wrap gap-2">
    {exp.skills.map((skill, i) => (
      <span
        key={i}
        className="px-3 py-1 text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 rounded-full"
      >
        {skill}
      </span>
    ))}
  </div>
              </div>
              </div>
              {/* Timeline dot and icon */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 mt-2">
                <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white">
                  {exp.icon}
                </div>
              </div>

              {/* Spacer for layout */}
              <div className="md:w-1/2"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
