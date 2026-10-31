import { defineConfig, devices } from "@playwright/test";

/**
 * KrishiDrishti Playwright End-to-End Test Configuration
 * Configured for Next.js 14 App Router, bilingual UI, and deterministic local testing.
 */
export default defineConfig({
  testDir: "./tests/e2e",
  /* Maximum time one test can run for */
  timeout: 35 * 1000,
  expect: {
    /* Maximum time expect() should wait for condition to be met */
    timeout: 7000,
  },
  /* Run tests serially to protect shared JSON file stores in src/data/ */
  fullyParallel: false,
  workers: 1,
  /* Fail the build on CI if you accidentally left test.only in the source code */
  forbidOnly: !!process.env.CI,
  /* Retry on failure in CI */
  retries: process.env.CI ? 2 : 0,
  /* Reporter configuration pointing to artifacts/playwright directory */
  reporter: [
    ["list"],
    [
      "html",
      {
        outputFolder: "artifacts/playwright/html-report",
        open: "never",
      },
    ],
    [
      "json",
      {
        outputFile: "artifacts/playwright/test-results/summary.json",
      },
    ],
  ],
  outputDir: "artifacts/playwright/test-results",

  use: {
    /* Base URL to use in actions like `await page.goto('/')` */
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || "http://localhost:3000",

    /* Collect trace when retrying the failed test */
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",

    /* Action and navigation timeouts */
    actionTimeout: 12 * 1000,
    navigationTimeout: 30 * 1000,

    /* Chrome media emulation flags for CameraModal testing */
    launchOptions: {
      args: [
        "--use-fake-ui-for-media-stream",
        "--use-fake-device-for-media-stream",
      ],
    },
  },

  /* Configure projects for primary browsers */
  projects: [
    {
      name: "chromium-desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: "mobile-chrome",
      use: {
        ...devices["Pixel 5"],
      },
      testMatch: /.*responsive\.spec\.ts/,
    },
  ],

  /* Re-use existing Next.js dev server if already running on port 3000 */
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: true,
    timeout: 120 * 1000,
  },
});
