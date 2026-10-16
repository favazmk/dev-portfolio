import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, projectBySlug, site } from "@/config/site";
import Nav from "@/components/Nav";
import Paper from "@/components/ui/Paper";
import Reveal from "@/components/Reveal";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.title} — ${project.client}`,
    description: project.summary,
    openGraph: {
      title: `${project.title} — ${site.name}`,
      description: project.summary,
      images: [{ url: project.image }],
      type: "article",
    },
    alternates: { canonical: `/work/${project.slug}` },
  };
}

export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  const siblings = projects.filter((p) => p.slug !== project.slug);
  const next = siblings[projects.indexOf(project) % siblings.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    author: { "@type": "Person", name: site.name, url: site.url },
    url: `${site.url}/work/${project.slug}`,
    ...(project.live ? { sameAs: [project.live] } : null),
  };

  return (
    <Paper>
      <Nav />

      <main id="content" className="bg-paper">
        {/* ── HERO ─────────────────────────────────────────────── */}
        <header className="relative overflow-hidden border-b-2 border-ink bg-paper px-5 pt-16 pb-0 sm:px-10">
          <p className="font-mono text-[11px] tracking-widest text-ink-soft">
            CASE STUDY / {project.date} / {project.track.toUpperCase()}
          </p>

          {/* Oversized title, clipped at the baseline like the reference */}
          <h1 className="mt-4 font-display text-[clamp(2.5rem,13vw,9rem)] leading-[0.86] tracking-tight text-blueprint">
            {project.title}
          </h1>

          <div className="mt-8 grid gap-8 pb-14 md:grid-cols-[1.2fr_1fr] md:items-end">
            <p className="max-w-xl text-[clamp(1rem,2.4vw,1.3rem)] leading-relaxed">
              {project.standfirst}
            </p>

            <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-l-2 border-ink pl-6">
              {project.facts.map((f) => (
                <div key={f.label}>
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">
                    {f.label}
                  </dt>
                  <dd className="mt-1 text-sm font-semibold">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </header>

        {/* ── COVER IMAGE ──────────────────────────────────────── */}
        {project.image ? (
          <div className="relative aspect-[16/8] w-full border-b-2 border-ink bg-paper-2">
            <Image
              src={project.image}
              alt={`${project.title} — ${project.summary}`}
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
          </div>
        ) : (
          <div className="blueprint flex aspect-[16/6] w-full items-center justify-center border-b-2 border-ink px-6">
            <p className="text-center font-display text-[clamp(1.2rem,4vw,2.6rem)] leading-tight text-white/90">
              {project.stack.join("  ·  ")}
            </p>
          </div>
        )}

        {/* ── LINKS BAR ────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center gap-3 border-b-2 border-ink bg-blueprint px-5 py-4 sm:px-10">
          <span className="font-mono text-[11px] tracking-widest text-white/70">
            {project.client}
          </span>
          <span className="ml-auto flex flex-wrap gap-2">
            {project.live ? (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer noopener"
                className="chip chip-sm border-white bg-white font-mono shadow-none"
              >
                VISIT LIVE SITE ↗
              </a>
            ) : null}
            <a
              href={`https://github.com/${site.github}/${project.repo}`}
              target="_blank"
              rel="noreferrer noopener"
              className="chip chip-sm border-white bg-transparent font-mono text-white shadow-none"
            >
              SOURCE ↗
            </a>
          </span>
        </div>

        {/* ── NUMBERED SECTIONS ────────────────────────────────── */}
        <div className="px-5 sm:px-10">
          {project.sections.map((section, i) => {
            const n = String(i + 1).padStart(2, "0");
            const onBlueprint = Boolean(section.points);

            return (
              <Reveal
                as="section"
                key={section.heading}
                className={`-mx-5 border-b-2 border-ink px-5 py-16 sm:-mx-10 sm:px-10 ${
                  onBlueprint ? "blueprint text-white" : ""
                }`}
              >
                <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[auto_1fr] md:gap-14">
                  <span
                    aria-hidden="true"
                    className={`font-display text-[clamp(2rem,6vw,3.5rem)] leading-none ${
                      onBlueprint ? "text-white/35" : "text-signal"
                    }`}
                  >
                    {n}
                  </span>

                  <div>
                    <h2
                      className={`max-w-2xl font-display text-[clamp(1.35rem,4vw,2.4rem)] leading-[1.1] ${
                        i === project.sections.length - 1 && !onBlueprint
                          ? "rule-strike"
                          : ""
                      }`}
                    >
                      {section.heading}
                    </h2>

                    <div className="mt-6 max-w-2xl space-y-5">
                      {section.body.map((p, j) => (
                        <p
                          key={j}
                          className={`text-[1.02rem] leading-relaxed ${
                            onBlueprint ? "text-white/85" : "text-ink-soft"
                          }`}
                        >
                          {p}
                        </p>
                      ))}
                    </div>

                    {section.points ? (
                      <ul className="mt-9 grid gap-px overflow-hidden border border-white/25 bg-white/25 sm:grid-cols-2">
                        {section.points.map((pt) => (
                          <li
                            key={pt}
                            className="bg-blueprint px-4 py-3 font-mono text-[12px] leading-snug text-white/90"
                          >
                            {pt}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* ── STACK ────────────────────────────────────────────── */}
        <section className="border-b-2 border-ink px-5 py-14 sm:px-10">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-mono text-[11px] tracking-widest text-ink-soft">
              BUILT WITH
            </h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <li key={s} className="chip bg-white">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── NEXT ─────────────────────────────────────────────── */}
        <nav
          aria-label="More work"
          className="flex flex-wrap items-center justify-between gap-6 px-5 py-16 sm:px-10"
        >
          <Link
            href="/#work"
            className="chip bg-white font-mono transition-transform hover:-translate-y-0.5"
          >
            ← ALL WORK
          </Link>

          {next ? (
            <Link href={`/work/${next.slug}`} className="group text-right">
              <span className="font-mono text-[11px] tracking-widest text-ink-soft">
                NEXT PROJECT
              </span>
              <span className="mt-1 block font-display text-[clamp(1.3rem,4vw,2.2rem)] leading-none transition-colors group-hover:text-blueprint">
                {next.title} →
              </span>
            </Link>
          ) : null}
        </nav>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Paper>
  );
}
