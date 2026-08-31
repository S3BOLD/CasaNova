import { Calendar, Clock, MapPin, Gift } from 'lucide-react';
import Hero from '../components/Hero.jsx';
import { CONFIG } from '../config.js';

function DetailCard({ icon, label, ticket, children }) {
  return (
    <div className={`detail-card ${ticket ? 'ticket' : ''}`}>
      <div className="detail-icon">{icon}</div>
      <span className="detail-label">{label}</span>
      {children}
    </div>
  );
}

export default function HomePage({ onGoToGifts }) {
  const addressLines = (CONFIG.address || '').split('\n');
  const paragraphs = CONFIG.welcomeMessage || [];

  return (
    <main className="page home-page">
      <Hero />

      {paragraphs.length > 0 && (
        <div className="invite-message">
          {paragraphs.map((paragraph, i) => {
            const isLast = i === paragraphs.length - 1;
            const lines = paragraph.split('\n');

            // Se o último parágrafo tiver uma quebra de linha, a última
            // linha vira uma frase de destaque (sem duplicar nenhum texto).
            if (isLast && lines.length > 1) {
              const mainLines = lines.slice(0, -1);
              const highlight = lines[lines.length - 1];
              return (
                <div key={i}>
                  <p>
                    {mainLines.map((line, j) => (
                      <span key={j}>
                        {line}
                        {j < mainLines.length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                  <p className="invite-highlight">{highlight}</p>
                </div>
              );
            }

            return (
              <p key={i}>
                {lines.map((line, j, arr) => (
                  <span key={j}>
                    {line}
                    {j < arr.length - 1 && <br />}
                  </span>
                ))}
              </p>
            );
          })}
        </div>
      )}

      <div className="invite-details">
        <DetailCard icon={<Calendar size={16} strokeWidth={1.6} />} label="Data" ticket>
          <div className="detail-big">{CONFIG.dateNum}</div>
          <div className="detail-sub">{CONFIG.dateLabel}</div>
        </DetailCard>

        <DetailCard icon={<Clock size={16} strokeWidth={1.6} />} label="Horário">
          <div className="detail-big small">{CONFIG.time}</div>
        </DetailCard>

        <DetailCard icon={<MapPin size={16} strokeWidth={1.6} />} label="Local">
          <div className="detail-sub address">
            {addressLines.map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </div>
        </DetailCard>
      </div>

      {(CONFIG.giftBannerTitle || CONFIG.giftBannerText) && (
        <div className="gift-banner">
          <Gift size={22} className="gift-banner-icon" />
          <div className="gift-banner-text">
            {CONFIG.giftBannerTitle && <strong>{CONFIG.giftBannerTitle}</strong>}
          </div>
          <button onClick={onGoToGifts}>Ver lista de presentes</button>
        </div>
      )}

      <footer className="app-footer">Com carinho, Amanda Letícia.</footer>
    </main>
    
  );
}
