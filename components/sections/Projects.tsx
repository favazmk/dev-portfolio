"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from "@/lib/github";
import { languageColor } from "@/lib/languageColors";

gsap.registerPlugin(ScrollTrigger);

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLElement>(null);

  // Desktop-only 3D tilt on hover.
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(el, {
        rotateY: x * 8,
        rotateX: -y * 8,
        transformPerspective: 900,
        duration: 0.5,
        ease: "power2.out",
      });
    };
    const onLeave = () => {
      gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.7, ease: "power3.out" });
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <article
      ref={cardRef}
      className="project-card glass group relative flex w-full shrink-0 flex-col gap-4 overflow-hidden rounded-2xl p-6 md:p-8 lg:w-[420px]"
    >
      <span
        aria-hidden
        className="font-display absolute -top-3 right-4 text-7xl font-bold text-white/5 transition-colors duration-500 group-hover:text-accent/15"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="flex items-center gap-3 text-xs text-white/55">
        <span className="flex items-center gap-1.5">
          <span
            aria-hidden
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: languageColor(project.language) }}
          />
          {project.language}
        </span>
        {project.stars > 0 && <span>★ {project.stars}</span>}
      </div>

      <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
        {project.title}
      </h3>

      <p className="text-sm leading-relaxed text-white/75 md:text-base">
        {project.description}
      </p>

      {project.topics.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {project.topics.map((topic) => (
            <li
              key={topic}
              className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-white/50"
            >
              {topic}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto flex items-center gap-5 pt-3">
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            aria-label={`${project.title} — live demo`}
            className="text-sm font-semibold text-accent2 transition-colors hover:text-white"
          >
            Live ↗
          </a>
        )}
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`${project.title} — source on GitHub`}
          className="text-sm font-semibold text-white/60 transition-colors hover:text-white"
        >
          GitHub ↗
        </a>
      </div>
    </article>
  );
}

export default function Projects({ projects }: { projects: Project[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: pin the section, translate the row horizontally.
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const track = trackRef.current!;
          const amount = () => track.scrollWidth - window.innerWidth;
          gsap.to(track, {
            x: () => -amount(),
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: () => `+=${amount()}`,
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
        }
      );

      // Mobile: staggered card reveals on the normal vertical flow.
      mm.add(
        "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        () => {
          const cards = sectionRef.current?.querySelectorAll(".project-card");
          if (!cards) return;
          cards.forEach((card) => {
            gsap.from(card, {
              opacity: 0,
              y: 44,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 88%", once: true },
            });
          });
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [projects]);

  return (
    <section ref={sectionRef} id="projects" className="relative">
      <div className="flex flex-col justify-center py-28 md:py-40 lg:h-screen lg:py-0">
        <div className="mx-auto w-full max-w-5xl px-6 lg:mx-0 lg:max-w-none lg:px-[8vw]">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent2">
            03 — Selected work
          </p>
          <h2 className="font-display mb-10 text-4xl font-bold tracking-tight md:text-6xl lg:mb-14">
            Things I&apos;ve shipped
          </h2>
        </div>

        <div className="projects-viewport lg:overflow-hidden">
          <div
            ref={trackRef}
            className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 lg:mx-0 lg:w-max lg:max-w-none lg:flex-row lg:gap-8 lg:px-[8vw]"
          >
            {projects.map((project, i) => (
              <ProjectCard key={project.repo} project={project} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
