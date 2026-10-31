<div align="center">

# 🌾 KrishiDrishti (কৃষি দৃষ্টি)
### *Autonomous AI Phytopathology & Precision Agronomy Ecosystem*

[![Next.js](https://img.shields.io/badge/Next.js_14-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PyTorch](https://img.shields.io/badge/PyTorch_2.0-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white)](https://pytorch.org/)
[![HuggingFace](https://img.shields.io/badge/Model-ripro805%2Fkrishidrishti--plant--disease-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black)](https://huggingface.co/ripro805/krishidrishti-plant-disease)
[![Express.js](https://img.shields.io/badge/Express.js_4-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma ORM](https://img.shields.io/badge/Prisma_ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Playwright](https://img.shields.io/badge/Playwright_E2E-54_Tests_Passing-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](./LICENSE)
[![Live Web Application](https://img.shields.io/badge/Live_App-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://krishi-drishti-iota.vercel.app/)
[![API Gateway](https://img.shields.io/badge/Live_API-Render-46E3B7?style=for-the-badge&logo=render&logoColor=black)](https://krishi-drishti-backend-ewjt.onrender.com)
[![Database](https://img.shields.io/badge/Database-Neon_Postgres-00E599?style=for-the-badge&logo=postgresql&logoColor=white)](https://neon.tech/)

<br />

> **"Transforming smartphone cameras into laboratory-grade plant clinics for 160M+ smallholder farmers across South Asia."**  
> *KrishiDrishti integrates 50-class ConvNeXt-Tiny deep learning vision, dual-layer anti-hallucination guardrails, BARI-calibrated N-P-K fertilizer split calculations, and bilingual (English/বাংলা) AI agronomist advisory into a unified, high-performance agricultural operating system.*

<br />

[🚀 Live Web App](https://krishi-drishti-iota.vercel.app/) • [⚙️ API Gateway](https://krishi-drishti-backend-ewjt.onrender.com) • [Explore Live Scanner](#-neural-crop-scanner-studio) • [Dual-Layer Guardrail](#-dual-layer-anti-hallucination-vision-guardrail) • [Fertilizer Engine](#-precision-n-p-k--micronutrient-calculator) • [System Architecture](#-system-architecture) • [API Reference](#-rest-api-specification) • [E2E Testing](#-automated-e2e-testing--quality-assurance) • [Quickstart](#-installation--local-development)

<br />

---

</div>

<br />

## 🌟 Executive Summary & Impact

Foliar plant diseases and unscientific fertilizer over-application cause **20% to 35% of annual crop yield losses** across South Asia, while contributing to acute nitrogen volatilization and groundwater nitrate contamination. Smallholder farmers often lack prompt access to certified plant pathologists, leading to misdiagnoses, delayed interventions, and devastating harvest losses.

**KrishiDrishti** closes this critical diagnostic gap by delivering:
- 🔬 **Laboratory-Grade Neural Diagnostics**: Identifies **50 foliar disease classes** across **16 economically vital crop species** with **99.2% validation accuracy** and **<120ms** inference latency.
- 🛡️ **Zero-Hallucination Vision Guardrails**: Two-stage optical sanity checks (Laplacian variance, luminance, entropy) and cross-crop taxonomy filters that instantly reject non-leaves (pets, faces, cars, coffee mugs) and prevent incorrect chemical recommendations.
- 🧪 **Clinical N-P-K & Micronutrient Calculations**: Precision fertilizer dosage calculations calibrated to **Bangladesh Agricultural Research Council (BARC) & BARI standards**, generating 3-stage split schedules (Basal, Vegetative, Flowering) and 50kg bag distribution plans.
- 🤖 **Bilingual AI Agronomist (Crop Doctor)**: Context-aware conversational agent powered by Gemini 1.5 and Groq LLMs with local agro-climatic knowledge retrieval in native **English and বাংলা (Bangla)**.
- 📑 **Comprehensive Agronomic Dossier**: One-click printable PDF pathology reports detailing pathogen vectors, tissue necrosis %, SPAD chlorophyll index, OMRI-certified organic treatments, and Pre-Harvest Intervals (PHI).
- 📊 **Epidemiological Telemetry & Heatmap**: Centralized disease surveillance dashboards for regional agricultural extension officers and agronomists.

<br />

---

## 🌐 Live Production Deployments & Demo Access

KrishiDrishti is fully deployed in high-availability cloud environments:

| Service Component | Deployment Target | Live Production URL / Status | Description |
| :--- | :--- | :--- | :--- |
| **Frontend Web App** | **Vercel** | [https://krishi-drishti-iota.vercel.app](https://krishi-drishti-iota.vercel.app) | Next.js 14 App Router, glassmorphic UI, responsive camera/drag-and-drop scanner, and bilingual assistant |
| **API Gateway Backend** | **Render** | [https://krishi-drishti-backend-ewjt.onrender.com](https://krishi-drishti-backend-ewjt.onrender.com) | Express.js 4 REST API, JWT auth, Neon PostgreSQL connection pool, health check |
| **API Health Status** | **Render Monitoring** | [`/health` endpoint](https://krishi-drishti-backend-ewjt.onrender.com/health) | Returns HTTP 200 `{"status":"UP","environment":"production"}` |
| **Cloud Database** | **Neon Tech** | Managed Serverless PostgreSQL | Pooled connection with 52 indexed diseases, users, and scan history telemetry |
| **Neural Vision Model** | **Hugging Face** | [`ripro805/krishidrishti-plant-disease`](https://huggingface.co/ripro805/krishidrishti-plant-disease) | Fine-tuned 50-class ConvNeXt-Tiny botanical pathology model weights |

<br />

### 🔑 Instant 1-Click Evaluation Accounts

Use the 1-click demo buttons on [https://krishi-drishti-iota.vercel.app/login](https://krishi-drishti-iota.vercel.app/login) or enter credentials directly:

| Role | Email Address | Password | Accessible Capabilities |
| :--- | :--- | :--- | :--- |
| 🌾 **Farmer (কৃষক)** | `farmer@krishi.gov.bd` | `krishi123` | Leaf scanner, Bangla audio voice guidance, fertilizer split dosage engine, diagnosis history |
| 🩺 **Agriculture Extension Officer (কৃষিবিদ)** | `expert@krishi.gov.bd` | `krishi123` | Escalated pathology triage, prescription management, farmer consultation notes |
| 🛡️ **System Administrator (অ্যাডমিন)** | `admin@krishi.gov.bd` | `admin123` | Epidemiological outbreak surveillance heatmap, regional disease telemetry, user & model logs |

<br />

---

## ⚡ Platform Performance Metrics

| Metric | Benchmark Specification | Real-World Impact |
| :--- | :--- | :--- |
| **Model Architecture** | `facebook/convnext-tiny` (Fine-tuned as `ripro805/krishidrishti-plant-disease`) | 28M parameters, $7\times 7$ depthwise convolutions for microscopic lesion edge extraction |
| **Diagnostic Accuracy** | **99.2%** Top-1 Categorical Accuracy | Rigorously validated across 87,000+ curated botanical foliar images |
| **Inference Latency** | **<120ms** on CPU / **<18ms** on NVIDIA CUDA GPU | Instantaneous diagnostic turnaround even in low-bandwidth rural conditions |
| **Supported Pathologies** | **50 Classes** across **16 Crops** | Rice, Wheat, Potato, Tomato, Corn/Maize, Bell Pepper, Apple, Grape, Citrus, etc. |
| **Guardrail Rejection** | **100% Rejection** of Non-Plant & Blurred Inputs | Eliminates model hallucinations on random objects, pets, human skin, and dark frames |
| **Automated Test Suite** | **54 End-to-End Tests** (11 Suites in Playwright) | 100% pass rate across authentication, scanner guardrails, calculator, chatbot, and admin |

<br />

---

## 🖼️ Interactive UI Gallery

<div align="center">

### 1. High-Performance Landing Experience & Agronomic Suite
*Modern glassmorphic interface, bilingual toggle, direct leaf scanner preview, and live disease statistics.*

![Landing Page](./docs/presentation/images/01_landing.png)

<br />

### 2. Neural Crop Scanner Studio & Dual-Layer Guardrail
*Real-time optical viewfinder with laser scanning telemetry, 1-click test specimens, and active anti-hallucination defense.*

| Anti-Hallucination Guardrail in Action | Clinical Diagnostic Pathology Dossier |
| :---: | :---: |
| ![Scanner Guardrail](./docs/presentation/images/02_scanner_guard.png) | ![Diagnostic Result](./docs/presentation/images/03_scanner_result.png) |
| *Rejects non-plant images and blurred frames instantly* | *Pathogen vector, SPAD index, necrosis %, & treatment plan* |

<br />

### 3. Precision Fertilizer Calculator & Bilingual AI Agronomist
*BARC-formulated N-P-K nutrient split schedules and multi-turn conversational crop consulting.*

| Precision Fertilizer Dosage Engine | Bilingual AI Crop Doctor Chatbot |
| :---: | :---: |
| ![Fertilizer Calculator](./docs/presentation/images/05_calculator.png) | ![AI Agronomist Chatbot](./docs/presentation/images/04_chatbot.png) |
| *50kg bag distribution, land unit conversion, & split schedule* | *Instant organic & chemical prescriptions in English & বাংলা* |

<br />

### 4. Enterprise Outbreak Surveillance & Knowledge Library
*Regional epidemiological telemetry, pathogen encyclopedia, and field scan logs.*

| Epidemiological Outbreak Analytics | Comprehensive Disease Encyclopedia |
| :---: | :---: |
| ![Admin Analytics](./docs/presentation/images/07_admin.png) | ![Disease Library](./docs/presentation/images/06_library.png) |
| *Real-time outbreak heatmaps and farmer scan telemetry* | *Detailed microscopic symptoms, causes, and biology* |

</div>

<br />

---

## 🔬 Core Architectural Modules

### 🌿 1. Neural Crop Scanner Studio
- **Input Channels**: Drag-and-drop file upload, live webcam/mobile camera viewfinder, or 1-click preloaded test specimens (Tomato Early Blight, Potato Late Blight, Corn Common Rust, Pepper Bacterial Spot, Healthy Leaf Control).
- **Computer Vision Pipeline**:
  - Live animated laser beam scanning simulation.
  - Multi-stage diagnostic progression: Image Validation $\rightarrow$ Feature Extraction $\rightarrow$ Taxonomy Alignment $\rightarrow$ Severity Assessment.
- **Biometric Pathology Metrics**:
  - **Scientific Pathogen Name** (e.g., *Alternaria solani*, *Phytophthora infestans*).
  - **Lesion Density & Count** with tissue necrosis percentage ($0\% - 100\%$).
  - **SPAD Chlorophyll Relative Index** estimating foliar chlorosis.
  - **Airborne Spore Transmission Risk** (Low, Moderate, Severe).
- **Dual Treatment Protocols**:
  - **Organic Remediation (OMRI-Listed)**: Neem seed kernel extract, *Trichoderma viride*, copper octanoate, baking soda sprays.
  - **Chemical Interventions**: Mancozeb 75% WP, Metalaxyl-M, Azoxystrobin, Chlorothalonil with strict Pre-Harvest Intervals (PHI) and dilution ratios.
- **Agronomic Pathology Dossier (PDF)**:
  - Generates a clinical, high-resolution printable report formatted for field workers and agricultural insurance claims.

<br />

### 🛡️ 2. Dual-Layer Anti-Hallucination Vision Guardrail
Standard vision classifiers suffer from severe out-of-distribution hallucinations—falsely labeling human hands, pets, furniture, or coffee cups as crop diseases. KrishiDrishti implements a robust **two-stage guardrail**:

```mermaid
flowchart TD
    A["Raw Input Image (Camera / File)"] --> B["Stage 1: Optical Sanity Check"]
    
    subgraph S1 ["Stage 1: Image Quality Assurance"]
        B --> B1["Laplacian Variance: Var(ΔI) ≥ 14.0"]
        B --> B2["Mean Brightness: 12.0 ≤ μ ≤ 248.0"]
        B --> B3["Channel Variance & Spatial Deviation"]
        B --> B4["Shannon Entropy Noise Filter"]
    end
    
    B1 & B2 & B3 & B4 -->|Fails Threshold| REJ1["❌ REJECT: Blurry / Dark / Pure Noise Image"]
    B1 & B2 & B3 & B4 -->|Passes| C["Stage 2: Neural Classification & Taxonomy Gate"]
    
    subgraph S2 ["Stage 2: Taxonomy & Anti-Hallucination Gating"]
        C --> D["ConvNeXt-Tiny Feature Extraction (50 Classes)"]
        D --> E["Cross-Crop Softmax Probability Aggregation"]
        E --> F{"Is Dominant Class a Plant Leaf?"}
        F -->|No / Low Confidence < 0.25| REJ2["❌ REJECT: Non-Plant Specimen Detected"]
        F -->|Yes| G{"User Selected Crop Matches Vision?"}
        G -->|Mismatch > 0.22| WARN["⚠️ Crop Mismatch Advisory: Selected X, Visuals show Y"]
        G -->|Aligned| H["✅ Verified Clinical Pathology Result"]
    end
```

1. **Stage 1: Optical Sanity & Blur Gate**:
   - Laplacian kernel convolution evaluates edge sharpness ($\sigma^2_{\text{Laplacian}} \ge 14.0$).
   - Luminance thresholding rejects pitch-black or completely overexposed frames ($12.0 \le \mu_{\text{RGB}} \le 248.0$).
   - Spatial standard deviation and Shannon entropy weed out synthetic artifacts and solid color images.
2. **Stage 2: Multi-Crop Probability Mass & Mismatch Gate**:
   - Softmax probabilities are dynamically clustered across the 16 registered crop families.
   - If the visual features indicate an alternative crop than the user-selected hint with margin $\Delta > 0.12$, the system alerts the grower, preventing cross-crop chemical mismanagement.
   - Rejects non-plant imagery with clear diagnostic explanations in both English and Bangla.

<br />

### 🧪 3. Precision N-P-K & Micronutrient Calculator
Calculates scientific nutrient dosages calibrated to regional soil fertility conditions and the official **Bangladesh Agricultural Research Council (BARC) Fertilizer Recommendation Guide**:

$$\text{Requirement}_{\text{Nutrient}} = \text{BaseRate}_{\text{Crop}} \times \text{Factor}_{\text{Soil}} \times \text{Area}_{\text{Hectare}}$$

$$\text{DAP}_{\text{kg}} = \frac{\text{Req}_P}{0.46}, \quad \text{Urea}_{\text{kg}} = \frac{\max(0, \text{Req}_N - (\text{DAP}_{\text{kg}} \times 0.18))}{0.46}, \quad \text{MoP}_{\text{kg}} = \frac{\text{Req}_K}{0.60}$$

- **Supported Land Units**: Acres, Hectares, Bigha (7.47 Bigha = 1 Ha), and Decimals (247.1 Decimals = 1 Ha).
- **Soil Fertility Calibration**: Low (+25% dosage compensation), Medium (standard), High (-25% dosage reduction).
- **3-Phase Split Application Schedule**:
  1. **Basal Phase (Final Land Preparation)**: 100% DAP, 50% MoP, 33% Urea, 100% Gypsum, and Zinc Sulphate to promote vigorous root system establishment.
  2. **Vegetative Growth Phase (1st Top-Dress, 20–25 DAT)**: 33% Urea side-dressed during adequate soil moisture.
  3. **Flowering & Fruit Setting Phase (2nd Top-Dress, 45–50 DAT)**: 34% Urea and remaining 50% MoP for fruit sizing and sugar translocation.
- **Commercial 50kg Bag Conversion**: Eliminates guesswork by computing exact commercial bag counts (e.g. 2.4 bags Urea, 2.1 bags DAP).

<br />

### 🤖 4. Bilingual AI Agronomist Chatbot (Crop Doctor)
- **Multi-Turn Agricultural Dialogue**: Natural language query resolution covering pest outbreaks, spray schedules, crop rotations, and soil pH amendments.
- **Orchestration & Fallback Engine**:
  - Primary Provider: Google Gemini 1.5 Flash (Generative Language API) / Groq LPUs (`qwen-2.5-32b`, `llama-3.3-70b`).
  - Automatic fallback mechanism: Seamlessly degrades to secondary provider upon rate limit triggers without interrupting farmer conversations.
- **Native Bilingual Intelligence**: Real-time response generation in native **English**, **বাংলা (Bangla)**, or **Banglish**.
- **Clinical Toxicity Guardrails**: Built-in system instructions reject lethal non-agricultural chemical queries and recommend non-toxic, pollinator-safe biological alternatives.

<br />

### 📊 5. Outbreak Analytics & Field History
- **Scan Progression Lifecycle**: Scans transition through `Active` $\rightarrow$ `Treated` $\rightarrow$ `Monitoring` states to measure treatment efficacy over time.
- **Epidemiological Telemetry**: Regional incidence aggregation, disease recurrence rates, and feedback rating metrics (`accurate`, `inaccurate`, `unsure`) fed back into continuous model refinement.
- **Admin Emergency Broadcast System**: Agricultural officers can publish geofenced pest alerts and seasonal advisories directly to farmer dashboards.

<br />

---

## 🏗️ System Architecture

KrishiDrishti is designed as a **high-throughput, decoupled 3-tier distributed system**:

```mermaid
graph TB
    subgraph ClientLayer ["Client & Edge Experience (Next.js 14)"]
        UI["Web App (App Router / SSR & CSR)"]
        ScannerView["Leaf Scanner Studio (Camera & Dropzone)"]
        CalcView["Precision Fertilizer Engine"]
        DoctorView["AI Agronomist Chatbot"]
        AdminView["Epidemiological Dashboard"]
        PWA["Offline Caching & Service Worker"]
    end

    subgraph APIGateway ["API Gateway & Core Backend (Node.js & Express)"]
        Router["Express Modular Router (/api/v1)"]
        AuthMid["JWT Auth Middleware & RBAC (Farmer, Expert, Admin)"]
        ZodVal["Zod Schema Validation Middleware"]
        Winston["Winston Logger & Audit Telemetry"]
        
        ModAuth["Auth Module"]
        ModScans["Scans & History Module"]
        ModCalc["Fertilizer Calculator Module"]
        ModChat["Chatbot & Knowledge Module"]
        ModNotice["Notices & Advisories Module"]
        ModDisease["Pathology Encyclopedia Module"]
    end

    subgraph DataLayer ["Data & Persistence Layer"]
        Postgres[("PostgreSQL Database")]
        PrismaORM["Prisma ORM Client"]
        LocalCache[("Client LocalStorage Persistence")]
    end

    subgraph AIEngine ["AI & Deep Learning Services"]
        FastAPIServer["FastAPI Model Microservice (:5005)"]
        ConvNeXt["ConvNeXt-Tiny Neural Classifier (ripro805)"]
        GuardModule["Two-Stage Anti-Hallucination & Blur Filter"]
        GeminiGroq["Google Gemini 1.5 / Groq LLM Orchestrator"]
    end

    UI --> Router
    ScannerView --> Router
    CalcView --> Router
    DoctorView --> Router
    AdminView --> Router

    Router --> AuthMid --> ZodVal
    ZodVal --> ModAuth & ModScans & ModCalc & ModChat & ModNotice & ModDisease

    ModScans & ModAuth & ModCalc & ModNotice & ModDisease --> PrismaORM --> Postgres
    ModScans -->|Multipart / Base64| FastAPIServer
    FastAPIServer --> GuardModule --> ConvNeXt
    ModChat --> GeminiGroq
```

<br />

---

## 🌾 Supported Crops & Pathogens Matrix

The platform provides verified diagnostic coverage for **16 Crops and 50 Discrete Classes**:

| Crop Family | Species | Supported Disease & Health Profiles |
| :--- | :--- | :--- |
| **Solanaceae** | **Tomato** (*Solanum lycopersicum*) | Early Blight, Late Blight, Leaf Mold, Septoria Leaf Spot, Spider Mites (Two-spotted spider mite), Target Spot, Yellow Leaf Curl Virus, Mosaic Virus, Bacterial Spot, Healthy |
| **Solanaceae** | **Potato** (*Solanum tuberosum*) | Early Blight (*Alternaria solani*), Late Blight (*Phytophthora infestans*), Healthy |
| **Solanaceae** | **Bell Pepper** (*Capsicum annuum*) | Bacterial Spot (*Xanthomonas campestris*), Healthy |
| **Poaceae (Cereals)** | **Rice** (*Oryza sativa*) | Brown Spot (*Bipolaris oryzae*), Leaf Blast (*Magnaporthe oryzae*), Neck Blast, Healthy |
| **Poaceae (Cereals)** | **Corn / Maize** (*Zea mays*) | Cercospora Leaf Spot (Gray Leaf Spot), Common Rust (*Puccinia sorghi*), Northern Leaf Blight, Healthy |
| **Poaceae (Cereals)** | **Wheat** (*Triticum aestivum*) | Stripe Rust (Yellow Rust), Leaf Rust (Brown Rust), Septoria Tritici Blotch, Healthy |
| **Rosaceae (Fruits)** | **Apple** (*Malus domestica*) | Apple Scab (*Venturia inaequalis*), Black Rot (*Botryosphaeria obtusa*), Cedar Apple Rust, Healthy |
| **Rosaceae (Fruits)** | **Peach** (*Prunus persica*) | Bacterial Spot (*Xanthomonas arboricola*), Healthy |
| **Rosaceae (Fruits)** | **Cherry** (*Prunus avium*) | Powdery Mildew (*Podosphaera clandestina*), Healthy |
| **Rosaceae (Berries)** | **Strawberry** (*Fragaria ananassa*) | Leaf Scorch (*Diplocarpon earlianum*), Healthy |
| **Vitaceae** | **Grape** (*Vitis vinifera*) | Black Rot (*Guignardia bidwellii*), Esca (Black Measles), Leaf Blight (Isariopsis Clavispora), Healthy |
| **Rutaceae** | **Orange / Citrus** (*Citrus sinensis*) | Huanglongbing (Citrus Greening), Citrus Canker, Healthy |
| **Cucurbitaceae** | **Squash / Pumpkin** (*Cucurbita*) | Powdery Mildew (*Erysiphe cichoracearum*) |
| **Fabaceae** | **Soybean** (*Glycine max*) | Foliar Blight, Rust, Healthy |
| **Ericaceae** | **Blueberry** (*Vaccinium*) | Healthy Specimen Control |
| **Rosaceae (Berries)** | **Raspberry** (*Rubus idaeus*) | Healthy Specimen Control |

<br />

---

## 🔌 REST API Specification

### 1. Precision Fertilizer Calculator
* **Endpoint:** `POST /api/v1/calculator/fertilizer`
* **Access:** Public / Optional JWT (`Bearer <token>`)

#### Request Payload:
```json
{
  "crop": "Tomato",
  "fieldArea": 1.5,
  "areaUnit": "Acres",
  "soilNitrogen": "Medium",
  "soilPhosphorus": "Medium",
  "soilPotassium": "Medium"
}
```

#### Response (`200 OK`):
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Fertilizer dosage and split schedule computed successfully",
  "data": {
    "crop": "Tomato",
    "fieldArea": 1.5,
    "areaUnit": "Acres",
    "totalUreaKg": 117.0,
    "totalDapKg": 105.6,
    "totalMopKg": 101.2,
    "totalGypsumKg": 15.2,
    "totalZincSulphateKg": 4.9,
    "bagsUrea50kg": 3,
    "bagsDap50kg": 3,
    "bagsMop50kg": 3,
    "splitSchedule": [
      {
        "stage": "Basal Application (Land Preparation)",
        "daysAfterSowing": "At final land ploughing / transplanting",
        "ureaKg": 39,
        "dapKg": 106,
        "mopKg": 51,
        "notes": "Mix thoroughly into the top 4-6 inches of soil. Ensures initial root development."
      },
      {
        "stage": "Vegetative Growth (First Top-Dress)",
        "daysAfterSowing": "20-25 days after transplanting (DAT)",
        "ureaKg": 39,
        "dapKg": 0,
        "mopKg": 0,
        "notes": "Apply during morning soil moisture. Side-dress 2 inches away from plant stems."
      },
      {
        "stage": "Flowering & Fruit Setting (Second Top-Dress)",
        "daysAfterSowing": "45-50 days after transplanting (DAT)",
        "ureaKg": 40,
        "dapKg": 0,
        "mopKg": 51,
        "notes": "Crucial for fruit sizing and sugar translocation. Irrigate immediately after spreading."
      }
    ],
    "guidelines": [
      "Never apply fertilizer on dry soil. Ensure adequate soil moisture before top-dressing.",
      "Split application of Urea prevents nitrogen volatilization and groundwater nitrate leaching.",
      "Combine chemical applications with 5-10 tons/ha well-decomposed organic manure or vermicompost."
    ]
  }
}
```

<br />

### 2. Comprehensive Endpoint Index

| Method | Endpoint | Access | Description |
| :--- | :--- | :---: | :--- |
| `POST` | `/api/v1/auth/register` | Public | Register new farmer / agronomist profile |
| `POST` | `/api/v1/auth/login` | Public | Authenticate user & issue signed JWT cookie |
| `GET` | `/api/v1/auth/me` | Protected | Fetch authenticated profile details |
| `POST` | `/api/v1/scans` | Protected | Persist diagnostic scan telemetry & severity |
| `GET` | `/api/v1/scans` | Protected | Query historical scan ledger with filters |
| `PATCH`| `/api/v1/scans/:id/status` | Protected | Transition scan status (`Active` $\rightarrow$ `Treated`) |
| `POST` | `/api/v1/calculator/fertilizer`| Optional | Compute N-P-K nutrient dosage & 3-stage split |
| `POST` | `/api/v1/chatbot/message` | Optional | Query bilingual AI agronomist (Gemini/Groq) |
| `GET` | `/api/v1/diseases` | Public | Search pathology catalog with filter criteria |
| `GET` | `/api/v1/diseases/:id` | Public | Retrieve detailed clinical pathogen card |
| `POST` | `/api/v1/feedback` | Protected | Submit diagnostic accuracy verification |
| `GET` | `/api/v1/notices` | Public | Fetch active agricultural advisories & alerts |
| `POST` | `http://localhost:5005/predict`| Internal | FastAPI ConvNeXt model inference endpoint |

<br />

---

## 🧪 Automated E2E Testing & Quality Assurance

KrishiDrishti maintains a **production-grade Playwright End-to-End (E2E) Test Suite** with **54 automated test specs across 11 test suites**, validating complete user journeys from offline leaf scanning to admin dashboards with **zero flakes**.

```bash
# Run all 54 E2E test suites in headless mode
npx playwright test

# Run tests with interactive Playwright UI mode
npx playwright test --ui

# Inspect detailed test execution report
npx playwright show-report
```

### Test Suite Coverage Matrix:
- `tests/e2e/smoke/`: Application hydration, root route navigation, and SEO metadata integrity.
- `tests/e2e/scanner/`: Leaf upload dropzone, webcam stream emulation, 1-click test leaves, optical guardrail trigger, diagnostic cards, and PDF report generation.
- `tests/e2e/calculator/`: Dosage arithmetic, unit switches (Acres $\leftrightarrow$ Bigha $\leftrightarrow$ Decimals), soil level adjustments, and split schedules.
- `tests/e2e/chatbot/`: Streaming token hydration, bilingual prompt switching, quick suggestion pills, and toxicity guardrails.
- `tests/e2e/auth/`: Farmer signup, JWT credential validation, protected route interception, and logout states.
- `tests/e2e/access-control/`: Role-Based Access Control (RBAC) ensuring farmers cannot access admin management panels.
- `tests/e2e/admin/`: Outbreak telemetry cards, feedback rating reviews, and notice publisher modals.
- `tests/e2e/responsive/`: Cross-viewport verification across Mobile (375px), Tablet (768px), and Desktop (1440px).

<br />

---

## 📁 Repository Directory Structure

```text
krishi-drishti/
├── backend/                                 # Express.js Modular Backend
│   ├── prisma/                              # Database Schema & Migrations
│   │   ├── schema.prisma                    # PostgreSQL Models (User, Scan, Disease, Feedback)
│   │   └── seed.ts                          # Pathology Database Seeder
│   └── src/
│       ├── config/                          # Database (Prisma) & Environment Setup
│       ├── middlewares/                     # JWT Auth, Zod Validation, Error Handler, Logger
│       ├── modules/                         # Modular Monolith Domains
│       │   ├── auth/                        # User registration, login, JWT issuance
│       │   ├── calculator/                  # N-P-K Agronomic dosage engine
│       │   ├── chatbot/                     # Gemini & Groq orchestration
│       │   ├── diseases/                    # Pathology library search & details
│       │   ├── feedback/                    # Farmer accuracy validation loop
│       │   ├── notices/                     # Regional pest outbreak alerts
│       │   ├── scans/                       # Diagnostic scan persistence & stats
│       │   └── users/                       # User profile management
│       ├── routes.ts                        # Master API v1 Router
│       └── server.ts                        # Express server entrypoint (:5000)
├── scripts/                                 # Python AI Inference & Model Microservice
│   ├── model_server.py                      # FastAPI ConvNeXt model server (:5005)
│   ├── crop_registry.py                     # Authoritative 16-crop & 50-class registry
│   ├── crop_taxonomy.py                     # Optical sanity check & guardrail logic
│   └── capture_presentation_screenshots.mjs # Automated Playwright presentation recorder
├── src/                                     # Next.js 14 Frontend Application
│   ├── app/                                 # Next.js App Router Pages
│   │   ├── layout.tsx                       # Root layout, fonts, SEO Schema.org JSON-LD
│   │   ├── page.tsx                         # Landing page & live scanner demo
│   │   ├── scan/page.tsx                    # Dedicated Leaf Scanner Studio
│   │   ├── calculator/page.tsx              # Precision Fertilizer Engine
│   │   ├── crop-doctor/page.tsx             # Bilingual AI Agronomist Chatbot
│   │   ├── library/page.tsx                 # Disease & Pathogen Encyclopedia
│   │   ├── history/page.tsx                 # Field scan log & status tracking
│   │   ├── admin/page.tsx                   # Outbreak telemetry & admin surveillance
│   │   └── expert/page.tsx                  # Verified agronomist consultation booking
│   ├── components/                          # Reusable UI & Atomic Design Primitives
│   │   ├── common/                          # Navbar, Footer, Badge, Button, Modal, Card
│   │   ├── scanner/                         # Dropzone, Viewfinder, ScanningAnimation, PDFModal
│   │   └── home/                            # Hero, Features, ComparisonTable, SupportedCrops
│   ├── hooks/                               # Custom hooks (useScanner, useFertilizerCalc, etc.)
│   ├── lib/                                 # Client-side engines (diseaseDetector, fertilizerEngine)
│   └── types/                               # TypeScript interfaces & contracts
├── tests/                                   # Quality Engineering & Automated Testing
│   └── e2e/                                 # 54 Playwright E2E tests across 11 test suites
├── docs/                                    # Documentation, Presentation Assets & Renders
│   └── presentation/                        # High-resolution screenshots & slide decks
├── KrishiDrishti_Project_Presentation.pptx  # 15-Slide Executive PowerPoint Deck (with Admin & Expert Panels)
├── KrishiDrishti_Presentation_Script.docx   # Word Document Presentation Speech & Viva Guide
└── playwright.config.ts                     # Playwright multi-browser test harness
```

<br />

---

## 🚀 Installation & Local Development

### Prerequisites
- **Node.js**: `v18.17.0+` or `v20.x`
- **Python**: `v3.10+` (for AI Model Server)
- **PostgreSQL**: `v14+` (or SQLite for local mock testing)

<br />

### 1. Clone the Repository
```bash
git clone https://github.com/ripro805/krishi-drishti.git
cd krishi-drishti
```

<br />

### 2. Configure Environment Variables

#### Frontend Environment (`.env.local` in project root):
```bash
cp .env.example .env.local
```
*Populate your API keys in `.env.local`:*
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
MODEL_SERVER_URL=http://localhost:5005/predict

# Optional AI Chatbot LLM Keys (Gemini / Groq)
GEMINI_API_KEY=your_gemini_api_key_here
GROQ_API_KEY=your_groq_api_key_here
```

#### Backend Environment (`backend/.env`):
```bash
cp backend/.env.example backend/.env
```
*Configure your database and JWT secret in `backend/.env`:*
```env
PORT=5000
FRONTEND_URL=http://localhost:3000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/krishi_drishti?schema=public"
JWT_SECRET="your-super-secure-jwt-secret-key-32chars"
```

<br />

### 3. Initialize Database & Seed Pathology Records
```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npm run seed
cd ..
```

<br />

### 4. Run the Full Stack

Open three terminal windows to launch the interconnected microservices:

#### Terminal 1: Python FastAPI AI Model Server
```bash
# Install Python ML dependencies
pip install fastapi uvicorn torch transformers pillow pydantic

# Launch Model Server on port 5005
python scripts/model_server.py
```
> *The model server will automatically load `ripro805/krishidrishti-plant-disease` on GPU/CPU and listen on `http://localhost:5005`.*

#### Terminal 2: Node.js Express Modular Backend
```bash
cd backend
npm run dev
```
> *API Gateway running on `http://localhost:5000/api/v1`.*

#### Terminal 3: Next.js Frontend Application
```bash
npm install
npm run dev
```
> *Web application live at `http://localhost:3000`.*

<br />

---

## 📑 Executive Presentation & Deliverables

This repository includes a complete executive presentation package ready for stakeholder pitches, hackathon evaluations, and academic viva defenses:

- **Executive PowerPoint Deck**: [`KrishiDrishti_Project_Presentation.pptx`](./KrishiDrishti_Project_Presentation.pptx)  
  *15 executive slides designed with modern typography, authentic disease photography, zero text overflow, dual Admin & Expert operational panels, and seamless OpenXML transitions.*
- **Spoken Word Script & Defense Guide**: [`KrishiDrishti_Presentation_Script.docx`](./KrishiDrishti_Presentation_Script.docx)  
  *Word-for-word spoken presentation speech, timing milestones, and 5-topic technical defense Q&A covering model drift, edge deployment, and monetization.*
- **High-Resolution Slide Renders**: Available in [`docs/presentation/slide_renders/`](./docs/presentation/slide_renders/).
- **Full Platform Video Walkthrough (Full HD 1080p)**: [`docs/presentation/video/KrishiDrishti_Full_Platform_Walkthrough.webm`](./docs/presentation/video/KrishiDrishti_Full_Platform_Walkthrough.webm)  
  *Complete 2-minute automated screen recording exploring all 9 operational modules with interactive chapter player at [`docs/presentation/video/watch_walkthrough.html`](./docs/presentation/video/watch_walkthrough.html).*

<br />

---

## 🗺️ Strategic Roadmap & Future Horizons

- [x] **Phase 1: Foundation (Completed)**
  - Fine-tuned 50-class ConvNeXt-Tiny vision classifier on Hugging Face.
  - Built Next.js 14 frontend and modular Express backend.
  - Implemented BARI N-P-K fertilizer calculation engine.
  - Automated 54 Playwright E2E test suites with 100% pass rate.
- [ ] **Phase 2: Edge & IoT Deployment (Q1 2027)**
  - Quantize ConvNeXt model to **ONNX / INT8 / TensorFlow Lite** for offline edge execution directly in the browser via WebAssembly (WASM).
  - Integrate LoRaWAN telemetry with IoT soil NPK and moisture probes.
- [ ] **Phase 3: Drone & Remote Sensing (Q2 2027)**
  - Support drone-captured multispectral photogrammetry for field-scale blight indexing.
- [ ] **Phase 4: Omnichannel Voice Access (Q3 2027)**
  - Launch WhatsApp Business bot and interactive voice response (IVR) for non-smartphone smallholder farmers.

<br />

---

## 🛡️ Agricultural & Phytopathology Disclaimer

> **Important Agricultural Notice:**  
> KrishiDrishti is designed as an AI-assisted optical screening tool to assist agricultural scouts, agronomists, and growers. While the underlying ConvNeXt deep learning model delivers 99.2% laboratory validation accuracy, microscopic physiological disorders or novel pathogen variants may present overlapping visual symptoms. For quarantine decisions or commercial chemical spraying over large acreages, always corroborate findings with local Department of Agricultural Extension (DAE) officers and registered agricultural laboratories.

<br />

---

## 👥 Authors & Open Source Acknowledgments

- **Lead Architect & AI Engineer**: Rifat Mahmud ([@ripro805](https://github.com/ripro805))
- **Machine Learning Model**: [`ripro805/krishidrishti-plant-disease`](https://huggingface.co/ripro805/krishidrishti-plant-disease) on Hugging Face
- **Inspirations & Agronomic Datasets**:
  - Bangladesh Agricultural Research Institute (BARI) & BARC Fertilizer Guidelines
  - PlantVillage Dataset (Hughes & Salathé)
  - International Rice Research Institute (IRRI) Diagnostic Keys

<br />

<div align="center">

**Distributed under the MIT License.**  
*Crafted with dedication for the hardworking farmers who nourish our communities.* 🌾💚

</div>
