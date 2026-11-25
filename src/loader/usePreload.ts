import { useEffect, useState, useSyncExternalStore } from 'react'
import { getProgress, isFinished, runAll, subscribe } from './preload'

// Teto absoluto: mesmo com rede ruim, o site é liberado depois deste tempo.
const HARD_LIMIT = 12000

export default function usePreload() {
  const progress = useSyncExternalStore(subscribe, getProgress)
  const finished = useSyncExternalStore(subscribe, isFinished)
  const [timedOut, setTimedOut] = useState(false)

  useEffect(() => {
    void runAll()
    const t = window.setTimeout(() => setTimedOut(true), HARD_LIMIT)
    return () => clearTimeout(t)
  }, [])

  const ready = finished || timedOut
  return { progress: ready ? 1 : progress, ready }
}
