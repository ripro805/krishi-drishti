import os
import sys
import json
import csv
import pandas as pd
import numpy as np

# Ensure UTF-8 output
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")

os.makedirs("reports/audit", exist_ok=True)

# 1. Load authoritative inventory
with open("reports/audit/crop_disease_inventory.json", "r", encoding="utf-8") as f:
    inventory = json.load(f)

label2meta = {item["raw_label"]: item for item in inventory}
all_labels = [item["raw_label"] for item in inventory]
all_crops = sorted(list(set(item["crop"] for item in inventory)))

# 2. Load confusion matrix counts from HF model evaluation
cm_path = "reports/hf_model_audit/confusion_matrix_counts.csv"
if not os.path.exists(cm_path):
    print(f"Error: {cm_path} not found")
    sys.exit(1)

df_cm = pd.read_csv(cm_path)
df_cm = df_cm.set_index("Unnamed: 0")

# 3. Build Crop-Level Confusion Matrix
crop_cm = pd.DataFrame(0, index=all_crops, columns=all_crops)
for true_lbl in all_labels:
    true_crop = label2meta[true_lbl]["crop"]
    if true_lbl not in df_cm.index:
        continue
    for pred_lbl in all_labels:
        if pred_lbl not in df_cm.columns:
            continue
        cnt = int(df_cm.loc[true_lbl, pred_lbl])
        pred_crop = label2meta[pred_lbl]["crop"]
        crop_cm.loc[true_crop, pred_crop] += cnt

crop_cm.to_csv("reports/audit/crop_level_confusion_matrix.csv")
print("Saved reports/audit/crop_level_confusion_matrix.csv")

# 4. Build Exhaustive All-Crop Test Matrix
test_matrix = []
cross_crop_errors = []

for item in inventory:
    lbl = item["raw_label"]
    crop = item["crop"]
    is_healthy = item["is_healthy"]
    support = item["val_samples"]
    
    if lbl not in df_cm.index:
        test_matrix.append({
            "class_index": item["output_index"],
            "raw_label": lbl,
            "crop": crop,
            "bangla_crop": item["bangla_crop"],
            "disease_id": item["disease_id"],
            "is_healthy": is_healthy,
            "support": 0,
            "tp": 0,
            "fn": 0,
            "fp": 0,
            "precision": 0.0,
            "recall": 0.0,
            "f1_score": 0.0,
            "within_crop_confusions": 0,
            "top_within_crop_confused_with": "None",
            "cross_crop_confusions": 0,
            "top_cross_crop_confused_with": "None",
            "status": "BLOCKED"
        })
        continue

    row = df_cm.loc[lbl]
    tp = int(row.get(lbl, 0))
    fn = int(row.sum()) - tp
    
    col = df_cm[lbl]
    fp = int(col.sum()) - tp
    
    prec = tp / (tp + fp) if (tp + fp) > 0 else 0.0
    rec = tp / (tp + fn) if (tp + fn) > 0 else 0.0
    f1 = 2 * prec * rec / (prec + rec) if (prec + rec) > 0 else 0.0
    
    # Analyze confusions
    within_crop_errs = []
    cross_crop_errs = []
    
    for other_lbl in all_labels:
        if other_lbl == lbl:
            continue
        cnt = int(row.get(other_lbl, 0))
        if cnt > 0:
            other_crop = label2meta[other_lbl]["crop"]
            if other_crop == crop:
                within_crop_errs.append((other_lbl, cnt))
            else:
                cross_crop_errs.append((other_lbl, other_crop, cnt))
                cross_crop_errors.append({
                    "true_class": lbl,
                    "true_crop": crop,
                    "pred_class": other_lbl,
                    "pred_crop": other_crop,
                    "error_count": cnt
                })
                
    within_crop_count = sum(c for _, c in within_crop_errs)
    cross_crop_count = sum(c for _, _, c in cross_crop_errs)
    
    within_crop_errs.sort(key=lambda x: x[1], reverse=True)
    cross_crop_errs.sort(key=lambda x: x[2], reverse=True)
    
    top_within = f"{within_crop_errs[0][0]} ({within_crop_errs[0][1]})" if within_crop_errs else "None"
    top_cross = f"{cross_crop_errs[0][0]} [{cross_crop_errs[0][1]}] ({cross_crop_errs[0][2]})" if cross_crop_errs else "None"
    
    # Evidence-based Status Determination:
    # PASS: F1 >= 0.90, Support >= 20, Cross-crop error <= 5%
    # FAIL: F1 < 0.85 or Cross-crop error > 10%
    # INSUFFICIENT DATA / LOW SAMPLE RISK: Support < 25
    if support < 25:
        status = "INSUFFICIENT_DATA"
    elif f1 >= 0.90 and cross_crop_count <= 2:
        status = "PASS"
    else:
        status = "FAIL"
        
    test_matrix.append({
        "class_index": item["output_index"],
        "raw_label": lbl,
        "crop": crop,
        "bangla_crop": item["bangla_crop"],
        "disease_id": item["disease_id"],
        "is_healthy": is_healthy,
        "support": support,
        "tp": tp,
        "fn": fn,
        "fp": fp,
        "precision": round(prec, 4),
        "recall": round(rec, 4),
        "f1_score": round(f1, 4),
        "within_crop_confusions": within_crop_count,
        "top_within_crop_confused_with": top_within,
        "cross_crop_confusions": cross_crop_count,
        "top_cross_crop_confused_with": top_cross,
        "status": status
    })

# Save All-Crop Test Matrix
with open("reports/audit/all_crop_test_matrix.json", "w", encoding="utf-8") as f:
    json.dump(test_matrix, f, indent=2, ensure_ascii=False)
print("Saved reports/audit/all_crop_test_matrix.json")

df_matrix = pd.DataFrame(test_matrix)
df_matrix.to_csv("reports/audit/all_crop_test_matrix.csv", index=False)
print("Saved reports/audit/all_crop_test_matrix.csv")

# Save Cross-Crop Error Report
df_cross = pd.DataFrame(cross_crop_errors)
df_cross.to_csv("reports/audit/cross_crop_error_report.csv", index=False)
print("Saved reports/audit/cross_crop_error_report.csv")

# Print Summary of Statuses
status_counts = df_matrix["status"].value_counts().to_dict()
print(f"\nAll-Crop Test Matrix Evaluation Status:")
for s, c in status_counts.items():
    print(f"  - {s}: {c} / {len(test_matrix)} classes")

print(f"\nTotal Cross-Crop Error Events: {len(cross_crop_errors)}")
print("Top 5 Cross-Crop Confusions in Validation:")
for r in cross_crop_errors[:5]:
    print(f"  {r['true_class']} ({r['true_crop']}) -> {r['pred_class']} ({r['pred_crop']}) : {r['error_count']} errors")
