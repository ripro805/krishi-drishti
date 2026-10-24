import sys
import time
import requests
import base64
import io
from PIL import Image

BASE_URL = "http://127.0.0.1:5005"

def run_tests():
    print("====================================================")
    print("   KrishiDrishti FastAPI Model Server Test Suite   ")
    print("====================================================")

    # 1. Test /health
    try:
        t0 = time.time()
        res = requests.get(f"{BASE_URL}/health", timeout=3)
        res.raise_for_status()
        data = res.json()
        print(f"[PASS] Health Check Passed in {(time.time() - t0)*1000:.1f}ms: Status={data.get('status')}, Classes={data.get('classesCount')}, Device={data.get('device')}")
    except Exception as e:
        print(f"[FAIL] Health Check Failed: {e}")
        return False

    # 2. Test /predict with synthetic green leaf
    img = Image.new("RGB", (224, 224), color=(34, 139, 34))
    buf = io.BytesIO()
    img.save(buf, format="JPEG")
    b64 = base64.b64encode(buf.getvalue()).decode("utf-8")

    # Warm-up request
    t0 = time.time()
    res = requests.post(f"{BASE_URL}/predict", json={"imageData": b64}, timeout=5)
    res.raise_for_status()
    data = res.json()
    first_latency = (time.time() - t0) * 1000
    top_pred = data["predictions"][0]
    print(f"[PASS] Request 1 (Initial) Latency: {first_latency:.1f}ms | Top class: {top_pred['label']} ({top_pred['score']*100:.1f}%) | Server internal latency: {data.get('latencyMs')}ms")

    # Benchmark 5 consecutive warm requests
    latencies = []
    for i in range(5):
        t0 = time.time()
        res = requests.post(f"{BASE_URL}/predict", json={"imageData": b64}, timeout=5)
        res.raise_for_status()
        latencies.append((time.time() - t0) * 1000)

    avg_latency = sum(latencies) / len(latencies)
    print(f"[PASS] Warm Requests Latency over 5 iterations: Avg = {avg_latency:.1f}ms (Min = {min(latencies):.1f}ms, Max = {max(latencies):.1f}ms)")
    print("====================================================")
    print("All tests passed successfully!")
    return True

if __name__ == "__main__":
    success = run_tests()
    sys.exit(0 if success else 1)
