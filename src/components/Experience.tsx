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
      title: ".NET Developer",
      company: "Vertex Special Technologies",
      period: "2024 - Present",
      description: [
        "Integrated IoT-based employee punch-in/out system with .NET Core backend",
        "Implemented payment system in accounting software",
        "Conducted knowledge transfer sessions across international teams",
        "Worked on multi-tenant architecture and Clean Architecture & Deployed .NET Core projects to IIS",
      ],
      icon: <Briefcase className="w-6 h-6" />,
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
