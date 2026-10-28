with open("scripts/hf_label_map.txt", "r", encoding="utf-8") as f:
    new_map = f.read().strip()

with open("src/lib/diseaseDetector.ts", "r", encoding="utf-8") as f:
    code = f.read()

start_marker = "const HF_LABEL_MAP: Record<string, LabelMeta> = {"
end_marker = '};\n\nconst HF_MODEL_ID = process.env.NEXT_PUBLIC_HF_MODEL_ID || "ripro805/krishidrishti-plant-disease";'

if start_marker not in code:
    raise ValueError("start_marker not found")
if end_marker not in code:
    raise ValueError("end_marker not found")

part1 = code[:code.index(start_marker)]
part2 = code[code.index(end_marker) + len(end_marker):]

new_end = 'const HF_MODEL_ID = process.env.NEXT_PUBLIC_HF_MODEL_ID || "ripro805/krishi-drishty-v2";'

new_code = part1 + new_map + "\n\n" + new_end + part2

with open("src/lib/diseaseDetector.ts", "w", encoding="utf-8") as f:
    f.write(new_code)

print("Updated src/lib/diseaseDetector.ts successfully!")
