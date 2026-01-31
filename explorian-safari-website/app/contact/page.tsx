import ContactForm from '@/components/forms/ContactForm';

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="page-hero page-hero-contact">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-subtitle">LET'S CONNECT</span>
          <h1 className="hero-title">Get in Touch</h1>
          <p className="hero-description">
            Have questions about your Tanzania adventure? We're here to help you
            plan the perfect safari, trek, or beach holiday.
          </p>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="section-label">CONTACT US</div>
          <h2 className="section-title">We're Here to Help</h2>
          <p className="section-subtitle">Reach out to us through any of these channels</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className="benefit-card text-center">
              <div className="benefit-icon mx-auto">📍</div>
              <h3 className="benefit-title">Visit Us</h3>
              <p className="benefit-description">
                Moshi, Kilimanjaro<br />Tanzania, East Africa
              </p>
            </div>

            <div className="benefit-card text-center">
              <div className="benefit-icon mx-auto">📞</div>
              <h3 className="benefit-title">Call Us</h3>
              <p className="benefit-description">
                <a href="tel:+255719245540" className="text-accent-sunset hover:text-accent-gold">
                  +255 719 245 540
                </a>
              </p>
            </div>

            <div className="benefit-card text-center">
              <div className="benefit-icon mx-auto">📧</div>
              <h3 className="benefit-title">Email Us</h3>
              <p className="benefit-description">
                <a href="mailto:info@exploriansafaris.com" className="text-accent-sunset hover:text-accent-gold">
                  info@exploriansafaris.com
                </a>
              </p>
            </div>

            <div className="benefit-card text-center">
              <div className="benefit-icon mx-auto">💬</div>
              <h3 className="benefit-title">WhatsApp</h3>
              <p className="benefit-description">
                <a
                  href="https://wa.me/255719245540"
                  className="text-accent-sunset hover:text-accent-gold"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat with us now
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
              <div className="section-label">SEND A MESSAGE</div>
              <h2 className="section-title text-left">How Can We Help?</h2>
              <p className="section-desc text-left mb-8">
                Fill out the form below and we'll get back to you within 24 hours. For urgent
                inquiries, please call or WhatsApp us directly.
              </p>

              <div className="bg-white rounded-lg p-8 shadow-md">
                <ContactForm />
              </div>
            </div>

            {/* Office Hours and Additional Info */}
            <div>
              <div className="section-label">OFFICE HOURS</div>
              <h2 className="section-title text-left">When We're Available</h2>

              <div className="bg-white rounded-lg p-8 shadow-md mb-6 mt-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                    <span className="font-semibold text-primary-safari">Monday - Friday:</span>
                    <span className="text-text-light">8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                    <span className="font-semibold text-primary-safari">Saturday:</span>
                    <span className="text-text-light">9:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-primary-safari">Sunday:</span>
                    <span className="text-text-light">Closed</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-gradient-subtle rounded-lg">
                  <p className="text-sm text-text-dark font-semibold">
                    🚨 Emergency Support: Available 24/7 for active safaris and treks
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-8 shadow-md">
                <h3 className="text-xl font-bold text-primary-safari mb-4">Quick Response Times</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-accent-sunset mr-2">✓</span>
                    <span className="text-text-light">Email inquiries: Within 24 hours</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-sunset mr-2">✓</span>
                    <span className="text-text-light">WhatsApp messages: Usually within 1-2 hours</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-sunset mr-2">✓</span>
                    <span className="text-text-light">Phone calls: Answered during office hours</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-sunset mr-2">✓</span>
                    <span className="text-text-light">Quote requests: Detailed response within 48 hours</span>
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
          <div className="section-label">COMMON QUESTIONS</div>
          <h2 className="section-title">Before You Contact Us</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-5xl mx-auto">
            <div className="benefit-card">
              <h3 className="benefit-title">What information should I include in my inquiry?</h3>
              <p className="benefit-description">
                Let us know your preferred travel dates, number of travelers, interests (safari,
                mountain, beach), budget range, and any special requirements.
              </p>
            </div>

            <div className="benefit-card">
              <h3 className="benefit-title">How far in advance should I book?</h3>
              <p className="benefit-description">
                We recommend booking 3-6 months in advance, especially for peak season (June-October
                and December-February).
              </p>
            </div>

            <div className="benefit-card">
              <h3 className="benefit-title">Do you offer custom itineraries?</h3>
              <p className="benefit-description">
                Yes! All our tours can be customized to match your preferences, budget, and travel
                style. Just let us know what you're looking for.
              </p>
            </div>

            <div className="benefit-card">
              <h3 className="benefit-title">What payment methods do you accept?</h3>
              <p className="benefit-description">
                We accept bank transfers, credit/debit cards via Pesapal, and mobile money. Full
                payment details provided with your quote.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section section-padding">
        <div className="container-custom text-center">
          <h2 className="cta-title">Prefer to Request a Quote?</h2>
          <p className="cta-subtitle">
            Get a detailed custom quote for your Tanzania adventure
          </p>
          <div className="cta-buttons">
            <a href="/request-quote" className="btn-primary-large">
              Request Custom Quote
            </a>
            <a
              href="https://wa.me/255719245540"
              className="btn-secondary-large"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
