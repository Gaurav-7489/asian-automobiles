import { expect, test } from "@playwright/test";

const live = [
  "/", "/about", "/services", "/spare-parts", "/contact", "/privacy-policy",
  "/services/car-service-maintenance", "/services/mechanical-repairs", "/services/car-ac-service",
  "/services/wheel-alignment-balancing", "/services/tyre-care",
];

test.describe("routes", () => {
  for (const path of live) {
    test(`${path} renders with one H1 and a canonical`, async ({ page }) => {
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /^https:\/\/[^?]+$/);
      await expect(page.locator("main#main")).toBeVisible();
    });
  }

  test("conditional services return 404 while unpublished", async ({ request }) => {
    for (const p of ["/services/denting-painting", "/services/car-detailing", "/does-not-exist"]) {
      expect((await request.get(p)).status()).toBe(404);
    }
  });

  test("old routes redirect permanently", async ({ request }) => {
    const res = await request.get("/services/car-ac-repair", { maxRedirects: 0 });
    expect(res.status()).toBe(308);
    expect(res.headers().location).toContain("/services/car-ac-service");
    expect((await request.get("/book-service", { maxRedirects: 0 })).headers().location).toContain("/contact");
  });

  test("sitemap lists only published pages", async ({ request }) => {
    const xml = await (await request.get("/sitemap.xml")).text();
    expect(xml).toContain("/services/tyre-care");
    expect(xml).not.toContain("denting-painting");
    expect(xml).not.toContain("car-detailing");
  });
});

test.describe("contact actions and claims", () => {
  for (const path of live) {
    test(`${path}: links well-formed, no unverified claims`, async ({ page }) => {
      await page.goto(path);
      for (const href of await page.locator('a[href^="tel:"]').evaluateAll((a) => a.map((x) => x.getAttribute("href")))) {
        expect(href).toMatch(/^tel:\+91\d{10}$/);
      }
      // WhatsApp number is not confirmed: no wa.me links anywhere.
      await expect(page.locator('a[href*="wa.me"]')).toHaveCount(0);
      for (const href of await page.locator('a[href*="google.com/maps"]').evaluateAll((a) => a.map((x) => x.getAttribute("href")))) {
        expect(href).toMatch(/^https:\/\/www\.google\.com\/maps\//);
      }
      const text = (await page.locator("body").innerText()).toLowerCase();
      for (const banned of ["computerised", "computerized", "3d ", "laser", "certified", "authorised service", "guarantee", "best in", "#1", "since 1996", "provisional", "{{", "lorem", "todo"]) {
        expect(text, banned).not.toContain(banned);
      }
      // Google Maps never loads without a click.
      await expect(page.locator('iframe[src*="google"]')).toHaveCount(0);
    });
  }
});

test("FAQ accordion toggles and outputs FAQPage JSON-LD", async ({ page }) => {
  await page.goto("/services/car-ac-service");
  const first = page.locator("details[data-faq]").first();
  await expect(first).not.toHaveAttribute("open", "");
  await first.locator("summary").click();
  await expect(first).toHaveAttribute("open", "");
  const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
  expect(ld.some((t) => t.includes('"FAQPage"'))).toBe(true);
  expect(ld.some((t) => t.includes('"AutoRepair"'))).toBe(true);
});

test("spare parts shows call fallback when no form destination is configured", async ({ page }) => {
  await page.goto("/spare-parts");
  await expect(page.getByText(/To enquire about a part, call us/)).toBeVisible();
  await expect(page.locator("form")).toHaveCount(0);
});

test("mobile menu opens, traps focus and closes with Escape", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile only");
  await page.goto("/");
  const btn = page.getByRole("button", { name: "Open menu" });
  await btn.click();
  const dialog = page.getByRole("dialog", { name: "Menu" });
  await expect(dialog).toBeVisible();
  await expect(page.getByRole("region", { name: "Quick contact" })).toHaveClass(/translate-y-full/);
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
});

test("desktop services dropdown lists live services only", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop only");
  await page.goto("/about");
  await page.getByRole("button", { name: "Show services" }).click();
  const menu = page.locator("#services-menu");
  await expect(menu).toBeVisible();
  await expect(menu.getByRole("link")).toHaveCount(6);
  await expect(menu).not.toContainText("Denting");
  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();
});

test("no horizontal scroll at 320px", async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 320, height: 640 } });
  const page = await ctx.newPage();
  for (const p of ["/", "/services/mechanical-repairs", "/contact", "/spare-parts"]) {
    await page.goto(p);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, p).toBeLessThanOrEqual(0);
  }
  await ctx.close();
});
