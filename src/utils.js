import { CATEGORIES } from './config.js';

export function computeStats(gifts) {
  const total = gifts.length;
  const claimed = gifts.filter((g) => !!g.claimedBy).length;

  const byCat = {};
  CATEGORIES.forEach((c) => (byCat[c] = { total: 0, claimed: 0 }));
  gifts.forEach((g) => {
    if (!byCat[g.category]) byCat[g.category] = { total: 0, claimed: 0 };
    byCat[g.category].total++;
    if (g.claimedBy) byCat[g.category].claimed++;
  });

  return { total, claimed, byCat };
}
