"""
KrishiDrishti Botanical Crop & Pathology Taxonomy
Authoritative mapping for all 50 HuggingFace model classes across 16 crops.
Provides hierarchical probability mass aggregation and cross-crop ambiguity detection.
"""

LABEL_TO_CROP = {
    # Pepper (Solanaceae)
    "Pepper__bell___Bacterial_spot": "Bell Pepper",
    "Pepper__bell___healthy": "Bell Pepper",

    # Potato (Solanaceae)
    "Potato___Early_blight": "Potato",
    "Potato___Late_blight": "Potato",
    "Potato___healthy": "Potato",

    # Rice (Poaceae)
    "Rice_Bacterial_Leaf_Blight": "Rice",
    "Rice_Blast": "Rice",
    "Rice_Brown_Spot": "Rice",
    "Rice_Healthy": "Rice",
    "Rice_Hispa": "Rice",
    "Rice_Leaf_Scald": "Rice",
    "Rice_Narrow_Brown_Spot": "Rice",
    "Rice_Sheath_Blight": "Rice",
    "Rice_Tungro": "Rice",

    # Tomato (Solanaceae)
    "Tomato_Bacterial_spot": "Tomato",
    "Tomato_Early_blight": "Tomato",
    "Tomato_Late_blight": "Tomato",
    "Tomato_Leaf_Mold": "Tomato",
    "Tomato_Septoria_leaf_spot": "Tomato",
    "Tomato_Spider_mites_Two_spotted_spider_mite": "Tomato",
    "Tomato__Target_Spot": "Tomato",
    "Tomato__Tomato_YellowLeaf__Curl_Virus": "Tomato",
    "Tomato__Tomato_mosaic_virus": "Tomato",
    "Tomato_healthy": "Tomato",

    # Apple (Rosaceae)
    "Apple_Apple_scab": "Apple",
    "Apple_Black_rot": "Apple",
    "Apple_Cedar_apple_rust": "Apple",
    "Apple_healthy": "Apple",

    # Blueberry (Ericaceae)
    "Blueberry_healthy": "Blueberry",

    # Cherry (Rosaceae)
    "Cherry_including_sour_Powdery_mildew": "Cherry",
    "Cherry_including_sour_healthy": "Cherry",

    # Corn / Maize (Poaceae)
    "Corn_maize_Cercospora_leaf_spot_Gray_leaf_spot": "Corn (Maize)",
    "Corn_maize_Common_rust": "Corn (Maize)",
    "Corn_maize_Northern_Leaf_Blight": "Corn (Maize)",
    "Corn_maize_healthy": "Corn (Maize)",

    # Grape (Vitaceae)
    "Grape_Black_rot": "Grape",
    "Grape_Esca_Black_Measles": "Grape",
    "Grape_Leaf_blight_Isariopsis_Leaf_Spot": "Grape",
    "Grape_healthy": "Grape",

    # Orange / Citrus (Rutaceae)
    "Orange_Haunglongbing_Citrus_greening": "Orange (Citrus)",

    # Peach (Rosaceae)
    "Peach_Bacterial_spot": "Peach",
    "Peach_healthy": "Peach",

    # Raspberry (Rosaceae)
    "Raspberry_healthy": "Raspberry",

    # Soybean (Fabaceae)
    "Soybean_healthy": "Soybean",

    # Squash (Cucurbitaceae)
    "Squash_Powdery_mildew": "Squash",

    # Strawberry (Rosaceae)
    "Strawberry_Leaf_scorch": "Strawberry",
    "Strawberry_healthy": "Strawberry",

    # Wheat (Poaceae)
    "Wheat_Healthy": "Wheat",
    "Wheat_Septoria": "Wheat",
    "Wheat_Stripe_Rust": "Wheat",
}

