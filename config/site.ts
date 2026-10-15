/* ============================================================================
 * SITE CONTENT
 * The only file you need to edit to change copy, add work, or reorder things.
 * ========================================================================= */

export type Tone =
  | "marker"
  | "sky"
  | "grass"
  | "bubble"
  | "tangerine"
  | "lilac"
  | "paper";

/** Which half of the portfolio a project belongs to. */
export type Track = "systems" | "craft";

export interface Fact {
  label: string;
  value: string;
}

export interface CaseSection {
  heading: string;
  body: string[];
  /** Rendered as a blueprint panel beside the prose */
  points?: string[];
}

export interface Project {
  slug: string;
  /** Exact GitHub repo name — merges live API data */
  repo: string;
  track: Track;
  title: string;
  client: string;
  /** One line on the card */
  summary: string;
  /** Standfirst at the top of the case study */
  standfirst: string;
  date: string;
  /** "" hides the live link */
  live: string;
  tone: Tone;
  /** Path under /public. Empty renders a generated typographic panel. */
  image: string;
  tags: string[];
  /** Fallback when the GitHub API is unreachable */
  language: string;
  /** Headline stack chips */
  stack: string[];
  facts: Fact[];
  sections: CaseSection[];
}

export const site = {
  name: "Favaz MK",
  firstName: "FAVAZ",
  initials: "FMK",
  role: "Full-Stack Web Developer",
  location: "Kerala, India",
  availability: "Open to new work and good problems",

  tagline:
    "I build web products that handle money, data and real customers — and look good doing it.",

  /** The big two-line hero statement */
  statement: ["I build software that", "gets out of your way."],

  email: "favazmk12@gmail.com",
  github: "favazmk",

  /** Set this to the production domain after deploying */
  url: "https://favazmk.vercel.app",

  socials: {
    github: "https://github.com/favazmk",
    /** Fill these in and the links appear automatically */
    linkedin: "",
    x: "",
    instagram: "",
  },

  heroTags: [
    { text: "SHIPS REAL PRODUCTS", tone: "grass" as Tone },
    { text: "SWEATS THE DETAILS", tone: "marker" as Tone },
  ],

  /** The handwritten "what's up" note */
  note: [
    "I'm a full-stack developer who gets a little too excited about making complicated things feel simple.",
    "Half my work is plumbing — payments, databases, admin panels, the stuff that has to be right or someone loses money. The other half is making a page feel like somewhere you want to be.",
    "Most of it is live client work that had to ship, not demos.",
  ],

  bio: "Full-stack developer building for businesses across the UAE and India — clinics, freight, events, cafes, retail. I take projects from an empty repo to a live product: schema, payments, admin tooling, and the front end people actually see.",

  /** Two-track framing used on the work section */
  tracks: {
    systems: {
      label: "SYSTEMS",
      title: "THINGS THAT RUN",
      note: "Payments, databases, admin panels, live tracking. Work where being wrong has consequences.",
    },
    craft: {
      label: "CRAFT",
      title: "THINGS THAT LAND",
      note: "Brand sites where the job is to make someone feel something in the first three seconds.",
    },
  },

  skills: [
    { name: "TypeScript", tone: "sky" as Tone },
    { name: "Next.js", tone: "marker" as Tone },
    { name: "React", tone: "grass" as Tone },
    { name: "Node & Express", tone: "bubble" as Tone },
    { name: "Prisma / SQL", tone: "lilac" as Tone },
    { name: "Stripe & Razorpay", tone: "tangerine" as Tone },
    { name: "Firebase", tone: "sky" as Tone },
    { name: "GSAP", tone: "grass" as Tone },
    { name: "Astro", tone: "marker" as Tone },
    { name: "Tailwind CSS", tone: "bubble" as Tone },
  ],

  stats: [
    { value: "22", label: "Repos shipped" },
    { value: "15", label: "Live deployments" },
    { value: "7", label: "Industries" },
  ],

  clients: [
    "DocMate",
    "Pandur",
    "MENAARC",
    "Safeway",
    "Rashid Ali",
    "Flyzone",
    "Imperial Star",
  ],

  contact: {
    heading: "LET'S TALK",
    note: "Got a project, a hard problem, or just want to say hi? Send it over. I read every message.",
  },
} as const;

