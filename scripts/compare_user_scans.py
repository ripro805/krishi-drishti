from PIL import Image
import torch
from transformers import AutoImageProcessor, AutoModelForImageClassification

m1_id = "ripro805/krishidrishti-plant-disease"
print(f"Loading {m1_id}...")
p1 = AutoImageProcessor.from_pretrained(m1_id)
m1 = AutoModelForImageClassification.from_pretrained(m1_id)

m2_id = "ripro805/krishi-drishty-v2"
print(f"Loading {m2_id}...")
p2 = AutoImageProcessor.from_pretrained(m2_id)
m2 = AutoModelForImageClassification.from_pretrained(m2_id)

recent_scans = [
    "leaf_1793206137551_jhewr.jpeg",
    "leaf_1793206144452_v5nrw.jpeg",
    "leaf_1793206153874_1dy6n.jpeg",
    "leaf_1793206162674_he8op.jpeg",
    "leaf_1793206170649_j6ncq.jpeg",
    "leaf_1793206181503_0h6dw.jpeg",
    "leaf_1793206195181_5xvx6.jpeg",
    "leaf_1793206272745_hndlt.jpeg",
    "leaf_1793206280481_n8v9g.jpeg",
    "leaf_1793206288922_dpa2z.jpeg",
    "leaf_1793206299949_bmgx0.jpeg",
    "leaf_1793206311550_lnt9t.jpeg",
    "leaf_1793206498850_bcj02.jpeg",
    "leaf_1793206510643_njl61.jpeg",
    "leaf_1793206519624_s56b8.jpeg",
    "leaf_1793206531986_dlasf.jpeg",
    "leaf_1793206548381_i3dlk.jpeg"
]

print(f"{'File':32s} | {'Model 1 (krishidrishti-plant-disease)':45s} | {'Model 2 (krishi-drishty-v2)':45s}")
print("-" * 130)

for fn in recent_scans:
    path = f"public/uploads/scans/{fn}"
    try:
        img = Image.open(path).convert("RGB")
    except Exception as e:
        continue
    
    # Model 1
    in1 = p1(images=img, return_tensors="pt")
    with torch.no_grad():
        pr1 = torch.softmax(m1(**in1).logits[0], dim=-1)
    t1_idx = torch.argmax(pr1).item()
    t1_lbl = f"{m1.config.id2label[t1_idx]} ({pr1[t1_idx].item():.1%})"

    # Model 2
    in2 = p2(images=img, return_tensors="pt")
    with torch.no_grad():
        pr2 = torch.softmax(m2(**in2).logits[0], dim=-1)
    t2_idx = torch.argmax(pr2).item()
    t2_lbl = f"{m2.config.id2label[t2_idx]} ({pr2[t2_idx].item():.1%})"

    print(f"{fn:32s} | {t1_lbl:45s} | {t2_lbl:45s}")
