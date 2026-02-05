'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from '@/lib/language-context';

export default function TripPlannerWidget() {
  const router = useRouter();
  const t = useTranslations();
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
    <div className="trip-planner-widget">
      <div className="trip-planner-content">
        <h3>{t.home.tripPlannerTitle}</h3>
        <p className="trip-planner-subtitle">
          {t.home.tripPlannerSubtitle}
        </p>

        <form onSubmit={handleSubmit} className="trip-planner-form">
          <div className="form-group">
            <label>{t.home.tripPlannerInterest}</label>
            <select
              required
              value={formData.tripType}
              onChange={(e) => setFormData({ ...formData, tripType: e.target.value })}
            >
              <option value="">{t.home.tripPlannerInterestPlaceholder}</option>
              <option value="Wildlife Safari">Wildlife Safari</option>
              <option value="Mount Kilimanjaro">Mount Kilimanjaro</option>
              <option value="Beach Holiday">Beach Holiday (Zanzibar)</option>
              <option value="Day Trip">Day Trip</option>
              <option value="Combination">Safari + Beach Combo</option>
              <option value="Custom">Custom Package</option>
            </select>
          </div>

          <div className="form-group">
            <label>{t.home.tripPlannerDuration}</label>
            <select
              required
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            >
              <option value="">{t.home.tripPlannerDurationPlaceholder}</option>
              <option value="1-3 days">1-3 Days</option>
              <option value="4-7 days">4-7 Days</option>
              <option value="8-14 days">8-14 Days</option>
              <option value="15+ days">15+ Days</option>
              <option value="Flexible">Flexible</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>{t.home.tripPlannerBudget}</label>
              <select
                required
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              >
                <option value="">{t.home.tripPlannerBudgetPlaceholder}</option>
                <option value="Under $1000">Under $1,000</option>
                <option value="$1000-$2000">$1,000 - $2,000</option>
                <option value="$2000-$5000">$2,000 - $5,000</option>
                <option value="$5000+">$5,000+</option>
                <option value="Flexible">Flexible</option>
              </select>
            </div>

            <div className="form-group">
              <label>{t.home.tripPlannerTravelers}</label>
              <input
                type="number"
                min="1"
                max="20"
                required
                value={formData.travelers}
                onChange={(e) => setFormData({ ...formData, travelers: parseInt(e.target.value) })}
              />
            </div>
          </div>

          <button type="submit" className="btn-primary w-full">
            {t.home.tripPlannerSubmit}
          </button>
        </form>
      </div>
    </div>
  );
}
