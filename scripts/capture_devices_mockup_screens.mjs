import { chromium } from "playwright";
import fs from "fs";
import path from "path";

async function captureMockupScreens() {
  const outputDir = path.resolve("docs/presentation/images/mockups");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });

  // 1. Laptop Screen (MacBook Pro 16:10 aspect ratio: 1600x1000)
  console.log("Capturing Laptop Screen (1600x1000)...");
  const laptopContext = await browser.newContext({
    viewport: { width: 1600, height: 1000 },
    deviceScaleFactor: 2,
  });
  const laptopPage = await laptopContext.newPage();
  await laptopPage.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await laptopPage.waitForTimeout(1500);
  await laptopPage.screenshot({
    path: path.join(outputDir, "screen_laptop.png"),
    clip: { x: 0, y: 0, width: 1600, height: 1000 },
  });
  await laptopContext.close();

  // 2. Tablet Screen (iPad Pro 11-inch portrait: 834 x 1194)
  console.log("Capturing iPad / Tablet Screen (834x1194)...");
  const tabletContext = await browser.newContext({
    viewport: { width: 834, height: 1194 },
    deviceScaleFactor: 2,
    isMobile: false,
  });
  const tabletPage = await tabletContext.newPage();
  await tabletPage.goto("http://localhost:3000/calculator", { waitUntil: "networkidle" });
  await tabletPage.waitForTimeout(1500);
  await tabletPage.screenshot({
    path: path.join(outputDir, "screen_tablet.png"),
    clip: { x: 0, y: 0, width: 834, height: 1194 },
  });
  await tabletContext.close();

  // 3. Smartphone Screen (iPhone 15 Pro: 393 x 852)
  console.log("Capturing Mobile / Phone Screen (393x852)...");
  const mobileContext = await browser.newContext({
    viewport: { width: 393, height: 852 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto("http://localhost:3000/scan", { waitUntil: "networkidle" });
  await mobilePage.waitForTimeout(1000);
  // Click first sample
  const sampleLeaf = mobilePage.locator("button img[alt]").first();
  if (await sampleLeaf.isVisible({ timeout: 3000 })) {
    await sampleLeaf.click();
    await mobilePage.waitForTimeout(800);
  }
  const scanBtn = mobilePage.getByRole("button", { name: /run ai disease analysis|এআই দিয়ে রোগ নির্ণয়|analyze/i });
  if (await scanBtn.isVisible({ timeout: 3000 })) {
    await scanBtn.click();
    await mobilePage.waitForTimeout(3500);
  }
  await mobilePage.screenshot({
    path: path.join(outputDir, "screen_mobile.png"),
    clip: { x: 0, y: 0, width: 393, height: 852 },
  });
  await mobileContext.close();

  await browser.close();
  console.log("Screenshots captured successfully in docs/presentation/images/mockups/");
}

captureMockupScreens().catch((err) => {
  console.error("Error capturing mockup screens:", err);
  process.exit(1);
});

