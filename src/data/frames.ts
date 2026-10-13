// Carrega todos os quadros de src/assets/frames em ordem alfabética (f_001, f_002, ...).
const files = import.meta.glob<string>('../assets/frames/*.webp', { eager: true, import: 'default' })
export const FRAMES = Object.keys(files).sort().map((k) => files[k])
