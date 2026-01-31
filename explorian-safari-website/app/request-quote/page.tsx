import RequestQuoteForm from '@/components/forms/RequestQuoteForm';

export default function RequestQuotePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="page-hero page-hero-safari">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-subtitle">CUSTOM TRAVEL PLANNING</span>
          <h1 className="hero-title">Request Your Custom Safari</h1>
          <p className="hero-description">
            Share your travel dreams with us and receive a personalized itinerary
            crafted exclusively for you, with transparent pricing and expert recommendations.
          </p>
        </div>
      </section>

      {/* Why Request a Quote */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="section-label text-center">WHY REQUEST A CUSTOM QUOTE</div>
          <h2 className="section-title text-center">Tailored Safari Planning</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto">
            <div className="benefit-card text-center">
              <div className="benefit-icon mx-auto">✉️</div>
              <h3 className="benefit-title">Completely Free</h3>
              <p className="benefit-description">
                No obligation, no hidden costs. Receive a detailed custom itinerary with transparent pricing at no charge.
              </p>
            </div>

            <div className="benefit-card text-center">
              <div className="benefit-icon mx-auto">⚡</div>
              <h3 className="benefit-title">Fast Response</h3>
              <p className="benefit-description">
                Our expert team will review your request and send you a personalized offer within 24-48 hours.
              </p>
            </div>

            <div className="benefit-card text-center">
              <div className="benefit-icon mx-auto">🎯</div>
              <h3 className="benefit-title">Perfectly Tailored</h3>
              <p className="benefit-description">
                Every itinerary is custom-designed around your interests, budget, travel style, and group composition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section className="section-padding bg-sand-light">
        <div className="container-custom">
          <RequestQuoteForm />
        </div>
      </section>

      {/* What Happens Next */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="section-label text-center">WHAT HAPPENS NEXT</div>
          <h2 className="section-title text-center">Our Process</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12 max-w-6xl mx-auto">
            <div className="benefit-card text-center">
              <div className="benefit-icon mx-auto">1️⃣</div>
              <h3 className="benefit-title">Submit Request</h3>
              <p className="benefit-description">
                Fill out the form with your travel preferences and requirements.
              </p>
            </div>

            <div className="benefit-card text-center">
              <div className="benefit-icon mx-auto">2️⃣</div>
              <h3 className="benefit-title">Expert Review</h3>
              <p className="benefit-description">
                Our safari specialists analyze your needs and design a custom itinerary.
              </p>
            </div>

            <div className="benefit-card text-center">
              <div className="benefit-icon mx-auto">3️⃣</div>
              <h3 className="benefit-title">Receive Proposal</h3>
              <p className="benefit-description">
                Get a detailed day-by-day itinerary with pricing within 24-48 hours.
              </p>
            </div>

            <div className="benefit-card text-center">
              <div className="benefit-icon mx-auto">4️⃣</div>
              <h3 className="benefit-title">Refine & Book</h3>
              <p className="benefit-description">
                We'll adjust based on your feedback until it's perfect, then book!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding bg-gradient-subtle">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-title">Prefer to Speak Directly?</h2>
            <p className="section-desc mb-8">
              Our team is available to discuss your safari plans over the phone or WhatsApp.
              We're here to answer any questions and help you plan the perfect Tanzania adventure.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="benefit-card text-center">
                <div className="benefit-icon mx-auto">📞</div>
                <h3 className="benefit-title">Call Us</h3>
                <p className="benefit-description">
                  <a href="tel:+255719245540" className="text-accent-sunset hover:text-accent-gold font-semibold">
                    +255 719 245 540
                  </a>
                </p>
              </div>

              <div className="benefit-card text-center">
                <div className="benefit-icon mx-auto">💬</div>
                <h3 className="benefit-title">WhatsApp</h3>
                <p className="benefit-description">
                  <a
                    href="https://wa.me/255719245540"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-sunset hover:text-accent-gold font-semibold"
                  >
                    Chat with us now
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
