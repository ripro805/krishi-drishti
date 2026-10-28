import urllib.request, json, base64, sys

sys.stdout.reconfigure(encoding='utf-8')

test_cases = [
    ('public/uploads/scans/leaf_1793210873843_xwpu8.jpeg', None),
    ('public/uploads/scans/leaf_1793210873843_xwpu8.jpeg', 'Tomato'),
    ('public/uploads/scans/leaf_1793210328289_uq4ir.jpeg', None),
    ('public/uploads/scans/leaf_1793210328289_uq4ir.jpeg', 'Corn'),
    ('all diseases/corn leaf bright.jpg', None),
    ('all diseases/corn leaf bright.jpg', 'Corn'),
]

for img_path, hint in test_cases:
    with open(img_path, 'rb') as f:
        b64 = base64.b64encode(f.read()).decode('utf-8')
    data = json.dumps({'imageData': b64, 'cropHint': hint}).encode('utf-8')
    req = urllib.request.Request('http://127.0.0.1:5005/predict', data=data, headers={'Content-Type': 'application/json'})
    with urllib.request.urlopen(req) as resp:
        res = json.loads(resp.read().decode())
        pred_label = res['prediction']['label'] if res.get('prediction') else None
        print(f"IMG: {img_path.split('/')[-1]} | HINT: {hint} => STATUS: {res['status']} | DET: {res['detected_crop']} ({res.get('bangla_detected_crop')})")
        print(f"  CONF: {res['confidence']}% | PRED: {pred_label}")
        print(f"  MSG: {res.get('banglaMessage')}")
        print("-" * 50)
