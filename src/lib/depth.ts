import type { Corner } from '../types'
import { clamp, smootherstep as sm } from './math'

// t: 0 = cartão lá no fundo · ~0.45–0.62 = na frente, legível, no canto · 1 = já passou pela frente.
// Chegada, permanência e saída são UMA curva contínua (sem quinas), então a troca entre mensagens não "tranca".
// dirty (0..1): o quanto o tênis ainda está sujo. Enquanto o cartão está longe ele fica "sujo" também.
// Devolve o deslocamento aplicado (px) ou null se o cartão está invisível.
export function applyDepth(el: HTMLElement, t: number, corner: Corner, dirty: number) {
  const arrive = sm(0, 0.45, t)
  const leave = sm(0.62, 1, t)
  const alpha = sm(0, 0.32, t) * (1 - sm(0.66, 0.96, t))
  if (alpha <= 0.01 || t < 0 || t > 1) {
    if (el.style.visibility !== 'hidden') el.style.visibility = 'hidden'
    return null
  }
  const inward = 1 - arrive - 0.5 * leave // 1 = junto do tênis, 0 = no canto, negativo = saindo pela frente
  const scale = 0.45 + 0.55 * arrive + 0.55 * leave
  const portrait = innerWidth / innerHeight < 1.25 // no celular em pé os cartões ficam embaixo
  const sx = corner.endsWith('l') ? 1 : -1
  const sy = portrait || corner.startsWith('b') ? -1 : 1
  const x = sx * inward * innerWidth * 0.24
  const y = sy * inward * innerHeight * 0.16
  if (el.style.visibility !== 'visible') el.style.visibility = 'visible'
  el.style.opacity = alpha.toFixed(3)
  el.style.pointerEvents = alpha > 0.6 ? 'auto' : 'none'
  const dirt = (clamp(inward * 1.3) * dirty).toFixed(2)
  if (el.dataset.dirt !== dirt) {
    el.dataset.dirt = dirt
    el.style.setProperty('--dirt', dirt)
  }
  el.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) scale(${scale.toFixed(3)})`
  return { x, y }
}
