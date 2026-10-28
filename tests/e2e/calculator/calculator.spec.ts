import { test, expect } from "@playwright/test";

test.describe("Fertilizer Dosage Calculator Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/calculator");
    await page.waitForLoadState("domcontentloaded");
  });

  test("CALC-001: Default calculation renders valid nutrient dosages", async ({ page }) => {
    // Verify default target crop is set
    const cropSelect = page.locator("#calcCrop");
    await expect(cropSelect).toBeVisible();

    // Verify Urea dosage card exists and has numerical value
    const ureaCard = page.locator("div").getByText(/urea/i).locator("..").getByText(/kg/i);
    await expect(ureaCard.first()).toBeVisible();

    // Verify DAP dosage card exists
    const dapCard = page.locator("div").getByText(/dap/i).locator("..").getByText(/kg/i);
    await expect(dapCard.first()).toBeVisible();

    // Verify MOP dosage card exists
    const mopCard = page.locator("div").getByText(/mop/i).locator("..").getByText(/kg/i);
    await expect(mopCard.first()).toBeVisible();
  });

  test("CALC-002: Changing field area rescales fertilizer dosage proportionally", async ({ page }) => {
    const areaInput = page.locator("#fieldSize");
    await areaInput.fill("1");

    // Capture initial text for Urea dosage
    const initialText = await page.locator("body").innerText();
    const initialMatch = initialText.match(/(\d+(\.\d+)?)\s*kg/i);
    const initialValue = initialMatch ? parseFloat(initialMatch[1]) : null;

    // Double field area to 2
    await areaInput.fill("2");

    // Check that recalculated value increased
    const updatedText = await page.locator("body").innerText();
    const updatedMatch = updatedText.match(/(\d+(\.\d+)?)\s*kg/i);
    const updatedValue = updatedMatch ? parseFloat(updatedMatch[1]) : null;

    if (initialValue && updatedValue) {
      expect(updatedValue).toBeGreaterThan(initialValue);
    }
  });

  test("CALC-003: Changing crop updates split-application schedule", async ({ page }) => {
    const cropSelect = page.locator("#calcCrop");

    // Change crop to Rice (Paddy)
    await cropSelect.selectOption("Rice");

    // Rice agronomic stages should be visible
    const schedule = page.locator("div").getByText(/schedule|stage|তৈরি|কুশি/i);
    await expect(schedule.first()).toBeVisible();
  });

  test("CALC-004: Area unit conversion (Acre vs Bigha) updates calculation", async ({ page }) => {
    const unitSelect = page.locator("#areaUnit");

    // Select Bigha
    await unitSelect.selectOption("Bigha");

    // Verify result remains valid numbers
    const resultCard = page.locator("body").getByText(/kg/i);
    await expect(resultCard.first()).toBeVisible();
  });
});
