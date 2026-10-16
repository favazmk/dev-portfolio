import { site, brandClients } from "@/config/site";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/ui/SectionHead";

/**
 * The writing practice.
 *
 * Carried across from the earlier content-writer portfolio: three years of
 * scripts, ad copy and strategy that predate the engineering work and still
 * run alongside it.
 */
export default function Content() {
  return (
    <section id="content" className="on-dark scroll-mt-14">
      <div className="shell py-20 sm:py-28">
        <SectionHead
          n="05"
          label="Content & Strategy"
          title="Words first, code second."
          count="3+ years"
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <p className="display text-[clamp(1.3rem,3vw,1.9rem)] leading-[1.25]">
              {site.content.standfirst}
            </p>
            <div className="mt-8 space-y-5">
              {site.content.body.map((p) => (
                <p key={p} className="leading-relaxed text-white/70">
                  {p}
                </p>
              ))}
            </div>

            <a
              href={site.socials.instagram}
              target="_blank"
              rel="noreferrer noopener"
              className="label link-ul mt-10 inline-flex items-center gap-2"
            >
              See the work on Instagram
              <span aria-hidden="true">↗</span>
            </a>
          </Reveal>

          <Reveal delay={90} className="lg:col-span-5">
            <ul>
              {site.content.services.map((s) => (
                <li key={s.n} className="rule flex gap-5 py-5">
                  <span className="label numeral text-signal shrink-0">
                    {s.n}
                  </span>
                  <div>
                    <h3 className="text-base font-medium">{s.title}</h3>
                    <p className="text-muted-auto mt-2 text-sm leading-relaxed">
                      {s.note}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* The brands the copy was written for, named rather than shown again */}
        <Reveal delay={140}>
          <div className="rule mt-16 pt-6 sm:mt-20">
            <p className="label text-muted-auto">Brands I&rsquo;ve written copy for</p>
            <p className="mt-5 text-lg leading-[1.6] text-white/55 sm:text-xl">
              {brandClients.map((c) => c.name).join(" · ")}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
