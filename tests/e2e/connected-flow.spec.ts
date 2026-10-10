import { expect, test } from "./fixtures";

const services = [
  ["car-service", "/services/car-service/", "General service & repair"],
  ["car-ac-repair", "/services/car-ac-repair/", "Car AC service & repair"],
  ["accident-repair", "/services/accident-repair/", "Accident repair"],
  ["denting-painting", "/services/denting-painting/", "Denting & painting"],
  ["wheel-alignment", "/services/wheel-alignment/", "Wheel alignment"],
  ["tyre-services", "/services/tyre-services/", "Tyre & wheel care"],
  ["spare-parts", "/spare-parts/", "Automobile spare parts"],
];

test("service discovery has one selector with working detail and enquiry paths", async ({ page }) => {
  await page.goto("/services/", { waitUntil: "domcontentloaded" });
  const board = page.locator(".aa-v13-service-board");
  await expect(board.locator("button")).toHaveCount(7);
  for (const [id, route, title] of services) {
    await board.getByRole("button", { name: new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")) }).click();
    await expect(board.getByRole("link", { name: "Explore service" })).toHaveAttribute("href", route);
    await expect(board.getByRole("link", { name: "Start enquiry" })).toHaveAttribute("href", `/book-service/?service=${id}`);
  }
  await board.getByRole("link", { name: "Start enquiry" }).click();
  await expect(page.getByLabel("What do you need?")).toHaveValue("spare-parts");
  await expect(page.getByLabel("Part needed")).toBeVisible();
});

test("service context and contact details survive the WhatsApp handoff", async ({ page }) => {
  await page.goto("/services/wheel-alignment/", { waitUntil: "domcontentloaded" });
  await page.locator("main").getByRole("link", { name: "Book wheel service" }).first().click();
  await expect(page.getByLabel("What do you need?")).toHaveValue("wheel-alignment");
  await page.getByLabel("Your name").fill("Test Customer");
  await page.getByLabel("Phone", { exact: true }).fill("9000000000");
  await page.getByLabel("Vehicle", { exact: true }).fill("Hyundai i20");
  await page.getByLabel("Tell us what is happening").fill("Pulls to the left");
  await page.evaluate(() => {
    window.open = ((url?: string | URL) => { document.body.dataset.handoff = String(url); return null; }) as typeof window.open;
  });
  await page.getByRole("button", { name: "Continue on WhatsApp" }).click();
  const href = await page.locator("body").getAttribute("data-handoff");
  const url = new URL(href!);
  expect(url.origin).toBe("https://wa.me");
  const message = url.searchParams.get("text")!;
  for (const text of ["Test Customer", "9000000000", "Hyundai i20", "Wheel alignment", "Pulls to the left"]) expect(message).toContain(text);
  await expect(page.getByRole("status")).toContainText("Send the message in WhatsApp");
});

test("parts selection carries to one form and changing service preserves vehicle details", async ({ page }) => {
  await page.goto("/spare-parts/", { waitUntil: "domcontentloaded" });
  await page.locator(".aa-v11-parts-index").getByRole("button", { name: /Brakes/ }).click();
  await page.getByRole("link", { name: "Enquire about these parts" }).click();
  await expect(page.getByLabel("Part needed")).toHaveValue("Brakes parts");
  await expect(page.locator("main form")).toHaveCount(1);
  await page.getByLabel("Vehicle", { exact: true }).fill("Maruti Swift 2020");
  await page.getByLabel("What do you need?").selectOption("accident-repair");
  await expect(page.getByLabel("Insurer (optional)")).toBeVisible();
  await expect(page.getByLabel("Part needed")).toHaveCount(0);
  await expect(page.getByLabel("Vehicle", { exact: true })).toHaveValue("Maruti Swift 2020");
});

test("duplicate URLs redirect permanently to their canonical destinations", async ({ request }) => {
  for (const [source, destination] of [
    ...services.filter(([id]) => id !== "spare-parts").map(([id, route]) => [`/${id}/`, route]),
    ["/services/spare-parts/", "/spare-parts/"],
    ["/request-quote/?service=wheel-alignment", "/book-service/?service=wheel-alignment&intent=quote"],
  ]) {
    const response = await request.get(source, { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    expect(response.headers().location).toBe(destination);
  }
});

test("quote intent remains available through the consolidated form", async ({ page }) => {
  await page.goto("/request-quote/?service=wheel-alignment", { waitUntil: "domcontentloaded" });
  await expect(page).toHaveURL(/book-service\/.+intent=quote/);
  await expect(page.getByLabel("What do you need?")).toHaveValue("wheel-alignment");
  await expect(page.getByLabel("Request type")).toHaveValue("quote");
  await expect(page.getByRole("button", { name: "Start quote on WhatsApp" })).toBeVisible();
});
