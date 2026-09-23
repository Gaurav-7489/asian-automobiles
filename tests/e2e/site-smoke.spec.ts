import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/about/",
  "/services/",
  "/services/car-service/",
  "/services/car-ac-repair/",
  "/services/accident-repair/",
  "/services/denting-painting/",
  "/services/wheel-alignment/",
  "/services/tyre-services/",
  "/spare-parts/",
  "/services/spare-parts/",
  "/insurance/",
  "/facilities/",
  "/gallery/",
  "/reviews/",
  "/contact/",
  "/faq/",
  "/book-service/",
  "/request-quote/",
];

for (const route of routes) {
  test(`${route} renders without runtime or responsive failures`, async ({ page }) => {
    const errors: string[] = [];

    page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(`console: ${message.text()}`);
    });

    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(response, `No navigation response for ${route}`).not.toBeNull();
    expect(response!.status(), `Unexpected status for ${route}`).toBe(200);

    await expect(page.locator("main").first()).toBeVisible();

    const overflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));

    expect(
      overflow.scrollWidth,
      `Horizontal overflow on ${route}: ${overflow.scrollWidth}px vs ${overflow.clientWidth}px`,
    ).toBeLessThanOrEqual(overflow.clientWidth + 2);

    expect(errors, `Runtime/console errors on ${route}`).toEqual([]);
  });
}

test("unknown route returns a real 404", async ({ page }) => {
  const response = await page.goto("/this-route-should-never-exist-aa/", {
    waitUntil: "domcontentloaded",
  });
  expect(response).not.toBeNull();
  expect(response!.status()).toBe(404);
  await expect(page.getByText("404 / WRONG TURN")).toBeVisible();
});

test("mobile navigation opens, is usable, and closes", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes("mobile"), "Mobile-only navigation check");

  await page.goto("/", { waitUntil: "domcontentloaded" });

  const toggle = page.getByRole("button", { name: "Open menu" });
  await expect(toggle).toBeVisible();
  await toggle.click();

  const panel = page.locator(".aa-mobile-panel");
  await expect(panel).toBeVisible();
  await expect(page.getByRole("link", { name: /General service & repair/i })).toBeVisible();

  await page.getByRole("button", { name: "Close menu" }).click();
  await expect(page.locator(".aa-header-v5")).not.toHaveClass(/is-open/);
});
