'use client';

import { useTranslations } from '@/lib/language-context';
import { useLanguage } from '@/lib/language-context';
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

interface SafarisPageContentProps {
  packages: Package[];
}

export default function SafarisPageContent({ packages }: SafarisPageContentProps) {
  const t = useTranslations();
  const { locale } = useLanguage();

  return (
    <>
      {/* Hero Section */}
      <section className="page-hero page-hero-safari">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-subtitle">{t.safaris.heroSubtitle}</span>
          <h1 className="hero-title">{t.safaris.heroTitle}</h1>
          <p className="hero-description">
            {t.safaris.heroDescription}
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="section-label">{t.safaris.introLabel}</div>
            <h2 className="section-title">{t.safaris.introTitle}</h2>
            <p className="section-desc">
              {t.safaris.introDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Safari Packages Grid */}
      <section className="section-padding bg-sand-light">
        <div className="container-custom">
          <div className="section-label">{t.safaris.packagesLabel}</div>
          <h2 className="section-title">{t.safaris.packagesTitle}</h2>
          <p className="section-subtitle">{t.safaris.packagesSubtitle}</p>

          {packages.length === 0 ? (
            <div className="text-center py-12">
              <p className="section-desc">No safari packages available at the moment.</p>
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
                        <div className="package-price package-price-safari">
                          <span className="from">{t.common.from}</span>
                          <span className="price">{pkg.currency} {pkg.price_from.toLocaleString()}</span>
                          <span className="per-person">{t.common.perPerson}</span>
                        </div>
                        <Link href={`/book?package=${pkg.id}`} className="btn-book btn-book-safari">
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

      {/* Why Choose Our Safaris */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="section-label">{t.safaris.whyChooseLabel}</div>
          <h2 className="section-title">{t.safaris.whyChooseTitle}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            <div className="benefit-card">
              <div className="benefit-icon">🦁</div>
              <h3 className="benefit-title">{t.safaris.expertGuidesTitle}</h3>
              <p className="benefit-description">
                {t.safaris.expertGuidesDesc}
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🚙</div>
              <h3 className="benefit-title">{t.safaris.safariVehiclesTitle}</h3>
              <p className="benefit-description">
                {t.safaris.safariVehiclesDesc}
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🏕️</div>
              <h3 className="benefit-title">{t.safaris.premiumLodgingTitle}</h3>
              <p className="benefit-description">
                {t.safaris.premiumLodgingDesc}
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🌍</div>
              <h3 className="benefit-title">{t.safaris.ecoFriendlyToursTitle}</h3>
              <p className="benefit-description">
                {t.safaris.ecoFriendlyToursDesc}
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">📸</div>
              <h3 className="benefit-title">{t.safaris.photographyFocusTitle}</h3>
              <p className="benefit-description">
                {t.safaris.photographyFocusDesc}
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">⭐</div>
              <h3 className="benefit-title">{t.safaris.smallGroupsTitle}</h3>
              <p className="benefit-description">
                {t.safaris.smallGroupsDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section section-padding">
        <div className="container-custom text-center">
          <h2 className="cta-title">{t.safaris.ctaTitle}</h2>
          <p className="cta-subtitle">
            {t.safaris.ctaSubtitle}
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
