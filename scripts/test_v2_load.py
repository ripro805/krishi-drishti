import requests
from transformers import AutoImageProcessor, AutoModelForImageClassification
from PIL import Image
import torch

MODEL_ID = "ripro805/krishi-drishty-v2"
print(f"Loading {MODEL_ID}...")
processor = AutoImageProcessor.from_pretrained(MODEL_ID)
model = AutoModelForImageClassification.from_pretrained(MODEL_ID)

print(f"Model loaded: {model.__class__.__name__}")
print(f"Number of classes: {model.config.num_labels}")
print(f"Sample classes: {list(model.config.id2label.values())[:5]}")
