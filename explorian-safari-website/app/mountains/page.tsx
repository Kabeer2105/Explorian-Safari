import { prisma } from '@/lib/prisma';
import MountainsPageContent from '@/components/pages/MountainsPageContent';
import { attachTranslationsToMany } from '@/lib/translations-db';

export default async function MountainsPage() {
  const mountains = await prisma.package.findMany({
    where: { type: 'MOUNTAIN', active: true },
    orderBy: { created_at: 'desc' },
  });

  // Attach translations
  const mountainsWithTranslations = await attachTranslationsToMany('package', mountains);

  // Convert to plain objects for client component
  const plainMountains = mountainsWithTranslations.map(pkg => ({
    id: pkg.id,
    name: pkg.name,
    type: pkg.type,
    description: pkg.description,
    badge_label: pkg.badge_label,
    images: pkg.images || '',
    highlights: pkg.highlights,
    price_from: Number(pkg.price_from),
    currency: pkg.currency,
    translations: pkg.translations,
  }));

  return <MountainsPageContent packages={plainMountains} />;
}
