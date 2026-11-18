import { test as base, expect } from "@playwright/test";

/**
 * PLAYWRIGHT_MOCK_REMOTE_IMAGES=1 answers the browser's /_next/image requests with a neutral
 * placeholder. CI uses it because `next start`'s on-demand optimiser can stall under heavy
 * parallel load on small runners, which keeps "networkidle" from ever firing. The optimiser
 * itself is still exercised directly in security.spec.ts (production uses Vercel's optimiser).
 */
export const test = base.extend({
  page: async ({ page }, use) => {
    if (process.env.PLAYWRIGHT_MOCK_REMOTE_IMAGES === "1") {
      await page.route(/\/_next\/image\/?\?/, (route) => route.fulfill({
        contentType: "image/svg+xml",
        body: '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800"><rect width="100%" height="100%" fill="#62686b"/></svg>',
      }));
    }
    await use(page);
  },
});
export { expect };
