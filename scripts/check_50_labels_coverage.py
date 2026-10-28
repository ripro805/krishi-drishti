import re
import json

with open('src/lib/diseaseDetector.ts', 'r', encoding='utf-8') as f:
    detector_code = f.read()

with open('src/data/diseasesDatabase.ts', 'r', encoding='utf-8') as f:
    db_code = f.read()

db_ids = set(re.findall(r'id:\s*["\']([^"\']+)["\']', db_code))
print(f"Total IDs in DISEASES_DATABASE: {len(db_ids)}")

# Extract HF_LABEL_MAP entries from detector_code
label_map_block = re.search(r'const HF_LABEL_MAP: Record<string, LabelMeta> = \{([\s\S]*?)\};', detector_code)
if not label_map_block:
    print("Could not find HF_LABEL_MAP in detector_code")
    exit(1)

content = label_map_block.group(1)
entries = re.findall(r'["\']([^"\']+)["\']:\s*\{\s*diseaseId:\s*["\']([^"\']+)["\']', content)

from transformers import AutoConfig
config = AutoConfig.from_pretrained('ripro805/krishidrishti-plant-disease')
model_labels = list(config.id2label.values())

mapping = dict(entries)
print(f"Total entries parsed in HF_LABEL_MAP: {len(mapping)}")

missing_in_db = []
missing_in_map = []

for lbl in model_labels:
    if lbl not in mapping:
        missing_in_map.append(lbl)
    else:
        dis_id = mapping[lbl]
        if dis_id not in db_ids:
            missing_in_db.append((lbl, dis_id))

print(f"\nModel labels not in HF_LABEL_MAP ({len(missing_in_map)}):", missing_in_map)
print(f"Model labels whose diseaseId is NOT in DISEASES_DATABASE ({len(missing_in_db)}):")
for lbl, did in missing_in_db:
    print(f"  {lbl} -> {did} (NOT IN DB!)")
