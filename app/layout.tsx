import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { site } from "@/config/site";
import SmoothScroll from "@/components/SmoothScroll";
import MotionLayer from "@/components/MotionLayer";
import Cursor from "@/components/Cursor";
import "./globals.css";

/* Display — headlines and the big statement type */
const display = Geist({
  subsets: ["latin"],
  variable: "--font-display-face",
  display: "swap",
});

/* Labels, numerals and anything set in caps */
const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono-face",
  display: "swap",
});

/* Long-form reading — case study body copy */
const body = Inter({
  subsets: ["latin"],
  variable: "--font-body-face",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.tagline,
  keywords: [
    site.name,
    "web developer",
    "full-stack developer",
    "Next.js developer",
    "React developer",
    "content writer",
    "portfolio",
    "Dubai",
    "UAE",
    "Kerala",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
    url: site.url,
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0e0e0e",
  width: "device-width",
  initialScale: 1,
};

/**
 * Runs before first paint. Opts the page into motion (so CSS can hold
 * elements in their pre-animation state without a flash), unless the visitor
 * prefers reduced motion. If the motion layer hasn't started within four
 * seconds — script blocked, chunk failed — it hands the static page back.
 */
const motionBoot = `(function(){var d=document.documentElement;if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;d.classList.add("motion");setTimeout(function(){if(!d.hasAttribute("data-motion-ready"))d.classList.remove("motion")},4000)})();`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.fullName,
  alternateName: site.name,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  telephone: site.phone,
  url: site.url,
  address: { "@type": "PostalAddress", addressLocality: site.location },
  sameAs: Object.values(site.socials).filter(Boolean),
  knowsAbout: [...site.skills],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${mono.variable} ${body.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBoot }} />
      </head>
      <body>
        <a
          href="#content"
          className="label sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-ink focus:px-4 focus:py-3 focus:text-paper"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <MotionLayer />
        <Cursor />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
