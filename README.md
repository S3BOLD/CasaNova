# Chá de Casa Nova 🏡

Site com três abas — **Início**, **Presentes** e **Referências** — para o chá de casa
nova. Os convidados não precisam de cadastro nem senha: só escolhem o presente e
(opcionalmente) deixam o nome. As escolhas ficam salvas num arquivo `gifts.json`
guardado no **Vercel Blob** e aparecem pra todo mundo que tiver o link.

## ⚠️ Se você já tinha rodado uma versão anterior deste projeto

O formato dos dados mudou: antes cada presente guardava **um nome** em `claimedBy`
(texto ou `null`); agora guarda **uma lista de nomes**, porque alguns presentes podem
ser reservados por várias pessoas ao mesmo tempo. Se o `gifts.json` já existe no seu
Blob store (de testes anteriores), apague-o antes de continuar:

**Painel da Vercel → seu projeto → Storage → seu Blob store → encontre `gifts.json` →
delete.** Na próxima vez que o site carregar, ele recria o arquivo já no formato novo,
com a lista de presentes de `lib/defaultGifts.js`.

## Estrutura do projeto

```
cha-de-casa-nova/
├── index.html
├── package.json
├── vite.config.js
├── .env.example                copie para ".env" e preencha (só necessário localmente)
├── api/
│   └── gifts.js                 função serverless: GET lê o gifts.json, POST escreve
├── lib/
│   ├── blobStore.js              lê/escreve o gifts.json no Vercel Blob
│   └── defaultGifts.js           lista usada só para "semear" o arquivo na 1ª vez
└── src/
    ├── main.jsx                   ponto de entrada do React
    ├── App.jsx                    casca do site: nav de abas + qual página mostrar
    ├── index.css                   todo o estilo visual
    ├── config.js                   nomes, data, endereço e categorias
    ├── utils.js                    cálculo das estatísticas do dashboard
    ├── referenceImages.js          fotos de referência (só você edita, ver abaixo)
    ├── hooks/
    │   └── useGifts.js             conversa com /api/gifts (busca + polling)
    ├── components/
    │   ├── TopNav.jsx               nav com as 3 abas
    │   ├── Hero.jsx                  cabeçalho decorativo (arco + casinha + data)
    │   ├── Dashboard.jsx             painel lateral com progresso e categorias
    │   ├── GiftCard.jsx              cada presente da lista (1 ou várias vagas)
    │   └── SuggestCard.jsx           formulário para sugerir um novo presente
    └── pages/
        ├── HomePage.jsx              aba "Início" — hero + informações do evento
        ├── GiftsPage.jsx              aba "Presentes" — dashboard + grade de presentes
        └── ReferencesPage.jsx         aba "Referências" — galeria estática de fotos
```

## As três abas

- **Início**: o cabeçalho decorativo (arco, casinha, data) e as informações do evento
  — nome, data, endereço e um recado, com um botão que leva direto pra aba de
  presentes.
- **Presentes**: exatamente a lista/dashboard que já existia — categorias, progresso
  e os cartões de presente.
- **Referências**: uma galeria de fotos **fixa**, que só você edita mexendo no código
  (arquivo `src/referenceImages.js`). Os convidados só visualizam; não existe nenhum
  botão de adicionar, editar ou apagar nessa aba.

### Como adicionar fotos na aba Referências

Abra `src/referenceImages.js` e adicione itens à lista `REFERENCE_IMAGES`:

```js
export const REFERENCE_IMAGES = [
  { src: '/referencias/toalha-banho.jpg', caption: 'Toalha de banho - tom areia' },
  { src: 'https://exemplo.com/foto.jpg', caption: 'Panos de prato - linho cru' },
];
```

- **Foto local**: salve o arquivo dentro de uma pasta `public/referencias/` na raiz do
  projeto (crie a pasta se não existir) e use o caminho começando com `/`.
- **Foto da internet**: cole a URL direta da imagem.

## Presentes com várias vagas

Três presentes já vêm prontos e aceitam **até 8 pessoas** cada:

- Toalha de banho
- Toalha de rosto
- Panos de prato

