import { systemsProjects, craftProjects, site } from "@/config/site";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/ui/SectionHead";
import ProjectRow from "@/components/ui/ProjectRow";

function Track({
  id,
  n,
  label,
  title,
  note,
  projects,
}: {
  id: string;
  n: string;
  label: string;
  title: string;
  note: string;
  projects: typeof systemsProjects;
}) {
  return (
    <section id={id} className="shell scroll-mt-14 py-20 sm:py-28">
      <SectionHead
        n={n}
        label={label}
        title={title}
        note={note}
        count={`${String(projects.length).padStart(2, "0")} projects`}
      />

      <div className="mt-12 sm:mt-16">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={Math.min(i, 4) * 60}>
            <ProjectRow project={p} n={String(i + 1).padStart(2, "0")} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/**
 * Selected work, split into the two halves of the practice. The split is the
 * organising idea: systems are judged on whether they're correct, brand sites
 * on whether they land, and mixing them flatters neither.
 */
export default function Work() {
  return (
    <>
      <Track
        id="systems"
        n="03"
        label={site.tracks.systems.label}
        title="Things that run."
        note={site.tracks.systems.note}
        projects={systemsProjects}
      />
      <Track
        id="craft"
        n="04"
        label={site.tracks.craft.label}
        title="Things that land."
        note={site.tracks.craft.note}
        projects={craftProjects}
      />
    </>
  );
}
