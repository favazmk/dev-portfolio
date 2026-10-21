import { site } from "@/config/site";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/ui/SectionHead";

/**
 * Profile. Two disciplines stated plainly side by side, because "developer who
 * also writes" is the whole proposition and burying it reads as a hobby.
 */
export default function Profile() {
  return (
    <section id="profile" className="shell scroll-mt-14 py-20 sm:py-28">
      <SectionHead n="01" label="Profile" title="Two disciplines, one instinct." />

      <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="prose-col lg:col-span-7">
          {site.intro.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal>

        <Reveal delay={90} className="lg:col-span-5">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8">
            {site.stats.map((s) => (
              <div key={s.label} className="rule pt-4">
                <dt className="label text-muted-auto">{s.label}</dt>
                <dd data-count="" className="display mt-3 text-[clamp(1.9rem,5vw,2.9rem)]">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      {/* The two practices */}
      <div className="mt-16 grid gap-10 sm:mt-20 md:grid-cols-2 md:gap-14">
        {site.disciplines.map((d, i) => (
          <Reveal key={d.n} delay={i * 90}>
            <div className="rule pt-5">
              <p className="label numeral text-signal">{d.n}</p>
              <h3 data-split="words" className="display mt-5 text-[clamp(1.5rem,3.6vw,2.1rem)]">
                {d.title}
              </h3>
              <p className="text-muted-auto mt-4 leading-relaxed">{d.note}</p>
              <ul className="mt-7 space-y-3">
                {d.points.map((pt) => (
                  <li
                    key={pt}
                    className="flex gap-3 border-t border-line pt-3 text-sm leading-relaxed"
                  >
                    <span className="text-signal shrink-0" aria-hidden="true">
                      —
                    </span>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Capability list */}
      <Reveal delay={120}>
        <div className="rule mt-16 flex flex-wrap gap-2 pt-6 sm:mt-20">
          {site.skills.map((s) => (
            <span key={s} className="tag">
              {s}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
