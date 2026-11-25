import './mascot.css'

const INK = '#1f2d3d'
const BODY = 'M21 12h19v24c0 4 3 6 8 8 8 3 12 6 11 11-1 5-8 6-14 6H31c-8 0-13-5-11-12z'

// A ManéMeia "de gala" usada na tela de carregamento: meia de Natal com punho de pelúcia, greca, estrela dourada,
// azevinho e argola para pendurar. Os olhos piscam e as pupilas acompanham o balanço (ver mascot.css).
export default function ManeMeia({ size = 160 }: { size?: number }) {
  return (
    <svg className="manemeia" width={size} height={size * (72 / 64)} viewBox="0 -4 64 72" aria-hidden="true">
      <defs><clipPath id="mm-clip"><path d={BODY} /></clipPath></defs>
      {/* argola dourada */}
      <circle cx="25" cy="-0.4" r="3.1" fill="none" stroke={INK} strokeWidth="3.6" />
      <circle cx="25" cy="-0.4" r="3.1" fill="none" stroke="#ffc83d" strokeWidth="1.8" />
      {/* corpo */}
      <path d={BODY} fill="#e63946" />
      <g clipPath="url(#mm-clip)">
        <ellipse cx="25.5" cy="51" rx="4.6" ry="5.6" fill="#fff" />
        <ellipse cx="52.5" cy="54.5" rx="5.6" ry="4.6" fill="#fff" />
        <path d="M18 21l3 3 3-3 3 3 3-3 3 3 3-3 3 3 3-3" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M38.5 53.2l1.3 2.7 3 .4-2.2 2.1.5 3-2.6-1.4-2.6 1.4.5-3-2.2-2.1 3-.4z" fill="#ffc83d" stroke={INK} strokeWidth="1" strokeLinejoin="round" />
      </g>
      <path d={BODY} fill="none" stroke={INK} strokeWidth="2.8" strokeLinejoin="round" />
      {/* punho de pelúcia */}
      <g fill="#fff" stroke={INK} strokeWidth="2.4">
        <circle cx="19.5" cy="9.6" r="4.2" /><circle cx="41.5" cy="9.6" r="4.2" />
        <rect x="17" y="4" width="27" height="12" rx="6" />
      </g>
      <rect x="18.4" y="5.4" width="24.2" height="9.2" rx="4.6" fill="#fff" />
      <path d="M22 10h17" stroke="#d6e6f2" strokeWidth="1.8" strokeLinecap="round" />
      {/* azevinho */}
      <path d="M36 4.5c2-2.6 6-2.4 7.4.2-2.2 2-5.6 2.3-7.4-.2z" fill="#1f9d55" stroke={INK} strokeWidth="1.1" />
      <circle cx="36.5" cy="5.5" r="2.1" fill="#e63946" stroke={INK} strokeWidth="1" />
      {/* rosto */}
      <g className="mm-eyes">
        <g className="mm-eye"><circle cx="28" cy="27.6" r="3.1" fill="#fff" stroke={INK} strokeWidth="1.2" /><circle className="mm-pupil" cx="28.3" cy="27.9" r="1.5" fill={INK} /></g>
        <g className="mm-eye"><circle cx="36" cy="27.6" r="3.1" fill="#fff" stroke={INK} strokeWidth="1.2" /><circle className="mm-pupil" cx="36.3" cy="27.9" r="1.5" fill={INK} /></g>
      </g>
      <path d="M28.2 33.4q3.8 4.2 7.6 0z" fill="#7a1e2b" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="24.6" cy="32.4" r="2.2" fill="#ff9aa8" opacity=".9" />
      <circle cx="39.4" cy="32.4" r="2.2" fill="#ff9aa8" opacity=".9" />
    </svg>
  )
}
