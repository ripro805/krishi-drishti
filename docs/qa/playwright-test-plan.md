# KrishiDrishti Playwright End-to-End Automation Test Plan

**Document ID:** QA-TESTPLAN-KD-2026-001  
**Author:** Senior QA Automation Engineer & Test Architect  
**Project:** KrishiDrishti (কৃষি দৃষ্টি)  
**Target Environment:** Local Next.js 14 Development (`http://localhost:3000`)  
**Playwright Version:** 1.56.x  
**Status:** Approved & Executed  

---

## 1. Executive Summary & Objective

The primary objective of this testing framework is to establish an enterprise-grade, deterministic, and maintainable end-to-end (E2E) browser automation test suite for **KrishiDrishti**. 

The application integrates:
1. **Next.js 14 App Router** (React 18 + TypeScript + Tailwind CSS).
2. **Bilingual UI** (Native Bengali & English with dynamic client context).
3. **JSON File-Backed Local Persistence** (`src/data/*_store.json`).
4. **JWT Authentication & RBAC** (Farmer, Expert, Admin).
5. **Computer Vision Inference** (50-class foliar pathology model via FastAPI/Hugging Face).
6. **Multi-Provider LLM Chatbot** (Groq, Gemini, OpenAI fallback chain).

This test suite executes **genuine browser automation**, verifying actual user workflows, DOM updates, accessible state changes, and clinical safety guardrails without reliance on manual verification.

---

## 2. Test Architecture & Directory Structure

The test directory is organized into domain-specific modules adhering to Playwright best practices:

```
tests/e2e/
├── smoke/
│   └── smoke.spec.ts             # Application boot & 9 critical route rendering checks
├── auth/
│   └── auth.spec.ts              # 1-click demo login, form validation, register, logout, persistence
├── access-control/
│   └── access-control.spec.ts    # RBAC barriers (Farmer, Expert, Admin) & unauthenticated guards
├── scanner/
│   └── scanner.spec.ts           # Sample leaf selection, file upload, mismatch guard, PDF modal, feedback
├── chatbot/
│   └── chatbot.spec.ts           # Assistant greeting, message send/render, empty validation, query params
├── calculator/
│   └── calculator.spec.ts        # Fertilizer dosage calculation, area rescaling, crop switch, unit switch
├── library/
│   └── library.spec.ts           # Keyword search, crop chip filters, pathogen type filter, modal, empty grid
├── history/
│   └── history.spec.ts           # Saved scans display, crop filters, status toggles, empty log prompts
├── expert/
│   └── expert.spec.ts            # Expert header, tele-agronomy tabs, advisory & prescription modal
├── admin/
│   └── admin.spec.ts             # Admin dashboard KPI cards, sub-route navigation (users, diseases)
├── responsive/
│   └── responsive.spec.ts        # Language toggle, mobile navigation drawer, 375px mobile scanner
├── fixtures/
│   └── mock-data.ts              # Deterministic API payloads (Tomato early blight, crop mismatch, chat)
└── helpers/
    └── auth.helper.ts            # Reusable session utilities (loginWithDemoRole, clearAuthSession)
```

Generated reports, traces, and execution summaries are isolated in dedicated directories:
```
artifacts/playwright/
├── html-report/                  # Standalone self-contained HTML test report (index.html)
└── test-results/                 # JSON summary (summary.json), screenshots, and trace zips
```

---

## 3. Configuration & Execution Strategy

### 3.1 Serial Execution (`workers: 1`)
- **Rationale:** The application uses file-based JSON persistence (`src/data/users_store.json`, `src/data/scans_store.json`, `src/data/feedback_store.json`). Parallel write access from multiple browser workers can cause file lock contention, JSON corruption, or race conditions.
- **Enforcement:** `fullyParallel: false` and `workers: 1` are explicitly enforced in `playwright.config.ts`.

### 3.2 Timeouts & Navigation Resilience
- **Action Timeout:** 12,000 ms.
- **Assertion Timeout:** 7,000 ms.
- **Navigation Timeout:** 30,000 ms.
- **Rationale:** In Next.js dev mode, on-demand route compilation (`/expert`, `/admin`, etc.) on cold initial request can require 10–20 seconds. Setting `navigationTimeout: 30000` prevents false-positive timeout failures during cold compilation.

