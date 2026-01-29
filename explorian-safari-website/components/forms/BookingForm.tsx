'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function BookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const packageId = searchParams.get('package');

  const [formData, setFormData] = useState({
    package_id: packageId || '',
    customer_name: '',
    email: '',
    phone: '',
    country: '',
    travel_date: '',
    number_of_guests: 1,
    special_requests: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create booking');
      }

      // Redirect based on booking type
      if (data.booking.status === 'INQUIRY') {
        // Less than 7 days - show inquiry confirmation
        router.push(`/booking-success?ref=${data.booking.reference_number}&type=inquiry`);
      } else {
        // 7+ days - redirect to payment
        router.push(`/api/payment/initiate?bookingId=${data.booking.id}`);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Book Your Safari</h2>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Full Name *</label>
          <input
            type="text"
            required
            value={formData.customer_name}
            onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email *</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Phone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Country *</label>
          <input
            type="text"
            required
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Travel Date *</label>
          <input
            type="date"
            required
            value={formData.travel_date}
            onChange={(e) => setFormData({ ...formData, travel_date: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Special Requests</label>
          <textarea
            rows={4}
            value={formData.special_requests}
            onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full bg-primary text-white py-3 rounded-md font-semibold hover:bg-primary-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Processing...' : 'Continue to Payment'}
      </button>

      <p className="mt-4 text-sm text-gray-600 text-center">
        * If your travel date is less than 7 days away, we'll contact you directly to arrange your booking.
      </p>
    </form>
  );
}
