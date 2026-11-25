import type { CSSProperties } from 'react'
import { ART } from '../../art'
import { CTA } from '../../data/content'

const tilt = (deg: number, delay = 0) => ({ '--r': `${deg}deg`, '--d': `${delay}s` }) as CSSProperties

export default function Cta({ onOpenBot }: { onOpenBot: () => void }) {
  return (
    <section id="agendar" className="sec left">
      <div className="wrap">
        <div className="panel">
          <div className="card cta-card reveal" style={tilt(-1)}>
            <img className="hang" src={ART.ornament} alt="" />
            <img className="holly" src={ART.holly} alt="" />
            <h2>{CTA.title}</h2>
            <p>{CTA.text}</p>
            <button className="btn gold" onClick={onOpenBot}>Conversar com a ManéMeia</button>
          </div>
        </div>
      </div>
    </section>
  )
}
