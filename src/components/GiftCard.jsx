import { useState } from 'react';
import { CATEGORY_ICONS } from '../config.js';
import { Package, X } from 'lucide-react';

export default function GiftCard({ gift, onClaim, onUnclaim }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const Icon = CATEGORY_ICONS[gift.category] || Package;

  const cap = gift.maxClaims || 1;
  const claimants = gift.claimedBy || [];
  const isMulti = cap > 1;
  const isFull = claimants.length >= cap;

  function confirmClaim() {
    onClaim(gift.id, name.trim());
    setEditing(false);
    setName('');
  }

  function askUnclaim(index, claimantName) {
    const label = claimantName ? `a reserva de "${claimantName}"` : 'essa reserva';
    if (window.confirm(`Tem certeza que quer remover ${label} em "${gift.name}"?`)) {
      onUnclaim(gift.id, index);
    }
  }

  return (
    <div className={`card ${isFull ? 'claimed' : ''}`}>
      <div className="card-top">
        <div className="icon">
          <Icon size={20} strokeWidth={1.4} />
        </div>
        <span className="category-tag">{gift.category}</span>
      </div>

      <p className="item-name">{gift.name}</p>
      {gift.desc ? <p className="item-desc">{gift.desc}</p> : null}

      {isMulti ? (
        <div className="slots">
          <div className="slots-count">
            {claimants.length} de {cap} reservado{cap === 1 ? '' : 's'}
          </div>
          {claimants.length > 0 && (
            <ul className="claimants-list">
              {claimants.map((n, i) => (
                <li key={i}>
                  <span>{n}</span>
                  <button type="button" onClick={() => askUnclaim(i, n)} title="Remover essa reserva">
                    <X size={13} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : claimants.length > 0 ? (
        <>
          <div className="claimed-badge">
            <span className="dot" />
            <span>Escolhido por {claimants[0]}</span>
          </div>
          <button className="unclaim-btn" onClick={() => askUnclaim(0, claimants[0])}>
            Não foi você? Desmarcar
          </button>
        </>
      ) : null}

      {!isFull &&
        (editing ? (
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
            {isMulti ? 'Reservar uma vaga' : 'Escolher este presente'}
          </button>
        ))}

      {isFull && isMulti && <div className="full-note">Todas as vagas foram preenchidas 🎉</div>}
    </div>
  );
}
