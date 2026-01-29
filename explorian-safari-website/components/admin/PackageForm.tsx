'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface PackageFormProps {
  packageData?: any;
}

export default function PackageForm({ packageData }: PackageFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: packageData?.name || '',
    slug: packageData?.slug || '',
    type: packageData?.type || 'safari',
    shortDescription: packageData?.shortDescription || '',
    description: packageData?.description || '',
    highlights: packageData?.highlights || '',
    inclusions: packageData?.inclusions || '',
    exclusions: packageData?.exclusions || '',
    itinerary: packageData?.itinerary || '',
    durationDays: packageData?.durationDays || '',
    priceFrom: packageData?.priceFrom || '',
    currency: packageData?.currency || 'USD',
    maxGroupSize: packageData?.maxGroupSize || '',
    difficultyLevel: packageData?.difficultyLevel || 'easy',
    active: packageData?.active ?? true,
    featured: packageData?.featured || false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const url = packageData
        ? `/api/admin/packages/${packageData.id}`
        : '/api/admin/packages';
      const method = packageData ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save package');
      }

      router.push('/admin/packages');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Package Name *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => {
              setFormData({
                ...formData,
                name: e.target.value,
                slug: packageData ? formData.slug : generateSlug(e.target.value),
              });
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Slug (URL) *
          </label>
          <input
            type="text"
            required
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary font-mono text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
          <select
            required
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
          >
            <option value="safari">Safari</option>
            <option value="mountain">Mountain</option>
            <option value="beach">Beach</option>
            <option value="daytrip">Day Trip</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Difficulty Level
          </label>
          <select
            value={formData.difficultyLevel}
            onChange={(e) => setFormData({ ...formData, difficultyLevel: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
          >
            <option value="easy">Easy</option>
            <option value="moderate">Moderate</option>
            <option value="challenging">Challenging</option>
            <option value="extreme">Extreme</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duration (days) *
          </label>
          <input
            type="number"
            required
            min="1"
            value={formData.durationDays}
            onChange={(e) => setFormData({ ...formData, durationDays: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price From *
          </label>
          <div className="flex gap-2">
            <select
              value={formData.currency}
              onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
              className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="TZS">TZS</option>
            </select>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              value={formData.priceFrom}
              onChange={(e) => setFormData({ ...formData, priceFrom: e.target.value })}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Group Size
          </label>
          <input
            type="number"
            min="1"
            value={formData.maxGroupSize}
            onChange={(e) => setFormData({ ...formData, maxGroupSize: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
          />
        </div>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.active}
              onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
              className="w-4 h-4 text-primary rounded focus:ring-primary"
            />
            <span className="text-sm font-medium text-gray-700">Active</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 text-primary rounded focus:ring-primary"
            />
            <span className="text-sm font-medium text-gray-700">Featured</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Short Description
        </label>
        <input
          type="text"
          value={formData.shortDescription}
          onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
          placeholder="Brief one-line description"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description *
        </label>
        <textarea
          required
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Highlights (JSON array or text)
        </label>
        <textarea
          rows={3}
          value={formData.highlights}
          onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary font-mono text-sm"
          placeholder='["Highlight 1", "Highlight 2", "Highlight 3"]'
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Inclusions (JSON array or text)
        </label>
        <textarea
          rows={3}
          value={formData.inclusions}
          onChange={(e) => setFormData({ ...formData, inclusions: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary font-mono text-sm"
          placeholder='["Inclusion 1", "Inclusion 2"]'
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Exclusions (JSON array or text)
        </label>
        <textarea
          rows={3}
          value={formData.exclusions}
          onChange={(e) => setFormData({ ...formData, exclusions: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary font-mono text-sm"
          placeholder='["Exclusion 1", "Exclusion 2"]'
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Itinerary (JSON or text)
        </label>
        <textarea
          rows={6}
          value={formData.itinerary}
          onChange={(e) => setFormData({ ...formData, itinerary: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary font-mono text-sm"
          placeholder='[{"day": 1, "title": "Day 1", "description": "..."}]'
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition disabled:opacity-50"
        >
          {loading ? 'Saving...' : packageData ? 'Update Package' : 'Create Package'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/packages')}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
