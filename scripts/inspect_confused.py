import os
from PIL import Image
from transformers import pipeline

pipe = pipeline('image-classification', model='ripro805/krishidrishti-plant-disease')
test_files = [
    'apple scrab.jpg',
    'Tomato Early Blight.jpg',
    'capcicum bacterial spot.jpg',
    'grape eska.jpg',
    'peach bectarial spot.jpg',
    'potato blight.jpg'
]

for f in test_files:
    p = os.path.join('all diseases', f)
    img = Image.open(p).convert('RGB')
    res = pipe(img, top_k=5)
    print(f"=== {f} ===")
    for r in res:
        print(f"  {r['label']}: {r['score']*100:.2f}%")
