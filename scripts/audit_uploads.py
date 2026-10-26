import os
import glob
import sys
sys.path.insert(0, ".")
sys.path.insert(0, "scripts")
from scripts.predict import predict_image

scans = sorted(glob.glob("public/uploads/scans/*.*"))
print(f"Total user upload scans found: {len(scans)}\n")

for s in scans:
    fname = os.path.basename(s)
    try:
        preds = predict_image(s)
        top1 = preds[0]
        top2 = preds[1] if len(preds) > 1 else {"label": "N/A", "score": 0.0}
        print(f"{fname:32} | Top: {top1['label']:42} ({top1['score']*100:5.1f}%) | 2nd: {top2['label']:35} ({top2['score']*100:4.1f}%)")
    except Exception as e:
        print(f"{fname:32} | Error: {e}")
