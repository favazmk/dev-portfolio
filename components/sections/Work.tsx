import { systemsProjects, craftProjects, site } from "@/config/site";
import ProjectCard from "@/components/ui/ProjectCard";
import Reveal from "@/components/Reveal";
import { Underline } from "@/components/ui/Doodle";

function Track({
  id,
  label,
  title,
  note,
  projects,
  dark,
}: {
  id: string;
  label: string;
  title: string;
  note: string;
  projects: typeof systemsProjects;
  dark?: boolean;
}) {
  return (
    <div id={id} className="scroll-mt-20">
      <Reveal className="mx-auto w-fit text-center">
        <span className="chip chip-sm bg-white font-mono">{label}</span>
        <h3 className="mt-4 font-display text-[clamp(1.8rem,7vw,4rem)] leading-none">
          {title}
        </h3>
        <Underline
          aria-hidden="true"
          className="mx-auto mt-2 h-3 w-40 text-signal"
        />
        <p className="mx-auto mt-5 max-w-lg font-hand text-xl leading-snug text-ink-soft">
          {note}
        </p>
      </Reveal>

      <div className="mx-auto mt-14 grid max-w-5xl gap-14">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 60}>
            <ProjectCard project={p} index={i} dark={dark && i % 2 === 0} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export default function Work() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="relative border-t-2 border-dashed border-rule px-5 py-14 sm:px-10 sm:py-20"
    >
      <Reveal className="mx-auto w-fit text-center">
        <p className="font-hand text-xl text-ink-soft">what I&rsquo;ve built</p>
        <h2
          id="work-heading"
          className="mt-1 font-display text-[clamp(2rem,8vw,4.5rem)] leading-none"
        >
          SELECTED WORK
        </h2>
      </Reveal>

      <div className="mt-16 space-y-24 sm:mt-20 sm:space-y-28">
        <Track
          id="systems"
          label={site.tracks.systems.label}
          title={site.tracks.systems.title}
          note={site.tracks.systems.note}
          projects={systemsProjects}
          dark
        />
        <Track
          id="craft"
          label={site.tracks.craft.label}
          title={site.tracks.craft.title}
          note={site.tracks.craft.note}
          projects={craftProjects}
        />
      </div>
    </section>
  );
}
