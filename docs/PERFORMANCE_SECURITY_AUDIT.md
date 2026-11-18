# Performance, security and code-quality audit — November 2026

Scope: the whole repository (`app/`, `components/`, `lib/`, stylesheets, tests, CI, config).
Goal: make the existing site faster, smoother and more secure **without changing its design,
content or behaviour**. Every number below was measured locally on production builds
(`next build` + `next start`) of the previous `main` (“before”) and of this change (“after”).

## 1. Findings

| # | Severity | Finding | Evidence | Fix |
|---|---|---|---|---|
| F1 | High | Every inner page was rendered **on demand** | `app/[...slug]/page.tsx` awaited `searchParams` (only to pre-select a service on `/contact/`), so `next build` reported `ƒ /[...slug]` (dynamic). Each visit to About, Services, the five service pages, Spare Parts, Contact and Privacy waited for a server render; metadata was streamed into `<body>`. | `generateStaticParams` + `dynamicParams = false`; the `?service=` value is read on the client (`components/immersive/contact-enquiry-form.tsx`) inside a Suspense boundary. Build now reports `● /[...slug]` (SSG) for all ten pages; metadata is back in `<head>`. |
| F2 | High | Prefetching disabled site-wide | 30+ internal links had `prefetch={false}`; the header compensated with hand-written `router.prefetch` on hover/focus only. Clicking a link from a phone (no hover) always waited for the network. | Removed `prefetch={false}` and the manual warm-ups. Next.js now prefetches visible internal links (static pages → full RSC payload, tiny) and also on hover/touch. |
| F3 | High | **Mobile menu unusable** (pre-existing bug) | `.aa-header` is `pointer-events: none` (so the transparent bar never blocks the page) and only the bar/mega-menu opt back in. The newer full-screen menu (`.aa-mnav`) never did: every tap on an open menu went through to the page underneath (e.g. the homepage headline). Reproduced on the old build with `elementsFromPoint`. | `pointer-events: auto` on the open panel (`app/styles/polish.css`). |
| F4 | High | **No navigation at 1101–1320 px** (pre-existing bug) | Older rules hide the desktop nav and show the menu button up to 1320 px (the header script also uses 1320), but the new menu panel’s styles only applied at ≤1100 px, so between 1101 and 1320 px (e.g. 1280 px laptops) the button opened nothing. | Aligned the menu block’s breakpoint to `max-width: 1320px`. Closed-header appearance at those widths is unchanged (screenshot-compared). |
| F5 | Medium | 18 global stylesheets, ~45 % unreachable | 524 KB / 18,384 lines of source CSS shipped as 7 render-blocking files (446 KB raw, 78 KB gzip) on every page. 2,589 selectors referenced classes that no component can render (retired designs v8–v14, old pages, removed widgets). 2,107 `!important`. | Purged unreachable selectors with a PostCSS + selector-parser pass (classes/ids checked against every token in the source, dynamic `theme-*`/`aa-v11-hero-*`/`aa-v10-button-*` names whitelisted, `:not()`/`:is()` handled), removed declarations that a later rule with the identical selector and context always overrides, dropped 7 unused `@keyframes`. Moved the files to `app/styles/` behind one ordered `index.css`. |
| F6 | Medium | Dead React code | Five component files and ten exports were never imported (`interactive.tsx` – custom cursor, `premium-effects.tsx`, `mobile-page-focus.tsx` + its CSS, `process-hover.tsx`, `workshop-experiences.tsx`, `ExpandGallery`, `ClaimDeck`, `AccidentIntakeStrip`, `BodyworkDamageGuide`, `WorkshopFloorExplorer`, `ReviewProofBoard`, `FaqRouteCards`, `BookingJourney`). Seven unused placeholder SVGs. `data-magnetic` attributes left over from the deleted cursor script still forced 12+ elements onto their own GPU layer (`will-change: transform`). | Deleted; `tsconfig` now has `noUnusedLocals`/`noUnusedParameters` so it cannot creep back. |
| F7 | Medium | Wasted animation work on the homepage | `ImmersiveHero` created two springs, four scroll transforms and a pointer-move handler whose outputs were no longer attached to anything; they still ran on every scroll/pointer event. The headline reveal was a JS animation, so the above-the-fold headline stayed hidden until hydration. | Kept only the scroll meter’s motion value; headline reveal moved to CSS (`app/styles/motion.css`, same easing/duration/stagger) so it runs from first paint. |
| F8 | Medium | Full Framer Motion bundle on every page, reduced-motion not honoured | `motion.*` components pull in every feature; several components animated transforms regardless of `prefers-reduced-motion`. | `LazyMotion` + `m.*` with `domAnimation` features loaded asynchronously; `MotionConfig reducedMotion="user"`. |
| F9 | Medium | Dependency advisory | `npm audit`: PostCSS ≤ 8.5.22 (GHSA-qx2v-qp2m-jg93, GHSA-6g55-p6wh-862q, GHSA-fxqj-rqcc-2cmp, GHSA-r28c-9q8g-f849) via the copy pinned inside `next@15.5.29`; the suggested fix was a breaking upgrade to Next 16. | npm `overrides` → `postcss@^8.5.33` (semver-compatible). `npm audit`: 0 vulnerabilities. |
| F10 | Medium | No security headers | Only `poweredByHeader: false`. | CSP, HSTS, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, COOP in `next.config.ts` (see §3). |
| F11 | Low | Image optimiser wider than needed | Allowed any `images.unsplash.com` URL (no longer used) and any quality value. | Remote hosts removed; `localPatterns` limited to `/images/**`; fixed list of qualities. |
| F12 | Low | Duplicated sources of truth | Redirect map in `next.config.mjs` **and** `lib/service-catalog.ts`; page list in the router, metadata map and sitemap; site URL in four files; `wa.me` URL built in two places; ~25 hand-built `tel:` links; two button implementations (`CTA/Call/Directions/WhatsAppAction` vs homepage `Btn`); two FAQ sections; two end-of-page CTA bands; four inline JSON-LD serialisers. | One module each: `lib/redirects.ts`, `lib/page-meta.ts`, `lib/site.ts`, `whatsappLink`/`phoneTel`/`landlineTel` in `lib/business-facts.ts`, `components/ui/action-link.tsx`, `components/inner/sections.tsx` (`FaqSection`, `PageCTA`, `SectionHead`, …), `components/ui/json-ld.tsx`. |
| F13 | Low | Missing favicon | `metadata.icons` pointed to `/favicon.ico`, which does not exist → a 404 on every page view. | `app/icon.svg` matching the header’s “AA” mark. |
| F14 | Low | Logo link name did not contain its visible text (WCAG 2.5.3) | Lighthouse `label-content-name-mismatch`. | The link is named by its visible text. |
| F15 | Low | Stale tests | 27 of 83 tests failed on the old build, mostly selectors from a previous menu (`.aa-menu-direct`, `.aa-mobile-panel`), a hidden scroll link, and a URL-parsing bug in a test. They masked F3/F4. | Updated to the current markup; new navigation and security suites. |

