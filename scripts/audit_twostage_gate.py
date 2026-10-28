import sys, os, glob, json, math
sys.path.insert(0, ".")
from PIL import Image
import torch
from transformers import ConvNextForImageClassification, AutoImageProcessor
from scripts.crop_registry import LABEL_TO_CROP, CROP_REGISTRY

model_id = "ripro805/krishidrishti-plant-disease"
processor = AutoImageProcessor.from_pretrained(model_id)
model = ConvNextForImageClassification.from_pretrained(model_id)
model.eval()

with open("reports/hf_model_audit/labels.json") as f:
    id2label = json.load(f)

# Collect all scans
scans = sorted(glob.glob("public/uploads/scans/*.*"))
print(f"Auditing all {len(scans)} scans with Two-Stage Crop Verification:\n")

results = []
for s in scans:
    fname = os.path.basename(s)
    try:
        img = Image.open(s).convert("RGB")
    except Exception as e:
        results.append((fname, "CORRUPT", 0, "None", 0))
        continue

    inputs = processor(images=img, return_tensors="pt")
    with torch.no_grad():
        logits = model(**inputs).logits[0]
        probs = torch.softmax(logits, dim=-1)

    crop_mass = {c: 0.0 for c in CROP_REGISTRY}
    for i, p in enumerate(probs):
        lbl = id2label[str(i)]
        c = LABEL_TO_CROP.get(lbl, "Unknown")
        if c in crop_mass:
            crop_mass[c] += p.item()

    sorted_cm = sorted(crop_mass.items(), key=lambda x: x[1], reverse=True)
    top_crop, top_mass = sorted_cm[0]
    sec_crop, sec_mass = sorted_cm[1] if len(sorted_cm) > 1 else ("None", 0.0)
    margin = top_mass - sec_mass
    entropy = -sum(p.item() * math.log(p.item() + 1e-12) for p in probs)

    # Two-Stage Crop Gate:
    # A crop is credibly identified in Auto mode ONLY if:
    # 1. top_mass >= 0.45, OR
    # 2. top_mass >= 0.35 and margin >= 0.15
    # Otherwise -> UNKNOWN / OOD
    is_credible = (top_mass >= 0.45) or (top_mass >= 0.35 and margin >= 0.15)
    decision = top_crop if is_credible else "UNKNOWN_OOD"

    # Also test selected-crop = Apple:
    apple_mass = crop_mass.get("Apple", 0.0)
    apple_valid = apple_mass >= 0.35
    apple_decision = "ACCEPT_APPLE" if apple_valid else ("MISMATCH_" + (top_crop if is_credible else "OOD"))

    print(f"{fname:30} | Mass: {top_mass*100:5.1f}% [{top_crop:12}] | Margin: {margin*100:5.1f}% | Ent: {entropy:.2f} | Auto: {decision:12} | OnApple: {apple_decision}")
