import SafariPackagesGrid from '@/components/SafariPackagesGrid';

export default function SafarisPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-700 to-green-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Safari Packages</h1>
          <p className="text-xl text-gray-100 max-w-3xl">
            Experience the incredible wildlife of Tanzania's world-famous national parks
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Tanzania's Wildlife</h2>
            <p className="text-lg text-gray-700 max-w-3xl">
              From the vast plains of Serengeti to the unique ecosystem of Ngorongoro Crater, our safari packages offer unforgettable wildlife viewing experiences. Witness the Great Migration, spot the Big Five, and immerse yourself in the natural beauty of East Africa.
            </p>
          </div>

          {/* Safari Packages */}
          <SafariPackagesGrid />
        </div>
      </section>
    </div>
  );
}
