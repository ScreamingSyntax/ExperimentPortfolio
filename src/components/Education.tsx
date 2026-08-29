import { GraduationCap, Trophy, Globe, Flame } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import CharacterArt from './ui/CharacterArt';

const education = [
  {
    degree: 'BSc (Hons) Computing',
    institution: 'London Metropolitan University',
    affiliate: 'Itahari International College',
    location: 'Nepal',
    period: '2022 — 2025',
    grade: 'Straight A',
    highlights: [
      'Triple A Scholarship recipient for all years',
      'One of 4 students selected for the International Exposure Program in Thailand',
      '3rd Place, 30-Second Pitch Challenge, DesignThinkers Academy Thailand',
    ],
  },
  {
    degree: 'High School Diploma, Computer Science',
    institution: 'Delhi Public School',
    affiliate: null,
    location: 'Dharan, Nepal',
    period: '2020 — 2022',
    grade: '',
    highlights: [
      'Barely passed. But passed.',
      'Used to fail at coding here. Now I do it for a living.',
    ],
  },
];

/** Merged in from the old About section — awards belong next to education. */
const awards = [
  {
    icon: GraduationCap,
    title: 'Triple A Scholarship',
    period: 'All academic years',
    description: 'Awarded for academics, attendance, and discipline across the full Bachelor\'s degree',
  },
  {
    icon: Trophy,
    title: '3rd Place, Pitch Challenge',
    period: '2024',
    description: 'Competed against international participants at DesignThinkers Academy, Thailand',
  },
  {
    icon: Globe,
    title: 'International Exposure Program',
    period: '2024 · Thailand',
    description: 'Selected as 1 of 4 students from the college for an academic and innovation program',
  },
  {
    icon: Flame,
    title: 'Hack4SafeFood Mentor',
    period: '2025',
    description: 'Mentored Team Syntax Error to 1st place on architecture, pitching, and time management',
  },
];

const Education: React.FC = () => {

  return (
    <section id="education" className="container py-12 sm:py-16">
      <SectionHeading
        num="04"
        title="Education & Awards"
        subtitle="Where I studied, and what I picked up"
        art={
          <CharacterArt
            name="awards"
            widths={[160, 240, 400]}
            width={400}
            height={400}
            sizes="(min-width: 1024px) 144px, 96px"
            alt=""
            className="h-auto w-full object-contain object-bottom"
            loading="lazy"
          />
        }
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Education */}
        <div className="flex flex-col gap-6">
          {education.map((edu, i) => (
            <Reveal
              key={edu.degree}
              index={i}
              className={`no-grid relative border-3 border-ink bg-paper shadow-hard ${
                i === 1 ? 'mb-20 sm:mb-24' : ''
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3 border-b-3 border-ink bg-cream p-5">
                <div>
                  <h3 className="text-lg">{edu.degree}</h3>
                  <p className="mt-1.5 text-2xs">{edu.institution}</p>
                  {edu.affiliate && <p className="eyebrow mt-1">via {edu.affiliate}</p>}
                </div>
                <span className="tag tabular shrink-0">{edu.period}</span>
              </div>

              <div className={`flex flex-col gap-3 p-5 ${i === 1 ? 'pb-20 sm:pb-24' : ''}`}>
                <div className="flex flex-wrap items-center gap-2">
                  {edu.grade && <span className="tag tag-fill">{edu.grade}</span>}
                  <span className="eyebrow">{edu.location}</span>
                </div>
                {edu.highlights.length > 0 && (
                  <ul className="flex flex-col gap-2">
                    {edu.highlights.map((h) => (
                      <li key={h} className="flex gap-2.5 text-2xs text-ink-soft">
                        <span className="mt-[0.45em] h-2 w-2 shrink-0 bg-pink" aria-hidden="true" />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {i === 1 && (
                <div
                  className="pointer-events-none absolute bottom-0 right-3 w-44 translate-y-1/2 sm:right-5 sm:w-60"
                  aria-hidden="true"
                >
                  <CharacterArt
                    name="sleeping"
                    widths={[160, 240, 400]}
                    width={400}
                    height={300}
                    sizes="(min-width: 640px) 240px, 176px"
                    alt=""
                    className="h-auto w-full object-contain object-bottom"
                    loading="lazy"
                  />
                </div>
              )}
            </Reveal>
          ))}
        </div>

        {/* Awards */}
        <div className="grid gap-6 sm:grid-cols-2">
          {awards.map(({ icon: Icon, title, period, description }, i) => (
            <Reveal
              key={title}
              index={i}
              className="cell-flat flex flex-col gap-2.5"
            >
              <Icon size={22} strokeWidth={2.5} className="text-violet" />
              <h3 className="text-base">{title}</h3>
              <p className="eyebrow tabular">{period}</p>
              <p className="text-2xs text-ink-soft">{description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
