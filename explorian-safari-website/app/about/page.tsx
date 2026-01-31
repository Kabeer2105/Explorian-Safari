import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="page-hero page-hero-about">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-subtitle">OUR STORY</span>
          <h1 className="hero-title">About Explorian Safaris</h1>
          <p className="hero-description">
            Your trusted partner for unforgettable Tanzania adventures.
            Creating memories that last a lifetime since 2013.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="section-label">WHO WE ARE</div>
            <h2 className="section-title">Passionate About Tanzania</h2>
            <p className="section-desc">
              Based in Moshi at the foot of Mount Kilimanjaro, Explorian Safaris was founded with a
              passion for showcasing the incredible beauty and wildlife of Tanzania. Our team of
              experienced guides and safari experts are dedicated to providing authentic, sustainable,
              and personalized adventures that go beyond the ordinary tourist experience.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
            <div>
              <h3 className="section-title text-left mb-6">Our Mission</h3>
              <p className="section-desc text-left mb-4">
                To create unforgettable safari experiences that connect travelers with Tanzania's
                incredible wildlife, majestic mountains, and vibrant cultures while promoting
                sustainable tourism and supporting local communities.
              </p>
              <p className="section-desc text-left">
                We specialize in wildlife safaris, mountain trekking, beach holidays, and cultural
                tours, offering a complete Tanzania experience that combines adventure, relaxation,
                and cultural immersion.
              </p>
            </div>

            <div className="bg-gradient-subtle rounded-lg p-8">
              <h3 className="section-title text-left mb-6">Quick Facts</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-primary-safari text-2xl mr-3">📍</span>
                  <div>
                    <strong className="text-primary-safari">Location:</strong>
                    <p className="text-text-light">Moshi, Kilimanjaro, Tanzania</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-safari text-2xl mr-3">📅</span>
                  <div>
                    <strong className="text-primary-safari">Established:</strong>
                    <p className="text-text-light">Since 2013</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-safari text-2xl mr-3">⭐</span>
                  <div>
                    <strong className="text-primary-safari">Rating:</strong>
                    <p className="text-text-light">4.8/5 on Safari Bookings</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-safari text-2xl mr-3">✓</span>
                  <div>
                    <strong className="text-primary-safari">Licensing:</strong>
                    <p className="text-text-light">Fully certified tour operator</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-sand-light">
        <div className="container-custom">
          <div className="section-label">WHY CHOOSE US</div>
          <h2 className="section-title">What Sets Us Apart</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <div className="benefit-card">
              <div className="benefit-icon">✓</div>
              <h3 className="benefit-title">Licensed & Certified</h3>
              <p className="benefit-description">
                Fully licensed tour operator with all necessary permits and certifications for your safety and peace of mind.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🎓</div>
              <h3 className="benefit-title">Expert Guides</h3>
              <p className="benefit-description">
                Professional guides with extensive local knowledge, wildlife expertise, and passion for sharing Tanzania's wonders.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🎯</div>
              <h3 className="benefit-title">Personalized Service</h3>
              <p className="benefit-description">
                Customized itineraries tailored to your preferences, budget, and travel style for a unique experience.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🌱</div>
              <h3 className="benefit-title">Sustainable Tourism</h3>
              <p className="benefit-description">
                Committed to responsible and eco-friendly practices that protect wildlife and support local communities.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">⭐</div>
              <h3 className="benefit-title">Excellent Reviews</h3>
              <p className="benefit-description">
                4.8/5 rating on Safari Bookings and TripAdvisor with hundreds of satisfied travelers.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🚙</div>
              <h3 className="benefit-title">Quality Equipment</h3>
              <p className="benefit-description">
                Well-maintained 4x4 vehicles, premium camping gear, and safety equipment for your comfort and security.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="section-label">OUR VALUES</div>
          <h2 className="section-title">What We Stand For</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="benefit-card text-center">
              <div className="benefit-icon mx-auto">🌍</div>
              <h3 className="benefit-title">Sustainability</h3>
              <p className="benefit-description">
                We are committed to protecting Tanzania's natural heritage and supporting local communities
                through responsible tourism practices.
              </p>
            </div>

            <div className="benefit-card text-center">
              <div className="benefit-icon mx-auto">🤝</div>
              <h3 className="benefit-title">Integrity</h3>
              <p className="benefit-description">
                Honest, transparent pricing and reliable service you can trust. No hidden fees,
                no surprises—just exceptional experiences.
              </p>
            </div>

            <div className="benefit-card text-center">
              <div className="benefit-icon mx-auto">⭐</div>
              <h3 className="benefit-title">Excellence</h3>
              <p className="benefit-description">
                Constantly striving to exceed expectations and create memorable experiences that
                you'll cherish for a lifetime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-gradient-subtle">
        <div className="container-custom">
          <div className="section-label">OUR TEAM</div>
          <h2 className="section-title">Meet The Experts</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className="benefit-card text-center">
              <div className="benefit-icon mx-auto">👨‍💼</div>
              <h3 className="benefit-title">Safari Guides</h3>
              <p className="benefit-description">
                Licensed wildlife experts with years of experience in Tanzania's national parks.
              </p>
            </div>

            <div className="benefit-card text-center">
              <div className="benefit-icon mx-auto">⛰️</div>
              <h3 className="benefit-title">Mountain Guides</h3>
              <p className="benefit-description">
                Certified mountain guides trained in altitude safety and wilderness first aid.
              </p>
            </div>

            <div className="benefit-card text-center">
              <div className="benefit-icon mx-auto">👨‍🍳</div>
              <h3 className="benefit-title">Safari Chefs</h3>
              <p className="benefit-description">
                Skilled cooks preparing delicious meals in the bush and on the mountain.
              </p>
            </div>

            <div className="benefit-card text-center">
              <div className="benefit-icon mx-auto">💼</div>
              <h3 className="benefit-title">Support Team</h3>
              <p className="benefit-description">
                Dedicated staff ensuring seamless planning, booking, and customer service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section section-padding">
        <div className="container-custom text-center">
          <h2 className="cta-title">Ready to Start Your Adventure?</h2>
          <p className="cta-subtitle">
            Get in touch with us to plan your perfect Tanzania experience
          </p>
          <div className="cta-buttons">
            <Link href="/request-quote" className="btn-primary-large">
              Request a Quote
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
