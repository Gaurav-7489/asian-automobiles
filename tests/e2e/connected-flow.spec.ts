import { expect, test } from "./fixtures";

const services = [
  ["car-service-maintenance", "/services/car-service-maintenance/", "Car service & maintenance"],
  ["mechanical-repairs", "/services/mechanical-repairs/", "Mechanical repairs"],
  ["car-ac-service", "/services/car-ac-service/", "Car AC services"],
  ["wheel-alignment-balancing", "/services/wheel-alignment-balancing/", "Wheel alignment & balancing"],
  ["tyre-care", "/services/tyre-care/", "Tyre care"],
  ["spare-parts", "/spare-parts/", "Spare parts enquiry"],
];

test("service discovery links every published service to its page and the contact enquiry", async ({ page }) => {
  await page.goto("/services/", { waitUntil: "domcontentloaded" });
  const board = page.locator(".aa-v13-service-board");
  await expect(board.locator("button")).toHaveCount(services.length);
  for (const [id, route, title] of services) {
    await board.getByRole("button", { name: new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")) }).click();
    await expect(board.getByRole("link", { name: "Explore service" })).toHaveAttribute("href", route);
    await expect(board.getByRole("link", { name: "Start enquiry" })).toHaveAttribute("href", `/contact/?service=${id}#enquiry`);
  }
});

test("unconfirmed WhatsApp number: no wa.me links anywhere, call fallback on contact", async ({ page }) => {
  for (const route of ["/", "/about/", "/services/", "/services/mechanical-repairs/", "/spare-parts/", "/contact/"]) {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    await expect(page.locator('a[href*="wa.me"]')).toHaveCount(0);
    for (const href of await page.locator('a[href^="tel:"]').evaluateAll((a) => a.map((x) => x.getAttribute("href")))) {
      expect(href).toMatch(/^tel:\+91\d{10}$/);
    }
  }
  await page.goto("/contact/", { waitUntil: "domcontentloaded" });
  await expect(page.locator("#enquiry")).toContainText("call the workshop");
});

test("no unverified claims on any page", async ({ page }) => {
  for (const route of ["/", "/about/", "/services/", "/services/car-service-maintenance/", "/services/mechanical-repairs/", "/services/car-ac-service/", "/services/wheel-alignment-balancing/", "/services/tyre-care/", "/spare-parts/", "/contact/"]) {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    const text = (await page.locator("body").innerText()).toLowerCase();
    for (const banned of ["1996", "computerized", "computerised", "insurance", "accident", "rim repair", "283 /", "guarantee", "certified"]) {
      expect(text, `${banned} on ${route}`).not.toContain(banned);
    }
  }
});

test("retired and old URLs redirect permanently", async ({ request }) => {
  for (const [source, destination] of [
    ["/services/car-service/", "/services/car-service-maintenance/"],
    ["/services/car-ac-repair/", "/services/car-ac-service/"],
    ["/services/wheel-alignment/", "/services/wheel-alignment-balancing/"],
    ["/services/tyre-services/", "/services/tyre-care/"],
    ["/services/accident-repair/", "/services/"],
    ["/insurance/", "/services/"],
    ["/facilities/", "/about/"],
    ["/gallery/", "/about/"],
    ["/reviews/", "/"],
    ["/faq/", "/"],
    ["/book-service/", "/contact/"],
  ]) {
    const response = await request.get(source, { maxRedirects: 0 });
    expect(response.status(), source).toBe(308);
    expect(response.headers().location, source).toBe(destination);
  }
});

test("conditional service stays hidden until confirmed", async ({ request }) => {
  expect((await request.get("/services/denting-painting/")).status()).toBe(404);
  const xml = await (await request.get("/sitemap.xml")).text();
  expect(xml).not.toContain("denting-painting");
  expect(xml).toContain("/services/tyre-care/");
});

test("contact map loads Google only after the visitor asks", async ({ page }) => {
  await page.goto("/contact/", { waitUntil: "networkidle" });
  await expect(page.locator('iframe[src*="google.com/maps"]')).toHaveCount(0);
  await expect(page.locator("main")).toContainText("V/526, Irinjalakuda Kattoor Rd, Irinjalakuda, Kerala 680121");
  await page.getByRole("button", { name: /Show map/ }).click();
  await expect(page.locator('iframe[title="Map showing Asian Automobiles location"]')).toHaveAttribute("src", /google\.com\/maps\?q=.*output=embed/);
});
