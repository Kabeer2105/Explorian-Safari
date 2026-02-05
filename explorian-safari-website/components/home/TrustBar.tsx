'use client';

import { useTranslations } from '@/lib/language-context';

export default function TrustBar() {
  const t = useTranslations();

  return (
    <section className="trust-bar">
      <div className="trust-items">
        <div className="trust-item">
          <div className="trust-item-icon">⭐</div>
          <p>{t.trustBar.rating}</p>
        </div>
        <div className="trust-item">
          <div className="trust-item-icon">✓</div>
          <p>{t.trustBar.licensed}</p>
        </div>
        <div className="trust-item">
          <div className="trust-item-icon">📅</div>
          <p>{t.trustBar.experience}</p>
        </div>
        <div className="trust-item">
          <div className="trust-item-icon">😊</div>
          <p>{t.trustBar.satisfaction}</p>
        </div>
      </div>
    </section>
  );
}
