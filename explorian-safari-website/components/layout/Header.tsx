'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from '@/lib/language-context';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = useTranslations();

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/safaris', label: t.nav.safaris },
    { href: '/mountains', label: t.nav.mountains },
    { href: '/beaches', label: t.nav.beaches },
    { href: '/day-trips', label: t.nav.dayTrips },
    { href: '/about', label: t.nav.about },
    { href: '/contact', label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200">
      <nav className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center py-3" style={{ gap: '3rem' }}>
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative w-40 h-24 transform group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/images/explorian-logo.png"
                alt="Explorian Safaris Logo"
                fill
                sizes="160px"
                className="object-contain"
                priority
              />
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
              {t.nav.requestQuote}
            </Link>
            <LanguageSwitcher />
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
                {t.nav.requestQuote}
              </Link>
              <div className="mx-4 mt-4">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
