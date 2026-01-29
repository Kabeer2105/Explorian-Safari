import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function DayTripsPage() {
  const dayTrips = await prisma.package.findMany({
    where: { type: 'DAYTRIP', active: true },
    orderBy: { created_at: 'desc' },
  });

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Day Trips & Excursions</h1>
            <p className="text-lg text-gray-600">
              Explore Tanzania's hidden gems with our curated day trips. Perfect for adding to your safari or as standalone adventures.
            </p>
          </div>

          {dayTrips.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No day trips available at the moment. Please check back soon!</p>
              <Link href="/contact" className="mt-4 inline-block text-primary hover:underline">
                Contact us for custom day trips →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {dayTrips.map((trip) => {
                const images = trip.images ? JSON.parse(trip.images) : [];
                const highlights = trip.highlights ? JSON.parse(trip.highlights) : [];

                return (
                  <div key={trip.id} className="package-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
                    <div className="relative">
                      {trip.badge_label && (
                        <span className="absolute top-4 right-4 bg-secondary text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                          {trip.badge_label}
                        </span>
                      )}
                      <img
                        src={images[0] || '/images/placeholder.jpg'}
                        alt={trip.name}
                        className="w-full h-64 object-cover"
                      />
                    </div>

                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{trip.name}</h3>
                      <p className="text-gray-600 mb-4">{trip.description.substring(0, 150)}...</p>

                      {highlights.length > 0 && (
                        <ul className="mb-4 space-y-2">
                          {highlights.slice(0, 3).map((highlight: string, index: number) => (
                            <li key={index} className="text-sm text-gray-700 flex items-start">
                              <span className="text-primary mr-2">✓</span>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div>
                          <span className="text-sm text-gray-500">From</span>
                          <div className="text-2xl font-bold text-primary">
                            {trip.currency} {Number(trip.price_from).toLocaleString()}
                          </div>
                          <span className="text-sm text-gray-500">per person</span>
                        </div>
                        <Link
                          href={`/book?package=${trip.id}`}
                          className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition font-semibold"
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link href="/request-quote" className="btn-secondary-large">
              Request Custom Day Trip →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
