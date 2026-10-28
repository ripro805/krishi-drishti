import glob
import os
import sys
import base64
import requests

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")

test_imgs = sorted(glob.glob('public/uploads/scans/*.*'), key=os.path.getmtime)[-10:]
print(f"Testing {len(test_imgs)} user scans via http://127.0.0.1:5005/predict ...\n")

for img_path in test_imgs:
    with open(img_path, "rb") as f:
        b64 = base64.b64encode(f.read()).decode("utf-8")
    
    resp = requests.post("http://127.0.0.1:5005/predict", json={"imageData": b64})
    data = resp.json()
    fname = os.path.basename(img_path)
    print(f"Image: {fname}")
    print(f"  Status: {data.get('status')} | Detected Crop: {data.get('detected_crop')} ({data.get('bangla_detected_crop')})")
    print(f"  Confidence: {data.get('confidence')}% | Can Treat: {data.get('can_provide_treatment')}")
    top_pred = data.get('prediction') or (data.get('predictions') and data.get('predictions')[0])
    if top_pred:
        print(f"  Top Pred: {top_pred.get('label')} ({top_pred.get('score', 0)*100:.1f}%)")
    print("-" * 50)
