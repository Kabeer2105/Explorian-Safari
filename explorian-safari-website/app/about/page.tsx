export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Explorian Safaris</h1>
          <p className="text-xl text-gray-100 max-w-3xl">
            Your trusted partner for unforgettable Tanzania adventures since 2013
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="prose prose-lg">
                <p className="text-gray-700 mb-4">
                  Explorian Safaris was founded with a passion for showcasing the incredible beauty and wildlife of Tanzania. Based in Moshi, at the foot of Mount Kilimanjaro, we have been creating unforgettable safari experiences for travelers from around the world.
                </p>
                <p className="text-gray-700 mb-4">
                  Our team of experienced guides and safari experts are dedicated to providing authentic, sustainable, and personalized adventures that go beyond the ordinary tourist experience.
                </p>
                <p className="text-gray-700">
                  We specialize in wildlife safaris, mountain trekking, beach holidays, and cultural tours, offering a complete Tanzania experience that combines adventure, relaxation, and cultural immersion.
                </p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-primary text-2xl mr-3">✓</span>
                  <div>
                    <strong className="text-gray-900">Licensed & Certified</strong>
                    <p className="text-gray-600">Fully licensed tour operator with all necessary permits</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-primary text-2xl mr-3">✓</span>
                  <div>
                    <strong className="text-gray-900">Expert Guides</strong>
                    <p className="text-gray-600">Professional guides with extensive local knowledge</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-primary text-2xl mr-3">✓</span>
                  <div>
                    <strong className="text-gray-900">Personalized Service</strong>
                    <p className="text-gray-600">Customized itineraries tailored to your preferences</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-primary text-2xl mr-3">✓</span>
                  <div>
                    <strong className="text-gray-900">Sustainable Tourism</strong>
                    <p className="text-gray-600">Committed to responsible and eco-friendly practices</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-primary text-2xl mr-3">✓</span>
                  <div>
                    <strong className="text-gray-900">Excellent Reviews</strong>
                    <p className="text-gray-600">4.8/5 rating on Safari Bookings and TripAdvisor</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Sustainability</h3>
                <p className="text-gray-600">
                  We are committed to protecting Tanzania's natural heritage and supporting local communities
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Integrity</h3>
                <p className="text-gray-600">
                  Honest, transparent pricing and reliable service you can trust
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">⭐</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Excellence</h3>
                <p className="text-gray-600">
                  Constantly striving to exceed expectations and create memorable experiences
                </p>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="bg-primary text-white rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Adventure?</h2>
            <p className="text-xl text-gray-100 mb-6">
              Get in touch with us to plan your perfect Tanzania experience
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/request-quote"
                className="px-8 py-3 bg-secondary text-white rounded-lg hover:bg-secondary-dark transition"
              >
                Request a Quote
              </a>
              <a
                href="/contact"
                className="px-8 py-3 bg-white text-primary rounded-lg hover:bg-gray-100 transition"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
