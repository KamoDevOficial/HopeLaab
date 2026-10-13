import { useEffect, useRef, type ReactNode } from 'react'
import useScrollEngine from '../../hooks/useScrollEngine'
import { applyDepth } from '../../lib/depth'
import { smoothstep } from '../../lib/math'
import { trails } from '../../lib/stageState'
import type { Corner } from '../../types'
import './scenes.css'
import { cleanliness } from '../../lib/timeline'

interface Props { id?: string; corner: Corner; wide?: boolean; children: ReactNode }

// Uma cena = um trecho da rolagem (a <section> só ocupa espaço e serve de âncora do menu).
// O cartão fica fixo num canto e "sai da sujeira do tênis, do fundo até a frente" conforme esse trecho passa.
export default function Scene({ id, corner, wide, children }: Props) {
  const sec = useRef<HTMLElement>(null)
  const card = useRef<HTMLDivElement>(null)
  const geo = useRef({ top: 0, h: 1, rx: 0, ry: 0 })
  const lastT = useRef(NaN)

  useEffect(() => {
    const el = card.current!
    const measure = () => {
      const r = sec.current!.getBoundingClientRect()
      // Centro do cartão em repouso (offset* ignora a transformação aplicada pela animação).
      geo.current = { top: r.top + scrollY, h: r.height, rx: el.offsetLeft + el.offsetWidth / 2, ry: el.offsetTop + el.offsetHeight / 2 }
      lastT.current = NaN
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(document.body)
    return () => { ro.disconnect(); trails.delete(el) }
  }, [])

  useScrollEngine((y, p) => {
    const el = card.current!
    const { top, h, rx, ry } = geo.current
    const t = (y + innerHeight - top) / (innerHeight + h)
    if (t === lastT.current) return
    lastT.current = t
    const o = applyDepth(el, t, corner, 1 - cleanliness(p))
    if (o) trails.set(el, { x: rx + o.x, y: ry + o.y, t })
    else trails.delete(el)
  })

  return (
    <section ref={sec} id={id} className="scene">
      <div ref={card} className={`card ${corner}${wide ? ' wide' : ''}`}>{children}</div>
    </section>
  )
}
