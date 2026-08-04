import { useState, useMemo, useRef } from 'react';
import Dashboard from '../components/Dashboard.jsx';
import GiftCard from '../components/GiftCard.jsx';
import SuggestCard from '../components/SuggestCard.jsx';
import { useGifts } from '../hooks/useGifts.js';
import { computeStats } from '../utils.js';

export default function GiftsPage() {
  const { gifts, loading, refreshing, error, claim, unclaim, addGift, refresh } = useGifts();
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [suggestOpen, setSuggestOpen] = useState(false);
  const suggestRef = useRef(null);

  function handleSuggestClick() {
    setSuggestOpen(true);
    setTimeout(() => suggestRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 60);
  }

  const stats = useMemo(() => computeStats(gifts), [gifts]);
  const filteredGifts = activeFilter === 'Todos' ? gifts : gifts.filter((g) => g.category === activeFilter);

  if (error) {
    return (
      <div className="state-msg">
        <p>⚠️ {error}</p>
        <p className="state-sub">Confira se o BLOB_READ_WRITE_TOKEN está configurado (veja o README.md).</p>
      </div>
    );
  }

  if (loading) {
    return <div className="state-msg">Carregando presentes…</div>;
  }

  return (
    <div className="layout">
      <Dashboard
        stats={stats}
        activeFilter={activeFilter}
        onSelect={setActiveFilter}
        onSuggestClick={handleSuggestClick}
        refreshing={refreshing}
        onRefresh={refresh}
      />

      <main className="content">
        <div className="grid">
          {filteredGifts.length === 0 && <div className="empty-msg">Nenhum presente nesta categoria ainda.</div>}
          {filteredGifts.map((g) => (
            <GiftCard key={g.id} gift={g} onClaim={claim} onUnclaim={unclaim} />
          ))}
          <SuggestCard
            open={suggestOpen}
            onOpen={() => setSuggestOpen(true)}
            onClose={() => setSuggestOpen(false)}
            onAdd={addGift}
            cardRef={suggestRef}
          />
        </div>
      </main>
    </div>
  );
}
