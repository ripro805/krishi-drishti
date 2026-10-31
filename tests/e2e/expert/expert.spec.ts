import { test, expect } from "@playwright/test";
import { loginWithDemoRole, clearAuthSession } from "../helpers/auth.helper";

test.describe("Agronomist Expert Portal Tests", () => {
  test.beforeEach(async ({ page }) => {
    await clearAuthSession(page);
    await loginWithDemoRole(page, "expert");
    await page.goto("/expert");
    await page.waitForLoadState("domcontentloaded");
  });

  test("EXP-001: Expert Portal loads with header and navigation tabs", async ({ page }) => {
    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toContainText(/expert|বিশেষজ্ঞ/i);

    // Verify presence of primary tabs
    await expect(page.getByText(/escalated|জরুরি কেস|টেলি-পরামর্শ/i).first()).toBeVisible();
    await expect(page.getByText(/feedback|ফিডব্যাক/i).first()).toBeVisible();
    await expect(page.getByText(/diseases|রোগ তথ্যভাণ্ডার|CMS/i).first()).toBeVisible();
    await expect(page.getByText(/dosage|ডোজ|বালাইনাশক/i).first()).toBeVisible();
  });

  test("EXP-002: Switching between portal tabs updates displayed view", async ({ page }) => {
    // Click Feedback tab
    const feedbackTab = page.locator("button").getByText(/feedback|ফিডব্যাক/i).first();
    await feedbackTab.click();
    await expect(page.getByText(/farmer feedback|কৃষক ফিডব্যাক|কারেকশন/i).first()).toBeVisible({ timeout: 5000 });

    // Click Diseases tab
    const diseasesTab = page.locator("button").getByText(/diseases|রোগ তথ্যভাণ্ডার|CMS/i).first();
    await diseasesTab.click();
    await expect(page.getByText(/pathology catalog|রোগ তথ্যভাণ্ডার|গাইডলাইন/i).first()).toBeVisible({ timeout: 5000 });
  });

  test("EXP-003: Review advisory form contains note and prescription inputs", async ({ page }) => {
    // If an escalated scan exists, click review
    const reviewBtn = page.getByRole("button", { name: /review|রিভিউ/i }).first();
    if (await reviewBtn.isVisible()) {
      await reviewBtn.click();

      // Advisory modal should open
      const advisoryModal = page.getByRole("dialog").or(page.locator("div.fixed, form"));
      await expect(advisoryModal.first()).toBeVisible({ timeout: 5000 });

      // Note and Prescription textareas
      const textarea = page.locator("textarea");
      await expect(textarea.first()).toBeVisible();
    }
  });
});
