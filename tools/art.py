# Gera toda a arte vetorial cartunesca do site em src/art/*.svg:  python3 tools/art.py
import math, random
from pathlib import Path
OUT = Path(__file__).resolve().parent.parent / 'src' / 'art'; OUT.mkdir(parents=True, exist_ok=True)
INK, RED, REDD, GREEN, GREEND, GOLD, CREAM = '#1f2d3d', '#e63946', '#b3202c', '#1f9d55', '#167a43', '#ffc83d', '#fff1c9'
def svg(w, h, body, name):
    s = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" stroke-linejoin="round" stroke-linecap="round">{body}</svg>'
    (OUT / f'{name}.svg').write_text(s, encoding='utf-8'); return s

# ---------- tênis (limpo; os rostos e a lama são camadas separadas) ----------
def lace(t):
    px, py = 274 + 130 * t, 130 + 42 * t
    a = (px + .31 * 15, py - .95 * 15); b = (px - .31 * 20, py + .95 * 20)
    return f'<path d="M{a[0]:.1f} {a[1]:.1f} L{b[0]:.1f} {b[1]:.1f}" stroke="{INK}" stroke-width="13"/><path d="M{a[0]:.1f} {a[1]:.1f} L{b[0]:.1f} {b[1]:.1f}" stroke="{GREEN}" stroke-width="7"/><circle cx="{a[0]:.1f}" cy="{a[1]:.1f}" r="5" fill="{GOLD}" stroke="{INK}" stroke-width="3"/>'
laces = ''.join(lace(t) for t in (.14, .36, .58, .8))
UPPER = 'M84 240 C62 206 58 150 88 114 C108 90 154 82 196 96 C226 106 242 126 274 130 C326 136 358 156 404 172 C452 188 520 196 548 222 C560 234 556 242 540 242 L92 242 Z'
shoe = f'''
<path d="M52 316 H566 Q568 340 548 342 H70 Q50 340 52 316 Z" fill="#3b4a5c" stroke="{INK}" stroke-width="7"/>
<path d="M78 334 H540" stroke="#5d7088" stroke-width="5"/>
<path d="M46 262 Q44 316 84 318 H536 Q574 316 572 270 Q570 236 536 236 H92 Q50 234 46 262 Z" fill="#fff" stroke="{INK}" stroke-width="7"/>
<path d="M62 296 Q70 312 92 312 H530 Q558 310 564 288 Q560 300 530 300 H92 Q70 300 62 296 Z" fill="#cfe3f2"/>
<rect x="150" y="262" width="124" height="34" rx="17" fill="#9fd8f2" stroke="{INK}" stroke-width="5"/>
<path d="M166 272 H210" stroke="#fff" stroke-width="5"/>
<path d="{UPPER}" fill="#fff" stroke="{INK}" stroke-width="7"/>
<path d="M430 192 C470 202 505 208 524 226 L470 232 Z" fill="#e8f2fa"/>
<path d="M112 233 H500" stroke="{INK}" stroke-width="22"/><path d="M112 233 H500" stroke="{GREEN}" stroke-width="12"/>
<path d="M84 240 C62 206 58 150 88 114 C98 102 114 94 130 90 L140 150 C128 188 118 216 116 240 Z" fill="#eef6fc" stroke="{INK}" stroke-width="6"/>
<path d="M500 194 C520 200 540 208 548 222 C560 234 556 242 540 242 H486 C498 226 502 208 500 194 Z" fill="#eef6fc" stroke="{INK}" stroke-width="6"/>
<path d="M214 96 C228 78 264 78 288 96 L302 134 C270 142 242 140 224 130 Z" fill="{CREAM}" stroke="{INK}" stroke-width="6"/>
{laces}
<path d="M160 132 Q164 116 178 108" stroke="#cfe3f2" stroke-width="6" fill="none"/>
<circle cx="102" cy="88" r="24" fill="#fff" stroke="{INK}" stroke-width="6"/><circle cx="84" cy="80" r="11" fill="#fff" stroke="{INK}" stroke-width="5"/><circle cx="122" cy="82" r="11" fill="#fff" stroke="{INK}" stroke-width="5"/><circle cx="102" cy="88" r="19" fill="#fff"/>
<path d="M96 80 Q100 76 106 79" stroke="#cfe3f2" stroke-width="4" fill="none"/>
'''
svg(600, 360, shoe, 'shoe')
def eye(cx, cy, r=11, px=0, py=2, pr=5):
    return f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="#fff" stroke="{INK}" stroke-width="4"/><circle cx="{cx+px}" cy="{cy+py}" r="{pr}" fill="{INK}"/><circle cx="{cx+px-2}" cy="{cy+py-2}" r="{max(1.5,pr/3):.1f}" fill="#fff"/>'
