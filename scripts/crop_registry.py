"""
KrishiDrishti Authoritative Crop & Model Registry
Centralized specification for all 16 supported crops, 50 classes (ConvNeXt ripro805/krishidrishti-plant-disease),
preprocessing parameters, thresholds, and validation rules.
"""

from typing import Dict, List, Any, Optional

MODEL_SPEC = {
    "model_id": "ripro805/krishidrishti-plant-disease",
    "pinned_revision": None,
    "framework": "PyTorch / HuggingFace Transformers",
    "architecture": "ConvNextForImageClassification (facebook/convnext-tiny)",
    "input_resolution": (224, 224),
    "color_channels": "RGB",
    "crop_pct": 0.875,
    "image_mean": [0.485, 0.456, 0.406],
    "image_std": [0.229, 0.224, 0.225],
    "total_classes": 50,
    "total_crops": 16,
}

# Calibrated Thresholds for Multi-Crop Vision
THRESHOLDS = {
    "crop_candidate_min_mass": 0.10,
    "selected_crop_acceptance_threshold": 0.25,
    "mismatch_dominant_trigger_mass": 0.22,
    "auto_detect_min_crop_mass": 0.35,
    "auto_detect_min_margin": 0.12,
    "disease_confidence_threshold": 0.35,
    "crop_ambiguity_margin": 0.10,
    "min_laplacian_variance": 14.0,
    "max_laplacian_variance_noise": 7500.0,
    "min_spatial_std": 10.0,
    "min_channel_variance": 5.0,
    "min_mean_brightness": 12.0,
    "max_mean_brightness": 248.0,
    "max_entropy_for_noise": 3.40,
}

