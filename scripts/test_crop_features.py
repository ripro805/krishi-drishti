import sys
sys.path.insert(0, ".")
import torch
from transformers import ConvNextForImageClassification, AutoImageProcessor
from PIL import Image
import os, glob

model_id = "ripro805/krishidrishti-plant-disease"
processor = AutoImageProcessor.from_pretrained(model_id)
model = ConvNextForImageClassification.from_pretrained(model_id)
model.eval()

W = model.classifier.weight.data # [50, 768]
id2label = model.config.id2label

from scripts.crop_taxonomy import LABEL_TO_CROP

crops = sorted(list(set(LABEL_TO_CROP.values())))

# Compute normalized crop prototypes
crop_prototypes = {}
for crop in crops:
    indices = [i for i, label in id2label.items() if LABEL_TO_CROP.get(label) == crop]
    if indices:
        # Mean direction of the crop
        v = W[indices].mean(dim=0)
        crop_prototypes[crop] = v / torch.norm(v)

# Test unique user uploads
unique_images = {}
for f in sorted(glob.glob('public/uploads/scans/leaf_*.*'), key=os.path.getmtime, reverse=True):
    sz = os.path.getsize(f)
    if sz not in unique_images:
        unique_images[sz] = f

print(f"Testing {len(unique_images)} unique uploads with Cosine Crop Prototypes:\n")

for sz, path in unique_images.items():
    b = os.path.basename(path)
    image = Image.open(path).convert("RGB")
    inputs = processor(images=image, return_tensors="pt")
    with torch.no_grad():
        feats = model.convnext(**inputs).pooler_output[0] # [768]
        feats = feats / torch.norm(feats)
        
        sims = {c: torch.dot(feats, p).item() for c, p in crop_prototypes.items()}
        sorted_crops = sorted(sims.items(), key=lambda x: x[1], reverse=True)
        
        # Raw model top 1
        logits = model.classifier(model.convnext(**inputs).pooler_output)[0]
        raw_top_idx = torch.argmax(logits).item()
        raw_top_label = id2label[raw_top_idx]
        raw_top_crop = LABEL_TO_CROP.get(raw_top_label)

    print(f"[{b}] (Size: {sz})")
    print(f"  Raw Flat Model: {raw_top_label} (Crop: {raw_top_crop})")
    top_c, top_s = sorted_crops[0]
    second_c, second_s = sorted_crops[1]
    print(f"  Prototype Crop #1: {top_c:15s} (sim={top_s:.3f}) | #2: {second_c:15s} (sim={second_s:.3f})")
    print()
