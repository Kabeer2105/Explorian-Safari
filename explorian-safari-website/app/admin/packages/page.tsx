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

  // Convert Decimal to number for client component - must serialize completely
  const packages = packagesRaw.map((pkg) => {
    const { price_from, ...rest } = pkg;
    return {
      ...rest,
      price_from: price_from ? parseFloat(price_from.toString()) : null,
    };
  });

  return <PackagesClient packages={packages} />;
}
