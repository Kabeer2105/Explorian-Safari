import MountainPackagesGrid from '@/components/MountainPackagesGrid';

export default function MountainsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-700 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Mountain Trekking</h1>
          <p className="text-xl text-gray-100 max-w-3xl">
            Conquer Africa's highest peaks with our expert mountain guides
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Reach New Heights</h2>
            <p className="text-lg text-gray-700 max-w-3xl">
              Challenge yourself with a trek up Mount Kilimanjaro (5,895m) or Mount Meru (4,566m). Our experienced mountain guides ensure your safety while you experience the breathtaking beauty of Tanzania's peaks. We offer multiple routes to suit different skill levels and preferences.
            </p>
          </div>

          {/* Mountain Packages */}
          <MountainPackagesGrid />

          {/* Info Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Best Time to Climb</h3>
              <p className="text-gray-700">
                January-March and June-October offer the best weather conditions for mountain trekking, with clear skies and minimal rainfall.
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What's Included</h3>
              <p className="text-gray-700">
                All our treks include professional guides, porters, camping equipment, meals on the mountain, and park fees.
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Success Rate</h3>
              <p className="text-gray-700">
                Our routes are designed for optimal acclimatization, giving you the best chance of reaching the summit successfully.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
