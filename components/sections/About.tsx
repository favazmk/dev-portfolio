import { site } from "@/config/site";
import Polaroid from "@/components/ui/Polaroid";
import Sticker from "@/components/ui/Sticker";
import Reveal from "@/components/Reveal";
import { Squiggle } from "@/components/ui/Doodle";

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative border-t-2 border-dashed border-rule px-5 py-14 sm:px-10 sm:py-20"
    >
      <Reveal className="mx-auto w-fit">
        <p className="font-hand text-xl text-ink-soft">about me!</p>
      </Reveal>

      <Reveal delay={60} className="mx-auto mt-2 w-fit">
        <h2
          id="about-heading"
          className="border-2 border-ink bg-white px-5 py-2 font-mono text-sm font-bold tracking-widest"
        >
          WHAT&rsquo;S UP
        </h2>
      </Reveal>

      <div className="mx-auto mt-12 grid max-w-6xl items-start gap-10 lg:grid-cols-[auto_1fr_auto]">
        {/* Photo */}
        <Reveal delay={120} className="justify-self-center lg:justify-self-start">
          <Polaroid
            src="/me/favaz.webp"
            alt="Favaz MK"
            caption="that's me"
            rotate={-4}
            width={215}
          />
        </Reveal>

        {/* The handwritten note */}
        <Reveal delay={180} className="max-w-xl justify-self-center text-center">
          {site.note.map((line, i) => (
            <p
              key={i}
              className="mb-4 font-hand text-[1.45rem] leading-[1.5] text-ink last:mb-0"
            >
              {line}
            </p>
          ))}
          <Squiggle
            aria-hidden="true"
            className="mx-auto mt-6 h-3 w-48 text-grass/60"
          />
        </Reveal>

        {/* Stats, taped up */}
        <Reveal
          delay={240}
          className="justify-self-center lg:justify-self-end"
        >
          <ul className="space-y-3">
            {site.stats.map((s, i) => (
              <li
                key={s.label}
                className="relative border-2 border-ink bg-white px-5 py-3 shadow-[3px_3px_0_var(--color-ink)]"
                style={{ transform: `rotate(${i % 2 ? 1.5 : -1.5}deg)` }}
              >
                <span className="block font-display text-2xl leading-none">
                  {s.value}
                </span>
                <span className="mt-1 block font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                  {s.label}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* Skills cluster */}
      <Reveal
        delay={300}
        as="div"
        className="mx-auto mt-16 flex max-w-3xl flex-wrap items-center justify-center gap-2.5"
      >
        <h3 className="sr-only">Skills</h3>
        <ul className="contents">
          {site.skills.map((s, i) => (
            <li key={s.name}>
              <Sticker tone={s.tone} rotate={i % 3 === 0 ? -2 : i % 3 === 1 ? 1.5 : -1}>
                {s.name}
              </Sticker>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
