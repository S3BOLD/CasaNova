import { ChefHat, BedDouble, Armchair, Bath, Package, LayoutGrid } from 'lucide-react';

// ---------------------------------------------------------------------
// CONFIGURAÇÃO — edite aqui os dados do evento
// ---------------------------------------------------------------------
export const CONFIG = {
  hostNames: ['Amanda Leticia'],
  dateNum: '20',
  dateLabel: 'de setembro',
  time: '11:30',
  // Use "\n" pra separar as linhas do endereço (rua/número, bairro, cidade - UF).
  address: 'Severino Gretter, 106\nEspinheiros\nJoinville - SC',
  note: '',
  welcomeMessage: [
    'Há alguns anos, esse momento foi sonhado, planejado, preparado e muito aguardado. E finalmente, chegou a hora de comemorar essa conquista ao lado de quem esteve comigo nas etapas desse caminho.',
    'Se você está aqui, é porque é muito importante para mim, esteve presente em conversas, conselhos e momentos especiais.',
    'Fico imensamente feliz em poder compartilhar com você uma conquista tão especial: o meu novo lar! ',
    'Quero te convidar para passar esse dia comigo, celebrando o início de uma nova e muito importante etapa da minha vida, com muita comida boa, risadas, carinho e uma grande comemoração!\nEspero você para tornar esse momento ainda mais especial!',
  ],
  giftBannerTitle: 'Ah, deixei aqui uma listinha com algumas ideias, caso você queira deixar uma lembrança sua. 🤎',
  giftBannerText: '',
  footerLine: 'Conto com você!',
};

export const CATEGORIES = ['Cozinha', 'Quarto', 'Banheiro', 'Diversos'];

// A lista inicial de presentes agora mora em lib/defaultGifts.js (lado do
// servidor) — ela só é usada para "semear" o gifts.json na primeira vez
// que o app roda. Depois disso, quem manda é o próprio arquivo no Blob.

export const CATEGORY_ICONS = {
  Todos: LayoutGrid,
  Cozinha: ChefHat,
  Quarto: BedDouble,
  Banheiro: Bath,
  Diversos: Package,
};
