import { CONFIG } from '../config.js';

export default function Hero() {
  return (
    <header className="hero">
      <div className="hero-deco left">
        <svg viewBox="0 0 80 220">
          <line x1="18" y1="0" x2="18" y2="60" strokeWidth="1" />
          <circle cx="18" cy="76" r="16" strokeWidth="1.3" />
          <rect x="13" y="58" width="10" height="8" rx="2" strokeWidth="1.3" />
          <line x1="52" y1="0" x2="52" y2="100" strokeWidth="1" />
          <circle cx="52" cy="114" r="13" strokeWidth="1.3" />
          <rect x="48" y="98" width="8" height="7" rx="2" strokeWidth="1.3" />
        </svg>
      </div>
      <div className="hero-deco right">
        <svg viewBox="0 0 80 220">
          <path d="M60 0 C 40 60, 70 90, 45 130" strokeWidth="1" fill="none" />
          <g transform="translate(45,130)">
            <circle cx="0" cy="12" r="10" strokeWidth="1.3" />
            <line x1="0" y1="2" x2="0" y2="-28" strokeWidth="1.3" />
            <line x1="0" y1="-14" x2="9" y2="-14" strokeWidth="1.3" />
            <line x1="0" y1="-8" x2="7" y2="-8" strokeWidth="1.3" />
          </g>
        </svg>
      </div>

      <svg className="sparkle" style={{ top: 22, left: '14%', width: 16, height: 16 }} viewBox="0 0 24 24">
        <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" fill="currentColor" />
      </svg>
      <svg className="sparkle" style={{ bottom: 40, right: '12%', width: 12, height: 12 }} viewBox="0 0 24 24">
        <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" fill="currentColor" />
      </svg>

      <div className="arch-frame">
        <div className="house-icon">
          <svg viewBox="0 0 90 60">
            <path d="M4 34 L45 4 L86 34" />
            <path d="M58 10 L58 20 L68 20 L68 16" />
          </svg>
        </div>
        <p className="eyebrow">Chá de casa nova</p>
        <h1 className="hosts-title">
          {CONFIG.hostNames[0]}
          {CONFIG.hostNames[1]}
        </h1>
        <div className="mini-divider">
          <span className="line" />
          <span className="label">presentes</span>
          <span className="line" />
        </div>
        <div className="date-num">{CONFIG.dateNum}</div>
        <div className="date-label">{CONFIG.dateLabel}</div>
        <div className="arch-bottom-line" />
      </div>

      <p className="hero-note">{CONFIG.note}</p>
      <p className="hero-address">📍 {CONFIG.address}</p>
    </header>
  );
}
