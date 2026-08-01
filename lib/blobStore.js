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
 */
export async function readGifts() {
  let gifts = await readRaw();
  if (!gifts) {
    gifts = DEFAULT_GIFTS.map((g) => ({ id: uid(), claimedBy: null, ...g }));
    await writeRaw(gifts);
  }
  return gifts;
}

export async function claimGift(id, name) {
  const gifts = await readGifts();
  const next = gifts.map((g) => (g.id === id ? { ...g, claimedBy: name || 'Convidado(a)' } : g));
  await writeRaw(next);
  return next;
}

export async function unclaimGift(id) {
  const gifts = await readGifts();
  const next = gifts.map((g) => (g.id === id ? { ...g, claimedBy: null } : g));
  await writeRaw(next);
  return next;
}

export async function addGift(gift) {
  const gifts = await readGifts();
  const next = [
    ...gifts,
    {
      id: uid(),
      claimedBy: null,
      name: String(gift.name || '').slice(0, 60),
      category: String(gift.category || 'Diversos'),
      desc: String(gift.desc || '').slice(0, 140),
    },
  ];
  await writeRaw(next);
  return next;
}
