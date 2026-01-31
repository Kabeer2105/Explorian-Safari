import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function DayTripsPage() {
  const dayTrips = await prisma.package.findMany({
    where: { type: 'DAYTRIP', active: true },
    orderBy: { created_at: 'desc' },
  });

  return (
    <>
      {/* Hero Section */}
      <section className="page-hero page-hero-daytrip">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-subtitle">CULTURAL ADVENTURES</span>
          <h1 className="hero-title">Day Trips & Excursions</h1>
          <p className="hero-description">
            Discover Tanzania's hidden gems, vibrant cultures, and natural wonders
            with our carefully curated day trips and excursions.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="section-label">EXPLORE & DISCOVER</div>
            <h2 className="section-title">Perfect Day Adventures</h2>
            <p className="section-desc">
              From cultural experiences with local tribes to breathtaking waterfalls and hot springs,
              our day trips offer the perfect complement to your safari or mountain trek. Each excursion
              is designed to give you authentic insights into Tanzania's rich heritage and stunning landscapes.
            </p>
          </div>
        </div>
      </section>

      {/* Day Trips Grid */}
      <section className="section-padding bg-sand-light">
        <div className="container-custom">
          <div className="section-label">OUR DAY TRIPS</div>
          <h2 className="section-title">Choose Your Excursion</h2>
          <p className="section-subtitle">Authentic experiences that enrich your Tanzania adventure</p>

          {dayTrips.length === 0 ? (
            <div className="text-center py-12">
              <p className="section-desc">No day trips available at the moment. Please check back soon!</p>
              <Link href="/contact" className="btn-primary-large mt-6 inline-block">
                Contact us for custom day trips →
              </Link>
            </div>
          ) : (
            <div className="packages-grid mt-12">
              {dayTrips.map((trip) => {
                const images = trip.images ? JSON.parse(trip.images) : [];
                const highlights = trip.highlights ? JSON.parse(trip.highlights) : [];

                return (
                  <div key={trip.id} className="package-card">
                    <div className="package-image-wrapper">
                      {trip.badge_label && (
                        <span className="package-badge">{trip.badge_label}</span>
                      )}
                      <img
                        src={images[0] || '/images/placeholder.jpg'}
                        alt={trip.name}
                        className="package-image"
                      />
                    </div>

                    <div className="package-content">
                      <div className="package-category-text">{trip.type}</div>
                      <h3 className="package-title">{trip.name}</h3>
                      <p className="package-description">
                        {trip.description.substring(0, 120)}...
                      </p>

                      {highlights.length > 0 && (
                        <ul className="package-features">
                          {highlights.slice(0, 3).map((highlight: string, index: number) => (
                            <li key={index}>{highlight}</li>
                          ))}
                        </ul>
                      )}

                      <div className="package-footer">
                        <div className="package-price">
                          <span className="from">From</span>
                          <span className="price">{trip.currency} {Number(trip.price_from).toLocaleString()}</span>
                          <span className="per-person">per person</span>
                        </div>
                        <Link href={`/book?package=${trip.id}`} className="btn-book">
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Popular Day Trips */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="section-label">POPULAR EXCURSIONS</div>
          <h2 className="section-title">What Our Guests Love</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <div className="benefit-card">
              <div className="benefit-icon">🏔️</div>
              <h3 className="benefit-title">Materuni Waterfalls</h3>
              <p className="benefit-description">
                Hike through lush rainforest to stunning waterfalls, enjoy coffee tours, and swim in crystal-clear pools.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🌊</div>
              <h3 className="benefit-title">Hot Springs</h3>
              <p className="benefit-description">
                Relax in natural hot springs surrounded by beautiful scenery at the base of Mount Kilimanjaro.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">👥</div>
              <h3 className="benefit-title">Cultural Villages</h3>
              <p className="benefit-description">
                Visit Maasai or Chagga villages and learn about traditional customs, crafts, and daily life.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🦒</div>
              <h3 className="benefit-title">Arusha National Park</h3>
              <p className="benefit-description">
                One-day safari adventure with giraffes, zebras, and stunning views of Mount Meru.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">☕</div>
              <h3 className="benefit-title">Coffee Plantation Tours</h3>
              <p className="benefit-description">
                Learn about coffee production from bean to cup and taste fresh local brew.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🏛️</div>
              <h3 className="benefit-title">Moshi Town Tours</h3>
              <p className="benefit-description">
                Explore local markets, historical sites, and experience authentic Tanzanian urban life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Day Trips */}
      <section className="section-padding bg-gradient-subtle">
        <div className="container-custom">
          <div className="section-label">WHY ADD DAY TRIPS</div>
          <h2 className="section-title">Enhance Your Safari Experience</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className="benefit-card">
              <div className="benefit-icon">🎒</div>
              <h3 className="benefit-title">Flexible Schedule</h3>
              <p className="benefit-description">
                Perfect for filling gaps between your main activities or extending your stay.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">💰</div>
              <h3 className="benefit-title">Great Value</h3>
              <p className="benefit-description">
                Experience more of Tanzania without the commitment of multi-day tours.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🌍</div>
              <h3 className="benefit-title">Cultural Immersion</h3>
              <p className="benefit-description">
                Connect with local communities and learn about traditional Tanzanian life.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">📸</div>
              <h3 className="benefit-title">Photo Opportunities</h3>
              <p className="benefit-description">
                Capture unique moments and landscapes away from typical tourist paths.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section section-padding">
        <div className="container-custom text-center">
          <h2 className="cta-title">Plan Your Day Trip</h2>
          <p className="cta-subtitle">
            Add exciting cultural and natural experiences to your Tanzania adventure
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
