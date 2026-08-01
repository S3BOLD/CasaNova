import { useState } from 'react';
import { CATEGORIES } from '../config.js';

export default function SuggestCard({ open, onOpen, onClose, onAdd, cardRef }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [desc, setDesc] = useState('');

  function save() {
    if (!name.trim()) return;
    onAdd({ name: name.trim(), category, desc: desc.trim() });
    setName('');
    setDesc('');
    setCategory(CATEGORIES[0]);
    onClose();
  }

  if (!open) {
    return (
      <div
        ref={cardRef}
        className="card suggest-card"
        onClick={onOpen}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onOpen();
        }}
      >
        <div>
          <div className="plus">+</div>
          <div>Sugerir outro presente</div>
        </div>
      </div>
    );
  }

  return (
    <div ref={cardRef} className="card">
      <div className="suggest-form">
        <input
          autoFocus
          type="text"
          placeholder="Nome do presente"
          maxLength={60}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <textarea
          placeholder="Descrição (opcional)"
          maxLength={140}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <div className="row">
          <button type="button" onClick={save}>
            Adicionar à lista
          </button>
          <button type="button" className="cancel" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
