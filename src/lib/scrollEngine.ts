import { clamp } from './math'

// Um único laço de animação para o site todo. Suaviza a posição da rolagem e chama, a cada quadro,
// quem precisa desenhar (o palco do tênis e os cartões), sempre sincronizados.
export type Tick = (y: number, progress: number, time: number, speed: number) => void

// Suavização em dois estágios: cada "clique" da roda do mouse vira um movimento contínuo.
const S1 = 12
const S2 = 9
// Velocidade máxima da animação, em telas por segundo. Saltos enormes (menu, End, arrastar a barra de
// rolagem) viram um deslize rápido, e não um corte que obriga a mostrar centenas de quadros de uma vez.
const MAX_V = 6
const subs = new Set<Tick>()
let raf = 0, v = 0, y = 0, last = 0, speed = 0, reduce = false, max = 1, ro: ResizeObserver | null = null
const measure = () => { max = Math.max(1, document.documentElement.scrollHeight - innerHeight) }

export const prefersReducedMotion = () => reduce

function frame(now: number) {
  const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000))
  last = now
  const target = scrollY
  const before = y
  if (reduce) {
    v = y = target
  } else {
    v += (target - v) * (1 - Math.exp(-dt * S1))
    const cap = MAX_V * innerHeight * dt
    y += clamp((y + (v - y) * (1 - Math.exp(-dt * S2))) - y, -cap, cap)
    if (Math.abs(target - y) < 0.1 && Math.abs(target - v) < 0.1) v = y = target
  }
  speed += (Math.abs(y - before) / dt - speed) * (1 - Math.exp(-dt * 10)) // px/s, suavizada
  subs.forEach((fn) => fn(y, clamp(y / max), now / 1000, speed))
  raf = requestAnimationFrame(frame)
}

export function subscribe(fn: Tick): () => void {
  if (!subs.size) {
    v = y = scrollY
    speed = 0
    last = performance.now()
    reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    measure()
    ro = new ResizeObserver(measure)
    ro.observe(document.body)
    addEventListener('resize', measure)
    raf = requestAnimationFrame(frame)
  }
  subs.add(fn)
  return () => {
    subs.delete(fn)
    if (!subs.size) {
      cancelAnimationFrame(raf)
      ro?.disconnect()
      removeEventListener('resize', measure)
    }
  }
}
