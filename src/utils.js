import { CATEGORIES } from './config.js';

/**
 * Calcula o progresso em "vagas": um presente com maxClaims: 8 conta como
 * 8 vagas no total (e cada pessoa que reserva preenche 1 vaga), em vez de
 * contar o presente inteiro como "escolhido" só quando lota. Isso deixa o
 * progresso mais realista para os itens que aceitam várias pessoas.
 */
export function computeStats(gifts) {
  let total = 0;
  let claimed = 0;

  const byCat = {};
  CATEGORIES.forEach((c) => (byCat[c] = { total: 0, claimed: 0 }));

  gifts.forEach((g) => {
    const cap = g.maxClaims || 1;
    const filled = Math.min((g.claimedBy || []).length, cap);
    total += cap;
    claimed += filled;

    if (!byCat[g.category]) byCat[g.category] = { total: 0, claimed: 0 };
    byCat[g.category].total += cap;
    byCat[g.category].claimed += filled;
  });

  return { total, claimed, byCat };
}
