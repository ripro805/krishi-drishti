import { chromium } from "playwright";
import fs from "fs";
import path from "path";

// Helper for human-like smooth scrolling
async function smoothScroll(page, targetY, durationMs = 2000) {
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
  await page.waitForTimeout(600);
}

// Injects an elegant glowing animated cursor to highlight user actions on video
async function injectCursor(page) {
  await page.evaluate(() => {
    if (document.getElementById("walkthrough-cursor")) return;
    const cursor = document.createElement("div");
    cursor.id = "walkthrough-cursor";
    cursor.style.position = "fixed";
    cursor.style.width = "24px";
    cursor.style.height = "24px";
    cursor.style.borderRadius = "50%";
    cursor.style.backgroundColor = "rgba(16, 185, 129, 0.7)"; // Emerald glow
    cursor.style.border = "2.5px solid rgba(255, 255, 255, 0.95)";
    cursor.style.boxShadow = "0 0 18px rgba(16, 185, 129, 0.95)";
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
      cursor.style.transform = "translate(-50%, -50%) scale(0.65)";
      cursor.style.backgroundColor = "rgba(239, 68, 68, 0.9)"; // Red flash on click
    });
    window.addEventListener("mouseup", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
      cursor.style.backgroundColor = "rgba(16, 185, 129, 0.7)";
    });
  });
}

// Smoothly move mouse to element and click
async function smoothClick(page, locator) {
  if (await locator.isVisible()) {
    const box = await locator.boundingBox();
    if (box) {
      const targetX = box.x + box.width / 2;
      const targetY = box.y + box.height / 2;
      await page.mouse.move(targetX, targetY, { steps: 25 });
      await page.waitForTimeout(200);
      await page.mouse.down();
      await page.waitForTimeout(140);
      await page.mouse.up();
      await page.waitForTimeout(400);
      return true;
    }
  }
  return false;
}

