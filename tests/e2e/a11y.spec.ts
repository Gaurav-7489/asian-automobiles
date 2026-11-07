import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

/** axe-core: zero serious or critical issues on every page and key states (spec 25.3, 28.5). */
const pages = [
  "/", "/about", "/services", "/spare-parts", "/contact", "/privacy-policy",
  "/services/car-service-maintenance", "/services/mechanical-repairs", "/services/car-ac-service",
  "/services/wheel-alignment-balancing", "/services/tyre-care", "/does-not-exist",
];

async function audit(page: import("@playwright/test").Page, label: string) {
  const { violations } = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
  const serious = violations.filter((v) => v.impact === "serious" || v.impact === "critical");
  expect(serious.map((v) => `${label}: ${v.id} – ${v.nodes.map((n) => n.target.join(" ")).slice(0, 3).join(", ")}`)).toEqual([]);
}

for (const path of pages) {
  test(`axe ${path}`, async ({ page }) => {
    await page.goto(path);
    await audit(page, path);
  });
}

test("axe: open mobile menu and open FAQ", async ({ page, isMobile }) => {
  await page.goto("/services/tyre-care");
  await page.locator("details[data-faq] summary").first().click();
  await audit(page, "faq open");
  if (isMobile) {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.getByRole("button", { name: "Open menu" }).click();
    await audit(page, "menu open");
  }
});
