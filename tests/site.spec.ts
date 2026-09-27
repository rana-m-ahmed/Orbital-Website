import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readdir, readFile } from "node:fs/promises";

const routes = [
  "/",
  "/services",
  "/services/ai-receptionist",
  "/services/ai-calling-agents",
  "/services/workflow-automation",
  "/services/custom-software",
  "/services/websites-apps",
  "/work",
  "/insights",
  "/insights/ai-receptionist-for-service-businesses",
  "/insights/workflow-automation-for-service-businesses",
  "/insights/custom-software-vs-saas",
  "/insights/ai-receptionist-vs-answering-service",
  "/insights/workflow-automation-examples",
  "/work/request-relay",
  "/work/workflow-explorer",
  "/how-we-work",
  "/about",
  "/start-project",
  "/privacy",
  "/terms",
];

test("all routes have one heading, correct canonical and working status", async ({
  page,
}) => {
  for (const route of routes) {
    expect((await page.goto(route))?.status(), route).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /\S.{40,}/,
    );
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      "content",
      /ORBITAL/,
    );
    await expect(
      page.locator('meta[property="og:image"]').first(),
    ).toHaveAttribute("content", /reachorbital.tech\/opengraph-image/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://www.reachorbital.tech" + (route === "/" ? "/" : route),
    );
  }
  expect((await page.goto("/services/unknown"))?.status()).toBe(404);
  expect((await page.request.post("/api/leads/retry")).status()).toBe(401);
});

test("SEO assets and restored automation are complete", async ({ page }) => {
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  for (const route of routes) {
    await page.goto(route);
    titles.add(await page.title());
    descriptions.add(
      (await page.locator('meta[name="description"]').getAttribute("content"))!,
    );
  }
  expect(titles.size).toBe(routes.length);
  expect(descriptions.size).toBe(routes.length);
  const sitemap = await page.request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const sitemapBody = await sitemap.text();
  expect(sitemapBody).toContain("https://www.reachorbital.tech/services/ai-receptionist");
  expect(sitemapBody).toContain("https://www.reachorbital.tech/insights/ai-receptionist-for-service-businesses");
  expect(sitemapBody).toContain("https://www.reachorbital.tech/insights/ai-receptionist-vs-answering-service");
  expect(sitemapBody).toContain("https://www.reachorbital.tech/insights/workflow-automation-examples");
  expect(sitemapBody).not.toContain("https://reachorbital.tech/");
  expect(sitemapBody).not.toContain("/api/");
  const robots = await page.request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  const robotsBody = await robots.text();
  expect(robotsBody).toContain("Sitemap: https://www.reachorbital.tech/sitemap.xml");
  expect(robotsBody).toContain("Host: https://www.reachorbital.tech");
  const social = await page.request.get("/opengraph-image");
  expect(social.status()).toBe(200);
  expect(social.headers()["content-type"]).toContain("image/png");
  await page.goto("/");
  await expect(page.locator("#automation .studio-visual")).toHaveCount(3);
  await expect(page.locator(".booking-story li")).toHaveCount(3);
  await expect(
    page.getByRole("heading", { name: "A better first impression." }),
  ).toBeVisible();
  await page.locator(".service-menu summary").click();
  await expect(page.locator(".nav-chevron")).toBeVisible();
});

for (const width of [1440, 1280, 1024, 768, 430, 390, 360])
  test(`all pages fit at ${width}px and retain full-page evidence`, async ({
    page,
  }) => {
    test.setTimeout(120000);
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    for (const route of routes) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      if (route === "/")
        await expect(page.locator(".relay-canvas")).toHaveCount(0);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        route,
      ).toBe(true);
      await page.screenshot({
        path: `test-results/redesign/${width}/${route === "/" ? "home" : route.slice(1).replaceAll("/", "-")}.png`,
        fullPage: true,
      });
    }
    expect(errors).toEqual([]);
  });

for (const width of [1440, 390])
  test(`all public pages pass accessibility at ${width}px`, async ({
    page,
  }) => {
    test.setTimeout(180000);
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const route of routes) {
      await page.goto(route);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(
        results.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => n.target),
        })),
        route,
      ).toEqual([]);
    }
  });

test("homepage stays understandable without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 900 },
  });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator("main>section")).toHaveCount(7);
  await expect(page.locator(".browser-preview")).toBeVisible();
  await expect(page.locator(".workspace-app")).toBeVisible();
  await expect(page.locator(".phone-app")).toBeVisible();
  for (const button of await page.locator("main button").all())
    await expect(button).toBeDisabled();
  for (const link of await page
    .locator(".digital-heading a,.automation-links a")
    .all())
    await expect(link).toBeVisible();
  await page.screenshot({
    path: "test-results/redesign/no-js-home.png",
    fullPage: true,
  });
  await context.close();
});

test("navigation, gallery links, natural scroll and resized layouts", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 720 });
  await page.goto("/");
  await page.locator(".home-project-cta").scrollIntoViewIfNeeded();
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  await page.screenshot({
    path: "test-results/redesign/short-laptop.png",
    fullPage: true,
  });
  const link = page.getByRole("link", { name: "See booking example" });
  await link.focus();
  await expect(link).toBeInViewport();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/work\/request-relay/);
  await page.setViewportSize({ width: 390, height: 900 });
  await page.getByLabel("Open navigation").click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: /Services/ })
    .click();
  await expect(page).toHaveURL(/services$/);
  await expect(page.locator(".mobile-nav")).not.toHaveAttribute("open", "");
  await page
    .getByRole("link", { name: "Answer calls. Arrange visits." })
    .click();
  await expect(page).toHaveURL(/services\/ai-receptionist/);
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
});

