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

      {/* Popular Safari Packages */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Popular Safari Packages
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Carefully crafted adventures combining the best of Tanzania's wildlife, landscapes, and culture
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 5-Day Serengeti & Ngorongoro Safari */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="relative h-56 bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                <span className="text-7xl">🦁</span>
                <div className="absolute top-4 right-4 bg-secondary text-white px-3 py-1 rounded-full text-sm font-bold">
                  Best Seller
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-2">5-Day Serengeti & Ngorongoro</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span className="flex items-center gap-1">
                    <span>⏱️</span> 5 Days
                  </span>
                  <span className="flex items-center gap-1">
                    <span>🚙</span> 4x4 Safari
                  </span>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Experience the Great Migration in Serengeti and descend into the Ngorongoro Crater, home to the Big Five.
                </p>
                <ul className="space-y-2 mb-6 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-0.5">✓</span>
                    <span>Serengeti National Park game drives</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-0.5">✓</span>
                    <span>Ngorongoro Crater full-day exploration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-0.5">✓</span>
                    <span>Luxury lodge accommodation</span>
                  </li>
                </ul>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-gray-500 text-sm">From</span>
                    <div className="text-2xl font-bold text-primary">$1,850</div>
                    <span className="text-xs text-gray-500">per person</span>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-accent-dark">
                      <span>⭐</span>
                      <span className="font-bold">4.9</span>
                    </div>
                    <span className="text-xs text-gray-500">127 reviews</span>
                  </div>
                </div>
                <Link
                  href="/safaris/serengeti-ngorongoro"
                  className="block w-full bg-secondary hover:bg-secondary-dark text-white font-semibold rounded-full transition-all duration-200 text-center"
                  style={{ padding: '12px 24px' }}
                >
                  View Details
                </Link>
              </div>
            </div>

            {/* 7-Day Northern Circuit Safari */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="relative h-56 bg-gradient-to-br from-earth to-savanna flex items-center justify-center">
                <span className="text-7xl">🐘</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-2">7-Day Northern Circuit</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span className="flex items-center gap-1">
                    <span>⏱️</span> 7 Days
                  </span>
                  <span className="flex items-center gap-1">
                    <span>🚙</span> 4x4 Safari
                  </span>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Complete northern Tanzania experience including Tarangire, Lake Manyara, Serengeti, and Ngorongoro Crater.
                </p>
                <ul className="space-y-2 mb-6 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-0.5">✓</span>
                    <span>All major northern parks covered</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-0.5">✓</span>
                    <span>Extensive wildlife photography opportunities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-0.5">✓</span>
                    <span>Luxury tented camps & lodges</span>
                  </li>
                </ul>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-gray-500 text-sm">From</span>
                    <div className="text-2xl font-bold text-primary">$2,650</div>
                    <span className="text-xs text-gray-500">per person</span>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-accent-dark">
                      <span>⭐</span>
                      <span className="font-bold">5.0</span>
                    </div>
                    <span className="text-xs text-gray-500">89 reviews</span>
                  </div>
                </div>
                <Link
                  href="/safaris/northern-circuit"
                  className="block w-full bg-secondary hover:bg-secondary-dark text-white font-semibold rounded-full transition-all duration-200 text-center"
                  style={{ padding: '12px 24px' }}
                >
                  View Details
                </Link>
              </div>
            </div>

            {/* 10-Day Safari & Zanzibar Beach */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="relative h-56 bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                <span className="text-7xl">🏖️</span>
                <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-bold">
                  Most Popular
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-2">10-Day Safari & Zanzibar</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span className="flex items-center gap-1">
                    <span>⏱️</span> 10 Days
                  </span>
                  <span className="flex items-center gap-1">
                    <span>🌴</span> Safari + Beach
                  </span>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Perfect combination of 6-day wildlife safari followed by 4 days relaxing on Zanzibar's pristine beaches.
                </p>
                <ul className="space-y-2 mb-6 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-0.5">✓</span>
                    <span>Serengeti & Ngorongoro safari</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-0.5">✓</span>
                    <span>4-star beach resort in Zanzibar</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-0.5">✓</span>
                    <span>Stone Town cultural tour included</span>
                  </li>
                </ul>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-gray-500 text-sm">From</span>
                    <div className="text-2xl font-bold text-primary">$3,200</div>
                    <span className="text-xs text-gray-500">per person</span>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-accent-dark">
                      <span>⭐</span>
                      <span className="font-bold">4.8</span>
                    </div>
                    <span className="text-xs text-gray-500">156 reviews</span>
                  </div>
                </div>
                <Link
                  href="/safaris/safari-zanzibar"
                  className="block w-full bg-secondary hover:bg-secondary-dark text-white font-semibold rounded-full transition-all duration-200 text-center"
                  style={{ padding: '12px 24px' }}
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/safaris"
              className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold rounded-full transition-all duration-300 text-center"
              style={{ padding: '14px 36px' }}
            >
              View All Safari Packages
            </Link>
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

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Why Choose Explorian Safaris?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the difference that expertise, passion, and personalized service make
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                <span className="text-4xl">🎖️</span>
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">Licensed & Certified</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Fully licensed by Tanzania Tourist Board with certified professional guides
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-all duration-300">
                <span className="text-4xl">👥</span>
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">Expert Local Guides</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Born and raised in Tanzania, our guides know every trail and wildlife pattern
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-all duration-300">
                <span className="text-4xl">🛡️</span>
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">Safety First</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Modern 4x4 vehicles, first aid certified staff, and comprehensive insurance
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-earth/10 flex items-center justify-center group-hover:bg-earth/20 transition-all duration-300">
                <span className="text-4xl">✨</span>
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">Personalized Service</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Custom itineraries tailored to your interests, budget, and travel style
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                <span className="text-4xl">💰</span>
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">Best Value Guaranteed</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Direct operator with no middlemen - better prices and more flexibility
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-all duration-300">
                <span className="text-4xl">🌍</span>
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">Eco-Responsible</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Supporting conservation and local communities through sustainable tourism
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-all duration-300">
                <span className="text-4xl">📞</span>
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">24/7 Support</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                WhatsApp support throughout your journey - we're always just a message away
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-earth/10 flex items-center justify-center group-hover:bg-earth/20 transition-all duration-300">
                <span className="text-4xl">⭐</span>
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">5-Star Reviews</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Rated excellent on TripAdvisor and Safari Bookings by hundreds of travelers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Got questions? We've got answers! Here's what travelers usually ask us.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            <details className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-lg text-primary">
                <span>When is the best time to visit Tanzania for a safari?</span>
                <span className="text-secondary group-open:rotate-180 transition-transform duration-300">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                The best time depends on what you want to see! For the Great Migration, visit between June and October.
                For calving season and baby animals, January to March is magical. Tanzania offers incredible wildlife viewing
                year-round, and the green season (March-May) offers lower prices and fewer tourists.
              </p>
            </details>

            <details className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-lg text-primary">
                <span>Do I need a visa to visit Tanzania?</span>
                <span className="text-secondary group-open:rotate-180 transition-transform duration-300">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Most visitors can get a visa on arrival at Tanzanian airports for $50-$100 (depending on nationality).
                You can also apply for an e-Visa online before your trip. We'll send you detailed visa information once
                you book with us!
              </p>
            </details>

            <details className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-lg text-primary">
                <span>What's included in your safari packages?</span>
                <span className="text-secondary group-open:rotate-180 transition-transform duration-300">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Our packages typically include: 4x4 safari vehicle with pop-up roof, professional English-speaking guide,
                accommodation (lodges or tented camps), all meals during safari, park entrance fees, game drives,
                and unlimited drinking water. Airport transfers are also included. International flights and visa fees
                are not included.
              </p>
            </details>

            <details className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-lg text-primary">
                <span>Is Tanzania safe for tourists?</span>
                <span className="text-secondary group-open:rotate-180 transition-transform duration-300">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Absolutely! Tanzania is one of the safest countries in Africa for tourists. The safari circuits are very safe,
                and our experienced guides ensure your safety at all times. We have comprehensive insurance, first-aid trained
                staff, and well-maintained vehicles. We're also available 24/7 on WhatsApp during your trip.
              </p>
            </details>

            <details className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-lg text-primary">
                <span>Can I customize my safari itinerary?</span>
                <span className="text-secondary group-open:rotate-180 transition-transform duration-300">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Yes! All our safaris can be customized to match your interests, budget, and time frame. Want to spend
                an extra day in Serengeti? Prefer luxury lodges over tented camps? Have specific wildlife you want to see?
                Just let us know, and we'll create a personalized itinerary for you.
              </p>
            </details>

            <details className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-lg text-primary">
                <span>What vaccinations do I need for Tanzania?</span>
                <span className="text-secondary group-open:rotate-180 transition-transform duration-300">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Yellow fever vaccination is required if you're coming from a yellow fever endemic country. We recommend
                consulting your doctor about malaria prophylaxis, Hepatitis A & B, and Typhoid. Most safari areas have low
                malaria risk, but it's good to be prepared. We'll provide specific health advice based on your itinerary.
              </p>
            </details>

            <details className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-lg text-primary">
                <span>How do I pay for my safari?</span>
                <span className="text-secondary group-open:rotate-180 transition-transform duration-300">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                We accept secure online payments via credit card through our payment partner Pesapal. For bookings more than
                7 days away, we require a 30% deposit to secure your reservation, with the balance due 30 days before departure.
                For bookings within 7 days, we'll contact you directly to arrange payment.
              </p>
            </details>

            <details className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-lg text-primary">
                <span>What should I pack for a safari?</span>
                <span className="text-secondary group-open:rotate-180 transition-transform duration-300">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Pack light! Neutral-colored clothing (khaki, green, beige), comfortable walking shoes, sunscreen, hat,
                sunglasses, binoculars, camera with zoom lens, and insect repellent. Layers are important as mornings can
                be cool. We'll send you a detailed packing list once you book. Most lodges offer laundry service.
              </p>
            </details>
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
