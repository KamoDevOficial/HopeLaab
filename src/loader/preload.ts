import fredokaUrl from '@fontsource-variable/fredoka/files/fredoka-latin-wght-normal.woff2?url'
import christmasUrl from '@fontsource/mountains-of-christmas/files/mountains-of-christmas-latin-700-normal.woff2?url'
import { ART, ART_GROUPS } from '../art'

// ---------------------------------------------------------------------------
// Sistema de carregamento: cada item pesado do site vira uma "tarefa" com peso.
// O site só é liberado quando todas terminam (ou quando estouram o tempo limite,
// para a tela de carregamento nunca travar o usuário).
// ---------------------------------------------------------------------------
export interface LoadTask { id: string; weight: number; run: () => Promise<unknown> }

const TASK_TIMEOUT = 8000

function settle(p: Promise<unknown>, ms = TASK_TIMEOUT): Promise<void> {
  return new Promise((resolve) => {
    const t = window.setTimeout(resolve, ms)
    const end = () => { clearTimeout(t); resolve() }
    p.then(end, end) // falha de uma tarefa não derruba o resto
  })
}

const nextFrame = () => new Promise<void>((r) => requestAnimationFrame(() => r()))

/** Baixa e DECODIFICA a imagem antes do uso: assim ela já está pronta na GPU quando a cena entrar. */
export function loadImage(url: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image()
    img.decoding = 'async'
    img.src = url
    if (typeof img.decode === 'function') img.decode().then(() => resolve(), () => resolve())
    else { img.onload = () => resolve(); img.onerror = () => resolve() }
  })
}

export async function loadFont(family: string, url: string, weight: string): Promise<void> {
  if (typeof FontFace === 'undefined') return
  const face = new FontFace(family, `url("${url}") format("woff2")`, { weight, display: 'swap' })
  document.fonts.add(await face.load())
}

/** Deixa o navegador montar e rasterizar a cena (camadas da GPU) enquanto a tela de carregamento cobre tudo. */
async function warmUp() {
  await document.fonts.ready
  await nextFrame()
  await nextFrame()
  await Promise.all(Array.from(document.images).map((i) => (i.decode ? i.decode().catch(() => undefined) : undefined)))
  await nextFrame()
}

export const TASKS: LoadTask[] = [
  {
    id: 'fontes',
    weight: 3,
    run: () => Promise.all([loadFont('Fredoka Variable', fredokaUrl, '300 700'), loadFont('Mountains of Christmas', christmasUrl, '700')]),
  },
  ...ART_GROUPS.map((g) => ({ id: g.label, weight: g.names.length, run: () => Promise.all(g.names.map((n) => loadImage(ART[n]))) })),
  { id: 'cena', weight: 3, run: warmUp },
]

const TOTAL = TASKS.reduce((s, t) => s + t.weight, 0)

// Estado em nível de módulo: sobrevive à dupla montagem do StrictMode e qualquer componente pode assinar.
let progress = 0
let finished = false
let started: Promise<void> | null = null
const listeners = new Set<() => void>()
const emit = () => listeners.forEach((l) => l())

export const getProgress = () => progress
export const isFinished = () => finished
export function subscribe(l: () => void) {
  listeners.add(l)
  return () => { listeners.delete(l) }
}

/** Roda todas as tarefas em paralelo e atualiza o progresso (0 a 1). Só executa uma vez. */
export function runAll(): Promise<void> {
  if (started) return started
  let done = 0
  started = Promise.all(
    TASKS.map((t) =>
      settle(t.run()).then(() => {
        done += t.weight
        progress = done / TOTAL
        emit()
      }),
    ),
  ).then(() => {
    progress = 1
    finished = true
    emit()
  })
  return started
}
