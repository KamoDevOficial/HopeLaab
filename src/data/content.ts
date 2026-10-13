import type { NavItem, Review, Service, Step } from '../types'

export const NAV: NavItem[] = [
  { id: 'inicio', label: 'Início', icon: 'home' },
  { id: 'servicos', label: 'Serviços', icon: 'sparkle' },
  { id: 'processo', label: 'Como funciona', icon: 'drop' },
  { id: 'reviews', label: 'Avaliações', icon: 'star' },
  { id: 'agendar', label: 'Orçamento', icon: 'calendar' },
]
export const NAV_IDS = NAV.map((n) => n.id)

export const PITCH: Step[] = [
  { title: 'Sem máquina', text: 'Escova macia e espuma neutra, do cabedal à entressola.' },
  { title: 'Secagem à sombra', text: 'O material não deforma nem amarela.' },
  { title: 'Prova do resultado', text: 'Você recebe a foto do par limpo antes da entrega.' },
]

export const SERVICES: Service[] = [
  { title: 'Limpeza completa', text: 'Cabedal, língua, cadarço e entressola lavados à mão e secos à sombra.', price: 'a partir de R$ 59', pick: true },
  { title: 'Entressola branca', text: 'Tira o amarelado da borracha e do EVA sem manchar o cabedal.', price: 'a partir de R$ 45' },
  { title: 'Camurça e nobuck', text: 'Limpeza a seco, para o material não endurecer.', price: 'a partir de R$ 79' },
]

export const STEPS: Step[] = [
  { title: 'Converse e mande as fotos', text: 'A ManéMeia pergunta o essencial e pede uma foto de cada tênis. Você recebe valor e prazo no mesmo dia.' },
  { title: 'Retiramos ou você leva', text: 'Buscamos na sua casa ou você deixa no ateliê, como preferir.' },
  { title: 'Limpeza e entrega', text: 'Lavagem à mão em até 3 dias úteis, com foto do resultado antes de entregar.' },
]

export const REVIEWS: Review[] = [
  { name: 'Raphael Araujo', service: 'Limpeza completa', text: 'Nem imaginava que meu tênis poderia ficar tão branco!' },
  { name: 'Pedro Kamoda', service: 'Entressola branca', text: 'Achei que meu tênis não tinha mais jeito. Ficou novo e o cabedal nem manchou.' },
  { name: 'Rayza Rodrigues', service: 'Camurça e nobuck', text: 'A limpeza a seco no meu camurça ficou impecável, e recebi a foto antes da entrega.' },
]
