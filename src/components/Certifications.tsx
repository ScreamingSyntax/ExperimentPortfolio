import { ArrowUpRight, BadgeCheck } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import CharacterArt from './ui/CharacterArt';

const VERIFY = 'https://www.coursera.org/account/accomplishments/verify/';

/**
 * The five Microsoft courses are one track — presented as a track with
 * modules rather than five loose cards, because the sequence is the point.
 * Each links out to Coursera, which is where the dates live.
 */
const track = {
  issuer: 'Microsoft',
  title: 'Back-End Developer',
  modules: [
    { name: 'Back-End Development with .NET', code: '50JA1BVEV1KQ' },
    { name: 'Introduction to Programming With C#', code: 'QX1NW2EYDQJE' },
    { name: 'Database Integration and Management', code: '0T2T2BNRIUU2' },
    { name: 'Data Structures and Algorithms', code: 'BPF1M6P9TUML' },
    { name: 'Foundations of Coding Back-End', code: 'TPUXCSUG0EI4' },
  ],
};

const standalone = [
  {
    name: 'Design Patterns',
    issuer: 'University of Alberta',
    code: 'SVKZVN55Y84D',
  },
];

const Certifications: React.FC = () => {

  return (
    <section id="certifications" className="container py-12 sm:py-16">
      <SectionHeading
        num="02"
        title="Certifications"
        subtitle="All six are verifiable on Coursera"
        art={
          <CharacterArt
            name="achievement"
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
            <span className="tag tabular">{track.modules.length} courses</span>
          </div>

          <ul className="no-grid bg-paper">
            {track.modules.map((module, i) => (
              <li
                key={module.code}
                className={`flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:gap-4 sm:px-6 ${
                  i < track.modules.length - 1 ? 'border-b-2 border-grid' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <BadgeCheck
                    size={18}
                    strokeWidth={2.5}
                    className="mt-[0.15em] shrink-0 text-violet"
                  />
                  <span className="text-2xs">{module.name}</span>
                </div>

                {/* Date and verify travel together: stacked under the course
                    name on narrow screens, pushed to the right on wide ones. */}
                <div className="flex items-center gap-3 pl-[30px] sm:ml-auto sm:shrink-0 sm:pl-0">
                  <a
                    href={`${VERIFY}${module.code}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tag inline-flex items-center gap-1 hover:bg-ink hover:text-paper"
                  >
                    Verify <ArrowUpRight size={11} strokeWidth={3} />
                  </a>
                </div>
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
              <div className="flex-1" />
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
