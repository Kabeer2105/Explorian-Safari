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
  // Helper to get setting value by key
  const getSetting = (key: string) => {
    return initialSettings.find(s => s.key === key)?.value || '';
  };

  // Contact Information
  const [companyName, setCompanyName] = useState(getSetting('company_name'));
  const [email, setEmail] = useState(getSetting('contact_email'));
  const [phone, setPhone] = useState(getSetting('contact_phone'));
  const [address, setAddress] = useState(getSetting('contact_address'));
  const [whatsapp, setWhatsapp] = useState(getSetting('whatsapp_number'));

  // Social Media
  const [facebook, setFacebook] = useState(getSetting('social_facebook'));
  const [instagram, setInstagram] = useState(getSetting('social_instagram'));
  const [twitter, setTwitter] = useState(getSetting('social_twitter'));
  const [tiktok, setTiktok] = useState(getSetting('social_tiktok'));
  const [youtube, setYoutube] = useState(getSetting('social_youtube'));
  const [linkedin, setLinkedin] = useState(getSetting('social_linkedin'));

  // Business Info
  const [businessHours, setBusinessHours] = useState(getSetting('business_hours'));
  const [aboutText, setAboutText] = useState(getSetting('about_text'));

  // Password Change
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const handleSaveSettings = async () => {
    setLoading(true);
    setSaveSuccess(false);

    try {
      const settings = [
        { key: 'company_name', value: companyName },
        { key: 'contact_email', value: email },
        { key: 'contact_phone', value: phone },
        { key: 'contact_address', value: address },
        { key: 'whatsapp_number', value: whatsapp },
        { key: 'social_facebook', value: facebook },
        { key: 'social_instagram', value: instagram },
        { key: 'social_twitter', value: twitter },
        { key: 'social_tiktok', value: tiktok },
        { key: 'social_youtube', value: youtube },
        { key: 'social_linkedin', value: linkedin },
        { key: 'business_hours', value: businessHours },
        { key: 'about_text', value: aboutText },
      ];

      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings }),
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

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('Please fill in all password fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      alert('New password must be at least 8 characters long');
      return;
    }

    setPasswordLoading(true);

    try {
      const response = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to change password');
      }

      alert('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      console.error('Error changing password:', error);
      alert(error.message || 'Failed to change password. Please try again.');
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Site Settings</h1>
        <p className="mt-2 text-gray-600">Manage your website configuration</p>
      </div>

      <div className="space-y-6">
        {/* Contact Information */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="text-3xl">📞</span>
            Contact Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Explorian Safaris"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-base"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="info@exploriansafaris.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-base"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+255 719 245 540"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-base"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp Number</label>
              <input
                type="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="+255 719 245 540"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-base"
              />
              <p className="text-sm text-gray-500 mt-1">Number for the WhatsApp floating button on website</p>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Business Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Moshi, Kilimanjaro, Tanzania"
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-base"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Business Hours</label>
              <input
                type="text"
                value={businessHours}
                onChange={(e) => setBusinessHours(e.target.value)}
                placeholder="Mon-Fri: 8AM-6PM, Sat: 9AM-4PM"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-base"
              />
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="text-3xl">🌐</span>
            Social Media Links
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Facebook</label>
              <input
                type="url"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                placeholder="https://facebook.com/exploriansafaris"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-base"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Instagram</label>
              <input
                type="url"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="https://instagram.com/explorian_safaris"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-base"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Twitter (X)</label>
              <input
                type="url"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                placeholder="https://twitter.com/exploriansafaris"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-base"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">TikTok</label>
              <input
                type="url"
                value={tiktok}
                onChange={(e) => setTiktok(e.target.value)}
                placeholder="https://tiktok.com/@exploriansafaris"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-base"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">YouTube</label>
              <input
                type="url"
                value={youtube}
                onChange={(e) => setYoutube(e.target.value)}
                placeholder="https://youtube.com/@exploriansafaris"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-base"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">LinkedIn</label>
              <input
                type="url"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="https://linkedin.com/company/explorian-safaris"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-base"
              />
            </div>
          </div>
        </div>

        {/* About Text */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="text-3xl">ℹ️</span>
            About Section
          </h2>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">About Company Text</label>
            <textarea
              value={aboutText}
              onChange={(e) => setAboutText(e.target.value)}
              placeholder="Brief description about your company..."
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-base"
            />
            <p className="text-sm text-gray-500 mt-2">This text appears on your About page and footer</p>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end items-center gap-4">
          {saveSuccess && (
            <span className="text-green-600 font-semibold flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Settings saved successfully!
            </span>
          )}
          <button
            onClick={handleSaveSettings}
            disabled={loading}
            className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : 'Save All Settings'}
          </button>
        </div>

        {/* Change Password */}
        <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-red-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="text-3xl">🔐</span>
            Change Admin Password
          </h2>
          <div className="max-w-2xl space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter your current password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-base"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password (min 8 characters)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-base"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-base"
              />
            </div>

            <button
              onClick={handleChangePassword}
              disabled={passwordLoading}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {passwordLoading ? 'Changing Password...' : 'Change Password'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
