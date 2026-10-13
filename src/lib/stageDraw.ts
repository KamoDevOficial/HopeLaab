import { clamp, lerp, rnd } from './math'
import { trails } from './stageState'

const DIRT = ['#7b6a55', '#6b5d4b', '#8a7a66', '#5f5547']
const CYAN = '#17c3e8'

// Medidas do palco em pixels do canvas: tela, centro do tênis e tamanho com que ele é desenhado.
export interface Layout { W: number; H: number; d: number; cx: number; cy: number; sw: number; sh: number }
type Ctx = CanvasRenderingContext2D

// Sombra no chão: o tênis flutua, então ela encolhe e clareia quando ele sobe.
export function drawShadow(ctx: Ctx, L: Layout, up: number) {
  const rx = L.sw * 0.36 * (1 - 0.1 * up)
  ctx.save()
  ctx.translate(L.cx, L.cy + L.sh * 0.5 + L.H * 0.05)
  ctx.scale(1, 0.13)
  const g = ctx.createRadialGradient(0, 0, 0, 0, 0, rx)
  g.addColorStop(0, `rgba(30,38,56,${(0.32 - 0.1 * up).toFixed(3)})`)
  g.addColorStop(1, 'rgba(30,38,56,0)')
  ctx.fillStyle = g
  ctx.beginPath()
  ctx.arc(0, 0, rx, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
}

// Poeira saindo do tênis enquanto ele ainda está sujo.
export function drawDust(ctx: Ctx, L: Layout, time: number, dirty: number) {
  if (dirty < 0.02) return
  for (let i = 0; i < 30; i++) {
    const ph = (time * 0.26 + rnd(i, 1)) % 1
    const ang = rnd(i, 2) * Math.PI * 2
    const dist = ph * L.sw * (0.12 + rnd(i, 5) * 0.2)
    const x = L.cx + (rnd(i, 3) - 0.5) * L.sw * 0.8 + Math.cos(ang) * dist
    const y = L.cy + (rnd(i, 4) - 0.5) * L.sh * 0.55 + Math.sin(ang) * dist - ph * L.sh * 0.14
    ctx.globalAlpha = Math.sin(Math.PI * ph) * dirty * 0.6
    ctx.fillStyle = DIRT[i % DIRT.length]
    ctx.beginPath()
    ctx.arc(x, y, (1.2 + rnd(i, 6) * 3.2) * L.d * (1 - ph * 0.4), 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.globalAlpha = 1
}

// Rastro que liga o tênis ao cartão que está chegando: sujeira enquanto o tênis está sujo, brilho depois.
export function drawTrails(ctx: Ctx, L: Layout, time: number, clean: number) {
  let id = 0
  trails.forEach((tr) => {
    id++
    if (tr.t <= 0 || tr.t >= 0.5) return
    const fade = clamp((0.5 - tr.t) / 0.22) * clamp(tr.t / 0.06)
    const px = tr.x * L.d, py = tr.y * L.d
    const dx = px - L.cx, dy = py - L.cy, len = Math.hypot(dx, dy) || 1
    const nx = -dy / len, ny = dx / len
    for (let j = 0; j < 18; j++) {
      const r = (j + 0.5) / 18
      const off = ((rnd(j, id) - 0.5) * 70 * (0.3 + r) + Math.sin(time * 2 + j) * 6) * L.d
      ctx.globalAlpha = fade * (0.25 + 0.6 * r) * 0.8
      ctx.fillStyle = clean < 0.5 ? DIRT[j % DIRT.length] : CYAN
      ctx.beginPath()
      ctx.arc(lerp(L.cx, px, r) + nx * off, lerp(L.cy, py, r) + ny * off, (2 + rnd(j, id + 7) * 4.5) * (0.4 + 0.6 * r) * L.d, 0, Math.PI * 2)
      ctx.fill()
    }
  })
  ctx.globalAlpha = 1
}

function star(ctx: Ctx, x: number, y: number, s: number, fill: string) {
  const k = s * 0.18
  ctx.fillStyle = fill
  ctx.beginPath()
  ctx.moveTo(x, y - s); ctx.lineTo(x + k, y - k); ctx.lineTo(x + s, y); ctx.lineTo(x + k, y + k)
  ctx.lineTo(x, y + s); ctx.lineTo(x - k, y + k); ctx.lineTo(x - s, y); ctx.lineTo(x - k, y - k)
  ctx.closePath()
  ctx.fill()
}

// Brilhos que piscam ao redor do tênis conforme ele fica limpo.
export function drawSparkles(ctx: Ctx, L: Layout, time: number, clean: number) {
  if (clean < 0.02) return
  for (let i = 0; i < 22; i++) {
    const tw = Math.max(0, Math.sin(time * (1.2 + rnd(i, 3) * 1.6) + rnd(i, 4) * 6.283)) ** 4
    if (tw < 0.02) continue
    const x = L.cx + (rnd(i, 1) - 0.5) * L.sw * 1.1
    const y = L.cy + (rnd(i, 2) - 0.5) * L.sh * 1.25
    const s = (6 + rnd(i, 5) * 12) * L.d * tw
    star(ctx, x, y, s * 1.5, `rgba(23,195,232,${(0.35 * clean * tw).toFixed(3)})`)
    star(ctx, x, y, s, `rgba(255,255,255,${(0.95 * clean * tw).toFixed(3)})`)
  }
}
