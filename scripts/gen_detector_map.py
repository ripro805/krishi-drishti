from verify_v2_manifest import MANIFEST_55
from crop_registry import CROP_REGISTRY

# Generate complete TS HF_LABEL_MAP
ts_entries = []

# First the 55 v2 classes
for label, info in sorted(MANIFEST_55.items()):
    crop = info["crop"]
    bn = CROP_REGISTRY[crop]["bnName"]
    ts_entries.append(f'  "{label}": {{\n    diseaseId: "{info["diseaseId"]}",\n    crop: "{crop}",\n    banglaCrop: "{bn}",\n  }},')

# Next legacy classes
legacy = {
    "Apple_Apple_scab": ("apple-scab", "Apple", "আপেল"),
    "Apple_Black_rot": ("apple-black-rot", "Apple", "আপেল"),
    "Apple_Cedar_apple_rust": ("apple-cedar-rust", "Apple", "আপেল"),
    "Apple_healthy": ("apple-healthy", "Apple", "আপেল"),
    "Blueberry_healthy": ("blueberry-healthy", "Blueberry", "ব্লুবেরি"),
    "Cherry_including_sour_Powdery_mildew": ("cherry-powdery-mildew", "Cherry", "চেরি"),
    "Cherry_including_sour_healthy": ("cherry-healthy", "Cherry", "চেরি"),
    "Corn_maize_Cercospora_leaf_spot_Gray_leaf_spot": ("corn-gray-leaf-spot", "Corn (Maize)", "ভুট্টা"),
    "Corn_maize_Common_rust": ("corn-common-rust", "Corn (Maize)", "ভুট্টা"),
    "Corn_maize_Northern_Leaf_Blight": ("corn-northern-leaf-blight", "Corn (Maize)", "ভুট্টা"),
    "Corn_maize_healthy": ("corn-healthy", "Corn (Maize)", "ভুট্টা"),
    "Grape_Black_rot": ("grape-black-rot", "Grape", "আঙ্গুর"),
    "Grape_Esca_Black_Measles": ("grape-esca-black-measles", "Grape", "আঙ্গুর"),
    "Grape_Leaf_blight_Isariopsis_Leaf_Spot": ("grape-leaf-blight", "Grape", "আঙ্গুর"),
    "Grape_healthy": ("grape-healthy", "Grape", "আঙ্গুর"),
    "Orange_Haunglongbing_Citrus_greening": ("citrus-greening-huanglongbing", "Orange (Citrus)", "লেবু/কমলা"),
    "Peach_Bacterial_spot": ("peach-bacterial-spot", "Peach", "পিচ"),
    "Peach_healthy": ("peach-healthy", "Peach", "পিচ"),
    "Raspberry_healthy": ("raspberry-healthy", "Raspberry", "রাস্পবেরি"),
    "Rice_Bacterial_Leaf_Blight": ("rice-bacterial-leaf-blight", "Rice", "ধান"),
    "Rice_Blast": ("rice-blast", "Rice", "ধান"),
    "Rice_Brown_Spot": ("rice-brown-spot", "Rice", "ধান"),
    "Rice_Healthy": ("rice-healthy", "Rice", "ধান"),
    "Rice_Hispa": ("rice-hispa", "Rice", "ধান"),
    "Rice_Leaf_Scald": ("rice-leaf-scald", "Rice", "ধান"),
    "Rice_Narrow_Brown_Spot": ("rice-narrow-brown-spot", "Rice", "ধান"),
    "Rice_Sheath_Blight": ("rice-sheath-blight", "Rice", "ধান"),
    "Rice_Tungro": ("rice-tungro", "Rice", "ধান"),
    "Soybean_healthy": ("soybean-healthy", "Soybean", "সয়াবিন"),
    "Squash_Powdery_mildew": ("squash-powdery-mildew", "Squash", "মিষ্টি কুমড়া"),
    "Strawberry_Leaf_scorch": ("strawberry-leaf-scorch", "Strawberry", "স্ট্রবেরি"),
    "Strawberry_healthy": ("strawberry-healthy", "Strawberry", "স্ট্রবেরি"),
    "Wheat_Healthy": ("wheat-healthy", "Wheat", "গম"),
    "Wheat_Septoria": ("wheat-septoria", "Wheat", "গম"),
    "Wheat_Stripe_Rust": ("wheat-stripe-rust", "Wheat", "গম"),
}
for label, (did, crop, bn) in sorted(legacy.items()):
    ts_entries.append(f'  "{label}": {{\n    diseaseId: "{did}",\n    crop: "{crop}",\n    banglaCrop: "{bn}",\n  }},')

output = "const HF_LABEL_MAP: Record<string, LabelMeta> = {\n" + "\n".join(ts_entries) + "\n};\n"
with open("scripts/hf_label_map.txt", "w", encoding="utf-8") as f:
    f.write(output)

print(f"Generated {len(ts_entries)} entries in scripts/hf_label_map.txt")
