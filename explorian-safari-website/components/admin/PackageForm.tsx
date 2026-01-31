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

  // Helper function to convert JSON array to line-by-line text
  const arrayToText = (jsonString: string | null) => {
    if (!jsonString) return '';
    try {
      const arr = JSON.parse(jsonString);
      return Array.isArray(arr) ? arr.join('\n') : '';
    } catch {
      return jsonString || '';
    }
  };

  // Helper function to convert line-by-line text to JSON array
  const textToArray = (text: string) => {
    if (!text.trim()) return '';
    const lines = text.split('\n').filter(line => line.trim());
    return JSON.stringify(lines);
  };

  const [formData, setFormData] = useState({
    name: packageData?.name || '',
    slug: packageData?.slug || '',
    type: packageData?.type || 'SAFARI',
    description: packageData?.description || '',
    highlights: arrayToText(packageData?.highlights),
    inclusions: arrayToText(packageData?.inclusions),
    exclusions: arrayToText(packageData?.exclusions),
    itinerary: packageData?.itinerary || '',
    images: arrayToText(packageData?.images),
    badge_label: packageData?.badge_label || '',
    duration_days: packageData?.duration_days || '',
    price_from: packageData?.price_from || '',
    currency: packageData?.currency || 'USD',
    max_group_size: packageData?.max_group_size || '',
    difficulty_level: packageData?.difficulty_level || '',
    active: packageData?.active ?? true,
    featured: packageData?.featured || false,
  });

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Convert files to data URLs for preview
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImages(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Combine uploaded images with manual URLs
      let allImages = [...uploadedImages];
      if (formData.images.trim()) {
        const manualUrls = formData.images.split('\n').filter(line => line.trim());
        allImages = [...allImages, ...manualUrls];
      }

      // Convert text inputs to JSON arrays
      const submissionData = {
        ...formData,
        highlights: textToArray(formData.highlights),
        inclusions: textToArray(formData.inclusions),
        exclusions: textToArray(formData.exclusions),
        images: allImages.length > 0 ? JSON.stringify(allImages) : '',
      };

      const url = packageData
        ? `/api/admin/packages/${packageData.id}`
        : '/api/admin/packages';
      const method = packageData ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
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
    <div className="max-w-7xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-12">
        {error && (
          <div className="bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-2xl flex items-center gap-3">
            <span className="text-2xl">⚠️</span>
            <span className="font-medium">{error}</span>
          </div>
        )}

        {/* Row 1: Basic Info + Photos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Basic Information */}
          <div className="bg-gradient-to-br from-primary/5 to-white rounded-3xl shadow-xl p-10 border-2 border-primary/10">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-4xl">📋</span>
              <h2 className="text-3xl font-bold text-gray-900">Basic Information</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-lg font-bold text-gray-800 mb-3">
                  Package Name <span className="text-red-500">*</span>
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
                  className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="5-Day Serengeti Safari"
                />
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-800 mb-3">
                  Package Type <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all bg-white"
                >
                  <option value="SAFARI">🦁 Safari</option>
                  <option value="MOUNTAIN">⛰️ Mountain</option>
                  <option value="BEACH">🏖️ Beach</option>
                  <option value="DAYTRIP">🚗 Day Trip</option>
                </select>
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-800 mb-3">
                  Special Label <span className="text-gray-500 text-sm font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={formData.badge_label}
                  onChange={(e) => setFormData({ ...formData, badge_label: e.target.value })}
                  className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="Best Seller"
                />
                <p className="text-sm text-gray-600 mt-2">Orange badge on package</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-lg font-bold text-gray-800 mb-3">
                    Days <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.duration_days}
                    onChange={(e) => setFormData({ ...formData, duration_days: e.target.value })}
                    className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-lg font-bold text-gray-800 mb-3">
                    Currency <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.currency}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                    className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all bg-white"
                  >
                    <option value="USD">💵 USD</option>
                    <option value="EUR">💶 EUR</option>
                    <option value="GBP">💷 GBP</option>
                    <option value="TZS">🇹🇿 TZS</option>
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-bold text-gray-800 mb-3">
                    Price <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.price_from}
                    onChange={(e) => setFormData({ ...formData, price_from: e.target.value })}
                    className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-lg font-bold text-gray-800 mb-3">
                    Max Group <span className="text-gray-500 text-sm font-normal">(optional)</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.max_group_size}
                    onChange={(e) => setFormData({ ...formData, max_group_size: e.target.value })}
                    className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="10"
                  />
                </div>

                <div>
                  <label className="block text-lg font-bold text-gray-800 mb-3">
                    Difficulty <span className="text-gray-500 text-sm font-normal">(optional)</span>
                  </label>
                  <select
                    value={formData.difficulty_level}
                    onChange={(e) => setFormData({ ...formData, difficulty_level: e.target.value })}
                    className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all bg-white"
                  >
                    <option value="">None</option>
                    <option value="Easy">😊 Easy</option>
                    <option value="Moderate">💪 Moderate</option>
                    <option value="Challenging">🏋️ Hard</option>
                    <option value="Extreme">⚡ Extreme</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-6 p-6 bg-white rounded-2xl border-2 border-gray-200">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                    className="w-6 h-6 text-primary rounded-lg focus:ring-primary cursor-pointer"
                  />
                  <span className="text-lg font-bold text-gray-800">✅ Show on Website</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-6 h-6 text-primary rounded-lg focus:ring-primary cursor-pointer"
                  />
                  <span className="text-lg font-bold text-gray-800">⭐ Featured</span>
                </label>
              </div>
            </div>
          </div>

          {/* Package Photos */}
          <div className="bg-gradient-to-br from-orange-50 to-white rounded-3xl shadow-xl p-10 border-2 border-orange-100">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-4xl">📸</span>
              <h2 className="text-3xl font-bold text-gray-900">Package Photos</h2>
            </div>

            <div className="space-y-6">
              {/* Upload from Device */}
              <div>
                <label className="block text-lg font-bold text-gray-800 mb-4">
                  Upload Photos from Your Device
                </label>
                <div className="border-4 border-dashed border-orange-200 rounded-2xl p-8 text-center bg-white hover:bg-orange-50 transition-all cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label htmlFor="photo-upload" className="cursor-pointer">
                    <div className="text-6xl mb-4">📤</div>
                    <p className="text-xl font-bold text-gray-800 mb-2">Click to Upload Photos</p>
                    <p className="text-gray-600">Choose multiple photos from your computer or phone</p>
                  </label>
                </div>

                {/* Image Previews */}
                {uploadedImages.length > 0 && (
                  <div className="mt-6 grid grid-cols-3 gap-4">
                    {uploadedImages.map((img, index) => (
                      <div key={index} className="relative group">
                        <img src={img} alt={`Upload ${index + 1}`} className="w-full h-32 object-cover rounded-xl border-2 border-gray-200" />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity font-bold"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* OR Divider */}
              <div className="flex items-center gap-4">
                <div className="flex-1 border-t-2 border-gray-200"></div>
                <span className="text-gray-500 font-bold">OR</span>
                <div className="flex-1 border-t-2 border-gray-200"></div>
              </div>

              {/* Manual URLs */}
              <div>
                <label className="block text-lg font-bold text-gray-800 mb-3">
                  Paste Image Links (One Per Line)
                </label>
                <textarea
                  rows={4}
                  value={formData.images}
                  onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                  className="w-full px-6 py-4 text-base border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 transition-all font-mono"
                  placeholder="https://example.com/photo1.jpg
https://example.com/photo2.jpg"
                />
                <p className="text-sm text-gray-600 mt-2">If you have photos already uploaded online, paste the links here</p>
              </div>
            </div>
          </div>
        </div>

        {/* Description - Full Width */}
        <div className="bg-gradient-to-br from-green-50 to-white rounded-3xl shadow-xl p-10 border-2 border-green-100">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-4xl">📝</span>
            <h2 className="text-3xl font-bold text-gray-900">Package Description</h2>
          </div>

          <div>
            <label className="block text-lg font-bold text-gray-800 mb-4">
              Tell Customers About This Package <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={6}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-200 focus:border-green-400 transition-all"
              placeholder="Describe what makes this package special, what customers will experience, and why they should book it..."
            />
          </div>
        </div>

        {/* Highlights - Full Width */}
        <div className="bg-gradient-to-br from-yellow-50 to-white rounded-3xl shadow-xl p-10 border-2 border-yellow-100">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-4xl">✨</span>
            <h2 className="text-3xl font-bold text-gray-900">Package Highlights</h2>
          </div>

          <div>
            <label className="block text-lg font-bold text-gray-800 mb-4">
              Best Parts of This Package (One Per Line)
            </label>
            <textarea
              rows={5}
              value={formData.highlights}
              onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
              className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-yellow-200 focus:border-yellow-400 transition-all"
              placeholder="See the Big Five
Expert safari guide
Luxury tented accommodation
Witness the Great Migration"
            />
            <p className="text-sm text-gray-600 mt-3">✓ These appear with checkmarks on your package</p>
          </div>
        </div>

        {/* Row 2: Inclusions + Exclusions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Inclusions */}
          <div className="bg-gradient-to-br from-purple-50 to-white rounded-3xl shadow-xl p-10 border-2 border-purple-100">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-4xl">✅</span>
              <h2 className="text-3xl font-bold text-gray-900">What's Included</h2>
            </div>

            <div>
              <textarea
                rows={8}
                value={formData.inclusions}
                onChange={(e) => setFormData({ ...formData, inclusions: e.target.value })}
                className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-400 transition-all"
                placeholder="Accommodation
All meals
Park entrance fees
Professional guide
Airport transfers"
              />
            </div>
          </div>

          {/* Exclusions */}
          <div className="bg-gradient-to-br from-red-50 to-white rounded-3xl shadow-xl p-10 border-2 border-red-100">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-4xl">❌</span>
              <h2 className="text-3xl font-bold text-gray-900">What's NOT Included</h2>
            </div>

            <div>
              <textarea
                rows={8}
                value={formData.exclusions}
                onChange={(e) => setFormData({ ...formData, exclusions: e.target.value })}
                className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-red-200 focus:border-red-400 transition-all"
                placeholder="International flights
Travel insurance
Tips for guide
Personal expenses
Visa fees"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="sticky bottom-6 bg-white rounded-3xl shadow-2xl p-8 border-4 border-primary/20">
          <div className="flex gap-6 items-center justify-between">
            <button
              type="button"
              onClick={() => router.push('/admin/packages')}
              className="px-10 py-5 border-3 border-gray-300 rounded-2xl hover:bg-gray-100 transition-all font-bold text-xl text-gray-700"
            >
              ← Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-12 py-5 bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl hover:shadow-2xl transition-all disabled:opacity-50 font-bold text-xl transform hover:scale-105"
            >
              {loading ? '⏳ Saving...' : packageData ? '✅ Save Changes' : '➕ Create Package'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
