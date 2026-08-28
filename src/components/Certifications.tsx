import { ArrowUpRight, BadgeCheck } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';

const VERIFY = 'https://www.coursera.org/account/accomplishments/verify/';

/**
 * The five Microsoft courses are one track, completed across ten days in
 * August 2026 — presented as a track with modules rather than five loose
 * cards, because the sequence is the point.
 */
const track = {
  issuer: 'Microsoft',
  title: 'Back-End Developer',
  period: 'Aug 2026',
  modules: [
    { name: 'Back-End Development with .NET', date: '26 Aug 2026', code: '50JA1BVEV1KQ' },
    { name: 'Introduction to Programming With C#', date: '20 Aug 2026', code: 'QX1NW2EYDQJE' },
    { name: 'Database Integration and Management', date: '19 Aug 2026', code: '0T2T2BNRIUU2' },
    { name: 'Data Structures and Algorithms', date: '18 Aug 2026', code: 'BPF1M6P9TUML' },
    { name: 'Foundations of Coding Back-End', date: '17 Aug 2026', code: 'TPUXCSUG0EI4' },
  ],
};

const standalone = [
  {
    name: 'Design Patterns',
    issuer: 'University of Alberta',
    date: '22 May 2026',
    code: 'SVKZVN55Y84D',
  },
];

const Certifications: React.FC = () => {

  return (
    <section id="certifications" className="container py-12 sm:py-16">
      <SectionHeading
        num="02"
        title="Certifications"
        subtitle="Six credentials, all verifiable on Coursera"
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* The track */}
        <Reveal
          className="border-3 border-ink shadow-hard lg:col-span-2"
        >
          <div className="no-grid flex flex-wrap items-baseline justify-between gap-3 border-b-3 border-ink bg-lime p-5 text-on-lime sm:p-6">
            <div>
              <p className="eyebrow text-on-lime opacity-70">Track · {track.issuer}</p>
              <h3 className="mt-1 text-xl">{track.title}</h3>
            </div>
            <span className="tag tabular">{track.modules.length} courses · {track.period}</span>
          </div>

          <ul className="no-grid bg-paper">
            {track.modules.map((module, i) => (
              <li
                key={module.code}
                className={`flex flex-wrap items-center gap-x-4 gap-y-1 p-4 sm:px-6 ${
                  i < track.modules.length - 1 ? 'border-b-2 border-grid' : ''
                }`}
              >
                <BadgeCheck size={18} strokeWidth={2.5} className="shrink-0 text-violet" />
                <span className="flex-1 text-2xs">{module.name}</span>
                <span className="eyebrow tabular shrink-0">{module.date}</span>
                <a
                  href={`${VERIFY}${module.code}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tag inline-flex shrink-0 items-center gap-1 hover:bg-ink hover:text-paper"
                >
                  Verify <ArrowUpRight size={11} strokeWidth={3} />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Standalone */}
        <div className="flex flex-col gap-6">
          {standalone.map((cert, i) => (
            <Reveal
              key={cert.code}
              index={i}
              className="cell flex flex-1 flex-col gap-3"
            >
              <p className="eyebrow">{cert.issuer}</p>
              <h3 className="text-lg">{cert.name}</h3>
              <p className="eyebrow tabular flex-1">Completed {cert.date}</p>
              <a
                href={`${VERIFY}${cert.code}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost self-start"
              >
                Verify <ArrowUpRight size={16} />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
