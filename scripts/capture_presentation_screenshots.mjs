import { chromium } from "playwright";
import fs from "fs";
import path from "path";

async function captureAll() {
  const outputDir = path.resolve("docs/presentation/images");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  console.log("1. Capturing Landing Page...");
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await page.screenshot({ path: path.join(outputDir, "01_landing.png"), clip: { x: 0, y: 0, width: 1440, height: 860 } });

  console.log("2. Capturing Scanner Diagnostic Result...");
  await page.goto("http://localhost:3000/scan", { waitUntil: "networkidle" });
  // Click Tomato crop button
  const tomatoCropBtn = page.getByRole("button", { name: /tomato|টমেটো/i }).first();
  if (await tomatoCropBtn.isVisible()) {
    await tomatoCropBtn.click();
  }
  // Click sample leaf
  const sampleCards = page.locator("button img[alt]");
  if (await sampleCards.first().isVisible({ timeout: 4000 })) {
    await sampleCards.first().click();
    await page.waitForTimeout(1000);
  }
  // Click analyze
  const analyzeBtn = page.getByRole("button", { name: /run ai disease analysis|এআই দিয়ে রোগ নির্ণয়/i });
  if (await analyzeBtn.isVisible({ timeout: 4000 })) {
    await analyzeBtn.click();
    // Wait for result card
    await page.waitForTimeout(4000);
  }
  await page.screenshot({ path: path.join(outputDir, "03_scanner_result.png"), clip: { x: 0, y: 150, width: 1440, height: 860 } });

  console.log("3. Capturing Two-Stage Clinical Guard / Mismatch Warning...");
  await page.goto("http://localhost:3000/scan", { waitUntil: "networkidle" });
  // Select Wheat crop
  const wheatBtn = page.getByRole("button", { name: /wheat|গম/i }).first();
  if (await wheatBtn.isVisible()) {
    await wheatBtn.click();
  }
  // But upload an Tomato leaf sample or mismatched sample to trigger guard
  if (await sampleCards.first().isVisible({ timeout: 4000 })) {
    await sampleCards.first().click();
    await page.waitForTimeout(1000);
  }
  if (await analyzeBtn.isVisible({ timeout: 4000 })) {
    await analyzeBtn.click();
    await page.waitForTimeout(4000);
  }
  await page.screenshot({ path: path.join(outputDir, "02_scanner_guard.png"), clip: { x: 0, y: 150, width: 1440, height: 860 } });

  console.log("4. Capturing Active Chatbot Conversation...");
  await page.goto("http://localhost:3000/chat", { waitUntil: "networkidle" });
  // Click on a prompt chip
  const promptChip = page.locator("button:has-text('টমেটো'), button:has-text('ধান'), button:has-text('আলু')").first();
  if (await promptChip.isVisible({ timeout: 3000 })) {
    await promptChip.click();
    await page.waitForTimeout(500);
    const sendBtn = page.locator("button[type='submit']");
    if (await sendBtn.isVisible()) {
      await sendBtn.click();
      await page.waitForTimeout(5000); // wait for streaming or response
    }
  }
  await page.screenshot({ path: path.join(outputDir, "04_chatbot.png"), clip: { x: 0, y: 0, width: 1440, height: 860 } });

  console.log("5. Capturing Fertilizer Dosage Calculator...");
  await page.goto("http://localhost:3000/calculator", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(outputDir, "05_calculator.png"), clip: { x: 0, y: 0, width: 1440, height: 860 } });

  console.log("6. Capturing Disease Encyclopedia...");
  await page.goto("http://localhost:3000/library", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(outputDir, "06_library.png"), clip: { x: 0, y: 0, width: 1440, height: 860 } });

  console.log("7. Capturing Field History...");
  await page.goto("http://localhost:3000/history", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(outputDir, "08_history.png"), clip: { x: 0, y: 0, width: 1440, height: 860 } });

  console.log("8. Capturing Expert Portal...");
  await page.goto("http://localhost:3000/login", { waitUntil: "networkidle" });
  const expertDemo = page.getByRole("button", { name: /officer|কৃষিবিদ|expert/i });
  if (await expertDemo.isVisible({ timeout: 3000 })) {
    await expertDemo.click();
    await page.waitForTimeout(2000);
    await page.goto("http://localhost:3000/expert", { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(outputDir, "09_expert.png"), clip: { x: 0, y: 0, width: 1440, height: 860 } });
  }

  console.log("9. Capturing Admin Dashboard...");
  await page.goto("http://localhost:3000/login", { waitUntil: "networkidle" });
  const adminDemo = page.getByRole("button", { name: /admin|অ্যাডমিন/i });
  if (await adminDemo.isVisible({ timeout: 3000 })) {
    await adminDemo.click();
    await page.waitForTimeout(2000);
    await page.goto("http://localhost:3000/admin", { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(outputDir, "07_admin.png"), clip: { x: 0, y: 0, width: 1440, height: 860 } });
  }

  await browser.close();
  console.log("All enhanced screenshots captured!");
}

captureAll().catch((e) => {
  console.error("Capture failed:", e);
  process.exit(1);
});
