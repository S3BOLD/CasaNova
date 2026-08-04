import Hero from '../components/Hero.jsx';
import { CONFIG } from '../config.js';

export default function HomePage({ onGoToGifts }) {
  const hostDisplay = CONFIG.hostNames.filter(Boolean).join(' & ');

  return (
    <main className="page home-page">
      <Hero />

      <section className="info-section">
        {hostDisplay && <h2 className="info-hosts">{hostDisplay}</h2>}
        <div className="info-lines">
          <p className="info-line">
            📅 {CONFIG.dateNum} {CONFIG.dateLabel}
          </p>
          {CONFIG.address && <p className="info-line">📍 {CONFIG.address}</p>}
        </div>
        {CONFIG.note && <p className="info-note">{CONFIG.note}</p>}

        <button className="cta-btn" onClick={onGoToGifts}>
          Ver lista de presentes
        </button>
      </section>
    </main>
  );
}
