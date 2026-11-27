# Asian Automobiles

Premium multi-page automotive service website for Asian Automobiles, Irinjalakuda.

The UI is an original implementation inspired by the structural language observed in the Fixonic Webflow demo: oversized editorial typography, dark/off-white contrast, image-led sections, restrained hover interactions, horizontal proof cards, strong CTAs and technical details. It does not copy Fixonic's proprietary source/assets.

Content follows the *Website Development Specification v1.0*: 11 live pages (Home, About, Services, five service pages, Spare Parts, Contact, Privacy Policy), the PDF's copy, and only verified claims. Retired pages (Insurance, Facilities, Gallery, Reviews, FAQ, Book Service, Accident Repair) redirect permanently. Business facts live in `lib/business-facts.ts`; open owner questions are in `docs/OWNER_CHECKLIST.md`.
## Design system

The template's layout and components are kept; colour, type, shape and effects follow the
specification (chapter 5), applied in `app/styles/spec-design-system.css` and refined by `app/styles/polish.css`:

- Palette (final, approved): carbon black, porcelain white and burnt orange, roughly 55% light /
  40% dark / 5% orange. `app/styles/tokens.css` is the single source; every stylesheet uses its
  `--brand-*` tokens (and the `-rgb` variants for transparency).

  | Token | Value | Use |
  |---|---|---|
  | `--brand-ink` | `#101010` | Carbon black: dark sections, headings on light |
  | `--brand-charcoal` | `#1C1C1C` | Elevated dark surface (cards, panels) |
  | `--brand-paper` | `#F5F5F5` | Porcelain white: light sections, text on dark |
  | `--brand-surface` | `#EAEAEA` | Secondary light surface |
  | `--brand-line` / `--brand-line-dark` | `#DADADA` / `#303030` | Borders on light / on dark |
  | `--brand-slate` / `--brand-muted` | `#595959` / `#B3B3B3` | Secondary text on light / on dark |
  | `--brand-accent` | `#B94D20` | Burnt orange **fills**: primary actions, active states, small marks |
  | `--brand-on-accent` | `#F5F5F5` | Text on burnt orange (carbon fails 4.5:1 there) |
  | `--brand-accent-strong` | `#A33D16` | Orange **text/icons on light** surfaces |
  | `--brand-accent-soft` | `#E58A5C` | Orange **text/icons on dark** surfaces (burnt orange is 3.8:1 on carbon) |
  | `--brand-photo-grade` | CSS filter | One static cinematic grade applied to every photograph |

- Type: Manrope (headings) and Inter (body), self-hosted in `app/fonts/`.
- Shape: 4px buttons, 8px cards. No glow gradients, custom cursor, parallax or smooth-scroll effects.
- Colour contrast is tested on every page (`tests/e2e/contrast.spec.ts`).

## Connected customer flow

Services are defined once in `lib/service-catalog.ts` and reused by the header,
homepage, service selector, related links, sitemap and enquiry form. Business facts
(phones, address, hours, WhatsApp) live in `lib/business-facts.ts`; every `tel:`,
`wa.me` and Google Maps link is built there.

Every "Book" / "Start enquiry" action leads to `/contact/#enquiry`, optionally with
`?service=<id>`. The contact page is static; the selected service is read on the client
and only ids from the published catalogue are accepted. The WhatsApp enquiry form and
buttons appear only once a WhatsApp number is confirmed; until then the page offers
call and directions. Opening WhatsApp is not a confirmed booking.

Retired URLs (`lib/redirects.ts`) redirect permanently (308) to their canonical pages.

## Architecture

```text
app/
  layout.tsx            root layout, fonts, LocalBusiness JSON-LD, header/footer
  page.tsx              homepage
  [...slug]/page.tsx    the ten inner pages, prerendered with generateStaticParams
  styles/index.css      the global stylesheet (ordered cascade) + motion.css
components/
  ui/                   ActionLink / CallButton / DirectionsButton / WhatsAppButton, JsonLd
  inner/                inner-page frame (breadcrumbs, hero, rail) and shared sections
  immersive/            interactive client widgets (FAQ, timelines, labs, enquiry form)
lib/                    business facts, service catalogue, page metadata, redirects, site URL
next.config.ts          security headers (CSP, HSTS, …), image policy, redirects
```

All pages are static HTML served from the CDN; internal links use Next.js client-side
navigation with automatic prefetching. Framer Motion loads its animation features
asynchronously (`components/motion-provider.tsx`) and respects reduced-motion settings.
See `docs/PERFORMANCE_SECURITY_AUDIT.md` for the audit, measurements and remaining risks.

## Verification

```sh
npm ci
npm run typecheck
npm run build
npx playwright install chromium
npm run test:smoke
npm audit --omit=dev
```

Playwright starts the production server automatically. Set `PLAYWRIGHT_BASE_URL`
to test an existing server, or `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to use an
existing Chromium binary. Tests cover every route, client-side navigation (desktop and
mobile menus, back/forward, refresh), redirects, prefetching, security headers and CSP,
the image optimiser policy, colour contrast, responsive layout from 320 px to 1920 px,
and the mobile card stack.
