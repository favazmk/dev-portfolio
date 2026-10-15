import type { Metadata, Viewport } from "next";
import { Rubik_Mono_One, Caveat, Space_Mono, Inter } from "next/font/google";
import { site } from "@/config/site";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

/* Blocky poster display — the big ROBIN-style headlines */
const display = Rubik_Mono_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display-face",
  display: "swap",
});

/* Marker handwriting — annotations and the "what's up" note */
const hand = Caveat({
  subsets: ["latin"],
  variable: "--font-hand-face",
  display: "swap",
});

/* Tiny uppercase labels — nav, tabs, "VIEW PROJECT" */
const mono = Space_Mono({
  weight: ["400", "700"],
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
    "front-end developer",
    "Next.js developer",
    "React developer",
    "portfolio",
    "Dubai",
    "UAE",
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
  themeColor: "#f5f3ec",
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  url: site.url,
  address: { "@type": "PostalAddress", addressLocality: site.location },
  sameAs: Object.values(site.socials).filter(Boolean),
  knowsAbout: site.skills.map((s) => s.name),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${hand.variable} ${mono.variable} ${body.variable}`}
    >
      <body className="mat">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:border-2 focus:border-ink focus:bg-marker focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:font-bold"
        >
          Skip to content
        </a>
        <SmoothScroll />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
