# Plataforma de Frequências Synq – Frontend

Frontend em React + Vite + TypeScript com Tailwind e componentes shadcn, inspirado no estilo
"liquid glass" / glassmorphism da Apple.

## Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS + shadcn-ui
- @tanstack/react-query para data fetching e cache
- API integrada à **API Synq** via Bearer JWT

## Executando localmente

```bash
# Instalar dependências
npm install
# ou
pnpm install

# Rodar em desenvolvimento
npm run dev
# ou
pnpm dev
```

A aplicação ficará acessível em `http://localhost:8080` (conforme vite.config.ts).

## Variáveis de ambiente

Configure a URL base da API Synq:

- `VITE_API_BASE_URL` – usada pelo Vite/React (ex.: `http://localhost:8083`)
- `NEXT_PUBLIC_API_BASE_URL` – variável equivalente caso você reutilize o código em um projeto Next.js
- `NEXTAUTH_URL` – apenas se integrar autenticação via NextAuth em outro projeto

## Integração com a API Synq

Os tipos TypeScript em `src/lib/types.ts` foram gerados a partir do `api-docs.json` fornecido. O
cliente HTTP fica em `src/lib/apiClient.ts` e expõe wrappers para os principais endpoints:

- `GET /api/frequencies`, `GET /api/frequencies/{id}`, `GET /api/frequencies/slug/{slug}`
- `GET /api/frequencies/{id}/messages`, `POST /api/frequencies/{id}/messages`
- `GET /api/frequencies/{id}/members`, `POST /api/frequencies/{id}/members`
- `GET /api/users/{id}`, `GET /api/users/username/{username}`, `GET /api/users`, `POST /api/users`
- `GET /api/roles`

Use `setAuthToken(token)` de `src/lib/apiClient.ts` para configurar o cabeçalho
`Authorization: Bearer <token>` após o login.

## Design system – Liquid Glass

O design system vive em:

- `src/index.css` – tokens CSS (cores, sombras, blur) e utilitários `.glass-*`
- `tailwind.config.ts` – mapeia tokens para o tema Tailwind
- `src/theme/tokens.json` – export JSON de tokens para uso em design/Storybook/Figma
- `src/theme/index.ts` – exporta os tokens tipados em TypeScript

Principais componentes estilizados:

- `btn-primary-glass` (variant `primaryGlass` do `<Button />`)
- `.glass-card` – superfícies translúcidas com blur e brilho interno
- `.input-glass` / `.textarea-glass` – campos de texto em glassmorphism
- `.glass-bubble-*` – balões de mensagem

## Páginas principais

- `/` – landing pública com hero liquid glass
- `/login` – formulário de login (mock, pronto para conectar à sua API JWT)
- `/dashboard` – lista de frequências públicas (`GET /api/frequencies`)
- `/frequencies/:slug` – página pública de frequência com mensagens em tempo real

## Hooks e client de mensagens

- `src/lib/types.ts` – tipos derivados do OpenAPI (`api-docs.json`)
- `src/lib/apiClient.ts` – cliente HTTP com tratamento de 401 (`AuthError`)
- `src/hooks/useMessages.ts` – `useInfiniteQuery` com otimistic update e rollback para mensagens

## CI

Um workflow GitHub Actions simples foi adicionado em `.github/workflows/ci.yml` executando
instalação, lint e build. Ajuste conforme sua pipeline (por exemplo, adicionando testes com Vitest
ou Playwright).

## Segurança & recomendações

- **Autenticação**: implemente o fluxo de login real usando sua API JWT e chame `setAuthToken`.
- **XSS**: mensagens (`content`) são renderizadas como texto simples; mantenha assim, a menos que
  adicione sanitização.
- **CSRF**: como o cliente usa apenas requisições com Bearer JWT para APIs de mesmo domínio/origem,
  proteja o backend apropriadamente; evite expor endpoints sensíveis sem autenticação.
- **RSC/Server Components**: este projeto é Vite/React (client-side). Ao portar para Next.js App
  Router, mantenha chamadas sensíveis em Server Components ou rotas de servidor.
