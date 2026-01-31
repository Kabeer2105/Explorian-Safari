import SafariPackagesGrid from '@/components/SafariPackagesGrid';
import Link from 'next/link';

export default function SafarisPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="page-hero page-hero-safari">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-subtitle">WILDLIFE ADVENTURES</span>
          <h1 className="hero-title">Safari Packages</h1>
          <p className="hero-description">
            Experience the incredible wildlife of Tanzania's world-famous national parks.
            Witness the Great Migration and encounter the Big Five in their natural habitat.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="section-label">EXPLORE TANZANIA</div>
            <h2 className="section-title">Unforgettable Safari Experiences</h2>
            <p className="section-desc">
              From the vast plains of Serengeti to the unique ecosystem of Ngorongoro Crater,
              our safari packages offer unforgettable wildlife viewing experiences. Every journey
              is carefully crafted to bring you close to Africa's most magnificent creatures while
              ensuring comfort, safety, and sustainability.
            </p>
          </div>
        </div>
      </section>

      {/* Safari Packages Grid */}
      <section className="section-padding bg-sand-light">
        <div className="container-custom">
          <div className="section-label">OUR SAFARIS</div>
          <h2 className="section-title">Choose Your Adventure</h2>
          <p className="section-subtitle">Expertly guided wildlife safaris across Tanzania's most iconic national parks</p>

          <SafariPackagesGrid />
        </div>
      </section>

      {/* Why Choose Our Safaris */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="section-label">WHY CHOOSE US</div>
          <h2 className="section-title">Safari Excellence</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            <div className="benefit-card">
              <div className="benefit-icon">🦁</div>
              <h3 className="benefit-title">Expert Guides</h3>
              <p className="benefit-description">
                Our professional guides have decades of experience and deep knowledge of wildlife behavior and conservation.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🚙</div>
              <h3 className="benefit-title">4x4 Safari Vehicles</h3>
              <p className="benefit-description">
                Custom-built Land Cruisers with pop-up roofs, ensuring optimal game viewing and photography opportunities.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🏕️</div>
              <h3 className="benefit-title">Premium Lodging</h3>
              <p className="benefit-description">
                Stay in carefully selected lodges and tented camps that blend comfort with authentic bush experiences.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🌍</div>
              <h3 className="benefit-title">Eco-Friendly Tours</h3>
              <p className="benefit-description">
                We're committed to sustainable tourism that protects wildlife and supports local communities.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">📸</div>
              <h3 className="benefit-title">Photography Focus</h3>
              <p className="benefit-description">
                Extra time at key locations and expert tips to help you capture stunning wildlife photographs.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">⭐</div>
              <h3 className="benefit-title">Small Groups</h3>
              <p className="benefit-description">
                Limited group sizes ensure personalized attention and better wildlife viewing experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section section-padding">
        <div className="container-custom text-center">
          <h2 className="cta-title">Ready for Your Safari Adventure?</h2>
          <p className="cta-subtitle">
            Let us help you plan the perfect wildlife safari experience in Tanzania
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
