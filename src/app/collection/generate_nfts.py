import json

items = []
for i in range(1, 2025):
    item = {
        "image": f"./collection/{str(i).zfill(4)}.png",
        "imageAlt": "Quilrocks Logo",
        "title": f"Rock {str(i).zfill(4)}",
        "rarity": "Common" if i % 4 != 0 else ("Rare" if i % 10 != 0 else "Super Rare")
    }
    items.append(item)

with open('nftss.json', 'w') as json_file:
    json.dump(items, json_file, indent=2)