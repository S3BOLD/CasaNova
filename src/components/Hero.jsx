import { CONFIG } from '../config.js';

export default function Hero() {
  return (
    <header className="hero">
      <div className="arch-frame">
        <div className="house-icon">
          <svg viewBox="0 0 90 60">
            <path d="M4 34 L45 4 L86 34" />
            <path d="M58 10 L58 20 L68 20 L68 16" />
          </svg>
        </div>

        <h1 className="hero-title">
          <span className="hero-title-big">Chá</span>
          <span className="hero-title-mid">
            <i className="dash" />
            de casa
            <i className="dash" />
          </span>
          <span className="hero-title-big">nova</span>
        </h1>

        <span className="tiny-dot" />

        <div className="date-num">{CONFIG.dateNum}</div>
        <div className="date-label">{CONFIG.dateLabel}</div>
        <div className="arch-bottom-line" />
      </div>
    </header>
  );
}
