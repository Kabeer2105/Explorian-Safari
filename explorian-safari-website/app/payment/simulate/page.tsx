'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function SimulatePaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookingId = searchParams.get('bookingId');
  const [loading, setLoading] = useState(false);

  const handlePaymentAction = async (status: 'success' | 'failed') => {
    setLoading(true);
    try {
      const response = await fetch(`/api/payment/simulate-complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId, status }),
      });

      const data = await response.json();

      if (response.ok) {
        if (status === 'success') {
          router.push(`/payment/success?ref=${data.booking.reference_number}`);
        } else {
          router.push(`/payment/failed?ref=${data.booking.reference_number}`);
        }
      } else {
        alert('Error processing payment: ' + data.error);
      }
    } catch (error) {
      alert('Error processing payment');
    } finally {
      setLoading(false);
    }
  };

  if (!bookingId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Invalid Payment Link</h1>
          <p className="text-gray-600">No booking ID provided.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">💳</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Simulated Payment</h1>
          <p className="text-gray-600">
            This is a test payment page. In production, you would be redirected to Pesapal.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> This is a simulated payment environment for testing purposes.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handlePaymentAction('success')}
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? 'Processing...' : '✓ Simulate Successful Payment'}
          </button>

          <button
            onClick={() => handlePaymentAction('failed')}
            disabled={loading}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50"
          >
            {loading ? 'Processing...' : '✗ Simulate Failed Payment'}
          </button>

          <button
            onClick={() => router.push('/')}
            className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
