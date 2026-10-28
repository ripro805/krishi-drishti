import io
import os
import time
import base64
import logging
from contextlib import asynccontextmanager
from typing import List, Optional, Dict, Any

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from PIL import Image
import torch
from transformers import pipeline

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(name)s: %(message)s")
logger = logging.getLogger("KrishiDrishti.ModelServer")

# Suppress verbose transformers & symlink warnings
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"
os.environ["HF_HUB_DISABLE_SYMLINKS_WARNING"] = "1"
logging.getLogger("transformers").setLevel(logging.ERROR)

MODEL_NAME = os.environ.get("MODEL_NAME", "ripro805/krishidrishti-plant-disease")
MODEL_REVISION = os.environ.get("MODEL_REVISION", None)
START_TIME = time.time()
MAX_PAYLOAD_SIZE = 15 * 1024 * 1024  # 15 MB limit

# Shared pipeline holder
_pipeline = None

try:
    from crop_registry import CROP_REGISTRY, validate_registry
    from crop_taxonomy import aggregate_crop_probabilities, validate_image_quality
except ImportError:
    from scripts.crop_registry import CROP_REGISTRY, validate_registry
    from scripts.crop_taxonomy import aggregate_crop_probabilities, validate_image_quality


@asynccontextmanager
async def lifespan(app: FastAPI):
    global _pipeline
    device_idx = 0 if torch.cuda.is_available() else -1
    device_name = "CUDA GPU" if device_idx == 0 else "Host CPU"
    logger.info(f"Starting KrishiDrishti Model Server on {device_name}...")
    
    # 1. Validate Authoritative Crop & Model Registry
    try:
        validate_registry()
        logger.info(f"Authoritative Crop Registry validated: {len(CROP_REGISTRY)} crops configured.")
    except Exception as reg_err:
        logger.error(f"Crop Registry validation failed: {reg_err}")
        raise reg_err

    # 2. Preload Neural Classifier
    logger.info(f"Loading neural classifier '{MODEL_NAME}' (revision: {MODEL_REVISION or 'default'})...")
    t0 = time.time()
    try:
        pipeline_kwargs = {
            "task": "image-classification",
            "model": MODEL_NAME,
            "device": device_idx,
        }
        if MODEL_REVISION:
            pipeline_kwargs["revision"] = MODEL_REVISION

        _pipeline = pipeline(**pipeline_kwargs)
        load_time = time.time() - t0
        classes_count = len(_pipeline.model.config.id2label) if hasattr(_pipeline.model, "config") else 50
        logger.info(f"Model successfully preloaded in {load_time:.2f}s with {classes_count} classes.")
    except Exception as e:
        logger.error(f"Failed to load Hugging Face model: {e}")
        raise e

    yield

    logger.info("Shutting down KrishiDrishti Model Server...")
    _pipeline = None


app = FastAPI(
    title="KrishiDrishti Neural Inference API",
    description="High-performance persistent model server with selected-crop validation and OOD rejection",
    version="2.0.0",
    lifespan=lifespan,
)

# Enable CORS for Next.js frontend and Express backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


class PredictRequest(BaseModel):
    imageData: str = Field(..., description="Base64 encoded leaf image or data URL")
    cropHint: Optional[str] = Field(None, description="Optional botanical crop hint context from UI or query param")


class PredictResponse(BaseModel):
    status: str
    can_provide_treatment: bool
    selected_crop: Optional[str] = None
    detected_crop: Optional[str] = None
    bangla_selected_crop: Optional[str] = None
    bangla_detected_crop: Optional[str] = None
    confidence: Optional[float] = None
    crop_confidence: Optional[float] = None
    prediction: Optional[Dict[str, Any]] = None
    predictions: List[Dict[str, Any]]
    message: Optional[str] = None
    banglaMessage: Optional[str] = None
    cropScores: Optional[Dict[str, float]] = None
    isCrossCropAmbiguous: Optional[bool] = False
    cropMargin: Optional[float] = None
    disambiguatedTop: Optional[Dict[str, Any]] = None
    dominantCrop: Optional[str] = None
    dominantCropScore: Optional[float] = None
    latencyMs: float
    provider: str
    classesCount: int


