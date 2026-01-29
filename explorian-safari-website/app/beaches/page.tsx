import BeachPackagesGrid from '@/components/BeachPackagesGrid';

export default function BeachesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-cyan-600 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Beach Holidays</h1>
          <p className="text-xl text-gray-100 max-w-3xl">
            Relax on pristine white sand beaches and turquoise waters
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Paradise Awaits</h2>
            <p className="text-lg text-gray-700 max-w-3xl">
              After an exciting safari or mountain trek, unwind on the beautiful beaches of Zanzibar, Pemba, or Mafia Island. Enjoy crystal-clear waters, vibrant coral reefs, and world-class diving and snorkeling. Our beach packages are the perfect way to complete your Tanzania adventure.
            </p>
          </div>

          {/* Beach Packages */}
          <BeachPackagesGrid />

          {/* Activities Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Beach Activities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <div className="text-4xl mb-3">🤿</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Snorkeling</h3>
                <p className="text-gray-600">Explore vibrant coral reefs and marine life</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <div className="text-4xl mb-3">🐠</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Diving</h3>
                <p className="text-gray-600">World-class diving sites with diverse ecosystems</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <div className="text-4xl mb-3">🏛️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Stone Town</h3>
                <p className="text-gray-600">UNESCO World Heritage cultural tours</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <div className="text-4xl mb-3">🌴</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Spice Tours</h3>
                <p className="text-gray-600">Discover Zanzibar's famous spice plantations</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
