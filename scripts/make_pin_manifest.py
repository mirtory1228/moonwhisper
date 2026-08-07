# -*- coding: utf-8 -*-
"""Build a Pinterest upload manifest (CSV) from post frontmatter + rendered pins.
Columns: file, title, description, link, board, keywords  (Pinterest-ready).
Run: python scripts/make_pin_manifest.py
"""
import os, re, csv

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
POSTS = os.path.join(ROOT, "content", "posts")
PINS = os.path.join(ROOT, "pins")
BASE = "https://moonwhisper-hipower159-6132s-projects.vercel.app"  # live 200 URL

def parse_fm(md):
    m = re.match(r"^---\n(.*?)\n---\n", md, re.S)
    fm = {"keywords": []}
    if not m: return fm
    body = m.group(1)
    for k in ("title","description","category"):
        mm = re.search(rf'^{k}:\s*"?(.*?)"?\s*$', body, re.M)
        if mm: fm[k] = mm.group(1)
    km = re.search(r'^keywords:\s*\[(.*?)\]', body, re.M | re.S)
    if km:
        fm["keywords"] = [x.strip().strip('"').strip("'") for x in km.group(1).split(",") if x.strip()]
    return fm

def board(cat, slug):
    if slug.startswith("angel-number-"): return "Angel Numbers"
    if slug.startswith("dream-about-"):  return "Dream Meanings"
    return cat or "Moonwhisper"

def pin_desc(fm, slug):
    desc = fm.get("description","").rstrip(".")
    kws = fm.get("keywords", [])[:5]
    tags = " ".join("#"+re.sub(r"[^a-z0-9]","",k.lower()) for k in kws if k)
    if slug.startswith("angel-number-"):
        cta = "Tap for the full meaning — love, money, career & twin flame."
    elif slug.startswith("dream-about-"):
        cta = "Tap for the full meaning, common scenarios & what it says about you."
    else:
        cta = "Tap for the full guide."
    return f"{desc}. {cta} {tags}".strip()

def main():
    rows = []
    for f in sorted(os.listdir(POSTS)):
        if not f.endswith(".md"): continue
        slug = f[:-3]
        pin = os.path.join(PINS, slug + ".png")
        if not os.path.exists(pin): continue
        fm = parse_fm(open(os.path.join(POSTS, f), encoding="utf-8").read())
        title = fm.get("title", slug)
        # Pinterest title <=100 chars
        title = title if len(title) <= 100 else title[:97] + "..."
        rows.append({
            "file": f"pins/{slug}.png",
            "title": title,
            "description": pin_desc(fm, slug)[:500],
            "link": f"{BASE}/posts/{slug}",
            "board": board(fm.get("category",""), slug),
            "keywords": ", ".join(fm.get("keywords", [])),
        })
    out = os.path.join(PINS, "UPLOAD_MANIFEST.csv")
    with open(out, "w", newline="", encoding="utf-8-sig") as fh:
        w = csv.DictWriter(fh, fieldnames=["file","title","description","link","board","keywords"])
        w.writeheader(); w.writerows(rows)
    print(f"manifest: {out}  ({len(rows)} pins)")
    ang = sum(1 for r in rows if r['board']=='Angel Numbers')
    print(f"  Angel Numbers: {ang} | Dream Meanings: {len(rows)-ang}")

if __name__ == "__main__": main()
