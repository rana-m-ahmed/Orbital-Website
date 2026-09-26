import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const routes = [
  "/",
  "/automation",
  "/automation/ai-receptionist",
  "/automation/lead-automation",
  "/automation/customer-support",
  "/automation/operations-automation",
  "/software",
  "/websites-apps",
  "/integrations",
  "/work",
  "/work/missed-call-recovery",
  "/work/lead-response-system",
  "/work/operations-console",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
];
test("all routes render, expose one heading and fit mobile", async ({
  page,
}) => {
  test.setTimeout(180000);
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const route of routes) {
    await page.setViewportSize({ width: 390, height: 844 });
    const response = await page.goto(route, { waitUntil: "networkidle" });
    expect(response?.status(), route).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
      route,
    ).toBe(true);
  }
  expect(errors).toEqual([]);
});
test("desktop navigation supports keyboard and closes on Escape", async ({
  page,
}) => {
  await page.goto("/");
  const services = page.getByRole("button", { name: "Services" });
  await services.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#service-menu")).toBeVisible();
  await page.locator("#service-menu a").first().focus();
  await page.keyboard.press("Escape");
  await expect(page.locator("#service-menu")).toHaveCount(0);
  await expect(services).toBeFocused();
  await services.click();
  await page
    .getByRole("link", { name: "AI receptionist", exact: true })
    .click();
  await expect(page).toHaveURL(/ai-receptionist/);
});
test("mobile menu closes and restores focus", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open navigation" });
  await toggle.click();
  await expect(
    page.getByRole("navigation", { name: "Mobile", exact: true }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await toggle.click();
  await page
    .locator("#mobile-navigation")
    .getByRole("link", { name: "About" })
    .click();
  await expect(page).toHaveURL(/about/);
  await expect(page.locator("#mobile-navigation")).toHaveCount(0);
});
test("demo tabs and project carousel are keyboard operable", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "Enquiries", exact: true }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("tab", { name: "Customer support" }),
  ).toHaveAttribute("aria-selected", "true");
  await expect(
    page.getByText("The right help. Without the wait."),
  ).toBeVisible();
  const rail = page.locator(".labs-rail");
  await rail.focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator(".carousel-controls > span")).toContainText("02");
  await page.getByRole("button", { name: "Next project" }).click();
  await expect(
    page.getByRole("button", { name: "Next project" }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "Previous project" }).click();
  await expect(page.locator(".carousel-controls > span")).toContainText("02");
});
test("contact preserves values on error and confirms provider acceptance", async ({
  page,
}) => {
  await page.setExtraHTTPHeaders({
    "x-forwarded-for": `form-test-${Date.now()}-${Math.random()}`,
  });
  await page.goto("/contact");
  await page.getByRole("button", { name: "Send your message" }).click();
  await expect(
    page.getByText("Please enter your name.", { exact: true }),
  ).toBeVisible();
  await page.getByLabel("Name", { exact: true }).fill("A Business Owner");
  await page.getByLabel("Email", { exact: true }).fill("owner@example.com");
  await page
    .getByLabel("What would you like to work better?")
    .fill("We need help connecting our sales enquiries.");
  await page.route("**/api/contact", (route) =>
    route.fulfill({
      status: 502,
      contentType: "application/json",
      body: JSON.stringify({ ok: false, kind: "server" }),
    }),
  );
  await page.getByRole("button", { name: "Send your message" }).click();
  await expect(page.locator("form").getByRole("alert")).toContainText(
    "Something went wrong",
  );
  await expect(page.getByLabel("Name", { exact: true })).toHaveValue(
    "A Business Owner",
  );
  await page.route("**/api/contact", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true }),
    }),
  );
  await page.getByRole("button", { name: "Send your message" }).click();
  await expect(page.getByRole("heading", { name: "Got it." })).toBeVisible();
});
test("reduced motion and unavailable WebGL preserve the hero", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".sculpture-fallback")).toBeVisible();
  await expect(page.locator("canvas")).toHaveCount(0);
  await expect(
    page.getByRole("heading", { name: "Less busywork. More room to grow." }),
  ).toBeVisible();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.addInitScript(() => {
    HTMLCanvasElement.prototype.getContext = (() =>
      null) as typeof HTMLCanvasElement.prototype.getContext;
  });
  await page.reload();
  await page.waitForTimeout(1800);
  await expect(page.locator(".sculpture-fallback")).toBeVisible();
});
test("core routes pass WCAG accessibility checks", async ({ page }) => {
  test.setTimeout(180000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of [
    "/",
    "/automation",
    "/software",
    "/websites-apps",
    "/integrations",
    "/work",
    "/about",
    "/contact",
  ]) {
    await page.goto(route);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      result.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      })),
      route,
    ).toEqual([]);
  }
});
test("404 stays branded and offers a route home", async ({ page }) => {
  await page.goto("/this-page-does-not-exist");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.getByRole("link", { name: "Back to the homepage" }).click();
  await expect(page).toHaveURL("/");
});
test("API rejects invalid and undeliverable enquiries and rate limits bursts", async ({
  request,
}) => {
  const headers = { "x-forwarded-for": `test-${Date.now()}-${Math.random()}` };
  const invalid = await request.post("/api/contact", { headers, data: {} });
  expect(invalid.status()).toBe(400);
  const payload = {
    name: "Test Owner",
    email: "test@example.com",
    message: "This is a local automated delivery check.",
    helpType: "Not sure yet",
  };
  const missing = await request.post("/api/contact", {
    headers,
    data: payload,
  });
  expect(missing.status()).toBe(502);
  expect(await missing.json()).toEqual({ ok: false, kind: "server" });
  for (let i = 0; i < 3; i++)
    await request.post("/api/contact", { headers, data: {} });
  const limited = await request.post("/api/contact", { headers, data: {} });
  expect(limited.status()).toBe(429);
  expect(limited.headers()["retry-after"]).toBeTruthy();
});

test("essential content survives without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto((process.env.TEST_BASE_URL || "http://127.0.0.1:3100") + "/");
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator(".sculpture-fallback")).toBeVisible();
  await expect(page.locator(".service-row")).toHaveCount(3);
  await expect(page.locator(".lab-slide")).toHaveCount(3);
  await page
    .locator(".hero-actions")
    .getByRole("link", { name: "Let’s talk" })
    .click();
  await expect(page).toHaveURL(/contact/);
  await context.close();
});

test("3D enhancement recovers from context loss", async ({
  page,
  browserName,
}) => {
  test.skip(
    browserName !== "chromium",
    "WebGL lifecycle is exercised in Chromium; all engines test the fallback.",
  );
  await page.goto("/");
  await expect(page.locator(".orbital-canvas canvas")).toBeVisible({
    timeout: 15000,
  });
  await page
    .locator(".orbital-canvas canvas")
    .evaluate((canvas) => canvas.dispatchEvent(new Event("webglcontextlost")));
  await expect(page.locator(".orbital-canvas")).toHaveCount(0);
  await expect(page.locator(".sculpture-fallback")).toBeVisible();
});

test("integration recipe updates its readable route", async ({ page }) => {
  await page.goto("/integrations");
  const trigger = page.getByLabel("When this happens", { exact: true });
  await trigger.selectOption({ index: 1 });
  const selected = await trigger.locator("option:checked").textContent();
  await expect(page.locator(".recipe-composer ol")).toContainText(selected!);
});
