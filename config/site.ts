export interface FeaturedProject {
  /** Exact GitHub repo name (used to merge live API data) */
  repo: string;
  /** Display title */
  title: string;
  /** Curated description shown on the card */
  description: string;
  /** Live demo URL ("" hides the live link) */
  live: string;
  /** Fallback language if the GitHub API is unavailable */
  language: string;
}

export interface TimelineItem {
  period: string;
  title: string;
  text: string;
}

export const site = {
  name: "Favaz MK",
  initials: "FMK",
  role: "Full-Stack Web Developer",
  tagline:
    "I design and ship immersive, fast web products with TypeScript, React & Next.js.",
  email: "favazmk12@gmail.com",
  github: "favazmk",
  /** Change this to your production domain after deploying */
  url: "https://favazmk.vercel.app",

  socials: {
    github: "https://github.com/favazmk",
    /** Fill these in and they will appear automatically */
    linkedin: "",
    x: "",
  },

  bio: [
    "I'm Favaz — a full-stack web developer who turns ideas into fast, polished products on the web.",
    "From document tools and event platforms to logistics and branding sites, I own the whole journey: design, build, ship.",
    "My core stack is TypeScript, React and Next.js — with GSAP and Three.js for when a site needs to feel alive.",
  ],

  stats: [
    { value: 10, suffix: "+", label: "Projects shipped" },
    { value: 7, suffix: "", label: "Live products" },
    { value: 11, suffix: "", label: "Technologies" },
  ],

  skills: [
    "TypeScript",
    "JavaScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "HTML & CSS",
    "Node.js",
    "Git & GitHub",
    "Vercel",
    "GSAP",
    "Three.js",
  ],

  timeline: [
    {
      period: "2023",
      title: "Started building for the web",
      text: "Learned by shipping — HTML, CSS and JavaScript first, then TypeScript and React.",
    },
    {
      period: "2024 — 2025",
      title: "Client & product work",
      text: "Designed and delivered sites and apps end-to-end: branding, events, logistics and internal tools.",
    },
    {
      period: "Now",
      title: "Open to opportunities",
      text: "Building immersive web experiences and looking for my next big challenge.",
    },
  ] as TimelineItem[],

  /**
   * Curated project list — order here is display order.
   * Live GitHub data (language, topics, links) is merged in at build time.
   */
  featuredProjects: [
    {
      repo: "docmate-app",
      title: "DocMate",
      description:
        "A document management web app built with TypeScript and Next.js.",
      live: "https://docmate-app.vercel.app",
      language: "TypeScript",
    },
    {
      repo: "Micemedia",
      title: "Micemedia",
      description:
        "Event-management platform for a media agency — bookings, showcases and services.",
      live: "https://mice-media.vercel.app",
      language: "TypeScript",
    },
    {
      repo: "Netex-Freight",
      title: "Netex Freight",
      description:
        "Marketing and operations site for a freight & logistics company.",
      live: "https://favazmk.github.io/Netex-Freight/",
      language: "HTML",
    },
    {
      repo: "catalogue-generator",
      title: "Catalogue Generator",
      description:
        "Tool that turns product data into shareable, print-ready catalogues.",
      live: "https://catalogue-generator-a.vercel.app",
      language: "TypeScript",
    },
    {
      repo: "Attention-Reset",
      title: "Attention Reset",
      description: "A minimalist focus and attention-reset web app.",
      live: "https://attention-reset.vercel.app",
      language: "JavaScript",
    },
    {
      repo: "Web-Branding",
      title: "Web Branding",
      description: "Brand-identity and landing site for a creative studio.",
      live: "https://web-branding-three.vercel.app",
      language: "HTML",
    },
    {
      repo: "Bandhan",
      title: "Bandhan",
      description: "Client website built end-to-end and deployed on Vercel.",
      live: "https://bandhan-psi.vercel.app",
      language: "HTML",
    },
  ] as FeaturedProject[],
};
