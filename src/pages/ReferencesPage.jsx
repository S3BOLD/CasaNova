import { REFERENCE_IMAGES } from '../referenceImages.js';

export default function ReferencesPage() {
  return (
    <main className="page references-page">
      <div className="page-header">
        <img src="src\referencias\Amandoca.jpeg" alt="Referências" className="page-header-img" />
        <h2 className="page-title">Aqui estão algumas referências  dos itens listados, com isso você pode ter mais referências do que escolher :)</h2>
        
      </div>

      {REFERENCE_IMAGES.length === 0 ? (
        <p className="empty-msg">Em breve, fotos de referência vão aparecer por aqui.</p>
      ) : (
        <div className="reference-grid">
          {[...REFERENCE_IMAGES]
            .sort((a, b) =>
              (a.caption || '').localeCompare(b.caption || '', 'pt-BR')
            )
            .map((img, i) => (
              <figure key={i} className="reference-item">
                <a
                  href={img.link || img.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={img.caption || 'Ver referência'}
                >
                  <img src={img.src} alt={img.caption || ''} loading="lazy" />
                </a>

                {img.caption && <figcaption>{img.caption}</figcaption>}
              </figure>
            ))}
        </div>
      )}
    </main>
  );
}