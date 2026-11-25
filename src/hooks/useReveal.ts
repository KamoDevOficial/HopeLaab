import { useEffect } from 'react'

// Cartões entram "pulando" quando aparecem na tela (só transform/opacity, via classe .in).
export default function useReveal(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return
    const els = document.querySelectorAll<HTMLElement>('.reveal')
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          e.target.classList.add('in')
          io.unobserve(e.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [enabled])
}
