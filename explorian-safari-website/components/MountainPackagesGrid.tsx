import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function MountainPackagesGrid() {
  const mountains = await prisma.package.findMany({
    where: { type: 'MOUNTAIN', active: true },
    orderBy: { created_at: 'desc' },
  });

  if (mountains.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="section-desc">No mountain trekking packages available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="packages-grid">
      {mountains.map((pkg) => {
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
                <div className="package-price package-price-mountain">
                  <span className="from">From</span>
                  <span className="price">{pkg.currency} {Number(pkg.price_from).toLocaleString()}</span>
                  <span className="per-person">per person</span>
                </div>
                <Link href={`/book?package=${pkg.id}`} className="btn-book btn-book-mountain">
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
