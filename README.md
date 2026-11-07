# Asian Automobiles

Lead-generation website for Asian Automobiles, an independent multi-brand car service
centre on Kattoor Road, Irinjalakuda. Built to the *Website Development Specification v1.0*
(Next.js App Router, TypeScript, Tailwind v4, statically generated).

## Pages (13 + 404)

| Route | Status |
| --- | --- |
| `/`, `/about`, `/services`, `/spare-parts`, `/contact`, `/privacy-policy` | Live |
| `/services/car-service-maintenance`, `mechanical-repairs`, `car-ac-service`, `wheel-alignment-balancing`, `tyre-care` | Live |
| `/services/denting-painting`, `/services/car-detailing` | Built, `published: false` (404 until the owner confirms) |

Routes from the old site (`/book-service`, `/gallery`, `/insurance`, `/services/car-ac-repair`, …)
redirect permanently — see `next.config.mjs`.

## Where to edit things

| What | File |
| --- | --- |
| Phone, WhatsApp, email, hours, address, year, map links — with verification status | `content/business.ts` |
| Service pages, cards, FAQs, related links, `published` flags, Tyre Care flags | `content/services.ts` |
| Page titles/descriptions, home and parts FAQs | `content/pages.ts` |
| Prefilled WhatsApp messages | `content/whatsappMessages.ts` |
| Images (stock vs genuine) and the workshop gallery | `content/images.ts` |
| Design tokens (colours, fonts, radii) | `app/globals.css` (`@theme`) |

Every contact value is read through helpers in `lib/links.ts` (`telHref`, `waHref`, `mapsHref`,
`mailHref`). A channel with no publishable value hides every button that uses it.

### Fact statuses

`confirmed` facts always show. `provisional` facts show in preview builds and are hidden when
`NEXT_PUBLIC_FACT_MODE=strict`. `unknown` facts never show. The establishment year is shown only
once `confirmed`.

### Switching things on once the owner confirms

- **WhatsApp:** set `business.whatsapp` to the number. All WhatsApp buttons, the WhatsApp tiles
  and both enquiry forms (WhatsApp hand-off mode) appear automatically.
- **Google Maps:** set `mapsUrl` / `mapsEmbed` from the verified Business Profile. The
  click-to-load map appears on Home and Contact.
- **Denting & Painting / Detailing:** set `published: true` in `content/services.ts`.
- **Puncture repair / tyre sales:** `flags.tyrePuncture` / `flags.tyreReplacement`.
- **Real photos:** add them to `gallery` in `content/images.ts` with `genuine: true`
  (filenames prefixed `real-`). The workshop sections appear at 4 photos (home) / 3 (about).

## Forms

The parts and contact forms share one engine (`components/forms`, `lib/validation.ts`):

- **Mode A – WhatsApp hand-off:** used when a WhatsApp number is set. No backend.
- **Mode B – email:** set `FORM_MODE=endpoint`, `ENQUIRY_TO_EMAIL`, `RESEND_API_KEY`
  (optional `ENQUIRY_FROM_EMAIL`). Posts to `app/api/enquiry/route.ts`.
- **Neither configured (current state):** the forms are hidden and replaced by a call prompt,
  so no form ever silently goes nowhere.

## Commands

```sh
npm install
npm run build
npm run test:unit
npm run test:smoke      # Playwright, starts the production server
npm run check:launch    # launch gate: fails while facts are provisional or banned wording appears
```

Before launch: complete `docs/OWNER_CHECKLIST.md`, then build with
`NEXT_PUBLIC_FACT_MODE=strict` and run `npm run check:launch`. The privacy policy must be
reviewed by a legal adviser before Mode B forms go live.
