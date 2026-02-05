'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function PaymentErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-3xl font-bold text-orange-600 mb-4">Payment Error</h1>
          <p className="text-lg text-gray-700 mb-6">
            An unexpected error occurred while processing your payment.
          </p>

          {error && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-6">
              <p className="text-sm text-gray-600 mb-2">Error Details:</p>
              <p className="text-sm font-mono text-orange-700">{error}</p>
            </div>
          )}

          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6 text-left">
            <h2 className="font-semibold text-lg mb-3">What should I do?</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-primary mr-2">1.</span>
                Check your internet connection and try again
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">2.</span>
                Refresh this page and attempt the payment again
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">3.</span>
                If the error persists, contact our support team
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> No charges have been made to your account. You can safely try again.
            </p>
          </div>

          <div className="space-y-3">
            <Link
              href="/book"
              className="block w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition text-center"
            >
              Try Booking Again
            </Link>
            <Link
              href="/contact"
              className="block w-full bg-secondary text-white py-3 rounded-lg font-semibold hover:bg-secondary-dark transition text-center"
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
            Need immediate help? WhatsApp us: <a href="https://wa.me/255719245540" className="text-primary hover:underline">+255 719 245 540</a>
          </p>
        </div>
      </div>
    </div>
  );
}
