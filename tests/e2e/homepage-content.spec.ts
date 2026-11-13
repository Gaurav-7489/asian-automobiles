import { expect, test } from "./fixtures";

test("homepage presents unique services and images with working destinations", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const main = page.locator("main");
  const titles = await main.locator(".aa-skip-card h3").allTextContents();
  expect(titles).toHaveLength(6);
  expect(new Set(titles).size).toBe(titles.length);
  const services = await main.locator(".aa-skip-card a").evaluateAll((links) => links.map((link) => link.getAttribute("href")));
  expect(new Set(services).size).toBe(services.length);
  const images = await main.locator("img").evaluateAll((elements) => elements.map((element) => {
    const source = new URL((element as HTMLImageElement).src);
    return new URL(source.searchParams.get("url") ?? source.href, location.origin).pathname;
  }));
  expect(new Set(images).size, "Homepage reuses an image in another section").toBe(images.length);
  // Some home sections are trimmed on phones by design, so check the links exist rather than visibility.
  await expect(main.locator('a[href="/about/"]', { hasText: "More about us" })).toHaveCount(1);
  await expect(main.locator('a[href="/spare-parts/"]', { hasText: "Looking for a part?" })).toHaveCount(1);
  await expect(main.locator('a[href="/contact/"]', { hasText: "Contact the workshop" })).toHaveCount(1);
  if (await main.locator(".aa-home-workshop-grid").isVisible()) {
    await main.locator(".aa-home-workshop-grid").screenshot({ path: testInfo.outputPath("homepage-workshop.png") });
    await main.locator(".aa-location-grid").screenshot({ path: testInfo.outputPath("homepage-visit.png") });
  }
  const width = await page.evaluate(() => ({ content: document.documentElement.scrollWidth, viewport: document.documentElement.clientWidth }));
  expect(width.content).toBeLessThanOrEqual(width.viewport + 2);
});
