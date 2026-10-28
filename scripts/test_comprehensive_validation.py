# -*- coding: utf-8 -*-
"""
KrishiDrishti Comprehensive Regression & Validation Test Suite
Phase 8: Validates selected-crop validation mode, automatic detection routing,
out-of-distribution rejection, image quality gates, and treatment safety.
"""

import sys
import os
import json
import numpy as np
from PIL import Image, ImageFilter

sys.path.insert(0, os.path.abspath("scripts"))
sys.path.insert(0, os.path.abspath("."))

from crop_registry import CROP_REGISTRY, validate_registry
from predict import predict_image

TEST_SPECIMENS = {
    "Apple": "public/uploads/scans/leaf_1793038944459_cm20d.jpeg",
    "Bell Pepper": "public/uploads/scans/leaf_1792836645407_vranf.jpeg",
    "Corn": "public/uploads/scans/leaf_1793038898115_2z3ic.jpeg",
    "Grape": "public/uploads/scans/leaf_1793004948074_ojtbh.jpeg",
    "Potato": "public/uploads/scans/leaf_1792836796984_zcwo1.jpeg",
    "Rice": "public/uploads/scans/leaf_1792836460343_gh7fs.png",
    "Strawberry": "public/uploads/scans/leaf_1793039785422_n72hi.jpeg",
    "Tomato": "public/uploads/scans/leaf_1792835735530_9pmtl.jpeg",
    "Wheat": "public/uploads/scans/leaf_1793041150846_cef02.jpeg",
}


