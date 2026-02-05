import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { attachTranslations } from '@/lib/translations-db';
import PackageTranslationForm from './PackageTranslationForm';

export default async function EditPackageTranslationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const pkgRaw = await prisma.package.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      type: true,
      description: true,
      highlights: true,
      inclusions: true,
      exclusions: true,
      itinerary: true,
    },
  });

  if (!pkgRaw) {
    notFound();
  }

  // Attach translations
  const pkg = await attachTranslations('package', pkgRaw);

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/translations"
          className="text-sm text-primary hover:text-primary-dark mb-4 inline-block"
        >
          ← Back to Translations
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Translate Package</h1>
            <p className="mt-2 text-gray-600">{pkg.name}</p>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mt-2">
              {pkg.type}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <PackageTranslationForm packageData={pkg} />
      </div>
    </div>
  );
}
