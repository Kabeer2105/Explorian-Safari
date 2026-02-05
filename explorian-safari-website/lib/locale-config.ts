// Locale types and constants (safe for client components)

export const locales = ['en', 'de', 'fr', 'es', 'zh'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  de: 'Deutsch',
  fr: 'Français',
  es: 'Español',
  zh: '中文',
};

// Check if locale is valid
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

// Get localized path
export function getLocalizedPath(path: string, locale: Locale): string {
  if (locale === defaultLocale) {
    return path;
  }
  return `/${locale}${path}`;
}

// Remove locale from path
export function removeLocaleFromPath(path: string): string {
  const segments = path.split('/');
  if (segments.length > 1 && locales.includes(segments[1] as Locale)) {
    return '/' + segments.slice(2).join('/');
  }
  return path;
}

// Get locale from URL
export function getLocale(pathname?: string): Locale {
  if (pathname) {
    const segments = pathname.split('/');
    const potentialLocale = segments[1] as Locale;
    if (locales.includes(potentialLocale)) {
      return potentialLocale;
    }
  }
  return defaultLocale;
}