### `!important` reduction (follow-up)

865 of the 1,492 `!important` flags left after the purge were removed. Each was proven redundant by a
static cascade analysis over the real DOM of every page (including the WhatsApp-enabled variant):
selectors are relaxed so they match in every state (hover, focus, `is-*` classes, `aria-*`, `:not()`),
and a flag is dropped only if, for every element and pseudo-element it reaches, its order against every
co-applicable declaration of an overlapping longhand — and against inline styles — is unchanged
(specificity, source order and media width ranges, iterated to a fixed point). Animated properties
(`transform`, `opacity`, `filter`, `scale`) were not touched. Verified empirically: computed styles of
every element at 27 viewport configurations (one inside every breakpoint band, plus short landscape)
on all pages and in open-menu/scrolled states match the previous build (only the elements that also
vary between two runs of the old build differ); the hover and keyboard-focus end states of 1,201
links/buttons at 1440 px, 1200 px and phone size match exactly; full-page screenshots differ by at most
2 pixels; all browser tests pass. The remaining 627 flags each decide a real cascade conflict
(removing them would change the rendered site) or apply to properties held against animations or
elements that are never rendered; removing those requires rewriting selectors, not just flags.

Not changed on purpose: the design, copy, routes, redirects, structured data, business facts
and every working interaction. The homepage shows `spare-parts.jpg` twice (parts service card
and parts section); that is a content choice to revisit when real workshop photos arrive.

## 2. Verification that nothing visual changed

* **Computed styles:** a script captured `getComputedStyle` for every element and `::before`/`::after`
  on all 11 pages + the 404 at 375, 768 and 1440 px (≈ 36 page snapshots), before and after.
  Two identical runs of the old build differ by ~200 values (transition timing noise), so that is
  the noise floor. After the refactor and the CSS purge the only differences were that noise plus
  the intended removal of `data-magnetic`’s `will-change`/`backface-visibility`.
* **Screenshots:** full-page screenshots of every page at 375/768/1440 px plus the open mobile menu
  and desktop mega menu. All page heights are identical; remaining pixel differences are
  sub-pixel anti-aliasing on elements that are no longer forced onto GPU layers.

## 3. Security configuration

`next.config.ts`:

| Header | Value |
|---|---|
| Content-Security-Policy | `default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; frame-src https://www.google.com https://maps.google.com; media-src 'self'; worker-src 'self' blob:; manifest-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests` |
| Strict-Transport-Security | `max-age=63072000; includeSubDomains` |
| X-Content-Type-Options | `nosniff` |
| X-Frame-Options | `DENY` |
| Referrer-Policy | `strict-origin-when-cross-origin` |
| Permissions-Policy | `camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()` |
| Cross-Origin-Opener-Policy | `same-origin` |

