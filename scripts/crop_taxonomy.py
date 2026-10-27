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

import math

def aggregate_crop_probabilities(raw_preds, crop_hint=None, proto_sims=None):
    """
    Given raw predictions for all 50 classes (each having 'label' and 'score'):
    1. Computes total probability mass per crop: P(Crop = K) = sum_{c in K} P(c)
    2. Uses visual prototype cosine similarity (proto_sims) to identify the true botanical crop
       in Auto-Detect mode, resolving false-positive attractors (e.g. strawberry scorch vs grape).
    3. If a valid crop_hint is supplied, re-weights within that crop context.
    4. Evaluates intra-crop pathology confidence P(Disease | Crop).
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

    # Sort crops by probability mass as baseline
    sorted_crops = sorted(crop_mass.items(), key=lambda x: x[1], reverse=True)

    # 1. Determine target crop and dominant crop
    target_crop = None
    is_user_guided = False

    if crop_hint and crop_hint.lower() not in ["auto", "all", "none", ""]:
        hint_clean = crop_hint.lower().strip()
        matched_crop = next((c for c in crop_mass.keys() if hint_clean in c.lower() or c.lower() in hint_clean), None)
        if matched_crop:
            target_crop = matched_crop
            is_user_guided = True
            dominant_crop = target_crop
            dominant_crop_score = crop_mass.get(target_crop, 0.0)
            crop_scores_dict = {c: round(score, 4) for c, score in sorted_crops}
            cross_crop_ambiguous = False
            crop_margin = 1.0

    if not is_user_guided:
        if proto_sims and len(proto_sims) > 0:
            # Temperature-scaled prototype similarity for calibrated botanical crop confidence
            temp = 0.05
            exp_sims = {c: math.exp(s / temp) for c, s in proto_sims.items()}
            sum_exp = sum(exp_sims.values())
            proto_probs = {c: exp_sims[c] / sum_exp for c in proto_sims}
            sorted_proto = sorted(proto_probs.items(), key=lambda x: x[1], reverse=True)

            dominant_crop, dominant_crop_score = sorted_proto[0]
            target_crop = dominant_crop
            second_score = sorted_proto[1][1] if len(sorted_proto) > 1 else 0.0
            crop_margin = dominant_crop_score - second_score
            crop_scores_dict = {c: round(score, 4) for c, score in sorted_proto}
            cross_crop_ambiguous = (crop_margin < 0.20 and dominant_crop_score < 0.60)
        else:
            dominant_crop, dominant_crop_score = sorted_crops[0] if sorted_crops else ("Unknown", 0.0)
            second_score = sorted_crops[1][1] if len(sorted_crops) > 1 else 0.0
            target_crop = dominant_crop
            crop_margin = dominant_crop_score - second_score
            crop_scores_dict = {c: round(score, 4) for c, score in sorted_crops}
            cross_crop_ambiguous = (crop_margin < 0.25 and dominant_crop_score < 0.85)

    # 2. Disease candidates within target crop
    target_mass = crop_mass.get(target_crop, 0.0)
    crop_candidates = sorted(preds_by_crop.get(target_crop, []), key=lambda x: x["score"], reverse=True)

    if crop_candidates:
        best_candidate = crop_candidates[0]
        conditional_score = best_candidate["score"] / target_mass if target_mass > 0 else best_candidate["score"]

        best_within_crop = {
            "label": best_candidate["label"],
            "score": round(conditional_score, 4),
            "raw_score": round(best_candidate["score"], 4),
            "conditional_score": round(conditional_score, 4),
            "crop": target_crop
        }

        # Format predictions: prioritize target crop candidates normalized by target_mass
        formatted_preds = [
            {"label": p["label"], "score": round(p["score"] / target_mass, 4) if target_mass > 0 else round(p["score"], 4)}
            for p in crop_candidates
        ]
        # Append remaining predictions from other crops for fallback/transparency
        for p in raw_preds:
            if p["label"] not in [c["label"] for c in crop_candidates]:
                formatted_preds.append({"label": p["label"], "score": round(p["score"], 4)})
    else:
        flat_top = raw_preds[0] if raw_preds else {"label": "Unknown", "score": 0.0}
        best_within_crop = flat_top
        formatted_preds = [
            {"label": p["label"], "score": round(p["score"], 4)}
            for p in raw_preds[:5]
        ]

    return {
        "predictions": formatted_preds[:10],
        "allClassScores": {p["label"]: round(float(p["score"]), 4) for p in raw_preds},
        "dominantCrop": dominant_crop,
        "dominantCropScore": round(dominant_crop_score, 4),
        "targetCrop": target_crop,
        "isUserGuided": is_user_guided,
        "cropScores": crop_scores_dict,
        "isCrossCropAmbiguous": cross_crop_ambiguous,
        "cropMargin": round(crop_margin, 4),
        "disambiguatedTop": best_within_crop
    }