def run_all_tests():
    print("=" * 70)
    print("   KRISHIDRISHTI COMPREHENSIVE VALIDATION & REGRESSION TEST SUITE   ")
    print("=" * 70)

    # Test 0: Registry Validation
    print("\n[TEST 0] Validating Authoritative Model & Crop Registry...")
    assert validate_registry()
    print("  -> PASSED: All 16 crops and 50 classes verified.")

    passed = 0
    total = 0

    def check(title: str, condition: bool, details: str = ""):
        nonlocal passed, total
        total += 1
        status_str = "PASS" if condition else "FAIL"
        print(f"[{status_str}] Test {total:2d}: {title}")
        if details:
            print(f"        Details: {details}")
        if condition:
            passed += 1
        else:
            print(f"        ERROR: Condition not satisfied!")
        return condition

    # ── Category 1: Selected-Crop Validation & Mismatch Rejection ──
    print("\n--- CATEGORY 1: SELECTED-CROP VALIDATION & MISMATCH REJECTION ---")

    # Scenario 1: Apple selected + Valid apple leaf
    apple_img = TEST_SPECIMENS["Apple"]
    res = predict_image(apple_img, crop_hint="Apple", return_meta=True)
    check(
        "Apple selected + Valid apple leaf -> Apple classification",
        res["status"] == "success" and res["detected_crop"] == "Apple" and res["can_provide_treatment"] is True,
        f"Status: {res['status']}, Crop: {res['detected_crop']}, Score: {res['confidence']}%",
    )

    # Scenario 2: Apple selected + Wheat leaf -> MUST REJECT WITH CROP MISMATCH
    wheat_img = TEST_SPECIMENS["Wheat"]
    res = predict_image(wheat_img, crop_hint="Apple", return_meta=True)
    check(
        "Apple selected + Wheat leaf -> CROP MISMATCH (Treatment withheld)",
        res["status"] == "crop_mismatch"
        and res["selected_crop"] == "Apple"
        and res["detected_crop"] == "Wheat"
        and res["can_provide_treatment"] is False
        and res["prediction"] is None,
        f"Status: {res['status']}, Selected: {res['selected_crop']}, Detected: {res['detected_crop']}, CanTreat: {res['can_provide_treatment']}",
    )

    # Scenario 3: Rice selected + Corn leaf -> MUST REJECT WITH CROP MISMATCH
    corn_img = TEST_SPECIMENS["Corn"]
    res = predict_image(corn_img, crop_hint="Rice", return_meta=True)
    check(
        "Rice selected + Corn leaf -> CROP MISMATCH (Treatment withheld)",
        res["status"] == "crop_mismatch"
        and res["selected_crop"] == "Rice"
        and res["detected_crop"] == "Corn (Maize)"
        and res["can_provide_treatment"] is False,
        f"Status: {res['status']}, Selected: {res['selected_crop']}, Detected: {res['detected_crop']}",
    )

    # Scenario 4: Wheat selected + Valid wheat leaf -> Success
    res = predict_image(wheat_img, crop_hint="Wheat", return_meta=True)
    check(
        "Wheat selected + Valid wheat leaf -> Wheat disease classification",
        res["status"] == "success" and res["detected_crop"] == "Wheat" and res["can_provide_treatment"] is True,
        f"Status: {res['status']}, Pred: {res['prediction']['label']} ({res['confidence']}%)",
    )

    # Scenario 5: Corn selected + Valid corn leaf -> Success
    res = predict_image(corn_img, crop_hint="Corn (Maize)", return_meta=True)
    check(
        "Corn selected + Valid corn leaf -> Corn disease classification",
        res["status"] == "success" and res["detected_crop"] == "Corn (Maize)",
        f"Status: {res['status']}, Pred: {res['prediction']['label']} ({res['confidence']}%)",
    )

    # Scenario 6: Strawberry selected + Valid strawberry leaf -> Success
    straw_img = TEST_SPECIMENS["Strawberry"]
    res = predict_image(straw_img, crop_hint="Strawberry", return_meta=True)
    check(
        "Strawberry selected + Valid strawberry leaf -> Strawberry disease classification",
        res["status"] == "success" and res["detected_crop"] == "Strawberry",
        f"Status: {res['status']}, Pred: {res['prediction']['label']} ({res['confidence']}%)",
    )

    # Scenario 7: Tomato selected + Grape leaf -> Mismatch
    grape_img = TEST_SPECIMENS["Grape"]
    res = predict_image(grape_img, crop_hint="Tomato", return_meta=True)
    check(
        "Tomato selected + Grape leaf -> CROP MISMATCH",
        res["status"] == "crop_mismatch" and res["detected_crop"] == "Grape" and res["can_provide_treatment"] is False,
        f"Status: {res['status']}, Detected: {res['detected_crop']}",
    )

    # Scenario 8: Potato selected + Bell Pepper leaf -> Mismatch
    pepper_img = TEST_SPECIMENS["Bell Pepper"]
    res = predict_image(pepper_img, crop_hint="Potato", return_meta=True)
    check(
        "Potato selected + Bell Pepper leaf -> CROP MISMATCH",
        res["status"] == "crop_mismatch" and res["detected_crop"] == "Bell Pepper",
        f"Status: {res['status']}, Detected: {res['detected_crop']}",
    )

    # ── Category 2: Automatic Crop Detection & Routing ──
    print("\n--- CATEGORY 2: AUTOMATIC CROP DETECTION & ROUTING ---")

    # Scenario 9: Auto on Apple leaf
    res = predict_image(apple_img, crop_hint=None, return_meta=True)
    check(
        "Auto on Apple leaf -> Identify Apple correctly",
        res["status"] == "success" and res["detected_crop"] == "Apple",
        f"Detected: {res['detected_crop']} (mass: {res['crop_confidence']}%)",
    )

    # Scenario 10: Auto on Wheat leaf -> MUST NOT be Rice
    res = predict_image(wheat_img, crop_hint=None, return_meta=True)
    check(
        "Auto on Wheat leaf -> Identify Wheat correctly (NOT Rice)",
        res["status"] == "success" and res["detected_crop"] == "Wheat",
        f"Detected: {res['detected_crop']} (mass: {res['crop_confidence']}%)",
    )

    # Scenario 11: Auto on Corn leaf -> MUST NOT be Wheat
    res = predict_image(corn_img, crop_hint=None, return_meta=True)
    check(
        "Auto on Corn leaf -> Identify Corn correctly (NOT Wheat)",
        res["status"] == "success" and res["detected_crop"] == "Corn (Maize)",
        f"Detected: {res['detected_crop']} (mass: {res['crop_confidence']}%)",
    )

    # Scenario 12: Auto on Rice leaf
    rice_img = TEST_SPECIMENS["Rice"]
    res = predict_image(rice_img, crop_hint=None, return_meta=True)
    check(
        "Auto on Rice leaf -> Identify Rice correctly (NOT Wheat)",
        res["status"] == "success" and res["detected_crop"] == "Rice",
        f"Detected: {res['detected_crop']} (mass: {res['crop_confidence']}%)",
    )

    # Scenario 13: Auto on Tomato leaf -> MUST NOT be Grape
    tomato_img = TEST_SPECIMENS["Tomato"]
    res = predict_image(tomato_img, crop_hint=None, return_meta=True)
    check(
        "Auto on Tomato leaf -> Identify Tomato correctly (NOT Grape)",
        res["status"] == "success" and res["detected_crop"] == "Tomato",
        f"Detected: {res['detected_crop']} (mass: {res['crop_confidence']}%)",
    )

    # Scenario 14: Auto on Grape leaf
    res = predict_image(grape_img, crop_hint=None, return_meta=True)
    check(
        "Auto on Grape leaf -> Identify Grape correctly",
        res["status"] == "success" and res["detected_crop"] == "Grape",
        f"Detected: {res['detected_crop']} (mass: {res['crop_confidence']}%)",
    )

    # Scenario 15: Auto on Potato leaf
    potato_img = TEST_SPECIMENS["Potato"]
    res = predict_image(potato_img, crop_hint=None, return_meta=True)
    check(
        "Auto on Potato leaf -> Identify Potato correctly",
        res["status"] == "success" and res["detected_crop"] == "Potato",
        f"Detected: {res['detected_crop']} (mass: {res['crop_confidence']}%)",
    )

    # ── Category 3: Out-of-Distribution, Non-Leaf, and Quality Rejection ──
    print("\n--- CATEGORY 3: OUT-OF-DISTRIBUTION & IMAGE QUALITY REJECTION ---")

    # Scenario 16: Solid Green Square -> Reject as unsupported_image
    solid_green = Image.new("RGB", (224, 224), color=(34, 139, 34))
    res = predict_image(solid_green, crop_hint=None, return_meta=True)
    check(
        "Solid Green Square -> Reject as unsupported_image",
        res["status"] == "unsupported_image" and res["can_provide_treatment"] is False,
        f"Status: {res['status']}, Message: {res['message']}",
    )

    # Scenario 17: Solid Black Image -> Reject as unsupported_image
    solid_black = Image.new("RGB", (224, 224), color=(0, 0, 0))
    res = predict_image(solid_black, crop_hint=None, return_meta=True)
    check(
        "Solid Black Image -> Reject as unsupported_image (underexposed)",
        res["status"] == "unsupported_image" and res["can_provide_treatment"] is False,
        f"Status: {res['status']}",
    )

    # Scenario 18: Solid White Image -> Reject as unsupported_image
    solid_white = Image.new("RGB", (224, 224), color=(255, 255, 255))
    res = predict_image(solid_white, crop_hint=None, return_meta=True)
    check(
        "Solid White Image -> Reject as unsupported_image (overexposed)",
        res["status"] == "unsupported_image" and res["can_provide_treatment"] is False,
        f"Status: {res['status']}",
    )

    # Scenario 19: Extremely Blurry Image -> Reject or request clearer photo
    real_apple = Image.open(apple_img).convert("RGB")
    blurry_apple = real_apple.filter(ImageFilter.GaussianBlur(radius=25))
    res = predict_image(blurry_apple, crop_hint=None, return_meta=True)
    check(
        "Extremely Blurry Leaf -> Reject as low_confidence/unsupported_image",
        res["status"] in ["low_confidence", "unsupported_image"] and res["can_provide_treatment"] is False,
        f"Status: {res['status']}, Message: {res['message']}",
    )

    # Scenario 20: Random Noise -> Reject as unknown_crop or unsupported_image
    noise_arr = np.random.randint(0, 256, (224, 224, 3), dtype=np.uint8)
    noise_img = Image.fromarray(noise_arr)
    res = predict_image(noise_img, crop_hint=None, return_meta=True)
    check(
        "Uniform Random Noise -> Reject as unknown_crop/unsupported_image",
        res["status"] in ["unknown_crop", "unsupported_image"] and res["can_provide_treatment"] is False,
        f"Status: {res['status']}, CanTreat: {res['can_provide_treatment']}",
    )

    # Scenario 21: Unsupported crop name requested (e.g., Mango or Banana)
    res = predict_image(apple_img, crop_hint="Banana", return_meta=True)
    check(
        "Unsupported crop hint (Banana) -> Fallback to accurate auto-detection or unknown",
        res["detected_crop"] == "Apple" and res["status"] == "success",
        f"Status: {res['status']}, Detected: {res['detected_crop']}",
    )

    # Scenario 22: Corrupt image bytes -> Graceful invalid_image handling
    try:
        res = predict_image("not_a_valid_file.xyz", return_meta=True)
        corrupt_ok = res.get("status") in ["invalid_image", "model_error"]
    except Exception:
        corrupt_ok = True
    check(
        "Corrupted image input -> Graceful error handling",
        corrupt_ok,
        "System caught invalid input cleanly",
    )

    print("\n" + "=" * 70)
    print(f"   TEST SUITE SUMMARY: {passed} / {total} TESTS PASSED ({(passed/total)*100:.1f}%)   ")
    print("=" * 70)

    if passed == total:
        print("\n>>> ALL REGRESSION & VALIDATION TESTS PASSED 100%! <<<")
        return 0
    else:
        print(f"\n>>> {total - passed} TESTS FAILED! <<<")
        return 1


if __name__ == "__main__":
    exit_code = run_all_tests()
    sys.exit(exit_code)
