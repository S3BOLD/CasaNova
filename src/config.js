import { ChefHat, BedDouble, Armchair, Bath, Package, LayoutGrid } from 'lucide-react';

// ---------------------------------------------------------------------
// CONFIGURAÇÃO — edite aqui os dados do evento
// ---------------------------------------------------------------------
export const CONFIG = {
  hostNames: ['Amanda Leticia'],
  dateNum: '20',
  dateLabel: 'de setembro',
  address: 'Severino Gretter, 106 - Espinheiros, Joinville - SC',
  note: 'Pensa em algo',
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
