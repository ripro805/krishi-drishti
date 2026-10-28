import sys, json, os
sys.path.insert(0, ".")
import torch
from transformers import ConvNextForImageClassification, AutoImageProcessor
from PIL import Image
from scripts.crop_taxonomy import LABEL_TO_CROP, CROP_REGISTRY

model_id = "ripro805/krishidrishti-plant-disease"
processor = AutoImageProcessor.from_pretrained(model_id)
model = ConvNextForImageClassification.from_pretrained(model_id)
model.eval()

prototypes = json.load(open("scripts/crop_prototypes.json"))
for c in prototypes:
    prototypes[c] = torch.tensor(prototypes[c])

id2label = model.config.id2label
crops = sorted(list(set(LABEL_TO_CROP.values())))

# Known cross-crop spot/texture confusion pairs
CONFUSION_PAIRS = {
    frozenset(["Strawberry", "Grape"]),
    frozenset(["Strawberry", "Rice"]),
    frozenset(["Strawberry", "Tomato"]),
    frozenset(["Strawberry", "Bell Pepper"]),
    frozenset(["Wheat", "Rice"]),
    frozenset(["Apple", "Grape"]),
    frozenset(["Apple", "Peach"]),
    frozenset(["Squash", "Strawberry"]),
}

def evaluate_inference(img_path: str, selected_crop: str = None):
    img = Image.open(img_path).convert("RGB")
    inputs = processor(images=img, return_tensors="pt")
    with torch.no_grad():
        out = model.convnext(**inputs)
        feats = out.pooler_output[0]
        feats_norm = feats / torch.norm(feats)
        logits = model.classifier(out.pooler_output)[0]
        probs = torch.softmax(logits, dim=-1)

    raw_preds = [{"label": id2label[i], "score": float(probs[i].item()), "logit": float(logits[i].item())} for i in range(len(probs))]
    raw_preds.sort(key=lambda x: x["score"], reverse=True)

    # 1. Aggregate mass per crop
    crop_mass = {c: 0.0 for c in crops}
    crop_max_logit = {c: -999.0 for c in crops}
    crop_preds = {c: [] for c in crops}

    for p in raw_preds:
        c = LABEL_TO_CROP.get(p["label"])
        if c:
            crop_mass[c] += p["score"]
            if p["logit"] > crop_max_logit[c]:
                crop_max_logit[c] = p["logit"]
            crop_preds[c].append(p)

    sorted_crops = sorted(crop_mass.items(), key=lambda x: x[1], reverse=True)
    top_crop, top_mass = sorted_crops[0]
    second_crop, second_mass = sorted_crops[1]
    raw_margin = top_mass - second_mass

    # Proto sims
    proto_sims = {c: torch.dot(feats_norm, prototypes[c]).item() for c in crops}
    sorted_protos = sorted(proto_sims.items(), key=lambda x: x[1], reverse=True)
    top_proto_crop, top_proto_sim = sorted_protos[0]

    # CASE 1: USER-SELECTED CROP
    if selected_crop:
        sel_mass = crop_mass.get(selected_crop, 0.0)
        sel_logit = crop_max_logit.get(selected_crop, -999.0)
        is_conf_pair = frozenset([selected_crop, top_crop]) in CONFUSION_PAIRS

        # Mismatch check:
        # Reject if selected mass is tiny (< 0.06) AND top logit is low (< 2.0)
        # OR if an unrelated crop is overwhelmingly dominant (> 0.70 mass and margin > 0.50)
        is_mismatch = False
        if sel_mass < 0.05 and sel_logit < 1.5:
            is_mismatch = True
        elif not is_conf_pair and top_mass > 0.65 and (top_mass - sel_mass) > 0.45 and sel_mass < 0.12:
            is_mismatch = True

        if is_mismatch:
            return {
                "status": "crop_mismatch",
                "can_provide_treatment": False,
                "selected_crop": selected_crop,
                "detected_crop": top_crop,
                "confidence": round(top_mass * 100, 1),
                "prediction": None
            }
        
        # Valid selected crop: diagnose within selected crop!
        c_preds = crop_preds[selected_crop]
        c_preds_norm = sorted(c_preds, key=lambda x: x["score"], reverse=True)
        top_disease = c_preds_norm[0]
        within_crop_score = top_disease["score"] / max(0.001, sel_mass)

        return {
            "status": "success",
            "can_provide_treatment": True,
            "selected_crop": selected_crop,
            "detected_crop": selected_crop,
            "confidence": round(within_crop_score * 100, 1),
            "prediction": {
                "label": top_disease["label"],
                "score": round(within_crop_score, 4),
                "raw_score": round(top_disease["score"], 4)
            }
        }

    # CASE 2: AUTO MODE
    # If top crop mass is ambiguous with second crop (margin < 0.20 and both are confusion pair)
    # Check if proto sim disambiguates!
    chosen_crop = top_crop
    if raw_margin < 0.25 and frozenset([top_crop, second_crop]) in CONFUSION_PAIRS:
        # Check proto sim
        if proto_sims[second_crop] > proto_sims[top_crop] + 0.03:
            chosen_crop = second_crop

    # Quality / OOD check
    if top_mass < 0.28 and raw_margin < 0.05:
        return {
            "status": "unknown_crop",
            "can_provide_treatment": False,
            "detected_crop": "Unknown",
            "confidence": round(top_mass * 100, 1),
            "prediction": None
        }

    c_preds = crop_preds[chosen_crop]
    top_disease = sorted(c_preds, key=lambda x: x["score"], reverse=True)[0]
    within_crop_score = top_disease["score"] / max(0.001, crop_mass[chosen_crop])

    return {
        "status": "success",
        "can_provide_treatment": True,
        "detected_crop": chosen_crop,
        "confidence": round(within_crop_score * 100, 1),
        "prediction": {
            "label": top_disease["label"],
            "score": round(within_crop_score, 4),
            "raw_score": round(top_disease["score"], 4)
        }
    }

