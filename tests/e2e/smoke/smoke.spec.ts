import { test, expect } from "@playwright/test";

test.describe("Smoke Tests: Application Startup & Route Loading", () => {
  test("SMK-001: Landing Page renders branding, hero section, and CTAs", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Verify brand heading
    const brand = page.locator("header").getByText(/krishidrishti|কৃষি দৃষ্টি/i);
    await expect(brand.first()).toBeVisible();

    // Verify hero title
    const heroTitle = page.getByRole("heading", { level: 1 });
    await expect(heroTitle).toBeVisible();

    // Verify Scan CTA button exists
    const scanCta = page.getByRole("link", { name: /scan|স্ক্যান/i }).first();
    await expect(scanCta).toBeVisible();
  });

  test("SMK-002: Scanner Studio page loads with dropzone and crop selector", async ({ page }) => {
    await page.goto("/scan");
    await page.waitForLoadState("domcontentloaded");

    // Title verification
    const title = page.getByRole("heading", { level: 1 });
    await expect(title).toContainText(/scanner|স্ক্যানার/i);

    // Dropzone should be ready
    const dropzone = page.getByText(/upload leaf photo|পাতার ছবি আপলোড|টেনে এনে/i);
    await expect(dropzone.first()).toBeVisible();

    // Preset samples section should be visible
    const sampleHeading = page.getByText(/pre-loaded|মাঠের নমুনা|1-click test/i);
    await expect(sampleHeading.first()).toBeVisible();
  });

  test("SMK-003: AI Agricultural Chatbot page loads with console interface", async ({ page }) => {
    await page.goto("/chat");
    await page.waitForLoadState("domcontentloaded");

    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toContainText(/assistant|সহকারী/i);

    // Message input must be visible
    const chatInput = page.getByPlaceholder(/প্রশ্ন লিখুন|ask/i);
    await expect(chatInput).toBeVisible();
  });

  test("SMK-004: Crop Doctor interface loads properly", async ({ page }) => {
    await page.goto("/crop-doctor");
    await page.waitForLoadState("domcontentloaded");

    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible();

    const chatInput = page.getByPlaceholder(/প্রশ্ন লিখুন|ask/i);
    await expect(chatInput).toBeVisible();
  });

  test("SMK-005: Scan History page loads with filter controls", async ({ page }) => {
    await page.goto("/history");
    await page.waitForLoadState("domcontentloaded");

    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toContainText(/history|ইতিহাস/i);

    // Filter controls present
    const filterLabel = page.getByText(/filter|ফিল্টার/i).first();
    await expect(filterLabel).toBeVisible();
  });

  test("SMK-006: Plant Disease Encyclopedia page loads with search and pathogen chips", async ({ page }) => {
    await page.goto("/library");
    await page.waitForLoadState("domcontentloaded");

    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toContainText(/encyclopedia|archive|কোষাগার/i);

    const searchInput = page.getByPlaceholder(/search by disease|অনুসন্ধান/i);
    await expect(searchInput).toBeVisible();
  });

  test("SMK-007: Fertilizer Dosage Calculator loads with form and parameters", async ({ page }) => {
    await page.goto("/calculator");
    await page.waitForLoadState("domcontentloaded");

    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toContainText(/calculator|ডোজ/i);

    // Select elements present
    await expect(page.locator("#calcCrop")).toBeVisible();
    await expect(page.locator("#fieldSize")).toBeVisible();
  });

  test("SMK-008: Authentication pages (Login & Register) render properly", async ({ page }) => {
    await page.goto("/login");
    await page.waitForLoadState("domcontentloaded");
    await expect(page.getByPlaceholder("farmer@krishi.gov.bd").or(page.locator("input[type='text'], input[type='email']").first())).toBeVisible();
    await expect(page.locator("input[type='password']")).toBeVisible();

    await page.goto("/register");
    await page.waitForLoadState("domcontentloaded");
    const regHeading = page.getByRole("heading", { level: 1 });
    await expect(regHeading).toContainText(/account|নিবন্ধন|create/i);
  });

  test("SMK-009: Informational pages (Supported Crops, Pricing, Features) load", async ({ page }) => {
    await page.goto("/supported-crops");
    await page.waitForLoadState("domcontentloaded");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    await page.goto("/pricing");
    await page.waitForLoadState("domcontentloaded");
    await expect(page.getByText(/forever free|starter/i).first()).toBeVisible();

    await page.goto("/features");
    await page.waitForLoadState("domcontentloaded");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});
