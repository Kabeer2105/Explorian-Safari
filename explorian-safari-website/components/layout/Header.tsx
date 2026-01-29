'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { type Locale } from '@/i18n/index';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLocale, setCurrentLocale] = useState<Locale>('en');
  const t = useTranslations('nav');
  const tCommon = useTranslations('common');

  useEffect(() => {
    // Get locale from cookie on client side
    const localeCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('locale='))
      ?.split('=')[1] as Locale | undefined;
    if (localeCookie) {
      setCurrentLocale(localeCookie);
    }
  }, []);

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/safaris', label: t('safaris') },
    { href: '/mountains', label: t('mountains') },
    { href: '/beaches', label: t('beaches') },
    { href: '/day-trips', label: t('dayTrips') },
    { href: '/about', label: t('about') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200">
      <nav className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center py-6" style={{ gap: '3rem' }}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <span className="text-4xl text-white">🦁</span>
            </div>
            <div className="hidden md:block">
              <h1 className="text-3xl font-bold text-primary leading-tight">
                Explorian Safaris
              </h1>
              <p className="text-base text-gray-600 font-medium">Tanzania Adventures</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center" style={{ gap: '1.5rem', flex: 1 }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="btn btn-secondary"
                style={{
                  background: 'var(--primary-safari)',
                  color: 'white',
                  border: '2px solid var(--primary-safari)',
                  padding: '0.85rem 1.8rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  whiteSpace: 'nowrap'
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button and Language Switcher - Desktop */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/request-quote"
              className="btn btn-primary"
              style={{
                padding: '1rem 2.5rem',
                fontSize: '1.1rem',
                fontWeight: '700',
                whiteSpace: 'nowrap'
              }}
            >
              {tCommon('requestQuote')}
            </Link>
            <LanguageSwitcher currentLocale={currentLocale} />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/request-quote"
                onClick={() => setMobileMenuOpen(false)}
                className="mx-4 mt-4 bg-secondary text-white font-semibold rounded-full hover:bg-secondary-dark transition-all duration-200 shadow-lg flex items-center justify-center px-8 py-3"
              >
                {tCommon('requestQuote')}
              </Link>
              <div className="mx-4 mt-4">
                <LanguageSwitcher currentLocale={currentLocale} />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
