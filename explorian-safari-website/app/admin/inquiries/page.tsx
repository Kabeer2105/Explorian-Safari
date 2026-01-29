import prisma from '@/lib/prisma';

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
    orderBy: { createdAt: 'desc' },
  });

  const stats = {
    total: await prisma.inquiry.count(),
    new: await prisma.inquiry.count({ where: { status: 'NEW' } }),
    responded: await prisma.inquiry.count({ where: { status: 'RESPONDED' } }),
    converted: await prisma.inquiry.count({ where: { status: 'CONVERTED' } }),
    closed: await prisma.inquiry.count({ where: { status: 'CLOSED' } }),
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Inquiries</h1>
        <p className="mt-2 text-gray-600">Manage customer inquiries and questions</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Total</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">New</p>
          <p className="text-2xl font-bold text-orange-600">{stats.new}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Responded</p>
          <p className="text-2xl font-bold text-blue-600">{stats.responded}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Converted</p>
          <p className="text-2xl font-bold text-green-600">{stats.converted}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Closed</p>
          <p className="text-2xl font-bold text-gray-600">{stats.closed}</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {['all', 'NEW', 'RESPONDED', 'CONVERTED', 'CLOSED'].map((s) => (
              <a
                key={s}
                href={`/admin/inquiries?status=${s}`}
                className={`px-6 py-3 text-sm font-medium border-b-2 ${
                  (status === s || (!status && s === 'all'))
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {s === 'all' ? 'All' : s}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Inquiries List */}
      <div className="space-y-4">
        {inquiries.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center text-gray-500">
            No inquiries found
          </div>
        ) : (
          inquiries.map((inquiry) => (
            <div key={inquiry.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{inquiry.name}</h3>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        inquiry.status === 'NEW'
                          ? 'bg-orange-100 text-orange-800'
                          : inquiry.status === 'RESPONDED'
                          ? 'bg-blue-100 text-blue-800'
                          : inquiry.status === 'CONVERTED'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {inquiry.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span>📧 {inquiry.email}</span>
                    {inquiry.phone && <span>📞 {inquiry.phone}</span>}
                    {inquiry.country && <span>🌍 {inquiry.country}</span>}
                  </div>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <p>{new Date(inquiry.createdAt).toLocaleDateString()}</p>
                  <p className="text-xs">{new Date(inquiry.createdAt).toLocaleTimeString()}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg">{inquiry.message}</p>
              </div>

              {(inquiry.tripInterest || inquiry.travelDates || inquiry.numberOfGuests) && (
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                  {inquiry.tripInterest && (
                    <span className="bg-blue-50 px-3 py-1 rounded">
                      Interest: {inquiry.tripInterest}
                    </span>
                  )}
                  {inquiry.travelDates && (
                    <span className="bg-green-50 px-3 py-1 rounded">
                      Dates: {inquiry.travelDates}
                    </span>
                  )}
                  {inquiry.numberOfGuests && (
                    <span className="bg-purple-50 px-3 py-1 rounded">
                      Guests: {inquiry.numberOfGuests}
                    </span>
                  )}
                </div>
              )}

              <div className="flex gap-2">
                <a
                  href={`mailto:${inquiry.email}`}
                  className="px-4 py-2 text-sm bg-primary text-white rounded hover:bg-primary-dark transition"
                >
                  Reply via Email
                </a>
                {inquiry.phone && (
                  <a
                    href={`https://wa.me/${inquiry.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition"
                  >
                    WhatsApp
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
