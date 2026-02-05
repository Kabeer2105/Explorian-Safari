'use client';

import { useTranslations } from '@/lib/language-context';
import TripPlannerWidget from '@/components/TripPlannerWidget';

export default function TripPlannerSection() {
  const t = useTranslations();

  return (
    <section className="section-padding bg-sand-light">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto">
          <div className="section-label text-center">{t.home.planAdventureLabel}</div>
          <h2 className="section-title text-center mb-12">{t.home.planAdventureTitle}</h2>
          <TripPlannerWidget />
        </div>
      </div>
    </section>
  );
}