Input handling: the site has no server endpoints, no database and no secrets. The only
user-controlled inputs are the `?service=` query parameter (validated against the published
catalogue, never rendered into HTML) and the WhatsApp enquiry form (currently hidden until a
WhatsApp number is confirmed). The form now has length limits and patterns, strips control
characters, and URL-encodes the message through the single `whatsappLink` helper. JSON-LD is
serialised with `<` escaped. All `target="_blank"` links use `rel="noopener noreferrer"`. The
Google Maps iframe loads only after the visitor asks and sends only the origin as referrer.
Redirects are a fixed internal map, so they cannot be pointed off-site.

Secrets: no credentials in the tree or in git history (an old `.env.example` contained only an
empty `RESEND_API_KEY=` placeholder). The only environment variable read is the public
`NEXT_PUBLIC_SITE_URL`.

Automated checks (`tests/e2e/security.spec.ts`, run in CI): headers on pages and metadata routes,
zero CSP violations while browsing every page and opening the map, the image optimiser rejects
remote URLs/other local files/unlisted qualities/sizes, redirects stay on-origin
(`//example.com/` etc.), query strings are never reflected, every link uses an expected protocol
and every new-tab link has `noopener`.

### Remaining risks and recommendations

* `script-src 'unsafe-inline'`: required by Next.js’ inline bootstrap scripts on statically
  generated pages (nonces need per-request rendering, which would undo F1). Risk is low because no
  user input is ever written into HTML. Revisit if the site gains server-rendered user content.
* HSTS `preload` is not set. Add it only after the custom domain and all its sub-domains serve HTTPS.
* `next start` logs `NoFallbackError` for unknown URLs because of `dynamicParams = false` (the
  response is still a correct 404). On Vercel unknown paths are answered by the platform router.
* CI serves placeholder images to the browser tests (`PLAYWRIGHT_MOCK_REMOTE_IMAGES=1`): `next start`’s
  on-demand image optimiser intermittently stalls under parallel load on small runners. The real
  optimiser is still tested directly; production uses Vercel’s image service.
* Consider Vercel’s firewall/rate limiting if the image optimiser or 404s are ever abused; the
  site itself has no write endpoints to protect.

## 4. Measurements

Local production builds, same machine. Lighthouse 12.8 (mobile = simulated Moto G Power,
4× CPU slowdown, slow 4G; desktop preset). Transfer sizes are gzip-9 of what each page references.

| Metric | Before | After |
|---|---|---|
| Inner-page rendering | Dynamic (server render per request) | Static (prerendered, CDN-cacheable) |
| CSS shipped per page | 7 files, 446.6 KB raw / 78.2 KB gzip | 2 files, ~231 KB raw / ~39 KB gzip |
| Source CSS | 524 KB, 18,384 lines, 2,107 `!important` | ~290 KB, ~11,350 lines, 627 `!important` |
| JS per page (gzip, incl. legacy polyfills) | home 207.6 KB · inner 218.8 KB | home ~200 KB · inner ~197 KB |
| Next.js “First Load JS” | home 163 kB · inner 170 kB | home 143 kB · inner 151 kB |
| HTML (About, gzip) | 13.2 KB | 12.3 KB |
| Lighthouse mobile perf (home / about / tyre-care / contact) | 92 / 91 / 89 / 88 | 92 / 94 / 93 / 95 |
| Lighthouse mobile LCP (simulated) | 3.30 / 3.51 / 3.58 / 3.58 s | 3.25 / 3.11 / 3.14 / 2.95 s |
| Lighthouse desktop perf | 100 on all four | 100 on all four |
| Lighthouse mobile FCP | 1.51–1.52 s | 1.06–1.22 s |
| Lighthouse desktop FCP / LCP | 0.37 s / 0.71–0.76 s | 0.29 s / 0.60–0.68 s |
| CLS | 0.000 | 0.000 |
| Lighthouse Best Practices | 96 | 100 |
| Lighthouse Accessibility | 96 | 96 (remaining flags: mid-animation contrast samples) |
| Lighthouse SEO (inner pages) | 91–92 | 100 |
| Warm internal navigation (click → new heading on screen, desktop, after prefetch) | n/a (pages rendered per request, no prefetch without hover) | 121 / 150 / 115 ms (About / Spare Parts / Contact) |
| `npm audit` | 1 high, 1 moderate | 0 |
| Playwright suite | 56 passed / 27 failed / 17 skipped (83 tests, 13.4 min) | 104 passed / 0 failed / 20 skipped (124 tests, 4.0 min) |

Limitations: these are lab numbers on a local server without a CDN; field Core Web Vitals
(INP in particular) need real-user data, e.g. Vercel Speed Insights. Lighthouse’s simulated mobile
LCP (~3 s) tracks time-to-interactive — the shared React/Next.js runtime (~110 KB gzip) on a
4×-slowed CPU — while the observed LCP on the same runs is 0.16–0.53 s. Lighthouse’s remaining
accessibility flags are contrast samples taken mid fade-in; the axe contrast suite run after
animations settle passes on every page.
