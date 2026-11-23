import { expect, test } from "./fixtures";

const screens = [{ width: 320, height: 568 }, { width: 390, height: 844 }, { width: 768, height: 1024 }, { width: 1024, height: 768 }, { width: 844, height: 390 }];

for (const screen of screens) {
  test(`expandable navigation and touch service index at ${screen.width} × ${screen.height}`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile-chromium", "Touch viewport checks run once");
    await page.setViewportSize(screen);
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/", { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.getByRole("button", { name: "Open menu" }).click();
    const panel = page.getByRole("navigation", { name: "Expanded navigation" });
    const services = panel.getByRole("button", { name: /Services/ });
    const direct = (name: string) => panel.locator(".aa-mnav-list > li > a.aa-mnav-link", { hasText: name });
    await expect(services).toHaveAttribute("aria-expanded", "false");
    // Main pages are one tap away without opening a group.
    for (const name of ["Home", "About", "Spare Parts", "Contact"]) {
      await expect(direct(name)).toBeVisible();
    }
    // Collapsed group: zero height and inert, so its links are neither visible nor focusable.
    await expect(panel.locator(".aa-mnav-sub")).toHaveAttribute("inert", "");
    expect((await panel.locator(".aa-mnav-sub > div").boundingBox())!.height).toBeLessThan(1);
    const brand = page.locator(".aa-header .aa-brand");
    await brand.focus();
    await page.keyboard.press("Shift+Tab");
    await expect(panel.getByRole("link", { name: "Directions" })).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(brand).toBeFocused();
    await panel.evaluate((element) => { element.scrollTop = 0; });
    if (screen.height >= 568) {
      const booking = await panel.getByRole("link", { name: "Make an enquiry" }).boundingBox();
      expect(booking!.y + booking!.height, "The collapsed menu keeps the enquiry action fully visible").toBeLessThanOrEqual(screen.height);
    }
    await page.screenshot({ path: testInfo.outputPath("menu-collapsed.png") });
    await services.click();
    await expect(services).toHaveAttribute("aria-expanded", "true");
    await expect(panel.locator("#aa-menu-services-links a").first()).toBeVisible();
    await page.screenshot({ path: testInfo.outputPath("menu-expanded.png") });
    await expect(panel.locator("#aa-menu-services-links a")).toHaveCount(7);
    await expect(panel.locator("#aa-menu-services-links a span").first()).toHaveCSS("font-size", "17px");
    await expect(panel.getByRole("link", { name: "Make an enquiry" })).toHaveCSS("color", "rgb(20, 25, 30)");
    for (const link of await panel.locator("#aa-menu-services-links a").all()) {
      await link.scrollIntoViewIfNeeded();
      await expect(link).toBeInViewport();
      const box = await link.boundingBox();
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(screen.width);
    }
    await services.click();
    await expect(services).toHaveAttribute("aria-expanded", "false");
    await direct("About").click();
    await expect(page).toHaveURL(/\/about\//);
    await expect(page.locator(".aa-header")).not.toHaveClass(/is-open/);
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
    expect(await page.evaluate(() => document.body.style.overflow)).not.toBe("hidden");

    await page.goto("/", { waitUntil: "networkidle" });
    // On touch screens every service row carries its own photo and is a plain link: nothing depends on hover.
    const rows = page.locator("a.aa-svc-row");
    await expect(rows).toHaveCount(6);
    for (const row of await rows.all()) {
      await row.scrollIntoViewIfNeeded();
      await expect(row).toBeInViewport();
      const photo = await row.locator("img").boundingBox();
      expect(photo!.width, "service thumbnail is shown inline").toBeGreaterThan(40);
      expect(photo!.x + photo!.width).toBeLessThanOrEqual(screen.width);
      expect((await row.boundingBox())!.height, "row is a comfortable tap target").toBeGreaterThanOrEqual(44);
    }
    await page.screenshot({ path: testInfo.outputPath("service-index.png") });
    await rows.nth(3).click();
    await expect(page).toHaveURL(/\/services\/wheel-alignment-balancing\/$/);
    await page.goBack();
    await expect(page.locator('a[href="/about/"]', { hasText: "More about us" })).toHaveCount(1);
  });
}
