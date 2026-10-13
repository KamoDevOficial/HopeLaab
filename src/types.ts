export type IconName = 'home' | 'sparkle' | 'drop' | 'star' | 'calendar'
export type Corner = 'tl' | 'tr' | 'bl' | 'br'
export type Stage = 'servico' | 'modelo' | 'mais' | 'foto' | 'entrega' | 'nome' | 'done'

// `fotos` guarda, para cada tênis, se a foto foi enviada (true) ou ficou para depois (false).
export interface Answers { servico?: string; modelos: string[]; fotos: boolean[]; entrega?: string; nome?: string }
export interface Prompt { ask: string; options?: string[]; placeholder?: string; photo?: boolean }

export interface NavItem { id: string; label: string; icon: IconName }
export interface Review { name: string; service: string; text: string }
export interface Service { title: string; text: string; price: string; pick?: boolean }
export interface Step { title: string; text: string }
export interface ChatMessage { from: 'bot' | 'user'; lines: string[]; time: string; image?: string }
