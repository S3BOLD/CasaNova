import { get, put } from '@vercel/blob';
import { DEFAULT_GIFTS } from './defaultGifts.js';

// Nome fixo do arquivo dentro do Blob storage — sempre o mesmo pathname,
// assim conseguimos sempre encontrar e sobrescrever o mesmo arquivo.
const PATHNAME = 'gifts.json';

function uid() {
  return 'g' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

async function readRaw() {
  // access: 'private' -> o arquivo não é acessível publicamente por URL,
  // só através das nossas funções de servidor (que têm o token de acesso).
  // useCache: false -> sempre busca a versão mais recente, sem cache de CDN.
  const result = await get(PATHNAME, { access: 'private', useCache: false });
  if (!result) return null;
  const text = await new Response(result.stream).text();
  return JSON.parse(text);
}

async function writeRaw(gifts) {
  await put(PATHNAME, JSON.stringify(gifts, null, 2), {
    access: 'private',
    contentType: 'application/json',
    addRandomSuffix: false, // mantém sempre o mesmo nome de arquivo
    allowOverwrite: true, // permite regravar o mesmo arquivo
  });
}

/**
 * Lê o gifts.json. Se ainda não existir (primeira vez que o app roda),
 * cria o arquivo com a lista padrão definida em defaultGifts.js.
 *
 * Cada presente tem:
 *  - maxClaims: quantas pessoas podem reservar esse presente (padrão: 1)
 *  - claimedBy: lista com o nome de quem já reservou (0 até maxClaims itens)
 */
export async function readGifts() {
  let gifts = await readRaw();
  if (!gifts) {
    gifts = DEFAULT_GIFTS.map((g) => ({
      id: uid(),
      name: g.name,
      category: g.category,
      desc: g.desc || '',
      maxClaims: g.maxClaims || 1,
      claimedBy: [],
    }));
    await writeRaw(gifts);
  }
  return gifts;
}

/** Erro específico para quando alguém tenta reservar um presente já lotado. */
class GiftFullError extends Error {
  constructor(message) {
    super(message);
    this.code = 'FULL';
  }
}

export async function claimGift(id, name) {
  const gifts = await readGifts();
  let isFull = false;

  const next = gifts.map((g) => {
    if (g.id !== id) return g;
    const cap = g.maxClaims || 1;
    if ((g.claimedBy || []).length >= cap) {
      isFull = true;
      return g;
    }
    return { ...g, claimedBy: [...(g.claimedBy || []), name || 'Convidado(a)'] };
  });

  if (isFull) {
    throw new GiftFullError('Esse presente acabou de ficar sem vagas. Escolha outro ou atualize a página.');
  }

  await writeRaw(next);
  return next;
}

export async function unclaimGift(id, index) {
  const gifts = await readGifts();
  const next = gifts.map((g) => {
    if (g.id !== id) return g;
    const arr = [...(g.claimedBy || [])];
    if (typeof index === 'number' && index >= 0 && index < arr.length) {
      arr.splice(index, 1);
    } else {
      arr.pop();
    }
    return { ...g, claimedBy: arr };
  });
  await writeRaw(next);
  return next;
}

export async function addGift(gift) {
  const gifts = await readGifts();
  const next = [
    ...gifts,
    {
      id: uid(),
      name: String(gift.name || '').slice(0, 60),
      category: String(gift.category || 'Diversos'),
      desc: String(gift.desc || '').slice(0, 140),
      maxClaims: 1,
      claimedBy: [],
    },
  ];
  await writeRaw(next);
  return next;
}
