import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import TranslationsClient from './TranslationsClient';

export default async function TranslationsPage() {
  // Fetch all packages with their translation counts
  const packages = await prisma.package.findMany({
    where: { active: true },
    select: {
      id: true,
      name: true,
      type: true,
      translations: {
        select: {
          language: true,
        },
      },
    },
    orderBy: { created_at: 'desc' },
  });

  // Fetch all FAQs with their translation counts
  const faqs = await prisma.faq.findMany({
    where: { active: true },
    select: {
      id: true,
      question: true,
      category: true,
      translations: {
        select: {
          language: true,
        },
      },
    },
    orderBy: { order: 'asc' },
  });

  // Transform data to include translation status
  const packagesWithStatus = packages.map((pkg) => {
    const languages = new Set(pkg.translations.map((t) => t.language));
    return {
      id: pkg.id,
      name: pkg.name,
      type: pkg.type,
      hasDE: languages.has('de'),
      hasFR: languages.has('fr'),
      hasES: languages.has('es'),
      hasZH: languages.has('zh'),
      translationCount: languages.size,
    };
  });

  const faqsWithStatus = faqs.map((faq) => {
    const languages = new Set(faq.translations.map((t) => t.language));
    return {
      id: faq.id,
      question: faq.question,
      category: faq.category || 'General',
      hasDE: languages.has('de'),
      hasFR: languages.has('fr'),
      hasES: languages.has('es'),
      hasZH: languages.has('zh'),
      translationCount: languages.size,
    };
  });

  return (
    <div>
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 font-heading">Content Translations</h1>
        <p className="mt-3 text-lg text-gray-600">
          Manage translations for packages, FAQs, and other dynamic content
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6">
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Total Packages</p>
          <p className="text-3xl font-bold text-gray-900">{packagesWithStatus.length}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6">
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Fully Translated</p>
          <p className="text-3xl font-bold text-green-600">
            {packagesWithStatus.filter((p) => p.translationCount === 4).length}
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6">
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Partially Translated</p>
          <p className="text-3xl font-bold text-yellow-600">
            {packagesWithStatus.filter((p) => p.translationCount > 0 && p.translationCount < 4).length}
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6">
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Not Translated</p>
          <p className="text-3xl font-bold text-red-600">
            {packagesWithStatus.filter((p) => p.translationCount === 0).length}
          </p>
        </div>
      </div>

      <TranslationsClient packages={packagesWithStatus} faqs={faqsWithStatus} />
    </div>
  );
}
