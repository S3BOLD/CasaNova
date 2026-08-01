import { useState } from 'react';
import { CATEGORY_ICONS } from '../config.js';
import { Package } from 'lucide-react';

export default function GiftCard({ gift, onClaim, onUnclaim }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const Icon = CATEGORY_ICONS[gift.category] || Package;

  function confirmClaim() {
    onClaim(gift.id, name.trim());
    setEditing(false);
    setName('');
  }

  function askUnclaim() {
    if (window.confirm(`Tem certeza que quer desmarcar "${gift.name}"? Ele volta a ficar disponível para todos.`)) {
      onUnclaim(gift.id);
    }
  }

  return (
    <div className={`card ${gift.claimedBy ? 'claimed' : ''}`}>
      <div className="card-top">
        <div className="icon">
          <Icon size={20} strokeWidth={1.4} />
        </div>
        <span className="category-tag">{gift.category}</span>
      </div>

      <p className="item-name">{gift.name}</p>
      {gift.desc ? <p className="item-desc">{gift.desc}</p> : null}

      {gift.claimedBy ? (
        <>
          <div className="claimed-badge">
            <span className="dot" />
            <span>Escolhido por {gift.claimedBy}</span>
          </div>
          <button className="unclaim-btn" onClick={askUnclaim}>
            Não foi você? Desmarcar
          </button>
        </>
      ) : editing ? (
        <div className="name-form">
          <input
            autoFocus
            type="text"
            maxLength={40}
            placeholder="Seu nome (opcional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') confirmClaim();
            }}
          />
          <button type="button" onClick={confirmClaim}>
            OK
          </button>
          <button
            type="button"
            className="cancel"
            onClick={() => {
              setEditing(false);
              setName('');
            }}
          >
            Cancelar
          </button>
        </div>
      ) : (
        <button className="claim-btn" onClick={() => setEditing(true)}>
          Escolher este presente
        </button>
      )}
    </div>
  );
}
