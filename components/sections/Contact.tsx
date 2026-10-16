import { site } from "@/config/site";
import Reveal from "@/components/Reveal";
import Tape from "@/components/ui/Tape";
import Polaroid from "@/components/ui/Polaroid";

const SOCIAL_LABELS: Record<string, string> = {
  github: "GITHUB",
  linkedin: "LINKEDIN",
  x: "X",
  instagram: "INSTAGRAM",
};

export default function Contact() {
  const socials = Object.entries(site.socials).filter(([, url]) => url);

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative border-t-2 border-dashed border-rule px-5 py-14 sm:px-10 sm:py-20"
    >
      <Reveal className="mx-auto w-fit">
        <p className="text-center font-hand text-xl text-ink-soft">say hi</p>
      </Reveal>

      <div className="mx-auto mt-6 grid max-w-5xl items-center gap-12 lg:grid-cols-[1fr_auto_1fr]">
        <Reveal delay={60} className="hidden justify-self-end lg:block">
          <Polaroid
            src="/work/pandur.webp"
            alt="Pandur brand site"
            caption="recent work"
            rotate={-6}
            width={175}
          />
        </Reveal>

        <Reveal delay={120} className="justify-self-center text-center">
          <h2
            id="contact-heading"
            className="border-[3px] border-ink bg-white px-7 py-3 font-display text-[clamp(1.8rem,7vw,3.25rem)] leading-none"
          >
            {site.contact.heading}
          </h2>

          {/* Sticky note */}
          <div
            className="relative mx-auto mt-10 max-w-sm bg-marker p-6 shadow-[5px_5px_0_rgba(0,0,0,0.18)]"
            style={{ transform: "rotate(-1.5deg)" }}
          >
            <Tape
              className="-top-3 left-1/2 -translate-x-1/2"
              rotate={-5}
              width={84}
            />
            <p className="font-hand text-xl leading-snug">
              {site.contact.note}
            </p>
          </div>

          <a
            href={`mailto:${site.email}`}
            className="mt-10 inline-flex items-center gap-2.5 border-2 border-ink bg-ink px-6 py-3 font-mono text-sm font-bold text-paper shadow-[4px_4px_0_var(--color-marker)] transition-transform hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--color-marker)]"
          >
            {site.email}
          </a>

          {socials.length ? (
            <ul className="mt-8 flex flex-wrap justify-center gap-2">
              {socials.map(([key, url]) => (
                <li key={key}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="chip chip-sm bg-white font-mono transition-transform hover:-translate-y-0.5 hover:bg-sky hover:text-white"
                  >
                    {SOCIAL_LABELS[key] ?? key.toUpperCase()}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </Reveal>

        <Reveal delay={180} className="hidden justify-self-start lg:block">
          <Polaroid
            src="/work/docmate.webp"
            alt="DocMate booking platform"
            caption="docmate.ae"
            rotate={5}
            width={175}
            tapeRotate={6}
          />
        </Reveal>
      </div>

      <footer className="mx-auto mt-24 flex max-w-5xl flex-wrap items-center justify-between gap-3 border-t-2 border-dashed border-rule pt-6 font-mono text-[11px] uppercase tracking-wide text-ink-soft">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <span>{site.location}</span>
      </footer>
    </section>
  );
}
