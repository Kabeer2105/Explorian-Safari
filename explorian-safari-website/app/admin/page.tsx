import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function AdminDashboard() {
  const session = await auth();

  // Fetch statistics
  const [
    totalBookings,
    pendingBookings,
    paidBookings,
    totalInquiries,
    newInquiries,
    totalPackages,
    activePackages,
    totalPayments,
    completedPayments,
    pendingPayments,
    totalRevenue,
  ] = await Promise.all([
    prisma.booking.count(),
    prisma.booking.count({ where: { status: 'PENDING' } }),
    prisma.booking.count({ where: { status: 'PAID' } }),
    prisma.inquiry.count(),
    prisma.inquiry.count({ where: { status: 'NEW' } }),
    prisma.package.count(),
    prisma.package.count({ where: { active: true } }),
    prisma.payment.count(),
    prisma.payment.count({ where: { status: 'COMPLETED' } }),
    prisma.payment.count({ where: { status: 'PENDING' } }),
    prisma.payment.aggregate({
      where: { status: 'COMPLETED' },
      _sum: { amount: true },
    }),
  ]);

  // Recent bookings
  const recentBookings = await prisma.booking.findMany({
    take: 5,
    orderBy: { created_at: 'desc' },
    include: { Package: true },
  });

  // Recent inquiries
  const recentInquiries = await prisma.inquiry.findMany({
    take: 5,
    orderBy: { created_at: 'desc' },
  });

  return (
    <div>
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 font-heading">Dashboard</h1>
        <p className="mt-3 text-lg text-gray-600">Welcome back, {session?.user?.name || 'Admin'}</p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {/* Total Bookings Card */}
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-4">
              <span className="text-4xl">📅</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Total Bookings</p>
            <p className="text-4xl font-bold text-gray-900 mb-4">{totalBookings}</p>
            <div className="flex gap-3 text-sm pt-4 border-t border-gray-100">
              <span className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full font-medium">
                {pendingBookings} pending
              </span>
              <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full font-medium">
                {paidBookings} paid
              </span>
            </div>
          </div>
        </div>

        {/* Inquiries Card */}
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-xl p-4">
              <span className="text-4xl">✉️</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Inquiries</p>
            <p className="text-4xl font-bold text-gray-900 mb-4">{totalInquiries}</p>
            <div className="pt-4 border-t border-gray-100">
              <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full font-medium text-sm">
                {newInquiries} new inquiries
              </span>
            </div>
          </div>
        </div>

        {/* Packages Card */}
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl p-4">
              <span className="text-4xl">📦</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Packages</p>
            <p className="text-4xl font-bold text-gray-900 mb-4">{totalPackages}</p>
            <div className="pt-4 border-t border-gray-100">
              <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full font-medium text-sm">
                {activePackages} active
              </span>
            </div>
          </div>
        </div>

        {/* Revenue Card */}
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="bg-gradient-to-br from-savanna/20 to-savanna/10 rounded-xl p-4">
              <span className="text-4xl">💰</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Revenue</p>
            <p className="text-4xl font-bold text-gray-900 mb-4">
              ${totalRevenue._sum.amount?.toFixed(0) || 0}
            </p>
            <div className="flex gap-3 text-sm pt-4 border-t border-gray-100">
              <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full font-medium">
                {completedPayments} completed
              </span>
              <span className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full font-medium">
                {pendingPayments} pending
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Bookings */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-primary/5 to-transparent">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 font-heading">Recent Bookings</h2>
              <Link
                href="/admin/bookings"
                className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
              >
                View all →
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {recentBookings.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <span className="text-4xl mb-4 block">📭</span>
                No bookings yet
              </div>
            ) : (
              recentBookings.map((booking) => (
                <Link
                  key={booking.id}
                  href={`/admin/bookings/${booking.id}`}
                  className="block px-8 py-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-lg mb-1">{booking.customer_name}</p>
                      <p className="text-sm text-gray-600 mb-2">
                        {booking.Package?.name || 'Custom Package'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(booking.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div>
                      <span
                        className={`px-4 py-2 text-sm font-semibold rounded-full ${
                          booking.status === 'PAID'
                            ? 'bg-green-100 text-green-800'
                            : booking.status === 'PENDING'
                            ? 'bg-yellow-100 text-yellow-800'
                            : booking.status === 'INQUIRY'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-secondary/5 to-transparent">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 font-heading">Recent Inquiries</h2>
              <Link
                href="/admin/inquiries"
                className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
              >
                View all →
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {recentInquiries.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <span className="text-4xl mb-4 block">📬</span>
                No inquiries yet
              </div>
            ) : (
              recentInquiries.map((inquiry) => (
                <div key={inquiry.id} className="px-8 py-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-lg mb-1">{inquiry.name}</p>
                      <p className="text-sm text-gray-600 mb-2">{inquiry.email}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(inquiry.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div>
                      <span
                        className={`px-4 py-2 text-sm font-semibold rounded-full ${
                          inquiry.status === 'NEW'
                            ? 'bg-orange-100 text-orange-800'
                            : inquiry.status === 'CONTACTED'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {inquiry.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
