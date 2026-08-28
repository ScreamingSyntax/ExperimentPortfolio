interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  /** Two-digit band number. Encodes reading order down the page. */
  num: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ title, subtitle, num }) => (
  <div className="mb-8 flex flex-wrap items-baseline gap-x-4 gap-y-2 border-b-3 border-ink pb-3">
    <span className="label text-ink-soft tabular">{num}</span>
    <h2 className="text-xl">{title}</h2>
    {subtitle && <p className="measure text-2xs text-ink-soft">{subtitle}</p>}
  </div>
);

export default SectionHeading;
