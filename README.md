# Asian Automobiles

Premium multi-page automotive service website for Asian Automobiles, Irinjalakuda.

The design is an original automotive-editorial system built for this workshop: graphite and porcelain surfaces, a restrained copper accent, expanded Archivo display type, full-bleed workshop photography, and a calibration-scale rule (the tick marks of an alignment gauge) as its one signature detail. See `docs/DESIGN_SYSTEM.md`.

Content follows the *Website Development Specification v1.0*: 11 live pages (Home, About, Services, five service pages, Spare Parts, Contact, Privacy Policy), the PDF's copy, and only verified claims. Retired pages (Insurance, Facilities, Gallery, Reviews, FAQ, Book Service, Accident Repair) redirect permanently. Business facts live in `lib/business-facts.ts`; open owner questions are in `docs/OWNER_CHECKLIST.md`.
## Design system

One coherent system in `app/styles/` (six files, ordered by cascade layer; see `docs/DESIGN_SYSTEM.md`):

- Palette: graphite `#14191E`, charcoal `#1D252B`, steel `#27333B`, porcelain `#F2EFE8`, white,
  copper `#B87338` (fills and rules; `#8A5223` when copper is text on light), silver `#BFC9CC`.
  Semantic tokens (`--color-canvas`, `--color-text-secondary`, `--color-button`, …) live in `tokens.css`.
- Type: Archivo variable (weight and width axes), self-hosted and subset to 31 KB. Expanded widths for
  display, normal width for body, semi-expanded caps only for real data labels.
- Shape: 2px radius on buttons, inputs and chips; photographs stay square-cornered.
- Motion: CSS only. One orchestrated hero entrance, scroll-linked image unmasking where the browser
  supports it, and responses to user actions. Everything respects `prefers-reduced-motion`.
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
  layout.tsx            root layout, font, AutoRepair JSON-LD, header/footer
  page.tsx              homepage
  [...slug]/page.tsx    the ten inner pages, prerendered with generateStaticParams
  styles/               the design system (tokens, base, layout, components, home, pages)
  fonts/                Archivo subset + licence
components/
  home/                 hero (server), service index (client), homepage sections
  inner/                page frame (four hero variants, breadcrumbs) and shared sections
  interactive/          choice explorer and tyre/alignment guide (small client components)
  enquiry/              WhatsApp enquiry form (shown only once a number is confirmed)
  ui/                   ActionLink / CallButton / DirectionsButton / WhatsAppButton, JsonLd
lib/                    business facts, service catalogue, page metadata, redirects, site URL
next.config.ts          security headers (CSP, HSTS, …), image policy, redirects
```

All pages are static HTML served from the CDN; internal links use Next.js client-side
navigation with automatic prefetching. There is no animation library: motion is CSS, so the
homepage hero ships no client JavaScript at all.
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
and the touch service index.

If `next dev` is already running on port 3000, Playwright reuses that server (and `next dev`
shares the `.next/` folder with `next build`). Stop it first, or run the production build on
another port and set `PLAYWRIGHT_BASE_URL`.
