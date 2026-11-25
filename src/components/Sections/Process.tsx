import type { CSSProperties } from 'react'
import { STEPS } from '../../data/content'

const tilt = (deg: number, delay = 0) => ({ '--r': `${deg}deg`, '--d': `${delay}s` }) as CSSProperties

export default function Process() {
  return (
    <section id="processo" className="sec left">
      <div className="wrap">
        <div className="panel">
          <h2 className="ribbon green reveal" style={tilt(2)}>Como funciona</h2>
          {STEPS.map((s, i) => (
            <article key={s.title} className="card step reveal" style={tilt(i % 2 ? -.8 : .8, .06 + i * .06)}>
              <span className="num">{i + 1}</span>
              <div className="body">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
