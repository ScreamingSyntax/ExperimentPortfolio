interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  /** Two-digit band number. Encodes reading order down the page. */
  num: string;
  /** Optional section character. It floats in the reserved top padding. */
  art?: React.ReactNode;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ title, subtitle, num, art }) => (
  <div
    className={`relative mb-8 flex flex-wrap items-baseline gap-x-4 gap-y-2 border-b-3 border-ink pb-3 ${
      art ? 'sm:pr-28 lg:pr-40' : ''
    }`}
  >
    <span className="label text-ink-soft tabular">{num}</span>
    <h2 className="text-xl">{title}</h2>
    {subtitle && <p className="measure text-2xs text-ink-soft">{subtitle}</p>}
    {art && (
      <div className="pointer-events-none absolute bottom-0 right-1 hidden w-24 sm:block lg:w-36" aria-hidden="true">
        {art}
      </div>
    )}
  </div>
);

export default SectionHeading;
