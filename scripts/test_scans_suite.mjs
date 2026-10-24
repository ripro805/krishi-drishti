/**
 * Automated Test Suite for KrishiDrishti Persistent Scan History (Feature 2)
 */

const BASE_URL = "http://localhost:3000";

async function runTests() {
  console.log("=======================================================");
  console.log("       KrishiDrishti Scan History Test Suite           ");
  console.log("=======================================================");

  let passed = 0;
  let failed = 0;

  // Case 1: Fetch Scan History
  try {
    const res = await fetch(`${BASE_URL}/api/scans?limit=10`);
    if (res.status === 200) {
      const data = await res.json();
      if (Array.isArray(data.scans) && data.total !== undefined) {
        console.log(`[PASS] [Case 1. Get History]: Retrieved ${data.scans.length} scans (Total: ${data.total}).`);
        passed++;
      } else {
        console.error("[FAIL] [Case 1]: Response missing scans array or total count.");
        failed++;
      }
    } else {
      console.error(`[FAIL] [Case 1]: Expected HTTP 200, got ${res.status}`);
      failed++;
    }
  } catch (e) {
    console.error(`[FAIL] [Case 1]: Error: ${e.message}`);
    failed++;
  }

  // Case 2: Create a New Persistent Scan Record
  let createdScanId = null;
  try {
    const newScanPayload = {
      crop: "Rice",
      banglaCrop: "ধান",
      disease: "Bacterial Leaf Blight",
      banglaName: "ব্যাকটেরিয়াল পাতা পোড়া রোগ",
      confidence: 96.5,
      severity: "Moderate",
      imageUrl: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400",
      status: "Active",
      isLowConfidence: false,
    };

    const res = await fetch(`${BASE_URL}/api/scans`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newScanPayload),
    });

    if (res.status === 201) {
      const data = await res.json();
      if (data.scan && data.scan.id && data.scan.crop === "Rice") {
        createdScanId = data.scan.id;
        console.log(`[PASS] [Case 2. Create Scan]: Persisted scan ${createdScanId} (${data.scan.scanCode}).`);
        passed++;
      } else {
        console.error("[FAIL] [Case 2]: Created scan format invalid:", data);
        failed++;
      }
    } else {
      console.error(`[FAIL] [Case 2]: Expected HTTP 201, got ${res.status}`);
      failed++;
    }
  } catch (e) {
    console.error(`[FAIL] [Case 2]: Error: ${e.message}`);
    failed++;
  }

  // Case 3: Retrieve Single Scan by ID
  try {
    if (createdScanId) {
      const res = await fetch(`${BASE_URL}/api/scans/${createdScanId}`);
      if (res.status === 200) {
        const data = await res.json();
        if (data.scan && data.scan.id === createdScanId) {
          console.log(`[PASS] [Case 3. Get Scan by ID]: Retrieved diagnosis details for ${createdScanId}.`);
          passed++;
        } else {
          console.error("[FAIL] [Case 3]: Scan ID mismatch.");
          failed++;
        }
      } else {
        console.error(`[FAIL] [Case 3]: Expected HTTP 200, got ${res.status}`);
        failed++;
      }
    } else {
      console.error("[FAIL] [Case 3]: Skipped because creation failed.");
      failed++;
    }
  } catch (e) {
    console.error(`[FAIL] [Case 3]: Error: ${e.message}`);
    failed++;
  }

  // Case 4: Update Scan Status (Active -> Treated)
  try {
    if (createdScanId) {
      const res = await fetch(`${BASE_URL}/api/scans/${createdScanId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Treated" }),
      });

      if (res.status === 200) {
        const data = await res.json();
        if (data.scan && data.scan.status === "Treated") {
          console.log(`[PASS] [Case 4. Update Status]: Status updated to 'Treated'.`);
          passed++;
        } else {
          console.error("[FAIL] [Case 4]: Status not updated:", data);
          failed++;
        }
      } else {
        console.error(`[FAIL] [Case 4]: Expected HTTP 200, got ${res.status}`);
        failed++;
      }
    }
  } catch (e) {
    console.error(`[FAIL] [Case 4]: Error: ${e.message}`);
    failed++;
  }

  // Case 5: Filter Scan History by Crop
  try {
    const res = await fetch(`${BASE_URL}/api/scans?crop=Rice`);
    if (res.status === 200) {
      const data = await res.json();
      const allRice = data.scans.every((s) => s.crop.toLowerCase() === "rice" || s.banglaCrop === "ধান");
      if (allRice && data.scans.length > 0) {
        console.log(`[PASS] [Case 5. Filter by Crop]: Successfully filtered ${data.scans.length} Rice scans.`);
        passed++;
      } else {
        console.error("[FAIL] [Case 5]: Filter returned non-Rice crops or empty list.");
        failed++;
      }
    } else {
      console.error(`[FAIL] [Case 5]: Expected HTTP 200, got ${res.status}`);
      failed++;
    }
  } catch (e) {
    console.error(`[FAIL] [Case 5]: Error: ${e.message}`);
    failed++;
  }

  // Case 6: Delete Scan Record
  try {
    if (createdScanId) {
      const res = await fetch(`${BASE_URL}/api/scans/${createdScanId}`, {
        method: "DELETE",
      });

      if (res.status === 200) {
        // Verify it no longer exists
        const checkRes = await fetch(`${BASE_URL}/api/scans/${createdScanId}`);
        if (checkRes.status === 404) {
          console.log(`[PASS] [Case 6. Delete Scan]: Successfully deleted scan ${createdScanId}.`);
          passed++;
        } else {
          console.error("[FAIL] [Case 6]: Deleted scan still retrievable.");
          failed++;
        }
      } else {
        console.error(`[FAIL] [Case 6]: Expected HTTP 200, got ${res.status}`);
        failed++;
      }
    }
  } catch (e) {
    console.error(`[FAIL] [Case 6]: Error: ${e.message}`);
    failed++;
  }

  console.log("=======================================================");
  console.log(`Results: ${passed} PASSED, ${failed} FAILED`);
  console.log("=======================================================");

  if (failed > 0) process.exit(1);
}

runTests();
