import re

with open("src/data/diseasesDatabase.ts", "r", encoding="utf-8") as f:
    text = f.read()

diseases = re.findall(r'id:\s*"([^"]+)"', text)
print(f"Total diseases in DISEASES_DATABASE: {len(diseases)}")
for d in diseases:
    print(f"  {d}")
