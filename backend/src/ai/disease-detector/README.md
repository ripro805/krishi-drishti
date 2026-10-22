# 🔬 KrishiDrishti AI Leaf Disease Detector Model Subsystem

This module serves as the integration bridge for the computer vision model dedicated to foliar plant pathology diagnosis.

---

## 🎯 Model Architecture & Specifications

- **Backbone Architecture**: Fine-tuned **ConvNeXt-Tiny** / EfficientNetV2 on agricultural foliar datasets (PlantVillage + Bangladesh BARI field datasets).
- **Target Crops**: Tomato, Potato, Bell Pepper, Corn, Rice, Wheat, Apple, Grape.
- **Pathogen Coverage**: 200+ crop physiological disorders, fungal blights, bacterial spots, and viral infections.
- **Inference Latency Goal**: `< 1200ms` on GPU/T4 or `< 2500ms` on CPU.

---

## 📡 API Contract (Vision Inference Service)

When the Python FastAPI vision microservice is running:

### Request (`POST /predict`):
```json
{
  "image": "data:image/jpeg;base64,...",
  "cropHint": "Tomato",
  "includeGradCam": true
}
```

### Response:
```json
{
  "crop": "Tomato",
  "diseaseId": "tomato-early-blight",
  "diseaseName": "Early Blight",
  "scientificName": "Alternaria solani",
  "confidence": 96.8,
  "isLowConfidence": false,
  "metrics": {
    "affectedAreaPercentage": 22.4,
    "chlorophyllIndex": "Moderate (27.9 SPAD)",
    "lesionCount": 7,
    "tissueNecrosis": true
  },
  "topPredictions": [
    { "disease": "Early Blight", "probability": 0.968 },
    { "disease": "Septoria Leaf Spot", "probability": 0.021 },
    { "disease": "Healthy", "probability": 0.005 }
  ],
  "gradCamHeatmapUrl": "https://storage.krishidrishti.gov.bd/heatmaps/hm-01.png"
}
```

---

## 🚀 Future Implementation Steps

1. Export trained PyTorch weights (`model.pth`) or ONNX runtime artifact (`model.onnx`).
2. Run FastAPI Python serving script:
   ```bash
   uvicorn app:app --host 0.0.0.0 --port 8000 --reload
   ```
3. Update `DISEASE_MODEL_API_URL="http://localhost:8000/api/predict"` in `backend/.env`.