svg(100, 56, eye(28, 22, 11, 2, 4, 4.5) + eye(66, 24, 11, -2, 4, 4.5) + f'<path d="M12 12 L38 5" stroke="{INK}" stroke-width="4"/><path d="M56 5 L82 14" stroke="{INK}" stroke-width="4"/><path d="M36 48 Q47 38 58 48" stroke="{INK}" stroke-width="4" fill="none"/><path d="M90 14 q4 7 0 10 q-4 -3 0 -10 Z" fill="#7fd1f5" stroke="#2a7fb0" stroke-width="2"/>', 'face-sad')
svg(100, 56, f'<path d="M16 28 Q28 12 40 28" stroke="{INK}" stroke-width="5" fill="none"/><path d="M54 30 Q66 14 78 30" stroke="{INK}" stroke-width="5" fill="none"/><circle cx="20" cy="42" r="6" fill="#ff9aa8" opacity=".8"/><circle cx="76" cy="44" r="6" fill="#ff9aa8" opacity=".8"/><path d="M34 38 Q47 60 60 38 Z" fill="#7a1e2b" stroke="{INK}" stroke-width="4"/><ellipse cx="47" cy="48" rx="8" ry="4.5" fill="#ff8aa0"/>', 'face-glee')
svg(100, 56, eye(28, 22, 12, 2, 1, 7) + eye(66, 24, 12, 2, 1, 7) + f'<circle cx="16" cy="42" r="6" fill="#ff9aa8" opacity=".8"/><circle cx="80" cy="44" r="6" fill="#ff9aa8" opacity=".8"/><path d="M30 40 Q47 58 64 40 Q47 46 30 40 Z" fill="#fff" stroke="{INK}" stroke-width="4"/>', 'face-happy')

# ---------- esponja ----------
holes = ''.join(f'<ellipse cx="{x}" cy="{y}" rx="{r}" ry="{r*.7:.1f}" fill="#e0a800"/>' for x, y, r in [(34,98,6),(160,102,7),(150,60,5),(52,56,5),(98,66,4)])
svg(200, 140, f'<rect x="10" y="34" width="180" height="92" rx="26" fill="#ffd23f" stroke="{INK}" stroke-width="6"/><path d="M12 62 V58 Q12 36 38 36 H162 Q188 36 188 58 V62 Z" fill="#33b36b" stroke="{INK}" stroke-width="6"/>{holes}' + eye(72, 92, 9, 0, 2, 4) + eye(128, 92, 9, 0, 2, 4) + f'<path d="M86 108 Q100 120 114 108" stroke="{INK}" stroke-width="4" fill="none"/><circle cx="52" cy="106" r="6" fill="#ff9aa8" opacity=".8"/><circle cx="148" cy="106" r="6" fill="#ff9aa8" opacity=".8"/>', 'sponge')

# ---------- presente (pedestal) ----------
dots = ''.join(f'<circle cx="{x}" cy="{y}" r="7" fill="#fff" opacity=".9"/>' for x, y in [(70,120),(130,170),(190,128),(340,126),(400,172),(450,122),(90,186),(430,190)])
svg(520, 230, f'<rect x="20" y="70" width="480" height="150" rx="16" fill="{RED}" stroke="{INK}" stroke-width="7"/>{dots}<rect x="8" y="36" width="504" height="58" rx="16" fill="{REDD}" stroke="{INK}" stroke-width="7"/><rect x="232" y="36" width="56" height="184" fill="{GOLD}" stroke="{INK}" stroke-width="6"/><path d="M260 38 C196 -6 148 14 174 42 C194 62 238 48 260 38 Z" fill="{GOLD}" stroke="{INK}" stroke-width="6"/><path d="M260 38 C324 -6 372 14 346 42 C326 62 282 48 260 38 Z" fill="{GOLD}" stroke="{INK}" stroke-width="6"/><circle cx="260" cy="40" r="17" fill="#ffb300" stroke="{INK}" stroke-width="6"/>', 'gift')

