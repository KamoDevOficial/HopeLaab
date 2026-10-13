import { STEPS } from '../../data/content'
import Scene from './Scene'

export default function Process() {
  return (
    <Scene id="processo" corner="tr">
      <p className="eyebrow">Como funciona</p>
      <h2>Da foto à porta de casa</h2>
      <ol className="list steps">
        {STEPS.map((s, i) => (
          <li key={s.title} data-n={i + 1}><h3>{s.title}</h3><p>{s.text}</p></li>
        ))}
      </ol>
    </Scene>
  )
}
