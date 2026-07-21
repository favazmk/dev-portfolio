# Favaz MK — 3D Portfolio

Immersive, scroll-driven developer portfolio. A continuous WebGL scene (morphing
blob + particle field) sits behind the page; scrolling drives the camera through
it while GSAP choreographs section reveals, a pinned horizontal project gallery,
and a self-drawing timeline. Mobile-first, with reduced 3D complexity on phones
and full `prefers-reduced-motion` support.

**Stack:** Next.js (App Router) · TypeScript · React Three Fiber + drei ·
GSAP ScrollTrigger · Lenis · Tailwind CSS v4

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Editing content — you only ever touch one file

All personal data lives in [`config/site.ts`](config/site.ts):

- **name / role / tagline / email** — hero, contact, and SEO metadata
- **socials** — LinkedIn and X are empty strings; fill them in and the links
  appear automatically in the contact section
- **bio / stats / skills / timeline** — the About, Skills, and Journey sections
- **featuredProjects** — the project gallery. Order here = display order.
  Each entry's `repo` must match the GitHub repo name; language, topics, and
  star counts are merged in from the GitHub API at build time (revalidated
  daily) and the site still renders fully if the API is unreachable.
- **url** — set this to your production domain after deploying (it feeds the
  sitemap, robots.txt, OG tags, and JSON-LD)

## Customizing the look

- **Colors:** edit the `@theme` block in [`app/globals.css`](app/globals.css)
  (`--color-accent`, `--color-accent2`, `--color-night`).
- **3D scene:** [`components/three/Scene.tsx`](components/three/Scene.tsx) —
  `PALETTE` is the per-section color journey, `CAM_STOPS` is the camera path
  keyframes, and the `Blob` / `Particles` / `Rings` components are the scene
  contents. Particle counts and geometry detail are already reduced on mobile.
- **Fonts:** swap `Space_Grotesk` / `Inter` in
  [`app/layout.tsx`](app/layout.tsx).

## Performance & accessibility notes

- WebGL is feature-detected; without it the site falls back to a static
  gradient backdrop.
- `prefers-reduced-motion` disables smooth scrolling, scene idle motion, and
  swaps reveals for static text.
- The custom cursor, magnetic buttons, card tilt, and pointer parallax only
  activate on `pointer: fine` devices.
- All split-text headings keep the intact string in `aria-label`; the skills
  cluster has an accessible list twin.

## Deploying to Vercel

1. Push this folder to a GitHub repo.
2. [vercel.com/new](https://vercel.com/new) → import the repo → deploy
   (zero config needed).
3. Set `url` in `config/site.ts` to the final domain and redeploy.
