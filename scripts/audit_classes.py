import json
import re
import urllib.request

# 1. Old MobileNetV2 classes (models/class_names.json)
with open('models/class_names.json', 'r', encoding='utf-8') as f:
    old_classes = json.load(f)

# 2. HF_LABEL_MAP in src/lib/diseaseDetector.ts
with open('src/lib/diseaseDetector.ts', 'r', encoding='utf-8') as f:
    detector_ts = f.read()

# 3. Diseases in src/data/diseasesDatabase.ts
with open('src/data/diseasesDatabase.ts', 'r', encoding='utf-8') as f:
    db_ts = f.read()

db_disease_ids = re.findall(r'id:\s*["\']([^"\']+)["\']', db_ts)

# 4. HuggingFace 50 classes config
url = 'https://huggingface.co/ripro805/krishidrishti-plant-disease/raw/main/config.json'
with urllib.request.urlopen(url) as res:
    hf_config = json.loads(res.read().decode())
hf_classes = hf_config.get('id2label', {})

print(f"1. Old local model classes ({len(old_classes)}):")
print(old_classes)

print(f"\n2. Hugging Face Model classes ({len(hf_classes)}):")
for idx in sorted(map(int, hf_classes.keys())):
    print(f"  {idx}: {hf_classes[str(idx)]}")

print(f"\n3. Existing diseases in DISEASES_DATABASE ({len(db_disease_ids)}):")
print(db_disease_ids)

# Check backward compatibility: Are all old 15 classes in HF model?
old_missing_in_hf = [c for c in old_classes if c not in hf_classes.values()]
print(f"\nBackward compatibility check (Old 15 classes in HF model?):")
print(f"Missing in HF model: {old_missing_in_hf}")

# Check which of the 50 HF classes are already mapped in diseaseDetector.ts
detector_mapped = []
for label in hf_classes.values():
    if f"{label}:" in detector_ts:
        detector_mapped.append(label)

print(f"\nHF classes currently mapped in diseaseDetector.ts: {len(detector_mapped)} / {len(hf_classes)}")

# Check which diseaseIds in detector_ts are missing from diseasesDatabase.ts
detector_disease_ids = set(re.findall(r'diseaseId:\s*["\']([^"\']+)["\']', detector_ts))
missing_in_db = detector_disease_ids - set(db_disease_ids)
print(f"\nDisease IDs in detector missing from diseasesDatabase.ts ({len(missing_in_db)}):")
for m in sorted(missing_in_db):
    print(f"  - {m}")

