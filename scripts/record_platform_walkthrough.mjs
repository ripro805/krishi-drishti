import { chromium } from "playwright";
import fs from "fs";
import path from "path";

// Helper for human-like smooth scrolling
async function smoothScroll(page, targetY, durationMs = 1500) {
  await page.evaluate(
    async ({ targetY, durationMs }) => {
      const startY = window.scrollY;
      const diff = targetY - startY;
      const startTime = performance.now();
      return new Promise((resolve) => {
        function step(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / durationMs, 1);
          // easeInOutCubic
          const ease =
            progress < 0.5
              ? 4 * progress * progress * progress
              : 1 - Math.pow(-2 * progress + 2, 3) / 2;
          window.scrollTo(0, startY + diff * ease);
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            resolve();
          }
        }
        requestAnimationFrame(step);
      });
    },
    { targetY, durationMs }
  );
  await page.waitForTimeout(400);
}

// Injects a smooth glowing animated cursor to highlight user actions
async function injectCursor(page) {
  await page.evaluate(() => {
    if (document.getElementById("walkthrough-cursor")) return;
    const cursor = document.createElement("div");
    cursor.id = "walkthrough-cursor";
    cursor.style.position = "fixed";
    cursor.style.width = "22px";
    cursor.style.height = "22px";
    cursor.style.borderRadius = "50%";
    cursor.style.backgroundColor = "rgba(16, 185, 129, 0.65)"; // Emerald glow
    cursor.style.border = "2.5px solid rgba(255, 255, 255, 0.95)";
    cursor.style.boxShadow = "0 0 16px rgba(16, 185, 129, 0.9)";
    cursor.style.pointerEvents = "none";
    cursor.style.zIndex = "9999999";
    cursor.style.transition = "transform 0.12s ease-out, background-color 0.15s";
    cursor.style.transform = "translate(-50%, -50%)";
    cursor.style.left = "-100px";
    cursor.style.top = "-100px";
    document.body.appendChild(cursor);

    window.addEventListener("mousemove", (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });
    window.addEventListener("mousedown", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(0.68)";
      cursor.style.backgroundColor = "rgba(239, 68, 68, 0.85)"; // Red flash on click
    });
    window.addEventListener("mouseup", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
      cursor.style.backgroundColor = "rgba(16, 185, 129, 0.65)";
    });
  });
}

// Move mouse smoothly to an element and click it
async function smoothClick(page, locator) {
  if (await locator.isVisible()) {
    const box = await locator.boundingBox();
    if (box) {
      const targetX = box.x + box.width / 2;
      const targetY = box.y + box.height / 2;
      await page.mouse.move(targetX, targetY, { steps: 20 });
      await page.waitForTimeout(150);
      await page.mouse.down();
      await page.waitForTimeout(120);
      await page.mouse.up();
      await page.waitForTimeout(300);
      return true;
    }
  }
  return false;
}

