import { useEffect } from 'react'

// Navegadores modernos animam o relevo/palco direto no compositor (scroll-driven animations) e este hook não faz nada.
// Nos demais, um único listener passivo grava --sp (0 a 1) na raiz, no máximo uma vez por quadro.
export default function useScrollProgress() {
  useEffect(() => {
    if (typeof CSS !== 'undefined' && CSS.supports('animation-timeline: scroll()')) return
    const root = document.documentElement
    root.classList.add('no-sdt')
    let raf = 0
    const update = () => {
      raf = 0
      const max = root.scrollHeight - innerHeight
      root.style.setProperty('--sp', max > 0 ? String(Math.min(1, Math.max(0, scrollY / max))) : '0')
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', onScroll, { passive: true })
    return () => {
      removeEventListener('scroll', onScroll)
      removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
      root.classList.remove('no-sdt')
    }
  }, [])
}
