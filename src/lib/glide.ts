import { clamp } from './math'

let raf = 0
let active = false
const abort = () => {
  if (active) { cancelAnimationFrame(raf); active = false }
}
// Se a pessoa mexer na roda, tocar ou usar o teclado no meio do deslize, ele para na hora.
for (const ev of ['wheel', 'touchstart', 'keydown']) addEventListener(ev, abort, { passive: true })

const ease = (x: number) => (x < 0.5 ? 4 * x ** 3 : 1 - (-2 * x + 2) ** 3 / 2) // easeInOutCubic

// Desliza até `target` (px) com duração proporcional à distância, em vez de saltar.
// Ida à última seção: ~2,5 s. Seção vizinha: ~1 s.
export function glideTo(target: number) {
  abort()
  const from = scrollY
  const to = clamp(target, 0, document.documentElement.scrollHeight - innerHeight)
  const dist = Math.abs(to - from)
  if (dist < 4 || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    scrollTo(0, to)
    return
  }
  const dur = Math.min(3, 0.9 + (0.17 * dist) / innerHeight) * 1000
  const t0 = performance.now()
  active = true
  const step = (now: number) => {
    const k = clamp((now - t0) / dur)
    scrollTo(0, from + (to - from) * ease(k))
    if (k < 1) raf = requestAnimationFrame(step)
    else active = false
  }
  raf = requestAnimationFrame(step)
}
