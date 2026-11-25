import { NAV, NAV_IDS } from '../../data/content'
import useActiveSection from '../../hooks/useActiveSection'
import { ICONS } from './Icons'
import './header.css'

// Pílula branca fixa e centralizada, no estilo do menu inicial do Switch.
// A rolagem até a seção é o scroll suave nativo do navegador (html { scroll-behavior: smooth }).
export default function Header() {
  const activeId = useActiveSection(NAV_IDS)
  return (
    <nav className="nav" aria-label="Principal">
      <a className="brand" href="#inicio" aria-label="HopeLaab, início">H</a>
      <i aria-hidden="true" />
      {NAV.map(({ id, label, icon }) => {
        const Icon = ICONS[icon]
        const on = id === activeId
        return (
          <a key={id} href={`#${id}`} className={on ? 'on' : undefined} aria-label={label} aria-current={on ? 'true' : undefined}>
            <Icon />
            <span>{label}</span>
          </a>
        )
      })}
    </nav>
  )
}
