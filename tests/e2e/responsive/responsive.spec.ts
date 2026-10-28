import { test, expect } from "@playwright/test";

test.describe("Localization & Responsive UI Tests", () => {
  test("I18N-001: Language Switcher updates UI between English and Bengali dynamically", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Locate language switcher button in header (supports full word on desktop or EN/বাং on mobile)
    const langBtn = page.locator("header").getByRole("button", { name: /english|বাংলা|en|বাং/i }).first();
    await expect(langBtn).toBeVisible();

    const initialText = await langBtn.innerText();

    // Toggle language
    await langBtn.click();

    // Button label should switch (e.g. from English to বাংলা or EN to বাং)
    const toggledText = await langBtn.innerText();
    expect(toggledText).not.toEqual(initialText);

    // Toggle back
    await langBtn.click();
    const revertedText = await langBtn.innerText();
    expect(revertedText).toEqual(initialText);
  });

  test("RESP-001: Mobile Viewport renders mobile navigation drawer without layout breakage", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Mobile menu button should be visible
    const hamburgerBtn = page.getByRole("button", { name: /toggle navigation menu|navigation menu/i });
    await expect(hamburgerBtn).toBeVisible();

    // Clicking toggle opens mobile drawer
    await hamburgerBtn.click();

    // Verify navigation drawer reveals links
    const mobileNavLink = page.getByRole("link", { name: /রোগ নির্ণয় স্ক্যানার|leaf scanner|scan/i }).first();
    await expect(mobileNavLink).toBeVisible({ timeout: 5000 });
  });

  test("RESP-002: Scanner Studio page remains fully usable on mobile screens", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/scan");
    await page.waitForLoadState("domcontentloaded");

    // Title and Dropzone must be visible and properly sized
    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible();

    const dropzone = page.getByText(/upload leaf photo|পাতার ছবি আপলোড|টেনে এনে/i);
    await expect(dropzone.first()).toBeVisible();

    // Crop selection bar must be visible
    const cropBar = page.getByRole("button", { name: /tomato|টমেটো/i }).first();
    await expect(cropBar).toBeVisible();
  });
});
