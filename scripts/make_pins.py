# -*- coding: utf-8 -*-
"""Moonwhisper Pinterest pin generator.
Reads content/posts/*.md frontmatter -> renders 1000x1500 branded pins to /pins.
Zero-cost, on-brand (starry-night navy + gold + jade). Run: python scripts/make_pins.py [slug ...]
"""
import os, re, sys, random, math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
POSTS = os.path.join(ROOT, "content", "posts")
OUT = os.path.join(ROOT, "pins")
os.makedirs(OUT, exist_ok=True)

W, H = 1000, 1500
# brand palette
BG_TOP=(11,16,38); BG_BOT=(21,26,58); GLOW=(28,35,80)
GOLD=(232,198,107); GOLD_SOFT=(243,224,168); JADE=(107,208,176)
TEXT=(244,245,251); DIM=(195,200,222); FAINT=(129,136,168)

def F(path, sz): return ImageFont.truetype(f"C:/Windows/Fonts/{path}", sz)
SERIF   = lambda s: F("georgiab.ttf", s)   # headline hook
SERIF_I = lambda s: F("georgiai.ttf", s)
SANS_B  = lambda s: F("seguibl.ttf", s)    # keyword band (black weight)
SANS    = lambda s: F("segoeui.ttf", s)    # teaser/footer
SANS_SB = lambda s: F("seguisb.ttf", s)

def parse_fm(md):
    m = re.match(r"^---\n(.*?)\n---\n(.*)$", md, re.S)
    fm = {}
    if not m: return fm
    for line in m.group(1).splitlines():
        mm = re.match(r'^(\w+):\s*"?(.*?)"?\s*$', line)
        if mm and mm.group(1) in ("title","description","category","date"):
            fm[mm.group(1)] = mm.group(2)
    return fm

def wrap(draw, text, font, maxw):
    words, lines, cur = text.split(), [], ""
    for w in words:
        t = (cur+" "+w).strip()
        if draw.textlength(t, font=font) <= maxw: cur = t
        else: lines.append(cur); cur = w
    if cur: lines.append(cur)
    return lines

def hook_and_keyword(slug, title, category):
    if slug.startswith("angel-number-"):
        num = slug.replace("angel-number-","")
        return f"Keep seeing {num}?", f"{num} ANGEL NUMBER MEANING", ["Love","Money","Twin Flame"]
    if slug.startswith("dream-about-"):
        topic = slug.replace("dream-about-","").replace("-"," ")
        topic = re.sub(r"^(a|an) ", "", topic)
        return f"Dreaming of {topic}?", f"{topic.upper()} DREAM MEANING", ["Symbolism","Scenarios","Emotions"]
    return title, category.upper(), ["Meaning","Symbolism","Signs"]

def bg():
    img = Image.new("RGB",(W,H),BG_TOP); px = img.load()
    for y in range(H):
        t=y/H
        for c in range(3):
            pass
    # vertical gradient
    base = Image.new("RGB",(W,H))
    for y in range(H):
        t=y/H
        r=int(BG_TOP[0]+(BG_BOT[0]-BG_TOP[0])*t)
        g=int(BG_TOP[1]+(BG_BOT[1]-BG_TOP[1])*t)
        b=int(BG_TOP[2]+(BG_BOT[2]-BG_TOP[2])*t)
        ImageDraw.Draw(base).line([(0,y),(W,y)],fill=(r,g,b))
    # top radial glow
    glow = Image.new("L",(W,H),0); gd=ImageDraw.Draw(glow)
    gd.ellipse([W*0.5-520,-380,W*0.5+520,380],fill=90)
    glow=glow.filter(ImageFilter.GaussianBlur(120))
    base=Image.composite(Image.new("RGB",(W,H),GLOW),base,glow)
    return base

def stars(draw, seed):
    rnd=random.Random(seed)
    for _ in range(140):
        x,y=rnd.randint(0,W),rnd.randint(0,H)
        r=rnd.choice([1,1,1,2,2,3]); a=rnd.randint(40,160)
        col=rnd.choice([GOLD_SOFT,TEXT,JADE])
        draw.ellipse([x-r,y-r,x+r,y+r],fill=col+(a,) if False else col)

