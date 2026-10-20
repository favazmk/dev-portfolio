import Image from "next/image";
import { site } from "@/config/site";
import Reveal from "@/components/Reveal";
import HeroField from "@/components/HeroField";
import HeroTitle from "@/components/HeroTitle";

/**
 * The cover. Ink field, the statement set as large as it will go, and the
 * practical facts — who, where, available — pinned along the bottom rule.
 * Behind it, a WebGL point field that ripples and warms under the pointer.
 */
export default function Hero() {
  return (
    <section className="on-dark relative overflow-hidden">
      <HeroField />
      <div className="shell relative flex min-h-[86vh] flex-col justify-between pt-16 pb-10 sm:pt-20 lg:min-h-[90vh]">
        {/* Top line: role, year */}
        <Reveal>
          <div className="rule-signal flex items-start justify-between gap-6 pt-5">
            <div>
              <p className="label text-muted-auto">{site.role}</p>
              <p className="label text-muted-auto mt-2">{site.secondRole}</p>
            </div>
            <p className="label numeral text-muted-auto shrink-0">
              ©{site.year}
            </p>
          </div>
        </Reveal>

        {/* The statement */}
        <div className="py-14 sm:py-16">
          <Reveal delay={80}>
            <p className="label text-signal mb-8">{site.availability}</p>
          </Reveal>

          <HeroTitle lines={site.statement} />

          <Reveal delay={400}>
            <p className="mt-10 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
              {site.tagline}
            </p>
          </Reveal>
        </div>

        {/* Bottom line: name, portrait, location */}
        <Reveal delay={480}>
          <div className="rule flex flex-wrap items-center gap-x-8 gap-y-5 pt-6">
            <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full grayscale">
              <Image
                src="/me/favaz.webp"
                alt={site.fullName}
                fill
                sizes="44px"
                className="object-cover"
              />
            </span>
            <div>
              <p className="label">{site.fullName}</p>
              <p className="label text-muted-auto mt-1.5">{site.location}</p>
            </div>
            <span className="ml-auto hidden sm:inline-block" data-magnetic="0.5">
              <a href="#index" className="label link-ul text-muted-auto inline-flex items-center gap-2">
                Contents <span className="scroll-cue" aria-hidden="true">↓</span>
              </a>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
