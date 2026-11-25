import type { NavItem, Service, Step } from '../types'

export const NAV: NavItem[] = [
  { id: 'inicio', label: 'Início', icon: 'home' },
  { id: 'servicos', label: 'Serviços', icon: 'sparkle' },
  { id: 'processo', label: 'Como funciona', icon: 'drop' },
  { id: 'agendar', label: 'Orçamento', icon: 'gift' },
]
export const NAV_IDS = NAV.map((n) => n.id)

export const HERO = {
  tag: 'Edição de Natal',
  title: ['Seu tênis merece um', 'Natal branquinho'],
  text: 'A HopeLaab lava à mão, devolve o branco de volta e ainda manda a foto do resultado antes da entrega.',
  perks: ['Lavagem 100% à mão', 'Foto do resultado', 'Retirada em casa'],
}

export const SERVICES: Service[] = [
  { title: 'Limpeza completa', text: 'Cabedal, língua, cadarço e entressola lavados à mão e secos à sombra.', price: 'a partir de R$ 59', icon: 'shoe', pick: true },
  { title: 'Entressola branca', text: 'Tira o amarelado da borracha e do EVA sem manchar o cabedal.', price: 'a partir de R$ 45', icon: 'sole' },
  { title: 'Camurça e nobuck', text: 'Limpeza a seco, para o material não endurecer nem perder a cor.', price: 'a partir de R$ 79', icon: 'suede' },
]

export const STEPS: Step[] = [
  { title: 'Converse e mande as fotos', text: 'A ManéMeia pergunta o essencial e pede uma foto de cada tênis. Você recebe valor e prazo no mesmo dia.' },
  { title: 'Retiramos ou você leva', text: 'Buscamos na sua casa ou você deixa no ateliê, como preferir.' },
  { title: 'Limpeza e entrega', text: 'Lavagem à mão em até 3 dias úteis, com foto do resultado antes de entregar.' },
]

export const CTA = {
  title: 'Pronto para o presente?',
  text: 'Fale com a ManéMeia: são quatro perguntas rápidas e o pedido segue direto para o nosso WhatsApp.',
}