test("form keeps required validation", async ({ page }) => {
  await page.goto("/start-project");
  await page.getByRole("button", { name: "Send project request" }).click();
  await expect(page.getByLabel("Your name")).toBeFocused();
  await expect(page.locator(".form-success")).toHaveCount(0);
});

test("project form works without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/start-project");
  await page.getByLabel("Your name").fill("Static QA");
  await page.getByLabel("Email address").fill("static-qa@example.com");
  await page.getByLabel("Company", { exact: false }).fill("ORBITAL QA");
  await page
    .getByLabel("What slows your business down?")
    .fill("A test of native form submission without JavaScript enabled.");
  await page.getByRole("checkbox").focus();
  await page.getByRole("checkbox").press("Space");
  await page.getByRole("button", { name: "Send project request" }).focus();
  await page
    .getByRole("button", { name: "Send project request" })
    .press("Enter");
  await expect(
    page.getByRole("heading", { name: "Request received." }),
  ).toBeVisible();
  await context.close();
});
test("project form persists a lead and displays confirmation", async ({
  page,
}) => {
  await page.goto("/start-project");
  await page.getByLabel("Your name").fill("QA Test");
  await page.getByLabel("Email address").fill("qa@example.com");
  await page.getByLabel("Company", { exact: false }).fill("ORBITAL QA");
  await page
    .getByLabel("What slows your business down?")
    .fill("QA test request: disconnected tools and repeated manual entry.");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Send project request" }).click();
  await expect(
    page.getByRole("heading", { name: "Request received." }),
  ).toBeVisible();
  const files = await readdir("data/leads");
  const leads = await Promise.all(
    files
      .filter((f) => f.endsWith(".json"))
      .map(async (f) => JSON.parse(await readFile("data/leads/" + f, "utf8"))),
  );
  expect(leads.some((l) => l.email === "qa@example.com")).toBe(true);
});

test("website preview and software app respond to keyboard and reset", async ({
  page,
}) => {
  await page.goto("/");
  const website = page.locator("#websites");
  const mobile = website.getByRole("button", { name: "Mobile", exact: true });
  await expect(mobile).toBeEnabled();
  await mobile.focus();
  await page.keyboard.press("Enter");
  await expect(mobile).toHaveAttribute("aria-pressed", "true");
  await expect(website.locator(".browser-preview")).toHaveClass(
    /device-mobile/,
  );
  await website
    .getByRole("button", { name: "View the studio concept" })
    .click();
  await expect(website.locator(".sample-title")).toContainText("new ideas");
  await website.getByRole("button", { name: "Desktop", exact: true }).click();
  await expect(website.locator(".browser-preview")).not.toHaveClass(
    /device-mobile/,
  );
  const software = page.locator("#software");
  await software.getByRole("button", { name: "Approve homepage" }).click();
  await expect(software.locator(".phone-update strong")).toHaveText(
    "Design approved.",
  );
  await expect(software.getByRole("status")).toContainText("3 of 4");
  await software.getByRole("button", { name: "Reset example" }).click();
  await expect(software.locator(".phone-update strong")).toHaveText(
    "Ready for a look.",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await website.scrollIntoViewIfNeeded();
  await expect(website.locator(".browser-plane")).toHaveCSS(
    "transform",
    "none",
  );
});


test("service pages expose Service and Breadcrumb structured data", async ({ page }) => {
  await page.goto("/services/ai-receptionist");
  const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
  const combined = schemas.join("\n");
  expect(combined).toContain('"@type":"Service"');
  expect(combined).toContain('"@type":"BreadcrumbList"');
  expect(combined).toContain("AI receptionist and customer call handling");
  expect(combined).toContain("https://www.reachorbital.tech/services/ai-receptionist");
});


test("cornerstone guides expose Article schema and service links", async ({ page }) => {
  await page.goto("/insights/ai-receptionist-for-service-businesses");
  await expect(page.locator("h1")).toContainText("AI Receptionist");
  await expect(page).toHaveTitle("AI Receptionist Guide for Service Businesses | ORBITAL");
  await expect(page.getByRole("link", { name: /Explore AI receptionist systems/ })).toHaveAttribute(
    "href",
    "/services/ai-receptionist",
  );
  const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
  const combined = schemas.join("\n");
  expect(combined).toContain('"@type":"Article"');
  expect(combined).toContain('"image":["https://www.reachorbital.tech/opengraph-image"]');
  expect(combined).toContain('"@type":"BreadcrumbList"');
  expect(combined).toContain("https://www.reachorbital.tech/insights/ai-receptionist-for-service-businesses");
});

test("commercial service pages contain expanded buyer guidance", async ({ page }) => {
  await page.goto("/services/workflow-automation");
  await expect(page.getByRole("heading", { name: "Common use cases." })).toBeVisible();
  await expect(page.getByRole("heading", { name: /How we turn the idea into a working system/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Questions businesses usually ask first/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /Read practical implementation guides/ })).toHaveAttribute(
    "href",
    "/insights",
  );
});


test("SERP-intent guides are published and connected to services", async ({ page }) => {
  await page.goto("/insights/ai-receptionist-vs-answering-service");
  await expect(page).toHaveTitle("AI Receptionist vs Answering Service | ORBITAL");
  await expect(page.getByRole("link", { name: /Explore AI receptionist systems/ })).toHaveAttribute(
    "href",
    "/services/ai-receptionist",
  );

  await page.goto("/insights/workflow-automation-examples");
  await expect(page).toHaveTitle("Workflow Automation Examples for Service Businesses | ORBITAL");
  await expect(page.getByRole("link", { name: /Explore workflow automation/ })).toHaveAttribute(
    "href",
    "/services/workflow-automation",
  );
});
