import sys, json, os
sys.path.insert(0, ".")
sys.path.insert(0, "scripts")
from PIL import Image
import torch
from transformers import ConvNextForImageClassification, AutoImageProcessor
from crop_taxonomy import aggregate_crop_probabilities

sys.stdout.reconfigure(encoding='utf-8')

model_id = 'ripro805/krishidrishti-plant-disease'
processor = AutoImageProcessor.from_pretrained(model_id)
model = ConvNextForImageClassification.from_pretrained(model_id)
model.eval()

tests = [
    ('public/uploads/scans/leaf_1793210873843_xwpu8.jpeg', None),
    ('public/uploads/scans/leaf_1793210873843_xwpu8.jpeg', 'Tomato'),
    ('public/uploads/scans/leaf_1793210328289_uq4ir.jpeg', None),
    ('public/uploads/scans/leaf_1793210328289_uq4ir.jpeg', 'Corn'),
    ('all diseases/corn leaf bright.jpg', None),
    ('all diseases/corn leaf bright.jpg', 'Corn'),
]

for img_path, test_hint in tests:
    if not os.path.exists(img_path):
        continue
    img = Image.open(img_path).convert('RGB')
    inputs = processor(images=img, return_tensors='pt')
    with torch.no_grad():
        logits = model(**inputs).logits[0]
        probs = torch.softmax(logits, dim=-1)
    
    raw_preds = [{'label': model.config.id2label[i], 'score': float(probs[i].item())} for i in range(len(probs))]
    raw_preds.sort(key=lambda x: x['score'], reverse=True)
    res = aggregate_crop_probabilities(raw_preds, crop_hint=test_hint)
    pred_lbl = res["prediction"]["label"] if res.get("prediction") else None
    print(f"IMG: {os.path.basename(img_path)} | HINT: {test_hint}")
    print(f"  -> STATUS: {res['status']} | DET: {res['detected_crop']} ({res.get('bangla_detected_crop')})")
    print(f"  -> CONF: {res['confidence']}% | PRED: {pred_lbl}")
    print(f"  -> MSG: {res['banglaMessage']}")
    print("-" * 50)
