import { expect, test } from "./fixtures";

test("homepage presents unique services and images with working destinations", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const main = page.locator("main");
  const titles = await main.locator(".aa-svc-row h3").allTextContents();
  expect(titles).toHaveLength(6);
  expect(new Set(titles).size).toBe(titles.length);
  const services = await main.locator("a.aa-svc-row").evaluateAll((links) => links.map((link) => link.getAttribute("href")));
  expect(new Set(services).size).toBe(services.length);
  const imagePaths = (selector: string) => main.locator(selector).evaluateAll((elements) => elements.map((element) => {
    const source = new URL((element as HTMLImageElement).src);
    return new URL(source.searchParams.get("url") ?? source.href, location.origin).pathname;
  }));
  const cardImages = await imagePaths(".aa-svc-row img");
  expect(new Set(cardImages).size, "Two service cards share a photo").toBe(cardImages.length);
  // Stock photos stand in until real workshop photos arrive; no photo should appear more than twice.
  const counts = new Map<string, number>();
  for (const path of await imagePaths("img")) counts.set(path, (counts.get(path) ?? 0) + 1);
  expect([...counts].filter(([, n]) => n > 2), "Photo repeated on the homepage").toEqual([]);
  await expect(main.locator('a[href="/about/"]', { hasText: "More about us" })).toHaveCount(1);
  await expect(main.locator('a[href="/spare-parts/"]', { hasText: "Looking for a part?" })).toHaveCount(1);
  await expect(main.locator('a[href="/contact/"]', { hasText: "Contact the workshop" })).toHaveCount(1);
  await main.locator(".aa-intro__grid").screenshot({ path: testInfo.outputPath("homepage-workshop.png") });
  await main.locator(".aa-visit__grid").screenshot({ path: testInfo.outputPath("homepage-visit.png") });
  const width = await page.evaluate(() => ({ content: document.documentElement.scrollWidth, viewport: document.documentElement.clientWidth }));
  expect(width.content).toBeLessThanOrEqual(width.viewport + 2);
});
