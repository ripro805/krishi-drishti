import requests, base64

test_cases = [
    # Image, Selected Crop Hint, Description
    ("leaf_1793203281691_8du6g.jpeg", None, "Strawberry leaf in Auto mode"),
    ("leaf_1793203281691_8du6g.jpeg", "Strawberry", "Strawberry leaf with Strawberry selected"),
    ("leaf_1793203281691_8du6g.jpeg", "Apple", "Strawberry leaf with Apple selected (Mismatch)"),
    ("leaf_1793185566468_tc9th.jpeg", None, "Grape leaf in Auto mode"),
    ("leaf_1793185566468_tc9th.jpeg", "Grape", "Grape leaf with Grape selected"),
    ("leaf_1793184643419_6pj2e.jpeg", None, "Apple leaf in Auto mode"),
    ("leaf_1793184643419_6pj2e.jpeg", "Apple", "Apple leaf with Apple selected"),
    ("leaf_1793182667167_g8nss.jpeg", None, "Pumpkin leaf in Auto mode (OOD)"),
    ("leaf_1793182667167_g8nss.jpeg", "Apple", "Pumpkin leaf with Apple selected (Mismatch)"),
]

print(f"{'Case':45s} | {'Status':14s} | {'Detected':12s} | {'Confidence':10s} | {'Prediction':35s}")
print("-" * 125)

for img, hint, desc in test_cases:
    path = f"public/uploads/scans/{img}"
    with open(path, "rb") as f:
        b64 = "data:image/jpeg;base64," + base64.b64encode(f.read()).decode("utf-8")
    res = requests.post("http://localhost:3000/api/detect", json={"imageData": b64, "cropHint": hint}).json()
    st = res.get("status", "ERROR")
    det = res.get("detected_crop", "-")
    c_val = res.get("confidence")
    conf = f"{c_val:.1f}%" if c_val is not None else "N/A"
    pred = res.get("prediction", {}).get("label") if res.get("prediction") else "None (Shielded)"
    print(f"{desc:45s} | {st:14s} | {str(det):12s} | {conf:10s} | {pred:35s}")
