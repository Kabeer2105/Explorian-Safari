import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { attachTranslations } from '@/lib/translations-db';
import FaqTranslationForm from './FaqTranslationForm';

export default async function EditFaqTranslationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const faqRaw = await prisma.faq.findUnique({
    where: { id },
    select: {
      id: true,
      question: true,
      answer: true,
      category: true,
    },
  });

  if (!faqRaw) {
    notFound();
  }

  // Attach translations
  const faq = await attachTranslations('faq', faqRaw);

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/translations"
          className="text-sm text-primary hover:text-primary-dark mb-4 inline-block"
        >
          ← Back to Translations
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Translate FAQ</h1>
            <p className="mt-2 text-gray-600 line-clamp-2">{faq.question}</p>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-2">
              {faq.category || 'General'}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <FaqTranslationForm faqData={faq} />
      </div>
    </div>
  );
}
