import type { Page } from "@playwright/test";
import { expect, test } from "./fixtures";

const routes = [
  ["/", "Car care for every drive."],
  ["/about/", "About Asian Automobiles"],
  ["/services/", "Our car services"],
  ["/services/car-service-maintenance/", "Car service and maintenance in Irinjalakuda"],
  ["/services/mechanical-repairs/", "Mechanical repairs for your car"],
  ["/services/car-ac-service/", "Car AC service and repair"],
  ["/services/wheel-alignment-balancing/", "Wheel alignment and balancing"],
  ["/services/tyre-care/", "Tyre care for safer driving"],
  ["/spare-parts/", "Spare parts enquiry"],
  ["/contact/", "Contact and location"],
  ["/privacy-policy/", "Privacy Policy"],
] as const;

/** A full document load would wipe this flag; client-side navigation keeps it. */
async function markDocument(page: Page) {
  await page.evaluate(() => { (window as unknown as { __aaSameDocument: boolean }).__aaSameDocument = true; });
}
async function expectSameDocument(page: Page) {
  expect(await page.evaluate(() => (window as unknown as { __aaSameDocument?: boolean }).__aaSameDocument), "navigation caused a full page reload").toBe(true);
}

test("desktop journeys navigate client-side, and back/forward work", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chromium", "Desktop header and mega menu");
  await page.goto("/", { waitUntil: "networkidle" });
  await markDocument(page);
  const nav = page.getByRole("navigation", { name: "Primary navigation" });

  await nav.getByRole("link", { name: "About" }).click();
  await expect(page).toHaveURL(/\/about\/$/);
  await expect(page.locator("h1")).toHaveText("About Asian Automobiles");

  await nav.getByRole("button", { name: "Services", exact: true }).click();
  await page.locator(".aa-mega").getByRole("link", { name: /View all services/ }).click();
  await expect(page).toHaveURL(/\/services\/$/);
  await expect(page.locator("h1")).toHaveText("Our car services");

  await page.locator(".aa-v10-feature-card", { hasText: "Tyre care" }).click();
  await expect(page).toHaveURL(/\/services\/tyre-care\/$/);
  await expect(page.locator("h1")).toHaveText("Tyre care for safer driving");

  await nav.getByRole("button", { name: "Services", exact: true }).hover();
  await page.locator(".aa-mega").getByRole("link", { name: /Spare parts enquiry/ }).click();
  await expect(page).toHaveURL(/\/spare-parts\/$/);
  await expect(page.locator("h1")).toHaveText("Spare parts enquiry");

  await page.getByRole("link", { name: /Book service/ }).first().click();
  await expect(page).toHaveURL(/\/contact\/#enquiry$/);
  await expect(page.locator("h1")).toHaveText("Contact and location");
  await expectSameDocument(page);

  await page.goBack();
  await expect(page).toHaveURL(/\/spare-parts\/$/);
  await page.goBack();
  await expect(page).toHaveURL(/\/services\/tyre-care\/$/);
  await expect(page.locator("h1")).toHaveText("Tyre care for safer driving");
  await page.goForward();
  await expect(page).toHaveURL(/\/spare-parts\/$/);
  await expect(page.locator("h1")).toHaveText("Spare parts enquiry");
  await expectSameDocument(page);
  await expect(page.locator("html")).not.toHaveAttribute("data-navigating", /.*/);
});

test("mobile menu links navigate client-side and close the menu", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile-chromium", "Mobile menu");
  await page.goto("/", { waitUntil: "networkidle" });
  await markDocument(page);
  const panel = page.locator("#aa-mobile-navigation");

  await page.getByRole("button", { name: "Open menu" }).click();
  await panel.getByRole("button", { name: /Services/ }).click();
  await panel.getByRole("link", { name: /Wheel alignment & balancing/ }).click();
  await expect(page).toHaveURL(/\/services\/wheel-alignment-balancing\/$/);
  await expect(page.locator(".aa-header")).not.toHaveClass(/is-open/);
  await expect(page.locator("h1")).toHaveText("Wheel alignment and balancing");

  await page.getByRole("button", { name: "Open menu" }).click();
  await panel.locator(".aa-mnav-list > li > a.aa-mnav-link", { hasText: "Contact" }).click();
  await expect(page).toHaveURL(/\/contact\/$/);
  await expect(page.locator("h1")).toHaveText("Contact and location");
  await expectSameDocument(page);
  // The page underneath must not be scroll-locked once the menu has closed.
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe("hidden");
});

test("every page loads directly, survives a refresh and has one h1", async ({ page }) => {
  for (const [route, heading] of routes) {
    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(response!.status(), route).toBe(200);
    await page.reload({ waitUntil: "domcontentloaded" });
    await expect(page.locator("h1"), route).toHaveCount(1);
    await expect(page.locator("h1"), route).toContainText(heading);
  }
});

test("pages are served as prerendered HTML with metadata in the head", async ({ request }) => {
  for (const [route] of routes) {
    const response = await request.get(route);
    expect(response.status(), route).toBe(200);
    const html = await response.text();
    const head = html.slice(0, html.indexOf("</head>"));
    expect(head, `${route} title in <head>`).toMatch(/<title>[^<]+<\/title>/);
    expect(head, `${route} canonical in <head>`).toMatch(/<link rel="canonical" href="https:\/\/[^"]+"/);
  }
});

test("internal links are prefetched so navigation is instant", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chromium", "Prefetch timing measured once");
  const prefetched = new Set<string>();
  page.on("request", (req) => {
    if (req.headers()["next-router-prefetch"]) prefetched.add(new URL(req.url()).pathname);
  });
  await page.goto("/", { waitUntil: "networkidle" });
  await expect.poll(() => [...prefetched].sort(), { timeout: 10_000 }).toEqual(expect.arrayContaining(["/about/", "/contact/", "/spare-parts/"]));

  // Warm navigation: from click until the new page's heading is on screen.
  const timings: number[] = [];
  for (const [label, heading] of [["About", "About Asian Automobiles"], ["Spare Parts", "Spare parts enquiry"], ["Contact", "Contact and location"]] as const) {
    await page.waitForLoadState("networkidle");
    const start = Date.now();
    await page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: label }).click();
    await expect(page.locator("h1")).toHaveText(heading);
    timings.push(Date.now() - start);
  }
  testInfo.annotations.push({ type: "warm-navigation-ms", description: timings.join(", ") });
  console.log(`warm navigation (ms): ${timings.join(", ")}`);
  for (const ms of timings) expect(ms, "warm navigation took too long").toBeLessThan(1500);
});

test("contact page handles ?service= on the client and ignores unknown values", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const query of ["?service=tyre-care", "?service=not-a-service", "?service=%3Cscript%3Ealert(1)%3C%2Fscript%3E"]) {
    const response = await page.goto("/contact/" + query, { waitUntil: "networkidle" });
    expect(response!.status()).toBe(200);
    await expect(page.locator("h1")).toHaveText("Contact and location");
    expect(await page.content()).not.toContain("<script>alert(1)</script>");
  }
  expect(errors).toEqual([]);
});
