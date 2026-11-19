import { expect, test } from "./fixtures";

test("workshop photo motion follows desktop scroll and stops when motion is reduced", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chromium", "Scroll effects are enabled for fine pointers");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const photo = page.locator(".aa-workshop-showcase-frame img");
  await expect.poll(() => photo.evaluate((image) => image.style.transform)).toContain("scale");
  const before = await photo.evaluate((image) => image.style.transform);
  await photo.scrollIntoViewIfNeeded();
  await expect.poll(() => photo.evaluate((image) => image.style.transform)).not.toBe(before);

  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect.poll(() => photo.evaluate((image) => image.style.transform)).toBe("");
  await expect(page.locator(".aa-editorial-route-sweep")).toBeHidden();
  await expect(page.getByRole("heading", { name: "Under the bonnet." })).toBeVisible();
});
