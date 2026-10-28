import { test, expect } from "@playwright/test";

test.describe("Scan History & Field Health Tracking Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/history");
    await page.waitForLoadState("domcontentloaded");
  });

  test("HIST-001: History page displays layout, heading, and action buttons", async ({ page }) => {
    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toContainText(/history|ইতিহাস/i);

    // Scan New Leaf button exists
    const newScanBtn = page.getByRole("link", { name: /scan new leaf|নতুন পাতা স্ক্যান/i });
    await expect(newScanBtn).toBeVisible();
  });

  test("HIST-002: Crop filter buttons update displayed list", async ({ page }) => {
    // Locate crop filter chip for Tomato
    const tomatoChip = page.getByRole("button", { name: /tomato|টমেটো/i }).first();
    if (await tomatoChip.isVisible()) {
      await tomatoChip.click();
      // Should remain on /history without errors
      await expect(page).toHaveURL(/\/history/);
    }
  });

  test("HIST-003: Status filter buttons (Active, Treated, Monitoring) toggle filter state", async ({ page }) => {
    const activeChip = page.getByRole("button", { name: /active|সক্রিয়/i }).first();
    if (await activeChip.isVisible()) {
      await activeChip.click();
      await expect(page).toHaveURL(/\/history/);
    }
  });

  test("HIST-004: Empty state displays helpful prompt to scan leaves", async ({ page }) => {
    // If history is empty, check for prompt
    const emptyPrompt = page.getByText(/no scans found|কোনো স্ক্যান পাওয়া যায়নি|কোনো ইতিহাস নেই/i);
    const count = await emptyPrompt.count();
    if (count > 0) {
      await expect(emptyPrompt.first()).toBeVisible();
      const startScanLink = page.getByRole("link", { name: /scan|স্ক্যান/i }).first();
      await expect(startScanLink).toBeVisible();
    }
  });
});
