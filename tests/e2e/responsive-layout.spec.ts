import { expect, test } from "./fixtures";

const routes = [
  "/", "/about/", "/services/", "/services/car-service/",
  "/services/car-ac-repair/", "/services/accident-repair/",
  "/services/denting-painting/", "/services/wheel-alignment/",
  "/services/tyre-services/", "/spare-parts/", "/insurance/",
  "/facilities/", "/gallery/", "/reviews/", "/contact/",
  "/faq/", "/book-service/",
];

const viewports = [
  { width: 320, height: 568 }, { width: 390, height: 844 },
  { width: 430, height: 932 }, { width: 768, height: 1024 },
  { width: 844, height: 390 }, { width: 1024, height: 768 },
  { width: 1280, height: 800 }, { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
];

// Run the matrix once; the mobile project separately verifies touch behaviour.
test.describe("responsive content geometry", () => {
  for (const viewport of viewports) {
    test(`all pages keep readable content at ${viewport.width} × ${viewport.height}`, async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== "desktop-chromium", "Matrix runs once on desktop Chromium");
      test.setTimeout(90_000);
      await page.setViewportSize(viewport);
      await page.emulateMedia({ reducedMotion: "reduce" });

      for (const route of routes) {
        await page.goto(route, { waitUntil: "networkidle" });
        // Render off-screen sections too so hidden document overflow cannot
        // conceal a broken card, clipped caption or inaccessible selector.
        await page.addStyleTag({ content: "main section { content-visibility: visible !important; }" });
        await page.evaluate(() => document.fonts.ready);

        const issues = await page.evaluate(() => {
          const found: string[] = [];
          const elements = document.querySelectorAll<HTMLElement>(
            "main h1, main h2, main h3, main h4, main p, main button, main a, main figcaption, footer .aa-footer-wordmark",
          );
          for (const el of elements) {
            const box = el.getBoundingClientRect();
            const style = getComputedStyle(el);
            if (!box.width || !box.height || style.visibility === "hidden" || style.display === "none") continue;
            const label = `${el.tagName} ${el.textContent?.trim().slice(0, 65)}`;
            if (box.left < -2 || box.right > innerWidth + 2) found.push(`Outside viewport: ${label}`);
            if (el.scrollWidth > el.clientWidth + 3) found.push(`Text overflow: ${label}`);

            for (let parent = el.parentElement; parent && parent.tagName !== "MAIN"; parent = parent.parentElement) {
              const parentBox = parent.getBoundingClientRect();
              if (["hidden", "clip"].includes(getComputedStyle(parent).overflowX) &&
                  (box.left < parentBox.left - 2 || box.right > parentBox.right + 2 ||
                   box.top < parentBox.top - 2 || box.bottom > parentBox.bottom + 2)) {
                found.push(`Clipped by ${parent.className}: ${label}`);
                break;
              }
            }
          }

          const heading = document.querySelector(".creative-heading");
          if (heading) {
            const label = heading.querySelector(".eyebrow")!.getBoundingClientRect();
            const title = heading.querySelector("h1")!.getBoundingClientRect();
            const intro = heading.querySelector("p")?.getBoundingClientRect();
            if (Math.abs(label.left - title.left) > 2 || (intro && Math.abs(intro.left - title.left) > 2)) {
              found.push("Hero label, title and introduction do not share the same left edge");
            }
            if (label.bottom > title.top || (intro && title.bottom > intro.top)) found.push("Hero text blocks overlap");
          }
          return found;
        });
        expect(issues, `${route} at ${viewport.width} × ${viewport.height}`).toEqual([]);
      }
    });
  }
});

test("every timeline choice is visible and usable without horizontal scrolling", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/about/", { waitUntil: "networkidle" });
  const choices = page.locator(".aa-v13-about-line button");
  await expect(choices).toHaveCount(5);
  for (let i = 0; i < await choices.count(); i++) {
    const button = choices.nth(i);
    await button.scrollIntoViewIfNeeded();
    const bounds = await button.boundingBox();
    expect(bounds!.x).toBeGreaterThanOrEqual(0);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(page.viewportSize()!.width);
    await button.click();
    await expect(button).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(".aa-v16-about-copy h3")).toBeVisible();
  }
});

test("tyre guide keeps its heading readable on the dark panel", async ({ page }) => {
  await page.goto("/services/tyre-services/", { waitUntil: "networkidle" });
  const heading = page.locator(".aa-v22-copy-panel h3");
  await expect(heading).toHaveCSS("color", "rgb(255, 255, 255)");
  await expect(page.locator(".aa-v22-copy-panel p").first()).toHaveCSS("color", "rgb(199, 204, 197)");
});

test("navigation stays inside the viewport at desktop and tablet breakpoints", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chromium", "Desktop and tablet breakpoint check");
  await page.emulateMedia({ reducedMotion: "reduce" });
  const screens = [561, 801, 1101, 1320, 1321, 1440, 1920].map(width => ({ width, height: 900 }));
  screens.push({ width: 1440, height: 480 });
  for (const screen of screens) {
    const { width, height } = screen;
    await page.setViewportSize(screen);
    await page.goto("/", { waitUntil: "networkidle" });
    const menu = page.getByRole("button", { name: "Open menu" });
    const desktop = width > 1320;
    if (desktop) await page.getByRole("button", { name: "Services", exact: true }).click();
    else await menu.click();
    const panel = page.locator(desktop ? ".aa-mega" : ".aa-mobile-panel");
    await expect(panel).toBeVisible();
    const bounds = await panel.boundingBox();
    expect(bounds!.x).toBeGreaterThanOrEqual(-1);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width + 1);
    expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(height + 1);
    if (!desktop) await page.getByRole("button", { name: "Close menu" }).click();
  }
});

test("the inner-page scroll link leaves content below the fixed header", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/services/", { waitUntil: "networkidle" });
  await page.getByRole("link", { name: "SCROLL / SEE WHAT MATTERS" }).click();
  const heading = page.locator(".aa-v10-section-head").first();
  await expect(heading).toBeInViewport();
  const box = await heading.boundingBox();
  const header = await page.locator(".aa-nav-main").boundingBox();
  expect(box!.y).toBeGreaterThanOrEqual(header!.y + header!.height);
});
