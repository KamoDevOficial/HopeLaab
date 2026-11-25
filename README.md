# HopeLaab · limpeza de tênis (edição de Natal cartunesca)

Site em React + TypeScript + Vite. Visual cartoon de Natal, com a **ManéMeia** (meia de Natal) como atendente no canto inferior direito.

## Rodar localmente

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # gera dist/ (site normal)
npm run build:single # gera dist/index.html único, com tudo embutido
npm run typecheck
```

Precisa do Node 18 ou mais novo.

## Como o site funciona

- **Tela de carregamento** (`src/loader/`): antes de liberar o site, carrega e decodifica fontes e toda a arte (`preload.ts`), deixa o navegador montar a cena por baixo (aquecimento da GPU) e só então revela tudo. A ManéMeia customizada (`components/Mascot/ManeMeia.tsx`) balança pendurada enquanto a barra enche. Há um teto de tempo (12 s) para nunca prender o usuário.
- **Vídeo de fundo** (`components/Scene/`): uma cena cartoon que roda sozinha em loop de 12 s (tênis sujo → esponja → espuma → enxágue → brilho e presente), feita com a arte SVG de `src/art/` e animações CSS de `transform`/`opacity`, então roda na GPU sem JavaScript por quadro.
- **Detalhes ligados ao scroll**: o palco do tênis desliza de um lado para o outro e inclina, o relevo faz paralaxe, o céu entardece, a barra de pirulito no topo enche e a dica de rolagem some. Usa *scroll-driven animations* do CSS (no compositor); navegadores sem suporte usam um único listener passivo (`hooks/useScrollProgress.ts`).
- **Rolagem nativa**: nada de motor de scroll próprio; os links do menu usam o scroll suave do navegador.
- **Chat da ManéMeia** (`components/SockBot/`, `hooks/useChatFlow.ts`, `data/botFlow.ts`): serviço → modelo → mais algum? → uma foto por tênis → entrega → nome, e envia tudo para o WhatsApp (`utils/whatsapp.ts`).

## Personalizar

- Número do WhatsApp: `src/config.ts` (`WHATSAPP_NUMBER`, com DDI e DDD, só dígitos).
- Textos, serviços e passos: `src/data/content.ts`; perguntas do bot: `src/data/botFlow.ts`.
- Cores: variáveis em `src/styles/base.css`.
- Arte: `python3 tools/art.py` regenera os SVGs de `src/art/` (precisa de `pip install cairosvg pillow` só para gerar a prévia).
- Duração do loop da cena: `--L` em `src/components/Scene/scene.css` (os tempos de cada fase são porcentagens do loop).
