import sys
import json
import io
import base64
import os

# Suppress noisy logs from transformers
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"
os.environ["HF_HUB_DISABLE_SYMLINKS_WARNING"] = "1"
import logging
logging.getLogger("transformers").setLevel(logging.ERROR)

from PIL import Image
from transformers import pipeline

sys.path.insert(0, os.path.dirname(__file__))
import torch

try:
    from crop_registry import CROP_REGISTRY
    from crop_taxonomy import aggregate_crop_probabilities, validate_image_quality
except ImportError:
    from scripts.crop_registry import CROP_REGISTRY
    from scripts.crop_taxonomy import aggregate_crop_probabilities, validate_image_quality

MODEL_NAME = os.environ.get("MODEL_NAME", "ripro805/krishidrishti-plant-disease")
MODEL_REVISION = os.environ.get("MODEL_REVISION", None)

_pipe = None


def get_pipeline():
    global _pipe
    if _pipe is None:
        kwargs = {"task": "image-classification", "model": MODEL_NAME}
        if MODEL_REVISION:
            kwargs["revision"] = MODEL_REVISION
        _pipe = pipeline(**kwargs)
    return _pipe


def predict_image(image_input, crop_hint=None, return_meta=False):
    if isinstance(image_input, str):
        image_input = image_input.strip()
        if os.path.isfile(image_input):
            img = Image.open(image_input).convert("RGB")
        else:
            if image_input.startswith("data:"):
                image_input = image_input.split(",", 1)[1]
            image_bytes = base64.b64decode(image_input)
            img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    elif isinstance(image_input, bytes):
        img = Image.open(io.BytesIO(image_input)).convert("RGB")
    else:
        img = image_input

    # Step 1: Pre-inference image quality and foliar plausibility validation
    quality_res = validate_image_quality(img)
    if not quality_res[0]:
        analysis = aggregate_crop_probabilities([], crop_hint=crop_hint, image_quality_check=quality_res)
        analysis["dominantCrop"] = analysis.get("detected_crop")
        analysis["dominantCropScore"] = analysis.get("crop_confidence")
        if return_meta:
            return analysis
        return analysis["predictions"]

    pipe = get_pipeline()

    # Step 2: ConvNeXt Inference
    inputs = pipe.image_processor(images=img, return_tensors="pt")
    dev = pipe.model.device
    inputs = {k: v.to(dev) for k, v in inputs.items()}

    with torch.no_grad():
        out = pipe.model.convnext(**inputs)
        logits = pipe.model.classifier(out.pooler_output)[0]
        probs = torch.softmax(logits, dim=0)

    id2label = pipe.model.config.id2label
    raw_preds = [{"label": id2label[i], "score": float(probs[i].item())} for i in range(len(probs))]
    raw_preds.sort(key=lambda x: x["score"], reverse=True)

    # Step 3: Probabilistic Hierarchical Analysis & Selected-Crop Validation
    analysis = aggregate_crop_probabilities(raw_preds, crop_hint=crop_hint)
    analysis["dominantCrop"] = analysis.get("detected_crop")
    analysis["dominantCropScore"] = analysis.get("crop_confidence")

    if return_meta:
        return analysis
    return analysis["predictions"]


if __name__ == "__main__":
    try:
        crop_hint = None
        return_meta = "--meta" in sys.argv
        args = [a for a in sys.argv[1:] if a != "--meta"]

        # Check for crop_hint flag (e.g. --hint=Apple)
        filtered_args = []
        for a in args:
            if a.startswith("--hint="):
                crop_hint = a.split("=", 1)[1]
            elif a.startswith("--crop="):
                crop_hint = a.split("=", 1)[1]
            else:
                filtered_args.append(a)

        if filtered_args:
            arg = filtered_args[0]
            if arg == "--stdin":
                content = sys.stdin.read().strip()
                result = predict_image(content, crop_hint=crop_hint, return_meta=return_meta)
            else:
                result = predict_image(arg, crop_hint=crop_hint, return_meta=return_meta)
        else:
            img = Image.new("RGB", (224, 224), color=(34, 139, 34))
            result = predict_image(img, crop_hint=crop_hint, return_meta=return_meta)

        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({"error": str(e), "status": "model_error"}))
        sys.exit(1)
