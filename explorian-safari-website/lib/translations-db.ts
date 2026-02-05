// Database translation management utilities
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type SupportedLanguage = 'de' | 'fr' | 'es' | 'zh';
export const SUPPORTED_LANGUAGES: SupportedLanguage[] = ['de', 'fr', 'es', 'zh'];

export interface TranslationData {
  field: string;
  language: SupportedLanguage;
  value: string;
}

export interface EntityWithTranslations {
  [key: string]: any; // English fields from the main table
  translations?: Record<SupportedLanguage, Record<string, string>>;
}

/**
 * Save translations for an entity (Package, FAQ, etc.)
 * This will create or update translations in the Translation table
 */
export async function saveTranslations(
  entityType: 'package' | 'faq' | 'galleryImage' | 'video',
  entityId: string,
  translations: TranslationData[]
) {
  // Delete existing translations first (to handle deletions)
  await prisma.translation.deleteMany({
    where: {
      entity_type: entityType,
      entity_id: entityId,
    },
  });

  // Create new translations
  if (translations.length > 0) {
    await prisma.translation.createMany({
      data: translations.map((t) => ({
        entity_type: entityType,
        entity_id: entityId,
        field: t.field,
        language: t.language,
        value: t.value,
      })),
    });
  }
}

/**
 * Get translations for an entity grouped by language and field
 * Returns: { de: { name: '...', description: '...' }, fr: { ... }, ... }
 */
export async function getTranslations(
  entityType: 'package' | 'faq' | 'galleryImage' | 'video',
  entityId: string
): Promise<Record<SupportedLanguage, Record<string, string>>> {
  const translations = await prisma.translation.findMany({
    where: {
      entity_type: entityType,
      entity_id: entityId,
    },
  });

  const grouped: Record<string, Record<string, string>> = {
    de: {},
    fr: {},
    es: {},
    zh: {},
  };

  translations.forEach((t) => {
    if (!grouped[t.language]) {
      grouped[t.language] = {};
    }
    grouped[t.language][t.field] = t.value;
  });

  return grouped as Record<SupportedLanguage, Record<string, string>>;
}

/**
 * Get a translated value for a specific field and language
 * Falls back to English value if translation not found
 */
export function getTranslatedValue(
  entity: EntityWithTranslations,
  field: string,
  language: SupportedLanguage | 'en'
): string {
  // If English or no translations, return the main field
  if (language === 'en' || !entity.translations) {
    return entity[field] || '';
  }

  // Return translation or fall back to English
  return entity.translations[language]?.[field] || entity[field] || '';
}

/**
 * Attach translations to an entity
 * Fetches translations and adds them to the entity object
 */
export async function attachTranslations<T extends { id: string }>(
  entityType: 'package' | 'faq' | 'galleryImage' | 'video',
  entity: T
): Promise<T & EntityWithTranslations> {
  const translations = await getTranslations(entityType, entity.id);
  return {
    ...entity,
    translations,
  };
}

/**
 * Attach translations to multiple entities
 */
export async function attachTranslationsToMany<T extends { id: string }>(
  entityType: 'package' | 'faq' | 'galleryImage' | 'video',
  entities: T[]
): Promise<(T & EntityWithTranslations)[]> {
  const entityIds = entities.map((e) => e.id);

  const translations = await prisma.translation.findMany({
    where: {
      entity_type: entityType,
      entity_id: { in: entityIds },
    },
  });

  // Group translations by entity ID
  const translationsByEntity = new Map<string, Record<SupportedLanguage, Record<string, string>>>();

  translations.forEach((t) => {
    if (!translationsByEntity.has(t.entity_id)) {
      translationsByEntity.set(t.entity_id, {
        de: {},
        fr: {},
        es: {},
        zh: {},
      });
    }

    const entityTranslations = translationsByEntity.get(t.entity_id)!;
    if (!entityTranslations[t.language as SupportedLanguage]) {
      entityTranslations[t.language as SupportedLanguage] = {};
    }
    entityTranslations[t.language as SupportedLanguage][t.field] = t.value;
  });

  // Attach translations to entities
  return entities.map((entity) => ({
    ...entity,
    translations: translationsByEntity.get(entity.id) || {
      de: {},
      fr: {},
      es: {},
      zh: {},
    },
  }));
}

/**
 * Parse translations from form data
 * Expects form data like:
 * {
 *   name: 'English name',
 *   name_de: 'German name',
 *   name_fr: 'French name',
 *   description: 'English description',
 *   description_es: 'Spanish description',
 *   ...
 * }
 */
export function parseTranslationsFromFormData(
  formData: Record<string, any>,
  fields: string[]
): TranslationData[] {
  const translations: TranslationData[] = [];

  fields.forEach((field) => {
    SUPPORTED_LANGUAGES.forEach((language) => {
      const key = `${field}_${language}`;
      if (formData[key]) {
        translations.push({
          field,
          language,
          value: formData[key],
        });
      }
    });
  });

  return translations;
}

/**
 * Format translations for form editing
 * Converts: { de: { name: '...', description: '...' }, fr: { ... } }
 * To: { name_de: '...', name_fr: '...', description_de: '...', ... }
 */
export function formatTranslationsForForm(
  translations: Record<SupportedLanguage, Record<string, string>>
): Record<string, string> {
  const formatted: Record<string, string> = {};

  Object.entries(translations).forEach(([language, fields]) => {
    Object.entries(fields).forEach(([field, value]) => {
      formatted[`${field}_${language}`] = value;
    });
  });

  return formatted;
}
