'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function BookingSuccessContent() {
  const searchParams = useSearchParams();
  const referenceNumber = searchParams.get('ref');
  const type = searchParams.get('type'); // 'inquiry' or 'booking'

  const isInquiry = type === 'inquiry';

  return (
    <>
      {/* Hero Section */}
      <section className="page-hero page-hero-safari">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-subtitle">
            {isInquiry ? 'INQUIRY RECEIVED' : 'BOOKING CONFIRMED'}
          </span>
          <h1 className="hero-title">
            {isInquiry ? 'Thank You!' : 'Booking Successful!'}
          </h1>
          <p className="hero-description">
            {isInquiry
              ? 'We have received your inquiry and will get back to you shortly.'
              : 'Your booking has been confirmed. Check your email for details.'}
          </p>
        </div>
      </section>

      {/* Success Details */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl">
          <div className="bg-green-50 border-2 border-green-500 rounded-lg p-8 mb-8">
            <div className="text-center">
              <div className="text-6xl mb-4">✓</div>
              <h2 className="text-3xl font-bold mb-4 text-green-800">
                {isInquiry ? 'Inquiry Submitted' : 'Booking Confirmed'}
              </h2>
              {referenceNumber && (
                <p className="text-xl mb-2">
                  <span className="font-semibold">Reference Number:</span>{' '}
                  <span className="text-primary font-bold">{referenceNumber}</span>
                </p>
              )}
              <p className="text-gray-600 mt-4">
                {isInquiry
                  ? 'We will review your inquiry and respond within 24 hours.'
                  : 'A confirmation email has been sent to your email address.'}
              </p>
            </div>
          </div>

          <div className="prose max-w-none">
            <h3>What Happens Next?</h3>
            <ol>
              <li>
                <strong>Email Confirmation:</strong> Check your inbox for a detailed confirmation email.
              </li>
              <li>
                <strong>Our Team Will Contact You:</strong> We will reach out within 24-48 hours to finalize details.
              </li>
              <li>
                <strong>Prepare for Your Adventure:</strong> Start getting excited for your Tanzanian experience!
              </li>
            </ol>

            <div className="bg-sand p-6 rounded-lg mt-8">
              <h4 className="mt-0">Need Immediate Assistance?</h4>
              <p>
                Contact us via WhatsApp:{' '}
                <a href="https://wa.me/255719245540" className="text-primary font-bold">
                  +255 719 245 540
                </a>
              </p>
              <p>
                Or email us at:{' '}
                <a href="mailto:info@exploriansafaris.com" className="text-primary font-bold">
                  info@exploriansafaris.com
                </a>
              </p>
            </div>
          </div>

          <div className="mt-8 flex gap-4 justify-center">
            <Link
              href="/"
              className="btn-primary"
            >
              Return to Home
            </Link>
            <Link
              href="/safaris"
              className="btn-secondary"
            >
              Browse More Safaris
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
