import { useState, useEffect, useCallback, useRef } from 'react';

const POLL_INTERVAL = 10000; // 10s — não temos push em tempo real, então damos uma espiada de tempos em tempos

async function fetchGifts() {
  const res = await fetch('/api/gifts');
  if (!res.ok) throw new Error('Falha ao carregar a lista.');
  const data = await res.json();
  return data.gifts;
}

async function postAction(body) {
  const res = await fetch('/api/gifts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || 'Falha ao salvar.');
  }
  const data = await res.json();
  return data.gifts;
}

/**
 * Hook responsável por toda a comunicação com /api/gifts (que por sua vez
 * lê/escreve o gifts.json no Vercel Blob). Como não há push em tempo real,
 * o hook faz polling a cada POLL_INTERVAL, além de atualizar na hora
 * sempre que o próprio usuário escolhe, desmarca ou sugere um presente.
 */
export function useGifts() {
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const pollRef = useRef(null);

  const load = useCallback(async (manual) => {
    if (manual) setRefreshing(true);
    try {
      const list = await fetchGifts();
      setGifts(list);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Não foi possível carregar a lista. Confira sua conexão e tente novamente.');
    } finally {
      setLoading(false);
      if (manual) setTimeout(() => setRefreshing(false), 500);
    }
  }, []);

  useEffect(() => {
    load(false);
    pollRef.current = setInterval(() => load(false), POLL_INTERVAL);
    return () => clearInterval(pollRef.current);
  }, [load]);

  const claim = useCallback(async (id, name) => {
    try {
      const list = await postAction({ action: 'claim', id, name });
      setGifts(list);
    } catch (err) {
      console.error(err);
      alert('Não conseguimos salvar sua escolha agora. Tente novamente em alguns segundos.');
    }
  }, []);

  const unclaim = useCallback(async (id) => {
    try {
      const list = await postAction({ action: 'unclaim', id });
      setGifts(list);
    } catch (err) {
      console.error(err);
      alert('Não conseguimos desfazer essa escolha agora. Tente novamente em alguns segundos.');
    }
  }, []);

  const addGift = useCallback(async (gift) => {
    try {
      const list = await postAction({ action: 'add', gift });
      setGifts(list);
    } catch (err) {
      console.error(err);
      alert('Não conseguimos adicionar esse presente agora. Tente novamente em alguns segundos.');
    }
  }, []);

  return { gifts, loading, refreshing, error, claim, unclaim, addGift, refresh: () => load(true) };
}