### 3.3 Media Stream Emulation Flags
- `launchOptions.args`:
  - `--use-fake-ui-for-media-stream`
  - `--use-fake-device-for-media-stream`
- **Rationale:** Permits testing the `CameraModal` foliar capture interface in headless browser environments without requiring physical hardware camera access.

---

## 4. Mocking Strategy for External AI Services

To ensure zero flaky tests, avoid consumption of paid API credits, and achieve deterministic execution:
1. **/api/detect (Foliar Computer Vision Inference):**
   - Intercepted in `scanner.spec.ts` using `page.route("**/api/detect", ...)`.
   - Exercises 3 key clinical diagnostic outcomes:
     - `MOCK_DETECT_SUCCESS_TOMATO`: Valid detection (99.25% confidence Early Blight).
     - `MOCK_DETECT_UNKNOWN_CROP`: Inconclusive auto-mode rejection (withholding treatment).
     - `MOCK_DETECT_CROP_MISMATCH`: Selected vs detected botanical identity conflict warning.
2. **/api/chat (Multi-Provider LLM Assistant):**
   - Intercepted in `chatbot.spec.ts` using `page.route("**/api/chat", ...)`.
   - Delivers deterministic, formatted agronomic advisory response without external network calls.
3. **Core Local APIs (Authentication, Local Persistence, CMS):**
   - Executed against the real local Next.js API route handlers to ensure authentic verification of sessions, cookies, JWT decoding, and file storage.

---

## 5. Test Suite Inventory & Coverage Matrix

| Suite Code | Module Name | Target URL | Test Cases | Automation Scope |
|:---|:---|:---|:---:|:---|
| **SMK** | Smoke Tests | Multi-route | 9 | Application startup, page rendering, key visual anchors |
| **AUTH** | Authentication | `/login`, `/register` | 7 | 1-click demo login, form validation, registration, logout, reload persistence |
| **RBAC** | Access Control | `/admin`, `/expert` | 4 | Role barrier enforcement, demo switch buttons, unauthenticated guards |
| **SCAN** | AI Leaf Scanner | `/scan` | 6 | Sample leaf preset, image file upload, mismatch warning, save scan, PDF dossier, feedback |
| **CHAT** | Agriculture Chatbot | `/chat` | 4 | Console initialization, send/receive message, empty query prevention, query parameters |
| **CALC** | Fertilizer Calculator | `/calculator` | 4 | Default dosages, field area scaling, crop switch, area unit conversion |
| **LIB** | Disease Encyclopedia | `/library` | 5 | Keyword search, crop chip filtering, pathogen type filtering, dossier modal, empty state |
| **HIST** | Scan History | `/history` | 4 | Log display, crop filter, treatment status toggling, empty state guidance |
| **EXP** | Expert Portal | `/expert` | 3 | Portal layout, KPI summary, tab switching, consultation advisory form |
| **ADM** | Admin Control Panel | `/admin` | 2 | KPI dashboard cards, navigation to `/admin/users` and `/admin/diseases` |
| **RESP** | Responsive & I18N | `/`, `/scan` | 6 (2 projects) | Dynamic English/Bangla switching, mobile hamburger navigation, 375px mobile scanner usability |
| **TOTAL** | | | **54 Runs** | **Comprehensive Full-Stack Coverage** |

---

## 6. Execution Commands & Reporting

### Complete Suite Execution
```bash
npx playwright test
```

### Run by Specific Category
```bash
npx playwright test tests/e2e/smoke/
npx playwright test tests/e2e/auth/
npx playwright test tests/e2e/scanner/
npx playwright test tests/e2e/chatbot/
npx playwright test tests/e2e/calculator/
npx playwright test tests/e2e/library/
npx playwright test tests/e2e/history/
npx playwright test tests/e2e/expert/
npx playwright test tests/e2e/admin/
npx playwright test tests/e2e/responsive/
```

### View Interactive HTML Report
```bash
npx playwright show-report artifacts/playwright/html-report
```

### Run in Interactive UI Mode
```bash
npx playwright test --ui
```
