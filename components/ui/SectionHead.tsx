import Reveal from "@/components/Reveal";

/**
 * The opening of every section: a hairline capped in red, the section number
 * and label on one line, then the title. Repeated verbatim throughout so the
 * page reads as chapters of one manual rather than a stack of designs.
 */
export default function SectionHead({
  n,
  label,
  title,
  note,
  count,
}: {
  /** Two-digit section number, e.g. "03" */
  n: string;
  label: string;
  title: string;
  note?: string;
  /** Optional right-hand counter, e.g. "07 projects" */
  count?: string;
}) {
  return (
    <Reveal>
      <div className="rule-signal pt-5">
        <div className="flex items-baseline justify-between gap-6">
          <p className="label text-muted-auto">
            <span className="numeral">{n}</span>
            <span className="mx-2 opacity-40">/</span>
            {label}
          </p>
          {count ? (
            <p className="label numeral text-muted-auto">{count}</p>
          ) : null}
        </div>

        <h2 className="display mt-7 text-[clamp(2.1rem,6.5vw,4.5rem)]">
          {title}
        </h2>

        {note ? (
          <p className="text-muted-auto mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">
            {note}
          </p>
        ) : null}
      </div>
    </Reveal>
  );
}
