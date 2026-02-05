'use client';

import { useState } from 'react';
import { useTranslations } from '@/lib/language-context';

export default function ContactForm() {
  const t = useTranslations();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-md text-green-700">
          {t.contact.successMessage}
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">{t.contact.nameLabel} *</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder={t.contact.namePlaceholder}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">{t.contact.emailLabel} *</label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder={t.contact.emailPlaceholder}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">{t.contact.phoneLabel}</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder={t.contact.phonePlaceholder}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">{t.contact.messageLabel} *</label>
        <textarea
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder={t.contact.messagePlaceholder}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white py-3 rounded-md font-semibold hover:bg-primary-dark transition disabled:opacity-50"
      >
        {loading ? t.contact.submitting : t.contact.submitButton}
      </button>
    </form>
  );
}