@app.get("/health")
def health():
    global _pipeline
    is_ready = _pipeline is not None
    classes_count = len(_pipeline.model.config.id2label) if (is_ready and hasattr(_pipeline.model, "config")) else 50
    device = "cuda" if torch.cuda.is_available() else "cpu"

    return {
        "status": "ready" if is_ready else "loading",
        "model": MODEL_NAME,
        "classesCount": classes_count,
        "supportedCrops": len(CROP_REGISTRY),
        "device": device,
        "uptimeSeconds": round(time.time() - START_TIME, 2),
    }


@app.post("/predict")
def predict(req: PredictRequest):
    global _pipeline
    if _pipeline is None:
        raise HTTPException(status_code=503, detail="Inference model is currently loading into memory")

    raw_data = req.imageData.strip()
    if not raw_data:
        raise HTTPException(status_code=400, detail="Empty image data provided")

    # Check payload size
    if len(raw_data) > MAX_PAYLOAD_SIZE:
        raise HTTPException(status_code=413, detail="Image size exceeds 15MB limit")

    try:
        if raw_data.startswith("data:"):
            raw_data = raw_data.split(",", 1)[1]

        image_bytes = base64.b64decode(raw_data)
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    except Exception as decode_err:
        raise HTTPException(status_code=400, detail=f"Invalid or corrupted image format: {str(decode_err)}")

    t0 = time.time()
    try:
        # Step 1: Pre-inference Image Quality & Foliar Plausibility Validation
        quality_res = validate_image_quality(image)
        if not quality_res[0]:
            analysis = aggregate_crop_probabilities([], crop_hint=req.cropHint, image_quality_check=quality_res)
            latency_ms = round((time.time() - t0) * 1000, 2)
            logger.info(f"Image rejected during quality pre-check: status={analysis['status']}")
            return {
                **analysis,
                "dominantCrop": analysis.get("detected_crop"),
                "dominantCropScore": analysis.get("crop_confidence"),
                "latencyMs": latency_ms,
                "provider": "fastapi-persistent",
                "classesCount": len(CROP_REGISTRY),
            }

        # Step 2: Neural Image Classification
        inputs = _pipeline.image_processor(images=image, return_tensors="pt")
        dev = _pipeline.model.device
        inputs = {k: v.to(dev) for k, v in inputs.items()}

        with torch.no_grad():
            outputs = _pipeline.model(**inputs)
            logits = outputs.logits[0] if hasattr(outputs, "logits") else outputs[0]
            probs = torch.softmax(logits, dim=0)

        id2label = _pipeline.model.config.id2label
        raw_preds = [
            {"label": id2label.get(i, id2label.get(str(i), f"Class_{i}")), "score": float(probs[i].item())}
            for i in range(len(probs))
        ]
        raw_preds.sort(key=lambda x: x["score"], reverse=True)
        latency_ms = round((time.time() - t0) * 1000, 2)

        # Step 3: Probabilistic Hierarchical Analysis & Validation
        analysis = aggregate_crop_probabilities(raw_preds, crop_hint=req.cropHint)

        logger.info(
            f"Inference result: status={analysis['status']} | "
            f"selectedCrop={analysis['selected_crop']} | detectedCrop={analysis['detected_crop']} | "
            f"confidence={analysis['confidence']}% | canTreat={analysis['can_provide_treatment']} | "
            f"latency={latency_ms}ms"
        )

        return {
            **analysis,
            "dominantCrop": analysis.get("detected_crop"),
            "dominantCropScore": analysis.get("crop_confidence"),
            "latencyMs": latency_ms,
            "provider": "fastapi-persistent",
            "classesCount": len(raw_preds),
        }
    except Exception as infer_err:
        logger.error(f"Inference computation error: {infer_err}")
        raise HTTPException(status_code=500, detail=f"Model inference failed: {str(infer_err)}")


if __name__ == "__main__":
    import uvicorn
    host = os.environ.get("MODEL_SERVER_HOST", "127.0.0.1")
    port = int(os.environ.get("MODEL_SERVER_PORT", 5005))
    logger.info(f"Starting server on {host}:{port}")
    uvicorn.run(app, host=host, port=port, log_level="info")
