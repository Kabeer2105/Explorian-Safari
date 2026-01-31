import BookingForm from '@/components/forms/BookingForm';

export default function BookPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="page-hero page-hero-safari">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-subtitle">SECURE YOUR ADVENTURE</span>
          <h1 className="hero-title">Book Your Safari</h1>
          <p className="hero-description">
            Complete your booking details below and we'll take care of the rest.
            Your Tanzanian adventure awaits!
          </p>
        </div>
      </section>

      {/* Booking Process Steps */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="section-label text-center">HOW IT WORKS</div>
          <h2 className="section-title text-center">Simple 3-Step Booking</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto">
            <div className="benefit-card text-center">
              <div className="benefit-icon mx-auto">1️⃣</div>
              <h3 className="benefit-title">Fill Details</h3>
              <p className="benefit-description">
                Provide your travel information and preferences
              </p>
            </div>

            <div className="benefit-card text-center">
              <div className="benefit-icon mx-auto">2️⃣</div>
              <h3 className="benefit-title">Secure Payment</h3>
              <p className="benefit-description">
                Pay safely through Pesapal payment gateway
              </p>
            </div>

            <div className="benefit-card text-center">
              <div className="benefit-icon mx-auto">3️⃣</div>
              <h3 className="benefit-title">Get Confirmation</h3>
              <p className="benefit-description">
                Receive booking confirmation via email instantly
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
            <h2 className="section-title">Need Assistance?</h2>
            <p className="section-desc mb-8">
              Our team is here to help you book your dream safari. Reach out anytime!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="benefit-card text-center">
                <div className="benefit-icon mx-auto">📱</div>
                <h3 className="benefit-title">WhatsApp</h3>
                <p className="benefit-description">
                  <a href="https://wa.me/255719245540" className="text-accent-sunset hover:text-accent-gold font-semibold">
                    +255 719 245 540
                  </a>
                </p>
              </div>

              <div className="benefit-card text-center">
                <div className="benefit-icon mx-auto">✉️</div>
                <h3 className="benefit-title">Email</h3>
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
              <h3 className="benefit-title">Secure Payment</h3>
              <p className="benefit-description">
                PCI-DSS compliant payment processing
              </p>
            </div>

            <div className="benefit-card text-center">
              <div className="benefit-icon mx-auto">✅</div>
              <h3 className="benefit-title">Instant Confirmation</h3>
              <p className="benefit-description">
                Email confirmation within minutes
              </p>
            </div>

            <div className="benefit-card text-center">
              <div className="benefit-icon mx-auto">💳</div>
              <h3 className="benefit-title">Flexible Payment</h3>
              <p className="benefit-description">
                Cards, mobile money, and more
              </p>
            </div>

            <div className="benefit-card text-center">
              <div className="benefit-icon mx-auto">🛡️</div>
              <h3 className="benefit-title">Licensed Operator</h3>
              <p className="benefit-description">
                Fully registered with TALA
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
