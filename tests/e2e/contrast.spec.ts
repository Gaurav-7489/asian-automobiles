import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "./fixtures";

/** WCAG AA text contrast on every page, after scrolling so reveal animations have run. */
const pages = [
  "/", "/about/", "/services/", "/services/car-service-maintenance/", "/services/mechanical-repairs/",
  "/services/car-ac-service/", "/services/wheel-alignment-balancing/", "/services/tyre-care/",
  "/spare-parts/", "/contact/", "/privacy-policy/",
];

for (const path of pages) {
  test(`colour contrast ${path}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(path, { waitUntil: "networkidle" });
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); }
      window.scrollTo(0, 0);
    });
    const { violations } = await new AxeBuilder({ page }).withRules(["color-contrast"]).analyze();
    expect(violations.flatMap((v) => v.nodes.map((n) => n.target.join(" ")))).toEqual([]);
  });
}

test("colour contrast with the mobile menu open", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes("mobile"), "mobile menu only");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.locator("#aa-menu-services-toggle").click();
  await page.waitForTimeout(500);
  const { violations } = await new AxeBuilder({ page }).include("#aa-mobile-navigation").withRules(["color-contrast"]).analyze();
  expect(violations.flatMap((v) => v.nodes.map((n) => n.target.join(" ")))).toEqual([]);
});
