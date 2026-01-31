import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import PackageForm from '@/components/admin/PackageForm';

export default async function EditPackagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const pkg = await prisma.package.findUnique({
    where: { id },
  });

  if (!pkg) {
    notFound();
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/packages"
          className="text-sm text-primary hover:text-primary-dark mb-4 inline-block"
        >
          ← Back to Packages
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Package</h1>
            <p className="mt-2 text-gray-600">{pkg.name}</p>
          </div>
          <div className="flex gap-2">
            <Link
              href={`/${pkg.type === 'safari' ? 'safaris' : pkg.type === 'mountain' ? 'mountains' : pkg.type === 'beach' ? 'beaches' : 'day-trips'}`}
              target="_blank"
              className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition"
            >
              View Live
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <PackageForm packageData={pkg} />
      </div>
    </div>
  );
}
