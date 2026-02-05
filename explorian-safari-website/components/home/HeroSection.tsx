'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from '@/lib/language-context';

export default function HeroSection() {
  const t = useTranslations();

  return (
    <section className="hero-section relative">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <span className="hero-subtitle">{t.hero.title.toUpperCase()}</span>
        <h1 className="hero-title">{t.hero.title}</h1>
        <p className="hero-description">
          {t.hero.subtitle}
        </p>
        <div className="hero-buttons">
          <Link href="/request-quote" className="btn-primary-large">
            {t.nav.requestQuote}
          </Link>
          <Link href="/safaris" className="btn-secondary-large">
            {t.hero.cta}
          </Link>
        </div>
      </div>

      {/* Logo in bottom right - smooth fade in */}
      <div className="absolute bottom-8 right-8 opacity-70 hover:opacity-90 transition-opacity duration-500 z-10 hidden md:block drop-shadow-2xl">
        <div className="relative w-80 h-80 lg:w-96 lg:h-96">
          <Image
            src="/images/explorian-logo.png"
            alt="Explorian Safaris"
            fill
            sizes="(max-width: 1024px) 320px, 384px"
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
