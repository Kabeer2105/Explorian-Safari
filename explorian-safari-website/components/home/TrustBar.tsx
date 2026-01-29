'use client';

export default function TrustBar() {
  return (
    <section className="trust-bar">
      <div className="trust-item">
        <div className="trust-icon">⭐</div>
        <div className="trust-text">
          <div className="trust-number">4.8/5</div>
          <div className="trust-label">Rating</div>
        </div>
      </div>
      <div className="trust-item">
        <div className="trust-icon">✓</div>
        <div className="trust-text">
          <div className="trust-number">Licensed</div>
          <div className="trust-label">Tour Operator</div>
        </div>
      </div>
      <div className="trust-item">
        <div className="trust-icon">📅</div>
        <div className="trust-text">
          <div className="trust-number">10+ Years</div>
          <div className="trust-label">Experience</div>
        </div>
      </div>
      <div className="trust-item">
        <div className="trust-icon">😊</div>
        <div className="trust-text">
          <div className="trust-number">98%</div>
          <div className="trust-label">Satisfaction</div>
        </div>
      </div>
    </section>
  );
}
