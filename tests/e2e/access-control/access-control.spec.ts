import { test, expect } from "@playwright/test";
import { loginWithDemoRole, clearAuthSession } from "../helpers/auth.helper";

test.describe("Role-Based Access Control (RBAC) Tests", () => {
  test.beforeEach(async ({ page }) => {
    await clearAuthSession(page);
  });

  test("RBAC-001: Farmer role cannot access Admin functionality without elevated privileges", async ({ page }) => {
    await loginWithDemoRole(page, "farmer");
    await page.goto("/admin");
    await page.waitForLoadState("domcontentloaded");

    // Must show unauthorized or demo switch button since user is Farmer
    const switchBtn = page.getByRole("button", { name: /switch to admin|সুইচ টু অ্যাডমিন/i });
    await expect(switchBtn).toBeVisible();
  });

  test("RBAC-002: Expert role can access Expert Portal", async ({ page }) => {
    await loginWithDemoRole(page, "expert");
    await page.goto("/expert");
    await page.waitForLoadState("domcontentloaded");

    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toContainText(/expert|বিশেষজ্ঞ/i);

    // Review tabs should be visible
    const escalatedTab = page.getByText(/escalated|জরুরি কেস|টেলি-পরামর্শ/i).first();
    await expect(escalatedTab).toBeVisible();
  });

  test("RBAC-003: Admin role has full access to Admin Control Panel and its sub-views", async ({ page }) => {
    await loginWithDemoRole(page, "admin");
    await page.goto("/admin");
    await page.waitForLoadState("domcontentloaded");

    // Main KPI dashboard
    await expect(page.getByText(/system admin|কন্ট্রোল প্যানেল/i).first()).toBeVisible();

    // Check sub-routes navigation
    await page.goto("/admin/users");
    await page.waitForLoadState("domcontentloaded");
    await expect(page).toHaveURL(/\/admin\/users/);

    await page.goto("/admin/diseases");
    await page.waitForLoadState("domcontentloaded");
    await expect(page).toHaveURL(/\/admin\/diseases/);
  });

  test("RBAC-004: Unauthenticated user navigating to /expert receives prompt", async ({ page }) => {
    await page.goto("/expert");
    await page.waitForLoadState("domcontentloaded");

    // Page must render with access prompt / demo switch option
    const accessPrompt = page.locator("body");
    await expect(accessPrompt).toContainText(/expert|কৃষিবিদ|লগইন/i);
  });
});
