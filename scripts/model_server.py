import io
import os
import time
import base64
import logging
from contextlib import asynccontextmanager
from typing import List, Optional

from fastapi import FastAPI, HTTPException, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from PIL import Image
import torch
from transformers import pipeline

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(name)s: %(message)s")
logger = logging.getLogger("KrishiDrishti.ModelServer")

# Suppress verbose transformers warnings
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"
logging.getLogger("transformers").setLevel(logging.ERROR)

MODEL_NAME = "ripro805/krishidrishti-plant-disease"
START_TIME = time.time()
MAX_PAYLOAD_SIZE = 15 * 1024 * 1024  # 15 MB limit

# Shared pipeline holder
_pipeline = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global _pipeline
    device_idx = 0 if torch.cuda.is_available() else -1
    device_name = "CUDA GPU" if device_idx == 0 else "Host CPU"
    logger.info(f"Starting KrishiDrishti Model Server on {device_name}...")
    logger.info(f"Loading neural classifier '{MODEL_NAME}' into memory...")
    
    t0 = time.time()
    try:
        _pipeline = pipeline(
            "image-classification",
            model=MODEL_NAME,
            device=device_idx,
        )
        load_time = time.time() - t0
        classes_count = len(_pipeline.model.config.id2label) if hasattr(_pipeline.model, "config") else 24
        logger.info(f"Model successfully preloaded in {load_time:.2f}s with {classes_count} classes.")
    except Exception as e:
        logger.error(f"Failed to load Hugging Face model: {e}")
        raise e
        
    yield
    
    logger.info("Shutting down KrishiDrishti Model Server...")
    _pipeline = None

app = FastAPI(
    title="KrishiDrishti Neural Inference API",
    description="High-performance persistent model server for crop disease leaf screening",
    version="1.0.0",
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

class PredictionItem(BaseModel):
    label: str = Field(..., description="Pathology classification label")
    score: float = Field(..., description="Confidence probability between 0.0 and 1.0")

class PredictResponse(BaseModel):
    predictions: List[dict]
    latencyMs: float
    provider: str
    classesCount: int

@app.get("/health")
def health():
    global _pipeline
    is_ready = _pipeline is not None
    classes_count = len(_pipeline.model.config.id2label) if (is_ready and hasattr(_pipeline.model, "config")) else 24
    device = "cuda" if torch.cuda.is_available() else "cpu"
    
    return {
        "status": "ready" if is_ready else "loading",
        "model": MODEL_NAME,
        "classesCount": classes_count,
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
        raw_preds = _pipeline(image)
        latency_ms = round((time.time() - t0) * 1000, 2)
        
        # Sort top-5 predictions
        formatted = [
            {"label": p["label"], "score": float(p["score"])}
            for p in raw_preds[:5]
        ]

        return {
            "predictions": formatted,
            "latencyMs": latency_ms,
            "provider": "fastapi-persistent",
            "classesCount": len(formatted),
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
