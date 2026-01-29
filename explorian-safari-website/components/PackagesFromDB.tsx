import { prisma } from '@/lib/prisma';
import Link from 'next/link';

interface PackagesFromDBProps {
  type?: 'SAFARI' | 'MOUNTAIN' | 'BEACH' | 'DAYTRIP';
  limit?: number;
}

export default async function PackagesFromDB({ type, limit }: PackagesFromDBProps) {
  const packages = await prisma.package.findMany({
    where: {
      active: true,
      ...(type && { type }),
    },
    orderBy: { created_at: 'desc' },
    ...(limit && { take: limit }),
  });

  if (packages.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No packages available at the moment.</p>
        <Link href="/request-quote" className="mt-4 inline-block text-primary hover:underline">
          Request a custom package →
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {packages.map((pkg) => {
        const images = pkg.images ? JSON.parse(pkg.images) : [];
        const highlights = pkg.highlights ? JSON.parse(pkg.highlights) : [];

        return (
          <div key={pkg.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
            <div className="relative">
              {pkg.badge_label && (
                <span className="absolute top-4 right-4 bg-secondary text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                  {pkg.badge_label}
                </span>
              )}
              <img
                src={images[0] || '/images/placeholder.jpg'}
                alt={pkg.name}
                className="w-full h-64 object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-semibold">
                {pkg.type}
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{pkg.description}</p>

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

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div>
                  <span className="text-sm text-gray-500">From</span>
                  <div className="text-xl font-bold text-primary">
                    {pkg.currency} {Number(pkg.price_from).toLocaleString()}
                  </div>
                  <span className="text-xs text-gray-500">per person</span>
                </div>
                <Link
                  href={`/book?package=${pkg.id}`}
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
  );
}
