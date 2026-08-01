// Lista usada apenas para "semear" o gifts.json na primeiríssima vez que
// o app roda (quando o arquivo ainda não existe no Blob storage).
// Depois disso, quem manda é o próprio gifts.json — editar aqui não muda
// mais nada em produção. Para adicionar/remover presentes depois, use o
// próprio site (botão "+ Sugerir presente") ou edite o arquivo direto no
// painel do Vercel Blob.
export const DEFAULT_GIFTS = [
  { name: 'Jogo de panelas', category: 'Cozinha', desc: 'Um conjunto completo pra estrear o fogão.' },
  { name: 'Liquidificador', category: 'Cozinha', desc: '' },
  { name: 'Air fryer', category: 'Cozinha', desc: '' },
  { name: 'Cafeteira elétrica', category: 'Cozinha', desc: '' },
  { name: 'Jogo de facas', category: 'Cozinha', desc: '' },
  { name: 'Conjunto de pratos', category: 'Cozinha', desc: 'Pratos rasos, fundos e de sobremesa.' },
  { name: 'Jogo de copos', category: 'Cozinha', desc: '' },
  { name: 'Escorredor de louça', category: 'Cozinha', desc: '' },
  { name: 'Jogo de lençóis casal', category: 'Quarto', desc: '' },
  { name: 'Edredom', category: 'Quarto', desc: '' },
  { name: 'Par de travesseiros', category: 'Quarto', desc: '' },
  { name: 'Cabideiros', category: 'Quarto', desc: 'Um jogo de cabides de madeira.' },
  { name: 'Tapete para sala', category: 'Sala', desc: '' },
  { name: 'Luminária de mesa', category: 'Sala', desc: '' },
  { name: 'Vaso decorativo', category: 'Sala', desc: '' },
  { name: 'Manta para sofá', category: 'Sala', desc: '' },
  { name: 'Jogo de toalhas de banho', category: 'Banheiro', desc: '' },
  { name: 'Tapete de banheiro', category: 'Banheiro', desc: '' },
  { name: 'Kit organizador de banheiro', category: 'Banheiro', desc: '' },
  { name: 'Aspirador de pó', category: 'Diversos', desc: '' },
  { name: 'Kit de ferramentas básico', category: 'Diversos', desc: '' },
  { name: 'Vale-compras', category: 'Diversos', desc: 'Pra gente escolher algo que ainda está faltando.' },
];