# ---------- lama (7 variantes) ----------
def blob(seed, n=9, r0=33, jit=.3, cx=50, cy=52, sx=1.0, sy=.84):
    rnd = random.Random(seed); pts = []
    for i in range(n):
        a = 2 * math.pi * i / n + rnd.uniform(-.15, .15); r = r0 * (1 + rnd.uniform(-jit, jit))
        pts.append((cx + r * math.cos(a) * sx, cy + r * math.sin(a) * sy))
    d = f'M{pts[0][0]:.1f} {pts[0][1]:.1f}'
    for i in range(n):
        p0, p1, p2, p3 = pts[i - 1], pts[i], pts[(i + 1) % n], pts[(i + 2) % n]
        c1 = (p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6); c2 = (p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)
        d += f' C{c1[0]:.1f} {c1[1]:.1f} {c2[0]:.1f} {c2[1]:.1f} {p2[0]:.1f} {p2[1]:.1f}'
    return d + ' Z'
for k in range(7):
    rnd = random.Random(100 + k)
    sat = ''.join(f'<circle cx="{rnd.uniform(12,88):.0f}" cy="{rnd.uniform(14,88):.0f}" r="{rnd.uniform(3,6):.1f}" fill="#8a5a33" stroke="#4a2d17" stroke-width="2.5"/>' for _ in range(3))
    svg(100, 100, f'{sat}<path d="{blob(200+k)}" fill="#8a5a33" stroke="#4a2d17" stroke-width="4"/><path d="{blob(300+k, 8, 20, .25, 54, 56)}" fill="#6b4326"/><path d="M30 40 Q36 30 48 30" stroke="#c99a68" stroke-width="5" fill="none"/><circle cx="40" cy="70" r="3" fill="#c99a68"/>', f'mud-{k+1}')

# ---------- bolha, brilho, gota, mosca ----------
svg(60, 60, '<circle cx="30" cy="30" r="26" fill="#ffffff" fill-opacity=".55" stroke="#6cc3ea" stroke-width="3"/><path d="M15 24 A17 17 0 0 1 28 13" stroke="#fff" stroke-width="5" fill="none"/><circle cx="42" cy="42" r="3" fill="#fff"/>', 'bubble')
svg(60, 60, f'<path d="M30 3 Q33 27 57 30 Q33 33 30 57 Q27 33 3 30 Q27 27 30 3 Z" fill="{GOLD}" stroke="{INK}" stroke-width="3.5"/><path d="M30 14 Q31.5 28 44 30 Q31.5 32 30 46 Q28.5 32 16 30 Q28.5 28 30 14 Z" fill="#fff"/>', 'spark')
svg(40, 56, '<path d="M20 3 C30 20 36 30 36 38 A16 16 0 0 1 4 38 C4 30 10 20 20 3 Z" fill="#7fd1f5" stroke="#2a7fb0" stroke-width="3"/><path d="M12 38 Q12 46 19 49" stroke="#fff" stroke-width="4" fill="none"/>', 'drop')
svg(44, 34, f'<ellipse cx="14" cy="10" rx="12" ry="7" fill="#cfeefc" stroke="{INK}" stroke-width="2.5" transform="rotate(-25 14 10)"/><ellipse cx="30" cy="10" rx="12" ry="7" fill="#cfeefc" stroke="{INK}" stroke-width="2.5" transform="rotate(25 30 10)"/><ellipse cx="22" cy="22" rx="10" ry="8" fill="#2b2b3a" stroke="{INK}" stroke-width="2.5"/><circle cx="18" cy="20" r="2.5" fill="#fff"/><circle cx="26" cy="20" r="2.5" fill="#fff"/>', 'fly')

# ---------- paisagem ----------
svg(250, 120, f'<g fill="#fff" stroke="{INK}" stroke-width="5"><path d="M40 100 Q10 100 14 76 Q18 54 46 56 Q50 28 84 30 Q112 12 138 34 Q172 22 190 50 Q226 48 232 76 Q238 100 206 100 Z"/></g><path d="M52 90 H196" stroke="#cfe6f5" stroke-width="8"/>', 'cloud')
def hills(seed, base, amp, fill, name, h=300, w=1600):
    rnd = random.Random(seed); n = 7; xs = [i * w / (n - 1) for i in range(n)]; ys = [base + rnd.uniform(-amp, amp) for _ in range(n)]
    d = f'M-40 {h+40} L-40 {ys[0]:.0f}'
    for i in range(1, n):
        mx = (xs[i - 1] + xs[i]) / 2; d += f' C{mx:.0f} {ys[i-1]:.0f} {mx:.0f} {ys[i]:.0f} {xs[i]:.0f} {ys[i]:.0f}'
    d += f' L{w+40} {h+40} Z'
    svg(w, h, f'<path d="{d}" fill="{fill}" stroke="{INK}" stroke-width="6"/>', name)
