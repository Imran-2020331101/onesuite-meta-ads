# OneSuite — Meta Ads Landing Page

An [Astro](https://astro.build) static site containing a single paid-traffic landing page for **OneSuite**, built for Facebook/Meta ad campaigns.

## Where the real page lives

The site has one real page: **[`src/pages/meta-sales-page.astro`](src/pages/meta-sales-page.astro)**.

- `/` redirects straight to `/meta-sales-page` (configured in [`astro.config.mjs`](astro.config.mjs)) — there is no separate homepage.
- The page is deliberately marked `noindex` (see the `noindex` prop passed to `LandingLayout` in `meta-sales-page.astro`) because its copy overlaps other pages on the main `onesuite.io` site. Flip that prop to `false` if this page is ever meant to be indexed on its own.
- It's English-only by design, not part of any localized routing.

## Project structure

```text
src/
├── pages/
│   └── meta-sales-page.astro       # the actual landing page
├── layouts/
│   └── LandingLayout.astro         # slim header + footer chrome (no mega-menu)
├── components/
│   ├── facebook-ads/               # sections specific to this landing page
│   └── homepage/                   # shared sections reused from the main site
└── styles/
    └── global.css                  # design tokens (colors, radius, shadow) + base reset
public/
└── images/hero/                    # hero screenshots + floating UI cards
```

## Commands

All commands run from the project root:

| Command | Action |
| :--- | :--- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the local dev server at `localhost:4321` |
| `npm run build` | Build the production site to `./dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run astro ...` | Run any Astro CLI command (e.g. `astro check`) |

See [AGENTS.md](AGENTS.md) for the convention used when starting the dev server in an agent/background context (`astro dev --background`).

## Project docs

This repo also carries a few working documents alongside the code:

- **[AUDIT_REPORT.md](AUDIT_REPORT.md)** — a full functionality/SEO/performance/accessibility/compliance audit of the page.
- **[ISSUE_LOG.md](ISSUE_LOG.md)** — tracked defects from that audit, with severity and status.
- **[SUGGESTION_LOG.md](SUGGESTION_LOG.md)** — non-defect improvement ideas.
- **[CONTENT_README.md](CONTENT_README.md)** — a living, section-by-section log of the page's current copy, layout, design, and animations. Keep this in sync whenever you change the page.

## Learn more

[Astro documentation](https://docs.astro.build) · [Astro Discord](https://astro.build/chat)
