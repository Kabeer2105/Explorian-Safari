'use client';

import { useState } from 'react';

interface PackageFiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  type: string;
  minPrice: number;
  maxPrice: number;
  duration: string;
  difficulty: string;
}

export default function PackageFilters({ onFilterChange }: PackageFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    type: 'all',
    minPrice: 0,
    maxPrice: 10000,
    duration: 'all',
    difficulty: 'all',
  });

  const handleFilterChange = (key: keyof FilterState, value: string | number) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters: FilterState = {
      type: 'all',
      minPrice: 0,
      maxPrice: 10000,
      duration: 'all',
      difficulty: 'all',
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Filter Packages</h3>
        <button onClick={resetFilters} className="text-sm text-primary hover:underline">
          Reset All
        </button>
      </div>

      <div className="space-y-4">
        {/* Package Type */}
        <div>
          <label className="block text-sm font-medium mb-2">Package Type</label>
          <select
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="SAFARI">Wildlife Safaris</option>
            <option value="MOUNTAIN">Mountain Trekking</option>
            <option value="BEACH">Beach Holidays</option>
            <option value="DAYTRIP">Day Trips</option>
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Price Range (USD): ${filters.minPrice} - ${filters.maxPrice}
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', parseInt(e.target.value))}
              placeholder="Min"
              className="w-1/2 px-3 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value))}
              placeholder="Max"
              className="w-1/2 px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium mb-2">Duration</label>
          <select
            value={filters.duration}
            onChange={(e) => handleFilterChange('duration', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary"
          >
            <option value="all">Any Duration</option>
            <option value="1-3">1-3 Days</option>
            <option value="4-7">4-7 Days</option>
            <option value="8-14">8-14 Days</option>
            <option value="15+">15+ Days</option>
          </select>
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-sm font-medium mb-2">Difficulty</label>
          <select
            value={filters.difficulty}
            onChange={(e) => handleFilterChange('difficulty', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Levels</option>
            <option value="Easy">Easy</option>
            <option value="Moderate">Moderate</option>
            <option value="Challenging">Challenging</option>
          </select>
        </div>
      </div>
    </div>
  );
}
