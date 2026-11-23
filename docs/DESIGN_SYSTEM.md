# Design system — premium automotive redesign (November 2026)

Branch `feat/premium-automotive-redesign`. Content, business facts, routes, redirects, structured
data and security configuration are unchanged; this is a visual and front-end architecture change.

## 1. What the audit found

| Area | Finding | Resolution |
|---|---|---|
| CSS | 18 stylesheets (~10,900 lines) layered as v8 → v14 overrides, 627 `!important`, Tailwind imported only for its reset | Replaced by six files in cascade layers; no `!important` except the global reduced-motion override |
| Patterns | Three hero styles, four card-grid variants, five bespoke tab widgets (scanner, climate console, parts orbit, about timeline, service board), a page progress rail | One page frame with four hero compositions; one `ChoiceExplorer`; the tyre SVG kept as `TyreGuide`; progress rail removed |
| Typography | 9–10 px tracked caps above every heading; two generic families | Archivo variable, one file; labels only where they carry data |
| Photos | `car-profile.jpg` (BMW M4 in a field) reads as a dealership; `service-area.jpg` is a US truck shop | Both no longer used. Remaining stock photos are graded consistently by CSS and never captioned as the workshop |
| Motion | Framer Motion loaded site-wide; sequential content hidden behind hover | No animation library; CSS only; sequences (process steps) are always visible |
| Content order | Related services rendered after the page's closing CTA | `Frame` has a `cta` slot that always renders last |

## 2. Direction

Graphite and porcelain surfaces, copper used sparingly, expanded grotesk display type and full-bleed
workshop photography. One signature detail, the **calibration scale** (`.aa-gauge`, `--gauge-image`):
the tick marks of an alignment gauge. It appears under the homepage headline, under photo heroes,
as the rail joining process steps, and above the footer. The **job card** (`.aa-jobcard`) frames
"what to tell us" lists like the workshop's own paperwork.

## 3. Tokens (`app/styles/tokens.css`)

| Token | Value | Use |
|---|---|---|
| `--color-canvas` | `#F2EFE8` porcelain | Page background |
| `--color-surface` / `-alt` | `#FFFFFF` / `#E8E4DA` | Panels / alternating sections |
| `--color-surface-dark` / `-2` / `-3` | `#14191E` / `#1D252B` / `#27333B` | Dark sections, footer, image backing |
| `--color-text-primary` | `#14191E` | |
| `--color-text-secondary` | `#4E5961` | 6.2:1 on porcelain |
| `--color-text-inverse(-secondary)` | `#F2EFE8` / `#BFC9CC` | 9:1 on charcoal |
| `--color-accent` | `#B87338` copper | Fills, rules, text on dark (4.7:1 on graphite) |
| `--color-accent-ink` | `#8A5223` | Copper as text on light (5.5:1) |
| `--color-button` / `-text` / `-hover` | copper / graphite / `#CB8A4E` | Primary action (4.7:1) |
| `--color-focus` | copper | 2 px outline, 3 px offset |
| `--muted` | `#75818A` | Decorative only, or large text on dark (3.8:1) |

Type scale (fluid `clamp()`): label 12 px, small 14, body 16→18, lead 18→22, h4 19→22, h3 22→32,
h2 32→60, h1 38→88, hero 44→120. Display text is set at `font-stretch: 112–118%`, body at 100 %.

Layers: `reset → base → components → layout → pages`. A later layer always wins, so selectors stay
flat and never need weight tricks. Chrome (header, footer) sits after components so it can refine
a `.aa-btn` used inside it.

## 4. Components

