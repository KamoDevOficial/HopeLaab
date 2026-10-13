// Decodifica só os quadros perto da posição atual (fora da thread principal) e descarta os distantes.
// Assim a rolagem não trava decodificando imagens grandes e a memória fica pequena e estável.
type Source = ImageBitmap | HTMLImageElement
const canBitmap = typeof createImageBitmap === 'function'
const AHEAD = 22, BEHIND = 8, KEEP = 36

export default class FrameCache {
  w = 1000 // tamanho original dos quadros (todos iguais)
  h = 540
  private imgs: (HTMLImageElement | undefined)[]
  private bmps = new Map<number, ImageBitmap>()
  private pending = new Set<number>()
  private gen = 0
  private width = 0
  private loaded = 0
  private dead = false

  constructor(private urls: string[], private onLoad: (loaded: number) => void) {
    this.imgs = new Array(urls.length)
  }

  load() {
    this.urls.forEach((src, i) => {
      const im = new Image()
      im.onload = () => {
        if (this.dead) return
        if (this.loaded === 0) { this.w = im.naturalWidth; this.h = im.naturalHeight }
        this.imgs[i] = im
        this.onLoad(++this.loaded)
      }
      im.src = src
    })
  }

  // Largura (px do canvas) com que o tênis é desenhado: os bitmaps já são gerados nesse tamanho.
  setTarget(px: number) {
    const w = Math.round(px / 16) * 16
    if (w === this.width) return
    this.width = w
    this.gen++
    this.bmps.forEach((b) => b.close())
    this.bmps.clear()
    this.pending.clear()
  }

  // Garante bitmaps ao redor do quadro f, mais à frente na direção em que a pessoa está rolando.
  want(f: number, dir: number) {
    if (!canBitmap) return
    const c = Math.round(f)
    const ahead = dir >= 0 ? AHEAD : BEHIND, behind = dir >= 0 ? BEHIND : AHEAD
    for (let k = Math.max(0, c - behind); k <= Math.min(this.urls.length - 1, c + ahead); k++) this.ensure(k)
    this.bmps.forEach((b, k) => {
      if (Math.abs(k - c) > KEEP) { b.close(); this.bmps.delete(k) }
    })
  }

  private ensure(k: number) {
    const im = this.imgs[k]
    if (!im || this.bmps.has(k) || this.pending.has(k)) return
    this.pending.add(k)
    const g = this.gen
    const opts: ImageBitmapOptions | undefined =
      this.width && this.width < im.naturalWidth
        ? { resizeWidth: this.width, resizeHeight: Math.round((this.width * im.naturalHeight) / im.naturalWidth), resizeQuality: 'medium' }
        : undefined
    createImageBitmap(im, opts)
      .then((b) => {
        if (g !== this.gen || this.dead) return b.close()
        this.bmps.set(k, b)
        this.pending.delete(k)
      })
      .catch(() => { if (g === this.gen) this.pending.delete(k) })
  }

  // O quadro i, ou o mais próximo que já esteja pronto (evita buracos e travadas).
  get(i: number): Source | undefined {
    const n = this.urls.length
    const at = Math.min(n - 1, Math.max(0, i))
    for (let d = 0; d < KEEP; d++) {
      const b = this.bmps.get(at - d) ?? this.bmps.get(at + d)
      if (b) return b
    }
    for (let d = 0; d < n; d++) {
      const im = this.imgs[at - d] ?? this.imgs[at + d]
      if (im) return im
    }
    return undefined
  }

  dispose() {
    this.dead = true
    this.bmps.forEach((b) => b.close())
    this.bmps.clear()
  }
}
