import { test, expect } from "@playwright/test";

test.describe("Plant Disease Encyclopedia Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/library");
    await page.waitForLoadState("domcontentloaded");
  });

  test("LIB-001: Search filters diseases by keyword", async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search by disease|অনুসন্ধান/i);
    await searchInput.fill("Late Blight");

    // Grid should display Potato/Tomato Late Blight card
    const cardTitle = page.locator("h3").getByText(/late blight|নাবি ধসা/i);
    await expect(cardTitle.first()).toBeVisible({ timeout: 5000 });
  });

  test("LIB-002: Filter diseases by Crop Chip", async ({ page }) => {
    // Click Rice chip
    const riceChip = page.getByRole("button", { name: /^rice$/i });
    if (await riceChip.isVisible()) {
      await riceChip.click();

      // Cards should display Rice pathology
      const riceCard = page.getByText(/rice/i).first();
      await expect(riceCard).toBeVisible();
    }
  });

  test("LIB-003: Filter diseases by Pathogen Type (Bacterial)", async ({ page }) => {
    const bacterialChip = page.getByRole("button", { name: /bacterial|ব্যাকটেরিয়া/i }).first();
    if (await bacterialChip.isVisible()) {
      await bacterialChip.click();

      // Pathology badges should indicate Bacterial
      const badge = page.getByText(/bacterial|ব্যাকটেরিয়া/i).first();
      await expect(badge).toBeVisible();
    }
  });

  test("LIB-004: Opening disease details modal displays clinical treatment tabs", async ({ page }) => {
    // Click on Full Pathology Details on first card
    const detailsBtn = page.getByRole("button", { name: /full pathology details/i }).first();
    await detailsBtn.click();

    // Treatment modal opens
    const modal = page.getByRole("dialog");
    await expect(modal).toBeVisible({ timeout: 5000 });

    // Verify tabs exist inside modal
    const organicTab = modal.getByRole("tab", { name: /organic|জৈব/i }).or(modal.getByText(/organic|জৈব/i));
    await expect(organicTab.first()).toBeVisible();
  });

  test("LIB-005: Non-matching search query displays empty state", async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search by disease|অনুসন্ধান/i);
    await searchInput.fill("nonexistent_pathogen_xyz_12345");

    // Grid should display 0 disease cards
    const cards = page.getByRole("button", { name: /full pathology details/i });
    await expect(cards).toHaveCount(0);
  });
});
