import type { MouseEvent } from 'react'
import { NAV, NAV_IDS } from '../../data/content'
import useActiveSection from '../../hooks/useActiveSection'
import { glideTo } from '../../lib/glide'
import { ICONS } from './NavIcons'
import './header.css'

// Pílula branca fixa e centralizada, no estilo do menu inicial do Switch.
export default function Header() {
  const activeId = useActiveSection(NAV_IDS)
  // Em vez do salto do navegador, desliza até a seção com velocidade controlada (mesmo entre seções distantes).
  const go = (id: string) => (e: MouseEvent) => {
    const el = document.getElementById(id)
    if (!el) return
    e.preventDefault()
    glideTo(el.getBoundingClientRect().top + scrollY)
  }
  return (
    <nav className="nav" aria-label="Principal">
      <a className="brand" href="#inicio" onClick={go('inicio')} aria-label="HopeLaab, início">H</a>
      <i aria-hidden="true" />
      {NAV.map(({ id, label, icon }) => {
        const Icon = ICONS[icon]
        const on = id === activeId
        return (
          <a key={id} href={`#${id}`} onClick={go(id)} className={on ? 'on' : undefined} aria-label={label} aria-current={on ? 'true' : undefined}>
            <Icon />
            <span>{label}</span>
          </a>
        )
      })}
    </nav>
  )
}
