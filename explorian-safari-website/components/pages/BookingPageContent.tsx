'use client';

import { useTranslations } from '@/lib/language-context';
import BookingForm from '@/components/forms/BookingForm';

export default function BookingPageContent() {
  const t = useTranslations();

  return (
    <>
      {/* Hero Section */}
      <section className="page-hero page-hero-safari">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-subtitle">{t.bookingPage.heroSubtitle}</span>
          <h1 className="hero-title">{t.bookingPage.heroTitle}</h1>
          <p className="hero-description">
            {t.bookingPage.heroDescription}
          </p>
        </div>
      </section>

      {/* Booking Process Steps */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="section-label text-center">{t.bookingPage.howItWorksLabel}</div>
          <h2 className="section-title text-center">{t.bookingPage.howItWorksTitle}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto">
            <div className="benefit-card text-center">
              <div className="benefit-icon mx-auto">1️⃣</div>
              <h3 className="benefit-title">{t.bookingPage.step1Title}</h3>
              <p className="benefit-description">
                {t.bookingPage.step1Desc}
              </p>
            </div>

            <div className="benefit-card text-center">
              <div className="benefit-icon mx-auto">2️⃣</div>
              <h3 className="benefit-title">{t.bookingPage.step2Title}</h3>
              <p className="benefit-description">
                {t.bookingPage.step2Desc}
              </p>
            </div>

            <div className="benefit-card text-center">
              <div className="benefit-icon mx-auto">3️⃣</div>
              <h3 className="benefit-title">{t.bookingPage.step3Title}</h3>
              <p className="benefit-description">
                {t.bookingPage.step3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="section-padding bg-sand-light">
        <div className="container-custom">
          <BookingForm />
        </div>
      </section>

      {/* Help Section */}
      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-title">{t.bookingPage.needAssistanceTitle}</h2>
            <p className="section-desc mb-8">
              {t.bookingPage.needAssistanceDesc}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="benefit-card text-center">
                <div className="benefit-icon mx-auto">📱</div>
                <h3 className="benefit-title">{t.bookingPage.whatsappTitle}</h3>
                <p className="benefit-description">
                  <a href="https://wa.me/255719245540" className="text-accent-sunset hover:text-accent-gold font-semibold">
                    +255 719 245 540
                  </a>
                </p>
              </div>

              <div className="benefit-card text-center">
                <div className="benefit-icon mx-auto">✉️</div>
                <h3 className="benefit-title">{t.bookingPage.emailTitle}</h3>
                <p className="benefit-description">
                  <a href="mailto:info@exploriansafaris.com" className="text-accent-sunset hover:text-accent-gold font-semibold">
                    info@exploriansafaris.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="section-padding bg-gradient-subtle">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="benefit-card text-center">
              <div className="benefit-icon mx-auto">🔒</div>
              <h3 className="benefit-title">{t.bookingPage.securePaymentTitle}</h3>
              <p className="benefit-description">
                {t.bookingPage.securePaymentDesc}
              </p>
            </div>

            <div className="benefit-card text-center">
              <div className="benefit-icon mx-auto">✅</div>
              <h3 className="benefit-title">{t.bookingPage.instantConfirmationTitle}</h3>
              <p className="benefit-description">
                {t.bookingPage.instantConfirmationDesc}
              </p>
            </div>

            <div className="benefit-card text-center">
              <div className="benefit-icon mx-auto">💳</div>
              <h3 className="benefit-title">{t.bookingPage.flexiblePaymentTitle}</h3>
              <p className="benefit-description">
                {t.bookingPage.flexiblePaymentDesc}
              </p>
            </div>

            <div className="benefit-card text-center">
              <div className="benefit-icon mx-auto">🛡️</div>
              <h3 className="benefit-title">{t.bookingPage.licensedOperatorTitle}</h3>
              <p className="benefit-description">
                {t.bookingPage.licensedOperatorDesc}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
