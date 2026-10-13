// Cada cartão visível informa onde está (px da tela) e em que etapa da chegada; o palco usa isso
// para soltar um rastro de sujeira (ou de brilho) ligando o tênis ao cartão.
export interface Trail { x: number; y: number; t: number }
export const trails = new Map<object, Trail>()
