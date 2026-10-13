import { PITCH } from '../../data/content'
import Scene from './Scene'

export default function Pitch() {
  return (
    <Scene corner="tr">
      <p className="eyebrow">O nosso jeito</p>
      <h2>Lavado à mão, peça por peça.</h2>
      <ul className="list">
        {PITCH.map((p) => (
          <li key={p.title}><h3>{p.title}</h3><p>{p.text}</p></li>
        ))}
      </ul>
    </Scene>
  )
}
