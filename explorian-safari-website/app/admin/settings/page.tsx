import { prisma } from '@/lib/prisma';

export default async function SettingsPage() {
  // Fetch all settings
  const settings = await prisma.setting.findMany({
    orderBy: { key: 'asc' },
  });

  // Group settings by category
  const contactSettings = settings.filter((s) => s.key.startsWith('contact_'));
  const socialSettings = settings.filter((s) => s.key.startsWith('social_'));
  const siteSettings = settings.filter((s) => s.key.startsWith('site_'));
  const otherSettings = settings.filter(
    (s) => !s.key.startsWith('contact_') && !s.key.startsWith('social_') && !s.key.startsWith('site_')
  );

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
              contactSettings.map((setting) => (
                <div key={setting.id}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {setting.key.replace('contact_', '').replace('_', ' ').toUpperCase()}
                  </label>
                  <input
                    type="text"
                    defaultValue={setting.value}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                  />
                  {setting.description && (
                    <p className="text-xs text-gray-500 mt-1">{setting.description}</p>
                  )}
                </div>
              ))
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
              socialSettings.map((setting) => (
                <div key={setting.id}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {setting.key.replace('social_', '').toUpperCase()}
                  </label>
                  <input
                    type="url"
                    defaultValue={setting.value}
                    placeholder={`https://...`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                  />
                  {setting.description && (
                    <p className="text-xs text-gray-500 mt-1">{setting.description}</p>
                  )}
                </div>
              ))
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
              siteSettings.map((setting) => (
                <div key={setting.id}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {setting.key.replace('site_', '').replace('_', ' ').toUpperCase()}
                  </label>
                  {setting.type === 'TEXT' ? (
                    <input
                      type="text"
                      defaultValue={setting.value}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                    />
                  ) : (
                    <textarea
                      defaultValue={setting.value}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                    />
                  )}
                  {setting.description && (
                    <p className="text-xs text-gray-500 mt-1">{setting.description}</p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Other Settings */}
        {otherSettings.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Other Settings</h2>
            <div className="space-y-4">
              {otherSettings.map((setting) => (
                <div key={setting.id}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {setting.key.replace('_', ' ').toUpperCase()}
                  </label>
                  {setting.type === 'TEXT' ? (
                    <input
                      type="text"
                      defaultValue={setting.value}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                    />
                  ) : (
                    <textarea
                      defaultValue={setting.value}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                    />
                  )}
                  {setting.description && (
                    <p className="text-xs text-gray-500 mt-1">{setting.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition">
            Save All Settings
          </button>
        </div>
      </div>
    </div>
  );
}
