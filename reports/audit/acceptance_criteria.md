# KrishiDrishti — Evidence-Based Acceptance Criteria & Deployment Standards

**Audit Date:** 2026-10-27  
**Scope:** Production readiness evaluation standards for the 50-class / 16-crop plant pathology platform.

---

## 1. Acceptance Criteria Framework

To prevent premature declarations of production readiness, KrishiDrishti evaluates every supported class and crop against strict, evidence-based performance benchmarks:

| Criterion | Target Metric | Current Model Measurement | Assessment |
|---|---|---|---|
| **Overall Validation Accuracy** | $\ge 95.0\%$ | **98.91%** (5,422 val images) | **MET (PASS)** |
| **Macro-F1 Score (Overall)** | $\ge 95.0\%$ | **98.28%** | **MET (PASS)** |
| **Legacy Retention Accuracy (24 Old Classes)** | $\ge 97.0\%$ | **98.07%** (0.05% cross-split leakage to new classes) | **MET (PASS)** |
| **Class-Level Passing Rate** | $\ge 85.0\%$ | **88.0%** (44 / 50 classes categorized as PASS) | **MET (PASS)** |
| **Sample Size Minimum per Class** | $\ge 25$ independent images | **46 / 50 classes meet threshold** (4 classes have $N < 25$) | **PARTIAL (INSUFFICIENT DATA on 4 classes)** |
| **Cross-Crop Misclassification Rate** | $< 1.0\%$ | **0.15%** (8 cross-crop events across 5,422 images) | **MET (PASS)** |
| **FastAPI Inference Latency (CPU)** | $< 120\text{ ms}$ | **~50–65 ms** | **MET (PASS)** |
| **Schema & Bilingual Metadata Coverage** | $100\%$ | **100% (50/50 classes mapped, 51 DB entities complete)** | **MET (PASS)** |
| **TypeScript Build & Lint Integrity** | $0\text{ errors}$ | **0 errors (`tsc --noEmit` code 0)** | **MET (PASS)** |

---

## 2. Formal Production Readiness Determination

### Status: CONDITIONALLY READY FOR STAGING & CAUTIOUS PRODUCTION
1. **Fully Validated Core (44 Classes):**
   - Tomato (10 classes), Pepper (2 classes), Potato (2 of 3 classes), Apple (4 classes), Corn (4 classes), Grape (4 classes), Peach (2 classes), Cherry (2 classes), Strawberry (2 classes), Blueberry (1 class), Citrus (1 class), Raspberry (1 class), Soybean (1 class), Squash (1 class), Wheat Stripe Rust (1 class), and 7 Rice classes meet all validation criteria ($F_1 \ge 0.90$, support $\ge 25$).
2. **Documented Gaps Requiring Retraining / Dataset Expansion (6 Classes):**
   - **Low Sample Size (INSUFFICIENT DATA):**
     - `Potato___healthy` ($N=23$)
     - `Rice_Tungro` ($N=15$)
     - `Wheat_Healthy` ($N=15$)
     - `Wheat_Septoria` ($N=15$)
     *Requirement:* Expand independent field test sets for Wheat and healthy controls before certifying them for unsupervised commercial agronomic advice.
   - **Within-Crop Confusion (FAIL):**
     - `Rice_Healthy` ($F_1 = 0.87$) and `Rice_Hispa` ($F_1 = 0.86$) exhibit mutual confusion due to subtle early scraping lesions on leaves.
     *Requirement:* Integrate magnified lesion feature extraction or crop-specific re-ranking in the next training iteration.
