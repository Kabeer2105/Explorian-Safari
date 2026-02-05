'use client';

import Link from 'next/link';
import { useTranslations } from '@/lib/language-context';

interface Package {
  id: string;
  name: string;
  description: string;
  type: string;
  images: string;
  highlights: string | null;
  price_from: number;
  currency: string;
  badge_label: string | null;
}

interface FeaturedPackagesClientProps {
  packages: Package[];
}

export default function FeaturedPackagesClient({ packages }: FeaturedPackagesClientProps) {
  const t = useTranslations();

  if (packages.length === 0) {
    return null;
  }

  return (
    <section className="section-padding bg-sand-light">
      <div className="container-custom">
        <div className="section-label">{t.home.ourExperiencesLabel}</div>
        <h2 className="section-title">{t.home.featuredPackagesTitle}</h2>
        <p className="section-subtitle">{t.home.featuredPackagesSubtitle}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {packages.map((pkg) => {
            const images = pkg.images ? JSON.parse(pkg.images) : [];
            const highlights = pkg.highlights ? JSON.parse(pkg.highlights) : [];

            return (
              <div key={pkg.id} className="package-card">
                <div className="package-image-wrapper">
                  {pkg.badge_label && (
                    <span className="package-badge">{pkg.badge_label}</span>
                  )}
                  <img
                    src={images[0] || '/images/placeholder.jpg'}
                    alt={pkg.name}
                    className="package-image"
                  />
                </div>

                <div className="package-content">
                  <div className="package-category-text">{pkg.type}</div>
                  <h3 className="package-title">{pkg.name}</h3>
                  <p className="package-description">
                    {pkg.description.substring(0, 120)}...
                  </p>

                  {highlights.length > 0 && (
                    <ul className="package-features">
                      {highlights.slice(0, 3).map((highlight: string, index: number) => (
                        <li key={index}>{highlight}</li>
                      ))}
                    </ul>
                  )}

                  <div className="package-footer">
                    <div className="package-price">
                      <span className="from">{t.common.from}</span>
                      <span className="price">{pkg.currency} {Number(pkg.price_from).toLocaleString()}</span>
                      <span className="per-person">{t.common.perPerson}</span>
                    </div>
                    <Link href={`/book?package=${pkg.id}`} className="btn-book">
                      {t.common.bookNow}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