async function record3MinWalkthrough() {
  const videoDir = path.resolve("docs/presentation/video");
  if (!fs.existsSync(videoDir)) {
    fs.mkdirSync(videoDir, { recursive: true });
  }

  const realImagePath = path.resolve("all diseases/apple black rob.jpg");
  if (!fs.existsSync(realImagePath)) {
    console.error(`Error: Real image not found at ${realImagePath}`);
    process.exit(1);
  }

  console.log("🎬 Launching 3-Minute KrishiDrishti Walkthrough Recording...");
  const browser = await chromium.launch({ headless: true });

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
  // SCENE 1: LANDING PAGE & BILINGUAL UI (0:00 - 0:25)
  // =========================================================================
  console.log("📍 [0:00 - 0:25] Scene 1: Landing Page & Bilingual Localization...");
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await injectCursor(page);
  await page.waitForTimeout(2500);

  // Smooth scroll through Hero section
  await smoothScroll(page, 750, 2500);
  await page.waitForTimeout(2000);

  // Platform stats & Comparative table
  await smoothScroll(page, 1600, 2500);
  await page.waitForTimeout(2500);

  // Supported crops overview
  await smoothScroll(page, 2400, 2500);
  await page.waitForTimeout(2000);

  // Return to top for Language Toggle
  await smoothScroll(page, 0, 2200);
  await page.waitForTimeout(1000);

  // Toggle Language to Bengali
  const langBtn = page.locator("button[title*='Language'], button:has-text('বাংলা'), button:has-text('English')").first();
  if (await langBtn.isVisible()) {
    console.log("  - Toggling language to native Bengali...");
    await smoothClick(page, langBtn);
    await page.waitForTimeout(3000); // Showcase full native Bengali UI
    console.log("  - Toggling language back to English...");
    await smoothClick(page, langBtn);
    await page.waitForTimeout(1500);
  }

  // =========================================================================
  // SCENE 2: REAL LEAF SCANNING (APPLE BLACK ROT) & GUARDRAIL (0:25 - 1:15)
  // =========================================================================
  console.log("📍 [0:25 - 1:15] Scene 2: Real Leaf Scanning with apple black rob.jpg...");
  await page.goto("http://localhost:3000/scan", { waitUntil: "networkidle" });
  await injectCursor(page);
  await page.waitForTimeout(2000);

  // Step 1: Select Apple crop
  console.log("  - Selecting 'Apple' crop button...");
  const appleBtn = page.getByRole("button", { name: /apple|আপেল/i }).first();
  if (await appleBtn.isVisible()) {
    await smoothClick(page, appleBtn);
    await page.waitForTimeout(1500);
  }

  // Step 2: Upload real leaf image (apple black rob.jpg)
  console.log(`  - Uploading real foliar image: ${realImagePath}...`);
  const fileInput = page.locator("input[type='file']");
  await fileInput.setInputFiles(realImagePath);
  await page.waitForTimeout(2500); // Admire loaded leaf image in preview frame

  // Step 3: Run AI Disease Analysis
  console.log("  - Triggering Neural Vision Classification...");
  const analyzeBtn = page.getByRole("button", { name: /run ai disease analysis|রোগ নির্ণয়|analyze/i });
  if (await analyzeBtn.isVisible()) {
    await smoothClick(page, analyzeBtn);
    console.log("  - Watching real-time laser scanning telemetry & multi-stage neural tracker...");
    await page.waitForTimeout(5500); // Observe laser scan beam
  }

  // Step 4: Scroll down to inspect the diagnostic pathology card
  console.log("  - Inspecting Clinical Pathology Dossier (Apple Black Rot)...");
  await smoothScroll(page, 480, 1800);
  await page.waitForTimeout(3000);

  // Step 5: Explore treatment plan tabs
  console.log("  - Switching Treatment Protocols: Immediate Remediation...");
  const immTab = page.getByRole("tab", { name: /immediate|জরুরি/i });
  if (await immTab.isVisible()) {
    await smoothClick(page, immTab);
    await page.waitForTimeout(2000);
  }

  console.log("  - Switching Treatment Protocols: Organic (OMRI)...");
  const organicTab = page.getByRole("tab", { name: /organic|জৈব/i });
  if (await organicTab.isVisible()) {
    await smoothClick(page, organicTab);
    await page.waitForTimeout(2000);
  }

  console.log("  - Switching Treatment Protocols: Chemical Fungicide...");
  const chemicalTab = page.getByRole("tab", { name: /chemical|রাসায়নিক/i });
  if (await chemicalTab.isVisible()) {
    await smoothClick(page, chemicalTab);
    await page.waitForTimeout(2000);
  }

  console.log("  - Switching Treatment Protocols: Prevention...");
  const prevTab = page.getByRole("tab", { name: /prevention|প্রতিরোধ/i });
  if (await prevTab.isVisible()) {
    await smoothClick(page, prevTab);
    await page.waitForTimeout(2000);
  }

  // Step 6: Open Printable PDF Dossier Modal
  console.log("  - Opening PDF Pathology Dossier Modal...");
  const pdfBtn = page.getByRole("button", { name: /download.*pdf|পিডিএফ/i });
  if (await pdfBtn.isVisible()) {
    await smoothClick(page, pdfBtn);
    await page.waitForTimeout(3000);
    const closePdf = page.getByRole("button", { name: /close|বন্ধ/i }).or(page.locator("button[aria-label='Close']")).first();
    if (await closePdf.isVisible()) {
      await smoothClick(page, closePdf);
      await page.waitForTimeout(1500);
    }
  }

  // Step 7: Demonstrate Two-Stage Guardrail Rejection (Safety Protection)
  console.log("  - Demonstrating Two-Stage Anti-Hallucination Guardrail...");
  await smoothScroll(page, 0, 1500);
  const wheatBtn = page.getByRole("button", { name: /wheat|গম/i }).first();
  if (await wheatBtn.isVisible()) {
    await smoothClick(page, wheatBtn);
    await page.waitForTimeout(1000);
  }

  // With Wheat selected but Apple leaf present, run analysis to trigger guardrail
  if (await analyzeBtn.isVisible()) {
    await smoothClick(page, analyzeBtn);
    await page.waitForTimeout(4500);
    await smoothScroll(page, 450, 1500);
    console.log("  - Guardrail Alert Displayed: Mismatch prevented false chemical spraying!");
    await page.waitForTimeout(3500);
  }

  // =========================================================================
  // SCENE 3: CROP DOCTOR AI CHATBOT (1:15 - 1:45)
  // =========================================================================
  console.log("📍 [1:15 - 1:45] Scene 3: Bilingual Crop Doctor AI Chatbot (/chat)...");
  await page.goto("http://localhost:3000/chat", { waitUntil: "networkidle" });
  await injectCursor(page);
  await page.waitForTimeout(2000);

  // Submit agricultural query chip
  const promptChip = page.locator("button:has-text('টমেটো'), button:has-text('ধান'), button:has-text('আলু')").first();
  if (await promptChip.isVisible({ timeout: 3000 })) {
    console.log("  - Submitting regional agricultural inquiry...");
    await smoothClick(page, promptChip);
    await page.waitForTimeout(1000);

    const sendBtn = page.locator("button[type='submit']");
    if (await sendBtn.isVisible()) {
      await smoothClick(page, sendBtn);
      console.log("  - Streaming real-time response with verified active ingredients...");
      await page.waitForTimeout(7000); // Let user read response
    }
  }

  // =========================================================================
  // SCENE 4: PRECISION FERTILIZER & N-P-K CALCULATOR (1:45 - 2:10)
  // =========================================================================
  console.log("📍 [1:45 - 2:10] Scene 4: Precision Fertilizer & N-P-K Dosage Calculator (/calculator)...");
  await page.goto("http://localhost:3000/calculator", { waitUntil: "networkidle" });
  await injectCursor(page);
  await page.waitForTimeout(2000);

  // Configure field area
  const areaInput = page.locator("input[type='number']").first();
  if (await areaInput.isVisible()) {
    console.log("  - Configuring Field Dimensions: 2.5 Acres...");
    await smoothClick(page, areaInput);
    await areaInput.fill("2.5");
    await page.waitForTimeout(1000);
  }

  // Scroll down to examine dosages & 50kg bag distribution
  console.log("  - Inspecting Total Fertilizer Dosages (Urea, DAP, MoP, Gypsum, Zinc)...");
  await smoothScroll(page, 450, 2000);
  await page.waitForTimeout(3500);

  // Scroll down to 3-stage split application timeline
  console.log("  - Inspecting 3-Phase Split Application Schedule (Basal, Vegetative, Flowering)...");
  await smoothScroll(page, 950, 2000);
  await page.waitForTimeout(4000);

  // =========================================================================
  // SCENE 5: PLANT PATHOLOGY ENCYCLOPEDIA (2:10 - 2:30)
  // =========================================================================
  console.log("📍 [2:10 - 2:30] Scene 5: Plant Pathology Encyclopedia (/library)...");
  await page.goto("http://localhost:3000/library", { waitUntil: "networkidle" });
  await injectCursor(page);
  await page.waitForTimeout(2000);

  // Search for Blight
  const searchInput = page.locator("input[placeholder*='Search'], input[placeholder*='খুঁজুন']").first();
  if (await searchInput.isVisible()) {
    console.log("  - Searching for 'Blight' foliar diseases...");
    await smoothClick(page, searchInput);
    await searchInput.fill("Blight");
    await page.waitForTimeout(1500);
  }

  // Browse disease cards
  console.log("  - Browsing pathology cards & biological profiles...");
  await smoothScroll(page, 500, 2000);
  await page.waitForTimeout(3500);

  // =========================================================================
  // SCENE 6: FIELD SCAN HISTORY & STATUS LIFECYCLE (2:30 - 2:45)
  // =========================================================================
  console.log("📍 [2:30 - 2:45] Scene 6: Field Scan History & Status Lifecycle (/history)...");
  await page.goto("http://localhost:3000/history", { waitUntil: "networkidle" });
  await injectCursor(page);
  await page.waitForTimeout(2000);

  console.log("  - Inspecting Historical Diagnostic Logs & Treatment Progression...");
  await smoothScroll(page, 400, 2000);
  await page.waitForTimeout(3000);

  // =========================================================================
  // SCENE 7: AGRONOMIST EXPERT CONSULTATION DESK (2:45 - 3:05)
  // =========================================================================
  console.log("📍 [2:45 - 3:05] Scene 7: Agronomist Expert Consultation Portal (/expert)...");
  await page.goto("http://localhost:3000/login", { waitUntil: "networkidle" });
  await injectCursor(page);
  await page.waitForTimeout(1200);

  const expertDemo = page.getByRole("button", { name: /officer|কৃষিবিদ|expert/i });
  if (await expertDemo.isVisible({ timeout: 3000 })) {
    console.log("  - Authenticating as Certified Agronomist Expert...");
    await smoothClick(page, expertDemo);
    await page.waitForTimeout(1800);
    await page.goto("http://localhost:3000/expert", { waitUntil: "networkidle" });
    await injectCursor(page);
    await page.waitForTimeout(1800);

    console.log("  - Reviewing Case Escalation Queue & Digital Prescription Editor...");
    await smoothScroll(page, 450, 2000);
    await page.waitForTimeout(3500);
  }

  // =========================================================================
  // SCENE 8: ENTERPRISE ADMIN TELEMETRY DASHBOARD (3:05 - 3:25)
  // =========================================================================
  console.log("📍 [3:05 - 3:25] Scene 8: Enterprise Admin Telemetry Dashboard (/admin)...");
  await page.goto("http://localhost:3000/login", { waitUntil: "networkidle" });
  await injectCursor(page);
  await page.waitForTimeout(1200);

  const adminDemo = page.getByRole("button", { name: /admin|অ্যাডমিন/i });
  if (await adminDemo.isVisible({ timeout: 3000 })) {
    console.log("  - Authenticating as System Administrator...");
    await smoothClick(page, adminDemo);
    await page.waitForTimeout(1800);
    await page.goto("http://localhost:3000/admin", { waitUntil: "networkidle" });
    await injectCursor(page);
    await page.waitForTimeout(1800);

    console.log("  - Inspecting Real-Time Epidemiological Telemetry, Charts & Broadcast CMS...");
    await smoothScroll(page, 550, 2200);
    await page.waitForTimeout(4000);
  }

  // =========================================================================
  // SCENE 9: GRAND FINALE (3:25 - 3:35)
  // =========================================================================
  console.log("📍 [3:25 - 3:35] Scene 9: Final Wrap-up & Return to Homepage...");
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await injectCursor(page);
  await page.waitForTimeout(3000);

  // Close context to finish writing video
  console.log("💾 Finalizing and encoding 3-minute screen recording video...");
  await context.close();

  const rawVideoPath = await page.video().path();
  const finalVideoPath = path.join(videoDir, "KrishiDrishti_Full_Platform_Walkthrough.webm");

  if (fs.existsSync(rawVideoPath)) {
    fs.copyFileSync(rawVideoPath, finalVideoPath);
    const stats = fs.statSync(finalVideoPath);
    console.log(`✅ 3-Minute Video saved successfully!`);
    console.log(`   Location: ${finalVideoPath}`);
    console.log(`   File Size: ${(stats.size / (1024 * 1024)).toFixed(2)} MB`);
  }

  await browser.close();
  console.log("🎉 3-Minute KrishiDrishti Walkthrough Video Generation Completed!");
}

record3MinWalkthrough().catch((err) => {
  console.error("❌ Video recording failed:", err);
  process.exit(1);
});

