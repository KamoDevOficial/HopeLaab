import { useEffect, useRef } from 'react'
import { subscribe, type Tick } from '../lib/scrollEngine'

// Recebe a rolagem suavizada (y), o progresso da página (0..1) e o tempo (s) a cada quadro de animação.
export default function useScrollEngine(fn: Tick) {
  const ref = useRef(fn)
  ref.current = fn
  useEffect(() => subscribe((y, p, t, s) => ref.current(y, p, t, s)), [])
}
