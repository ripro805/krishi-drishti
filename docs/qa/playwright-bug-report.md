# KrishiDrishti Playwright Quality Assurance Bug & Defect Report

**Report ID:** QA-DEFECT-KD-2026-001  
**Project:** KrishiDrishti (কৃষি দৃষ্টি)  
**Environment:** Next.js 14 App Router, Chromium 1248 (Desktop & Mobile)  
**Execution Date:** 2026-10-29  
**Prepared By:** Senior QA Automation Engineer & Test Architect  

---

## 1. Classification Methodology

In accordance with Phase 8 & Phase 9 testing standards, issues identified during the implementation and execution of the Playwright end-to-end automation suite are rigorously categorized into three separate classes:

1. **Genuine Application Defects:** True defects in the application source code, UI styling, or accessibility attributes that impact real users.
2. **Security & Architectural Risks:** Underlying architectural vulnerabilities or unhardened security configurations discovered during code audit.
3. **Resolved Test-Code Refinements:** Normal locator adjustments and expectation alignments made in the test automation suite to accurately match the actual production codebase.

---

## 2. Genuine Application Defects

### BUG-001: Mobile Viewport Horizontal Layout Overflow on 375px Viewports

- **Bug ID:** `BUG-001`
- **Feature:** Responsive UI & Mobile Header (`Navbar.tsx` & `/scan` crop selector)
- **Severity:** Medium (Visual / Usability)
- **Priority:** High
- **Preconditions:** User visits the application on a standard 375px mobile viewport (e.g., iPhone SE, standard mobile width).
- **Reproduction Steps:**
  1. Open browser in mobile viewport `375px x 667px`.
  2. Navigate to `http://localhost:3000/scan`.
  3. Inspect `document.documentElement.scrollWidth` vs `window.innerWidth`.
- **Expected Result:**
  `document.documentElement.scrollWidth <= window.innerWidth` (no horizontal scrollbar or off-screen element spill).
- **Actual Result:**
  `document.documentElement.scrollWidth` is **380px**, while `window.innerWidth` is **375px** (5px horizontal overflow).
- **Technical Root Cause:**
  1. In `src/components/common/Navbar.tsx` (line 88–118), the logo container has `flex-shrink-0` with full subtitle text `"এআই ফসল সুরক্ষা ও বাংলা কৃষি সহকারী"`. Combined with `gap-6` and the right-hand action container (`px-4`, mobile language toggle, and hamburger button), the total header width exceeds 375px by 5px.
  2. The mobile hamburger action container (`div.flex.items-center.gap-2.lg:hidden`) spills past the right viewport boundary at `x = 380px`.
- **File Reference:**
  - `src/components/common/Navbar.tsx:88-118`
- **Recommended Remediation:**
  1. In `Navbar.tsx`, truncate or hide the sub-tagline on screens `< 390px` (`hidden sm:block text-xs text-slate-500`).
  2. Add `overflow-x-hidden` or reduce the outer header padding on mobile from `px-4` to `px-3` and header container gap from `gap-6` to `gap-2`.

---

## 3. Security & Architectural Risk Observations

### SEC-001: Hardcoded JWT Secret Key Fallback in Server Auth

- **Risk ID:** `SEC-001`
- **Component:** `src/lib/auth/serverAuth.ts`
- **Severity:** High (Security)
- **Priority:** Critical for Production Deployment
- **Observation:**
  ```typescript
  const JWT_SECRET = process.env.JWT_SECRET || "krishi-drishti-jwt-secret-key-2026-production";
  ```
  If the `JWT_SECRET` environment variable is omitted in deployment, the application falls back to a predictable, publicly known hardcoded secret string. Any actor inspecting the client bundle or repository can forge valid JWT tokens for arbitrary user IDs and elevated roles (`admin`, `expert`).
- **File Reference:**
  - `src/lib/auth/serverAuth.ts:6`
- **Recommended Remediation:**
  Enforce strict server-side startup validation:
  ```typescript
  if (!process.env.JWT_SECRET && process.env.NODE_ENV === "production") {
    throw new Error("FATAL: JWT_SECRET environment variable is mandatory in production.");
  }
  ```

---

## 4. Test-Code Refinements (Resolved During Implementation)

The following items represent initial locator divergences between assumptions and the actual DOM structure, all of which were investigated and resolved with resilient Playwright locators:

| Case ID | Initial Failure Symptom | Source Code Reality | Resolution Implemented | Status |
|:---|:---|:---|:---|:---:|
| **AUTH-003** | Submit button timeout | Bangla UI label is `"লগইন করুন"` (not `"প্রবেশ করুন"`) | Regex updated to `/sign in\|লগইন করুন\|প্রবেশ/i` | **Resolved** |
| **AUTH-004** | Strict mode violation: 2 email inputs found | Layout footer contains newsletter input `<input type="email" placeholder="Enter farmer or agronomist email">` | Scoped via explicit placeholder `getByPlaceholder("farmer@example.com")` | **Resolved** |
| **AUTH-005** | HTML5 validation prevented form submit | `phone` field has `required` attribute in `RegisterPage` | Supplied valid test telephone number `"01711223344"` | **Resolved** |
| **AUTH-005** | Duplicate error message mismatch | API returns `"এই ইমেল দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট তৈরি করা আছে।"` | Regex updated to `/ইতিমধ্যে\|already exists\|অ্যাকাউন্ট তৈরি করা আছে/i` | **Resolved** |
| **RBAC-002** | Tab button text locator failure | Expert portal tab label in Bangla is `"জরুরি কেস ও টেলি-পরামর্শ"` | Tab locator updated to `/escalated\|জরুরি কেস\|টেলি-পরামর্শ/i` | **Resolved** |
| **SCAN-001** | `getByRole("tab")` not found | Diagnostic tabs are implemented as standard `<button type="button">` | Updated locator to `getByRole("button", { name: /organic\|জৈব/i })` | **Resolved** |
| **SCAN-002** | Preset sample bypassed `/api/detect` mock | Sample leaves use local dictionary lookup in `SAMPLE_LEAVES`; only uploaded files trigger `/api/detect` | Refactored test to upload in-memory PNG buffer via `setInputFiles` | **Resolved** |
| **SCAN-005** | Strict mode violation on dialog | Locator `.or(getByText(/dossier/i))` matched both button and dialog | Simplified locator to `page.getByRole("dialog")` | **Resolved** |
| **CHAT-002** | Form submit button not found | Chat console uses `div` container with `textarea` and Enter/click trigger (no `<form>` tag) | Targeted `page.getByRole("button", { name: /send\|পাঠান/i })` directly | **Resolved** |
| **CALC-004** | `#fieldUnit` element not found | Actual element ID in `calculator/page.tsx` is `#areaUnit` | Updated locator to `#areaUnit` | **Resolved** |
| **LIB-004** | Disease card click did not open modal | Disease cards have an explicit action button `"Full Pathology Details"` | Targeted `getByRole("button", { name: /full pathology details/i })` | **Resolved** |
| **LIB-005** | Empty search count failure | Footer also uses `.grid h3` with 3 section headings | Scoped card presence assertion to `getByRole("button", { name: /full pathology details/i })` | **Resolved** |
| **RESP-001** | Hamburger button name mismatch | Accessible name is `"Toggle navigation menu"` | Regex updated to `/toggle navigation menu\|navigation menu/i` | **Resolved** |
