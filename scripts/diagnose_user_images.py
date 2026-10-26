import sys
import os
sys.path.insert(0, ".")
sys.path.insert(0, "scripts")
from scripts.predict import get_pipeline
from scripts.crop_taxonomy import LABEL_TO_CROP

pipe = get_pipeline()
img_path1 = "public/uploads/scans/leaf_1793040955832_8phip.jpeg"
img_path2 = "public/uploads/scans/leaf_1793040967393_8yzn2.jpeg"

for name, p in [("First Upload (8phip.jpeg)", img_path1), ("Second Upload (8yzn2.jpeg)", img_path2)]:
    print(f"\n==================== {name} ====================")
    preds = pipe(p, top_k=50)
    print("Top 10 Classes:")
    for item in preds[:10]:
        crop = LABEL_TO_CROP.get(item["label"], "Unknown")
        print(f"  {item['label']:48} [{crop:12}] : {item['score']*100:5.2f}%")
        
    crop_sums = {}
    for item in preds:
        c = LABEL_TO_CROP.get(item["label"], "Unknown")
        crop_sums[c] = crop_sums.get(c, 0.0) + item["score"]
        
    print("\nTop 5 Crops by Probability Mass:")
    for c, score in sorted(crop_sums.items(), key=lambda x: x[1], reverse=True)[:5]:
        print(f"  {c:20} : {score*100:5.2f}%")
