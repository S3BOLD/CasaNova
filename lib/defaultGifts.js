// Lista usada apenas para "semear" o gifts.json na primeiríssima vez que
// o app roda (quando o arquivo ainda não existe no Blob storage).
// Depois disso, quem manda é o próprio gifts.json — editar aqui não muda
// mais nada em produção. Para adicionar/remover presentes depois, use o
// próprio site (botão "+ Sugerir presente") ou edite o arquivo direto no
// painel do Vercel Blob.
export const DEFAULT_GIFTS = [
  
];
