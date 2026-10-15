import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/config/site";
import Tape from "./Tape";

const SURFACE: Record<string, string> = {
  marker: "bg-marker text-ink",
  sky: "bg-sky text-white",
  grass: "bg-grass text-white",
  bubble: "bg-bubble text-white",
  tangerine: "bg-tangerine text-white",
  lilac: "bg-lilac text-white",
  paper: "bg-white text-ink",
};

/**
 * A pinned project card: numbered folder tab, clipped corner, taped artwork.
 * The whole card is one link, with the visible "view project" affordance
 * marked decorative so screen readers hear a single target.
 */
export default function ProjectCard({
  project,
  index,
  dark = false,
}: {
  project: Project;
  index: number;
  dark?: boolean;
}) {
  const surface = dark ? "bg-ink text-paper" : SURFACE[project.tone];
  const muted = dark ? "text-paper/70" : "opacity-75";

  return (
    <article className="relative">
      {/* Folder tab */}
      <div
        className={`tab-shape inline-block border-2 border-b-0 border-ink px-5 py-1.5 font-mono text-[11px] font-bold tracking-widest ${
          dark ? "bg-ink text-paper" : SURFACE[project.tone]
        }`}
      >
        PROJECT {String(index + 1).padStart(2, "0")}
      </div>

      <Link
        href={`/work/${project.slug}`}
        className={`notched group relative block border-2 border-ink ${surface} shadow-[6px_6px_0_var(--color-ink)] transition-transform duration-300 hover:-translate-y-1`}
      >
        <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-[1.05fr_1fr] md:items-center">
          {/* Copy */}
          <div>
            <p className={`font-mono text-[11px] tracking-widest ${muted}`}>
              ● {project.date}
            </p>

            <h3 className="mt-3 font-display text-[clamp(1.6rem,4vw,2.5rem)] leading-none">
              {project.title}
            </h3>

            <p className={`mt-1 font-mono text-[11px] tracking-wide ${muted}`}>
              {project.client}
            </p>

            <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed">
              {project.summary}
            </p>

            <ul className="mt-5 flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <li
                  key={s}
                  className={`border px-2 py-0.5 font-mono text-[10px] tracking-wide ${
                    dark
                      ? "border-paper/35 text-paper/80"
                      : "border-current opacity-80"
                  }`}
                >
                  {s}
                </li>
              ))}
            </ul>

            <span
              aria-hidden="true"
              className="mt-6 inline-flex items-center gap-2 border-b-2 border-current pb-1 font-mono text-xs font-bold tracking-widest"
            >
              VIEW PROJECT
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </span>
          </div>

          {/* Artwork */}
          <div className="relative">
            <Tape
              className="-top-3 left-6 z-10"
              rotate={-9}
              width={76}
              height={22}
            />
            <Tape
              className="-bottom-3 right-6 z-10"
              rotate={7}
              width={64}
              height={20}
            />
            <div className="relative aspect-[16/11] overflow-hidden border-2 border-ink bg-paper-2">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={`${project.title} — ${project.summary}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 480px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              ) : (
                /* Tools with no interface to photograph get a spec panel
                   instead of a borrowed stock image. */
                <div className="flex h-full w-full flex-col justify-between bg-ink p-5 text-paper">
                  <span className="font-mono text-[10px] tracking-widest text-paper/60">
                    {project.repo}
                  </span>
                  <span className="font-display text-[clamp(1.1rem,2.6vw,1.6rem)] leading-tight">
                    {project.tags.join(" · ")}
                  </span>
                  <ul className="flex flex-wrap gap-1">
                    {project.stack.map((s) => (
                      <li
                        key={s}
                        className="border border-paper/30 px-1.5 py-0.5 font-mono text-[9px] text-paper/80"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
