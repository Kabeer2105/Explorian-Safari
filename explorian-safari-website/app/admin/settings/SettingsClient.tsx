'use client';

import { useState } from 'react';

interface Setting {
  id: string;
  key: string;
  value: string;
  created_at: Date;
  updated_at: Date;
}

interface SettingsClientProps {
  initialSettings: Setting[];
}

export default function SettingsClient({ initialSettings }: SettingsClientProps) {
  const [settings, setSettings] = useState<Record<string, string>>(
    initialSettings.reduce((acc, setting) => ({
      ...acc,
      [setting.key]: setting.value,
    }), {})
  );
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Group settings by category
  const contactSettings = initialSettings.filter((s) => s.key.startsWith('contact_'));
  const socialSettings = initialSettings.filter((s) => s.key.startsWith('social_'));
  const siteSettings = initialSettings.filter((s) => s.key.startsWith('site_'));
  const otherSettings = initialSettings.filter(
    (s) => !s.key.startsWith('contact_') && !s.key.startsWith('social_') && !s.key.startsWith('site_')
  );

  const handleInputChange = (key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value,
    }));
    setSaveSuccess(false);
  };

  const handleSaveAll = async () => {
    setLoading(true);
    setSaveSuccess(false);

    try {
      const settingsArray = Object.entries(settings).map(([key, value]) => ({
        key,
        value,
      }));

      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings: settingsArray }),
      });

      if (!response.ok) throw new Error('Failed to save settings');

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderSettingField = (setting: Setting) => {
    const value = settings[setting.key] || '';
    // Use textarea for long content fields
    const isLongText = setting.key.includes('description') || setting.key.includes('about') || value.length > 100;

    return (
      <div key={setting.id}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {setting.key.replace(/^(contact_|social_|site_)/, '').replace(/_/g, ' ').toUpperCase()}
        </label>
        {isLongText ? (
          <textarea
            value={value}
            onChange={(e) => handleInputChange(setting.key, e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        ) : (
          <input
            type={setting.key.startsWith('social_') ? 'url' : setting.key.includes('email') ? 'email' : setting.key.includes('phone') ? 'tel' : 'text'}
            value={value}
            onChange={(e) => handleInputChange(setting.key, e.target.value)}
            placeholder={setting.key.startsWith('social_') ? 'https://...' : ''}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Site Settings</h1>
        <p className="mt-2 text-gray-600">Manage site configuration and settings</p>
      </div>

      <div className="space-y-6">
        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
          <div className="space-y-4">
            {contactSettings.length === 0 ? (
              <p className="text-sm text-gray-500">No contact settings configured</p>
            ) : (
              contactSettings.map(renderSettingField)
            )}
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Social Media</h2>
          <div className="space-y-4">
            {socialSettings.length === 0 ? (
              <p className="text-sm text-gray-500">No social media settings configured</p>
            ) : (
              socialSettings.map(renderSettingField)
            )}
          </div>
        </div>

        {/* Site Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Site Configuration</h2>
          <div className="space-y-4">
            {siteSettings.length === 0 ? (
              <p className="text-sm text-gray-500">No site settings configured</p>
            ) : (
              siteSettings.map(renderSettingField)
            )}
          </div>
        </div>

        {/* Other Settings */}
        {otherSettings.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Other Settings</h2>
            <div className="space-y-4">
              {otherSettings.map(renderSettingField)}
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="flex justify-end items-center gap-4">
          {saveSuccess && (
            <span className="text-green-600 font-medium">✓ Settings saved successfully!</span>
          )}
          <button
            onClick={handleSaveAll}
            disabled={loading}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : 'Save All Settings'}
          </button>
        </div>
      </div>
    </div>
  );
}
