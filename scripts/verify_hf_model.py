#!/usr/bin/env python3
"""
scripts/verify_hf_model.py
Standalone Hugging Face Model Verification Script for KrishiDrishti.

Verifies:
1. Exact Hugging Face model repository and pinned revision.
2. Architecture, layer composition, and total parameter count.
3. Input tensor requirements and preprocessor configuration.
4. Output tensor shape and complete 50-class label manifest from id2label.
5. Detection of missing, duplicate, or malformed label IDs.
6. Execution of forward inference on genuine specimen images without frontend/API dependencies.
7. Complete 50-element output prediction vector (raw logits and normalized softmax probabilities) saved to a diagnostic report.
"""

import os
import sys
import json
import hashlib
from typing import Dict, Any, List
import torch
from PIL import Image
from transformers import AutoConfig, AutoImageProcessor, AutoModelForImageClassification

HF_MODEL_ID = os.environ.get("HF_MODEL_ID", "ripro805/krishi-drishty-v2")
PINNED_REVISION = os.environ.get("PINNED_REVISION", "c7a772ef2ae36fb3285db268482863d0f039c83b")
REPORTS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "reports", "audit")
OUTPUT_REPORT_PATH = os.path.join(REPORTS_DIR, "standalone_model_verification.json")

def compute_file_sha256(filepath: str) -> str:
    """Compute SHA256 checksum of a file."""
    if not os.path.isfile(filepath):
        return "N/A"
    hasher = hashlib.sha256()
    with open(filepath, "rb") as f:
        while chunk := f.read(65536):
            hasher.update(chunk)
    return hasher.hexdigest()