hills(11, 150, 55, '#d6ecfa', 'hills-far'); hills(22, 175, 45, '#ffffff', 'hills-mid')
def pine(cx, base, h, w, rnd):
    s = f'<rect x="{cx-w*.07:.0f}" y="{base-h*.12:.0f}" width="{w*.14:.0f}" height="{h*.14:.0f}" fill="#8a5a33" stroke="{INK}" stroke-width="5"/>'
    for i in range(3):
        top = base - h + i * h * .27; bot = top + h * .42; half = w * (.34 + .24 * i) / 2; mid = (top + bot) / 2
        s += f'<path d="M{cx} {top:.0f} Q{cx+half*.5:.0f} {mid:.0f} {cx+half:.0f} {bot:.0f} Q{cx:.0f} {bot+h*.06:.0f} {cx-half:.0f} {bot:.0f} Q{cx-half*.5:.0f} {mid:.0f} {cx} {top:.0f} Z" fill="{GREEN}" stroke="{INK}" stroke-width="5"/>'
        s += f'<path d="M{cx} {top:.0f} Q{cx+half*.5:.0f} {mid:.0f} {cx+half:.0f} {bot:.0f} Q{cx+half*.3:.0f} {bot+h*.03:.0f} {cx} {bot+h*.04:.0f} Z" fill="{GREEND}"/>'
        s += f'<path d="M{cx-half*.45:.0f} {top+h*.14:.0f} Q{cx-half*.15:.0f} {top+h*.1:.0f} {cx:.0f} {top+h*.16:.0f} Q{cx+half*.2:.0f} {top+h*.1:.0f} {cx+half*.45:.0f} {top+h*.14:.0f} L{cx+half*.55:.0f} {top+h*.2:.0f} Q{cx:.0f} {top+h*.26:.0f} {cx-half*.55:.0f} {top+h*.2:.0f} Z" fill="#fff" stroke="{INK}" stroke-width="4"/>'
        for _ in range(2):
            ox = cx + rnd.uniform(-half * .6, half * .6); oy = bot - rnd.uniform(h * .03, h * .09)
            s += f'<circle cx="{ox:.0f}" cy="{oy:.0f}" r="{w*.045:.0f}" fill="{rnd.choice([RED, GOLD, "#4aa3ff"])}" stroke="{INK}" stroke-width="3"/>'
    s += f'<path d="M{cx} {base-h-w*.08:.0f} l{w*.04:.0f} {w*.07:.0f} l{w*.08:.0f} {w*.01:.0f} l{-w*.06:.0f} {w*.06:.0f} l{w*.02:.0f} {w*.09:.0f} l{-w*.08:.0f} {-w*.045:.0f} l{-w*.08:.0f} {w*.045:.0f} l{w*.02:.0f} {-w*.09:.0f} l{-w*.06:.0f} {-w*.06:.0f} l{w*.08:.0f} {-w*.01:.0f} Z" fill="{GOLD}" stroke="{INK}" stroke-width="4"/>'
    return s
rnd = random.Random(5); trees = ''
for cx, h, w in [(70, 250, 150), (190, 190, 120), (1380, 230, 140), (1500, 280, 165), (1290, 170, 110), (330, 140, 96), (1180, 150, 100)]:
    trees += pine(cx, 330, h, w, rnd)
svg(1600, 340, trees, 'trees')
svg(1600, 220, f'<path d="M-40 260 L-40 70 C120 40 260 40 420 74 C600 110 760 40 960 52 C1160 64 1300 110 1640 60 L1640 260 Z" fill="#fff" stroke="{INK}" stroke-width="6"/><path d="M0 120 C160 96 280 100 420 126 C600 160 760 96 960 106 C1160 118 1300 160 1600 112" stroke="#cfe6f5" stroke-width="10" fill="none"/>', 'snowbank')

