import { prisma } from './prisma';
import type { Locale } from './locale';

// Get translation for a specific field
export async function getTranslation(
  entityType: string,
  entityId: string,
  field: string,
  language: Locale,
  fallbackValue?: string
): Promise<string> {
  try {
    const translation = await prisma.translation.findUnique({
      where: {
        entity_type_entity_id_field_language: {
          entity_type: entityType,
          entity_id: entityId,
          field,
          language,
        },
      },
    });

    return translation?.value || fallbackValue || '';
  } catch (error) {
    console.error('Error getting translation:', error);
    return fallbackValue || '';
  }
}

// Get all translations for an entity
export async function getEntityTranslations(
  entityType: string,
  entityId: string,
  language: Locale
): Promise<Record<string, string>> {
  try {
    const translations = await prisma.translation.findMany({
      where: {
        entity_type: entityType,
        entity_id: entityId,
        language,
      },
    });

    return translations.reduce((acc, t) => {
      acc[t.field] = t.value;
      return acc;
    }, {} as Record<string, string>);
  } catch (error) {
    console.error('Error getting entity translations:', error);
    return {};
  }
}

// Get translated package
export async function getTranslatedPackage(packageId: string, language: Locale) {
  const pkg = await prisma.package.findUnique({
    where: { id: packageId },
  });

  if (!pkg) return null;

  // If English, return original
  if (language === 'en') {
    return pkg;
  }

  // Get translations
  const translations = await getEntityTranslations('package', packageId, language);

  return {
    ...pkg,
    name: translations.name || pkg.name,
    description: translations.description || pkg.description,
    highlights: translations.highlights || pkg.highlights,
    inclusions: translations.inclusions || pkg.inclusions,
    exclusions: translations.exclusions || pkg.exclusions,
    itinerary: translations.itinerary || pkg.itinerary,
  };
}

// Get translated FAQ
export async function getTranslatedFaq(faqId: string, language: Locale) {
  const faq = await prisma.faq.findUnique({
    where: { id: faqId },
  });

  if (!faq) return null;

  if (language === 'en') {
    return faq;
  }

  const translations = await getEntityTranslations('faq', faqId, language);

  return {
    ...faq,
    question: translations.question || faq.question,
    answer: translations.answer || faq.answer,
  };
}

// Get all translated packages
export async function getTranslatedPackages(language: Locale, filters?: any) {
  const packages = await prisma.package.findMany(filters);

  if (language === 'en') {
    return packages;
  }

  return Promise.all(
    packages.map(async (pkg) => {
      const translations = await getEntityTranslations('package', pkg.id, language);
      return {
        ...pkg,
        name: translations.name || pkg.name,
        description: translations.description || pkg.description,
      };
    })
  );
}

// Get all translated FAQs
export async function getTranslatedFaqs(language: Locale, filters?: any) {
  const faqs = await prisma.faq.findMany(filters);

  if (language === 'en') {
    return faqs;
  }

  return Promise.all(
    faqs.map(async (faq) => {
      const translations = await getEntityTranslations('faq', faq.id, language);
      return {
        ...faq,
        question: translations.question || faq.question,
        answer: translations.answer || faq.answer,
      };
    })
  );
}

// Check translation completeness
export async function getTranslationProgress(
  entityType: string,
  entityId: string,
  requiredFields: string[]
) {
  const languages: Locale[] = ['de', 'fr', 'es', 'zh']; // Exclude English (source language)

  const progress: Record<string, { completed: number; total: number; percentage: number }> = {};

  for (const language of languages) {
    const translations = await prisma.translation.findMany({
      where: {
        entity_type: entityType,
        entity_id: entityId,
        language,
        field: { in: requiredFields },
      },
    });

    const completed = translations.filter(t => t.value && t.value.trim() !== '').length;
    const total = requiredFields.length;

    progress[language] = {
      completed,
      total,
      percentage: Math.round((completed / total) * 100),
    };
  }

  return progress;
}
