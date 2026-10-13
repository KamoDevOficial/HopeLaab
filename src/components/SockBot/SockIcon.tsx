// A mascote: uma meia sorridente com cano azul.
export default function SockIcon({ size = 40 }: { size?: number }) {
  const ink = '#1d2433'
  return (
    <svg width={size} height={size} viewBox="0 0 64 68" aria-hidden="true">
      <path d="M21 12h19v24c0 4 3 6 8 8 8 3 12 6 11 11-1 5-8 6-14 6H31c-8 0-13-5-11-12z" fill="#fff" stroke={ink} strokeWidth="2.6" strokeLinejoin="round" />
      <rect x="18" y="5" width="25" height="10" rx="4" fill="#17c3e8" stroke={ink} strokeWidth="2.6" />
      <circle cx="28" cy="27" r="2.3" fill={ink} />
      <circle cx="36" cy="27" r="2.3" fill={ink} />
      <path d="M28.5 33q3.5 3.5 7 0" fill="none" stroke={ink} strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="25" cy="32" r="2.2" fill="#17c3e8" opacity=".45" />
      <circle cx="39" cy="32" r="2.2" fill="#17c3e8" opacity=".45" />
    </svg>
  )
}
