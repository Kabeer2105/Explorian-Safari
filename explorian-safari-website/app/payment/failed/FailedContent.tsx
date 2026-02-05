'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function PaymentFailedPage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('ref');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Failed</h1>
          <p className="text-lg text-gray-700 mb-6">
            Unfortunately, your payment could not be processed. Your booking has not been confirmed.
          </p>

          {reference && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <p className="text-sm text-gray-600 mb-2">Booking Reference:</p>
              <p className="text-2xl font-bold text-red-700">{reference}</p>
            </div>
          )}

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6 text-left">
            <h2 className="font-semibold text-lg mb-3">What went wrong?</h2>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• Insufficient funds in your account</li>
              <li>• Payment was cancelled or declined by your bank</li>
              <li>• Network connection issues during payment</li>
              <li>• Incorrect payment details entered</li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6 text-left">
            <h2 className="font-semibold text-lg mb-3">Next Steps:</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-primary mr-2">→</span>
                Try booking again with a different payment method
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">→</span>
                Contact your bank to ensure the transaction is authorized
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">→</span>
                Reach out to our team for manual payment options
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <Link
              href="/book"
              className="block w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition text-center"
            >
              Try Again
            </Link>
            <Link
              href="/contact"
              className="block w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition text-center"
            >
              Contact Support
            </Link>
            <Link
              href="/"
              className="block w-full text-gray-600 py-2 hover:text-gray-900 transition text-center"
            >
              Return to Home
            </Link>
          </div>

          <p className="text-sm text-gray-500 mt-6">
            Need help? WhatsApp us: <a href="https://wa.me/255719245540" className="text-primary hover:underline">+255 719 245 540</a>
          </p>
        </div>
      </div>
    </div>
  );
}
