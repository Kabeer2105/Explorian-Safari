import { prisma } from '@/lib/prisma';
import SafarisPageContent from '@/components/pages/SafarisPageContent';
import { attachTranslationsToMany } from '@/lib/translations-db';

export default async function SafarisPage() {
  const safaris = await prisma.package.findMany({
    where: { type: 'SAFARI', active: true },
    orderBy: { created_at: 'desc' },
  });

  // Attach translations to packages
  const safarisWithTranslations = await attachTranslationsToMany('package', safaris);

  // Convert to plain objects for client component
  const plainSafaris = safarisWithTranslations.map(pkg => ({
    id: pkg.id,
    name: pkg.name,
    type: pkg.type,
    description: pkg.description,
    badge_label: pkg.badge_label,
    images: pkg.images || '',
    highlights: pkg.highlights,
    price_from: Number(pkg.price_from),
    currency: pkg.currency,
    translations: pkg.translations, // Include translations
  }));

  return <SafarisPageContent packages={plainSafaris} />;
}
