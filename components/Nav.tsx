"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/config/site";

const LINKS = [
  { href: "/#work", label: "WORK" },
  { href: "/#about", label: "ABOUT" },
  { href: "/#archive", label: "ARCHIVE" },
];

/**
 * Browser-chrome nav: traffic lights, pill tabs, contact button. Sticky at the
 * top of the sheet so it reads as the window the scrapbook lives in.
 */
export default function Nav() {
  const pathname = usePathname();
  const onCaseStudy = pathname?.startsWith("/work/");

  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-paper/95 backdrop-blur-sm">
      <nav
        aria-label="Primary"
        className="flex items-center gap-2 px-3 py-2 sm:gap-4 sm:px-5"
      >
        {/* Traffic lights */}
        <span aria-hidden="true" className="hidden items-center gap-1.5 sm:flex">
          <i className="block h-3 w-3 rounded-full border-[1.5px] border-ink bg-bubble" />
          <i className="block h-3 w-3 rounded-full border-[1.5px] border-ink bg-marker" />
          <i className="block h-3 w-3 rounded-full border-[1.5px] border-ink bg-grass" />
        </span>

        {onCaseStudy ? (
          <Link
            href="/"
            className="chip chip-sm bg-white font-mono transition-transform hover:-translate-y-0.5"
          >
            ← BACK
          </Link>
        ) : null}

        <ul className="flex items-center gap-1.5 sm:gap-2">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="chip chip-sm bg-white font-mono transition-transform hover:-translate-y-0.5 hover:bg-marker"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <span className="ml-auto flex items-center gap-2">
          <a
            href={site.socials.github}
            target="_blank"
            rel="noreferrer noopener"
            className="chip chip-sm bg-white font-mono transition-transform hover:-translate-y-0.5 hover:bg-sky hover:text-white"
          >
            GITHUB
          </a>
          <a
            href={`mailto:${site.email}`}
            className="chip chip-sm bg-ink font-mono text-paper transition-transform hover:-translate-y-0.5"
          >
            CONTACT
          </a>
        </span>
      </nav>
    </header>
  );
}
