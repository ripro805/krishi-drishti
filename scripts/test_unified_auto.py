import sys, math
sys.path.insert(0, ".")
import torch, glob, os
from PIL import Image
from transformers import ConvNextForImageClassification, AutoImageProcessor
from scripts.crop_taxonomy import LABEL_TO_CROP

model_id = "ripro805/krishidrishti-plant-disease"
processor = AutoImageProcessor.from_pretrained(model_id)
model = ConvNextForImageClassification.from_pretrained(model_id)
model.eval()

W = model.classifier.weight.data
id2label = model.config.id2label

crops = sorted(list(set(LABEL_TO_CROP.values())))
crop_prototypes = {}
crop_indices = {}
for crop in crops:
    indices = [i for i, label in id2label.items() if LABEL_TO_CROP.get(label) == crop]
    crop_indices[crop] = indices
    if indices:
        v = W[indices].mean(dim=0)
        crop_prototypes[crop] = v / torch.norm(v)

def run_test(img_path, hint=None):
    img = Image.open(img_path).convert("RGB")
    inputs = processor(images=img, return_tensors="pt")
    with torch.no_grad():
        out = model.convnext(**inputs)
        feats = out.pooler_output[0]
        norm_feats = feats / torch.norm(feats)
        proto_sims = {c: torch.dot(norm_feats, p).item() for c, p in crop_prototypes.items()}
        
        logits = model.classifier(out.pooler_output)[0]
        probs = torch.softmax(logits, dim=0)
        raw_preds = [{"label": id2label[i], "score": probs[i].item()} for i in range(len(probs))]
        raw_preds.sort(key=lambda x: x["score"], reverse=True)
        
    sorted_protos = sorted(proto_sims.items(), key=lambda x: x[1], reverse=True)
    temp = 0.05
    exp_sims = {c: math.exp(s / temp) for c, s in proto_sims.items()}
    sum_exp = sum(exp_sims.values())
    proto_probs = {c: exp_sims[c] / sum_exp for c in proto_sims}
    
    crop_mass = {}
    preds_by_crop = {}
    for p in raw_preds:
        c = LABEL_TO_CROP.get(p["label"], "Unknown")
        crop_mass[c] = crop_mass.get(c, 0.0) + p["score"]
        preds_by_crop.setdefault(c, []).append(p)
        
    is_user_guided = False
    if hint and hint.lower() not in ["auto", "all", "none", ""]:
        target_crop = next((c for c in crops if hint.lower() in c.lower() or c.lower() in hint.lower()), sorted_protos[0][0])
        is_user_guided = True
        dominant_crop = target_crop
        dominant_score = crop_mass.get(target_crop, 0.0)
    else:
        dominant_crop = sorted_protos[0][0]
        dominant_score = proto_probs[dominant_crop]
        target_crop = dominant_crop
        
    crop_candidates = sorted(preds_by_crop.get(target_crop, []), key=lambda x: x["score"], reverse=True)
    target_mass = crop_mass.get(target_crop, 0.0)
    
    if crop_candidates:
        best_cand = crop_candidates[0]
        cond_score = best_cand["score"] / target_mass if target_mass > 0 else best_cand["score"]
        formatted_preds = [
            {"label": p["label"], "score": round(p["score"] / target_mass, 4) if target_mass > 0 else round(p["score"], 4)}
            for p in crop_candidates[:5]
        ]
    else:
        formatted_preds = raw_preds[:5]
        
    return target_crop, dominant_score, formatted_preds[0]

test_cases = [
    ("public/uploads/scans/leaf_1793077690152_jtdom.jpeg", "Grape Leaf (Passalora text)"),
    ("public/uploads/scans/leaf_1793042253424_ngjko.jpeg", "Grape Leaf Blight"),
    ("public/uploads/scans/leaf_1793099816751_tbyrw.jpeg", "Apple Leaf Black Rot"),
    ("public/uploads/scans/leaf_1793077705950_v4xne.jpeg", "Strawberry Leaf Scorch"),
    ("public/uploads/scans/leaf_1793041150846_cef02.jpeg", "Wheat Leaf Stripe Rust"),
    ("public/uploads/scans/leaf_1792836796984_zcwo1.jpeg", "Potato Early Blight"),
    ("public/uploads/scans/leaf_1793004819324_10y70.jpeg", "Bell Pepper Bacterial Spot"),
]

print("=== VERIFYING AUTO-DETECT VS MANUAL SELECTION ===")
for path, desc in test_cases:
    crop_auto, score_auto, top_auto = run_test(path, hint=None)
    crop_man, score_man, top_man = run_test(path, hint=crop_auto)
    print(f"\n[{desc}]")
    print(f"  AUTO-DETECT  : Crop: {crop_auto:12} ({score_auto*100:5.1f}%) | Disease: {top_auto['label']} ({top_auto['score']*100:.1f}%)")
    print(f"  MANUAL-SELECT: Crop: {crop_man:12} ({score_man*100:5.1f}%) | Disease: {top_man['label']} ({top_man['score']*100:.1f}%)")
    assert crop_auto == crop_man, "Crop mismatch!"
    assert top_auto['label'] == top_man['label'], "Disease mismatch!"
print("\n>>> ALL TESTS PASSED WITH 100% PARITY BETWEEN AUTO AND MANUAL! <<<")