def crescent(img):
    layer=Image.new("RGBA",(W,H),(0,0,0,0)); d=ImageDraw.Draw(layer)
    cx,cy,R=W-150,180,70
    d.ellipse([cx-R,cy-R,cx+R,cy+R],fill=GOLD_SOFT+(255,))
    d.ellipse([cx-R+34,cy-R-6,cx+R+34,cy+R-6],fill=(0,0,0,0))
    # cut with bg color circle
    cut=Image.new("RGBA",(W,H),(0,0,0,0)); cd=ImageDraw.Draw(cut)
    cd.ellipse([cx-R+34,cy-R-6,cx+R+34,cy+R-6],fill=(11,16,38,255))
    moon=Image.alpha_composite(layer,cut)
    glow=moon.filter(ImageFilter.GaussianBlur(18))
    img.paste(Image.alpha_composite(img.convert("RGBA"),glow).convert("RGB"),(0,0))
    img.paste(Image.alpha_composite(img.convert("RGBA"),moon).convert("RGB"),(0,0))

def make(slug, fm):
    title=fm.get("title",slug); desc=fm.get("description",""); cat=fm.get("category","")
    hook, keyword, themes = hook_and_keyword(slug, title, cat)
    img=bg(); d=ImageDraw.Draw(img)
    stars(d, sum(ord(c) for c in slug))
    crescent(img); d=ImageDraw.Draw(img)
    MX=90
    # category pill
    pill = cat.upper() if cat else "MOONWHISPER"
    pf=SANS_SB(26); pw=d.textlength(pill,font=pf)
    d.rounded_rectangle([MX,150,MX+pw+56,208],28,outline=JADE,width=2)
    d.text((MX+28,163),pill,font=pf,fill=JADE)
    # hook headline (serif, big, wrapped)
    hf=SERIF(96)
    hl=wrap(d,hook,hf,W-2*MX)
    y=330
    for ln in hl:
        d.text((MX,y),ln,font=hf,fill=GOLD_SOFT); y+=110
    # gold divider
    y+=6; d.line([MX,y,MX+150,y],fill=GOLD,width=5); y+=44
    # keyword band (sans black)
    kf=SANS_B(40); kl=wrap(d,keyword,kf,W-2*MX)
    for ln in kl:
        d.text((MX,y),ln,font=kf,fill=TEXT); y+=52
    y+=26
    # teaser
    tf=SANS(34); tl=wrap(d,desc,tf,W-2*MX)[:4]
    for ln in tl:
        d.text((MX,y),ln,font=tf,fill=DIM); y+=46
    # "at a glance" theme chips (fills lower third, adds keywords)
    ly=1030
    lf=SANS_SB(24); d.text((MX,ly),"INSIDE THE FULL GUIDE",font=lf,fill=FAINT)
    ly+=52; cx=MX; chf=SANS_SB(30)
    for th in themes:
        cw=d.textlength(th,font=chf)
        d.rounded_rectangle([cx,ly,cx+cw+52,ly+64],32,fill=(255,255,255,0) if False else (24,30,64),outline=JADE,width=2)
        d.ellipse([cx+22,ly+27,cx+34,ly+39],fill=GOLD_SOFT)
        d.text((cx+46,ly+16),th,font=chf,fill=TEXT); cx+=cw+52+46+24
    # footer brand + CTA
    fy=H-140
    d.line([MX,fy-30,W-MX,fy-30],fill=(255,255,255,30) if False else (60,68,110),width=1)
    d.ellipse([MX,fy+4,MX+30,fy+34],outline=GOLD_SOFT,width=3)
    d.ellipse([MX+10,fy+1,MX+34,fy+31],fill=(21,26,58))
    bf=SANS_B(30); d.text((MX+46,fy+2),"MOONWHISPER",font=bf,fill=GOLD_SOFT)
    cf=SANS_SB(28); cta="Full meaning inside \u2192"
    d.text((W-MX-d.textlength(cta,font=cf),fy+4),cta,font=cf,fill=JADE)
    out=os.path.join(OUT,f"{slug}.png"); img.save(out,"PNG")
    return out

def main():
    files=[f for f in os.listdir(POSTS) if f.endswith(".md")]
    want=sys.argv[1:]
    if want: files=[f for f in files if f.replace(".md","") in want]
    n=0
    for f in files:
        slug=f.replace(".md","")
        fm=parse_fm(open(os.path.join(POSTS,f),encoding="utf-8").read())
        make(slug,fm); n+=1
    print(f"rendered {n} pins -> {OUT}")

if __name__=="__main__": main()
