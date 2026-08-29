export default function Hero() {
  return (
    <div className="invite-frame">
      <svg className="sparkle sparkle-a" viewBox="0 0 24 24">
        <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" fill="currentColor" />
      </svg>
      <svg className="sparkle sparkle-b" viewBox="0 0 24 24">
        <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" fill="currentColor" />
      </svg>

      <div className="invite-roof">
        <svg viewBox="0 0 90 40">
          <path d="M2 38 L48 4 L88 36" />
          <path d="M59 13 L59 6 L66 6 L66 18" />
        </svg>
      </div>

      <div className="invite-frame-body">
        <p className="invite-eyebrow">Chá de</p>
        <h1 className="invite-title">
          Casa
          <br />
          Nova
        </h1>
      </div>
      <div className="arch-bottom-line" />
    </div>
  );
}