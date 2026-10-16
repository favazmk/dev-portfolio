"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/config/site";

const LINKS = [
  { href: "/#clients", label: "Clients" },
  { href: "/#systems", label: "Work" },
  { href: "/#content", label: "Content" },
  { href: "/#archive", label: "Archive" },
];

/**
 * A single hairline rule carrying the wordmark, the sections and one contact
 * link. Sticky, because on a page this long the way back has to stay visible.
 */
export default function Nav() {
  const pathname = usePathname();
  const onCaseStudy = pathname?.startsWith("/work/");

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-md">
      <nav aria-label="Primary" className="shell flex h-14 items-center gap-6">
        <Link href="/" className="label shrink-0 tracking-[0.2em]">
          {onCaseStudy ? (
            <span className="inline-flex items-center gap-2">
              <span aria-hidden="true">←</span> {site.initials}
            </span>
          ) : (
            <span className="dot-signal">{site.initials}</span>
          )}
        </Link>

        <ul className="ml-auto hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="label link-ul text-muted-auto">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <a
          href={`mailto:${site.email}`}
          className="label ml-auto bg-ink px-4 py-2.5 text-paper transition-colors hover:bg-signal md:ml-0"
        >
          Contact
        </a>
      </nav>
    </header>
  );
}