/* ---------------------------------------------------------------------------
 * PROJECTS
 * `track` decides which gallery a project appears in. Every project here gets
 * a case study at /work/<slug>.
 * ------------------------------------------------------------------------ */
export const projects: Project[] = [
  /* ===================== SYSTEMS ===================== */
  {
    slug: "docmate",
    repo: "docmate-app",
    track: "systems",
    title: "DocMate",
    client: "docmate.ae — UAE",
    summary:
      "Doctor booking platform across Dubai, Sharjah and Ajman. Hospital networks, specialties, appointment requests and an admin panel on live data.",
    standfirst:
      "Patients search for specialists across three emirates and request an appointment. A coordinator calls back to confirm. The platform books requests, not slots — and that one decision shaped the whole system.",
    date: "OCT 2026",
    live: "https://docmate.ae",
    tone: "sky",
    image: "/work/docmate.webp",
    tags: ["Full-stack", "Healthcare"],
    language: "TypeScript",
    stack: ["Next.js 14", "MySQL", "Prisma 6", "NextAuth"],
    facts: [
      { label: "Role", value: "Design, build, deploy" },
      { label: "Database", value: "MySQL / MariaDB" },
      { label: "Auth", value: "NextAuth v4 (JWT)" },
      { label: "Hosting", value: "Hostinger, Node 22" },
    ],
    sections: [
      {
        heading: "Booking a real slot is a promise you can't keep.",
        body: [
          "The obvious build is a calendar: show the doctor's free slots, let the patient take one, send a confirmation. It demos beautifully and breaks on contact with how clinics actually run — a consultant overruns, an emergency lands, the receptionist moves three people, and now the website has told four patients something that isn't true.",
          "So DocMate books an appointment *request*. The patient picks a doctor and a preferred window, a coordinator calls back and confirms the real time. The site never makes a promise the clinic hasn't agreed to.",
        ],
      },
      {
        heading: "A schema that matches how hospitals are organised.",
        body: [
          "UAE healthcare runs in groups: a hospital brand owns several branches, each branch staffs doctors, each doctor holds specialties. Flattening that into 'doctors with an address' makes search wrong the moment a consultant works at two branches.",
          "The data model mirrors the real hierarchy, so a doctor can appear under every branch they work at without duplicating the record.",
        ],
        points: [
          "HospitalGroup → Clinic → Doctor → Appointment",
          "Specialty as a join, not a string on the doctor",
          "Reviews attached to doctors, moderated in admin",
          "Prebuilt search index endpoint for fast lookup",
        ],
      },
      {
        heading: "One database, no staging, so the admin panel had to be safe.",
        body: [
          "The admin panel edits production data directly — there is one database and no staging environment. That's a constraint, not an ideal, and it changes how you build: destructive actions confirm, writes are scoped by role, and uploads land behind an authenticated route rather than a public bucket.",
          "Auth is NextAuth with JWT sessions and bcrypt-hashed credentials. Appointment notifications go out over SMTP with Nodemailer.",
        ],
      },
      {
        heading: "What shipped.",
        body: [
          "A live platform at docmate.ae, deploying on every push to master, that clinic staff run day to day without a developer in the loop.",
        ],
      },
    ],
  },
  {
    slug: "zevaa-commerce",
    repo: "zevaa-ecommerce",
    track: "systems",
    title: "Zevaa Commerce Engine",
    client: "Multi-client agency template",
    summary:
      "A reusable commerce engine. Client stores are created from it and customised through config and a theme layer — never by editing the core.",
    standfirst:
      "Every agency ends up with six nearly identical e-commerce codebases and no way to fix a bug once. This is the attempt to not do that.",
    date: "OCT 2026",
    live: "",
    tone: "lilac",
    image: "/work/zevaa.webp",
    tags: ["Architecture", "E-commerce"],
    language: "TypeScript",
    stack: ["Next.js 15", "MySQL / Supabase", "Razorpay", "Zod"],
    facts: [
      { label: "Role", value: "Architect & author" },
      { label: "Pattern", value: "Core / theme / providers" },
      { label: "Payments", value: "Razorpay" },
      { label: "Data", value: "MySQL or Supabase" },
    ],
    sections: [
      {
        heading: "The copy-paste store problem.",
        body: [
          "Build three client stores by forking the last one and you now maintain three divergent codebases. A tax bug fixed in one never reaches the others. Six months later nobody remembers which fork has the good checkout.",
          "The fix is boring and structural: make the commerce logic a core that clients cannot edit, and push everything client-specific into configuration and a theme layer.",
        ],
      },
      {
        heading: "Four layers, enforced.",
        body: [
          "The repository is the master template. Client stores are generated from it, and the rules that keep it generic are written down so future work doesn't quietly erode the boundary.",
        ],
        points: [
          "Commerce Core — orders, inventory, cart maths, tax, shipping, coupons",
          "Theme — branding, tokens, layouts, product card variants",
          "Providers — payment and email behind stable interfaces",
          "Repositories — data access behind interfaces, no queries in UI",
        ],
      },
      {
        heading: "The admin surface is the actual product.",
        body: [
          "Storefronts are the easy half. What makes a store usable by a client is the back office: bulk product edits, CSV import and export with a downloadable template, inventory, order history, moderated reviews, media, settings and sales charts.",
          "Swapping the database between self-hosted MySQL and Supabase is a provider change, not a rewrite — because data access sits behind repository interfaces rather than being sprinkled through components.",
        ],
      },
    ],
  },
  {
    slug: "imperial-star",
    repo: "imperial-star-events",
    track: "systems",
    title: "Imperial Star Events",
    client: "Events & ticketing",
    summary:
      "Event ticketing with Stripe checkout, signed webhooks and QR-coded tickets issued on confirmed payment.",
    standfirst:
      "Taking money is easy. Taking money reliably — so every paid ticket exists and no unpaid one does — is the whole job.",
    date: "OCT 2026",
    live: "https://imperial-star-events.vercel.app",
    tone: "tangerine",
    image: "/work/imperial-star.webp",
    tags: ["Payments", "Ticketing"],
    language: "TypeScript",
    stack: ["Next.js", "Stripe", "QR", "Framer Motion"],
    facts: [
      { label: "Role", value: "Design & build" },
      { label: "Payments", value: "Stripe Checkout" },
      { label: "Fulfilment", value: "Webhook-driven" },
      { label: "Ticket", value: "Generated QR code" },
    ],
    sections: [
      {
        heading: "Never issue a ticket from the browser.",
        body: [
          "The tempting shortcut is to generate the ticket when the customer lands on the success page. It works right up until someone closes the tab during redirect, or opens the success URL directly, and now you've either lost a paying customer's ticket or minted a free one.",
          "So the browser never issues anything. Checkout hands off to Stripe, and the ticket is created only when Stripe's webhook confirms the payment — server to server, signature verified.",
        ],
        points: [
          "/api/checkout creates the Stripe session",
          "/api/stripe/webhook verifies the signature and fulfils",
          "QR ticket generated only on confirmed payment",
          "Closing the tab mid-redirect still delivers the ticket",
        ],
      },
      {
        heading: "The front of house still has to sell.",
        body: [
          "An events company is selling an atmosphere, so the marketing side carries real imagery and motion — Framer Motion transitions, scroll-driven reveals — while the money path underneath stays strict and boring.",
        ],
      },
    ],
  },
  {
    slug: "attention-reset",
    repo: "Attention-Reset",
    track: "systems",
    title: "Attention Reset",
    client: "Direct-to-consumer product",
    summary:
      "A paid digital product with Razorpay checkout, Firebase auth, and Meta pixel tracking that dedupes browser and server events.",
    standfirst:
      "A product that sells directly to consumers lives or dies on whether its ad tracking tells the truth. Most implementations quietly lie.",
    date: "SEP 2026",
    live: "https://attention-reset.vercel.app",
    tone: "bubble",
    image: "/work/attention-reset.png",
    tags: ["Payments", "Analytics"],
    language: "JavaScript",
    stack: ["React", "Firebase", "Razorpay", "Meta CAPI"],
    facts: [
      { label: "Role", value: "Build" },
      { label: "Payments", value: "Razorpay" },
      { label: "Auth", value: "Firebase" },
      { label: "Tracking", value: "Pixel + Conversions API" },
    ],
    sections: [
      {
        heading: "Browser tracking is blocked. Server tracking is blind.",
        body: [
          "The Meta pixel in the browser carries the richest context — but ad blockers, Safari's protections and plain network failures mean a large share of real traffic never reports. Server-side events always arrive, but know less.",
          "Sending both is the answer, and the trap: do it naively and Meta counts every conversion twice, your cost-per-acquisition looks half what it is, and you scale spend on a number that isn't real.",
        ],
      },
      {
        heading: "Fire both, share an event ID, let Meta collapse them.",
        body: [
          "Every event is issued once with a single generated event ID, then sent from both the browser and the server carrying that same ID. Whichever copy arrives — or both — Meta deduplicates to exactly one event.",
        ],
        points: [
          "One event ID generated per event, shared by both copies",
          "Browser copy carries full context, server copy always lands",
          "Purchase is excluded from the shared helper on purpose",
          "Purchase fires only after Razorpay confirms the money server-side",
        ],
      },
      {
        heading: "A conversion can never be reported for a payment that didn't happen.",
        body: [
          "Purchase is deliberately handled outside the general tracking path: the browser fires at the moment of success, and the server fires only after payment verification confirms Razorpay actually took the money. Optimistic conversion reporting is how ad accounts learn the wrong thing.",
        ],
      },
    ],
  },
  {
    slug: "netex-freight",
    repo: "Netex-Freight",
    track: "systems",
    title: "Netex Freight",
    client: "Netex Freight FZE LLC — Dubai",
    summary:
      "Carrier network hub with real-time cargo tracking on Firestore, an interactive route map and a secure dispatch portal.",
    standfirst:
      "A freight customer has exactly one question: where is my container. Everything else on the site is secondary to answering it.",
    date: "AUG 2026",
    live: "https://favazmk.github.io/Netex-Freight/",
    tone: "grass",
    image: "/work/netex.webp",
    tags: ["Real-time", "Logistics"],
    language: "JavaScript",
    stack: ["Firebase Firestore", "Vanilla SPA", "Admin portal"],
    facts: [
      { label: "Role", value: "Design & build" },
      { label: "Data", value: "Firebase Firestore" },
      { label: "Admin", value: "Dispatch management" },
      { label: "Build", value: "No framework" },
    ],
    sections: [
      {
        heading: "Tracking is the product; the brochure is the wrapper.",
        body: [
          "Netex operates sea, air and land corridors out of Dubai. Customers arrive with a reference number, not an interest in the company's values — so tracking is reachable immediately and reads clearly on a phone in a yard.",
          "Shipment state lives in Firestore, so a status pushed by dispatch appears on the customer's screen without a refresh.",
        ],
        points: [
          "Firestore subscriptions for live shipment status",
          "Secure admin portal for dispatch to update consignments",
          "Interactive global route mapping",
          "Multi-page SPA, hand-written, no framework",
        ],
      },
      {
        heading: "Hand-written, because the dependency budget was zero.",
        body: [
          "The whole thing is plain JavaScript against the Firestore SDK. For a site this size a framework would have added build complexity and bundle weight without removing a single real problem.",
        ],
      },
    ],
  },
  {
    slug: "review-collector",
    repo: "review-collector",
    track: "systems",
    title: "Review Collector",
    client: "The Web Branding",
    summary:
      "Collects a customer's review on your own page, then hands them to Google with their text already on the clipboard.",
    standfirst:
      "The feature everyone asks for — 'just post the review to Google for them' — is impossible. This is the honest version of it.",
    date: "AUG 2026",
    live: "https://review-collector-eosin.vercel.app",
    tone: "marker",
    image: "",
    tags: ["Product", "Node"],
    language: "JavaScript",
    stack: ["Node", "Express", "Postgres"],
    facts: [
      { label: "Role", value: "Build" },
      { label: "Stack", value: "Node + Express + Postgres" },
      { label: "Build step", value: "None" },
      { label: "Hosting", value: "Vercel" },
    ],
    sections: [
      {
        heading: "Read the terms before building the feature.",
        body: [
          "The brief was to let a business collect reviews and publish them to Google automatically. There is no API that creates a Google review, and Google's review form cannot be pre-filled. The Business Profile API reads reviews; it does not write them.",
          "Building it anyway means either a scraper that breaks and risks the client's listing, or a feature that silently doesn't work. Both are worse than saying so up front.",
        ],
      },
      {
        heading: "Remove the friction you're actually allowed to remove.",
        body: [
          "The real obstacle isn't the click through to Google — it's the blank box. People agree to leave a review and then don't know what to write.",
          "So the customer writes their review on the business's own page, where it can be captured and kept. Then they're handed to Google with their own text already on their clipboard: one paste, one submit. Nothing is faked, no terms are bent, and the business keeps a copy either way.",
        ],
        points: [
          "Review captured and stored before the hand-off",
          "Customer's own words placed on their clipboard",
          "No scraping, no impersonation, no pre-filled Google form",
          "Node + Express + Postgres, no build step, no framework",
        ],
      },
    ],
  },
  {
    slug: "catalogue-generator",
    repo: "catalogue-generator",
    track: "systems",
    title: "Catalogue Generator",
    client: "Internal tool",
    summary:
      "Drop in a spreadsheet of products, get back a print-ready PDF catalogue — generated in the browser.",
    standfirst:
      "A sales team was rebuilding the same PDF catalogue by hand in a design tool every time a price changed.",
    date: "JUN 2026",
    live: "https://catalogue-generator-a.vercel.app",
    tone: "sky",
    image: "",
    tags: ["Tooling", "PDF"],
    language: "TypeScript",
    stack: ["React", "@react-pdf/renderer", "SheetJS"],
    facts: [
      { label: "Role", value: "Build" },
      { label: "Input", value: "CSV / XLSX" },
      { label: "Output", value: "Print-ready PDF" },
      { label: "Server", value: "None — all client-side" },
    ],
    sections: [
      {
        heading: "The spreadsheet is already the source of truth.",
        body: [
          "Product data lived in a spreadsheet and the catalogue lived in a design file, so every price change meant somebody manually retyping rows into layouts and re-exporting. Slow, and reliably wrong by a few rows.",
          "The tool takes the spreadsheet as the input it already is: drag in a CSV or Excel export, get a laid-out PDF back.",
        ],
        points: [
          "Drag-and-drop CSV or XLSX parsing",
          "PDF composed with @react-pdf/renderer",
          "Runs entirely in the browser — no upload, no server",
          "Product data never leaves the user's machine",
        ],
      },
      {
        heading: "No server, on purpose.",
        body: [
          "Generating PDFs in the browser removes the entire question of where customer pricing data is stored and who can reach it. Nothing is uploaded, so there is nothing to secure, bill for, or leak.",
        ],
      },
    ],
  },

  /* ===================== CRAFT ===================== */
  {
    slug: "pandur",
    repo: "pandur-website",
    track: "craft",
    title: "Pandur",
    client: "Royal Quality Bakes LLC — Khorfakkan, UAE",
    summary:
      "Editorial brand site for a premium cookie label, telling 45 years of heritage through scroll-driven storytelling.",
    standfirst:
      "A 45-year-old bakery with international ambitions and a brand that had never been told properly online.",
    date: "SEP 2026",
    live: "https://pandur-website.vercel.app",
    tone: "tangerine",
    image: "/work/pandur.webp",
    tags: ["Brand site", "Editorial"],
    language: "TypeScript",
    stack: ["Next.js 16", "Framer Motion", "Lenis", "Tailwind v4"],
    facts: [
      { label: "Role", value: "Design & build" },
      { label: "Motion", value: "Framer Motion" },
      { label: "Rendering", value: "Fully static" },
      { label: "Palette", value: "Ink, cream, deep red" },
    ],
    sections: [
      {
        heading: "Heritage is a story, not a paragraph in an About page.",
        body: [
          "Pandur is the signature cookie brand of Royal Quality Bakes in Khorfakkan. The thing worth selling is 45 years of manufacturing and a serious growth plan — neither of which survives being compressed into a company-history blurb nobody scrolls to.",
          "So the heritage became the spine of the page: scroll-driven sequences map the company's growth from the UAE outward, and the manufacturing process is shown as a pipeline rather than described.",
        ],
      },
      {
        heading: "Typography-led, with stark contrast.",
        body: [
          "The design system is editorial — ink, cream and a deep red, type doing the heavy lifting, sophisticated grid work rather than decoration. Premium in this category means restraint, not gloss.",
        ],
        points: [
          "Staggered text reveals with Framer Motion",
          "Lenis-smoothed scroll driving the heritage sequence",
          "translate3d for GPU-accelerated animation",
          "Fluid type scaling across every breakpoint",
        ],
      },
      {
        heading: "Static, accessible, and honest about motion.",
        body: [
          "The whole site prerenders statically, which keeps it fast and sidesteps hydration mismatch entirely. Every animation respects prefers-reduced-motion, so the story still reads with motion turned off.",
        ],
      },
    ],
  },
  {
    slug: "menaarc",
    repo: "menaarc",
    track: "craft",
    title: "MENAARC",
    client: "MENAARC Architectural Consultants — Dubai",
    summary:
      "Practice site for an architecture consultancy: scroll film hero, mapped project locations, and a grid that stays out of the way.",
    standfirst:
      "Architects are judged on their drawings. The site's only job is to present them at a size where the detail survives.",
    date: "OCT 2026",
    live: "https://menaarc-ten.vercel.app",
    tone: "sky",
    image: "/work/menaarc.webp",
    tags: ["Corporate", "Editorial"],
    language: "TypeScript",
    stack: ["Next.js 16", "GSAP ScrollTrigger", "MapLibre", "Lenis"],
    facts: [
      { label: "Role", value: "Design & build" },
      { label: "Motion", value: "GSAP ScrollTrigger" },
      { label: "Maps", value: "MapLibre GL" },
      { label: "Hero", value: "Scrubbed film sequence" },
    ],
    sections: [
      {
        heading: "The work is the argument.",
        body: [
          "A consultancy sells judgement, and judgement is demonstrated by showing projects properly. That meant generous margins, one typeface working hard across several sizes, and images allowed to run large — no carousel fighting the plans for attention.",
        ],
      },
      {
        heading: "Scroll film and a real map.",
        body: [
          "The hero scrubs a film sequence frame by frame as you scroll, so the page opens with movement and weight. Project locations render on a MapLibre map rather than a static image, so the practice's geographic spread is something you can read at a glance.",
        ],
        points: [
          "GSAP ScrollTrigger driving the frame sequence",
          "MapLibre GL for project locations",
          "Typographic scale tuned for long project names",
          "Structure holds whether a project has 2 images or 20",
        ],
      },
    ],
  },
  {
    slug: "rashid-ali-cafe",
    repo: "rashidali-cafe",
    track: "craft",
    title: "Rashid Ali Cafeteria",
    client: "Rashid Ali Hassan Cafeteria — UAE",
    summary:
      "Light-theme rebuild of a 35-branch cafeteria chain, moving off WordPress to a static Astro build.",
    standfirst:
      "Thirty-five branches, a full menu, and a WordPress install carrying years of plugin weight.",
    date: "OCT 2026",
    live: "https://rashidali-cafe.vercel.app",
    tone: "marker",
    image: "/work/rashidali.jpg",
    tags: ["Rebuild", "Multi-location"],
    language: "Astro",
    stack: ["Astro", "GSAP", "Lenis", "Static output"],
    facts: [
      { label: "Role", value: "Rebuild & design" },
      { label: "Branches", value: "35" },
      { label: "Output", value: "Fully static" },
      { label: "From", value: "WordPress" },
    ],
    sections: [
      {
        heading: "A menu and 35 branches are structured data, not pages.",
        body: [
          "The previous WordPress build treated every branch and menu item as hand-maintained content, which is how a site ends up with a branch that closed two years ago still listed.",
          "In the rebuild, menu items, branches and reviews are typed data files. Adding a branch is one entry; the location list, the map links and the search queries all follow from it.",
        ],
        points: [
          "Menu items, prices, tags and descriptions as data",
          "35 branches with addresses and Maps links from one source",
          "Existing Google reviews carried across word for word",
          "Background-removed food cutouts, served as WebP",
        ],
      },
      {
        heading: "Astro, because almost none of it needs JavaScript.",
        body: [
          "A menu site is content. Astro ships static HTML with JavaScript only where motion actually runs, so the pages are fast on the mid-range phones most customers are holding — and the whole thing deploys to any static host.",
        ],
      },
    ],
  },
  {
    slug: "safeway-switchgears",
    repo: "safeway-switchgears",
    track: "craft",
    title: "Safeway Switchgears",
    client: "Safeway Electric Switchgear Trading LLC",
    summary:
      "Five-page corporate site for an electrical switchgear trader, exported as plain static HTML with a scroll-film hero.",
    standfirst:
      "B2B buyers arrive with a part number and a deadline. Everything between them and an answer is friction.",
    date: "OCT 2026",
    live: "https://safeway-switchgears.vercel.app",
    tone: "marker",
    image: "/work/safeway.jpg",
    tags: ["Corporate", "Static"],
    language: "TypeScript",
    stack: ["Next.js 16", "Tailwind v4", "GSAP", "Static export"],
    facts: [
      { label: "Role", value: "Design & build" },
      { label: "Pages", value: "5" },
      { label: "Output", value: "Static HTML/CSS/JS" },
      { label: "Server", value: "None needed" },
    ],
    sections: [
      {
        heading: "Flat structure for people in a hurry.",
        body: [
          "Switchgear buyers want to know whether you carry a thing and how fast they can reach you. Five pages — Home, About, Solutions, Products, Contact — with products and contact reachable from anywhere, and phone and email never more than a tap away.",
        ],
      },
      {
        heading: "Static export, because nothing here needs a server.",
        body: [
          "The content changes a few times a year, so the site builds to plain HTML, CSS and JavaScript and uploads anywhere — Hostinger, cPanel, Netlify, S3. No Node runtime, nothing to patch, nothing to go down at 2am.",
          "The home hero still plays a film frame by frame as you scroll, with a still poster standing in until the footage lands.",
        ],
        points: [
          "next build → ./out, uploadable to any host",
          "Scroll-scrubbed hero film with poster fallback",
          "Product categories structured for search",
          "Contact details marked up for rich results",
        ],
      },
    ],
  },
  {
    slug: "flyzone-freight",
    repo: "flyzone-freights",
    track: "craft",
    title: "Flyzone Freight",
    client: "Fly Zone Freight — Deira, Dubai",
    summary:
      "Five-page freight site with a d3-geo routes globe and a canvas hero that scrubs from a cargo hold to a container port.",
    standfirst:
      "Logistics sites all look the same because they all use the same stock container photo. This one animates the journey instead.",
    date: "OCT 2026",
    live: "https://flyzone-freights.vercel.app",
    tone: "sky",
    image: "/work/flyzone.jpg",
    tags: ["Marketing site", "Motion"],
    language: "JavaScript",
    stack: ["Vite", "GSAP", "d3-geo", "Lenis"],
    facts: [
      { label: "Role", value: "Design & build" },
      { label: "Pages", value: "5" },
      { label: "Globe", value: "d3-geo + world-atlas" },
      { label: "Hero", value: "Canvas frame sequence" },
    ],
    sections: [
      {
        heading: "Show the route, don't describe it.",
        body: [
          "The home hero scrubs a frame sequence on a canvas as you scroll — out of a cargo hold, through the clouds, down to a container port. Desktop and portrait phones get separately generated sequences, so a phone held upright gets a native 9:16 shot instead of a letterboxed widescreen crop.",
          "Trade corridors render on a d3-geo globe built from world-atlas topology, so the route network is drawn from real geography rather than illustrated.",
        ],
        points: [
          "Canvas frame sequence, separate desktop and mobile sets",
          "d3-geo + topojson routes globe",
          "GSAP ScrollTrigger for every scroll animation",
          "Loader runs once per session, on the home page only",
        ],
      },
      {
        heading: "A static build with shared partials.",
        body: [
          "Five pages share a header and footer through Vite config injection rather than a framework — markers in each page are replaced at build time. The output is static files that upload anywhere.",
        ],
      },
    ],
  },
  {
    slug: "web-branding",
    repo: "Web-Branding",
    track: "craft",
    title: "The Web Branding",
    client: "Creative agency — brand & web",
    summary:
      "Agency site covering brand identity, web development, SEO and motion — with before/after work and a full team section.",
    standfirst:
      "An agency site has a harder brief than its clients' sites: it is the proof.",
    date: "OCT 2026",
    live: "https://web-branding-three.vercel.app",
    tone: "bubble",
    image: "/work/web-branding.webp",
    tags: ["Agency", "Brand"],
    language: "HTML",
    stack: ["Static", "Video", "Before/after"],
    facts: [
      { label: "Role", value: "Build" },
      { label: "Services", value: "Brand, web, SEO, motion" },
      { label: "Media", value: "Video + stills" },
      { label: "Sections", value: "Work, team, services" },
    ],
    sections: [
      {
        heading: "Show the delta, not just the finish.",
        body: [
          "Rebrand work is easy to under-sell with a gallery of polished finals — pretty, but it doesn't prove anything happened. The work section pairs before and after states so the improvement is the thing you look at.",
          "Case media runs as short looping video where motion is the point and as stills everywhere else, so the page stays light.",
        ],
      },
      {
        heading: "Services pages that answer the pricing question early.",
        body: [
          "Separate pages for web development and digital marketing let each service make its own argument, rather than compressing everything into one scroll that serves nobody.",
        ],
      },
    ],
  },
];

