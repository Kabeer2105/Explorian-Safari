'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function PaymentPendingPage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('ref');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <h1 className="text-3xl font-bold text-yellow-600 mb-4">Payment Pending</h1>
          <p className="text-lg text-gray-700 mb-6">
            Your payment is being processed. This may take a few minutes.
          </p>

          {reference && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
              <p className="text-sm text-gray-600 mb-2">Booking Reference:</p>
              <p className="text-2xl font-bold text-yellow-700">{reference}</p>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6 text-left">
            <h2 className="font-semibold text-lg mb-3">What's happening?</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">⌛</span>
                Your bank is verifying the transaction
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">⌛</span>
                Payment confirmation is being processed
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">⌛</span>
                You'll receive an email once payment is confirmed
              </li>
            </ul>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-green-800">
              <strong>Please do not close this page or make another payment.</strong> Your transaction is being processed.
            </p>
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
            Questions? WhatsApp us: <a href="https://wa.me/255719245540" className="text-primary hover:underline">+255 719 245 540</a>
          </p>
        </div>
      </div>
    </div>
  );
}