print("=== TESTING TEST SPECIMENS WITH REPAIRED LOGIC ===\n")

# 1. Grape leaf (tc9th)
grape_scan = "public/uploads/scans/leaf_1793185566468_tc9th.jpeg"
print("1. GRAPE LEAF (tc9th):")
print("   AUTO:           ", evaluate_inference(grape_scan, selected_crop=None))
print("   HINT Grape:     ", evaluate_inference(grape_scan, selected_crop="Grape"))
print("   HINT Apple:     ", evaluate_inference(grape_scan, selected_crop="Apple"))
print("   HINT Rice:      ", evaluate_inference(grape_scan, selected_crop="Rice"))

# 2. Strawberry leaf (8du6g)
straw_scan = "public/uploads/scans/leaf_1793203281691_8du6g.jpeg"
print("\n2. STRAWBERRY LEAF (8du6g):")
print("   HINT Strawberry:", evaluate_inference(straw_scan, selected_crop="Strawberry"))
print("   HINT Apple:     ", evaluate_inference(straw_scan, selected_crop="Apple"))

# 3. Pumpkin leaf (g8nss)
pumpkin_scan = "public/uploads/scans/leaf_1793182667167_g8nss.jpeg"
print("\n3. PUMPKIN LEAF (OOD) (g8nss):")
print("   AUTO:           ", evaluate_inference(pumpkin_scan, selected_crop=None))
print("   HINT Apple:     ", evaluate_inference(pumpkin_scan, selected_crop="Apple"))

# 4. Wheat leaf (hm0gl)
wheat_scan = "public/uploads/scans/leaf_1793182945793_hm0gl.jpeg"
print("\n4. WHEAT LEAF (hm0gl):")
print("   AUTO:           ", evaluate_inference(wheat_scan, selected_crop=None))
print("   HINT Wheat:     ", evaluate_inference(wheat_scan, selected_crop="Wheat"))
print("   HINT Rice:      ", evaluate_inference(wheat_scan, selected_crop="Rice"))