async function recordFullWalkthrough() {
  const videoDir = path.resolve("docs/presentation/video");
  if (!fs.existsSync(videoDir)) {
    fs.mkdirSync(videoDir, { recursive: true });
  }

  console.log("🎬 Starting KrishiDrishti Full Platform Video Recording...");
  const browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: {
      dir: videoDir,
      size: { width: 1920, height: 1080 },
    },
    deviceScaleFactor: 1,
  });

  const page = await context.newPage();

  // =========================================================================
  // SCENE 1: LANDING PAGE & ECOSYSTEM OVERVIEW
  // =========================================================================
  console.log("📍 Scene 1: Landing Page Showcase...");
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await injectCursor(page);
  await page.waitForTimeout(2000);

  // Smooth scroll down to highlight features & statistics
  console.log("  - Scrolling through Hero & Live Scanner Preview...");
  await smoothScroll(page, 700, 2000);
  await page.waitForTimeout(1200);

  console.log("  - Scrolling to Platform Statistics & Comparative Grid...");
  await smoothScroll(page, 1500, 2200);
  await page.waitForTimeout(1500);

  console.log("  - Scrolling to Supported Crops Gallery...");
  await smoothScroll(page, 2300, 2000);
  await page.waitForTimeout(1500);

  // Scroll back to top
  console.log("  - Returning to top for Language Toggle...");
  await smoothScroll(page, 0, 1800);
  await page.waitForTimeout(800);

  // Language switch to Bengali and back
  const langBtn = page.locator("button[title*='Language'], button:has-text('বাংলা'), button:has-text('English')").first();
  if (await langBtn.isVisible()) {
    console.log("  - Toggling Language to বাংলা...");
    await smoothClick(page, langBtn);
    await page.waitForTimeout(1800); // Pause to see native Bengali UI
    console.log("  - Toggling Language back to English...");
    await smoothClick(page, langBtn);
    await page.waitForTimeout(1200);
  }

  // =========================================================================
  // SCENE 2: DEDICATED AI LEAF SCANNER STUDIO & DUAL-LAYER GUARDRAIL
  // =========================================================================
  console.log("📍 Scene 2: Dedicated AI Leaf Scanner Studio (/scan)...");
  await page.goto("http://localhost:3000/scan", { waitUntil: "networkidle" });
  await injectCursor(page);
  await page.waitForTimeout(1500);

  // Select Tomato
  console.log("  - Selecting 'Tomato' Crop...");
  const tomatoBtn = page.getByRole("button", { name: /tomato|টমেটো/i }).first();
  await smoothClick(page, tomatoBtn);
  await page.waitForTimeout(1000);

  // Select test sample leaf
  console.log("  - Selecting Sample Leaf (Tomato Early Blight)...");
  const sampleLeaves = page.locator("button img[alt]");
  if (await sampleLeaves.first().isVisible({ timeout: 4000 })) {
    await smoothClick(page, sampleLeaves.first());
    await page.waitForTimeout(1500);
  }

  // Click Run Analysis
  console.log("  - Triggering Neural Vision Inference...");
  const analyzeBtn = page.getByRole("button", { name: /run ai disease analysis|রোগ নির্ণয়|analyze/i });
  if (await analyzeBtn.isVisible({ timeout: 4000 })) {
    await smoothClick(page, analyzeBtn);
    // Pause to admire laser scanning animation and neural diagnostic progression
    console.log("  - Watching real-time laser scanning telemetry...");
    await page.waitForTimeout(4500);
  }

  // Scroll smoothly down to the diagnostic card
  console.log("  - Inspecting Clinical Pathology Dossier...");
  await smoothScroll(page, 480, 1500);
  await page.waitForTimeout(2000);

  // Explore Treatment Plan Tabs
  console.log("  - Exploring Treatment Protocols...");
  const organicTab = page.getByRole("tab", { name: /organic|জৈব/i });
  if (await organicTab.isVisible()) {
    await smoothClick(page, organicTab);
    await page.waitForTimeout(1500);
  }

  const chemicalTab = page.getByRole("tab", { name: /chemical|রাসায়নিক/i });
  if (await chemicalTab.isVisible()) {
    await smoothClick(page, chemicalTab);
    await page.waitForTimeout(1500);
  }

  const preventionTab = page.getByRole("tab", { name: /prevention|প্রতিরোধ/i });
  if (await preventionTab.isVisible()) {
    await smoothClick(page, preventionTab);
    await page.waitForTimeout(1500);
  }

  // Click PDF Export Modal
  console.log("  - Opening PDF Pathology Dossier Modal...");
  const pdfBtn = page.getByRole("button", { name: /download.*pdf|পিডিএফ/i });
  if (await pdfBtn.isVisible()) {
    await smoothClick(page, pdfBtn);
    await page.waitForTimeout(2000);
    // Close PDF modal
    const closePdf = page.getByRole("button", { name: /close|বন্ধ/i }).or(page.locator("button[aria-label='Close']")).first();
    if (await closePdf.isVisible()) {
      await smoothClick(page, closePdf);
      await page.waitForTimeout(1000);
    }
  }

  // DEMONSTRATE DUAL-LAYER GUARDRAIL
  console.log("  - Demonstrating Two-Stage Anti-Hallucination Guardrail...");
  await smoothScroll(page, 0, 1200);
  const wheatBtn = page.getByRole("button", { name: /wheat|গম/i }).first();
  if (await wheatBtn.isVisible()) {
    await smoothClick(page, wheatBtn);
    await page.waitForTimeout(800);
  }

  // Keep tomato sample, run analyze to trigger cross-crop mismatch
  if (await analyzeBtn.isVisible()) {
    await smoothClick(page, analyzeBtn);
    await page.waitForTimeout(4000);
    await smoothScroll(page, 400, 1200);
    console.log("  - Guardrail Alert displayed: Cross-crop mismatch blocked!");
    await page.waitForTimeout(2500);
  }

  // =========================================================================
  // SCENE 3: CROP DOCTOR AI CHATBOT STUDIO (/chat)
  // =========================================================================
  console.log("📍 Scene 3: Crop Doctor AI Chatbot Studio (/chat)...");
  await page.goto("http://localhost:3000/chat", { waitUntil: "networkidle" });
  await injectCursor(page);
  await page.waitForTimeout(1500);

  // Click a quick prompt pill
  console.log("  - Submitting Agricultural Inquiry Chip...");
  const promptChip = page.locator("button:has-text('টমেটো'), button:has-text('ধান'), button:has-text('আলু')").first();
  if (await promptChip.isVisible({ timeout: 3000 })) {
    await smoothClick(page, promptChip);
    await page.waitForTimeout(800);

    const sendBtn = page.locator("button[type='submit']");
    if (await sendBtn.isVisible()) {
      await smoothClick(page, sendBtn);
      console.log("  - Streaming real-time bilingual agronomic response...");
      await page.waitForTimeout(6000);
    }
  }

  // =========================================================================
  // SCENE 4: PRECISION FERTILIZER & N-P-K CALCULATOR (/calculator)
  // =========================================================================
  console.log("📍 Scene 4: Precision Fertilizer & N-P-K Dosage Calculator (/calculator)...");
  await page.goto("http://localhost:3000/calculator", { waitUntil: "networkidle" });
  await injectCursor(page);
  await page.waitForTimeout(1500);

  // Interact with field area input
  const areaInput = page.locator("input[type='number']").first();
  if (await areaInput.isVisible()) {
    console.log("  - Configuring Field Area (2.5 Acres)...");
    await smoothClick(page, areaInput);
    await areaInput.fill("2.5");
    await page.waitForTimeout(800);
  }

  // Scroll down to showcase calculated dosages and split schedule
  console.log("  - Inspecting BARI-calibrated N-P-K Dosages & Split Application Schedule...");
  await smoothScroll(page, 450, 1800);
  await page.waitForTimeout(2200);

  console.log("  - Inspecting 3-Phase Application Regimen (Basal, Vegetative, Flowering)...");
  await smoothScroll(page, 900, 1800);
  await page.waitForTimeout(2500);

  // =========================================================================
  // SCENE 5: PLANT PATHOLOGY ENCYCLOPEDIA (/library)
  // =========================================================================
  console.log("📍 Scene 5: Plant Pathology Encyclopedia (/library)...");
  await page.goto("http://localhost:3000/library", { waitUntil: "networkidle" });
  await injectCursor(page);
  await page.waitForTimeout(1500);

  // Search for Blight
  const searchInput = page.locator("input[placeholder*='Search'], input[placeholder*='খুঁজুন']").first();
  if (await searchInput.isVisible()) {
    console.log("  - Searching for 'Blight' diseases...");
    await smoothClick(page, searchInput);
    await searchInput.fill("Blight");
    await page.waitForTimeout(1200);
  }

  // Scroll through filtered disease cards
  console.log("  - Browsing Pathogen Cards...");
  await smoothScroll(page, 500, 1800);
  await page.waitForTimeout(2200);

  // =========================================================================
  // SCENE 6: FIELD SCAN HISTORY & STATUS TRACKING (/history)
  // =========================================================================
  console.log("📍 Scene 6: Field Scan History & Status Tracking (/history)...");
  await page.goto("http://localhost:3000/history", { waitUntil: "networkidle" });
  await injectCursor(page);
  await page.waitForTimeout(1500);

  console.log("  - Inspecting Historical Diagnostic Logs...");
  await smoothScroll(page, 450, 1800);
  await page.waitForTimeout(2500);

  // =========================================================================
  // SCENE 7: AGRONOMIST EXPERT CONSULTATION PORTAL (/expert)
  // =========================================================================
  console.log("📍 Scene 7: Agronomist Expert Consultation Portal (/expert)...");
  await page.goto("http://localhost:3000/login", { waitUntil: "networkidle" });
  await injectCursor(page);
  await page.waitForTimeout(1000);

  const expertDemo = page.getByRole("button", { name: /officer|কৃষিবিদ|expert/i });
  if (await expertDemo.isVisible({ timeout: 3000 })) {
    console.log("  - Authenticating as Certified Agronomist Expert...");
    await smoothClick(page, expertDemo);
    await page.waitForTimeout(1500);
    await page.goto("http://localhost:3000/expert", { waitUntil: "networkidle" });
    await injectCursor(page);
    await page.waitForTimeout(1500);

    console.log("  - Reviewing Case Escalation Queue & Digital Prescription Desk...");
    await smoothScroll(page, 400, 1800);
    await page.waitForTimeout(2500);
  }

  // =========================================================================
  // SCENE 8: ENTERPRISE ADMIN TELEMETRY DASHBOARD (/admin)
  // =========================================================================
  console.log("📍 Scene 8: Enterprise Admin Telemetry Dashboard (/admin)...");
  await page.goto("http://localhost:3000/login", { waitUntil: "networkidle" });
  await injectCursor(page);
  await page.waitForTimeout(1000);

  const adminDemo = page.getByRole("button", { name: /admin|অ্যাডমিন/i });
  if (await adminDemo.isVisible({ timeout: 3000 })) {
    console.log("  - Authenticating as System Administrator...");
    await smoothClick(page, adminDemo);
    await page.waitForTimeout(1500);
    await page.goto("http://localhost:3000/admin", { waitUntil: "networkidle" });
    await injectCursor(page);
    await page.waitForTimeout(1500);

    console.log("  - Inspecting Real-Time Epidemiological Telemetry & Regional Incidence...");
    await smoothScroll(page, 500, 2000);
    await page.waitForTimeout(2500);
  }

  // =========================================================================
  // SCENE 9: GRAND FINALE
  // =========================================================================
  console.log("📍 Scene 9: Final Wrap-up & Return to Homepage...");
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await injectCursor(page);
  await page.waitForTimeout(2500);

  // Close context to finish writing video
  console.log("💾 Finalizing and saving screen recording video file...");
  await context.close();

  const rawVideoPath = await page.video().path();
  const finalVideoPath = path.join(videoDir, "KrishiDrishti_Full_Platform_Walkthrough.webm");

  // Copy or rename to standard name
  if (fs.existsSync(rawVideoPath)) {
    fs.copyFileSync(rawVideoPath, finalVideoPath);
    const stats = fs.statSync(finalVideoPath);
    console.log(`✅ Video saved successfully!`);
    console.log(`   Location: ${finalVideoPath}`);
    console.log(`   File Size: ${(stats.size / (1024 * 1024)).toFixed(2)} MB`);
  }

  await browser.close();
  console.log("🎉 KrishiDrishti Complete Walkthrough Video Generation Completed!");
}

recordFullWalkthrough().catch((err) => {
  console.error("❌ Video recording failed:", err);
  process.exit(1);
});

