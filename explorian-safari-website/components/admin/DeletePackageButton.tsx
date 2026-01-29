'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface DeletePackageButtonProps {
  packageId: string;
  packageName: string;
}

export default function DeletePackageButton({ packageId, packageName }: DeletePackageButtonProps) {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/packages/${packageId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete package');
      }

      router.push('/admin/packages');
      router.refresh();
    } catch (error: any) {
      alert(error.message);
      setLoading(false);
      setShowConfirm(false);
    }
  };

  if (showConfirm) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-sm text-red-800 mb-3">
          Are you sure you want to delete <strong>{packageName}</strong>? This action cannot be undone.
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? 'Deleting...' : 'Yes, Delete'}
          </button>
          <button
            onClick={() => setShowConfirm(false)}
            disabled={loading}
            className="px-4 py-2 bg-white border border-gray-300 text-sm rounded hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="px-4 py-2 text-sm text-red-600 border border-red-300 rounded hover:bg-red-50 transition"
    >
      Delete Package
    </button>
  );
}
