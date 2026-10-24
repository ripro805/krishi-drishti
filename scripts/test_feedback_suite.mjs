/**
 * Automated Test Suite for KrishiDrishti Centralized Prediction Feedback (Feature 5)
 */

const BASE_URL = "http://localhost:3000";

async function runTests() {
  console.log("=======================================================");
  console.log("     KrishiDrishti Prediction Feedback Test Suite      ");
  console.log("=======================================================");

  let passed = 0;
  let failed = 0;

  // Case 1: Submit Valid Prediction Feedback
  let createdFeedbackId = null;
  const testScanId = `SCAN-TEST-${Date.now().toString(36)}`;

  try {
    const payload = {
      scanId: testScanId,
      crop: "Rice",
      disease: "Bacterial Leaf Blight",
      banglaDisease: "ধানের পাতাপোড়া রোগ",
      confidence: 96.5,
      rating: "accurate",
      comment: "মাঠের লক্ষণের সাথে ১০০% মিলেছে। সময়মতো সনাক্ত করতে পেরে ফসল রক্ষা পেয়েছে।",
      userName: "মোঃ শফিকুল ইসলাম (কৃষক)",
    };

    const res = await fetch(`${BASE_URL}/api/feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.status === 201) {
      const data = await res.json();
      if (data.feedback && data.feedback.id && data.feedback.rating === "accurate") {
        createdFeedbackId = data.feedback.id;
        console.log(`[PASS] [Case 1. Submit Feedback]: Successfully persisted feedback ${createdFeedbackId} for scan ${testScanId}.`);
        passed++;
      } else {
        console.error("[FAIL] [Case 1]: Invalid response structure:", data);
        failed++;
      }
    } else {
      console.error(`[FAIL] [Case 1]: Expected HTTP 201, got ${res.status}`);
      failed++;
    }
  } catch (e) {
    console.error(`[FAIL] [Case 1]: Error: ${e.message}`);
    failed++;
  }

  // Case 2: Validation of Invalid Rating
  try {
    const invalidPayload = {
      scanId: "SCAN-TEST-INVALID",
      crop: "Potato",
      disease: "Late Blight",
      confidence: 90.0,
      rating: "invalid_rating_value",
    };

    const res = await fetch(`${BASE_URL}/api/feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invalidPayload),
    });

    if (res.status === 400) {
      console.log(`[PASS] [Case 2. Validate Rating]: Correctly rejected invalid rating with HTTP 400.`);
      passed++;
    } else {
      console.error(`[FAIL] [Case 2]: Expected HTTP 400, got ${res.status}`);
      failed++;
    }
  } catch (e) {
    console.error(`[FAIL] [Case 2]: Error: ${e.message}`);
    failed++;
  }

  // Case 3: Duplicate Submission / Upsert Handling for Same Scan
  try {
    const updatePayload = {
      scanId: testScanId,
      crop: "Rice",
      disease: "Bacterial Leaf Blight",
      confidence: 96.5,
      rating: "accurate",
      comment: "আপডেট: অনুমোদিত কপার ছত্রাকনাশক স্প্রে করার পর আক্রান্ত পাতা শুকিয়ে গেছে।",
      userName: "মোঃ শফিকুল ইসলাম (কৃষক)",
    };

    const res = await fetch(`${BASE_URL}/api/feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatePayload),
    });

    if (res.status === 201) {
      const data = await res.json();
      if (data.feedback && data.feedback.id === createdFeedbackId) {
        console.log(`[PASS] [Case 3. Feedback Upsert]: Gracefully updated existing feedback ${createdFeedbackId} for scan ${testScanId}.`);
        passed++;
      } else {
        console.error("[FAIL] [Case 3]: Did not upsert with same feedback ID:", data);
        failed++;
      }
    } else {
      console.error(`[FAIL] [Case 3]: Expected HTTP 201, got ${res.status}`);
      failed++;
    }
  } catch (e) {
    console.error(`[FAIL] [Case 3]: Error: ${e.message}`);
    failed++;
  }

  // Case 4: Retrieve Feedback List and Metrics
  try {
    const res = await fetch(`${BASE_URL}/api/feedback`);
    if (res.status === 200) {
      const data = await res.json();
      if (Array.isArray(data.feedbackList) && data.stats && typeof data.stats.accuracyRate === "number") {
        console.log(`[PASS] [Case 4. List Feedback & Stats]: Retrieved ${data.feedbackList.length} records. Accuracy Rate: ${data.stats.accuracyRate}%.`);
        passed++;
      } else {
        console.error("[FAIL] [Case 4]: Missing feedbackList or stats object.");
        failed++;
      }
    } else {
      console.error(`[FAIL] [Case 4]: Expected HTTP 200, got ${res.status}`);
      failed++;
    }
  } catch (e) {
    console.error(`[FAIL] [Case 4]: Error: ${e.message}`);
    failed++;
  }

  // Case 5: Filter Feedback by Rating
  try {
    const res = await fetch(`${BASE_URL}/api/feedback?rating=accurate`);
    if (res.status === 200) {
      const data = await res.json();
      const allAccurate = data.feedbackList.every((f) => f.rating === "accurate");
      if (allAccurate && data.feedbackList.length > 0) {
        console.log(`[PASS] [Case 5. Filter by Rating]: Correctly filtered ${data.feedbackList.length} 'accurate' ratings.`);
        passed++;
      } else {
        console.error("[FAIL] [Case 5]: Returned non-accurate items or empty list.");
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

  // Case 6: Update Review Status (PATCH /api/feedback/:id)
  try {
    if (createdFeedbackId) {
      const res = await fetch(`${BASE_URL}/api/feedback/${createdFeedbackId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "reviewed" }),
      });

      if (res.status === 200) {
        const data = await res.json();
        if (data.feedback && data.feedback.status === "reviewed") {
          console.log(`[PASS] [Case 6. Update Status]: Marked feedback ${createdFeedbackId} as 'reviewed'.`);
          passed++;
        } else {
          console.error("[FAIL] [Case 6]: Status not updated to reviewed:", data);
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

  // Case 7: Reject Invalid Status Update
  try {
    if (createdFeedbackId) {
      const res = await fetch(`${BASE_URL}/api/feedback/${createdFeedbackId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "invalid_status" }),
      });

      if (res.status === 400) {
        console.log(`[PASS] [Case 7. Invalid Status Rejection]: Rejected invalid status with HTTP 400.`);
        passed++;
      } else {
        console.error(`[FAIL] [Case 7]: Expected HTTP 400, got ${res.status}`);
        failed++;
      }
    }
  } catch (e) {
    console.error(`[FAIL] [Case 7]: Error: ${e.message}`);
    failed++;
  }

  console.log("=======================================================");
  console.log(`Results: ${passed} PASSED, ${failed} FAILED`);
  console.log("=======================================================");

  if (failed > 0) process.exit(1);
}

runTests();
