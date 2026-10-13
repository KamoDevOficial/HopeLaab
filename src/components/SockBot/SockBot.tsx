import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import useChatFlow from '../../hooks/useChatFlow'
import { INTRO, LATER } from '../../data/botFlow'
import { sendToWhatsApp } from '../../utils/whatsapp'
import SockIcon from './SockIcon'
import './sockbot.css'

interface Props { open: boolean; onOpenChange: (open: boolean) => void }

export default function SockBot({ open, onOpenChange }: Props) {
  const [draft, setDraft] = useState('')
  const [note, setNote] = useState('')
  const chat = useChatFlow()
  const endRef = useRef<HTMLDivElement>(null)
  const q = chat.question

  useEffect(() => { endRef.current?.scrollIntoView({ block: 'end' }) }, [chat.messages, chat.typing, open])
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onOpenChange(false)
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [open, onOpenChange])

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const v = draft.trim()
    if (!v) return
    chat.answer(v)
    setDraft('')
  }
  const onPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (file) chat.answer(chat.answers.modelos[chat.answers.fotos.length] ?? 'Foto', file)
  }
  const send = async () => {
    const n = chat.photos.length
    const r = await sendToWhatsApp(chat.answers, chat.photos)
    if (r === 'shared') setNote('Dados e fotos prontos no WhatsApp. Escolha o contato da HopeLaab para finalizar.')
    else if (r === 'link') setNote(n ? `Abri o WhatsApp com os seus dados. Anexe ${n === 1 ? 'a foto' : `as ${n} fotos`} na conversa.` : 'Abri o WhatsApp com os seus dados.')
  }
  const reset = () => { setNote(''); chat.reset() }

  return (
    <div className="sockbot">
      {open && (
        <section className="bot-panel" role="dialog" aria-label="Atendimento da HopeLaab">
          <header>
            <SockIcon size={34} />
            <div><b>ManéMeia</b><small>Atendimento da HopeLaab</small></div>
            <button onClick={() => onOpenChange(false)} aria-label="Fechar atendimento">✕</button>
          </header>
          <div className="bot-log" role="log" aria-live="polite">
            <div className="bot-intro">
              <SockIcon size={52} />
              <b>{INTRO.title}</b>
              <p>{INTRO.text}</p>
            </div>
            {chat.messages.map((m, i) => (
              <div key={i} className={`row ${m.from}`}>
                <div className={`msg ${m.from}`}>
                  {m.image && <img className="shot" src={m.image} alt="Foto do tênis enviada" />}
                  {m.lines.map((l, j) => <p key={j}>{l}</p>)}
                  <span className="meta">{m.time}</span>
                </div>
              </div>
            ))}
            {chat.typing && (
              <div className="row bot">
                <div className="msg bot typing" role="status" aria-label="Digitando"><i /><i /><i /></div>
              </div>
            )}
            <div ref={endRef} />
          </div>
          <div className="bot-input">
            {q?.photo && (
              <div className="chips">
                <label>Enviar foto<input type="file" accept="image/*" onChange={onPhoto} aria-label={q.ask} /></label>
                <button onClick={() => chat.answer(LATER)}>{LATER}</button>
              </div>
            )}
            {q?.options && (
              <div className={`chips${q.options.some((o) => o.length > 16) ? ' stack' : ''}`}>
                {q.options.map((o) => <button key={o} onClick={() => chat.answer(o)}>{o}</button>)}
              </div>
            )}
            {q && !q.options && !q.photo && (
              <form onSubmit={submit}>
                <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder={q.placeholder} aria-label={q.ask} autoFocus />
                <button>Enviar</button>
              </form>
            )}
            {chat.done && (
              <div className="bot-done">
                <button className="btn send" onClick={send}>Enviar no WhatsApp</button>
                {note && <p className="note" role="status">{note}</p>}
                <button className="ghost" onClick={reset}>Recomeçar</button>
              </div>
            )}
          </div>
        </section>
      )}
      <button className="bot-fab" onClick={() => onOpenChange(!open)} aria-expanded={open} aria-label={open ? 'Fechar atendimento' : 'Falar com a ManéMeia'}>
        <SockIcon size={38} />
      </button>
    </div>
  )
}
