import glob, os, sys
sys.path.insert(0, ".")
from scripts.predict import predict_image

images = sorted(glob.glob('public/uploads/scans/leaf_*.jp*') + glob.glob('public/uploads/scans/leaf_*.webp'), key=os.path.getmtime, reverse=True)[:10]

for img in images:
    base = os.path.basename(img)
    meta = predict_image(img, crop_hint=None, return_meta=True)
    preds = meta['predictions']
    print(f'FILE: {base}')
    print('  Top 3 Raw Predictions:')
    for p in preds[:3]:
        print(f"    {p['label']}: {p['score']*100:.2f}%")
    crop_items = [(k, round(v*100, 1)) for k, v in list(meta['cropScores'].items())[:4]]
    print(f'  Crop Masses: {crop_items}')
    print()
