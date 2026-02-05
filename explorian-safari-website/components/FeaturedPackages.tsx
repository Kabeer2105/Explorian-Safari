import { prisma } from '@/lib/prisma';
import FeaturedPackagesClient from './home/FeaturedPackagesClient';

export default async function FeaturedPackages() {
  const packages = await prisma.package.findMany({
    where: { featured: true, active: true },
    orderBy: { created_at: 'desc' },
  });

  // Convert to plain objects to avoid serialization issues
  const plainPackages = packages.map(pkg => ({
    id: pkg.id,
    name: pkg.name,
    description: pkg.description,
    type: pkg.type,
    images: pkg.images || '[]',
    highlights: pkg.highlights,
    price_from: Number(pkg.price_from),
    currency: pkg.currency,
    badge_label: pkg.badge_label,
  }));

  return <FeaturedPackagesClient packages={plainPackages} />;
}
