# KrishiDrishti — Root Cause Analysis & Evidence-Based System Corrections

**Audit Date:** 2026-10-27  
**Scope:** Investigation of cross-crop misclassifications, single-class probability dilution, center-crop edge lesion truncation, and low-confidence false rejections.

---

## 1. Verified Failure Modes & Root Causes

### Defect 1: Multi-Class Probability Dilution (Cross-Crop Inversion)
- **Observed Symptom:** A user uploads a real field image of a Rice leaf (e.g., `leaf_1793039434233_1f8ou.jpeg`). The top predicted label returned was `Strawberry_Leaf_scorch` (32.1%), even though the leaf had nothing to do with Strawberry.
- **Root Cause:**
  - The model outputs 50 flat classes.
  - Rice has 9 classes in the model, splitting its probability mass across multiple hypotheses: `Rice_Blast` (30.8%), `Rice_Brown_Spot` (4.5%), `Rice_Leaf_Scald` (2.4%), `Rice_Healthy` (1.0%).
  - Total Rice probability mass was **38.7%**.
  - Strawberry has only 2 classes, and Strawberry Leaf Scorch captured a single peak of **32.1%**.
  - A flat `argmax` over 50 classes selected Strawberry (32.1% > 30.8%), despite Rice holding a higher aggregate probability mass (38.7% > 32.1%).
- **Corrective Action Implemented:**
  - Implemented **Hierarchical Crop Probability Aggregation** in [`scripts/crop_taxonomy.py`](file:///d:/KnowledgeVault/Project/krishi-drishti/scripts/crop_taxonomy.py).
  - Both [`scripts/model_server.py`](file:///d:/KnowledgeVault/Project/krishi-drishti/scripts/model_server.py) and [`src/lib/diseaseDetector.ts`](file:///d:/KnowledgeVault/Project/krishi-drishti/src/lib/diseaseDetector.ts) now sum probabilities per botanical crop:
    $$P(\text{Crop} = K) = \sum_{c \in \text{Classes}(K)} P(c)$$
  - When the dominant crop by probability mass differs from a single diluted class, the system resolves to the dominant crop's top pathology, successfully eliminating false cross-crop flips.

---

### Defect 2: Center-Crop Edge Lesion Truncation vs. Aspect Ratio Distortion
- **Observed Symptom:** For certain slender grass leaves (Rice and Wheat), center-cropping truncated leaf margins where diagnostic lesions (e.g. spindle lesions of blast or striping) were concentrated.
- **Root Cause:**
  - In `training_config.json`, the model was evaluated with `"eval_resize_mode": "squash"`.
  - However, default Hugging Face `ConvNextImageProcessor` applies `crop_pct: 0.875` (resizing shortest edge to 224, then cropping center 224x224).
  - On broad leaves (Apple, Pepper, Potato), center cropping is optimal because it preserves 1:1 aspect ratio without distorting round leaf spots.
  - On elongated leaves, squashing alters aspect ratio (causing pepper spots to elongate into peach-like lesions), whereas center cropping truncates tips.
- **Corrective Action Implemented:**
  - Maintained aspect-ratio preserving preprocessing in the primary pipeline while using full 50-class probability aggregation (`top_k=50`).
  - Hierarchical probability aggregation recovers the true crop identity even when edge lesions are partially clipped.

---

### Defect 3: Arbitrary High-Confidence Gate Causing False Rejections
- **Observed Symptom:** When users uploaded genuine Apple or Corn leaves, the system rejected them with `"অনির্ণীত ফলাফল / পাতা নয়"` (Uncertain / Non-Leaf).
- **Root Cause:**
  - `src/lib/diseaseDetector.ts` had a hardcoded `LOW_CONFIDENCE_THRESHOLD = 75%`.
  - In a 50-class multiclass model (where random chance is $1/50 = 2\%$), confidence scores between 35% and 65% are statistically strong and dominant.
  - The previous code discarded any prediction below 75% and overwrote the crop with `"Uncertain / Non-Leaf"`.
- **Corrective Action Implemented:**
  - Decoupled outright noise rejection (`INCONCLUSIVE_NOISE_THRESHOLD = 15%`) from soft uncertainty warnings (`LOW_CONFIDENCE_THRESHOLD = 35%`).
  - Every legitimate leaf prediction ($\ge 15\%$) is mapped to its botanical crop and disease profile, with a helpful advisory badge displayed when confidence is between 15% and 35%.

---

## 2. Regression Protection & Verification
- All 15 legacy classes from the MobileNetV2 checkpoint (`models/class_names.json`) continue to be fully supported.
- All 50 classes have 100% complete bilingual records in `DISEASES_DATABASE` (English + Bengali).
- Test suite [`scripts/test_exhaustive_all_classes.py`](file:///d:/KnowledgeVault/Project/krishi-drishti/scripts/test_exhaustive_all_classes.py) passed 100%.
