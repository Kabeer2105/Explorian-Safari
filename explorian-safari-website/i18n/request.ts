import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';
import { locales, defaultLocale, type Locale } from '@/lib/locale';

export default getRequestConfig(async () => {
  // Get locale from headers or URL
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';

  let locale: Locale = defaultLocale;

  // Check if pathname starts with a locale
  const segments = pathname.split('/');
  const potentialLocale = segments[1];

  if (locales.includes(potentialLocale as Locale)) {
    locale = potentialLocale as Locale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
