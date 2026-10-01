# OneSuite Meta Ads Landing Page — Audit Report

**Project:** onesuite-sales-page (Astro 7)
**Scope of audit:** Full codebase review — functionality, SEO/metadata, performance, accessibility, security, content/legal compliance, code quality & tooling.
**Date:** 2026-09-25
**Reviewed by:** Claude Code (static review + local `astro build`, no live/production environment available)

---

## 1. What this project is

*(Updated 2026-09-28: the `index.astro` starter page and stale README noted below — items #21/#22 — have since been fixed; the rest of this report reflects the state of the project at the time of the original audit.)*

A single-page Astro static site:

- `src/pages/meta-sales-page.astro` — the real deliverable: a single, long-scroll paid-traffic landing page for **OneSuite**, built for Facebook/Meta ad traffic, `noindex`'d deliberately since its copy overlaps other pages on the main site.
- `/` redirects to it (configured in `astro.config.mjs`); there is no separate homepage.

It's composed of 10 section components under `src/components/facebook-ads/` and `src/components/homepage/`, wrapped in `src/layouts/LandingLayout.astro` (sticky announcement bar + header + footer).

A local `astro build` completes cleanly with no build errors, so the site is structurally sound — the issues below are about correctness, performance, compliance and maintainability, not build breakage.

---

## 2. Executive summary

| Severity | Count |
|---|---|
| 🔴 Critical | 3 |
| 🟠 High | 5 |
| 🟡 Medium | 11 |
| ⚪ Low / housekeeping | 6 (2 since fixed — see [ISSUE_LOG.md](ISSUE_LOG.md) #21/#22) |

The three critical items are the ones that most directly undermine the page's *only* purpose (converting and measuring paid Meta traffic):

1. **The header navigation is completely non-functional** — all four nav links point to anchors that don't exist anywhere in the DOM.
2. **There is no Meta Pixel, GA, or any tracking/analytics code anywhere in the project** — ad spend is currently flying blind with no conversion tracking, no retargeting audience, no optimization signal back to Meta.
3. **Testimonials attribute quotes to real, named companies** (e.g. GoDaddy) **with no visible consent/sourcing trail** — a legal exposure if these aren't verified, cleared testimonials.

Full detail on every finding, with exact file/line references and suggested fixes, is in **[ISSUE_LOG.md](ISSUE_LOG.md)** (bugs/defects) and **[SUGGESTION_LOG.md](SUGGESTION_LOG.md)** (non-bug improvements). This report explains the reasoning and groups things by category.

---

## 3. Functionality

### 3.1 Broken primary navigation (Critical)
`src/layouts/LandingLayout.astro:64-69` renders:
```html
<a href="#features">Features</a>
<a href="#how-it-works">How it works</a>
<a href="#pricing">Pricing</a>
<a href="#faq">FAQ</a>
```
Cross-referencing every `id=` in the codebase:
- `#features` and `#how-it-works` — **no element anywhere has these ids.** `FeatureRows.astro` (the "OneSuite Fits Your Business" section) and `WorkflowChainSection.astro`/`GettingStartedSteps.astro` (the two candidate "how it works" sections) have no `id` attribute at all.
- `#pricing` — the real id is `onesuite-pricing` (`SimplePricingSection.astro:4`) — close but not matching.
- `#faq` — the real id is `onesuite-faq` (`FacebookAdsFAQ.astro:4`) — same problem.

Net effect: **every link in the main nav is dead.** On a page whose entire job is to convert cold Meta traffic, a visibly broken nav in the sticky header (visible on every scroll position) is a first-impression credibility problem, not just an inconvenience.

The logo link (`LandingLayout.astro:54`, `<a href="#">`) is also a dead link — clicking the "go home" affordance does nothing meaningful.

### 3.2 Mismatched fake product domain
`FacebookAdsHero.astro:131` renders a browser-chrome mockup showing `app.onesuite.com` as the fake address bar text, while every real CTA on the page (12+ instances) links to `https://app.onesuite.io`. A visitor who reads the mockup literally sees the wrong TLD for the actual product.

---

## 4. Analytics & conversion tracking

This is arguably the most important category for a page built specifically for paid Meta traffic, and it is **entirely absent**. A full-text search of `src/` for `fbq`, `facebook.com/tr`, `pixel`, `gtag`, `dataLayer`, `GTM`, and common alternatives (Clarity, Hotjar) returns no matches (the one "pixel" hit is the substring in a testimonial author's company name, "Pedro Pixel" — a coincidence, not code).

Without a Meta Pixel (or Conversions API) installed:
- Meta's ad delivery algorithm has no conversion signal to optimize toward — campaigns are effectively running on impressions/clicks only.
- No retargeting audience is being built from page visitors.
- There is no way to attribute the "Claim offer" / "Start Free Trial" clicks back to specific ad creatives or audiences.

This should be treated as a launch blocker, not a nice-to-have, given the page's stated purpose.

---

## 5. Performance

### 5.1 Hero images are 3–10x larger than their rendered size
Checked actual pixel dimensions vs. the `width`/`height` attributes and CSS rendered size in `FacebookAdsHero.astro`:

| File | Actual px | Rendered px | File size |
|---|---|---|---|
| `profitibility.png` | 2227×1132 | 650×445 | 174 KB |
| `notification.png` | 1060×420 | 260×48 | 254 KB |
| `float-contract.png` | 574×528 | 175×52 | 130 KB |
| `float-invoicing.png` | 1216×354 | 200×52 | 51 KB |
| `float-timer.png` | 576×271 | 200×52 | 24 KB |

That's **~633 KB** of hero-image payload, almost all of it wasted resolution, all served as PNG (no WebP/AVIF), all loaded eagerly (correct, since they're above the fold — but eager-loading images this oversized compounds the cost). None of it goes through Astro's built-in `astro:assets` image pipeline (`<Image>`/`<Picture>`), which would have resized, re-encoded and `srcset`-generated these automatically.

For a Meta ad landing page, LCP and mobile page weight feed directly into ad relevance/quality signals and into raw conversion-rate — this is a high-leverage, low-effort fix.

### 5.2 Font loading
`LandingLayout.astro:24-27` loads **9 separate weights** of Inter from Google Fonts (400/500/550/600/650/700/750/800/900). But 6 of the 9 section components (`GettingStartedSteps`, `FacebookAdsFAQ`, `WorkflowChainSection`, `StackConsolidationSection`, `SimplePricingSection`, `EverythingIncludedSection`) explicitly set `font-family: system-ui, -apple-system, sans-serif` in their own scoped `<style>` block, overriding the global Inter declaration on `body`. So most of the page doesn't even render in the font being paid for in load time — see [ISSUE_LOG.md](ISSUE_LOG.md) #13.

### 5.3 Total static page weight
A local `astro build` of `meta-sales-page` produces a 72 KB HTML document + 56 KB CSS bundle + ~633 KB of images (fonts are additional, loaded from Google's CDN). That's a heavy budget for a single-purpose paid-traffic landing page, and nearly all of the excess is the oversized images in 5.1.

---

## 6. Accessibility

- **FAQ accordion** (`FacebookAdsFAQ.astro`) toggles via a plain `click` listener with no `aria-expanded`/`aria-controls` on the trigger button — screen-reader users get no indication of open/closed state.
- **Auto-advancing tab carousel** (`EverythingIncludedSection.astro`) cycles every 4.5s indefinitely with no persistent pause/stop control (WCAG 2.2.2, Pause/Stop/Hide). Clicking a tab only pauses for 10s before autoplay resumes.
- **No `prefers-reduced-motion` support anywhere** in `global.css` or any component, despite ~9 infinite CSS animations across the page (pulsing dots, floating cards, glow effects, product-window float).
- **Heading hierarchy skip**: `EverythingIncludedSection.astro` goes from `<h2>` straight to `<h4>` (tab titles) with no `<h3>` in between.
- **Very small, low-contrast text used pervasively** for secondary copy — e.g. `.os-offer-note` at 8px `#98A2B3` on white, `.os7-urgency` at 9px, `.os3-tabs-heading` at 9px. Several of these combinations fall short of WCAG AA contrast (4.5:1 for normal text) and are simply hard to read regardless of contrast ratio.

---

## 7. SEO & metadata

- `astro.config.mjs` has no `site` set — if canonical URLs or a sitemap are ever wanted, they can't be generated correctly without it.
- `LandingLayout.astro` (the layout actually used by the real page) has **no favicon/icon `<link>` tags at all**. The production sales page currently ships with no favicon reference (see [ISSUE_LOG.md](ISSUE_LOG.md) #9).
- No Open Graph or Twitter Card tags — if this URL is ever shared in Messenger, WhatsApp, Slack, etc. (all plausible for a page fed by social ad traffic), it renders as a bare, unstyled link preview.
- No `FAQPage` structured data despite a full 12-question FAQ section — a free rich-snippet opportunity, moot only as long as `noindex` stays `true`.
- No `robots.txt` in `public/`. *(The separate risk of the old unused `index.astro` starter page being indexable at `/` has since been fixed — see [ISSUE_LOG.md](ISSUE_LOG.md) #18/#21 — but a project-wide `robots.txt` still doesn't exist.)*

---

## 8. Content, legal & ad-policy compliance

- **Testimonials name specific real companies and titles** (e.g. "Product Design Lead at GoDaddy", "COO at DEQUA Studio", "CEO at Egomonk") — `TestimonialsGrid.astro`. If these aren't sourced/consented real reviews, this is exposure under FTC endorsement guidelines and potentially the named companies' trademark/publicity rights.
- **Repeated scarcity claims** — "ONLY 10 SPOTS", "First 10 registered clients only", "While spots last" — appear in three separate places (`BrandedPortalOfferSection.astro`, `SimplePricingSection.astro`) with no visible inventory system backing the claim. Unsubstantiated urgency/scarcity claims are one of the more commonly enforced categories in Meta's Ad Policies (misleading claims) and can trigger FTC scrutiny if the "10 spots" isn't real and tracked.
- Filename/content typo: `profitibility.png` and its alt text both read "Profitibility" instead of "Profitability" — a visible spelling error in a screenshot alt text and asset name.

---

## 9. Code quality & maintainability

- `global.css` defines a full design-token system (`--os-blue`, `--os-green`, `--os-dark`, spacing/radius/shadow tokens) that **no component actually uses** — every one of the 9 section components hardcodes its own raw hex values (`#3F7FF5` appears dozens of times across files). A brand color change today means editing 9+ files instead of one CSS custom property.
- Each section component invents its own class-prefix convention (`os3-`, `os6-`, `os7-`, `os8-`, `os9-`, plus unprefixed `.step`/`.container`/`.btn` in `GettingStartedSteps.astro`) — harmless today (Astro scopes styles per component automatically) but makes the codebase harder to navigate and easy to accidentally collide with if any component ever gets converted to global styles.
- No ESLint/Prettier config, no CI workflow, and no automated tests of any kind. Reasonable for a small marketing microsite, but worth naming explicitly since "standard scope" was requested.
- `package.json` includes `"allowScripts": { "esbuild": true }` at the top level — this isn't a field npm recognizes (it's a pnpm/Bun convention); under plain `npm` it's inert.
- ~~`src/pages/index.astro` is still the unmodified `create-astro` starter template~~ and ~~`README.md` is also still the default `create-astro` boilerplate~~ — **both fixed**: the starter page was removed in favor of a `/` → `/meta-sales-page` redirect, and `README.md` now documents this specific project (see [ISSUE_LOG.md](ISSUE_LOG.md) #21/#22).

---

## 10. What was *not* found (i.e., passed review)

To be clear about what's solid:
- The build is clean — no Astro/TS build errors.
- Pricing figures are consistent everywhere they appear ($9/person/month, $25 branded-portal offer discounted from $34, unlimited clients/projects) — no contradictory numbers across sections.
- No inline secrets, API keys, or credentials anywhere in the repo.
- No `target="_blank"` links, so no missing `rel="noopener"` exposure.
- Single, correctly-nested `<h1>` per page; mobile breakpoints are handled thoughtfully throughout (every component ships its own responsive rules).
- `.gitignore` correctly excludes `.env`, `dist/`, `node_modules/`.

---

## 11. Where to look next

- **[ISSUE_LOG.md](ISSUE_LOG.md)** — every defect above as a tracked item with severity, exact location, and recommended fix.
- **[SUGGESTION_LOG.md](SUGGESTION_LOG.md)** — non-defect improvements (things that work today but could be better).
