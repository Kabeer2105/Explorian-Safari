// Translation utilities for database content
import prisma from './prisma';
import type { Locale } from './locale';

// Get translations from database
export async function getTranslation(
  key: string,
  locale: Locale = 'en'
): Promise<string | null> {
  try {
    const translation = await prisma.setting.findUnique({
      where: { key: `${key}_${locale}` },
    });

    return translation?.value || null;
  } catch (error) {
    console.error('Error getting translation:', error);
    return null;
  }
}

// Get all translations for a key
export async function getAllTranslations(key: string): Promise<Record<Locale, string>> {
  const locales: Locale[] = ['en', 'de', 'fr', 'es', 'zh'];
  const translations: Partial<Record<Locale, string>> = {};

  await Promise.all(
    locales.map(async (locale) => {
      const value = await getTranslation(key, locale);
      if (value) {
        translations[locale] = value;
      }
    })
  );

  return translations as Record<Locale, string>;
}

// Save translation
export async function saveTranslation(
  key: string,
  locale: Locale,
  value: string
): Promise<void> {
  try {
    await prisma.setting.upsert({
      where: { key: `${key}_${locale}` },
      update: { value },
      create: {
        key: `${key}_${locale}`,
        value,
        type: 'TEXT',
        description: `Translation for ${key} in ${locale}`,
      },
    });
  } catch (error) {
    console.error('Error saving translation:', error);
    throw error;
  }
}

// Delete translation
export async function deleteTranslation(key: string, locale: Locale): Promise<void> {
  try {
    await prisma.setting.delete({
      where: { key: `${key}_${locale}` },
    });
  } catch (error) {
    console.error('Error deleting translation:', error);
    throw error;
  }
}

// Translate package content
export function translatePackage(pkg: any, locale: Locale) {
  if (locale === 'en' || !pkg.translations) {
    return pkg;
  }

  const translation = pkg.translations?.[locale];
  if (!translation) {
    return pkg;
  }

  return {
    ...pkg,
    name: translation.name || pkg.name,
    shortDescription: translation.shortDescription || pkg.shortDescription,
    description: translation.description || pkg.description,
    highlights: translation.highlights || pkg.highlights,
    inclusions: translation.inclusions || pkg.inclusions,
    exclusions: translation.exclusions || pkg.exclusions,
    itinerary: translation.itinerary || pkg.itinerary,
  };
}
