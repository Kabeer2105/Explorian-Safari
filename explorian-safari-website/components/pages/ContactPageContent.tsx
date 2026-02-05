'use client';

import { useTranslations } from '@/lib/language-context';
import ContactForm from '@/components/forms/ContactForm';
import Link from 'next/link';

export default function ContactPageContent() {
  const t = useTranslations();

  return (
    <>
      {/* Hero Section */}
      <section className="page-hero page-hero-contact">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-subtitle">{t.contactPage.heroSubtitle}</span>
          <h1 className="hero-title">{t.contactPage.heroTitle}</h1>
          <p className="hero-description">
            {t.contactPage.heroDescription}
          </p>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="section-label">{t.contactPage.contactUsLabel}</div>
          <h2 className="section-title">{t.contactPage.contactUsTitle}</h2>
          <p className="section-subtitle">{t.contactPage.contactUsSubtitle}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className="benefit-card text-center">
              <div className="benefit-icon mx-auto">📍</div>
              <h3 className="benefit-title">{t.contactPage.visitUsTitle}</h3>
              <p className="benefit-description">
                {t.contactPage.visitUsAddress}
              </p>
            </div>

            <div className="benefit-card text-center">
              <div className="benefit-icon mx-auto">📞</div>
              <h3 className="benefit-title">{t.contactPage.callUsTitle}</h3>
              <p className="benefit-description">
                <a href="tel:+255719245540" className="text-accent-sunset hover:text-accent-gold">
                  +255 719 245 540
                </a>
              </p>
            </div>

            <div className="benefit-card text-center">
              <div className="benefit-icon mx-auto">📧</div>
              <h3 className="benefit-title">{t.contactPage.emailUsTitle}</h3>
              <p className="benefit-description">
                <a href="mailto:info@exploriansafaris.com" className="text-accent-sunset hover:text-accent-gold">
                  info@exploriansafaris.com
                </a>
              </p>
            </div>

            <div className="benefit-card text-center">
              <div className="benefit-icon mx-auto">💬</div>
              <h3 className="benefit-title">{t.contactPage.whatsappTitle}</h3>
              <p className="benefit-description">
                <a
                  href="https://wa.me/255719245540"
                  className="text-accent-sunset hover:text-accent-gold"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.contactPage.whatsappLink}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Details */}
      <section className="section-padding bg-sand-light">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="section-label">{t.contactPage.sendMessageLabel}</div>
              <h2 className="section-title text-left">{t.contactPage.sendMessageTitle}</h2>
              <p className="section-desc text-left mb-8">
                {t.contactPage.sendMessageDesc}
              </p>

              <div className="bg-white rounded-lg p-8 shadow-md">
                <ContactForm />
              </div>
            </div>

            {/* Office Hours and Additional Info */}
            <div>
              <div className="section-label">{t.contactPage.officeHoursLabel}</div>
              <h2 className="section-title text-left">{t.contactPage.officeHoursTitle}</h2>

              <div className="bg-white rounded-lg p-8 shadow-md mb-6 mt-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                    <span className="font-semibold text-primary-safari">{t.contactPage.mondayFriday}</span>
                    <span className="text-text-light">{t.contactPage.mondayFridayHours}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                    <span className="font-semibold text-primary-safari">{t.contactPage.saturday}</span>
                    <span className="text-text-light">{t.contactPage.saturdayHours}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-primary-safari">{t.contactPage.sunday}</span>
                    <span className="text-text-light">{t.contactPage.sundayHours}</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-gradient-subtle rounded-lg">
                  <p className="text-sm text-text-dark font-semibold">
                    {t.contactPage.emergencySupport}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-8 shadow-md">
                <h3 className="text-xl font-bold text-primary-safari mb-4">{t.contactPage.quickResponseTitle}</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-accent-sunset mr-2">✓</span>
                    <span className="text-text-light">{t.contactPage.emailInquiries}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-sunset mr-2">✓</span>
                    <span className="text-text-light">{t.contactPage.whatsappMessages}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-sunset mr-2">✓</span>
                    <span className="text-text-light">{t.contactPage.phoneCalls}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-sunset mr-2">✓</span>
                    <span className="text-text-light">{t.contactPage.quoteRequests}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="section-label">{t.contactPage.commonQuestionsLabel}</div>
          <h2 className="section-title">{t.contactPage.commonQuestionsTitle}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-5xl mx-auto">
            <div className="benefit-card">
              <h3 className="benefit-title">{t.contactPage.faqQuestion1}</h3>
              <p className="benefit-description">
                {t.contactPage.faqAnswer1}
              </p>
            </div>

            <div className="benefit-card">
              <h3 className="benefit-title">{t.contactPage.faqQuestion2}</h3>
              <p className="benefit-description">
                {t.contactPage.faqAnswer2}
              </p>
            </div>

            <div className="benefit-card">
              <h3 className="benefit-title">{t.contactPage.faqQuestion3}</h3>
              <p className="benefit-description">
                {t.contactPage.faqAnswer3}
              </p>
            </div>

            <div className="benefit-card">
              <h3 className="benefit-title">{t.contactPage.faqQuestion4}</h3>
              <p className="benefit-description">
                {t.contactPage.faqAnswer4}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section section-padding">
        <div className="container-custom text-center">
          <h2 className="cta-title">{t.contactPage.preferQuoteTitle}</h2>
          <p className="cta-subtitle">
            {t.contactPage.preferQuoteSubtitle}
          </p>
          <div className="cta-buttons">
            <Link href="/request-quote" className="btn-primary-large">
              {t.nav.requestQuote}
            </Link>
            <a
              href="https://wa.me/255719245540"
              className="btn-secondary-large"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.contactPage.whatsappLink}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