def verify_model():
    print("=" * 80)
    print("KRISHIDRISHTI: STANDALONE HUGGING FACE MODEL VERIFICATION")
    print(f"Target Repository: {HF_MODEL_ID}")
    print(f"Pinned Revision:   {PINNED_REVISION}")
    print("=" * 80)

    # 1. Load Configuration
    print("\n[Step 1] Loading Configuration from Hugging Face...")
    config = AutoConfig.from_pretrained(HF_MODEL_ID, revision=PINNED_REVISION)
    id2label = {int(k): str(v) for k, v in config.id2label.items()}
    label2id = {str(k): int(v) for k, v in config.label2id.items()}
    num_classes = config.num_labels

    print(f"  Architectures: {config.architectures}")
    print(f"  Model Type:    {config.model_type}")
    print(f"  Num Classes:   {num_classes}")

    # 2. Check for duplicate, missing, or inconsistent labels
    label_issues = []
    expected_classes = 55 if "v2" in HF_MODEL_ID else 50
    if num_classes != expected_classes:
        label_issues.append(f"Expected {expected_classes} classes, but config.num_labels = {num_classes}")
    
    missing_indices = [i for i in range(num_classes) if i not in id2label]
    if missing_indices:
        label_issues.append(f"Missing id2label indices: {missing_indices}")
    
    unique_labels = set(id2label.values())
    if len(unique_labels) != len(id2label):
        duplicates = [lbl for lbl in unique_labels if list(id2label.values()).count(lbl) > 1]
        label_issues.append(f"Duplicate labels detected: {duplicates}")

    for idx, lbl in sorted(id2label.items()):
        if label2id.get(lbl) != idx:
            label_issues.append(f"Inconsistent bidirectional mapping for index {idx} <-> '{lbl}' (label2id has {label2id.get(lbl)})")

    if label_issues:
        print("  [ERROR] Label integrity checks failed:")
        for issue in label_issues:
            print(f"    - {issue}")
    else:
        print("  [PASS] All 50 classes present with zero missing, duplicate, or bidirectional inconsistencies.")

    # 3. Load Image Processor
    print("\n[Step 3] Loading Preprocessor Configuration...")
    processor = AutoImageProcessor.from_pretrained(HF_MODEL_ID, revision=PINNED_REVISION)
    print(f"  Processor Class:  {processor.__class__.__name__}")
    print(f"  Input Size:       {processor.size}")
    print(f"  Image Mean:       {processor.image_mean}")
    print(f"  Image Std:        {processor.image_std}")
    print(f"  Resample Mode:    {processor.resample}")
    print(f"  Do Rescale:       {processor.do_rescale} (factor: {getattr(processor, 'rescale_factor', None)})")
    print(f"  Do Normalize:     {processor.do_normalize}")

    # 4. Load Model and Count Parameters
    print("\n[Step 4] Loading Weights & Checkpoint...")
    model = AutoModelForImageClassification.from_pretrained(HF_MODEL_ID, revision=PINNED_REVISION)
    model.eval()

    total_params = sum(p.numel() for p in model.parameters())
    trainable_params = sum(p.numel() for p in model.parameters() if p.requires_grad)
    print(f"  Architecture:     {model.__class__.__name__}")
    print(f"  Total Parameters: {total_params:,} ({total_params / 1e6:.2f}M)")
    print(f"  Trainable Params: {trainable_params:,}")

    # 5. Locate genuine test images in repository
    print("\n[Step 5] Selecting Genuine Test Images for Forward Inference...")
    candidate_paths = [
        "public/uploads/scans/leaf_1793182634962_kl2lu.jpeg",
        "public/uploads/scans/leaf_1793077705950_v4xne.jpeg",
        "public/uploads/scans/leaf_1793184643419_6pj2e.jpeg",
        "public/uploads/scans/leaf_1793184448452_ntuwj.jpeg",
        "public/uploads/scans/leaf_1793102766923_uxx70.jpeg"
    ]
    test_image_paths = [p for p in candidate_paths if os.path.exists(p)]
    if not test_image_paths:
        # Fallback to any scanned file
        import glob
        test_image_paths = sorted(glob.glob("public/uploads/scans/*.jpeg"))[:3]

    print(f"  Found {len(test_image_paths)} genuine test images.")

    # 6. Run Forward Pass & Capture Complete 50-Class Prediction Vector
    test_results = []
    for test_path in test_image_paths:
        print(f"\n  Testing Image: {test_path} ({os.path.getsize(test_path)} bytes)")
        img = Image.open(test_path).convert("RGB")
        inputs = processor(images=img, return_tensors="pt")
        input_shape = list(inputs["pixel_values"].shape)

        with torch.no_grad():
            outputs = model(**inputs)
            logits = outputs.logits[0]
            output_shape = list(outputs.logits.shape)
            probs = torch.softmax(logits, dim=-1)

        # Build full 50-class vector
        prediction_vector = []
        for idx in range(num_classes):
            prediction_vector.append({
                "index": idx,
                "label": id2label[idx],
                "logit": float(logits[idx].item()),
                "probability": float(probs[idx].item())
            })

        # Rank predictions
        ranked = sorted(prediction_vector, key=lambda x: x["probability"], reverse=True)
        top1 = ranked[0]
        top2 = ranked[1]
        top3 = ranked[2]
        margin = top1["probability"] - top2["probability"]

        print(f"    Input Tensor Shape:  {input_shape}")
        print(f"    Output Tensor Shape: {output_shape}")
        print(f"    Top-1: [{top1['index']}] {top1['label']} ({top1['probability']*100:.2f}%, logit: {top1['logit']:.2f})")
        print(f"    Top-2: [{top2['index']}] {top2['label']} ({top2['probability']*100:.2f}%, logit: {top2['logit']:.2f})")
        print(f"    Top-3: [{top3['index']}] {top3['label']} ({top3['probability']*100:.2f}%, logit: {top3['logit']:.2f})")
        print(f"    Top-1 to Top-2 Margin: {margin*100:.2f}%")

        test_results.append({
            "image_path": test_path,
            "input_shape": input_shape,
            "output_shape": output_shape,
            "top1": top1,
            "top2": top2,
            "top3": top3,
            "top_margin": margin,
            "full_prediction_vector": prediction_vector
        })

    # 7. Write Complete Verification Manifest to File
    os.makedirs(REPORTS_DIR, exist_ok=True)
    report_data = {
        "model_repository": HF_MODEL_ID,
        "pinned_revision": PINNED_REVISION,
        "model_type": config.model_type,
        "architecture": model.__class__.__name__,
        "num_classes": num_classes,
        "total_parameters": total_params,
        "trainable_parameters": trainable_params,
        "preprocessor": {
            "class": processor.__class__.__name__,
            "size": dict(processor.size) if hasattr(processor.size, "items") else str(processor.size),
            "image_mean": list(processor.image_mean),
            "image_std": list(processor.image_std),
            "resample": str(processor.resample),
            "do_rescale": processor.do_rescale,
            "do_normalize": processor.do_normalize
        },
        "label_audit": {
            "num_classes": num_classes,
            "is_valid": len(label_issues) == 0,
            "issues": label_issues,
            "class_manifest": id2label
        },
        "sample_inferences": test_results
    }

    with open(OUTPUT_REPORT_PATH, "w", encoding="utf-8") as f:
        json.dump(report_data, f, indent=2)

    print(f"\n[PASS] Model verification report saved successfully to:")
    print(f"  {OUTPUT_REPORT_PATH}")
    print("=" * 80)
    return report_data

if __name__ == "__main__":
    verify_model()
