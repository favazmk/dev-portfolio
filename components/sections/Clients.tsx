import { buildClients, brandClients, clients } from "@/config/site";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/ui/SectionHead";
import LogoMark from "@/components/ui/LogoMark";

function Wall({
  title,
  note,
  items,
}: {
  title: string;
  note: string;
  items: typeof buildClients;
}) {
  return (
    <div>
      <Reveal>
        <div className="rule flex items-baseline justify-between gap-6 pt-5">
          <p className="label">{title}</p>
          <p className="label numeral text-muted-auto">
            {String(items.length).padStart(2, "0")}
          </p>
        </div>
        <p className="text-muted-auto mt-4 max-w-xl text-sm leading-relaxed">
          {note}
        </p>
      </Reveal>

      <ul className="mt-8 grid grid-cols-2 gap-px bg-line-dark sm:grid-cols-3 lg:grid-cols-4">
        {items.map((c, i) => (
          <Reveal key={c.name} as="li" delay={Math.min(i, 8) * 40}>
            <div className="logo-cell h-full bg-ink">
              <LogoMark src={c.logo} name={c.name} onDark />
            </div>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}

/**
 * The client wall, on ink.
 *
 * Marks arrive from fifteen different brands in fifteen different palettes, so
 * they are normalised to white silhouettes before they get here — see
 * LogoMark. Set at low opacity and brought up on hover, which keeps the wall
 * quiet while still letting someone pick out a name they recognise.
 */
export default function Clients() {
  return (
    <section id="clients" className="on-dark scroll-mt-14">
      <div className="shell py-20 sm:py-28">
        <SectionHead
          n="02"
          label="Clients"
          title="Brands I've worked with."
          note="Clinics, freight, events, cafés, gyms, jewellers and retail — across the UAE and India. Some I built for, some I wrote for."
          count={`${clients.length} brands`}
        />

        <div className="mt-14 space-y-16 sm:mt-20 sm:space-y-20">
          <Wall
            title="Built & shipped"
            note="Sites and platforms I designed, built and deployed."
            items={buildClients}
          />
          <Wall
            title="Copy & content"
            note="Brands I wrote ad copy, posters and campaign messaging for."
            items={brandClients}
          />
        </div>
      </div>
    </section>
  );
}
