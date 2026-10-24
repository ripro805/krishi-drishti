const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3000";

async function runAuthTests() {
  console.log("=======================================================");
  console.log("     KrishiDrishti Authentication Test Suite           ");
  console.log("=======================================================");

  let passed = 0;
  let failed = 0;

  const testUser = {
    name: "Tariqul Alam",
    email: `tariqul_${Date.now()}@krishidrishti.gov.bd`,
    password: "SecurePassword123!",
    phone: "01812345678",
    role: "farmer",
    district: "রংপুর",
  };

  let token = null;

  // Case 1: Registration
  try {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testUser),
    });
    const data = await res.json();

    if (res.status === 200 && data.token && data.user && !data.user.passwordHash) {
      console.log("✔ PASS [Case 1. User Registration]: Successfully registered and token issued without exposing password hash.");
      token = data.token;
      passed++;
    } else {
      console.error("❌ FAIL [Case 1. User Registration]:", res.status, data);
      failed++;
    }
  } catch (e) {
    console.error("❌ FAIL [Case 1. User Registration] Exception:", e.message);
    failed++;
  }

  // Case 2: Duplicate Registration
  try {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testUser),
    });
    if (res.status === 409) {
      console.log("✔ PASS [Case 2. Duplicate Registration Rejection]: Correctly rejected duplicate email with HTTP 409.");
      passed++;
    } else {
      console.error("❌ FAIL [Case 2. Duplicate Registration Rejection]: Expected 409, got", res.status);
      failed++;
    }
  } catch (e) {
    console.error("❌ FAIL [Case 2. Duplicate Registration] Exception:", e.message);
    failed++;
  }

  // Case 3: Login with Correct Password
  try {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: testUser.email, password: testUser.password }),
    });
    const data = await res.json();
    if (res.status === 200 && data.token && data.user.email === testUser.email.toLowerCase()) {
      console.log("✔ PASS [Case 3. Login with Correct Credentials]: Authenticated with bcrypt match and issued JWT.");
      passed++;
    } else {
      console.error("❌ FAIL [Case 3. Login with Correct Credentials]:", res.status, data);
      failed++;
    }
  } catch (e) {
    console.error("❌ FAIL [Case 3. Login] Exception:", e.message);
    failed++;
  }

  // Case 4: Login with Incorrect Password
  try {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: testUser.email, password: "WrongPassword999" }),
    });
    if (res.status === 401) {
      console.log("✔ PASS [Case 4. Incorrect Password Rejection]: Rejected bad password with HTTP 401.");
      passed++;
    } else {
      console.error("❌ FAIL [Case 4. Incorrect Password Rejection]: Expected 401, got", res.status);
      failed++;
    }
  } catch (e) {
    console.error("❌ FAIL [Case 4. Incorrect Password] Exception:", e.message);
    failed++;
  }

  // Case 5: Verify Authenticated Profile via /api/auth/me
  try {
    const res = await fetch(`${BASE_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (res.status === 200 && data.user?.email === testUser.email.toLowerCase()) {
      console.log("✔ PASS [Case 5. Protected /api/auth/me]: Verified JWT token and returned current user profile.");
      passed++;
    } else {
      console.error("❌ FAIL [Case 5. Protected /api/auth/me]:", res.status, data);
      failed++;
    }
  } catch (e) {
    console.error("❌ FAIL [Case 5. Protected Endpoint] Exception:", e.message);
    failed++;
  }

  // Case 6: Reject Unauthenticated Request to /api/auth/me
  try {
    const res = await fetch(`${BASE_URL}/api/auth/me`);
    if (res.status === 401) {
      console.log("✔ PASS [Case 6. Unauthenticated Protection]: Blocked request without token with HTTP 401.");
      passed++;
    } else {
      console.error("❌ FAIL [Case 6. Unauthenticated Protection]: Expected 401, got", res.status);
      failed++;
    }
  } catch (e) {
    console.error("❌ FAIL [Case 6. Protection] Exception:", e.message);
    failed++;
  }

  // Case 7: Pre-seeded Admin Login
  try {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "admin@krishidrishti.gov.bd", password: "admin123" }),
    });
    const data = await res.json();
    if (res.status === 200 && data.user?.role === "admin") {
      console.log("✔ PASS [Case 7. Pre-seeded Admin Account]: Logged in with hashed password and role='admin'.");
      passed++;
    } else {
      console.error("❌ FAIL [Case 7. Admin Login]:", res.status, data);
      failed++;
    }
  } catch (e) {
    console.error("❌ FAIL [Case 7. Admin Login] Exception:", e.message);
    failed++;
  }

  console.log("=======================================================");
  console.log(`Results: ${passed} PASSED, ${failed} FAILED`);
  console.log("=======================================================");

  process.exit(failed > 0 ? 1 : 0);
}

runAuthTests();