Cada um mostra "X de 8 reservado(s)", a lista de quem já reservou, e continua
aceitando novas reservas até lotar. Qualquer presente sugerido pelos próprios
convidados (botão "+ Sugerir presente") vale para **uma única pessoa**, como já era
antes. Isso é controlado pelo campo `maxClaims` de cada presente — só é definido nos
itens de `lib/defaultGifts.js`; presentes sugeridos pela interface sempre nascem com
`maxClaims: 1`.

## Por que um arquivo JSON e não algo salvo direto em disco?

O Vercel roda cada função (`/api/gifts.js`) em um ambiente que **não guarda arquivos
entre execuções** — se a gente escrevesse num arquivo local, os dados sumiriam a
qualquer momento. Por isso usamos o **Vercel Blob**: um armazenamento de arquivos do
próprio Vercel, gratuito no plano Hobby, onde o `gifts.json` fica guardado de verdade
e é lido/escrito pela função sempre que alguém escolhe ou sugere um presente.

## 1. Crie um projeto na Vercel e conecte o Blob

1. Suba esta pasta para um repositório no GitHub.
2. Acesse [vercel.com](https://vercel.com), crie uma conta gratuita e clique em **"Add New… → Project"**, escolhendo esse repositório (a Vercel detecta o Vite automaticamente).
3. Abra o projeto na Vercel e vá na aba **Storage**.
4. Clique em **Create Database → Blob** e dê um nome ao store (ex: `cha-presentes`).
5. Conecte o store ao seu projeto quando for perguntado. Isso cria sozinha a variável `BLOB_READ_WRITE_TOKEN` em Production e Preview.
6. Clique em **Deploy** (ou refaça o deploy, se já tiver feito antes de conectar o Blob).

## 2. Rodando localmente

```bash
npm install
npx vercel link                                 # conecta esta pasta ao projeto da Vercel
npx vercel env pull .env.development.local       # baixa o BLOB_READ_WRITE_TOKEN pra rodar local
npm run dev                                      # roda "vercel dev" — front-end + /api juntos
```

> Rodar só `vite` (sem ser via `vercel dev`) não funciona aqui, porque a pasta `/api`
> precisa do emulador de funções da Vercel CLI para responder localmente.

## 3. Personalize

Edite `src/config.js`:
- `CONFIG.hostNames` — um nome (`['Amanda Leticia']`) ou dois (`['Ana', 'Bruno']`, aparecem como "Ana & Bruno")
- `CONFIG.dateNum`, `CONFIG.dateLabel`, `CONFIG.address`, `CONFIG.note`

Edite `lib/defaultGifts.js` **antes do primeiro acesso ao site** para mudar a lista
inicial de presentes — depois que o `gifts.json` já existe, editar esse arquivo não
muda mais nada (use o botão "+ Sugerir presente" no site, ou edite o arquivo direto
no painel da Vercel).

## Como funciona por baixo dos panos

- `GET /api/gifts` → lê o `gifts.json` do Blob e devolve a lista.
- `POST /api/gifts` com `{ action: "claim", id, name }` → reserva uma vaga (se ainda houver) e regrava o arquivo.
- `POST /api/gifts` com `{ action: "unclaim", id, index }` → remove a reserva na posição `index` da lista de quem reservou.
- `POST /api/gifts` com `{ action: "add", gift }` → adiciona um novo presente sugerido (sempre com 1 vaga).

Como não existe um mecanismo de "avisar" os outros navegadores na hora, o site
consulta o servidor a cada 10 segundos automaticamente, além de ter um botão de
atualizar manual no painel lateral da aba Presentes.

## Limitações e segurança, com transparência

- **Concorrência**: se duas pessoas clicarem na última vaga de um presente no
  exato mesmo instante, uma das duas pode ver uma mensagem dizendo que as vagas
  acabaram — nesse caso é só escolher outro presente ou atualizar a página.
- **Sem autenticação**: qualquer pessoa com o link consegue escolher, desmarcar,
  sugerir, **editar ou excluir** qualquer presente da lista — não há conta de usuário
  nem senha, nem distinção entre "anfitrião" e "convidado". Isso deixa a gestão da
  lista mais prática (você e os convidados mexem direto pelo site), mas também
  significa que qualquer pessoa com o link pode apagar um presente por engano — vale
  só ter isso em mente antes de espalhar o link.
- **Plano gratuito**: o Vercel Blob tem uma cota gratuita generosa no plano Hobby —
  um evento com algumas dezenas de convidados fica bem longe do limite.
