import bubble from './bubble.svg?url'
import bulbGold from './bulb-gold.svg?url'
import bulbGreen from './bulb-green.svg?url'
import bulbRed from './bulb-red.svg?url'
import candycane from './candycane.svg?url'
import cloud from './cloud.svg?url'
import drop from './drop.svg?url'
import faceGlee from './face-glee.svg?url'
import faceHappy from './face-happy.svg?url'
import faceSad from './face-sad.svg?url'
import fly from './fly.svg?url'
import gift from './gift.svg?url'
import hillsFar from './hills-far.svg?url'
import hillsMid from './hills-mid.svg?url'
import holly from './holly.svg?url'
import mud1 from './mud-1.svg?url'
import mud2 from './mud-2.svg?url'
import mud3 from './mud-3.svg?url'
import mud4 from './mud-4.svg?url'
import mud5 from './mud-5.svg?url'
import mud6 from './mud-6.svg?url'
import mud7 from './mud-7.svg?url'
import ornament from './ornament.svg?url'
import shoe from './shoe.svg?url'
import snowA from './snow-a.svg?url'
import snowB from './snow-b.svg?url'
import snowC from './snow-c.svg?url'
import snowbank from './snowbank.svg?url'
import spark from './spark.svg?url'
import sponge from './sponge.svg?url'
import trees from './trees.svg?url'
import wire from './wire.svg?url'

// Toda a arte vetorial do site (gerada por tools/art.py). As chaves são os nomes dos arquivos.
export const ART = {
  'bubble': bubble,
  'bulb-gold': bulbGold,
  'bulb-green': bulbGreen,
  'bulb-red': bulbRed,
  'candycane': candycane,
  'cloud': cloud,
  'drop': drop,
  'face-glee': faceGlee,
  'face-happy': faceHappy,
  'face-sad': faceSad,
  'fly': fly,
  'gift': gift,
  'hills-far': hillsFar,
  'hills-mid': hillsMid,
  'holly': holly,
  'mud-1': mud1,
  'mud-2': mud2,
  'mud-3': mud3,
  'mud-4': mud4,
  'mud-5': mud5,
  'mud-6': mud6,
  'mud-7': mud7,
  'ornament': ornament,
  'shoe': shoe,
  'snow-a': snowA,
  'snow-b': snowB,
  'snow-c': snowC,
  'snowbank': snowbank,
  'spark': spark,
  'sponge': sponge,
  'trees': trees,
  'wire': wire,
} as const

export type ArtName = keyof typeof ART

// Agrupa a arte para o sistema de carregamento: cada grupo vira uma etapa com peso e rótulo.
export const ART_GROUPS: { label: string; names: ArtName[] }[] = [
  { label: 'Polindo o tênis', names: ['shoe', 'face-sad', 'face-glee', 'face-happy', 'gift'] },
  { label: 'Separando a lama', names: ['mud-1', 'mud-2', 'mud-3', 'mud-4', 'mud-5', 'mud-6', 'mud-7', 'fly'] },
  { label: 'Enchendo a esponja de espuma', names: ['sponge', 'bubble', 'drop', 'spark'] },
  { label: 'Nevando por aqui', names: ['snow-a', 'snow-b', 'snow-c', 'cloud', 'hills-far', 'hills-mid', 'trees', 'snowbank'] },
  { label: 'Pendurando as luzes', names: ['ornament', 'candycane', 'holly', 'wire', 'bulb-red', 'bulb-gold', 'bulb-green'] },
]
