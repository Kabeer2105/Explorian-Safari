import { prisma } from '@/lib/prisma';
import DayTripsPageContent from '@/components/pages/DayTripsPageContent';
import { attachTranslationsToMany } from '@/lib/translations-db';

export default async function DayTripsPage() {
  const dayTrips = await prisma.package.findMany({
    where: { type: 'DAYTRIP', active: true },
    orderBy: { created_at: 'desc' },
  });

  // Attach translations
  const dayTripsWithTranslations = await attachTranslationsToMany('package', dayTrips);

  // Convert to plain objects for client component
  const plainDayTrips = dayTripsWithTranslations.map(trip => ({
    id: trip.id,
    name: trip.name,
    type: trip.type,
    description: trip.description,
    badge_label: trip.badge_label,
    images: trip.images,
    highlights: trip.highlights,
    price_from: Number(trip.price_from),
    currency: trip.currency,
    translations: trip.translations,
  }));

  return <DayTripsPageContent dayTrips={plainDayTrips} />;
}
