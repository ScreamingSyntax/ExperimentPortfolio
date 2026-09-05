import { ArrowUpRight, Award, BadgeCheck } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import CharacterArt from './ui/CharacterArt';

const VERIFY = 'https://www.coursera.org/account/accomplishments/verify/';
const PROFESSIONAL_CERTIFICATE =
  'https://www.coursera.org/account/accomplishments/professional-cert/GPVR8M8ZHUPE';
const CREDLY_BADGE = 'https://www.credly.com/badges/ee7aaac8-b541-4f59-a1be-8039258db8df/public_url';

const courses = [
  { name: 'Foundations of Coding Back-End', code: 'TPUXCSUG0EI4' },
  { name: 'Introduction to Programming With C#', code: 'QX1NW2EYDQJE' },
  { name: 'Back-End Development with .NET', code: '50JA1BVEV1KQ' },
  { name: 'Database Integration and Management', code: '0T2T2BNRIUU2' },
  { name: 'Security and Authentication', code: 'N8A70YGCF96C' },
  { name: 'Performance Optimization and Scalability', code: 'P64NMP1O3QFD' },
  { name: 'Data Structures and Algorithms', code: 'BPF1M6P9TUML' },
  { name: 'Deployment and DevOps', code: '25TRXIS3UMAW' },
];

const Certifications: React.FC = () => (
  <section id="certifications" className="container py-12 sm:py-16">
    <SectionHeading
      num="02"
      title="Certifications"
      subtitle="One professional credential, backed by eight completed Microsoft courses"
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

    <Reveal className="border-3 border-ink shadow-hard-lg">
      <div className="no-grid flex flex-wrap items-center justify-between gap-3 border-b-3 border-ink bg-ink px-5 py-3 text-paper sm:px-6">
        <span className="label">Flagship credential · Microsoft</span>
        <span className="tag border-lime text-lime">Professional Certificate</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        <article className="no-grid flex flex-col border-b-3 border-ink bg-violet p-6 text-on-violet sm:p-8 lg:col-span-5 lg:border-b-0 lg:border-r-3">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center border-3 border-current bg-lime text-on-lime shadow-hard-xs">
              <Award size={26} strokeWidth={2.5} aria-hidden="true" />
            </span>
            <p className="label text-on-violet opacity-80">Professional Certificate</p>
          </div>

          <h3 className="mt-8 text-2xl">Microsoft Back-End Developer</h3>
          <p className="mt-4 max-w-md text-2xs text-on-violet opacity-85">
            A complete back-end pathway covering C#, .NET, databases, security, scalability, algorithms, and deployment.
          </p>

          <div className="mt-8 border-3 border-current bg-paper p-4 text-ink">
            <div className="flex items-center justify-between gap-4">
              <span className="label">Course progress</span>
              <span className="label tabular">8 / 8</span>
            </div>
            <div className="mt-3 grid grid-cols-8 gap-1" aria-label="All eight courses completed">
              {courses.map((course) => (
                <span key={course.code} className="h-3 border-2 border-ink bg-lime" aria-hidden="true" />
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={PROFESSIONAL_CERTIFICATE}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Verify credential <ArrowUpRight size={17} />
            </a>
            <a
              href={CREDLY_BADGE}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              Credly badge <BadgeCheck size={17} />
            </a>
          </div>
        </article>

        <div className="no-grid bg-paper lg:col-span-7">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b-3 border-ink bg-cream px-5 py-4 sm:px-6">
            <div>
              <p className="eyebrow">Course certificates</p>
              <h3 className="mt-1 text-lg">The completed pathway</h3>
            </div>
            <span className="tag tag-fill">All verified</span>
          </div>

          <ol className="grid grid-cols-1 sm:grid-cols-2">
            {courses.map((course, index) => (
              <li
                key={course.code}
                className={`border-grid sm:[&:nth-child(odd)]:border-r-2 ${
                  index < courses.length - 2 ? 'border-b-2' : index === courses.length - 2 ? 'border-b-2 sm:border-b-0' : ''
                }`}
              >
                <a
                  href={`${VERIFY}${course.code}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full min-h-28 gap-3 p-4 transition-colors duration-100 hover:bg-lime sm:p-5"
                >
                  <span className="label tabular text-violet">{String(index + 1).padStart(2, '0')}</span>
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="text-2xs font-bold leading-snug">{course.name}</span>
                    <span className="mt-auto flex items-center justify-end pt-3 text-ink-soft group-hover:text-ink">
                      <ArrowUpRight size={13} strokeWidth={3} aria-hidden="true" />
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Reveal>

    <Reveal className="mt-6 border-3 border-ink bg-paper shadow-hard" index={1}>
      <div className="no-grid flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-start gap-3">
          <BadgeCheck className="mt-0.5 shrink-0 text-violet" size={22} strokeWidth={2.5} aria-hidden="true" />
          <div>
            <p className="eyebrow">Additional credential · University of Alberta</p>
            <h3 className="mt-1 text-lg">Design Patterns</h3>
          </div>
        </div>
        <a
          href={`${VERIFY}SVKZVN55Y84D`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost self-start sm:self-auto"
        >
          Verify <ArrowUpRight size={16} />
        </a>
      </div>
    </Reveal>
  </section>
);

export default Certifications;
