import { useEffect, useState } from 'react'

// Retorna o id da última seção cujo topo já passou de 45% da altura da tela.
// As posições ficam em cache (medidas só quando o tamanho da página muda), então rolar não força layout.
export default function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    let tops: number[] = []
    const measure = () => {
      tops = ids.map((id) => {
        const el = document.getElementById(id)
        return el ? el.getBoundingClientRect().top + scrollY : Infinity
      })
    }
    const update = () => {
      const line = scrollY + innerHeight * 0.45
      let a = ids[0]
      ids.forEach((id, i) => { if (tops[i] < line) a = id })
      setActive(a)
    }
    const ro = new ResizeObserver(() => { measure(); update() })
    ro.observe(document.body)
    measure()
    update()
    addEventListener('scroll', update, { passive: true })
    return () => {
      ro.disconnect()
      removeEventListener('scroll', update)
    }
  }, [ids])
  return active
}
