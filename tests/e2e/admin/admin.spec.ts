import { test, expect } from "@playwright/test";
import { loginWithDemoRole, clearAuthSession } from "../helpers/auth.helper";

test.describe("Admin Dashboard & CMS Tests", () => {
  test.beforeEach(async ({ page }) => {
    await clearAuthSession(page);
    await loginWithDemoRole(page, "admin");
    await page.goto("/admin");
    await page.waitForLoadState("domcontentloaded");
  });

  test("ADM-001: Admin Dashboard loads KPI metrics cards", async ({ page }) => {
    // Top banner
    const badge = page.getByText(/system admin/i);
    await expect(badge).toBeVisible();

    // Verify key metric sections exist
    const usersCard = page.locator("div").getByText(/users|ব্যবহারকারী/i);
    await expect(usersCard.first()).toBeVisible();

    const scansCard = page.locator("div").getByText(/scans|স্ক্যান/i);
    await expect(scansCard.first()).toBeVisible();
  });

  test("ADM-002: Navigation across Admin Sub-Views", async ({ page }) => {
    // 1. Users sub-view
    const usersLink = page.getByRole("link", { name: /users|ব্যবহারকারী/i });
    if (await usersLink.isVisible()) {
      await usersLink.click();
      await expect(page).toHaveURL(/\/admin\/users/);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    }

    // 2. Diseases sub-view
    const diseasesLink = page.getByRole("link", { name: /diseases|রোগ তথ্যভান্ডার/i });
    if (await diseasesLink.isVisible()) {
      await diseasesLink.click();
      await expect(page).toHaveURL(/\/admin\/diseases/);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    }

    // 3. Predictions sub-view
    const predictionsLink = page.getByRole("link", { name: /predictions|মনিটরিং/i });
    if (await predictionsLink.isVisible()) {
      await predictionsLink.click();
      await expect(page).toHaveURL(/\/admin\/predictions/);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    }
  });
});
