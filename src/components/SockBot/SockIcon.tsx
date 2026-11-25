// A mascote: uma meia de Natal sorridente, com punho de pelúcia, calcanhar e ponta brancos, azevinho e alça dourada.
export default function SockIcon({ size = 40 }: { size?: number }) {
  const ink = '#1f2d3d'
  const body = 'M21 12h19v24c0 4 3 6 8 8 8 3 12 6 11 11-1 5-8 6-14 6H31c-8 0-13-5-11-12z'
  return (
    <svg width={size} height={size} viewBox="0 0 64 68" aria-hidden="true">
      <path d={body} fill="#d92b3a" />
      <ellipse cx="25.5" cy="51" rx="4.6" ry="5.6" fill="#fff" />
      <ellipse cx="52.5" cy="54.5" rx="5.6" ry="4.6" fill="#fff" />
      <path d={body} fill="none" stroke={ink} strokeWidth="2.6" strokeLinejoin="round" />
      <rect x="17" y="4" width="27" height="12" rx="6" fill="#fff" stroke={ink} strokeWidth="2.6" />
      <path d="M21 10h19" stroke="#dbe6f0" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M22 5C22 1.5 28 1.5 28 5" fill="none" stroke="#f2b632" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M36 4.5c2-2.6 6-2.4 7.4.2-2.2 2-5.6 2.3-7.4-.2z" fill="#2e9e57" stroke={ink} strokeWidth="1.1" />
      <circle cx="36.5" cy="5.5" r="2.1" fill="#d92b3a" stroke={ink} strokeWidth="1" />
      <circle cx="28" cy="27" r="2.7" fill="#fff" />
      <circle cx="36" cy="27" r="2.7" fill="#fff" />
      <circle cx="28.4" cy="27.2" r="1.3" fill={ink} />
      <circle cx="36.4" cy="27.2" r="1.3" fill={ink} />
      <path d="M28.5 33q3.5 3.5 7 0" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="24.8" cy="32" r="2.2" fill="#ff9aa2" opacity=".85" />
      <circle cx="39.2" cy="32" r="2.2" fill="#ff9aa2" opacity=".85" />
    </svg>
  )
}