CROP_REGISTRY: Dict[str, Dict[str, Any]] = {
    "Apple": {
        "id": "Apple",
        "name": "Apple",
        "bnName": "আপেল",
        "family": "Rosaceae",
        "icon": "🍎",
        "classes": [
            "Apple_Apple_scab",
            "Apple_Black_rot",
            "Apple_Cedar_apple_rust",
            "Apple_healthy",
        ],
        "healthyClasses": ["Apple_healthy", "Apple___healthy"],
        "diseaseClasses": [
            "Apple_Apple_scab",
            "Apple_Black_rot",
            "Apple_Cedar_apple_rust",
            "Apple___Apple_scab",
            "Apple___Black_rot",
            "Apple___Cedar_apple_rust",
        ],
        "cropThreshold": 0.10,
    },
    "Bell Pepper": {
        "id": "Bell Pepper",
        "name": "Bell Pepper",
        "bnName": "মরিচ",
        "family": "Solanaceae",
        "icon": "🫑",
        "classes": [
            "Pepper__bell___Bacterial_spot",
            "Pepper__bell___healthy",
        ],
        "healthyClasses": ["Pepper__bell___healthy", "Pepper_bell_healthy"],
        "diseaseClasses": ["Pepper__bell___Bacterial_spot", "Pepper_bell_Bacterial_spot"],
        "cropThreshold": 0.10,
    },
    "Blueberry": {
        "id": "Blueberry",
        "name": "Blueberry",
        "bnName": "ব্লুবেরি",
        "family": "Ericaceae",
        "icon": "🫐",
        "classes": ["Blueberry_healthy"],
        "healthyClasses": ["Blueberry_healthy", "Blueberry___healthy"],
        "diseaseClasses": [],
        "cropThreshold": 0.10,
    },
    "Cherry": {
        "id": "Cherry",
        "name": "Cherry",
        "bnName": "চেরি",
        "family": "Rosaceae",
        "icon": "🍒",
        "classes": [
            "Cherry_including_sour_Powdery_mildew",
            "Cherry_including_sour_healthy",
        ],
        "healthyClasses": ["Cherry_including_sour_healthy", "Cherry_(including_sour)___healthy"],
        "diseaseClasses": [
            "Cherry_including_sour_Powdery_mildew",
            "Cherry_(including_sour)___Powdery_mildew",
        ],
        "cropThreshold": 0.10,
    },
    "Corn (Maize)": {
        "id": "Corn (Maize)",
        "name": "Corn (Maize)",
        "bnName": "ভুট্টা",
        "family": "Poaceae",
        "icon": "🌽",
        "classes": [
            "Corn_maize_Cercospora_leaf_spot_Gray_leaf_spot",
            "Corn_maize_Common_rust",
            "Corn_maize_Northern_Leaf_Blight",
            "Corn_maize_healthy",
        ],
        "healthyClasses": ["Corn_maize_healthy", "Corn_(maize)___healthy"],
        "diseaseClasses": [
            "Corn_maize_Cercospora_leaf_spot_Gray_leaf_spot",
            "Corn_maize_Common_rust",
            "Corn_maize_Northern_Leaf_Blight",
            "Corn_(maize)___Cercospora_leaf_spot_Gray_leaf_spot",
            "Corn_(maize)___Common_rust",
            "Corn_(maize)___Northern_Leaf_Blight",
        ],
        "cropThreshold": 0.10,
    },
    "Grape": {
        "id": "Grape",
        "name": "Grape",
        "bnName": "আঙ্গুর",
        "family": "Vitaceae",
        "icon": "🍇",
        "classes": [
            "Grape_Black_rot",
            "Grape_Esca_Black_Measles",
            "Grape_Leaf_blight_Isariopsis_Leaf_Spot",
            "Grape_healthy",
        ],
        "healthyClasses": ["Grape_healthy", "Grape___healthy"],
        "diseaseClasses": [
            "Grape_Black_rot",
            "Grape_Esca_Black_Measles",
            "Grape_Leaf_blight_Isariopsis_Leaf_Spot",
            "Grape___Black_rot",
            "Grape___Esca_(Black_Measles)",
            "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)",
        ],
        "cropThreshold": 0.10,
    },
    "Orange (Citrus)": {
        "id": "Orange (Citrus)",
        "name": "Orange (Citrus)",
        "bnName": "লেবু/কমলা",
        "family": "Rutaceae",
        "icon": "🍋",
        "classes": [
            "Orange_Haunglongbing_Citrus_greening",
        ],
        "healthyClasses": [],
        "diseaseClasses": [
            "Orange_Haunglongbing_Citrus_greening",
            "Orange___Haunglongbing_(Citrus_greening)",
        ],
        "cropThreshold": 0.10,
    },
    "Peach": {
        "id": "Peach",
        "name": "Peach",
        "bnName": "পিচ",
        "family": "Rosaceae",
        "icon": "🍑",
        "classes": [
            "Peach_Bacterial_spot",
            "Peach_healthy",
        ],
        "healthyClasses": ["Peach_healthy", "Peach___healthy"],
        "diseaseClasses": ["Peach_Bacterial_spot", "Peach___Bacterial_spot"],
        "cropThreshold": 0.10,
    },
    "Potato": {
        "id": "Potato",
        "name": "Potato",
        "bnName": "আলু",
        "family": "Solanaceae",
        "icon": "🥔",
        "classes": [
            "Potato___Early_blight",
            "Potato___Late_blight",
            "Potato___healthy",
        ],
        "healthyClasses": ["Potato___healthy", "Potato_healthy"],
        "diseaseClasses": [
            "Potato___Early_blight",
            "Potato___Late_blight",
            "Potato_Early_blight",
            "Potato_Late_blight",
        ],
        "cropThreshold": 0.10,
    },
    "Raspberry": {
        "id": "Raspberry",
        "name": "Raspberry",
        "bnName": "র‍্যাস্পবেরি",
        "family": "Rosaceae",
        "icon": "🫐",
        "classes": ["Raspberry_healthy"],
        "healthyClasses": ["Raspberry_healthy", "Raspberry___healthy"],
        "diseaseClasses": [],
        "cropThreshold": 0.10,
    },
    "Rice": {
        "id": "Rice",
        "name": "Rice",
        "bnName": "ধান",
        "family": "Poaceae",
        "icon": "🌾",
        "classes": [
            "Rice_Bacterial_Leaf_Blight",
            "Rice_Blast",
            "Rice_Brown_Spot",
            "Rice_Healthy",
            "Rice_Hispa",
            "Rice_Leaf_Scald",
            "Rice_Narrow_Brown_Spot",
            "Rice_Sheath_Blight",
            "Rice_Tungro",
        ],
        "healthyClasses": ["Rice_Healthy"],
        "diseaseClasses": [
            "Rice_Bacterial_Leaf_Blight",
            "Rice_Blast",
            "Rice_Brown_Spot",
            "Rice_Hispa",
            "Rice_Leaf_Scald",
            "Rice_Narrow_Brown_Spot",
            "Rice_Sheath_Blight",
            "Rice_Tungro",
        ],
        "cropThreshold": 0.10,
    },
    "Soybean": {
        "id": "Soybean",
        "name": "Soybean",
        "bnName": "সয়াবিন",
        "family": "Fabaceae",
        "icon": "🫘",
        "classes": ["Soybean_healthy"],
        "healthyClasses": ["Soybean_healthy", "Soybean___healthy"],
        "diseaseClasses": [],
        "cropThreshold": 0.10,
    },
    "Squash": {
        "id": "Squash",
        "name": "Squash",
        "bnName": "মিষ্টি কুমড়া",
        "family": "Cucurbitaceae",
        "icon": "🎃",
        "classes": ["Squash_Powdery_mildew"],
        "healthyClasses": [],
        "diseaseClasses": ["Squash_Powdery_mildew", "Squash___Powdery_mildew"],
        "cropThreshold": 0.10,
    },
    "Strawberry": {
        "id": "Strawberry",
        "name": "Strawberry",
        "bnName": "স্ট্রবেরি",
        "family": "Rosaceae",
        "icon": "🍓",
        "classes": [
            "Strawberry_Leaf_scorch",
            "Strawberry_healthy",
        ],
        "healthyClasses": ["Strawberry_healthy", "Strawberry___healthy"],
        "diseaseClasses": ["Strawberry_Leaf_scorch", "Strawberry___Leaf_scorch"],
        "cropThreshold": 0.10,
    },
    "Tomato": {
        "id": "Tomato",
        "name": "Tomato",
        "bnName": "টমেটো",
        "family": "Solanaceae",
        "icon": "🍅",
        "classes": [
            "Tomato_Bacterial_spot",
            "Tomato_Early_blight",
            "Tomato_Late_blight",
            "Tomato_Leaf_Mold",
            "Tomato_Septoria_leaf_spot",
            "Tomato_Spider_mites_Two_spotted_spider_mite",
            "Tomato__Target_Spot",
            "Tomato__Tomato_YellowLeaf__Curl_Virus",
            "Tomato__Tomato_mosaic_virus",
            "Tomato_healthy",
        ],
        "healthyClasses": ["Tomato_healthy", "Tomato___healthy"],
        "diseaseClasses": [
            "Tomato_Bacterial_spot",
            "Tomato_Early_blight",
            "Tomato_Late_blight",
            "Tomato_Leaf_Mold",
            "Tomato_Septoria_leaf_spot",
            "Tomato_Spider_mites_Two_spotted_spider_mite",
            "Tomato__Target_Spot",
            "Tomato__Tomato_YellowLeaf__Curl_Virus",
            "Tomato__Tomato_mosaic_virus",
            "Tomato___Bacterial_spot",
            "Tomato___Early_blight",
            "Tomato___Late_blight",
            "Tomato___Leaf_Mold",
            "Tomato___Septoria_leaf_spot",
            "Tomato___Spider_mites_Two-spotted_spider_mite",
            "Tomato___Target_Spot",
            "Tomato___Tomato_Yellow_Leaf_Curl_Virus",
            "Tomato___Tomato_mosaic_virus",
        ],
        "cropThreshold": 0.10,
    },
    "Wheat": {
        "id": "Wheat",
        "name": "Wheat",
        "bnName": "গম",
        "family": "Poaceae",
        "icon": "🌾",
        "classes": [
            "Wheat_Healthy",
            "Wheat_Septoria",
            "Wheat_Stripe_Rust",
        ],
        "healthyClasses": ["Wheat_Healthy", "Wheat_HealthyLeaf"],
        "diseaseClasses": [
            "Wheat_Septoria",
            "Wheat_Stripe_Rust",
            "Wheat_BlackPoint",
            "Wheat_FusariumFootRot",
            "Wheat_LeafBlight",
            "Wheat_WheatBlast",
        ],
        "cropThreshold": 0.10,
    },
}

