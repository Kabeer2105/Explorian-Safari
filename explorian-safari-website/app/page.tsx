import Link from 'next/link';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background with overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-earth">
          <div className="absolute inset-0 bg-black/20"></div>
          {/* Decorative patterns */}
          <div className="absolute top-20 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Experience Tanzania <br className="hidden md:block" />
            <span className="text-accent">Like Never Before</span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto opacity-90 leading-relaxed">
            Create unforgettable memories with authentic safaris, mountain trekking, and beach escapes in the heart of Africa
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/request-quote"
              className="bg-secondary hover:bg-secondary-dark text-white font-bold rounded-full transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl inline-block text-base text-center"
              style={{ padding: '16px 40px' }}
            >
              Request Travel Offer
            </Link>
            <Link
              href="/safaris"
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold rounded-full transition-all duration-300 border-2 border-white/30 inline-block text-base text-center"
              style={{ padding: '16px 40px' }}
            >
              Explore Packages
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-white py-8 shadow-lg relative z-20 -mt-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">✅</div>
              <h3 className="font-bold text-primary text-sm md:text-base">Licensed & Certified</h3>
              <p className="text-xs md:text-sm text-gray-600">Ministry of Tourism Tanzania</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">⭐</div>
              <h3 className="font-bold text-primary text-sm md:text-base">Safari Bookings Partner</h3>
              <p className="text-xs md:text-sm text-gray-600">Verified Tour Operator</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🏔️</div>
              <h3 className="font-bold text-primary text-sm md:text-base">20+ Years Experience</h3>
              <p className="text-xs md:text-sm text-gray-600">Expert Local Guides</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">💯</div>
              <h3 className="font-bold text-primary text-sm md:text-base">100% Satisfaction</h3>
              <p className="text-xs md:text-sm text-gray-600">Happy Memories Guaranteed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Sections Preview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Your Tanzania Adventure Awaits
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From wildlife safaris to mountain peaks and pristine beaches, discover the best of Tanzania
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Safari Card */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="h-48 bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                <span className="text-6xl">🦁</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-2">Wildlife Safaris</h3>
                <p className="text-gray-600 mb-4">
                  Witness the Great Migration, see the Big Five, and explore world-renowned national parks
                </p>
                <Link
                  href="/safaris"
                  className="inline-flex items-center text-secondary font-semibold hover:gap-2 transition-all duration-200"
                >
                  Explore Safaris
                  <span className="ml-1">→</span>
                </Link>
              </div>
            </div>

            {/* Mountain Card */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="h-48 bg-gradient-to-br from-earth to-savanna flex items-center justify-center">
                <span className="text-6xl">🏔️</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-2">Mountain Trekking</h3>
                <p className="text-gray-600 mb-4">
                  Conquer Kilimanjaro, Africa's highest peak, and other stunning mountain adventures
                </p>
                <Link
                  href="/mountains"
                  className="inline-flex items-center text-secondary font-semibold hover:gap-2 transition-all duration-200"
                >
                  View Treks
                  <span className="ml-1">→</span>
                </Link>
              </div>
            </div>

            {/* Beach Card */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="h-48 bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                <span className="text-6xl">🏖️</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-2">Beach Escapes</h3>
                <p className="text-gray-600 mb-4">
                  Relax on Zanzibar's pristine beaches after your safari adventure
                </p>
                <Link
                  href="/beaches"
                  className="inline-flex items-center text-secondary font-semibold hover:gap-2 transition-all duration-200"
                >
                  Discover Beaches
                  <span className="ml-1">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Plan Your Dream Safari?
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Let our experts create a personalized itinerary just for you
          </p>
          <Link
            href="/request-quote"
            className="inline-block bg-secondary hover:bg-secondary-dark text-white font-bold rounded-full transform hover:scale-105 transition-all duration-300 shadow-xl text-lg text-center"
            style={{ padding: '16px 44px' }}
          >
            Get Your Free Quote
          </Link>
        </div>
      </section>
    </div>
  );
}
