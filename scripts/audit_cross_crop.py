import glob
import os
import sys
import json

sys.path.insert(0, ".")
sys.path.insert(0, "scripts")
from scripts.predict import get_pipeline

pipe = get_pipeline()
with open("reports/audit/crop_disease_inventory.json", "r", encoding="utf-8") as f:
    inv = json.load(f)
label2crop = {item["raw_label"]: item["crop"] for item in inv}

scans = sorted(glob.glob("public/uploads/scans/*.*"))
print(f"Auditing {len(scans)} user upload scans with crop probability mass aggregation:\n")

flips = 0
for s in scans:
    fname = os.path.basename(s)
    preds = pipe(s, top_k=50)
    top1 = preds[0]
    
    # Aggregate by crop
    crop_probs = {}
    for p in preds:
        c = label2crop.get(p["label"], "Unknown")
        crop_probs[c] = crop_probs.get(c, 0.0) + p["score"]
    
    top_crop, top_crop_score = sorted(crop_probs.items(), key=lambda x: x[1], reverse=True)[0]
    top1_crop = label2crop.get(top1["label"], "Unknown")
    
    cross = top_crop != top1_crop
    if cross:
        flips += 1
    marker = " <=== [CROSS-CROP DISCREPANCY!]" if cross else ""
    print(f"{fname:30} | Top1 Class: {top1['label'][:30]:30} ({top1['score']*100:5.1f}%) [{top1_crop:12}] | Dominant Crop: {top_crop:12} ({top_crop_score*100:5.1f}%){marker}")

print(f"\nTotal scans with cross-crop discrepancy: {flips} / {len(scans)}")
