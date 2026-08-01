import { CATEGORIES, CATEGORY_ICONS } from '../config.js';
import { Package, RefreshCw } from 'lucide-react';

export default function Dashboard({ stats, activeFilter, onSelect, onSuggestClick, refreshing, onRefresh }) {
  const R = 27;
  const C = 2 * Math.PI * R;
  const pct = stats.total ? Math.round((stats.claimed / stats.total) * 100) : 0;
  const offset = C * (1 - pct / 100);

  const entries = [
    { key: 'Todos', total: stats.total, claimed: stats.claimed },
    ...CATEGORIES.map((c) => ({
      key: c,
      total: stats.byCat[c]?.total || 0,
      claimed: stats.byCat[c]?.claimed || 0,
    })),
  ];

  return (
    <aside className="dashboard">
      <div className="dash-card overview">
        <div className="ring-wrap">
          <svg viewBox="0 0 64 64">
            <circle cx="32" cy="32" r={R} fill="none" stroke="var(--bg-panel)" strokeWidth="6" />
            <circle
              cx="32"
              cy="32"
              r={R}
              fill="none"
              stroke="var(--bronze)"
              strokeWidth="6"
              strokeLinecap="round"
              style={{
                transform: 'rotate(-90deg)',
                transformOrigin: '32px 32px',
                strokeDasharray: C,
                strokeDashoffset: offset,
                transition: 'stroke-dashoffset .5s ease',
              }}
            />
          </svg>
          <div className="ring-pct">{pct}%</div>
        </div>
        <div className="overview-text">
          <strong>{stats.claimed}</strong> de {stats.total} escolhidos
        </div>
      </div>

      <div>
        <p className="dash-title">Categorias</p>
        <nav className="dash-nav">
          {entries.map((e) => {
            const Icon = CATEGORY_ICONS[e.key] || Package;
            const isActive = activeFilter === e.key;
            const itemPct = e.total ? Math.round((e.claimed / e.total) * 100) : 0;
            return (
              <button
                key={e.key}
                className={`dash-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => onSelect(e.key)}
              >
                <span className="fill" style={{ width: (isActive ? 100 : itemPct) + '%' }} />
                <span className="icon">
                  <Icon size={16} strokeWidth={1.5} />
                </span>
                <span className="label">{e.key}</span>
                <span className="frac">
                  {e.claimed}/{e.total}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      <button className="dash-suggest-btn" onClick={onSuggestClick}>
        + Sugerir presente
      </button>

      <div className="dash-status">
        <span>{refreshing ? 'atualizando…' : 'atualiza a cada 10s'}</span>
        <button
          className={`refresh-btn ${refreshing ? 'spinning' : ''}`}
          onClick={onRefresh}
          title="Atualizar agora"
        >
          <RefreshCw size={12} />
        </button>
      </div>
    </aside>
  );
}
