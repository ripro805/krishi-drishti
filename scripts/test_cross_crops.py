import requests, base64

scans = [
    ("leaf_1792836560482_fonz7.jpeg", "Wheat", "Wheat leaf with Wheat selected"),
    ("leaf_1792836560482_fonz7.jpeg", "Rice", "Wheat leaf with Rice selected (Mismatch)"),
    ("leaf_1793039422408_urypp.jpeg", "Rice", "Rice leaf with Rice selected"),
    ("leaf_1793039422408_urypp.jpeg", "Wheat", "Rice leaf with Wheat selected (Mismatch)"),
    ("leaf_1792835735530_9pmtl.jpeg", "Tomato", "Tomato leaf with Tomato selected"),
    ("leaf_1792835735530_9pmtl.jpeg", "Strawberry", "Tomato leaf with Strawberry selected (Mismatch)"),
    ("leaf_1792836645407_vranf.jpeg", "Bell Pepper", "Pepper leaf with Pepper selected"),
    ("leaf_1792836645407_vranf.jpeg", "Strawberry", "Pepper leaf with Strawberry selected (Mismatch)"),
]

print(f"{'Case':50s} | {'Status':14s} | {'Detected':12s} | {'Confidence':10s} | {'Prediction':35s}")
print("-" * 130)

for img, hint, desc in scans:
    path = f"public/uploads/scans/{img}"
    with open(path, "rb") as f:
        b64 = "data:image/jpeg;base64," + base64.b64encode(f.read()).decode("utf-8")
    res = requests.post("http://localhost:3000/api/detect", json={"imageData": b64, "cropHint": hint}).json()
    st = res.get("status", "ERROR")
    det = res.get("detected_crop", "-")
    c_val = res.get("confidence")
    conf = f"{c_val:.1f}%" if c_val is not None else "N/A"
    pred = res.get("prediction", {}).get("label") if res.get("prediction") else "None (Shielded)"
    print(f"{desc:50s} | {st:14s} | {str(det):12s} | {conf:10s} | {pred:35s}")
