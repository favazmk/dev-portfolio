# Favaz MK — Portfolio

A scrapbook-styled portfolio: the site sits on a sheet of ruled paper over a
cutting-mat grid, with taped photos, sticker chips and marker annotations.
Case studies switch to a second, editorial system — oversized type, numbered
sections and blueprint panels — so the work reads as substantial rather than
decorative.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Lenis

No 3D, no animation library. Scroll reveals are IntersectionObserver plus CSS
transitions; the only runtime dependency beyond React is Lenis, loaded
dynamically and skipped entirely for `prefers-reduced-motion`.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Editing content — one file

Everything lives in [`config/site.ts`](config/site.ts):

- **`site`** — name, role, location, the hero statement, the handwritten note,
  skills, stats and contact copy. `socials` entries that are empty strings are
  hidden automatically; fill one in and the link appears.
- **`site.url`** — set this to the production domain after deploying. It feeds
  the sitemap, robots.txt, OG tags and JSON-LD.
- **`projects`** — the case studies. Each has a `track` of `"systems"` or
  `"craft"`, which decides the gallery it appears in; every project gets a page
  at `/work/<slug>` automatically.
- **`archiveRepos`** — the "more work" grid. The curated `note`, `live` and
  `language` always render; the GitHub API only adds star counts and fills in a
  missing language, so the grid is complete even when the API is unreachable.

### Adding a project

Append an entry to `projects`. The `sections` array is the case study body —
each entry is a numbered section, and any section with a `points` array renders
on a blue blueprint panel instead of paper. Nothing else needs to change: the
route, sitemap entry and "next project" link all follow from the data.

### Images

Project art lives in `public/work/`. Set `image` to its path, or leave it as an
empty string — projects with no interface to photograph (CLI tools, services)
render a generated typographic panel instead of a borrowed stock photo.

## Customizing the look

- **Colors and paper:** the `@theme` block at the top of
  [`app/globals.css`](app/globals.css). `--color-paper`/`--color-ink` set the
  sheet, the sticker palette drives the chips and cards, and `--color-blueprint`
  / `--color-signal` are the case-study system.
- **Textures:** `.mat` is the cutting-mat backdrop, `.sheet` is the ruled paper.
- **Fonts:** swapped in [`app/layout.tsx`](app/layout.tsx) — a blocky display
  face, a marker hand, a mono for labels and a sans for long-form reading.

## Accessibility & performance

- Fully static: 14 prerendered routes, ~121 kB first load JS.
- `prefers-reduced-motion` disables smooth scrolling and renders every reveal in
  its final state.
- Decoration (tape, doodles, traffic lights) is `aria-hidden`; project cards are
  a single link target; skip link to `#content`.
- Images are `next/image` with explicit `sizes`.

## Deploying to Vercel

1. Push to GitHub.
2. [vercel.com/new](https://vercel.com/new) → import the repo → deploy.
3. Set `site.url` in `config/site.ts` to the final domain and redeploy.
