'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Locale } from './locale-config';
import { defaultLocale, isValidLocale } from './locale-config';
import { getTranslations } from './i18n-content';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: ReturnType<typeof getTranslations>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [t, setT] = useState(() => getTranslations(defaultLocale));

  // Initialize locale from localStorage or browser on mount
  useEffect(() => {
    const storedLocale = localStorage.getItem('locale');
    if (storedLocale && isValidLocale(storedLocale)) {
      setLocaleState(storedLocale as Locale);
      setT(getTranslations(storedLocale as Locale));
    } else {
      // Try to detect from browser language
      const browserLang = navigator.language.substring(0, 2);
      if (isValidLocale(browserLang)) {
        setLocaleState(browserLang as Locale);
        setT(getTranslations(browserLang as Locale));
      }
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    console.log('setLocale called in context with:', newLocale);
    setLocaleState(newLocale);
    console.log('setLocaleState called');
    setT(getTranslations(newLocale));
    console.log('setT called with translations for:', newLocale);
    localStorage.setItem('locale', newLocale);
    console.log('localStorage updated');

    // Update HTML lang attribute
    document.documentElement.lang = newLocale;
    console.log('HTML lang attribute updated to:', newLocale);
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Hook for getting translations directly
export function useTranslations() {
  const { t } = useLanguage();
  return t;
}
