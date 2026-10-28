import sys, os
sys.path.insert(0, os.path.abspath("."))
sys.path.insert(0, os.path.abspath("scripts"))
from PIL import Image
import json
from predict import predict_image
from crop_taxonomy import aggregate_crop_probabilities

img_path = 'public/uploads/scans/leaf_1793182667167_g8nss.jpeg'
img = Image.open(img_path).convert('RGB')
print(f"Testing real uploaded image: {img_path} ({img.size})")

preds = predict_image(img)
print("=== TOP 10 RAW PREDICTIONS ===")
for p in preds[:10]:
    print(f"  {p['label']}: {p['score']:.4f}")

print("\n=== AUTO DETECT RESOLUTION ===")
res_auto = aggregate_crop_probabilities(preds)
print(json.dumps(res_auto, indent=2))

print("\n=== HINT APPLE RESOLUTION ===")
res_apple = aggregate_crop_probabilities(preds, crop_hint='apple')
print(json.dumps(res_apple, indent=2))
