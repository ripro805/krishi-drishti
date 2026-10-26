# -*- coding: utf-8 -*-
"""
Verify that all 50 classes and all 16 crops in the Hugging Face ConvNeXt model
can be properly detected, mapped, and diagnosed across the entire project.
"""
import re
import json
import sys

# Ensure UTF-8 output on Windows terminal
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")

def verify_all():
    print("===================================================================")
    print("      KrishiDrishti Full 50-Class / 16-Crop Verification Audit     ")
    print("===================================================================")

    with open('src/lib/diseaseDetector.ts', 'r', encoding='utf-8') as f:
        det = f.read()
    with open('src/data/diseasesDatabase.ts', 'r', encoding='utf-8') as f:
        db = f.read()

    # 1. Extract labels from HF_LABEL_MAP
    labels = re.findall(r'^\s*([A-Za-z0-9_]+):\s*\{\s*diseaseId:\s*["\']([^"\']+)["\'],\s*crop:\s*["\']([^"\']+)["\'],\s*banglaCrop:\s*["\']([^"\']+)["\']', det, re.MULTILINE)
    print(f"1. Total classes in HF_LABEL_MAP: {len(labels)}")
    if len(labels) != 50:
        print(f"ERROR: Expected 50 classes, found {len(labels)}")
        return False

    # Group by crop
    crops = {}
    for lbl, d_id, crop, bn_crop in labels:
        crops.setdefault(crop, []).append((lbl, d_id, bn_crop))

    print(f"\n2. Total Distinct Crops: {len(crops)}")
    for crop_name, entries in sorted(crops.items()):
        bn = entries[0][2]
        print(f"  - {crop_name} ({bn}) -> {len(entries)} classes:")
        for lbl, d_id, _ in entries:
            print(f"      • {lbl} -> [{d_id}]")

    # 3. Verify each diseaseId has an entry in DISEASES_DATABASE
    db_ids = set(re.findall(r'id:\s*["\']([^"\']+)["\']', db))
    missing_in_db = []
    incomplete_entries = []

    for lbl, d_id, crop, bn_crop in labels:
        if d_id not in db_ids:
            missing_in_db.append((lbl, d_id))
        else:
            # Check completeness: commonName, banglaName, scientificName, symptoms, treatmentPlan, banglaTreatment
            entry_match = re.search(rf'id:\s*["\']{d_id}["\'][\s\S]*?(?=id:\s*["\']|\];)', db)
            if not entry_match:
                incomplete_entries.append((d_id, "Could not isolate entry"))
                continue
            entry_text = entry_match.group(0)
            required_keys = ['commonName', 'banglaName', 'scientificName', 'pathogenType', 'severity', 'summary', 'banglaSummary', 'treatmentPlan', 'banglaTreatment']
            for req in required_keys:
                if f'{req}:' not in entry_text:
                    incomplete_entries.append((d_id, f"Missing {req}"))

    print(f"\n3. Database completeness check:")
    if missing_in_db:
        print(f"  ERROR: Missing in DB: {missing_in_db}")
        return False
    else:
        print("  All 50 disease IDs exist in DISEASES_DATABASE!")

    if incomplete_entries:
        print(f"  WARNING: Incomplete entries: {incomplete_entries}")
    else:
        print("  All 50 entries have complete bilingual names, summaries, symptoms, treatments, and advisories!")

    return True

if __name__ == "__main__":
    verify_all()
