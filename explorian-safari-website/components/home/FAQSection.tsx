'use client';

import { useEffect, useState } from 'react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  order: number;
}

export default function FAQSection() {
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
        <div className="section-label">FAQ</div>
        <h2 className="section-title">Frequently Asked Questions</h2>
        <p className="section-desc text-center max-w-2xl mx-auto mb-12">
          Got questions? We've got answers! Here are some of the most common questions about
          safaris in Tanzania.
        </p>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className={`faq-item ${activeFAQ === index ? 'active' : ''}`}
            >
              <button
                className="faq-question"
                onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
              >
                <span>{faq.question}</span>
                <span className="faq-icon">{activeFAQ === index ? '−' : '+'}</span>
              </button>
              {activeFAQ === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