# ---------- decoração ----------
svg(60, 110, f'<path d="M30 0 V34" stroke="{INK}" stroke-width="4"/><rect x="22" y="30" width="16" height="12" rx="3" fill="{GOLD}" stroke="{INK}" stroke-width="4"/><circle cx="30" cy="74" r="30" fill="{RED}" stroke="{INK}" stroke-width="5"/><path d="M12 66 Q16 48 32 44" stroke="#ff9aa2" stroke-width="6" fill="none"/><path d="M8 78 H52" stroke="{GOLD}" stroke-width="6"/>', 'ornament')
svg(90, 150, f'<path d="M20 146 V50 Q20 12 44 12 Q64 12 64 36" stroke="{INK}" stroke-width="26" fill="none"/><path d="M20 146 V50 Q20 12 44 12 Q64 12 64 36" stroke="#fff" stroke-width="16" fill="none"/><path d="M20 146 V50 Q20 12 44 12 Q64 12 64 36" stroke="{RED}" stroke-width="16" fill="none" stroke-dasharray="12 12"/>', 'candycane')
svg(120, 80, f'<path d="M60 56 C40 20 6 24 12 46 C20 62 48 64 60 56 Z" fill="{GREEN}" stroke="{INK}" stroke-width="5"/><path d="M60 56 C80 20 114 24 108 46 C100 62 72 64 60 56 Z" fill="{GREEN}" stroke="{INK}" stroke-width="5"/><circle cx="52" cy="58" r="10" fill="{RED}" stroke="{INK}" stroke-width="4"/><circle cx="70" cy="60" r="10" fill="{RED}" stroke="{INK}" stroke-width="4"/><circle cx="61" cy="46" r="10" fill="{RED}" stroke="{INK}" stroke-width="4"/>', 'holly')
def snow(seed, n, rmax, name, size=400):
    rnd = random.Random(seed); b = ''
    for _ in range(n):
        x, y, r = rnd.uniform(0, size), rnd.uniform(0, size), rnd.uniform(2, rmax)
        for dx in (-size, 0, size):
            for dy in (-size, 0, size):
                if -r <= x + dx <= size + r and -r <= y + dy <= size + r: b += f'<circle cx="{x+dx:.0f}" cy="{y+dy:.0f}" r="{r:.1f}" fill="#fff" fill-opacity="{rnd.uniform(.55,.95):.2f}"/>'
    svg(size, size, b, name)
snow(1, 38, 5, 'snow-a'); snow(2, 22, 8, 'snow-b'); snow(3, 14, 12, 'snow-c')
def bulb(c, x, y): return f'<rect x="{x-4}" y="{y-12}" width="8" height="8" fill="#2a6b4a" stroke="{INK}" stroke-width="2"/><ellipse cx="{x}" cy="{y}" rx="8" ry="10" fill="{c}" stroke="{INK}" stroke-width="3"/><path d="M{x-4} {y-4} q1 -4 4 -5" stroke="#fff" stroke-width="2.5" fill="none"/>'
svg(80, 50, f'<path d="M-2 8 Q40 28 82 8" fill="none" stroke="{INK}" stroke-width="4"/>', 'wire')
svg(80, 50, bulb('#ff4a5a', 20, 28), 'bulb-red'); svg(80, 50, bulb('#ffd23f', 40, 31), 'bulb-gold'); svg(80, 50, bulb('#3fd58a', 60, 28), 'bulb-green')

if __name__ == '__main__':
    import io, sys
    from PIL import Image
    import cairosvg
    def png(n, w=None): return Image.open(io.BytesIO(cairosvg.svg2png(url=str(OUT / f'{n}.svg'), output_width=w))).convert('RGBA')
    sheet = Image.new('RGBA', (1500, 980), (150, 210, 240, 255))
    def put(im, x, y): sheet.alpha_composite(im, (x, y))
    put(png('gift', 520), 20, 250); put(png('shoe', 560), 40, 60)
    for n, fx in zip(('face-sad', 'face-glee', 'face-happy'), (660, 780, 900)): put(png(n, 110), fx, 80)
    put(png('sponge', 200), 1040, 60); put(png('cloud', 250), 1240, 60)
    for k in range(7): put(png(f'mud-{k+1}', 100), 600 + k * 105, 280)
    for i, n in enumerate(('bubble', 'spark', 'drop', 'fly', 'ornament', 'candycane', 'holly')): put(png(n, 80), 600 + i * 110, 400)
    put(png('hills-far', 700), 560, 540); put(png('trees', 700), 560, 640); put(png('snowbank', 700), 560, 780)
    for i, n in enumerate(('bulb-red', 'bulb-gold', 'bulb-green', 'wire')): put(png(n, 150), 20 + i * 150, 560)
    sheet.convert('RGB').save('/home/claude/art_preview.png'); print('prévia ok')
