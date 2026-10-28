from verify_v2_manifest import MANIFEST_55
import re

with open("src/data/diseasesDatabase.ts", "r", encoding="utf-8") as f:
    text = f.read()

existing_ids = set(re.findall(r'id:\s*"([^"]+)"', text))
needed_ids = set(v["diseaseId"] for v in MANIFEST_55.values())

missing = needed_ids - existing_ids
print(f"Needed disease IDs: {len(needed_ids)}")
print(f"Existing IDs in DB: {len(existing_ids)}")
print(f"Missing disease IDs in diseasesDatabase.ts: {missing}")
