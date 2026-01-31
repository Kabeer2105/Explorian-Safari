import MountainPackagesGrid from '@/components/MountainPackagesGrid';
import Link from 'next/link';

export default function MountainsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="page-hero page-hero-mountain">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-subtitle">SUMMIT ADVENTURES</span>
          <h1 className="hero-title">Mountain Trekking</h1>
          <p className="hero-description">
            Conquer Africa's highest peaks with our expert mountain guides.
            Challenge yourself and experience breathtaking views from the roof of Africa.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="section-label">REACH NEW HEIGHTS</div>
            <h2 className="section-title">Climb Kilimanjaro & Mount Meru</h2>
            <p className="section-desc">
              Challenge yourself with a trek up Mount Kilimanjaro (5,895m), Africa's highest peak,
              or Mount Meru (4,566m). Our experienced mountain guides ensure your safety while you
              experience the breathtaking beauty of Tanzania's peaks. We offer multiple routes to
              suit different skill levels and preferences, all designed for optimal acclimatization.
            </p>
          </div>
        </div>
      </section>

      {/* Mountain Packages Grid */}
      <section className="section-padding bg-sand-light">
        <div className="container-custom">
          <div className="section-label">OUR TREKKING ROUTES</div>
          <h2 className="section-title">Choose Your Route</h2>
          <p className="section-subtitle">Multiple routes available for different experience levels and preferences</p>

          <MountainPackagesGrid />
        </div>
      </section>

      {/* Mountain Info Cards */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="section-label">TREK INFORMATION</div>
          <h2 className="section-title">Everything You Need to Know</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="benefit-card">
              <div className="benefit-icon">📅</div>
              <h3 className="benefit-title">Best Time to Climb</h3>
              <p className="benefit-description">
                January-March and June-October offer the best weather conditions for mountain trekking,
                with clear skies and minimal rainfall.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🎒</div>
              <h3 className="benefit-title">What's Included</h3>
              <p className="benefit-description">
                All our treks include professional guides, porters, camping equipment, meals on the
                mountain, park fees, and safety equipment.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🏔️</div>
              <h3 className="benefit-title">High Success Rate</h3>
              <p className="benefit-description">
                Our routes are designed for optimal acclimatization, giving you the best chance of
                reaching the summit successfully and safely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Trek With Us */}
      <section className="section-padding bg-gradient-subtle">
        <div className="container-custom">
          <div className="section-label">WHY CHOOSE US</div>
          <h2 className="section-title">Mountain Trekking Excellence</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className="benefit-card">
              <div className="benefit-icon">⛰️</div>
              <h3 className="benefit-title">Certified Guides</h3>
              <p className="benefit-description">
                Wilderness First Responder certified guides with extensive mountain experience.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🏕️</div>
              <h3 className="benefit-title">Quality Gear</h3>
              <p className="benefit-description">
                Premium camping equipment and safety gear for your comfort and security.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🍽️</div>
              <h3 className="benefit-title">Mountain Cuisine</h3>
              <p className="benefit-description">
                Nutritious and delicious meals prepared fresh daily by expert mountain chefs.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🚑</div>
              <h3 className="benefit-title">Safety First</h3>
              <p className="benefit-description">
                Comprehensive safety protocols, oxygen supplies, and evacuation procedures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section section-padding">
        <div className="container-custom text-center">
          <h2 className="cta-title">Ready to Reach the Summit?</h2>
          <p className="cta-subtitle">
            Let us help you prepare for the adventure of a lifetime on Mount Kilimanjaro
          </p>
          <div className="cta-buttons">
            <Link href="/request-quote" className="btn-primary-large">
              Request Custom Quote
            </Link>
            <Link href="/contact" className="btn-secondary-large">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
