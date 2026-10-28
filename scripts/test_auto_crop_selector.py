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
b = model.classifier.bias.data if model.classifier.bias is not None else torch.zeros(50)
id2label = model.config.id2label

from scripts.crop_taxonomy import LABEL_TO_CROP

crops = sorted(list(set(LABEL_TO_CROP.values())))

# 1. Normalized crop prototypes in feature space
crop_prototypes = {}
crop_indices = {}
for crop in crops:
    indices = [i for i, label in id2label.items() if LABEL_TO_CROP.get(label) == crop]
    crop_indices[crop] = indices
    if indices:
        v = W[indices].mean(dim=0)
        crop_prototypes[crop] = v / torch.norm(v)

# Test unique user uploads
unique_images = {}
for f in sorted(glob.glob('public/uploads/scans/leaf_*.*'), key=os.path.getmtime, reverse=True):
    sz = os.path.getsize(f)
    if sz not in unique_images:
        unique_images[sz] = f

print(f"Testing {len(unique_images)} unique uploads with Hybrid Auto-Crop:\n")

for sz, path in unique_images.items():
    b_name = os.path.basename(path)
    image = Image.open(path).convert("RGB")
    inputs = processor(images=image, return_tensors="pt")
    
    with torch.no_grad():
        feats = model.convnext(**inputs).pooler_output[0] # [768]
        norm_feats = feats / torch.norm(feats)
        
        # Prototype similarity (cosine)
        proto_sims = {c: torch.dot(norm_feats, p).item() for c, p in crop_prototypes.items()}
        
        # Logits
        logits = model.classifier(model.convnext(**inputs).pooler_output)[0] # [50]
        probs = torch.softmax(logits, dim=-1) # [50]
        
        # Crop mass
        crop_masses = {}
        for c, idxs in crop_indices.items():
            crop_masses[c] = probs[idxs].sum().item()
            
        # Log-Sum-Exp per crop
        lse_scores = {}
        for c, idxs in crop_indices.items():
            lse_scores[c] = torch.logsumexp(logits[idxs], dim=0).item()
            
        # Hybrid Score:
        # Cosine similarity tells us the botanical leaf shape/texture direction in 768-d space.
        # Crop mass tells us the softmax probability mass.
        # But Strawberry_Leaf_scorch is an over-confident single-class attractor.
        # Notice: When Strawberry has high mass, but proto_sim of Grape (or Wheat/Tomato) is higher,
        # what does the combined score say?
        
        combined_scores = {}
        for c in crops:
            # Shift proto_sim so it is positive (range roughly 0 to 1)
            sim_factor = max(0.01, proto_sims.get(c, 0.0) + 0.2)
            # Mass factor
            mass_factor = crop_masses.get(c, 0.0)
            
            # If Strawberry, discount its prior because it only has 1 disease class that overfits spots
            if c == "Strawberry":
                sim_factor *= 0.75
            
            combined_scores[c] = (sim_factor ** 1.5) * (mass_factor + 0.05)

        sorted_combined = sorted(combined_scores.items(), key=lambda x: x[1], reverse=True)
        best_crop = sorted_combined[0][0]
        
        # Best prediction within best_crop
        best_idx_in_crop = crop_indices[best_crop][torch.argmax(logits[crop_indices[best_crop]]).item()]
        best_label = id2label[best_idx_in_crop]
        
        raw_top_idx = torch.argmax(logits).item()
        raw_label = id2label[raw_top_idx]
        raw_crop = LABEL_TO_CROP.get(raw_label)

    print(f"[{b_name}]")
    print(f"  Old Flat Auto:   {raw_label:40s} (Crop: {raw_crop})")
    print(f"  New Hybrid Auto: {best_label:40s} (Crop: {best_crop})")
    if raw_crop != best_crop:
        print(f"  >>> CHANGED FROM {raw_crop} TO {best_crop}! <<<")
    print()
