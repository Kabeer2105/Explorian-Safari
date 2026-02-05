'use client';

import Link from 'next/link';
import { useTranslations } from '@/lib/language-context';
import GallerySectionClient from './GallerySectionClient';
import VideosSection from './VideosSection';
import FAQSection from './FAQSection';

export default function RestOfHomeContent() {
  const t = useTranslations();

  return (
    <>
      {/* Discover Tanzania Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="section-label">{t.home.discoverLabel}</div>
          <h2 className="section-title">{t.home.discoverTitle}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {/* Safaris */}
            <div className="feature-card">
              <div className="feature-image-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&h=300&fit=crop"
                  alt="Wildlife Safari"
                  className="feature-image"
                />
              </div>
              <h3 className="feature-title">{t.home.wildlifeSafarisTitle}</h3>
              <p className="feature-description">
                {t.home.wildlifeSafarisDesc}
              </p>
              <Link href="/safaris" className="feature-link">
                {t.home.wildlifeSafarisLink}
              </Link>
            </div>

            {/* Mountains */}
            <div className="feature-card">
              <div className="feature-image-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=400&h=300&fit=crop"
                  alt="Mount Kilimanjaro"
                  className="feature-image"
                />
              </div>
              <h3 className="feature-title">{t.home.mountainTrekkingTitle}</h3>
              <p className="feature-description">
                {t.home.mountainTrekkingDesc}
              </p>
              <Link href="/mountains" className="feature-link">
                {t.home.mountainTrekkingLink}
              </Link>
            </div>

            {/* Beaches */}
            <div className="feature-card">
              <div className="feature-image-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=300&fit=crop"
                  alt="Zanzibar Beach"
                  className="feature-image"
                />
              </div>
              <h3 className="feature-title">{t.home.beachHolidaysTitle}</h3>
              <p className="feature-description">
                {t.home.beachHolidaysDesc}
              </p>
              <Link href="/beaches" className="feature-link">
                {t.home.beachHolidaysLink}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding bg-gradient-subtle">
        <div className="container-custom">
          <div className="section-label">{t.home.whyChooseTitle.toUpperCase()}</div>
          <h2 className="section-title">{t.home.whyChooseSubtitle}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className="benefit-card">
              <div className="benefit-icon">🏆</div>
              <h4 className="benefit-title">{t.home.expertGuidesTitle}</h4>
              <p className="benefit-text">
                {t.home.expertGuidesDesc}
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">💰</div>
              <h4 className="benefit-title">{t.home.bestValueTitle}</h4>
              <p className="benefit-text">
                {t.home.bestValueDesc}
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🚙</div>
              <h4 className="benefit-title">{t.home.qualityVehiclesTitle}</h4>
              <p className="benefit-text">
                {t.home.qualityVehiclesDesc}
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🛡️</div>
              <h4 className="benefit-title">{t.home.safetyFirstTitle}</h4>
              <p className="benefit-text">
                {t.home.safetyFirstDesc}
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🌍</div>
              <h4 className="benefit-title">{t.home.ecoFriendlyTitle}</h4>
              <p className="benefit-text">
                {t.home.ecoFriendlyDesc}
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">✨</div>
              <h4 className="benefit-title">{t.home.personalizedServiceTitle}</h4>
              <p className="benefit-text">
                {t.home.personalizedServiceDesc}
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">📞</div>
              <h4 className="benefit-title">{t.home.support24_7Title}</h4>
              <p className="benefit-text">
                {t.home.support24_7Desc}
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">⭐</div>
              <h4 className="benefit-title">{t.home.fiveStarReviewsTitle}</h4>
              <p className="benefit-text">
                {t.home.fiveStarReviewsDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="section-label">{t.home.galleryTitle.toUpperCase()}</div>
          <h2 className="section-title">{t.home.galleryTitle}</h2>
          <p className="section-subtitle">{t.home.gallerySubtitle}</p>

          <div className="mt-12">
            <GallerySectionClient />
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section className="section-padding bg-sand-light">
        <div className="container-custom">
          <div className="section-label">{t.home.videosTitle.toUpperCase()}</div>
          <h2 className="section-title">{t.home.videosTitle}</h2>
          <p className="section-subtitle">{t.home.videosSubtitle}</p>

          <div className="mt-12">
            <VideosSection />
          </div>
        </div>
      </section>

      {/* FAQ Section - From Database */}
      <FAQSection />

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container-custom text-center">
          <h2 className="cta-title">{t.home.ctaTitle}</h2>
          <p className="cta-subtitle">
            {t.home.ctaSubtitle}
          </p>
          <div className="cta-buttons">
            <Link href="/request-quote" className="btn-primary-large">
              {t.home.ctaButton}
            </Link>
            <Link href="/contact" className="btn-secondary-outline-large">
              {t.nav.contact}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
