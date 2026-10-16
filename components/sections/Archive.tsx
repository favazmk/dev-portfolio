import type { ArchiveItem } from "@/lib/github";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/ui/SectionHead";
import LogoMark from "@/components/ui/LogoMark";

/**
 * Everything else, as a table.
 *
 * These don't carry a case study, so they get the densest treatment on the
 * page: name, what it is, what it's in, and the two links worth having.
 */
export default function Archive({ items }: { items: ArchiveItem[] }) {
  return (
    <section id="archive" className="shell scroll-mt-14 py-20 sm:py-28">
      <SectionHead
        n="06"
        label="Archive"
        title="Also shipped."
        note="Smaller builds, client sites and experiments that don't carry a full case study."
        count={`${String(items.length).padStart(2, "0")} repos`}
      />

      <ul className="mt-12 sm:mt-16">
        {items.map((item, i) => (
          <Reveal key={item.repo} as="li" delay={Math.min(i, 6) * 40}>
            <div className="rule grid gap-4 py-6 sm:grid-cols-12 sm:items-baseline sm:gap-6">
              <div className="flex items-center gap-4 sm:col-span-4">
                <span className="label numeral text-muted-auto">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.logo ? (
                  /* Explicit width: LogoMark fills its box, so a flex item
                     sized to content would collapse to nothing. */
                  <span className="block h-6 w-[104px] shrink-0">
                    <LogoMark src={item.logo} name={item.title} />
                  </span>
                ) : (
                  <h3 className="text-base font-medium">{item.title}</h3>
                )}
              </div>

              <p className="text-muted-auto text-sm leading-relaxed sm:col-span-5">
                {item.logo ? (
                  <span className="mb-1 block font-medium text-ink">
                    {item.title}
                  </span>
                ) : null}
                {item.note}
              </p>

              <p className="label text-muted-auto sm:col-span-1">
                {item.language}
              </p>

              <div className="flex gap-5 sm:col-span-2 sm:justify-end">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="label link-ul text-muted-auto"
                >
                  Code
                </a>
                {item.live ? (
                  <a
                    href={item.live}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="label link-ul"
                  >
                    Live ↗
                  </a>
                ) : null}
              </div>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
