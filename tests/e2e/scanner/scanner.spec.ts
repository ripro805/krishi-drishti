import { test, expect } from "@playwright/test";
import {
  MOCK_DETECT_SUCCESS_TOMATO,
  MOCK_DETECT_CROP_MISMATCH,
  MOCK_DETECT_UNKNOWN_CROP,
} from "../fixtures/mock-data";

test.describe("AI Leaf Disease Scanner Tests", () => {
  test("SCAN-001: Preset Sample Leaf Selection and Successful Analysis Rendering", async ({ page }) => {
    // Intercept /api/detect with deterministic Tomato Early Blight fixture
    await page.route("**/api/detect", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(MOCK_DETECT_SUCCESS_TOMATO),
      });
    });

    await page.goto("/scan");
    await page.waitForLoadState("domcontentloaded");

    // Click Tomato crop button
    const tomatoCropBtn = page.getByRole("button", { name: /tomato|টমেটো/i }).first();
    await tomatoCropBtn.click();

    // Select first sample leaf preset
    const sampleCards = page.locator("button img[alt]");
    await expect(sampleCards.first()).toBeVisible({ timeout: 5000 });
    await sampleCards.first().click();

    // Trigger analysis
    const analyzeBtn = page.getByRole("button", { name: /run ai disease analysis|এআই দিয়ে রোগ নির্ণয়/i });
    await expect(analyzeBtn).toBeVisible();
    await analyzeBtn.click();

    // Verify diagnostic result card renders
    const resultTitle = page.getByText(/pathology analysis complete|রোগ নির্ণয় ও প্রাথমিক স্ক্রিনিং/i);
    await expect(resultTitle).toBeVisible({ timeout: 10000 });

    // Verify detected crop and pathology
    const diseaseName = page.getByText(/early blight|আগাম ধসা/i);
    await expect(diseaseName.first()).toBeVisible();

    // Verify treatment plan tabs exist
    const organicTab = page.getByRole("button", { name: /organic|জৈব/i });
    await expect(organicTab).toBeVisible();
    await organicTab.click();

    // Verify organic guidance text appears
    const organicContent = page.getByText(/bio-control|ট্রাইকোডার্মা|জৈব/i);
    await expect(organicContent.first()).toBeVisible();
  });

  test("SCAN-002: Unknown / Ambiguous Foliar Specimen Rejection Guard", async ({ page }) => {
    // Intercept /api/detect with unknown_crop fixture
    await page.route("**/api/detect", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(MOCK_DETECT_UNKNOWN_CROP),
      });
    });

    await page.goto("/scan");
    await page.waitForLoadState("domcontentloaded");

    // Upload an foliar photo to trigger real API path
    await page.locator('input[type="file"]').setInputFiles({
      name: "unknown_leaf.png",
      mimeType: "image/png",
      buffer: Buffer.from(
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
        "base64"
      ),
    });

    const analyzeBtn = page.getByRole("button", { name: /run ai disease analysis|এআই দিয়ে রোগ নির্ণয়/i });
    await expect(analyzeBtn).toBeVisible({ timeout: 5000 });
    await analyzeBtn.click();

    // Rejection card must display "অনির্ণীত" without treatment options
    const unknownCard = page.getByText(/অনির্ণীত|unable to determine diagnosis|inconclusive/i);
    await expect(unknownCard.first()).toBeVisible({ timeout: 10000 });

    // Chemical treatment tab should NOT be visible to prevent wrongful pesticide advice
    const chemicalTab = page.getByRole("button", { name: /chemical|ছত্রাকনাশক|রাসায়নিক/i });
    await expect(chemicalTab).not.toBeVisible();
  });

  test("SCAN-003: Crop Mismatch Detection Warning", async ({ page }) => {
    // Intercept /api/detect with crop_mismatch fixture
    await page.route("**/api/detect", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(MOCK_DETECT_CROP_MISMATCH),
      });
    });

    await page.goto("/scan");
    await page.waitForLoadState("domcontentloaded");

    // Select Tomato crop
    const tomatoCropBtn = page.getByRole("button", { name: /tomato|টমেটো/i }).first();
    await tomatoCropBtn.click();

    // Upload an foliar photo to trigger API mismatch response
    await page.locator('input[type="file"]').setInputFiles({
      name: "mismatch_leaf.png",
      mimeType: "image/png",
      buffer: Buffer.from(
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
        "base64"
      ),
    });

    const analyzeBtn = page.getByRole("button", { name: /run ai disease analysis|এআই দিয়ে রোগ নির্ণয়/i });
    await expect(analyzeBtn).toBeVisible({ timeout: 5000 });
    await analyzeBtn.click();

    // Mismatch banner
    const mismatchBanner = page.getByText(/crop mismatch|ফসলের অমিল/i);
    await expect(mismatchBanner.first()).toBeVisible({ timeout: 10000 });
  });

  test("SCAN-004: Save Scan to Field History Workflow", async ({ page }) => {
    await page.route("**/api/detect", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(MOCK_DETECT_SUCCESS_TOMATO),
      });
    });

    await page.goto("/scan");
    await page.waitForLoadState("domcontentloaded");

    const sampleCards = page.locator("button img[alt]");
    await sampleCards.first().click();

    const analyzeBtn = page.getByRole("button", { name: /run ai disease analysis|এআই দিয়ে রোগ নির্ণয়/i });
    await analyzeBtn.click();

    // Click Save Scan button
    const saveBtn = page.getByRole("button", { name: /save scan|ফলাফল সংরক্ষণ/i });
    await expect(saveBtn).toBeVisible({ timeout: 10000 });
    await saveBtn.click();

    // Button state changes to saved
    await expect(page.getByText(/saved to field history|সংরক্ষিত হয়েছে/i).first()).toBeVisible();
  });

  test("SCAN-005: PDF Pathology Dossier Modal Trigger", async ({ page }) => {
    await page.route("**/api/detect", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(MOCK_DETECT_SUCCESS_TOMATO),
      });
    });

    await page.goto("/scan");
    await page.waitForLoadState("domcontentloaded");

    const sampleCards = page.locator("button img[alt]");
    await sampleCards.first().click();

    const analyzeBtn = page.getByRole("button", { name: /run ai disease analysis|এআই দিয়ে রোগ নির্ণয়/i });
    await analyzeBtn.click();

    // Open PDF modal
    const pdfBtn = page.getByRole("button", { name: /pdf/i });
    await expect(pdfBtn).toBeVisible({ timeout: 10000 });
    await pdfBtn.click();

    // PDF modal title visible
    const pdfModal = page.getByRole("dialog");
    await expect(pdfModal).toBeVisible();
  });

  test("SCAN-006: Farmer Prediction Feedback Submission", async ({ page }) => {
    await page.route("**/api/detect", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(MOCK_DETECT_SUCCESS_TOMATO),
      });
    });

    // Intercept feedback API
    await page.route("**/api/feedback", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true, message: "Feedback recorded" }),
      });
    });

    await page.goto("/scan");
    await page.waitForLoadState("domcontentloaded");

    const sampleCards = page.locator("button img[alt]");
    await sampleCards.first().click();

    const analyzeBtn = page.getByRole("button", { name: /run ai disease analysis|এআই দিয়ে রোগ নির্ণয়/i });
    await analyzeBtn.click();

    // Click Accurate feedback button
    const accurateBtn = page.locator("button").getByText(/সঠিক|accurate/i).first();
    await expect(accurateBtn).toBeVisible({ timeout: 10000 });
    await accurateBtn.click();

    // Success feedback message should render
    const feedbackSuccess = page.getByText(/ধন্যবাদ|thank you|feedback/i);
    await expect(feedbackSuccess.first()).toBeVisible({ timeout: 5000 });
  });
});
