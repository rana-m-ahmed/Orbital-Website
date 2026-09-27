import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  timeout: 60000,
  use: {
    baseURL: process.env.TEST_BASE_URL || "http://localhost:3000",
    browserName: "chromium",
  },
  workers: 1,
  reporter: "list",
  webServer: {
    command:
      (process.platform === "win32" ? "npm.cmd" : "npm") +
      " run dev -- --port " +
      new URL(process.env.TEST_BASE_URL || "http://localhost:3000").port,
    url: process.env.TEST_BASE_URL || "http://localhost:3000",
    reuseExistingServer: true,
    timeout: 120000,
  },
});
