import glob
import os
from PIL import Image
from transformers import pipeline

print("Loading ripro805/krishidrishti-plant-disease ...")
pipe = pipeline('image-classification', model='ripro805/krishidrishti-plant-disease')

test_imgs = sorted(glob.glob('public/uploads/scans/*.*'), key=os.path.getmtime)[-15:]
print(f"Testing {len(test_imgs)} latest scans from user...\n")

for img_path in test_imgs:
    img = Image.open(img_path).convert('RGB')
    res = pipe(img)
    print(f"File: {os.path.basename(img_path)}")
    print(f"  Top 1: {res[0]['label']} ({res[0]['score']*100:.2f}%)")
    print(f"  Top 2: {res[1]['label']} ({res[1]['score']*100:.2f}%)")
    print(f"  Top 3: {res[2]['label']} ({res[2]['score']*100:.2f}%)")
    print("-" * 50)
