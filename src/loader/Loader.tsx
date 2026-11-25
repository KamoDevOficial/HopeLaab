import { useEffect, useRef } from 'react'
import { ART } from '../art'
import ManeMeia from '../components/Mascot/ManeMeia'
import './loader.css'

// A mensagem acompanha o progresso (não as tarefas reais, que terminam quase juntas).
const LABELS = ['Polindo o tênis', 'Separando a lama', 'Enchendo a esponja de espuma', 'Nevando por aqui', 'Pendurando as luzes', 'Quase pronto']
// Velocidade máxima da barra (fração por segundo): a ManéMeia sempre tem tempo de balançar um pouco.
const SPEED = 0.75
const FADE_MS = 900

interface Props { progress: number; ready: boolean; onReveal: () => void; onGone: () => void }

export default function Loader({ progress, ready, onReveal, onGone }: Props) {
  const root = useRef<HTMLDivElement>(null)
  const bar = useRef<HTMLElement>(null)
  const pct = useRef<HTMLSpanElement>(null)
  const label = useRef<HTMLParagraphElement>(null)
  // refs para o laço de animação enxergar sempre o valor mais recente sem reiniciar
  const live = useRef({ progress, ready, onReveal, onGone })
  live.current = { progress, ready, onReveal, onGone }

  useEffect(() => {
    let raf = 0
    let last = performance.now()
    let shown = 0
    let idx = -1
    let timer = 0
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      shown = Math.min(live.current.progress, shown + dt * SPEED)
      // só transform/texto: nada de layout por quadro
      if (bar.current) bar.current.style.transform = `scaleX(${shown})`
      const p = Math.round(shown * 100)
      if (pct.current) pct.current.textContent = `${p}%`
      const i = Math.min(LABELS.length - 1, Math.floor(shown * LABELS.length))
      if (i !== idx && label.current) { idx = i; label.current.textContent = `${LABELS[i]}…` }
      root.current?.setAttribute('aria-valuenow', String(p))
      if (shown >= 1 && live.current.ready) {
        root.current?.classList.add('leaving')
        live.current.onReveal()
        timer = window.setTimeout(() => live.current.onGone(), FADE_MS)
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); clearTimeout(timer) }
  }, [])

  return (
    <div ref={root} className="loader" role="progressbar" aria-label="Carregando o site da HopeLaab" aria-valuemin={0} aria-valuemax={100} aria-valuenow={0}>
      <div className="ld-snow a" style={{ backgroundImage: `url(${ART['snow-a']})` }} />
      <div className="ld-snow b" style={{ backgroundImage: `url(${ART['snow-b']})` }} />
      <img className="ld-cloud c1" src={ART.cloud} alt="" />
      <img className="ld-cloud c2" src={ART.cloud} alt="" />
      <img className="ld-far" src={ART['hills-far']} alt="" />
      <img className="ld-trees" src={ART.trees} alt="" />
      <img className="ld-ground" src={ART.snowbank} alt="" />

      <div className="ld-hang">
        <i className="ld-nail" />
        <div className="ld-swing">
          <div className="ld-rope" />
          <div className="ld-sock"><ManeMeia size={200} /></div>
        </div>
      </div>

      <div className="ld-sign">
        <b className="ld-brand">HopeLaab</b>
        <p ref={label} className="ld-label">{LABELS[0]}…</p>
        <div className="ld-bar"><i ref={bar} /></div>
        <span ref={pct} className="ld-pct">0%</span>
      </div>
    </div>
  )
}
