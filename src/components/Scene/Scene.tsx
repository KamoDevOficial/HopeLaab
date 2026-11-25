import type { CSSProperties } from 'react'
import { ART, type ArtName } from '../../art'
import './scene.css'

type Vars = CSSProperties & Record<`--${string}`, string>
const v = (o: Record<string, string>) => o as Vars
const img = (n: ArtName) => ART[n]

// Posições dentro do tênis (caixa de 600 x 360): centro x, centro y, tamanho, imagem e em qual "rodada" de esfregada sai.
const MUD: { x: number; y: number; s: number; n: ArtName; g: 0 | 1 | 2 }[] = [
  { x: 500, y: 215, s: 82, n: 'mud-1', g: 0 },
  { x: 180, y: 292, s: 76, n: 'mud-4', g: 0 },
  { x: 128, y: 186, s: 88, n: 'mud-2', g: 1 },
  { x: 468, y: 284, s: 74, n: 'mud-5', g: 1 },
  { x: 322, y: 116, s: 62, n: 'mud-7', g: 1 },
  { x: 262, y: 152, s: 72, n: 'mud-3', g: 2 },
  { x: 350, y: 294, s: 64, n: 'mud-6', g: 2 },
  { x: 92, y: 254, s: 58, n: 'mud-5', g: 2 },
]
const SW = 600
const SH = 360
const pct = (n: number, d: number) => `${((n / d) * 100).toFixed(2)}%`

// [esquerda %, topo %, tamanho %, duração, atraso] relativos ao palco
const BUBBLES: [number, number, number, string, string][] = [
  [14, 44, 6, '2.1s', '-.2s'], [26, 52, 8, '2.6s', '-1.1s'], [40, 40, 5, '1.9s', '-.7s'], [52, 54, 7, '2.4s', '-1.6s'],
  [64, 44, 9, '2.8s', '-.4s'], [76, 50, 6, '2.2s', '-1.3s'], [86, 42, 5, '1.8s', '-.9s'],
]
const SPARKS: [number, number, number, string, string][] = [
  [6, 18, 9, '1.5s', '0s'], [88, 12, 8, '1.3s', '-.5s'], [18, 62, 7, '1.7s', '-.9s'], [80, 60, 9, '1.4s', '-.3s'],
  [46, 2, 8, '1.6s', '-1.1s'], [94, 40, 6, '1.2s', '-.7s'], [2, 42, 6, '1.5s', '-1.3s'], [62, 24, 7, '1.8s', '-.2s'],
]
const DROPS = [34, 40, 46, 52, 58, 64]

// O "vídeo" de fundo: uma cena cartoon que roda sozinha em loop (tênis sujo -> esponja -> espuma -> enxágue -> brilho).
// Tudo é transform/opacity em camadas próprias, então roda na GPU sem trabalho de JavaScript.
// Só alguns detalhes dependem do scroll (.sd): o palco desliza de lado, o relevo faz paralaxe e o céu entardece.
export default function Scene({ running }: { running: boolean }) {
  return (
    <div className={`scene${running ? ' is-running' : ''}`} aria-hidden="true">
      <div className="sky-dusk sd" />

      <img className="cloud k1" src={img('cloud')} alt="" />
      <img className="cloud k2" src={img('cloud')} alt="" />
      <img className="cloud k3" src={img('cloud')} alt="" />
      <img className="cloud k4" src={img('cloud')} alt="" />

      <div className="snow back" style={{ backgroundImage: `url(${img('snow-a')})` }} />

      <div className="layer par sd" style={v({ '--k': '4' })}><img className="far" src={img('hills-far')} alt="" /></div>
      <div className="layer par sd" style={v({ '--k': '6' })}><img className="trees" src={img('trees')} alt="" /></div>
      <div className="layer par sd" style={v({ '--k': '8' })}><img className="mid" src={img('hills-mid')} alt="" /></div>

      <div className="stage-pos sd">
        <div className="stage">
          <div className="stage-loop">
            <div className="stage-shadow" />
            <div className="stage-bob">
              <img className="gift" src={img('gift')} alt="" />

              <div className="shoe-wrap">
                <div className="glow" />
                <img className="shoe" src={img('shoe')} alt="" />
                {MUD.map((m, i) => (
                  <img
                    key={i}
                    className={`mud g${m.g}`}
                    src={img(m.n)}
                    alt=""
                    style={{ left: pct(m.x - m.s / 2, SW), top: pct(m.y - m.s / 2, SH), width: pct(m.s, SW) }}
                  />
                ))}
                <img className="face sad" src={img('face-sad')} alt="" />
                <img className="face glee" src={img('face-glee')} alt="" />
                <img className="face happy" src={img('face-happy')} alt="" />
              </div>

              <div className="fx flies">
                <img className="fly f1" src={img('fly')} alt="" />
                <img className="fly f2" src={img('fly')} alt="" />
              </div>

              <div className="sponge-wrap"><img src={img('sponge')} alt="" /></div>

              <div className="fx bubbles">
                {BUBBLES.map(([x, y, s, t, d], i) => (
                  <img key={i} className="bubble" src={img('bubble')} alt="" style={v({ left: `${x}%`, top: `${y}%`, width: `${s}%`, '--t': t, '--d': d })} />
                ))}
              </div>

              <img className="rain-cloud" src={img('cloud')} alt="" />
              <div className="fx rain">
                {DROPS.map((x, i) => (
                  <img key={x} className="drop" src={img('drop')} alt="" style={v({ left: `${x}%`, '--d': `${-(i * 0.17).toFixed(2)}s` })} />
                ))}
              </div>

              <div className="fx sparks">
                {SPARKS.map(([x, y, s, t, d], i) => (
                  <img key={i} className="spark" src={img('spark')} alt="" style={v({ left: `${x}%`, top: `${y}%`, width: `${s}%`, '--t': t, '--d': d })} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="layer par sd" style={v({ '--k': '10' })}><img className="bank" src={img('snowbank')} alt="" /></div>

      <div className="snow front a" style={{ backgroundImage: `url(${img('snow-b')})` }} />
      <div className="snow front b" style={{ backgroundImage: `url(${img('snow-c')})` }} />
    </div>
  )
}
