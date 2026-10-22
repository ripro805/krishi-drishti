import sys
import json
import io
import base64
import os

# Suppress noisy logs from transformers
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"
import logging
logging.getLogger("transformers").setLevel(logging.ERROR)

from PIL import Image
from transformers import pipeline

_pipe = None

def get_pipeline():
    global _pipe
    if _pipe is None:
        _pipe = pipeline("image-classification", model="ripro805/krishidrishti-plant-disease")
    return _pipe

def predict_image(image_input):
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

    raw_preds = pipe(img)
    preds = [{"label": p["label"], "score": float(p["score"])} for p in raw_preds]
    return preds

if __name__ == "__main__":
    try:
        if len(sys.argv) > 1:
            arg = sys.argv[1]
            if arg == "--stdin":
                content = sys.stdin.read().strip()
                preds = predict_image(content)
            else:
                preds = predict_image(arg)
        else:
            img = Image.new("RGB", (224, 224), color=(34, 139, 34))
            preds = predict_image(img)

        print(json.dumps(preds))
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)
