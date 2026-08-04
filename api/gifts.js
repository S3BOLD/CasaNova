import { readGifts, claimGift, unclaimGift, addGift } from '../lib/blobStore.js';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const gifts = await readGifts();
      return res.status(200).json({ gifts });
    }

    if (req.method === 'POST') {
      const { action, id, name, index, gift } = req.body || {};

      if (action === 'claim') {
        if (!id) return res.status(400).json({ error: 'Faltou o id do presente.' });
        try {
          const gifts = await claimGift(id, name);
          return res.status(200).json({ gifts });
        } catch (err) {
          if (err.code === 'FULL') return res.status(409).json({ error: err.message });
          throw err;
        }
      }

      if (action === 'unclaim') {
        if (!id) return res.status(400).json({ error: 'Faltou o id do presente.' });
        const gifts = await unclaimGift(id, index);
        return res.status(200).json({ gifts });
      }

      if (action === 'add') {
        if (!gift || !gift.name) return res.status(400).json({ error: 'Faltou o nome do presente.' });
        const gifts = await addGift(gift);
        return res.status(200).json({ gifts });
      }

      return res.status(400).json({ error: 'Ação desconhecida.' });
    }

    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ error: 'Método não permitido.' });
  } catch (err) {
    console.error('Erro em /api/gifts:', err);
    return res.status(500).json({ error: 'Erro no servidor. Confira o BLOB_READ_WRITE_TOKEN.' });
  }
}
