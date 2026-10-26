import os
import json
import csv
import re
import sys

# 1. Load HF config id2label
with open("reports/hf_model_audit/config.json", "r", encoding="utf-8") as f:
    cfg = json.load(f)
id2label = cfg.get("id2label", {})
# Ensure integer keys
id2label = {int(k): v for k, v in id2label.items()}

# 2. Load sample counts
counts_map = {}
if os.path.exists("reports/hf_model_audit/per_class_sample_counts.csv"):
    with open("reports/hf_model_audit/per_class_sample_counts.csv", "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for r in reader:
            counts_map[r["class"]] = {
                "train_images": int(r["train_images"]),
                "val_images": int(r["support"]),
                "group": r["group"]
            }

# 3. Load per class evaluation metrics
metrics_map = {}
if os.path.exists("reports/hf_model_audit/per_class_report.csv"):
    with open("reports/hf_model_audit/per_class_report.csv", "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for r in reader:
            metrics_map[r["class"]] = {
                "precision": float(r["precision"]),
                "recall": float(r["recall"]),
                "f1_score": float(r["f1-score"]),
                "support": int(r["support"])
            }

# 4. Parse HF_LABEL_MAP from src/lib/diseaseDetector.ts
detector_path = "src/lib/diseaseDetector.ts"
label_map = {}
with open(detector_path, "r", encoding="utf-8") as f:
    ts_code = f.read()

# Match entries in HF_LABEL_MAP
# Example: Pepper__bell___Bacterial_spot: { diseaseId: "pepper-bacterial-spot", crop: "Bell Pepper", banglaCrop: "মরিচ" },
pattern = re.compile(r'^\s*([A-Za-z0-9_]+):\s*\{\s*diseaseId:\s*["\']([^"\']+)["\'],\s*crop:\s*["\']([^"\']+)["\'],\s*banglaCrop:\s*["\']([^"\']+)["\']', re.MULTILINE)
for match in pattern.finditer(ts_code):
    raw_label, disease_id, crop, bangla_crop = match.groups()
    label_map[raw_label] = {
        "diseaseId": disease_id,
        "crop": crop,
        "banglaCrop": bangla_crop
    }

# 5. Parse DISEASES_DATABASE from src/data/diseasesDatabase.ts
db_path = "src/data/diseasesDatabase.ts"
with open(db_path, "r", encoding="utf-8") as f:
    db_code = f.read()

# Extract disease ids present in DB
db_ids = set(re.findall(r'id:\s*["\']([^"\']+)["\']', db_code))

# 6. Build the authoritative inventory
inventory = []
num_classes = len(id2label)
print(f"Total model output classes in config.json: {num_classes}")

for idx in range(num_classes):
    raw_label = id2label[idx]
    is_healthy = "healthy" in raw_label.lower()
    
    mapping = label_map.get(raw_label, None)
    disease_id = mapping["diseaseId"] if mapping else "UNMAPPED"
    crop_en = mapping["crop"] if mapping else "UNKNOWN"
    crop_bn = mapping["banglaCrop"] if mapping else "UNKNOWN"
    in_db = disease_id in db_ids
    
    c_info = counts_map.get(raw_label, {"train_images": 0, "val_images": 0, "group": "unknown"})
    m_info = metrics_map.get(raw_label, {"precision": 0.0, "recall": 0.0, "f1_score": 0.0, "support": 0})
    
    # Assess test sample sufficiency
    val_count = c_info["val_images"]
    if val_count >= 50:
        sample_sufficiency = "SUFFICIENT"
    elif val_count >= 15:
        sample_sufficiency = "MODERATE"
    else:
        sample_sufficiency = "LOW_SAMPLE_RISK"

    item = {
        "output_index": idx,
        "raw_label": raw_label,
        "crop": crop_en,
        "bangla_crop": crop_bn,
        "disease_id": disease_id,
        "is_healthy": is_healthy,
        "in_database": in_db,
        "in_frontend_map": mapping is not None,
        "dataset_group": c_info["group"],
        "train_samples": c_info["train_images"],
        "val_samples": c_info["val_images"],
        "sample_sufficiency": sample_sufficiency,
        "val_precision": m_info["precision"],
        "val_recall": m_info["recall"],
        "val_f1": m_info["f1_score"]
    }
    inventory.append(item)

# Save JSON
json_path = "reports/audit/crop_disease_inventory.json"
with open(json_path, "w", encoding="utf-8") as f:
    json.dump(inventory, f, indent=2, ensure_ascii=False)
print(f"Saved inventory JSON: {json_path}")

# Save CSV
csv_path = "reports/audit/crop_disease_inventory.csv"
fieldnames = list(inventory[0].keys())
with open(csv_path, "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(inventory)
print(f"Saved inventory CSV: {csv_path}")

# Summary statistics
distinct_crops = sorted(list(set(item["crop"] for item in inventory)))
print(f"\nDistinct crops: {len(distinct_crops)}: {distinct_crops}")
print(f"Classes in database: {sum(1 for i in inventory if i['in_database'])} / {num_classes}")
print(f"Classes in frontend map: {sum(1 for i in inventory if i['in_frontend_map'])} / {num_classes}")
print(f"Healthy classes: {sum(1 for i in inventory if i['is_healthy'])}")
print(f"Diseased classes: {sum(1 for i in inventory if not i['is_healthy'])}")
