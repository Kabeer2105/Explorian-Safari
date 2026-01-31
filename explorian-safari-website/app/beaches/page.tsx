import BeachPackagesGrid from '@/components/BeachPackagesGrid';
import Link from 'next/link';

export default function BeachesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="page-hero page-hero-beach">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-subtitle">TROPICAL PARADISE</span>
          <h1 className="hero-title">Beach Holidays</h1>
          <p className="hero-description">
            Relax on the pristine white sands of Zanzibar and enjoy the crystal-clear waters
            of the Indian Ocean after your safari adventure.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="section-label">ZANZIBAR ISLANDS</div>
            <h2 className="section-title">Paradise Awaits</h2>
            <p className="section-desc">
              Zanzibar offers the perfect end to your Tanzania adventure. With its powder-white beaches,
              turquoise waters, rich Swahili culture, and historic Stone Town, this tropical paradise
              combines relaxation with cultural exploration. Snorkel vibrant coral reefs, explore spice
              plantations, or simply unwind on some of Africa's most beautiful beaches.
            </p>
          </div>
        </div>
      </section>

      {/* Beach Packages Grid */}
      <section className="section-padding bg-sand-light">
        <div className="container-custom">
          <div className="section-label">OUR BEACH PACKAGES</div>
          <h2 className="section-title">Choose Your Island Escape</h2>
          <p className="section-subtitle">Carefully curated beach holidays combining relaxation and adventure</p>

          <BeachPackagesGrid />
        </div>
      </section>

      {/* Beach Activities */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="section-label">ISLAND EXPERIENCES</div>
          <h2 className="section-title">More Than Just Beaches</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <div className="benefit-card">
              <div className="benefit-icon">🤿</div>
              <h3 className="benefit-title">Snorkeling & Diving</h3>
              <p className="benefit-description">
                Explore vibrant coral reefs teeming with tropical fish, sea turtles, and colorful marine life.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🏛️</div>
              <h3 className="benefit-title">Stone Town Tours</h3>
              <p className="benefit-description">
                Discover the UNESCO World Heritage Site with its winding alleys, historic buildings, and spice markets.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🌴</div>
              <h3 className="benefit-title">Spice Plantations</h3>
              <p className="benefit-description">
                Visit aromatic spice farms and learn why Zanzibar is known as the "Spice Island."
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🐬</div>
              <h3 className="benefit-title">Dolphin Tours</h3>
              <p className="benefit-description">
                Swim with wild dolphins in their natural habitat off the coast of Kizimkazi.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">⛵</div>
              <h3 className="benefit-title">Dhow Cruises</h3>
              <p className="benefit-description">
                Sail on traditional wooden dhows at sunset for an unforgettable romantic experience.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🍽️</div>
              <h3 className="benefit-title">Swahili Cuisine</h3>
              <p className="benefit-description">
                Savor fresh seafood and experience the unique blend of African, Arabic, and Indian flavors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Beach Accommodations */}
      <section className="section-padding bg-gradient-subtle">
        <div className="container-custom">
          <div className="section-label">ACCOMMODATIONS</div>
          <h2 className="section-title">Where You'll Stay</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className="benefit-card">
              <div className="benefit-icon">🏖️</div>
              <h3 className="benefit-title">Beachfront Resorts</h3>
              <p className="benefit-description">
                Luxury resorts with direct beach access and stunning ocean views.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🛏️</div>
              <h3 className="benefit-title">Boutique Hotels</h3>
              <p className="benefit-description">
                Charming properties offering personalized service and intimate settings.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🏝️</div>
              <h3 className="benefit-title">Private Villas</h3>
              <p className="benefit-description">
                Exclusive villas perfect for families or groups seeking privacy.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🌊</div>
              <h3 className="benefit-title">All-Inclusive Options</h3>
              <p className="benefit-description">
                Complete packages with meals, drinks, and activities included.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section section-padding">
        <div className="container-custom text-center">
          <h2 className="cta-title">Ready for Your Beach Escape?</h2>
          <p className="cta-subtitle">
            Combine your safari with a relaxing beach holiday in Zanzibar
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
