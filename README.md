# Asian Automobiles

Premium multi-page automotive service website for Asian Automobiles, Irinjalakuda.

The UI is an original implementation inspired by the structural language observed in the Fixonic Webflow demo: oversized editorial typography, dark/off-white contrast, image-led sections, restrained hover interactions, horizontal proof cards, strong CTAs and technical details. It does not copy Fixonic's proprietary source/assets.

Content follows the *Website Development Specification v1.0*: 11 live pages (Home, About, Services, five service pages, Spare Parts, Contact, Privacy Policy), the PDF's copy, and only verified claims. Retired pages (Insurance, Facilities, Gallery, Reviews, FAQ, Book Service, Accident Repair) redirect permanently. Business facts live in `lib/business-facts.ts`; open owner questions are in `docs/OWNER_CHECKLIST.md`.
## Design system

The template's layout and components are kept; colour, type, shape and effects follow the
specification (chapter 5), applied in `app/spec-design-system.css` (loaded last):

- Palette: graphite `#111820`, charcoal `#202A32`, warm white `#F5F5F2`, white, amber `#D58A3A`
  (actions/accents), amber-700 `#9A5A1C` (on light), grey `#87919A` / slate `#5C6670` (secondary text).
- Type: Manrope (headings) and Inter (body), self-hosted in `app/fonts/`.
- Shape: 4px buttons, 8px cards. No glow gradients, custom cursor, parallax or smooth-scroll effects.
- Colour contrast is tested on every page (`tests/e2e/contrast.spec.ts`).

## Connected customer flow

Services are defined once in `lib/service-catalog.ts` and reused by the header,
homepage, service selector and enquiry form. Service pages connect to related
services; the facility map and gallery connect to the relevant detail pages.

`/book-service/` is the single enquiry form for service, repairs, quotes, accident
assistance and parts. A service selection and optional symptom / parts category
carry through to the prepared WhatsApp message. Customers must send that message
and confirm availability with the workshop; opening WhatsApp is not a confirmed
booking.

Old short service URLs and `/services/spare-parts/` redirect permanently to their
canonical pages. `/request-quote/` redirects to `/book-service/?intent=quote`,
preserving a valid selected service and optional detail. The sitemap lists only
canonical pages.

## Security

- Security headers on every response (`next.config.mjs`): Content-Security-Policy (self-only
  scripts, styles, images, fonts; Google Maps is the only allowed frame; `frame-ancestors 'none'`),
  HSTS, `X-Frame-Options: DENY`, `nosniff`, strict Referrer-Policy, Permissions-Policy, COOP.
- No backend, database, login or form submission to our server: there is nothing to inject into.
  The enquiry flow hands off to WhatsApp / phone / email only.
- Structured data is serialised with `lib/json-ld.ts`, which escapes `<`, `>` and `&`.
- All images and fonts are self-hosted; no third-party scripts or trackers.
- `npm audit` is clean (PostCSS is pinned to a patched version via `overrides`).
- Tested in `tests/e2e/security-and-feel.spec.ts`.

## Performance and feel

- Every page is pre-rendered at build time (`generateStaticParams`), so navigation is served
  from the CDN and links are prefetched.
- A progress bar (`components/nav-feedback.tsx`) starts the moment a link is tapped; buttons
  and links have press states (`app/interaction.css`).
- Photos live in `public/images/photos/` (see `CREDITS.md`) and are served as resized WebP.

## Verification

```sh
npm install
npm run build
npx playwright install chromium
npm run test:smoke
```

Playwright starts the production server automatically. Set `PLAYWRIGHT_BASE_URL`
to test an existing server, or `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to use an
existing Chromium binary. Tests cover routes, redirects, mobile navigation,
service selection, parts handoff and the generated WhatsApp message without
sending a customer enquiry.

For network-restricted runners, `PLAYWRIGHT_MOCK_REMOTE_IMAGES=1` substitutes
remote image responses for interaction and layout checks; it does not verify
external imagery availability.
