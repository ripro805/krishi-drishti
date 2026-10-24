/**
 * Automated Test Suite for KrishiDrishti Admin Dashboard and CMS (Feature 4)
 */

const BASE_URL = "http://localhost:3000";

// Helper to create a test JWT token for admin role
function makeTestToken(role = "admin") {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const payload = Buffer.from(JSON.stringify({
    id: "usr-admin-001",
    email: "admin@krishidrishti.gov.bd",
    role,
    name: "Dr. Anisur Rahman",
  })).toString("base64url");
  const signature = "dummy_test_sig";
  return `${header}.${payload}.${signature}`;
}

async function runTests() {
  console.log("=======================================================");
  console.log("      KrishiDrishti Admin Dashboard & CMS Test Suite    ");
  console.log("=======================================================");

  let passed = 0;
  let failed = 0;

  // Case 1: Fetch Real Admin Dashboard Statistics
  try {
    const res = await fetch(`${BASE_URL}/api/admin/stats`);
    if (res.status === 200) {
      const data = await res.json();
      if (
        typeof data.usersCount === "number" &&
        typeof data.scansCount === "number" &&
        typeof data.diseasesCount === "number" &&
        data.feedbackStats
      ) {
        console.log(`[PASS] [Case 1. Real Stats Aggregation]: Users=${data.usersCount}, Scans=${data.scansCount}, LowConfidence=${data.lowConfidenceCount}, Diseases=${data.diseasesCount}, Accuracy=${data.feedbackStats.accuracyRate}%.`);
        passed++;
      } else {
        console.error("[FAIL] [Case 1]: Stats object missing expected metrics:", data);
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

  // Case 2: Public Disease Knowledge Base Catalog Retrieval
  try {
    const res = await fetch(`${BASE_URL}/api/diseases`);
    if (res.status === 200) {
      const data = await res.json();
      if (Array.isArray(data.diseases) && data.diseases.length > 0) {
        console.log(`[PASS] [Case 2. Disease Catalog]: Retrieved ${data.diseases.length} disease records from persistent store.`);
        passed++;
      } else {
        console.error("[FAIL] [Case 2]: Diseases array empty or invalid.");
        failed++;
      }
    } else {
      console.error(`[FAIL] [Case 2]: Expected HTTP 200, got ${res.status}`);
      failed++;
    }
  } catch (e) {
    console.error(`[FAIL] [Case 2]: Error: ${e.message}`);
    failed++;
  }

  // Case 3: RBAC Protection - Unauthenticated User cannot create disease
  try {
    const res = await fetch(`${BASE_URL}/api/diseases`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        crop: "Tomato",
        commonName: "Unauthorized Disease Test",
        banglaName: "অননুমোদিত রোগ",
      }),
    });

    if (res.status === 403) {
      console.log(`[PASS] [Case 3. RBAC Unauthenticated Rejection]: Rejected unauthorized POST with HTTP 403.`);
      passed++;
    } else {
      console.error(`[FAIL] [Case 3]: Expected HTTP 403, got ${res.status}`);
      failed++;
    }
  } catch (e) {
    console.error(`[FAIL] [Case 3]: Error: ${e.message}`);
    failed++;
  }

  // Case 4: Authorized Admin can create a new disease record
  let newDiseaseId = `test-disease-${Date.now().toString(36)}`;
  const adminToken = makeTestToken("admin");

  try {
    const payload = {
      id: newDiseaseId,
      crop: "Rice",
      banglaCrop: "ধান",
      commonName: "Sheath Blight",
      banglaName: "ধানের খোল পোড়া রোগ",
      scientificName: "Rhizoctonia solani",
      pathogenType: "Fungal",
      severity: "Severe",
      confidence: 96.0,
      summary: "Common fungal disease of rice stems and sheaths.",
      banglaSummary: "ধানের গোড়ার খোলে ডিম্বাকার ধূসর বা জলছাপ দাগ তৈরি হয়।",
    };

    const res = await fetch(`${BASE_URL}/api/diseases`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify(payload),
    });

    if (res.status === 201) {
      const data = await res.json();
      if (data.disease && data.disease.id === newDiseaseId) {
        console.log(`[PASS] [Case 4. Admin Create Disease]: Successfully created disease record ${newDiseaseId}.`);
        passed++;
      } else {
        console.error("[FAIL] [Case 4]: Returned invalid disease object:", data);
        failed++;
      }
    } else {
      console.error(`[FAIL] [Case 4]: Expected HTTP 201, got ${res.status}`);
      failed++;
    }
  } catch (e) {
    console.error(`[FAIL] [Case 4]: Error: ${e.message}`);
    failed++;
  }

  // Case 5: Verify newly created disease is visible in public API
  try {
    const res = await fetch(`${BASE_URL}/api/diseases/${newDiseaseId}`);
    if (res.status === 200) {
      const data = await res.json();
      if (data.disease && data.disease.commonName === "Sheath Blight") {
        console.log(`[PASS] [Case 5. Public Visibility]: New disease ${newDiseaseId} is immediately queryable via public API.`);
        passed++;
      } else {
        console.error("[FAIL] [Case 5]: Retrieved disease mismatch:", data);
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

  // Case 6: Admin updates disease record (PUT /api/diseases/:id)
  try {
    const updatePayload = {
      crop: "Rice",
      commonName: "Sheath Blight (Updated)",
      banglaName: "ধানের খোল পোড়া রোগ (হালনাগাদ)",
      severity: "Moderate",
    };

    const res = await fetch(`${BASE_URL}/api/diseases/${newDiseaseId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify(updatePayload),
    });

    if (res.status === 200) {
      const data = await res.json();
      if (data.disease && data.disease.severity === "Moderate") {
        console.log(`[PASS] [Case 6. Update Disease]: Updated disease ${newDiseaseId} severity to 'Moderate'.`);
        passed++;
      } else {
        console.error("[FAIL] [Case 6]: Update failed:", data);
        failed++;
      }
    } else {
      console.error(`[FAIL] [Case 6]: Expected HTTP 200, got ${res.status}`);
      failed++;
    }
  } catch (e) {
    console.error(`[FAIL] [Case 6]: Error: ${e.message}`);
    failed++;
  }

  // Case 7: Admin deletes disease record (DELETE /api/diseases/:id)
  try {
    const res = await fetch(`${BASE_URL}/api/diseases/${newDiseaseId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    });

    if (res.status === 200) {
      const checkRes = await fetch(`${BASE_URL}/api/diseases/${newDiseaseId}`);
      if (checkRes.status === 404) {
        console.log(`[PASS] [Case 7. Delete Disease]: Successfully deleted disease ${newDiseaseId} and confirmed 404.`);
        passed++;
      } else {
        console.error("[FAIL] [Case 7]: Disease still exists after deletion.");
        failed++;
      }
    } else {
      console.error(`[FAIL] [Case 7]: Expected HTTP 200, got ${res.status}`);
      failed++;
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
