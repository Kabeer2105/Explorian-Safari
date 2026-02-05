'use client';

import { useTranslations, useLanguage } from '@/lib/language-context';
import { getTranslatedValue } from '@/lib/translations-db';
import type { SupportedLanguage } from '@/lib/translations-db';
import Link from 'next/link';

interface Package {
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

interface BeachesPageContentProps {
  packages: Package[];
}

export default function BeachesPageContent({ packages }: BeachesPageContentProps) {
  const t = useTranslations();
  const { locale } = useLanguage();

  return (
    <>
      {/* Hero Section */}
      <section className="page-hero page-hero-beach">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-subtitle">{t.beaches.heroSubtitle}</span>
          <h1 className="hero-title">{t.beaches.heroTitle}</h1>
          <p className="hero-description">
            {t.beaches.heroDescription}
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="section-label">{t.beaches.introLabel}</div>
            <h2 className="section-title">{t.beaches.introTitle}</h2>
            <p className="section-desc">
              {t.beaches.introDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Beach Packages Grid */}
      <section className="section-padding bg-sand-light">
        <div className="container-custom">
          <div className="section-label">{t.beaches.packagesLabel}</div>
          <h2 className="section-title">{t.beaches.packagesTitle}</h2>
          <p className="section-subtitle">{t.beaches.packagesSubtitle}</p>

          {packages.length === 0 ? (
            <div className="text-center py-12">
              <p className="section-desc">No beach holiday packages available at the moment.</p>
            </div>
          ) : (
            <div className="packages-grid mt-12">
              {packages.map((pkg) => {
                const images = pkg.images ? JSON.parse(pkg.images) : [];

                // Get translated values
                const translatedName = getTranslatedValue(pkg, 'name', locale);
                const translatedDescription = getTranslatedValue(pkg, 'description', locale);
                const translatedHighlights = getTranslatedValue(pkg, 'highlights', locale);
                const highlights = translatedHighlights ? JSON.parse(translatedHighlights) : [];

                return (
                  <div key={pkg.id} className="package-card">
                    <div className="package-image-wrapper">
                      {pkg.badge_label && (
                        <span className="package-badge">{pkg.badge_label}</span>
                      )}
                      <img
                        src={images[0] || '/images/placeholder.jpg'}
                        alt={translatedName}
                        className="package-image"
                      />
                    </div>

                    <div className="package-content">
                      <div className="package-category-text">{pkg.type}</div>
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
                        <div className="package-price package-price-beach">
                          <span className="from">{t.common.from}</span>
                          <span className="price">{pkg.currency} {pkg.price_from.toLocaleString()}</span>
                          <span className="per-person">{t.common.perPerson}</span>
                        </div>
                        <Link href={`/book?package=${pkg.id}`} className="btn-book btn-book-beach">
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

      {/* Beach Activities */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="section-label">{t.beaches.experiencesLabel}</div>
          <h2 className="section-title">{t.beaches.experiencesTitle}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <div className="benefit-card">
              <div className="benefit-icon">🤿</div>
              <h3 className="benefit-title">{t.beaches.snorkelingTitle}</h3>
              <p className="benefit-description">
                {t.beaches.snorkelingDesc}
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🏛️</div>
              <h3 className="benefit-title">{t.beaches.stoneTownTitle}</h3>
              <p className="benefit-description">
                {t.beaches.stoneTownDesc}
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🌴</div>
              <h3 className="benefit-title">{t.beaches.spicePlantationsTitle}</h3>
              <p className="benefit-description">
                {t.beaches.spicePlantationsDesc}
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🐬</div>
              <h3 className="benefit-title">{t.beaches.dolphinToursTitle}</h3>
              <p className="benefit-description">
                {t.beaches.dolphinToursDesc}
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">⛵</div>
              <h3 className="benefit-title">{t.beaches.dhowCruisesTitle}</h3>
              <p className="benefit-description">
                {t.beaches.dhowCruisesDesc}
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🍽️</div>
              <h3 className="benefit-title">{t.beaches.swahiliCuisineTitle}</h3>
              <p className="benefit-description">
                {t.beaches.swahiliCuisineDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Beach Accommodations */}
      <section className="section-padding bg-gradient-subtle">
        <div className="container-custom">
          <div className="section-label">{t.beaches.accommodationsLabel}</div>
          <h2 className="section-title">{t.beaches.accommodationsTitle}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className="benefit-card">
              <div className="benefit-icon">🏖️</div>
              <h3 className="benefit-title">{t.beaches.beachfrontResortsTitle}</h3>
              <p className="benefit-description">
                {t.beaches.beachfrontResortsDesc}
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🛏️</div>
              <h3 className="benefit-title">{t.beaches.boutiqueHotelsTitle}</h3>
              <p className="benefit-description">
                {t.beaches.boutiqueHotelsDesc}
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🏝️</div>
              <h3 className="benefit-title">{t.beaches.privateVillasTitle}</h3>
              <p className="benefit-description">
                {t.beaches.privateVillasDesc}
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🌊</div>
              <h3 className="benefit-title">{t.beaches.allInclusiveTitle}</h3>
              <p className="benefit-description">
                {t.beaches.allInclusiveDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section section-padding">
        <div className="container-custom text-center">
          <h2 className="cta-title">{t.beaches.ctaTitle}</h2>
          <p className="cta-subtitle">
            {t.beaches.ctaSubtitle}
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
