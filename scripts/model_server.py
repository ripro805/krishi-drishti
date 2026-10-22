import io
import base64
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from PIL import Image
from transformers import pipeline
import uvicorn

app = FastAPI(title="KrishiDrishti AI Inference Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PredictRequest(BaseModel):
    imageData: str

print("[ModelServer] Loading ripro805/krishidrishti-plant-disease into memory...")
pipe = pipeline("image-classification", model="ripro805/krishidrishti-plant-disease")
print("[ModelServer] Model ready for fast inference!")

@app.get("/health")
def health():
    return {"status": "ok", "model": "ripro805/krishidrishti-plant-disease"}

@app.post("/predict")
def predict(req: PredictRequest):
    try:
        raw_data = req.imageData
        if raw_data.startswith("data:"):
            raw_data = raw_data.split(",", 1)[1]
        
        img_bytes = base64.b64decode(raw_data)
        img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
        
        raw_preds = pipe(img)
        predictions = [{"label": p["label"], "score": float(p["score"])} for p in raw_preds]
        
        return {"predictions": predictions}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=5005, log_level="info")