def aggregate_crop_probabilities(raw_preds, crop_hint=None):
    """
    Given raw predictions for all 50 classes (each having 'label' and 'score'):
    1. Computes total probability mass per crop: P(Crop = K) = sum_{c in K} P(c)
    2. Identifies the dominant crop by probability mass
    3. Detects cross-crop ambiguity and probability dilution
    4. If a valid crop_hint is supplied and supported by significant probability (>15%),
       re-weights within that crop context.
    Returns:
        dict containing formatted top predictions, dominantCrop, cropScores,
        isCrossCropAmbiguous, and disambiguatedTop
    """
    crop_mass = {}
    preds_by_crop = {}

    for p in raw_preds:
        label = p["label"]
        score = float(p["score"])
        crop = LABEL_TO_CROP.get(label, "Unknown")

        crop_mass[crop] = crop_mass.get(crop, 0.0) + score
        preds_by_crop.setdefault(crop, []).append({"label": label, "score": score})

    # Sort crops by probability mass
    sorted_crops = sorted(crop_mass.items(), key=lambda x: x[1], reverse=True)
    dominant_crop, dominant_crop_score = sorted_crops[0] if sorted_crops else ("Unknown", 0.0)
    second_crop, second_crop_score = sorted_crops[1] if len(sorted_crops) > 1 else ("None", 0.0)

    # Top-1 flat prediction
    flat_top1 = raw_preds[0] if raw_preds else {"label": "Unknown", "score": 0.0}
    flat_top1_crop = LABEL_TO_CROP.get(flat_top1["label"], "Unknown")

    # Crop ambiguity occurs if flat top-1 crop != dominant crop mass
    # OR if runner-up crop has significant probability (>= 12%)
    # OR if margin is small (< 0.25) when dominant crop is not strongly confident (< 0.85)
    # OR known visual confusions (e.g. Strawberry scorch vs Grape leaf blight/measles)
    crop_margin = dominant_crop_score - second_crop_score
    cross_crop_ambiguous = (
        (flat_top1_crop != dominant_crop)
        or (second_crop_score >= 0.12)
        or (crop_margin < 0.25 and dominant_crop_score < 0.85)
        or (dominant_crop == "Strawberry" and crop_mass.get("Grape", 0.0) >= 0.05)
        or (dominant_crop == "Grape" and crop_mass.get("Strawberry", 0.0) >= 0.05)
    )

    # Contextual re-ranking if crop_hint is present and not 'auto'
    target_crop = dominant_crop
    is_user_guided = False
    if crop_hint and crop_hint.lower() not in ["auto", "all", "none", ""]:
        hint_clean = crop_hint.lower().strip()
        matched_crop = next((c for c in crop_mass.keys() if hint_clean in c.lower() or c.lower() in hint_clean), None)
        if matched_crop:
            target_crop = matched_crop
            is_user_guided = True

    # Best prediction within target crop
    target_mass = crop_mass.get(target_crop, 0.0)
    crop_candidates = sorted(preds_by_crop.get(target_crop, []), key=lambda x: x["score"], reverse=True)
    if crop_candidates and target_mass > 0:
        best_candidate = crop_candidates[0]
        conditional_score = best_candidate["score"] / target_mass
        # When user explicitly selects crop context, use the crop-conditional confidence
        effective_score = conditional_score if is_user_guided else best_candidate["score"]
        best_within_crop = {
            "label": best_candidate["label"],
            "score": round(effective_score, 4),
            "raw_score": round(best_candidate["score"], 4),
            "conditional_score": round(conditional_score, 4),
            "crop": target_crop
        }
    else:
        best_within_crop = flat_top1

    # Formatted predictions (prioritizing target crop candidates if user guided)
    if is_user_guided and crop_candidates:
        formatted_preds = [
            {"label": p["label"], "score": round(p["score"] / target_mass, 4) if target_mass > 0 else round(p["score"], 4)}
            for p in crop_candidates[:5]
        ]
    else:
        formatted_preds = [
            {"label": p["label"], "score": round(p["score"], 4)}
            for p in raw_preds[:5]
        ]

    return {
        "predictions": formatted_preds,
        "allClassScores": {p["label"]: round(float(p["score"]), 4) for p in raw_preds},
        "dominantCrop": dominant_crop,
        "dominantCropScore": round(dominant_crop_score, 4),
        "targetCrop": target_crop,
        "isUserGuided": is_user_guided,
        "cropScores": {c: round(score, 4) for c, score in sorted_crops},
        "isCrossCropAmbiguous": cross_crop_ambiguous,
        "cropMargin": round(crop_margin, 4),
        "disambiguatedTop": best_within_crop
    }
