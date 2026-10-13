// Cada cartão visível informa onde está (px da tela) e em que etapa da chegada; o palco usa isso
// para soltar um rastro de sujeira (ou de brilho) ligando o tênis ao cartão.
export interface Trail { x: number; y: number; t: number }
// Quão limpo o tênis está NO QUADRO exibido agora (0..1): cartões, poeira e brilhos seguem o vídeo, não a rolagem.
export const look = { clean: 0 }

export const trails = new Map<object, Trail>()
