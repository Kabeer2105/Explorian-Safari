'use client';

import Link from 'next/link';
import GallerySectionClient from './GallerySectionClient';
import VideosSection from './VideosSection';
import FAQSection from './FAQSection';

export default function RestOfHomeContent() {
  return (
    <>
      {/* Discover Tanzania Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="section-label">DISCOVER TANZANIA</div>
          <h2 className="section-title">Explore Our Destinations</h2>

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
              <h3 className="feature-title">Wildlife Safaris</h3>
              <p className="feature-description">
                Witness the Big Five and experience the Great Migration in Serengeti and Ngorongoro Crater.
              </p>
              <Link href="/safaris" className="feature-link">
                Explore Safaris →
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
              <h3 className="feature-title">Mountain Trekking</h3>
              <p className="feature-description">
                Conquer Africa's highest peak - Mount Kilimanjaro. Multiple routes available for all skill levels.
              </p>
              <Link href="/mountains" className="feature-link">
                View Treks →
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
              <h3 className="feature-title">Beach Holidays</h3>
              <p className="feature-description">
                Relax on the pristine beaches of Zanzibar. Crystal-clear waters and white sand paradise.
              </p>
              <Link href="/beaches" className="feature-link">
                Beach Getaways →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding bg-gradient-subtle">
        <div className="container-custom">
          <div className="section-label">WHY CHOOSE US</div>
          <h2 className="section-title">Your Trusted Safari Partner</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className="benefit-card">
              <div className="benefit-icon">🏆</div>
              <h4 className="benefit-title">Expert Guides</h4>
              <p className="benefit-text">
                Certified, experienced guides with deep knowledge of wildlife and culture.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">💰</div>
              <h4 className="benefit-title">Best Value</h4>
              <p className="benefit-text">
                Competitive pricing with no hidden costs. Transparent and fair pricing.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🚙</div>
              <h4 className="benefit-title">Quality Vehicles</h4>
              <p className="benefit-text">
                Well-maintained 4x4 Land Cruisers with pop-up roofs for optimal game viewing.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🛡️</div>
              <h4 className="benefit-title">Safety First</h4>
              <p className="benefit-text">
                Licensed and insured. We prioritize your safety and comfort at all times.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🌍</div>
              <h4 className="benefit-title">Eco-Friendly</h4>
              <p className="benefit-text">
                Committed to sustainable tourism and supporting local communities.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">✨</div>
              <h4 className="benefit-title">Personalized Service</h4>
              <p className="benefit-text">
                Customized itineraries tailored to your interests, budget, and schedule.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">📞</div>
              <h4 className="benefit-title">24/7 Support</h4>
              <p className="benefit-text">
                Round-the-clock assistance before, during, and after your safari.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">⭐</div>
              <h4 className="benefit-title">5-Star Reviews</h4>
              <p className="benefit-text">
                Highly rated on TripAdvisor and SafariBookings.com by happy travelers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="section-label">GALLERY</div>
          <h2 className="section-title">Moments from the Wild</h2>
          <p className="section-subtitle">Real photos from our recent safaris</p>

          <div className="mt-12">
            <GallerySectionClient />
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section className="section-padding bg-sand-light">
        <div className="container-custom">
          <div className="section-label">VIDEOS</div>
          <h2 className="section-title">Experience Tanzania</h2>
          <p className="section-subtitle">Watch our safari adventures</p>

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
          <h2 className="cta-title">Ready to Start Your Adventure?</h2>
          <p className="cta-subtitle">
            Let us create a personalized safari experience tailored just for you
          </p>
          <div className="cta-buttons">
            <Link href="/request-quote" className="btn-primary-large">
              Request Travel Offer
            </Link>
            <Link href="/contact" className="btn-secondary-outline-large">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
