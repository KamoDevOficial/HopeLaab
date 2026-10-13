import { smoothstep } from './math'

// A limpeza (o vídeo inteiro) roda nos primeiros 60% da página: ~1,7x mais quadros por rolagem que antes.
// No resto da página o tênis limpo continua se mexendo: vai e volta pelos últimos quadros (brilhos e giro leve).
export const VIDEO_END = 0.6
const LOOP = 20 // quantos quadros o vai e volta do final percorre
const SWINGS = 2 // vai e voltas até o fim da página (termina no último quadro)

export function videoFrame(p: number, n: number) {
  const last = n - 1
  if (p <= VIDEO_END) return (p / VIDEO_END) * last
  const k = (p - VIDEO_END) / (1 - VIDEO_END)
  return last - LOOP * (0.5 - 0.5 * Math.cos(k * SWINGS * 2 * Math.PI))
}

// 0 = sujo, 1 = limpo, a partir do quadro que está na tela
export const cleanOfFrame = (f: number, n: number) => smoothstep(0.22, 0.62, f / (n - 1))
