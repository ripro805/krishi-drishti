# -*- coding: utf-8 -*-
"""
KrishiDrishti Full Backward Compatibility & Regression Test Suite
Validates the complete 50-class ConvNeXt model integration.
"""
import sys
import os
import json
import re
import time
import io
import base64
from PIL import Image

def test_regression():
    print("=================================================================")
    print("   KrishiDrishti Comprehensive Regression & Compatibility Test   ")
    print("=================================================================")

    errors = []

    # 1. Load Original 15 Classes from models/class_names.json
    with open('models/class_names.json', 'r', encoding='utf-8') as f:
        legacy_classes = json.load(f)
    print(f"\n[TEST 1] Legacy Class Archive: Verified {len(legacy_classes)} original classes exist in models/class_names.json.")

    # 2. Load detector mappings from src/lib/diseaseDetector.ts
    with open('src/lib/diseaseDetector.ts', 'r', encoding='utf-8') as f:
        detector_code = f.read()

    # Extract all mapped labels in HF_LABEL_MAP
    # Looking for lines like:  Pepper__bell___Bacterial_spot: {
    mapped_labels = re.findall(r'^\s*([A-Za-z0-9_]+):\s*\{\s*diseaseId:\s*["\']([^"\']+)["\']', detector_code, re.MULTILINE)
    label_to_id = {lbl: d_id for lbl, d_id in mapped_labels}
    print(f"[TEST 2] HF_LABEL_MAP in diseaseDetector.ts: Found {len(label_to_id)} mapped labels.")

    if len(label_to_id) != 50:
        errors.append(f"Expected 50 mapped labels in HF_LABEL_MAP, found {len(label_to_id)}")

    # 3. Check Backward Compatibility: Are all legacy 15 classes in label_to_id?
    missing_legacy = [c for c in legacy_classes if c not in label_to_id]
    if missing_legacy:
        errors.append(f"Legacy classes missing in HF_LABEL_MAP: {missing_legacy}")
    else:
        print(f"[TEST 3] Backward Compatibility: All {len(legacy_classes)} original Tomato, Pepper, and Potato classes are 100% preserved!")

    # 4. Load DISEASES_DATABASE from src/data/diseasesDatabase.ts
    with open('src/data/diseasesDatabase.ts', 'r', encoding='utf-8') as f:
        db_code = f.read()

    db_ids = set(re.findall(r'id:\s*["\']([^"\']+)["\']', db_code))
    print(f"[TEST 4] DISEASES_DATABASE: Found {len(db_ids)} total disease entities.")

    # Check that every single one of the 50 labels maps to a real ID in DISEASES_DATABASE
    unmatched_in_db = []
    for lbl, d_id in label_to_id.items():
        if d_id not in db_ids:
            unmatched_in_db.append((lbl, d_id))

    if unmatched_in_db:
        errors.append(f"Labels with missing database records: {unmatched_in_db}")
    else:
        print(f"[TEST 5] Complete Database Coverage: All 50 model classes have authoritative records in DISEASES_DATABASE!")

    # 5. Test Live Inference with scripts/predict.py
    print("\n[TEST 6] Running Live Inference with scripts/predict.py...")
    sys.path.insert(0, os.path.abspath("scripts"))
    sys.path.insert(0, os.path.abspath("."))
    from predict import predict_image

    sample_leaf_path = os.path.join("public", "uploads", "scans", "leaf_1793041150846_cef02.jpeg")
    if os.path.exists(sample_leaf_path):
        test_img = Image.open(sample_leaf_path).convert("RGB")
    else:
        # Fallback to realistic gradient pattern
        test_img = Image.effect_mandelbrot((224, 224), (-2, -1.5, 1, 1.5), 100).convert("RGB")

    t0 = time.time()
    preds = predict_image(test_img)
    latency_ms = (time.time() - t0) * 1000

    print(f"  -> Prediction returned {len(preds)} results in {latency_ms:.1f}ms")
    if not preds:
        errors.append("Live inference returned 0 results on genuine leaf scan")
    else:
        top_pred = preds[0]
        print(f"  -> Top predicted class: '{top_pred['label']}' with confidence score: {top_pred['score']:.4f}")

        if top_pred['label'] not in label_to_id:
            errors.append(f"Predicted label '{top_pred['label']}' not found in HF_LABEL_MAP")
        else:
            matched_id = label_to_id[top_pred['label']]
            print(f"  -> Successfully resolved to disease ID: '{matched_id}'")

    # Verify that a blank solid image is correctly rejected
    blank_img = Image.new("RGB", (224, 224), color=(34, 139, 34))
    blank_preds = predict_image(blank_img)
    if len(blank_preds) == 0:
        print("  -> Quality Gate Verified: Blank solid color image correctly rejected!")
    else:
        errors.append("Blank solid color image was not rejected by quality gate")

    # 6. Verify Critical Fields in DISEASES_DATABASE entries for new crops
    print("\n[TEST 7] Verifying Schema Integrity for Sample Expanded Diseases...")
    sample_checks = ["apple-scab", "corn-northern-leaf-blight", "grape-black-rot", "wheat-stripe-rust", "citrus-greening-huanglongbing"]
    for chk in sample_checks:
        if chk not in db_ids:
            errors.append(f"Sample expanded disease '{chk}' missing from DB")
        else:
            # Check presence of banglaName and treatmentPlan
            pattern = re.compile(rf'id:\s*["\']{chk}["\'][\s\S]*?banglaName:\s*["\']([^"\']+)["\'][\s\S]*?treatmentPlan:\s*\{{', re.MULTILINE)
            if not pattern.search(db_code):
                errors.append(f"Disease '{chk}' missing required banglaName or treatmentPlan")
            else:
                print(f"  -> Verified '{chk}': valid banglaName & treatmentPlan")

    print("\n=================================================================")
    if errors:
        print(f"FAILED: {len(errors)} error(s) detected during regression testing:")
        for err in errors:
            print(f"  [X] {err}")
        return False
    else:
        print("ALL REGRESSION AND BACKWARD COMPATIBILITY TESTS PASSED (100% SUCCESS)!")
        print("=================================================================")
        return True

if __name__ == "__main__":
    success = test_regression()
    sys.exit(0 if success else 1)
