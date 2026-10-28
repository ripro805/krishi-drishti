import json
import sys
sys.path.insert(0, ".")
from scripts.predict import predict_image

path = "public/uploads/scans/leaf_1793203281691_8du6g.jpeg"
print("=== AUTO INFERENCE ===")
res_auto = predict_image(path, crop_hint=None, return_meta=True)
for k in ["status", "dominantCrop", "detected_crop", "can_provide_treatment", "prediction", "cropScores"]:
    print(f"  {k}: {res_auto.get(k)}")

print("\n=== SELECTED CROP INFERENCE ===")
for c in ["Rice", "Wheat", "Apple", "Grape", "Strawberry", "Tomato", "Orange"]:
    res_c = predict_image(path, crop_hint=c, return_meta=True)
    status = res_c.get("status")
    det = res_c.get("detected_crop")
    can_treat = res_c.get("can_provide_treatment")
    pred = res_c.get("prediction")
    lbl = pred.get("label") if pred else None
    sc = pred.get("score") if pred else 0
    print(f"HINT {c:12s} -> Status: {status:14s} | Detected: {str(det):12s} | CanTreat: {str(can_treat):5s} | Pred: {lbl} ({sc*100:.1f}%)")
