# HopeLaab — site de limpeza de tênis (React + TypeScript + Vite)
`npm install`, `npm run dev` para desenvolver, `npm run build` para gerar a pasta `dist`.

O fundo fixo da página é o tênis do vídeo, recortado quadro a quadro (PNG/WebP com transparência): a rolagem escolhe o quadro, e inclinação, flutuação, sombra, poeira e brilhos são desenhados em código. Os cartões saem da "sujeira" do tênis e vêm do fundo até a frente.

- `src/config.ts`: número do WhatsApp (ex.: `5511999999999`).
- `src/data/content.ts`: menu, textos, serviços, passos e avaliações (os exemplos são fictícios, troque pelos reais).
- `src/data/botFlow.ts`: perguntas da ManéMeia.
- `src/assets/frames/`: quadros recortados do tênis, com transparência (f_001.webp ...). Mantenha o mesmo tamanho em todos.
- `src/lib/glide.ts`: deslize do menu até a seção (velocidade controlada). `src/lib/scrollEngine.ts` limita a velocidade da animação.
- `src/lib/timeline.ts`: quanto da página o vídeo ocupa (`VIDEO_END`) e o vai e volta do final.
- `src/lib/stageDraw.ts`: halo, sombra, poeira, rastros e brilhos do palco. `src/lib/frameCache.ts`: decodifica só os quadros perto da posição atual, para a rolagem ficar leve.
- `src/lib/scrollEngine.ts`: laço de animação único (suaviza a rolagem). `src/lib/depth.ts`: efeito de cartão vindo do fundo até a frente.
- `src/components/Backdrop`: vídeo de fundo (mistura quadros vizinhos para ficar fluido). `Sections`: cenas, cada cartão num canto. `Header`, `SockBot`: menu e chat.
- `npm run build:single` gera um único HTML com tudo embutido.
