import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeading from './ui/SectionHeading';
import { Code, Database, Server, Smartphone } from 'lucide-react';

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    },
  };

  return (
    <section id="about" className="section bg-gray-50 dark:bg-dark-800">
      <div className="container">
        <SectionHeading title="About Me" subtitle="Get to know me better" />
        
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-12"
        >
          <motion.div variants={itemVariants} className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              I am a passionate Software Engineer focused on delivering
              high-quality user experiences, with strong expertise in .NET development
              and mobile app development using Flutter and other frameworks.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              {
                icon: <Server className="w-8 h-8 text-primary-500" />,
                title: "Backend Development",
                description: "Building robust servers and APIs with ASP.NET Core, Web API, MVC, and Entity Framework"
              },
              {
                icon: <Database className="w-8 h-8 text-primary-500" />,
                title: "Database Design",
                description: "Creating efficient and scalable database systems with PostgreSQL and SQL Server"
              },
              {
                icon: <Code className="w-8 h-8 text-primary-500" />,
                title: "IOT Systems",
                description: "Integrating smart attendance systems and other IoT solutions for businesses"
              },
              {
                icon: <Smartphone className="w-8 h-8 text-primary-500" />,
                title: "Mobile Development",
                description: "Crafting beautiful and performant mobile applications with Flutter and Firebase"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-dark-700 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-full">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;