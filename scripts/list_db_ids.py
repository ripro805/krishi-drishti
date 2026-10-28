import re
with open('src/data/diseasesDatabase.ts', 'r', encoding='utf-8') as f:
    text = f.read()
ids = re.findall(r'id:\s*["\']([^"\']+)["\']', text)
for i in ids:
    if any(k in i for k in ['healthy', 'tomato', 'wheat', 'squash', 'corn', 'peach']):
        print(i)