| Component | File | Notes |
|---|---|---|
| `ActionLink`, `CallButton`, `DirectionsButton`, `WhatsAppButton` | `components/ui/action-link.tsx` | Tones: primary, dark, light, ghost. Hover is a left-to-right fill. WhatsApp falls back to directions until a number is confirmed |
| `Frame` | `components/inner/page-frame.tsx` | Hero variants `photo`, `split`, `index`, `plain`; breadcrumbs + JSON-LD; related services; `cta` slot |
| `SectionHead`, `SpecList`, `Steps`, `PageCTA`, `FaqSection`, `Disclosures`, `Note` | `components/inner/sections.tsx` | All server components. FAQs are native `<details>` (no JS, answers in HTML) with FAQPage JSON-LD |
| `ChoiceExplorer` | `components/interactive/choice-explorer.tsx` | `aria-pressed` buttons, live panel, stacked cross-fading photos |
| `TyreGuide` | `components/interactive/tyre-guide.tsx` | Alignment and wear diagram; readouts labelled as examples |
| `HomeHero` | `components/home/hero.tsx` | Server component; entrance is CSS from first paint |
| `ServiceIndex` | `components/home/service-index.tsx` | One image per service: a shared preview panel ≥ 1100 px, inline thumbnails below |

## 5. Page compositions

- **Home**: photo hero → service desk (hours, phones, directions) → introduction → service index →
  full-bleed detail photo with overlapping reasons panel → enquiry process → parts job card →
  location and service area → FAQ → photo CTA.
- **Services**: dark typographic hero flowing into an alternating editorial directory.
- **Service pages**: full-bleed photo hero; each page has its own interactive or comparison section.
- **About, Spare parts**: split hero (title beside a tall photo) and a job card.
- **Contact**: phone numbers in the hero itself; enquiry guidance next; click-to-load map.
- **Privacy**: plain reading layout with a sticky table of contents and no animation.

## 6. Motion

One orchestrated moment per page: photo settles, headline lines rise, the gauge draws. Images
unmask as they scroll into view where `animation-timeline: view()` is supported, with no JavaScript;
elsewhere they simply appear. Everything else answers an action: button fill, menu wipe,
explorer cross-fade, tyre measure line drawing, FAQ height. `prefers-reduced-motion` disables all of it.

## 7. Tests changed, and why

Behavioural assertions are unchanged. Only selectors and values tied to the old markup changed:

- Old selectors → new ones: `.aa-skip-card` → `.aa-svc-row`, `.aa-v13-service-board` →
  `.aa-directory__item`, `.aa-v10-feature-card` → directory heading link, `.creative-heading` →
  `.aa-page-hero__text`, `.aa-v13-about-line` → `.aa-explorer__choices`, `.aa-header-v5` → `.aa-header`.
- "Book service" / "Book a service" → "Make an enquiry": the site has no booking system, so the
  label now says what happens.
- 404 copy "404 / WRONG TURN" → heading "Page not found".
- Desktop navigation breakpoint 1320 px → 1100 px. The leaner navigation fits at tablet-landscape widths.
- The sticky card-stack test is replaced by a touch test of the service index: every row visible,
  thumbnail inline, tap target ≥ 44 px, and navigation works.
- The tyre-guide colour test now checks the light panel's colours and adds keyboard operation.

## 8. Measurements

Production build, Lighthouse 12.8.2 mobile preset (simulated slow 4G, 4× CPU), local machine.

| | Before (audit doc) | After |
|---|---|---|
| First Load JS, home / inner | 143 kB / 151 kB | 111 kB / 117 kB |
| Fonts | Manrope + Inter, 73 KB | Archivo subset, 31 KB |
| Source CSS | ~290 KB, 18 files | 74 KB, 6 files (one 54 KB built stylesheet, 1 request) |
| Lighthouse perf, home | 92 | 97 (three runs: 97, 97, 97) |
| Lighthouse perf, about / tyre-care / contact / services | 94 / 93 / 95 / – | 97 / 98 / 99 / 98 (single runs) |
| Accessibility / Best practices / SEO | – | 100 / 100 / 100 on all five pages measured |
| CLS | – | 0 on all pages measured |
| LCP (simulated mobile) | – | home 2.6–2.7 s; inner pages 2.1–2.5 s |

## 9. Follow-ups for the owner

- Replace the stock photographs with real photos of the workshop (same file names in
  `public/images/photos/`). The design is built around full-bleed photography, so this is the single
  biggest remaining improvement.
- The WhatsApp enquiry form is styled but hidden until a number is confirmed (`lib/business-facts.ts`).
  Check it visually when the number is added.
