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
    from crop_taxonomy import LABEL_TO_CROP, aggregate_crop_probabilities
except ImportError:
    from scripts.crop_taxonomy import LABEL_TO_CROP, aggregate_crop_probabilities

MODEL_NAME = os.environ.get("MODEL_NAME", "ripro805/krishidrishti-plant-disease")
MODEL_REVISION = os.environ.get("MODEL_REVISION", None)

_pipe = None
_crop_prototypes = {}


def get_pipeline():
    global _pipe, _crop_prototypes
    if _pipe is None:
        kwargs = {"task": "image-classification", "model": MODEL_NAME}
        if MODEL_REVISION:
            kwargs["revision"] = MODEL_REVISION
        _pipe = pipeline(**kwargs)

        # Precompute normalized botanical crop prototypes
        W = _pipe.model.classifier.weight.data
        id2label = _pipe.model.config.id2label
        crops = sorted(list(set(LABEL_TO_CROP.values())))
        _crop_prototypes = {}
        for crop in crops:
            indices = [i for i, label in id2label.items() if LABEL_TO_CROP.get(label) == crop]
            if indices:
                v = W[indices].mean(dim=0)
                _crop_prototypes[crop] = (v / torch.norm(v)).to(_pipe.model.device)
    return _pipe

def predict_image(image_input, crop_hint=None, return_meta=False):
    pipe = get_pipeline()
    
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

    # Extract features and compute prototype similarities
    inputs = pipe.image_processor(images=img, return_tensors="pt")
    dev = pipe.model.device
    inputs = {k: v.to(dev) for k, v in inputs.items()}

    with torch.no_grad():
        out = pipe.model.convnext(**inputs)
        feats = out.pooler_output[0]
        norm_feats = feats / torch.norm(feats)
        proto_sims = {c: torch.dot(norm_feats, p).item() for c, p in _crop_prototypes.items()}

        logits = pipe.model.classifier(out.pooler_output)[0]
        probs = torch.softmax(logits, dim=0)

    id2label = pipe.model.config.id2label
    raw_preds = [{"label": id2label[i], "score": float(probs[i].item())} for i in range(len(probs))]
    raw_preds.sort(key=lambda x: x["score"], reverse=True)

    analysis = aggregate_crop_probabilities(raw_preds, crop_hint=crop_hint, proto_sims=proto_sims)

    if return_meta:
        return analysis
    return analysis["predictions"]


if __name__ == "__main__":
    try:
        crop_hint = None
        return_meta = "--meta" in sys.argv
        args = [a for a in sys.argv[1:] if a != "--meta"]

        if args:
            arg = args[0]
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
        print(json.dumps({"error": str(e)}))
        sys.exit(1)
