'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Package = {
  id: string;
  name: string;
  slug: string;
  type: string;
  description: string | null;
  highlights: string | null;
  images: string | null;
  badge_label: string | null;
  price_from: number | null;
  currency: string;
  duration_days: number | null;
  featured: boolean;
  active: boolean;
  created_at: string;
  updated_at: string;
  _count: {
    Booking: number;
  };
};

export default function PackagesClient({ packages }: { packages: Package[] }) {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [deleting, setDeleting] = useState<string | null>(null);

  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Safari', value: 'SAFARI' },
    { label: 'Mountains', value: 'MOUNTAIN' },
    { label: 'Beach', value: 'BEACH' },
    { label: 'Day Trip', value: 'DAYTRIP' },
  ];

  const filteredPackages = packages.filter((pkg) => {
    if (activeFilter === 'all') return true;
    return pkg.type === activeFilter;
  });

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      return;
    }

    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/packages/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete package');
      }

      router.refresh();
    } catch (error) {
      console.error('Error deleting package:', error);
      alert('Failed to delete package. Please try again.');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-12 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 font-heading">Safari Packages</h1>
          <p className="mt-3 text-lg text-gray-600">Manage all your safari packages and experiences</p>
        </div>
        <Link
          href="/admin/packages/new"
          className="px-8 py-4 bg-primary text-white rounded-xl hover:bg-primary-dark font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
        >
          ➕ Add New Package
        </Link>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-10">
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6">
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Total</p>
          <p className="text-3xl font-bold text-gray-900">{packages.length}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6">
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Safari</p>
          <p className="text-3xl font-bold text-green-600">
            {packages.filter((p) => p.type === 'SAFARI').length}
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6">
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Mountains</p>
          <p className="text-3xl font-bold text-blue-600">
            {packages.filter((p) => p.type === 'MOUNTAIN').length}
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6">
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Beach</p>
          <p className="text-3xl font-bold text-orange-600">
            {packages.filter((p) => p.type === 'BEACH').length}
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6">
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Day Trips</p>
          <p className="text-3xl font-bold text-purple-600">
            {packages.filter((p) => p.type === 'DAYTRIP').length}
          </p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="bg-white rounded-2xl shadow-lg mb-10 overflow-hidden">
        <div className="border-b border-gray-100">
          <nav className="flex gap-2 p-4">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-6 py-3 text-sm font-semibold rounded-xl transition-all ${
                  activeFilter === filter.value
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Packages Grid */}
      {filteredPackages.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-20 text-center">
          <span className="text-6xl mb-6 block">📦</span>
          <p className="text-gray-500 text-xl">No packages found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => {
            const images = pkg.images ? JSON.parse(pkg.images as string) : [];
            const highlights = pkg.highlights ? JSON.parse(pkg.highlights as string) : [];

            return (
              <div key={pkg.id} className="package-card">
                <div className="package-image-wrapper">
                  {pkg.badge_label && (
                    <span className="package-badge">{pkg.badge_label}</span>
                  )}
                  {!pkg.active && (
                    <span className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full z-10">
                      Inactive
                    </span>
                  )}
                  <img
                    src={images[0] || '/images/placeholder.jpg'}
                    alt={pkg.name}
                    className="package-image"
                  />
                </div>

                <div className="package-content">
                  <div className="package-category-text">{pkg.type}</div>
                  <h3 className="package-title">{pkg.name}</h3>
                  <p className="package-description">
                    {pkg.description ? pkg.description.substring(0, 120) + '...' : 'No description available'}
                  </p>

                  {highlights.length > 0 && (
                    <ul className="package-features">
                      {highlights.slice(0, 3).map((highlight: string, index: number) => (
                        <li key={index}>{highlight}</li>
                      ))}
                    </ul>
                  )}

                  <div className="package-footer">
                    <div className="package-price">
                      <span className="from">From</span>
                      <span className="price">
                        {pkg.price_from ? `${pkg.currency} ${pkg.price_from.toLocaleString()}` : 'Contact Us'}
                      </span>
                      <span className="per-person">per person</span>
                    </div>
                  </div>

                  {/* Admin Actions - Below the package card */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-600">
                        📊 {pkg._count.Booking} {pkg._count.Booking === 1 ? 'booking' : 'bookings'}
                      </span>
                      {pkg.featured && (
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full">
                          ⭐ Featured
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/packages/${pkg.id}`}
                        className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark font-semibold text-center transition-all text-sm"
                      >
                        ✏️ Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(pkg.id, pkg.name)}
                        disabled={deleting === pkg.id}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                      >
                        {deleting === pkg.id ? '...' : '🗑️ Delete'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
