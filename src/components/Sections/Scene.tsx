import { useEffect, useRef, type ReactNode } from 'react'
import useScrollEngine from '../../hooks/useScrollEngine'
import { applyDepth } from '../../lib/depth'
import { smoothstep } from '../../lib/math'
import { look, trails } from '../../lib/stageState'
import type { Corner } from '../../types'
import './scenes.css'

interface Props { id?: string; corner: Corner; wide?: boolean; children: ReactNode }

// Uma cena = um trecho da rolagem (a <section> só ocupa espaço e serve de âncora do menu).
// O cartão fica fixo num canto e "sai da sujeira do tênis, do fundo até a frente" conforme esse trecho passa.
export default function Scene({ id, corner, wide, children }: Props) {
  const sec = useRef<HTMLElement>(null)
  const card = useRef<HTMLDivElement>(null)
  const geo = useRef({ top: 0, h: 1, rx: 0, ry: 0 })
  const last = useRef({ t: NaN, calm: NaN, dirty: NaN })

  useEffect(() => {
    const el = card.current!
    const measure = () => {
      const r = sec.current!.getBoundingClientRect()
      // Centro do cartão em repouso (offset* ignora a transformação aplicada pela animação).
      geo.current = { top: r.top + scrollY, h: r.height, rx: el.offsetLeft + el.offsetWidth / 2, ry: el.offsetTop + el.offsetHeight / 2 }
      last.current.t = NaN
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(document.body)
    return () => { ro.disconnect(); trails.delete(el) }
  }, [])

  useScrollEngine((y, _p, _time, speed) => {
    const el = card.current!
    const { top, h, rx, ry } = geo.current
    const t = (y + innerHeight - top) / (innerHeight + h)
    // Em deslocamentos muito rápidos (salto entre seções) os cartões que passam voando somem em vez de piscar.
    const calm = 1 - smoothstep(innerHeight * 3, innerHeight * 7, speed)
    const dirty = 1 - look.clean // acompanha o quadro exibido, não a rolagem
    const s = last.current
    if (t === s.t && calm === s.calm && dirty === s.dirty) return
    s.t = t; s.calm = calm; s.dirty = dirty
    const o = applyDepth(el, t, corner, dirty, calm)
    if (o) trails.set(el, { x: rx + o.x, y: ry + o.y, t })
    else trails.delete(el)
  })

  return (
    <section ref={sec} id={id} className="scene">
      <div ref={card} className={`card ${corner}${wide ? ' wide' : ''}`}>{children}</div>
    </section>
  )
}
