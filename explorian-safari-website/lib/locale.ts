// Locale detection and management
import { headers } from 'next/headers';

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

// Get locale from URL or cookies
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

// Get locale from request headers (Accept-Language)
export async function getLocaleFromHeaders(): Promise<Locale> {
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language') || '';

  // Parse Accept-Language header (e.g., "en-US,en;q=0.9,de;q=0.8")
  const languages = acceptLanguage
    .split(',')
    .map(lang => lang.split(';')[0].trim().toLowerCase().substring(0, 2));

  // Find first matching locale
  for (const lang of languages) {
    if (locales.includes(lang as Locale)) {
      return lang as Locale;
    }
  }

  return defaultLocale;
}

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
