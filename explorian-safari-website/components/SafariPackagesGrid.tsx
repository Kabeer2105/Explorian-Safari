import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function SafariPackagesGrid() {
  const safaris = await prisma.package.findMany({
    where: { type: 'SAFARI', active: true },
    orderBy: { created_at: 'desc' },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {safaris.map((safari) => {
        const images = safari.images ? JSON.parse(safari.images) : [];
        const highlights = safari.highlights ? JSON.parse(safari.highlights) : [];

        return (
          <div key={safari.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
            <div className="relative">
              {safari.badge_label && (
                <span className="absolute top-4 right-4 bg-secondary text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                  {safari.badge_label}
                </span>
              )}
              <img
                src={images[0] || '/images/placeholder.jpg'}
                alt={safari.name}
                className="w-full h-64 object-cover"
              />
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">{safari.name}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{safari.description}</p>

              {highlights.length > 0 && (
                <ul className="mb-4 space-y-1">
                  {highlights.slice(0, 3).map((highlight: string, index: number) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <span className="text-sm text-gray-500">From</span>
                  <div className="text-xl font-bold text-primary">
                    {safari.currency} {Number(safari.price_from).toLocaleString()}
                  </div>
                </div>
                <Link
                  href={`/book?package=${safari.id}`}
                  className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
