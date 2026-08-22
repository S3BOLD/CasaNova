import { useState } from 'react';
import { CATEGORIES, CATEGORY_ICONS } from '../config.js';
import { Package, X, Pencil, Trash2 } from 'lucide-react';

export default function GiftCard({ gift, onClaim, onUnclaim, onEdit, onDelete }) {
  const [editingClaim, setEditingClaim] = useState(false);
  const [name, setName] = useState('');

  const [editingGift, setEditingGift] = useState(false);
  const [formName, setFormName] = useState(gift.name);
  const [formCategory, setFormCategory] = useState(gift.category);
  const [formDesc, setFormDesc] = useState(gift.desc || '');
  const [formMaxClaims, setFormMaxClaims] = useState(gift.maxClaims || 1);

  const Icon = CATEGORY_ICONS[gift.category] || Package;
  const cap = gift.maxClaims || 1;
  const claimants = gift.claimedBy || [];
  const isMulti = cap > 1;
  const isFull = claimants.length >= cap;

  function confirmClaim() {
    onClaim(gift.id, name.trim());
    setEditingClaim(false);
    setName('');
  }

  function askUnclaim(index, claimantName) {
    const label = claimantName ? `a reserva de "${claimantName}"` : 'essa reserva';
    if (window.confirm(`Tem certeza que quer remover ${label} em "${gift.name}"?`)) {
      onUnclaim(gift.id, index);
    }
  }

  function openEditForm() {
    setFormName(gift.name);
    setFormCategory(gift.category);
    setFormDesc(gift.desc || '');
    setFormMaxClaims(gift.maxClaims || 1);
    setEditingGift(true);
  }

  function confirmEdit() {
    if (!formName.trim()) return;
    onEdit(gift.id, {
      name: formName.trim(),
      category: formCategory,
      desc: formDesc.trim(),
      maxClaims: formMaxClaims,
    });
    setEditingGift(false);
  }

  function askDelete() {
    const claimedWarning =
      claimants.length > 0
        ? ` Isso também remove ${claimants.length === 1 ? 'a reserva já feita' : `as ${claimants.length} reservas já feitas`} nele.`
        : '';
    if (window.confirm(`Tem certeza que quer excluir "${gift.name}"?${claimedWarning} Essa ação não pode ser desfeita.`)) {
      onDelete(gift.id);
    }
  }

  if (editingGift) {
    return (
      <div className="card">
        <div className="edit-form">
          <input
            type="text"
            maxLength={60}
            placeholder="Nome do presente"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            autoFocus
          />
          <select value={formCategory} onChange={(e) => setFormCategory(e.target.value)}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <textarea
            placeholder="Descrição (opcional)"
            maxLength={140}
            value={formDesc}
            onChange={(e) => setFormDesc(e.target.value)}
          />
          <label className="edit-form-slots">
            Vagas (quantas pessoas podem reservar)
            <input
              type="number"
              min={1}
              max={99}
              value={formMaxClaims}
              onChange={(e) => setFormMaxClaims(e.target.value)}
            />
          </label>
          <div className="row">
            <button type="button" onClick={confirmEdit}>
              Salvar
            </button>
            <button type="button" className="cancel" onClick={() => setEditingGift(false)}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`card ${isFull ? 'claimed' : ''}`}>
      <div className="card-top">
        <div className="icon">
          <Icon size={20} strokeWidth={1.4} />
        </div>
        <div className="card-top-right">
          <span className="category-tag">{gift.category}</span>
          <div className="card-actions">
            <button type="button" className="icon-btn" title="Editar presente" onClick={openEditForm}>
              <Pencil size={14} />
            </button>
            <button type="button" className="icon-btn danger" title="Excluir presente" onClick={askDelete}>
              <Trash2 size={14} />
            </button>
          </div>
        </div>
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
        (editingClaim ? (
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
                setEditingClaim(false);
                setName('');
              }}
            >
              Cancelar
            </button>
          </div>
        ) : (
          <button className="claim-btn" onClick={() => setEditingClaim(true)}>
            {isMulti ? 'Reservar uma vaga' : 'Escolher este presente'}
          </button>
        ))}

      {isFull && isMulti && <div className="full-note">Todas as vagas foram preenchidas 🎉</div>}
    </div>
  );
}
