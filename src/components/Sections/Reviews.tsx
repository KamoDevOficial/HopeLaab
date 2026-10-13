import { REVIEWS } from '../../data/content'
import type { Corner } from '../../types'
import Scene from './Scene'

const CORNERS: Corner[] = ['tl', 'tr', 'bl']

// Uma cena por avaliação, cada uma num canto, conforme o vídeo avança.
export default function Reviews() {
  return (
    <>
      {REVIEWS.map((r, i) => (
        <Scene key={r.name} id={i === 0 ? 'reviews' : undefined} corner={CORNERS[i % CORNERS.length]}>
          <p className="eyebrow">Avaliações</p>
          <div className="stars" role="img" aria-label="5 de 5 estrelas">★★★★★</div>
          <blockquote className="quote">“{r.text}”</blockquote>
          <p className="who"><b>{r.name}</b><span>{r.service}</span></p>
        </Scene>
      ))}
    </>
  )
}
