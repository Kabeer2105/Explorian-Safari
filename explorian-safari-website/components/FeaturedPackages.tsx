import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function FeaturedPackages() {
  const packages = await prisma.package.findMany({
    where: { featured: true, active: true },
    orderBy: { created_at: 'desc' },
  });

  if (packages.length === 0) {
    return null;
  }

  return (
    <section className="section-padding bg-sand-light">
      <div className="container-custom">
        <div className="section-label">OUR EXPERIENCES</div>
        <h2 className="section-title">Featured Safari Packages</h2>
        <p className="section-subtitle">Handpicked adventures for unforgettable experiences</p>

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
                  <div className="package-category">{pkg.type}</div>
                </div>

                <div className="package-content">
                  <h3 className="package-title">{pkg.name}</h3>
                  <p className="package-description">
                    {pkg.description.substring(0, 120)}...
                  </p>

                  {highlights.length > 0 && (
                    <ul className="package-features">
                      {highlights.slice(0, 3).map((highlight: string, index: number) => (
                        <li key={index}>
                          <span className="checkmark">✓</span> {highlight}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="package-footer">
                    <div className="package-price">
                      <span className="from">From</span>
                      <span className="price">{pkg.currency} {Number(pkg.price_from).toLocaleString()}</span>
                      <span className="per-person">per person</span>
                    </div>
                    <Link href={`/book?package=${pkg.id}`} className="btn-primary">
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/safaris" className="btn-secondary-large">
            View All Safaris
          </Link>
        </div>
      </div>
    </section>
  );
}
