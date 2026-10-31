import { test, expect } from "@playwright/test";
import { loginWithDemoRole, logout, clearAuthSession } from "../helpers/auth.helper";

test.describe("Authentication Tests", () => {
  test.beforeEach(async ({ page }) => {
    await clearAuthSession(page);
  });

  test("AUTH-001: 1-Click Demo Login as Farmer redirects to /scan and sets session", async ({ page }) => {
    await loginWithDemoRole(page, "farmer");
    await expect(page).toHaveURL(/\/scan/);

    // Navbar should reflect user session
    const avatar = page.locator("header button img[alt]");
    await expect(avatar).toBeVisible();
  });

  test("AUTH-002: 1-Click Demo Login as Admin redirects to /admin and reveals Admin tab", async ({ page }) => {
    await loginWithDemoRole(page, "admin");
    await expect(page).toHaveURL(/\/admin/);

    // Admin Control Panel heading must be visible
    const adminHeading = page.getByRole("heading", { level: 1 });
    await expect(adminHeading).toContainText(/admin|অ্যাডমিন/i);
  });

  test("AUTH-003: Login Form Validation on Invalid Credentials", async ({ page }) => {
    await page.goto("/login");
    await page.waitForLoadState("domcontentloaded");

    await page.getByPlaceholder("farmer@krishi.gov.bd").fill("nonexistent_user@example.com");
    await page.locator("input[type='password']").fill("wrongpassword");

    const submitBtn = page.getByRole("button", { name: /sign in|লগইন করুন|প্রবেশ/i });
    await submitBtn.click();

    // Error banner should be rendered
    const errorBanner = page.locator("div").getByText(/ভুল|পাওয়া যায়নি|failed|invalid/i);
    await expect(errorBanner.first()).toBeVisible({ timeout: 5000 });
  });

  test("AUTH-004: User Registration with Unique Credentials", async ({ page }) => {
    await page.goto("/register");
    await page.waitForLoadState("domcontentloaded");

    const uniqueEmail = `qa_test_${Date.now()}@krishitest.com`;

    // Fill form using explicit placeholders
    await page.getByPlaceholder(/মোঃ রফিকুল ইসলাম|Full Name/i).fill("QA Test Farmer");
    await page.getByPlaceholder("farmer@example.com").fill(uniqueEmail);
    await page.locator('input[type="tel"]').fill("01711223344");
    await page.getByPlaceholder(/কমপক্ষে ৪ অক্ষরের পাসওয়ার্ড|Set Password/i).fill("ValidPassword123!");

    const submitBtn = page.getByRole("button", { name: /নিবন্ধন|register|create|সম্পন্ন/i });
    await submitBtn.click();

    // Should redirect to /scan upon successful account creation
    await expect(page).toHaveURL(/\/scan/, { timeout: 10000 });
  });

  test("AUTH-005: Duplicate Email Registration Rejection", async ({ page }) => {
    await page.goto("/register");
    await page.waitForLoadState("domcontentloaded");

    // Existing seeded admin email
    await page.getByPlaceholder(/মোঃ রফিকুল ইসলাম|Full Name/i).fill("Duplicate User");
    await page.getByPlaceholder("farmer@example.com").fill("admin@krishidrishti.gov.bd");
    await page.locator('input[type="tel"]').fill("01711223344");
    await page.getByPlaceholder(/কমপক্ষে ৪ অক্ষরের পাসওয়ার্ড|Set Password/i).fill("AdminPassword123!");

    const submitBtn = page.getByRole("button", { name: /নিবন্ধন|register|create|সম্পন্ন/i });
    await submitBtn.click();

    // Rejection error message
    const errorBanner = page.locator("div").getByText(/ইতিমধ্যে|already exists|অ্যাকাউন্ট তৈরি করা আছে/i);
    await expect(errorBanner.first()).toBeVisible({ timeout: 6000 });
  });

  test("AUTH-006: User Logout Clears Active Session", async ({ page }) => {
    await loginWithDemoRole(page, "farmer");
    await expect(page).toHaveURL(/\/scan/);

    await logout(page);
    await expect(page).toHaveURL(/\/login/);

    // Profile avatar should no longer be present
    const avatar = page.locator("header button img[alt]");
    await expect(avatar).not.toBeVisible();
  });

  test("AUTH-007: Session Persistence across Page Reload", async ({ page }) => {
    await loginWithDemoRole(page, "farmer");
    await expect(page).toHaveURL(/\/scan/);

    // Reload page
    await page.reload();
    await page.waitForLoadState("domcontentloaded");

    // Avatar must remain visible
    const avatar = page.locator("header button img[alt]");
    await expect(avatar).toBeVisible({ timeout: 6000 });
  });
});
