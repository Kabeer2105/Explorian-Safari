'use client';

import { useTranslations, useLanguage } from '@/lib/language-context';
import { getTranslatedValue } from '@/lib/translations-db';
import type { SupportedLanguage } from '@/lib/translations-db';
import Link from 'next/link';

interface DayTrip {
  id: string;
  name: string;
  type: string;
  description: string;
  badge_label: string | null;
  images: string;
  highlights: string;
  price_from: number;
  currency: string;
  translations?: Record<SupportedLanguage, Record<string, string>>;
}

interface DayTripsPageContentProps {
  dayTrips: DayTrip[];
}

export default function DayTripsPageContent({ dayTrips }: DayTripsPageContentProps) {
  const t = useTranslations();
  const { locale } = useLanguage();

  return (
    <>
      {/* Hero Section */}
      <section className="page-hero page-hero-daytrip">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-subtitle">{t.dayTrips.heroSubtitle}</span>
          <h1 className="hero-title">{t.dayTrips.heroTitle}</h1>
          <p className="hero-description">
            {t.dayTrips.heroDescription}
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="section-label">{t.dayTrips.introLabel}</div>
            <h2 className="section-title">{t.dayTrips.introTitle}</h2>
            <p className="section-desc">
              {t.dayTrips.introDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Day Trips Grid */}
      <section className="section-padding bg-sand-light">
        <div className="container-custom">
          <div className="section-label">{t.dayTrips.tripsLabel}</div>
          <h2 className="section-title">{t.dayTrips.tripsTitle}</h2>
          <p className="section-subtitle">{t.dayTrips.tripsSubtitle}</p>

          {dayTrips.length === 0 ? (
            <div className="text-center py-12">
              <p className="section-desc">{t.dayTrips.noTripsMessage}</p>
              <Link href="/contact" className="btn-primary-large mt-6 inline-block">
                {t.dayTrips.contactForCustom}
              </Link>
            </div>
          ) : (
            <div className="packages-grid mt-12">
              {dayTrips.map((trip) => {
                const images = trip.images ? JSON.parse(trip.images) : [];

                // Get translated values
                const translatedName = getTranslatedValue(trip, 'name', locale);
                const translatedDescription = getTranslatedValue(trip, 'description', locale);
                const translatedHighlights = getTranslatedValue(trip, 'highlights', locale);
                const highlights = translatedHighlights ? JSON.parse(translatedHighlights) : [];

                return (
                  <div key={trip.id} className="package-card">
                    <div className="package-image-wrapper">
                      {trip.badge_label && (
                        <span className="package-badge">{trip.badge_label}</span>
                      )}
                      <img
                        src={images[0] || '/images/placeholder.jpg'}
                        alt={translatedName}
                        className="package-image"
                      />
                    </div>

                    <div className="package-content">
                      <div className="package-category-text">{trip.type}</div>
                      <h3 className="package-title">{translatedName}</h3>
                      <p className="package-description">
                        {translatedDescription.substring(0, 120)}...
                      </p>

                      {highlights.length > 0 && (
                        <ul className="package-features">
                          {highlights.slice(0, 3).map((highlight: string, index: number) => (
                            <li key={index}>{highlight}</li>
                          ))}
                        </ul>
                      )}

                      <div className="package-footer">
                        <div className="package-price">
                          <span className="from">{t.common.from}</span>
                          <span className="price">{trip.currency} {Number(trip.price_from).toLocaleString()}</span>
                          <span className="per-person">{t.common.perPerson}</span>
                        </div>
                        <Link href={`/book?package=${trip.id}`} className="btn-book">
                          {t.common.bookNow}
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Popular Day Trips */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="section-label">{t.dayTrips.popularLabel}</div>
          <h2 className="section-title">{t.dayTrips.popularTitle}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <div className="benefit-card">
              <div className="benefit-icon">🏔️</div>
              <h3 className="benefit-title">{t.dayTrips.materuniTitle}</h3>
              <p className="benefit-description">
                {t.dayTrips.materuniDesc}
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🌊</div>
              <h3 className="benefit-title">{t.dayTrips.hotSpringsTitle}</h3>
              <p className="benefit-description">
                {t.dayTrips.hotSpringsDesc}
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">👥</div>
              <h3 className="benefit-title">{t.dayTrips.culturalVillagesTitle}</h3>
              <p className="benefit-description">
                {t.dayTrips.culturalVillagesDesc}
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🦒</div>
              <h3 className="benefit-title">{t.dayTrips.arushaParkTitle}</h3>
              <p className="benefit-description">
                {t.dayTrips.arushaParkDesc}
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">☕</div>
              <h3 className="benefit-title">{t.dayTrips.coffeePlantationTitle}</h3>
              <p className="benefit-description">
                {t.dayTrips.coffeePlantationDesc}
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🏛️</div>
              <h3 className="benefit-title">{t.dayTrips.moshiTownTitle}</h3>
              <p className="benefit-description">
                {t.dayTrips.moshiTownDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Day Trips */}
      <section className="section-padding bg-gradient-subtle">
        <div className="container-custom">
          <div className="section-label">{t.dayTrips.whyAddLabel}</div>
          <h2 className="section-title">{t.dayTrips.whyAddTitle}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className="benefit-card">
              <div className="benefit-icon">🎒</div>
              <h3 className="benefit-title">{t.dayTrips.flexibleScheduleTitle}</h3>
              <p className="benefit-description">
                {t.dayTrips.flexibleScheduleDesc}
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">💰</div>
              <h3 className="benefit-title">{t.dayTrips.greatValueTitle}</h3>
              <p className="benefit-description">
                {t.dayTrips.greatValueDesc}
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🌍</div>
              <h3 className="benefit-title">{t.dayTrips.culturalImmersionTitle}</h3>
              <p className="benefit-description">
                {t.dayTrips.culturalImmersionDesc}
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">📸</div>
              <h3 className="benefit-title">{t.dayTrips.photoOpportunitiesTitle}</h3>
              <p className="benefit-description">
                {t.dayTrips.photoOpportunitiesDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section section-padding">
        <div className="container-custom text-center">
          <h2 className="cta-title">{t.dayTrips.ctaTitle}</h2>
          <p className="cta-subtitle">
            {t.dayTrips.ctaSubtitle}
          </p>
          <div className="cta-buttons">
            <Link href="/request-quote" className="btn-primary-large">
              {t.nav.requestQuote}
            </Link>
            <Link href="/contact" className="btn-secondary-large">
              {t.nav.contact}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
