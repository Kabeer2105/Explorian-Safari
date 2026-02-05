'use client';

import { useTranslations } from '@/lib/language-context';

export default function ReviewsSectionHeader() {
  const t = useTranslations();

  return (
    <>
      <div className="section-label">{t.home.testimonialsLabel}</div>
      <h2 className="section-title">{t.home.reviewsTitle}</h2>
      <p className="section-subtitle">{t.home.reviewsSubtitle}</p>
    </>
  );
}
