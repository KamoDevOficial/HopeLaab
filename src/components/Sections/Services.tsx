import type { CSSProperties, ReactElement } from 'react'
import { SERVICES } from '../../data/content'
import type { Service } from '../../types'

const ICON: Record<Service['icon'], ReactElement> = {
  shoe: <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M3 22v-6c0-2 1-4 3-4l5 1 4 4 8 1c2 .3 4 1 4 3v3z" /><path d="M13 14l-1.6 3M16 16l-1.4 2.6" /></svg>,
  sole: <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M3 20h26v3c0 2-1 3-3 3H6c-2 0-3-1-3-3z" /><path d="M6 20l1-5c1-2 3-3 5-3h8" /><path d="M8 24h16" /></svg>,
  suede: <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 4c5 5 8 9 8 13a8 8 0 0 1-16 0c0-4 3-8 8-13z" /><path d="M12 19c0 2 1.6 3.6 3.6 3.8" /></svg>,
}
const BG = ['var(--gold)', '#9fd8f6', '#ffb3b9']

const tilt = (deg: number, delay = 0) => ({ '--r': `${deg}deg`, '--d': `${delay}s` }) as CSSProperties

export default function Services() {
  return (
    <section id="servicos" className="sec right">
      <div className="wrap">
        <div className="panel">
          <h2 className="ribbon reveal" style={tilt(-2)}>Nossos serviços</h2>
          <p className="lead card reveal" style={tilt(.6, .05)}>Cada par é lavado à mão, com escova macia e espuma neutra. Nenhuma máquina encosta no seu tênis.</p>
          {SERVICES.map((s, i) => (
            <article key={s.title} className="card svc reveal" style={tilt(i % 2 ? .8 : -.8, .08 + i * .06)}>
              {s.pick && <span className="pick">Mais pedido</span>}
              <div className="badge" style={{ background: BG[i] }}>{ICON[s.icon]}</div>
              <div className="body">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <b className="price">{s.price}</b>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
