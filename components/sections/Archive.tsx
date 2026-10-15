import Image from "next/image";
import type { ArchiveItem } from "@/lib/github";
import Reveal from "@/components/Reveal";

/**
 * The "more work" grid. Descriptions, languages and star counts come live from
 * the GitHub API; the curated list in config/site.ts controls order.
 */
export default function Archive({ items }: { items: ArchiveItem[] }) {
  return (
    <section
      id="archive"
      aria-labelledby="archive-heading"
      className="relative border-t-2 border-dashed border-rule px-5 py-14 sm:px-10 sm:py-20"
    >
      <Reveal className="mx-auto w-fit text-center">
        <p className="font-hand text-xl text-ink-soft">and the rest</p>
        <h2
          id="archive-heading"
          className="mt-1 font-display text-[clamp(1.6rem,6vw,3.25rem)] leading-none"
        >
          THE ARCHIVE
        </h2>
      </Reveal>

      <ul className="mx-auto mt-12 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <Reveal as="li" key={item.repo} delay={(i % 3) * 60}>
            <a
              href={item.live || item.url}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex h-full flex-col border-2 border-ink bg-white p-4 shadow-[3px_3px_0_var(--color-ink)] transition-transform hover:-translate-y-0.5 hover:shadow-[5px_5px_0_var(--color-marker)]"
            >
              {item.image ? (
                <span className="relative mb-3 block aspect-[16/10] overflow-hidden border border-ink/70 bg-paper-2">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, 300px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </span>
              ) : null}
              <span className="font-mono text-[13px] font-bold">
                {item.repo}
              </span>
              <span className="mt-2 text-[13px] leading-snug text-ink-soft">
                {item.note}
              </span>
              <span className="mt-auto flex items-center gap-3 pt-4 font-mono text-[10px] uppercase tracking-wide text-ink-soft">
                {item.language ? <span>{item.language}</span> : null}
                {item.live ? (
                  <span className="text-grass">● live</span>
                ) : (
                  <span>source</span>
                )}
                <span className="ml-auto transition-transform group-hover:translate-x-0.5">
                  ↗
                </span>
              </span>
            </a>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
