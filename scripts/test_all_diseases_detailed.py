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

# Map filename keywords to canonical KrishiDrishti crops
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
    return None

results = []

for img_path in images:
    fname = os.path.basename(img_path)
    expected_crop = guess_crop(fname)
    
    with open(img_path, "rb") as f:
        b64 = base64.b64encode(f.read()).decode("utf-8")
    
    # Test 1: Auto Mode (no hint)
    res_auto = requests.post("http://127.0.0.1:5005/predict", json={"imageData": b64}).json()
    
    # Test 2: Guided Mode (with expected crop hint)
    res_guided = requests.post("http://127.0.0.1:5005/predict", json={"imageData": b64, "cropHint": expected_crop}).json()
    
    results.append({
        "file": fname,
        "expected_crop": expected_crop,
        "auto": {
            "status": res_auto.get("status"),
            "detected_crop": res_auto.get("detected_crop"),
            "confidence": res_auto.get("confidence"),
            "top_pred": (res_auto.get("prediction") or (res_auto.get("predictions") and res_auto.get("predictions")[0]) or {}).get("label"),
            "crop_match": res_auto.get("detected_crop") == expected_crop
        },
        "guided": {
            "status": res_guided.get("status"),
            "detected_crop": res_guided.get("detected_crop"),
            "confidence": res_guided.get("confidence"),
            "top_pred": (res_guided.get("prediction") or (res_guided.get("predictions") and res_guided.get("predictions")[0]) or {}).get("label"),
            "can_treat": res_guided.get("can_provide_treatment")
        }
    })

print("\n" + "=" * 125)
print(f"{'Filename':<32} | {'Exp Crop':<12} | {'Auto Det':<12} | {'Auto Pred':<30} | {'Auto Match':<10} | {'Guided Status'}")
print("=" * 125)

auto_matches = 0
for r in results:
    f = r["file"]
    exp = r["expected_crop"] or "Unknown"
    auto_det = r["auto"]["detected_crop"] or "None"
    auto_pred = str(r["auto"]["top_pred"])[:30]
    match = "YES" if r["auto"]["crop_match"] else "NO"
    if r["auto"]["crop_match"]:
        auto_matches += 1
    g_st = r["guided"]["status"]
    print(f"{f:<32} | {exp:<12} | {auto_det:<12} | {auto_pred:<30} | {match:<10} | {g_st}")

print("=" * 125)
print(f"Auto Crop Accuracy on 'all diseases' images: {auto_matches}/{len(results)} ({auto_matches/len(results)*100:.1f}%)")

with open("reports/audit/all_diseases_comparison.json", "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)
