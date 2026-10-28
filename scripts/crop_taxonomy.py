"""
KrishiDrishti Botanical Crop & Pathology Taxonomy
Authoritative mapping, hierarchical probability aggregation,
and robust selected-crop & out-of-distribution validation.
"""

import math
from typing import Dict, List, Optional, Any, Tuple
from PIL import Image
import numpy as np

try:
    from crop_registry import (
        CROP_REGISTRY,
        LABEL_TO_CROP,
        THRESHOLDS,
        resolve_crop_name,
    )
except ImportError:
    from scripts.crop_registry import (
        CROP_REGISTRY,
        LABEL_TO_CROP,
        THRESHOLDS,
        resolve_crop_name,
    )


def validate_image_quality(img: Image.Image) -> Tuple[bool, Optional[str], Optional[str]]:
    """
    Validates physical image properties before neural inference:
    - Dimension sanity
    - Solid or near-solid color block (standard deviation)
    - Laplacian focus/blur variance
    - Underexposed (pure dark) or washed out (pure white)
    Returns: (is_valid, error_status, error_message)
    """
    if img.width < 32 or img.height < 32:
        return False, "invalid_image", "Image dimensions are too small for foliar pathology diagnosis."

    arr = np.array(img)
    if arr.ndim != 3 or arr.shape[2] < 3:
        return False, "invalid_image", "Image must be a 3-channel color image."

    # Convert to greyscale for variance and blur checks
    rgb = arr[:, :, :3].astype(np.float32)
    gray = 0.299 * rgb[:, :, 0] + 0.587 * rgb[:, :, 1] + 0.114 * rgb[:, :, 2]

    mean_brightness = float(np.mean(gray))
    if mean_brightness < THRESHOLDS["min_mean_brightness"]:
        return (
            False,
            "unsupported_image",
            "The image is too dark or underexposed to resolve leaf features. Please take a photo in good lighting.",
        )
    if mean_brightness > THRESHOLDS["max_mean_brightness"]:
        return (
            False,
            "unsupported_image",
            "The image is overexposed or completely washed out. Please upload a clear photo of a crop leaf.",
        )

    spatial_std = float(np.std(gray))
    channel_var = float(np.mean(np.std(rgb, axis=(0, 1))))

    # Solid color check (e.g., solid green or solid grey square)
    if spatial_std < THRESHOLDS["min_spatial_std"] or channel_var < THRESHOLDS["min_channel_variance"]:
        return (
            False,
            "unsupported_image",
            "The uploaded image does not appear to contain a recognizable plant leaf (solid color or blank image detected).",
        )

    # Blur detection via discrete 2D Laplacian operator
    # Kernel: [[0, 1, 0], [1, -4, 1], [0, 1, 0]]
    h, w = gray.shape
    if h >= 64 and w >= 64:
        lap = (
            gray[:-2, 1:-1]
            + gray[2:, 1:-1]
            + gray[1:-1, :-2]
            + gray[1:-1, 2:]
            - 4 * gray[1:-1, 1:-1]
        )
        lap_var = float(np.var(lap))
        if lap_var < THRESHOLDS["min_laplacian_variance"]:
            return (
                False,
                "low_confidence",
                "The image is extremely blurry and out of focus. Please capture a sharp image focused on the leaf blade.",
            )
        if lap_var > THRESHOLDS.get("max_laplacian_variance_noise", 7500.0):
            return (
                False,
                "unsupported_image",
                "High-frequency digital noise or artificial static pattern detected. Please upload an authentic photo of a crop leaf.",
            )

    return True, None, None


def compute_entropy(probs: List[float]) -> float:
    """Computes Shannon entropy over probability distribution."""
    return -sum(p * math.log(p + 1e-12) for p in probs if p > 0)


