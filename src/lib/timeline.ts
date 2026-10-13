import { clamp, smoothstep } from './math'

export const VIDEO_END = 0.6 // fração da página em que a limpeza termina
const LOOP = 20              // quadros do vai e volta no final
const SWINGS = 2             // vai e voltas até o fim da página

export function videoFrame(p: number, n: number) {
  const last = n - 1
  if (p <= VIDEO_END) return (p / VIDEO_END) * last
  const k = (p - VIDEO_END) / (1 - VIDEO_END)
  return last - LOOP * (0.5 - 0.5 * Math.cos(k * SWINGS * 2 * Math.PI))
}

// 0 = sujo, 1 = limpo (acompanha o vídeo, não a página)
export const cleanliness = (p: number) => smoothstep(0.22, 0.62, clamp(p / VIDEO_END))