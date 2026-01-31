'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function BookingSuccessPage() {
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
            {isInquiry ? 'Thank You!' : 'Your Safari Awaits!'}
          </h1>
          <p className="hero-description">
            {isInquiry
              ? "We've received your booking request and will contact you shortly."
              : "Your booking has been confirmed. Get ready for an unforgettable adventure!"}
          </p>
        </div>
      </section>

      {/* Success Content */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl mx-auto">
          <div className="bg-sand-light p-8 rounded-lg border-2 border-accent-sunset">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">
                {isInquiry ? '📧' : '✅'}
              </div>
              <h2 className="section-title mb-4">
                Your Reference Number
              </h2>
              <div className="text-3xl font-bold text-accent-sunset mb-2">
                {referenceNumber}
              </div>
              <p className="text-gray-600">
                Please save this reference number for your records
              </p>
            </div>

            <div className="space-y-6">
              {isInquiry ? (
                <>
                  <div className="benefit-card">
                    <h3 className="benefit-title">What Happens Next?</h3>
                    <p className="benefit-description">
                      Since your travel date is less than 7 days away, our team will reach out to you within the next few hours to:
                    </p>
                    <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700">
                      <li>Confirm your booking details</li>
                      <li>Discuss available options and customizations</li>
                      <li>Arrange payment and final confirmation</li>
                      <li>Provide pre-departure information</li>
                    </ul>
                  </div>

                  <div className="benefit-card bg-gradient-subtle">
                    <h3 className="benefit-title">Need Immediate Assistance?</h3>
                    <p className="benefit-description mb-4">
                      For urgent inquiries, contact us directly:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <a
                        href="https://wa.me/255719245540"
                        className="btn-primary text-center"
                      >
                        📱 WhatsApp Us
                      </a>
                      <a
                        href="mailto:info@exploriansafaris.com"
                        className="btn-secondary text-center"
                      >
                        ✉️ Email Us
                      </a>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="benefit-card">
                    <h3 className="benefit-title">✅ Booking Confirmed</h3>
                    <p className="benefit-description">
                      Your safari booking has been confirmed! We've sent a confirmation email with all the details.
                    </p>
                  </div>

                  <div className="benefit-card">
                    <h3 className="benefit-title">📋 What's Included</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li>Detailed itinerary (sent via email)</li>
                      <li>Pre-departure information</li>
                      <li>Packing list and travel tips</li>
                      <li>Emergency contacts</li>
                    </ul>
                  </div>

                  <div className="benefit-card">
                    <h3 className="benefit-title">💳 Payment Confirmation</h3>
                    <p className="benefit-description">
                      Your payment has been processed securely through Pesapal. You'll receive a separate payment receipt via email.
                    </p>
                  </div>

                  <div className="benefit-card bg-gradient-subtle">
                    <h3 className="benefit-title">Questions?</h3>
                    <p className="benefit-description mb-4">
                      Our team is here to help with any questions about your upcoming safari.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <a
                        href="https://wa.me/255719245540"
                        className="btn-primary text-center"
                      >
                        📱 WhatsApp Us
                      </a>
                      <a
                        href="mailto:info@exploriansafaris.com"
                        className="btn-secondary text-center"
                      >
                        ✉️ Email Us
                      </a>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="mt-8 text-center">
              <Link href="/" className="btn-secondary inline-block">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="section-padding bg-gradient-subtle">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="section-title">You're in Good Hands</h2>
            <p className="section-desc mb-8">
              Explorian Safaris has been creating unforgettable African experiences since 2015.
              We're fully licensed and committed to sustainable tourism.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="benefit-card text-center">
                <div className="benefit-icon mx-auto">⭐</div>
                <p className="benefit-title">4.8/5 Rating</p>
              </div>
              <div className="benefit-card text-center">
                <div className="benefit-icon mx-auto">🏆</div>
                <p className="benefit-title">Licensed</p>
              </div>
              <div className="benefit-card text-center">
                <div className="benefit-icon mx-auto">🎯</div>
                <p className="benefit-title">9+ Years</p>
              </div>
              <div className="benefit-card text-center">
                <div className="benefit-icon mx-auto">😊</div>
                <p className="benefit-title">100% Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
