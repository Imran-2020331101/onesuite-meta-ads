# Content & Design Reference — OneSuite Meta Ads Landing Page

A section-by-section log of everything currently on the page: exact copy, layout structure, visual design, and animations. Intended as a living reference — update it whenever copy, layout, or motion design changes.

**Page:** `src/pages/meta-sales-page.astro` (uses `src/layouts/LandingLayout.astro`)
**Render order:** Layout chrome (announcement bar → header) → Hero → BrandedPortalOffer → Workflow → FeatureRows → StackConsolidation → EverythingIncluded → SimplePricing → Testimonials → GettingStarted → FAQ → ProductOverviewStrip → Layout chrome (footer)

> Note: `/` redirects to `/meta-sales-page` (configured in `astro.config.mjs`) — there is no separate homepage.

---

## Layout chrome — `src/layouts/LandingLayout.astro`

### Announcement bar
- Badge: **"LIMITED LAUNCH OFFER"**
- Text: *"Get your **Branded Client Portal** for **$25** ~~$38~~ — save $13."*
- Link: **"Claim offer →"** → `#branding-offer`
- Body text font: `Inter, Arial, sans-serif`, 14px, weight 500, 20px line-height, white (badge stays bold/800 at 10px, link stays weight 700 — both intentionally distinct from the body text)

### Header
- Logo: image, alt `"OneSuite"`, links to `#`
- Nav: **Features** · **How it works** · **Pricing** · **FAQ**
- CTA button: **"Start Free Trial"** → `https://app.onesuite.io`

### Footer
- Logo (same image, alt `"OneSuite"`)
- Blurb: *"Manage your clients, projects, contracts, time, invoices and communication from one simple workspace."*
- Links: **Terms** (`onesuite.io/terms`) · **Privacy** (`onesuite.io/privacy`) · **Contact** (`mailto:support@onesuite.io`)
- Copyright: *"© {current year} OneSuite. All rights reserved."*

**Layout:** Announcement bar (bold dark `#101828` bar with an orange accent badge/link) → sticky white header (76px tall, sticky at `top: 0`, `z-index: 100`) → `<main><slot/></main>` → footer (`#FAFBFC` background).
**Design highlights:** Header nav underline sweeps in on hover (`width: 0 → 100%`); CTA button lifts 1px with a soft blue shadow on hover.
**Animations:** None at the chrome level (hover transitions only, 0.2s ease).

---

## 1. Hero — `src/components/facebook-ads/FacebookAdsHero.astro`

### Text content
- Eyebrow: **"BUILT FOR CLIENT-BASED BUSINESSES"**
- H1: **"No More Messy Systems."** / *"Stay Organised. Look Professional."* (second line styled blue)
- Subtext: *"Keep your clients, projects, and payments organised in one place, so you can spend less time managing your business and more time serving your clients."*
- Audience pills: **Social Media Managers** · **Freelancers** · **Virtual Assistants** · **Wedding & Event Pros**
- Benefits: ✓ Keep all your clients organised · ✓ Manage projects, contracts & invoices · ✓ Give clients a more professional experience
- Primary CTA: **"Start Your Free Trial →"** + price callout **"$9 / person / month · No credit card required"**
- Social proof *(moved to sit right after the CTA button, 2026-09-29)*: ★★★★★ **Top Rated** on **G2** (highlighted in brand blue, `.os-g2-mark`)　│　**200+** clients managed *(no numeric score shown — was previously "5/5")*
- Trust line: ✓ Everything included · ✓ Unlimited clients · ✓ Cancel anytime

