'use client';

import Link from 'next/link';
import { useTranslations } from '@/lib/language-context';

export default function InquirySuccessPage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-gradient-to-b from-sand/20 to-white">
      {/* Spacious Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="text-center space-y-12">
          {/* Success Icon - Larger and more prominent */}
          <div className="flex justify-center animate-fadeInUp">
            <div className="relative">
              <div className="absolute inset-0 bg-green-400/20 rounded-full blur-3xl"></div>
              <div className="relative rounded-full bg-gradient-to-br from-green-50 to-green-100 p-8 shadow-lg">
                <svg
                  className="w-24 h-24 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Success Message - More spacious typography */}
          <div className="space-y-6 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight">
              {t.inquirySuccess.title}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t.inquirySuccess.subtitle}
            </p>
          </div>

          {/* What Happens Next - More spacious cards */}
          <div
            className="mt-20 animate-fadeInUp"
            style={{ animationDelay: '0.2s' }}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-12">
              {t.inquirySuccess.whatHappensTitle}
            </h2>
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12 text-left">
              {/* Step 1 */}
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 text-white flex items-center justify-center text-xl font-bold shadow-md">
                    1
                  </div>
                  <h3 className="font-semibold text-xl text-gray-900 pt-2">
                    {t.inquirySuccess.step1Title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed pl-16">
                  {t.inquirySuccess.step1Description}
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-secondary/80 text-white flex items-center justify-center text-xl font-bold shadow-md">
                    2
                  </div>
                  <h3 className="font-semibold text-xl text-gray-900 pt-2">
                    {t.inquirySuccess.step2Title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed pl-16">
                  {t.inquirySuccess.step2Description}
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent/80 text-white flex items-center justify-center text-xl font-bold shadow-md">
                    3
                  </div>
                  <h3 className="font-semibold text-xl text-gray-900 pt-2">
                    {t.inquirySuccess.step3Title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed pl-16">
                  {t.inquirySuccess.step3Description}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information - Much more spacious */}
          <div
            className="mt-24 space-y-10 animate-fadeInUp"
            style={{ animationDelay: '0.3s' }}
          >
            <p className="text-xl text-gray-600 font-medium">
              {t.inquirySuccess.needHelp}
            </p>
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-center max-w-4xl mx-auto">
              <a
                href="tel:+255719245540"
                className="inline-flex items-center justify-center gap-4 px-12 py-6 border-2 border-primary text-primary rounded-2xl hover:bg-primary hover:text-white transition-all duration-300 font-semibold text-xl shadow-md hover:shadow-xl"
              >
                <span className="text-3xl">📞</span>
                <span>+255 719 245 540</span>
              </a>
              <a
                href="mailto:info@exploriansafaris.com"
                className="inline-flex items-center justify-center gap-4 px-12 py-6 border-2 border-primary text-primary rounded-2xl hover:bg-primary hover:text-white transition-all duration-300 font-semibold text-xl shadow-md hover:shadow-xl"
              >
                <span className="text-3xl">✉️</span>
                <span>info@exploriansafaris.com</span>
              </a>
            </div>
          </div>

          {/* Action Buttons - Much more spacious */}
          <div
            className="flex flex-col sm:flex-row gap-6 lg:gap-8 justify-center pt-16 animate-fadeInUp max-w-3xl mx-auto"
            style={{ animationDelay: '0.4s' }}
          >
            <Link
              href="/"
              className="inline-flex items-center justify-center px-12 py-6 bg-gradient-to-r from-primary to-primary/90 text-white rounded-2xl hover:shadow-xl transition-all duration-300 font-bold text-xl"
            >
              {t.inquirySuccess.returnHome}
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-12 py-6 border-2 border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-bold text-xl"
            >
              {t.inquirySuccess.browsePakages}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
