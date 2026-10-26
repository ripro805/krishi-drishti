import glob
import os
import sys
import json
from PIL import Image
import torch
from transformers import AutoImageProcessor, ConvNextForImageClassification

# Ensure UTF-8 output
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")

model_name = "ripro805/krishidrishti-plant-disease"
processor = AutoImageProcessor.from_pretrained(model_name)
model = ConvNextForImageClassification.from_pretrained(model_name)
model.eval()

with open("reports/audit/crop_disease_inventory.json", "r", encoding="utf-8") as f:
    inv = json.load(f)
label2crop = {item["raw_label"]: item["crop"] for item in inv}

scans = sorted(glob.glob("public/uploads/scans/*.*"))
print(f"Comparing Standard Center-Crop vs Squash (Whole-Leaf) across {len(scans)} user uploads:\n")

diff_count = 0
results = []
for s in scans:
    fname = os.path.basename(s)
    img = Image.open(s).convert("RGB")
    
    # 1. Standard crop
    inp_std = processor(images=img, return_tensors="pt")
    with torch.no_grad():
        p_std = torch.softmax(model(**inp_std).logits, dim=-1)[0]
    top_std_idx = torch.argmax(p_std).item()
    top_std_lbl = model.config.id2label[top_std_idx]
    top_std_score = p_std[top_std_idx].item()
    
    # 2. Squash to 224x224 (whole leaf training mode)
    img_sq = img.resize((224, 224), Image.Resampling.BICUBIC)
    inp_sq = processor(images=img_sq, return_tensors="pt", do_resize=False)
    with torch.no_grad():
        p_sq = torch.softmax(model(**inp_sq).logits, dim=-1)[0]
    top_sq_idx = torch.argmax(p_sq).item()
    top_sq_lbl = model.config.id2label[top_sq_idx]
    top_sq_score = p_sq[top_sq_idx].item()
    
    crop_std = label2crop.get(top_std_lbl, "Unknown")
    crop_sq = label2crop.get(top_sq_lbl, "Unknown")
    
    is_diff = top_std_lbl != top_sq_lbl
    is_crop_flip = crop_std != crop_sq
    if is_diff:
        diff_count += 1
    
    marker = " <=== [CROP FLIP!]" if is_crop_flip else (" [CLASS FLIP]" if is_diff else "")
    print(f"{fname:30} | Std: {top_std_lbl[:26]:26} ({top_std_score*100:4.1f}%) [{crop_std:10}] | Squash: {top_sq_lbl[:26]:26} ({top_sq_score*100:4.1f}%) [{crop_sq:10}]{marker}")
    
    results.append({
        "filename": fname,
        "standard_label": top_std_lbl,
        "standard_score": round(top_std_score, 4),
        "standard_crop": crop_std,
        "squash_label": top_sq_lbl,
        "squash_score": round(top_sq_score, 4),
        "squash_crop": crop_sq,
        "label_changed": is_diff,
        "crop_changed": is_crop_flip
    })

print(f"\nTotal predictions altered by whole-leaf squash: {diff_count} / {len(scans)}")
with open("reports/audit/squash_vs_crop_comparison.json", "w", encoding="utf-8") as f:
    json.dump(results, f, indent=2, ensure_ascii=False)
print("Saved comparison to reports/audit/squash_vs_crop_comparison.json")
