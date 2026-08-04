export default function TopNav({ tabs, active, onChange }) {
  return (
    <nav className="top-nav">
      <div className="top-nav-inner">
        {tabs.map((t) => (
          <button
            key={t.key}
            className={`top-nav-item ${active === t.key ? 'active' : ''}`}
            onClick={() => onChange(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
