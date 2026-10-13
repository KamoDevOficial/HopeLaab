import SockIcon from '../SockBot/SockIcon'
import Scene from './Scene'

export default function Cta({ onOpenChat }: { onOpenChat: () => void }) {
  return (
    <Scene id="agendar" corner="tr">
      <h2>Peça seu orçamento sem sair da página</h2>
      <p>A ManéMeia faz algumas perguntas, pede a foto dos tênis e leva tudo para o nosso WhatsApp.</p>
      <button type="button" className="btn" onClick={onOpenChat}>
        <SockIcon size={28} />
        Converse com a ManéMeia
      </button>
    </Scene>
  )
}
