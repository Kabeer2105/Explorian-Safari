import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function FAQPage() {
  const faqs = await prisma.faq.findMany({
    orderBy: { order: 'asc' },
  });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">FAQ Management</h1>
          <p className="mt-2 text-gray-600">Manage frequently asked questions</p>
        </div>
        <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition">
          Add FAQ
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        {faqs.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <p>No FAQs yet. Create your first FAQ to get started.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {faqs.map((faq) => (
              <div key={faq.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                      {!faq.active && (
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                          Inactive
                        </span>
                      )}
                      {faq.category && (
                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                          {faq.category}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 mt-2">{faq.answer}</p>
                    <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                      <span>Order: {faq.order}</span>
                      <span>•</span>
                      <span>Updated: {new Date(faq.updated_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button className="px-3 py-1 text-sm text-primary hover:text-primary-dark">
                      Edit
                    </button>
                    <button className="px-3 py-1 text-sm text-red-600 hover:text-red-700">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
