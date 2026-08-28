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
    <div className="flex flex-col items-center gap-6">
      <div className="border-3 border-ink bg-violet px-6 py-4 font-display text-lg text-on-violet shadow-hard">
        <span aria-hidden="true">{'</> '}</span>AARYAN JHA
      </div>

      <div className="h-4 w-56 border-3 border-ink bg-paper">
        <div
          className={`h-full origin-left bg-lime transition-transform duration-1000 ease-linear ${
            done ? 'scale-x-100' : 'scale-x-0'
          }`}
        />
      </div>
    </div>
  </div>
);

export default Loader;
