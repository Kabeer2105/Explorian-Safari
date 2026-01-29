'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RequestQuoteForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    travel_dates: '',
    trip_interest: '',
    number_of_guests: 1,
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send inquiry');
      }

      router.push('/inquiry-success');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6">Request a Travel Offer</h2>
      <p className="text-gray-600 mb-8">
        Tell us about your dream safari and we'll create a customized itinerary just for you.
      </p>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Full Name *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email *</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Phone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Country *</label>
          <input
            type="text"
            required
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Preferred Travel Dates</label>
          <input
            type="text"
            placeholder="e.g., June 2025 or Flexible"
            value={formData.travel_dates}
            onChange={(e) => setFormData({ ...formData, travel_dates: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Number of Guests *</label>
          <input
            type="number"
            min="1"
            required
            value={formData.number_of_guests}
            onChange={(e) => setFormData({ ...formData, number_of_guests: parseInt(e.target.value) })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Trip Interest</label>
        <select
          value={formData.trip_interest}
          onChange={(e) => setFormData({ ...formData, trip_interest: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary"
        >
          <option value="">Select type of safari</option>
          <option value="Wildlife Safari">Wildlife Safari</option>
          <option value="Mount Kilimanjaro">Mount Kilimanjaro Trekking</option>
          <option value="Beach Holiday">Beach Holiday (Zanzibar)</option>
          <option value="Day Trip">Day Trip</option>
          <option value="Custom Safari">Custom Safari Package</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Tell us about your dream safari *</label>
        <textarea
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="What would you like to experience? Any specific preferences or requirements?"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-secondary text-white py-3 rounded-md font-semibold hover:bg-secondary-dark transition disabled:opacity-50"
      >
        {loading ? 'Sending...' : 'Request Travel Offer'}
      </button>
    </form>
  );
}
