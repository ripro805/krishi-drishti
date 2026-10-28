import os
import glob
import sys
import base64
import json
import requests
from PIL import Image

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")

DIR_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "all diseases")
images = sorted(glob.glob(os.path.join(DIR_PATH, "*.*")))

CROP_KEYWORD_MAP = {
    "wheat": "Wheat",
    "raspberry": "Raspberry",
    "rice": "Rice",
    "soybean": "Soybean",
    "squash": "Squash",
    "strawberry": "Strawberry",
    "tomato": "Tomato",
    "apple": "Apple",
    "blue": "Blueberry",
    "capcicum": "Bell Pepper",
    "cherry": "Cherry",
    "corn": "Corn (Maize)",
    "grape": "Grape",
    "orange": "Orange (Citrus)",
    "peach": "Peach",
    "pech": "Peach",
    "potato": "Potato",
}

def guess_crop(filename):
    lower = filename.lower()
    for kw, crop in CROP_KEYWORD_MAP.items():
        if kw in lower:
            return crop
    return "Unknown"

# Known supported diseases in ripro805/krishidrishti-plant-disease (50 classes)
MODEL_SUPPORTED_CROPS = {
    "Apple": ["Apple_Apple_scab", "Apple_Black_rot", "Apple_Cedar_apple_rust", "Apple_healthy"],
    "Bell Pepper": ["Pepper__bell___Bacterial_spot", "Pepper__bell___healthy"],
    "Blueberry": ["Blueberry_healthy"],
    "Cherry": ["Cherry_including_sour_Powdery_mildew", "Cherry_including_sour_healthy"],
    "Corn (Maize)": ["Corn_maize_Cercospora_leaf_spot_Gray_leaf_spot", "Corn_maize_Common_rust", "Corn_maize_Northern_Leaf_Blight", "Corn_maize_healthy"],
    "Grape": ["Grape_Black_rot", "Grape_Esca_Black_Measles", "Grape_Leaf_blight_Isariopsis_Leaf_Spot", "Grape_healthy"],
    "Orange (Citrus)": ["Orange_Haunglongbing_Citrus_greening"],
    "Peach": ["Peach_Bacterial_spot", "Peach_healthy"],
    "Potato": ["Potato___Early_blight", "Potato___Late_blight", "Potato___healthy"],
    "Raspberry": ["Raspberry_healthy"],
    "Rice": ["Rice_Bacterial_Leaf_Blight", "Rice_Blast", "Rice_Brown_Spot", "Rice_Healthy", "Rice_Hispa", "Rice_Leaf_Scald", "Rice_Narrow_Brown_Spot", "Rice_Sheath_Blight", "Rice_Tungro"],
    "Soybean": ["Soybean_healthy"],
    "Squash": ["Squash_Powdery_mildew"],
    "Strawberry": ["Strawberry_Leaf_scorch", "Strawberry_healthy"],
    "Tomato": ["Tomato_Bacterial_spot", "Tomato_Early_blight", "Tomato_Late_blight", "Tomato_Leaf_Mold", "Tomato_Septoria_leaf_spot", "Tomato_Spider_mites_Two_spotted_spider_mite", "Tomato__Target_Spot", "Tomato__Tomato_YellowLeaf__Curl_Virus", "Tomato__Tomato_mosaic_virus", "Tomato_healthy"],
    "Wheat": ["Wheat_Healthy", "Wheat_Septoria", "Wheat_Stripe_Rust"],
}

print(f"Testing all {len(images)} images in '{DIR_PATH}'...")

report = []

for img_path in images:
    fname = os.path.basename(img_path)
    exp_crop = guess_crop(fname)
    
    with open(img_path, "rb") as f:
        b64 = base64.b64encode(f.read()).decode("utf-8")
        
    # Auto Mode test
    resp_auto = requests.post("http://127.0.0.1:5005/predict", json={"imageData": b64}).json()
    
    # Guided Mode test (with expected crop)
    resp_guided = requests.post("http://127.0.0.1:5005/predict", json={"imageData": b64, "cropHint": exp_crop}).json()
    
    report.append({
        "file": fname,
        "expected_crop": exp_crop,
        "auto": {
            "status": resp_auto.get("status"),
            "detected_crop": resp_auto.get("detected_crop"),
            "bangla_crop": resp_auto.get("bangla_detected_crop"),
            "confidence": resp_auto.get("confidence"),
            "prediction": (resp_auto.get("prediction") or {}).get("label"),
            "bangla_msg": resp_auto.get("banglaMessage")
        },
        "guided": {
            "status": resp_guided.get("status"),
            "detected_crop": resp_guided.get("detected_crop"),
            "bangla_crop": resp_guided.get("bangla_detected_crop"),
            "confidence": resp_guided.get("confidence"),
            "prediction": (resp_guided.get("prediction") or {}).get("label"),
            "bangla_msg": resp_guided.get("banglaMessage")
        }
    })

with open("reports/audit/final_all_diseases_evaluation.json", "w", encoding="utf-8") as f:
    json.dump(report, f, ensure_ascii=False, indent=2)

print("\n" + "=" * 135)
print(f"{'Filename':<32} | {'Exp Crop':<12} | {'Auto Status':<14} | {'Auto Crop':<14} | {'Guided Status':<14} | {'Guided Disease'}")
print("=" * 135)

for r in report:
    fname = r["file"][:32]
    ec = r["expected_crop"]
    ast = r["auto"]["status"] or "unknown"
    ac = r["auto"]["detected_crop"] or "None"
    gst = r["guided"]["status"] or "unknown"
    gp = (r["guided"]["prediction"] or "None (Shielded)")[:25]
    print(f"{fname:<32} | {ec:<12} | {ast:<14} | {ac:<14} | {gst:<14} | {gp}")

print("=" * 135)
