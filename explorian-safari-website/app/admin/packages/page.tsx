import { prisma } from '@/lib/prisma';
import PackagesClient from './PackagesClient';

export default async function PackagesPage() {
  const packagesRaw = await prisma.package.findMany({
    orderBy: { created_at: 'desc' },
    include: {
      _count: {
        select: { Booking: true },
      },
    },
  });

  // Explicitly convert Decimal fields to numbers for client component
  const packages = packagesRaw.map(pkg => ({
    ...pkg,
    price_from: pkg.price_from ? Number(pkg.price_from) : null,
    created_at: pkg.created_at.toISOString(),
    updated_at: pkg.updated_at.toISOString(),
  }));

  return <PackagesClient packages={packages} />;
}
