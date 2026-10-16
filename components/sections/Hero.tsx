import { site } from "@/config/site";
import Sticker from "@/components/ui/Sticker";
import Tape from "@/components/ui/Tape";
import Reveal from "@/components/Reveal";
import { ArrowCurve, Star, Underline } from "@/components/ui/Doodle";

export default function Hero() {
  return (
    <section className="relative px-5 pt-12 pb-14 sm:px-10 sm:pt-20 sm:pb-24">
      {/* "my name is" label */}
      <Reveal className="relative mx-auto w-fit">
        <p className="font-hand text-2xl text-ink-soft">my name is</p>
        <Underline
          aria-hidden="true"
          className="mx-auto h-2 w-24 text-ink-soft/50"
        />
      </Reveal>

      {/* Name in a hand-drawn box, flanked by sticker tags */}
      <div className="relative mx-auto mt-3 flex max-w-5xl flex-wrap items-center justify-center gap-4 sm:gap-8">
        <Reveal delay={60} className="order-2 sm:order-1">
          <Sticker tone={site.heroTags[0].tone} rotate={-4}>
            {site.heroTags[0].text}
          </Sticker>
        </Reveal>

        <Reveal delay={120} className="order-1 w-full sm:order-2 sm:w-auto">
          <div className="relative mx-auto w-fit">
            <span
              aria-hidden="true"
              className="absolute -inset-x-5 -inset-y-3 rounded-[14px] border-[3px] border-signal"
              style={{ transform: "rotate(-1.2deg)" }}
            />
            <h1 className="relative font-display text-[clamp(2.75rem,13vw,7rem)] leading-[0.95] tracking-tight">
              {site.firstName}
            </h1>
          </div>
        </Reveal>

        <Reveal delay={180} className="order-3">
          <Sticker tone={site.heroTags[1].tone} rotate={5}>
            {site.heroTags[1].text}
          </Sticker>
        </Reveal>
      </div>

      {/* Role + availability + location row */}
      <Reveal
        delay={240}
        className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-2.5"
      >
        <Sticker tone="marker" small rotate={-2}>
          {site.role}
        </Sticker>
        <span className="chip chip-sm bg-white font-mono">
          <i
            aria-hidden="true"
            className="block h-2 w-2 rounded-full bg-grass"
          />
          {site.availability}
        </span>
        <Sticker tone="paper" small rotate={2}>
          {site.location}
        </Sticker>
      </Reveal>

      {/* The statement */}
      <Reveal
        delay={300}
        as="div"
        className="relative mx-auto mt-14 max-w-3xl text-center"
      >
        <p className="font-display text-[clamp(1.35rem,4.6vw,2.6rem)] leading-[1.25]">
          {site.statement[0]}{" "}
          <Star
            aria-hidden="true"
            className="inline-block h-[0.7em] w-[0.7em] text-grass"
          />
          <br />
          <span className="marker" style={{ ["--hl" as string]: "var(--color-marker)" }}>
            {site.statement[1]}
          </span>
        </p>

        <ArrowCurve
          aria-hidden="true"
          className="absolute -right-2 -bottom-12 hidden h-14 w-28 text-ink-soft/40 sm:block"
        />
      </Reveal>

      {/* CTA */}
      <Reveal delay={360} className="mt-12 flex justify-center">
        <a
          href={`mailto:${site.email}`}
          className="relative inline-flex items-center gap-2.5 border-2 border-ink bg-ink px-6 py-3 font-mono text-sm font-bold text-paper shadow-[4px_4px_0_var(--color-marker)] transition-transform hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--color-marker)]"
        >
          <Tape className="-top-2.5 left-4" rotate={-10} width={46} height={18} />
          CONTACT ME
        </a>
      </Reveal>
    </section>
  );
}
