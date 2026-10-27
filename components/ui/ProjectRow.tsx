import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/config/site";
import LogoMark from "@/components/ui/LogoMark";

/**
 * One project, set as a line in an index.
 *
 * Everything needed to decide whether to open it sits on the row — number,
 * client mark, what it is, what it's built with, when it shipped — so the work
 * can be scanned top to bottom without opening anything.
 */
export default function ProjectRow({
  project,
  n,
  onDark = false,
}: {
  project: Project;
  /** Two-digit index within its track */
  n: string;
  onDark?: boolean;
}) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="work-row rule group grid gap-6 py-8 sm:py-10 lg:grid-cols-12 lg:gap-8"
      aria-label={`${project.title} — case study`}
      data-cursor="View"
    >
      {/* Number */}
      <div className="flex items-start justify-between gap-4 lg:col-span-1 lg:block">
        <span className="label numeral text-signal">{n}</span>
        <span className="label numeral text-muted-auto lg:hidden">
          {project.date}
        </span>
      </div>

      {/* Identity and summary */}
      <div className="lg:col-span-5">
        {project.logo ? (
          <span className="mb-5 block h-7 w-[150px]">
            <LogoMark src={project.logo} name={project.client} onDark={onDark} />
          </span>
        ) : null}

        <h3 className="row-shift display text-[clamp(1.6rem,4.4vw,2.6rem)]">
          {project.title}
        </h3>
        <p className="label text-muted-auto mt-3">{project.client}</p>

        <p className="text-muted-auto mt-5 max-w-md leading-relaxed">
          {project.summary}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span key={s} className="tag">
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Visual */}
      <div className="lg:col-span-4">
        <div
          data-clip=""
          data-parallax={project.image ? "8" : undefined}
          data-tilt="6"
          className={`row-media relative aspect-[16/10] w-full overflow-hidden ${
            onDark ? "bg-ink-2" : "bg-mist"
          }`}
        >
          {project.image ? (
            /* Wrapper takes the scroll parallax; the image keeps the hover zoom */
            <div className="absolute inset-0">
              <Image
                src={project.image}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          ) : (
            /* No screenshot — the tags carry the panel instead of a grey box */
            <div className="flex h-full flex-col justify-between p-6">
              <span className="label text-muted-auto">{project.language}</span>
              <span className="display text-[clamp(1.4rem,3vw,2rem)] opacity-25">
                {project.tags.join(" · ")}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Date and affordance */}
      <div className="flex items-center justify-between gap-4 lg:col-span-2 lg:flex-col lg:items-end lg:justify-start lg:gap-5">
        <span className="label numeral text-muted-auto hidden lg:inline">
          {project.date}
        </span>
        <span className="label group-hover:text-signal inline-flex items-center gap-2 whitespace-nowrap">
          Case study
          <span className="arrow" aria-hidden="true">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
