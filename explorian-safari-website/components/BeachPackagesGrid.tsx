import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function BeachPackagesGrid() {
  const beaches = await prisma.package.findMany({
    where: { type: 'BEACH', active: true },
    orderBy: { created_at: 'desc' },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {beaches.map((beach) => {
        const images = beach.images ? JSON.parse(beach.images) : [];
        const highlights = beach.highlights ? JSON.parse(beach.highlights) : [];

        return (
          <div key={beach.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
            <div className="relative">
              {beach.badge_label && (
                <span className="absolute top-4 right-4 bg-secondary text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                  {beach.badge_label}
                </span>
              )}
              <img
                src={images[0] || '/images/placeholder.jpg'}
                alt={beach.name}
                className="w-full h-64 object-cover"
              />
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">{beach.name}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{beach.description}</p>

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
                    {beach.currency} {Number(beach.price_from).toLocaleString()}
                  </div>
                </div>
                <Link
                  href={`/book?package=${beach.id}`}
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
