import glob, os, sys
sys.path.insert(0, '.')
from scripts.predict import predict_image

unique_images = {}
for f in sorted(glob.glob('public/uploads/scans/leaf_*.*'), key=os.path.getmtime, reverse=True):
    sz = os.path.getsize(f)
    if sz not in unique_images:
        unique_images[sz] = f

print(f"Testing {len(unique_images)} unique specimen images:\n")

for sz, path in unique_images.items():
    b = os.path.basename(path)
    meta = predict_image(path, crop_hint=None, return_meta=True)
    dom = meta['dominantCrop']
    top = meta['disambiguatedTop']
    scores = [(k, round(v*100, 1)) for k, v in list(meta['cropScores'].items())[:5]]
    print(f"[{b}] Size: {sz}")
    top_label = top['label']
    top_sc = top['score'] * 100
    print(f"  Dominant: {dom} | Top: {top_label} ({top_sc:.1f}%)")
    print(f"  Crop Mass: {scores}")
    
    # Check what happens if conditioned on Grape, Apple, Rice, Wheat, Corn
    for c in ['Grape', 'Apple', 'Rice', 'Wheat', 'Corn (Maize)', 'Tomato', 'Potato']:
        c_meta = predict_image(path, crop_hint=c, return_meta=True)
        c_top = c_meta['disambiguatedTop']
        mass = c_meta['cropScores'].get(c, 0)
        c_label = c_top['label']
        c_sc = c_top['score'] * 100
        if c_top['score'] > 0.30 and mass > 0.03:
            print(f"    * {c}: {c_label} ({c_sc:.1f}%) [mass={mass*100:.1f}%]")
    print()
