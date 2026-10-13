export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t
export const easeOut = (x: number) => 1 - (1 - x) ** 3
export const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a))
  return t * t * (3 - 2 * t)
}
// Número pseudoaleatório estável (0..1) a partir de dois índices: o mesmo grão sempre cai no mesmo lugar.
export const rnd = (i: number, k = 0) => {
  const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453
  return x - Math.floor(x)
}
// Como smoothstep, mas com início e fim ainda mais suaves (sem "tranco" na velocidade).
export const smootherstep = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a))
  return t * t * t * (t * (t * 6 - 15) + 10)
}
