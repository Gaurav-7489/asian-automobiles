import { expect, test } from "./fixtures";

test("every page sends the security headers", async ({ request }) => {
  for (const path of ["/", "/services/", "/contact/", "/does-not-exist/"]) {
    const response = await request.get(path);
    const headers = response.headers();
    expect(headers["content-security-policy"], path).toContain("frame-ancestors 'none'");
    expect(headers["content-security-policy"], path).toContain("object-src 'none'");
    expect(headers["strict-transport-security"], path).toContain("max-age=");
    expect(headers["x-content-type-options"], path).toBe("nosniff");
    expect(headers["x-frame-options"], path).toBe("DENY");
    expect(headers["referrer-policy"], path).toBe("strict-origin-when-cross-origin");
    expect(headers["permissions-policy"], path).toContain("camera=()");
    expect(headers["x-powered-by"], path).toBeUndefined();
  }
});

test("all images are self-hosted (no third-party image requests)", async ({ page }) => {
  const external: string[] = [];
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (request.resourceType() === "image" && url.origin !== new URL(page.url() || "http://127.0.0.1").origin) external.push(url.href);
  });
  await page.goto("/", { waitUntil: "networkidle" });
  expect(external).toEqual([]);
});

test("the open mobile menu receives taps (not the page behind it)", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes("mobile"), "Touch menu");
  await page.goto("/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Open menu" }).click();
  const toggle = page.locator("#aa-menu-services-toggle");
  await expect(toggle).toBeVisible();
  // Poll: the menu slides open over ~0.6s before it covers the page.
  await expect.poll(() => toggle.evaluate((element) => {
    const box = element.getBoundingClientRect();
    return element.contains(document.elementFromPoint(box.left + box.width / 2, box.top + box.height / 2));
  })).toBe(true);
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
});

test("the menu button opens a menu at tablet and small-laptop widths", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chromium", "Breakpoint check");
  for (const width of [1180, 1280, 1320]) {
    await page.setViewportSize({ width, height: 800 });
    await page.goto("/", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(page.getByRole("navigation", { name: "Expanded navigation" })).toBeVisible();
  }
});

test("tapping a link gives instant feedback and pages are pre-rendered", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const bar = page.locator(".aa-nav-progress");
  await expect(bar).toHaveAttribute("data-state", "idle");
  const link = page.locator('main a[href="/services/tyre-care/"]').filter({ visible: true }).first();
  await link.scrollIntoViewIfNeeded();
  await link.click();
  await expect(page).toHaveURL(/\/services\/tyre-care\/$/);
  await expect(bar).toHaveAttribute("data-state", /done|idle/);
  const response = await page.request.get("/services/tyre-care/");
  expect(response.headers()["x-nextjs-prerender"]).toBeTruthy();
});
