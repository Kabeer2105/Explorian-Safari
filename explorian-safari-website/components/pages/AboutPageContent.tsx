'use client';

import { useTranslations } from '@/lib/language-context';
import Link from 'next/link';

export default function AboutPageContent() {
  const t = useTranslations();

  return (
    <>
      {/* Hero Section */}
      <section className="page-hero page-hero-about">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-subtitle">{t.about.heroSubtitle}</span>
          <h1 className="hero-title">{t.about.heroTitle}</h1>
          <p className="hero-description">
            {t.about.heroDescription}
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="section-label">{t.about.whoWeAreLabel}</div>
            <h2 className="section-title">{t.about.whoWeAreTitle}</h2>
            <p className="section-desc">
              {t.about.whoWeAreDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
            <div>
              <h3 className="section-title text-left mb-6">{t.about.missionTitle}</h3>
              <p className="section-desc text-left mb-4">
                {t.about.missionDescription1}
              </p>
              <p className="section-desc text-left">
                {t.about.missionDescription2}
              </p>
            </div>

            <div className="bg-gradient-subtle rounded-lg p-8">
              <h3 className="section-title text-left mb-6">{t.about.quickFactsTitle}</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-primary-safari text-2xl mr-3">📍</span>
                  <div>
                    <strong className="text-primary-safari">{t.about.locationLabel}</strong>
                    <p className="text-text-light">{t.about.locationValue}</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-safari text-2xl mr-3">📅</span>
                  <div>
                    <strong className="text-primary-safari">{t.about.establishedLabel}</strong>
                    <p className="text-text-light">{t.about.establishedValue}</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-safari text-2xl mr-3">⭐</span>
                  <div>
                    <strong className="text-primary-safari">{t.about.ratingLabel}</strong>
                    <p className="text-text-light">{t.about.ratingValue}</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-safari text-2xl mr-3">✓</span>
                  <div>
                    <strong className="text-primary-safari">{t.about.licensingLabel}</strong>
                    <p className="text-text-light">{t.about.licensingValue}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-sand-light">
        <div className="container-custom">
          <div className="section-label">{t.about.whyChooseLabel}</div>
          <h2 className="section-title">{t.about.whyChooseTitle}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <div className="benefit-card">
              <div className="benefit-icon">✓</div>
              <h3 className="benefit-title">{t.about.licensedTitle}</h3>
              <p className="benefit-description">
                {t.about.licensedDesc}
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🎓</div>
              <h3 className="benefit-title">{t.about.expertGuidesTitle}</h3>
              <p className="benefit-description">
                {t.about.expertGuidesDesc}
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🎯</div>
              <h3 className="benefit-title">{t.about.personalizedServiceTitle}</h3>
              <p className="benefit-description">
                {t.about.personalizedServiceDesc}
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🌱</div>
              <h3 className="benefit-title">{t.about.sustainableTourismTitle}</h3>
              <p className="benefit-description">
                {t.about.sustainableTourismDesc}
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">⭐</div>
              <h3 className="benefit-title">{t.about.excellentReviewsTitle}</h3>
              <p className="benefit-description">
                {t.about.excellentReviewsDesc}
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🚙</div>
              <h3 className="benefit-title">{t.about.qualityEquipmentTitle}</h3>
              <p className="benefit-description">
                {t.about.qualityEquipmentDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="section-label">{t.about.valuesLabel}</div>
          <h2 className="section-title">{t.about.valuesTitle}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="benefit-card text-center">
              <div className="benefit-icon mx-auto">🌍</div>
              <h3 className="benefit-title">{t.about.sustainabilityTitle}</h3>
              <p className="benefit-description">
                {t.about.sustainabilityDesc}
              </p>
            </div>

            <div className="benefit-card text-center">
              <div className="benefit-icon mx-auto">🤝</div>
              <h3 className="benefit-title">{t.about.integrityTitle}</h3>
              <p className="benefit-description">
                {t.about.integrityDesc}
              </p>
            </div>

            <div className="benefit-card text-center">
              <div className="benefit-icon mx-auto">⭐</div>
              <h3 className="benefit-title">{t.about.excellenceTitle}</h3>
              <p className="benefit-description">
                {t.about.excellenceDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-gradient-subtle">
        <div className="container-custom">
          <div className="section-label">{t.about.teamLabel}</div>
          <h2 className="section-title">{t.about.teamTitle}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className="benefit-card text-center">
              <div className="benefit-icon mx-auto">👨‍💼</div>
              <h3 className="benefit-title">{t.about.safariGuidesTitle}</h3>
              <p className="benefit-description">
                {t.about.safariGuidesDesc}
              </p>
            </div>

            <div className="benefit-card text-center">
              <div className="benefit-icon mx-auto">⛰️</div>
              <h3 className="benefit-title">{t.about.mountainGuidesTitle}</h3>
              <p className="benefit-description">
                {t.about.mountainGuidesDesc}
              </p>
            </div>

            <div className="benefit-card text-center">
              <div className="benefit-icon mx-auto">👨‍🍳</div>
              <h3 className="benefit-title">{t.about.safariChefsTitle}</h3>
              <p className="benefit-description">
                {t.about.safariChefsDesc}
              </p>
            </div>

            <div className="benefit-card text-center">
              <div className="benefit-icon mx-auto">💼</div>
              <h3 className="benefit-title">{t.about.supportTeamTitle}</h3>
              <p className="benefit-description">
                {t.about.supportTeamDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section section-padding">
        <div className="container-custom text-center">
          <h2 className="cta-title">{t.about.ctaTitle}</h2>
          <p className="cta-subtitle">
            {t.about.ctaSubtitle}
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
