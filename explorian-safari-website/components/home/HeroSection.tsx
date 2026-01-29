'use client';

import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <span className="hero-subtitle">TANZANIA AWAITS</span>
        <h1 className="hero-title">Explore the Wild Heart of Africa</h1>
        <p className="hero-description">
          Experience unforgettable safaris, conquer Mount Kilimanjaro, and relax on pristine beaches.
          Your African adventure starts here.
        </p>
        <div className="hero-buttons">
          <Link href="/request-quote" className="btn-primary-large">
            Request Travel Offer
          </Link>
          <Link href="/safaris" className="btn-secondary-large">
            Explore Safaris
          </Link>
        </div>
      </div>
    </section>
  );
}
