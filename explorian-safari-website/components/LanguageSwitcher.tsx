'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    // Remove current locale from pathname if present
    const pathWithoutLocale = pathname.replace(/^\/(en|de|fr|es|zh)/, '');
    // Add new locale to pathname
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    router.push(newPath);
  };

  const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0];

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition">
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="hidden sm:inline text-sm font-medium">{currentLanguage.name}</span>
        <span className="text-xs">▼</span>
      </button>

      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition first:rounded-t-lg last:rounded-b-lg ${
              lang.code === locale ? 'bg-primary-50 text-primary' : ''
            }`}
          >
            <span className="text-lg">{lang.flag}</span>
            <span className="text-sm font-medium">{lang.name}</span>
            {lang.code === locale && <span className="ml-auto text-primary">✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
