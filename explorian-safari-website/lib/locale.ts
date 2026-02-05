// Server-side locale detection and management
import { headers } from 'next/headers';

// Re-export everything from locale-config for convenience
export * from './locale-config';
export type { Locale } from './locale-config';

import { locales, defaultLocale, type Locale } from './locale-config';

// Get locale from request headers (Accept-Language) - SERVER ONLY
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
