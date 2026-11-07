# Asian Automobiles

Premium multi-page automotive service website for Asian Automobiles, Irinjalakuda.

The UI is an original implementation inspired by the structural language observed in the Fixonic Webflow demo: oversized editorial typography, dark/off-white contrast, image-led sections, restrained hover interactions, horizontal proof cards, strong CTAs and technical details. It does not copy Fixonic's proprietary source/assets.

Business/content requirements are based on the supplied Asian Automobiles Website Development & Design Blueprint. Unverified claims are intentionally marked for confirmation.
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
