import Link from 'next/link';
import PackageForm from '@/components/admin/PackageForm';

export default function NewPackagePage() {
  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/packages"
          className="text-sm text-primary hover:text-primary-dark mb-4 inline-block"
        >
          ← Back to Packages
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Create New Package</h1>
        <p className="mt-2 text-gray-600">Add a new safari, mountain, beach, or day trip package</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <PackageForm />
      </div>
    </div>
  );
}
