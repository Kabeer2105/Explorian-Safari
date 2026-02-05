'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from '@/lib/language-context';

export default function RequestQuoteForm() {
  const router = useRouter();
  const t = useTranslations();

  const [formData, setFormData] = useState({
    // Personal Information
    name: '',
    email: '',
    phone: '',
    country: '',

    // Trip Details
    trip_type: '',
    destinations: [] as string[],
    other_destinations: '',
    duration: '',
    start_date: '',
    end_date: '',
    date_flexible: false,

    // Group Details
    adults: 2,
    children: 0,
    children_ages: '',

    // Preferences
    budget_per_person: '',
    accommodation_type: '',
    interests: [] as string[],

    // Additional Info
    special_requirements: '',
    how_heard: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheckboxChange = (field: 'destinations' | 'interests', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          trip_interest: formData.trip_type,
          number_of_guests: formData.adults + formData.children,
          message: `
Trip Type: ${formData.trip_type}
Destinations: ${formData.destinations.join(', ')}${formData.other_destinations ? `, ${formData.other_destinations}` : ''}
Duration: ${formData.duration}
Travel Dates: ${formData.start_date}${formData.end_date ? ` to ${formData.end_date}` : ''}${formData.date_flexible ? ' (Flexible)' : ''}
Group: ${formData.adults} adults${formData.children > 0 ? `, ${formData.children} children (ages: ${formData.children_ages})` : ''}
Budget: ${formData.budget_per_person} per person
Accommodation: ${formData.accommodation_type}
Interests: ${formData.interests.join(', ')}
Special Requirements: ${formData.special_requirements || 'None'}
How they heard about us: ${formData.how_heard || 'Not specified'}
          `.trim()
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send inquiry');
      }

      router.push('/inquiry-success');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="request-quote-form">
      <div className="form-header">
        <h2 className="form-title">{t.quote.title}</h2>
        <p className="form-subtitle">
          {t.quote.subtitle}
        </p>
      </div>

      {error && (
        <div className="form-error">
          {error}
        </div>
      )}

      {/* Personal Information */}
      <div className="form-section">
        <h3 className="section-heading">{t.quote.yourInformation}</h3>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">{t.quote.nameLabel} *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="form-input"
              placeholder={t.quote.namePlaceholder}
            />
          </div>

          <div className="form-group">
            <label className="form-label">{t.quote.emailLabel} *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="form-input"
              placeholder={t.quote.emailPlaceholder}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">{t.quote.phoneLabel}</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="form-input"
              placeholder={t.quote.phonePlaceholder}
            />
          </div>

          <div className="form-group">
            <label className="form-label">{t.quote.countryLabel} *</label>
            <input
              type="text"
              required
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="form-input"
              placeholder={t.quote.countryPlaceholder}
            />
          </div>
        </div>
      </div>

      {/* Trip Details */}
      <div className="form-section">
        <h3 className="section-heading">{t.quote.tripDetails}</h3>

        <div className="form-group">
          <label className="form-label">{t.quote.safariTypeLabel} *</label>
          <select
            required
            value={formData.trip_type}
            onChange={(e) => setFormData({ ...formData, trip_type: e.target.value })}
            className="form-select"
          >
            <option value="">{t.quote.safariTypePlaceholder}</option>
            <option value="Wildlife Safari">{t.quote.safariTypes.wildlifeSafari}</option>
            <option value="Mountain Trekking">{t.quote.safariTypes.mountainTrekking}</option>
            <option value="Beach Holiday">{t.quote.safariTypes.beachHoliday}</option>
            <option value="Safari + Beach">{t.quote.safariTypes.safariBeach}</option>
            <option value="Safari + Mountain">{t.quote.safariTypes.safariMountain}</option>
            <option value="Complete Package">{t.quote.safariTypes.completePackage}</option>
            <option value="Custom">{t.quote.safariTypes.custom}</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">{t.quote.destinationsLabel}</label>
          <div className="checkbox-grid">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.destinations.includes('Serengeti')}
                onChange={() => handleCheckboxChange('destinations', 'Serengeti')}
                className="checkbox-input"
              />
              <span>{t.quote.destinations.serengeti}</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.destinations.includes('Ngorongoro Crater')}
                onChange={() => handleCheckboxChange('destinations', 'Ngorongoro Crater')}
                className="checkbox-input"
              />
              <span>{t.quote.destinations.ngorongoro}</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.destinations.includes('Tarangire')}
                onChange={() => handleCheckboxChange('destinations', 'Tarangire')}
                className="checkbox-input"
              />
              <span>{t.quote.destinations.tarangire}</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.destinations.includes('Lake Manyara')}
                onChange={() => handleCheckboxChange('destinations', 'Lake Manyara')}
                className="checkbox-input"
              />
              <span>{t.quote.destinations.lakeManyara}</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.destinations.includes('Mount Kilimanjaro')}
                onChange={() => handleCheckboxChange('destinations', 'Mount Kilimanjaro')}
                className="checkbox-input"
              />
              <span>{t.quote.destinations.kilimanjaro}</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.destinations.includes('Mount Meru')}
                onChange={() => handleCheckboxChange('destinations', 'Mount Meru')}
                className="checkbox-input"
              />
              <span>{t.quote.destinations.meru}</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.destinations.includes('Zanzibar')}
                onChange={() => handleCheckboxChange('destinations', 'Zanzibar')}
                className="checkbox-input"
              />
              <span>{t.quote.destinations.zanzibar}</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.destinations.includes('Mafia Island')}
                onChange={() => handleCheckboxChange('destinations', 'Mafia Island')}
                className="checkbox-input"
              />
              <span>{t.quote.destinations.mafia}</span>
            </label>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">{t.quote.otherDestinationsLabel}</label>
          <input
            type="text"
            value={formData.other_destinations}
            onChange={(e) => setFormData({ ...formData, other_destinations: e.target.value })}
            className="form-input"
            placeholder={t.quote.otherDestinationsPlaceholder}
          />
        </div>

        <div className="form-group">
          <label className="form-label">{t.quote.durationLabel} *</label>
          <select
            required
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            className="form-select"
          >
            <option value="">{t.quote.durationPlaceholder}</option>
            <option value="3-4 days">{t.quote.durations.days3_4}</option>
            <option value="5-7 days">{t.quote.durations.days5_7}</option>
            <option value="8-10 days">{t.quote.durations.days8_10}</option>
            <option value="11-14 days">{t.quote.durations.days11_14}</option>
            <option value="15+ days">{t.quote.durations.days15plus}</option>
            <option value="Flexible">{t.quote.durations.flexible}</option>
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">{t.quote.startDateLabel}</label>
            <input
              type="date"
              value={formData.start_date}
              onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
              className="form-input"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="form-group">
            <label className="form-label">{t.quote.endDateLabel}</label>
            <input
              type="date"
              value={formData.end_date}
              onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
              className="form-input"
              min={formData.start_date || new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={formData.date_flexible}
              onChange={(e) => setFormData({ ...formData, date_flexible: e.target.checked })}
              className="checkbox-input"
            />
            <span>{t.quote.dateFlexibleLabel}</span>
          </label>
        </div>
      </div>

      {/* Group Composition */}
      <div className="form-section">
        <h3 className="section-heading">{t.quote.groupComposition}</h3>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">{t.quote.adultsLabel} *</label>
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
            <label className="form-label">{t.quote.childrenLabel}</label>
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
            <label className="form-label">{t.quote.childrenAgesLabel}</label>
            <input
              type="text"
              value={formData.children_ages}
              onChange={(e) => setFormData({ ...formData, children_ages: e.target.value })}
              className="form-input"
              placeholder={t.quote.childrenAgesPlaceholder}
            />
          </div>
        )}
      </div>

      {/* Preferences */}
      <div className="form-section">
        <h3 className="section-heading">{t.quote.yourPreferences}</h3>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">{t.quote.budgetLabel} *</label>
            <select
              required
              value={formData.budget_per_person}
              onChange={(e) => setFormData({ ...formData, budget_per_person: e.target.value })}
              className="form-select"
            >
              <option value="">{t.quote.budgetPlaceholder}</option>
              <option value="$1,000 - $2,000">{t.quote.budgets.range1}</option>
              <option value="$2,000 - $3,500">{t.quote.budgets.range2}</option>
              <option value="$3,500 - $5,000">{t.quote.budgets.range3}</option>
              <option value="$5,000 - $7,500">{t.quote.budgets.range4}</option>
              <option value="$7,500+">{t.quote.budgets.range5}</option>
              <option value="Flexible">{t.quote.budgets.flexible}</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">{t.quote.accommodationLabel} *</label>
            <select
              required
              value={formData.accommodation_type}
              onChange={(e) => setFormData({ ...formData, accommodation_type: e.target.value })}
              className="form-select"
            >
              <option value="">{t.quote.accommodationPlaceholder}</option>
              <option value="Luxury Lodges">{t.quote.accommodations.luxury}</option>
              <option value="Mid-Range">{t.quote.accommodations.midRange}</option>
              <option value="Budget">{t.quote.accommodations.budget}</option>
              <option value="Mix">{t.quote.accommodations.mix}</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">{t.quote.interestsLabel}</label>
          <div className="checkbox-grid">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.interests.includes('Wildlife Viewing')}
                onChange={() => handleCheckboxChange('interests', 'Wildlife Viewing')}
                className="checkbox-input"
              />
              <span>{t.quote.interests.wildlife}</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.interests.includes('Photography')}
                onChange={() => handleCheckboxChange('interests', 'Photography')}
                className="checkbox-input"
              />
              <span>{t.quote.interests.photography}</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.interests.includes('Bird Watching')}
                onChange={() => handleCheckboxChange('interests', 'Bird Watching')}
                className="checkbox-input"
              />
              <span>{t.quote.interests.birdWatching}</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.interests.includes('Cultural Experiences')}
                onChange={() => handleCheckboxChange('interests', 'Cultural Experiences')}
                className="checkbox-input"
              />
              <span>{t.quote.interests.cultural}</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.interests.includes('Adventure Activities')}
                onChange={() => handleCheckboxChange('interests', 'Adventure Activities')}
                className="checkbox-input"
              />
              <span>{t.quote.interests.adventure}</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.interests.includes('Relaxation')}
                onChange={() => handleCheckboxChange('interests', 'Relaxation')}
                className="checkbox-input"
              />
              <span>{t.quote.interests.relaxation}</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.interests.includes('Family-Friendly')}
                onChange={() => handleCheckboxChange('interests', 'Family-Friendly')}
                className="checkbox-input"
              />
              <span>{t.quote.interests.family}</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.interests.includes('Honeymoon/Romance')}
                onChange={() => handleCheckboxChange('interests', 'Honeymoon/Romance')}
                className="checkbox-input"
              />
              <span>{t.quote.interests.honeymoon}</span>
            </label>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="form-section">
        <h3 className="section-heading">{t.quote.additionalInfo}</h3>

        <div className="form-group">
          <label className="form-label">{t.quote.specialRequests}</label>
          <textarea
            rows={4}
            value={formData.special_requirements}
            onChange={(e) => setFormData({ ...formData, special_requirements: e.target.value })}
            className="form-textarea"
            placeholder={t.quote.specialRequestsPlaceholder}
          />
        </div>

        <div className="form-group">
          <label className="form-label">{t.quote.howHeardLabel}</label>
          <select
            value={formData.how_heard}
            onChange={(e) => setFormData({ ...formData, how_heard: e.target.value })}
            className="form-select"
          >
            <option value="">{t.quote.howHeardPlaceholder}</option>
            <option value="Google Search">{t.quote.howHeardOptions.google}</option>
            <option value="Social Media">{t.quote.howHeardOptions.socialMedia}</option>
            <option value="TripAdvisor">{t.quote.howHeardOptions.tripAdvisor}</option>
            <option value="Safari Bookings">{t.quote.howHeardOptions.safariBookings}</option>
            <option value="Friend/Family Referral">{t.quote.howHeardOptions.referral}</option>
            <option value="Travel Agent">{t.quote.howHeardOptions.travelAgent}</option>
            <option value="Other">{t.quote.howHeardOptions.other}</option>
          </select>
        </div>
      </div>

      <div className="form-footer">
        <button
          type="submit"
          disabled={loading}
          className="btn-submit"
        >
          {loading ? t.quote.submitting : t.quote.submitButton}
        </button>
        <p className="form-note">
          {t.quote.formNote}
        </p>
      </div>
    </form>
  );
}
