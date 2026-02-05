'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { EntityWithTranslations } from '@/lib/translations-db';

const LANGUAGES = [
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
] as const;

const FIELDS: Array<{
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'list';
  help: string;
  rows?: number;
}> = [
  { key: 'name', label: 'Package Name', type: 'text', help: '' },
  { key: 'description', label: 'Description', type: 'textarea', help: 'Full package description', rows: 4 },
  { key: 'highlights', label: 'Highlights', type: 'list', help: 'One highlight per line', rows: 6 },
  { key: 'inclusions', label: 'What\'s Included', type: 'list', help: 'One item per line', rows: 6 },
  { key: 'exclusions', label: 'What\'s Not Included', type: 'list', help: 'One item per line', rows: 6 },
  { key: 'itinerary', label: 'Day-by-Day Itinerary', type: 'textarea', help: 'Describe the daily schedule', rows: 8 },
];

export default function PackageTranslationForm({
  packageData,
}: {
  packageData: EntityWithTranslations & {
    name: string;
    type: string;
    description: string;
    highlights: string | null;
    inclusions: string | null;
    exclusions: string | null;
    itinerary: string | null;
  };
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeLanguage, setActiveLanguage] = useState<'de' | 'fr' | 'es' | 'zh'>('de');

  // Convert JSON array to line-by-line text for list fields
  const convertJsonToList = (jsonStr: string): string => {
    if (!jsonStr || jsonStr.trim() === '' || jsonStr === '[]') return '';
    try {
      const arr = JSON.parse(jsonStr);
      if (Array.isArray(arr)) {
        return arr.join('\n');
      }
      return jsonStr;
    } catch {
      return jsonStr;
    }
  };

  // Initialize form data with existing translations
  const [formData, setFormData] = useState(() => {
    const data: Record<string, Record<string, string>> = {
      de: {},
      fr: {},
      es: {},
      zh: {},
    };

    LANGUAGES.forEach((lang) => {
      FIELDS.forEach((field) => {
        let value = packageData.translations?.[lang.code]?.[field.key] || '';
        // Convert list fields from JSON array to line-by-line format
        if (field.type === 'list' && value) {
          value = convertJsonToList(value);
        }
        data[lang.code][field.key] = value;
      });
    });

    return data;
  });

  // Convert line-by-line text to JSON array for list fields
  const convertListToJson = (text: string): string => {
    if (!text.trim()) return '[]';
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    return JSON.stringify(lines);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Convert form data to translation array format
      const translations: Array<{ field: string; language: string; value: string }> = [];

      LANGUAGES.forEach((lang) => {
        FIELDS.forEach((field) => {
          let value = formData[lang.code][field.key];
          if (value.trim()) {
            // Convert list fields to JSON array format before saving
            if (field.type === 'list') {
              value = convertListToJson(value);
            }
            translations.push({
              field: field.key,
              language: lang.code,
              value,
            });
          }
        });
      });

      const response = await fetch(`/api/admin/translations/package/${packageData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ translations }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save translations');
      }

      router.push('/admin/translations');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-2xl flex items-center gap-3">
          <span className="text-2xl">⚠️</span>
          <span className="font-medium">{error}</span>
        </div>
      )}

      {/* English Original (Read-only) */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-3xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">📝 English Original (Reference)</h2>
        <div className="space-y-4">
          {FIELDS.map((field) => {
            const value = (packageData[field.key as keyof typeof packageData] as string) || '(Not set)';
            const displayValue = field.type === 'list' && value !== '(Not set)'
              ? convertJsonToList(value) || '(Not set)'
              : value;

            return (
              <div key={field.key}>
                <label className="block text-sm font-bold text-gray-700 mb-2">{field.label}</label>
                <div className="bg-white p-4 rounded-lg border border-gray-300 text-gray-700">
                  {field.type === 'textarea' || field.type === 'list' ? (
                    <pre className="whitespace-pre-wrap font-sans">
                      {displayValue}
                    </pre>
                  ) : (
                    <p>{displayValue}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Language Tabs */}
      <div className="flex gap-2 border-b border-gray-200 overflow-x-auto">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            type="button"
            onClick={() => setActiveLanguage(lang.code)}
            className={`px-6 py-3 font-semibold transition-colors whitespace-nowrap ${
              activeLanguage === lang.code
                ? 'text-primary border-b-4 border-primary'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {lang.flag} {lang.name}
          </button>
        ))}
      </div>

      {/* Translation Fields */}
      <div className="bg-gradient-to-br from-primary/5 to-white rounded-3xl shadow-xl p-10 border-2 border-primary/10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {LANGUAGES.find((l) => l.code === activeLanguage)?.flag}{' '}
          {LANGUAGES.find((l) => l.code === activeLanguage)?.name} Translation
        </h2>

        <div className="space-y-6">
          {FIELDS.map((field) => (
            <div key={field.key}>
              <label className="block text-lg font-bold text-gray-800 mb-3">
                {field.label}
                {field.help && <span className="text-sm text-gray-500 font-normal ml-2">({field.help})</span>}
              </label>
              {field.type === 'textarea' || field.type === 'list' ? (
                <textarea
                  value={formData[activeLanguage][field.key]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [activeLanguage]: {
                        ...formData[activeLanguage],
                        [field.key]: e.target.value,
                      },
                    })
                  }
                  rows={field.rows || 6}
                  className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder={`Enter ${LANGUAGES.find((l) => l.code === activeLanguage)?.name} translation...`}
                />
              ) : (
                <input
                  type="text"
                  value={formData[activeLanguage][field.key]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [activeLanguage]: {
                        ...formData[activeLanguage],
                        [field.key]: e.target.value,
                      },
                    })
                  }
                  className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder={`Enter ${LANGUAGES.find((l) => l.code === activeLanguage)?.name} translation...`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-4 bg-primary text-white rounded-2xl hover:bg-primary-dark font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : 'Save All Translations'}
        </button>
        <Link
          href="/admin/translations"
          className="px-8 py-4 bg-gray-200 text-gray-700 rounded-2xl hover:bg-gray-300 font-bold text-lg shadow-lg hover:shadow-xl transition-all"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
