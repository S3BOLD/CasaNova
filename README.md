# Chá de Casa Nova 🏡

Site de lista de presentes para o chá de casa nova. Sem cadastro e sem senha para os
convidados — eles só escolhem o presente e (opcionalmente) deixam o nome. As escolhas
ficam salvas num arquivo `gifts.json` guardado no **Vercel Blob** e aparecem pra todo
mundo que tiver o link.

## Estrutura do projeto

```
cha-de-casa-nova/
├── index.html
├── package.json
├── vite.config.js
├── .env.example              ← copie para ".env" e preencha (só necessário localmente)
├── api/
│   └── gifts.js               função serverless: GET lê o gifts.json, POST escreve
├── lib/
│   ├── blobStore.js            lê/escreve o gifts.json no Vercel Blob
│   └── defaultGifts.js         lista usada só para "semear" o arquivo na 1ª vez
└── src/
    ├── main.jsx                 ponto de entrada do React
    ├── App.jsx                  junta os componentes e o hook de dados
    ├── index.css                 todo o estilo visual
    ├── config.js                 nomes, data, endereço e categorias
    ├── utils.js                  cálculo das estatísticas do dashboard
    ├── hooks/
    │   └── useGifts.js           conversa com /api/gifts (busca + polling)
    └── components/
        ├── Hero.jsx               cabeçalho decorativo
        ├── Dashboard.jsx           painel lateral com progresso e categorias
        ├── GiftCard.jsx            cada presente da lista
        └── SuggestCard.jsx         formulário para sugerir um novo presente
```

## Por que um arquivo JSON e não algo salvo direto em disco?

O Vercel roda cada função (`/api/gifts.js`) em um ambiente que **não guarda arquivos
entre execuções** — se a gente escrevesse num arquivo local, os dados sumiriam a
qualquer momento. Por isso usamos o **Vercel Blob**: um armazenamento de arquivos do
próprio Vercel, gratuito no plano Hobby, onde o `gifts.json` fica guardado de verdade
e é lido/escrito pela função sempre que alguém escolhe ou sugere um presente.

## 1. Crie um projeto na Vercel e conecte o Blob

1. Suba esta pasta para um repositório no GitHub.
2. Acesse [vercel.com](https://vercel.com), crie uma conta gratuita e clique em **"Add New… → Project"**, escolhendo esse repositório (a Vercel detecta o Vite automaticamente).
3. Antes ou depois do primeiro deploy, abra o projeto na Vercel e vá na aba **Storage**.
4. Clique em **Create Database → Blob** e dê um nome ao store (ex: `cha-presentes`).
5. Conecte o store ao seu projeto quando for perguntado. Isso cria sozinha a variável de ambiente `BLOB_READ_WRITE_TOKEN` em Production e Preview — você não precisa copiar nada manualmente para o deploy em si.
6. Clique em **Deploy** (ou refaça o deploy, se já tiver feito antes de conectar o Blob).

Pronto — nesse ponto o site já está no ar com um link público (algo como
`seu-projeto.vercel.app`) para compartilhar com os convidados.

## 2. Rodando localmente

Para testar no seu computador você precisa do [Node.js](https://nodejs.org) (18+) e da Vercel CLI (já incluída nas `devDependencies`).

```bash
npm install
npx vercel link      # conecta esta pasta ao projeto que você criou na Vercel
npx vercel env pull .env.development.local   # baixa o BLOB_READ_WRITE_TOKEN pra rodar local
npm run dev           # roda "vercel dev" — sobe o front-end E a função /api juntos
```

> Rodar só `vite` (sem ser via `vercel dev`) não funciona aqui, porque a pasta `/api`
> precisa do emulador de funções da Vercel CLI para responder localmente.

Se preferir não linkar o projeto, você também pode copiar o token manualmente: no
painel da Vercel, aba **Storage → (seu Blob store) → .env.local**, copie o valor de
`BLOB_READ_WRITE_TOKEN` e cole no seu arquivo `.env` (baseado no `.env.example`).

Na primeiríssima vez que a função `/api/gifts` rodar (local ou em produção) e o
`gifts.json` ainda não existir, ela cria o arquivo automaticamente com a lista de
`lib/defaultGifts.js`.

## 3. Personalize

Edite `src/config.js`:
- `CONFIG.hostNames`, `CONFIG.dateNum`, `CONFIG.dateLabel`, `CONFIG.address`, `CONFIG.note`

Edite `lib/defaultGifts.js` **antes do primeiro deploy** (ou antes de acessar o site
pela primeira vez) para mudar a lista inicial de presentes — depois que o
`gifts.json` já existe, editar esse arquivo não muda mais nada.

Depois que o site já está no ar, para adicionar/remover presentes:
- **Adicionar**: use o próprio botão "+ Sugerir presente" no site.
- **Remover ou editar** um presente já existente: abra o painel da Vercel → **Storage
  → seu Blob store**, encontre o arquivo `gifts.json`, baixe, edite o texto e faça o
  upload de novo substituindo o arquivo (ou peça pra eu gerar uma telinha de admin,
  se preferir algo mais prático que mexer no arquivo na mão).

## Como funciona por baixo dos panos

- `GET /api/gifts` → lê o `gifts.json` do Blob e devolve a lista.
- `POST /api/gifts` com `{ action: "claim", id, name }` → marca um presente como
  escolhido e regrava o arquivo.
- `POST /api/gifts` com `{ action: "unclaim", id }` → desmarca.
- `POST /api/gifts` com `{ action: "add", gift }` → adiciona um novo presente sugerido.

Como não existe um mecanismo de "avisar" os outros navegadores na hora (isso exigiria
um servidor sempre ligado com WebSockets), o site consulta o servidor a cada 10
segundos automaticamente, além de ter um botão de atualizar manual no painel lateral.
Quem faz a ação vê a mudança na hora; os demais, em até 10s (ou na hora, se
clicarem em atualizar).

## Limitações e segurança, com transparência

- **Concorrência**: se duas pessoas clicarem no exato mesmo presente no mesmíssimo
  instante, a última escrita pode sobrescrever a outra. Para o tamanho de um chá de
  casa nova (algumas dezenas de convidados clicando em momentos diferentes), o risco
  na prática é bem baixo.
- **Sem autenticação**: qualquer pessoa com o link consegue escolher, desmarcar ou
  sugerir presentes — não há conta de usuário nem senha. Ótimo para compartilhar com
  os convidados, mas não trate o link como algo secreto/sensível.
- **Plano gratuito**: o Vercel Blob tem uma cota gratuita generosa no plano Hobby —
  um evento com algumas dezenas de convidados fica bem longe do limite.
