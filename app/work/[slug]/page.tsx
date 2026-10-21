import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  projects,
  orderedProjects,
  projectBySlug,
  site,
} from "@/config/site";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import LogoMark from "@/components/ui/LogoMark";

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
      ...(project.image ? { images: [{ url: project.image }] } : null),
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

  const position = orderedProjects.findIndex((p) => p.slug === project.slug);
  const next = orderedProjects[(position + 1) % orderedProjects.length];
  const trackLabel = site.tracks[project.track].label;

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
    <>
      <Nav />

      <main id="content">
        {/* ── COVER ────────────────────────────────────────────── */}
        <header className="on-dark">
          <div className="shell pt-16 pb-14 sm:pt-20 sm:pb-16">
            <div className="rule-signal pt-5">
              <div className="flex items-baseline justify-between gap-6">
                <p className="label text-muted-auto">
                  Case study
                  <span className="mx-2 opacity-40">/</span>
                  {trackLabel}
                </p>
                <p className="label numeral text-muted-auto">{project.date}</p>
              </div>
            </div>

            {project.logo ? (
              <span className="mt-12 block h-9 w-[190px]">
                <LogoMark src={project.logo} name={project.client} onDark />
              </span>
            ) : null}

            <h1
              data-split="chars"
              data-split-load=""
              className="display mt-7 text-[clamp(2.8rem,11vw,8rem)]"
            >
              {project.title}
            </h1>
            <p className="label text-muted-auto mt-6">{project.client}</p>

            <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-16">
              <p className="text-[clamp(1.05rem,2.4vw,1.4rem)] leading-[1.5] lg:col-span-7">
                {project.standfirst}
              </p>

              <dl className="grid grid-cols-2 gap-x-6 gap-y-7 lg:col-span-5">
                {project.facts.map((f) => (
                  <div key={f.label} className="rule pt-4">
                    <dt className="label text-muted-auto">{f.label}</dt>
                    <dd className="mt-2.5 text-sm font-medium">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Links */}
            <div className="rule mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 pt-6">
              {project.live ? (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="label link-ul"
                >
                  Visit live site ↗
                </a>
              ) : null}
              <a
                href={`https://github.com/${site.github}/${project.repo}`}
                target="_blank"
                rel="noreferrer noopener"
                className="label link-ul text-muted-auto"
              >
                Source ↗
              </a>
              <span className="label text-muted-auto ml-auto">
                {project.tags.join(" · ")}
              </span>
            </div>
          </div>
        </header>

        {/* ── COVER IMAGE ──────────────────────────────────────── */}
        {project.image ? (
          <div className="relative aspect-[16/8] w-full overflow-hidden bg-mist">
            {/* Settles from a slight zoom as it scrolls through (data-zoom) */}
            <div data-zoom="" className="absolute inset-0">
              <Image
                src={project.image}
                alt={`${project.title} — ${project.summary}`}
                fill
                sizes="100vw"
                priority
                className="object-cover"
              />
            </div>
          </div>
        ) : null}

        {/* ── NUMBERED SECTIONS ────────────────────────────────── */}
        <div className="shell py-20 sm:py-28">
          {project.sections.map((section, i) => (
            <Reveal as="section" key={section.heading}>
              <div className="rule grid gap-8 py-12 sm:py-16 lg:grid-cols-12 lg:gap-16">
                <p
                  aria-hidden="true"
                  className="label numeral text-signal lg:col-span-1"
                >
                  {String(i + 1).padStart(2, "0")}
                </p>

                <div className="lg:col-span-7">
                  <h2
                    data-split="words"
                    className="display text-[clamp(1.45rem,4vw,2.4rem)] leading-[1.12]"
                  >
                    {section.heading}
                  </h2>
                  <div className="prose-col mt-7">
                    {section.body.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                </div>

                {section.points ? (
                  <ul className="self-start lg:col-span-4">
                    {section.points.map((pt) => (
                      <li
                        key={pt}
                        className="rule flex gap-3 py-3.5 font-mono text-[12px] leading-snug text-muted"
                      >
                        <span className="text-signal shrink-0" aria-hidden="true">
                          —
                        </span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── BUILT WITH ───────────────────────────────────────── */}
        <section className="shell pb-20 sm:pb-28">
          <Reveal>
            <div className="rule-signal pt-5">
              <p className="label text-muted-auto">Built with</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <li key={s} className="tag">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </section>

        {/* ── NEXT ─────────────────────────────────────────────── */}
        <nav aria-label="More work" className="on-dark">
          <div className="shell flex flex-wrap items-end justify-between gap-8 py-16 sm:py-20">
            <Link href="/#systems" className="label link-ul text-muted-auto">
              ← All work
            </Link>

            {next ? (
              <Link
                href={`/work/${next.slug}`}
                className="group text-right"
                data-cursor="Next"
              >
                <span className="label text-muted-auto">Next project</span>
                <span className="display mt-3 block text-[clamp(1.5rem,5vw,3rem)] transition-colors group-hover:text-signal">
                  {next.title}{" "}
                  <span className="arrow-nudge inline-block" aria-hidden="true">
                    →
                  </span>
                </span>
              </Link>
            ) : null}
          </div>
        </nav>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
