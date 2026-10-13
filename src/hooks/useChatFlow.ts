import { useEffect, useRef, useState } from 'react'
import { applyAnswer, botReplies, nextStage, promptFor } from '../data/botFlow'
import type { Answers, ChatMessage, Prompt, Stage } from '../types'

const emptyAnswers = (): Answers => ({ modelos: [], fotos: [] })
const now = () => new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
const start = (): ChatMessage[] => [{ from: 'bot', lines: [promptFor('servico', emptyAnswers()).ask], time: now() }]

export default function useChatFlow() {
  const [messages, setMessages] = useState<ChatMessage[]>(start)
  const [answers, setAnswers] = useState<Answers>(emptyAnswers)
  const [photos, setPhotos] = useState<File[]>([])
  const [stage, setStage] = useState<Stage>('servico')
  const [typing, setTyping] = useState(false)
  const timers = useRef<number[]>([])
  const urls = useRef<string[]>([])

  const cleanup = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    urls.current.forEach((u) => URL.revokeObjectURL(u))
    urls.current = []
  }
  useEffect(() => cleanup, [])

  // `photo` só vale na etapa de fotos: o balão do usuário mostra a imagem.
  const answer = (value: string, photo?: File) => {
    if (typing || stage === 'done') return
    const has = !!photo
    const next = applyAnswer(stage, value, answers, has)
    const to = nextStage(stage, value, next)
    let image: string | undefined
    if (photo) {
      image = URL.createObjectURL(photo)
      urls.current.push(image)
      setPhotos((p) => [...p, photo])
    }
    setAnswers(next)
    setStage(to)
    setMessages((m) => [...m, { from: 'user', lines: [value], time: now(), image }])
    setTyping(true)

    const lines = botReplies(stage, value, next, to, has)
    timers.current.push(
      window.setTimeout(() => {
        setMessages((m) => [...m, { from: 'bot', lines, time: now() }])
        setTyping(false)
      }, 650 + lines.length * 250),
    )
  }

  const reset = () => {
    cleanup()
    setMessages(start())
    setAnswers(emptyAnswers())
    setPhotos([])
    setStage('servico')
    setTyping(false)
  }

  const done = stage === 'done' && !typing
  const question: Prompt | null = stage === 'done' || typing ? null : promptFor(stage, answers)
  return { messages, typing, done, answers, photos, question, answer, reset }
}
