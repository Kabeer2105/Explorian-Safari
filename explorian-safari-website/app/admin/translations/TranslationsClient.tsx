'use client';

import { useState } from 'react';
import Link from 'next/link';

type PackageWithStatus = {
  id: string;
  name: string;
  type: string;
  hasDE: boolean;
  hasFR: boolean;
  hasES: boolean;
  hasZH: boolean;
  translationCount: number;
};

type FaqWithStatus = {
  id: string;
  question: string;
  category: string;
  hasDE: boolean;
  hasFR: boolean;
  hasES: boolean;
  hasZH: boolean;
  translationCount: number;
};

export default function TranslationsClient({
  packages,
  faqs,
}: {
  packages: PackageWithStatus[];
  faqs: FaqWithStatus[];
}) {
  const [activeTab, setActiveTab] = useState<'packages' | 'faqs'>('packages');
  const [filterStatus, setFilterStatus] = useState<'all' | 'complete' | 'partial' | 'none'>('all');

  const filteredPackages = packages.filter((pkg) => {
    if (filterStatus === 'complete') return pkg.translationCount === 4;
    if (filterStatus === 'partial') return pkg.translationCount > 0 && pkg.translationCount < 4;
    if (filterStatus === 'none') return pkg.translationCount === 0;
    return true;
  });

  const filteredFaqs = faqs.filter((faq) => {
    if (filterStatus === 'complete') return faq.translationCount === 4;
    if (filterStatus === 'partial') return faq.translationCount > 0 && faq.translationCount < 4;
    if (filterStatus === 'none') return faq.translationCount === 0;
    return true;
  });

  const LanguageIndicator = ({ has }: { has: boolean }) => (
    <span
      className={`inline-block w-3 h-3 rounded-full ${
        has ? 'bg-green-500' : 'bg-gray-300'
      }`}
      title={has ? 'Translated' : 'Not translated'}
    />
  );

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('packages')}
          className={`px-6 py-3 font-semibold transition-colors ${
            activeTab === 'packages'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Packages ({packages.length})
        </button>
        <button
          onClick={() => setActiveTab('faqs')}
          className={`px-6 py-3 font-semibold transition-colors ${
            activeTab === 'faqs'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          FAQs ({faqs.length})
        </button>
      </div>

      {/* Filter */}
      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setFilterStatus('all')}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            filterStatus === 'all'
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilterStatus('complete')}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            filterStatus === 'complete'
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          ✓ Complete (4/4)
        </button>
        <button
          onClick={() => setFilterStatus('partial')}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            filterStatus === 'partial'
              ? 'bg-yellow-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          ⚠ Partial
        </button>
        <button
          onClick={() => setFilterStatus('none')}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            filterStatus === 'none'
              ? 'bg-red-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          ✗ None
        </button>
      </div>

      {/* Packages Tab */}
      {activeTab === 'packages' && (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Package Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Translations
                </th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">
                  DE
                </th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">
                  FR
                </th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">
                  ES
                </th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">
                  ZH
                </th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPackages.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                    No packages found with the selected filter.
                  </td>
                </tr>
              ) : (
                filteredPackages.map((pkg) => (
                  <tr key={pkg.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900">{pkg.name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {pkg.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${
                          pkg.translationCount === 4
                            ? 'bg-green-100 text-green-800'
                            : pkg.translationCount > 0
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {pkg.translationCount}/4
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <LanguageIndicator has={pkg.hasDE} />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <LanguageIndicator has={pkg.hasFR} />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <LanguageIndicator has={pkg.hasES} />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <LanguageIndicator has={pkg.hasZH} />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Link
                        href={`/admin/translations/package/${pkg.id}`}
                        className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition font-medium"
                      >
                        {pkg.translationCount === 0 ? '+ Add' : '✎ Edit'}
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* FAQs Tab */}
      {activeTab === 'faqs' && (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Question
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Translations
                </th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">
                  DE
                </th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">
                  FR
                </th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">
                  ES
                </th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">
                  ZH
                </th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredFaqs.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                    No FAQs found with the selected filter.
                  </td>
                </tr>
              ) : (
                filteredFaqs.map((faq) => (
                  <tr key={faq.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900 line-clamp-2">{faq.question}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {faq.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${
                          faq.translationCount === 4
                            ? 'bg-green-100 text-green-800'
                            : faq.translationCount > 0
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {faq.translationCount}/4
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <LanguageIndicator has={faq.hasDE} />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <LanguageIndicator has={faq.hasFR} />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <LanguageIndicator has={faq.hasES} />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <LanguageIndicator has={faq.hasZH} />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Link
                        href={`/admin/translations/faq/${faq.id}`}
                        className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition font-medium"
                      >
                        {faq.translationCount === 0 ? '+ Add' : '✎ Edit'}
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
