import type { Answers, Prompt, Stage } from '../types'

export const INTRO = {
  title: 'Oi! Eu sou a ManéMeia',
  text: 'A meia da HopeLaab. Faço algumas perguntas rápidas, peço a foto dos tênis e mando tudo para o nosso WhatsApp.',
}

export const MORE = 'Tem mais um par'
export const LATER = 'Mando depois'

type AskStage = Exclude<Stage, 'done'>

// Roteiro: servico -> modelo -> mais (repete modelo) -> foto (uma por tênis) -> entrega -> nome.
const PROMPTS: Record<AskStage, Prompt> = {
  servico: { ask: 'Qual serviço você quer?', options: ['Limpeza completa', 'Entressola branca', 'Camurça e nobuck', 'Ainda não sei'] },
  modelo: { ask: 'Qual é o modelo do tênis?', placeholder: 'Ex.: Air Max, Old Skool' },
  mais: { ask: 'É só esse par ou tem mais algum?', options: ['Só esse', MORE] },
  foto: { ask: 'Agora a foto do tênis.', photo: true },
  entrega: { ask: 'Como prefere entregar?', options: ['Retirem na minha casa', 'Eu levo ao ateliê'] },
  nome: { ask: 'Para finalizar, como posso te chamar?', placeholder: 'Seu nome' },
}

export function promptFor(stage: AskStage, a: Answers): Prompt {
  if (stage === 'modelo' && a.modelos.length > 0) return { ...PROMPTS.modelo, ask: 'E qual é o modelo do próximo tênis?' }
  if (stage === 'mais' && a.modelos.length > 1) return { ask: 'E tem mais algum par?', options: ['Só esses', MORE] }
  if (stage === 'foto') {
    const n = a.fotos.length, total = a.modelos.length, name = a.modelos[n]
    return { photo: true, ask: total === 1 ? `Agora preciso de uma foto do seu tênis (${name}). Pode mandar!` : `Foto do tênis ${n + 1} de ${total}: ${name}. Pode mandar!` }
  }
  return PROMPTS[stage]
}

export function applyAnswer(stage: Stage, value: string, a: Answers, photo: boolean): Answers {
  switch (stage) {
    case 'servico': return { ...a, servico: value }
    case 'modelo': return { ...a, modelos: [...a.modelos, value] }
    case 'foto': return { ...a, fotos: [...a.fotos, photo] }
    case 'entrega': return { ...a, entrega: value }
    case 'nome': return { ...a, nome: value }
    default: return a
  }
}

// `a` já inclui a resposta atual.
export function nextStage(stage: Stage, value: string, a: Answers): Stage {
  switch (stage) {
    case 'servico': return 'modelo'
    case 'modelo': return 'mais'
    case 'mais': return value === MORE ? 'modelo' : 'foto'
    case 'foto': return a.fotos.length < a.modelos.length ? 'foto' : 'entrega'
    case 'entrega': return 'nome'
    default: return 'done'
  }
}

const DELIVERY: Record<string, string> = {
  'Retirem na minha casa': 'Combinado, a gente busca no seu endereço.',
  'Eu levo ao ateliê': 'Combinado, é só deixar no nosso ateliê.',
}

function reaction(stage: Stage, value: string, a: Answers, photo: boolean): string {
  switch (stage) {
    case 'servico': return value === 'Ainda não sei' ? 'Sem problema, a gente indica o melhor jeito na avaliação.' : `Boa escolha: ${value.toLowerCase()}.`
    case 'modelo': return `Anotei: ${value}.`
    case 'mais':
      if (value === MORE) return 'Beleza, vamos para o próximo par.'
      return a.modelos.length === 1 ? 'Fechado, um par só.' : `Fechado, ${a.modelos.length} pares. Agora preciso de uma foto de cada um.`
    case 'foto': return photo ? 'Foto recebida!' : 'Sem problema, você manda depois no WhatsApp.'
    case 'entrega': return DELIVERY[value] ?? 'Combinado.'
    default: return `Obrigada, ${value}! Já separei tudo.`
  }
}

// Cada resposta da ManéMeia é UMA mensagem (um balão) entre duas mensagens do usuário.
export function botReplies(stage: Stage, value: string, a: Answers, to: Stage, photo: boolean): string[] {
  const r = reaction(stage, value, a, photo)
  if (to === 'done') return [r, 'Toque no botão para enviar ao WhatsApp. No celular as fotos vão juntas; no computador, é só anexá-las na conversa.']
  return [r, promptFor(to, a).ask]
}