# Build primary inverted Label-to-Crop map
LABEL_TO_CROP: Dict[str, str] = {}
for crop_name, entry in CROP_REGISTRY.items():
    for cls_name in entry["classes"]:
        LABEL_TO_CROP[cls_name] = crop_name

# Add comprehensive aliases (triple underscore, paren variations, and v2 names)
ALIASES = {
    # Apple
    "Apple___Apple_scab": "Apple",
    "Apple___Black_rot": "Apple",
    "Apple___Cedar_apple_rust": "Apple",
    "Apple___healthy": "Apple",
    # Blueberry
    "Blueberry___healthy": "Blueberry",
    # Cherry
    "Cherry_(including_sour)___Powdery_mildew": "Cherry",
    "Cherry_(including_sour)___healthy": "Cherry",
    # Corn
    "Corn_(maize)___Cercospora_leaf_spot_Gray_leaf_spot": "Corn (Maize)",
    "Corn_(maize)___Common_rust": "Corn (Maize)",
    "Corn_(maize)___Northern_Leaf_Blight": "Corn (Maize)",
    "Corn_(maize)___healthy": "Corn (Maize)",
    # Grape
    "Grape___Black_rot": "Grape",
    "Grape___Esca_(Black_Measles)": "Grape",
    "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)": "Grape",
    "Grape___healthy": "Grape",
    # Orange
    "Orange___Haunglongbing_(Citrus_greening)": "Orange (Citrus)",
    # Peach
    "Peach___Bacterial_spot": "Peach",
    "Peach___healthy": "Peach",
    # Potato
    "Potato_Early_blight": "Potato",
    "Potato_Late_blight": "Potato",
    "Potato_healthy": "Potato",
    # Raspberry
    "Raspberry___healthy": "Raspberry",
    # Soybean
    "Soybean___healthy": "Soybean",
    # Squash
    "Squash___Powdery_mildew": "Squash",
    # Strawberry
    "Strawberry___Leaf_scorch": "Strawberry",
    "Strawberry___healthy": "Strawberry",
    # Tomato
    "Tomato___Bacterial_spot": "Tomato",
    "Tomato___Early_blight": "Tomato",
    "Tomato___Late_blight": "Tomato",
    "Tomato___Leaf_Mold": "Tomato",
    "Tomato___Septoria_leaf_spot": "Tomato",
    "Tomato___Spider_mites_Two-spotted_spider_mite": "Tomato",
    "Tomato___Target_Spot": "Tomato",
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus": "Tomato",
    "Tomato___Tomato_mosaic_virus": "Tomato",
    "Tomato___healthy": "Tomato",
    # Wheat
    "Wheat_HealthyLeaf": "Wheat",
    "Wheat_LeafBlight": "Wheat",
    "Wheat_WheatBlast": "Wheat",
    "Wheat_FusariumFootRot": "Wheat",
    "Wheat_BlackPoint": "Wheat",
}
for k, v in ALIASES.items():
    if k not in LABEL_TO_CROP:
        LABEL_TO_CROP[k] = v


