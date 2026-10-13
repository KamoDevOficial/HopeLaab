import { WHATSAPP_NUMBER } from '../config'
import type { Answers } from '../types'

export const whatsappUrl = (text: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`

const KEYCAP = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟']

// `attached`: as fotos seguem junto da mensagem (compartilhamento nativo) ou serão anexadas depois.
export function buildMessage(a: Answers, attached: boolean): string {
  const sent = a.fotos.filter(Boolean).length
  const total = a.modelos.length
  const fotos =
    sent === 0 ? '📸 Fotos: vou enviar aqui na conversa'
    : attached ? `📸 Fotos: ${sent} de ${total} anexadas ✅`
    : `📸 Fotos: ${sent} de ${total} (anexo na sequência) 📎`
  const models = a.modelos.map((m, i) => `${KEYCAP[i] ?? `${i + 1}.`} ${m}`).join('\n')
  return [
    'Oi, HopeLaab! 👋 Vim pelo site e quero um orçamento.',
    '',
    `🧼 Serviço: ${a.servico ?? ''}`,
    `👟 Tênis (${total}):`,
    models,
    fotos,
    `🚚 Entrega: ${a.entrega ?? ''}`,
    `🙋 Nome: ${a.nome ?? ''}`,
    '',
    'Aguardo o retorno! ✨',
  ].join('\n')
}

// Celular: compartilha texto + fotos pelo menu nativo (o usuário escolhe o WhatsApp e o contato).
// Sem suporte (ou no computador): abre wa.me com o texto e as fotos precisam ser anexadas à mão.
export async function sendToWhatsApp(a: Answers, photos: File[]): Promise<'shared' | 'link' | 'cancelled'> {
  if (photos.length && typeof navigator.canShare === 'function' && navigator.canShare({ files: photos })) {
    try {
      await navigator.share({ files: photos, text: buildMessage(a, true), title: 'Orçamento HopeLaab' })
      return 'shared'
    } catch (e) {
      if (e instanceof DOMException && e.name === 'AbortError') return 'cancelled'
    }
  }
  const url = whatsappUrl(buildMessage(a, false))
  const w = window.open(url, '_blank')
  if (w) w.opener = null
  else window.location.href = url
  return 'link'
}
