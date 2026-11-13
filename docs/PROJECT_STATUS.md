# Project status — Asian Automobiles website

_Last updated: 13 Nov 2026_

## Summary

The site is **technically ready for production**. The code builds, all automated tests pass
(desktop + phone), security headers are in place, and dependencies have no known
vulnerabilities. What's left is **business information only the owner can confirm**, plus
pointing a domain at the deployment.

## Done

| Area | Status |
| --- | --- |
| Pages | 11 live pages: Home, About, Services, 5 service pages, Spare Parts, Contact, Privacy Policy. Old URLs redirect permanently. Real 404 page. |
| Responsive | Checked at 320, 390, 430, 768, 844, 1024, 1180, 1280, 1320, 1440 and 1920 px wide. No horizontal scrolling, no clipped text. |
| Speed | Every page is pre-rendered (served straight from the CDN). Links prefetch. Photos are resized and served as WebP. |
| Feel | Instant tap feedback: a progress bar starts as soon as a link is tapped, and buttons visibly press. |
| Images | 14 real photos (Unsplash licence, free for commercial use), self-hosted. Replaced all placeholder drawings. |
| Security | CSP, HSTS, clickjacking protection, no-sniff, strict referrer and permissions policies. No server forms or database to attack. `npm audit`: 0 vulnerabilities. |
| SEO | Titles/descriptions per page, canonical URLs, sitemap, robots.txt, LocalBusiness (AutoRepair), Breadcrumb and FAQ structured data. |
| Accessibility | Colour contrast tested on every page, keyboard focus ring, skip link, reduced-motion support. |
| Tests | 89 Playwright checks across desktop and phone, all passing. CI runs them on every push to `main`. |

## Bugs fixed in this pass

1. **Mobile menu could not be tapped.** The open menu let taps fall through to the page behind it.
2. **Menu button did nothing on tablets/small laptops (1101–1320 px).** The button showed, but the menu stayed hidden.
3. **"Tap, nothing, then the page pops in."** Pages were rendered on the server for every visit, and prefetching was turned off. Pages are now pre-built and prefetched, and a tap shows feedback right away.
4. **Missing favicon** caused a 404 error on every page.
5. **Slow first image load.** AVIF conversion was slow, so images are now served as WebP.
6. **Screen readers heard "02Services"** in the menu. The decorative numbers are now hidden from them.
7. Removed dead code (3 unused components, 1 unused stylesheet, a hidden link).

## Needs the owner (blocks "final" launch)

See `docs/OWNER_CHECKLIST.md` for the full list. The important ones:

- **WhatsApp number.** Once it's set in `lib/business-facts.ts`, the WhatsApp buttons and enquiry form turn on automatically.
- **Closing time** (currently shows 7 PM, unconfirmed) and holiday policy.
- **May we show "Established 1996"?**
- **Is denting & painting offered?** The page is built but hidden.
- **Real workshop photos.** Current photos are good stock images. Swap them for real ones with the same file names in `public/images/photos/`.
- **Owner approval of all copy.**

## Needs a deploy step

- **Domain.** Set `NEXT_PUBLIC_SITE_URL` (for example `https://www.asianautomobiles.in`) in the hosting settings. Canonical URLs, the sitemap and structured data all use it. If it isn't set, they fall back to `asian-automobiles.vercel.app`.
- **Google Business Profile link.** Paste the profile's share link to replace the search link (`directionsHref`).
- Optional: submit the sitemap in Google Search Console.

## Known trade-offs

- The CSP allows `'unsafe-inline'` scripts. Next.js needs that for statically pre-rendered pages, because nonces would force every page to be server-rendered and slow again. The risk is low: the site has no user-generated content and loads no third-party scripts.
- The stylesheet is large (~19k lines across layered files from earlier design rounds). It works and is tested, but merging it into one file would make future edits easier. This doesn't block launch.
