import glob, os, sys
sys.path.insert(0, ".")
from scripts.predict import predict_image

for f in sorted(glob.glob('public/uploads/scans/leaf_*.*'), key=os.path.getmtime, reverse=True)[:10]:
    b = os.path.basename(f)
    auto = predict_image(f, crop_hint=None, return_meta=True)
    grape = predict_image(f, crop_hint='Grape', return_meta=True)
    apple = predict_image(f, crop_hint='Apple', return_meta=True)
    corn = predict_image(f, crop_hint='Corn (Maize)', return_meta=True)
    wheat = predict_image(f, crop_hint='Wheat', return_meta=True)
    rice = predict_image(f, crop_hint='Rice', return_meta=True)
    
    print(f"=== {b} ===")
    top_label = auto['disambiguatedTop']['label']
    top_score = auto['disambiguatedTop']['score'] * 100
    print(f"  AUTO Top 1: {top_label} ({top_score:.1f}%)")
    scores = {k: round(v * 100, 1) for k, v in auto['cropScores'].items() if v > 0.03}
    print(f"  AUTO Crop Scores: {scores}")
    print(f"  If Grape: {grape['disambiguatedTop']['label']} ({grape['disambiguatedTop']['score']*100:.1f}%) [raw={grape['disambiguatedTop']['raw_score']*100:.1f}%]")
    print(f"  If Apple: {apple['disambiguatedTop']['label']} ({apple['disambiguatedTop']['score']*100:.1f}%) [raw={apple['disambiguatedTop']['raw_score']*100:.1f}%]")
    print(f"  If Wheat: {wheat['disambiguatedTop']['label']} ({wheat['disambiguatedTop']['score']*100:.1f}%) [raw={wheat['disambiguatedTop']['raw_score']*100:.1f}%]")
    print()
