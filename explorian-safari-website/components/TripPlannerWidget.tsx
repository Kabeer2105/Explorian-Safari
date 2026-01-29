'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TripPlannerWidget() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    tripType: '',
    duration: '',
    budget: '',
    travelers: 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to request quote page with pre-filled data
    const params = new URLSearchParams({
      trip_interest: formData.tripType,
      duration: formData.duration,
      budget: formData.budget,
      guests: formData.travelers.toString(),
    });
    router.push(`/request-quote?${params.toString()}`);
  };

  return (
    <div className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-lg shadow-xl p-8">
      <h3 className="text-2xl font-bold mb-2">Plan Your Perfect Safari</h3>
      <p className="text-white/80 mb-6">
        Tell us your preferences and we'll create a customized itinerary for you.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">What interests you?</label>
          <select
            required
            value={formData.tripType}
            onChange={(e) => setFormData({ ...formData, tripType: e.target.value })}
            className="w-full px-4 py-2 rounded-md text-gray-900 focus:ring-2 focus:ring-secondary"
          >
            <option value="">Select trip type</option>
            <option value="Wildlife Safari">Wildlife Safari</option>
            <option value="Mount Kilimanjaro">Mount Kilimanjaro</option>
            <option value="Beach Holiday">Beach Holiday (Zanzibar)</option>
            <option value="Day Trip">Day Trip</option>
            <option value="Combination">Safari + Beach Combo</option>
            <option value="Custom">Custom Package</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">How long?</label>
          <select
            required
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            className="w-full px-4 py-2 rounded-md text-gray-900 focus:ring-2 focus:ring-secondary"
          >
            <option value="">Select duration</option>
            <option value="1-3 days">1-3 Days</option>
            <option value="4-7 days">4-7 Days</option>
            <option value="8-14 days">8-14 Days</option>
            <option value="15+ days">15+ Days</option>
            <option value="Flexible">Flexible</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Budget per person</label>
          <select
            required
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            className="w-full px-4 py-2 rounded-md text-gray-900 focus:ring-2 focus:ring-secondary"
          >
            <option value="">Select budget range</option>
            <option value="Under $1000">Under $1,000</option>
            <option value="$1000-$2000">$1,000 - $2,000</option>
            <option value="$2000-$5000">$2,000 - $5,000</option>
            <option value="$5000+">$5,000+</option>
            <option value="Flexible">Flexible</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Number of travelers</label>
          <input
            type="number"
            min="1"
            max="20"
            required
            value={formData.travelers}
            onChange={(e) => setFormData({ ...formData, travelers: parseInt(e.target.value) })}
            className="w-full px-4 py-2 rounded-md text-gray-900 focus:ring-2 focus:ring-secondary"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-secondary text-white py-3 rounded-md font-semibold hover:bg-secondary-dark transition"
        >
          Get Your Custom Quote →
        </button>
      </form>
    </div>
  );
}
