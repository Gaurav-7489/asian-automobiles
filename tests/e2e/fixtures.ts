import { test as base, expect } from "@playwright/test";

/** Optional image fixture for runners that cannot reach Unsplash. */
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
