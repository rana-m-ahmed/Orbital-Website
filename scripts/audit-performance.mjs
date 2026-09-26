import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
const baseURL = process.env.TEST_BASE_URL || "http://localhost:3001";
fs.mkdirSync("artifacts", { recursive: true });
fs.mkdirSync("artifacts/lighthouse-profile", { recursive: true });
const chrome = await launch({
  chromePath: chromium.executablePath(),
  chromeFlags: ["--headless", "--no-sandbox"],
  userDataDir: path.resolve("artifacts/lighthouse-profile"),
});
try {
  const result = await lighthouse(baseURL, {
    port: chrome.port,
    output: "json",
    logLevel: "error",
    onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
  });
  fs.writeFileSync("artifacts/lighthouse-mobile.json", result.report);
  console.log(
    JSON.stringify(
      {
        scores: Object.fromEntries(
          Object.entries(result.lhr.categories).map(([key, value]) => [
            key,
            value.score,
          ]),
        ),
        metrics: Object.fromEntries(
          [
            "largest-contentful-paint",
            "cumulative-layout-shift",
            "total-blocking-time",
            "first-contentful-paint",
          ].map((key) => [key, result.lhr.audits[key].displayValue]),
        ),
        warnings: result.lhr.runWarnings,
      },
      null,
      2,
    ),
  );
} finally {
  await chrome.kill();
}