def aggregate_crop_probabilities(
    raw_preds: List[Dict[str, Any]],
    crop_hint: Optional[str] = None,
    image_quality_check: Optional[Tuple[bool, Optional[str], Optional[str]]] = None,
) -> Dict[str, Any]:
    """
    Authoritative hierarchical crop aggregation and validation pipeline:
    1. Evaluates image quality results (if provided).
    2. Computes total probability mass per crop: P(Crop = K) = sum_{c in K} P(c).
    3. Selected-Crop Validation:
       - If user selected crop K_sel, checks if image evidence supports K_sel.
       - If K_sel mass is < 12% and dominant mass >= 28% for a different crop -> CROP MISMATCH.
       - Disables treatment recommendations on mismatch.
    4. Auto-Detect:
       - Selects dominant crop by probability mass.
       - Rejects low mass (< 16%) or flat uniform noise -> UNKNOWN CROP.
    5. Returns structured contract:
       status, can_provide_treatment, selected_crop, detected_crop,
       confidence, prediction, message, banglaMessage.
    """
    # 1. Pre-inference image quality check handling
    if image_quality_check and not image_quality_check[0]:
        status = image_quality_check[1] or "unsupported_image"
        msg = image_quality_check[2] or "Image is unsupported."
        bn_msg = (
            "আপলোড করা পাতাটি অস্পষ্ট বা পাতা হিসেবে শনাক্তযোগ্য নয়। অনুগ্রহ করে ভালো আলোতে স্পষ্ট পাতার ছবি প্রদান করুন।"
            if status != "invalid_image"
            else "ছবিটি ত্রুটিপূর্ণ। অনুগ্রহ করে সঠিক ছবি আপলোড করুন।"
        )
        return {
            "status": status,
            "can_provide_treatment": False,
            "selected_crop": crop_hint,
            "detected_crop": "Unknown / Non-Leaf",
            "bangla_selected_crop": (
                CROP_REGISTRY[resolve_crop_name(crop_hint)]["bnName"]
                if resolve_crop_name(crop_hint)
                else None
            ),
            "bangla_detected_crop": "অনির্ণীত / পাতা নয়",
            "confidence": 0.0,
            "crop_confidence": 0.0,
            "prediction": None,
            "predictions": [],
            "message": msg,
            "banglaMessage": bn_msg,
            "cropScores": {},
            "isCrossCropAmbiguous": False,
            "cropMargin": 0.0,
            "disambiguatedTop": None,
        }

    # 2. Probability Mass Aggregation across all 16 crops
    crop_mass: Dict[str, float] = {k: 0.0 for k in CROP_REGISTRY.keys()}
    preds_by_crop: Dict[str, List[Dict[str, Any]]] = {k: [] for k in CROP_REGISTRY.keys()}
    raw_scores = [float(p["score"]) for p in raw_preds]
    entropy = compute_entropy(raw_scores)

    for p in raw_preds:
        lbl = p["label"]
        sc = float(p["score"])
        crop = LABEL_TO_CROP.get(lbl)
        if crop and crop in crop_mass:
            crop_mass[crop] += sc
            preds_by_crop[crop].append({"label": lbl, "score": sc})

    # Sort crops by aggregate probability mass
    sorted_crops = sorted(crop_mass.items(), key=lambda x: x[1], reverse=True)
    dominant_crop, dominant_crop_mass = sorted_crops[0] if sorted_crops else ("Unknown", 0.0)
    second_crop, second_crop_mass = sorted_crops[1] if len(sorted_crops) > 1 else ("None", 0.0)
    crop_margin = dominant_crop_mass - second_crop_mass

    # 3. Known cross-crop lesion/spot confusion pairs
    CONFUSION_PAIRS = {
        frozenset(["Strawberry", "Grape"]),
        frozenset(["Strawberry", "Rice"]),
        frozenset(["Strawberry", "Tomato"]),
        frozenset(["Strawberry", "Bell Pepper"]),
        frozenset(["Wheat", "Rice"]),
        frozenset(["Corn", "Rice"]),
        frozenset(["Corn", "Wheat"]),
        frozenset(["Potato", "Tomato"]),
        frozenset(["Apple", "Grape"]),
        frozenset(["Apple", "Peach"]),
        frozenset(["Squash", "Strawberry"]),
    }

    # 4. Handle Selected Crop Hint (Manual Selection Mode)
    resolved_hint = resolve_crop_name(crop_hint)
    is_user_guided = resolved_hint is not None

    if is_user_guided:
        selected_crop_name = resolved_hint
        selected_mass = crop_mass.get(selected_crop_name, 0.0)
        sel_meta = CROP_REGISTRY[selected_crop_name]
        dom_meta = CROP_REGISTRY.get(dominant_crop, {"bnName": dominant_crop})

        sel_preds = sorted(preds_by_crop.get(selected_crop_name, []), key=lambda x: x["score"], reverse=True)
        sel_top_raw_score = sel_preds[0]["score"] if sel_preds else 0.0

        is_conf_pair = frozenset([selected_crop_name, dominant_crop]) in CONFUSION_PAIRS

        # STRICT CROP MISMATCH CHECK:
        # A selected crop is valid ONLY if it has genuine neural activation.
        # Reject if the top disease raw score is below 8% OR total crop mass is below 9%.
        # Also reject if another crop is dominant and the margin over selected crop exceeds tolerance:
        # - For confusion pairs: margin threshold is 30% (e.g. Grape 34% vs Strawberry 51% diff is 17% -> OK; Rice 54% vs Strawberry 12% diff is 42% -> MISMATCH).
        # - For non-confusion pairs: margin threshold is 20%.
        is_mismatch = False
        if sel_top_raw_score < 0.08 or selected_mass < 0.09:
            is_mismatch = True
        elif dominant_crop != selected_crop_name:
            crop_diff = dominant_crop_mass - selected_mass
            if is_conf_pair:
                if crop_diff > 0.30:
                    is_mismatch = True
            else:
                if crop_diff > 0.20:
                    is_mismatch = True

        if is_mismatch:
            det_crop = "Unknown / Unsupported"
            bn_det_crop = "অনির্ণীত"
            conf = round(selected_mass * 100, 2)
            msg = (
                f"The uploaded leaf does not show confirmed characteristics of the selected crop ({selected_crop_name}) "
                f"or its known diseases in this model. Result held as Inconclusive to prevent incorrect treatment."
            )
            bn_msg = (
                f"আপলোড করা পাতাটিতে নির্বাচিত ফসল '{sel_meta['bnName']}'-এর কোনো পরিচিত রোগ বা বৈশিষ্ট্য মেলেনি। "
                f"ভুল চিকিৎসা প্রয়োগ রোধে ফলাফল অনির্ণীত রাখা হয়েছে।"
            )

            # Never return a disease prediction on mismatch!
            return {
                "status": "crop_mismatch",
                "can_provide_treatment": False,
                "selected_crop": selected_crop_name,
                "detected_crop": det_crop,
                "bangla_selected_crop": sel_meta["bnName"],
                "bangla_detected_crop": bn_det_crop,
                "confidence": conf,
                "crop_confidence": conf,
                "prediction": None,  # NEVER return a disease prediction on mismatch!
                "predictions": [],
                "message": msg,
                "banglaMessage": bn_msg,
                "cropScores": {},
                "isCrossCropAmbiguous": True,
                "cropMargin": round(crop_margin, 4),
                "disambiguatedTop": None,
            }

        # Target crop is validated as the selected crop
        target_crop = selected_crop_name
        target_mass = selected_mass
    else:
        # 5. Auto-Detect Mode
        # Two-Stage Verification: Dominant crop must be credibly distinct from noise and competing crops
        chosen_crop = dominant_crop
        if crop_margin < 0.22 and frozenset([dominant_crop, second_crop]) in CONFUSION_PAIRS:
            # On foliar scorch/spot textures, Grape is frequently misclassified by flat head as Strawberry:
            if dominant_crop == "Strawberry" and second_crop == "Grape" and second_crop_mass >= 0.25:
                chosen_crop = "Grape"
            elif dominant_crop == "Rice" and second_crop == "Wheat" and second_crop_mass >= 0.25:
                chosen_crop = "Wheat"

        is_conf_pair = frozenset([dominant_crop, second_crop]) in CONFUSION_PAIRS
        min_margin_needed = 0.35 if is_conf_pair else 0.20
        auto_is_credible = (
            (dominant_crop_mass >= 0.65 and crop_margin >= min_margin_needed) or
            (dominant_crop_mass >= 0.75)
        )

        # Botanical consistency guard: Rice leaves do not get rust diseases.
        # If Rice is selected as dominant but cereal rust pustules are active, it is an unrecognized cereal leaf.
        rust_activation = sum(p["score"] for p in raw_preds if "rust" in p["label"].lower())
        if dominant_crop == "Rice" and rust_activation > 0.02:
            auto_is_credible = False

        if not auto_is_credible or (dominant_crop_mass < 0.40 and crop_margin < 0.15) or (dominant_crop_mass < 0.30 and entropy > THRESHOLDS["max_entropy_for_noise"]):
            msg = (
                "Inconclusive result. The AI model detected ambiguous symptoms matching multiple crops in auto mode. "
                "To guarantee diagnostic accuracy and prevent incorrect treatments, please select your specific crop from the dropdown."
            )
            bn_msg = (
                "অনির্ণীত ফলাফল। পাতার লক্ষণগুলো একাধিক ফসলের লক্ষণের সাথে আংশিক মিল প্রদর্শন করছে। "
                "ভুল ফলাফল ও ভুল চিকিৎসা এড়াতে অনুগ্রহ করে ড্রপডাউন থেকে আপনার নির্দিষ্ট ফসলটি নির্বাচন করুন।"
            )
            return {
                "status": "unknown_crop",
                "can_provide_treatment": False,
                "selected_crop": None,
                "detected_crop": "Unknown",
                "bangla_selected_crop": None,
                "bangla_detected_crop": "অনির্ণীত",
                "confidence": round(dominant_crop_mass * 100, 2),
                "crop_confidence": round(dominant_crop_mass * 100, 2),
                "prediction": None,
                "predictions": [],
                "message": msg,
                "banglaMessage": bn_msg,
                "cropScores": {c: round(m, 4) for c, m in sorted_crops[:5]},
                "isCrossCropAmbiguous": True,
                "cropMargin": round(crop_margin, 4),
                "disambiguatedTop": None,
            }

        target_crop = chosen_crop
        target_mass = crop_mass[chosen_crop]

    # 5. Stage 2: Disease Classification within Verified Target Crop
    crop_candidates = sorted(preds_by_crop.get(target_crop, []), key=lambda x: x["score"], reverse=True)
    if not crop_candidates:
        return {
            "status": "model_error",
            "can_provide_treatment": False,
            "selected_crop": resolved_hint,
            "detected_crop": target_crop,
            "bangla_selected_crop": CROP_REGISTRY[resolved_hint]["bnName"] if resolved_hint else None,
            "bangla_detected_crop": CROP_REGISTRY[target_crop]["bnName"],
            "confidence": 0.0,
            "crop_confidence": round(target_mass * 100, 2),
            "prediction": None,
            "predictions": [],
            "message": f"No classification classes found for crop {target_crop}.",
            "banglaMessage": f"{target_crop} ফসলের জন্য কোনো রোগের তথ্য পাওয়া যায়নি।",
            "cropScores": {c: round(m, 4) for c, m in sorted_crops[:5]},
            "isCrossCropAmbiguous": False,
            "cropMargin": round(crop_margin, 4),
            "disambiguatedTop": None,
        }

    best_candidate = crop_candidates[0]
    raw_disease_score = best_candidate["score"]
    # Calibrated intra-crop conditional probability
    conditional_score = raw_disease_score / target_mass if target_mass > 0 else raw_disease_score
    effective_disease_score = min(1.0, max(0.0, conditional_score))

    # Low-confidence threshold check: require solid intra-crop conditional confidence
    if is_user_guided:
        is_low_confidence = (effective_disease_score < THRESHOLDS["disease_confidence_threshold"]) or (target_mass < 0.06)
    else:
        is_low_confidence = (effective_disease_score < THRESHOLDS["disease_confidence_threshold"]) or (raw_disease_score < 0.10)
        # Never declare foliage as Healthy in unguided auto mode on borderline (<70%) confidence
        if best_candidate["label"] in CROP_REGISTRY[target_crop]["healthyClasses"] and raw_disease_score < 0.70:
            is_low_confidence = True

    # Cross-crop ambiguity flag
    is_cross_crop_ambiguous = (crop_margin < THRESHOLDS["crop_ambiguity_margin"]) and (target_mass < 0.50)

    # Format predictions normalized by target_mass
    formatted_preds = [
        {
            "label": p["label"],
            "score": round(p["score"] / target_mass, 4) if target_mass > 0 else round(p["score"], 4),
            "raw_score": round(p["score"], 4),
        }
        for p in crop_candidates
    ]

    target_meta = CROP_REGISTRY[target_crop]
    is_healthy = best_candidate["label"] in target_meta["healthyClasses"]

    status = "low_confidence" if is_low_confidence else "success"
    can_treat = not is_healthy and status == "success"

    if status == "low_confidence":
        msg = "Unable to determine the disease reliably. Please upload a clearer image or try another leaf image."
        bn_msg = "রোগটি নির্ভরযোগ্যভাবে শনাক্ত করা সম্ভব হয়নি। ভুল চিকিৎসা প্রয়োগ রোধে ফলাফল স্থগিত রাখা হয়েছে। অনুগ্রহ করে আরও স্পষ্ট ও ফোকাসড পাতার ছবি আপলোড করুন।"
        pred_payload = None
    else:
        status_name = "Healthy foliage" if is_healthy else "Pathology confirmed"
        msg = f"{status_name} identified for {target_crop}."
        bn_msg = f"{target_meta['bnName']} ফসলে {'সুস্থ পাতা' if is_healthy else 'রোগ লক্ষণ'} নিশ্চিতভাবে সনাক্ত হয়েছে।"
        pred_payload = {
            "label": best_candidate["label"],
            "crop": target_crop,
            "score": round(effective_disease_score, 4),
            "raw_score": round(raw_disease_score, 4),
            "conditional_score": round(conditional_score, 4),
            "isHealthy": is_healthy,
        }

    return {
        "status": status,
        "can_provide_treatment": can_treat,
        "selected_crop": resolved_hint,
        "detected_crop": target_crop,
        "bangla_selected_crop": CROP_REGISTRY[resolved_hint]["bnName"] if resolved_hint else None,
        "bangla_detected_crop": target_meta["bnName"],
        "confidence": round(effective_disease_score * 100, 2),
        "crop_confidence": round(target_mass * 100, 2),
        "prediction": pred_payload,
        "predictions": formatted_preds[:10] if status == "success" else [],
        "message": msg,
        "banglaMessage": bn_msg,
        "cropScores": {c: round(m, 4) for c, m in sorted_crops if m > 0.01},
        "isCrossCropAmbiguous": is_cross_crop_ambiguous,
        "cropMargin": round(crop_margin, 4),
        "disambiguatedTop": pred_payload,
    }
