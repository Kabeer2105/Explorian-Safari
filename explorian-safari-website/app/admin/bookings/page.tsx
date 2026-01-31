import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import BookingsFilter from '@/components/admin/BookingsFilter';

export default async function BookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; search?: string }>;
}) {
  const params = await searchParams;
  const { status, search } = params;

  // Build where clause
  const where: any = {};
  if (status && status !== 'all') {
    where.status = status;
  }
  if (search) {
    where.OR = [
      { customer_name: { contains: search } },
      { email: { contains: search } },
      { reference_number: { contains: search } },
    ];
  }

  const bookings = await prisma.booking.findMany({
    where,
    include: { Package: true, Payment: true },
    orderBy: { created_at: 'desc' },
  });

  const stats = {
    total: await prisma.booking.count(),
    pending: await prisma.booking.count({ where: { status: 'PENDING' } }),
    inquiry: await prisma.booking.count({ where: { status: 'INQUIRY' } }),
    confirmed: await prisma.booking.count({ where: { status: 'CONFIRMED' } }),
    paid: await prisma.booking.count({ where: { status: 'PAID' } }),
    cancelled: await prisma.booking.count({ where: { status: 'CANCELLED' } }),
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 font-heading">Bookings</h1>
        <p className="mt-3 text-lg text-gray-600">Manage all customer bookings</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-6 mb-10">
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6">
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Total</p>
          <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6">
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Pending</p>
          <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6">
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Inquiry</p>
          <p className="text-3xl font-bold text-blue-600">{stats.inquiry}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6">
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Confirmed</p>
          <p className="text-3xl font-bold text-purple-600">{stats.confirmed}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6">
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Paid</p>
          <p className="text-3xl font-bold text-green-600">{stats.paid}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6">
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Cancelled</p>
          <p className="text-3xl font-bold text-red-600">{stats.cancelled}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <BookingsFilter />
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gradient-to-r from-primary/5 to-transparent">
              <tr>
                <th className="px-8 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Reference
                </th>
                <th className="px-8 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-8 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Package
                </th>
                <th className="px-8 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Travel Date
                </th>
                <th className="px-8 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Guests
                </th>
                <th className="px-8 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-8 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-8 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-8 py-5 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-8 py-16 text-center">
                    <span className="text-5xl mb-4 block">📦</span>
                    <p className="text-gray-500 text-lg">No bookings found</p>
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-6 whitespace-nowrap text-sm font-semibold text-primary">
                      {booking.reference_number}
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">{booking.customer_name}</div>
                      <div className="text-sm text-gray-600">{booking.email}</div>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {booking.Package?.name || <span className="text-gray-500 italic">Custom Package</span>}
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-900">
                      {new Date(booking.travel_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-900 text-center">
                      {booking.number_of_guests}
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap text-sm font-semibold text-gray-900">
                      {booking.total_amount
                        ? `${booking.currency} ${Number(booking.total_amount).toLocaleString()}`
                        : <span className="text-gray-400">-</span>}
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                      <span
                        className={`px-4 py-2 inline-flex text-xs font-bold rounded-full ${
                          booking.status === 'PAID'
                            ? 'bg-green-100 text-green-800'
                            : booking.status === 'CONFIRMED'
                            ? 'bg-purple-100 text-purple-800'
                            : booking.status === 'PENDING'
                            ? 'bg-yellow-100 text-yellow-800'
                            : booking.status === 'INQUIRY'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-500">
                      {new Date(booking.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/admin/bookings/${booking.id}`}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-semibold"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
