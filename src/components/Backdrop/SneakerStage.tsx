import { useEffect, useRef, useState } from 'react'
import { FRAMES } from '../../data/frames'
import useScrollEngine from '../../hooks/useScrollEngine'
import FrameCache from '../../lib/frameCache'
import { clamp, smoothstep } from '../../lib/math'
import { look } from '../../lib/stageState'
import { cleanOfFrame, videoFrame } from '../../lib/timeline'
import { prefersReducedMotion } from '../../lib/scrollEngine'
import { drawDust, drawShadow, drawSparkles, drawTrails, type Layout } from '../../lib/stageDraw'
import './backdrop.css'

const WIDE = 1.25 // abaixo desta proporção (largura/altura) a tela é "em pé": tênis maior e mais alto
const MAX_FPS = 75 // velocidade máxima do vídeo (quadros/s): num salto enorme ele avança rápido, mas contínuo
const IDLE_GAP = 1 / 30 // parado, só as animações leves (flutuação, brilhos) rodam, a 30 quadros por segundo

// Palco fixo da página. Os quadros são recortes do tênis (com transparência); sombra, inclinação,
// flutuação, poeira e brilhos são desenhados aqui, e o fundo (degradê, halo e faixas de luz) é CSS.
export default function SneakerStage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stripesRef = useRef<HTMLDivElement>(null)
  const cache = useRef<FrameCache | null>(null)
  const dpr = useRef(1)
  const needs = useRef(true)
  const last = useRef({ y: -1, t: 0, clock: 0, fv: 0, sx: 0 })
  const [ready, setReady] = useState(false)

  const paint = (y: number, p: number, time: number) => {
    const cv = canvasRef.current, fc = cache.current
    if (!cv || !fc) return
    const st = last.current
    const N = FRAMES.length
    const dt = Math.min(0.05, Math.max(0.001, time - st.clock))
    st.clock = time
    // O vídeo persegue o quadro pedido pela rolagem com velocidade limitada (e o cache acompanha),
    // em vez de pular centenas de quadros de uma vez.
    const ft = videoFrame(p, N)
    const gap = ft - st.fv
    const step = prefersReducedMotion() ? gap : clamp(gap * (1 - Math.exp(-30 * dt)), -MAX_FPS * dt, MAX_FPS * dt)
    st.fv = Math.abs(gap - step) < 0.005 ? ft : st.fv + step
    const moving = Math.abs(y - st.y) > 0.01 || st.fv !== ft
    if (!moving && !needs.current && (prefersReducedMotion() || time - last.current.t < IDLE_GAP)) return
    last.current.y = y
    last.current.t = time
    needs.current = false

    const sx = Math.round((p - 0.5) * -60) // faixas de luz deslizam devagar (só transform, vai pra GPU)
    if (sx !== last.current.sx && stripesRef.current) {
      last.current.sx = sx
      stripesRef.current.style.transform = `translate3d(${sx}px,0,0)`
    }

    const ctx = cv.getContext('2d')!
    const W = cv.width, H = cv.height, d = dpr.current
    const portrait = W / H < WIDE
    const s = Math.min((W * (portrait ? 0.96 : 0.62)) / fc.w, (H * 0.6) / fc.h)
    const sw = fc.w * s, sh = fc.h * s
    fc.setTarget(sw)
    const f = st.fv
    look.clean = cleanOfFrame(f, N)
    fc.want(f, step / dt)
    const i0 = Math.floor(f), a = f - i0
    const A = fc.get(i0)
    ctx.clearRect(0, 0, W, H)
    if (!A) return

    const L: Layout = { W, H, d, cx: W / 2, cy: portrait ? Math.max(H * 0.3, sh / 2 + 98 * d) : H * 0.5, sw, sh }
    const clean = look.clean
    const still = prefersReducedMotion()
    const bob = still ? 0 : Math.sin(time * 1.15) // flutuação lenta
    drawShadow(ctx, L, (bob + 1) / 2)
    drawDust(ctx, L, time, 1 - clean)
    drawTrails(ctx, L, time, clean)

    // Inclinado como se flutuasse (bico para cima), com um leve balanço; endireita um pouco no fim.
    const tilt = ((-9 + (still ? 0 : 2.2 * Math.sin(time * 0.8 + 1))) * (1 - 0.35 * smoothstep(0.55, 1, p)) * Math.PI) / 180
    ctx.save()
    ctx.translate(L.cx, L.cy + bob * H * 0.014)
    ctx.rotate(tilt)
    ctx.imageSmoothingQuality = 'medium'
    ctx.drawImage(A, -sw / 2, -sh / 2, sw, sh)
    const B = a > 0.02 ? fc.get(i0 + 1) : undefined // mistura com o quadro seguinte: movimento sem saltos
    if (B) {
      ctx.globalAlpha = a
      ctx.drawImage(B, -sw / 2, -sh / 2, sw, sh)
      ctx.globalAlpha = 1
    }
    ctx.restore()
    drawSparkles(ctx, L, time, clean)
  }

  useScrollEngine((y, p, time) => paint(y, p, time))

  useEffect(() => {
    const cv = canvasRef.current!
    const fc = new FrameCache(FRAMES, (n) => {
      needs.current = true
      if (n === FRAMES.length) setReady(true)
    })
    cache.current = fc
    fc.load()
    const size = () => {
      dpr.current = Math.min(devicePixelRatio || 1, 1.25)
      cv.width = Math.round(cv.clientWidth * dpr.current)
      cv.height = Math.round(cv.clientHeight * dpr.current)
      needs.current = true
    }
    const ro = new ResizeObserver(size)
    ro.observe(cv)
    size()
    return () => { fc.dispose(); cache.current = null; ro.disconnect() }
  }, [])

  return (
    <div className="backdrop">
      <div ref={stripesRef} className="stripes" />
      <canvas ref={canvasRef} role="img" aria-label="Um tênis sujo flutuando, inclinado, que vai ficando branco conforme você rola a página" />
      {!ready && <p className="load">Preparando o brilho…</p>}
    </div>
  )
}
