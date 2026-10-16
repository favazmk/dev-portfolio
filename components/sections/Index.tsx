import Link from "next/link";
import { site, systemsProjects, craftProjects, clients } from "@/config/site";
import Reveal from "@/components/Reveal";

const COUNTS: Record<string, string> = {
  "#clients": `${clients.length}`,
  "#systems": `${systemsProjects.length}`,
  "#craft": `${craftProjects.length}`,
};

/**
 * Contents. A long portfolio is only "organised" if you can see its shape
 * before you start scrolling, so the whole page is declared up front as a
 * numbered list you can jump from.
 */
export default function Index() {
  return (
    <section id="index" className="shell scroll-mt-14 py-20 sm:py-28">
      <Reveal>
        <div className="rule-signal flex items-baseline justify-between gap-6 pt-5">
          <p className="label text-muted-auto">Contents</p>
          <p className="label numeral text-muted-auto">
            {site.index.length} sections
          </p>
        </div>
      </Reveal>

      <ul className="mt-10 sm:mt-14">
        {site.index.map((item, i) => (
          <Reveal key={item.href} as="li" delay={i * 45}>
            <Link
              href={item.href}
              className="work-row group rule flex items-baseline gap-5 py-5 sm:gap-8 sm:py-6"
            >
              <span className="label numeral text-signal w-8 shrink-0">
                {item.n}
              </span>
              <span className="display text-[clamp(1.35rem,4.2vw,2.5rem)]">
                {item.label}
              </span>
              <span className="label numeral text-muted-auto ml-auto shrink-0">
                {COUNTS[item.href] ?? ""}
              </span>
              <span className="arrow label text-muted-auto shrink-0" aria-hidden="true">
                ↓
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
