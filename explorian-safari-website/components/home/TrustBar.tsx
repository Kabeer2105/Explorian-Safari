'use client';

export default function TrustBar() {
  return (
    <section className="trust-bar">
      <div className="trust-items">
        <div className="trust-item">
          <div className="trust-item-icon">⭐</div>
          <h4>4.8/5 Rating</h4>
          <p>on Safari Bookings</p>
        </div>
        <div className="trust-item">
          <div className="trust-item-icon">✓</div>
          <h4>Licensed Tour Operator</h4>
          <p>Fully Certified</p>
        </div>
        <div className="trust-item">
          <div className="trust-item-icon">📅</div>
          <h4>10+ Years of Experience</h4>
          <p>Expert Guides</p>
        </div>
        <div className="trust-item">
          <div className="trust-item-icon">😊</div>
          <h4>100% Satisfaction Guarantee</h4>
          <p>Happy Customers</p>
        </div>
      </div>
    </section>
  );
}
