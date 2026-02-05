'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from '@/lib/language-context';

export default function BookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const packageId = searchParams.get('package');
  const t = useTranslations();

  const [packages, setPackages] = useState<any[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [loadingPackages, setLoadingPackages] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    package_id: packageId || '',
    customer_name: '',
    email: '',
    phone: '',
    country: '',
    travel_date: '',
    number_of_guests: 2,
    adults: 2,
    children: 0,
    children_ages: '',
    special_requests: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch packages on component mount
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch('/api/packages');
        const data = await response.json();
        setPackages(data);

        // If packageId is provided, find and set the selected package
        if (packageId) {
          const pkg = data.find((p: any) => p.id === packageId);
          if (pkg) {
            setSelectedPackage(pkg);
            setSelectedType(pkg.type);
            setFormData(prev => ({ ...prev, package_id: packageId }));
          }
        }
      } catch (error) {
        console.error('Error fetching packages:', error);
      } finally {
        setLoadingPackages(false);
      }
    };

    fetchPackages();
  }, [packageId]);

  const handlePackageSelect = (pkg: any) => {
    setSelectedPackage(pkg);
    setFormData({ ...formData, package_id: pkg.id });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageId: formData.package_id,
          customerName: formData.customer_name,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          travelDate: formData.travel_date,
          numberOfGuests: formData.adults + formData.children,
          specialRequests: formData.special_requests,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create booking');
      }

      // Redirect based on booking type
      if (data.booking.status === 'INQUIRY') {
        // Less than 7 days - show inquiry confirmation
        router.push(`/booking-success?ref=${data.booking.reference_number}&type=inquiry`);
      } else {
        // 7+ days - redirect to payment page
        router.push(`/payment/simulate?bookingId=${data.booking.id}`);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Group packages by type
  const groupedPackages = packages.reduce((acc: any, pkg: any) => {
    if (!acc[pkg.type]) acc[pkg.type] = [];
    acc[pkg.type].push(pkg);
    return acc;
  }, {});

  // Filter packages based on selected type and search term
  const filteredPackages = selectedType
    ? (groupedPackages[selectedType] || []).filter((pkg: any) =>
        pkg.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Package type icons
  const typeIcons: Record<string, string> = {
    'SAFARI': '🦁',
    'MOUNTAIN': '🏔️',
    'BEACH': '🏖️',
    'DAYTRIP': '🚗',
  };

  const typeColors: Record<string, string> = {
    'SAFARI': 'package-type-safari',
    'MOUNTAIN': 'package-type-mountain',
    'BEACH': 'package-type-beach',
    'DAYTRIP': 'package-type-daytrip',
  };

  return (
    <form onSubmit={handleSubmit} className="booking-form">
      <div className="form-header">
        <h2 className="form-title">{t.booking.title}</h2>
        <p className="form-subtitle">
          {t.booking.subtitle}
        </p>
      </div>

      {error && (
        <div className="form-error">
          {error}
        </div>
      )}

      {/* Package Selection */}
      <div className="form-section">
        <h3 className="section-heading">{t.booking.selectPackage}</h3>

        {!selectedPackage ? (
          <>
            {/* Step 1: Choose Package Type */}
            <div className="form-group">
              <label className="form-label">{t.booking.step1} *</label>
              {loadingPackages ? (
                <div className="package-type-loading">{t.booking.loadingPackages}</div>
              ) : (
                <div className="package-type-grid">
                  {Object.keys(groupedPackages).map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        setSelectedType(type);
                        setSearchTerm('');
                      }}
                      className={`package-type-card ${selectedType === type ? 'active' : ''} ${typeColors[type] || ''}`}
                    >
                      <div className="package-type-icon">{typeIcons[type] || '📦'}</div>
                      <div className="package-type-name">{type}</div>
                      <div className="package-type-count">{groupedPackages[type].length} {t.booking.packagesCount}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Step 2: Select Specific Package */}
            {selectedType && (
              <div className="form-group">
                <label className="form-label">{t.booking.step2} {selectedType} {t.booking.packageLabel} *</label>

                {/* Search Bar */}
                {filteredPackages.length > 5 && (
                  <input
                    type="text"
                    placeholder={t.booking.searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-input package-search"
                  />
                )}

                {/* Package Cards */}
                <div className="package-selection-grid">
                  {filteredPackages.map((pkg: any) => {
                    const images = pkg.images ? JSON.parse(pkg.images) : [];
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => handlePackageSelect(pkg)}
                        className="package-selection-card"
                      >
                        {images[0] && (
                          <div className="package-selection-image">
                            <img src={images[0]} alt={pkg.name} />
                          </div>
                        )}
                        <div className="package-selection-content">
                          <h4 className="package-selection-title">{pkg.name}</h4>
                          <p className="package-selection-description">
                            {pkg.description.substring(0, 80)}...
                          </p>
                          {pkg.duration_days && (
                            <p className="package-selection-duration">
                              📅 {pkg.duration_days} {t.common.days}
                            </p>
                          )}
                          <div className="package-selection-price">
                            {t.common.from} {pkg.currency} {Number(pkg.price_from).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {filteredPackages.length === 0 && (
                  <p className="package-no-results">{t.booking.noResults} "{searchTerm}"</p>
                )}
              </div>
            )}
          </>
        ) : (
          /* Selected Package Preview */
          <div className="package-preview-selected">
            <div className="package-preview-header">
              <div>
                <h4>{selectedPackage.name}</h4>
                <span className="package-preview-type">{selectedPackage.type}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedPackage(null);
                  setFormData({ ...formData, package_id: '' });
                }}
                className="package-change-btn"
              >
                {t.booking.changePackage}
              </button>
            </div>
            <div className="package-preview-details">
              <p className="package-preview-description">{selectedPackage.description}</p>
              <div className="package-preview-info">
                {selectedPackage.duration_days && (
                  <span>📅 {selectedPackage.duration_days} {t.common.days}</span>
                )}
                <span className="package-preview-price">
                  {t.common.from} {selectedPackage.currency} {Number(selectedPackage.price_from).toLocaleString()} {t.booking.perPerson}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Only show rest of form if package is selected */}
      {selectedPackage && (
        <>
          {/* Personal Information */}
          <div className="form-section">
            <h3 className="section-heading">{t.booking.yourInformation}</h3>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">{t.booking.nameLabel} *</label>
                <input
                  type="text"
                  required
                  value={formData.customer_name}
                  onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                  className="form-input"
                  placeholder={t.booking.namePlaceholder}
                />
              </div>

              <div className="form-group">
                <label className="form-label">{t.booking.emailLabel} *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="form-input"
                  placeholder={t.booking.emailPlaceholder}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">{t.booking.phoneLabel}</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="form-input"
                  placeholder={t.booking.phonePlaceholder}
                />
              </div>

              <div className="form-group">
                <label className="form-label">{t.booking.countryLabel} *</label>
                <input
                  type="text"
                  required
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="form-input"
                  placeholder={t.booking.countryPlaceholder}
                />
              </div>
            </div>
          </div>

          {/* Travel Details */}
          <div className="form-section">
            <h3 className="section-heading">{t.booking.travelDetails}</h3>

            <div className="form-group">
              <label className="form-label">{t.booking.travelDateLabel} *</label>
              <input
                type="date"
                required
                value={formData.travel_date}
                onChange={(e) => setFormData({ ...formData, travel_date: e.target.value })}
                className="form-input"
                min={new Date().toISOString().split('T')[0]}
              />
              <p className="form-hint">
                {t.booking.travelDateHint}
              </p>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">{t.booking.adultsLabel} *</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={formData.adults}
                  onChange={(e) => setFormData({ ...formData, adults: parseInt(e.target.value) || 1 })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">{t.booking.childrenLabel}</label>
                <input
                  type="number"
                  min="0"
                  value={formData.children}
                  onChange={(e) => setFormData({ ...formData, children: parseInt(e.target.value) || 0 })}
                  className="form-input"
                />
              </div>
            </div>

            {formData.children > 0 && (
              <div className="form-group">
                <label className="form-label">{t.booking.childrenAgesLabel}</label>
                <input
                  type="text"
                  value={formData.children_ages}
                  onChange={(e) => setFormData({ ...formData, children_ages: e.target.value })}
                  className="form-input"
                  placeholder={t.booking.childrenAgesPlaceholder}
                />
              </div>
            )}
          </div>

          {/* Additional Requests */}
          <div className="form-section">
            <h3 className="section-heading">{t.booking.additionalInfo}</h3>

            <div className="form-group">
              <label className="form-label">{t.booking.specialRequests}</label>
              <textarea
                rows={4}
                value={formData.special_requests}
                onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })}
                className="form-textarea"
                placeholder={t.booking.specialRequestsPlaceholder}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-footer">
            <button
              type="submit"
              disabled={loading || !formData.package_id}
              className="btn-submit"
            >
              {loading ? t.booking.submitting : t.booking.submitButton}
            </button>
            <p className="form-note">
              {t.booking.securityNote}
            </p>
          </div>
        </>
      )}
    </form>
  );
}
