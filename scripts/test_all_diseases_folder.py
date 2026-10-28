import os
import glob
import sys
import base64
import json
import requests
from PIL import Image
from transformers import pipeline

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")

DIR_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "all diseases")
images = sorted(glob.glob(os.path.join(DIR_PATH, "*.*")))

print(f"Found {len(images)} images in '{DIR_PATH}'")

# Load model pipeline directly to see top-5 raw predictions
print("Loading ripro805/krishidrishti-plant-disease pipeline...")
pipe = pipeline("image-classification", model="ripro805/krishidrishti-plant-disease")

results = []

for img_path in images:
    fname = os.path.basename(img_path)
    img = Image.open(img_path).convert("RGB")
    
    # 1. Direct model prediction
    raw_preds = pipe(img, top_k=5)
    
    # 2. API call to running FastAPI server
    with open(img_path, "rb") as f:
        b64 = base64.b64encode(f.read()).decode("utf-8")
    
    api_resp = requests.post("http://127.0.0.1:5005/predict", json={"imageData": b64})
    api_data = api_resp.json() if api_resp.status_code == 200 else {}
    
    results.append({
        "file": fname,
        "raw_top": raw_preds[0],
        "raw_top3": raw_preds[:3],
        "api_status": api_data.get("status"),
        "detected_crop": api_data.get("detected_crop"),
        "bangla_crop": api_data.get("bangla_detected_crop"),
        "confidence": api_data.get("confidence"),
        "can_treat": api_data.get("can_provide_treatment"),
        "prediction": api_data.get("prediction"),
    })

print("\n" + "=" * 120)
print(f"{'Filename':<35} | {'Detected Crop':<15} | {'Model Top Prediction':<35} | {'Score':<8} | {'Status'}")
print("=" * 120)

for r in results:
    top_lbl = r["raw_top"]["label"]
    top_score = f"{r['raw_top']['score']*100:.1f}%"
    crop = r["detected_crop"] or "None"
    st = r["api_status"] or "Error"
    print(f"{r['file']:<35} | {crop:<15} | {top_lbl:<35} | {top_score:<8} | {st}")

# Save detailed results to JSON for auditing
with open("reports/audit/all_diseases_test_results.json", "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print("\nSaved detailed results to reports/audit/all_diseases_test_results.json")