/* ---------------------------------------------------------------------------
 * ARCHIVE — the "more work" grid. The curated note and live URL here are
 * always rendered; language and star counts are merged in from the GitHub API
 * at build time when it is reachable.
 * ------------------------------------------------------------------------ */
export interface ArchiveEntry {
  repo: string;
  note: string;
  live: string;
  language: string;
  /** Optional thumbnail under /public. Cards without one stay text-only. */
  image?: string;
}

export const archiveRepos: ArchiveEntry[] = [
  {
    repo: "todaysfit-gym",
    note: "Five-page commercial site for a Bur Dubai gym.",
    live: "https://todaysfitgym.vercel.app",
    language: "HTML",
  },
  {
    repo: "sam-fitness",
    note: "Dubai gym site with a scroll-scrubbed hero frame sequence.",
    live: "https://sam-fitness-delta.vercel.app",
    language: "JavaScript",
    image: "/work/sam-fitness.webp",
  },
  {
    repo: "Micemedia",
    note: "Event-management platform — bookings, showcases, services.",
    live: "https://mice-media.vercel.app",
    language: "TypeScript",
    image: "/work/micemedia.webp",
  },
  {
    repo: "e-commerce-template",
    note: "Agency storefront template the commerce engine grew out of.",
    live: "https://agency-ecommerce.vercel.app",
    language: "TypeScript",
  },
  {
    repo: "Shaista-Real-estate-portfolio-",
    note: "Personal portfolio for a real-estate consultant.",
    live: "https://shaista-portfolio-gold.vercel.app",
    language: "JavaScript",
    image: "/work/shaista.webp",
  },
  {
    repo: "hashir-nisam-portfolio",
    note: "Personal site for a Dubai marketing consultant.",
    live: "",
    language: "TypeScript",
  },
  {
    repo: "gala-it-care",
    note: "Marketing site for an IT services company.",
    live: "https://gala-it-care.vercel.app",
    language: "HTML",
  },
  {
    repo: "Bandhan",
    note: "Client site built end to end and deployed.",
    live: "https://bandhan-psi.vercel.app",
    language: "HTML",
    image: "/work/bandhan.webp",
  },
  {
    repo: "Mujeeb-Perfumes",
    note: "Brand site for a perfume retailer.",
    live: "",
    language: "TypeScript",
  },
  {
    repo: "openwear",
    note: "Wearable telemetry hub unifying Apple Health, Google Fit, Strava, Garmin and BLE.",
    live: "",
    language: "JavaScript",
  },
  {
    repo: "core-habit-lab",
    note: "Habit-tracking experiment.",
    live: "",
    language: "TypeScript",
  },
  {
    repo: "WB-Clients-List",
    note: "Internal client-tracking tool in Python.",
    live: "https://wb-clients-list.vercel.app",
    language: "Python",
  },
];

export const systemsProjects = projects.filter((p) => p.track === "systems");
export const craftProjects = projects.filter((p) => p.track === "craft");

export function projectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
