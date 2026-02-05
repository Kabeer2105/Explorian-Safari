'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('ref');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
          <p className="text-lg text-gray-700 mb-6">
            Your safari booking has been confirmed and payment received.
          </p>

          {reference && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <p className="text-sm text-gray-600 mb-2">Booking Reference:</p>
              <p className="text-2xl font-bold text-green-700">{reference}</p>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6 text-left">
            <h2 className="font-semibold text-lg mb-3">What happens next?</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                You'll receive a confirmation email within 5 minutes
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                Detailed itinerary will be sent 7 days before your trip
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                Our team will contact you to finalize any details
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                Receipt has been sent to your email
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition text-center"
            >
              Return to Home
            </Link>
            <Link
              href="/contact"
              className="block w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition text-center"
            >
              Contact Us
            </Link>
          </div>

          <p className="text-sm text-gray-500 mt-6">
            For immediate assistance, WhatsApp us: <a href="https://wa.me/255719245540" className="text-primary hover:underline">+255 719 245 540</a>
          </p>
        </div>
      </div>
    </div>
  );
}
