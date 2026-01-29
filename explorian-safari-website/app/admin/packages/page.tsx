import prisma from '@/lib/prisma';
import Link from 'next/link';

export default async function PackagesPage() {
  const packages = await prisma.package.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { bookings: true },
      },
    },
  });

  const stats = {
    total: packages.length,
    active: packages.filter((p) => p.active).length,
    inactive: packages.filter((p) => !p.active).length,
    featured: packages.filter((p) => p.featured).length,
  };

  const packagesByType = {
    safari: packages.filter((p) => p.type === 'safari').length,
    mountain: packages.filter((p) => p.type === 'mountain').length,
    beach: packages.filter((p) => p.type === 'beach').length,
    daytrip: packages.filter((p) => p.type === 'daytrip').length,
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Packages</h1>
          <p className="mt-2 text-gray-600">Manage your safari, mountain, beach, and day trip packages</p>
        </div>
        <Link
          href="/admin/packages/new"
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition"
        >
          Add New Package
        </Link>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Total Packages</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Active</p>
          <p className="text-2xl font-bold text-green-600">{stats.active}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Inactive</p>
          <p className="text-2xl font-bold text-gray-600">{stats.inactive}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Featured</p>
          <p className="text-2xl font-bold text-yellow-600">{stats.featured}</p>
        </div>
      </div>

      {/* Type Breakdown */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Safari</p>
          <p className="text-2xl font-bold text-green-700">{packagesByType.safari}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Mountain</p>
          <p className="text-2xl font-bold text-blue-700">{packagesByType.mountain}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Beach</p>
          <p className="text-2xl font-bold text-cyan-600">{packagesByType.beach}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Day Trips</p>
          <p className="text-2xl font-bold text-orange-600">{packagesByType.daytrip}</p>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.length === 0 ? (
          <div className="col-span-full bg-white rounded-lg shadow p-12 text-center text-gray-500">
            No packages yet. Create your first package to get started.
          </div>
        ) : (
          packages.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition">
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{pkg.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded capitalize">
                        {pkg.type}
                      </span>
                      {pkg.featured && (
                        <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">
                          Featured
                        </span>
                      )}
                      {!pkg.active && (
                        <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded">
                          Inactive
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {pkg.shortDescription && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{pkg.shortDescription}</p>
                )}

                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span>{pkg.durationDays} days</span>
                  <span className="font-semibold text-gray-900">
                    {pkg.currency} {Number(pkg.priceFrom).toFixed(0)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{pkg._count.bookings} bookings</span>
                  {pkg.difficultyLevel && (
                    <span className="capitalize">{pkg.difficultyLevel}</span>
                  )}
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/admin/packages/${pkg.id}`}
                    className="flex-1 px-3 py-2 text-sm text-center bg-primary text-white rounded hover:bg-primary-dark transition"
                  >
                    Edit
                  </Link>
                  <Link
                    href={`/${pkg.type === 'safari' ? 'safaris' : pkg.type === 'mountain' ? 'mountains' : pkg.type === 'beach' ? 'beaches' : 'day-trips'}`}
                    target="_blank"
                    className="px-3 py-2 text-sm text-center border border-gray-300 rounded hover:bg-gray-50 transition"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
