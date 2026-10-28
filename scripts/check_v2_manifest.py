import requests, json

url_labels = "https://huggingface.co/ripro805/krishi-drishty-v2/raw/main/labels.json"
v2_labels = list(requests.get(url_labels).json()["id2label"].values())

with open("src/lib/diseaseDetector.ts", "r", encoding="utf-8") as f:
    det_content = f.read()

missing = []
present = []
for l in v2_labels:
    # check both unquoted and quoted
    if f"{l}:" in det_content or f'"{l}":' in det_content or f"'{l}':" in det_content:
        present.append(l)
    else:
        missing.append(l)

print(f"Present in HF_LABEL_MAP: {len(present)}/{len(v2_labels)}")
print(f"Missing in HF_LABEL_MAP: {len(missing)}")
for m in missing:
    print(f"  MISSING: {m}")
