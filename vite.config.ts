import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// `npm run build` gera a pasta dist normal; `npm run build:single` gera um único HTML (frames inclusos).
export default defineConfig(({ mode }) => ({
  plugins: [react(), mode === 'single' && viteSingleFile()].filter(Boolean),
}))
