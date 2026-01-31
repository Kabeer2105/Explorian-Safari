import { prisma } from '@/lib/prisma';

export default async function InquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const params = await searchParams;
  const { status } = params;

  const where: any = {};
  if (status && status !== 'all') {
    where.status = status;
  }

  const inquiries = await prisma.inquiry.findMany({
    where,
    orderBy: { created_at: 'desc' },
  });

  const stats = {
    total: await prisma.inquiry.count(),
    new: await prisma.inquiry.count({ where: { status: 'NEW' } }),
    contacted: await prisma.inquiry.count({ where: { status: 'CONTACTED' } }),
    converted: await prisma.inquiry.count({ where: { status: 'CONVERTED' } }),
    closed: await prisma.inquiry.count({ where: { status: 'CLOSED' } }),
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 font-heading">Inquiries</h1>
        <p className="mt-3 text-lg text-gray-600">Manage customer inquiries and questions</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-10">
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6">
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Total</p>
          <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6">
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">New</p>
          <p className="text-3xl font-bold text-orange-600">{stats.new}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6">
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Contacted</p>
          <p className="text-3xl font-bold text-blue-600">{stats.contacted}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6">
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Converted</p>
          <p className="text-3xl font-bold text-green-600">{stats.converted}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6">
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Closed</p>
          <p className="text-3xl font-bold text-gray-600">{stats.closed}</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-2xl shadow-lg mb-10 overflow-hidden">
        <div className="border-b border-gray-100">
          <nav className="flex gap-2 p-4">
            {['all', 'NEW', 'CONTACTED', 'CONVERTED', 'CLOSED'].map((s) => (
              <a
                key={s}
                href={`/admin/inquiries?status=${s}`}
                className={`px-6 py-3 text-sm font-semibold rounded-xl transition-all ${
                  (status === s || (!status && s === 'all'))
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {s === 'all' ? 'All' : s.charAt(0) + s.slice(1).toLowerCase()}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Inquiries List */}
      <div className="space-y-12">
        {inquiries.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-20 text-center">
            <span className="text-6xl mb-6 block">📭</span>
            <p className="text-gray-500 text-xl">No inquiries found</p>
          </div>
        ) : (
          inquiries.map((inquiry) => (
            <div key={inquiry.id} className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow p-12">

              {/* Top Bar: Name and Status */}
              <div className="flex items-center justify-between mb-10 pb-8 border-b-2 border-gray-100">
                <h3 className="text-3xl font-bold text-gray-900">{inquiry.name}</h3>
                <span
                  className={`px-6 py-3 text-base font-bold rounded-full ${
                    inquiry.status === 'NEW'
                      ? 'bg-orange-100 text-orange-800'
                      : inquiry.status === 'CONTACTED'
                      ? 'bg-blue-100 text-blue-800'
                      : inquiry.status === 'CONVERTED'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {inquiry.status}
                </span>
              </div>

              {/* Contact Information */}
              <div className="mb-10 space-y-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-sm font-bold text-gray-500 uppercase tracking-wide w-24">Email:</span>
                  <span className="text-lg text-gray-900">{inquiry.email}</span>
                </div>

                {inquiry.phone && (
                  <div className="flex items-baseline gap-3">
                    <span className="text-sm font-bold text-gray-500 uppercase tracking-wide w-24">Phone:</span>
                    <span className="text-lg text-gray-900">{inquiry.phone}</span>
                  </div>
                )}

                <div className="flex items-baseline gap-3">
                  <span className="text-sm font-bold text-gray-500 uppercase tracking-wide w-24">Date:</span>
                  <span className="text-lg text-gray-900">
                    {new Date(inquiry.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                    {' at '}
                    {new Date(inquiry.created_at).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>

              {/* Message */}
              <div className="mb-10">
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">Customer Message</h4>
                <div className="bg-gray-50 p-8 rounded-2xl">
                  <p className="text-lg text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {inquiry.message}
                  </p>
                </div>
              </div>

              {/* Trip Details */}
              {(inquiry.trip_interest || inquiry.travel_dates) && (
                <div className="mb-10 space-y-4">
                  <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-6">Trip Information</h4>

                  {inquiry.trip_interest && (
                    <div className="flex items-baseline gap-3">
                      <span className="text-sm font-bold text-gray-500 uppercase tracking-wide w-32">Trip Type:</span>
                      <span className="text-lg text-gray-900">{inquiry.trip_interest}</span>
                    </div>
                  )}

                  {inquiry.travel_dates && (
                    <div className="flex items-baseline gap-3">
                      <span className="text-sm font-bold text-gray-500 uppercase tracking-wide w-32">Travel Dates:</span>
                      <span className="text-lg text-gray-900">{inquiry.travel_dates}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 pt-8 border-t-2 border-gray-100">
                <a
                  href={`mailto:${inquiry.email}`}
                  className="px-8 py-4 text-base font-semibold bg-primary text-white rounded-xl hover:bg-primary-dark hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                >
                  📧 Reply via Email
                </a>
                {inquiry.phone && (
                  <a
                    href={`https://wa.me/${inquiry.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 text-base font-semibold bg-green-600 text-white rounded-xl hover:bg-green-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                  >
                    💬 WhatsApp
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
