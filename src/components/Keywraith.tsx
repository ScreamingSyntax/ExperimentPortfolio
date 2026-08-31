import { ArrowUpRight, Keyboard } from 'lucide-react';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

const KEYWRAITH_URL = 'https://keywraith.com/';

const Keywraith: React.FC = () => (
  <section id="keywraith" className="container py-12 sm:py-16">
    <SectionHeading
      num="04"
      title="Featured Build"
      subtitle="A side project where the keyboard becomes part of the action"
    />

    <Reveal className="relative border-3 border-ink shadow-hard-lg">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <a
          href={KEYWRAITH_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Play Keywraith in a new tab"
          className="group relative min-h-72 overflow-hidden border-b-3 border-ink bg-ink lg:col-span-7 lg:min-h-0 lg:border-b-0 lg:border-r-3"
        >
          <img
            src="/keywraith/keywraith-scene-1024.webp"
            srcSet="/keywraith/keywraith-scene-640.webp 640w, /keywraith/keywraith-scene-1024.webp 1024w, /keywraith/keywraith-scene-1600.webp 1600w"
            sizes="(min-width: 1024px) 58vw, 100vw"
            width={1600}
            height={686}
            alt="Keywraith gameplay artwork featuring a spellcasting keyboard warrior"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-200 ease-snap group-hover:scale-[1.02]"
            loading="lazy"
            decoding="async"
          />
          <span className="absolute bottom-4 left-4 border-3 border-ink bg-lime px-3 py-2 label text-on-lime shadow-hard-xs">
            Play the build <ArrowUpRight className="ml-1 inline-block" size={14} strokeWidth={3} />
          </span>
        </a>

        <div className="no-grid relative flex flex-col items-start overflow-hidden bg-paper p-6 sm:p-8 lg:col-span-5">
          <div className="relative z-10 flex items-center gap-3">
            <img
              src="/keywraith/keywraith-mark-128.webp"
              srcSet="/keywraith/keywraith-mark-64.webp 64w, /keywraith/keywraith-mark-128.webp 128w"
              sizes="48px"
              width={128}
              height={128}
              alt="Keywraith icon"
              className="h-12 w-12 shrink-0 border-3 border-ink bg-ink"
              loading="lazy"
              decoding="async"
            />
            <span className="eyebrow">Independent browser game</span>
          </div>

          <img
            src="/keywraith/keywraith-logo-720.webp"
            srcSet="/keywraith/keywraith-logo-360.webp 360w, /keywraith/keywraith-logo-720.webp 720w"
            sizes="(min-width: 1024px) 28vw, 72vw"
            width={720}
            height={208}
            alt="Keywraith"
            className="relative z-10 mt-8 w-full max-w-sm"
            loading="lazy"
            decoding="async"
          />

          <p className="relative z-10 mt-6 measure text-2xs text-ink-soft">
            A keyboard-first action game: type fast, react under pressure, and turn every keypress into part of the fight.
          </p>

          <div className="relative z-10 mt-6 flex flex-wrap gap-2">
            <span className="tag tag-fill">Browser game</span>
            <span className="tag">Keyboard-first</span>
            <span className="tag">Side project</span>
          </div>

          <a
            href={KEYWRAITH_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary relative z-10 mt-8"
          >
            <Keyboard size={18} /> Play Keywraith <ArrowUpRight size={18} />
          </a>

          <img
            src="/keywraith/keywraith-maker-280.webp"
            srcSet="/keywraith/keywraith-maker-280.webp 280w, /keywraith/keywraith-maker-420.webp 420w"
            sizes="220px"
            width={420}
            height={630}
            alt="Aaryan playing Keywraith on a mechanical keyboard"
            className="pointer-events-none absolute -bottom-32 -right-20 z-0 hidden w-44 max-w-none opacity-95 lg:block"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </Reveal>
  </section>
);

export default Keywraith;
