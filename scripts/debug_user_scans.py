import sys
import os
import torch
from PIL import Image
from transformers import pipeline

sys.stdout.reconfigure(encoding='utf-8')
model_name = 'ripro805/krishidrishti-plant-disease'
pipe = pipeline('image-classification', model=model_name, device=0 if torch.cuda.is_available() else -1)

scan_files = [
    'all diseases/corn leaf bright.jpg',
    'public/uploads/scans/leaf_1793210873843_xwpu8.jpeg',
    'public/uploads/scans/leaf_1793210328289_uq4ir.jpeg',
]

for img_path in scan_files:
    if os.path.exists(img_path):
        print(f"=== {img_path} ===")
        img = Image.open(img_path).convert('RGB')
        preds = pipe(img, top_k=10)
        for p in preds:
            print(f"  {p['label']}: {p['score']*100:.2f}%")