def resolve_crop_name(name_or_alias: Optional[str]) -> Optional[str]:
    """Resolves arbitrary user crop input (Bangla, English, alias) to canonical registry crop ID."""
    if not name_or_alias:
        return None
    clean = name_or_alias.strip().lower()
    if clean in ["auto", "all", "none", "", "null", "undefined"]:
        return None

    # Exact match first
    for crop_id, entry in CROP_REGISTRY.items():
        if clean == crop_id.lower():
            return crop_id
        if clean == entry["name"].lower():
            return crop_id
        if clean == entry["bnName"].lower():
            return crop_id

    # Substring match
    for crop_id, entry in CROP_REGISTRY.items():
        if clean in crop_id.lower() or crop_id.lower() in clean:
            return crop_id
        if clean in entry["name"].lower() or entry["name"].lower() in clean:
            return crop_id
        if clean in entry["bnName"].lower() or entry["bnName"].lower() in clean:
            return crop_id

    return None


def validate_registry() -> bool:
    """Validates consistency and integrity of the crop and model registry."""
    total_classes = 0
    seen_classes = set()
    for crop_id, entry in CROP_REGISTRY.items():
        assert entry["id"] == crop_id, f"Mismatched crop ID: {crop_id}"
        assert len(entry["classes"]) > 0, f"Crop {crop_id} has no classes defined"
        for c in entry["classes"]:
            if c in seen_classes:
                raise ValueError(f"Duplicate class found across crops: {c}")
            seen_classes.add(c)
            total_classes += 1

    assert total_classes == MODEL_SPEC["total_classes"], (
        f"Registry class count ({total_classes}) != Model total classes ({MODEL_SPEC['total_classes']})"
    )
    return True


if __name__ == "__main__":
    validate_registry()
    print(f"Registry validated successfully: {len(CROP_REGISTRY)} crops, {MODEL_SPEC['total_classes']} classes, {len(LABEL_TO_CROP)} total mapped labels.")
