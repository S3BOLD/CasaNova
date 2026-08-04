// Lista usada apenas para "semear" o gifts.json na primeiríssima vez que
// o app roda (quando o arquivo ainda não existe no Blob storage).
// Depois disso, quem manda é o próprio gifts.json — editar aqui não muda
// mais nada em produção. Para adicionar presentes depois, use o próprio
// site (botão "+ Sugerir presente") ou edite o arquivo direto no painel
// do Vercel Blob.
//
// maxClaims: quantas pessoas podem reservar o MESMO presente ao mesmo
// tempo. Os 3 itens abaixo aceitam até 8 pessoas cada; qualquer presente
// sugerido manualmente pelos convidados (via "+ Sugerir presente") vale
// para uma única pessoa (maxClaims: 1), como já era antes.
export const DEFAULT_GIFTS = [
  { name: 'Toalha de banho', category: 'Banheiro', desc: '', maxClaims: 8 },
  { name: 'Toalha de rosto', category: 'Banheiro', desc: '', maxClaims: 8 },
  { name: 'Panos de prato', category: 'Cozinha', desc: '', maxClaims: 8 },
];
