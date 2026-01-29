'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface BookingActionsProps {
  bookingId: string;
  currentStatus: string;
}

export default function BookingActions({ bookingId, currentStatus }: BookingActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const statuses = ['INQUIRY', 'PENDING', 'CONFIRMED', 'PAID', 'CANCELLED'];

  const handleStatusChange = async (newStatus: string) => {
    if (newStatus === currentStatus) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/admin/bookings/${bookingId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      router.refresh();
    } catch (error) {
      alert('Failed to update booking status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <label className="text-sm font-medium text-gray-700">Update Status:</label>
      <select
        value={currentStatus}
        onChange={(e) => handleStatusChange(e.target.value)}
        disabled={loading}
        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary disabled:opacity-50"
      >
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
}
