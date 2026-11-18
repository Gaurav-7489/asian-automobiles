import { expect, test } from "./fixtures";

/** Non-destructive checks of the production security configuration. */

const pages = ["/", "/about/", "/services/", "/services/tyre-care/", "/spare-parts/", "/contact/", "/privacy-policy/"];

test("security headers are sent on pages and metadata routes", async ({ request }) => {
  for (const path of [...pages, "/sitemap.xml", "/robots.txt"]) {
    const headers = (await request.get(path)).headers();
    const csp = headers["content-security-policy"] ?? "";
    expect(csp, path).toContain("default-src 'self'");
    expect(csp, path).toContain("object-src 'none'");
    expect(csp, path).toContain("frame-ancestors 'none'");
    expect(csp, path).toContain("base-uri 'self'");
    expect(csp, path).not.toContain("unsafe-eval");
    expect(csp, path).not.toMatch(/(^|[\s;])\*(\s|;|$)/);
    expect(headers["strict-transport-security"], path).toMatch(/max-age=\d{8,}/);
    expect(headers["x-content-type-options"], path).toBe("nosniff");
    expect(headers["x-frame-options"], path).toBe("DENY");
    expect(headers["referrer-policy"], path).toBe("strict-origin-when-cross-origin");
    expect(headers["permissions-policy"], path).toContain("camera=()");
    expect(headers["x-powered-by"], path).toBeUndefined();
  }
});

test("the site runs without Content-Security-Policy violations", async ({ page }) => {
  const violations: string[] = [];
  await page.addInitScript(() => {
    document.addEventListener("securitypolicyviolation", (event) => {
      (window as unknown as { __csp: string[] }).__csp ??= [];
      (window as unknown as { __csp: string[] }).__csp.push(`${event.violatedDirective} ${event.blockedURI}`);
    });
  });
  page.on("console", (message) => {
    if (/Content Security Policy/i.test(message.text())) violations.push(message.text());
  });
  for (const path of pages) {
    await page.goto(path, { waitUntil: "networkidle" });
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 30)); } });
    violations.push(...(await page.evaluate(() => (window as unknown as { __csp?: string[] }).__csp ?? [])));
  }
  // The only third-party frame: the click-to-load Google map.
  await page.goto("/contact/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /Show map/ }).click();
  await expect(page.locator('iframe[title="Map showing Asian Automobiles location"]')).toBeAttached();
  await page.waitForTimeout(500);
  violations.push(...(await page.evaluate(() => (window as unknown as { __csp?: string[] }).__csp ?? [])));
  expect(violations).toEqual([]);
});

test("the image optimiser only serves the site's own photos at allowed qualities", async ({ request }) => {
  const ok = await request.get("/_next/image?url=%2Fimages%2Fphotos%2Fhero-workshop.jpg&w=640&q=75");
  expect(ok.status()).toBe(200);
  expect(ok.headers()["content-type"]).toMatch(/^image\//);
  for (const url of [
    "/_next/image?url=https%3A%2F%2Fexample.com%2Fa.jpg&w=640&q=75",
    "/_next/image?url=%2F_next%2Fstatic%2Fchunks%2Fwebpack.js&w=640&q=75",
    "/_next/image?url=%2Fimages%2Fphotos%2Fhero-workshop.jpg&w=640&q=33",
    "/_next/image?url=%2Fimages%2Fphotos%2Fhero-workshop.jpg&w=9999&q=75",
  ]) {
    expect((await request.get(url)).status(), url).toBe(400);
  }
});

test("redirects never leave the site", async ({ request, baseURL }) => {
  for (const path of ["//example.com/", "/%2F%2Fexample.com/", "/\\example.com/", "/services/car-service/?next=https://example.com", "/book-service/?redirect=//example.com"]) {
    // Concatenate so "//example.com/" stays a path on this server, not a protocol-relative URL.
    const response = await request.get(baseURL!.replace(/\/$/, "") + path, { maxRedirects: 0 });
    const location = response.headers().location;
    if (location) {
      expect(location, path).toMatch(/^\/(?!\/)/);
      expect(new URL(location, baseURL).origin, path).toBe(new URL(baseURL!).origin);
    } else {
      expect([200, 404], path).toContain(response.status());
    }
  }
});

test("query strings are never reflected into the HTML", async ({ request }) => {
  const payload = '"><script>alert(1)</script>';
  for (const path of ["/", "/contact/", "/services/"]) {
    const html = await (await request.get(path + "?service=" + encodeURIComponent(payload) + "&q=" + encodeURIComponent(payload))).text();
    expect(html, path).not.toContain("<script>alert(1)</script>");
  }
});

test("external links open safely and contact links use expected protocols", async ({ page }) => {
  for (const path of ["/", "/contact/", "/services/mechanical-repairs/"]) {
    await page.goto(path, { waitUntil: "domcontentloaded" });
    const links = await page.locator("a[href]").evaluateAll((anchors) => anchors.map((a) => ({
      href: a.getAttribute("href")!, target: a.getAttribute("target"), rel: a.getAttribute("rel") ?? "",
    })));
    for (const link of links) {
      expect(link.href, path).toMatch(/^(\/|#|tel:\+\d+$|mailto:[^@\s]+@[^@\s]+|https:\/\/(www\.google\.com\/maps|wa\.me)\/)/);
      if (link.target === "_blank") expect(link.rel, `${path} ${link.href}`).toContain("noopener");
    }
  }
});
