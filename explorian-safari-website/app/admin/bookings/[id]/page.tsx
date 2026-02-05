import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import BookingActions from '@/components/admin/BookingActions';

export default async function BookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const booking = await prisma.booking.findUnique({
    where: { id },
    include: {
      Package: true,
      Payment: {
        orderBy: { created_at: 'desc' },
      },
    },
  });

  if (!booking) {
    notFound();
  }

  const guestDetails = booking.guest_details ? JSON.parse(booking.guest_details) : null;

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/bookings"
          className="text-sm text-primary hover:text-primary-dark mb-4 inline-block"
        >
          ← Back to Bookings
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Booking {booking.reference_number}
            </h1>
            <p className="mt-2 text-gray-600">
              Created on {new Date(booking.created_at).toLocaleDateString()}
            </p>
          </div>
          <BookingActions bookingId={booking.id} currentStatus={booking.status} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Booking Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Booking Information</h2>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Reference Number</dt>
                <dd className="mt-1 text-sm text-gray-900 font-mono">{booking.reference_number}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="mt-1">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
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
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Package</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {booking.Package?.name || 'Custom Package'}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Travel Date</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {new Date(booking.travel_date).toLocaleDateString()}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Number of Guests</dt>
                <dd className="mt-1 text-sm text-gray-900">{booking.number_of_guests}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Total Amount</dt>
                <dd className="mt-1 text-sm text-gray-900 font-semibold">
                  {booking.total_amount
                    ? `${booking.currency} ${Number(booking.total_amount).toFixed(2)}`
                    : 'Not calculated'}
                </dd>
              </div>
            </dl>

            {booking.special_requests && (
              <div className="mt-6">
                <dt className="text-sm font-medium text-gray-500 mb-2">Special Requests</dt>
                <dd className="text-sm text-gray-900 bg-gray-50 p-4 rounded-lg">
                  {booking.special_requests}
                </dd>
              </div>
            )}
          </div>

          {/* Customer Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Customer Information</h2>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="mt-1 text-sm text-gray-900">{booking.customer_name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <a href={`mailto:${booking.email}`} className="text-primary hover:underline">
                    {booking.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <a href={`tel:${booking.phone}`} className="text-primary hover:underline">
                    {booking.phone}
                  </a>
                </dd>
              </div>
              {booking.country && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Country</dt>
                  <dd className="mt-1 text-sm text-gray-900">{booking.country}</dd>
                </div>
              )}
            </dl>

            {guestDetails && Array.isArray(guestDetails) && guestDetails.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500 mb-3">Guest Details</h3>
                <div className="space-y-2">
                  {guestDetails.map((guest: any, index: number) => (
                    <div key={index} className="text-sm text-gray-900 bg-gray-50 p-3 rounded">
                      Guest {index + 1}: {guest.name || 'N/A'}
                      {guest.age && ` (Age: ${guest.age})`}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Package Details */}
          {booking.Package && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Package Details</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-500">Package Name</p>
                  <p className="text-sm text-gray-900">{booking.Package.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Type</p>
                  <p className="text-sm text-gray-900 capitalize">{booking.Package.type}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Duration</p>
                  <p className="text-sm text-gray-900">{booking.Package.duration_days} days</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Price (per person)</p>
                  <p className="text-sm text-gray-900">
                    {booking.Package.currency} {Number(booking.Package.price_from).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Payment Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Status</h2>
            {booking.Payment.length === 0 ? (
              <p className="text-sm text-gray-500">No payments recorded</p>
            ) : (
              <div className="space-y-3">
                {booking.Payment.map((payment) => (
                  <div key={payment.id} className="border-l-4 border-primary pl-4">
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded ${
                          payment.status === 'COMPLETED'
                            ? 'bg-green-100 text-green-800'
                            : payment.status === 'PENDING'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {payment.status}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {payment.currency} {Number(payment.amount).toFixed(2)}
                    </p>
                    {payment.payment_method && (
                      <p className="text-xs text-gray-500">{payment.payment_method}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      {payment.paid_at
                        ? `Paid on ${new Date(payment.paid_at).toLocaleDateString()}`
                        : `Created on ${new Date(payment.created_at).toLocaleDateString()}`}
                    </p>
                    {payment.transaction_id && (
                      <p className="text-xs text-gray-500 font-mono mt-1">
                        ID: {payment.transaction_id}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <a
                href={`mailto:${booking.email}`}
                className="block w-full px-4 py-2 text-sm text-center bg-primary text-white rounded hover:bg-primary-dark transition"
              >
                Email Customer
              </a>
              <a
                href={`tel:${booking.phone || ''}`}
                className="block w-full px-4 py-2 text-sm text-center bg-secondary text-white rounded hover:bg-secondary-dark transition"
              >
                Call Customer
              </a>
              <a
                href={`https://wa.me/${booking.phone?.replace(/[^0-9]/g, '') || ''}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-4 py-2 text-sm text-center bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
