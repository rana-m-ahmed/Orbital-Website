import { test, expect } from "@playwright/test";
test.use({
  launchOptions: {
    args: [
      "--enable-webgl",
      "--use-angle=swiftshader",
      "--enable-unsafe-swiftshader",
    ],
  },
});
test("desktop renders the brand and recovers from a lost GPU context", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const hero = page.locator(".refined-engine");
  await expect(hero).toHaveClass(/canvas-ready/, { timeout: 30000 });
  await expect(hero).toHaveAttribute("data-stage", "2", { timeout: 15000 });
  await expect(hero.locator("canvas")).toHaveCount(1);
  const canvas = hero.locator("canvas");
  const initial = await canvas.screenshot();
  const bounds = (await canvas.boundingBox())!;
  await page.mouse.move(
    bounds.x + bounds.width * 0.8,
    bounds.y + bounds.height * 0.3,
  );
  await expect
    .poll(async () => (await canvas.screenshot()).equals(initial))
    .toBe(false);
  await page.screenshot({ path: "test-results/redesign/hero-pointer.png" });
  await page.evaluate(() => window.scrollTo({ top: 160, behavior: "instant" }));
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(160);
  await page.screenshot({ path: "test-results/redesign/hero-scroll.png" });
  await hero.locator("canvas").evaluate((canvas) => {
    (canvas as HTMLCanvasElement)
      .getContext("webgl2")!
      .getExtension("WEBGL_lose_context")!
      .loseContext();
  });
  await expect(hero).not.toHaveClass(/canvas-ready/);
  await expect(hero.locator("canvas")).toHaveCount(0);
  await expect(hero.locator(".relay-poster")).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});
