import type { CSSProperties } from 'react'
import { ART } from '../../art'
import { HERO } from '../../data/content'
import './hero.css'

const tilt = (deg: number, delay = 0) => ({ '--r': `${deg}deg`, '--d': `${delay}s` }) as CSSProperties

export default function Hero({ onOpenBot }: { onOpenBot: () => void }) {
  return (
    <section id="inicio" className="hero">
      <div className="wrap">
        <div className="hero-card card reveal" style={tilt(-1)}>
          <img className="hang" src={ART.ornament} alt="" />
          <span className="tag">{HERO.tag}</span>
          <h1>
            {HERO.title[0]} <em>{HERO.title[1]}</em>
          </h1>
          <p>{HERO.text}</p>
          <div className="cta">
            <button className="btn" onClick={onOpenBot}>Falar com a ManéMeia</button>
            <a className="btn alt" href="#servicos">Ver serviços</a>
          </div>
          <ul className="perks">
            {HERO.perks.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </div>
      </div>
      <a className="hint sd" href="#servicos" aria-label="Role para ver os serviços">
        <span>Role e veja a mágica</span>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
      </a>
    </section>
  )
}
