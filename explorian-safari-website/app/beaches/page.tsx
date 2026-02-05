import { prisma } from '@/lib/prisma';
import BeachesPageContent from '@/components/pages/BeachesPageContent';
import { attachTranslationsToMany } from '@/lib/translations-db';

export const dynamic = 'force-dynamic';

export default async function BeachesPage() {
  const beaches = await prisma.package.findMany({
    where: { type: 'BEACH', active: true },
    orderBy: { created_at: 'desc' },
  });

  // Attach translations
  const beachesWithTranslations = await attachTranslationsToMany('package', beaches);

  // Convert to plain objects for client component
  const plainBeaches = beachesWithTranslations.map(pkg => ({
    id: pkg.id,
    name: pkg.name,
    type: pkg.type,
    description: pkg.description,
    badge_label: pkg.badge_label,
    images: pkg.images || '',
    highlights: pkg.highlights || '',
    price_from: Number(pkg.price_from),
    currency: pkg.currency,
    translations: pkg.translations,
  }));

  return <BeachesPageContent packages={plainBeaches} />;
}
