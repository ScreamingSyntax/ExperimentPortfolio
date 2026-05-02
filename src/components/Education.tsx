import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeading from './ui/SectionHeading';
import { GraduationCap, MapPin, Calendar, Award, Users } from 'lucide-react';

const education = [
  {
    degree: "Bachelor's Degree, Information Technology",
    institution: 'London Metropolitan University',
    affiliate: 'Itahari International College',
    location: 'Nepal',
    period: '2022 — 2024',
    grade: 'First Class Honors (Grade A)',
    activities: 'Member of Coders and Research Club',
    highlights: [
      'Triple A Scholarship recipient for all years',
      'Selected for International Exposure Program in Thailand (1 of 4 students)',
      '3rd Place at 30-Second Pitch Challenge, DesignThinkers Academy Thailand',
    ],
    color: 'from-primary-500 to-primary-600',
  },
  {
    degree: 'High School Diploma, Computer Science',
    institution: 'Delhi Public School',
    affiliate: null,
    location: 'Dharan, Nepal',
    period: 'Apr 2020 — Apr 2022',
    grade: '',
    activities: null,
    highlights: [],
    color: 'from-secondary-500 to-secondary-600',
  },
];

const Education: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="education" className="section">
      <div className="container">
        <SectionHeading
          title="Education"
          subtitle="The academic foundation behind the engineering"
          label="Learning"
        />

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto mt-12 space-y-6"
        >
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative bg-white dark:bg-dark-700 rounded-2xl border border-gray-100 dark:border-dark-600 hover:border-primary-200 dark:hover:border-primary-700 transition-all duration-500 overflow-hidden hover:shadow-xl"
            >
              <div className={`h-1 bg-gradient-to-r ${edu.color}`} />

              <div className="p-6 md:p-8">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <div className={`p-1.5 rounded-lg bg-gradient-to-r ${edu.color} text-white`}>
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold font-display text-gray-800 dark:text-white">
                        {edu.institution}
                      </h3>
                    </div>
                    {edu.affiliate && (
                      <p className="text-sm text-gray-500 dark:text-dark-300 ml-10">
                        via {edu.affiliate}
                      </p>
                    )}
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-300 rounded-full">
                    <Calendar size={11} /> {edu.period}
                  </span>
                </div>

                <p className="text-base font-medium text-gray-700 dark:text-dark-100 mb-3 ml-10">
                  {edu.degree}
                </p>

                <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-500 dark:text-dark-300 mb-4 ml-10">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={13} /> {edu.location}
                  </span>
                  {edu.grade && (
                    <span className="flex items-center gap-1.5">
                      <Award size={13} className="text-yellow-500" />
                      <span className="font-medium text-gray-700 dark:text-dark-100">{edu.grade}</span>
                    </span>
                  )}
                  {edu.activities && (
                    <span className="flex items-center gap-1.5">
                      <Users size={13} /> {edu.activities}
                    </span>
                  )}
                </div>

                {edu.highlights.length > 0 && (
                  <ul className="space-y-2 ml-10">
                    {edu.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-dark-200">
                        <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 bg-gradient-to-r ${edu.color}`} />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