*(The limited-offer card that used to sit at the bottom of this column now lives in its own section — see [§2 Branded Portal Offer](#2-branded-portal-offer--srccomponentsfacebook-adsbrandedportaloffersectionastro) below.)*

### Product visual (right column)
Fake browser window, address bar reads **`app.onesuite.com`**, profile avatar **"MJ"**, containing dashboard screenshot `profitibility.png` (alt: *"OneSuite Report and Profitibility showing a dashboard with a graph, revenue, expenses, and profit"*). Four floating image cards layered around it:
- `float-timer.png` — alt *"New client notification — Sarah Williams added"*
- `float-invoicing.png` — alt *"Payment received — $850.00"*
- `float-contract.png` — alt *"Contract signed — Just now"*
- `notification.png` — alt *"Client portal updated — Acme Studio can now view their project"*

### Layout
Two-column grid (`.92fr / 1.08fr`), content left / product visual right; stacks to a single column under 1000px.

### Design highlights
White background with a soft radial blue glow (`rgba(63,127,245,.12)`) behind the visual; oversized headline (`clamp(45px, 5vw, 66px)`, weight 800, tight `-.055em` tracking); product window has a 3D tilt (`perspective(1200px) rotateY(-4deg) rotateX(2deg)`) and a heavy drop shadow.

### Animations
| Name | Applies to | Behavior |
|---|---|---|
| `osPulse` | eyebrow dot | pulsing box-shadow ring, 2s infinite |
| `osHeroGlow` | background glow blob | scale + opacity breathing, 5s infinite |
| `osProductFloat` | dashboard product window | gentle vertical float + fixed 3D tilt, 6s infinite |
| `osNotificationFloat` | bottom notification card | vertical float, 4s infinite |
| `osMobileProductFloat` | product window (mobile ≤700px only) | simplified vertical float, 6s infinite |
| `osFloatClient` / `osFloatPayment` / `osFloatContract` | the 3 other floating cards | Vertical float, 8px/10px/6px amplitude respectively, 5s/5.5s/4.5s infinite *(keyframes added 2026-09-28 — previously referenced but undefined, so these 3 cards used to sit static)* |

---

## 2. Branded Portal Offer — `src/components/facebook-ads/BrandedPortalOfferSection.astro`
*(Split out of the Hero on 2026-09-28 — was previously a card embedded in the Hero's left content column; now its own standalone section directly below the full hero row.)*

### Text content
- Badge **"LIMITED OFFER"** · counter **"ONLY 10 SPOTS"**
- Heading: **"Get Your Branded Client Portal"**
- Copy: *"Available for the **first 10 registered clients only.** Get your branded portal for **$25** ~~$38~~ and save $13."*
- Button: **"Claim My $25 Branded Portal →"**
- Fine print: *"First 10 registered clients only · While spots last"*

### Layout
White background section, `id="branding-offer"` (the announcement bar's "Claim offer →" link and header still scroll here). A single centered card, max-width 510px, inside a `min(1200px, 100% - 40px)` container — so on desktop it reads as a narrow highlighted callout with generous white space around it, not a full-width banner.

### Design highlights
Same card treatment as before the move: light diagonal gradient background (`#F7FAFF → #FFFFFF`), blue border, gradient icon tile (`#65A7FF → #315FE7`), soft blue shadow. On mobile (≤700px) the badge/counter row stacks vertically instead of sitting side-by-side.

### Animations
None (button has a hover color-swap transition only).

---

## 3. Workflow chain — `src/components/facebook-ads/WorkflowChainSection.astro`

### Text content
- Eyebrow: **"YOUR CLIENT WORKFLOW"**
- H2: **"From New Lead"** / *"to Happy Client."*
- Subtext: *"Keep the entire client journey organised from the moment someone contacts you to the moment the project is completed and paid."*
- 4 steps, each with an icon, step label, title, description, and status badge:
  1. **STEP 01 — Capture the Client** — *"Add a new lead or client and keep their information organised from the beginning."* — badge "New Client ✓"
  2. **STEP 02 — Create the Project** — *"Turn the client into a project, add tasks, deadlines and keep everyone clear on what's happening."* — badge "Project Created ✓"
  3. **STEP 03 — Send the Contract** — *"Send your agreement for signing and keep important documents connected to the client."* — badge "Contract Signed ✓"
  4. **STEP 04 — Invoice & Get Paid** — *"Send professional invoices and make it easier for clients to complete their payments."* — badge "Payment Received ✓"
- Closing line: **"Less admin. Fewer tools."** *"More time for your actual work."* (blue)

### Layout
Light blue-gray background (`#f8faff`); 4-column card grid with a horizontal connecting line drawn behind the cards; collapses to 2 columns (line hidden) under 900px, 1 column under 600px.

### Design highlights
Gradient icon tiles (`#65a7ff → #315fe7`); cards lift 6px with a soft blue shadow on hover.

### Animations
None (hover lift is a CSS `transition`, not a keyframe animation).

---

## 4. Audience fit — `src/components/facebook-ads/FeatureRows.astro`
*(Section heading is "OneSuite Fits Your Business" — filename says `FeatureRows` but content is a 4-persona use-case grid, not a feature list.)*

### Text content
- Eyebrow: **"BUILT FOR SERVICE PROVIDERS"**
- H2: **"OneSuite Fits"** / *"Your Business."*
- Subtitle: *"Whether you're managing social media, building websites, supporting clients or delivering creative projects, your client workflow deserves one organised system."*
- 4 persona cards:
  1. **Social Media Managers** *(featured card)* — *"Manage multiple clients, content projects, tasks, contracts, invoices and time from one workspace."* — checklist: Client management / Project & task tracking / Time tracking / Contracts & invoices — CTA "Manage Your Clients →"
  2. **Freelancers** — *"Keep your projects, clients, payments and important documents organised without building a complicated system yourself."* — checklist: Projects / Time tracking / Invoicing / Client management — CTA "Simplify Your Workflow →"
  3. **Virtual Assistants** — *"Stay organised across clients and recurring tasks while keeping your work, time and communication easy to manage."* — checklist: Multiple clients / Tasks & projects / Time tracking / Client communication — CTA "Organise Your Business →"
  4. **Wedding & Event Pros** — *"Keep enquiries, projects, contracts, payments and client communication organised throughout every event."* — checklist: Client details / Event projects / Contracts / Payments — CTA "Organise Every Project →"

### Layout
White background; 2×2 card grid (1 column under 700px); each card = icon + number header, title, description, 2×2 checklist, CTA link.

### Design highlights
Card 1 has a subtle gradient background to read as the "primary"/featured persona; each card's icon is a distinct glyph (◎ ✦ ◇ ♢) in a solid blue circle.

### Animations
None (CTA link has a hover opacity fade only).

---

## 5. Stack consolidation — `src/components/facebook-ads/StackConsolidationSection.astro`

### Text content
- Eyebrow: **"WHY ONESUITE"**
- H2: **"Stop Piecing Your Business"** / *"Together."*
- Subtitle: *"You can manage your business across multiple disconnected tools — or keep the essential parts of your client workflow organised in one workspace."*
- Comparison table — **"What You Need"** vs. **"OneSuite" (One Organised Workspace)** vs. **"Multiple Separate Tools" (Connected manually)**:
  - Client Management, Project Management, Time Tracking, Contracts & E-Signatures, Invoicing & Payments, Reporting & Profitability, Client Portal — ✓ for OneSuite, "•" (bullet) for other tools
  - One Connected Workspace — "✓ Connected" vs. "× Disconnected"
  - Switching Between Platforms — "✓ Less switching" vs. "× More switching"
  - Organised Client Experience — "✓ One workspace" vs. "× Multiple systems"
- Bottom banner: icon "ϟ", **"One workspace. Less complexity."** / *"Bring your client management, projects, time, contracts, invoices and reporting into one organised system."* + CTA **"Start Your Free Trial →"**
- Trust strip: ✓ Unlimited clients • ✓ Unlimited projects • ✓ $9/person/month • ✓ Cancel anytime

### Layout
White background; 3-column comparison table (`1.45fr / .9fr / .9fr`); collapses to a stacked list on mobile where CSS `content:` injects **"OneSuite: "** / **"Other tools: "** labels in front of each value.

### Design highlights
Middle ("OneSuite") column highlighted with a light blue vertical gradient band; bottom banner uses the full blue brand gradient (`#3F7FF5 → #2961e0`) with a white pill button.

### Animations
None.

---

## 6. Everything Included (interactive showcase) — `src/components/facebook-ads/EverythingIncludedSection.astro`

### Text content
- Eyebrow: **"MEET YOUR NEW WORKSPACE"**
- H2: **"Everything You Need."** / *"One Workspace."*
- Subtitle: *"Stop switching between different tools. OneSuite brings your clients, projects, time, contracts, invoices and reporting together in one organised workspace."*
- Sidebar heading: **"EVERYTHING IN ONE PLACE"**, with 6 tabs:
  1. **Clients & CRM** — "Keep every client organised." *(active by default)*
  2. **Projects & Tasks** — "Know exactly what needs to happen."
  3. **Time Tracking** — "See where your time goes."
  4. **Contracts & E-Signatures** — "Send and sign documents easily."
  5. **Invoices & Payments** — "Invoice clients and get paid."
  6. **Reports & Profitability** — "Understand your business."
- Each tab reveals a **real OneSuite product screenshot** (changed 2026-09-28 — previously a hand-coded HTML/CSS mockup with fabricated sample data; see note below):
  - **Clients** *(updated 2026-09-29)* → `clients-portal-view.webp` — the branded client-facing portal a client actually sees (Action required items, Your tasks, Quick links, Contact info)
  - **Projects** *(updated 2026-09-29)* → `projects-grid.png` — the actual "All Projects" grid (97 projects)
  - **Time** *(updated 2026-09-29)* → base image `time-tracking-weekly.png` (the real weekly timesheet grid), with two real product screenshots floated on top with a gentle bobbing animation: `time-tracking-timer.png` (a running-timer card, top-right) and `time-tracking-utilization.png` (a team member's utilization/capacity card, bottom-left) — same floating-card visual language as the hero's floating screenshots
  - **Contracts** *(updated 2026-09-29)* → `contracts-template-library.png` — the real Template Library modal (Freelancer, Web Development, Video Editing, Logo Design, Employee, SEO and Digital Marketing contract templates)
  - **Invoices** *(restyled 2026-09-29, superseding the same-day floating-cards version)* → a 3-image stacked collage, not a single screenshot: `invoices-overview-strip.png` (totals + invoices-by-month chart) full-width on top, then `invoices-doc-detail.png` (a real invoice with line items, subtotal, tax, amount due) and `invoices-payments-panel.png` (payment gateway settings — Stripe, PayPal, etc.) side by side below
  - **Reports** *(updated 2026-09-29)* → `reports-profitability.png` — the real Profitability report (quarterly profit chart, per-client revenue/profit)
- Bottom benefits row: ✓ Unlimited clients · ✓ Unlimited projects · ✓ Track your time · ✓ Invoice & get paid · ✓ Understand profitability

### Layout
Light blue-gray background; two-column "app shell" card (310px tab sidebar + flexible content pane); on mobile (<980px) the sidebar becomes a horizontally-scrollable tab strip above the stacked content.

### Design highlights
Active tab gets a gradient icon tile and a thin progress-bar underline. Each tab's screen is now a single real screenshot (`/images/product/*`) framed in a bordered, subtly-shadowed card (`.os3-screen-image`), rather than the previous hand-built table/stat-card mockups.

**Note on the 2026-09-28 change:** removing the fake tables/stat-cards/chart markup made a large chunk of the file's CSS dead code (`.os3-table*`, `.os3-avatar`, `.os3-badge*`, `.os3-grid-2x2`, `.os3-card*`, `.os3-stat*`, `.os3-doc-*`, `.os3-notification-card`, `.os3-period-selector`, `.os3-chart-placeholder`, and their mobile overrides) — all of it was removed rather than left unused. One implementation detail worth remembering: the six images must **not** use `loading="lazy"` — since 5 of the 6 `.os3-screen` panels are `display:none` at any given time, a lazy `<img>` inside a hidden panel never intersects the viewport, so the browser's native lazy-load never fires and the image silently never loads. All six are `loading="eager"` for this reason.

**Note on the 2026-09-29 Time-tab change:** the Time screen (`#screen-time`) now wraps its images in an inner `.os3-time-visual` div (`position: relative`) rather than positioning floats directly against `.os3-screen`/`.os3-time-screen`. This matters because `.os3-screen` is a flex item with `flex: 1` inside a column-direction flex container (`.os3-interface-area`), so the *outer* box stretches to fill the panel's full height (~600px) regardless of image size — if the floating cards were positioned against that stretched box, `bottom`/`top` offsets would place them far away from the actual image instead of hugging its corners. The inner wrapper sizes to its content (the base image) only, so the floats anchor correctly. `.os3-float-timer` and `.os3-float-utilization` reuse the hero's bobbing-animation pattern (`translateY` keyframes, ease-in-out, infinite) at 4.5s/5.2s durations, with smaller sizes/offsets under the `max-width: 980px` query to avoid clipping against `.os3-showcase`'s `overflow: hidden`.

**Note on the 2026-09-29 Invoices-tab redesign:** the floating-corner-cards treatment (matching the Time tab) was replaced same-day with a stacked collage layout to match a reference mockup the user supplied. `.os3-invoices-visual` is now a column flexbox: the overview strip sits full-width on top, then `.os3-invoices-bottom` is a row flexbox holding the doc-detail and payments-panel images. Those two source screenshots happen to share the exact same natural height (528px), so giving them `flex: <naturalWidth> 1 0%` (624 and 266 respectively) scales both by the same factor — their rendered heights end up matching to a fraction of a pixel without needing `object-fit` cropping. Below 560px they stack to full-width column (`.os3-invoices-bottom { flex-direction: column }`) since squeezing the narrower payments panel below ~100px made its text illegible. The old `invoices-list.png`, `invoices-summary.png`, and `invoices-document.png` files were deleted as they're no longer referenced anywhere.

**Note on the 2026-09-29 Time-tab vertical-centering fix:** the base timesheet image sat visibly high inside the panel because `.os3-time-screen` inherits `.os3-screen`'s `flex: 1`, which stretches it to the full ~600px panel height while the image itself only renders ~340px tall — the leftover space collected entirely below the image. Fixed with `.os3-time-screen.os3-active-screen { display: flex; flex-direction: column; justify-content: center; }` (placed after the base `.os3-screen.os3-active-screen { display: block; }` rule so it wins on source order at equal specificity), which centers `.os3-time-visual` vertically within the stretched box instead of leaving it pinned to the top.

### Animations
| Name / mechanism | Behavior |
|---|---|
| `fadeIn` keyframe | active screen content fades + slides up on every tab switch (0.4s ease-out, one-shot) |
| JS auto-advance | tabs cycle automatically every **4.5s**; the active tab's underline animates 0%→100% width over that same 4.5s as a visual countdown |
| JS idle/interrupt | clicking a tab manually cancels autoplay for **10s**, then autoplay resumes from that tab |

---

## 7. Pricing — `src/components/facebook-ads/SimplePricingSection.astro`

### Text content
- Eyebrow: **"SIMPLE PRICING"**
- H2: **"Everything You Need."** / *"One Simple Price."*
- Subtitle: *"Get the tools you need to manage your clients, projects, time, contracts, invoices and business performance — all in one organised workspace."*

**Card 1 — OneSuite plan**
- Label "ONESUITE", title **"All-in-One Workspace"**, description *"Everything you need to run your client-based business."*
- Price: **$9** / person per month — *"Simple monthly pricing. No complicated plans."*
- CTA: **"Buy Now →"** *(changed from "Start Your Free Trial" — this button now opens the checkout form below, so the label needed to match the actual purchase flow)* — *"Secure checkout"* *(changed from "No credit card required", which would have contradicted a "Buy Now" button)*
- "EVERYTHING INCLUDED" list: Unlimited clients · Unlimited projects · CRM & lead management · Time tracking · Contracts & e-signatures · Invoicing & online payments · Reporting & profitability · Client portal
- Pill: **"Cancel anytime"**

**Card 2 — Branded portal offer**
- Badge **"LIMITED OFFER"**, urgency line **"ONLY FOR THE FIRST 10 REGISTERED CLIENTS"**
- Mock UI graphic (lightning bolt + wireframe lines)
- Eyebrow "MAKE IT YOURS", title **"Get Your Branded Client Portal"**
- Description: *"Give your clients a professional branded space to interact with your business and access their client experience."*
- Price: ~~$38~~ → **$25**, pill **"SAVE $13"**
- CTA: **"Claim My $25 Branded Portal →"** — *"First 10 registered clients only. Offer available while spots last."*
- Mini checklist: Your brand · Professional client experience · Connected with your OneSuite workspace

**Decision pill row:** *"Start with OneSuite ($9/person/month)"* → *"+ Add your branded portal ($25 for the limited offer)"* → *"→ Give clients a better experience (All from one workspace)"*

**Closing line:** *"Ready to get your business organised? **Start Your Free Trial →**"*

**Inline checkout tray (added 2026-09-28):** both cards' CTAs now trigger an interactive transition instead of navigating away directly:
- Clicking **Card 1's "Buy Now"** → Card 2 fades out, Card 1 slides right into Card 2's slot, and a checkout form fades in on the left in Card 1's place.
- Clicking **Card 2's "Claim My $25 Branded Portal"** → Card 1 fades out, Card 2 slides left into Card 1's slot, and the same checkout form fades in on the right in Card 2's place.
- The form (shared by both triggers): a **Back** link, a price recap (*"1 user — $9/month"* / *"Branded Client Portal — $25 one-time"* / *"Any eligible discount is applied on the next page."*), **Your name** + **Work email** inputs, and a **"Continue to payment"** button that's disabled (muted) until both fields are filled. Submitting forwards to `https://app.onesuite.io` (same destination as every other CTA — there's no backend to actually process the form).
- On mobile (≤860px) the cards stack instead of sliding sideways; whichever card wasn't clicked just fades out and the form appears at the top.

### Layout
Light blue-gray background; 2-column pricing grid, stacks to 1 column under 860px.

### Design highlights
Card 1 is a plain white card; Card 2 uses a diagonal light-blue gradient with a blurred glow blob in the corner for visual emphasis as the "special offer."

### Animations
`pulse` keyframe on the "LIMITED OFFER" badge dot — pulsing box-shadow ring, 2s infinite (visually the same effect as the Hero's `osPulse`, but a separately-defined keyframe local to this file).

---

## 8. Testimonials — `src/components/homepage/TestimonialsGrid.astro`

### Text content
- Eyebrow: **"CUSTOMER REVIEWS"**
- H2: **"Loved by Businesses"** / *"Around the World."*
- Subtitle: *"See what OneSuite customers say about managing their clients, projects and everyday business operations."*
- Rating line: ★★★★★ *"Real customer feedback"*

| # | Name | Role | Flag | Quote |
|---|---|---|---|---|
| 1 | Jacquelyn L. | Small-Business Owner | 🇺🇸 | "Every update improves usability and performance. The support team is responsive and genuinely invested in my success. OneSuite keeps exceeding expectations." |
| 2 | Luca Piccinotti | COO at DEQUA Studio | 🇮🇹 | "OneSuite consolidated our entire agency stack. Client portal, invoicing, e-signatures, and lead management, all in one place. We cut subscriptions, reduced overhead, and now deliver faster." |
| 3 | Sartaj Anand | CEO at Egomonk | 🇮🇳 | "OneSuite became our daily driver. It gives the team a clean, structured space to plan and execute every week, with far fewer clicks." |
| 4 | Carlos Castellanos | Managing Partner | 🇺🇸 | "Great for keeping track of several projects at once. Lets me assign priority so I always focus on what matters most. Easy to use from day one." |
| 5 | Eryk Lewandowski | CEO at Flowbound | 🇵🇱 | "I used to live in Notion and hated it. OneSuite is clean and simple, and the CRM is so good I'm in it for hours every day. It feels complete." |
| 6 | Pedro Colmenárez | CEO at Pedro Pixel | 🇪🇨 | "I've used it for 5 months to manage client projects and assign tasks. So intuitive. You don't need to explain to your team where to find anything. Nothing escapes me now." |
| 7 | Dennis Eideland | Founder at Ojoo | 🇫🇷 | "For our sales workflow it just works. The client signs, pays, and your routes automatically. OneSuite looks great and keeps getting better." |
| 8 | Surja Sen | Product Design Lead at GoDaddy | 🇨🇦 | "The client directory, invoicing, and leads management are outstanding. Months in and I still haven't found anything I don't like. It's become indispensable for daily operations." |
| 9 | Shah Razi Siddiqui | CEO at CODETREE | 🇧🇩 | "Managing all client projects in one platform has transformed how we work. Team statistics, task records, employee effort, everything tracked in a single source of truth." |

Bottom bar: ★★★★★ *"Ready to simplify your client workflow?"* + CTA **"Start Your Free Trial →"**

### Layout
White background; 3-column grid (2 columns ≤980px, 1 column ≤640px) of quote cards with gradient-circle initials as avatars.

### Design highlights
Each card has a large decorative serif quote-mark glyph and a dashed divider above the author row; avatar background gradients vary per person (blue, purple, orange, green, red, etc.).

### Animations
None.

---

## 9. Getting started — `src/components/facebook-ads/GettingStartedSteps.astro`

### Text content
- Eyebrow: **"GET STARTED IN MINUTES"**
- H2: **"Three Simple Steps"** / *"to Get Organised."*
- Subtitle: *"Getting started with OneSuite is quick and easy."*
- Steps:
  1. **Sign Up** — *"Create your free account in under a minute. No credit card needed."*
  2. **Set Up Your Workspace** — *"Add your clients, create projects, and customise your workflow."*
  3. **Start Managing** — *"Track time, send invoices, and deliver a professional client experience."*
- Bottom CTA: **"Start Your Free Trial →"** — *"No credit card required"*

### Layout
White background, centered content, 3-column step row (stacks vertically under 768px).

### Design highlights
Numbered circular badges with the same gradient (`#65a7ff → #315fe7`) used elsewhere for icon tiles.

### Animations
None.

---

## 10. FAQ — `src/components/facebook-ads/FacebookAdsFAQ.astro`

### Text content
- Eyebrow: **"FREQUENTLY ASKED QUESTIONS"**
- H2: **"Questions?"** / *"We've Got Answers."*
- Subtitle: *"Everything you need to know about OneSuite, getting started, the White Label Package, and your branded client experience."*

| # | Question | Answer | Highlighted? |
|---|---|---|---|
| 1 | What is OneSuite? | "OneSuite is a workspace designed for client-based businesses. It brings together your client management, project tracking, time tracking, contracts, invoices, and reporting into one organised platform — so you can manage your work without switching between multiple tools." | *(open by default)* |
| 2 | Who is OneSuite for? | "OneSuite is built for service providers, freelancers, agencies, virtual assistants, consultants, and anyone who works directly with clients. Whether you manage social media, run creative projects, or offer professional services, OneSuite helps keep your work organised." | |
| 3 | How much does OneSuite cost? | "OneSuite is $9 per person per month. This includes everything — unlimited clients, unlimited projects, time tracking, contracts, invoicing, reporting, and the client portal." | |
| 4 | Is there a free trial? | "Yes. You can start a free trial to explore OneSuite and see how it fits your workflow before committing." | |
| 5 | Do I need a credit card to start? | "No. You can start your trial without entering a credit card." | |
| 6 | What is the White Label Package? | "The White Label Package lets you brand your OneSuite workspace with your own logo, colours, and domain — so your clients see your brand, not OneSuite." | |
| 7 | Does the White Label Package include setup help? | "Yes. The White Label Package includes personalised setup support from a dedicated agent who helps you configure your branding, workspace, and client portal." | ✅ "WHITE LABEL" badge |
| 8 | Will I have a personal agent to help me? | "Yes. When you purchase the White Label Package, you're assigned a personal onboarding agent who walks you through setup, answers questions, and helps you launch your branded client experience." | ✅ "WHITE LABEL" badge |
| 9 | Is live support included with the White Label Package? | "Yes. White Label clients receive priority live support to assist with branding, configuration, and ongoing questions about their workspace." | ✅ "WHITE LABEL" badge |
| 10 | Can I use my own branding? | "Yes. With the White Label Package, you can use your own logo, brand colours, and custom domain to create a fully branded experience for your clients." | |
| 11 | Can I manage unlimited clients and projects? | "Yes. OneSuite includes unlimited clients and unlimited projects on every plan." | |
| 12 | Can I cancel my subscription? | "Yes. You can cancel your OneSuite subscription at any time with no cancellation fees or penalties." | |

Bottom CTA card: icon "?", **"Still have questions?"**, *"Start your trial and explore OneSuite for yourself."*, button **"Start Your Free Trial →"**

### Layout
White background, narrow centered container (780px max-width); single-open accordion list; 3 of the 12 items ("White Label" questions) are visually distinguished with a badge and a soft gradient background.

### Design highlights
Plus icon rotates 45° into an "×" when a question is open.

### Animations
CSS `grid-template-rows` transition (`0fr → 1fr`, 0.35s ease) drives the expand/collapse of each answer; icon rotation is a 0.3s CSS transition. JS click handler closes every other item and toggles the clicked one open (accordion behaves as single-open, not multi-open).

---

## 11. Closing CTA strip — `src/components/homepage/ProductOverviewStrip.astro`

### Text content
Component is prop-driven; as used on this page:
- Title: **"Turn your team's time into profitable work."**
- Description: *"Track time. Manage projects. Serve clients. Send invoices. Get paid — all from one workspace."*
- Button: **"Start your free trial →"**
- Fixed fine print: *"No credit card required"*

### Layout
Full-width banner, centered content (max 700px).

### Design highlights
Solid blue gradient background (`#3F7FF5 → #2961e0`), white pill button with a soft shadow.

### Animations
None (hover lift/shadow transition only).

---

## Global design system — `src/styles/global.css`

**Color tokens** (CSS custom properties on `:root`, though most components hardcode raw hex instead of referencing these):
- Brand blue: `--os-blue #3F7FF5`, hover `#326BE0`, dark `#2867D8`, light bg `#EEF5FF` / `#EAF2FF`, border `#D7E5FC`
- Green: `--os-green #12B76A`, dark `#039855`, bg `#ECFDF3`
- Purple: `--os-purple #7F56D9`, bg `#F4F3FF`
- Red: `--os-red #F04438`, bg `#FEF3F2`
- Orange: `--os-orange #F79009`, bg `#FFFAEB`
- Pink: `--os-pink #EE46BC`, bg `#FDF2FA`
- Neutrals: dark text `#101828`, body text `#344054`/`#475467`, secondary `#667085`, muted `#98A2B3`, borders `#E4E7EC`/`#E8ECF2`/`#F0F2F5`, surfaces `#F8FAFC`/`#FAFBFC`/`#f8faff`
- Radius scale: 6 / 8 / 10 / 12 / 16px
- Shadow scale: 5 levels from a subtle `sm` to a heavy `xl` (used on the hero product window)

**Typography:** Body font is **Inter**, loaded from Google Fonts at 9 weights (400/500/550/600/650/700/750/800/900). Headings use weights 700–800 throughout, with tight negative letter-spacing on large display headings (as low as `-0.055em` on the H1).

**Containers:** The global `.onesuite-container` utility is `min(1200px, calc(100% - 48px))`, but most sections define their own local container class with a different max-width instead of reusing it (780px FAQ, 900px Getting Started, 1100px Pricing/Stack Consolidation, 1110px Testimonials, 1180px Workflow/Audience-fit, 1200px Everything-Included) — so section widths are visually close but not perfectly aligned edge-to-edge down the page.

---

## Animations — full reference

| Keyframe / mechanism | Defined in | Effect | Timing |
|---|---|---|---|
| `osPulse` | FacebookAdsHero | Eyebrow dot pulsing ring | 2s infinite |
| `osHeroGlow` | FacebookAdsHero | Background glow blob breathing (scale+opacity) | 5s infinite |
| `osProductFloat` | FacebookAdsHero | Dashboard window gentle vertical float (desktop, 3D-tilted) | 6s infinite |
| `osNotificationFloat` | FacebookAdsHero | Bottom notification card vertical float | 4s infinite |
| `osMobileProductFloat` | FacebookAdsHero (mobile only) | Simplified vertical float, no 3D tilt | 6s infinite |
| `osFloatClient`, `osFloatPayment`, `osFloatContract` | FacebookAdsHero | Vertical float on each of the 3 remaining cards *(fixed 2026-09-28 — previously undefined, cards sat static)* | 5s / 5.5s / 4.5s infinite |
| `fadeIn` | EverythingIncludedSection | Active tab's screen content fades + slides up on switch | 0.4s ease-out, one-shot |
| Tab auto-advance (JS) | EverythingIncludedSection | Cycles the 6 feature tabs automatically; underline bar animates as a visual countdown | 4.5s per tab, 10s idle-resume after manual click |
| `pulse` | SimplePricingSection | "LIMITED OFFER" badge dot pulsing ring | 2s infinite |
| Accordion expand/collapse | FacebookAdsFAQ | `grid-template-rows` CSS transition opens/closes each answer; "+" icon rotates to "×" | 0.35s / 0.3s ease |
| Checkout tray slide/fade | SimplePricingSection | Clicking either pricing card's CTA slides that card into the other's grid slot (`transform: translateX`), fades the other card out, and fades the shared checkout form in in the vacated slot | 0.35–0.5s ease |
| Hover micro-interactions | Nearly every component | Buttons/cards lift (`translateY(-1px to -6px)`) with a deepened shadow; links fade or slide an underline in | 0.2–0.3s ease, on `:hover` only |

**Cross-cutting note:** No animation on the page currently respects `prefers-reduced-motion` — the 9 infinite keyframe animations above (all now functional as of the 2026-09-28 fix) run unconditionally for every visitor.
