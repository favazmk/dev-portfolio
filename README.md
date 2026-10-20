# Favaz MK — Portfolio

A portfolio set like a brand manual: near-black and paper, one grey, one red,
and type doing the work. Every section opens the same way — a hairline capped in
red, a two-digit number, a label — so a long page reads as chapters of one
document rather than a stack of designs.

The page declares its own shape up front: a numbered contents list, then
clients, then work split into the two halves of the practice, then the writing,
the archive and contact.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · GSAP
(ScrollTrigger, SplitText, ScrambleText) · Lenis · Three.js

## Motion

The motion is there to make the manual feel printed in front of you, not to
decorate it. GSAP, Lenis and Three.js are all imported on mount, so none of
them count toward first-load JS.

- **Hero** — a Three.js point field ([`HeroField`](components/HeroField.tsx))
  ripples behind the statement and warms to signal red under the pointer. The
  statement itself ([`HeroTitle`](components/HeroTitle.tsx)) rises in letter by
  letter, thins out near the cursor (Geist is a variable face) and its lines
  drift apart as you scroll away.
- **Kinetic type** — section titles rise out of masked lines, the content
  standfirst lights up word by word as you read, and the contact heading
  assembles itself from scattered letters.
- **Scroll** — Lenis drives GSAP's ticker so ScrollTrigger never lags the
  page. Hairlines draw in from the left, project images wipe up and parallax,
  stats count up, case-study covers settle from a slight zoom, and a red
  progress hairline runs under the nav.
- **Bands** — two oversized marquees
  ([`KineticMarquee`](components/KineticMarquee.tsx)) speed up with scroll
  velocity, reverse when you scroll back and lean into the motion. Their words
  are `site.kinetic` in the config.
- **Micro-interactions** — a red cursor disc that names the action ("View",
  "Mail", "Next"), magnetic buttons, nav labels that decode on hover, rows
  whose titles slide and images that zoom.

Almost all of it is driven from data attributes by one client component,
[`MotionLayer`](components/MotionLayer.tsx) — `data-split`, `data-scrub-words`,
`data-assemble`, `data-count`, `data-clip`, `data-parallax`, `data-zoom`,
`data-magnetic`, `data-scramble`, `data-cursor` — so sections stay server
components and adding motion to new markup is one attribute.

A tiny inline script in the layout adds `motion` to `<html>` before first
paint so elements can wait in their starting state without a flash. If the
motion layer hasn't started within four seconds it removes the class again
and the page renders static. Visitors with `prefers-reduced-motion` never get
the class: no smooth scrolling, no split text, no cursor, and the WebGL field
renders a single still frame.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Editing content — one file

Everything lives in [`config/site.ts`](config/site.ts):

- **`site`** — name, roles, location, the hero statement, the intro, the two
  disciplines, skills, stats, the writing practice and contact copy. `socials`
  entries that are empty strings are hidden automatically.
- **`site.index`** — the numbered contents list. Each entry's `href` must match
  a section `id` on the page.
- **`site.url`** — set this to the production domain after deploying. It feeds
  the sitemap, robots.txt, OG tags and JSON-LD.
- **`clients`** — the logo wall. `work: "build"` and `work: "brand"` split it
  into the two grids.
- **`projects`** — the case studies. Each has a `track` of `"systems"` or
  `"craft"`, which decides the gallery it appears in; every project gets a page
  at `/work/<slug>` automatically.
- **`archiveRepos`** — the "also shipped" table. The curated `title`, `note`,
  `live` and `language` always render; the GitHub API only adds star counts and
  fills in a missing language, so the table is complete even when the API is
  unreachable.

### Adding a project

Append an entry to `projects`. The `sections` array is the case study body —
each entry is a numbered section, and any section with a `points` array renders
a spec list beside the prose. Nothing else needs to change: the route, sitemap
entry and "next project" link all follow from the data.

### Images

Project art lives in `public/work/`. Set `image` to its path, or leave it an
empty string — projects with no interface to photograph (CLI tools, services)
render a typographic panel instead of a borrowed stock photo.

## Client logos

Marks live in `public/logos/` (`agency/` holds the brands the copy was written
for). They arrive from a dozen different brands in a dozen different palettes,
so **every file is stored as a white silhouette with an alpha channel**,
whatever colour the brand actually uses.

That one rule is what lets a mixed set read as a single designed wall:
[`LogoMark`](components/ui/LogoMark.tsx) uses the file as-is on ink and inverts
it to ink on paper. A brand whose mark we don't hold falls back to its name set
in the display face, which is a legitimate lockup here rather than a hole.

To add one: reduce it to white-on-transparent, trim the bounding box, cap the
long edge around 900px, drop it in `public/logos/`, and point a `clients` entry
at it.

Two shapes of mark need more than a straight alpha copy:

- **Letters knocked out of a solid badge** (The Leather Doctor, Zawaya) can't
  become a flat silhouette, so the badge stays the white shape and the letters
  are punched back out of it.
- **Two-colour marks whose colours carry the letterform separation** (Sam
  Fitness: a white *S* flush against a red *F*) fuse into one blob when
  flattened. There the colour boundary is converted into a 2px physical gap, so
  the separation survives the loss of colour.

A mark supplied only on a solid card (Imperial Star) is usually also published
on transparent somewhere in the same repo — prefer that file over keying the
card away.

## Customizing the look

- **Colour and type scale:** the `@theme` block at the top of
  [`app/globals.css`](app/globals.css). The whole system is `--color-ink`,
  `--color-paper`, `--color-mist`, `--color-line` and `--color-signal` — the red
  is an accent, never a surface.
- **Section rule:** `.rule-signal` is the hairline with the red cap that opens
  every section; `.rule` is the plain hairline used between rows.
- **Surfaces:** `.on-dark` flips a section to ink and re-points the muted text
  and border tokens, so the same markup works on either surface.
- **Fonts:** [`app/layout.tsx`](app/layout.tsx) — Geist for display, Geist Mono
  for labels and numerals, Inter for long-form reading.
- **Hairlines:** `.rule` and `.rule-signal` are painted with a background
  gradient sized by `--draw` (0 → 1), which is what lets them draw in.

## Accessibility & performance

- Fully static: 21 prerendered routes, ~124 kB first load JS (GSAP and
  Three.js load as separate chunks after hydration).
- `prefers-reduced-motion` disables smooth scrolling, kinetic type, the custom
  cursor and hover transforms, and renders every reveal in its final state.
- The WebGL field pauses while off screen or in a background tab, caps the
  pixel ratio, and the hero reads fine if WebGL is unavailable.
- Decoration is `aria-hidden`; project rows are a single link target; skip link
  to `#content`; no horizontal scroll at 390px.
- Images are `next/image` with explicit `sizes`.

## Deploying to Vercel

1. Push to GitHub.
2. [vercel.com/new](https://vercel.com/new) → import the repo → deploy.
3. Set `site.url` in `config/site.ts` to the final domain and redeploy.
