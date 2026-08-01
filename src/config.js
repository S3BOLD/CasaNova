import { ChefHat, BedDouble, Armchair, Bath, Package, LayoutGrid } from 'lucide-react';

// ---------------------------------------------------------------------
// CONFIGURAÇÃO — edite aqui os dados do evento
// ---------------------------------------------------------------------
export const CONFIG = {
  hostNames: ['Amanda Leticia'],
  dateNum: '20',
  dateLabel: 'de setembro',
  address: 'Rua ???',
  note: 'Pensa em algo',
};

export const CATEGORIES = ['Cozinha', 'Quarto', 'Sala', 'Banheiro', 'Diversos'];

// A lista inicial de presentes agora mora em lib/defaultGifts.js (lado do
// servidor) — ela só é usada para "semear" o gifts.json na primeira vez
// que o app roda. Depois disso, quem manda é o próprio arquivo no Blob.

export const CATEGORY_ICONS = {
  Todos: LayoutGrid,
  Cozinha: ChefHat,
  Quarto: BedDouble,
  Sala: Armchair,
  Banheiro: Bath,
  Diversos: Package,
};
