import { site } from "@/config/site";
import Reveal from "@/components/Reveal";

const CHANNELS = [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  {
    label: "Phone",
    value: site.phone,
    href: `tel:${site.phone.replace(/\s/g, "")}`,
  },
  { label: "Instagram", value: "@fa_was.mk", href: site.socials.instagram },
  { label: "GitHub", value: `@${site.github}`, href: site.socials.github },
];

/**
 * Close. The email set as the largest type on the page after the hero, because
 * it is the one thing the page is asking anyone to do.
 */
export default function Contact() {
  return (
    <section id="contact" className="on-dark scroll-mt-14">
      <div className="shell py-20 sm:py-28">
        <Reveal>
          <div className="rule-signal flex items-baseline justify-between gap-6 pt-5">
            <p className="label text-muted-auto">
              <span className="numeral">07</span>
              <span className="mx-2 opacity-40">/</span>
              Contact
            </p>
            <p className="label text-signal">{site.availability}</p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h2 data-assemble="" className="display mt-10 text-[clamp(2.4rem,8vw,6rem)]">
            {site.contact.heading}
          </h2>
        </Reveal>

        <Reveal delay={140}>
          <span className="mt-10 inline-block" data-magnetic="0.25">
            <a
              href={`mailto:${site.email}`}
              className="link-ul inline-block text-[clamp(1.1rem,4vw,2.2rem)] break-all transition-colors hover:text-signal"
              data-cursor="Mail"
            >
              {site.email}
            </a>
          </span>
        </Reveal>

        <Reveal delay={200}>
          <p className="text-muted-auto mt-8 max-w-lg leading-relaxed">
            {site.contact.note}
          </p>
        </Reveal>

        <Reveal delay={260}>
          <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
            {CHANNELS.map((c) => (
              <div key={c.label} className="rule pt-4">
                <dt className="label text-muted-auto">{c.label}</dt>
                <dd className="mt-3">
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      c.href.startsWith("http")
                        ? "noreferrer noopener"
                        : undefined
                    }
                    className="link-ul text-sm break-all"
                  >
                    {c.value}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Colophon */}
        <Reveal delay={320}>
          <div className="rule mt-20 flex flex-wrap items-baseline justify-between gap-4 pt-6">
            <p className="label text-muted-auto">
              {site.fullName} · {site.location}
            </p>
            <p className="label numeral text-muted-auto">
              ©{site.year} · Built with Next.js
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
