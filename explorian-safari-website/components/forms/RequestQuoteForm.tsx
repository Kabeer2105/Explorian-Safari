'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RequestQuoteForm() {
  const router = useRouter();

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
        <h2 className="form-title">Request Your Custom Safari</h2>
        <p className="form-subtitle">
          Share your travel dreams with us and we'll create a personalized itinerary
          tailored to your preferences, budget, and interests.
        </p>
      </div>

      {error && (
        <div className="form-error">
          {error}
        </div>
      )}

      {/* Personal Information */}
      <div className="form-section">
        <h3 className="section-heading">Your Information</h3>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="form-input"
              placeholder="John Doe"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="form-input"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="form-input"
              placeholder="+1 234 567 8900"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Country of Residence *</label>
            <input
              type="text"
              required
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="form-input"
              placeholder="United States"
            />
          </div>
        </div>
      </div>

      {/* Trip Details */}
      <div className="form-section">
        <h3 className="section-heading">Trip Details</h3>

        <div className="form-group">
          <label className="form-label">Type of Safari *</label>
          <select
            required
            value={formData.trip_type}
            onChange={(e) => setFormData({ ...formData, trip_type: e.target.value })}
            className="form-select"
          >
            <option value="">Select safari type</option>
            <option value="Wildlife Safari">Wildlife Safari Only</option>
            <option value="Mountain Trekking">Mountain Trekking Only</option>
            <option value="Beach Holiday">Beach Holiday Only</option>
            <option value="Safari + Beach">Safari + Beach Combination</option>
            <option value="Safari + Mountain">Safari + Mountain Combination</option>
            <option value="Complete Package">Complete Package (Safari, Mountain & Beach)</option>
            <option value="Custom">Fully Custom Itinerary</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Destinations Interested In</label>
          <div className="checkbox-grid">
            {['Serengeti', 'Ngorongoro Crater', 'Tarangire', 'Lake Manyara', 'Mount Kilimanjaro', 'Mount Meru', 'Zanzibar', 'Mafia Island'].map(dest => (
              <label key={dest} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.destinations.includes(dest)}
                  onChange={() => handleCheckboxChange('destinations', dest)}
                  className="checkbox-input"
                />
                <span>{dest}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Other Destinations (Optional)</label>
          <input
            type="text"
            value={formData.other_destinations}
            onChange={(e) => setFormData({ ...formData, other_destinations: e.target.value })}
            className="form-input"
            placeholder="e.g., Pemba Island, Ruaha National Park, Selous..."
          />
        </div>

        <div className="form-group">
          <label className="form-label">Trip Duration *</label>
          <select
            required
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            className="form-select"
          >
            <option value="">Select duration</option>
            <option value="3-4 days">3-4 Days</option>
            <option value="5-7 days">5-7 Days</option>
            <option value="8-10 days">8-10 Days</option>
            <option value="11-14 days">11-14 Days</option>
            <option value="15+ days">15+ Days</option>
            <option value="Flexible">Flexible</option>
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Preferred Start Date</label>
            <input
              type="date"
              value={formData.start_date}
              onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
              className="form-input"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Preferred End Date (Optional)</label>
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
            <span>My travel dates are flexible (I can adjust by a few days/weeks)</span>
          </label>
        </div>
      </div>

      {/* Group Composition */}
      <div className="form-section">
        <h3 className="section-heading">Group Composition</h3>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Number of Adults (18+) *</label>
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
            <label className="form-label">Number of Children (0-17)</label>
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
            <label className="form-label">Children Ages</label>
            <input
              type="text"
              value={formData.children_ages}
              onChange={(e) => setFormData({ ...formData, children_ages: e.target.value })}
              className="form-input"
              placeholder="e.g., 8, 12, 15"
            />
          </div>
        )}
      </div>

      {/* Preferences */}
      <div className="form-section">
        <h3 className="section-heading">Your Preferences</h3>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Budget Per Person (USD) *</label>
            <select
              required
              value={formData.budget_per_person}
              onChange={(e) => setFormData({ ...formData, budget_per_person: e.target.value })}
              className="form-select"
            >
              <option value="">Select budget range</option>
              <option value="$1,000 - $2,000">$1,000 - $2,000</option>
              <option value="$2,000 - $3,500">$2,000 - $3,500</option>
              <option value="$3,500 - $5,000">$3,500 - $5,000</option>
              <option value="$5,000 - $7,500">$5,000 - $7,500</option>
              <option value="$7,500+">$7,500+</option>
              <option value="Flexible">Flexible</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Accommodation Preference *</label>
            <select
              required
              value={formData.accommodation_type}
              onChange={(e) => setFormData({ ...formData, accommodation_type: e.target.value })}
              className="form-select"
            >
              <option value="">Select accommodation type</option>
              <option value="Luxury Lodges">Luxury Lodges & Camps</option>
              <option value="Mid-Range">Mid-Range Lodges & Tented Camps</option>
              <option value="Budget">Budget Camping & Lodges</option>
              <option value="Mix">Mix of Different Standards</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Main Interests (Select all that apply)</label>
          <div className="checkbox-grid">
            {['Wildlife Viewing', 'Photography', 'Bird Watching', 'Cultural Experiences', 'Adventure Activities', 'Relaxation', 'Family-Friendly', 'Honeymoon/Romance'].map(interest => (
              <label key={interest} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.interests.includes(interest)}
                  onChange={() => handleCheckboxChange('interests', interest)}
                  className="checkbox-input"
                />
                <span>{interest}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="form-section">
        <h3 className="section-heading">Additional Information</h3>

        <div className="form-group">
          <label className="form-label">Special Requirements or Requests</label>
          <textarea
            rows={4}
            value={formData.special_requirements}
            onChange={(e) => setFormData({ ...formData, special_requirements: e.target.value })}
            className="form-textarea"
            placeholder="Dietary restrictions, accessibility needs, specific celebrations, preferred activities, etc."
          />
        </div>

        <div className="form-group">
          <label className="form-label">How did you hear about us?</label>
          <select
            value={formData.how_heard}
            onChange={(e) => setFormData({ ...formData, how_heard: e.target.value })}
            className="form-select"
          >
            <option value="">Select an option</option>
            <option value="Google Search">Google Search</option>
            <option value="Social Media">Social Media</option>
            <option value="TripAdvisor">TripAdvisor</option>
            <option value="Safari Bookings">Safari Bookings</option>
            <option value="Friend/Family Referral">Friend/Family Referral</option>
            <option value="Travel Agent">Travel Agent</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="form-footer">
        <button
          type="submit"
          disabled={loading}
          className="btn-submit"
        >
          {loading ? 'Sending Your Request...' : 'Request Custom Quote'}
        </button>
        <p className="form-note">
          We'll review your request and send you a detailed custom itinerary within 24-48 hours.
        </p>
      </div>
    </form>
  );
}
