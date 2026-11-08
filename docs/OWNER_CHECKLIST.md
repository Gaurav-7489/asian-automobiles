# Owner verification checklist (Website Development Specification v1.0, ch. 27)

Confirm each item, then update `lib/business-facts.ts` / `lib/service-catalog.ts`.

| # | Question | Currently on the site | How to switch on |
| --- | --- | --- | --- |
| M2 | Primary phone number | ✅ +91 93490 02038 — matches Google Business Profile | `phones.primary*` |
| M3 | WhatsApp number? | Hidden (unknown) — Directions shown instead | set `phones.whatsappHref` / `whatsappDisplay`; WhatsApp buttons, float button and the enquiry form appear |
| M4 | Landline active? | 0480 2828167 | `phones.landline*` |
| M5 | Email checked daily? | asianautogarage@gmail.com | `email` |
| M6/M7 | Hours, Sunday, holidays | Opens 9 AM, Sunday closed (Business Profile); closing time 7 PM still to confirm; holiday policy unknown | `hours`, `sundayClosed` |
| M8 | Building number | ✅ V/526, Irinjalakuda Kattoor Rd, Irinjalakuda, Kerala 680121 (Business Profile) | `address` |
| M9 | Google Business Profile link | ✅ Listing found (plus code 9623+V8); directions and click-to-load map use it. Paste the profile share link to replace the search link | `directionsHref`, `mapsEmbedSrc` |
| M13 | Denting & painting offered? | Page built, hidden (404) | `published: true` in `lib/service-catalog.ts` |
| M15 | Puncture repair / tyre sales? | Not mentioned | add to Tyre care copy |
| M18 | Inspect and explain before work? | Shown | `processConfirmed` |
| O1 | Established 1996 — may we show it? | Not shown | `establishedConfirmed: true` |
| O4 | Computerised / 3D alignment? | Not mentioned | add to Wheel alignment copy |
| O10 | Insurance / accident repair? | Not mentioned (pages removed) | — |
| M22 | Owner approved all copy | Pending | — |
