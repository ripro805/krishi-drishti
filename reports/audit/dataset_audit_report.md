# KrishiDrishti — Dataset Audit & Ground-Truth Verification Report

**Audit Date:** 2026-10-27  
**Model Architecture:** `ConvNextForImageClassification` (50 classes, 16 crops)  
**Hugging Face Hub Model:** `ripro805/krishidrishti-plant-disease`  
**Total Images Analyzed in Manifest:** 36,145 images (30,723 train, 5,422 val)

---

## 1. Dataset Provenance and Sources

The model's training and evaluation corpus was assembled from 6 distinct open-access botanical pathology repositories:

| Source Identifier | Upstream Repository / Name | Split (Train / Val) | Total Images | Target Crop Scope |
|---|---|---|---|---|
| `pv` | `abdallahalidev/plantvillage-dataset` | 26,322 / 4,645 | 30,967 | Apple, Blueberry, Cherry, Corn, Grape, Orange, Peach, Pepper, Potato, Raspberry, Soybean, Squash, Strawberry, Tomato |
| `rice1` | `minhhuy2810/rice-diseases-image-dataset` | 1,225 / 213 | 1,438 | Rice (Leaf Blast, Brown Spot, BLB, Tungro, etc.) |
| `rice2` | `anshulm257/rice-disease-dataset` | 1,390 / 238 | 1,628 | Rice (Hispa, Sheath Blight, etc.) |
| `rice3` | `dedeikhsandwisaputra/rice-leafs-disease-dataset` | 967 / 175 | 1,142 | Rice (Narrow Brown Spot, Leaf Scald, etc.) |
| `rice4` | `shrupyag001/philippines-rice-diseases` | 474 / 90 | 564 | Rice (Field validation specimens) |
| `wheat` | `olyadgetch/wheat-leaf-dataset` | 345 / 61 | 406 | Wheat (Stripe Rust, Septoria, Healthy) |
| **Total** | **Combined Multi-Source Corpus** | **30,723 / 5,422** | **36,145** | **16 Crops / 50 Output Classes** |

---

## 2. Key Dataset Limitations & Risk Assessment

### A. Acute Class Imbalance in Minor Crops
- **Wheat:** Extremely constrained dataset with only **406 images total** across 3 classes:
  - `Wheat_Healthy`: 101 train / 15 val (Low sample risk)
  - `Wheat_Septoria`: 97 train / 15 val (Low sample risk)
  - `Wheat_Stripe_Rust`: 208 train / 31 val
  *Consequence:* `Wheat_Healthy` suffers from low recall (60.0%) and confusion with `Rice_Healthy` and `Rice_Hispa` due to monocot leaf visual similarities.
- **Single-Class Crops (Isolated Classes):**
  - `Orange_Haunglongbing_Citrus_greening`: 427 train / 75 val (Only citrus class present). Any other citrus symptom (canker, black spot, leafminer) has no trained class.
  - `Blueberry_healthy`: 127 train / 23 val (Only blueberry class present; no blueberry diseases).
  - `Raspberry_healthy`: 315 train / 56 val (Only raspberry class present).
  - `Soybean_healthy`: 433 train / 76 val (Only soybean class present).
  - `Squash_Powdery_mildew`: 433 train / 76 val (Only squash class present; no healthy squash).

### B. PlantVillage Studio Bias (Domain Shift)
- PlantVillage images were captured on uniform lab backgrounds (grey, black, or blue boards) under controlled fluorescent illumination.
- Photos frequently include serial shots of the same infected leaf rotated or photographed multiple times (near-duplicate leakage risk between train and val).
- When farmers upload field images with natural soil, hands, weeds, or harsh sunlight, confidence scores are naturally lower (35%–65%) than on lab benchmarks (>95%).

### C. Within-Crop Pathology Overlap
- **Rice:** 9 classes present in the model. Significant visual overlap exists between:
  - `Rice_Hispa` (leaf scraping lesions) and `Rice_Healthy` / `Rice_Blast` (16 total validation confusions).
  - `Rice_Bacterial_Leaf_Blight` and `Rice_Leaf_Scald`.
- **Corn:** `Corn_maize_Northern_Leaf_Blight` and `Corn_maize_Cercospora_leaf_spot_Gray_leaf_spot` exhibit 7 validation confusions due to elongated necrotic streaks.

---

## 3. Auditable Data Integrity Conclusions
1. The 50 classes in `config.json` correctly correspond to the labeled directories in the manifest.
2. No class index shift or corrupted label-to-id mapping exists in the active Hugging Face model.
3. Classes with fewer than 25 validation images (`Potato___healthy`, `Rice_Tungro`, `Wheat_Healthy`, `Wheat_Septoria`) have been formally categorized as **INSUFFICIENT DATA** for production claims and require expansion in future retraining cycles.
