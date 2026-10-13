import { SERVICES } from '../../data/content'
import Scene from './Scene'

export default function Services() {
  return (
    <Scene id="servicos" corner="bl" wide>
      <p className="eyebrow">Serviços</p>
      <h2>Cada material pede um jeito de limpar</h2>
      <ul className="list">
        {SERVICES.map((s) => (
          <li key={s.title}>
            {s.pick && <span className="tag">Mais pedido</span>}
            <div className="top"><h3>{s.title}</h3><span className="price">{s.price}</span></div>
            <p>{s.text}</p>
          </li>
        ))}
      </ul>
    </Scene>
  )
}
