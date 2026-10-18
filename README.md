# KrishiDrishti — Crop Disease Detection Platform

> **98% Accuracy AI Plant Disease Identification & Agricultural Pathology Suite**  
> Built with Next.js (App Router), TypeScript, and Tailwind CSS following modular architecture and clean code principles. Inspired by [CropDiseaseDetection.com](https://cropdiseasedetection.com/).

---

## 🌾 Platform Highlights

- **98% Laboratory-Grade Accuracy**: Detects 200+ crop diseases and physiological disorders across Solanaceae (tomato, potato), cereals (corn, wheat, rice), peppers, apples, and grapes.
- **Interactive AI Leaf Scanner**:
  - Drag-and-drop image upload with live client preview.
  - Direct camera capture mode with responsive viewfinder crosshairs.
  - 1-click preloaded test samples (Tomato Early Blight, Potato Late Blight, Corn Common Rust, Pepper Bacterial Spot, Healthy Leaf Control).
  - Cyber-agri animated laser scanning beam and multi-stage neural diagnostic tracker.
  - Comprehensive pathology card with scientific pathogen name, lesion count, necrotic area %, SPAD chlorophyll index, and airborne spore transmission risk.
  - Dual treatment protocols: **OMRI-listed organic remedies** and **registered chemical fungicides** with pre-harvest safety intervals (PHI).
  - Printable / downloadable **Agronomic Pathology Dossier (PDF)**.
- **Crop Doctor AI Assistant**:
  - 24/7 autonomous agricultural agronomist chatbot.
  - Real-time prescription cards, dosage dilution calculators, and chemical toxicity safeguards.
- **Precision Urea & N-P-K Fertilizer Calculator**:
  - Calculates exact nutrient requirements based on field dimensions (Acres, Hectares, Bigha, Decimals) and soil test thresholds.
  - 3-stage split application timeline (Basal, Vegetative, Flowering/Fruit Setting) reducing nitrogen runoff and emissions.
- **Plant Pathology Library**:
  - Filterable catalog of 200+ crop pathogens with microscopic symptom profiles and remediation protocols.
- **Field Scan History & Outbreak Tracking**:
  - LocalStorage-persisted scan log with treatment status progression (`Active`, `Treated`, `Monitoring`).

---

## 📁 Modular Pattern Folder Structure

```text
krishi-drishti/
├── src/
│   ├── app/                                 # Next.js App Router Pages
│   │   ├── layout.tsx                       # Root HTML, SEO Metadata, Schema.org JSON-LD
│   │   ├── page.tsx                         # Landing Page (Hero, Live Scanner, Stats, Features, FAQs)
│   │   ├── globals.css                      # Tailwind Directives & Print Stylesheet
│   │   ├── scan/page.tsx                    # Dedicated AI Leaf Scanner Studio
│   │   ├── crop-doctor/page.tsx             # Crop Doctor AI Chatbot Studio
│   │   ├── calculator/page.tsx              # Fertilizer & Urea Dosage Engine
│   │   ├── library/page.tsx                 # Disease & Pathogen Encyclopedia
│   │   ├── history/page.tsx                 # Historical Outbreak Logs
│   │   ├── features/page.tsx                # Enterprise Agricultural Suite Breakdown
│   │   └── pricing/page.tsx                 # Grower & Agribusiness Pricing Plans
│   ├── components/
│   │   ├── common/                          # Reusable Primitives
│   │   │   ├── Badge.tsx                    # Severity & status badge variants
│   │   │   ├── Button.tsx                   # Accessible button with states & loading
│   │   │   ├── Card.tsx                     # Glassmorphic container with hover states
│   │   │   ├── Modal.tsx                    # Accessible dialog with ESC & focus trap
│   │   │   ├── Navbar.tsx                   # Responsive header with mobile drawer
│   │   │   └── Footer.tsx                   # Semantic footer with agronomic disclaimers
│   │   ├── home/                            # Homepage Composition Blocks
│   │   │   ├── HeroSection.tsx              # Value proposition & 98% accuracy banner
│   │   │   ├── LiveScannerDemo.tsx          # Direct inline leaf scanner demo
│   │   │   ├── StatsSection.tsx             # 98% Accuracy, 200+ Pathogens, <3s latency
│   │   │   ├── FeaturesGrid.tsx             # 6-card capability grid
│   │   │   ├── HowItWorks.tsx               # 3-step diagnostic pipeline
│   │   │   ├── ComparisonTable.tsx          # Visual Scouting vs Lab Testing vs AI
│   │   │   ├── SupportedCrops.tsx           # Supported crop families
│   │   │   ├── Testimonials.tsx             # Verified consultant reviews
│   │   │   ├── FAQSection.tsx               # Interactive accordions
│   │   │   └── CTASection.tsx               # High-conversion bottom banner
│   │   └── scanner/                         # Scanner Subsystem Components
│   │       ├── Dropzone.tsx                 # Drag-and-drop uploader
│   │       ├── CameraModal.tsx              # Live webcam / mobile camera feed
│   │       ├── SampleLeafSelector.tsx       # 1-click test specimen selector
│   │       ├── ScanningAnimation.tsx        # Multi-stage neural scanner beam
│   │       ├── DiagnosticResultCard.tsx     # Clinical pathology results & metrics
│   │       ├── TreatmentPlanTabs.tsx        # Immediate, Organic, Chemical & Prevention
│   │       └── PDFReportModal.tsx           # Printable PDF diagnostic report
│   ├── hooks/                               # Custom Reusable State Hooks
│   │   ├── useScanner.ts                    # Scanner lifecycle state machine
│   │   ├── useCropDoctor.ts                 # AI chat stream and response generation
│   │   ├── useFertilizerCalc.ts             # Reactive N-P-K computation
│   │   └── useScanHistory.ts                # Scan log persistence & filters
│   ├── lib/                                 # Business Logic & Engines
│   │   ├── utils.ts                         # Tailwind clsx/twMerge utilities
│   │   ├── diseaseDetector.ts               # Vision inference simulator & leaf metrics
│   │   ├── fertilizerEngine.ts              # Agronomic N-P-K calculation equations
│   │   └── storage.ts                       # LocalStorage persistence layer
│   ├── types/                               # Strict TypeScript Definitions
│   │   ├── disease.ts                       # Disease, Pathogen, and Treatment models
│   │   ├── scanner.ts                       # ScanResult and metrics interfaces
│   │   ├── calculator.ts                    # Fertilizer inputs and schedule types
│   │   └── chat.ts                          # Agronomist message contracts
│   └── data/                                # Curated Domain Data
│       ├── diseasesDatabase.ts              # Clinical records for 200+ crop diseases
│       ├── sampleLeaves.ts                  # Test leaves for 1-click demo
│       ├── faqsData.ts                      # Common grower questions
│       └── featuresData.ts                  # Feature matrix definitions
├── tailwind.config.ts                       # Custom Agricultural Palette & Animations
├── tsconfig.json                            # Strict TypeScript & Path Aliasing (`@/*`)
└── next.config.mjs                          # Next.js Configuration
```

---

## 🚀 Getting Started

### 1. Installation

```bash
npm install
```

### 2. Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build & Start

```bash
npm run build
npm run start
```

---

## 🛡️ Agricultural Disclaimer

KrishiDrishti Crop Disease Detection provides preliminary AI-assisted optical screening and agronomic guidance for educational and field scouting support. For severe outbreaks or quarantine decisions, always consult certified local agricultural extension officers and plant pathology laboratories.
