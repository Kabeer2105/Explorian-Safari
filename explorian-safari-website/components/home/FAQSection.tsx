'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLanguage } from '@/lib/language-context';
import { getTranslatedValue } from '@/lib/translations-db';
import type { SupportedLanguage } from '@/lib/translations-db';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  order: number;
  translations?: Record<SupportedLanguage, Record<string, string>>;
}

export default function FAQSection() {
  const t = useTranslations();
  const { locale } = useLanguage();
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  useEffect(() => {
    async function fetchFAQs() {
      try {
        const response = await fetch('/api/faq');
        const data = await response.json();
        setFaqs(data.faqs || []);
      } catch (error) {
        console.error('Failed to fetch FAQs:', error);
      }
    }
    fetchFAQs();
  }, []);

  if (faqs.length === 0) {
    return null;
  }

  return (
    <section className="section-padding bg-gradient-subtle">
      <div className="container-custom">
        <div className="section-label">{t.home.faqLabel}</div>
        <h2 className="section-title">{t.home.faqTitle}</h2>
        <p className="section-desc text-center max-w-2xl mx-auto mb-12">
          {t.home.faqSubtitle}
        </p>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => {
            // Get translated values
            const translatedQuestion = getTranslatedValue(faq, 'question', locale);
            const translatedAnswer = getTranslatedValue(faq, 'answer', locale);

            return (
              <div
                key={faq.id}
                className={`faq-item ${activeFAQ === index ? 'active' : ''}`}
              >
                <button
                  className="faq-question"
                  onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
                >
                  <span>{translatedQuestion}</span>
                  <span className="faq-icon">{activeFAQ === index ? '−' : '+'}</span>
                </button>
                {activeFAQ === index && (
                  <div className="faq-answer">
                    <p>{translatedAnswer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
