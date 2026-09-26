import { chromium } from "playwright";
import fs from "node:fs";
fs.mkdirSync("artifacts", { recursive: true });
(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  const report = [];
  for (const width of [320, 390, 768, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of width === 390 || width === 1440
      ? [
          "/",
          "/work",
          "/about",
          "/contact",
          "/software",
          "/websites-apps",
          "/integrations",
          "/automation",
        ]
      : ["/"]) {
      await page.goto(
        (process.env.CAPTURE_BASE_URL || "http://localhost:3000") + route,
      );
      await page.evaluate(async () => {
        await document.fonts.ready;
        document.querySelectorAll("img").forEach((i) => (i.loading = "eager"));
        await Promise.all(
          Array.from(document.images).map((i) => i.decode().catch(() => {})),
        );
      });
      for (
        let y = 0;
        y < (await page.evaluate(() => document.body.scrollHeight));
        y += 850
      ) {
        await page.evaluate((y) => window.scrollTo(0, y), y);
        await page.waitForTimeout(35);
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      const name = route === "/" ? "home" : route.slice(1).replaceAll("/", "-");
      await page.screenshot({
        path: `artifacts/${name}-${width}.png`,
        fullPage: true,
      });
      await page.screenshot({ path: `artifacts/${name}-${width}-top.png` });
      report.push({
        route,
        width,
        overflow: await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth + 1,
        ),
      });
    }
  }
  fs.writeFileSync(
    "artifacts/responsive-report.json",
    JSON.stringify(report, null, 2),
  );
  console.log(report);
  await browser.close();
})();
