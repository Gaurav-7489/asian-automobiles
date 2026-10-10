import { expect, test } from "./fixtures";

const screens = [{ width: 320, height: 568 }, { width: 390, height: 844 }, { width: 768, height: 1024 }, { width: 1024, height: 768 }, { width: 844, height: 390 }];

for (const screen of screens) {
  test(`expandable navigation and native card stack at ${screen.width} × ${screen.height}`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile-chromium", "Touch viewport checks run once");
    await page.setViewportSize(screen);
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/", { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.getByRole("button", { name: "Open menu" }).click();
    const panel = page.getByRole("navigation", { name: "Expanded navigation" });
    const services = panel.getByRole("button", { name: /Services & repairs/ });
    const workshop = panel.getByRole("button", { name: /Inside the workshop/ });
    await expect(services).toHaveAttribute("aria-expanded", "false");
    await expect(workshop).toHaveAttribute("aria-expanded", "false");
    await expect(panel.locator("#aa-menu-services-links a").first()).toBeHidden();
    const brand = page.getByRole("link", { name: "Asian Automobiles home" });
    await brand.focus();
    await page.keyboard.press("Shift+Tab");
    await expect(panel.getByRole("link", { name: "Speak to the workshop" })).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(brand).toBeFocused();
    await panel.evaluate((element) => { element.scrollTop = 0; });
    if (screen.height >= 568) {
      const booking = await panel.getByRole("link", { name: "Book a service" }).boundingBox();
      expect(booking!.y + booking!.height, "The collapsed menu keeps booking fully visible").toBeLessThanOrEqual(screen.height);
    }
    await page.screenshot({ path: testInfo.outputPath("menu-collapsed.png") });
    await services.click();
    await expect(services).toHaveAttribute("aria-expanded", "true");
    await expect(panel.locator("#aa-menu-services-links a").first()).toBeVisible();
    await page.screenshot({ path: testInfo.outputPath("menu-expanded.png") });
    await expect(panel.locator("#aa-menu-services-links a")).toHaveCount(7);
    await expect(panel.locator("#aa-menu-services-links a span").first()).toHaveCSS("font-size", "15px");
    await expect(panel.getByRole("link", { name: "Book a service" })).toHaveCSS("color", "rgb(11, 12, 11)");
    for (const link of await panel.locator("#aa-menu-services-links a").all()) {
      await link.scrollIntoViewIfNeeded();
      await expect(link).toBeInViewport();
      const box = await link.boundingBox();
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(screen.width);
    }
    await workshop.click();
    await expect(workshop).toHaveAttribute("aria-expanded", "true");
    await expect(services).toHaveAttribute("aria-expanded", "false");
    await panel.getByRole("link", { name: "About", exact: true }).click();
    await expect(page).toHaveURL(/\/about\//);
    await expect(page.locator(".aa-header")).not.toHaveClass(/is-open/);
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
    expect(await page.evaluate(() => document.body.style.overflow)).not.toBe("hidden");

    await page.goto("/", { waitUntil: "networkidle" });
    const cards = page.locator(".aa-skip-card");
    await expect(cards.first()).toHaveCSS("position", "sticky");
    // Pin each successive card and check that the previous card remains
    // behind it. The hit test proves actual overlap, rather than just CSS.
    for (let index = 1; index < 7; index++) {
      const target = cards.nth(index);
      await target.evaluate((card) => {
        const pin = parseFloat(getComputedStyle(card).top);
        window.scrollTo({ top: window.scrollY + card.getBoundingClientRect().top - pin + 4, behavior: "instant" });
      });
      await expect.poll(async () => {
        return target.evaluate((card) => Math.abs(card.getBoundingClientRect().top - parseFloat(getComputedStyle(card).top)));
      }).toBeLessThan(10);
      const previous = await cards.nth(index - 1).boundingBox();
      const current = await target.boundingBox();
      expect(previous!.y + previous!.height).toBeGreaterThan(current!.y + 30);
      const topCard = await target.evaluate((card) => {
        const box = card.getBoundingClientRect();
        const pointY = Math.max(100, box.top + 30);
        return document.elementFromPoint(box.left + box.width / 2, pointY)?.closest(".aa-skip-card") === card;
      });
      expect(topCard, `Card ${index + 1} should layer over the previous card`).toBe(true);
      if (index === 3) await page.screenshot({ path: testInfo.outputPath("stack-middle.png") });
    }
    await page.screenshot({ path: testInfo.outputPath("stacked-services.png") });
    await page.locator(".aa-home-workshop-grid").scrollIntoViewIfNeeded();
    await expect(page.getByRole("link", { name: "Our story" })).toBeInViewport();
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(cards.first()).toHaveCSS("position", "relative");
  });
}
