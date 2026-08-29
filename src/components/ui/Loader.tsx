import CharacterArt from './CharacterArt';

interface LoaderProps {
  done: boolean;
}

/**
 * Branding overlay shown over the already-mounted page. Purely CSS — no
 * animation library, no mount gate — so it always clears, even in a tab that
 * was backgrounded while it loaded.
 */
const Loader: React.FC<LoaderProps> = ({ done }) => (
  <div
    aria-hidden="true"
    className={`fixed inset-0 z-[100] grid place-items-center bg-paper transition-opacity duration-300 ease-snap ${
      done ? 'pointer-events-none opacity-0' : 'opacity-100'
    }`}
  >
    <div className="flex flex-col items-center gap-5">
      <CharacterArt
        name="intro"
        widths={[160, 240, 400]}
        width={400}
        height={400}
        sizes="160px"
        alt=""
        className="h-40 w-40 border-3 border-ink bg-lime object-contain shadow-hard"
        loading="eager"
      />

      <div className="border-3 border-ink bg-violet px-6 py-4 font-display text-lg text-on-violet shadow-hard">
        <span aria-hidden="true">{'</> '}</span>AARYAN JHA
      </div>

      <div className="w-64">
        <div className="label mb-2 flex items-center justify-between">
          <span>Loading portfolio</span>
          <span className="tabular">01 / 01</span>
        </div>
        <div className="h-5 border-3 border-ink bg-paper shadow-hard-xs">
          <div className="loader-progress h-full origin-left bg-lime" />
        </div>
      </div>
    </div>
  </div>
);

export default Loader;
